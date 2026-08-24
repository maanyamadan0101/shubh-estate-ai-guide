import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProjectHubs } from "@/lib/project-hub.functions";
import { formatArea, formatINR, SITE_ORIGIN, STATUS_LABEL } from "@/lib/seo";

const DEDICATED_PROJECT_PAGES: Record<string, string> = {
  "ansal-highland-park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansals-highland-park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansal-highland-park-sector-103": "/projects/ansals-highland-park-sector-103-gurgaon",
  "dlf-skycourt": "/dlf-skycourt-sector-86-gurgaon",
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101": "/godrej-101-sector-79-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
};

const FEATURED_RESEARCH_GUIDES = [
  {
    name: "Ansals Highland Park",
    href: "/projects/ansals-highland-park-sector-103-gurgaon",
    sector: "Sector 103, Dwarka Expressway",
    configuration: "2, 3 & large-format homes",
    sizes: "1,361-2,670 sq ft",
    price: "99acres snapshot from ₹1.04 Cr",
  },
] as const;

function projectHref(slug: string) {
  return DEDICATED_PROJECT_PAGES[slug] ?? `/projects/${slug}`;
}

function askingPrice(listings: Array<{ price: number | null; display_price: string | null }>) {
  const numeric = listings
    .map((listing) => listing.price)
    .filter((value): value is number => Boolean(value && value > 0));
  if (numeric.length) {
    const min = Math.min(...numeric);
    const max = Math.max(...numeric);
    return min === max ? formatINR(min) : `${formatINR(min)} – ${formatINR(max)}`;
  }
  const stated = [...new Set(listings.map((listing) => listing.display_price).filter(Boolean))];
  return stated.length === 1 ? stated[0]! : "View current asking prices";
}

export const Route = createFileRoute("/projects/")({
  loader: () => listPublicProjectHubs(),
  head: ({ loaderData }) => {
    const canonical = `${SITE_ORIGIN}/projects`;
    const count = (loaderData?.length ?? 0) + FEATURED_RESEARCH_GUIDES.length;
    const title = "Gurgaon Project Guides | Current Property Inventory";
    const description = `Explore ${count || "current"} Gurgaon residential project guides with Shubh Estate Brokers inventory, asking prices, unit sizes, buyer checks and project-level comparisons.`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Gurgaon Project Guides",
      url: canonical,
      description,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: count,
        itemListElement: [
          ...FEATURED_RESEARCH_GUIDES.map((guide) => ({
            name: guide.name,
            url: `${SITE_ORIGIN}${guide.href}`,
          })),
          ...(loaderData ?? []).map((hub) => ({
            name: hub.name,
            url: `${SITE_ORIGIN}${projectHref(hub.slug)}`,
          })),
        ].slice(0, 50).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: item.url,
        })),
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
  component: ProjectDirectoryPage,
});

function ProjectDirectoryPage() {
  const hubs = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Projects</span>
          </nav>
          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Gurgaon Project Intelligence</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Gurgaon Project Guides & Current Property Inventory</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              Browse project-level guides built around actual published inventory. Each guide connects the society or development with current unit options, asking-price context, size ranges, location information and practical buyer checks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href="#project-guides">Browse Project Guides</a></Button>
              <Button asChild variant="goldOutline"><Link to="/properties">View All Listings</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="project-guides" className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Project directory</p>
            <h2 className="mt-2 font-display text-3xl">Projects represented in our published catalogue</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {hubs.length + FEATURED_RESEARCH_GUIDES.length} project guide
            {hubs.length + FEATURED_RESEARCH_GUIDES.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          {FEATURED_RESEARCH_GUIDES.map((guide) => (
            <article
              key={guide.href}
              className="grid gap-6 overflow-hidden rounded-2xl border border-gold/30 bg-card p-6 md:grid-cols-[minmax(0,1fr)_17rem] md:p-8"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="border-gold/30 bg-gold/10 text-gold hover:bg-gold/10">
                    Featured value guide
                  </Badge>
                  <Badge variant="secondary" className="font-normal">
                    Price evidence reviewed
                  </Badge>
                </div>
                <h3 className="mt-4 font-display text-3xl leading-snug">{guide.name}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-gold" aria-hidden="true" />
                  {guide.sector}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  A dedicated buyer guide covering every brochure layout, current 99acres asking-price
                  snapshots, nearby Adani, Emaar, Godrej and Tata comparison, Haryana RERA checks and
                  careful home-loan guidance.
                </p>
              </div>
              <div className="flex flex-col rounded-xl border border-border bg-muted/25 p-5">
                <dl className="grid gap-3 text-sm">
                  <div className="border-b border-border pb-3">
                    <dt className="text-muted-foreground">Configuration</dt>
                    <dd className="mt-1 font-medium">{guide.configuration}</dd>
                  </div>
                  <div className="border-b border-border pb-3">
                    <dt className="text-muted-foreground">Published sizes</dt>
                    <dd className="mt-1 font-medium">{guide.sizes}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Asking-price context</dt>
                    <dd className="mt-1 font-medium text-gold">{guide.price}</dd>
                  </div>
                </dl>
                <Button asChild variant="gold" className="mt-5 w-full">
                  <Link to="/projects/ansals-highland-park-sector-103-gurgaon">
                    Open Ansals Highland Park guide
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {hubs.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hubs.map((hub) => {
              const configurations = [...new Set(hub.listings.map((item) => item.bhk).filter(Boolean))];
              const areas = hub.listings
                .map((item) => item.area_sqft)
                .filter((value): value is number => Boolean(value && value > 0));
              const statuses = [...new Set(hub.listings.map((item) => item.status).filter(Boolean))];
              const areaText = areas.length
                ? Math.min(...areas) === Math.max(...areas)
                  ? formatArea(Math.min(...areas))
                  : `${formatArea(Math.min(...areas))} – ${formatArea(Math.max(...areas))}`
                : "Unit-specific";

              return (
                <article key={hub.slug} className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <div className="flex flex-wrap gap-2">
                    {statuses.slice(0, 2).map((status) => (
                      <Badge key={status} variant="secondary" className="font-normal">
                        {STATUS_LABEL[status!] ?? status}
                      </Badge>
                    ))}
                    <Badge variant="secondary" className="font-normal">{hub.listings.length} current option{hub.listings.length === 1 ? "" : "s"}</Badge>
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-snug">{hub.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-gold" aria-hidden="true" />
                    {[hub.sector, hub.locality, hub.city].filter(Boolean).join(", ")}
                  </p>

                  <dl className="mt-5 grid gap-3 text-sm">
                    <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
                      <dt className="text-muted-foreground">Configuration</dt>
                      <dd className="text-right font-medium">{configurations.slice(0, 3).join(", ") || "See listings"}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
                      <dt className="text-muted-foreground">Published sizes</dt>
                      <dd className="text-right font-medium">{areaText}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
                      <dt className="text-muted-foreground">Asking-price context</dt>
                      <dd className="text-right font-medium">{askingPrice(hub.listings)}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6">
                    <Button asChild variant="goldOutline" className="w-full"><a href={projectHref(hub.slug)}>Open {hub.name} guide</a></Button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center">
            <Building2 className="mx-auto size-8 text-gold" aria-hidden="true" />
            <p className="mt-3 font-display text-xl">Project guides are being refreshed</p>
            <p className="mt-2 text-sm text-muted-foreground">Browse the live property catalogue while project inventory is loading.</p>
            <Button asChild variant="goldOutline" className="mt-5"><Link to="/properties">Browse Properties</Link></Button>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Why project hubs matter</p>
            <h2 className="mt-2 font-display text-3xl">Compare the project and the exact unit together</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Current inventory", "See the actual units presently published instead of relying only on project-wide brochure claims."],
                ["Unit-level comparison", "Compare floor, facing, area, condition and asking price before shortlisting."],
                ["Buyer due diligence", "Use project and property checks together for documents, valuation, transfer and financing."],
                ["Better discovery", "Move naturally between project, sector, corridor and individual property pages."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5">
                  <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Need a shortlist?</p>
            <p className="mt-2 font-display text-2xl">Tell us your requirement</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Share budget, preferred sector, configuration and whether the purchase is for end use or investment.</p>
            <div className="mt-5"><EnquiryForm interest="Gurgaon project shortlist" compact /></div>
          </aside>
        </div>
      </section>
    </>
  );
}
