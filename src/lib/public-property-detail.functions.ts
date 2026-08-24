import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  applyConfirmedInventoryCorrections,
  type ListingRow,
} from "@/lib/properties.functions";

export type PublicFeatureRow = { feature_name: string; category: string };

/**
 * Load one published property for the public detail page.
 * The property row is deliberately fetched first, without embedded joins, so an
 * optional builder/project lookup can never turn a valid listing into a 404.
 */
export const getPublicPropertyDetail = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: property, error: propertyError } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();

    if (propertyError) {
      console.error(`[Public property detail] Could not load ${data.slug}:`, propertyError.message);
      // Do not convert a temporary database/authentication failure into a 404.
      // Search engines should retry a server error; a false 404 can cause a live
      // property URL to be removed from the index.
      throw new Error(`Could not load published property ${data.slug}: ${propertyError.message}`);
    }
    if (!property) {
      console.warn(`[Public property detail] No published property found for slug ${data.slug}`);
      return null;
    }

    const correctedProperty = applyConfirmedInventoryCorrections(
      property as unknown as ListingRow,
    ) as typeof property;

    const [imagesResult, featuresResult, builderResult, projectResult] = await Promise.all([
      supabaseAdmin
        .from("property_images")
        .select("id,image_url,alt_text,sort_order,is_primary")
        .eq("property_id", correctedProperty.id)
        .order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("property_features")
        .select("feature_name,category")
        .eq("property_id", correctedProperty.id),
      correctedProperty.builder_id
        ? supabaseAdmin
            .from("builders")
            .select("id,name,slug,description,website")
            .eq("id", correctedProperty.builder_id)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      correctedProperty.project_id
        ? supabaseAdmin
            .from("projects")
            .select("id,name,slug,locality,sector,rera_number,possession_date,description")
            .eq("id", correctedProperty.project_id)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (imagesResult.error) {
      console.error(`[Public property detail] Could not load images for ${data.slug}:`, imagesResult.error.message);
    }
    if (featuresResult.error) {
      console.error(`[Public property detail] Could not load features for ${data.slug}:`, featuresResult.error.message);
    }
    if (builderResult.error) {
      console.error(`[Public property detail] Could not load builder for ${data.slug}:`, builderResult.error.message);
    }
    if (projectResult.error) {
      console.error(`[Public property detail] Could not load project for ${data.slug}:`, projectResult.error.message);
    }

    const featureRows = (featuresResult.data ?? []) as PublicFeatureRow[];

    return {
      property: {
        ...correctedProperty,
        builder: builderResult.data ?? null,
        project: projectResult.data ?? null,
      },
      images: imagesResult.data ?? [],
      amenities: featureRows.filter((row) => row.category === "amenity").map((row) => row.feature_name),
      features: featureRows.filter((row) => row.category === "feature").map((row) => row.feature_name),
      videos: featureRows.filter((row) => row.category === "video").map((row) => row.feature_name),
    };
  });
