import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft`;
const pageTitle = "3 BHK + 1 for Sale in Emaar Emerald Estate Sector 65 Gurgaon";
const seoTitle = "Emaar Emerald Estate 3 BHK for Sale | ₹2.30 Cr | Shubh Estate";
const description =
  "Unused 3 BHK + 1 apartment for sale in Emaar Emerald Estate, Sector 65 Gurgaon. 1,395 sq ft, higher floor, East-facing, asking ₹2.30 crore. View actual property photos.";
const projectPath = "/projects/emaar-emerald-estate-sector-65-gurgaon";
const mediaPath = "/properties/emaar-emerald-estate-1395";
const coverImage = `${SITE_ORIGIN}${mediaPath}/02-emaar-emerald-estate-3bhk-living-room-balcony.webp`;
const LAST_UPDATED = "5 September 2026";

const GALLERY = [
  ["01-emaar-emerald-estate-3bhk-entrance-living-room.webp", "Entrance and living area"],
  ["02-emaar-emerald-estate-3bhk-living-room-balcony.webp", "Living room with balcony access"],
  ["04-emaar-emerald-estate-3bhk-kitchen.webp", "Kitchen with utility balcony access"],
  ["07-emaar-emerald-estate-master-bedroom.webp", "Bedroom with attached spaces"],
  ["09-emaar-emerald-estate-bathroom.webp", "Bathroom"],
] as const;

const FAQS = [
  {
    q: "What is the asking price of this Emaar Emerald Estate apartment?",
    a: "The current asking price is ₹2.30 crore, subject to availability and final negotiation.",
  },
  {
    q: "What is the size and configuration of the apartment?",
    a: "The apartment is described as a 3 BHK + 1 residence with a stated area of 1,395 sq ft.",
  },
  {
    q: "Which floor and facing does the apartment have?",
    a: "The available apartment is on a higher floor and is East-facing.",
  },
  {
    q: "Is this apartment previously occupied?",
    a: "The apartment is represented as unused. Buyers can review the actual condition through the photographs on this page and an in-person site visit.",
  },
  {
    q: "Can Shubh Estate Brokers arrange a site visit and home-loan assistance?",
    a: "Yes. Shubh Estate Brokers can coordinate the property visit, price discussion, transaction documents and home-loan process. Loan eligibility and loan-to-value remain subject to the selected lender's policy and assessment.",
  },
];

export const Route = createFileRoute(
  "/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft",
)({
  head: () => ({
    meta: [
      { title: seoTitle },
      { name: "description", content: description },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: coverImage },
      {
        property: "og:image:alt",
        content: "Unused 3 BHK apartment in Emaar Emerald Estate Sector 65 Gurgaon",
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
              name: "Gurgaon Projects",
              item: `${SITE_ORIGIN}/projects`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Emaar Emerald Estate Sector 65",
              item: `${SITE_ORIGIN}${projectPath}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "3 BHK + 1 · 1,395 sq ft · ₹2.30 Cr",
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
          name: pageTitle,
          description,
          url: canonical,
          datePublished: "2026-09-05",
          dateModified: "2026-09-05",
          mainEntity: { "@id": `${canonical}#apartment` },
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Apartment",
          "@id": `${canonical}#apartment`,
          name: pageTitle,
          description,
          url: canonical,
          image: GALLERY.map(([file]) => `${SITE_ORIGIN}${mediaPath}/${file}`),
          numberOfRooms: 3,
          floorSize: {
            "@type": "QuantitativeValue",
            value: 1395,
            unitCode: "FTK",
            unitText: "square feet",
          },
          floorLevel: "Higher floor",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Emaar Emerald Estate, Sector 65",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Configuration",
              value: "3 BHK + 1",
            },
            {
              "@type": "PropertyValue",
              name: "Facing",
              value: "East",
            },
            {
              "@type": "PropertyValue",
              name: "Condition",
              value: "Unused apartment",
            },
          ],
          offers: {
            "@type": "Offer",
            price: 23000000,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: canonical,
          },
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
  component: EmaarEmeraldEstateListingPage,
});

function EmaarEmeraldEstateListingPage() {
  return (
    <SeoIntentLanding
      eyebrow="Unused Emaar Apartment · Sector 65 Gurgaon"
      title="3 BHK + 1 for Sale in Emaar Emerald Estate"
      body="1,395 sq ft · Higher floor · East-facing · Unused apartment · Asking ₹2.30 crore"
      intro={`This unused 3 BHK + 1 apartment in Emaar Emerald Estate, Sector 65, Gurugram offers a stated area of 1,395 sq ft on a higher floor with an East-facing orientation. The home is available at an asking price of ₹2.30 crore and is presented with actual unit photographs so buyers can assess the layout and condition before scheduling a visit. Listing updated ${LAST_UPDATED}.`}
      interest="Emaar Emerald Estate 3 BHK + 1 Sector 65 Gurgaon"
      ctaTitle="Check availability and arrange a private site visit"
      ctaBody="Contact Shubh Estate Brokers to reconfirm the unit, asking price and visit schedule, or to discuss home-loan eligibility and transaction coordination."
      media={<PropertyMedia />}
      sections={[
        {
          title: "Property highlights",
          paragraphs: [
            "At the stated asking price, the unit works out to approximately ₹16,488 per sq ft on the stated 1,395 sq ft area. This is a simple asking-price calculation for easy comparison with other available units in Emaar Emerald Estate and nearby Sector 65 projects.",
            "Because the apartment is unused, a buyer can plan wardrobes, lighting, kitchen upgrades and other interiors around personal requirements instead of first removing an earlier occupant's fit-out.",
          ],
          bullets: [
            "3 BHK + 1 apartment in Emaar Emerald Estate, Sector 65, Gurugram.",
            "Stated area: 1,395 sq ft.",
            "Higher-floor position.",
            "East-facing orientation.",
            "Unused apartment with scope to personalise the interiors.",
            "Asking price: ₹2.30 crore, subject to availability and negotiation.",
            "Actual property photographs available on this page.",
            "Home-loan funding up to 90% may be available, subject to lender policy, applicant eligibility and property valuation.",
          ],
        },
        {
          title: "About Emaar Emerald Estate, Sector 65",
          paragraphs: [
            "Emaar describes Emerald Estate as a Gurugram residential community inspired by Spanish architecture, with premium modern design standards and more than 50% of its area dedicated to landscaped greens. The developer also highlights proximity to the proposed Metro Corridor.",
            "Emaar's official project information highlights dual access to a 60-metre sector road and Golf Course Extension Road, along with proximity to schools, hospitals and business centres. This makes the project relevant for buyers who want an established Sector 65 address with connectivity across the Golf Course Extension Road belt.",
          ],
          bullets: [
            "Emaar residential community in Sector 65, Gurugram.",
            "Spanish-inspired architectural character described by the developer.",
            "More than 50% landscaped green area stated by Emaar for Emerald Estate.",
            "Dual access to a 60-metre sector road and Golf Course Extension Road stated by Emaar.",
            "Close to the proposed Metro Corridor, as stated by Emaar.",
          ],
        },
        {
          title: "Why this higher-floor East-facing unused unit stands out",
          paragraphs: [
            "The higher-floor position, East-facing orientation and unused condition create a useful combination for end users who want elevation, natural light and the flexibility to personalise interiors. The uploaded photographs show good daylight entering the apartment and give buyers a realistic first view of the unit before visiting.",
            "The final shortlisting should compare this apartment with other available units in the same project on floor, outlook, condition, parking, tower position and negotiated price.",
          ],
        },
        {
          title: "Transaction and document coordination",
          paragraphs: [
            "Shubh Estate Brokers can coordinate the ownership-document set, society and maintenance information, parking details, transfer process, price discussion and transaction sequence around the exact apartment so the buyer has one point of coordination from site visit through closing.",
            "For buyers using a home loan, lender valuation and property-document review can be coordinated early. This helps align the negotiated property value, buyer contribution and expected loan amount before the transaction advances.",
          ],
          bullets: [
            "Exact unit, tower, floor and parking confirmation.",
            "Ownership and transaction-document coordination.",
            "Society, maintenance and transfer information follow-up.",
            "Home-loan valuation and processing support where required.",
          ],
        },
        {
          title: "Site visit and home-loan support",
          paragraphs: [
            "Shubh Estate Brokers can coordinate the property visit, price discussion, document follow-up and home-loan process. Loan eligibility, interest rate, valuation and loan-to-value depend on the applicant profile, selected lender and final property-document acceptance.",
            "Outstation and overseas buyers can review the actual photographs first and request a property walkthrough before arranging an in-person inspection or transaction-stage document coordination.",
          ],
        },
      ]}
      related={[
        {
          href: projectPath,
          label: "Emaar Emerald Estate Sector 65 project guide",
        },
        { href: "/flats-for-sale-in-gurgaon", label: "Current flats for sale in Gurgaon" },
        {
          href: "/higher-floor-apartments-golf-course-extension-road",
          label: "Higher-floor apartments on Golf Course Extension Road",
        },
        {
          href: "/locations/golf-course-extension-road",
          label: "Golf Course Extension Road property guide",
        },
        {
          href: "/property-buying-advisory-gurgaon",
          label: "Gurgaon property buying advisory",
        },
        { href: "/home-loans", label: "Home-loan assistance" },
        { href: "/emi-calculator", label: "Home-loan EMI calculator" },
      ]}
    />
  );
}

function PropertyMedia() {
  return (
    <section aria-labelledby="emaar-emerald-estate-photos">
      <h2 id="emaar-emerald-estate-photos" className="font-display text-2xl md:text-3xl">
        Actual Emaar Emerald Estate apartment photographs
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        Review the actual condition, room proportions, kitchen and natural light before arranging a visit. The photographs supplied for this listing have not been digitally staged.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {GALLERY.map(([file, label], index) => (
          <figure key={file} className="overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={`${mediaPath}/${file}`}
              alt={`${label} in the unused 3 BHK + 1 apartment for sale at Emaar Emerald Estate Sector 65 Gurgaon`}
              className="aspect-[3/4] h-full w-full object-cover"
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
            />
            <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Project context is based on Emaar's official Emerald Estate information. Unit-specific facts on this page refer to the apartment offered for sale and are updated as availability changes.
      </p>
    </section>
  );
}
