import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function publishedClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

// Keep the catalogue query deliberately minimal. These are the only fields the
// public listing cards need. Avoiding unrelated optional columns prevents one
// schema mismatch from hiding every published property.
const LIST_COLUMNS =
  "id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,sector,locality,city,cover_image_url,is_luxury";

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
  is_luxury: boolean;
};

export const listPublicProperties = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        locality: z.string().optional(),
        sector: z.string().optional(),
        limit: z.number().int().positive().max(60).optional(),
        excludeSlug: z.string().optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    try {
      const supabase = await publishedClient();
      let query = supabase
        .from("properties")
        .select(LIST_COLUMNS)
        .eq("is_published", true)
        .order("updated_at", { ascending: false })
        .limit(data.limit ?? 60);

      // Imported listings often contain combined locality labels such as
      // "New Gurugram / Dwarka Expressway". A contains match keeps those
      // listings discoverable on the relevant corridor landing page.
      if (data.locality) query = query.ilike("locality", `%${data.locality}%`);
      if (data.sector) query = query.ilike("sector", data.sector);
      if (data.excludeSlug) query = query.neq("slug", data.excludeSlug);

      const { data: rows, error } = await query;
      if (error) {
        console.error(
          "[Public properties] Could not load published listings:",
          error.code,
          error.message,
        );
        return {
          properties: [] as ListingRow[],
          error: `${error.code ?? "query_error"}: ${error.message}`,
        };
      }

      return { properties: (rows ?? []) as unknown as ListingRow[], error: null };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not initialise the published-property data client.";
      console.error("[Public properties]", message);
      return { properties: [] as ListingRow[], error: message };
    }
  });

export type FeatureRow = { feature_name: string; category: string };
export type SitemapRow = {
  slug: string;
  updated_at: string;
  status: string;
  cover_image_url: string | null;
};

export const getPublicProperty = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const supabase = await publishedClient();
      const { data: property, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", data.slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) {
        console.error(`[Public property] Could not load ${data.slug}:`, error.message);
        return null;
      }
      if (!property) return null;

      const [{ data: images, error: imageError }, { data: features, error: featureError }] =
        await Promise.all([
          supabase
            .from("property_images")
            .select("id,image_url,alt_text,sort_order,is_primary")
            .eq("property_id", property.id)
            .order("sort_order", { ascending: true }),
          supabase
            .from("property_features")
            .select("feature_name,category")
            .eq("property_id", property.id),
        ]);

      if (imageError)
        console.error(
          `[Public property] Could not load images for ${data.slug}:`,
          imageError.message,
        );
      if (featureError)
        console.error(
          `[Public property] Could not load features for ${data.slug}:`,
          featureError.message,
        );

      const rows = (features ?? []) as FeatureRow[];
      return {
        property,
        images: images ?? [],
        amenities: rows.filter((f) => f.category === "amenity").map((f) => f.feature_name),
        features: rows.filter((f) => f.category === "feature").map((f) => f.feature_name),
        videos: rows.filter((f) => f.category === "video").map((f) => f.feature_name),
      };
    } catch (error) {
      console.error(
        `[Public property] Could not initialise published-property client for ${data.slug}:`,
        error,
      );
      return null;
    }
  });

export const listSitemapProperties = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabase = await publishedClient();
    const { data, error } = await supabase
      .from("properties")
      .select("slug,updated_at,status,cover_image_url")
      .eq("is_published", true)
      .neq("status", "sold_out");
    if (error) {
      console.error("[Sitemap] Could not load published properties:", error.message);
      return [] as SitemapRow[];
    }
    return (data ?? []) as SitemapRow[];
  } catch (error) {
    console.error("[Sitemap] Could not initialise published-property client:", error);
    return [] as SitemapRow[];
  }
});
