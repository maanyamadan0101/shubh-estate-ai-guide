import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getLeadAttribution, initLeadAttribution } from "@/lib/lead-attribution";
import { trackEvent } from "@/lib/analytics";

type OwnerServiceMode = "sell" | "rent_out" | "mandate";

type FormState = {
  full_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  country: string;
  project: string;
  sector: string;
  property_type: string;
  configuration: string;
  area_sqft: string;
  expected_price: string;
  occupancy: string;
  loan_outstanding: string;
  contact_preference: string;
  property_documents: string;
  mandate_period: string;
  notes: string;
  website: string;
};

const EMPTY: FormState = {
  full_name: "",
  phone: "",
  whatsapp: "",
  email: "",
  country: "",
  project: "",
  sector: "",
  property_type: "Apartment",
  configuration: "",
  area_sqft: "",
  expected_price: "",
  occupancy: "",
  loan_outstanding: "",
  contact_preference: "WhatsApp / Phone",
  property_documents: "",
  mandate_period: "",
  notes: "",
  website: "",
};

const MODE_COPY: Record<OwnerServiceMode, { eyebrow: string; title: string; submit: string; priceLabel: string; success: string }> = {
  sell: {
    eyebrow: "Property Valuation & Sale Review",
    title: "Thinking of Selling Your Gurgaon Property?",
    submit: "Get My Property Valuation",
    priceLabel: "Expected selling price",
    success: "Your sale enquiry has been received privately.",
  },
  rent_out: {
    eyebrow: "Rent Out My Property",
    title: "Request a rental assessment and tenant search",
    submit: "Rent Out My Property",
    priceLabel: "Expected monthly rent",
    success: "Your rent-out enquiry has been received privately.",
  },
  mandate: {
    eyebrow: "Selling Mandate",
    title: "Discuss an exclusive selling mandate",
    submit: "Give Selling Mandate",
    priceLabel: "Expected selling price",
    success: "Your selling-mandate enquiry has been received privately.",
  },
};

export function OwnerServiceForm({ mode, compact = false }: { mode: OwnerServiceMode; compact?: boolean }) {
  const copy = MODE_COPY[mode];
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    initLeadAttribution();
  }, []);

  const gridClass = useMemo(
    () => (compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"),
    [compact],
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.full_name.trim() || form.phone.trim().length < 8 || !form.project.trim()) {
      toast.error("Please add your name, phone number and property location/project.");
      return;
    }

    setSending(true);
    try {
      const attribution = getLeadAttribution();
      const sourceUrl = typeof window !== "undefined" ? window.location.href : "";
      const response = await fetch("/api/seller-submission", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          inquiry_type: mode,
          submission_channel: "owner_service_page",
          full_name: form.full_name,
          phone: form.phone,
          whatsapp: form.whatsapp,
          email: form.email,
          country: form.country,
          project: form.project,
          sector: form.sector,
          property_type: form.property_type,
          configuration: form.configuration,
          area_sqft: form.area_sqft,
          expected_price: form.expected_price,
          occupancy: form.occupancy,
          loan_outstanding: form.loan_outstanding,
          contact_preference: form.contact_preference,
          property_documents: form.property_documents,
          mandate_period: form.mandate_period,
          notes: form.notes,
          source_url: sourceUrl,
          website: form.website,
          ...attribution,
          media: [],
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; reference?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Could not submit your enquiry.");

      trackEvent("generate_lead", {
        lead_type: mode,
        lead_category: mode === "mandate" ? "selling_mandate" : mode === "rent_out" ? "rent_out" : "seller",
        form_location: "owner_service_form",
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
        ...attribution,
      });
      trackEvent("owner_service_enquiry", {
        owner_service: mode,
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
      });

      setReference(payload.reference || "received");
      toast.success(copy.success);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit your enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (reference) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
        <CheckCircle2 className="size-8 text-gold" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl">Enquiry received</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {copy.success} Reference: <strong className="text-foreground">{reference}</strong>. Your contact and property details are kept in the private enquiry system and are not published as a property listing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl md:text-3xl">{copy.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        {mode === "sell"
          ? "Share a few basic property details. We’ll review the current market position and contact you privately to discuss valuation and the best way to sell."
          : "Share only what you are comfortable sharing at this stage. These details go to the Shubh Estate Brokers private enquiry system and are not displayed publicly."}
      </p>

      <div className={`mt-6 ${gridClass}`}>
        <Field label="Owner name *">
          <Input value={form.full_name} onChange={(e) => set("full_name", e.target.value)} autoComplete="name" required />
        </Field>
        <Field label="Mobile *">
          <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Include country code if outside India" inputMode="tel" autoComplete="tel" required />
        </Field>
        <Field label="WhatsApp">
          <Input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="If different from mobile" inputMode="tel" />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </Field>
        <Field label="Current country">
          <Input value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="India, UAE, UK, USA, Singapore…" />
        </Field>
        <Field label="Preferred contact method">
          <select value={form.contact_preference} onChange={(e) => set("contact_preference", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option>WhatsApp / Phone</option>
            <option>WhatsApp</option>
            <option>Phone</option>
            <option>Email</option>
            <option>Video consultation</option>
          </select>
        </Field>
        <Field label="Property location / project *" className={compact ? "" : "md:col-span-2"}>
          <Input value={form.project} onChange={(e) => set("project", e.target.value)} placeholder="Project, society or locality in Gurgaon/Gurugram" required />
        </Field>
        <Field label="Sector / locality">
          <Input value={form.sector} onChange={(e) => set("sector", e.target.value)} placeholder="e.g. Sector 62" />
        </Field>
        <Field label="Property type">
          <select value={form.property_type} onChange={(e) => set("property_type", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {['Apartment', 'Builder Floor', 'Independent House', 'Villa', 'Plot', 'Penthouse', 'Commercial', 'Other'].map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
        <Field label="Configuration">
          <Input value={form.configuration} onChange={(e) => set("configuration", e.target.value)} placeholder="3 BHK + Servant" />
        </Field>
        <Field label="Approximate area">
          <Input value={form.area_sqft} onChange={(e) => set("area_sqft", e.target.value)} placeholder="sq.ft. / sq.yd." />
        </Field>
        <Field label={copy.priceLabel}>
          <Input value={form.expected_price} onChange={(e) => set("expected_price", e.target.value)} placeholder={mode === "rent_out" ? "e.g. ₹75,000/month" : "e.g. ₹3.50 Cr"} />
        </Field>
        <Field label="Occupancy status">
          <Input value={form.occupancy} onChange={(e) => set("occupancy", e.target.value)} placeholder="Vacant / self-occupied / rented" />
        </Field>
        <Field label="Loan outstanding, if any">
          <Input value={form.loan_outstanding} onChange={(e) => set("loan_outstanding", e.target.value)} placeholder="Bank / approximate balance or none" />
        </Field>
        {mode === "mandate" ? (
          <>
            <Field label="Property documents available">
              <Input value={form.property_documents} onChange={(e) => set("property_documents", e.target.value)} placeholder="Sale deed, allotment, OC, etc." />
            </Field>
            <Field label="Preferred mandate period">
              <Input value={form.mandate_period} onChange={(e) => set("mandate_period", e.target.value)} placeholder="e.g. 60 or 90 days" />
            </Field>
          </>
        ) : null}
      </div>

      <Field label="Comments" className="mt-4">
        <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={4} placeholder="Floor, facing, furnishing, timing, tenant status, visit access, documentation or anything else relevant." />
      </Field>
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>
      <Button type="submit" variant="gold" className="mt-6 w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending…" : copy.submit}
      </Button>
    </form>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
