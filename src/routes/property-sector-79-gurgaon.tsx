import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/property-sector-79-gurgaon`;
const title = "Property in Sector 79 Gurgaon | Flats for Sale & Buying Guide";
const description =
  "Explore flats and property for sale in Sector 79 Gurgaon. Compare M3M Golf Hills, Godrej 101, connectivity, resale pricing, home loans and transaction checks.";

export const Route = createFileRoute("/property-sector-79-gurgaon")({
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
            { "@type": "ListItem", position: 2, name: "Property in Gurgaon", item: `${SITE_ORIGIN}/locations/gurgaon` },
            { "@type": "ListItem", position: 3, name: "Sector 79 Gurgaon", item: canonical },
          ],
        }),
      },
    ],
  }),
  component: Sector79Page,
});

function Sector79Page() {
  return (
    <SeoIntentLanding
      eyebrow="Location Guide · New Gurugram"
      title="Property and flats for sale in Sector 79 Gurgaon"
      body="Compare established resale apartments and newer residential options in Sector 79 with practical guidance on project selection, pricing, connectivity, financing and documentation."
      intro="Sector 79 sits in the New Gurugram and NH-48-side growth catchment near the Aravalli foothills. The micro-market includes established residential communities as well as newer phases and projects, so buyers should compare actual access, occupancy, construction status and competing supply at project and tower level."
      interest="Property in Sector 79 Gurgaon"
      ctaTitle="Shortlist Sector 79 properties"
      ctaBody="Share your configuration, budget, possession preference and purpose. We can compare suitable Sector 79 inventory and explain the trade-offs before a site visit."
      sections={[
        {
          title: "Why buyers consider Sector 79",
          paragraphs: [
            "Sector 79 attracts buyers looking across New Gurugram for larger apartments, amenity-led communities and access towards NH-48 employment corridors. The area should be evaluated through the actual approach road, everyday services, occupancy and travel pattern rather than distance claims alone.",
            "Ready and resale options allow buyers to inspect the finished apartment, views, tower spacing and society operations. Newer inventory may offer different specifications or payment structures but requires a closer review of delivery, future supply and construction risk.",
          ],
          bullets: [
            "Choice of ready, resale and newer residential inventory.",
            "Access towards New Gurugram and NH-48-side employment districts.",
            "Views and open surroundings vary materially by project and tower.",
            "Project execution, access roads and social infrastructure require on-ground comparison.",
          ],
        },
        {
          title: "Godrej 101 and other project comparisons",
          paragraphs: [
            "Godrej 101 is one of the established names buyers search for in Sector 79. Compare each available unit on configuration, area, floor, facing, view, condition, parking, owner expectation and documentation rather than treating every apartment in the project as equivalent.",
            "When comparing Godrej 101 with other Sector 79 projects, consider total purchase cost, society maintenance, occupancy, construction stage, competing resale inventory and the likely profile of future buyers or tenants.",
          ],
          bullets: [
            "Inspect the actual unit and tower surroundings.",
            "Confirm the applicable RERA registration and possession documents.",
            "Compare maintenance and recurring ownership costs.",
            "Use lender valuation and realistic resale evidence to test the asking price.",
          ],
        },
        {
          title: "Buying, financing or selling in Sector 79",
          paragraphs: [
            "Eligible buyers may be able to finance a substantial portion of the purchase, subject to income, lender policy, valuation and property-document approval. The loan process should begin early enough to identify property or documentation concerns before a large payment.",
            "Owners can submit a Sector 79 property privately for pricing review, listing preparation and qualified buyer follow-up. NRI owners can begin remotely and coordinate visits, negotiation and transaction documentation through a local Gurgaon point of contact.",
          ],
        },
      ]}
      related={[
        { href: "/projects/m3m-golf-hills-sector-79-gurgaon", label: "M3M Golf Hills Sector 79 price, RERA and NRI buyer guide" },
        { href: "/godrej-101-sector-79-gurgaon", label: "Godrej 101 Sector 79 project and resale guide" },
        { href: "/locations/new-gurgaon", label: "New Gurugram property guide" },
        { href: "/flats-for-sale-in-gurgaon", label: "Flats and apartments for sale in Gurgaon" },
        { href: "/sell-property-gurgaon", label: "Sell property in Gurgaon" },
      ]}
    />
  );
}
