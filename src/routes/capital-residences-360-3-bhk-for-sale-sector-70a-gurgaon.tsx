import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/capital-residences-360-3-bhk-for-sale-sector-70a-gurgaon`;
const title = "3 BHK for Sale in Capital Residences 360 Sector 70A Gurgaon";
const description =
  "3 BHK flat for sale in Capital Residences 360, Sector 70A Gurgaon. 2,137 sq ft built-up area, 8th floor, ready to move. Asking ₹3.15 crore negotiable.";

const FAQS = [
  {
    q: "What is the asking price of this Capital Residences 360 apartment?",
    a: "The property is currently indicated at ₹3.15 crore, negotiable, subject to availability, final negotiation and verification of the transaction terms.",
  },
  {
    q: "What is the size and configuration of the apartment?",
    a: "The apartment is described as a 3 BHK with three bathrooms, more than three balconies and approximately 2,137 sq ft of built-up area.",
  },
  {
    q: "Which floor is the apartment on?",
    a: "The apartment is shown on the 8th floor of a 16-storey residential building.",
  },
  {
    q: "Is home-loan assistance available for this property?",
    a: "Yes. Shubh Estate Brokers can coordinate home-loan eligibility, lender valuation, documentation and bank follow-up. Final sanction and loan-to-value depend on the applicant, lender policy and property-document approval.",
  },
];

export const Route = createFileRoute(
  "/capital-residences-360-3-bhk-for-sale-sector-70a-gurgaon",
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
              name: "Capital Residences 360 3 BHK",
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
          numberOfBathroomsTotal: 3,
          floorSize: {
            "@type": "QuantitativeValue",
            value: 2137,
            unitCode: "FTK",
            unitText: "square feet",
          },
          floorLevel: "8",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Capital Residences 360, Sector 70A",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          offers: {
            "@type": "Offer",
            price: 31500000,
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
  component: CapitalResidences360ListingPage,
});

function CapitalResidences360ListingPage() {
  return (
    <SeoIntentLanding
      eyebrow="Ready-to-Move Resale · Sector 70A Gurgaon"
      title="3 BHK for Sale in Capital Residences 360"
      body="2,137 sq ft built-up · 8th floor of 16 · 3 bathrooms · Multiple balconies · Asking ₹3.15 crore negotiable"
      intro="This ready-to-move 3 BHK resale apartment in Capital Residences 360, Sector 70A, Gurgaon is described with approximately 2,137 sq ft of built-up area, three bathrooms and more than three balconies. The apartment is on the 8th floor of a 16-storey residential building and is indicated at ₹3.15 crore, negotiable."
      interest="Capital Residences 360 3 BHK Sector 70A Gurgaon"
      ctaTitle="Request current availability and arrange a site visit"
      ctaBody="Contact Shubh Estate Brokers to reconfirm the unit, asking price, possession position, documents and viewing schedule before making a transaction decision."
      sections={[
        {
          title: "Property specifications",
          paragraphs: [
            "The currently shared property details indicate an asking price of ₹3.15 crore and an advertised rate of approximately ₹14,740 per sq ft on the stated built-up area. The final transaction value should be assessed after checking the exact unit, condition, parking, dues, documentation and negotiated terms.",
          ],
          bullets: [
            "3 BHK residential apartment.",
            "Approximately 2,137 sq ft built-up area.",
            "Three bathrooms and more than three balconies as currently described.",
            "8th floor in a 16-storey residential building.",
            "Ready-to-move resale property.",
            "Property age indicated as approximately 0–1 year.",
            "Asking price ₹3.15 crore, negotiable and subject to availability.",
          ],
        },
        {
          title: "Project facilities and everyday living",
          paragraphs: [
            "The property information currently available for Capital Residences 360 refers to facilities such as a swimming pool, gymnasium, clubhouse, landscaped park, CCTV surveillance, security, maintenance staff and lifts. Buyers should verify the present operation, charges and access conditions for each facility during the site visit and document review.",
            "The Sector 70A location provides access towards the NH-48 and Delhi–Jaipur Highway network as well as surrounding residential, education, retail and employment areas. Actual travel times vary by route and traffic conditions.",
          ],
          bullets: [
            "Swimming pool and gymnasium, subject to current project operations.",
            "Clubhouse and landscaped/open areas.",
            "CCTV surveillance and security arrangements.",
            "Maintenance staff and lift access.",
            "Nearby destinations shown with the listing include Reach 3Roads, St. Angel's Global School and Gurugram University.",
          ],
        },
        {
          title: "Buyer checks before paying a token",
          paragraphs: [
            "Portal and seller information is useful for initial shortlisting but should not replace property due diligence. Before paying a token, verify ownership, title, sanctioned unit particulars, maintenance and utility dues, parking rights, possession and completion records, society or project transfer requirements and any lender conditions.",
            "The number of balconies, exact usable area, facing, furnishing status, parking allocation and current condition should be reconfirmed at the actual apartment because these particulars can materially affect value and suitability.",
          ],
          bullets: [
            "Inspect the actual apartment, view, light, ventilation and condition.",
            "Confirm parking allocation and maintenance position.",
            "Review ownership and project documents before a substantial payment.",
            "Compare the asking price with genuinely comparable units rather than brochure pricing alone.",
          ],
        },
        {
          title: "Home-loan and bank coordination",
          paragraphs: [
            "Shubh Estate Brokers can coordinate buyer eligibility, lender valuation, property-document checks, sanction follow-up and transaction-stage home-loan processing. Final eligibility, rate, tenure, valuation and loan-to-value remain subject to the selected bank or housing-finance company's prevailing policy.",
            "Buyers who want to understand affordability before the site visit can review the home-loan guidance and EMI calculator linked below. This helps keep the property budget aligned with down payment, registration costs and lender eligibility.",
          ],
        },
      ]}
      related={[
        { href: "/properties", label: "Current Gurgaon property listings" },
        {
          href: "/property-buying-advisory-gurgaon",
          label: "Gurgaon property buying advisory",
        },
        { href: "/home-loans", label: "Home-loan and bank assistance in Gurgaon" },
        { href: "/emi-calculator", label: "Calculate estimated home-loan EMI" },
        {
          href: "/blog/gurgaon-property-due-diligence-checklist-2026",
          label: "Property due-diligence checklist",
        },
      ]}
    />
  );
}
