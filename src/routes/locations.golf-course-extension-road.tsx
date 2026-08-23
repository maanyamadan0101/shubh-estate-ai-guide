import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/locations/golf-course-extension-road`;
const title = "Golf Course Extension Road Gurgaon | Sectors, Projects & Properties";
const description =
  "Explore Golf Course Extension Road Gurgaon by sector and project, including Sector 62 Conscient Heritage One and Emaar Urban Oasis, Sector 60 Ireo Skyon, and Sector 59 Tata Raisina Residency.";

export const Route = createFileRoute("/locations/golf-course-extension-road")({
  loader: async () => {
    const { properties } = await listPublicProperties({ data: { locality: "Golf Course Extension Road", limit: 12 } });
    return { properties };
  },
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
            { "@type": "ListItem", position: 3, name: "Golf Course Extension Road", item: canonical },
          ],
        }),
      },
    ],
  }),
  component: GolfCourseExtensionPage,
});

const clusters = [
  {
    sector: "Sector 62",
    href: "/property-sector-62-gurgaon",
    projects: [
      { name: "Conscient Heritage One", href: "/projects/conscient-heritage-one-sector-62" },
      { name: "Emaar Urban Oasis", href: "/projects/emaar-urban-oasis-sector-62" },
    ],
  },
  {
    sector: "Sector 60",
    href: "/property-sector-60-gurgaon",
    projects: [{ name: "Ireo Skyon", href: "/projects/ireo-skyon-sector-60" }],
  },
  {
    sector: "Sector 59",
    href: "/property-sector-59-gurgaon",
    projects: [{ name: "Tata Raisina Residency", href: "/projects/tata-raisina-residency-sector-59" }],
  },
];

function GolfCourseExtensionPage() {
  const { properties } = Route.useLoaderData() as { properties: ListingRow[] };

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/locations/$slug" params={{ slug: "gurgaon" }} className="hover:text-foreground">Gurgaon</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Golf Course Extension Road</span>
          </nav>
          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Corridor → Sector → Project → Property</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Golf Course Extension Road Gurgaon property guide</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              Compare Golf Course Extension Road through its actual sectors and projects, then move into genuine unit-level inventory. This creates a cleaner buyer journey than treating the entire corridor as one undifferentiated property list.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href="#sector-clusters">Explore Sectors & Projects</a></Button>
              <Button asChild variant="goldOutline"><a href="#current-inventory">View Current Inventory</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="sector-clusters" className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Micro-market architecture</p>
          <h2 className="mt-2 font-display text-3xl">Explore Golf Course Extension Road by sector</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Sector accuracy matters. Ireo Skyon is in Sector 60, while Tata Raisina Residency is in Sector 59. Conscient Heritage One and Emaar Urban Oasis are in Sector 62. Keeping these relationships correct helps buyers compare the right micro-market and strengthens local search relevance.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {clusters.map((cluster) => (
            <article key={cluster.sector} className="rounded-xl border border-border bg-card p-6">
              <MapPin className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl">{cluster.sector} Gurgaon</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Open the sector guide first, then compare project pages and individual property inventory.</p>
              <div className="mt-5 border-t border-border pt-4">
                <a href={cluster.href} className="font-medium text-gold underline-offset-4 hover:underline">Open {cluster.sector} guide</a>
                <div className="mt-4 grid gap-2 text-sm">
                  {cluster.projects.map((project) => (
                    <a key={project.href} href={project.href} className="flex items-center gap-2 text-muted-foreground hover:text-gold">
                      <Building2 className="size-4 text-gold" aria-hidden="true" />
                      {project.name}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Buyer framework</p>
            <h2 className="mt-2 font-display text-3xl">Compare corridor, sector, project and exact unit together</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Sector context", "Check access roads, everyday services, traffic pattern and nearby development for the exact sector."],
                ["Project quality", "Compare delivery history, occupancy, maintenance, density, amenities and competing inventory."],
                ["Exact apartment", "Floor, facing, view, area, condition, parking and asking price can change value materially."],
                ["Transaction safety", "Review ownership documents, dues, transfer terms and lender valuation before committing funds."],
              ].map(([heading, text]) => (
                <div key={heading} className="rounded-xl border border-border bg-card p-5">
                  <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Need a shortlist?</p>
            <p className="mt-2 font-display text-2xl">Compare Golf Course Extension options</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Share budget, preferred sector, configuration and whether the purchase is for end use or investment.</p>
            <div className="mt-5"><EnquiryForm interest="Golf Course Extension Road property shortlist" compact /></div>
          </aside>
        </div>
      </section>

      <section id="current-inventory" className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Current inventory</p>
            <h2 className="mt-1 font-display text-3xl">Published Golf Course Extension Road properties</h2>
          </div>
          <Link to="/properties" className="text-sm font-medium text-gold underline-offset-4 hover:underline">View all properties</Link>
        </div>
        {properties.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => <ListingCard key={property.id} property={property} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Current corridor inventory is being refreshed. Project and sector guides remain available for research and enquiry.
          </div>
        )}
      </section>
    </>
  );
}
