import { createFileRoute } from "@tanstack/react-router";
import { listProjectHubSitemapEntries } from "@/lib/project-hub.functions";
import { listSitemapProperties } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

type StaticPath = {
  path: string;
  priority: string;
  lastmod?: string;
};

const STATIC_PATHS: StaticPath[] = [
  { path: "/", priority: "1.0" },
  { path: "/properties", priority: "0.9" },
  { path: "/projects", priority: "0.9", lastmod: "2026-08-23" },
  { path: "/blog", priority: "0.9", lastmod: "2026-08-20" },
  {
    path: "/blog/gurgaon-property-due-diligence-checklist-2026",
    priority: "0.9",
    lastmod: "2026-08-20",
  },
  {
    path: "/blog/buy-property-gurgaon-small-down-payment-home-loan-guide-2026",
    priority: "0.9",
    lastmod: "2026-08-20",
  },
  { path: "/under-construction-projects-gurgaon", priority: "0.9" },
  { path: "/property-services-gurgaon", priority: "0.9" },
  { path: "/luxury", priority: "0.8" },
  { path: "/property-buying-advisory-gurgaon", priority: "0.8" },
  { path: "/godrej-101-sector-79-gurgaon", priority: "0.8" },
  {
    path: "/dlf-skycourt-sector-86-gurgaon",
    priority: "0.9",
    lastmod: "2026-08-23",
  },
  {
    path: "/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon",
    priority: "0.9",
    lastmod: "2026-08-20",
  },
  {
    path: "/dwarka-expressway-flats-for-sale-gurgaon",
    priority: "0.9",
    lastmod: "2026-08-21",
  },
  {
    path: "/capital-residences-360-3-bhk-for-sale-sector-70a-gurgaon",
    priority: "0.9",
    lastmod: "2026-08-21",
  },
  { path: "/property-sector-79-gurgaon", priority: "0.8" },
  { path: "/desperate-deals-gurgaon", priority: "0.8" },
  { path: "/best-areas-gurgaon-property-investment", priority: "0.8" },
  { path: "/apartments-for-sale-dlf-phase-1-gurgaon", priority: "0.7" },
  { path: "/higher-floor-apartments-golf-course-extension-road", priority: "0.7" },
  { path: "/senior-citizen-housing-gurgaon", priority: "0.7" },
  { path: "/sell-property-gurgaon", priority: "0.8" },
  { path: "/nri-sell-property-gurgaon", priority: "0.8" },
  { path: "/nri", priority: "0.8" },
  { path: "/nri/usa", priority: "0.8" },
  { path: "/nri/canada", priority: "0.8" },
  { path: "/nri/australia", priority: "0.8" },
  { path: "/nri/europe", priority: "0.8" },
  { path: "/locations/gurgaon", priority: "0.8" },
  { path: "/locations/golf-course-road", priority: "0.7" },
  { path: "/locations/golf-course-extension-road", priority: "0.7" },
  { path: "/locations/dwarka-expressway", priority: "0.7" },
  { path: "/locations/southern-peripheral-road", priority: "0.7" },
  { path: "/locations/sohna-road", priority: "0.7" },
  { path: "/locations/new-gurgaon", priority: "0.7" },
  { path: "/home-loans", priority: "0.7", lastmod: "2026-08-11" },
  { path: "/emi-calculator", priority: "0.6" },
  { path: "/gurugram-growth-story", priority: "0.6", lastmod: "2026-08-12" },
  { path: "/about", priority: "0.5", lastmod: "2026-08-12" },
  { path: "/contact", priority: "0.5" },
];

const PROJECT_HUB_REDIRECTS = new Set([
  "dlf-skycourt",
  "dlf-skycourt-sector-86",
  "dlf-the-skycourt-sector-86",
  "godrej-101",
  "godrej-101-sector-79",
]);

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `${SITE_ORIGIN}${value.startsWith("/") ? value : `/${value}`}`;
}

function safeLastmod(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `\n    <lastmod>${date.toISOString().slice(0, 10)}</lastmod>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [properties, projectHubs] = await Promise.all([
          listSitemapProperties(),
          listProjectHubSitemapEntries(),
        ]);
        const urls = [
          ...STATIC_PATHS.map(
            (p) =>
              `  <url>\n    <loc>${escapeXml(`${SITE_ORIGIN}${p.path}`)}</loc>${safeLastmod(p.lastmod)}\n    <priority>${p.priority}</priority>\n  </url>`,
          ),
          ...projectHubs
            .filter((hub) => Boolean(hub.slug?.trim()) && !PROJECT_HUB_REDIRECTS.has(hub.slug))
            .map(
              (hub) =>
                `  <url>\n    <loc>${escapeXml(`${SITE_ORIGIN}/projects/${hub.slug}`)}</loc>${safeLastmod(hub.updated_at)}\n    <priority>0.8</priority>\n  </url>`,
            ),
          ...properties
            .filter((p) => Boolean(p.slug?.trim()))
            .map((p) => {
              const image = p.cover_image_url
                ? `\n    <image:image>\n      <image:loc>${escapeXml(absoluteUrl(p.cover_image_url))}</image:loc>\n    </image:image>`
                : "";
              return `  <url>\n    <loc>${escapeXml(`${SITE_ORIGIN}/property/${p.slug}`)}</loc>${safeLastmod(p.updated_at)}\n    <priority>0.8</priority>${image}\n  </url>`;
            }),
        ].join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=300, must-revalidate",
            "vercel-cdn-cache-control":
              "public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=86400",
          },
        });
      },
    },
  },
});
