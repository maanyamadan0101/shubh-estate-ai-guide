import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, FileCheck2, Globe2, Handshake, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE_ORIGIN } from "@/lib/seo";

const SERVICES = [
  {
    icon: Globe2,
    title: "Sell from overseas",
    body: "Start the sale process remotely with a Gurgaon-based point of contact for property review, buyer communication, visit coordination and transaction follow-up.",
  },
  {
    icon: Camera,
    title: "Property presentation",
    body: "We organise the listing story around the actual unit: configuration, floor, view, condition, parking, project strengths, photographs, video and the information serious buyers ask for.",
  },
  {
    icon: Users,
    title: "Buyer reach and qualification",
    body: "The property can be presented to suitable local, outstation and NRI buyers while enquiries are screened for budget, timeline and financing readiness.",
  },
  {
    icon: Handshake,
    title: "Offer and negotiation support",
    body: "We compare buyer offers on price, payment plan, loan dependence, closing timeline and practical execution so you can evaluate the complete proposal from abroad.",
  },
  {
    icon: FileCheck2,
    title: "Document coordination",
    body: "We help organise the property information and transaction documents typically required by buyers and lenders and coordinate professional review where necessary.",
  },
  {
    icon: ShieldCheck,
    title: "Closing coordination",
    body: "For overseas owners, we coordinate the moving pieces around buyer due diligence, lender valuation, signing and closing with your appointed legal and tax professionals as required.",
  },
];

const FAQS = [
  {
    q: "Can an NRI owner sell a Gurgaon property without being in India throughout the process?",
    a: "Much of the marketing, buyer communication and transaction coordination can be handled remotely. Depending on the transaction and documentation, your lawyer or other authorised professional can advise whether a power of attorney or physical presence is required for particular steps.",
  },
  {
    q: "Can you find buyers for an NRI-owned resale property?",
    a: "Yes. We can prepare and market the property, coordinate buyer visits and remote walkthroughs, qualify enquiries and manage follow-up with serious buyers.",
  },
  {
    q: "How do you decide the asking price?",
    a: "We review the specific project and unit, floor, view, condition, current competing inventory, recent market evidence and buyer demand before discussing an asking-price range with the owner.",
  },
  {
    q: "Can you coordinate with the buyer's bank if the buyer needs a home loan?",
    a: "Yes. We can coordinate property-related lender requirements and valuation access. Final loan approval and valuation remain subject to the lender's policies.",
  },
];

export const Route = createFileRoute("/nri-sell-property-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/nri-sell-property-gurgaon`;
    const title = "NRI Sell Property in Gurgaon | Sell Your Flat from Abroad";
    const description =
      "NRI property selling support in Gurgaon: pricing guidance, professional listing preparation, buyer sourcing, remote visit coordination, negotiation and transaction support from abroad.";

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
            name: "NRI Property Selling Service in Gurgaon",
            provider: {
              "@type": "RealEstateAgent",
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
            areaServed: "Gurugram, Haryana, India",
            audience: {
              "@type": "Audience",
              audienceType: "NRI and OCI property owners",
            },
            serviceType: "NRI property resale marketing and transaction coordination",
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
  component: NriSellerPage,
});

function NriSellerPage() {
  return (
    <>
      <PageHero
        eyebrow="NRI Property Owners"
        title="Sell your Gurgaon property while living abroad"
        body="We help overseas owners prepare the property for market, reach suitable buyers and coordinate the sale process on the ground in Gurugram."
      />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <p className="eyebrow">NRI Seller Desk</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">Your local property-selling team in Gurgaon</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              An overseas owner should not have to depend on scattered calls between tenants, guards, relatives, buyers and brokers. We provide one local coordination point for pricing, listing preparation, buyer visits, negotiation and transaction follow-up.
            </p>
          </div>

          <h2 className="mt-10 font-display text-2xl">How we help NRI sellers</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <div key={service.title} className="rounded-xl border border-border bg-card p-6">
                <service.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl surface-navy p-7 md:p-9">
            <p className="eyebrow">Buyer Network</p>
            <h2 className="mt-3 font-display text-2xl">Your property can be marketed to buyers already searching Gurgaon</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-navy-foreground/75">
              Our buyer enquiries include end users, investors, outstation buyers and NRIs. A properly prepared resale listing gives us a better chance of matching the unit with buyers whose budget and location requirements fit the property.
            </p>
          </div>

          <h2 className="mt-12 font-display text-2xl">Questions from overseas owners</h2>
          <dl className="mt-6 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-muted-foreground">
            Looking to buy instead? <Link to="/nri" className="text-gold underline-offset-4 hover:underline">Visit our NRI buyer desk</Link>. Local owner?{" "}
            <Link to="/sell-property-gurgaon" className="text-gold underline-offset-4 hover:underline">Sell property in Gurgaon</Link>.
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Submit your Gurgaon property</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Tell us your country, project or sector, configuration, property status and expected price.
          </p>
          <div className="mt-4">
            <EnquiryForm interest="NRI seller enquiry — Gurgaon property" compact />
          </div>
        </aside>
      </section>
    </>
  );
}
