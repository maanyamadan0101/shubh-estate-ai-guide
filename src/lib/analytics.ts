declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

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
