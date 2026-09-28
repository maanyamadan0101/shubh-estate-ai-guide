import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Home, Search } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { Button } from "@/components/ui/button";
import { catalogueIndexing } from "@/lib/catalogue-seo";
import {
  CATALOGUE_CORRIDORS,
  listPublicCataloguePage,
  type CatalogueCorridor,
  type ListingRow,
} from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_SIZE = 12;

const CORRIDOR_LABELS: Record<CatalogueCorridor, string> = {
  "golf-course-road-central": "Golf Course Road & Central Gurgaon",
  "golf-course-extension": "Golf Course Extension Road",
  "dwarka-expressway": "Dwarka Expressway",
  "south-gurgaon": "SPR and South Gurgaon",
  "sohna-road": "Sohna Road",
  "new-gurgaon": "New Gurgaon",
  "central-gurgaon": "Central Gurgaon",
  "gwal-pahari-luxury": "Gwal Pahari",
};

type RentalSearch = {
  q?: string;
  status?: "ready_to_move" | "under_construction" | "new_launch";
  corridor?: CatalogueCorridor;
  page?: number;
};

function normalizedPage(value: unknown) {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 && page <= 100 ? page : undefined;
}

function isCorridor(value: unknown): value is CatalogueCorridor {
  return typeof value === "string" && CATALOGUE_CORRIDORS.includes(value as CatalogueCorridor);
}

function pageHref(search: RentalSearch, page: number) {
  const params = new URLSearchParams();
  if (search.q) params.set("q", search.q);
  if (search.status) params.set("status", search.status);
  if (search.corridor) params.set("corridor", search.corridor);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/flats-for-rent-in-gurgaon${query ? `?${query}` : ""}`;
}

export const Route = createFileRoute("/flats-for-rent-in-gurgaon")({
  validateSearch: (search: Record<string, unknown>): RentalSearch => {
    const result: RentalSearch = {};
    if (typeof search["q"] === "string" && search["q"].trim()) {
      result.q = search["q"].trim().slice(0, 100);
    }
    if (
      search["status"] === "ready_to_move" ||
      search["status"] === "under_construction" ||
      search["status"] === "new_launch"
    ) {
      result.status = search["status"];
    }
    if (isCorridor(search["corridor"])) result.corridor = search["corridor"];
    const page = normalizedPage(search["page"]);
    if (page !== undefined) result.page = page;
    return result;
  },
  loaderDeps: ({ search }) => ({
    q: search.q,
    status: search.status,
    corridor: search.corridor,
    page: search.page ?? 1,
  }),
  loader: async ({ deps }) => {
    const catalogue = await listPublicCataloguePage({
      data: {
        page: deps.page,
        pageSize: PAGE_SIZE,
        q: deps.q,
        purpose: "rent",
        status: deps.status,
        corridor: deps.corridor,
      },
    });
    return { ...catalogue, appliedSearch: deps };
  },
  head: ({ loaderData }) => {
    const properties = loaderData?.properties ?? [];
    const total = loaderData?.total ?? 0;
    const page = loaderData?.page ?? 1;
    const pageSize = loaderData?.pageSize ?? PAGE_SIZE;
    const appliedSearch = loaderData?.appliedSearch;
    const hasFacet = Boolean(appliedSearch?.q || appliedSearch?.status || appliedSearch?.corridor);
    const indexing = catalogueIndexing({
      page,
      hasFacet,
      hasError: Boolean(loaderData?.error),
      itemCount: properties.length,
      basePath: "/flats-for-rent-in-gurgaon",
    });
    const noindex = indexing.noindex || total === 0;
    const title =
      page > 1 && !hasFacet
        ? `Flats for Rent in Gurgaon – Page ${page} | Shubh Estate Brokers`
        : "Flats for Rent in Gurgaon | Furnished Homes | Shubh Estate";
    const description =
      "Explore current flats for rent in Gurgaon by sector, budget, furnishing and availability. Confirm rent, maintenance, deposit, photos and viewing arrangements with Shubh Estate Brokers.";
    const canonical = indexing.canonical;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: `${SITE_ORIGIN}/shubh-estate-logo.png` },
        { property: "og:image:alt", content: "Shubh Estate Brokers Gurgaon rental advisory" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(noindex ? [{ name: "robots", content: "noindex,follow" }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${canonical}#webpage`,
            name: "Flats for Rent in Gurgaon",
            description,
            url: canonical,
            isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
            publisher: { "@id": `${SITE_ORIGIN}/#real-estate-agent` },
            mainEntity: { "@id": `${canonical}#inventory` },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${canonical}#inventory`,
            name: "Current Gurgaon rental inventory",
            numberOfItems: total,
            itemListElement: properties.map((property, index) => ({
              "@type": "ListItem",
              position: (page - 1) * pageSize + index + 1,
              name: property.title,
              url: `${SITE_ORIGIN}/property/${property.slug}`,
            })),
          }),
        },
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
                name: "Flats for Rent in Gurgaon",
                item: canonical,
              },
            ],
          }),
        },
      ],
    };
  },
  component: GurgaonRentalCatalogue,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">The Gurgaon rental catalogue could not be loaded</h1>
      <p className="mt-2 text-muted-foreground">
        Please refresh or contact the advisory team for current availability.
      </p>
    </div>
  ),
});

function GurgaonRentalCatalogue() {
  const search = Route.useSearch();
  const data = Route.useLoaderData() as {
    properties: ListingRow[];
    total: number;
    page: number;
    pageSize: number;
    error: string | null;
  };
  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <>
      <section className="surface-navy overflow-hidden">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Tenant-focused rental search · current availability</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Flats and Furnished Homes for Rent in Gurgaon
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-navy-foreground/75 md:text-lg">
            Explore published Gurgaon rental homes by sector, possession stage and current owner
            availability. Confirm the exact monthly rent, maintenance treatment, deposit,
            furnishing, photographs and viewing time before applying.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <a href="#rental-inventory">
                <Search aria-hidden="true" />
                Search rental inventory
              </a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <a href="/flats-for-sale-in-gurgaon">
                <Home aria-hidden="true" />
                Browse homes for sale
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="rental-inventory" className="container-page scroll-mt-24 py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Verified tenant path</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            Current flats for rent in Gurgaon
          </h2>
          <p className="mt-4 text-muted-foreground">
            Availability changes quickly. Published cards are a starting point; ask for a current
            confirmation before travelling or paying a token amount.
          </p>
        </div>
        <form
          action="/flats-for-rent-in-gurgaon"
          method="get"
          className="mt-7 grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-[1fr_200px_240px_auto]"
        >
          <label>
            <span className="sr-only">Search sector or configuration</span>
            <input
              type="search"
              name="q"
              defaultValue={search.q}
              placeholder="Search sector, project or BHK"
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </label>
          <label>
            <span className="sr-only">Possession status</span>
            <select
              name="status"
              defaultValue={search.status ?? ""}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All availability stages</option>
              <option value="ready_to_move">Ready to move</option>
              <option value="under_construction">Under construction</option>
              <option value="new_launch">New launch</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Gurgaon corridor</span>
            <select
              name="corridor"
              defaultValue={search.corridor ?? ""}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All Gurgaon corridors</option>
              {CATALOGUE_CORRIDORS.map((corridor) => (
                <option key={corridor} value={corridor}>
                  {CORRIDOR_LABELS[corridor]}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" variant="gold" size="lg">
            <Search aria-hidden="true" />
            Search
          </Button>
        </form>

        {data.error ? (
          <div className="mt-7 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="font-medium">Published rental properties could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please refresh or contact the advisory team directly.
            </p>
          </div>
        ) : data.properties.length ? (
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.properties.map((property) => (
                <ListingCard key={property.id} property={property} showContactActions />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav
                aria-label="Current Gurgaon rental pages"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                {data.page > 1 ? (
                  <a
                    href={pageHref(search, data.page - 1)}
                    className="rounded-md border border-input px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Previous
                  </a>
                ) : null}
                <span className="px-3 text-sm text-muted-foreground">
                  Page {data.page} of {totalPages}
                </span>
                {data.page < totalPages ? (
                  <a
                    href={pageHref(search, data.page + 1)}
                    className="rounded-md border border-input px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Next
                  </a>
                ) : null}
              </nav>
            ) : null}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
            <h3 className="font-display text-2xl">No current rental listing matches this search</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Ask for a tenant shortlist with your budget, sector, furnishing and move-in date. Do
              not rely on stale portal availability.
            </p>
            <Button asChild variant="goldOutline" className="mt-5">
              <a href="/contact?interest=Gurgaon%20rental%20shortlist">
                Request a rental shortlist
              </a>
            </Button>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-secondary/50 py-14">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            [
              "Rent and maintenance",
              "Confirm the monthly rent, maintenance responsibility, deposit, brokerage and utility treatment in writing.",
            ],
            [
              "Furnishing and condition",
              "Match the published description with the actual inventory, appliances, repairs and handover condition.",
            ],
            [
              "Viewing and documents",
              "Check the owner or authorised representative, society rules, notice terms and move-in timeline before paying.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
        <div className="container-page mt-8 flex flex-wrap items-center gap-4 text-sm">
          <span className="font-medium">Are you an owner?</span>
          <a
            href="/rent-out-property-in-gurgaon"
            className="inline-flex items-center gap-2 font-semibold text-gold hover:underline"
          >
            Rent out your Gurgaon property <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
