import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/tonino-lamborghini-residences-sector-71-gurgaon`;
const title = "Tonino Lamborghini Residences Sector 71 Gurgaon | Price & Details";
const description =
  "Tonino Lamborghini Residences Sector 71 Gurgaon by Signature Global: RERA details, 3/4 BHK configurations, SPR location, price guidance and current inventory enquiry.";

const faqs = [
  {
    q: "Where is Tonino Lamborghini Residences located?",
    a: "Tonino Lamborghini Residences Gurugram is registered at Village Fazilpur Jharsa, Sector 71, Gurugram, Haryana, with access from the Southern Peripheral Road corridor.",
  },
  {
    q: "Who is developing Tonino Lamborghini Residences Gurgaon?",
    a: "The promoter shown on Haryana RERA is SignatureGlobal (India) Limited. Signature Global has announced the project in strategic collaboration with the Tonino Lamborghini lifestyle brand.",
  },
  {
    q: "What configurations are available?",
    a: "Public project information currently presents 3 BHK, 4 BHK and larger premium variants. The official project site also identifies 4 BHK Type 1, 4 BHK Type 2 and 4 BHK + Utility formats. Exact unit area and inventory should be reconfirmed before booking.",
  },
  {
    q: "What is the current price of Tonino Lamborghini Residences?",
    a: "Current online market indications vary by configuration, floor, payment terms and seller. Shubh Estate Brokers recommends obtaining a fresh unit-specific quotation rather than relying on a portal headline price.",
  },
  {
    q: "What is the RERA number?",
    a: "The Haryana RERA registration is GGM/1056/788/2026/28 dated 08 April 2026. Buyers should independently verify the latest project filings and approvals on the Haryana RERA portal.",
  },
  {
    q: "Is Tonino Lamborghini Residences under construction?",
    a: "The project is a newly launched RERA-registered development. Construction status and milestone-linked payment obligations should be checked from the latest promoter and regulatory documents before commitment.",
  },
  {
    q: "How large is the project?",
    a: "Signature Global's April 2026 public announcement described the development as approximately 12.40 acres with 812 premium residences.",
  },
  {
    q: "What amenities are planned?",
    a: "Public project material presents a clubhouse-led luxury ecosystem with swimming, fitness, tennis, wellness, yoga/meditation, recreation, children's spaces and landscaped common areas. Final specifications remain subject to the sanctioned project documents.",
  },
  {
    q: "What does four-to-a-core mean here?",
    a: "The official project presentation describes a four-to-a-core planning concept, meaning four residences are planned around a typical lift/core zone, supporting a comparatively lower-density residential experience.",
  },
  {
    q: "Is Sector 71 well connected?",
    a: "Sector 71 is positioned on the Southern Peripheral Road corridor with road access towards NH-48, Golf Course Extension Road, Sohna Road and other parts of Gurugram. Travel time varies materially with traffic and road conditions.",
  },
  {
    q: "Is this project suitable for investment?",
    a: "It may suit buyers evaluating branded residences and premium SPR supply, but investment suitability depends on entry price, payment schedule, competing supply, holding period and exit liquidity. No appreciation or rental return should be assumed.",
  },
  {
    q: "Can Shubh Estate Brokers compare developer and secondary inventory?",
    a: "Yes. Where verifiable inventory is available, Shubh Estate Brokers can compare developer quotations with investor, assignment or resale opportunities and explain the transaction differences.",
  },
  {
    q: "Can Shubh Estate Brokers arrange a site visit?",
    a: "Yes. Submit an enquiry to coordinate availability, current pricing and an appointment for a site or sales-gallery visit.",
  },
  {
    q: "Are home loans available?",
    a: "Home-loan availability depends on lender project approval, the buyer's profile, documentation and final unit terms. Shubh Estate Brokers can assist with lender comparison and mortgage structuring.",
  },
  {
    q: "What should I verify before booking?",
    a: "Verify RERA filings, sanctioned plans, unit area, floor and view, total acquisition cost, payment schedule, cancellation and transfer terms, parking, taxes, lender approvals and all current promoter documents.",
  },
  {
    q: "Is Shubh Estate Brokers the official developer website?",
    a: "No. Shubh Estate Brokers is an independent real-estate advisory. Project names and trademarks belong to their respective owners, and project information should be independently verified before purchase.",
  },
];

export const Route = createFileRoute(
  "/tonino-lamborghini-residences-sector-71-gurgaon",
)({
  head: () => ({
    meta: [
      { title: `${title} | Shubh Estate Brokers` },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: canonical,
          about: {
            "@type": "ApartmentComplex",
            name: "Tonino Lamborghini Residences Gurugram",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gurugram",
              addressRegion: "Haryana",
              addressCountry: "IN",
              streetAddress: "Sector 71, Southern Peripheral Road",
            },
          },
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
              name: "Flats for sale in Gurgaon",
              item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Tonino Lamborghini Residences Sector 71",
              item: canonical,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: ToninoLamborghiniResidencesPage,
});

function ToninoLamborghiniResidencesPage() {
  const media = (
    <div className="space-y-8">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Project quick facts">
        {[
          ["Location", "Sector 71, SPR, Gurugram"],
          ["Developer", "Signature Global"],
          ["Project area", "Approx. 12.40 acres"],
          ["Residences", "Approx. 812 announced"],
          ["Configurations", "3 BHK, 4 BHK & premium variants"],
          ["RERA", "GGM/1056/788/2026/28"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{label}</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl">Project specifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">Regulatory and public-disclosure facts, with disputed items left unclaimed.</p>
        </div>
        <div className="grid divide-y divide-border text-sm md:grid-cols-2 md:divide-x md:divide-y-0">
          <dl className="divide-y divide-border">
            {[
              ["Project", "Tonino Lamborghini Residences Gurugram"],
              ["Promoter", "SignatureGlobal (India) Limited"],
              ["Brand collaboration", "Tonino Lamborghini"],
              ["Registered location", "Village Fazilpur Jharsa, Sector 71, Gurugram"],
              ["Corridor", "Southern Peripheral Road (SPR)"],
              ["Project area", "Approx. 12.40 acres (public announcement)"],
            ].map(([term, value]) => (
              <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-4">
                <dt className="font-medium text-foreground">{term}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <dl className="divide-y divide-border">
            {[
              ["Residences", "Approx. 812 announced"],
              ["Planning", "Four-to-a-core concept presented by project"],
              ["RERA status", "Approved; certificate uploaded"],
              ["RERA number", "GGM/1056/788/2026/28 dated 08.04.2026"],
              ["Towers / floors", "Confirm from current sanctioned documents"],
              ["Possession / completion", "Confirm from current RERA and allotment documents"],
            ].map(([term, value]) => (
              <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-4">
                <dt className="font-medium text-foreground">{term}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rounded-2xl border border-gold/30 bg-card p-6">
        <p className="eyebrow">Current price guidance</p>
        <h2 className="mt-2 font-display text-2xl">Ask for a unit-specific quotation</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Recent public portal indications in August 2026 span roughly ₹4.49 crore to ₹6.50 crore across advertised 3 and 4 BHK inventory, while another current portal shows project-level guidance around ₹4.83 crore to ₹6.44 crore. These are secondary market indications, not a guaranteed developer price list. Floor, size, view, payment plan and seller terms can materially change the transaction value.
        </p>
        <p className="mt-3 text-sm font-medium text-foreground">Price guidance last cross-checked: 25 August 2026.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl md:text-3xl">Configurations buyers should compare</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            ["3 BHK", "Premium three-bedroom residences. Public portals currently show advertised sizes around 2,050–2,100 sq ft, but the exact saleable and carpet areas must be checked against the current unit schedule."],
            ["4 BHK Type 1", "A four-bedroom format identified on the official project presentation. Obtain the current floor plan, area statement and price sheet before comparing value per sq ft."],
            ["4 BHK Type 2", "A second four-bedroom layout is presented by the project. Compare orientation, balcony placement, core position and usable area rather than configuration name alone."],
            ["4 BHK + Utility", "A premium utility-format residence. Confirm whether the utility area is included in carpet, ancillary or saleable calculations in the applicable documents."],
          ].map(([heading, copy]) => (
            <div key={heading} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-xl">{heading}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl surface-navy p-7">
        <p className="eyebrow">Independent advisory disclosure</p>
        <p className="mt-3 text-sm leading-7 text-slate-200">
          Shubh Estate Brokers is an independent real-estate advisory and is not presented here as the official developer website. Project names and trademarks belong to their respective owners. Regulatory, pricing, inventory and specification information should be independently verified before purchase.
        </p>
      </section>
    </div>
  );

  return (
    <SeoIntentLanding
      eyebrow="Branded Luxury Residences · Sector 71, SPR Gurugram"
      title="Tonino Lamborghini Residences, Sector 71 Gurgaon"
      body="Signature Global · Approx. 12.40 acres · 812 residences announced · 3 BHK, 4 BHK & premium variants · RERA registered"
      intro="Tonino Lamborghini Residences Gurugram is a branded luxury residential development by Signature Global in collaboration with Tonino Lamborghini, registered in Sector 71 on the Southern Peripheral Road corridor. This independent buyer page focuses on regulatory facts, configuration comparison, current price context and transaction due diligence rather than reproducing developer marketing material."
      interest="Tonino Lamborghini Residences Sector 71 Gurgaon"
      ctaTitle="Get current price & inventory"
      ctaBody="Share your preferred configuration and budget. We can reconfirm current availability, unit-specific pricing, payment terms and site-visit options before you decide."
      media={media}
      sections={[
        {
          title: "Why Sector 71 and the SPR corridor matter",
          paragraphs: [
            "Sector 71 sits along Gurugram's Southern Peripheral Road growth corridor and connects towards NH-48, Golf Course Extension Road, Sohna Road and established residential and commercial sectors. The location can be relevant to end users who want access to multiple employment corridors without limiting themselves to one side of the city.",
            "Buyers should still evaluate the exact project access road, peak-hour traffic, surrounding construction and completion of planned infrastructure. Haryana RERA proceedings for the project record a condition relating to construction of the approach stretch connecting to the 90-metre SPR before occupation-certificate stage, making access-road due diligence especially important.",
          ],
        },
        {
          title: "Luxury planning without relying on marketing claims",
          paragraphs: [
            "The project presentation highlights a four-to-a-core residential philosophy, landscaped common areas and a clubhouse-centred amenity ecosystem. For a buyer, the practical questions are more specific: lift-to-residence ratio, privacy at the entrance, service circulation, balcony usability, daylight, view protection, parking allocation and total common-area load.",
            "Public project material presents amenities including swimming, tennis, gym, yoga and meditation, spa and wellness facilities, recreation and children's spaces. Final amenities and specifications should be read alongside the sanctioned plans, agreement documents and RERA disclosures.",
          ],
        },
        {
          title: "End-user evaluation",
          paragraphs: [
            "For an end user, the branded-residence proposition should be weighed against the actual apartment efficiency, maintenance structure, construction quality, handover timeline and daily commute. A larger headline super area does not automatically mean better usable space, so carpet-area efficiency and furniture planning deserve close attention.",
          ],
          bullets: [
            "Compare exact carpet area and balcony utility across shortlisted layouts.",
            "Check floor height, view corridor, sun direction and neighbouring tower separation.",
            "Verify parking entitlement and visitor-parking policy.",
            "Understand expected maintenance and clubhouse operating costs when disclosed.",
            "Review construction milestones and payment obligations before committing liquidity.",
            "Visit the site and sales gallery before relying on renders or portal photographs.",
          ],
        },
        {
          title: "Investor evaluation",
          paragraphs: [
            "For investors, branded positioning can broaden buyer interest but does not remove market risk. Entry price discipline is important because premium projects can have a narrower resale pool and higher absolute ticket size. Compare this project's effective all-inclusive acquisition cost with other luxury launches on SPR and Golf Course Extension Road before choosing a unit.",
          ],
          bullets: [
            "Compare developer quotation with genuine assignment or resale supply where legally transferable.",
            "Calculate total acquisition cost including PLC, parking, club, taxes and statutory charges where applicable.",
            "Assess future competing luxury supply in Sector 71 and the wider SPR corridor.",
            "Do not assume assured appreciation, guaranteed rent or a fixed exit timeline.",
          ],
        },
        {
          title: "What to verify before paying a booking amount",
          paragraphs: [
            "Haryana RERA currently shows the project registration as approved with certificate uploaded. The March 2026 regulatory proceedings also recorded certain statutory approvals as pending at that time and documented promoter undertakings for their submission within prescribed periods. Buyers should therefore check the latest filing status rather than relying on an older snapshot.",
          ],
          bullets: [
            "Latest Haryana RERA certificate, Form A-H disclosures and quarterly updates.",
            "Sanctioned building plans, environment and fire approvals, and approved service plans where applicable.",
            "Exact unit number, tower, floor, orientation, area statement and consideration sheet.",
            "Payment schedule, cancellation clause, transfer rules and delayed-payment provisions.",
            "Approach-road status and site access at the time of booking and handover.",
            "Lender project approval and buyer-specific loan eligibility.",
          ],
        },
        {
          title: "How Shubh Estate Brokers can assist",
          paragraphs: [
            "Shubh Estate Brokers can support buyers with unit shortlisting, current inventory comparison, price negotiation, valuation context, legal-document coordination and home-loan structuring. The objective is to compare the financial and legal implications of a unit before the buyer commits, not merely to arrange a sales presentation.",
          ],
          bullets: [
            "Current inventory and configuration comparison.",
            "Developer quotation versus verifiable secondary inventory comparison.",
            "Unit-level price and floor/view evaluation.",
            "Home-loan lender comparison and mortgage structuring.",
            "Property-document and transaction-stage coordination.",
            "Site-visit scheduling and negotiation support.",
          ],
        },
        {
          title: "Frequently asked questions",
          paragraphs: faqs.map((faq) => `${faq.q} ${faq.a}`),
        },
      ]}
      related={[
        { href: "/flats-for-sale-in-gurgaon", label: "Flats for sale in Gurgaon" },
        { href: "/luxury-apartments-gurgaon", label: "Luxury apartments in Gurgaon" },
        { href: "/under-construction-projects-gurgaon", label: "Under-construction projects in Gurgaon" },
        { href: "/property-buying-advisory-gurgaon", label: "Gurgaon property buying advisory" },
        { href: "/home-loans", label: "Home-loan advisory" },
        { href: "/property-valuation-gurgaon", label: "Property valuation in Gurgaon" },
      ]}
    />
  );
}
