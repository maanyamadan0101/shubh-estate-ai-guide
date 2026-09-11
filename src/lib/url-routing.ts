import { SITE_ORIGIN } from "./seo";
import { DWARKA_CATALOGUE_LISTINGS } from "../data/dwarka-catalogue-listings";

export const PROJECT_REDIRECTS: Record<string, string> = {
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
  "bptp-astaire-gardens": "/projects/bptp-astaire-gardens-sector-70a-gurgaon",
  "bptp-astaire-gardens-sector-70a": "/projects/bptp-astaire-gardens-sector-70a-gurgaon",
};

const DUPLICATE_PROPERTY_REDIRECTS: Record<string, string> = {
  "/property/1-bhk-lotus-homz-apartment-sector-111-gurgaon-2":
    "/property/1-bhk-lotus-homz-apartment-sector-111-gurgaon",
  "/property/2-bhk-antriksh-heights-apartment-sector-84-gurgaon-2":
    "/property/2-bhk-antriksh-heights-apartment-sector-84-gurgaon",
  "/property/2-bhk-godrej-zenith-apartment-sector-89-gurgaon-2":
    "/property/2-bhk-godrej-zenith-apartment-sector-89-gurgaon",
  "/property/2-bhk-green-court-apartment-sector-90-gurgaon-2":
    "/property/2-bhk-green-court-apartment-sector-90-gurgaon",
  "/property/2-bhk-pareena-laxmi-apartments-apartment-sector-99a-gurgaon-2":
    "/property/2-bhk-pareena-laxmi-apartments-apartment-sector-99a-gurgaon",
  "/property/2-bhk-sector-71-residential-apartment-apartment-sector-71-gurgaon-2":
    "/property/2-bhk-sector-71-residential-apartment-apartment-sector-71-gurgaon",
  "/property/3-bhk-bestech-park-view-ananda-apartment-sector-81-gurgaon-2":
    "/property/3-bhk-bestech-park-view-ananda-apartment-sector-81-gurgaon",
  "/property/3-bhk-godrej-air-apartment-sector-85-gurgaon-2":
    "/property/3-bhk-godrej-air-apartment-sector-85-gurgaon",
  "/property/3-bhk-godrej-air-apartment-sector-85-gurgaon-4":
    "/property/3-bhk-godrej-air-apartment-sector-85-gurgaon-3",
  "/property/3-bhk-godrej-summit-apartment-sector-104-gurgaon-2":
    "/property/3-bhk-godrej-summit-apartment-sector-104-gurgaon",
  "/property/3-bhk-ireo-skyon-apartment-sector-60-gurgaon-2":
    "/property/3-bhk-ireo-skyon-apartment-sector-60-gurgaon",
  "/property/3-bhk-m3m-antalya-hills-apartment-sector-79-gurgaon-2":
    "/property/3-bhk-m3m-antalya-hills-apartment-sector-79-gurgaon",
  "/property/3-bhk-m3m-crown-apartment-sector-111-gurgaon-2":
    "/property/3-bhk-m3m-crown-apartment-sector-111-gurgaon",
  "/property/3-bhk-m3m-golf-hills-apartment-sector-79-gurgaon-2":
    "/property/3-bhk-m3m-golf-hills-apartment-sector-79-gurgaon",
  "/property/3-bhk-mapsko-casa-bella-apartment-sector-82-gurgaon-2":
    "/property/3-bhk-mapsko-casa-bella-apartment-sector-82-gurgaon",
  "/property/3-bhk-microtek-greenburg-apartment-sector-86-gurgaon-2":
    "/property/3-bhk-microtek-greenburg-apartment-sector-86-gurgaon",
  "/property/3-bhk-signature-global-city-79b-apartment-sector-79-gurgaon-2":
    "/property/3-bhk-signature-global-city-79b-apartment-sector-79-gurgaon",
  "/property/3-bhk-ss-residential-condominium-apartment-sector-83-gurgaon-2":
    "/property/3-bhk-ss-residential-condominium-apartment-sector-83-gurgaon",
  "/property/3-bhk-suncity-essel-towers-apartment-sector-28-gurgaon-2":
    "/property/3-bhk-suncity-essel-towers-apartment-sector-28-gurgaon",
  "/property/3-bhk-tata-primanti-apartment-sector-72-gurgaon-2":
    "/property/3-bhk-tata-primanti-apartment-sector-72-gurgaon",
  "/property/4-bhk-antriksh-heights-apartment-sector-84-gurgaon-2":
    "/property/4-bhk-antriksh-heights-apartment-sector-84-gurgaon",
  "/property/4-bhk-sobha-city-apartment-sector-108-gurgaon-2":
    "/property/4-bhk-sobha-city-apartment-sector-108-gurgaon",
  "/property/4-bhk-tata-primanti-apartment-sector-72-gurgaon-2":
    "/property/4-bhk-tata-primanti-apartment-sector-72-gurgaon",
  "/property/4-bhk-vatika-city-acacia-apartment-sector-49-gurgaon-2":
    "/property/4-bhk-vatika-city-acacia-apartment-sector-49-gurgaon",
  "/property/4-bhk-whiteland-the-aspen-apartment-sector-76-gurgaon-2":
    "/property/4-bhk-whiteland-the-aspen-apartment-sector-76-gurgaon",
  "/property/5-bhk-tulip-melrose-apartment-sector-70-gurgaon-2":
    "/property/5-bhk-tulip-melrose-apartment-sector-70-gurgaon",
};

const PATH_REDIRECTS: Record<string, string> = {
  "/sell-property-in-gurgaon": "/sell-property-gurgaon",
  "/property-for-sale-in-gurgaon": "/flats-for-sale-in-gurgaon",
  "/properties": "/flats-for-sale-in-gurgaon",
  "/property-valuation-gurgaon": "/property-services-gurgaon",
  "/home-loan": "/home-loans",
  "/property/dlf-the-primus-sector-82a-gurgaon": "/projects/dlf-the-primus-sector-82a-gurgaon",
  "/projects/dlf-the-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  ...DUPLICATE_PROPERTY_REDIRECTS,
  ...Object.fromEntries(
    Object.entries(PROJECT_REDIRECTS).map(([slug, path]) => [`/projects/${slug}`, path]),
  ),
  ...Object.fromEntries(
    DWARKA_CATALOGUE_LISTINGS.map((item) => [`/property/${item.slug}`, item.detail_href]),
  ),
};

const TRACKING_PARAMETERS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "dclid",
  "fbclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "ref",
]);

/** Removes attribution-only parameters without changing functional filters. */
export function stripTrackingParameters(searchParams: URLSearchParams): boolean {
  let changed = false;
  for (const key of [...searchParams.keys()]) {
    if (TRACKING_PARAMETERS.has(key.toLowerCase())) {
      searchParams.delete(key);
      changed = true;
    }
  }
  return changed;
}

/** Keep public navigation relative and resolve known aliases before emitting links. */
export function internalHref(value: string): string {
  const url = new URL(value, SITE_ORIGIN);
  if (!["shubhestatebroker.in", "www.shubhestatebroker.in"].includes(url.hostname)) return value;
  stripTrackingParameters(url.searchParams);
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  if (url.pathname === "/nri" || url.pathname.startsWith("/nri/")) {
    return "/nri-sell-property-gurgaon";
  }
  const mapped = PATH_REDIRECTS[url.pathname];
  if (mapped) {
    const destination = new URL(mapped, SITE_ORIGIN);
    url.pathname = destination.pathname;
    if (destination.hash) url.hash = destination.hash;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

/** Host, protocol, trailing slash and legacy path are normalized in one response. */
export function canonicalRedirect(request: Request): Response | null {
  if (!["GET", "HEAD"].includes(request.method)) return null;
  const url = new URL(request.url);
  const requestedHref = url.href;
  stripTrackingParameters(url.searchParams);
  const production = ["shubhestatebroker.in", "www.shubhestatebroker.in"].includes(url.hostname);
  // Keep local and preview hosts local, while applying the same path redirects.
  const relative = internalHref(`${SITE_ORIGIN}${url.pathname}${url.search}${url.hash}`);
  const destination = new URL(relative, production ? SITE_ORIGIN : url.origin);
  if (destination.href === requestedHref) return null;
  return new Response(null, {
    status: 301,
    headers: {
      Location: destination.href,
      "Cache-Control": "public, max-age=3600",
      "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
    },
  });
}
