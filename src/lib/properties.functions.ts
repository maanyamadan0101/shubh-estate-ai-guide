import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function publishedClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
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
    const supabase = await publishedClient();
    let query = supabase
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
    if (error) {
      console.error("[Public properties] Could not load published listings:", error.message);
      return { properties: [] as ListingRow[], error: error.message };
    }
    return { properties: (rows ?? []) as unknown as ListingRow[], error: null };
  });

export type FeatureRow = { feature_name: string; category: string };
export type SitemapRow = { slug: string; updated_at: string; status: string };

export const getPublicProperty = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const supabase = await publishedClient();
    const { data: property, error } = await supabase
      .from("properties")
      .select(
        "*, builder:builders(id,name,slug,description,website), project:projects(id,name,slug,locality,sector,rera_number,possession_date,description)",
      )
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error(`[Public property] Could not load ${data.slug}:`, error.message);
      return null;
    }
    if (!property) return null;

    const [{ data: images, error: imageError }, { data: features, error: featureError }] = await Promise.all([
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

    if (imageError) console.error(`[Public property] Could not load images for ${data.slug}:`, imageError.message);
    if (featureError) console.error(`[Public property] Could not load features for ${data.slug}:`, featureError.message);

    const rows = (features ?? []) as FeatureRow[];
    return {
      property,
      images: images ?? [],
      amenities: rows.filter((f) => f.category === "amenity").map((f) => f.feature_name),
      features: rows.filter((f) => f.category === "feature").map((f) => f.feature_name),
      videos: rows.filter((f) => f.category === "video").map((f) => f.feature_name),
    };
  });

export const listSitemapProperties = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await publishedClient();
  const { data, error } = await supabase
    .from("properties")
    .select("slug,updated_at,status")
    .eq("is_published", true)
    .neq("status", "sold_out");
  if (error) {
    console.error("[Sitemap] Could not load published properties:", error.message);
    return [] as SitemapRow[];
  }
  return (data ?? []) as SitemapRow[];
});
