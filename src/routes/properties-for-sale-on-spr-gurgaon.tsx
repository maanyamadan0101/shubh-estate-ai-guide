import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Home, MapPin, TrendingUp } from "lucide-react";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/properties-for-sale-on-spr-gurgaon`;
const title = "Properties for Sale on SPR Gurgaon | 2, 3, 4 & 5 BHK";
const description =
  "Compare selected 2, 3, 4 and 5 BHK flats and builder floors near Southern Peripheral Road Gurgaon, including Sector 68, 69, 70 and 70A, with indicative asking prices checked on 25 August 2026.";

const PROPERTIES = [
  {
    project: "M3M The Marina",
    sector: "Sector 68",
    configuration: "2 BHK",
    size: "1,330 sq. ft.",
    price: "₹1.60 Cr",
    floor: "21st of 29",
    facing: "West",
    highlight: "3 balconies · semi-furnished · 1 covered + 1 open parking",
    fit: "Lower-ticket entry in this shortlist for a smaller family or investor comparing Sector 68.",
  },
  {
    project: "BPTP Astaire Gardens",
    sector: "Sector 70A",
    configuration: "3 BHK builder floor",
    size: "158.67 sq. yd. plot",
    price: "₹1.75 Cr",
    floor: "1st of 2",
    facing: "Not stated",
    highlight: "3+ balconies · pooja room · private garden · roof rights",
    fit: "Value-led low-rise option for buyers who prefer independent-floor living over a high-rise.",
  },
  {
    project: "Pareena Mi Casa",
    sector: "Sector 68",
    configuration: "3 BHK + pooja + study + servant + store",
    size: "1,705 sq. ft.",
    price: "₹2.05 Cr",
    floor: "26th of 35",
    facing: "North-East",
    highlight: "2 covered parkings · semi-furnished · park/club/pool outlook",
    fit: "Strong end-user combination of high floor, multiple utility spaces and two covered parkings.",
  },
  {
    project: "Shree Vardhman Victoria",
    sector: "Sector 70",
    configuration: "3 BHK + servant",
    size: "1,950 sq. ft.",
    price: "₹2.27 Cr",
    floor: "7th of 18",
    facing: "East",
    highlight: "1,161 sq. ft. carpet area · 4 bathrooms · park-facing",
    fit: "Space-focused family option for buyers comparing larger completed 3 BHK homes.",
  },
  {
    project: "Tulip Yellow",
    sector: "Sector 69",
    configuration: "3 BHK",
    size: "1,704 sq. ft.",
    price: "₹2.29 Cr",
    floor: "12th of 26",
    facing: "North-East",
    highlight: "1,229 sq. ft. carpet area · park-facing · 1 covered parking",
    fit: "Balanced mid-premium option for end users and investors comparing Sector 69 around SPR.",
  },
  {
    project: "Vatika INXT Floors",
    sector: "Sector 82A",
    configuration: "3 BHK + pooja + study + servant",
    size: "360 sq. yd. plot",
    price: "₹2.40 Cr + applicable charges",
    floor: "1st of 2",
    facing: "North-East",
    highlight: "Low-rise · park and main-road outlook",
    fit: "New Gurgaon alternative for buyers seeking an independent floor on a larger plot configuration.",
    href: "/3-bhk-builder-floor-for-sale-vatika-inxt-floors-sector-82a-gurgaon",
  },
  {
    project: "BPTP Astaire Gardens",
    sector: "Sector 70A",
    configuration: "3 BHK + pooja + study + servant + store",
    size: "266.67 sq. yd. plot",
    price: "₹2.55 Cr",
    floor: "2nd of 3",
    facing: "West",
    highlight: "Lift · roof rights · corner property · 3 covered/stilt parkings",
    fit: "Larger low-rise family home for buyers prioritising privacy, parking and utility spaces.",
  },
  {
    project: "Tulip Ivory",
    sector: "Sector 70",
    configuration: "4 BHK + servant",
    size: "2,400 sq. ft.",
    price: "₹2.95 Cr",
    floor: "9th of 12",
    facing: "North",
    highlight: "5 bathrooms · 3+ balconies · semi-furnished",
    fit: "Family upgrade option for buyers moving from a conventional 3 BHK into a larger 4 BHK.",
  },
  {
    project: "Tulip Crimson",
    sector: "Sector 70",
    configuration: "4 BHK + pooja + servant + study",
    size: "Approx. 3,200 sq. ft.",
    price: "₹4.50 Cr",
    floor: "25th of 36",
    facing: "East",
    highlight: "Large-format home · premium amenities · possession shown as Nov 2028",
    fit: "Longer-horizon premium option for HNI investors and end users seeking a much larger 4 BHK.",
  },
  {
    project: "Tulip Melrose",
    sector: "Sector 70",
    configuration: "5 BHK + pooja + study + store",
    size: "3,216 sq. ft.",
    price: "₹4.63 Cr + applicable charges",
    floor: "26th of 38",
    facing: "East",
    highlight: "5 bathrooms · 3 balconies · pool/club/park outlook",
    fit: "Large-format luxury choice for families and investors targeting the premium 5 BHK segment.",
  },
] as const;

const FAQS = [
  {
    q: "What is the lowest-priced property in this SPR Gurgaon shortlist?",
    a: "The lowest quoted option in this comparison is the M3M The Marina 2 BHK in Sector 68 at approximately ₹1.60 crore. The lowest quoted 3 BHK low-rise option is BPTP Astaire Gardens at approximately ₹1.75 crore.",
  },
  {
    q: "Which 3 BHK in this shortlist offers the largest apartment area?",
    a: "Among the high-rise apartment options shown, Shree Vardhman Victoria is quoted at approximately 1,950 sq. ft. Buyers comparing builder floors should separately verify plot area, covered area and usable area because these are different measurements.",
  },
  {
    q: "Which option may suit a family looking for a 4 BHK?",
    a: "Tulip Ivory is shown at approximately 2,400 sq. ft. and ₹2.95 crore, while Tulip Crimson is a larger premium 4 BHK option at approximately 3,200 sq. ft. and ₹4.50 crore. Suitability depends on budget, possession timing and unit-level condition.",
  },
  {
    q: "Are these prices final transaction prices?",
    a: "No. These are indicative asking prices captured from current market listings on 25 August 2026. Availability, negotiation, government charges, taxes and final transaction terms must be reconfirmed before commitment.",
  },
];

export const Route = createFileRoute("/properties-for-sale-on-spr-gurgaon")({
  head: () => ({
    meta: [
      { title },
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
            {
              "@type": "ListItem",
              position: 2,
              name: "Flats for sale in Gurgaon",
              item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
            },
            { "@type": "ListItem", position: 3, name: "Properties for sale on SPR Gurgaon", item: canonical },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Selected properties for sale near Southern Peripheral Road Gurgaon",
          numberOfItems: PROPERTIES.length,
          itemListElement: PROPERTIES.map((property, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Residence",
              name: `${property.project} ${property.configuration} for sale in ${property.sector}, Gurgaon`,
              description: `${property.size}; ${property.floor}; ${property.facing} facing; indicative asking price ${property.price}.`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
            },
          })),
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
  component: SprPropertyComboPage,
});

function PropertyGrid() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {PROPERTIES.map((property) => (
          <article
            key={`${property.project}-${property.configuration}-${property.size}`}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{property.sector}</p>
                <h2 className="mt-2 font-display text-xl">{property.project}</h2>
                <p className="mt-1 text-sm font-medium">{property.configuration}</p>
              </div>
              <div className="rounded-xl bg-muted px-3 py-2 text-right">
                <p className="text-xs text-muted-foreground">Indicative ask</p>
                <p className="font-semibold">{property.price}</p>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Size</dt>
                <dd className="mt-1 font-medium">{property.size}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Floor</dt>
                <dd className="mt-1 font-medium">{property.floor}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Facing</dt>
                <dd className="mt-1 font-medium">{property.facing}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Location</dt>
                <dd className="mt-1 font-medium">{property.sector}, Gurgaon</dd>
              </div>
            </dl>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">{property.highlight}</p>
            <div className="mt-4 rounded-xl border border-gold/20 bg-gold/5 p-3 text-sm leading-6">
              <span className="font-semibold">Best fit: </span>
              {property.fit}
            </div>
            {"href" in property ? (
              <Link
                to={property.href}
                className="mt-4 inline-flex text-sm font-semibold text-gold underline-offset-4 hover:underline"
              >
                View detailed Vatika INXT listing
              </Link>
            ) : null}
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-muted-foreground">
        Market-check date: 25 August 2026. Prices are indicative asking prices, not guaranteed closing prices. Reconfirm the specific unit, availability, negotiated value, charges, documents and possession status before paying a token.
      </p>
    </div>
  );
}

function SprPropertyComboPage() {
  return (
    <SeoIntentLanding
      eyebrow="Southern Peripheral Road · Gurgaon Property Comparison"
      title="Properties for Sale on SPR Gurgaon: 2, 3, 4 & 5 BHK Shortlist"
      body="A buyer-focused comparison of selected apartments and builder floors across Sector 68, 69, 70 and 70A, plus a New Gurgaon independent-floor alternative in Sector 82A."
      intro="This shortlist is designed for investors and end users who want to compare actual asking prices, configuration, floor, orientation and space rather than relying only on project marketing. The market-check date is 25 August 2026, and every quoted price should be reconfirmed before a transaction."
      interest="SPR Gurgaon property shortlist August 2026"
      ctaTitle="Get the best-fit shortlist for your budget"
      ctaBody="Share your budget, preferred BHK, end-use or investment objective and possession preference. We can compare available units, negotiate price and coordinate due diligence and home-loan checks."
      media={<PropertyGrid />}
      sections={[
        {
          title: "How to read this SPR Gurgaon property comparison",
          paragraphs: [
            "A lower asking price does not automatically mean better value. Compare usable area, floor, facing, parking, servant or study spaces, construction or possession stage, maintenance, project occupancy and the number of competing resale units before deciding.",
            "For investors, entry price and future exit liquidity matter more than headline appreciation claims. For end users, the daily experience of the exact unit—light, ventilation, view, road access, parking and society management—can outweigh a small price difference.",
          ],
          bullets: [
            "₹1.60–1.75 Cr: lower-ticket 2 BHK high-rise or 3 BHK low-rise choices in this shortlist.",
            "₹2.05–2.55 Cr: multiple 3 BHK options with different space, floor and privacy profiles.",
            "Around ₹2.95 Cr: a 2,400 sq. ft. 4 BHK + servant upgrade option in Tulip Ivory.",
            "₹4.50 Cr+: large-format Tulip Crimson 4 BHK and Tulip Melrose 5 BHK premium options.",
          ],
        },
        {
          title: "Investor lens: what can make one unit stronger than another",
          paragraphs: [
            "An investor should compare the negotiated acquisition price with similar units in the same project and neighbouring projects, not only with a developer price or one online listing. Higher floors, park-facing positions, scarce configurations, practical parking and ready occupancy can affect resale demand, but the premium paid for these features must still be reasonable.",
          ],
          bullets: [
            "Compare effective price per usable sq. ft., not only super-area price.",
            "Check how many similar units are available for resale at the same time.",
            "Estimate realistic rent after maintenance and vacancy, not gross advertised rent.",
            "For under-construction property, examine payment schedule, delivery stage and future competing supply.",
          ],
        },
        {
          title: "End-user lens: space, privacy and everyday practicality",
          paragraphs: [
            "End users should physically compare the layouts. Pareena Mi Casa offers a high-floor 3 BHK with pooja, study, servant and store spaces; Shree Vardhman Victoria offers a larger 1,950 sq. ft. 3 BHK + servant; BPTP Astaire Gardens provides low-rise privacy; and Tulip Ivory moves into a 4 BHK + servant format.",
            "Before finalising, inspect sunlight at the time you normally use the home, lift wait times, parking access, internal-road traffic, clubhouse condition, power backup, water arrangement and the actual view from the offered unit.",
          ],
        },
        {
          title: "Price negotiation, legal checks and home-loan coordination",
          paragraphs: [
            "Shubh Estate Brokers can help compare the seller's expectation with competing inventory, coordinate negotiation, review the transaction checklist and work alongside the selected bank or lender for property and loan processing. A bank valuation or legal check is useful, but it does not replace the buyer's own independent due diligence.",
          ],
          bullets: [
            "Reconfirm ownership, title chain and property-specific approvals.",
            "Check maintenance, utility and other outstanding dues.",
            "Verify parking rights and floor or terrace rights where relevant.",
            "Confirm total acquisition cost including government charges and taxes where applicable.",
          ],
        },
        {
          title: "Frequently asked questions",
          paragraphs: FAQS.map((faq) => `${faq.q} ${faq.a}`),
        },
      ]}
      related={[
        { href: "/flats-for-sale-in-gurgaon", label: "All flats and properties for sale in Gurgaon" },
        { href: "/locations/southern-peripheral-road", label: "Southern Peripheral Road Gurgaon guide" },
        { href: "/under-construction-projects-gurgaon", label: "Under-construction projects in Gurgaon" },
        { href: "/property-buying-advisory-gurgaon", label: "Property buying advisory" },
        { href: "/home-loans", label: "Home-loan assistance" },
        { href: "/emi-calculator", label: "Home-loan EMI calculator" },
      ]}
    />
  );
}
