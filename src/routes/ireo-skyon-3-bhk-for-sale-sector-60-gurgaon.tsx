import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/ireo-skyon-3-bhk-for-sale-sector-60-gurgaon`;
const title = "3 BHK for Sale in Ireo Skyon Sector 60 Gurgaon | 2045 Sq Ft";
const description =
  "3 BHK apartment for sale in Ireo Skyon, Sector 60 Gurgaon. 2,045 sq ft, middle floor, ₹4.65 crore negotiable. Up to 90% home loan available, subject to lender eligibility.";
const mediaPath = "/properties/ireo-skyon-2045-sector-60";
const coverImage = `${SITE_ORIGIN}${mediaPath}/01-ireo-skyon-3bhk-living-dining.webp`;

const GALLERY = [
  ["01-ireo-skyon-3bhk-living-dining.webp", "Spacious living and dining area"],
  ["02-ireo-skyon-balcony-view.webp", "Balcony with community view"],
  ["03-ireo-skyon-bedroom-wardrobe.webp", "Bedroom with fitted wardrobe"],
  ["06-ireo-skyon-bathroom.webp", "Finished bathroom"],
  ["07-ireo-skyon-modular-kitchen.webp", "Modular kitchen"],
  ["08-ireo-skyon-landscaped-community-view.webp", "Landscaped Ireo Skyon community view"],
] as const;

const FAQS = [
  {
    q: "What is the asking price of this Ireo Skyon apartment?",
    a: "The owner-indicated asking price is ₹4.65 crore and is negotiable, subject to availability and final transaction terms.",
  },
  {
    q: "What is the size and configuration of the apartment?",
    a: "The apartment is a 3 BHK residence with approximately 2,045 sq ft of stated area.",
  },
  {
    q: "Which floor is this Ireo Skyon apartment on?",
    a: "The apartment is positioned on a middle floor. The exact unit details can be reconfirmed before a private site visit.",
  },
  {
    q: "Is up to 90% home loan available for this property?",
    a: "Home-loan funding of up to 90% may be available, subject to borrower eligibility, lender policy, legal and technical clearance, property valuation and documentation.",
  },
  {
    q: "Are these actual photographs of the property?",
    a: "Yes. The photographs shown on this page are from the actual apartment and its outlook. A private site visit can be arranged after reconfirming availability.",
  },
];

export const Route = createFileRoute(
  "/ireo-skyon-3-bhk-for-sale-sector-60-gurgaon",
)({
  head: () => ({
    meta: [
      { title: `${title} | Shubh Estate Brokers` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: coverImage },
      {
        property: "og:image:alt",
        content: "Living and dining area in the Ireo Skyon 3 BHK apartment for sale in Sector 60 Gurgaon",
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
              name: "Sector 60 Gurgaon",
              item: `${SITE_ORIGIN}/property-sector-60-gurgaon`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Ireo Skyon 3 BHK for sale",
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
          image: GALLERY.map(([file]) => `${SITE_ORIGIN}${mediaPath}/${file}`),
          numberOfRooms: 3,
          floorSize: {
            "@type": "QuantitativeValue",
            value: 2045,
            unitCode: "FTK",
            unitText: "square feet",
          },
          floorLevel: "Middle floor",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ireo Skyon, Sector 60",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          offers: {
            "@type": "Offer",
            price: 46500000,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: canonical,
            description: "₹4.65 crore asking price, negotiable and subject to availability.",
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
  component: IreoSkyonListingPage,
});

function IreoSkyonListingPage() {
  return (
    <SeoIntentLanding
      eyebrow="Resale Opportunity · Ireo Skyon · Sector 60 Gurgaon"
      title="3 BHK for Sale in Ireo Skyon, Sector 60 Gurgaon"
      body="2,045 sq ft · Middle floor · ₹4.65 Cr (Negotiable) · Up to 90% Home Loan Available*"
      intro="A spacious 3 BHK resale apartment is available in Ireo Skyon, Sector 60, Gurugram. The 2,045 sq ft residence is positioned on a middle floor and offers a bright living and dining area, balcony, fitted wardrobes, modular kitchen and well-finished bathrooms. The owner-indicated asking price is ₹4.65 crore and is negotiable. Actual property photographs are shown below."
      interest="Ireo Skyon 3 BHK Sector 60 Gurgaon"
      ctaTitle="Request the best negotiated price and a private site visit"
      ctaBody="Contact Shubh Estate Brokers to reconfirm availability, discuss the negotiable asking price, check home-loan eligibility and arrange a visit to the actual apartment."
      media={<PropertyMedia />}
      sections={[
        {
          title: "Property specifications",
          paragraphs: [
            "This Ireo Skyon resale opportunity combines a 2,045 sq ft 3 BHK layout with a middle-floor position in an established Sector 60 community. The asking price is ₹4.65 crore and is negotiable, subject to the owner's final approval and transaction terms.",
          ],
          bullets: [
            "3 BHK apartment in Ireo Skyon, Sector 60 Gurugram.",
            "Approximately 2,045 sq ft stated area.",
            "Middle-floor residence.",
            "₹4.65 crore asking price — negotiable.",
            "Actual apartment photographs available on this page.",
            "Spacious living and dining area with good natural light.",
            "Modular kitchen, fitted wardrobes and finished bathrooms visible in the actual unit photographs.",
          ],
        },
        {
          title: "Up to 90% Home Loan Available*",
          paragraphs: [
            "A major advantage for eligible buyers is the possibility of financing up to 90% of the property value through a home loan. Shubh Estate Brokers can assist with lender comparison, eligibility assessment, documentation, valuation coordination and loan processing alongside the property transaction.",
            "*The actual loan amount and loan-to-value ratio are not guaranteed. They depend on borrower eligibility, income profile, credit assessment, lender policy, legal and technical approval, property valuation and applicable regulations.",
          ],
        },
        {
          title: "Why consider Ireo Skyon in Sector 60 Gurgaon",
          paragraphs: [
            "Ireo Skyon is an established residential development in Sector 60 along the Golf Course Extension Road belt. For end users, the project offers a mature residential environment with landscaped common areas and convenient access to the surrounding Gurgaon road network. For investors, a ready resale apartment in an established community can be evaluated on real unit condition, view, maintenance and current rental or resale demand rather than only on launch-stage projections.",
            "The photographs of this specific apartment show generous internal spaces, a balcony outlook and views towards the landscaped community. Buyers should inspect the actual unit and common areas during the site visit before making a final decision.",
          ],
        },
        {
          title: "Price negotiation and site visit",
          paragraphs: [
            "The stated ₹4.65 crore price is an asking price and is negotiable. Serious buyers can request current availability and arrange a private inspection of the apartment before submitting an offer.",
            "Shubh Estate Brokers can coordinate the property visit, price discussion and financing process so the purchase decision is based on the actual unit, current documentation and lender valuation.",
          ],
        },
        {
          title: "Checks before paying a token",
          paragraphs: [
            "Before committing funds, reconfirm ownership and title documents, society and maintenance dues, parking allocation, transfer requirements, unit condition and any lender-specific legal or technical requirements. The final negotiated value should be evaluated together with applicable transaction costs and financing terms.",
          ],
          bullets: [
            "Inspect the actual apartment, balcony outlook, natural light and condition.",
            "Verify ownership, dues and transfer documentation.",
            "Confirm parking and society-related particulars for the specific unit.",
            "Obtain lender valuation and sanction clarity before relying on a target loan amount.",
          ],
        },
      ]}
      related={[
        { href: "/property-sector-60-gurgaon", label: "Sector 60 Gurgaon property guide" },
        { href: "/projects/ireo-skyon-sector-60", label: "Ireo Skyon project and current inventory" },
        {
          href: "/locations/golf-course-extension-road",
          label: "Golf Course Extension Road property guide",
        },
        { href: "/ready-to-move-flats-in-gurgaon", label: "Ready-to-move flats in Gurgaon" },
        { href: "/flats-for-sale-in-gurgaon", label: "Current Gurgaon property listings" },
        { href: "/home-loans", label: "Home-loan assistance in Gurgaon" },
      ]}
    />
  );
}

function PropertyMedia() {
  return (
    <section aria-labelledby="ireo-skyon-photos">
      <h2 id="ireo-skyon-photos" className="font-display text-2xl md:text-3xl">
        Actual photographs of the Ireo Skyon apartment
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        Review the actual interiors, balcony and community outlook before arranging a private
        site visit. The photographs have not been digitally staged.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {GALLERY.map(([file, label], index) => (
          <figure key={file} className="overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={`${mediaPath}/${file}`}
              alt={`${label} in the Ireo Skyon 3 BHK apartment for sale in Sector 60 Gurgaon`}
              className="aspect-[4/3] w-full object-cover"
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
            />
            <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
