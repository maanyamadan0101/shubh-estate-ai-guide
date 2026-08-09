import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PORTAL_KEYS = ["business_profile", "social", "seo", "website"] as const;
const ENQUIRY_STATUSES = ["new", "contacted", "qualified", "site_visit", "closed", "lost"] as const;

async function requirePortalAccess(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
  if (error) throw new Error(error.message);
  const allowed = (data ?? []).some((row) => row.role === "admin" || row.role === "editor");
  if (!allowed) throw new Error("Forbidden: admin or editor access required");
  return supabaseAdmin;
}

export type PortalEnquiry = {
  id: string;
  property_id: string | null;
  full_name: string;
  phone: string;
  email: string | null;
  interest: string | null;
  message: string | null;
  source: string;
  status: (typeof ENQUIRY_STATUSES)[number];
  created_at: string;
  property?: { title: string; slug: string } | null;
};

export const listAdminEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await requirePortalAccess(context.userId);
    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .select("id,property_id,full_name,phone,email,interest,message,source,status,created_at,property:properties(title,slug)")
      .order("created_at", { ascending: false })
      .limit(250);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as PortalEnquiry[];
  });

export const updateAdminEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(ENQUIRY_STATUSES) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const supabaseAdmin = await requirePortalAccess(context.userId);
    const { error } = await supabaseAdmin
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type PortalImage = {
  id: string;
  property_id: string;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
  property?: { title: string; slug: string } | null;
};

export type PortalVideo = {
  id: string;
  property_id: string;
  feature_name: string;
  property?: { title: string; slug: string } | null;
};

export const listAdminMedia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await requirePortalAccess(context.userId);
    const [{ data: images, error: imageError }, { data: videos, error: videoError }] = await Promise.all([
      supabaseAdmin
        .from("property_images")
        .select("id,property_id,image_url,alt_text,is_primary,sort_order,property:properties(title,slug)")
        .order("updated_at", { ascending: false })
        .limit(300),
      supabaseAdmin
        .from("property_features")
        .select("id,property_id,feature_name,property:properties(title,slug)")
        .eq("category", "video")
        .order("updated_at", { ascending: false })
        .limit(100),
    ]);
    if (imageError) throw new Error(imageError.message);
    if (videoError) throw new Error(videoError.message);
    return {
      images: (images ?? []) as unknown as PortalImage[],
      videos: (videos ?? []) as unknown as PortalVideo[],
    };
  });

export type PortalSettingsMap = Record<string, Record<string, string>>;

export const getPortalSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await requirePortalAccess(context.userId);
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key,value")
      .in("key", [...PORTAL_KEYS]);
    if (error) throw new Error(error.message);
    const result: PortalSettingsMap = {};
    for (const row of data ?? []) {
      if (row.value && typeof row.value === "object" && !Array.isArray(row.value)) {
        const entries = Object.entries(row.value as Record<string, unknown>)
          .filter(([, value]) => typeof value === "string")
          .map(([key, value]) => [key, String(value)]);
        result[row.key] = Object.fromEntries(entries);
      }
    }
    return result;
  });

export const savePortalSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        key: z.enum(PORTAL_KEYS),
        value: z.record(z.string(), z.string()),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const supabaseAdmin = await requirePortalAccess(context.userId);
    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("site_settings")
      .select("id")
      .eq("key", data.key)
      .maybeSingle();
    if (lookupError) throw new Error(lookupError.message);

    if (existing) {
      const { error } = await supabaseAdmin
        .from("site_settings")
        .update({ value: data.value, is_public: true })
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("site_settings").insert({
        key: data.key,
        value: data.value,
        is_public: true,
        description: `Admin portal ${data.key.replace(/_/g, " ")} settings`,
      });
      if (error) throw new Error(error.message);
    }

    return { ok: true };
  });
