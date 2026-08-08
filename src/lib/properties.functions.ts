import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

const LIST_COLUMNS =
  "id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,sector,locality,city,cover_image_url,tags,is_featured,is_luxury,updated_at";

export type ListingRow = {
  id: string;
  title: string;
  slug: string;
  bhk: string | null;
  property_type: string;
  listing_type: string;
  status: string;
  price: number;
  area_sqft: number | null;
  sector: string | null;
  locality: string | null;
  city: string;
  cover_image_url: string | null;
  tags: string[];
  is_featured: boolean;
  is_luxury: boolean;
  updated_at: string;
};

export const listPublicProperties = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        locality: z.string().optional(),
        luxury: z.boolean().optional(),
        limit: z.number().int().positive().max(60).optional(),
        excludeSlug: z.string().optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    let query = publicClient()
      .from("properties")
      .select(LIST_COLUMNS)
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(data.limit ?? 60);

    if (data.locality) query = query.eq("locality", data.locality);
    if (data.luxury) query = query.eq("is_luxury", true);
    if (data.excludeSlug) query = query.neq("slug", data.excludeSlug);

    const { data: rows, error } = await query;
    if (error) return { properties: [] as ListingRow[], error: error.message };
    return { properties: (rows ?? []) as unknown as ListingRow[], error: null };
  });

export const getPublicProperty = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: property, error } = await supabase
      .from("properties")
      .select(
        "*, builder:builders(id,name,slug,description,website), project:projects(id,name,slug,locality,sector,rera_number,possession_date,description)",
      )
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !property) return null;

    const [{ data: images }, { data: features }] = await Promise.all([
      supabase
        .from("property_images")
        .select("id,image_url,alt_text,sort_order,is_primary")
        .eq("property_id", property.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("property_features")
        .select("id,feature_name,category")
        .eq("property_id", property.id),
    ]);

    return {
      property,
      images: images ?? [],
      amenities: (features ?? []).filter((f) => f.category === "amenity").map((f) => f.feature_name),
      features: (features ?? []).filter((f) => f.category !== "amenity").map((f) => f.feature_name),
    };
  });

export const listSitemapProperties = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("properties")
    .select("slug,updated_at,status")
    .eq("is_published", true)
    .neq("status", "sold_out");
  return data ?? [];
});
