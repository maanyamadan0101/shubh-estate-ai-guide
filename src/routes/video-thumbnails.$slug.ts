import { createFileRoute } from "@tanstack/react-router";
import { getVideoWatchPage } from "@/data/video-watch-pages";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function trimTitle(value: string) {
  const clean = value.split(" | ")[0]?.trim() || value;
  return clean.length <= 62 ? clean : `${clean.slice(0, 59).trim()}…`;
}

export const Route = createFileRoute("/video-thumbnails/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const video = getVideoWatchPage(params.slug);
        if (!video) return new Response("Not found", { status: 404 });

        const title = escapeXml(trimTitle(video.title));
        const project = escapeXml(video.projectLabel);
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#081426"/>
      <stop offset="1" stop-color="#102b47"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="16%" r="60%">
      <stop offset="0" stop-color="#c89b3c" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#c89b3c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#glow)"/>
  <rect x="72" y="64" width="1136" height="592" rx="34" fill="none" stroke="#c89b3c" stroke-opacity="0.45" stroke-width="2"/>
  <circle cx="640" cy="300" r="78" fill="#c89b3c"/>
  <path d="M620 257 L620 343 L690 300 Z" fill="#081426"/>
  <text x="640" y="430" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">${title}</text>
  <text x="640" y="486" text-anchor="middle" fill="#d9c28d" font-family="Arial, Helvetica, sans-serif" font-size="26">${project}</text>
  <text x="640" y="548" text-anchor="middle" fill="#ffffff" fill-opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="22">Property walkthrough • Shubh Estate Brokers</text>
</svg>`;

        return new Response(svg, {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=31536000, immutable",
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});
