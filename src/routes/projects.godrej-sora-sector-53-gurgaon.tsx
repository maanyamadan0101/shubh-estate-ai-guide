import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/godrej-sora-sector-53-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Godrej Sora Sector 53 Gurgaon | 3 & 4 BHK Price, Floor Plan";
const description =
  "Explore Godrej Sora Sector 53 Gurgaon by Godrej Properties: 3 & 4 BHK apartments, carpet areas, indicative prices, RERA, amenities, location and current inventory assistance from Shubh Estate Brokers.";
const LAST_REVIEWED = "25 August 2026";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Shubh Estate Brokers, I am interested in Godrej Sora, Sector 53 Gurgaon. Please share current 3 BHK and 4 BHK availability, tower, floor, facing, view, payment plan and best current price.",
);
const WHATSAPP_URL = `${CONTACT.whatsapp}?text=${WHATSAPP_MESSAGE}`;

const QUICK_FACTS = [
  ["Developer", "Godrej Properties"],
  ["Location", "Sector 53, Gurgaon / Gurugram"],
  ["Status", "New Launch"],
  ["Project area", "Approx. 3.6 acres"],
  ["Towers", "4 residential towers"],
  ["Floors", "Up to 30 floors"],
  ["Residences", "Approx. 244 units"],
  ["Configuration", "3 BHK & 4 BHK apartments"],
  ["Expected completion", "September 2032"],
  ["RERA", "GGM/976/708/2025/79 dated 25.08.2025"],
] as const;

const CONFIGURATIONS = [
  {
    type: "3 BHK Apartment",
    area: "Approx. 1,552 sq ft carpet area",
    price: "Indicative project price from ₹9.30 Cr + applicable charges",
  },
  {
    type: "4 BHK Apartment",
    area: "Approx. 1,942–2,250 sq ft carpet area",
    price: "Indicative project price from ₹10.18 Cr to ₹11.80 Cr + applicable charges",
  },
] as const;

const AMENITIES = [
  "Swimming pool",
  "Clubhouse",
  "Children's play area",
  "Landscaped park",
  "Badminton court",
  "Squash court",
  "Indoor games",
  "Spa",
  "Car parking",
] as const;

const LOCATION_ADVANTAGES = [
  ["IILM University", "Approx. 1 km"],
  ["Ardee Mall", "Approx. 2.7 km"],
  ["DLF Golf & Country Club", "Approx. 3.2 km"],
  ["Paras Hospitals", "Approx. 3.5 km"],
  ["Sector 54 Chowk", "Approx. 4.1 km"],
  ["ORCHIDS International School", "Approx. 4.5 km"],
  ["Cyber Park", "Approx. 5.8 km"],
  ["Gurgaon Railway Station", "Approx. 13.1 km"],
  ["IGI Airport", "Approx. 16.2 km"],
] as const;

const BUYER_CHECKS = [
  "Confirm exact tower, floor, unit number, carpet area, orientation and view before paying a token.",
  "Verify the current payment plan, applicable charges, taxes and total acquisition cost rather than relying only on a headline price.",
  "Match the apartment and payment details with the developer's current allotment documents and official project disclosures.",
  "Review funding eligibility, documentation and transaction timelines before committing to a particular unit.",
] as const;

const FAQS = [
  {
    q: "What is the price of Godrej Sora Sector 53 Gurgaon?",
    a: "The supplied market source reviewed for this listing showed 3 BHK pricing from about ₹9.30 Cr plus charges and 4 BHK pricing from about ₹10.18 Cr to ₹11.80 Cr plus charges. Live pricing can change by tower, floor, size, view, payment plan and availability, so buyers should obtain a current unit-wise quotation before making a decision.",
  },
  {
    q: "What sizes are available in Godrej Sora?",
    a: "The supplied source shows a 3 BHK at approximately 1,552 sq ft carpet area and 4 BHK apartments ranging from approximately 1,942 to 2,250 sq ft carpet area.",
  },
  {
    q: "What is the RERA number of Godrej Sora?",
    a: "The project is shown with Haryana RERA registration GGM/976/708/2025/79 dated 25 August 2025. Buyers should cross-check the current authority record and project documents before booking.",
  },
  {
    q: "When is Godrej Sora expected to be completed?",
    a: "The supplied project information states expected completion in September 2032. Actual handover remains subject to construction progress, approvals and the buyer's contractual documents.",
  },
  {
    q: "How can Shubh Estate Brokers help with Godrej Sora?",
    a: "Shubh Estate Brokers can help compare available 3 BHK and 4 BHK units by tower, floor, facing, view, payment plan and total cost, along with home-loan structuring, documentation checks, negotiation and transaction support.",
  },
] as const;

export const Route = createFileRoute("/projects/godrej-sora-sector-53-gurgaon")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_ORIGIN}/projects` },
                { "@type": "ListItem", position: 3, name: "Godrej Sora Sector 53", item: canonical },
              ],
            },
            {
              "@type": "RealEstateListing",
              name: "Godrej Sora Sector 53 Gurgaon",
              url: canonical,
              description,
              dateModified: "2026-08-25",
              address: {
                "@type": "PostalAddress",
                streetAddress: "GH-21, Urban Estate II, Sector 53, Wazirabad St",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "93000000",
                highPrice: "118000000",
                priceCurrency: "INR",
                offerCount: "2",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: GodrejSoraPage,
});

function GodrejSoraPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-12 md:py-18">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/projects" className="hover:text-foreground">Projects</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Godrej Sora Sector 53</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-gold/30 bg-gold/10 text-gold hover:bg-gold/10">New Launch</Badge>
                <Badge variant="secondary">RERA registered</Badge>
                <Badge variant="secondary">Sector 53 · Golf Course Road</Badge>
              </div>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-navy sm:text-5xl">
                Godrej Sora Sector 53 Gurgaon – Luxury 3 & 4 BHK Apartments
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
                Godrej Sora is a premium residential development by Godrej Properties in Sector 53, Gurugram, offering spacious 3 BHK and 4 BHK apartments in one of Gurgaon's established luxury residential locations.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Ask for Current Inventory
                  </a>
                </Button>
                <Button asChild variant="goldOutline">
                  <a href={CONTACT.phoneHref}><Phone className="mr-2 h-4 w-4" /> Call Shubh Estate</a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Project information and indicative pricing reviewed {LAST_REVIEWED}. Availability and prices can change.</p>
            </div>

            <aside className="rounded-2xl border border-gold/25 bg-card p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Project snapshot</p>
              <div className="mt-4 space-y-3">
                {QUICK_FACTS.slice(0, 6).map(([label, value]) => (
                  <div key={label} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="eyebrow">Project overview</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Premium low-density living in Sector 53</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The supplied project information describes Godrej Sora as an approximately 3.6-acre development with around 244 residences across four towers. The project has been positioned around privacy, premium arrival spaces and access to the established Golf Course Road ecosystem.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Published highlights include only two residences per core, private Genkan-style lift lobbies, two high-speed lifts and selected homes overlooking the Biodiversity Park. Buyers should verify the exact apartment-specific specification and view before booking.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-6">
            <MapPin className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-display text-xl">Project address</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">GH-21, Urban Estate II, Sector 53, Wazirabad St, Gurugram</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Floor plans & price guidance</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Godrej Sora 3 BHK and 4 BHK configurations</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {CONFIGURATIONS.map((item) => (
              <article key={item.type} className="rounded-2xl border border-border bg-card p-6">
                <Building2 className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-display text-2xl">{item.type}</h3>
                <p className="mt-3 font-medium">{item.area}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.price}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-gold/25 bg-gold/5 p-4 text-sm leading-6 text-muted-foreground">
            Prices above are indicative project figures from the supplied source and are not a live quotation. Contact Shubh Estate Brokers for current unit-wise availability, complete charges and executable pricing.
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Lifestyle</p>
            <h2 className="mt-3 font-display text-3xl text-navy">Amenities highlighted for Godrej Sora</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {AMENITIES.map((amenity) => (
                <div key={amenity} className="flex gap-3 rounded-xl border border-border p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Connectivity</p>
            <h2 className="mt-3 font-display text-3xl text-navy">Sector 53 location advantages</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              {LOCATION_ADVANTAGES.map(([place, distance]) => (
                <div key={place} className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 last:border-0">
                  <span className="text-sm font-medium">{place}</span>
                  <span className="text-sm text-muted-foreground">{distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Buyer due diligence</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl text-navy sm:text-4xl">What to verify before selecting a Godrej Sora unit</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BUYER_CHECKS.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <p className="eyebrow">FAQs</p>
        <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Godrej Sora Sector 53 questions</h2>
        <div className="mt-8 space-y-4">
          {FAQS.map((faq) => (
            <article key={faq.q} className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-xl">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-navy text-white">
        <div className="container-page grid gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Shubh Estate Brokers</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Get current Godrej Sora inventory and price comparison</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">
              Share your preferred configuration, budget, floor band, facing and view. We can help compare available units, total acquisition cost, documentation and financing options.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a></Button>
              <Button asChild variant="outline"><a href={CONTACT.phoneHref} className="border-white/30 text-white hover:bg-white/10 hover:text-white"><Phone className="mr-2 h-4 w-4" /> {CONTACT.phone}</a></Button>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-foreground">
            <EnquiryForm source="Godrej Sora Sector 53 project page" />
          </div>
        </div>
      </section>
    </>
  );
}
