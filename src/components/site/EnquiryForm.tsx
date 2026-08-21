import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  message: z.string().trim().max(1000),
});

export function EnquiryForm({
  propertyId,
  interest = "Property enquiry",
  compact = false,
}: {
  propertyId?: string;
  interest?: string;
  compact?: boolean;
}) {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSending(true);
    try {
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
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not send your enquiry.");
      }

      const commonParams = {
        lead_type: interest,
        property_id: propertyId ?? "general",
        form_location: propertyId ? "property_enquiry_form" : "general_enquiry_form",
        page_path: window.location.pathname,
      };

      trackEvent("generate_lead", commonParams);
      trackEvent(propertyId ? "property_enquiry" : "contact_form_submit", commonParams);

      setDone(true);
      toast.success("Thank you — an advisor will call you shortly.");
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
          One of our advisors will reach out within one business day.
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
          maxLength={100}
          required
        />
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone (with country code)"
          aria-label="Phone number"
          maxLength={20}
          required
        />
      </div>
      <Input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email (optional)"
        aria-label="Email"
        maxLength={255}
      />
      <Textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Tell us what you're looking for"
        aria-label="Message"
        rows={3}
        maxLength={1000}
      />
      <Button type="submit" variant="gold" className="w-full" disabled={sending}>
        {sending ? "Sending…" : "Request a callback"}
      </Button>
    </form>
  );
}
