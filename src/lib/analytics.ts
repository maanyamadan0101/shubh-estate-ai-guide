declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __shubhWebVitalsInitialized?: boolean;
  }
}

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;
type VitalName = "TTFB" | "FCP" | "LCP" | "CLS" | "INP";
type VitalRating = "good" | "needs_improvement" | "poor";

type ExtendedPerformanceEntry = PerformanceEntry & {
  value?: number;
  hadRecentInput?: boolean;
  interactionId?: number;
};

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackContact(method: "phone" | "whatsapp" | "form" | "site_visit", location: string) {
  trackEvent("contact", {
    method,
    location,
    page_path: window.location.pathname,
  });
}

function vitalRating(name: VitalName, value: number): VitalRating {
  const thresholds: Record<VitalName, [number, number]> = {
    TTFB: [800, 1800],
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    CLS: [0.1, 0.25],
    INP: [200, 500],
  };
  const [good, poor] = thresholds[name];
  if (value <= good) return "good";
  if (value <= poor) return "needs_improvement";
  return "poor";
}

function supportsEntryType(type: string) {
  return (
    typeof PerformanceObserver !== "undefined" &&
    PerformanceObserver.supportedEntryTypes?.includes(type)
  );
}

export function initWebVitals() {
  if (typeof window === "undefined" || window.__shubhWebVitalsInitialized) return;
  window.__shubhWebVitalsInitialized = true;

  const pagePath = window.location.pathname;
  const reported = new Set<VitalName>();

  const report = (name: VitalName, value: number) => {
    if (!Number.isFinite(value) || reported.has(name)) return;
    reported.add(name);
    const normalized = name === "CLS" ? Number(value.toFixed(4)) : Math.round(value);
    trackEvent("web_vital", {
      metric_name: name,
      metric_value: normalized,
      metric_rating: vitalRating(name, value),
      metric_unit: name === "CLS" ? "score" : "ms",
      page_path: pagePath,
      page_location: window.location.href,
    });
  };

  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (navigation?.responseStart) report("TTFB", navigation.responseStart);

  if (supportsEntryType("paint")) {
    const paintObserver = new PerformanceObserver((list, observer) => {
      const fcp = list.getEntries().find((entry) => entry.name === "first-contentful-paint");
      if (fcp) {
        report("FCP", fcp.startTime);
        observer.disconnect();
      }
    });
    paintObserver.observe({ type: "paint", buffered: true });
  }

  let lcpValue = 0;
  if (supportsEntryType("largest-contentful-paint")) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) lcpValue = last.startTime;
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  }

  let clsValue = 0;
  let clsSessionValue = 0;
  let clsSessionStart = 0;
  let clsLastEntry = 0;
  if (supportsEntryType("layout-shift")) {
    const clsObserver = new PerformanceObserver((list) => {
      for (const rawEntry of list.getEntries()) {
        const entry = rawEntry as ExtendedPerformanceEntry;
        if (entry.hadRecentInput || typeof entry.value !== "number") continue;

        const startsNewSession =
          clsSessionStart === 0 ||
          entry.startTime - clsLastEntry > 1000 ||
          entry.startTime - clsSessionStart > 5000;

        if (startsNewSession) {
          clsSessionStart = entry.startTime;
          clsSessionValue = entry.value;
        } else {
          clsSessionValue += entry.value;
        }
        clsLastEntry = entry.startTime;
        clsValue = Math.max(clsValue, clsSessionValue);
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  }

  const interactionDurations = new Map<number, number>();
  if (supportsEntryType("event")) {
    const inpObserver = new PerformanceObserver((list) => {
      for (const rawEntry of list.getEntries()) {
        const entry = rawEntry as ExtendedPerformanceEntry;
        const interactionId = entry.interactionId ?? 0;
        if (!interactionId || !entry.duration) continue;
        const previous = interactionDurations.get(interactionId) ?? 0;
        interactionDurations.set(interactionId, Math.max(previous, entry.duration));
      }
    });
    inpObserver.observe(
      { type: "event", buffered: true, durationThreshold: 40 } as PerformanceObserverInit,
    );
  }

  const reportFinalVitals = () => {
    if (lcpValue) report("LCP", lcpValue);
    report("CLS", clsValue);

    if (interactionDurations.size) {
      const durations = [...interactionDurations.values()].sort((a, b) => b - a);
      const index = Math.min(Math.floor(durations.length / 50), durations.length - 1);
      report("INP", durations[index]!);
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") reportFinalVitals();
  });
  window.addEventListener("pagehide", reportFinalVitals, { once: true });
}
