import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeIndianRupee, Camera, FileCheck2, Handshake, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE_ORIGIN } from "@/lib/seo";

const SELLER_SERVICES = [
  {
    icon: BadgeIndianRupee,
    title: "Price positioning",
    body: "We review the project, unit, floor, view, condition, recent market evidence and competing inventory before recommending an asking-price range.",
  },
  {
    icon: Camera,
    title: "Listing presentation",
    body: "Property photographs, videos, key features and buyer-facing copy are organised so the listing explains the unit clearly instead of relying on a one-line advertisement.",
  },
  {
    icon: Users,
    title: "Buyer qualification",
    body: "Enquiries are screened for budget, purchase timeline and financing readiness so owner time is focused on buyers with a realistic chance of closing.",
  },
  {
    icon: Handshake,
    title: "Negotiation support",
    body: "Offers are compared on price, payment structure, loan dependence, possession timeline and documentation requirements rather than price alone.",
  },
  {
    icon: FileCheck2,
    title: "Document readiness",
    body: "We help organise the property information and transaction documents buyers and lenders commonly ask for, and coordinate specialist review where required.",
  },
  {
    icon: ShieldCheck,
    title: "Transaction coordination",
    body: "From buyer questions and lender valuation to token, agreement and closing coordination, the objective is to reduce avoidable delays in the sale process.",
  },
];

const FAQS = [
  {
    q: "How do you decide the right asking price for a Gurgaon property?",
    a: "We compare the specific unit with current competing inventory, project positioning, floor and view, property condition, recent market evidence and buyer demand before discussing an asking-price range with the owner.",
  },
  {
    q: "Do you use recent market evidence instead of relying only on asking prices?",
    a: "Yes. We consider available transaction evidence, current competing inventory, buyer responses and unit-specific differences. Public records and reported transactions can be incomplete or delayed, so the evidence is explained with its limitations rather than presented as a guaranteed selling price.",
  },
  {
    q: "Can you help with a time-sensitive or difficult-to-sell Gurgaon property?",
    a: "Yes. We can review whether the main obstacle is price, presentation, access for visits, property condition, documentation or a narrow buyer pool, then recommend a practical sale plan. No broker can guarantee a sale date, but realistic positioning and transaction readiness can reduce avoidable delay.",
  },
  {
    q: "Can you market a resale flat to NRI and outstation buyers?",
    a: "Yes. A well-prepared listing can be shared with local, outstation and NRI buyers, with video walkthroughs and remote coordination where appropriate.",
  },
  {
    q: "Can you handle buyers who need a home loan?",
    a: "We can coordinate property-related lender requirements and help the buyer organise the mortgage process. Final eligibility, valuation and sanction remain subject to the lender's policies.",
  },
  {
    q: "Can an owner start the sale process without immediately visiting your office?",
    a: "Yes. The initial property review, pricing discussion, document checklist and marketing preparation can begin remotely. Physical inspection can then be scheduled when needed.",
  },
  {
    q: "Will an owner's property details become public immediately after submission?",
    a: "No. A private seller submission is reviewed by the Shubh Estate Brokers team first. It is not automatically added to the buyer-facing property catalogue, and publication remains a separate manual decision after the property information is checked.",
  },
  {
    q: "How is seller and client information handled?",
    a: "Only information needed for the property review, marketing decision or transaction coordination should be collected and shared with relevant parties. Private documents and contact details are not intended to appear in a public listing without permission.",
  },
];

export const Route = createFileRoute("/sell-property-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/sell-property-gurgaon`;
    const title = "Sell Property in Gurgaon | List Your Flat for Sale | Shubh Estate Brokers";
    const description =
      "Sell or list your property in Gurgaon with pricing guidance, professional listing preparation, qualified buyer enquiries, negotiation support and transaction coordination.";

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
            name: "Property Selling and Listing Service in Gurgaon",
            provider: {
              "@type": "RealEstateAgent",
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
            areaServed: "Gurugram, Haryana, India",
            serviceType:
              "Residential property selling, resale listing and transaction coordination",
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
      ],
    };
  },
  component: SellPropertyPage,
});

function SellPropertyPage() {
  return (
    <>
      <PageHero
        eyebrow="For Property Owners"
        title="Sell your Gurgaon property with better preparation"
        body="A strong resale process starts before the advertisement goes live: sensible pricing, clear presentation, complete information and disciplined buyer follow-up."
      />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <p className="eyebrow">List Your Property</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">
              From owner listing to a transaction-ready opportunity
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Shubh Estate Brokers works with owners of apartments, builder floors, villas and other
              residential properties across Gurugram. The aim is to present the property accurately,
              attract serious enquiries and reduce friction once a buyer is ready to proceed.
            </p>
          </div>

          <h2 className="mt-10 font-display text-2xl">What we do for sellers</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SELLER_SERVICES.map((service) => (
              <div key={service.title} className="rounded-xl border border-border bg-card p-6">
                <service.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl surface-navy p-7 md:p-9">
            <p className="eyebrow">Better Listings</p>
            <h2 className="mt-3 font-display text-2xl">Give buyers enough information to act</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-navy-foreground/75">
              Good property marketing should answer the questions serious buyers ask: exact
              configuration, area, floor, facing, view, parking, condition, possession, project
              amenities, connectivity, asking price and loan suitability. Clear information improves
              enquiry quality and reduces repetitive calls.
            </p>
            <p className="mt-4 text-sm leading-6 text-navy-foreground/75">
              Owner submissions are reviewed privately and do not become buyer-facing listings
              automatically. Publication happens only after the Shubh Estate Brokers team checks the
              information and chooses to create or approve a public listing.
            </p>
          </div>

          <h2 className="mt-12 font-display text-2xl">Seller questions</h2>
          <dl className="mt-6 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-muted-foreground">
            Buying instead?{" "}
            <Link to="/properties" className="text-gold underline-offset-4 hover:underline">
              Browse current Gurgaon properties
            </Link>
            .
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">List your property</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Share the project or sector, configuration and expected price. We can start with a
            property review.
          </p>
          <div className="mt-4">
            <EnquiryForm interest="Sell property in Gurgaon" compact />
          </div>
        </aside>
      </section>
    </>
  );
}
