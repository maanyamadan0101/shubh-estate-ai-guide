import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

export const listAdminProperties = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("properties")
      .select("id,title,slug,bhk,sector,locality,price,status,listing_type,is_published,is_luxury,updated_at,cover_image_url")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
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
    return {
      property,
      images: images ?? [],
      amenities: (features ?? []).filter((f) => f.category === "amenity").map((f) => f.feature_name),
      features: (features ?? []).filter((f) => f.category !== "amenity").map((f) => f.feature_name),
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
    const { id, amenities, features, images, ...fields } = data;

    const row = { ...fields } as never;
    

    let propertyId = id ?? null;
    if (propertyId) {
      const { error } = await context.supabase.from("properties").update(row).eq("id", propertyId);
      if (error) throw new Error(error.message);
    } else {
      const { data: inserted, error } = await context.supabase
        .from("properties")
        .insert({ ...row, created_by: context.userId } as never)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      propertyId = inserted.id;
    }

    await context.supabase.from("property_images").delete().eq("property_id", propertyId!);
    if (images.length) {
      const { error } = await context.supabase.from("property_images").insert(
        images.map((img, i) => ({
          property_id: propertyId!,
          image_url: img.image_url,
          alt_text: img.alt_text,
          sort_order: i,
          is_primary: img.is_primary,
        })),
      );
      if (error) throw new Error(error.message);
    }

    await context.supabase.from("property_features").delete().eq("property_id", propertyId!);
    const featureRows = [
      ...amenities.map((name) => ({ property_id: propertyId!, feature_name: name, category: "amenity" })),
      ...features.map((name) => ({ property_id: propertyId!, feature_name: name, category: "feature" })),
    ];
    if (featureRows.length) {
      const { error } = await context.supabase.from("property_features").insert(featureRows);
      if (error) throw new Error(error.message);
    }

    return { id: propertyId!, slug: data.slug };
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
    const { error } = await context.supabase.from("properties").update(patch).eq("id", data.id);
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
