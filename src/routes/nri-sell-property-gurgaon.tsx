import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeIndianRupee, Building2, Camera, CheckCircle2, FileCheck2, Globe2, Handshake, Landmark, Scale, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE_ORIGIN } from "@/lib/seo";

const CANONICAL = `${SITE_ORIGIN}/nri-sell-property-gurgaon`;

const SERVICES = [
  { icon: Building2, title: "End-to-end property resale and marketing", body: "We prepare the property for sale, build an accurate listing, arrange photographs or video, promote it through suitable digital and broker channels, screen enquiries, coordinate visits and keep you informed from first enquiry to closing." },
  { icon: BadgeIndianRupee, title: "Property valuation and market intelligence", body: "Pricing is assessed against the exact project, tower, floor, view, area, condition, competing inventory, recent transaction evidence and present buyer demand. You receive a practical asking-price strategy—not an inflated number designed only to win the mandate." },
  { icon: Scale, title: "POA, legal and documentation coordination", body: "We help organise title documents, allotment or conveyance papers, builder or society records, tax receipts and transfer requirements, and coordinate with your appointed advocate on a transaction-specific Special Power of Attorney when remote execution is required." },
  { icon: Landmark, title: "TDS, capital gains and repatriation coordination", body: "We coordinate transaction information with your chartered accountant and authorised dealer bank for Section 195 TDS, a lower or nil deduction application where eligible, capital-gains reporting, Form 15CA/15CB where applicable and FEMA-compliant repatriation documentation." },
  { icon: Camera, title: "Property inspection and local oversight", body: "For vacant or occupied homes, offices and plots, we can coordinate on-ground inspections, condition reports, live video walkthroughs, access for serious buyers and practical maintenance follow-up agreed with the owner." },
  { icon: Handshake, title: "Buyer qualification and negotiation", body: "Offers are compared on price, funding readiness, payment schedule, loan dependence, due-diligence requirements and closing timeline. This helps you judge the complete proposal instead of relying on the headline offer alone." },
] as const;

const PROCESS = [
  { title: "Consultation and evidence-led valuation", body: "Share the location, project, unit details, ownership status, occupancy, expected price and preferred timeline. We review the property and discuss a realistic positioning strategy." },
  { title: "Document and readiness review", body: "Available title papers, allotment or conveyance documents, payment records, property-tax receipts, society or builder dues and identity details are organised for professional review. Any gap is identified early." },
  { title: "Presentation, marketing and buyer matching", body: "After your approval, we prepare buyer-facing content, photographs or video and a channel plan. Enquiries are screened before visits, and overseas owners receive clear progress updates." },
  { title: "Offer, due diligence and agreement", body: "We compare offers, coordinate buyer or lender inspection, support commercial negotiation and organise information for the Agreement to Sell. Your lawyer and tax advisor confirm the legal and tax structure, including any POA." },
  { title: "Registration, tax compliance and transfer of funds", body: "The parties complete final payments and registration through the appropriate banking channels. We coordinate the practical closing steps with your advocate, chartered accountant and authorised dealer bank for TDS documentation and eligible repatriation." },
] as const;

const FAQS = [
  { q: "Can an NRI sell property in Gurugram without visiting India?", a: "Many sale activities can be handled remotely, including valuation, marketing, buyer screening, video inspections and negotiation. Where representation is required, an appropriately drafted Special Power of Attorney may be used after execution, authentication or adjudication formalities are confirmed by your advocate and the relevant registration authority. The exact process depends on the property and jurisdiction." },
  { q: "What are the TDS rules when an NRI sells property in India?", a: "The buyer generally deducts tax under Section 195 when paying a non-resident seller. The applicable amount depends on the seller's facts, holding period, taxable capital gain, surcharge and cess, and any lower or nil deduction certificate obtained from the Income Tax Department. Both parties should obtain case-specific advice from a chartered accountant before fixing payment milestones." },
  { q: "Can the sale proceeds be repatriated outside India?", a: "Repatriation is possible subject to FEMA and RBI rules, the source and history of funds, eligible account routing, payment of applicable taxes and documents required by the authorised dealer bank. Limits and conditions can differ, including for residential properties, so the seller's bank and chartered accountant should confirm the route before completion." },
  { q: "Which documents should an NRI seller prepare?", a: "Common documents include the title or conveyance deed, allotment and possession papers where relevant, PAN, passport and overseas-address proof, property-tax and maintenance records, encumbrance or loan-closure papers, and society or builder transfer documents. A lawyer should confirm the final list for the specific property and sale structure." },
  { q: "How will my Gurugram property be valued and marketed?", a: "We assess the exact unit against active competition, recent market evidence, project demand, floor, view, condition, parking and transfer costs. Marketing can include a professionally written listing, approved photographs or video, targeted digital promotion, broker-network outreach and direct matching with qualified buyers." },
] as const;

export const Route = createFileRoute("/nri-sell-property-gurgaon")({
  head: () => {
    const title = "Sell NRI Property in Gurgaon | Legal & Tax Help";
    const description = "Sell NRI property in Gurgaon with valuation, verified buyers, POA, legal and tax coordination. Get transparent remote support and the best price.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "website" }, { property: "og:url", content: CANONICAL },
        { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: CANONICAL }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service", "@id": `${CANONICAL}#service`,
          name: "NRI Property Services in Gurugram", description,
          serviceType: "NRI property resale, valuation and transaction coordination", url: CANONICAL,
          provider: { "@id": `${SITE_ORIGIN}/#real-estate-agent` },
          areaServed: { "@type": "City", name: "Gurugram", containedInPlace: { "@type": "State", name: "Haryana" } },
          audience: { "@type": "Audience", audienceType: "NRI and OCI property owners" },
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
        }) },
      ],
    };
  },
  component: NriSellerPage,
});

function NriSellerPage() {
  return (
    <>
      <PageHero eyebrow="NRI & Overseas Owner Desk" title="NRI Property Services in Gurugram" body="Sell, manage and unlock the value of your residential or commercial property in Gurugram from anywhere in the world—with one accountable local team for valuation, buyer search, inspections and transaction coordination." />
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <main>
          <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <p className="eyebrow">Local execution. Overseas control.</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">A structured Gurugram property service for overseas owners</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Distance can make a property sale harder to price, inspect and supervise. Shubh Estate Brokers acts as your on-ground coordination point in Gurugram, while key commercial decisions remain with you. Our founder-led approach draws on banking, mortgage, valuation and legal-documentation experience to identify risks early, organise the transaction and communicate each milestone clearly.</p>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">We work across Golf Course Road, Golf Course Extension Road, South City, Nirvana Country, Sohna Road, Southern Peripheral Road, Dwarka Expressway and New Gurgaon. Support is available for apartments, builder floors, plots, villas and suitable commercial assets.</p>
          </div>

          <section aria-labelledby="nri-services">
            <p className="mt-12 eyebrow">Core NRI Services</p>
            <h2 id="nri-services" className="mt-2 font-display text-3xl">From market preparation to a coordinated closing</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SERVICES.map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-xl border border-border bg-card p-6">
                  <Icon className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl surface-navy p-7 md:p-9" aria-labelledby="why-us">
            <p className="eyebrow">Why Shubh Estate Brokers</p>
            <h2 id="why-us" className="mt-3 font-display text-3xl">Property judgement backed by banking and legal understanding</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {[
                ["Banking and mortgage perspective", "An ex-banking background helps us evaluate buyer funding, lender valuation, payment structures and execution risk—not just the quoted sale price."],
                ["Legal-documentation awareness", "A law graduate's perspective supports disciplined document organisation and coordination with your appointed advocate for title, POA and registration requirements."],
                ["Gurugram micro-market knowledge", "We compare your unit with real competing supply and buyer demand in its project, sector and corridor to build a credible pricing position."],
                ["Transparent owner communication", "You receive agreed milestones, buyer feedback and offer comparisons through direct digital communication, with no public release of private documents."],
              ].map(([title, body]) => (
                <div key={title} className="border-l-2 border-gold pl-4">
                  <h3 className="font-medium text-navy-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-navy-foreground/75">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="selling-process">
            <p className="eyebrow">Five-Step Selling Process</p>
            <h2 id="selling-process" className="mt-2 font-display text-3xl">A clear path from first consultation to transfer of funds</h2>
            <ol className="mt-7 space-y-4">
              {PROCESS.map((step, index) => (
                <li key={step.title} className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-[3rem_1fr]">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">{index + 1}</span>
                  <div><h3 className="font-display text-xl">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <ShieldCheck className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-3 font-display text-2xl">Important legal and tax scope</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Shubh Estate Brokers provides real-estate advisory and transaction coordination. Legal opinions, document drafting, tax calculations, lower-deduction applications and repatriation approvals must be handled or confirmed by the seller's qualified advocate, chartered accountant and authorised dealer bank. Rules and documentation depend on the facts of each transaction.</p>
          </section>

          <section className="mt-12" aria-labelledby="nri-faqs">
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2 id="nri-faqs" className="mt-2 font-display text-3xl">Answers for NRI property sellers</h2>
            <dl className="mt-6 space-y-4">
              {FAQS.map((faq) => <div key={faq.q} className="rounded-xl border border-border bg-card p-6"><dt className="font-display text-lg">{faq.q}</dt><dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd></div>)}
            </dl>
          </section>

          <div className="mt-10 flex flex-wrap gap-5 text-sm">
            <Link to="/sell-property-gurgaon" className="inline-flex items-center gap-2 text-gold hover:underline"><CheckCircle2 className="size-4" aria-hidden="true" />Local owner selling support</Link>
            <Link to="/property-services-gurgaon" className="inline-flex items-center gap-2 text-gold hover:underline"><FileCheck2 className="size-4" aria-hidden="true" />Property advisory services</Link>
          </div>
        </main>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <Globe2 className="size-6 text-gold" aria-hidden="true" />
          <h2 className="mt-3 font-display text-xl">Discuss your Gurugram property</h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Share your country, project or sector, configuration, occupancy, ownership status and expected price. We will contact you to understand the assignment.</p>
          <div className="mt-4"><EnquiryForm interest="NRI property services — Gurugram seller" compact /></div>
        </aside>
      </section>
    </>
  );
}
