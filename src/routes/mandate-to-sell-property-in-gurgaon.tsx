import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, FileCheck2, Globe2, Handshake, LockKeyhole, Megaphone, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { OwnerServiceForm } from "@/components/site/OwnerServiceForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const BENEFITS = [
  { icon: UserCheck, title: "One accountable property advisor", body: "A single transaction representative coordinates the agreed marketing, buyer communication, visits and negotiation instead of leaving the owner to manage multiple unaligned conversations." },
  { icon: Megaphone, title: "Coordinated marketing", body: "The property is presented with one agreed information set and pricing position across the channels used for the mandate." },
  { icon: ClipboardCheck, title: "Consistent property pricing", body: "Avoid conflicting asking prices that can weaken buyer confidence and complicate negotiation." },
  { icon: ShieldCheck, title: "Qualified-buyer screening", body: "Filter enquiries around budget, timeline, financing and transaction readiness before owner time is committed." },
  { icon: LockKeyhole, title: "Controlled visits and owner privacy", body: "Coordinate viewing access and keep private owner contact details and documents outside public listing content." },
  { icon: Handshake, title: "Negotiation management", body: "Compare offers on price, payment terms, loan dependence, possession timing and other transaction conditions." },
  { icon: FileCheck2, title: "Documentation coordination", body: "Organise property information and transaction documents and coordinate specialist review where required." },
  { icon: Globe2, title: "Remote owner coordination", body: "Owners outside Gurgaon can manage discussions through WhatsApp, email and video consultation without a separate country-specific website journey." },
];

const FAQS = [
  {
    q: "What is an exclusive property selling mandate in Gurgaon?",
    a: "It is an agreed arrangement in which one property advisor is appointed to coordinate the sale for a defined period and scope. The exact commercial and legal terms should be clear in the mandate document before work begins.",
  },
  {
    q: "What are the advantages of giving one broker a selling mandate?",
    a: "Potential advantages include one accountable point of contact, consistent pricing, coordinated marketing, controlled site visits, centralised buyer feedback and a clearer negotiation process. A mandate does not guarantee a sale or a particular price.",
  },
  {
    q: "How long should a property selling mandate be?",
    a: "The appropriate period depends on the property, pricing, owner objective and likely buyer pool. The period should be long enough to execute the agreed marketing plan but clearly defined so both parties can review performance and next steps.",
  },
  {
    q: "Can I give a selling mandate while living outside India?",
    a: "Yes. The initial property review, scope discussion, document sharing, pricing review and much of the buyer coordination can be handled remotely. Any formal execution requirements should be confirmed for the specific owner and transaction.",
  },
  {
    q: "Does an exclusive mandate mean my property cannot be shown to other brokers' buyers?",
    a: "Not necessarily. The appointed advisor can still coordinate with other legitimate buyer sources or brokers when that forms part of the agreed marketing approach; the key point is that owner-facing execution and pricing remain coordinated through the mandate representative.",
  },
  {
    q: "Will Shubh Estate Brokers guarantee a sale under a mandate?",
    a: "No. A responsible mandate can define the work, communication and accountability, but no broker can credibly guarantee a buyer, sale date or final price. Market response depends on the property, pricing and buyer conditions.",
  },
];

export const Route = createFileRoute("/mandate-to-sell-property-in-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/mandate-to-sell-property-in-gurgaon`;
    const title = "Mandate to Sell Property in Gurgaon | Shubh Estate Brokers";
    const description =
      "Give a selling mandate for your Gurgaon property with coordinated marketing, qualified-buyer screening, controlled visits, negotiation and transaction tracking.";
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
            name: "Exclusive Property Selling Mandate in Gurgaon",
            provider: { "@type": "RealEstateAgent", name: "Shubh Estate Brokers", url: SITE_ORIGIN },
            areaServed: "Gurugram, Haryana, India",
            serviceType: "Exclusive residential property sale mandate and owner representation",
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
              { "@type": "ListItem", position: 2, name: "Selling Mandate in Gurgaon", item: canonical },
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
  component: SellingMandatePage,
});

function SellingMandatePage() {
  return (
    <>
      <PageHero
        eyebrow="Owner Representation"
        title="Give Shubh Estate Brokers a mandate to sell your Gurgaon property"
        body="A selling mandate gives the owner one accountable property representative for coordinated pricing, marketing, buyer screening, site visits, negotiation and transaction follow-up in Gurgaon (Gurugram)."
      />

      <main className="container-page py-14">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="eyebrow">What a Mandate Means</p>
            <h2 className="mt-3 font-display text-3xl">One coordinated sale process, without unrealistic guarantees</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              An exclusive selling mandate is useful when an owner wants one advisor to take responsibility for the agreed sale process for a defined period. The goal is consistency: one property brief, one pricing strategy, controlled buyer access, centralised feedback and documented follow-up. The mandate should define scope and expectations clearly; it is not a promise that the property will sell by a particular date or at a guaranteed price.
            </p>
          </div>
          <div className="rounded-2xl surface-navy p-7">
            <p className="eyebrow">Discuss a Mandate</p>
            <h2 className="mt-3 font-display text-2xl">Start with a property and pricing review</h2>
            <p className="mt-3 text-sm leading-6 text-navy-foreground/75">
              Share the project, size, occupancy, expected price and your preferred mandate period. We can then discuss whether a mandate is appropriate for the property.
            </p>
            <Button asChild variant="gold" className="mt-6 w-full">
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "mandate_page")}>
                <MessageCircle aria-hidden="true" /> WhatsApp About a Selling Mandate
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <p className="eyebrow">Owner Advantages</p>
          <h2 className="mt-3 font-display text-3xl">What coordinated representation can improve</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-border bg-card p-6">
                <benefit.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-gold/30 bg-secondary/30 p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="eyebrow">Owners Outside Gurgaon</p>
              <h2 className="mt-3 font-display text-3xl">Managing the mandate from another city or country</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Owners currently living outside India, elsewhere in India or simply away from Gurgaon can initiate the mandate discussion remotely. We can use WhatsApp, email and video consultation for the initial property review, receive available documents digitally, discuss pricing and marketing, and coordinate property access through an authorised representative where appropriate.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Mandate discussion checklist</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• Property and ownership overview</li>
                <li>• Current occupancy and access</li>
                <li>• Indicative valuation and expected price</li>
                <li>• Documents currently available</li>
                <li>• Marketing and buyer-screening scope</li>
                <li>• Preferred mandate period and reporting cadence</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="give-selling-mandate" className="mt-16 scroll-mt-24">
          <OwnerServiceForm mode="mandate" />
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          <RelatedLink to="/sell-property-gurgaon" title="Sell Property in Gurgaon" body="Review the full owner sale process, valuation, marketing and transaction support." />
          <RelatedLink to="/rent-out-property-in-gurgaon" title="Rent Out Property" body="For owners who want tenant placement or rental assessment instead of a sale." />
          <RelatedLink to="/property-services-gurgaon" title="Valuation & Owner Services" body="Explore property valuation, due-diligence coordination and related owner support." />
        </section>

        <section className="mt-16">
          <p className="eyebrow">Mandate Questions</p>
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

function RelatedLink({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <a href={to} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
      <span className="mt-4 inline-block text-sm font-medium text-gold">Explore service →</span>
    </a>
  );
}
