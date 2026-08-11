import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Landmark,
  MapPin,
} from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { ListingCard } from "@/components/site/ListingCard";
import { Button } from "@/components/ui/button";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CORRIDORS = [
  { slug: "dwarka-expressway", label: "Dwarka Expressway" },
  { slug: "golf-course-extension-road", label: "Golf Course Extension Road" },
  { slug: "southern-peripheral-road", label: "Southern Peripheral Road" },
  { slug: "sohna-road", label: "Sohna Road" },
  { slug: "new-gurgaon", label: "New Gurugram" },
  { slug: "golf-course-road", label: "Golf Course Road" },
];

const PROPERTY_FAQS = [
  {
    q: "How do I shortlist flats for sale in Gurgaon without overpaying?",
    a: "Start with the usable property budget after stamp duty, registration, brokerage and financing costs. Then compare the exact unit with competing inventory, project stage, developer track record, maintenance, access, rental depth and recent asking-price evidence before making an offer.",
  },
  {
    q: "Do you cover resale, ready-to-move and under-construction apartments?",
    a: "Yes. The published catalogue can include resale, ready-to-move and under-construction homes. Availability changes, so confirm the unit, price, possession position and documents before planning a visit or paying a token amount.",
  },
  {
    q: "Can an NRI buy a Gurgaon property remotely?",
    a: "Shortlisting, live video walkthroughs, price comparison, home-loan coordination and much of the transaction follow-up can be handled remotely. Legal, tax, foreign-exchange and power-of-attorney questions should be confirmed with qualified professionals for the specific transaction.",
  },
  {
    q: "Is home-loan assistance available for Gurgaon properties?",
    a: "We can coordinate eligibility, lender valuation, documentation and bank follow-up. The final loan amount, rate and sanction depend on the applicant, lender policy and property-document approval.",
  },
];

const PAGE_SIZE = 12;

type BudgetFilter = "all" | "under-1cr" | "1-2cr" | "2-4cr" | "4cr-plus";
type SortOption = "recommended" | "price-low" | "price-high" | "area-high";
type PropertySearch = {
  q?: string;
  purpose?: "sale" | "rent";
  status?: "ready_to_move" | "under_construction" | "new_launch";
};

function matchesBudget(price: number, budget: BudgetFilter) {
  if (budget === "under-1cr") return price < 10_000_000;
  if (budget === "1-2cr") return price >= 10_000_000 && price < 20_000_000;
  if (budget === "2-4cr") return price >= 20_000_000 && price < 40_000_000;
  if (budget === "4cr-plus") return price >= 40_000_000;
  return true;
}

function absoluteImageUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `${SITE_ORIGIN}${value.startsWith("/") ? value : `/${value}`}`;
}

export const Route = createFileRoute("/properties")({
  validateSearch: (search: Record<string, unknown>): PropertySearch => {
    const result: PropertySearch = {};
    if (typeof search["q"] === "string") result.q = search["q"].slice(0, 100);
    if (search["purpose"] === "sale" || search["purpose"] === "rent") {
      result.purpose = search["purpose"];
    }
    if (
      search["status"] === "ready_to_move" ||
      search["status"] === "under_construction" ||
      search["status"] === "new_launch"
    ) {
      result.status = search["status"];
    }
    return result;
  },
  loader: async () => listPublicProperties({ data: { limit: 60 } }),
  head: ({ loaderData }) => {
    const properties = loaderData?.properties ?? [];
    return {
      meta: [
        { title: "Flats & Apartments for Sale in Gurgaon | Shubh Estate Brokers" },
        {
          name: "description",
          content:
            "Browse flats and apartments for sale in Gurgaon (Gurugram), including current resale and residential property listings across Golf Course Road, Golf Course Extension Road, Dwarka Expressway, SPR and New Gurugram.",
        },
        {
          property: "og:title",
          content: "Flats & Apartments for Sale in Gurgaon | Shubh Estate Brokers",
        },
        {
          property: "og:description",
          content:
            "Current flats, apartments and residential properties for sale in Gurugram with NRI, financing and transaction support.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_ORIGIN}/properties` },
      ],
      links: [{ rel: "canonical", href: `${SITE_ORIGIN}/properties` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Current Gurgaon properties",
            numberOfItems: properties.length,
            itemListElement: properties.map((property, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: property.title,
              url: `${SITE_ORIGIN}/property/${property.slug}`,
              ...(property.cover_image_url
                ? { image: absoluteImageUrl(property.cover_image_url) }
                : {}),
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PROPERTY_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        },
      ],
    };
  },
  component: Properties,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Properties could not be loaded</h1>
      <p className="mt-2 text-muted-foreground">Please refresh the page in a moment.</p>
    </div>
  ),
});

function Properties() {
  const search = Route.useSearch();
  const { properties, error } = Route.useLoaderData() as {
    properties: ListingRow[];
    error: string | null;
  };

  const [query, setQuery] = useState(search.q ?? "");
  const [purpose, setPurpose] = useState(search.purpose ?? "all");
  const [bhk, setBhk] = useState("all");
  const [status, setStatus] = useState(search.status ?? "all");
  const [budget, setBudget] = useState<BudgetFilter>("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [page, setPage] = useState(1);

  const bhkOptions = useMemo(
    () =>
      [...new Set(properties.map((property) => property.bhk).filter(Boolean) as string[])].sort(
        (a, b) => Number.parseFloat(a) - Number.parseFloat(b),
      ),
    [properties],
  );

  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-IN");
    const rows = properties.filter((property) => {
      const searchable = [
        property.title,
        property.sector,
        property.locality,
        property.city,
        property.bhk,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("en-IN");

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (purpose === "all" || property.listing_type === purpose) &&
        (bhk === "all" || property.bhk === bhk) &&
        (status === "all" || property.status === status) &&
        matchesBudget(property.price, budget)
      );
    });

    if (sort === "price-low") return [...rows].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...rows].sort((a, b) => b.price - a.price);
    if (sort === "area-high")
      return [...rows].sort((a, b) => (b.area_sqft ?? 0) - (a.area_sqft ?? 0));
    return rows;
  }, [properties, query, purpose, bhk, status, budget, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleProperties = filteredProperties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const hasActiveFilters =
    query !== "" ||
    purpose !== "all" ||
    bhk !== "all" ||
    status !== "all" ||
    budget !== "all" ||
    sort !== "recommended";

  function clearFilters() {
    setQuery("");
    setPurpose("all");
    setBhk("all");
    setStatus("all");
    setBudget("all");
    setSort("recommended");
    setPage(1);
  }

  return (
    <>
      <PageHero
        eyebrow="Current Listings"
        title="Flats and apartments for sale in Gurgaon"
        body="Browse current resale flats, apartments and other residential properties published by Shubh Estate Brokers, with unit details, project context and buyer support for end-users, investors and NRI clients."
      />

      <section className="container-page pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  Browse by corridor
                </p>
                <h2 className="mt-1 font-display text-2xl">Explore Gurugram micro-markets</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CORRIDORS.map((corridor) => (
                    <Link
                      key={corridor.slug}
                      to="/locations/$slug"
                      params={{ slug: corridor.slug }}
                      className="rounded-full border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:border-gold hover:text-gold"
                    >
                      {corridor.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
            <div className="flex items-start gap-3">
              <Landmark className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  Financing Support
                </p>
                <h2 className="mt-1 font-display text-2xl">Home loan assistance for eligible buyers</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Review eligibility, property valuation, documentation and lender coordination. Final
                  sanction and loan-to-value depend on the applicant, lender and property verification.
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                  <Link to="/home-loans" className="text-gold underline-offset-4 hover:underline">
                    View home-loan details
                  </Link>
                  <Link to="/emi-calculator" className="text-gold underline-offset-4 hover:underline">
                    Calculate EMI
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="container-page py-14">
        {error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="font-medium">Published properties could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please refresh the page. The server has recorded the underlying data error for
              diagnosis.
            </p>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  Property Catalogue
                </p>
                <h2 className="mt-1 font-display text-2xl md:text-3xl">Available properties</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Only properties currently published by our team are shown here. Open a listing for
                  specifications, project context, NRI assistance, home-loan support and enquiry
                  options.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? "matching property" : "matching properties"}
              </p>
            </div>



            {visibleProperties.length ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visibleProperties.map((property) => (
                    <ListingCard key={property.id} property={property} />
                  ))}
                </div>

                {totalPages > 1 ? (
                  <nav
                    aria-label="Property catalogue pages"
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setPage((value) => Math.max(1, value - 1))}
                    >
                      <ChevronLeft aria-hidden="true" />
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                      (pageNumber) => (
                        <Button
                          key={pageNumber}
                          type="button"
                          variant={pageNumber === currentPage ? "gold" : "outline"}
                          size="icon"
                          aria-label={`Show property page ${pageNumber}`}
                          aria-current={pageNumber === currentPage ? "page" : undefined}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      ),
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                    >
                      Next
                      <ChevronRight aria-hidden="true" />
                    </Button>
                  </nav>
                ) : null}
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <h3 className="font-display text-2xl">No properties match these filters</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                  Try a wider budget, another configuration or a different project or sector.
                </p>
                <Button type="button" variant="goldOutline" className="mt-5" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <h2 className="font-display text-2xl">No published properties are visible yet</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Once a property is published from the Shubh Estate Brokers admin dashboard, it will
              appear here automatically.
            </p>
          </div>
        )}
      </section>

      <section className="border-t border-border bg-secondary/50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Gurgaon Buyer Guide
            </p>
            <h2 className="mt-2 font-display text-3xl">Compare the unit, not only the brochure</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Gurgaon property prices can vary materially within the same sector and even within
                the same project. Floor, view, tower, possession stage, condition, parking,
                furnishings and seller urgency can all affect a sensible buying price.
              </p>
              <p>
                Shubh Estate Brokers helps buyers compare the shortlisted property with available
                alternatives, evaluate financing and document requirements, and understand both the
                strengths and the disadvantages before committing capital.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link to="/property-buying-advisory-gurgaon" className="text-gold hover:underline">
                View the buyer advisory process
              </Link>
              <Link to="/luxury" className="text-gold hover:underline">
                Explore luxury property in Gurgaon
              </Link>
              <Link to="/home-loans" className="text-gold hover:underline">
                Check home-loan assistance
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-4 w-full">
              {PROPERTY_FAQS.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
