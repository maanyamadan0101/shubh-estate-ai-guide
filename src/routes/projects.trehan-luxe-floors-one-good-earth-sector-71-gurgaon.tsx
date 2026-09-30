import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/trehan-luxe-floors-one-good-earth-sector-71-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Trehan Luxe Floors 71 | One Good Earth Gurgaon";
const description =
  "Explore Trehan Luxe Floors at One Good Earth, Sector 71 Gurgaon near SPR: 3 BHK plans, ₹2.45 Cr base quote, specifications, optional spaces and document checks.";
const assets = "/projects/trehan-one-good-earth";
const faqs = [
  [
    "Where is Trehan Luxe Floors 71 located?",
    "Trehan Luxe Floors at One Good Earth is in Sector 71, Gurugram, beside DLF Alameda. The supplied brochure states approximately 1.3 km from Southern Peripheral Road and 1.5 km from Sohna Road. Distances are indicative.",
  ],
  [
    "What is the quoted price of a 3 BHK floor?",
    "The sales offer shared on 30 September 2026 quotes a base selling price of ₹2.45 crore. A one-third basement share and a half-terrace share are separately quoted at ₹20 lakh each, subject to eligibility, availability and documented rights. Obtain the complete unit-wise cost sheet.",
  ],
  [
    "What is included in the current offer?",
    "The shared offer states parking and power-backup charge waivers, valued at ₹4 lakh and ₹1.5 lakh respectively, and two years of maintenance stated to be by JLL. These are seller-supplied offer terms requiring written confirmation; no expiry date has been supplied.",
  ],
  [
    "Are these fully furnished homes?",
    "The brochure specifies a modular kitchen, hob and chimney, wardrobes, TV units, fans, lighting and geysers. It lists provisions for air conditioning, refrigerator and washing machine; those appliances and loose furniture should not be assumed to be included. Confirm the signed inventory for the selected floor.",
  ],
  [
    "Are the floors ready to move and RERA registered?",
    "The current sales brief describes the inventory as ready to move, but this page does not independently certify that status. HRERA proceedings dated 24 November 2025 raised concerns about registration of Trehan floors and completion within One Good Earth. A later resolution has not been verified. Check the selected floor’s current registration position, occupation certificate, approved plans and colony completion documents before booking.",
  ],
  [
    "Can I buy basement or terrace space with the floor?",
    "The quoted options are a one-third basement share or a half-terrace share. They are not advertised here as an entire private basement or entire private terrace. Eligibility, dimensions, usage rights and inclusion in the conveyance documents must be confirmed for the selected floor.",
  ],
];
const sections = [
  {
    title: "Independent-floor living near SPR",
    paragraphs: [
      "Trehan Luxe Floors 71 at One Good Earth offers a 3-bedroom, 3-bathroom independent-floor format in Sector 71, Gurgaon. The brochure shows low-rise buildings above stilt parking, lift access, front and rear balconies and a living-dining area. This is an option for families comparing builder floors near Southern Peripheral Road and Sohna Road.",
      "The sales brief describes a 13.35-acre township with 207 plots and states that 125 plots are with Trehan. Treat those figures as seller-supplied information, not a count of currently available homes. The brochure master plan shows residential plots, internal roads, green pockets, community-facility land and a commercial area.",
    ],
    bullets: [
      "3 bedrooms and 3 bathrooms",
      "Low-rise format with lift access",
      "Front and rear balconies in the typical plan",
      "Stilt parking layout in the brochure",
    ],
  },
  {
    title: "Interior specifications that make daily living easier",
    paragraphs: [
      "The strongest brochure-backed features are practical: built-in storage, a fitted kitchen, lift access and security provisions. Specifications and equivalent brands are indicative and must be matched to the selected unit’s signed specification sheet.",
    ],
    bullets: [
      "Modular kitchen with quartz countertop, hob and chimney",
      "Bedroom wardrobes and TV units",
      "Imported marble specified for drawing room, lobby and kitchen; vitrified tiles in bedrooms",
      "Video door phone linked to the main gate and an electronic main-door lock",
      "Selected lighting automation and one bedroom curtain automation",
      "Electric-car charging point for each floor, DG backup and CCTV provision in stilts",
      "Fans, lighting and geysers specified",
      "Air-conditioning, refrigerator and washing-machine provisions; appliance supply is not implied",
    ],
  },
  {
    title: "Price, booking amount and optional spaces",
    paragraphs: [
      "The seller’s offer shared on 30 September 2026 quotes a base selling price of ₹2.45 crore and a booking amount of ₹5 lakh. The booking amount is not presented as an additional purchase-price charge here; confirm adjustment, refund and cancellation terms in writing.",
      "One-third basement share: ₹20 lakh extra. Half-terrace share: ₹20 lakh extra. Base plus one eligible option is ₹2.65 crore before any other applicable charges. Availability of both options together has not been confirmed. Confirm legal usage and allocated rights; the brochure labels the basement as utility space.",
      "Parking charges of ₹4 lakh and power-backup charges of ₹1.5 lakh are stated as waived in the shared offer. Two years of maintenance are stated to be included and managed by JLL. Confirm the provider, commencement date, covered services, recurring consumption charges and all remaining taxes, duties, registration and other charges in the final cost sheet. No documented offer-end date was supplied.",
    ],
  },
  {
    title: "Sector 71 location and connectivity",
    paragraphs: [
      "The brochure locates One Good Earth beside DLF Alameda, approximately 1.3 km from SPR and 1.5 km from Gurgaon–Sohna Road. It is near the SPR corridor; the brochure does not establish direct SPR frontage.",
      "The surrounding road network connects towards Golf Course Extension Road and NH-48. The brochure identifies Medanta, Park Hospital, St. Xavier’s High School, DPS International, Good Earth City Centre and Airia Mall among the wider catchment’s destinations. Check your actual commute and school route during a site visit; brochure travel times are not guaranteed.",
    ],
  },
  {
    title: "Township amenities and maintenance",
    paragraphs: [
      "The supplied sales brief highlights a sports club within the township and society CCTV. The brochure master plan shows green pockets and community-facility land. Ask for current photographs, operational status, membership terms and access charges before relying on any facility.",
      "Swimming pool, tennis courts and other amenities appear on some online marketing pages but were not substantiated by the supplied brochure. They are not included as confirmed facilities on this page.",
    ],
  },
  {
    title: "Possession and document status",
    paragraphs: [
      "The inventory is described as ready to move in the seller’s brief. Unit completion, service connections, handover eligibility and occupation documents require floor-specific verification.",
      "An HRERA proceeding dated 24 November 2025, published on the separate Good Earth 71 commercial-project record, discusses registration and completion concerns relating to Trehan residential floors within One Good Earth. The plotted-colony registration must not be treated automatically as registration of the constructed floors. A later resolution was not verified in this review. Request the latest applicable orders and documents before paying a booking amount.",
    ],
  },
  {
    title: "Arrange a floor-wise comparison with Shubh Estate Brokers",
    paragraphs: [
      "Share your budget, preferred floor and whether you need basement or terrace rights. Shubh Estate Brokers can coordinate a site visit, the current cost sheet, unit specifications and document review with the relevant professionals. Mortgage assistance is subject to lender approval, applicant eligibility and acceptance of the specific property.",
      "No apartment area is advertised here because the supplied offer does not identify a verified carpet or built-up area for the selected floor. Request the approved plan and separate carpet, built-up and plot-area figures before comparing prices.",
    ],
  },
  {
    title: "Where is Trehan Luxe Floors 71 located?",
    paragraphs: [
      "Trehan Luxe Floors at One Good Earth is in Sector 71, Gurugram, beside DLF Alameda. The supplied brochure states approximately 1.3 km from Southern Peripheral Road and 1.5 km from Sohna Road. Distances are indicative.",
    ],
  },
  {
    title: "What is the quoted price of a 3 BHK floor?",
    paragraphs: [
      "The sales offer shared on 30 September 2026 quotes a base selling price of ₹2.45 crore. A one-third basement share and a half-terrace share are separately quoted at ₹20 lakh each, subject to eligibility, availability and documented rights. Obtain the complete unit-wise cost sheet.",
    ],
  },
  {
    title: "What is included in the current offer?",
    paragraphs: [
      "The shared offer states parking and power-backup charge waivers, valued at ₹4 lakh and ₹1.5 lakh respectively, and two years of maintenance stated to be by JLL. These are seller-supplied offer terms requiring written confirmation; no expiry date has been supplied.",
    ],
  },
  {
    title: "Are these fully furnished homes?",
    paragraphs: [
      "The brochure specifies a modular kitchen, hob and chimney, wardrobes, TV units, fans, lighting and geysers. It lists provisions for air conditioning, refrigerator and washing machine; those appliances and loose furniture should not be assumed to be included. Confirm the signed inventory for the selected floor.",
    ],
  },
  {
    title: "Are the floors ready to move and RERA registered?",
    paragraphs: [
      "The current sales brief describes the inventory as ready to move, but this page does not independently certify that status. HRERA proceedings dated 24 November 2025 raised concerns about registration of Trehan floors and completion within One Good Earth. A later resolution has not been verified. Check the selected floor’s current registration position, occupation certificate, approved plans and colony completion documents before booking.",
    ],
  },
  {
    title: "Can I buy basement or terrace space with the floor?",
    paragraphs: [
      "The quoted options are a one-third basement share or a half-terrace share. They are not advertised here as an entire private basement or entire private terrace. Eligibility, dimensions, usage rights and inclusion in the conveyance documents must be confirmed for the selected floor.",
    ],
  },
];
export const Route = createFileRoute(
  "/projects/trehan-luxe-floors-one-good-earth-sector-71-gurgaon",
)({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_ORIGIN}${assets}/elevation.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${canonical}#webpage`,
              url: canonical,
              name: title,
              description,
              dateModified: "2026-09-30",
              about: {
                "@type": "Place",
                name: "Trehan Luxe Floors at One Good Earth",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Sector 71",
                  addressLocality: "Gurugram",
                  addressRegion: "Haryana",
                  addressCountry: "IN",
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Southern Peripheral Road",
                  item: `${SITE_ORIGIN}/locations/southern-peripheral-road`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Trehan Luxe Floors 71",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <SeoIntentLanding
      eyebrow="Sector 71 · Southern Peripheral Road corridor"
      title="Trehan Luxe Floors 71 — One Good Earth, Gurgaon"
      body="3 BHK independent floors · 3 bathrooms · Base quote ₹2.45 crore"
      intro="Low-rise living beside DLF Alameda, with fitted interiors, lift access and optional basement or terrace shares. Explore the supplied brochure, pricing and floor-specific document checks. Offer details supplied on 30 September 2026; availability and inclusions require written confirmation."
      interest="Trehan Luxe Floors One Good Earth Sector 71"
      ctaTitle="Request floor-wise details"
      ctaBody="Ask for current availability, complete pricing, specifications, documents and a site visit."
      media={<ProjectMedia />}
      sections={sections}
      related={[
        {
          href: "/locations/southern-peripheral-road",
          label: "Southern Peripheral Road property guide",
        },
        { href: "/properties-for-sale-on-spr-gurgaon", label: "Compare properties near SPR" },
        { href: "/projects-in-gurgaon", label: "Gurgaon residential projects" },
        { href: "/home-loans", label: "Home-loan assistance" },
      ]}
    />
  );
}
function ProjectMedia() {
  return (
    <div className="space-y-8">
      <nav aria-label="Project corridor">
        <a href="/locations/southern-peripheral-road" className="text-gold underline">
          Southern Peripheral Road
        </a>
        <span> / Trehan Luxe Floors 71</span>
      </nav>
      <figure>
        <img
          src={`${assets}/elevation.jpg`}
          alt="Trehan One Good Earth Sector 71 low-rise elevation from the supplied brochure, artistic impression"
          width="1500"
          height="1062"
          className="w-full rounded-xl"
        />
        <figcaption className="mt-2 text-xs text-muted-foreground">
          Brochure illustration. Actual unit finishes and surroundings may differ.
        </figcaption>
      </figure>
      <div className="rounded-xl border border-gold/40 bg-card p-6">
        <h2 className="font-display text-2xl">Offer at a glance</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Base selling price", "₹2.45 crore"],
            ["Booking amount", "₹5 lakh — terms to confirm"],
            ["One-third basement share", "₹20 lakh extra"],
            ["Half-terrace share", "₹20 lakh extra"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">
          Seller-supplied quote. Options depend on the selected floor and documented rights. Obtain
          the complete payable cost sheet.
        </p>
      </div>
      <section className="rounded-xl border border-border p-6">
        <h2 className="font-display text-xl">Before booking</h2>
        <p className="mt-3 text-sm leading-7">
          The sales brief states ready to move. Current floor-specific registration, occupation and
          completion documents require verification. An HRERA proceeding from 24 November 2025
          raised concerns; a later resolution has not been verified.
        </p>
        <a
          className="mt-3 inline-block text-gold underline"
          href="https://haryanarera.gov.in/view_project/searchprojectDetail/3717"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the HRERA record and dated proceedings
        </a>
      </section>
      <section>
        <h2 className="font-display text-2xl">View the supplied walkthrough</h2>
        <video
          controls
          playsInline
          preload="none"
          poster={`${assets}/walkthrough-poster.jpg`}
          className="mt-4 max-h-[34rem] w-full rounded-xl bg-black"
          aria-label="Seller-supplied Trehan One Good Earth walkthrough"
        >
          <source src={`${assets}/walkthrough.mp4`} type="video/mp4" />
          <a href={`${assets}/walkthrough.mp4`}>Open walkthrough video</a>
        </video>
        <p className="mt-2 text-xs text-muted-foreground">
          Seller-supplied video for reference. Confirm the depicted unit, fixtures and present
          condition during your visit.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl">Brochure interiors, layouts and specifications</h2>
        <div className="mt-4 grid gap-6">
          {[
            [
              "interior-gallery.jpg",
              "Illustrative living room, bedroom, kitchen and utility-space interiors from the brochure",
            ],
            ["floor-plan.jpg", "Typical 3 BHK layout and terrace allocation shown in the brochure"],
            [
              "basement-parking-layout.jpg",
              "Basement utility-space allocation and stilt-parking layouts from the brochure",
            ],
            ["master-plan.jpg", "One Good Earth township master plan from the supplied brochure"],
            ["location-map.jpg", "Brochure location map showing Sector 71, SPR and Sohna Road"],
            [
              "specifications.jpg",
              "Brochure specification sheet covering finishes, kitchen, security, lift and electrical provisions",
            ],
            [
              "developer-overview.jpg",
              "Developer overview and portfolio as presented in the supplied brochure",
            ],
          ].map(([file, alt]) => (
            <figure key={file}>
              <a href={`${assets}/${file}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${assets}/${file}`}
                  alt={alt}
                  width="1500"
                  height="1062"
                  loading="lazy"
                  className="w-full rounded-xl border border-border"
                />
              </a>
              <figcaption className="mt-2 text-xs text-muted-foreground">
                {alt}. Brochure material is indicative; confirm current unit details. Select the
                image to view it at full size.
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
