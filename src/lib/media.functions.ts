import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const uploadRequestSchema = z.object({
  kind: z.enum(["image", "video"]),
  extension: z.string().trim().toLowerCase().regex(/^[a-z0-9]{2,5}$/),
  contentType: z.string().trim().min(1).max(100),
});

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm"]);

export const createMediaUploadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => uploadRequestSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: roles, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (roleError) throw new Error(roleError.message);
    const canUpload = (roles ?? []).some((row) => row.role === "admin" || row.role === "editor");
    if (!canUpload) throw new Error("Only an admin or editor can upload property media.");

    const allowedExtensions = data.kind === "image" ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;
    if (!allowedExtensions.has(data.extension)) {
      throw new Error(data.kind === "image" ? "Unsupported image format." : "Only MP4 and WebM videos are supported.");
    }
    if (data.kind === "image" && !data.contentType.startsWith("image/")) {
      throw new Error("Invalid image file type.");
    }
    if (data.kind === "video" && !["video/mp4", "video/webm"].includes(data.contentType)) {
      throw new Error("Invalid video file type.");
    }

    const year = new Date().getFullYear();
    const folder = data.kind === "video" ? `videos/${year}` : `${year}`;
    const path = `${folder}/${globalThis.crypto.randomUUID()}.${data.extension}`;

    const { data: signed, error } = await supabaseAdmin.storage
      .from("property-images")
      .createSignedUploadUrl(path);

    if (error) throw new Error(`Could not prepare upload: ${error.message}`);
    if (!signed?.token) throw new Error("Could not prepare upload token.");

    return { path, token: signed.token };
  });
