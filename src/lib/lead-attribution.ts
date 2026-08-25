export type LeadAttribution = {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

const STORAGE_KEY = "shubh_lead_attribution_v1";

function trimValue(value: string | null | undefined, max = 240) {
  return (value ?? "").trim().slice(0, max);
}

function readCurrentAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      landing_page: "",
      referrer: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    landing_page: trimValue(`${window.location.pathname}${window.location.search}`),
    referrer: trimValue(typeof document !== "undefined" ? document.referrer : ""),
    utm_source: trimValue(params.get("utm_source"), 100),
    utm_medium: trimValue(params.get("utm_medium"), 100),
    utm_campaign: trimValue(params.get("utm_campaign"), 150),
    utm_term: trimValue(params.get("utm_term"), 150),
    utm_content: trimValue(params.get("utm_content"), 150),
  };
}

function parseStored(value: string | null): LeadAttribution | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<LeadAttribution>;
    return {
      landing_page: trimValue(parsed.landing_page),
      referrer: trimValue(parsed.referrer),
      utm_source: trimValue(parsed.utm_source, 100),
      utm_medium: trimValue(parsed.utm_medium, 100),
      utm_campaign: trimValue(parsed.utm_campaign, 150),
      utm_term: trimValue(parsed.utm_term, 150),
      utm_content: trimValue(parsed.utm_content, 150),
    };
  } catch {
    return null;
  }
}

export function initLeadAttribution() {
  if (typeof window === "undefined") return;

  try {
    const existing = parseStored(window.sessionStorage.getItem(STORAGE_KEY));
    if (existing?.landing_page) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(readCurrentAttribution()));
  } catch {
    // Attribution is helpful but must never block the lead flow when storage is unavailable.
  }
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return readCurrentAttribution();

  initLeadAttribution();
  try {
    return parseStored(window.sessionStorage.getItem(STORAGE_KEY)) ?? readCurrentAttribution();
  } catch {
    return readCurrentAttribution();
  }
}
