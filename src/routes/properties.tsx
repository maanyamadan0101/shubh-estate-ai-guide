import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@/data/site";

const TYPES = ["All", "Apartment", "Builder Floor", "Villa", "Commercial"] as const;
const STATUSES = ["All", "Ready to Move", "Under Construction", "New Launch"] as const;

export const Route = createFileRoute("/properties")({
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
    ],
  }),
  component: Properties,
});

function Properties() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");

  const results = useMemo(
    () =>
      PROPERTIES.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          [p.title, p.builder, p.locality, p.sector, p.bhk].some((v) => v.toLowerCase().includes(q));
        return matchesQuery && (type === "All" || p.type === type) && (status === "All" || p.status === status);
      }),
    [query, type, status],
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
              placeholder="Search by project, builder, sector or configuration"
              className="h-11 pl-9"
            />
          </div>

          <div className="mt-5 space-y-3">
            <FilterRow label="Type" options={TYPES} active={type} onSelect={setType} />
            <FilterRow label="Possession" options={STATUSES} active={status} onSelect={setStatus} />
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          Showing {results.length} {results.length === 1 ? "property" : "properties"}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {results.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No matches yet — tell us what you're looking for and we'll source it off-market.
          </p>
        ) : null}
      </section>
    </>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: readonly T[];
  active: T;
  onSelect: (value: T) => void;
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
          {option}
        </Button>
      ))}
    </div>
  );
}
