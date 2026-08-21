import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendEnquiryNotification } from "@/lib/enquiry-email.server";

const enquirySchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(255).or(z.literal("")),
  message: z.string().trim().max(2500).default(""),
  interest: z.string().trim().max(200).default("Property enquiry"),
  source: z.enum(["contact_page", "property_enquiry", "general_enquiry"]).default("general_enquiry"),
  property_id: z.string().trim().max(100).nullable().optional(),
  website: z.string().max(200).default(""),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const Route = createFileRoute("/api/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = enquirySchema.safeParse(await request.json());
          if (!parsed.success) return json({ error: "Please check your enquiry details and try again." }, 400);
          const input = parsed.data;

          // Honeypot: accept bot submissions quietly without storing or emailing them.
          if (input.website.trim()) return json({ ok: true, id: "received" });

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: enquiry, error } = await supabaseAdmin
            .from("enquiries")
            .insert({
              property_id: input.property_id || null,
              full_name: input.full_name,
              phone: input.phone,
              email: input.email || null,
              message: input.message || null,
              interest: input.interest || null,
              source: input.source,
            })
            .select("id")
            .single();

          if (error) throw new Error(`Could not save enquiry: ${error.message}`);

          await sendEnquiryNotification({
            enquiryId: enquiry.id,
            category: input.property_id ? "property_enquiry" : "contact",
            fullName: input.full_name,
            phone: input.phone,
            email: input.email || null,
            interest: input.interest || null,
            source: input.source,
            propertyId: input.property_id || null,
            message: input.message || null,
          });

          return json({ ok: true, id: enquiry.id });
        } catch (error) {
          console.error("[Enquiry API]", error);
          return json(
            { error: error instanceof Error ? error.message : "Could not submit your enquiry." },
            500,
          );
        }
      },
    },
  },
});
