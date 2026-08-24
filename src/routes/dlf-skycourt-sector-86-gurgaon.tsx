import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  FileCheck2,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/dlf-skycourt-sector-86-gurgaon`;
const title = "DLF Skycourt Sector 86 Gurgaon | 3 BHK Resale & Buyer Guide";
const description =
  "DLF Skycourt Sector 86 Gurgaon buyer guide: ready-to-move 3 BHK project overview, unit sizes, amenities, location, resale checks and current inventory guidance.";

const QUICK_FACTS = [
  ["Developer", "DLF Limited"],
  ["Location", "Sector 86, New Gurgaon"],
  ["Configuration", "3 BHK apartments"],
  ["Typical project sizes", "Approx. 1,846–1,931 sq ft"],
  ["Project status", "Ready to move"],
  ["Towers", "10 towers"],
] as const;

const BUYER_CHECKS = [
  {
    factor: "Tower, floor & view",
    why: "Two apartments in the same project can have materially different light, openness, road exposure and resale appeal.",
    check: "Compare the actual view, sunlight, ventilation, lift proximity and noise at the same time of day you expect to use the home.",
  },
  {
    factor: "Usable layout",
    why: "Portal area labels can differ from the space a buyer experiences inside the apartment.",
    check: "Review the exact unit plan, room dimensions, balcony/skydeck utility and furniture placement before comparing only on rate per sq ft.",
  },
  {
    factor: "Condition & fit-outs",
    why: "Ready-to-move resale units can vary widely in flooring, woodwork, appliances, AC condition and refurbishment requirement.",
    check: "Inspect seepage signs, joinery, plumbing, electrical points, AC systems and the likely cost of upgrades before negotiating.",
  },
  {
    factor: "Parking, dues & transfer",
    why: "Transaction cost is more than the headline sale price.",
    check: "Reconfirm parking rights, society/maintenance dues, transfer requirements, utility balances and possession handover terms.",
  },
  {
    factor: "Title & financing",
    why: "A strong project name does not replace unit-level document verification or lender valuation.",
    check: "Review ownership/title papers and coordinate lender valuation early if home-loan funding is part of the purchase plan.",
  },
] as const;

const FAQS = [
  {
    q: "Where is DLF Skycourt located?",
    a: "DLF The Skycourt is located in Sector 86, New Gurgaon, within the wider DLF Gardencity area.",
  },
  {
    q: "Is DLF Skycourt ready to move?",
    a: "Yes. DLF Skycourt is an established ready-to-move residential project. Individual resale availability and possession readiness should still be reconfirmed for the specific apartment being considered.",
  },
  {
    q: "What configuration is available in DLF Skycourt?",
    a: "The project is primarily known for 3 BHK apartments. Public project sources commonly show unit sizes of approximately 1,846 to 1,931 sq ft depending on the specific plan and area convention used.",
  },
  {
    q: "What should I compare before buying a resale flat in DLF Skycourt?",
    a: "Compare tower, floor, view, natural light, unit condition, exact layout, parking, maintenance position, title documents, transfer requirements and lender valuation rather than relying only on a portal asking price.",
  },
  {
    q: "Can Shubh Estate Brokers help with DLF Skycourt resale and home loan coordination?",
    a: "Yes. Shubh Estate Brokers can help reconfirm available resale options, compare units, arrange site visits and coordinate home-loan processing. Final legal, valuation and lending decisions remain subject to the relevant professionals and lender policies.",
  },
] as const;

export const Route = createFileRoute("/dlf-skycourt-sector-86-gurgaon")({
  head: () => ({
    meta: [
      { title: `${title} | Shubh Estate Brokers` },
      { name: "description", content: description },
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            {
              "@type": "ListItem",
              position: 2,
              name: "New Gurgaon",
              item: `${SITE_ORIGIN}/locations/new-gurgaon`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "DLF Skycourt Sector 86 Gurgaon",
              item: canonical,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ApartmentComplex",
          "@id": `${canonical}#project`,
          name: "DLF The Skycourt",
          alternateName: "DLF Skycourt",
          url: canonical,
          description,
          address: {
            "@type": "PostalAddress",
            streetAddress: "DLF Gardencity, Sector 86",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122004",
            addressCountry: "IN",
          },
          additionalProperty: [
            { "@type": "PropertyValue", name: "Developer", value: "DLF Limited" },
            { "@type": "PropertyValue", name: "Configuration", value: "3 BHK apartments" },
            { "@type": "PropertyValue", name: "Status", value: "Ready to move" },
            { "@type": "PropertyValue", name: "Towers", value: "10" },
            {
              "@type": "PropertyValue",
              name: "Typical published size range",
              value: "Approximately 1,846–1,931 sq ft",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: DlfSkycourtPage,
});

function DlfSkycourtPage() {
  const whatsappMessage = encodeURIComponent(
    "Hello Mr Arun Madan, I want to check current resale options in DLF Skycourt, Sector 86 Gurgaon.",
  );

  return (
    <>
      <section className="surface-navy border-b border-gold/20">
        <div className="container-page py-14 md:py-20">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-gold">
              <span>Ready-to-move project guide</span>
              <span aria-hidden="true">·</span>
              <span>Sector 86, New Gurgaon</span>
            </div>
            <h1 className="mt-5 max-w-5xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              DLF Skycourt Sector 86 Gurgaon
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              A buyer-first guide to DLF The Skycourt: 3 BHK layouts, project context,
              amenities, resale due diligence and the unit-level checks that matter before
              paying a token.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "dlf_skycourt_hero")}
                >
                  <MessageCircle aria-hidden="true" />
                  Check Current Resale Options
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => trackContact("phone", "dlf_skycourt_hero")}
                >
                  Call {CONTACT.phone}
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs leading-5 text-white/60">
              Live inventory and owner asking prices change frequently. Availability is
              reconfirmed before a site visit or commercial discussion.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-6">
          {QUICK_FACTS.map(([label, value]) => (
            <div key={label} className="border-b border-border px-4 py-5 sm:border-b-0 lg:border-r">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <p className="mt-1 text-sm font-semibold leading-5">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur" aria-label="DLF Skycourt page sections">
        <div className="container-page flex gap-5 overflow-x-auto py-3 text-sm">
          <a href="#overview" className="whitespace-nowrap hover:text-gold">Overview</a>
          <a href="#sizes" className="whitespace-nowrap hover:text-gold">Layouts & sizes</a>
          <a href="#amenities" className="whitespace-nowrap hover:text-gold">Amenities</a>
          <a href="#location" className="whitespace-nowrap hover:text-gold">Location</a>
          <a href="#resale-checks" className="whitespace-nowrap hover:text-gold">Resale checks</a>
          <a href="#faq" className="whitespace-nowrap hover:text-gold">FAQ</a>
        </div>
      </nav>

      <main className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <article className="min-w-0">
            <section id="overview" className="scroll-mt-24">
              <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Reviewed for buyers, not copied from a portal listing</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Project facts were cross-checked against current public project sources on
                      23 August 2026. Because portal area, price and project-area fields can differ,
                      Shubh Estate Brokers separates stable project facts from live resale claims and
                      reconfirms the exact apartment before a buyer relies on them.
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Reviewed by Arun Madan, MBA, LLB · Founder & Promoter, Shubh Estate Brokers · Former Senior Banking Professional.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mt-10 font-display text-3xl md:text-4xl">DLF The Skycourt at a glance</h2>
              <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
                DLF The Skycourt is an established ready-to-move residential development in
                Sector 86, New Gurgaon. It is associated with DLF Gardencity and is primarily
                known for spacious 3 BHK homes, broad balconies/skydeck-style outdoor spaces and
                a landscaped, gated residential setting. For a resale buyer, however, the project
                name is only the starting point: tower, floor, view, unit condition and transaction
                documents can materially change the quality and value of one apartment versus another.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: Building2,
                    title: "Established project",
                    text: "Ready-to-move project with occupied residential towers, so buyers can assess the actual environment rather than only a brochure promise.",
                  },
                  {
                    icon: MapPin,
                    title: "New Gurgaon location",
                    text: "Sector 86 places the project within the New Gurgaon residential belt with road access towards NH-48, Dwarka Expressway corridors and employment hubs.",
                  },
                  {
                    icon: Landmark,
                    title: "DLF ecosystem",
                    text: "The project sits within the wider DLF Gardencity context, which strengthens project recognition but does not remove the need for unit-level valuation and document checks.",
                  },
                ].map(({ icon: Icon, title: cardTitle, text }) => (
                  <div key={cardTitle} className="rounded-xl border border-border bg-card p-5">
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl">{cardTitle}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="sizes" className="scroll-mt-24 pt-14">
              <h2 className="font-display text-3xl md:text-4xl">3 BHK layouts and published size range</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Current public project sources commonly show 3 BHK unit sizes of approximately
                1,846 to 1,931 sq ft, while some resale advertisements use different built-up or
                saleable-area labels. That is why a clean comparison should use the exact floor plan
                and the same area convention for every shortlisted apartment.
              </p>
              <div className="mt-6 rounded-2xl surface-navy p-7">
                <p className="eyebrow">A better comparison than “price per sq ft” alone</p>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/75 sm:grid-cols-2">
                  {[
                    "Exact sanctioned/unit plan and area basis",
                    "Living-dining usability and bedroom dimensions",
                    "Balcony/skydeck depth and practical use",
                    "Natural light, cross-ventilation and orientation",
                    "View permanence and nearby construction exposure",
                    "Refurbishment cost after possession",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="amenities" className="scroll-mt-24 pt-14">
              <h2 className="font-display text-3xl md:text-4xl">Amenities and everyday living</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Published project information highlights landscaped greens, water features,
                clubhouse and fitness/recreation facilities, swimming pool, security, power backup,
                play areas and sports/wellness spaces. A resale buyer should verify which facilities
                are currently operational, resident access rules and the maintenance cost applicable
                to the specific unit.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Landscaped common areas",
                  "Clubhouse & recreation",
                  "Swimming pool",
                  "Gym & wellness facilities",
                  "Gated security",
                  "Power backup",
                  "Children's play spaces",
                  "Jogging / movement areas",
                  "Community environment",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-card px-4 py-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section id="location" className="scroll-mt-24 pt-14">
              <h2 className="font-display text-3xl md:text-4xl">Sector 86, New Gurgaon location context</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Sector 86 is part of New Gurgaon, with road connectivity towards NH-48 and the wider
                Dwarka Expressway network. Schools, healthcare, retail and daily-use services have
                expanded across the surrounding sectors. Travel time should be checked against the
                buyer's actual workplace, school and peak-hour route rather than relying on a single
                marketing-time estimate.
              </p>
              <div className="mt-6 rounded-xl border border-border bg-secondary/50 p-6">
                <h3 className="font-display text-xl">For end users</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Test the commute at the hour you will actually travel, inspect local retail and
                  healthcare access, and visit the tower in daylight and evening. This often produces
                  a more useful decision than a generic “minutes from” location claim.
                </p>
              </div>
            </section>

            <section id="resale-checks" className="scroll-mt-24 pt-14">
              <h2 className="font-display text-3xl md:text-4xl">DLF Skycourt resale due-diligence checklist</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                The following framework is designed to make two apparently similar Skycourt resale
                options directly comparable before negotiation.
              </p>
              <div className="mt-7 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-secondary/70">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Unit factor</th>
                      <th className="px-5 py-4 font-semibold">Why it matters</th>
                      <th className="px-5 py-4 font-semibold">What we check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BUYER_CHECKS.map((row) => (
                      <tr key={row.factor} className="border-t border-border align-top">
                        <td className="px-5 py-4 font-semibold">{row.factor}</td>
                        <td className="px-5 py-4 leading-6 text-muted-foreground">{row.why}</td>
                        <td className="px-5 py-4 leading-6 text-muted-foreground">{row.check}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 rounded-2xl border border-gold/30 bg-card p-7">
                <div className="flex items-start gap-3">
                  <FileCheck2 className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-2xl">Need a current Skycourt comparison?</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Share your budget and preferred floor/view. We can reconfirm available units,
                      compare the commercial terms and arrange inspection of the actual apartments.
                      If funding is required, mortgage eligibility and lender valuation can be
                      coordinated before the transaction becomes time-sensitive.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24 pt-14">
              <h2 className="font-display text-3xl md:text-4xl">DLF Skycourt FAQs</h2>
              <div className="mt-6 space-y-4">
                {FAQS.map((faq) => (
                  <details key={faq.q} className="group rounded-xl border border-border bg-card p-5">
                    <summary className="cursor-pointer list-none font-semibold">{faq.q}</summary>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="pt-14">
              <div className="rounded-2xl surface-navy p-7 md:p-9">
                <p className="eyebrow">Continue your research</p>
                <h2 className="mt-3 font-display text-3xl text-white">Related Gurgaon property guides</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["/locations/new-gurgaon", "New Gurgaon property guide"],
                    ["/flats-for-sale-in-gurgaon", "Current Gurgaon property listings"],
                    ["/property-buying-advisory-gurgaon", "Property buying advisory"],
                    ["/home-loans", "Home-loan & mortgage assistance"],
                    ["/best-areas-gurgaon-property-investment", "Best Gurgaon investment areas"],
                    ["/blog/gurgaon-property-due-diligence-checklist-2026", "Property due-diligence checklist"],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="rounded-lg border border-white/15 px-4 py-3 text-sm text-white/80 hover:border-gold/50 hover:text-gold">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="eyebrow">DLF Skycourt enquiry</p>
              <h2 className="mt-2 font-display text-2xl">Check live resale inventory</h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Tell us your budget, preferred floor/view and purchase timeline. We will reconfirm
                live options before sharing a shortlist.
              </p>
              <div className="mt-5">
                <EnquiryForm interest="DLF Skycourt Sector 86 Gurgaon resale" compact />
              </div>
              <div className="mt-5 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
                <p>
                  Advisory led by{" "}
                  <Link to="/about" className="font-medium text-gold hover:underline">
                    Arun Madan, MBA, LLB
                  </Link>
                  , Founder & Promoter and former senior banking professional.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
