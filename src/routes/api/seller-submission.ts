import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendEnquiryNotification } from "@/lib/enquiry-email.server";

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
  inquiry_type: z.enum(["sell", "rent_out", "mandate"]).default("sell"),
  submission_channel: z.enum(["seller_private_link", "owner_service_page"]).default("seller_private_link"),
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(30),
  whatsapp: z.string().trim().max(30).default(""),
  email: z.string().trim().email().max(255).or(z.literal("")),
  is_nri: z.boolean().default(false),
  country: z.string().trim().max(80).default(""),
  project: z.string().trim().min(2).max(160),
  sector: z.string().trim().max(80).default(""),
  property_type: z.string().trim().max(60).default("Apartment"),
  configuration: z.string().trim().max(80).default(""),
  area_sqft: z.string().trim().max(30).default(""),
  floor: z.string().trim().max(40).default(""),
  facing: z.string().trim().max(80).default(""),
  expected_price: z.string().trim().max(60).default(""),
  occupancy: z.string().trim().max(80).default(""),
  availability: z.string().trim().max(120).default(""),
  loan_outstanding: z.string().trim().max(160).default(""),
  contact_preference: z.string().trim().max(80).default(""),
  property_documents: z.string().trim().max(500).default(""),
  mandate_period: z.string().trim().max(80).default(""),
  media_link: z.string().trim().max(800).default(""),
  notes: z.string().trim().max(2500).default(""),
  source_url: z.string().trim().max(800).default(""),
  landing_page: z.string().trim().max(240).default(""),
  referrer: z.string().trim().max(240).default(""),
  utm_source: z.string().trim().max(100).default(""),
  utm_medium: z.string().trim().max(100).default(""),
  utm_campaign: z.string().trim().max(150).default(""),
  utm_term: z.string().trim().max(150).default(""),
  utm_content: z.string().trim().max(150).default(""),
  website: z.string().max(200).default(""),
  media: z.array(mediaSchema).max(12).default([]),
});

type EnquiryLabels = {
  interest: string;
  category: "seller_submission" | "rent_out" | "selling_mandate";
  referenceLabel: string;
};

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

function enquiryLabels(inquiryType: z.infer<typeof submissionSchema>["inquiry_type"]): EnquiryLabels {
  if (inquiryType === "rent_out") {
    return {
      interest: "Rent out property in Gurgaon / tenant placement enquiry",
      category: "rent_out",
      referenceLabel: "Expected rent",
    };
  }
  if (inquiryType === "mandate") {
    return {
      interest: "Exclusive selling mandate enquiry in Gurgaon",
      category: "selling_mandate",
      referenceLabel: "Expected selling price",
    };
  }
  return {
    interest: "Sell property in Gurgaon owner enquiry",
    category: "seller_submission",
    referenceLabel: "Expected selling price",
  };
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
          const labels = enquiryLabels(input.inquiry_type);

          const privateDetails = {
            reference,
            private_submission: true,
            publish_status: "NOT_PUBLISHED",
            enquiry_type: input.inquiry_type,
            submission_channel: input.submission_channel,
            owner: {
              is_nri: input.is_nri,
              country: input.country || null,
              whatsapp: input.whatsapp || null,
              contact_preference: input.contact_preference || null,
            },
            property: {
              project: input.project,
              sector: input.sector || null,
              property_type: input.property_type,
              configuration: input.configuration || null,
              area_sqft: input.area_sqft || null,
              floor: input.floor || null,
              facing: input.facing || null,
              expected_price_or_rent: input.expected_price || null,
              occupancy: input.occupancy || null,
              availability: input.availability || null,
              loan_outstanding: input.loan_outstanding || null,
              property_documents: input.property_documents || null,
              mandate_period: input.mandate_period || null,
            },
            attribution: {
              source_url: input.source_url || null,
              landing_page: input.landing_page || null,
              referrer: input.referrer || null,
              utm_source: input.utm_source || null,
              utm_medium: input.utm_medium || null,
              utm_campaign: input.utm_campaign || null,
              utm_term: input.utm_term || null,
              utm_content: input.utm_content || null,
            },
            media_link: input.media_link || null,
            notes: input.notes || null,
            private_media_paths: mediaRows.map(({ path, kind, name }) => ({ path, kind, name })),
          };

          const interest =
            input.submission_channel === "seller_private_link" && input.inquiry_type === "sell"
              ? input.is_nri
                ? "Private overseas seller property submission"
                : "Private seller property submission"
              : labels.interest;
          const source = input.submission_channel === "owner_service_page" ? "owner_service_page" : "seller_private_link";

          const { data: enquiry, error: insertError } = await supabaseAdmin
            .from("enquiries")
            .insert({
              property_id: null,
              full_name: input.full_name,
              phone: input.phone,
              email: input.email || null,
              message: JSON.stringify(privateDetails),
              interest,
              source,
            })
            .select("id")
            .single();

          if (insertError) throw new Error(`Could not save your property: ${insertError.message}`);

          const notificationReference = [
            `Reference: ${reference}`,
            `Enquiry type: ${input.inquiry_type}`,
            input.source_url ? `Source page: ${input.source_url}` : "",
            input.landing_page ? `Landing page: ${input.landing_page}` : "",
            input.referrer ? `Referrer: ${input.referrer}` : "",
            input.utm_source ? `UTM source: ${input.utm_source}` : "",
            input.utm_medium ? `UTM medium: ${input.utm_medium}` : "",
            input.utm_campaign ? `UTM campaign: ${input.utm_campaign}` : "",
          ]
            .filter(Boolean)
            .join(" | ")
            .slice(0, 1500);

          await sendEnquiryNotification({
            enquiryId: enquiry.id,
            reference: notificationReference,
            category: labels.category,
            fullName: input.full_name,
            phone: input.phone,
            email: input.email || null,
            interest,
            source,
            project: input.project,
            sector: input.sector || null,
            expectedPrice: input.expected_price || null,
            message: [
              input.configuration ? `Configuration: ${input.configuration}` : "",
              input.area_sqft ? `Area: ${input.area_sqft}` : "",
              input.floor ? `Floor: ${input.floor}` : "",
              input.facing ? `Facing / view: ${input.facing}` : "",
              input.expected_price ? `${labels.referenceLabel}: ${input.expected_price}` : "",
              input.occupancy ? `Occupancy: ${input.occupancy}` : "",
              input.availability ? `Visit / possession availability: ${input.availability}` : "",
              input.loan_outstanding ? `Loan outstanding: ${input.loan_outstanding}` : "",
              input.whatsapp ? `WhatsApp: ${input.whatsapp}` : "",
              input.contact_preference ? `Preferred contact: ${input.contact_preference}` : "",
              input.country ? `Owner country: ${input.country}` : "",
              input.property_documents ? `Documents available: ${input.property_documents}` : "",
              input.mandate_period ? `Preferred mandate period: ${input.mandate_period}` : "",
              input.media_link ? `Media link: ${input.media_link}` : "",
              input.notes || "",
            ]
              .filter(Boolean)
              .join("\n"),
          });

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
