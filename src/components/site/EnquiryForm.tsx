import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

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
    const { error } = await supabase.from("enquiries").insert({
      property_id: propertyId ?? null,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      message: parsed.data.message || null,
      interest,
      source: "website",
    });
    setSending(false);
    if (error) {
      toast.error("Could not send your enquiry. Please call us instead.");
      return;
    }
    setDone(true);
    toast.success("Thank you — an advisor will call you shortly.");
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
