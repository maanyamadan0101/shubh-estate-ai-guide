import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DWARKA_CATALOGUE_LISTINGS } from "@/data/dwarka-catalogue-listings";
import { GURGAON_DIRECTORY_PROJECTS } from "@/data/gurgaon-project-directory";

async function publishedClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

// Keep public property queries deliberately limited to columns already proven
// against the production database. This prevents a stale generated type from
// turning one missing optional column into an empty public catalogue.
const LIST_COLUMNS =
  "id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,carpet_area_sqft,floor_number,total_floors,facing,furnishing,sector,locality,city,cover_image_url,is_luxury,updated_at";
const SITEMAP_COLUMNS = LIST_COLUMNS;

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
  carpet_area_sqft?: number | null;
  floor_number?: number | null;
  total_floors?: number | null;
  facing?: string | null;
  furnishing?: string | null;
  sector: string | null;
  locality: string | null;
  city: string;
  cover_image_url: string | null;
  is_luxury: boolean;
  updated_at?: string;
};

type SitemapIdentityRow = ListingRow & { updated_at: string };

function listingDisplayFingerprint(row: ListingRow) {
  return [
    row.title,
    row.bhk,
    row.property_type,
    row.listing_type,
    row.status,
    row.price,
    row.area_sqft,
    row.sector,
    row.locality,
    row.city,
  ]
    .map((value) =>
      String(value ?? "")
        .trim()
        .toLocaleLowerCase("en-IN"),
    )
    .join("|");
}

function dedupeLocationListings(rows: ListingRow[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const fingerprint = listingDisplayFingerprint(row);
    if (seen.has(fingerprint)) return false;
    seen.add(fingerprint);
    return true;
  });
}

function normalizedProjectText(value: string) {
  return value
    .toLocaleLowerCase("en-IN")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// These three corrections reflect owner/source instructions already confirmed
// with Shubh Estate Brokers. They protect public catalogue cards and detail data
// from stale imported fields until the underlying production rows are edited.
export function applyConfirmedInventoryCorrections<T extends ListingRow>(row: T): T {
  const title = normalizedProjectText(row.title);

  if (title.includes("residency grand")) {
    const repeatedSectorLocality =
      row.locality && normalizedProjectText(row.locality) === "sector 52" ? null : row.locality;
    return {
      ...row,
      bhk: "4 BHK",
      price: 36_000_000,
      area_sqft: 2900,
      floor_number: 6,
      sector: "Sector 52",
      locality: repeatedSectorLocality,
    } as T;
  }

  if (title.includes("vatika sovereign")) {
    return {
      ...row,
      bhk: "4 BHK + servant",
      price: 50_000_000,
      area_sqft: 3000,
      carpet_area_sqft: 2999,
      floor_number: 3,
      sector: "Sector 49",
    } as T;
  }

  if (title.includes("puri emerald bay")) {
    return {
      ...row,
      bhk: "3 BHK + servant",
      price: 32_500_000,
      area_sqft: 2450,
      floor_number: 15,
      facing: "North-East",
      sector: "Sector 104",
    } as T;
  }

  return row;
}

const PROJECT_INVENTORY_MATCHES = GURGAON_DIRECTORY_PROJECTS.flatMap((project) =>
  project.inventoryAliases.map((alias) => ({
    projectName: project.name,
    alias: normalizedProjectText(alias),
  })),
).sort((a, b) => b.alias.length - a.alias.length);

function countCurrentProjectUnits(rows: ListingRow[]) {
  const counts: Record<string, number> = {};
  for (const row of rows) {
    const title = normalizedProjectText(row.title);
    const match = PROJECT_INVENTORY_MATCHES.find(({ alias }) => title.includes(alias));
    if (match) counts[match.projectName] = (counts[match.projectName] ?? 0) + 1;
  }
  return counts;
}

// Every published property row remains an independently addressable inventory
// unit in the catalogue, project hubs and sitemap. Location landing pages are
// different: repeating buyer-identical cards weakens UX and SEO, so locality
// queries collapse exact market-facing duplicates while preserving the newest
// row (the database query is ordered by updated_at descending).
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
      const queryLimit = data.locality ? Math.min(requestedLimit * 3, 60) : requestedLimit;
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

      const publicRows = ((rows ?? []) as unknown as ListingRow[]).map(
        applyConfirmedInventoryCorrections,
      );
      const properties = data.locality
        ? dedupeLocationListings(publicRows).slice(0, requestedLimit)
        : publicRows;

      return { properties, error: null };
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
          projectUnitCounts: {} as Record<string, number>,
          error: `${error.code ?? "query_error"}: ${error.message}`,
        };
      }

      const curatedDwarkaRows = (DWARKA_CATALOGUE_LISTINGS as unknown as ListingRow[])
        .map(applyConfirmedInventoryCorrections)
        .filter((row) => {
          if (data.purpose && row.listing_type !== data.purpose) return false;
          if (data.status && row.status !== data.status) return false;
          return true;
        });

      const queryText = data.q?.trim().toLocaleLowerCase("en-IN") ?? "";
      const catalogueRows = [
        ...curatedDwarkaRows,
        ...((rows ?? []) as unknown as ListingRow[]).map(applyConfirmedInventoryCorrections),
      ].filter((row) => {
        if (!queryText) return true;
        return [row.title, row.sector, row.locality, row.city, row.bhk]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("en-IN")
          .includes(queryText);
      });

      const total = catalogueRows.length;
      const projectUnitCounts = countCurrentProjectUnits(catalogueRows);
      const totalPages = Math.max(1, Math.ceil(total / data.pageSize));
      const page = Math.min(data.page, totalPages);
      const start = (page - 1) * data.pageSize;
      const properties = catalogueRows.slice(start, start + data.pageSize);

      return { properties, total, page, pageSize: data.pageSize, projectUnitCounts, error: null };
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
        projectUnitCounts: {} as Record<string, number>,
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

      const correctedProperty = applyConfirmedInventoryCorrections(
        property as unknown as ListingRow,
      ) as typeof property;

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
        property: correctedProperty,
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
      .select(SITEMAP_COLUMNS)
      .eq("is_published", true)
      .neq("status", "sold_out")
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) {
      console.error("[Sitemap] Could not load published properties:", error.message);
      return [] as SitemapRow[];
    }

    // Include every genuine published inventory unit. Search engines can then
    // discover each self-canonical property URL even when multiple flats share
    // the same society, size, configuration or asking price.
    return ((data ?? []) as unknown as SitemapIdentityRow[]).map((row) => ({
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
