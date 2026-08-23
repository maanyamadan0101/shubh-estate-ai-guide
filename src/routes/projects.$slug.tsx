import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Building2, CheckCircle2, MapPin, Ruler, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { getPublicProjectHub } from "@/lib/project-hub.functions";
import { corridorPath } from "@/lib/project-hubs";
import { formatArea, formatINR, SITE_ORIGIN, STATUS_LABEL } from "@/lib/seo";

const PROJECT_REDIRECTS: Record<string, string> = {
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
};

function priceRange(values: Array<number | null>) {
  const prices = values.filter((value): value is number => Boolean(value && value > 0));
  if (!prices.length) return "See current asking prices";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatINR(min) : `${formatINR(min)} – ${formatINR(max)}`;
}

function compactDescription(value: string, max = 158) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : cut.length).trim()}…`;
}

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const redirected = PROJECT_REDIRECTS[params.slug];
    if (redirected) throw redirect({ href: redirected, statusCode: 301 });

    const hub = await getPublicProjectHub({ data: { slug: params.slug } });
    if (!hub) throw notFound();
    return hub;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }] };
    }

    const location = [loaderData.sector, "Gurgaon"].filter(Boolean).join(" ");
    const canonical = `${SITE_ORIGIN}/projects/${loaderData.slug}`;
    const numericPrices = loaderData.listings.map((listing) => listing.price);
    const description = compactDescription(
      `Explore ${loaderData.name}${loaderData.sector ? ` in ${loaderData.sector}, Gurgaon` : " in Gurgaon"}. Compare ${loaderData.listings.length} current Shubh Estate Brokers listing${loaderData.listings.length === 1 ? "" : "s"}, asking prices, sizes, possession status, location context and buyer checks.`,
    );
    const title = `${loaderData.name} ${location} | Current Listings & Buyer Guide`.slice(0, 68);
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${loaderData.name} current property listings`,
      numberOfItems: loaderData.listings.length,
      itemListElement: loaderData.listings.slice(0, 20).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: listing.href.startsWith("http") ? listing.href : `${SITE_ORIGIN}${listing.href}`,
      })),
    };
    const projectSchema = {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "@id": `${canonical}#project`,
      name: loaderData.name,
      url: canonical,
      description: loaderData.description || description,
      address: {
        "@type": "PostalAddress",
        streetAddress: [loaderData.sector, loaderData.locality].filter(Boolean).join(", "),
        addressLocality: loaderData.city || "Gurugram",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      ...(loaderData.builder_name ? { brand: loaderData.builder_name } : {}),
      ...(loaderData.rera_number ? { identifier: loaderData.rera_number } : {}),
      ...(numericPrices.some((value) => Boolean(value && value > 0))
        ? {
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: Math.min(
                ...numericPrices.filter((value): value is number => Boolean(value && value > 0)),
              ),
              highPrice: Math.max(
                ...numericPrices.filter((value): value is number => Boolean(value && value > 0)),
              ),
              offerCount: loaderData.listings.length,
            },
          }
        : {}),
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
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(projectSchema) },
        { type: "application/ld+json", children: JSON.stringify(itemList) },
      ],
    };
  },
  component: ProjectHubPage,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Project guide not found</h1>
      <p className="mt-2 text-muted-foreground">Browse current Gurgaon projects and properties.</p>
      <Button asChild variant="gold" className="mt-6">
        <Link to="/projects">View project guides</Link>
      </Button>
    </div>
  ),
});

function ProjectHubPage() {
  const hub = Route.useLoaderData();
  const numericPrices = hub.listings.map((listing) => listing.price);
  const areas = hub.listings
    .map((listing) => listing.area_sqft)
    .filter((value): value is number => Boolean(value && value > 0));
  const configurations = [...new Set(hub.listings.map((listing) => listing.bhk).filter(Boolean))];
  const statuses = [...new Set(hub.listings.map((listing) => listing.status).filter(Boolean))];
  const corridor = corridorPath(hub.locality);
  const areaText = areas.length
    ? Math.min(...areas) === Math.max(...areas)
      ? formatArea(Math.min(...areas))
      : `${formatArea(Math.min(...areas))} – ${formatArea(Math.max(...areas))}`
    : "Confirm exact unit area";
  const updated = hub.updated_at
    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
        new Date(hub.updated_at),
      )
    : "Current inventory";

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/projects" className="hover:text-foreground">Projects</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">{hub.name}</span>
          </nav>
          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Gurgaon Project & Inventory Guide</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              {hub.name}{hub.sector ? `, ${hub.sector} Gurgaon` : " Gurgaon"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              Compare the project with the actual units currently published by Shubh Estate Brokers. Asking prices, floor, facing, area and availability are unit-specific and should be reconfirmed before a visit or token payment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href="#current-listings">View Current Listings</a></Button>
              <Button asChild variant="goldOutline"><a href="#buyer-checks">Buyer Checks</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Current inventory", `${hub.listings.length} listing${hub.listings.length === 1 ? "" : "s"}`],
            ["Asking-price context", priceRange(numericPrices)],
            ["Published size range", areaText],
            ["Inventory updated", updated],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-border px-5 py-5 sm:border-b-0 sm:border-r last:border-r-0">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-xl">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur" aria-label="Project sections">
        <div className="container-page flex gap-5 overflow-x-auto py-3 text-sm">
          <a href="#overview" className="whitespace-nowrap hover:text-gold">Overview</a>
          <a href="#current-listings" className="whitespace-nowrap hover:text-gold">Current listings</a>
          <a href="#price-size" className="whitespace-nowrap hover:text-gold">Price & sizes</a>
          <a href="#buyer-checks" className="whitespace-nowrap hover:text-gold">Buyer checks</a>
          <a href="#location" className="whitespace-nowrap hover:text-gold">Location</a>
          <a href="#faq" className="whitespace-nowrap hover:text-gold">FAQ</a>
        </div>
      </nav>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <main className="space-y-12">
          <section id="overview" className="scroll-mt-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Project overview</p>
            <h2 className="mt-2 font-display text-3xl">What buyers should know about {hub.name}</h2>
            {hub.description ? (
              <p className="mt-4 leading-7 text-muted-foreground">{hub.description}</p>
            ) : (
              <p className="mt-4 leading-7 text-muted-foreground">
                This page is built around currently published Shubh Estate Brokers inventory rather than a copied brochure. Use it to compare available configurations, asking prices, sizes, possession status and unit-level differences before shortlisting a property.
              </p>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoCard icon={Building2} label="Configurations" value={configurations.join(", ") || "See inventory"} />
              <InfoCard icon={ShieldCheck} label="Possession mix" value={statuses.map((status) => STATUS_LABEL[status!] ?? status).join(", ") || "Confirm per unit"} />
              <InfoCard icon={MapPin} label="Micro-market" value={[hub.sector, hub.locality].filter(Boolean).join(" · ") || "Gurgaon"} />
            </div>
            {hub.builder_name || hub.rera_number ? (
              <div className="mt-6 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
                {hub.builder_name ? <p><strong className="text-foreground">Developer:</strong> {hub.builder_name}</p> : null}
                {hub.rera_number ? <p className="mt-1"><strong className="text-foreground">RERA reference:</strong> {hub.rera_number}</p> : null}
              </div>
            ) : null}
          </section>

          <section id="current-listings" className="scroll-mt-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Live inventory</p>
            <h2 className="mt-2 font-display text-3xl">Current properties available in {hub.name}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              These are the units currently represented in our published catalogue. Multiple apartments in the same project remain separate because floor, facing, view, condition, ownership and asking price can materially change the decision.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {hub.listings.map((listing) => (
                <article key={listing.id} className="overflow-hidden rounded-xl border border-border bg-card">
                  {listing.cover_image_url ? (
                    <img src={listing.cover_image_url} alt={listing.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  ) : null}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {listing.status ? <Badge variant="secondary">{STATUS_LABEL[listing.status] ?? listing.status}</Badge> : null}
                      <Badge variant="secondary">{listing.listing_type === "rent" ? "For Rent" : "For Sale"}</Badge>
                    </div>
                    <h3 className="mt-3 font-display text-xl leading-snug">{listing.title}</h3>
                    <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      {listing.bhk ? <p><strong className="text-foreground">Config:</strong> {listing.bhk}</p> : null}
                      {listing.area_sqft ? <p><strong className="text-foreground">Area:</strong> {formatArea(listing.area_sqft)}</p> : null}
                      {listing.floor ? <p><strong className="text-foreground">Floor:</strong> {listing.floor}</p> : null}
                      {listing.facing ? <p><strong className="text-foreground">Facing:</strong> {listing.facing}</p> : null}
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                      <p className="font-display text-xl">{listing.display_price || formatINR(listing.price)}</p>
                      <Button asChild size="sm" variant="goldOutline"><a href={listing.href}>View details</a></Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="price-size" className="scroll-mt-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Price & size context</p>
            <h2 className="mt-2 font-display text-3xl">Compare the exact unit, not only the project name</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The published inventory currently spans {areaText} with asking-price context of {priceRange(numericPrices)}. This is not a project-wide valuation. A fair comparison should adjust for tower, floor, facing, view, condition, parking, furnishing, dues, transfer terms and the seller's timeline.
            </p>
          </section>

          <section id="buyer-checks" className="scroll-mt-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Resale & purchase checks</p>
            <h2 className="mt-2 font-display text-3xl">Checks before committing funds</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Match the exact tower, floor, facing, view and sanctioned layout.",
                "Compare the asking price with competing inventory and available transaction evidence.",
                "Confirm ownership documents, dues, transfer conditions and applicable project approvals.",
                "Review parking rights, maintenance position and any fit-out or renovation cost.",
                "Check lender valuation and property acceptance before relying on a high loan percentage.",
                "For under-construction inventory, verify current RERA disclosures, payment milestones and possession assumptions.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="location" className="scroll-mt-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Location context</p>
            <h2 className="mt-2 font-display text-3xl">{hub.sector ? `${hub.sector}, Gurgaon` : "Gurgaon"}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Evaluate the actual approach roads, commute pattern, occupied surroundings, schools, healthcare and daily-use conveniences relevant to your household. Travel-time claims can vary materially by time of day and route.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="goldOutline"><Link to={corridor as "/locations/gurgaon"}>Explore corridor guide</Link></Button>
              <Button asChild variant="goldOutline"><Link to="/properties">Browse all properties</Link></Button>
            </div>
          </section>

          <section id="faq" className="scroll-mt-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">FAQ</p>
            <h2 className="mt-2 font-display text-3xl">Questions about {hub.name}</h2>
            <div className="mt-6 space-y-4">
              <Faq q={`How many ${hub.name} properties are currently published here?`} a={`This project hub currently shows ${hub.listings.length} published listing${hub.listings.length === 1 ? "" : "s"}. Availability can change, so confirm the exact unit before planning a visit.`} />
              <Faq q={`What is the current asking-price range in ${hub.name}?`} a={`The currently published inventory shows ${priceRange(numericPrices)}. Treat this as asking-price context, not a guaranteed transaction value or project-wide valuation.`} />
              <Faq q={`Can Shubh Estate Brokers compare different units in ${hub.name}?`} a="Yes. We compare unit-level factors such as tower, floor, facing, view, condition, parking, price, documentation and financing rather than assuming every apartment in the project is equivalent." />
              <Faq q="Can a home loan be coordinated for these listings?" a="Home-loan assistance can be coordinated for eligible buyers and qualifying properties. Final eligibility, valuation, documentation acceptance and sanction remain subject to the lending institution's policy." />
            </div>
          </section>
        </main>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Ask about {hub.name}</p>
            <p className="mt-2 font-display text-2xl">Request current options</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Share your budget, preferred configuration and whether the purchase is for end use or investment.</p>
            <div className="mt-5"><EnquiryForm interest={`${hub.name} current listings`} compact /></div>
            <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
              Buying remotely? <Link to="/nri" className="font-medium text-gold hover:underline">See NRI property assistance</Link>.
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="size-5 text-gold" aria-hidden="true" />
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg">{value}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-xl border border-border bg-card p-5">
      <summary className="cursor-pointer font-medium">{q}</summary>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{a}</p>
    </details>
  );
}
