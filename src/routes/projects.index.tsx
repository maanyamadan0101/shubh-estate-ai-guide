import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { GurgaonProjectDirectory } from "@/components/site/GurgaonProjectDirectory";
import { Button } from "@/components/ui/button";
import { GURGAON_PROJECT_COUNT } from "@/data/gurgaon-project-directory";
import { listPublicProjectHubs } from "@/lib/project-hub.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const DEDICATED_PROJECT_PAGES: Record<string, string> = {
  "dlf-the-arbour": "/projects/dlf-the-arbour-sector-63-gurgaon",
  "dlf-the-arbour-sector-63": "/projects/dlf-the-arbour-sector-63-gurgaon",
  "dlf-the-primus": "/projects/dlf-the-primus-sector-82a-gurgaon",
  "dlf-the-primus-sector-82a": "/projects/dlf-the-primus-sector-82a-gurgaon",
  "m3m-golf-hills": "/projects/m3m-golf-hills-sector-79-gurgaon",
  "m3m-golf-hills-sector-79": "/projects/m3m-golf-hills-sector-79-gurgaon",
  "aipl-riviera": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "aipl-riviera-sector-103": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "riviera-at-aipl-lake-city": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "ansal-highland-park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansals-highland-park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansal-highland-park-sector-103": "/projects/ansals-highland-park-sector-103-gurgaon",
  "dlf-skycourt": "/dlf-skycourt-sector-86-gurgaon",
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101": "/godrej-101-sector-79-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
  "emaar-emerald-hills": "/emaar-emerald-hills-sector-65-gurgaon",
  "emaar-emerald-hills-sector-65": "/emaar-emerald-hills-sector-65-gurgaon",
};

const FEATURED_RESEARCH_GUIDES = [
  { name: "Emaar Emerald Hills", href: "/emaar-emerald-hills-sector-65-gurgaon" },
  { name: "DLF The Arbour", href: "/projects/dlf-the-arbour-sector-63-gurgaon" },
  { name: "DLF The Primus", href: "/projects/dlf-the-primus-sector-82a-gurgaon" },
  { name: "M3M Golf Hills", href: "/projects/m3m-golf-hills-sector-79-gurgaon" },
  {
    name: "AIPL Riviera at AIPL LakeCity",
    href: "/projects/aipl-riviera-resale-sector-103-gurgaon",
  },
  { name: "Ansals Highland Park", href: "/projects/ansals-highland-park-sector-103-gurgaon" },
] as const;

function projectHref(slug: string) {
  return DEDICATED_PROJECT_PAGES[slug] ?? `/projects/${slug}`;
}

export const Route = createFileRoute("/projects/")({
  loader: () => listPublicProjectHubs(),
  head: ({ loaderData }) => {
    const canonical = `${SITE_ORIGIN}/projects`;
    const title = "Gurgaon Residential Projects | Shubh Estate Brokers";
    const description = `Explore ${GURGAON_PROJECT_COUNT} Gurgaon residential projects by sector, corridor, developer, budget and possession stage, with transparent price and verification context.`;
    const linkedProjects = [
      ...FEATURED_RESEARCH_GUIDES,
      ...(loaderData ?? []).map((hub) => ({
        name: hub.name,
        href: projectHref(hub.slug),
      })),
    ];
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: "Gurgaon Residential Project Directory",
          url: canonical,
          description,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: GURGAON_PROJECT_COUNT,
            itemListElement: linkedProjects.slice(0, 50).map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.name,
              url: `${SITE_ORIGIN}${project.href}`,
            })),
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            { "@type": "ListItem", position: 2, name: "Projects", item: canonical },
          ],
        },
      ],
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
        { property: "og:image", content: `${SITE_ORIGIN}/shubh-estate-logo.png` },
        {
          property: "og:image:alt",
          content: "Shubh Estate Brokers Gurgaon residential project directory",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_ORIGIN}/shubh-estate-logo.png` },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
  component: ProjectDirectoryPage,
});

function ProjectDirectoryPage() {
  const hubs = Route.useLoaderData();
  const projectUnitCounts = Object.fromEntries(hubs.map((hub) => [hub.name, hub.listings.length]));
  const projectGuideLinks: Record<string, string> = Object.fromEntries(
    FEATURED_RESEARCH_GUIDES.map((guide) => [guide.name, guide.href]),
  );
  for (const hub of hubs) projectGuideLinks[hub.name] = projectHref(hub.slug);

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Projects</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="eyebrow">Gurgaon Project Intelligence</p>
              <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                Gurgaon projects, compared with financial judgement
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
                Discover residential projects by sector, corridor, developer, budget and possession
                stage. Price, RERA, area and inventory claims stay qualified until the exact unit
                and phase are reconfirmed.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <a href="#project-directory">Explore Gurgaon Projects</a>
                </Button>
                <Button asChild variant="goldOutline">
                  <Link to="/flats-for-sale-in-gurgaon">View Current Inventory</Link>
                </Button>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:min-w-80">
              <div className="rounded-xl border border-gold/30 bg-card p-4">
                <dt className="text-xs text-muted-foreground">Projects indexed</dt>
                <dd className="mt-1 font-display text-3xl text-gold">{GURGAON_PROJECT_COUNT}</dd>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="text-xs text-muted-foreground">Live project hubs</dt>
                <dd className="mt-1 font-display text-3xl">{hubs.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="project-directory" className="container-page scroll-mt-24 py-12 md:py-16">
        <GurgaonProjectDirectory
          projectUnitCounts={projectUnitCounts}
          projectGuideLinks={projectGuideLinks}
        />
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <p className="eyebrow">Advisory-first discovery</p>
            <h2 className="mt-2 font-display text-3xl">
              Compare the project and the exact unit together
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Current inventory",
                  "Separate published resale units from broad project availability claims.",
                ],
                [
                  "Unit-level comparison",
                  "Compare floor, view, area basis, payment status and asking price before shortlisting.",
                ],
                [
                  "Buyer due diligence",
                  "Review project registration, documents, valuation, transfer terms and financing together.",
                ],
                [
                  "Transparent limitations",
                  "See what is verified, what can change and what still needs phase- or unit-level confirmation.",
                ],
              ].map(([title, body]) => (
                <article key={title} className="rounded-xl border border-border bg-card p-5">
                  <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Need a shortlist?
            </p>
            <p className="mt-2 font-display text-2xl">Discuss your requirement</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Share budget, preferred sector, configuration and whether the purchase is for end use
              or investment.
            </p>
            <div className="mt-5">
              <EnquiryForm interest="Gurgaon project shortlist" compact includeRequirements />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
