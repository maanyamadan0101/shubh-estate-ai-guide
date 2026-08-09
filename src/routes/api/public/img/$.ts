import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const uploadSchema = z.object({
  kind: z.enum(["image", "video"]),
  extension: z.string().trim().toLowerCase().regex(/^[a-z0-9]{2,5}$/),
  contentType: z.string().trim().min(1).max(100),
});

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm"]);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/public/img/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("property-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(data.stream(), {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
      POST: async ({ request, params }) => {
        const routePath = (params as { _splat?: string })._splat ?? "";
        if (routePath !== "upload") return json({ error: "Not found" }, 404);

        try {
          const authHeader = request.headers.get("authorization");
          if (!authHeader?.startsWith("Bearer ")) {
            return json({ error: "Your login session was not sent. Please refresh Admin and try again." }, 401);
          }

          const accessToken = authHeader.slice("Bearer ".length).trim();
          if (!accessToken) return json({ error: "Your login session is missing. Please sign in again." }, 401);

          const parsed = uploadSchema.safeParse(await request.json());
          if (!parsed.success) return json({ error: "Invalid upload request." }, 400);
          const input = parsed.data;

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
          const user = authData?.user;
          if (authError || !user?.id) {
            return json({ error: "Your login session is no longer valid. Please sign in again." }, 401);
          }

          const { data: roles, error: roleError } = await supabaseAdmin
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id);
          if (roleError) return json({ error: roleError.message }, 500);

          const canUpload = (roles ?? []).some((row) => row.role === "admin" || row.role === "editor");
          if (!canUpload) return json({ error: "Only an admin or editor can upload property media." }, 403);

          const allowedExtensions = input.kind === "image" ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;
          if (!allowedExtensions.has(input.extension)) {
            return json(
              { error: input.kind === "image" ? "Unsupported image format." : "Only MP4 and WebM videos are supported." },
              400,
            );
          }
          if (input.kind === "image" && !input.contentType.startsWith("image/")) {
            return json({ error: "Invalid image file type." }, 400);
          }
          if (input.kind === "video" && !["video/mp4", "video/webm"].includes(input.contentType)) {
            return json({ error: "Invalid video file type." }, 400);
          }

          const year = new Date().getFullYear();
          const folder = input.kind === "video" ? `videos/${year}` : `${year}`;
          const storagePath = `${folder}/${globalThis.crypto.randomUUID()}.${input.extension}`;
          const { data: signed, error } = await supabaseAdmin.storage
            .from("property-images")
            .createSignedUploadUrl(storagePath);

          if (error) return json({ error: `Could not prepare upload: ${error.message}` }, 500);
          if (!signed?.token) return json({ error: "Could not prepare upload token." }, 500);

          return json({ path: storagePath, token: signed.token });
        } catch (error) {
          console.error("[Media upload]", error);
          return json({ error: error instanceof Error ? error.message : "Could not prepare upload." }, 500);
        }
      },
    },
  },
});
