import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/emaar-emerald-estate-sector-65-gurgaon-apartments";
const LISTING_PATH = "/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Emaar Emerald Estate Sector 65 | Resale Guide | Shubh Estate Brokers";
const description =
  "Explore Emaar Emerald Estate resale apartments in Sector 65, Gurugram. Review project details, featured unit photographs and buyer guidance; confirm current prices and availability.";

const FAQS = [
  {
    q: "Where is Emaar Emerald Estate located in Gurgaon?",
    a: "Emaar Emerald Estate is in Sector 65, Gurugram, in the Golf Course Extension Road residential belt.",
  },
  {
    q: "What does Emaar highlight about Emerald Estate?",
    a: "Emaar describes Emerald Estate as Spanish-inspired and states that more than 50% of the area is dedicated to landscaped greens, with proximity to the proposed Metro Corridor.",
  },
  {
    q: "Is there current resale inventory in Emaar Emerald Estate?",
    a: "Yes. Shubh Estate Brokers currently has a dedicated page for an unused 3 BHK + 1, 1,395 sq ft higher-floor East-facing apartment with an asking price of ₹2.30 crore, subject to availability.",
  },
  {
    q: "How is Emaar Emerald Estate connected to Golf Course Extension Road?",
    a: "Emaar's project information highlights dual access to a 60-metre sector road and Golf Course Extension Road, along with proximity to schools, hospitals and business centres.",
  },
  {
    q: "Can Shubh Estate Brokers help with a home loan for an Emerald Estate resale apartment?",
    a: "Yes. Home-loan processing, lender valuation and property-document coordination can be supported, subject to applicant eligibility, lender policy and the exact property.",
  },
];

export const Route = createFileRoute("/projects/emaar-emerald-estate-sector-65-gurgaon-apartments")(
  {
    head: () => ({
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        {
          property: "og:image",
          content: `${SITE_ORIGIN}/properties/emaar-emerald-estate-1395/02-emaar-emerald-estate-3bhk-living-room-balcony.webp`,
        },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
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
                name: "Gurgaon Residential Projects",
                item: `${SITE_ORIGIN}/projects-in-gurgaon`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Emaar Emerald Estate Sector 65 Gurgaon",
                item: canonical,
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: title,
            description,
            url: canonical,
            datePublished: "2026-09-05",
            dateModified: "2026-11-10",
            about: {
              "@type": "Place",
              name: "Emaar Emerald Estate",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 65",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Current Emaar Emerald Estate resale inventory",
            numberOfItems: 1,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Emaar Emerald Estate 3 BHK + 1 · 1,395 sq ft · higher floor",
                url: `${SITE_ORIGIN}${LISTING_PATH}`,
              },
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
    }),
    component: EmaarEmeraldEstateProjectPage,
  },
);

function EmaarEmeraldEstateProjectPage() {
  return (
    <SeoIntentLanding
      eyebrow="Emaar · Sector 65 · Golf Course Extension Road"
      title="Emaar Emerald Estate, Sector 65 Gurgaon"
      body="Explore resale apartments, project details and buyer guidance for Emaar Emerald Estate, Sector 65, Gurugram. Confirm unit-level details and availability before planning a visit."
      heroActions={
        <div className="flex flex-wrap gap-3">
          <a
            href={LISTING_PATH}
            className="inline-flex min-h-11 items-center rounded-md bg-gold px-5 py-2 text-sm font-medium text-gold-foreground transition hover:bg-gold/90"
          >
            View Apartment & Actual Photos
          </a>
          <a
            href="#project-enquiry"
            className="inline-flex min-h-11 items-center rounded-md border border-white/35 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Get Current Resale Prices
          </a>
        </div>
      }
      intro={
        <div className="space-y-3">
          <p>
            Looking to buy an apartment in Emaar Emerald Estate, Sector 65, Gurugram? Explore resale
            opportunities in this established Emaar residential community on Golf Course Extension
            Road. Compare the actual apartment, its condition, floor, orientation and asking price
            rather than relying only on a project-wide estimate.
          </p>
          <p>
            A featured resale opportunity is an unused 3 BHK + 1 apartment measuring 1,395 sq. ft.,
            positioned on a higher floor and facing east, with an asking price of ₹2.30 crore.
            Availability and price are subject to confirmation and final negotiation. Actual
            photographs are available on the dedicated property page so you can review the apartment
            before arranging a site visit.
          </p>
          <p>
            Shubh Estate Brokers provides founder-led, banking-informed property advisory. Buyers can
            request unit-level price evaluation, seller negotiation support, documentation and title
            due-diligence coordination, and home-loan assistance. Outstation and NRI buyers can also
            arrange a remote consultation before planning a visit to Gurugram. Before shortlisting,
            compare the unit's tower placement, view, parking, maintenance dues, furnishing and seller
            terms with comparable available apartments. Our team can help organise a structured review
            of these points and coordinate a site visit at a suitable time. Buyers should verify
            ownership and title documents and obtain lender confirmation before paying a token amount.
          </p>
        </div>
      }
      interest="Emaar Emerald Estate Sector 65 Gurgaon resale"
      ctaTitle="Looking for an apartment in Emaar Emerald Estate?"
      ctaBody="Share your budget, preferred configuration, floor and facing. Shubh Estate Brokers can coordinate current availability, site visits, price discussion and home-loan support."
      media={<CurrentAvailability />}
      sections={[
        {
          title: "Emaar Emerald Estate project overview",
          paragraphs: [
            "Emaar positions Emerald Estate as a peaceful residential community with Spanish-inspired architecture and a strong landscaped environment. The official project information states that more than 50% of the area is dedicated to landscaped greens.",
            "For resale buyers, the project name is only the first layer of the decision. The exact apartment's floor, orientation, view, condition, parking and negotiated price can materially change the value proposition, so current unit pages are linked directly from this project guide.",
          ],
          bullets: [
            "Developer: Emaar.",
            "Location: Sector 65, Gurugram.",
            "Spanish-inspired architectural character stated by Emaar.",
            "More than 50% landscaped green area stated by Emaar.",
            "Proximity to the proposed Metro Corridor highlighted by Emaar.",
          ],
        },
        {
          title: "Sector 65 and Golf Course Extension Road connectivity",
          paragraphs: [
            "Emaar's official Emerald Estate information highlights dual access to a 60-metre sector road and Golf Course Extension Road. The developer also highlights proximity to schools, hospitals and business centres, placing the project within one of Gurugram's established premium residential belts.",
            "For daily-use assessment, buyers should compare the project's access with their own office, school and family travel pattern rather than relying only on a broad corridor label.",
          ],
          bullets: [
            "Sector 65 location in the Golf Course Extension Road micro-market.",
            "Dual access to a 60-metre sector road and Golf Course Extension Road stated by Emaar.",
            "Proximity to schools, hospitals and business centres highlighted by Emaar.",
            "Connectivity towards Golf Course Road, Sohna Road and wider Gurugram through the surrounding road network.",
          ],
        },
        {
          title: "Current Emaar Emerald Estate resale opportunity",
          paragraphs: [
            "The current featured availability is an unused 3 BHK + 1 apartment with a stated area of 1,395 sq ft on a higher floor with an East-facing orientation. The asking price is ₹2.30 crore, subject to availability and final negotiation.",
            "Actual photographs of this unit are available on its dedicated property page, allowing buyers to assess the room proportions, kitchen, balcony access and natural light before arranging a site visit.",
          ],
          bullets: [
            "3 BHK + 1 configuration.",
            "1,395 sq ft stated area.",
            "Higher floor.",
            "East-facing.",
            "Unused apartment.",
            "Asking ₹2.30 crore.",
          ],
        },
        {
          title: "How to compare resale units within the same project",
          paragraphs: [
            "Two apartments in the same project can justify different prices because of floor, view, orientation, tower placement, fit-out condition, parking and seller circumstances. A project-level average should therefore be used as context, not as a substitute for comparing genuinely similar units.",
            "Shubh Estate Brokers can shortlist competing Emerald Estate options and compare them at unit level so buyers can see whether a quoted premium is supported by the apartment's actual attributes.",
          ],
        },
        {
          title: "Home-loan and transaction coordination",
          paragraphs: [
            "Home-loan funding up to 90% may be available for eligible buyers and eligible properties, subject to the selected lender's policy, valuation and documentation. The financing discussion should run alongside the property negotiation so the expected loan amount and buyer contribution remain aligned.",
            "Shubh Estate Brokers can coordinate site visits, price discussion, property documents, lender valuation and transaction-stage follow-up for buyers in Gurugram as well as outstation and overseas clients.",
          ],
        },
      ]}
      related={[
        {
          href: LISTING_PATH,
          label: "Current 1,395 sq ft Emaar Emerald Estate 3 BHK + 1 for sale",
        },
        {
          href: "/locations/golf-course-extension-road",
          label: "Golf Course Extension Road property guide",
        },
        {
          href: "/higher-floor-apartments-golf-course-extension-road",
          label: "Higher-floor apartments on Golf Course Extension Road",
        },
        {
          href: "/emaar-emerald-hills-sector-65-gurgaon-residences",
          label: "Emaar Emerald Hills Sector 65 guide",
        },
        { href: "/flats-for-sale-in-gurgaon", label: "Current flats for sale in Gurgaon" },
        { href: "/home-loans", label: "Home-loan assistance" },
      ]}
    />
  );
}

function CurrentAvailability() {
  return (
    <section aria-labelledby="emerald-estate-current-resale">
      <div className="rounded-2xl border border-gold/35 bg-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Featured resale enquiry
        </p>
        <h2 id="emerald-estate-current-resale" className="mt-2 font-display text-2xl md:text-3xl">
          Explore available resale apartments in Sector 65
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Request the latest confirmed unit details, actual photographs and asking price. Availability
          and commercial terms are subject to reconfirmation before a site visit.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={LISTING_PATH}
            className="inline-flex min-h-11 items-center rounded-md bg-gold px-5 py-2 text-sm font-medium text-gold-foreground transition hover:bg-gold/90"
          >
            View Featured Apartment Details
          </a>
          <a
            href="#project-enquiry"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-2 text-sm font-medium transition hover:bg-muted"
          >
            Check Current Availability
          </a>
        </div>
      </div>
    </section>
  );
}
