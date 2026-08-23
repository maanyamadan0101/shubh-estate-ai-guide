import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/property-sector-59-gurgaon`;
const title = "Property in Sector 59 Gurgaon | Tata Raisina Residency Guide";
const description =
  "Explore property in Sector 59 Gurgaon on Golf Course Extension Road, including Tata Raisina Residency, resale checks, project context and home-loan guidance.";

export const Route = createFileRoute("/property-sector-59-gurgaon")({
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
            { "@type": "ListItem", position: 3, name: "Sector 59 Gurgaon", item: canonical },
          ],
        }),
      },
    ],
  }),
  component: Sector59Page,
});

function Sector59Page() {
  return (
    <SeoIntentLanding
      eyebrow="Location Guide · Golf Course Extension Road"
      title="Property and apartments in Sector 59 Gurgaon"
      body="Research Sector 59 through project-level pages, resale checks and current inventory, with Tata Raisina Residency added as a dedicated project guide."
      intro="Sector 59 sits on the Golf Course Extension Road side of Gurugram and includes established premium residential communities close to the Aravalli foothills. Project quality and the exact apartment should be assessed together, especially for larger luxury residences."
      interest="Property in Sector 59 Gurgaon"
      ctaTitle="Compare Sector 59 options"
      ctaBody="Share your budget, configuration and preferred floor or view. We can reconfirm current Sector 59 availability and transaction requirements."
      sections={[
        {
          title: "Tata Raisina Residency, Sector 59",
          paragraphs: [
            "Tata Raisina Residency is a Tata-branded residential development in Sector 59. The dedicated project page provides stable project context, buyer checks and a place for current Shubh Estate Brokers inventory to connect as genuine units are published.",
          ],
          bullets: [
            "Established residential setting near the Aravalli foothills.",
            "Large-format residences require unit-specific valuation and condition checks.",
            "Current availability should be reconfirmed before planning a site visit.",
          ],
        },
        {
          title: "Sector 59 buyer and resale checks",
          paragraphs: [
            "Compare tower, floor, orientation, actual view, fit-out condition, parking, maintenance position, ownership documents and lender valuation. In mature luxury projects, renovation cost and recurring maintenance can materially affect the effective purchase price.",
          ],
        },
        {
          title: "How this Sector 59 cluster is structured",
          paragraphs: [
            "The internal path is Golf Course Extension Road → Sector 59 → Tata Raisina Residency project guide → individual property whenever a live unit is published. This preserves a clean project-to-inventory structure without inventing listings that are not currently available.",
          ],
        },
      ]}
      related={[
        { href: "/locations/golf-course-extension-road", label: "Golf Course Extension Road property guide" },
        { href: "/projects/tata-raisina-residency-sector-59", label: "Tata Raisina Residency project guide" },
        { href: "/property-sector-60-gurgaon", label: "Sector 60 Gurgaon property guide" },
        { href: "/property-sector-62-gurgaon", label: "Sector 62 Gurgaon property guide" },
        { href: "/properties", label: "Current Gurgaon property listings" },
      ]}
    />
  );
}
