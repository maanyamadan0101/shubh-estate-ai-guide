import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon`;
const title = "3 BHK for Sale in Puri Emerald Bay Sector 104 Gurgaon";
const description =
  "3 BHK plus servant room for sale in Puri Emerald Bay, Sector 104 Gurgaon. 2450 sq ft, Tower A3, 15th floor, north-east facing. Asking ₹3.25 crore.";
const mediaPath = "/properties/puri-emerald-bay-2450";
const coverImage = `${SITE_ORIGIN}${mediaPath}/05-puri-emerald-bay-3bhk-living-room.jpg`;
const videoUrl = `${SITE_ORIGIN}${mediaPath}/puri-emerald-bay-3bhk-walkthrough.mp4`;

const GALLERY = [
  ["01-puri-emerald-bay-3bhk-entrance-hallway.jpg", "Entrance hallway and dining area"],
  ["02-puri-emerald-bay-3bhk-bedroom.jpg", "Bedroom with balcony access"],
  ["03-puri-emerald-bay-3bhk-bathroom.jpg", "Apartment bathroom"],
  ["04-puri-emerald-bay-3bhk-dining-area.jpg", "Dining area"],
  ["05-puri-emerald-bay-3bhk-living-room.jpg", "Living room"],
  ["06-puri-emerald-bay-3bhk-modular-kitchen.jpg", "Modular kitchen"],
  ["07-puri-emerald-bay-3bhk-kitchen-counter.jpg", "Kitchen counter and utility area"],
  ["08-puri-emerald-bay-3bhk-balcony-green-view.jpg", "Balcony and green view"],
  ["09-puri-emerald-bay-3bhk-master-bedroom.jpg", "Master bedroom"],
  ["10-puri-emerald-bay-3bhk-second-bedroom.jpg", "Second bedroom"],
] as const;

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
      { property: "og:image", content: coverImage },
      { property: "og:image:alt", content: "Living room in the Puri Emerald Bay 3 BHK apartment for sale" },
      { property: "og:video", content: videoUrl },
      { property: "og:video:type", content: "video/mp4" },
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
              item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
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
          image: GALLERY.map(([file]) => `${SITE_ORIGIN}${mediaPath}/${file}`),
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
          "@type": "VideoObject",
          name: "Puri Emerald Bay 3 BHK Apartment Walkthrough",
          description:
            "Walkthrough of the 2,450 sq ft 3 BHK plus servant room apartment for sale in Tower A3, Puri Emerald Bay, Sector 104 Gurgaon.",
          thumbnailUrl: coverImage,
          contentUrl: videoUrl,
          uploadDate: "2026-08-20",
          duration: "PT55S",
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
      media={<PropertyMedia />}
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
        { href: "/flats-for-sale-in-gurgaon", label: "Current Gurgaon property listings" },
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

function PropertyMedia() {
  return (
    <section aria-labelledby="property-walkthrough">
      <h2 id="property-walkthrough" className="font-display text-2xl md:text-3xl">
        Video walkthrough and actual property photographs
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        View the actual interiors and outlook of this Tower A3 apartment. Images were
        extracted from the property walkthrough video and have not been digitally staged.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-black">
        <video
          className="mx-auto max-h-[44rem] w-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={`${mediaPath}/05-puri-emerald-bay-3bhk-living-room.jpg`}
          aria-label="Video walkthrough of Puri Emerald Bay 3 BHK apartment"
        >
          <source src={`${mediaPath}/puri-emerald-bay-3bhk-walkthrough.mp4`} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {GALLERY.map(([file, label], index) => (
          <figure
            key={file}
            className={`overflow-hidden rounded-xl border border-border bg-card ${
              index === 4 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <img
              src={`${mediaPath}/${file}`}
              alt={`${label} in the 3 BHK apartment for sale at Puri Emerald Bay Sector 104 Gurgaon`}
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
    </section>
  );
}
