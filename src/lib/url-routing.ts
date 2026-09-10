import { SITE_ORIGIN } from "./seo";
import { DWARKA_CATALOGUE_LISTINGS } from "../data/dwarka-catalogue-listings";

export const PROJECT_REDIRECTS: Record<string, string> = {
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
  "bptp-astaire-gardens": "/projects/bptp-astaire-gardens-sector-70a-gurgaon",
  "bptp-astaire-gardens-sector-70a": "/projects/bptp-astaire-gardens-sector-70a-gurgaon",
};

const PATH_REDIRECTS: Record<string, string> = {
  "/sell-property-in-gurgaon": "/sell-property-gurgaon",
  "/property-for-sale-in-gurgaon": "/flats-for-sale-in-gurgaon",
  "/properties": "/flats-for-sale-in-gurgaon",
  "/property-valuation-gurgaon": "/property-services-gurgaon",
  "/home-loan": "/home-loans",
  "/property/dlf-the-primus-sector-82a-gurgaon": "/projects/dlf-the-primus-sector-82a-gurgaon",
  "/projects/dlf-the-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  ...Object.fromEntries(
    Object.entries(PROJECT_REDIRECTS).map(([slug, path]) => [`/projects/${slug}`, path]),
  ),
  ...Object.fromEntries(
    DWARKA_CATALOGUE_LISTINGS.map((item) => [`/property/${item.slug}`, item.detail_href]),
  ),
};

/** Keep public navigation relative and resolve known aliases before emitting links. */
export function internalHref(value: string): string {
  const url = new URL(value, SITE_ORIGIN);
  if (!["shubhestatebroker.in", "www.shubhestatebroker.in"].includes(url.hostname)) return value;
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
  const production = ["shubhestatebroker.in", "www.shubhestatebroker.in"].includes(url.hostname);
  // Keep local and preview hosts local, while applying the same path redirects.
  const relative = internalHref(`${SITE_ORIGIN}${url.pathname}${url.search}${url.hash}`);
  const destination = new URL(relative, production ? SITE_ORIGIN : url.origin);
  if (destination.href === url.href) return null;
  return new Response(null, {
    status: 301,
    headers: {
      Location: destination.href,
      "Cache-Control": "public, max-age=3600",
      "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
    },
  });
}
