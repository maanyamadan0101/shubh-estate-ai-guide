import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function publishedClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

// Public cards only receive the compact ListingRow shape below. The additional
// identity fields are selected server-side so exact duplicate imports can be
// suppressed before they reach SSR, structured data, internal links or sitemap.
const LIST_COLUMNS =
  "id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,sector,locality,city,cover_image_url,is_luxury,updated_at,project_id,floor_number,total_floors,facing,furnishing,bedrooms,bathrooms,balconies,parking,servant_room,study_room";

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

type ListingIdentityRow = ListingRow & {
  updated_at: string;
  project_id: string | null;
  floor_number: number | null;
  total_floors: number | null;
  facing: string | null;
  furnishing: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  parking: number | null;
  servant_room: boolean | null;
  study_room: boolean | null;
};

function normalized(value: unknown) {
  if (typeof value === "string") return value.trim().toLocaleLowerCase("en-IN");
  return value ?? null;
}

function listingFingerprint(row: ListingIdentityRow) {
  return JSON.stringify([
    normalized(row.title),
    normalized(row.project_id),
    normalized(row.bhk),
    normalized(row.property_type),
    normalized(row.listing_type),
    normalized(row.status),
    row.price,
    row.area_sqft,
    normalized(row.sector),
    normalized(row.locality),
    normalized(row.city),
    row.floor_number,
    row.total_floors,
    normalized(row.facing),
    normalized(row.furnishing),
    row.bedrooms,
    row.bathrooms,
    row.balconies,
    row.parking,
    row.servant_room,
    row.study_room,
  ]);
}

function dedupeListings(rows: ListingIdentityRow[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const fingerprint = listingFingerprint(row);
    if (seen.has(fingerprint)) return false;
    seen.add(fingerprint);
    return true;
  });
}

function toListingRow(row: ListingIdentityRow): ListingRow {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    bhk: row.bhk,
    property_type: row.property_type,
    listing_type: row.listing_type,
    status: row.status,
    price: row.price,
    area_sqft: row.area_sqft,
    sector: row.sector,
    locality: row.locality,
    city: row.city,
    cover_image_url: row.cover_image_url,
    is_luxury: row.is_luxury,
  };
}

export const listPublicProperties = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        locality: z.string().optional(),
        limit: z.number().int().positive().max(60).optional(),
        excludeSlug: z.string().optional(),
        statuses: z
          .array(z.enum(["ready_to_move", "under_construction", "new_launch", "sold_out"]))
          .max(4)
          .optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    try {
      const supabase = await publishedClient();
      const requestedLimit = data.limit ?? 60;
      // Fetch a small buffer because duplicate suppression can otherwise make a
      // six-card homepage section unexpectedly return fewer than six cards.
      const queryLimit = Math.min(Math.max(requestedLimit * 3, requestedLimit), 180);
      let query = supabase
        .from("properties")
        .select(LIST_COLUMNS)
        .eq("is_published", true)
        .order("updated_at", { ascending: false })
        .limit(queryLimit);

      // Imported listings often contain combined locality labels such as
      // "New Gurugram / Dwarka Expressway". A contains match keeps those
      // listings discoverable on the relevant corridor landing page.
      if (data.locality) query = query.ilike("locality", `%${data.locality}%`);
      if (data.excludeSlug) query = query.neq("slug", data.excludeSlug);
      if (data.statuses?.length) query = query.in("status", data.statuses);

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

      const deduped = dedupeListings((rows ?? []) as unknown as ListingIdentityRow[])
        .slice(0, requestedLimit)
        .map(toListingRow);

      return { properties: deduped, error: null };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not initialise the published-property data client.";
      console.error("[Public properties]", message);
      return { properties: [] as ListingRow[], error: message };
    }
  });

export const listPublicCataloguePage = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        page: z.number().int().positive().max(100).default(1),
        pageSize: z.number().int().positive().max(24).default(12),
        q: z.string().trim().max(100).optional(),
        purpose: z.enum(["sale", "rent"]).optional(),
        status: z.enum(["ready_to_move", "under_construction", "new_launch"]).optional(),
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
        .neq("status", "sold_out")
        .order("updated_at", { ascending: false })
        .limit(240);

      if (data.purpose) query = query.eq("listing_type", data.purpose);
      if (data.status) query = query.eq("status", data.status);

      const { data: rows, error } = await query;
      if (error) {
        console.error("[Property catalogue] Could not load page:", error.code, error.message);
        return {
          properties: [] as ListingRow[],
          total: 0,
          page: data.page,
          pageSize: data.pageSize,
          error: `${error.code ?? "query_error"}: ${error.message}`,
        };
      }

      const queryText = data.q?.trim().toLocaleLowerCase("en-IN") ?? "";
      const deduped = dedupeListings((rows ?? []) as unknown as ListingIdentityRow[]).filter(
        (row) => {
          if (!queryText) return true;
          return [row.title, row.sector, row.locality, row.city, row.bhk]
            .filter(Boolean)
            .join(" ")
            .toLocaleLowerCase("en-IN")
            .includes(queryText);
        },
      );

      const total = deduped.length;
      const totalPages = Math.max(1, Math.ceil(total / data.pageSize));
      const page = Math.min(data.page, totalPages);
      const start = (page - 1) * data.pageSize;
      const properties = deduped.slice(start, start + data.pageSize).map(toListingRow);

      return { properties, total, page, pageSize: data.pageSize, error: null };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not initialise the paged property catalogue.";
      console.error("[Property catalogue]", message);
      return {
        properties: [] as ListingRow[],
        total: 0,
        page: data.page,
        pageSize: data.pageSize,
        error: message,
      };
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
      .select(LIST_COLUMNS)
      .eq("is_published", true)
      .neq("status", "sold_out")
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) {
      console.error("[Sitemap] Could not load published properties:", error.message);
      return [] as SitemapRow[];
    }

    return dedupeListings((data ?? []) as unknown as ListingIdentityRow[]).map((row) => ({
      slug: row.slug,
      updated_at: row.updated_at,
      status: row.status,
      cover_image_url: row.cover_image_url,
    }));
  } catch (error) {
    console.error("[Sitemap] Could not initialise published-property client:", error);
    return [] as SitemapRow[];
  }
});
