import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SellerSubmissionMedia = {
  path: string;
  kind: "image" | "video";
  name: string;
  signed_url: string | null;
};

export type SellerSubmission = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string | null;
  interest: string;
  reference: string;
  seller: { is_nri?: boolean; country?: string | null };
  property: {
    project?: string;
    sector?: string | null;
    property_type?: string;
    configuration?: string | null;
    area_sqft?: string | null;
    floor?: string | null;
    facing?: string | null;
    expected_price?: string | null;
    occupancy?: string | null;
    availability?: string | null;
  };
  media_link: string | null;
  notes: string | null;
  media: SellerSubmissionMedia[];
};

type PrivatePayload = Omit<SellerSubmission, "id" | "created_at" | "full_name" | "phone" | "email" | "interest" | "media"> & {
  private_media_paths?: Array<{ path: string; kind: "image" | "video"; name: string }>;
};

export const listSellerSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (roleError) throw new Error(roleError.message);
    const canView = (roles ?? []).some((row) => row.role === "admin" || row.role === "editor");
    if (!canView) throw new Error("You do not have access to seller submissions.");

    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .select("id,created_at,full_name,phone,email,message,interest")
      .eq("source", "seller_private_link")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);

    const submissions: SellerSubmission[] = [];
    for (const row of data ?? []) {
      let payload: PrivatePayload | null = null;
      try {
        payload = JSON.parse(row.message || "{}") as PrivatePayload;
      } catch {
        payload = null;
      }
      if (!payload?.reference) continue;

      const media: SellerSubmissionMedia[] = [];
      for (const item of payload.private_media_paths ?? []) {
        const { data: signed } = await supabaseAdmin.storage.from("seller-submissions").createSignedUrl(item.path, 3600);
        media.push({ ...item, signed_url: signed?.signedUrl ?? null });
      }

      submissions.push({
        id: row.id,
        created_at: row.created_at,
        full_name: row.full_name,
        phone: row.phone,
        email: row.email,
        interest: row.interest ?? "Seller property submission",
        reference: payload.reference,
        seller: payload.seller ?? {},
        property: payload.property ?? {},
        media_link: payload.media_link ?? null,
        notes: payload.notes ?? null,
        media,
      });
    }

    return submissions;
  });
