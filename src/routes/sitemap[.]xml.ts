import { createFileRoute } from "@tanstack/react-router";
import { listSitemapProperties } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const STATIC_PATHS = [
  { path: "/", priority: "1.0" },
  { path: "/properties", priority: "0.9" },
  { path: "/nri", priority: "0.8" },
  { path: "/locations/gurgaon", priority: "0.8" },
  { path: "/locations/golf-course-road", priority: "0.7" },
  { path: "/locations/golf-course-extension-road", priority: "0.7" },
  { path: "/locations/dwarka-expressway", priority: "0.7" },
  { path: "/locations/southern-peripheral-road", priority: "0.7" },
  { path: "/locations/sohna-road", priority: "0.7" },
  { path: "/locations/new-gurgaon", priority: "0.7" },
  { path: "/home-loans", priority: "0.7" },
  { path: "/emi-calculator", priority: "0.6" },
  { path: "/gurugram-growth-story", priority: "0.6" },
  { path: "/about", priority: "0.5" },
  { path: "/contact", priority: "0.5" },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://") ? value : `${SITE_ORIGIN}${value.startsWith("/") ? value : `/${value}`}`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const properties = await listSitemapProperties();
        const urls = [
          ...STATIC_PATHS.map(
            (p) => `  <url>\n    <loc>${escapeXml(`${SITE_ORIGIN}${p.path}`)}</loc>\n    <priority>${p.priority}</priority>\n  </url>`,
          ),
          ...properties.map((p) => {
            const image = p.cover_image_url
              ? `\n    <image:image>\n      <image:loc>${escapeXml(absoluteUrl(p.cover_image_url))}</image:loc>\n    </image:image>`
              : "";
            return `  <url>\n    <loc>${escapeXml(`${SITE_ORIGIN}/property/${p.slug}`)}</loc>\n    <lastmod>${new Date(p.updated_at).toISOString().slice(0, 10)}</lastmod>\n    <priority>0.8</priority>${image}\n  </url>`;
          }),
        ].join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
        });
      },
    },
  },
});
