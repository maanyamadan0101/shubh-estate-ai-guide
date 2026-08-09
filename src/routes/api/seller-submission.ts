import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const BUCKET = "seller-submissions";
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const mediaSchema = z.object({
  kind: z.enum(["image", "video"]),
  name: z.string().trim().min(1).max(180),
  extension: z.string().trim().toLowerCase().regex(/^[a-z0-9]{2,5}$/),
  contentType: z.string().trim().min(1).max(100),
  size: z.number().int().positive(),
});

const submissionSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(255).or(z.literal("")),
  is_nri: z.boolean().default(false),
  country: z.string().trim().max(80).default(""),
  project: z.string().trim().min(2).max(160),
  sector: z.string().trim().max(80).default(""),
  property_type: z.string().trim().max(60).default("Apartment"),
  configuration: z.string().trim().max(80).default(""),
  area_sqft: z.string().trim().max(30).default(""),
  floor: z.string().trim().max(40).default(""),
  facing: z.string().trim().max(40).default(""),
  expected_price: z.string().trim().max(60).default(""),
  occupancy: z.string().trim().max(80).default(""),
  availability: z.string().trim().max(120).default(""),
  media_link: z.string().trim().max(800).default(""),
  notes: z.string().trim().max(2500).default(""),
  website: z.string().max(200).default(""),
  media: z.array(mediaSchema).max(12).default([]),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function validateMedia(media: z.infer<typeof mediaSchema>[]) {
  const images = media.filter((item) => item.kind === "image");
  const videos = media.filter((item) => item.kind === "video");
  if (images.length > 10) throw new Error("Upload up to 10 photos at a time.");
  if (videos.length > 2) throw new Error("Upload up to 2 videos at a time.");

  for (const item of media) {
    if (item.kind === "image") {
      if (!IMAGE_TYPES.has(item.contentType)) throw new Error(`Unsupported photo format: ${item.name}`);
      if (item.size > MAX_IMAGE_BYTES) throw new Error(`${item.name} is larger than 10 MB.`);
    } else {
      if (!VIDEO_TYPES.has(item.contentType)) throw new Error(`Unsupported video format: ${item.name}`);
      if (item.size > MAX_VIDEO_BYTES) throw new Error(`${item.name} is larger than 50 MB.`);
    }
  }
}

async function ensurePrivateBucket() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) throw new Error(`Could not check private media storage: ${listError.message}`);

  if (!(buckets ?? []).some((bucket) => bucket.name === BUCKET)) {
    const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET, {
      public: false,
      fileSizeLimit: MAX_VIDEO_BYTES,
      allowedMimeTypes: [...IMAGE_TYPES, ...VIDEO_TYPES],
    });
    if (createError && !/already exists/i.test(createError.message)) {
      throw new Error(`Could not prepare private media storage: ${createError.message}`);
    }
  }
  return supabaseAdmin;
}

export const Route = createFileRoute("/api/seller-submission")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = submissionSchema.safeParse(await request.json());
          if (!parsed.success) return json({ error: "Please check the property details and try again." }, 400);
          const input = parsed.data;

          // Quietly accept bot-filled honeypot submissions without storing anything.
          if (input.website.trim()) return json({ ok: true, reference: "received", uploads: [] });

          validateMedia(input.media);
          const supabaseAdmin = await ensurePrivateBucket();
          const reference = globalThis.crypto.randomUUID();
          const mediaRows = input.media.map((item, index) => ({
            index,
            kind: item.kind,
            name: item.name,
            contentType: item.contentType,
            size: item.size,
            path: `${reference}/${item.kind === "image" ? "photos" : "videos"}/${globalThis.crypto.randomUUID()}.${item.extension}`,
          }));

          const privateDetails = {
            reference,
            private_submission: true,
            publish_status: "NOT_PUBLISHED",
            seller: {
              is_nri: input.is_nri,
              country: input.country || null,
            },
            property: {
              project: input.project,
              sector: input.sector || null,
              property_type: input.property_type,
              configuration: input.configuration || null,
              area_sqft: input.area_sqft || null,
              floor: input.floor || null,
              facing: input.facing || null,
              expected_price: input.expected_price || null,
              occupancy: input.occupancy || null,
              availability: input.availability || null,
            },
            media_link: input.media_link || null,
            notes: input.notes || null,
            private_media_paths: mediaRows.map(({ path, kind, name }) => ({ path, kind, name })),
          };

          const { data: enquiry, error: insertError } = await supabaseAdmin
            .from("enquiries")
            .insert({
              property_id: null,
              full_name: input.full_name,
              phone: input.phone,
              email: input.email || null,
              message: JSON.stringify(privateDetails),
              interest: input.is_nri ? "Private NRI seller property submission" : "Private seller property submission",
              source: "seller_private_link",
            })
            .select("id")
            .single();

          if (insertError) throw new Error(`Could not save your property: ${insertError.message}`);

          const uploads: Array<{ index: number; path: string; token: string }> = [];
          for (const item of mediaRows) {
            const { data: signed, error } = await supabaseAdmin.storage.from(BUCKET).createSignedUploadUrl(item.path);
            if (error || !signed?.token) {
              throw new Error(`Property details were saved, but media upload could not be prepared for ${item.name}. Please send media by WhatsApp.`);
            }
            uploads.push({ index: item.index, path: item.path, token: signed.token });
          }

          return json({ ok: true, submissionId: enquiry.id, reference, bucket: BUCKET, uploads });
        } catch (error) {
          console.error("[Seller submission]", error);
          return json({ error: error instanceof Error ? error.message : "Could not submit the property." }, 500);
        }
      },
    },
  },
});
