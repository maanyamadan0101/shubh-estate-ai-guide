import { createFileRoute } from "@tanstack/react-router";

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

          const full = await supabaseAdmin
            .from("properties")
            .select("id,title,slug,bhk,property_type,listing_type,status,price,area_sqft,sector,locality,city,cover_image_url,tags,is_featured,is_luxury,updated_at")
            .eq("is_published", true)
            .limit(5);

          return Response.json({
            env,
            adminClient: "ok",
            basic: {
              ok: !basic.error,
              count: basic.count ?? basic.data?.length ?? 0,
              errorCode: basic.error?.code ?? null,
              errorMessage: basic.error?.message ?? null,
            },
            full: {
              ok: !full.error,
              count: full.data?.length ?? 0,
              errorCode: full.error?.code ?? null,
              errorMessage: full.error?.message ?? null,
            },
          });
        } catch (error) {
          return Response.json({
            env,
            adminClient: "error",
            errorMessage: error instanceof Error ? error.message : "Unknown server database error",
          });
        }
      },
    },
  },
});
