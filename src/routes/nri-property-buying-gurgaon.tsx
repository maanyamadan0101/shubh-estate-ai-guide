import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Video,
  Wallet,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const CANONICAL = `${SITE_ORIGIN}/nri-property-buying-gurgaon`;

const BUYER_SERVICES = [
  {
    icon: Globe2,
    title: "Remote property shortlisting",
    body: "Share your budget, intended use, preferred location and purchase timeline. We prepare a focused shortlist of Gurgaon apartments, builder floors and suitable residential options with the reasons each property may or may not fit.",
  },
  {
    icon: Video,
    title: "Video walkthroughs and visit coordination",
    body: "Arrange live video walkthroughs, recorded property views and local site visits when you or a trusted representative cannot be in Gurugram. We help you compare the actual unit, surroundings and practical details—not only brochure images.",
  },
  {
    icon: Wallet,
    title: "Price evaluation and negotiation",
    body: "Compare the asking price with available competing inventory, unit-specific features, project stage, area basis, payment terms and relevant market evidence before deciding on an offer.",
  },
  {
    icon: ClipboardCheck,
    title: "Property due-diligence coordination",
    body: "Organise available title, ownership, approval, RERA, seller-authority and property records for review. We coordinate with your appointed advocate and other qualified professionals where a formal legal opinion is needed.",
  },
  {
    icon: Landmark,
    title: "NRI home-loan coordination",
    body: "Discuss your purchase brief and financing requirements with the relevant bank or housing-finance institution. We can help coordinate property information, lender valuation and transaction milestones; loan approval remains with the lender.",
  },
  {
    icon: FileCheck2,
    title: "POA, agreement and registration support",
    body: "For remote execution, we coordinate the property-side steps and help organise information for your advocate. A transaction-specific Power of Attorney, authentication, stamping and registration process must be confirmed by your lawyer and the competent authority.",
  },
] as const;

const CORRIDORS = [
  {
    title: "Golf Course Road",
    description: "Established premium and luxury residences for buyers prioritising mature neighbourhoods and central access. Compare the exact building, maintenance, renovation needs and entry premium.",
    href: "/locations/golf-course-road",
  },
  {
    title: "Golf Course Extension Road",
    description: "A broad choice of premium apartments and floors. Compare ready homes with construction-stage supply, access, density and the specific unit's price.",
    href: "/locations/golf-course-extension-road",
  },
  {
    title: "Dwarka Expressway",
    description: "Residential options across a wide range of sectors and project stages, with Delhi-side connectivity as one consideration. Verify occupancy, phase and actual access.",
    href: "/dwarka-expressway-flats-for-sale-gurgaon",
  },
  {
    title: "Southern Peripheral Road (SPR)",
    description: "Newer residential communities and premium housing. Evaluate connectivity, competing future supply, project status and end-user or rental suitability.",
    href: "/properties-for-sale-on-spr-gurgaon",
  },
  {
    title: "Sohna Road and New Gurgaon",
    description: "A varied selection of family apartments, resale homes and developing residential areas. Build the shortlist around total budget, daily commute and completed infrastructure.",
    href: "/flats-for-sale-in-gurgaon",
  },
] as const;

const PURCHASE_STEPS = [
  ["1. Define the purchase brief", "Confirm budget in INR, property purpose (self-use, family use or rental), preferred configuration, target possession, location and whether financing is required."],
  ["2. Shortlist suitable properties", "Compare live resale, ready-to-move and selected new or under-construction options. We explain the strengths, limitations, area basis and asking-price context of each option."],
  ["3. Inspect remotely or in person", "Arrange a live video walkthrough, recorded viewing or scheduled visit. Ask for the exact unit, view, condition, access, parking and surrounding development to be shown."],
  ["4. Review documents before commitment", "Have the seller's authority, title chain or conveyance documents, project/phase approvals, Haryana RERA information where applicable, possession/occupation records, dues and encumbrance position reviewed by your advocate."],
  ["5. Confirm NRI eligibility and payment route", "Check your NRI/OCI status and the permitted property type under current FEMA/RBI rules. Confirm payment through permitted banking channels and eligible NRE, NRO or FCNR(B) funds with your authorised bank."],
  ["6. Negotiate and document the offer", "Agree the unit, total consideration, area basis, payment schedule, inclusions, contingencies and refund/forfeiture terms in writing. Do not rely on a verbal assurance or pay a material token before appropriate checks."],
  ["7. Coordinate finance and execution", "If using an NRI home loan, complete the lender's eligibility, property valuation and documentation process. Your advocate confirms the agreement, POA if required, stamp duty, registration and execution steps."],
  ["8. Complete handover and post-purchase support", "Coordinate possession or transfer records, keys, utilities, society/builder formalities and any agreed rental or property-management assistance."],
] as const;

const FAQS = [
  {
    q: "Can an NRI buy property in Gurgaon while living abroad?",
    a: "Eligible NRIs and OCIs can generally purchase residential and commercial immovable property in India, subject to applicable FEMA and RBI rules. The exact buyer status, property type and payment route should be confirmed before proceeding.",
  },
  {
    q: "Can I buy a Gurgaon flat without travelling to India?",
    a: "Much of the property search can be managed remotely through digital shortlists, video walkthroughs, document sharing and scheduled calls. Whether the purchase and registration can be completed through a representative depends on the transaction and local requirements; your advocate and registration authority should confirm the valid POA and execution process.",
  },
  {
    q: "Can an NRI or OCI buy agricultural land, a farmhouse or plantation property?",
    a: "Ordinary general permission for NRI/OCI property purchases does not cover agricultural land, plantation property or farmhouses. These categories have specific restrictions and should not be treated as an ordinary residential purchase. Obtain current legal advice for the exact property and buyer status.",
  },
  {
    q: "How should an NRI pay for property in India?",
    a: "RBI guidance generally requires payment through permitted banking channels, including eligible inward remittance or debit to permitted NRE, NRO or FCNR(B) accounts, subject to the applicable rules. Do not make property payments in foreign currency cash or by traveller's cheque. Confirm the transaction route with your authorised dealer bank.",
  },
  {
    q: "Can NRIs get a home loan to buy property in Gurgaon?",
    a: "Some Indian banks and housing-finance institutions offer home loans to eligible NRI applicants. Eligibility, income documentation, loan-to-value, repayment method, property acceptance and terms vary by lender and applicant. The lender alone makes the final sanction decision.",
  },
  {
    q: "What should I check before booking an under-construction property?",
    a: "Review the exact RERA registration and phase, promoter disclosures, sanctioned plans and approvals available, construction status, payment schedule, possession terms, cancellation/refund clauses, lender acceptance and competing supply. Have your advocate review the agreement and project documents before payment.",
  },
  {
    q: "Can Shubh Estate Brokers help with rental income after purchase?",
    a: "We can discuss rent-out, tenant-search, inspection and property-management coordination for suitable Gurgaon properties. Scope, frequency, charges and responsibilities should be agreed separately before service begins.",
  },
  {
    q: "Do you also help NRIs sell property in Gurgaon?",
    a: "Yes. For NRI owners planning to sell, valuation, marketing, buyer coordination and remote transaction support are described on our separate NRI seller page.",
  },
] as const;

export const Route = createFileRoute("/nri-property-buying-gurgaon")({
  head: () => {
    const title = "NRI Property Buying in Gurgaon | NRI Buyer Advisory";
    const description =
      "Buy property in Gurgaon from abroad with NRI buyer assistance for shortlisting, video visits, price evaluation, due diligence, home-loan and transaction coordination.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: CANONICAL },
        { property: "og:site_name", content: "Shubh Estate Brokers" },
        { property: "og:locale", content: "en_IN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: CANONICAL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${CANONICAL}#service`,
            name: "NRI Property Buying Advisory in Gurgaon",
            description,
            serviceType: "NRI property buying, remote property shortlisting, property inspection and transaction coordination",
            url: CANONICAL,
            provider: { "@id": `${SITE_ORIGIN}/#real-estate-agent` },
            areaServed: { "@type": "City", name: "Gurugram", containedInPlace: { "@type": "State", name: "Haryana" } },
            audience: { "@type": "Audience", audienceType: "NRI and OCI residential property buyers" },
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
  component: NriPropertyBuyingPage,
});

function NriPropertyBuyingPage() {
  return (
    <>
      <PageHero
        eyebrow="NRI & Overseas Buyer Desk"
        title="Buy Property in Gurgaon from Abroad"
        body="NRI property buying assistance in Gurugram for overseas Indians and OCI buyers—remote shortlisting, video walkthroughs, price evaluation, due-diligence coordination, home-loan support and local transaction follow-through."
      />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <main className="min-w-0">
          <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <p className="eyebrow">Local judgement. Remote visibility.</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">A Gurgaon property buying desk for NRIs and overseas Indians</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Buying property in Gurgaon while living in the UAE, USA, UK, Canada, Singapore or another country can be difficult when you cannot inspect every home, compare local asking prices or follow up with sellers in person. Shubh Estate Brokers provides a local coordination point so you can shortlist with evidence, review the exact property and retain control of the purchase decisions.
            </p>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Our banking-grade advisory approach brings together property selection, price context, available documentation, financing coordination and transaction-risk review. We explain both the advantages and the concerns of a property before you decide whether to proceed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Shubh Estate Brokers, I am an NRI/OCI buyer looking for property in Gurgaon. Please help me with a remote shortlist and consultation.")}`} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" /> Discuss an NRI property purchase
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <a href={CONTACT.phoneHref}>Call our Gurugram office</a>
              </Button>
            </div>
          </div>

          <section className="mt-12" aria-labelledby="nri-buying-services">
            <p className="eyebrow">NRI Buyer Services</p>
            <h2 id="nri-buying-services" className="mt-2 font-display text-3xl">From overseas property search to a coordinated purchase</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BUYER_SERVICES.map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-xl border border-border bg-card p-6">
                  <Icon className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="gurgaon-corridors-nri">
            <SectionHead
              eyebrow="Gurgaon property listings and locations"
              title="Explore residential property in Gurgaon by corridor"
              body="Compare established and emerging Gurugram micro-markets by budget, intended use, commute, property stage and unit-level due diligence. Current listings and availability should always be reconfirmed."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {CORRIDORS.map((area) => (
                <article key={area.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-xl">{area.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.description}</p>
                  <a href={area.href} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
                    Explore {area.title} properties <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="navy"><Link to="/flats-for-sale-in-gurgaon">Browse Gurgaon properties for sale</Link></Button>
              <Button asChild variant="outline"><Link to="/ready-to-move-flats-in-gurgaon">Ready-to-move flats</Link></Button>
              <Button asChild variant="outline"><Link to="/under-construction-projects-gurgaon">New & under-construction projects</Link></Button>
            </div>
          </section>

          <section className="mt-12 rounded-2xl surface-navy p-7 md:p-9" aria-labelledby="nri-buyer-steps">
            <p className="eyebrow">Remote purchase process</p>
            <h2 id="nri-buyer-steps" className="mt-3 font-display text-3xl text-navy-foreground">A disciplined 8-step process for buying property from abroad</h2>
            <ol className="mt-7 space-y-4">
              {PURCHASE_STEPS.map(([title, body]) => (
                <li key={title} className="grid gap-3 rounded-xl border border-navy-foreground/15 bg-white/5 p-5 sm:grid-cols-[2.5rem_1fr]">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 font-display text-lg text-gold">{title.split(".")[0]}</span>
                  <div>
                    <h3 className="font-display text-lg text-navy-foreground">{title.replace(/^\d+\.\s*/, "")}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy-foreground/75">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="nri-buying-checklist">
            <SectionHead
              eyebrow="Property due diligence"
              title="What an NRI buyer should verify before paying a token"
              body="A property brochure or seller statement is not a substitute for unit-specific checks. Have the relevant documents reviewed by an independent advocate and verify current project and transaction status."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Seller identity, ownership and authority to sell",
                "Title chain, conveyance/allotment and available encumbrance records",
                "Exact project, tower, phase and Haryana RERA details where applicable",
                "Sanctioned plan, approvals and occupation/completion documents as applicable",
                "Carpet, built-up and super-area basis stated clearly in writing",
                "Outstanding maintenance, property tax, builder or society dues",
                "Loan, lien, mortgage or release requirements before transfer",
                "Price comparison, payment schedule and agreement cancellation terms",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-6">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Read our <Link to="/blog/gurgaon-property-due-diligence-checklist-2026" className="text-gold hover:underline">Gurgaon property due-diligence checklist</Link> and <Link to="/property-buying-advisory-gurgaon" className="text-gold hover:underline">property buying advisory guide</Link> for additional buyer-side checks.
            </p>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8" aria-labelledby="nri-rules">
            <ShieldCheck className="size-6 text-gold" aria-hidden="true" />
            <h2 id="nri-rules" className="mt-3 font-display text-2xl">NRI/OCI property purchase: eligibility and payment basics</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Under the general RBI/FEMA framework, eligible NRIs and OCIs may purchase residential and commercial immovable property in India, subject to applicable rules. Agricultural land, plantation property and farmhouses are not covered by ordinary general purchase permission. Property payments must follow permitted banking channels and account rules; do not pay in foreign-currency cash or traveller's cheques.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              These are general orientation points, not a legal opinion. Confirm your exact residential status, nationality, property category, funding source and transaction structure with your advocate and authorised dealer bank before making an offer or remitting funds.
            </p>
            <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=117" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
              Read RBI's property purchase FAQs <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section className="mt-12" aria-labelledby="nri-finance">
            <SectionHead
              eyebrow="NRI home loan support"
              title="Evaluate the property and financing together"
              body="If you plan to finance your Gurgaon property, discuss eligibility, income documentation, repayment route, lender valuation, property acceptance and your own contribution with the bank early in the process."
            />
            <p className="mt-4 leading-7 text-muted-foreground">
              Shubh Estate Brokers can coordinate property-related information and introductions with banks where appropriate. We are an independent real estate advisory and channel-partner service—not a bank or an exclusive lender. Rates, loan amounts, eligibility and sanction are determined by each lending institution.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{LOAN_DISCLAIMER}</p>
            <Link to="/home-loans" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">Explore home-loan assistance <span aria-hidden="true">→</span></Link>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8" aria-labelledby="nri-after-purchase">
            <Building2 className="size-6 text-gold" aria-hidden="true" />
            <h2 id="nri-after-purchase" className="mt-3 font-display text-2xl">After you buy: rental and remote property support</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              If your Gurgaon apartment is intended for rental income or will remain vacant while you live overseas, ask about a separate scope for tenant search, rent positioning, property inspection, maintenance follow-up and local coordination.
            </p>
            <Link to="/property-services-gurgaon" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">Property management and owner services <span aria-hidden="true">→</span></Link>
          </section>

          <section className="mt-12" aria-labelledby="nri-buyer-faqs">
            <SectionHead eyebrow="NRI buyer questions" title="Frequently asked questions about buying property in Gurgaon from abroad" />
            <div className="mt-6 space-y-3">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-border bg-card p-5">
                  <summary className="cursor-pointer list-none font-medium [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">{faq.q}<span className="text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span></span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl surface-navy p-7 md:p-9">
            <p className="eyebrow">Local execution. Banking-grade judgement.</p>
            <h2 className="mt-3 font-display text-3xl text-navy-foreground">Start your Gurgaon property search from anywhere in the world</h2>
            <p className="mt-4 max-w-2xl leading-7 text-navy-foreground/75">Tell us your country, budget, property purpose and preferred Gurgaon location. We will help you define the next practical step and arrange an online consultation.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Shubh Estate Brokers, please arrange an NRI property buying consultation for Gurgaon.")}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> WhatsApp our buyer desk</a></Button>
              <Button asChild variant="goldOutline"><Link to="/nri-sell-property-gurgaon">NRI property seller services</Link></Button>
            </div>
          </section>
        </main>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <Globe2 className="size-6 text-gold" aria-hidden="true" />
          <h2 className="mt-3 font-display text-xl">Discuss your NRI property purchase</h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Share your country, budget, preferred area, property type and purchase timeline. Please do not submit passport, PAN, bank or other sensitive documents through this initial enquiry form.</p>
          <div className="mt-4"><EnquiryForm interest="NRI property buying in Gurgaon" compact includeRequirements submitLabel="Request NRI Buyer Consultation" /></div>
          <div className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
            <p className="font-medium text-foreground">Shubh Estate Brokers</p>
            <p>{CONTACT.address}</p>
            <p className="mt-2">Online consultations for overseas buyers.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
