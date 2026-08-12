import { createFileRoute } from "@tanstack/react-router";

const VERIFIED_PUBLIC_COLUMNS =
  "id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,sector,locality,city,cover_image_url,is_luxury";

export const Route = createFileRoute("/api/public/property-health")({
  server: {
    handlers: {
      GET: async () => {
        const env = {
          hasUrl: Boolean(process.env["SUPABASE_URL"]),
          hasServiceRole: Boolean(process.env["SUPABASE_SERVICE_ROLE_KEY"]),
          hasSecretKey: Boolean(process.env["SUPABASE_SECRET_KEY"]),
          hasPublishableKey: Boolean(process.env["SUPABASE_PUBLISHABLE_KEY"]),
        };

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const basic = await supabaseAdmin
            .from("properties")
            .select("id,slug,is_published", { count: "exact" })
            .eq("is_published", true)
            .limit(5);

          const publicShape = await supabaseAdmin
            .from("properties")
            .select(VERIFIED_PUBLIC_COLUMNS)
            .eq("is_published", true)
            .limit(5);

          const healthy = !basic.error && !publicShape.error;
          return Response.json(
            {
              ok: healthy,
              env,
              adminClient: "ok",
              publishedProperties: basic.count ?? basic.data?.length ?? 0,
              basic: {
                ok: !basic.error,
                errorCode: basic.error?.code ?? null,
                errorMessage: basic.error?.message ?? null,
              },
              publicShape: {
                ok: !publicShape.error,
                sampleCount: publicShape.data?.length ?? 0,
                errorCode: publicShape.error?.code ?? null,
                errorMessage: publicShape.error?.message ?? null,
              },
            },
            { status: healthy ? 200 : 503 },
          );
        } catch (error) {
          return Response.json(
            {
              ok: false,
              env,
              adminClient: "error",
              errorMessage: error instanceof Error ? error.message : "Unknown server database error",
            },
            { status: 503 },
          );
        }
      },
    },
  },
});
