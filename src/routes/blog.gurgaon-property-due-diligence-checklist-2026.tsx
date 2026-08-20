import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Landmark,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_ORIGIN } from "@/lib/seo";

const PATH = "/blog/gurgaon-property-due-diligence-checklist-2026";
const CANONICAL = `${SITE_ORIGIN}${PATH}`;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Gurgaon Property Due Diligence Checklist: 12 Checks Before Token Money",
  description:
    "A practical 12-step Gurgaon property due-diligence checklist covering seller authority, title records, encumbrances, approvals, dues, valuation, financing and token terms.",
  datePublished: "2026-08-20",
  dateModified: "2026-08-20",
  mainEntityOfPage: CANONICAL,
  articleSection: "Property Due Diligence",
  keywords: [
    "Gurgaon property due diligence checklist",
    "Gurugram property title assessment",
    "Haryana RERA project verification",
    "resale property documents Gurgaon",
    "property token money checks",
  ],
  author: {
    "@type": "Person",
    name: "Arun Madan",
    jobTitle: "Founder, Shubh Estate Brokers",
  },
  publisher: {
    "@type": "RealEstateAgent",
    "@id": `${SITE_ORIGIN}/#real-estate-agent`,
    name: "Shubh Estate Brokers",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
    { "@type": "ListItem", position: 2, name: "Property Guides", item: `${SITE_ORIGIN}/blog` },
    { "@type": "ListItem", position: 3, name: "Property Due Diligence Checklist", item: CANONICAL },
  ],
};

export const Route = createFileRoute("/blog/gurgaon-property-due-diligence-checklist-2026")({
  head: () => ({
    meta: [
      { title: "Gurgaon Property Due Diligence Checklist 2026 | Buyer Guide" },
      {
        name: "description",
        content:
          "Use this 12-step Gurgaon property due-diligence checklist before paying token money. Check title, seller authority, HRERA status, dues, valuation, loan and agreement terms.",
      },
      {
        property: "og:title",
        content: "Gurgaon Property Due Diligence Checklist: 12 Essential Checks",
      },
      {
        property: "og:description",
        content:
          "A practical buyer checklist for title records, seller authority, approvals, dues, valuation, financing and token terms in Gurgaon property transactions.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { property: "article:published_time", content: "2026-08-20" },
      { property: "article:modified_time", content: "2026-08-20" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Gurgaon Property Due Diligence Checklist" },
      {
        name: "twitter:description",
        content: "Twelve checks to complete before paying token money on a Gurgaon property.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(articleSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ],
  }),
  component: DueDiligenceGuide,
});

const CHECKS = [
  {
    title: "Define the exact property and transaction type",
    text: "Record whether the transaction is a builder sale or resale and whether it concerns an apartment, builder floor, plot or commercial unit. The relevant document set, approvals and transfer process will differ.",
  },
  {
    title: "Confirm the seller's identity and authority",
    text: "Match the seller's identity with the ownership documents. Where an attorney, company, trust, legal heir or joint owner is involved, verify the authority and required participation before negotiating payment terms.",
  },
  {
    title: "Trace the ownership chain",
    text: "Review how the present owner acquired the property and whether earlier conveyance, allotment, transfer, inheritance or court documents form a coherent chain. Missing links need transaction-specific legal review.",
  },
  {
    title: "Match the property description across records",
    text: "Names, unit or plot number, tower, area, parking rights, boundaries and project details should be compared across the title document, builder or society records, tax records and proposed agreement.",
  },
  {
    title: "Check mortgages, charges and other encumbrances",
    text: "Ask whether the property is financed or pledged. Understand the lender's outstanding amount, original-document custody and the process for obtaining a release or no-dues confirmation at closing.",
  },
  {
    title: "Verify project, colony and regulatory status",
    text: "For relevant properties, review Haryana RERA disclosures and the applicable project or colony approvals. Also check whether the registration is current, lapsed or subject to directions that require closer review.",
  },
  {
    title: "Review occupation, completion and building records",
    text: "Depending on the property, confirm the available occupation or completion documentation, sanctioned use and material alterations. A lawyer or competent technical professional should assess property-specific gaps.",
  },
  {
    title: "Obtain society, builder and association confirmations",
    text: "Check membership or transfer requirements, maintenance status, parking records, move-in rules and any no-dues or no-objection process used by the builder, condominium association or RWA.",
  },
  {
    title: "Reconcile taxes, utilities and other dues",
    text: "Review property tax, electricity, water, maintenance and other recurring charges. The agreement should clearly allocate unpaid amounts, transfer fees and adjustments up to possession.",
  },
  {
    title: "Verify area, parking, fixtures and possession",
    text: "Record what is physically being sold, including area terminology, exclusive or common parking, fixtures, current occupancy and the promised vacant-possession date. Do not rely only on listing descriptions.",
  },
  {
    title: "Build price context and a financing plan",
    text: "Compare the asking price with competing inventory, condition, floor, view, transaction evidence where available and the applicable collector-rate context. Separately confirm lender eligibility and valuation; loan approval is not a substitute for title assessment.",
  },
  {
    title: "Put token and agreement protections in writing",
    text: "Before transferring token money, define the property, total consideration, document-review period, financing assumptions, default consequences, refund conditions, closing date, possession and responsibility for dues in a written instrument reviewed for your transaction.",
  },
] as const;

const OFFICIAL_RESOURCES = [
  {
    icon: ShieldCheck,
    title: "Haryana RERA project search",
    text: "Search registered projects and review the regulator's available project disclosures.",
    href: "https://haryanarera.gov.in/view_project/search_project",
  },
  {
    icon: FileCheck2,
    title: "Haryana land records",
    text: "Use the Jamabandi portal for the land-record services and queries available for Haryana.",
    href: "https://jamabandi.nic.in/land%20records/querylinkNew",
  },
  {
    icon: Building2,
    title: "Town & Country Planning, Haryana",
    text: "Review licensed-colony information published by the state planning department.",
    href: "https://tcpharyana.gov.in/LC%20DETAILS/LC%20DETAIL.htm",
  },
  {
    icon: Landmark,
    title: "Gurugram collector rates",
    text: "Consult the district administration's current collector-rate publications for price and duty context.",
    href: "https://gurugram.gov.in/collectorrates/",
  },
] as const;

function DueDiligenceGuide() {
  return (
    <main>
      <article>
        <header className="surface-navy">
          <div className="container-page max-w-5xl py-16 md:py-24">
            <nav aria-label="Breadcrumb" className="text-sm text-navy-foreground/65">
              <Link to="/blog" className="hover:text-gold">
                Property guides
              </Link>{" "}
              / Due diligence checklist
            </nav>
            <p className="eyebrow mt-6">Buyer Risk Checklist · Reviewed 20 August 2026</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              Gurgaon Property Due Diligence Checklist: 12 Checks Before Paying Token Money
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-8 text-navy-foreground/75 md:text-lg">
              Before committing funds, verify the seller's authority, ownership chain, property
              description, encumbrances, approvals, dues, price context and written transaction
              protections. This practical checklist helps buyers coordinate those checks in a
              sensible order.
            </p>
            <p className="mt-5 text-sm text-navy-foreground/65">
              Prepared by Shubh Estate Brokers · Founder-led guidance from Arun Madan
            </p>
          </div>
        </header>

        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
          <div className="max-w-3xl space-y-12">
            <section className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
              <p className="eyebrow">The short answer</p>
              <h2 className="mt-2 font-display text-3xl">
                What should you check before buying property in Gurgaon?
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Start with the seller and title records, then verify the property and regulatory
                records, clear outstanding dues, establish price and mortgage context, and document
                the conditions that protect the buyer before token money is paid. No single portal,
                broker check or bank approval replaces a transaction-specific review by the
                appropriate qualified professionals.
              </p>
            </section>

            <section>
              <p className="eyebrow">12-point checklist</p>
              <h2 className="mt-2 font-display text-3xl">
                A practical sequence for buyer due diligence
              </h2>
              <div className="mt-7 grid gap-5">
                {CHECKS.map((check, index) => (
                  <section
                    key={check.title}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 font-semibold text-gold">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl">{check.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{check.text}</p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section>
              <p className="eyebrow">Primary sources</p>
              <h2 className="mt-2 font-display text-3xl">
                Official portals to use during verification
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                These public sources can help you locate regulatory, land-record, planning and
                collector-rate information. Availability on a portal is an input to due-diligence
                coordination, not a legal conclusion about a specific property.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {OFFICIAL_RESOURCES.map(({ icon: Icon, title, text, href }) => (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
                  >
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                      Open official source <ExternalLink className="size-4" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <p className="eyebrow">Three separate judgements</p>
              <h2 className="mt-2 font-display text-3xl">
                Do not treat these checks as interchangeable
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  [
                    Scale,
                    "Legal review",
                    "A transaction-specific title and contract opinion from an independent qualified advocate.",
                  ],
                  [
                    Landmark,
                    "Credit review",
                    "A lender's assessment of the borrower, property acceptability and proposed mortgage structure.",
                  ],
                  [
                    ShieldCheck,
                    "Commercial review",
                    "Price context, physical inspection, suitability, disadvantages and execution risk.",
                  ],
                ].map(([Icon, title, text]) => {
                  const CardIcon = Icon as typeof Scale;
                  return (
                    <div key={title as string} className="rounded-2xl border border-border p-5">
                      <CardIcon className="size-5 text-gold" aria-hidden="true" />
                      <h3 className="mt-4 font-display text-xl">{title as string}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {text as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
              <p className="eyebrow">Before you transfer funds</p>
              <h2 className="mt-2 font-display text-3xl">
                Coordinate the property, documents and mortgage as one transaction
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Shubh Estate Brokers can help organise practical property assessment, price context,
                due-diligence coordination and mortgage structuring. Final legal, tax, valuation and
                lending decisions remain with the relevant qualified professional or institution.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <Link to="/contact">Request a buyer consultation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/property-buying-advisory-gurgaon">Explore buyer advisory</Link>
                </Button>
              </div>
            </section>

            <section className="text-sm leading-7 text-muted-foreground">
              <h2 className="font-display text-2xl text-foreground">Important limitation</h2>
              <p className="mt-3">
                This educational checklist is general information, not a legal opinion, title
                certificate, valuation, tax opinion or loan sanction. The records and process that
                matter can vary by property, ownership history and transaction. Engage an
                independent advocate and other appropriate qualified professionals before signing or
                paying non-refundable funds.
              </p>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
            <CheckCircle2 className="size-6 text-gold" aria-hidden="true" />
            <p className="eyebrow mt-4">Related guidance</p>
            <nav className="mt-4 grid gap-3 text-sm">
              <Link to="/property-buying-advisory-gurgaon" className="hover:text-gold">
                Gurgaon Property Buying Advisory
              </Link>
              <Link to="/property-services-gurgaon" className="hover:text-gold">
                Title, Documentation & Valuation Support
              </Link>
              <Link to="/home-loans" className="hover:text-gold">
                Home Loan & Mortgage Assistance
              </Link>
              <Link
                to="/blog/buy-property-gurgaon-small-down-payment-home-loan-guide-2026"
                className="hover:text-gold"
              >
                Small Down-Payment Guide
              </Link>
              <Link to="/blog" className="inline-flex items-center gap-2 hover:text-gold">
                All property guides <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </nav>
          </aside>
        </div>
      </article>
    </main>
  );
}
