import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Landmark,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_ORIGIN } from "@/lib/seo";

const PATH = "/blog/fsi-far-meaning-calculation-gurgaon";
const CANONICAL = `${SITE_ORIGIN}${PATH}`;
const TITLE = "FSI & FAR in Gurgaon: Meaning, Formula, Calculation & Buyer Guide";
const DESCRIPTION =
  "Understand FSI and FAR in Gurgaon, calculation formulas, ground coverage, purchasable FAR and the documents buyers should verify before purchasing property.";

const FAQS = [
  {
    question: "What is the full form of FSI and FAR?",
    answer:
      "FSI means Floor Space Index and FAR means Floor Area Ratio. Both describe the relationship between the floor area counted under applicable rules and the total plot area.",
  },
  {
    question: "Is FSI different from FAR in Gurgaon?",
    answer:
      "They generally describe the same planning concept. FSI is commonly shown as a decimal, while FAR may be shown as a ratio or percentage. Always check the convention used in the applicable approval or regulation.",
  },
  {
    question: "What is the permissible FAR for a residential plot in Gurgaon?",
    answer:
      "There is no single FAR figure for every Gurgaon plot. It can depend on plot size, land use, colony or sector conditions, road width, zoning, building category, purchased development rights and the regulations or orders currently applicable to the property.",
  },
  {
    question: "Is stilt parking counted in FAR in Gurgaon?",
    answer:
      "The treatment of a stilt area depends on its sanctioned use and the rules applicable to the property. An open parking area should not be assumed to remain exempt if it is enclosed or converted to another use.",
  },
  {
    question: "Can a bank reject a home loan if construction exceeds the sanctioned plan?",
    answer:
      "Material deviations can affect legal clearance, technical valuation or loan eligibility. The lender makes the final decision under its own policy after reviewing the property and documents.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: "2026-09-20",
  dateModified: "2026-09-20",
  mainEntityOfPage: CANONICAL,
  articleSection: "Gurgaon Property Due Diligence",
  keywords: [
    "FSI meaning",
    "FAR meaning in Gurgaon",
    "FSI calculation formula",
    "floor area ratio in Gurugram",
    "permissible FAR in Gurgaon",
    "purchasable FAR Haryana",
  ],
  author: {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/about#arun-madaan`,
    name: "Arun Madaan",
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
    { "@type": "ListItem", position: 3, name: "FSI and FAR in Gurgaon", item: CANONICAL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const Route = createFileRoute("/blog/fsi-far-meaning-calculation-gurgaon")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { property: "article:published_time", content: "2026-09-20" },
      { property: "article:modified_time", content: "2026-09-20" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(articleSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: FsiFarGuide,
});

const BUYER_CHECKS = [
  "Obtain the sanctioned building plan and identify the approving authority.",
  "Match the plot area and dimensions with the title, allotment and conveyance records.",
  "Compare the sanctioned drawing with the building as physically constructed.",
  "Check road width, setbacks, ground coverage, height, parking and permitted use.",
  "Review the occupation or completion documentation applicable to the property.",
  "Ask for approval and payment records supporting any additional or purchasable FAR.",
  "Check whether balconies, terraces, basements or stilt areas were later enclosed.",
  "For a developer project, compare the available Haryana RERA disclosures and approved plans.",
] as const;

const OFFICIAL_RESOURCES = [
  {
    title: "Town & Country Planning, Haryana",
    text: "Planning information, services and departmental notifications.",
    href: "https://tcpharyana.gov.in/",
  },
  {
    title: "Haryana RERA",
    text: "Search registered projects and available regulatory disclosures.",
    href: "https://haryanarera.gov.in/view_project/search_project",
  },
  {
    title: "Municipal Corporation of Gurugram",
    text: "Municipal services and authority-specific information for Gurugram.",
    href: "https://www.mcg.gov.in/",
  },
] as const;

function FormulaCard({
  title,
  formula,
  example,
}: {
  title: string;
  formula: string;
  example: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Calculator className="size-6 text-gold" aria-hidden="true" />
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <p className="mt-3 rounded-xl bg-muted px-4 py-3 font-mono text-sm leading-6">{formula}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{example}</p>
    </div>
  );
}

function FsiFarGuide() {
  return (
    <main>
      <article>
        <header className="surface-navy">
          <div className="container-page max-w-5xl py-16 md:py-24">
            <nav aria-label="Breadcrumb" className="text-sm text-navy-foreground/65">
              <Link to="/blog" className="hover:text-gold">
                Property guides
              </Link>{" "}
              / FSI and FAR guide
            </nav>
            <p className="eyebrow mt-6">Gurgaon Building & Buyer Guide · 20 September 2026</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              FSI and FAR in Gurgaon: Meaning, Formula, Calculation and Due Diligence
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-8 text-navy-foreground/75 md:text-lg">
              Learn how floor area is calculated, why FAR is not the same as ground coverage or
              super built-up area, and which approvals to examine before buying a plot, builder
              floor, independent house or commercial property in Gurgaon.
            </p>
            <p className="mt-5 text-sm text-navy-foreground/65">
              Prepared by Shubh Estate Brokers · Documentation-first guidance from Arun Madaan
            </p>
          </div>
        </header>

        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
          <div className="max-w-3xl space-y-12">
            <section className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
              <p className="eyebrow">The short answer</p>
              <h2 className="mt-2 font-display text-3xl">What do FSI and FAR mean?</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                FSI, or Floor Space Index, and FAR, or Floor Area Ratio, generally describe the same
                planning measure: the relationship between the floor area counted under the
                applicable regulations and the area of the plot. The number helps define
                construction potential, but the sanctioned plan also depends on coverage, setbacks,
                height, parking, use, access and other conditions.
              </p>
            </section>

            <section>
              <p className="eyebrow">Calculation</p>
              <h2 className="mt-2 font-display text-3xl">FSI and FAR formulas with examples</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <FormulaCard
                  title="Calculate FSI used"
                  formula="FSI = Counted floor area ÷ Plot area"
                  example="If 3,000 sq. ft. of floor area is counted on a 2,000 sq. ft. plot, the FSI used is 1.5."
                />
                <FormulaCard
                  title="Calculate FAR percentage"
                  formula="FAR (%) = FSI × 100"
                  example="An FSI of 1.5 is equivalent to FAR of 150%. An FSI of 2.0 is equivalent to FAR of 200%."
                />
              </div>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-5 py-4 font-semibold">FSI</th>
                      <th className="px-5 py-4 font-semibold">Equivalent FAR</th>
                      <th className="px-5 py-4 font-semibold">Combined counted floor area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["1.0", "100%", "Equal to the plot area"],
                      ["1.5", "150%", "1.5 times the plot area"],
                      ["2.0", "200%", "2 times the plot area"],
                      ["2.5", "250%", "2.5 times the plot area"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={cell} className="px-5 py-4 text-muted-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <p className="eyebrow">Worked example</p>
              <h2 className="mt-2 font-display text-3xl">FAR calculation for a 300 sq. yd. plot</h2>
              <div className="mt-5 rounded-2xl border border-border bg-card p-6 md:p-8">
                <ol className="space-y-5 text-sm leading-7 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">1. Convert the plot area:</strong> 300 sq.
                    yd. × 9 = 2,700 sq. ft.
                  </li>
                  <li>
                    <strong className="text-foreground">2. Use the verified applicable FAR:</strong>{" "}
                    If the sanctioned entitlement were 200%, the calculation would be 2,700 × 2.0.
                  </li>
                  <li>
                    <strong className="text-foreground">3. Preliminary result:</strong> 5,400 sq.
                    ft. of combined FAR-counted floor area, subject to the sanctioned plan and every
                    other applicable condition.
                  </li>
                </ol>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This illustration does not establish that 200% FAR applies to a particular Gurgaon
                plot. Obtain the property-specific entitlement from the competent authority or a
                qualified architect before relying on the result.
              </p>
            </section>

            <section>
              <p className="eyebrow">Do not confuse these measurements</p>
              <h2 className="mt-2 font-display text-3xl">
                FAR vs ground coverage, carpet area and super area
              </h2>
              <div className="mt-6 grid gap-4">
                {[
                  [
                    "Ground coverage",
                    "The portion of the plot occupied by the building footprint at ground level. It does not by itself state the combined area across all floors.",
                  ],
                  [
                    "Carpet area",
                    "The net usable area within a unit under the applicable definition. It is not the development potential of the complete plot.",
                  ],
                  [
                    "Built-up area",
                    "A property-area measure that generally adds wall and certain attached covered areas to the usable internal area.",
                  ],
                  [
                    "Super built-up area",
                    "A sale or marketing measure that may allocate a share of common areas. It should not be treated as the plot's permissible FAR.",
                  ],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-display text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="eyebrow">Included and exempt areas</p>
              <h2 className="mt-2 font-display text-3xl">What may count towards FAR?</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Habitable rooms, kitchens, bathrooms, internal passages, walls and enclosed
                additions commonly affect counted floor area. The treatment of basements, stilt
                parking, balconies, lift areas, service spaces, stairs and machine rooms depends on
                the relevant rules and the sanctioned use. Do not treat a general internet list as
                proof that a particular area is exempt.
              </p>
              <div className="mt-6 rounded-2xl border border-amber-400/35 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
                Enclosing an approved open balcony or converting stilt parking, a basement or a
                service area can create a deviation even where the headline FAR calculation appears
                to be within a limit.
              </div>
            </section>

            <section>
              <p className="eyebrow">Base and additional development rights</p>
              <h2 className="mt-2 font-display text-3xl">What is purchasable FAR?</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Certain property categories may be eligible for additional development rights after
                prescribed charges and approvals. Availability should never be assumed. Confirm the
                property's eligibility, the applicable calculation, payment records and the revised
                sanctioned plan. Payment of a charge alone should not be treated as approval for
                construction that is absent from the sanctioned drawing.
              </p>
            </section>

            <section>
              <p className="eyebrow">Builder floors and Stilt+4</p>
              <h2 className="mt-2 font-display text-3xl">
                Why current approval status must be checked property by property
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Policies affecting independent floors and stilt-plus-four construction have been
                subject to government conditions, infrastructure considerations and legal
                proceedings. Buyers should verify the present position on the transaction date and
                examine the actual sanctioned plan, floor configuration and occupation status of the
                building. The existence of a constructed fourth floor is not proof of approval.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="goldOutline">
                  <Link to="/blog/gurgaon-property-due-diligence-checklist-2026">
                    Use the buyer due-diligence checklist
                  </Link>
                </Button>
                <Button asChild variant="goldOutline">
                  <Link to="/property-services-gurgaon">Explore property verification support</Link>
                </Button>
              </div>
            </section>

            <section id="far-buyer-checklist" className="scroll-mt-28">
              <p className="eyebrow">Buyer checklist</p>
              <h2 className="mt-2 font-display text-3xl">
                How to check FAR before buying property in Gurgaon
              </h2>
              <div className="mt-6 space-y-3">
                {BUYER_CHECKS.map((check) => (
                  <div
                    key={check}
                    className="flex gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                    <p className="text-sm leading-7 text-muted-foreground">{check}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="eyebrow">Common mistakes</p>
              <h2 className="mt-2 font-display text-3xl">Four assumptions buyers should avoid</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Built means approved",
                    "Physical construction does not prove that the building or every alteration was sanctioned.",
                  ],
                  [
                    "Super area equals FAR",
                    "A project's marketed super area and a plot's planning entitlement measure different things.",
                  ],
                  [
                    "Parking can become a room",
                    "Changing an approved parking or service area may violate the plan, use and safety conditions.",
                  ],
                  [
                    "An online calculator is final",
                    "A calculator cannot determine the property category, current rules or sanctioned conditions.",
                  ],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-display text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" className="scroll-mt-28">
              <p className="eyebrow">Frequently asked questions</p>
              <h2 className="mt-2 font-display text-3xl">FSI and FAR FAQs</h2>
              <div className="mt-6 space-y-4">
                {FAQS.map((faq) => (
                  <section
                    key={faq.question}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <h3 className="font-display text-xl">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                  </section>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-gold/30 bg-muted/40 p-6 md:p-8">
              <p className="eyebrow">Important disclaimer</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                This guide is educational and is not legal, architectural or municipal advice.
                Building regulations, purchasable FAR, fees, approval processes and court or
                government directions can change. Obtain property-specific advice from the competent
                authority and qualified professionals before buying, selling, financing,
                constructing or redeveloping property.
              </p>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-gold/30 bg-card p-6">
              <ShieldCheck className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl">Need a property-specific review?</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Shubh Estate Brokers can coordinate document, valuation and home-loan checks before
                you commit funds to a Gurgaon property.
              </p>
              <Button asChild variant="gold" className="mt-5 w-full">
                <Link to="/contact?interest=property-due-diligence">
                  Request consultation <ArrowRight className="size-4" />
                </Link>
              </Button>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <FileCheck2 className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-3 font-display text-xl">Related guides</h2>
              <div className="mt-4 space-y-3 text-sm">
                <Link to="/flats-for-sale-in-gurgaon" className="block hover:text-gold">
                  Apartments for sale in Gurgaon
                </Link>
                <Link to="/projects-in-gurgaon" className="block hover:text-gold">
                  Residential projects in Gurgaon
                </Link>
                <Link to="/home-loans" className="block hover:text-gold">
                  Gurgaon home-loan guidance
                </Link>
                <Link
                  to="/blog/gurgaon-property-due-diligence-checklist-2026"
                  className="block hover:text-gold"
                >
                  Property due-diligence checklist
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <Landmark className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-3 font-display text-xl">Official resources</h2>
              <div className="mt-4 space-y-4">
                {OFFICIAL_RESOURCES.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-border p-4 transition hover:border-gold/50"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {resource.title} <ExternalLink className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {resource.text}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-3">
                <Building2 className="size-5 text-gold" aria-hidden="true" />
                <Scale className="size-5 text-gold" aria-hidden="true" />
              </div>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                A home-loan technical valuation or broker review does not replace independent legal
                and architectural advice where it is required.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
