import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/property-sector-62-gurgaon`;
const title = "Property in Sector 62 Gurgaon | Heritage One & Urban Oasis";
const description =
  "Explore property in Sector 62 Gurgaon on Golf Course Extension Road, including Conscient Heritage One and Emaar Urban Oasis, with current project inventory, buyer checks and home-loan guidance.";

export const Route = createFileRoute("/property-sector-62-gurgaon")({
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
            { "@type": "ListItem", position: 2, name: "Golf Course Extension Road", item: `${SITE_ORIGIN}/locations/golf-course-extension-road` },
            { "@type": "ListItem", position: 3, name: "Sector 62 Gurgaon", item: canonical },
          ],
        }),
      },
    ],
  }),
  component: Sector62Page,
});

function Sector62Page() {
  return (
    <SeoIntentLanding
      eyebrow="Location Guide · Golf Course Extension Road"
      title="Property and apartments in Sector 62 Gurgaon"
      body="Compare Sector 62 projects through the actual project, current unit inventory, location context, financing and transaction checks rather than a generic portal list."
      intro="Sector 62 is a key residential micro-market on Golf Course Extension Road. For buyers, the useful comparison is project-to-project and then unit-to-unit: tower, floor, facing, view, area, condition, asking price, documentation and financing can materially change the decision."
      interest="Property in Sector 62 Gurgaon"
      ctaTitle="Compare Sector 62 options"
      ctaBody="Share your budget, configuration and whether the purchase is for end use or investment. We can compare current Sector 62 inventory before you schedule visits."
      sections={[
        {
          title: "Conscient Heritage One, Sector 62",
          paragraphs: [
            "Conscient Heritage One is an established residential project in Sector 62. Our project hub connects the society-level guide with any currently published Shubh Estate Brokers units so buyers can move from project research to the exact apartment available.",
          ],
          bullets: [
            "Compare current units by floor, facing, area and asking price.",
            "Check title, dues, parking and lender valuation for the exact apartment.",
          ],
        },
        {
          title: "Emaar Urban Oasis, Sector 62",
          paragraphs: [
            "Emaar Urban Oasis is another major Sector 62 project. For under-construction or newer inventory, buyers should evaluate the specific phase, RERA disclosures, payment milestones, construction progress and the exact unit rather than relying only on launch-stage marketing.",
          ],
          bullets: [
            "Review the applicable phase and project documentation.",
            "Compare current published inventory and competing Sector 62 options.",
          ],
        },
        {
          title: "How this Sector 62 cluster is structured",
          paragraphs: [
            "The internal path is Golf Course Extension Road → Sector 62 → project guide → individual property. This gives buyers a logical research path while helping search engines understand the relationship between the corridor, micro-market, project and exact listing.",
          ],
        },
      ]}
      related={[
        { href: "/locations/golf-course-extension-road", label: "Golf Course Extension Road property guide" },
        { href: "/projects/conscient-heritage-one-sector-62", label: "Conscient Heritage One current inventory" },
        { href: "/projects/emaar-urban-oasis-sector-62", label: "Emaar Urban Oasis current inventory" },
        { href: "/projects/pivotal-paradise-sector-62", label: "Other current Sector 62 inventory" },
        { href: "/property-sector-60-gurgaon", label: "Sector 60 Gurgaon property guide" },
        { href: "/property-sector-59-gurgaon", label: "Sector 59 Gurgaon property guide" },
      ]}
    />
  );
}
