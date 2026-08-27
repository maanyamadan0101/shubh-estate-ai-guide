import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileCheck2,
  Globe2,
  Handshake,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Video,
} from "lucide-react";
import { OwnerServiceForm } from "@/components/site/OwnerServiceForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const SELLING_STEPS = [
  {
    title: "Valuation & Sale Strategy",
    body: "We assess your unit, comparable inventory and demand to recommend a realistic selling range.",
    icon: Scale,
  },
  {
    title: "Marketing & Buyer Screening",
    body: "We position the property, screen enquiries and coordinate serious buyers and site visits.",
    icon: Handshake,
  },
  {
    title: "Legal, Documentation & Closing",
    body: "We coordinate offers, documentation, buyer financing, transaction formalities and handover through completion.",
    icon: FileCheck2,
  },
];

const SELLER_BENEFITS = [
  {
    title: "Seller protection & privacy",
    body: "Your contact details, documents and private property information are handled confidentially and are not publicly exposed.",
    icon: ShieldCheck,
  },
  {
    title: "Screened buyer enquiries",
    body: "We focus on genuine purchase intent, budget, payment capability and financing requirements before serious negotiations.",
    icon: Handshake,
  },
  {
    title: "Remote support for overseas owners",
    body: "Owners outside Gurgaon or India can manage valuation, buyer discussions, video reviews and much of the sale remotely.",
    icon: Globe2,
  },
  {
    title: "No public number. No broker-call flood.",
    body: "Your mobile number is not displayed on the public property listing, helping prevent uncontrolled calls and unnecessary enquiries.",
    icon: MessageCircle,
  },
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
    const title = "Sell Property in Gurgaon | Owner Sale Advisory";
    const description =
      "Sell property in Gurgaon with valuation guidance, professional marketing, buyer screening, negotiation, documentation and transaction coordination.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
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
  const whatsappMessage = encodeURIComponent(
    "Hi Shubh Estate Brokers, I want to sell my property in Gurgaon. Please help me with the current market valuation and selling process. I can share the project, property size, floor and expected price.",
  );
  const sellerWhatsapp = `${CONTACT.whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <section className="surface-navy">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow">For Gurgaon Property Owners</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">
                Sell Your Property in Gurgaon. At the Right Price, to the Right Buyer.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-navy-foreground/75 md:text-lg">
                Professional valuation, targeted marketing, buyer screening and complete transaction support — with your privacy protected throughout the sale.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <a href="#sell-my-property">Get My Property Valuation</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
                >
                  <a
                    href={sellerWhatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "seller_page_hero")}
                  >
                    <MessageCircle aria-hidden="true" /> WhatsApp Property Details
                  </a>
                </Button>
              </div>
            </div>

            <ul className="space-y-4 rounded-2xl border border-navy-foreground/15 bg-navy-foreground/[0.04] p-6 md:p-7">
              <HeroPoint>Unit-specific valuation — not a generic portal estimate.</HeroPoint>
              <HeroPoint>Screened buyer enquiries and controlled site visits.</HeroPoint>
              <HeroPoint>Private seller representation from pricing through closing.</HeroPoint>
            </ul>
          </div>
        </div>
      </section>

      <main className="container-page py-16 md:py-20">
        <section>
          <p className="eyebrow">A Clear Selling Process</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl md:text-4xl">Three steps from valuation to completion</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Selling should feel organised, not complicated. We keep the process focused on pricing, serious buyers and clean execution.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {SELLING_STEPS.map((step, index) => (
              <ProcessCard key={step.title} index={index + 1} {...step} />
            ))}
          </div>
        </section>

        <section className="mt-20 md:mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="eyebrow">Why Choose Shubh Estate Brokers</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Designed around the seller, not the advertisement</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Your property, pricing and contact information should stay controlled while the sale reaches serious buyers. We focus on privacy, qualification and accountable transaction support.
              </p>
              <div className="mt-7 rounded-2xl surface-navy p-6 md:p-7">
                <p className="font-display text-2xl">Prefer to discuss before filling a form?</p>
                <p className="mt-2 text-sm leading-6 text-navy-foreground/70">Speak directly with a Gurgaon property advisor or send the property details on WhatsApp.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild variant="gold">
                    <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "seller_page")}> <Phone aria-hidden="true" /> Call {CONTACT.phone}</a>
                  </Button>
                  <Button asChild variant="outline" className="border-navy-foreground/20 bg-transparent text-navy-foreground hover:bg-navy-foreground/10">
                    <a href={sellerWhatsapp} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "seller_page")}>
                      <MessageCircle aria-hidden="true" /> Discuss on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SELLER_BENEFITS.map((benefit) => (
                <InfoCard key={benefit.title} {...benefit} />
              ))}
            </div>
          </div>
        </section>

        <section id="sell-my-property" className="mt-20 scroll-mt-24 md:mt-24">
          <OwnerServiceForm mode="sell" />
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Need to send property photos or videos too? Use our <Link to="/seller-submit" className="text-gold underline-offset-4 hover:underline">private owner submission link</Link>. It is intentionally noindex and does not publish your property automatically.
          </p>
        </section>

        <section className="mt-20 rounded-2xl border border-gold/30 bg-secondary/30 p-7 md:mt-24 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <Globe2 className="size-6 text-gold" aria-hidden="true" />
                <p className="eyebrow">Remote Owner Support</p>
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Selling your Gurgaon property while living elsewhere?</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Owners outside Gurgaon or outside India can begin remotely. We can review the property, discuss indicative valuation, coordinate access, screen buyer enquiries and schedule communication around your location.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Where a transaction involves a representative or power of attorney, we coordinate the practical property process; transaction-specific legal, tax and repatriation advice should be confirmed with the relevant qualified professional.
              </p>
            </div>
            <div className="grid gap-4">
              <RemoteItem icon={MessageCircle} title="WhatsApp and international numbers" body="Start from India or overseas using your preferred contact method without publishing your number on the listing." />
              <RemoteItem icon={Video} title="Video consultation" body="Review the property, available documents, expected price and next steps before arranging physical access." />
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-5 md:mt-24 md:grid-cols-3">
          <RelatedLink to="/rent-out-property-in-gurgaon" title="Rent Out Property" body="Market rent assessment, tenant sourcing, screening and rental coordination for Gurgaon owners." />
          <RelatedLink to="/mandate-to-sell-property-in-gurgaon" title="Give Selling Mandate" body="One accountable representative for coordinated marketing, visits and negotiation." />
          <RelatedLink to="/home-loans" title="Home Loan Coordination" body="Coordinate buyer financing and property-related lender requirements where a sale depends on a loan." />
        </section>

        <section className="mt-20 md:mt-24">
          <p className="eyebrow">Seller Questions</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Frequently asked questions</h2>
          <dl className="mt-7 grid gap-4 lg:grid-cols-2">
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

function HeroPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-6 text-navy-foreground/85 md:text-base">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function ProcessCard({ icon: Icon, index, title, body }: { icon: typeof Scale; index: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-full bg-gold/10 text-gold">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Step {index}</span>
      </div>
      <h3 className="mt-6 font-display text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: typeof Scale; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="size-5 text-gold" aria-hidden="true" />
      <h3 className="mt-4 font-display text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
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
