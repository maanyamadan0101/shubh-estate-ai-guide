import { createFileRoute } from "@tanstack/react-router";

const ALLOWED_UPLOADS: Record<string, { sha256: string; size: number }> = {
  "videos/2026/ansals-highland-park-2bhk-walkthrough.mp4": {
    sha256: "3b66366b4b8c3fa1ed054ebf43fb57282b3f97832d5e286a8a297f69a667eac8",
    size: 3921467,
  },
  "videos/2026/ansals-highland-park-3bhk-walkthrough.mp4": {
    sha256: "5a99d34ac5a6f898f11bb14b769251a2b068bfe39ae37482cb05283d76cc222b",
    size: 3379186,
  },
  "videos/2026/ansals-highland-park-4bhk-walkthrough.mp4": {
    sha256: "65bdd5701d8dd8d6ae80e99db2ea2ea12782c88f9f3f8bfbd674a581beed6200",
    size: 5657980,
  },
  "videos/2026/dlf-skycourt-walkthrough.mp4": {
    sha256: "1c6ce570f659943548f0d8c89ca7c65d20c09c32a70b40f07e40961e7cfabfa1",
    size: 3041194,
  },
  "videos/2026/dlf-the-primus-sector-82a-walkthrough.mp4": {
    sha256: "a635d309247425e775caf526985982200e574f1053c82d543702f4cbe32df3fe",
    size: 3959720,
  },
  "videos/2026/emaar-gurgaon-greens-sector-102-walkthrough.mp4": {
    sha256: "04e39879b4a3a1d7add19d520643fe66dcf787fcc1f6ec4500240dae43cee6f2",
    size: 2325756,
  },
  "videos/2026/tata-gurgaon-gateway-walkthrough.mp4": {
    sha256: "c600b52e10bb68121fed21da5b713fe31657331d1570d436a214299c4cc13ba7",
    size: 5114637,
  },
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function hex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export const Route = createFileRoute("/api/media-ingest")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const path = url.searchParams.get("path") ?? "";
        const expected = ALLOWED_UPLOADS[path];
        if (!expected) return json({ error: "Upload path is not approved." }, 404);
        if (request.headers.get("content-type") !== "video/mp4") {
          return json({ error: "Only video/mp4 is accepted." }, 415);
        }

        const body = await request.arrayBuffer();
        if (body.byteLength !== expected.size) {
          return json({ error: "Unexpected upload size." }, 400);
        }

        const digest = hex(await crypto.subtle.digest("SHA-256", body));
        if (digest !== expected.sha256) {
          return json({ error: "Video checksum did not match the approved file." }, 400);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.storage.from("property-images").upload(path, body, {
          contentType: "video/mp4",
          cacheControl: "31536000",
          upsert: true,
        });

        if (error) return json({ error: error.message }, 500);
        return json({ ok: true, path });
      },
    },
  },
});
