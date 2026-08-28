import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, FileCheck2, Home, Landmark, MapPin, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/ready-to-move-flats-in-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Ready-to-Move Flats in Gurgaon | Resale Apartments";
const description =
  "Browse current ready-to-move flats for sale in Gurgaon and Gurugram. Compare resale apartments by corridor, project, size and price with home-loan, title and due-diligence guidance.";
const LAST_REVIEWED = "28 August 2026";

const CORRIDORS = [
  {
    name: "Dwarka Expressway",
    href: "/dwarka-expressway-flats-for-sale-gurgaon",
    text: "Compare completed and resale inventory across Sectors 99–111, including unit-level floor, view and asking-price context.",
  },
  {
    name: "Golf Course Road",
    href: "/locations/golf-course-road",
    text: "Established premium societies where actual apartment condition, maintenance, access and resale comparables can be reviewed before purchase.",
  },
  {
    name: "Golf Course Extension Road",
    href: "/locations/golf-course-extension-road",
    text: "Premium completed communities alongside newer supply, useful for comparing ready homes against active construction-stage options.",
  },
  {
    name: "Southern Peripheral Road (SPR)",
    href: "/properties-for-sale-on-spr-gurgaon",
    text: "Ready and near-ready residential choices across south Gurgaon with access to Golf Course Extension Road, Sohna Road and NH-48.",
  },
  {
    name: "Sohna Road",
    href: "/locations/sohna-road",
    text: "A mature resale-led market with occupied societies, everyday infrastructure and a broad range of apartment budgets.",
  },
  {
    name: "New Gurgaon",
    href: "/locations/new-gurgaon",
    text: "Completed and occupied projects across developing sectors where commute, occupancy, maintenance and resale depth matter strongly.",
  },
] as const;

const BUYER_CHECKS = [
  {
    icon: FileCheck2,
    title: "Title and ownership chain",
    text: "Review the seller's ownership documents, transfer history, dues and transaction-specific title papers before paying a token.",
  },
  {
    icon: CheckCircle2,
    title: "Completion and occupation status",
    text: "Confirm the exact tower or phase and check applicable occupation or completion documentation instead of relying only on a project-level ready-to-move label.",
  },
  {
    icon: Home,
    title: "Exact apartment condition",
    text: "Inspect floor, facing, view, natural light, parking, furnishing, seepage, fit-out condition and likely repair or renovation cost.",
  },
  {
    icon: Landmark,
    title: "Loan and valuation readiness",
    text: "A lender's technical and legal review can influence eligibility and valuation. Coordinate financing early when a home loan is required.",
  },
] as const;

const PROJECT_GUIDES = [
  {
    name: "DLF The Primus, Sector 82A",
    href: "/projects/dlf-the-primus-sector-82a-gurgaon",
    text: "Ready residential project in New Gurgaon with current resale context and buyer checks.",
  },
  {
    name: "DLF Skycourt, Sector 86",
    href: "/dlf-skycourt-sector-86-gurgaon",
    text: "Completed New Gurgaon apartments with project, unit and resale guidance.",
  },
  {
    name: "Puri Emerald Bay, Sector 104",
    href: "/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon",
    text: "Ready-to-move Dwarka Expressway resale apartment with unit-level details and video context.",
  },
] as const;

const FAQS = [
  {
    q: "What does ready-to-move mean when buying a flat in Gurgaon?",
    a: "It generally means the relevant apartment or project phase is completed and available for possession, but buyers should still verify the exact tower or phase, applicable occupation or completion documentation, ownership papers and physical condition before purchase.",
  },
  {
    q: "Is a ready-to-move resale flat safer than an under-construction flat?",
    a: "A ready home can be physically inspected and has less construction-completion uncertainty, but it can still carry title, maintenance, renovation, pricing or society-management risks. The exact unit and documents should be reviewed independently.",
  },
  {
    q: "Can I get a home loan on a resale flat in Gurgaon?",
    a: "Yes, eligible resale properties can be financed subject to the buyer's credit profile, lender policy, property valuation and legal or technical approval of the specific property.",
  },
  {
    q: "Which Gurgaon corridors have ready-to-move apartments?",
    a: "Ready and resale inventory is found across Golf Course Road, Golf Course Extension Road, Dwarka Expressway, SPR, Sohna Road, New Gurgaon and established central Gurgaon locations. Availability varies by exact project and unit.",
  },
  {
    q: "Can an NRI or overseas buyer purchase a ready flat remotely?",
    a: "Much of the shortlisting, video walkthrough, document coordination, valuation and home-loan process can be handled remotely. Transaction-specific tax, foreign-exchange and power-of-attorney questions should be confirmed with qualified professionals.",
  },
];

export const Route = createFileRoute("/ready-to-move-flats-in-gurgaon")({
  loader: async () => {
    const { properties, error } = await listPublicProperties({
      data: { statuses: ["ready_to_move"], limit: 60 },
    });
    const readyApartments = properties.filter(
      (property) => property.listing_type === "sale" && property.property_type === "apartment",
    );
    return { properties: readyApartments, error };
  },
  head: ({ loaderData }) => {
    const properties = (loaderData?.properties ?? []) as ListingRow[];
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        {
          "@type": "ListItem",
          position: 2,
          name: "Flats for Sale in Gurgaon",
          item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
        },
        { "@type": "ListItem", position: 3, name: "Ready-to-Move Flats in Gurgaon", item: canonical },
      ],
    };
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Current ready-to-move flats for sale in Gurgaon",
      numberOfItems: properties.length,
      itemListElement: properties.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: property.title,
        url: `${SITE_ORIGIN}/property/${property.slug}`,
      })),
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(itemListSchema) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
    };
  },
  component: ReadyToMoveGurgaonPage,
});

function ReadyToMoveGurgaonPage() {
  const { properties, error } = Route.useLoaderData() as {
    properties: ListingRow[];
    error: string | null;
  };

  return (
    <>
      <PageHero
        eyebrow="Current Resale & Completed Homes"
        title="Ready-to-Move Flats for Sale in Gurgaon"
        body={`Compare ${properties.length} current published ready-to-move apartment options across Gurugram. Review the exact unit, price, project condition, documents and financing before making a purchase decision. Inventory reviewed ${LAST_REVIEWED}.`}
      />

      <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <Home className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 font-display text-3xl">{properties.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Published ready apartment options currently returned by the catalogue</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <MapPin className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 font-display text-3xl">6</p>
            <p className="mt-1 text-sm text-muted-foreground">Major Gurgaon corridors linked for comparison</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 font-display text-xl">Unit-level verification</p>
            <p className="mt-1 text-sm text-muted-foreground">Title, possession status, condition, valuation and financing reviewed around the exact property</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-14">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Search by micro-market</p>
            <h2 className="mt-2 font-display text-3xl">Ready and resale property across Gurgaon corridors</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              A ready-to-move search should quickly narrow from Gurgaon to the right corridor, then to the project and exact apartment. Use these corridor pages to compare connectivity, maturity, competing supply and live inventory.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORRIDORS.map((corridor) => (
              <a key={corridor.name} href={corridor.href} className="rounded-xl border border-border bg-card p-6 transition hover:border-gold/50">
                <h3 className="font-display text-xl">{corridor.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{corridor.text}</p>
                <span className="mt-4 inline-block text-sm font-medium text-gold">Explore {corridor.name} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Before token payment</p>
          <h2 className="mt-2 font-display text-3xl">A completed flat still needs due diligence</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Ready-to-move reduces construction uncertainty, but it does not remove transaction risk. Price, title, dues, physical condition, society quality and lender valuation can materially affect the decision.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {BUYER_CHECKS.map(({ icon: Icon, title: checkTitle, text }) => (
            <article key={checkTitle} className="rounded-xl border border-border bg-card p-6">
              <Icon className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl">{checkTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link to="/blog/gurgaon-property-due-diligence-checklist-2026" className="font-medium text-gold underline-offset-4 hover:underline">
            Gurgaon property due-diligence checklist
          </Link>
          <Link to="/home-loans" className="font-medium text-gold underline-offset-4 hover:underline">
            Home-loan & valuation assistance
          </Link>
          <Link to="/property-buying-advisory-gurgaon" className="font-medium text-gold underline-offset-4 hover:underline">
            Buyer advisory
          </Link>
          <Link to="/nri" className="font-medium text-gold underline-offset-4 hover:underline">
            Overseas buyer support
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-14">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Project-level research</p>
            <h2 className="mt-2 font-display text-3xl">Start with established ready-home project guides</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PROJECT_GUIDES.map((project) => (
              <a key={project.href} href={project.href} className="rounded-xl border border-border bg-card p-6 transition hover:border-gold/50">
                <h3 className="font-display text-xl">{project.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.text}</p>
                <span className="mt-4 inline-block text-sm font-medium text-gold">Open project guide →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14" id="current-ready-inventory">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Live catalogue</p>
            <h2 className="mt-2 font-display text-3xl">Current ready-to-move apartments for sale</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Every card below is drawn from currently published ready-to-move apartment inventory. Similar configurations can represent separate genuine available units; compare the exact listing rather than assuming they are duplicates.
            </p>
          </div>
          <Link to="/flats-for-sale-in-gurgaon" className="text-sm font-medium text-gold underline-offset-4 hover:underline">
            View the full Gurgaon catalogue
          </Link>
        </div>

        {properties.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-border bg-card p-7 text-sm text-muted-foreground">
            Ready-to-move inventory is being refreshed. Use the enquiry form below for the current shortlist.
          </div>
        )}

        {error ? (
          <p className="mt-4 text-xs text-muted-foreground">
            The live inventory feed could not be fully refreshed on this request; project and corridor guidance remains available.
          </p>
        ) : null}
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-8 rounded-2xl border border-gold/30 bg-card p-7 lg:grid-cols-[1fr_24rem] lg:p-9">
          <div>
            <h2 className="font-display text-3xl">Need a ready-home shortlist?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Share your budget, preferred corridor, BHK, approximate size and whether the purchase is for self-use or investment. We can compare genuinely available units, coordinate site visits and align home-loan and document checks before commitment.
            </p>
          </div>
          <EnquiryForm interest="Ready-to-move Gurgaon property shortlist" compact />
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Frequently asked questions</p>
          <h2 className="mt-2 font-display text-3xl">Buying a ready-to-move flat in Gurgaon</h2>
          <div className="mt-7 space-y-5">
            {FAQS.map((faq) => (
              <article key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-xl">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
