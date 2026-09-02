import { createFileRoute } from "@tanstack/react-router";
import { ANSALS_HIGHLAND_2BHK_PREVIEW } from "@/data/video-previews/ansals-highland-2bhk";
import { ANSALS_HIGHLAND_3BHK_PREVIEW } from "@/data/video-previews/ansals-highland-3bhk";
import { ANSALS_HIGHLAND_4BHK_PREVIEW } from "@/data/video-previews/ansals-highland-4bhk";
import { DLF_PRIMUS_PREVIEW } from "@/data/video-previews/dlf-primus";
import { DLF_SKYCOURT_PREVIEW } from "@/data/video-previews/dlf-skycourt";

const SOURCES: Record<string, string> = {
  "ansals-highland-park-2-bhk": ANSALS_HIGHLAND_2BHK_PREVIEW,
  "ansals-highland-park-3-bhk": ANSALS_HIGHLAND_3BHK_PREVIEW,
  "ansals-highland-park-4-bhk": ANSALS_HIGHLAND_4BHK_PREVIEW,
  "dlf-the-primus-sector-82a": DLF_PRIMUS_PREVIEW,
  "dlf-skycourt-sector-86": DLF_SKYCOURT_PREVIEW,
};

function decodeMp4DataUrl(value: string) {
  const prefix = "data:video/mp4;base64,";
  if (!value.startsWith(prefix)) return null;

  const binary = globalThis.atob(value.slice(prefix.length));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export const Route = createFileRoute("/media/video/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const source = SOURCES[params.slug];
        if (!source) return new Response("Not found", { status: 404 });

        const bytes = decodeMp4DataUrl(source);
        if (!bytes) return new Response("Invalid video source", { status: 500 });

        return new Response(bytes, {
          headers: {
            "content-type": "video/mp4",
            "content-length": String(bytes.byteLength),
            "cache-control": "public, max-age=31536000, immutable",
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});
