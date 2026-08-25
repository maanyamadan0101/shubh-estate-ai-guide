import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { getLeadAttribution, initLeadAttribution } from "@/lib/lead-attribution";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  message: z.string().trim().max(1000),
});

function leadCategory(interest: string, propertyId?: string) {
  if (/home loan|mortgage|finance/i.test(interest)) return "home_loan";
  if (/nri/i.test(interest)) return "nri";
  if (/rent|tenant/i.test(interest)) return "rental";
  if (/site visit|viewing|visit/i.test(interest)) return "site_visit";
  if (/resale/i.test(interest)) return "resale";
  return propertyId ? "buyer" : "general";
}

function ctaLabel(interest: string, propertyId?: string) {
  if (/private viewing/i.test(interest)) return "Request Private Viewing";
  if (/site visit|viewing|visit/i.test(interest)) return "Book Site Visit";
  if (/home loan|mortgage|finance/i.test(interest)) return "Check Home Loan Eligibility";
  if (/resale/i.test(interest)) return "Get Resale Options";
  if (/inventory|availability|available units/i.test(interest)) return "Check Available Units";
  if (/price|valuation/i.test(interest)) return "Get Current Price";
  return propertyId ? "Check Price & Availability" : "Request a Callback";
}

export function EnquiryForm({
  propertyId,
  interest = "Property enquiry",
  compact = false,
  quick = false,
  submitLabel,
}: {
  propertyId?: string;
  interest?: string;
  compact?: boolean;
  quick?: boolean;
  submitLabel?: string;
}) {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    initLeadAttribution();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSending(true);
    try {
      const attribution = getLeadAttribution();
      const category = leadCategory(interest, propertyId);
      const currentPage = typeof window !== "undefined" ? window.location.pathname : "";

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          full_name: parsed.data.full_name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          message: parsed.data.message,
          interest,
          property_id: propertyId ?? null,
          source: propertyId ? "property_enquiry" : "general_enquiry",
          lead_category: category,
          current_page: currentPage,
          ...attribution,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not send your enquiry.");
      }

      const commonParams = {
        lead_type: interest,
        lead_category: category,
        property_id: propertyId ?? "general",
        form_location: quick
          ? "lead_assistant_callback"
          : propertyId
            ? "property_enquiry_form"
            : "general_enquiry_form",
        page_path: currentPage,
        ...attribution,
      };

      trackEvent("generate_lead", commonParams);
      trackEvent(propertyId ? "property_enquiry" : "contact_form_submit", commonParams);

      setDone(true);
      toast.success("Thank you — an advisor will contact you shortly.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send your enquiry. Please call us instead.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm">
        <p className="font-display text-xl">Enquiry received</p>
        <p className="mt-2 text-muted-foreground">
          An advisor will contact you shortly to discuss your requirement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <Input
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          placeholder="Your name"
          aria-label="Your name"
          autoComplete="name"
          maxLength={100}
          required
        />
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone / WhatsApp number"
          aria-label="Phone number"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          required
        />
      </div>
      {!quick ? (
        <>
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email (optional)"
            aria-label="Email"
            inputMode="email"
            autoComplete="email"
            maxLength={255}
          />
          <Textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us what you're looking for (optional)"
            aria-label="Message"
            rows={3}
            maxLength={1000}
          />
        </>
      ) : null}
      <Button type="submit" variant="gold" className="w-full" disabled={sending}>
        {sending ? "Sending…" : (submitLabel ?? ctaLabel(interest, propertyId))}
      </Button>
    </form>
  );
}
