import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/contact`;
    const title = "Locate Shubh Estate Brokers | Sector 51 Gurgaon";
    const description =
      "Visit Shubh Estate Brokers at Ocus Quantum Mall, Sector 51, Gurugram. Get office address, directions, phone, WhatsApp and Google Business Profile details.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${canonical}#contact-page`,
            name: title,
            url: canonical,
            mainEntity: { "@id": `${SITE_ORIGIN}/#real-estate-agent` },
          }),
        },
      ],
    };
  },
  component: Contact,
});

function Contact() {
  const whatsappMessage = encodeURIComponent(
    "Hi Shubh Estate Brokers, I would like to discuss a Gurgaon property requirement.",
  );

  return (
    <>
      <PageHero
        eyebrow="Locate Us"
        title="Visit Shubh Estate Brokers in Sector 51, Gurugram"
        body="Find our office address, contact details and map directions below. You can also call or WhatsApp our team for property enquiries and site visits."
      />

      <section className="container-page grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="rounded-2xl surface-navy p-8 md:p-10">
          <p className="eyebrow">Office Address</p>
          <h2 className="mt-3 font-display text-3xl text-navy-foreground">Shubh Estate Brokers</h2>
          <address className="mt-6 space-y-5 text-sm not-italic text-navy-foreground/85">
            <span className="flex gap-3 leading-6">
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

          <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="min-h-80 overflow-hidden rounded-2xl border border-border bg-card">
          <iframe
            title="Shubh Estate Brokers office location on Google Maps"
            src="https://www.google.com/maps?q=Ocus%20Quantum%20Mall%20Sector%2051%20Gurugram&output=embed"
            loading="lazy"
            className="h-full min-h-80 w-full border-0 lg:min-h-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-border bg-secondary/50 p-7 md:p-9">
          <h2 className="font-display text-2xl">Explore Gurgaon property options before your visit</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Browse current residential inventory, seller services and home-loan assistance online, or contact our team directly for a site visit and property discussion.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link to="/flats-for-sale-in-gurgaon" className="text-gold hover:underline">
              Browse Gurgaon properties
            </Link>
            <Link to="/sell-property-gurgaon" className="text-gold hover:underline">
              Sell a property in Gurgaon
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
