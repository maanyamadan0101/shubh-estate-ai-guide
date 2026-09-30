import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DWARKA_CATALOGUE_LISTINGS } from "@/data/dwarka-catalogue-listings";
import { GURGAON_DIRECTORY_PROJECTS } from "@/data/gurgaon-project-directory";
import { isPublicSlug } from "@/lib/public-slug";

async function publishedClient() {
  const { supabasePublicServer } = await import("@/integrations/supabase/client.server");
  return supabasePublicServer;
}

// Keep public property queries deliberately limited to columns already proven
// against the production database. This prevents a stale generated type from
// turning one missing optional column into an empty public catalogue.
const LIST_COLUMNS =
  "id,title,slug,bhk,property_type,listing_type,status,price,price_text,area_sqft,carpet_area_sqft,floor_number,total_floors,facing,furnishing,sector,locality,city,cover_image_url,is_luxury,updated_at";
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
  price_text?: string | null;
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
  has_lift?: boolean;
  updated_at?: string;
};

export const CATALOGUE_CHANNELS = ["resale", "new-booking"] as const;
export type CatalogueChannel = (typeof CATALOGUE_CHANNELS)[number];

export const CATALOGUE_CORRIDORS = [
  "golf-course-road-central",
  "golf-course-extension",
  "dwarka-expressway",
  "south-gurgaon",
  "sohna-road",
  "new-gurgaon",
  "central-gurgaon",
  "gwal-pahari-luxury",
] as const;
export type CatalogueCorridor = (typeof CATALOGUE_CORRIDORS)[number];

const CATALOGUE_CORRIDOR_TERMS: Record<CatalogueCorridor, readonly string[]> = {
  "golf-course-road-central": ["golf course road", "central gurgaon", "central gurugram"],
  "golf-course-extension": ["golf course extension", "golf course ext"],
  "dwarka-expressway": ["dwarka expressway", "new gurgaon / dwarka", "new gurugram / dwarka"],
  "south-gurgaon": ["southern peripheral", "spr", "south gurgaon"],
  "sohna-road": ["sohna road", "sohna"],
  "new-gurgaon": ["new gurgaon", "new gurugram"],
  "central-gurgaon": ["central gurgaon", "central gurugram", "golf course road"],
  "gwal-pahari-luxury": ["gwal pahari"],
};

function listingSearchText(row: ListingRow) {
  return [row.title, row.sector, row.locality, row.city]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("en-IN");
}

async function addVerifiedLiftSignals(
  supabase: Awaited<ReturnType<typeof publishedClient>>,
  rows: ListingRow[],
) {
  if (!rows.length) return rows;

  const propertyIds = rows.map((row) => row.id).filter(Boolean);
  const { data: features, error } = await supabase
    .from("property_features")
    .select("property_id,feature_name")
    .in("property_id", propertyIds)
    .or("feature_name.ilike.%lift%,feature_name.ilike.%elevator%");

  if (error) {
    console.error("[Public properties] Could not load verified lift features:", error.message);
  }

  const verifiedLiftIds = new Set(
    (features ?? []).map((feature) => String(feature.property_id)),
  );
  return rows.map((row) => ({
    ...row,
    has_lift:
      verifiedLiftIds.has(row.id) ||
      /\b(?:lift|elevator)\b/i.test([row.title, row.locality].filter(Boolean).join(" ")),
  }));
}

export function matchesCatalogueChannel(row: ListingRow, channel?: CatalogueChannel) {
  if (!channel) return true;
  if (row.listing_type !== "sale") return false;

  const text = listingSearchText(row);
  if (channel === "new-booking") {
    return (
      row.status === "new_launch" ||
      /\b(?:new\s+launch|builder\s+(?:floor|inventory)|booking)\b/.test(text)
    );
  }

  return row.status !== "new_launch" && !/\bnew\s+launch\b/.test(text);
}

export function matchesCatalogueCorridor(row: ListingRow, corridor?: CatalogueCorridor) {
  if (!corridor) return true;
  const text = listingSearchText(row);
  return CATALOGUE_CORRIDOR_TERMS[corridor].some((term) => text.includes(term));
}

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

  const configuration = normalizedProjectText(row.bhk ?? "");
  const isConfirmedPuriThreeBedroom =
    title.includes("puri emerald bay") &&
    (title.includes("3 bhk") || configuration.startsWith("3 bhk"));

  if (isConfirmedPuriThreeBedroom) {
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

      const publicRows = ((rows ?? []) as unknown as ListingRow[])
        .filter((row) => isPublicSlug(row.slug))
        .map(applyConfirmedInventoryCorrections);
      const rowsWithLiftSignals = await addVerifiedLiftSignals(supabase, publicRows);
      const properties = data.locality
        ? dedupeLocationListings(rowsWithLiftSignals).slice(0, requestedLimit)
        : rowsWithLiftSignals;

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
        channel: z.enum(CATALOGUE_CHANNELS).optional(),
        corridor: z.enum(CATALOGUE_CORRIDORS).optional(),
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

      // Curated rows are already reviewed at unit level. Applying broad imported-data
      // corrections here can overwrite legitimate configurations in the same project.
      const curatedDwarkaRows = (DWARKA_CATALOGUE_LISTINGS as unknown as ListingRow[])
        .filter((row) => isPublicSlug(row.slug))
        .filter((row) => {
          if (data.purpose && row.listing_type !== data.purpose) return false;
          if (data.status && row.status !== data.status) return false;
          return true;
        });

      const queryText = data.q?.trim().toLocaleLowerCase("en-IN") ?? "";
      const catalogueRows = [
        ...curatedDwarkaRows,
        ...((rows ?? []) as unknown as ListingRow[])
          .filter((row) => isPublicSlug(row.slug))
          .map(applyConfirmedInventoryCorrections),
      ]
        .filter((row) => {
          if (!queryText) return true;
          return [row.title, row.sector, row.locality, row.city, row.bhk]
            .filter(Boolean)
            .join(" ")
            .toLocaleLowerCase("en-IN")
            .includes(queryText);
        })
        .filter((row) => matchesCatalogueChannel(row, data.channel))
        .filter((row) => matchesCatalogueCorridor(row, data.corridor));

      const rowsWithLiftSignals = await addVerifiedLiftSignals(supabase, catalogueRows);
      const total = rowsWithLiftSignals.length;
      const projectUnitCounts = countCurrentProjectUnits(rowsWithLiftSignals);
      const totalPages = Math.max(1, Math.ceil(total / data.pageSize));
      const page = Math.min(data.page, totalPages);
      const start = (page - 1) * data.pageSize;
      const properties = rowsWithLiftSignals.slice(start, start + data.pageSize);

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
  listing_type: string;
  cover_image_url: string | null;
};

export const getPublicProperty = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    try {
      if (!isPublicSlug(data.slug)) return null;

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
    const pageSize = 500;
    const rows: SitemapIdentityRow[] = [];

    for (let from = 0; ; from += pageSize) {
      const { data, error } = await supabase
        .from("properties")
        .select(SITEMAP_COLUMNS)
        .eq("is_published", true)
        .neq("status", "sold_out")
        .order("updated_at", { ascending: false })
        .range(from, from + pageSize - 1);
      if (error) {
        throw new Error(`Could not load published properties: ${error.message}`);
      }

      const pageRows = (data ?? []) as unknown as SitemapIdentityRow[];
      rows.push(...pageRows);
      if (pageRows.length < pageSize) break;
    }

    // Include every genuine published inventory unit, but never route-template
    // tokens such as $slug. Search engines should only see concrete canonical URLs.
    return rows
      .filter((row) => isPublicSlug(row.slug))
      .map((row) => ({
        slug: row.slug,
        updated_at: row.updated_at,
        status: row.status,
        listing_type: row.listing_type,
        cover_image_url: row.cover_image_url,
      }));
  } catch (error) {
    console.error("[Sitemap] Could not initialise published-property client:", error);
    throw error instanceof Error ? error : new Error("Could not load sitemap properties.");
  }
});
