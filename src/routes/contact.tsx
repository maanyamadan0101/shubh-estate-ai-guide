import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Shubh Estate Brokers | Property Consultant Sector 51 Gurugram" },
      {
        name: "description",
        content:
          "Visit Shubh Estate Brokers at Ocus Quantum Mall, Sector 51, Gurugram for property advisory, site visits, valuation, title review and home-loan assistance.",
      },
      { property: "og:title", content: "Contact Shubh Estate Brokers, Gurugram" },
      {
        property: "og:description",
        content:
          "Book a site visit, request a callback or speak with our property and mortgage advisory team.",
      },
      { property: "og:url", content: `${SITE_ORIGIN}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/contact` }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 -]{8,16}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  interest: z.string().min(1, "Select what you need"),
  message: z.string().trim().max(1000).optional(),
});

function Contact() {
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const whatsappMessage = encodeURIComponent(
    "Hi Shubh Estate Brokers, I would like to discuss a Gurgaon property requirement. Please contact me.",
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsed = schema.safeParse({
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      interest,
      message: String(form.get("message") ?? ""),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }

    setErrors({});
    setSending(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          full_name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          message: parsed.data.message || "",
          interest: parsed.data.interest,
          source: "contact_page",
          property_id: null,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "We could not save your request.");
      }

      trackEvent("generate_lead", {
        lead_type: parsed.data.interest,
        source: "contact_page",
        page_path: window.location.pathname,
      });
      trackContact("form", "contact_page");

      if (parsed.data.interest === "Book a site visit") {
        trackEvent("book_site_visit", {
          source: "contact_form",
          page_path: window.location.pathname,
        });
      }

      formElement.reset();
      setInterest("");
      toast.success("Request received", {
        description: "Our advisory team will call you back shortly.",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not save your request. Please call or WhatsApp us now.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next property decision"
        body="Book a site visit, request a callback, or arrange a property, title or mortgage consultation with our team in Sector 51."
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl border border-border bg-card p-7 md:p-9"
        >
          <h2 className="font-display text-2xl">Request a callback</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors["name"]} />
              {errors["name"] ? <p className="text-xs text-destructive">{errors["name"]}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input id="phone" name="phone" autoComplete="tel" aria-invalid={!!errors["phone"]} />
              {errors["phone"] ? (
                <p className="text-xs text-destructive">{errors["phone"]}</p>
              ) : null}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors["email"]}
              />
              {errors["email"] ? (
                <p className="text-xs text-destructive">{errors["email"]}</p>
              ) : null}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="interest">I'm interested in</Label>
              <Select value={interest} onValueChange={setInterest}>
                <SelectTrigger id="interest" aria-invalid={!!errors["interest"]}>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Book a site visit",
                    "Buying a property",
                    "Selling a property",
                    "Renting / Leasing",
                    "Tenant property search",
                    "Property management",
                    "Home loan assistance",
                    "Home loan takeover / balance transfer",
                    "Overdraft-linked home loan",
                    "Property valuation",
                    "Title / documentation review",
                    "Investment advisory",
                    "NRI services",
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors["interest"] ? (
                <p className="text-xs text-destructive">{errors["interest"]}</p>
              ) : null}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="message">Requirement details</Label>
              <Textarea id="message" name="message" rows={4} maxLength={1000} />
            </div>
          </div>
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="mt-7 w-full sm:w-auto"
            disabled={sending}
          >
            {sending ? "Sending…" : "Request Callback"}
          </Button>
        </form>

        <div className="space-y-6">
          <div className="rounded-2xl surface-navy p-8">
            <p className="eyebrow">Office</p>
            <address className="mt-5 space-y-4 text-sm not-italic text-navy-foreground/85">
              <span className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.address}
              </span>
              <a
                href={CONTACT.phoneHref}
                onClick={() => trackContact("phone", "contact_page_primary")}
                className="flex gap-3 hover:text-gold"
              >
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.alternatePhoneHref}
                onClick={() => trackContact("phone", "contact_page_alternate")}
                className="flex gap-3 hover:text-gold"
              >
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.alternatePhone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex gap-3 hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </address>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "contact_page")}
                >
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <a
                  href={CONTACT.googleBusinessProfile}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("google_business_profile_click", {
                      location: "contact_page",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Google Business Profile
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Shubh Estate Brokers office location on Google Maps"
              src="https://www.google.com/maps?q=Ocus%20Quantum%20Mall%20Sector%2051%20Gurugram&output=embed"
              loading="lazy"
              className="h-72 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-border bg-secondary/50 p-7 md:p-9">
          <h2 className="font-display text-2xl">Help us prepare useful options before we call</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            For a buying enquiry, share your usable property budget, preferred Gurgaon corridors,
            configuration, possession timeline and whether a home loan is required. Property owners
            can share the project, unit size, floor, condition, expected price and preferred sale
            timeline. NRI clients may also include their country and convenient call window.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link to="/flats-for-sale-in-gurgaon" className="text-gold hover:underline">
              Browse Gurgaon properties
            </Link>
            <Link to="/sell-property-gurgaon" className="text-gold hover:underline">
              Submit a property to sell
            </Link>
            <Link to="/nri" className="text-gold hover:underline">
              Contact the NRI property desk
            </Link>
            <Link to="/home-loans" className="text-gold hover:underline">
              Home-loan assistance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
