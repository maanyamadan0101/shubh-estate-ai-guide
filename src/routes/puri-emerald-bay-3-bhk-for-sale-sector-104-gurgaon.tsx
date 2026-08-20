import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon`;
const title = "3 BHK for Sale in Puri Emerald Bay Sector 104 Gurgaon";
const description =
  "3 BHK plus servant room for sale in Puri Emerald Bay, Sector 104 Gurgaon. 2450 sq ft, Tower A3, 15th floor, north-east facing. Asking ₹3.25 crore.";

const FAQS = [
  {
    q: "What is the asking price of this Puri Emerald Bay apartment?",
    a: "The owner-indicated asking price is ₹3.25 crore, subject to availability, final negotiation and verification of the transaction terms.",
  },
  {
    q: "What is the size and configuration of the apartment?",
    a: "The apartment is described as a 3 BHK with servant room and approximately 2,450 sq ft of super area.",
  },
  {
    q: "Which floor, tower and facing does the apartment have?",
    a: "The apartment is in Tower A3 on the 15th floor and is described as north-east facing with an excellent view.",
  },
  {
    q: "Can I arrange a video walkthrough or site visit?",
    a: "Yes. A property video is available for serious buyers, and a private site visit can be coordinated after reconfirming availability.",
  },
];

export const Route = createFileRoute(
  "/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon",
)({
  head: () => ({
    meta: [
      { title: `${title} | Shubh Estate Brokers` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: canonical },
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
              name: "Gurgaon properties",
              item: `${SITE_ORIGIN}/properties`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Puri Emerald Bay 3 BHK",
              item: canonical,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Apartment",
          name: title,
          description,
          url: canonical,
          numberOfRooms: 3,
          floorSize: {
            "@type": "QuantitativeValue",
            value: 2450,
            unitCode: "FTK",
            unitText: "square feet",
          },
          floorLevel: "15",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Puri Emerald Bay, Sector 104",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          offers: {
            "@type": "Offer",
            price: 32500000,
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
  component: PuriEmeraldBayListingPage,
});

function PuriEmeraldBayListingPage() {
  return (
    <SeoIntentLanding
      eyebrow="Verified Resale Opportunity · Sector 104 Gurgaon"
      title="3 BHK + Servant Room for Sale in Puri Emerald Bay"
      body="Tower A3 · 15th floor · North-east facing · Excellent view · 2,450 sq ft · Asking ₹3.25 crore"
      intro="This spacious ready-to-move resale apartment in Puri Emerald Bay, Sector 104, Gurgaon offers a 3 BHK configuration with servant room and approximately 2,450 sq ft of super area. Located on the 15th floor of Tower A3, the north-east-facing residence is described by the owner as having an excellent view. A property video is available for serious buyers."
      interest="Puri Emerald Bay 3 BHK Sector 104 Gurgaon"
      ctaTitle="Request the property video or a private site visit"
      ctaBody="Contact Shubh Estate Brokers to reconfirm availability, receive the video walkthrough, discuss the asking price and arrange a visit to the actual apartment."
      sections={[
        {
          title: "Property specifications",
          paragraphs: [
            "The owner-indicated asking price is ₹3.25 crore, equivalent to approximately ₹13,265 per sq ft on the stated super area. The final transaction value will depend on negotiation, condition, parking, dues, documentation and other verified unit particulars.",
          ],
          bullets: [
            "3 BHK apartment with servant room.",
            "Approximately 2,450 sq ft super area.",
            "Tower A3, 15th floor.",
            "North-east facing with an excellent view.",
            "Ready-to-move resale opportunity.",
            "Asking price ₹3.25 crore, subject to availability and negotiation.",
            "Video walkthrough available on request.",
          ],
        },
        {
          title: "Living in Puri Emerald Bay, Sector 104",
          paragraphs: [
            "Puri Emerald Bay is an established gated residential development in Sector 104 near Dwarka Expressway. The project is known for spacious apartments, landscaped surroundings and resident amenities. Buyers should verify the current operation, access rules and charges for every facility directly during due diligence.",
            "The location provides access towards Delhi and different parts of Gurugram through Dwarka Expressway and the surrounding road network. Actual journey times depend on the destination, route and prevailing traffic.",
          ],
          bullets: [
            "Gated residential environment with controlled security.",
            "Clubhouse, swimming pool, gymnasium and sports facilities, subject to current society operations.",
            "Power backup and maintained common areas, subject to society provisions.",
            "Connectivity towards Dwarka Expressway, Delhi and Gurugram employment districts.",
          ],
        },
        {
          title: "Price and unit checks before paying a token",
          paragraphs: [
            "The ₹3.25 crore asking price is competitively positioned against several currently advertised 2,450 sq ft units, but portal advertisements are not evidence of completed transaction value. Compare the actual apartment with recent evidence and competing inventory before deciding.",
            "Before paying a substantial token, verify title and ownership, sanctioned unit particulars, maintenance and utility dues, parking rights, possession and completion records, society transfer requirements and any lender conditions. Furnishing, bathrooms, balconies and parking allocation should be reconfirmed during the walkthrough.",
          ],
          bullets: [
            "Inspect the actual view, natural light, ventilation and unit condition.",
            "Confirm parking allocation, maintenance position and society transfer process.",
            "Review ownership and project documents with appropriate professionals.",
            "Coordinate lender valuation early if home-loan funding is required.",
          ],
        },
        {
          title: "Home-loan and transaction support",
          paragraphs: [
            "Shubh Estate Brokers can coordinate property shortlisting, video walkthroughs, site visits, price discussions and home-loan processing. Loan eligibility, valuation and the final loan-to-value ratio remain subject to the selected lender's policy and assessment.",
            "NRI and outstation buyers may begin with the available property video before arranging an in-person inspection or authorising professional representatives for transaction checks.",
          ],
        },
      ]}
      related={[
        { href: "/properties", label: "Current Gurgaon property listings" },
        {
          href: "/locations/dwarka-expressway",
          label: "Property near Dwarka Expressway",
        },
        {
          href: "/property-buying-advisory-gurgaon",
          label: "Gurgaon property buying advisory",
        },
        { href: "/home-loans", label: "Home-loan assistance in Gurgaon" },
      ]}
    />
  );
}
