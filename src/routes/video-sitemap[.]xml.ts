import { createFileRoute } from "@tanstack/react-router";
import { VIDEO_WATCH_PAGES } from "@/data/video-watch-pages";
import { SITE_ORIGIN } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/video-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = VIDEO_WATCH_PAGES.map((video) => {
          const watchUrl = `${SITE_ORIGIN}/videos/${video.slug}`;
          const thumbnailUrl = `${SITE_ORIGIN}${video.thumbnailPath}`;
          const contentUrl = `${SITE_ORIGIN}${video.mediaPath}`;

          return `  <url>\n    <loc>${escapeXml(watchUrl)}</loc>\n    <video:video>\n      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>\n      <video:title>${escapeXml(video.title)}</video:title>\n      <video:description>${escapeXml(video.description)}</video:description>\n      <video:content_loc>${escapeXml(contentUrl)}</video:content_loc>\n      <video:publication_date>${escapeXml(video.uploadDate)}</video:publication_date>\n    </video:video>\n  </url>`;
        }).join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${urls}\n</urlset>`;

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
