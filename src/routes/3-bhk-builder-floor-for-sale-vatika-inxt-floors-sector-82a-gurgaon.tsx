import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/3-bhk-builder-floor-for-sale-vatika-inxt-floors-sector-82a-gurgaon`;
const title = "3 BHK Builder Floor for Sale in Vatika INXT Floors Sector 82A Gurgaon";
const description =
  "3 BHK independent builder floor for sale in Vatika INXT Floors, Sector 82A Gurgaon. 360 sq yd plot, 1st floor, north-east facing, park and main-road facing. Asking ₹2.40 crore negotiable.";

const FAQS = [
  {
    q: "What is the asking price of this Vatika INXT Floors property?",
    a: "The current asking price is ₹2.40 crore, negotiable. Government charges and taxes, where applicable, should be confirmed as part of the final transaction terms.",
  },
  {
    q: "What is the size and configuration of the property?",
    a: "The property is a 3 BHK independent builder floor associated with a 360 sq yd plot and is described with three bathrooms, three balconies, a pooja room, study room and servant room.",
  },
  {
    q: "Which floor is this property on?",
    a: "The available unit is on the 1st floor of a low-rise two-floor building.",
  },
  {
    q: "What is the facing and outlook of the floor?",
    a: "The property is described as north-east facing and overlooking a park and the main road.",
  },
  {
    q: "Can Shubh Estate Brokers help with a home loan and transaction checks?",
    a: "Yes. Shubh Estate Brokers can coordinate home-loan eligibility, lender valuation, property-document review, negotiation and transaction-stage follow-up. Final sanction and legal acceptance remain subject to the selected lender and document verification.",
  },
];

export const Route = createFileRoute(
  "/3-bhk-builder-floor-for-sale-vatika-inxt-floors-sector-82a-gurgaon",
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
              name: "Flats and floors for sale in Gurgaon",
              item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Vatika INXT Floors Sector 82A",
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
          floorLevel: "1",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Vatika INXT Floors, Sector 82A",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Plot area",
              value: "360 sq yd",
            },
            {
              "@type": "PropertyValue",
              name: "Facing",
              value: "North-East",
            },
            {
              "@type": "PropertyValue",
              name: "Overlooking",
              value: "Park and Main Road",
            },
          ],
          offers: {
            "@type": "Offer",
            price: 24000000,
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
  component: VatikaInxtFloorsListingPage,
});

function VatikaInxtFloorsListingPage() {
  return (
    <SeoIntentLanding
      eyebrow="Independent Builder Floor · Sector 82A Gurgaon"
      title="3 BHK Builder Floor for Sale in Vatika INXT Floors"
      body="360 sq yd · 1st floor of 2 · North-East facing · Park & main-road outlook · Asking ₹2.40 crore negotiable"
      intro="This 3 BHK independent builder floor in Vatika INXT Floors, Sector 82A, Gurgaon is a low-rise home associated with a 360 sq yd plot. The available unit is on the 1st floor of a two-floor building and is described with three bathrooms, three balconies, a pooja room, study room and servant room. The current asking price is ₹2.40 crore, negotiable."
      interest="Vatika INXT Floors 3 BHK Sector 82A Gurgaon"
      ctaTitle="Check availability and arrange a site visit"
      ctaBody="Contact Shubh Estate Brokers to reconfirm the unit, current asking price, property documents, parking provision and viewing schedule before making a transaction decision."
      sections={[
        {
          title: "Property highlights",
          paragraphs: [
            "The available home is positioned for buyers who prefer the privacy and lower-density feel of an independent floor while remaining within an established township environment. Its north-east orientation, park and main-road outlook, balconies and low-rise format can be especially relevant for end users comparing builder floors with conventional high-rise apartments.",
          ],
          bullets: [
            "3 BHK independent builder floor in Vatika INXT Floors, Sector 82A, Gurgaon.",
            "Associated plot area: 360 sq yd.",
            "Three bathrooms and three balconies.",
            "Pooja room, study room and servant room.",
            "1st floor of a two-floor low-rise building.",
            "North-East facing.",
            "Overlooking park and main road.",
            "Property age indicated as approximately 1 to 5 years.",
            "Dedicated parking provision as described with the property; exact allocation should be reconfirmed.",
            "Asking price ₹2.40 crore, negotiable, with government charges and taxes as applicable.",
          ],
        },
        {
          title: "Low-rise living in Vatika India Next",
          paragraphs: [
            "Vatika INXT Floors forms part of the wider Vatika India Next township environment in New Gurgaon. The appeal of this format is the combination of an independent-floor style residence with township roads, occupied neighbourhoods and access to everyday markets and services.",
            "For families, the practical comparison should include the actual floor condition, natural light, ventilation, parking, maintenance arrangements, internal-road access and daily commute rather than relying on project-level marketing alone.",
          ],
          bullets: [
            "Low-rise residential format with greater privacy than many high-rise layouts.",
            "Wide internal township roads and established residential surroundings.",
            "Access to local markets and everyday requirements within the wider New Gurgaon belt.",
            "Suitable for end users seeking independent-floor living as well as buyers comparing long-term resale options.",
          ],
        },
        {
          title: "What to verify before paying a token",
          paragraphs: [
            "Before committing funds, buyers should verify the ownership chain, sanctioned building particulars, exact floor rights, parking allocation, society or township dues, maintenance position, utility payments and any transfer requirements applicable to the property.",
            "The 360 sq yd figure refers to the associated plot area in the current listing information. Buyers should separately verify the exact covered, built-up and usable areas of the offered floor from the approved documents and physical measurement where needed.",
          ],
          bullets: [
            "Inspect the actual floor, balconies, view, ventilation and condition.",
            "Confirm the exact parking right and whether it is documented or allotted.",
            "Verify title, sanctioned plans and floor-specific ownership documents.",
            "Check outstanding maintenance, utility and township dues.",
            "Compare the negotiated transaction value with genuinely comparable floors in the same township and nearby sectors.",
          ],
        },
        {
          title: "Price negotiation and home-loan support",
          paragraphs: [
            "Shubh Estate Brokers can assist buyers with unit-level price assessment, negotiation, property-document coordination and home-loan processing. For financed purchases, lender valuation and legal approval can also provide an additional transaction checkpoint, although they do not replace the buyer's own due diligence.",
            "Home-loan eligibility, interest rate, tenure, valuation and loan-to-value depend on the applicant profile, selected lender and final property-document acceptance. Buyers can use the EMI calculator before scheduling a visit to understand a comfortable budget and down-payment requirement.",
          ],
        },
      ]}
      related={[
        { href: "/flats-for-sale-in-gurgaon", label: "Current Gurgaon properties for sale" },
        {
          href: "/flats-for-sale-in-gurgaon?q=builder%20floor",
          label: "Builder floors for sale in Gurgaon",
        },
        {
          href: "/property-buying-advisory-gurgaon",
          label: "Gurgaon property buying advisory",
        },
        { href: "/home-loans", label: "Home-loan and bank assistance" },
        { href: "/emi-calculator", label: "Calculate estimated home-loan EMI" },
        {
          href: "/blog/gurgaon-property-due-diligence-checklist-2026",
          label: "Property due-diligence checklist",
        },
      ]}
    />
  );
}
