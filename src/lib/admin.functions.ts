import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { buildCanonical, listingReference, listingReferenceSlug, slugify } from "@/lib/seo";

/** Grants the admin role to the first signed-in user when no admin exists yet. */
export const bootstrapAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { granted: false };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { granted: true };
  });

export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const roles = (data ?? []).map((r) => r.role as string);
    return { roles, canEdit: roles.some((r) => r === "admin" || r === "editor") };
  });

export type AdminPropertyRow = {
  id: string;
  title: string;
  slug: string;
  bhk: string | null;
  sector: string | null;
  locality: string | null;
  price: number | string;
  status: string;
  listing_type: string;
  is_published: boolean;
  is_luxury: boolean;
  updated_at: string;
  cover_image_url: string | null;
};
export type AdminImageRow = { id: string; image_url: string; alt_text: string | null; sort_order: number; is_primary: boolean };
export type FeatureRow = { feature_name: string; category: string };

export const listAdminProperties = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("properties")
      .select("id,title,slug,bhk,sector,locality,price,status,listing_type,is_published,is_luxury,updated_at,cover_image_url")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminPropertyRow[];
  });

export const getAdminProperty = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: property, error } = await context.supabase
      .from("properties")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!property) return null;
    const [{ data: images }, { data: features }] = await Promise.all([
      context.supabase
        .from("property_images")
        .select("id,image_url,alt_text,sort_order,is_primary")
        .eq("property_id", data.id)
        .order("sort_order", { ascending: true }),
      context.supabase.from("property_features").select("feature_name,category").eq("property_id", data.id),
    ]);
    const rows = (features ?? []) as FeatureRow[];
    return {
      property,
      images: (images ?? []) as AdminImageRow[],
      amenities: rows.filter((f) => f.category === "amenity").map((f) => f.feature_name),
      features: rows.filter((f) => f.category === "feature").map((f) => f.feature_name),
      videos: rows.filter((f) => f.category === "video").map((f) => f.feature_name),
    };
  });

export const listTaxonomy = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [{ data: builders }, { data: projects }] = await Promise.all([
      context.supabase.from("builders").select("id,name").order("name"),
      context.supabase.from("projects").select("id,name,builder_id").order("name"),
    ]);
    return { builders: builders ?? [], projects: projects ?? [] };
  });

const duplicateCheckSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  listing_type: z.enum(["sale", "rent"]),
  property_type: z.enum(["apartment", "builder_floor", "villa", "plot", "commercial", "office", "retail"]),
  bhk: z.string().max(40).nullable(),
  project_id: z.string().uuid().nullable(),
  sector: z.string().max(80).nullable(),
  area_sqft: z.number().nonnegative().nullable(),
  floor_number: z.number().int().nullable(),
  facing: z.string().max(40).nullable(),
});

export const findPotentialPropertyDuplicates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => duplicateCheckSchema.parse(input))
  .handler(async ({ context, data }) => {
    let query = context.supabase
      .from("properties")
      .select("id,title,slug,bhk,project_id,sector,area_sqft,floor_number,facing,listing_type,property_type,is_published")
      .eq("listing_type", data.listing_type)
      .eq("property_type", data.property_type)
      .limit(20);

    if (data.id) query = query.neq("id", data.id);
    if (data.project_id) query = query.eq("project_id", data.project_id);
    else if (data.sector) query = query.ilike("sector", data.sector);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);

    const norm = (value: string | null | undefined) => value?.trim().toLowerCase() ?? "";
    const candidates = (rows ?? [])
      .map((row) => {
        let score = 0;
        const reasons: string[] = [];
        if (data.project_id && row.project_id === data.project_id) {
          score += 3;
          reasons.push("same project");
        } else if (data.sector && norm(row.sector) === norm(data.sector)) {
          score += 2;
          reasons.push("same sector");
        }
        if (data.bhk && norm(row.bhk) === norm(data.bhk)) {
          score += 2;
          reasons.push("same configuration");
        }
        if (data.area_sqft && row.area_sqft && Math.abs(Number(row.area_sqft) - data.area_sqft) <= 10) {
          score += 2;
          reasons.push("same area");
        }
        if (data.floor_number !== null && data.floor_number !== undefined && row.floor_number === data.floor_number) {
          score += 2;
          reasons.push("same floor");
        }
        if (data.facing && norm(row.facing) === norm(data.facing)) {
          score += 1;
          reasons.push("same facing");
        }
        return {
          id: row.id,
          title: row.title,
          slug: row.slug,
          reference: listingReference(row.id),
          is_published: row.is_published,
          score,
          reasons,
        };
      })
      .filter((candidate) => candidate.score >= 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return { candidates };
  });

const propertySchema = z.object({
  id: z.string().uuid().nullable().optional(),
  title: z.string().trim().min(3).max(160),
  slug: z.string().trim().min(3).max(120),
  listing_type: z.enum(["sale", "rent"]),
  property_type: z.enum(["apartment", "builder_floor", "villa", "plot", "commercial", "office", "retail"]),
  status: z.enum(["ready_to_move", "under_construction", "new_launch", "sold_out"]),
  bhk: z.string().max(40).nullable(),
  project_id: z.string().uuid().nullable(),
  builder_id: z.string().uuid().nullable(),
  sector: z.string().max(80).nullable(),
  locality: z.string().max(120).nullable(),
  city: z.string().max(80),
  price: z.number().nonnegative(),
  area_sqft: z.number().nonnegative().nullable(),
  carpet_area_sqft: z.number().nonnegative().nullable(),
  bathrooms: z.number().int().nonnegative().nullable(),
  balconies: z.number().int().nonnegative().nullable(),
  floor_number: z.number().int().nullable(),
  total_floors: z.number().int().nullable(),
  facing: z.string().max(40).nullable(),
  furnishing: z.string().max(40).nullable(),
  parking: z.number().int().nonnegative(),
  servant_room: z.boolean(),
  study_room: z.boolean(),
  rera_number: z.string().max(120).nullable(),
  description: z.string().max(20000).nullable(),
  is_published: z.boolean(),
  is_featured: z.boolean(),
  is_luxury: z.boolean(),
  meta_title: z.string().max(200).nullable(),
  meta_description: z.string().max(400).nullable(),
  og_title: z.string().max(200).nullable(),
  og_description: z.string().max(400).nullable(),
  canonical_url: z.string().max(400).nullable(),
  cover_image_url: z.string().max(600).nullable(),
  amenities: z.array(z.string().trim().min(1).max(80)).max(60),
  features: z.array(z.string().trim().min(1).max(80)).max(60),
  videos: z.array(z.string().trim().min(1).max(600)).max(4),
  images: z
    .array(
      z.object({
        image_url: z.string().min(1).max(600),
        alt_text: z.string().max(300).nullable(),
        is_primary: z.boolean(),
      }),
    )
    .max(40),
});

export const savePropertyDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => propertySchema.parse(input))
  .handler(async ({ context, data }) => {
    const { id, amenities, features, videos, images, ...fields } = data;
    const propertyId = id ?? crypto.randomUUID();

    const baseSlug = slugify(fields.slug.replace(/-+$/g, "")).slice(0, 120);
    if (!baseSlug) throw new Error("Could not create a property URL. Please add more property details and try again.");

    const stableSuffix = listingReferenceSlug(propertyId);
    const candidates = [baseSlug, `${baseSlug.slice(0, 120 - stableSuffix.length - 1)}-${stableSuffix}`];
    let uniqueSlug = "";

    for (const candidate of candidates) {
      let conflictQuery = context.supabase.from("properties").select("id").eq("slug", candidate).limit(1);
      conflictQuery = conflictQuery.neq("id", propertyId);
      const { data: conflicts, error: conflictError } = await conflictQuery;
      if (conflictError) throw new Error(conflictError.message);
      if (!conflicts?.length) {
        uniqueSlug = candidate;
        break;
      }
    }

    if (!uniqueSlug) {
      throw new Error("Could not create a unique property URL. Please add a distinguishing floor, area, facing or project detail and try again.");
    }

    const normalizedFields = {
      ...fields,
      slug: uniqueSlug,
      canonical_url: buildCanonical(uniqueSlug),
    };
    const row = { ...normalizedFields } as never;

    if (id) {
      const { error } = await context.supabase.from("properties").update(row).eq("id", propertyId);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase
        .from("properties")
        .insert({ id: propertyId, ...normalizedFields, created_by: context.userId } as never);
      if (error) throw new Error(error.message);
    }

    await context.supabase.from("property_images").delete().eq("property_id", propertyId);
    if (images.length) {
      const { error } = await context.supabase.from("property_images").insert(
        images.map((img, i) => ({
          property_id: propertyId,
          image_url: img.image_url,
          alt_text: img.alt_text,
          sort_order: i,
          is_primary: img.is_primary,
        })),
      );
      if (error) throw new Error(error.message);
    }

    await context.supabase.from("property_features").delete().eq("property_id", propertyId);
    const featureRows = [
      ...amenities.map((name) => ({ property_id: propertyId, feature_name: name, category: "amenity" })),
      ...features.map((name) => ({ property_id: propertyId, feature_name: name, category: "feature" })),
      ...videos.map((url) => ({ property_id: propertyId, feature_name: url, category: "video" })),
    ];
    if (featureRows.length) {
      const { error } = await context.supabase.from("property_features").insert(featureRows);
      if (error) throw new Error(error.message);
    }

    return { id: propertyId, slug: uniqueSlug, reference: listingReference(propertyId) };
  });

export const setPropertyState = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        is_published: z.boolean().optional(),
        status: z.enum(["ready_to_move", "under_construction", "new_launch", "sold_out"]).optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const patch: Record<string, unknown> = {};
    if (data.is_published !== undefined) {
      patch["is_published"] = data.is_published;
      if (data.is_published) patch["published_at"] = new Date().toISOString();
    }
    if (data.status) patch["status"] = data.status;
    const { error } = await context.supabase.from("properties").update(patch as never).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await context.supabase.from("property_images").delete().eq("property_id", data.id);
    await context.supabase.from("property_features").delete().eq("property_id", data.id);
    const { error } = await context.supabase.from("properties").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const generateDescription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ prompt: z.string().min(10).max(4000) }).parse(input),
  )
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { text: "", error: "AI is not configured." };
    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content:
                "You write factual, elegant real-estate listing descriptions for a Gurugram advisory firm serving NRI, HNI and end-user buyers. 150-220 words, natural language, no keyword stuffing, no invented facts, no emojis, no headings. Use only the details provided.",
            },
            { role: "user", content: data.prompt },
          ],
        }),
      });
      if (!response.ok) return { text: "", error: "AI service unavailable right now." };
      const json = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
      return { text: json.choices?.[0]?.message?.content?.trim() ?? "", error: null };
    } catch {
      return { text: "", error: "AI service unavailable right now." };
    }
  });
