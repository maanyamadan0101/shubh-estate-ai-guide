import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft`;
const title = "3 BHK + 1 for Sale in Emaar Emerald Estate Sector 65 Gurgaon";
const description =
  "Unused 3 BHK + 1 apartment for sale in Emaar Emerald Estate, Sector 65 Gurgaon. 1,395 sq ft, higher floor, East-facing, asking ₹2.30 crore. View actual photos and walkthrough.";
const mediaPath = "/properties/emaar-emerald-estate-1395";
const coverImage = `${SITE_ORIGIN}${mediaPath}/02-emaar-emerald-estate-3bhk-living-room-balcony.webp`;
const videoUrl = `${SITE_ORIGIN}${mediaPath}/emaar-emerald-estate-3bhk-1395-walkthrough.mp4`;

const GALLERY = [
  ["01-emaar-emerald-estate-3bhk-entrance-living-room.webp", "Entrance and living area"],
  ["02-emaar-emerald-estate-3bhk-living-room-balcony.webp", "Living room with balcony access"],
  ["03-emaar-emerald-estate-1395-living-dining.webp", "Living and dining area"],
  ["04-emaar-emerald-estate-3bhk-kitchen.webp", "Kitchen with utility balcony access"],
  ["05-emaar-emerald-estate-kitchen-counter.webp", "Kitchen counter and worktop"],
  ["06-emaar-emerald-estate-bedroom.webp", "Bedroom"],
  ["07-emaar-emerald-estate-master-bedroom.webp", "Bedroom with attached spaces"],
  ["08-emaar-emerald-estate-attached-space.webp", "Additional attached space"],
  ["09-emaar-emerald-estate-bathroom.webp", "Bathroom"],
  ["10-emaar-emerald-estate-bathroom-vanity.webp", "Bathroom vanity and window"],
  ["11-emaar-emerald-estate-window-natural-light.webp", "Window and natural light"],
  ["12-emaar-emerald-estate-room-layout.webp", "Room layout and internal circulation"],
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
    a: "The apartment is represented as unused. Buyers can inspect the actual condition through the photographs, video walkthrough and an in-person site visit.",
  },
  {
    q: "Can Shubh Estate Brokers arrange a site visit and home-loan assistance?",
    a: "Yes. Shubh Estate Brokers can coordinate the property visit, price discussion, document follow-up and home-loan processing. Loan eligibility and loan-to-value remain subject to the selected lender's policy and assessment.",
  },
];

export const Route = createFileRoute(
  "/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft",
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
        content: "Unused 3 BHK apartment in Emaar Emerald Estate Sector 65 Gurgaon",
      },
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
              name: "Flats for sale in Gurgaon",
              item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Emaar Emerald Estate 3 BHK + 1",
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
          "@type": "VideoObject",
          name: "Emaar Emerald Estate 3 BHK + 1 Apartment Walkthrough",
          description:
            "Walkthrough of the unused 1,395 sq ft higher-floor East-facing 3 BHK + 1 apartment for sale in Emaar Emerald Estate, Sector 65 Gurgaon.",
          thumbnailUrl: coverImage,
          contentUrl: videoUrl,
          uploadDate: "2026-09-05",
          duration: "PT2M13S",
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
      intro="This unused 3 BHK + 1 apartment in Emaar Emerald Estate, Sector 65, Gurugram offers a stated area of 1,395 sq ft on a higher floor with an East-facing orientation. The home is available at an asking price of ₹2.30 crore and is presented with actual unit photographs and a walkthrough so buyers can assess the layout and condition before scheduling a visit."
      interest="Emaar Emerald Estate 3 BHK + 1 Sector 65 Gurgaon"
      ctaTitle="Check availability and arrange a private site visit"
      ctaBody="Contact Shubh Estate Brokers to reconfirm the unit, asking price and visit schedule, or to discuss home-loan eligibility and transaction coordination."
      media={<PropertyMedia />}
      sections={[
        {
          title: "Property highlights",
          paragraphs: [
            "At the stated asking price, the unit works out to approximately ₹16,488 per sq ft on the stated 1,395 sq ft area. This is a simple asking-price calculation, not a valuation or evidence of a completed transaction. The final value should be assessed against the exact tower, floor, condition, view, parking, dues and comparable transactions.",
            "Because the apartment is unused, a buyer can plan wardrobes, lighting, kitchen upgrades and other interiors around personal requirements instead of first removing an earlier occupant's fit-out.",
          ],
          bullets: [
            "3 BHK + 1 apartment in Emaar Emerald Estate, Sector 65, Gurugram.",
            "Stated area: 1,395 sq ft.",
            "Higher-floor position.",
            "East-facing orientation.",
            "Unused apartment with scope to personalise the interiors.",
            "Asking price: ₹2.30 crore, subject to availability and negotiation.",
            "Actual property photographs and video walkthrough available on this page.",
          ],
        },
        {
          title: "About Emaar Emerald Estate, Sector 65",
          paragraphs: [
            "Emaar describes Emerald Estate as a Gurugram residential community inspired by Spanish architecture, with modern design standards and more than 50% of its area dedicated to landscaped greens. The developer also highlights proximity to the proposed Metro Corridor.",
            "Sector 65 sits on the Golf Course Extension Road residential belt. Emaar's project information for the Emerald Estate community highlights access towards Golf Course Extension Road as well as proximity to schools, hospitals and business centres. Exact travel time depends on route and traffic and should be checked for the buyer's daily destinations.",
          ],
          bullets: [
            "Emaar residential community in Sector 65, Gurugram.",
            "Spanish-inspired architectural character described by the developer.",
            "More than 50% landscaped green area stated by Emaar for Emerald Estate.",
            "Located in the Golf Course Extension Road micro-market.",
            "Close to the proposed Metro Corridor, as stated by Emaar.",
          ],
        },
        {
          title: "Why a higher-floor East-facing unused unit can appeal to end users",
          paragraphs: [
            "Higher-floor homes are often shortlisted for openness, light and ventilation, but the actual outlook and tower spacing matter more than the floor label alone. The uploaded photographs show good daylight entering the apartment; buyers should still inspect the view, sun exposure and ventilation at the time of the visit.",
            "East-facing orientation is a common preference among Gurgaon home buyers. It should be treated as one selection factor alongside usable layout, room sizes, parking, society maintenance, tower position and the final negotiated price.",
          ],
        },
        {
          title: "Checks before paying a token",
          paragraphs: [
            "Before committing funds, verify ownership and title, the exact unit and tower, sanctioned and registered area particulars, parking rights, maintenance and utility dues, society transfer requirements, possession or occupation documentation where applicable and the final negotiated consideration.",
            "The 1,395 sq ft figure is the area stated for this listing. Buyers using a home loan should have the selected lender confirm valuation and property-document acceptance early in the transaction process.",
          ],
          bullets: [
            "Inspect the actual unit, floor, view, light, ventilation and current condition.",
            "Confirm the exact meaning of the +1 room and its approved layout in the unit documents.",
            "Verify parking allocation and any outstanding society or utility dues.",
            "Compare the final negotiated value with genuinely comparable inventory in the same project.",
          ],
        },
        {
          title: "Home-loan and transaction support",
          paragraphs: [
            "Shubh Estate Brokers can coordinate the property visit, price discussion, document follow-up and home-loan process. Loan eligibility, interest rate, valuation and loan-to-value depend on the applicant profile, selected lender and final property-document acceptance.",
            "Outstation and overseas buyers can first review the actual photographs and video walkthrough on this page and then arrange an in-person inspection or transaction-stage document coordination.",
          ],
        },
      ]}
      related={[
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
          href: "/emaar-emerald-hills-sector-65-gurgaon",
          label: "Emaar Emerald Hills Sector 65 guide",
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
    <section aria-labelledby="emaar-emerald-estate-walkthrough">
      <h2 id="emaar-emerald-estate-walkthrough" className="font-display text-2xl md:text-3xl">
        Actual apartment video and photographs
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        Review the actual condition, room proportions, kitchen and natural light before arranging a visit. The media supplied for this listing has not been digitally staged.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-black">
        <video
          className="mx-auto max-h-[44rem] w-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={`${mediaPath}/02-emaar-emerald-estate-3bhk-living-room-balcony.webp`}
          aria-label="Video walkthrough of the Emaar Emerald Estate 3 BHK plus 1 apartment"
        >
          <source src={`${mediaPath}/emaar-emerald-estate-3bhk-1395-walkthrough.mp4`} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>

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
        Project context is based on Emaar's official Emerald Estate information. Unit-specific facts on this page refer to the apartment offered for sale and should be reconfirmed at the time of inspection.
      </p>
    </section>
  );
}
