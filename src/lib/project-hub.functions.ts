import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DWARKA_CATALOGUE_LISTINGS } from "@/data/dwarka-catalogue-listings";
import { projectIdentityFor } from "@/lib/project-hubs";
import { isPublicSlug } from "@/lib/public-slug";

export type ProjectHubListing = {
  id: string;
  title: string;
  href: string;
  slug: string;
  bhk: string | null;
  property_type: string;
  listing_type: string;
  status: string | null;
  price: number | null;
  display_price: string | null;
  area_sqft: number | null;
  sector: string | null;
  locality: string | null;
  city: string;
  cover_image_url: string | null;
  floor: string | null;
  facing: string | null;
  updated_at: string | null;
};

export type ProjectHub = {
  name: string;
  slug: string;
  sector: string | null;
  locality: string | null;
  city: string;
  description: string | null;
  rera_number: string | null;
  possession_date: string | null;
  builder_name: string | null;
  updated_at: string | null;
  listings: ProjectHubListing[];
};

type DbListing = {
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
  project_id: string | null;
  facing: string | null;
  floor_number: number | null;
  total_floors: number | null;
  updated_at: string;
};

type ProjectRow = {
  id: string;
  name: string;
  slug: string;
  sector: string | null;
  locality: string | null;
  description: string | null;
  rera_number: string | null;
  possession_date: string | null;
  builder_id: string | null;
};

type BuilderRow = { id: string; name: string };

function dbListingToHubListing(row: DbListing): ProjectHubListing {
  const floor =
    row.floor_number !== null && row.floor_number !== undefined
      ? `${row.floor_number}${row.total_floors ? ` of ${row.total_floors}` : ""}`
      : null;
  return {
    id: row.id,
    title: row.title,
    href: `/property/${row.slug}`,
    slug: row.slug,
    bhk: row.bhk,
    property_type: row.property_type,
    listing_type: row.listing_type,
    status: row.status,
    price: row.price,
    display_price: null,
    area_sqft: row.area_sqft,
    sector: row.sector,
    locality: row.locality,
    city: row.city,
    cover_image_url: row.cover_image_url,
    floor,
    facing: row.facing,
    updated_at: row.updated_at,
  };
}

function staticListingToHubListing(
  row: (typeof DWARKA_CATALOGUE_LISTINGS)[number],
): ProjectHubListing {
  return {
    id: row.id,
    title: row.title,
    href: row.detail_href,
    slug: row.slug,
    bhk: row.bhk,
    property_type: row.property_type,
    listing_type: row.listing_type,
    status: row.status,
    price: row.price,
    display_price: row.display_price,
    area_sqft: row.area_sqft,
    sector: row.sector,
    locality: row.locality,
    city: row.city,
    cover_image_url: row.cover_image_url,
    floor: row.floor,
    facing: row.facing,
    updated_at: "2026-08-21",
  };
}

function newestDate(values: Array<string | null | undefined>) {
  return values
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;
}

function mergeHub(
  map: Map<string, ProjectHub>,
  identity: { name: string; slug: string; sector: string | null },
  listing: ProjectHubListing,
  details?: Partial<Omit<ProjectHub, "name" | "slug" | "sector" | "listings">>,
) {
  if (!isPublicSlug(identity.slug) || !isPublicSlug(listing.slug)) return;

  const existing = map.get(identity.slug);
  if (existing) {
    if (!existing.listings.some((item) => item.id === listing.id)) existing.listings.push(listing);
    existing.locality ||= details?.locality ?? listing.locality;
    existing.description ||= details?.description ?? null;
    existing.rera_number ||= details?.rera_number ?? null;
    existing.possession_date ||= details?.possession_date ?? null;
    existing.builder_name ||= details?.builder_name ?? null;
    existing.updated_at = newestDate([existing.updated_at, details?.updated_at, listing.updated_at]);
    return;
  }

  map.set(identity.slug, {
    name: identity.name,
    slug: identity.slug,
    sector: identity.sector ?? listing.sector,
    locality: details?.locality ?? listing.locality,
    city: details?.city ?? listing.city ?? "Gurugram",
    description: details?.description ?? null,
    rera_number: details?.rera_number ?? null,
    possession_date: details?.possession_date ?? null,
    builder_name: details?.builder_name ?? null,
    updated_at: newestDate([details?.updated_at, listing.updated_at]),
    listings: [listing],
  });
}

async function loadProjectHubs(): Promise<ProjectHub[]> {
  const hubs = new Map<string, ProjectHub>();

  for (const row of DWARKA_CATALOGUE_LISTINGS) {
    if (!isPublicSlug(row.slug)) continue;
    const identity = projectIdentityFor({ title: row.title, sector: row.sector });
    if (!identity) continue;
    mergeHub(hubs, identity, staticListingToHubListing(row), {
      locality: row.locality,
      city: row.city,
      updated_at: "2026-08-21",
    });
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [propertyResult, projectResult, builderResult] = await Promise.all([
      supabaseAdmin
        .from("properties")
        .select(
          "id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,sector,locality,city,cover_image_url,project_id,facing,floor_number,total_floors,updated_at",
        )
        .eq("is_published", true)
        .neq("status", "sold_out")
        .order("updated_at", { ascending: false })
        .limit(500),
      supabaseAdmin
        .from("projects")
        .select(
          "id,name,slug,sector,locality,description,rera_number,possession_date,builder_id",
        )
        .eq("is_published", true)
        .limit(300),
      supabaseAdmin.from("builders").select("id,name").eq("is_published", true).limit(200),
    ]);

    if (propertyResult.error) {
      console.error("[Project hubs] Could not load properties:", propertyResult.error.message);
      return [...hubs.values()];
    }
    if (projectResult.error) {
      console.error("[Project hubs] Could not load projects:", projectResult.error.message);
    }
    if (builderResult.error) {
      console.error("[Project hubs] Could not load builders:", builderResult.error.message);
    }

    const projects = new Map(
      ((projectResult.data ?? []) as unknown as ProjectRow[])
        .filter((row) => isPublicSlug(row.slug))
        .map((row) => [row.id, row]),
    );
    const builders = new Map(
      ((builderResult.data ?? []) as unknown as BuilderRow[]).map((row) => [row.id, row]),
    );

    for (const row of (propertyResult.data ?? []) as unknown as DbListing[]) {
      if (!isPublicSlug(row.slug)) continue;

      const project = row.project_id ? projects.get(row.project_id) ?? null : null;
      const identity = projectIdentityFor({
        title: row.title,
        sector: project?.sector ?? row.sector,
        project: project ? { name: project.name, slug: project.slug } : null,
      });
      if (!identity) continue;

      mergeHub(hubs, identity, dbListingToHubListing(row), {
        locality: project?.locality ?? row.locality,
        city: row.city,
        description: project?.description ?? null,
        rera_number: project?.rera_number ?? null,
        possession_date: project?.possession_date ?? null,
        builder_name: project?.builder_id ? builders.get(project.builder_id)?.name ?? null : null,
        updated_at: row.updated_at,
      });
    }
  } catch (error) {
    console.error("[Project hubs] Could not initialise published inventory:", error);
  }

  return [...hubs.values()]
    .filter((hub) => isPublicSlug(hub.slug))
    .map((hub) => ({
      ...hub,
      listings: [...hub.listings].filter((item) => isPublicSlug(item.slug)).sort((a, b) => {
        const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return bTime - aTime;
      }),
    }))
    .filter((hub) => hub.listings.length > 0)
    .sort((a, b) => {
      if (b.listings.length !== a.listings.length) return b.listings.length - a.listings.length;
      return a.name.localeCompare(b.name, "en-IN");
    });
}

export const listPublicProjectHubs = createServerFn({ method: "GET" }).handler(async () => {
  return loadProjectHubs();
});

export const getPublicProjectHub = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(2) }).parse(input))
  .handler(async ({ data }) => {
    if (!isPublicSlug(data.slug)) return null;
    const hubs = await loadProjectHubs();
    return hubs.find((hub) => hub.slug === data.slug) ?? null;
  });

export const listProjectHubSitemapEntries = createServerFn({ method: "GET" }).handler(async () => {
  const hubs = await loadProjectHubs();
  return hubs
    .filter((hub) => isPublicSlug(hub.slug))
    .map((hub) => ({ slug: hub.slug, updated_at: hub.updated_at }));
});
