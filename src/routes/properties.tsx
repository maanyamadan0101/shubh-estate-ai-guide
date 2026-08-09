import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { ListingCard } from "@/components/site/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { PROPERTY_TYPE_LABEL, SITE_ORIGIN, STATUS_LABEL } from "@/lib/seo";

const TYPES = ["All", "apartment", "builder_floor", "villa", "plot", "commercial", "office", "retail"] as const;
const STATUSES = ["All", "ready_to_move", "under_construction", "new_launch"] as const;

export const Route = createFileRoute("/properties")({
  loader: async () => listPublicProperties({ data: { limit: 60 } }),
  head: () => ({
    meta: [
      { title: "Flats, Villas & Commercial Property in Gurgaon | Shubh Estate" },
      {
        name: "description",
        content:
          "Browse RERA-approved apartments, builder floors, villas and commercial property across Golf Course Road, Dwarka Expressway, SPR and New Gurgaon.",
      },
      { property: "og:title", content: "Property Listings in Gurgaon | Shubh Estate Brokers" },
      {
        property: "og:description",
        content: "Curated Gurugram inventory with price, configuration, possession status and loan availability.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/properties` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/properties` }],
  }),
  component: Properties,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Listings didn't load</h1>
      <p className="mt-2 text-muted-foreground">Please refresh in a moment.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Page not found</h1>
    </div>
  ),
});

function Properties() {
  const { properties, error } = Route.useLoaderData() as { properties: ListingRow[]; error: string | null };
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");

  const results = useMemo(
    () =>
      properties.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          [p.title, p.locality, p.sector, p.bhk, p.city].some((v) => (v ?? "").toLowerCase().includes(q));
        return matchesQuery && (type === "All" || p.property_type === type) && (status === "All" || p.status === status);
      }),
    [properties, query, type, status],
  );

  return (
    <>
      <PageHero
        eyebrow="Property Search"
        title="Property in Gurgaon, filtered the way advisors do it"
        body="Every listing is verified for title, approvals and loan eligibility before it reaches this page."
      />

      <section className="container-page py-12">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label className="sr-only" htmlFor="prop-search">
              Search properties
            </label>
            <Input
              id="prop-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, sector, locality or configuration"
              className="h-11 pl-9"
            />
          </div>

          <div className="mt-5 space-y-3">
            <FilterRow
              label="Type"
              options={TYPES}
              active={type}
              onSelect={setType}
              labelOf={(v) => (v === "All" ? "All" : (PROPERTY_TYPE_LABEL[v] ?? v))}
            />
            <FilterRow
              label="Possession"
              options={STATUSES}
              active={status}
              onSelect={setStatus}
              labelOf={(v) => (v === "All" ? "All" : (STATUS_LABEL[v] ?? v))}
            />
          </div>
        </div>

        {error ? (
          <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="font-medium">Property listings could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">Please refresh the page. If this continues, the website administrator can now see the actual server error in deployment logs.</p>
          </div>
        ) : (
          <>
            <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
              Showing {results.length} {results.length === 1 ? "property" : "properties"}
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((property) => (
                <ListingCard key={property.id} property={property} />
              ))}
            </div>

            {results.length === 0 ? (
              <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No published properties are available right now. If you just published a listing, return to Admin → Property Catalogue and confirm its status shows “Published”.
              </p>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  active,
  onSelect,
  labelOf,
}: {
  label: string;
  options: readonly T[];
  active: T;
  onSelect: (value: T) => void;
  labelOf: (value: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-24 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          size="sm"
          variant={active === option ? "gold" : "outline"}
          onClick={() => onSelect(option)}
        >
          {labelOf(option)}
        </Button>
      ))}
    </div>
  );
}
