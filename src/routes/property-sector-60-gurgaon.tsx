import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/property-sector-60-gurgaon`;
const title = "Property in Sector 60 Gurgaon | Ireo Skyon & Buyer Guide";
const description =
  "Explore property in Sector 60 Gurgaon on Golf Course Extension Road, including Ireo Skyon current inventory, resale checks, location context and home-loan guidance.";

export const Route = createFileRoute("/property-sector-60-gurgaon")({
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
            { "@type": "ListItem", position: 3, name: "Sector 60 Gurgaon", item: canonical },
          ],
        }),
      },
    ],
  }),
  component: Sector60Page,
});

function Sector60Page() {
  return (
    <SeoIntentLanding
      eyebrow="Location Guide · Golf Course Extension Road"
      title="Property and apartments in Sector 60 Gurgaon"
      body="Explore Sector 60 through project-level research and current unit inventory, with a direct path to Ireo Skyon listings and practical buyer due diligence."
      intro="Sector 60 forms part of the Golf Course Extension Road residential belt. Ireo Skyon is located in Sector 60, so it should be grouped here rather than under Sector 62. Keeping the sector relationship accurate strengthens both buyer navigation and local SEO."
      interest="Property in Sector 60 Gurgaon"
      ctaTitle="Compare Sector 60 properties"
      ctaBody="Tell us your budget, preferred configuration, floor and purchase purpose. We can compare live Sector 60 inventory and financing before a visit."
      sections={[
        {
          title: "Ireo Skyon, Sector 60",
          paragraphs: [
            "Ireo Skyon is an established residential project in Sector 60 on Golf Course Extension Road. The project hub connects current published units with unit-level details, helping buyers compare the exact apartment instead of treating all homes in the project as identical.",
          ],
          bullets: [
            "Compare current units by size, floor, facing and condition.",
            "Review title, dues, parking, maintenance and lender acceptance before committing funds.",
          ],
        },
        {
          title: "Sector 60 buyer checks",
          paragraphs: [
            "For end users, inspect the approach road, actual commute, tower environment, daylight, view and everyday conveniences. For investors, compare rental demand, resale competition, recurring maintenance and the likely future buyer pool.",
          ],
        },
        {
          title: "How this Sector 60 cluster is structured",
          paragraphs: [
            "The internal path is Golf Course Extension Road → Sector 60 → Ireo Skyon project guide → individual property. This keeps the location hierarchy accurate while allowing current inventory to sit beneath the project page.",
          ],
        },
      ]}
      related={[
        { href: "/locations/golf-course-extension-road", label: "Golf Course Extension Road property guide" },
        { href: "/projects/ireo-skyon-sector-60", label: "Ireo Skyon current inventory" },
        { href: "/property-sector-62-gurgaon", label: "Sector 62 Gurgaon property guide" },
        { href: "/property-sector-59-gurgaon", label: "Sector 59 Gurgaon property guide" },
        { href: "/flats-for-sale-in-gurgaon", label: "Current Gurgaon property listings" },
      ]}
    />
  );
}
