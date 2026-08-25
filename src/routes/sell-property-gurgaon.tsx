import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck2, Globe2, Handshake, MessageCircle, Phone, Scale, ShieldCheck, Video } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { OwnerServiceForm } from "@/components/site/OwnerServiceForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const SELLING_STEPS = [
  "Property consultation",
  "Market valuation",
  "Comparable-property analysis",
  "Pricing recommendation",
  "Documentation review",
  "Professional listing creation",
  "Buyer screening",
  "Property marketing",
  "Site-visit coordination",
  "Offer and negotiation management",
  "Token and documentation support",
  "Home-loan coordination where required",
  "Transaction completion and handover coordination",
];

const FAQS = [
  {
    q: "How can I sell my property in Gurgaon?",
    a: "Start with a unit-specific pricing and documentation review. We then agree the positioning, prepare the listing, screen enquiries, coordinate visits and offers, and support the transaction through documentation and lender coordination where required.",
  },
  {
    q: "How do I determine the market value of my Gurgaon flat?",
    a: "A useful valuation compares the exact unit with competing inventory, recent available market evidence, project demand, floor, view, condition, size, occupancy and transaction constraints. An asking price should be a reasoned range, not a generic portal average.",
  },
  {
    q: "Can I sell a Gurgaon property while living outside India?",
    a: "Yes. Initial consultation, video review, document sharing, pricing discussion and much of the buyer coordination can be handled remotely. Transaction-specific tax, power-of-attorney or repatriation questions should be confirmed with the appropriate legal or tax professional.",
  },
  {
    q: "What documents are normally needed to sell a flat in Gurgaon?",
    a: "The exact set depends on the property and transaction, but buyers and lenders commonly ask for ownership/title documents, allotment or conveyance papers, payment records, possession or occupancy documents where applicable, identity details and information about any existing loan. We help organise the transaction file and flag items that need specialist review.",
  },
  {
    q: "Can you coordinate a buyer who needs a home loan?",
    a: "Yes. We can coordinate the property-related lender requirements, valuation visit and transaction timeline. Loan eligibility, valuation and sanction remain subject to the lender's policies.",
  },
  {
    q: "Should I give an exclusive selling mandate to one property advisor?",
    a: "A mandate can be useful when the owner wants one accountable representative, consistent pricing, controlled visits and coordinated negotiation. It should define the scope, period and expectations clearly without promising a guaranteed sale.",
  },
];

export const Route = createFileRoute("/sell-property-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/sell-property-gurgaon`;
    const title = "Sell Property in Gurgaon | Owner Sale Advisory | Shubh Estate Brokers";
    const description =
      "Sell property in Gurgaon or Gurugram with valuation guidance, professional marketing, buyer screening, negotiation, documentation and transaction coordination.";

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
            name: "Property Selling Advisory in Gurgaon",
            provider: { "@type": "RealEstateAgent", name: "Shubh Estate Brokers", url: SITE_ORIGIN },
            areaServed: "Gurugram, Haryana, India",
            serviceType: "Residential property selling, resale marketing and transaction coordination",
            url: canonical,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "Sell Property in Gurgaon", item: canonical },
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
    };
  },
  component: SellPropertyPage,
});

function SellPropertyPage() {
  return (
    <>
      <PageHero
        eyebrow="For Gurgaon Property Owners"
        title="Sell your Gurgaon property with disciplined pricing and transaction support"
        body="Shubh Estate Brokers helps owners in Gurgaon (Gurugram) and owners living elsewhere prepare, market and negotiate a property sale with clear information, qualified-buyer screening and transaction coordination."
      />

      <main className="container-page py-14">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="eyebrow">Owner Sale Advisory</p>
            <h2 className="mt-3 font-display text-3xl">A sale process built around the specific property</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              A serious buyer needs more than a portal advertisement. We review the unit, likely buyer profile, competing supply, asking-price logic, documents, visit access and financing considerations before the property is pushed into the market. The objective is better decision-making and cleaner execution, not an unrealistic promise of a guaranteed price or sale date.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Benefit icon={Scale} title="Evidence-led valuation" body="Compare the unit with relevant market evidence, competing inventory, floor, view, condition and project demand." />
              <Benefit icon={ShieldCheck} title="Owner privacy" body="Contact details and private documents stay within the enquiry and transaction workflow rather than appearing in public listing HTML." />
              <Benefit icon={Handshake} title="Qualified negotiation" body="Compare offers on price, payment terms, financing dependence, possession timing and documentation readiness." />
              <Benefit icon={FileCheck2} title="Transaction readiness" body="Organise the information buyers and lenders commonly need so avoidable documentation gaps surface earlier." />
            </div>
          </div>

          <div className="rounded-2xl surface-navy p-7">
            <p className="eyebrow">Speak to an Advisor</p>
            <h2 className="mt-3 font-display text-2xl">Start with a confidential property review</h2>
            <p className="mt-3 text-sm leading-6 text-navy-foreground/75">
              Owners can begin by phone, WhatsApp, email or video consultation. International-format numbers are accepted in the form below.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Button asChild variant="gold">
                <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "seller_page")}> <Phone aria-hidden="true" /> Call {CONTACT.phone}</a>
              </Button>
              <Button asChild variant="outline" className="border-navy-foreground/20 bg-transparent text-navy-foreground hover:bg-navy-foreground/10">
                <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "seller_page")}><MessageCircle aria-hidden="true" /> WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <p className="eyebrow">How We Work</p>
          <h2 className="mt-3 font-display text-3xl">From property consultation to transaction completion</h2>
          <ol className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SELLING_STEPS.map((step, index) => (
              <li key={step} className="rounded-xl border border-border bg-card p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Step {index + 1}</span>
                <p className="mt-2 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-2xl border border-gold/30 bg-secondary/30 p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <Globe2 className="size-6 text-gold" aria-hidden="true" />
                <p className="eyebrow">Remote Owner Support</p>
              </div>
              <h2 className="mt-3 font-display text-3xl">Managing your Gurgaon property from outside India?</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Owners based outside Gurgaon can start remotely without being forced through a separate country version of the website. We can arrange an initial video consultation, receive property information securely, discuss indicative valuation, coordinate access through an authorised representative where appropriate, and plan buyer communication around time-zone differences.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Where a transaction may involve a representative or power of attorney, we can coordinate the practical property process; transaction-specific legal, tax and repatriation advice should be confirmed by the relevant qualified professional.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <RemoteItem icon={MessageCircle} title="WhatsApp and international numbers" body="Start the discussion from India or overseas using your preferred contact method." />
              <RemoteItem icon={Video} title="Video consultation" body="Review the property, documents available, expected price and next steps before arranging physical access." />
            </div>
          </div>
        </section>

        <section id="sell-my-property" className="mt-16 scroll-mt-24">
          <OwnerServiceForm mode="sell" />
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Need to send property photos or videos too? Use our <Link to="/seller-submit" className="text-gold underline-offset-4 hover:underline">private owner submission link</Link>. It is intentionally noindex and does not publish your property automatically.
          </p>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          <RelatedLink to="/rent-out-property-in-gurgaon" title="Rent Out Property" body="Market rent assessment, tenant sourcing, screening and rental coordination for Gurgaon owners." />
          <RelatedLink to="/mandate-to-sell-property-in-gurgaon" title="Give Selling Mandate" body="One accountable representative for coordinated marketing, visits and negotiation." />
          <RelatedLink to="/home-loans" title="Home Loan Coordination" body="Coordinate buyer financing and property-related lender requirements where a sale depends on a loan." />
        </section>

        <section className="mt-16">
          <p className="eyebrow">Seller Questions</p>
          <h2 className="mt-3 font-display text-3xl">Frequently asked questions</h2>
          <dl className="mt-6 grid gap-4 lg:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}

function Benefit({ icon: Icon, title, body }: { icon: typeof Scale; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="size-5 text-gold" aria-hidden="true" />
      <h3 className="mt-3 font-display text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function RemoteItem({ icon: Icon, title, body }: { icon: typeof MessageCircle; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="size-5 text-gold" aria-hidden="true" />
      <h3 className="mt-3 font-display text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function RelatedLink({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <a href={to} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
      <span className="mt-4 inline-block text-sm font-medium text-gold">Explore service →</span>
    </a>
  );
}
