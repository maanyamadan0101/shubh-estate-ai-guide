import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/godrej-101-sector-79-gurgaon`;
const title = "Godrej 101 Sector 79 Gurgaon | Flats for Sale & Resale";
const description =
  "Explore Godrej 101 Sector 79 Gurgaon resale flats, project context, pricing checks, current availability, home-loan support and NRI transaction assistance.";

const FAQS = [
  {
    q: "Where is Godrej 101 located?",
    a: "Godrej 101 is located in Sector 79, Gurugram, close to the New Gurugram and NH-48-side residential catchment.",
  },
  {
    q: "Can I buy a resale apartment in Godrej 101?",
    a: "Resale availability changes by configuration, tower, floor, view and owner expectation. Ask for current verified inventory before planning a visit.",
  },
  {
    q: "What should buyers compare before purchasing in Godrej 101?",
    a: "Compare the specific unit's floor, facing, view, condition, parking, furnishing, documentation and asking price with competing inventory in the project and nearby Sector 79 developments.",
  },
  {
    q: "Can an NRI buy or sell a flat in Godrej 101 remotely?",
    a: "Initial shortlisting, video walkthroughs, property marketing and transaction coordination can be handled remotely, with legal, tax and banking professionals involved where required.",
  },
];

export const Route = createFileRoute("/godrej-101-sector-79-gurgaon")({
  head: () => ({
    meta: [
      { title: `${title} | Shubh Estate Brokers` },
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            { "@type": "ListItem", position: 2, name: "Sector 79 Gurgaon", item: `${SITE_ORIGIN}/property-sector-79-gurgaon` },
            { "@type": "ListItem", position: 3, name: "Godrej 101", item: canonical },
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
  component: Godrej101Page,
});

function Godrej101Page() {
  return (
    <SeoIntentLanding
      eyebrow="Project Guide · Sector 79 Gurgaon"
      title="Godrej 101, Sector 79 Gurgaon"
      body="A buyer-focused guide to resale apartments, current availability, pricing, unit comparison, financing and transaction checks in Godrej 101."
      intro="Godrej 101 is an established residential address in Sector 79, Gurugram. The Haryana RERA registry lists Godrej Aria @ 101 (Vol. I) in Sector 79 under registration 61 of 2017 dated 17 August 2017. Buyers should still verify the precise phase, tower, unit and transaction documents relevant to the apartment being considered."
      interest="Godrej 101 Sector 79 Gurgaon"
      ctaTitle="Looking to buy or sell in Godrej 101?"
      ctaBody="Share the configuration, floor preference, budget or owner asking price. We can review current availability, arrange a walkthrough and coordinate the next steps."
      sections={[
        {
          title: "Current resale opportunity in Godrej 101",
          paragraphs: [
            "A fully furnished 3.5 BHK apartment of approximately 2,366 sq ft on the 9th floor has recently been offered through our network with club and park-facing views. The owner indicated an asking price of ₹2.65 crore against a stated market expectation near ₹2.80 crore. Availability, final price and property details must be reconfirmed before reliance or payment.",
            "A serious comparison should account for the exact tower, floor, orientation, view, furnishing quality, parking, maintenance position and competing inventory. A lower headline price is useful only when the unit and documentation also meet the buyer's requirements.",
          ],
          bullets: [
            "3.5 BHK configuration with approximately 2,366 sq ft area.",
            "9th floor in a high-rise tower; exact tower and unit to be confirmed.",
            "Fully furnished and described as club and park facing.",
            "Owner-indicated asking price ₹2.65 crore, subject to availability and negotiation.",
          ],
        },
        {
          title: "What buyers should evaluate in the project",
          paragraphs: [
            "Visit the actual unit and compare natural light, ventilation, balcony outlook, lift access, parking and tower surroundings. Project-level amenities cannot replace a careful review of the apartment being purchased.",
            "For resale transactions, confirm ownership, payment history, maintenance dues, possession and completion documents, transfer requirements and any lender-specific conditions before paying a substantial token.",
          ],
          bullets: [
            "Compare recent evidence and competing listings, not only advertised asking prices.",
            "Confirm the RERA phase and tower applicable to the unit.",
            "Review society charges, parking rights and transfer requirements.",
            "Coordinate bank valuation early when the buyer needs a home loan.",
          ],
        },
        {
          title: "Support for NRI buyers and overseas owners",
          paragraphs: [
            "NRI buyers can begin with a live video walkthrough covering the apartment, view, common areas and immediate surroundings. Financing and property-document requirements can then be coordinated with the selected bank and professional advisors.",
            "Overseas owners can submit their Godrej 101 apartment for private review, price positioning, buyer qualification, visit coordination and transaction follow-up without publishing sensitive owner details on the buyer-facing website.",
          ],
        },
      ]}
      related={[
        { href: "/property-sector-79-gurgaon", label: "Property and flats in Sector 79 Gurgaon" },
        { href: "/properties", label: "Current Gurgaon property listings" },
        { href: "/sell-property-gurgaon", label: "List a Gurgaon property for sale" },
        { href: "/nri-sell-property-gurgaon", label: "NRI owner selling support" },
      ]}
    />
  );
}
