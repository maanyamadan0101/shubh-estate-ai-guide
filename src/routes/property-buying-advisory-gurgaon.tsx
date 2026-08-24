import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  Building2,
  CalendarCheck2,
  FileCheck2,
  Landmark,
  ListChecks,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const PROCESS = [
  {
    icon: ListChecks,
    title: "Budget and purpose first",
    body: "We begin with your usable budget, financing position, preferred commute, family needs and whether the property is for self-use, rental income or long-term investment.",
  },
  {
    icon: Building2,
    title: "Shortlist with reasons",
    body: "Projects and units are compared on liveability, developer track record, construction or maintenance quality, access, supply and likely resale or rental demand—not only brochure claims.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Price context",
    body: "Asking price, available market evidence, competing inventory, unit-specific features and applicable circle-rate context are considered before a buyer decides what the property is worth to them.",
  },
  {
    icon: CalendarCheck2,
    title: "Structured site visits",
    body: "We group suitable options logically so you can compare projects, neighbourhoods and units without spending the day visiting properties that do not fit the brief.",
  },
  {
    icon: FileCheck2,
    title: "Document and approval checks",
    body: "Property information, ownership documents, project approvals and Haryana RERA records are reviewed or coordinated with the appropriate independent professional before commitment.",
  },
  {
    icon: Landmark,
    title: "Financing and closing coordination",
    body: "Home-loan eligibility, lender valuation, negotiation, transaction documents and registration steps are coordinated as one process, subject to lender and professional approvals.",
  },
] as const;

const FAQS = [
  {
    q: "How can I avoid overpaying for property in an upcoming Gurgaon area?",
    a: "Do not rely on launch messaging or a single asking price. Compare the specific unit with available transaction evidence, competing resale and developer inventory, construction status, future supply, rental depth, access and the premium already built into the price. Shubh Estate Brokers presents this context before recommending whether a property deserves a site visit or an offer.",
  },
  {
    q: "Can a Gurgaon property consultant help me shortlist homes within a fixed budget?",
    a: "Yes. We first separate the purchase budget from stamp duty, registration, brokerage, loan charges, fit-out and other transaction costs. The property shortlist is then built around the usable acquisition budget, location needs and financing position instead of pushing the highest-priced available inventory.",
  },
  {
    q: "What is the difference between circle rate and market rate in Gurgaon?",
    a: "Circle rate is the government-notified benchmark used for registration and stamp-duty purposes. Market rate is the price buyers and sellers negotiate for a specific property. The two can differ, and unit-specific factors such as project, tower, floor, view, condition and payment terms can also affect the negotiated price.",
  },
  {
    q: "How do you verify builder credentials and project approvals?",
    a: "We review available Haryana RERA information, project and developer disclosures, the transaction documents supplied for the property and relevant lender acceptance. Legal conclusions and transaction-specific opinions should be confirmed by an independent qualified lawyer before funds are committed.",
  },
  {
    q: "Can one adviser coordinate property shortlisting, site visits, a home loan and registration?",
    a: "Shubh Estate Brokers can provide one coordination point for the property search, visit plan, price discussion, lender process and transaction follow-up. Final loan approval remains with the lender, while legal, tax and registration advice should come from the appropriate qualified professional.",
  },
  {
    q: "What costs should a Gurgaon buyer consider besides the property price?",
    a: "Depending on the transaction, a buyer may need to budget for stamp duty, registration, brokerage, lender or valuation charges, legal review, maintenance deposits, transfer charges and fit-out or renovation. Applicable charges should be confirmed for the specific property before an offer is finalised.",
  },
  {
    q: "Will you explain the disadvantages of a shortlisted property as well as the advantages?",
    a: "Yes. Our comparison covers relevant limitations such as price premium, future supply, construction or maintenance concerns, access, density, financing constraints and resale depth. The objective is to help the client reject unsuitable options early, not to make every property look attractive.",
  },
  {
    q: "What support do first-time homebuyers receive?",
    a: "First-time buyers receive a step-by-step explanation of budgeting, shortlisting, site visits, price comparison, documentation, home-loan coordination and the transaction sequence. Questions are handled before a token or other non-refundable commitment is made.",
  },
  {
    q: "Can women buyers request safety-focused and clearly scheduled site visits?",
    a: "Yes. Buyers can request daytime or pre-scheduled visits, location and access information, clear meeting details and a shortlist that considers neighbourhood, commute, occupied surroundings and nearby daily-use facilities.",
  },
  {
    q: "How is a buyer's personal and financial information handled?",
    a: "Only information needed for the agreed property search, enquiry or financing coordination should be collected and shared with relevant parties. Client data is not intended to be used for unrelated property promotion without permission.",
  },
] as const;

export const Route = createFileRoute("/property-buying-advisory-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/property-buying-advisory-gurgaon`;
    const title = "Property Buying Advisory in Gurgaon | Budget, Price & Due Diligence";
    const description =
      "Gurgaon property buying advice for budget-based shortlisting, realistic price comparison, site visits, document checks, home loans and transaction coordination.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Property Buying Advisory in Gurgaon",
            provider: {
              "@type": "RealEstateAgent",
              "@id": `${SITE_ORIGIN}/#real-estate-agent`,
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
            areaServed: "Gurugram, Haryana, India",
            serviceType:
              "Residential property shortlisting, price evaluation, site-visit, mortgage and transaction coordination",
            url: canonical,
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
                name: "Property Buying Advisory",
                item: canonical,
              },
            ],
          }),
        },
      ],
    };
  },
  component: PropertyBuyingAdvisoryPage,
});

function PropertyBuyingAdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gurgaon Buyer Advisory"
        title="Shortlist the right property before negotiating the price"
        body="Budget-first property advice for buyers who want clear comparisons, realistic price context, organised site visits and one point of coordination through financing and closing."
      />

      <section className="container-page py-16">
        <div className="rounded-2xl border border-gold/30 bg-card p-7 md:p-9">
          <p className="eyebrow">Direct answer</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">
            How Shubh Estate Brokers helps a Gurgaon buyer
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
            Shubh Estate Brokers helps homebuyers and investors define a usable budget, compare
            suitable Gurgaon projects and units, understand available price evidence, plan site
            visits, coordinate document checks and organise home-loan and transaction follow-up.
            Recommendations include relevant disadvantages and reasons to reject a property—not only
            its marketing strengths.
          </p>
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <SectionHead
            eyebrow="Buyer Process"
            title="From requirement to registration coordination"
            body="Each step is designed to reduce unsuitable visits, unclear costs and last-minute documentation or financing problems."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent">
                  <Icon className="size-5 text-gold" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-xl">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHead
              eyebrow="Buyer Questions"
              title="Clear answers before you commit funds"
              body="These are the practical questions buyers commonly ask when comparing Gurgaon properties, advisers and transaction costs."
            />
            <div className="mt-8 rounded-xl surface-navy p-7">
              <Scale className="size-6 text-gold" aria-hidden="true" />
              <p className="mt-4 font-display text-xl">
                Price, paperwork, financing and exit must all make sense.
              </p>
              <p className="mt-3 text-sm leading-6 text-navy-foreground/70">
                Market information can guide a decision, but availability, prices, government
                charges and lender policies change. Current facts must be reconfirmed for the
                specific property.
              </p>
            </div>
          </div>

          <dl className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="rounded-2xl surface-navy px-7 py-10 md:px-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <ShieldCheck className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-display text-3xl">
                Start with your budget and decision criteria
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-navy-foreground/70">
                Share your budget, preferred sectors, family or investment objective, expected
                purchase timeline and financing position. We will use those facts to structure the
                first shortlist.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
              </Button>
              <Button asChild variant="goldOutline">
                <Link to="/flats-for-sale-in-gurgaon">View Current Properties</Link>
              </Button>
              <Button asChild variant="goldOutline">
                <Link to="/blog/gurgaon-property-due-diligence-checklist-2026">
                  Use the 12-Point Checklist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
