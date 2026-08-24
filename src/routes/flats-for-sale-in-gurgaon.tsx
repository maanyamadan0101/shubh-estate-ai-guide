import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Globe2,
  Home,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { GurgaonProjectDirectory } from "@/components/site/GurgaonProjectDirectory";
import { ListingCard } from "@/components/site/ListingCard";
import {
  GURGAON_DIRECTORY_PROJECTS,
  GURGAON_PROJECT_COUNT,
  PROJECT_PRICE_REVIEW_DATE,
  type ProjectCorridor,
} from "@/data/gurgaon-project-directory";
import { CONTACT } from "@/data/site";
import { listPublicProjectHubs } from "@/lib/project-hub.functions";
import { listPublicCataloguePage, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";
import { trackContact } from "@/lib/analytics";

const PAGE_SIZE = 12;
const SORTED_DIRECTORY_PROJECTS = [...GURGAON_DIRECTORY_PROJECTS].sort((a, b) =>
  a.name.localeCompare(b.name, "en-IN"),
);

const CORRIDOR_SEARCH_VALUES = {
  "golf-course-road-central": "Golf Course Road & Central Luxury",
  "golf-course-extension": "Golf Course Extension Road",
  "dwarka-expressway": "Dwarka Expressway",
  "south-gurgaon": "SPR, Sohna Road & South Gurgaon",
  "sohna-road": "SPR, Sohna Road & South Gurgaon",
  "new-gurgaon": "New Gurgaon",
  "central-gurgaon": "Golf Course Road & Central Luxury",
  "gwal-pahari-luxury": "Gwal Pahari & Other Luxury Locations",
} as const satisfies Record<string, ProjectCorridor>;

type CorridorSearchValue = keyof typeof CORRIDOR_SEARCH_VALUES;

type GurgaonCatalogueSearch = {
  q?: string;
  purpose?: "sale" | "rent";
  status?: "ready_to_move" | "under_construction" | "new_launch";
  channel?: "resale" | "new-booking";
  corridor?: CorridorSearchValue;
  page?: number;
};

const CORRIDORS = [
  {
    slug: "golf-course-road-central",
    label: "Golf Course Road",
    locationSlug: "golf-course-road",
    profile: "Established luxury and ultra-luxury homes",
    fit: "HNIs, senior executives and long-horizon end users",
  },
  {
    slug: "golf-course-extension",
    label: "Golf Course Extension Road",
    locationSlug: "golf-course-extension-road",
    profile: "Premium apartments, floors and new luxury supply",
    fit: "End users comparing newer specifications and access",
  },
  {
    slug: "dwarka-expressway",
    label: "Dwarka Expressway",
    locationSlug: "dwarka-expressway",
    profile: "Broad ready, resale and construction-stage inventory",
    fit: "Delhi-linked buyers, NRIs and medium-term investors",
  },
  {
    slug: "south-gurgaon",
    label: "Southern Peripheral Road",
    locationSlug: "southern-peripheral-road",
    profile: "Premium high-rises with access to NH-48 and Extension Road",
    fit: "Families balancing commute, space and newer amenities",
  },
  {
    slug: "sohna-road",
    label: "Sohna Road",
    locationSlug: "sohna-road",
    profile: "Established family housing across a broad range of budgets",
    fit: "End users comparing occupied societies and everyday infrastructure",
  },
  {
    slug: "new-gurgaon",
    label: "New Gurgaon",
    locationSlug: "new-gurgaon",
    profile: "Value-led ready homes and large upcoming communities",
    fit: "Budget-conscious end users and price-sensitive investors",
  },
  {
    slug: "central-gurgaon",
    label: "Central Gurgaon",
    locationSlug: "gurgaon",
    profile: "Mature neighbourhoods with established resale and rental activity",
    fit: "Buyers prioritising central access and completed social infrastructure",
  },
  {
    slug: "gwal-pahari-luxury",
    label: "Gwal Pahari",
    locationSlug: "gurgaon",
    profile: "Low-density luxury options near the Aravalli landscape",
    fit: "Buyers prioritising space and lower-density surroundings",
  },
] as const;

const QUICK_PATHS = [
  {
    label: "Ready-to-move homes",
    body: "Compare occupied projects, actual condition, maintenance and completion documents.",
    icon: Home,
    href: "/flats-for-sale-in-gurgaon?status=ready_to_move",
  },
  {
    label: "New and under construction",
    body: "Review payment stage, RERA disclosures, delivery position and exit risk.",
    icon: Building2,
    href: "/under-construction-projects-gurgaon",
  },
  {
    label: "Luxury apartments",
    body: "Explore private large-format residences across established premium corridors.",
    icon: ShieldCheck,
    href: "/luxury",
  },
  {
    label: "Resale opportunities",
    body: "Compare seller expectations with competing units and project-specific liquidity.",
    icon: WalletCards,
    href: "/flats-for-sale-in-gurgaon?channel=resale",
  },
  {
    label: "Builder floors",
    body: "Shortlist floors with practical title, parking, lift and terrace-right checks.",
    icon: FileCheck2,
    href: "/flats-for-sale-in-gurgaon?q=builder%20floor",
  },
  {
    label: "Villas and independent homes",
    body: "Assess land title, sanctioned construction and total maintenance exposure.",
    icon: Home,
    href: "/flats-for-sale-in-gurgaon?q=villa",
  },
  {
    label: "NRI buying assistance",
    body: "Coordinate remote shortlisting, video visits, financing and local follow-through.",
    icon: Globe2,
    href: "/nri",
  },
  {
    label: "Home-loan assistance",
    body: "Review eligibility, valuation, cash contribution and property acceptability together.",
    icon: Landmark,
    href: "/home-loans",
  },
] as const;

const CORRIDOR_COMPARISON = [
  {
    corridor: "Golf Course Road",
    positioning: "Established premium and ultra-luxury",
    budget: "Highest entry bands; unit-specific",
    stock: "Ready resale dominates",
    rental: "Executive demand; test rent against carrying cost",
    endUser: "Strong mature-infrastructure fit",
    investor: "Resale depth matters more than launch narrative",
    connectivity: "Rapid Metro and central business access in parts",
    checks: "Entry premium, renovation and maintenance exposure",
  },
  {
    corridor: "Golf Course Extension Road",
    positioning: "Premium apartments and floors",
    budget: "Mid-premium to luxury",
    stock: "Ready plus active construction",
    rental: "Project-specific, with established pockets stronger",
    endUser: "Newer specifications and family communities",
    investor: "Compare future competing supply",
    connectivity: "Links to Golf Course Road, SPR and Sohna Road",
    checks: "Access bottlenecks and phase-specific delivery",
  },
  {
    corridor: "Dwarka Expressway",
    positioning: "Broad premium and luxury mix",
    budget: "Wide entry bands by sector and stage",
    stock: "Ready, resale and new launches",
    rental: "Growing but uneven by occupancy and sector",
    endUser: "Useful for Delhi-side access requirements",
    investor: "Entry price and resale competition are critical",
    connectivity: "Expressway-led Delhi and airport-side access",
    checks: "Tower delivery, density and escalated asking prices",
  },
  {
    corridor: "Southern Peripheral Road",
    positioning: "Newer premium family housing",
    budget: "Mid-premium to upper-premium",
    stock: "Mixed possession stages",
    rental: "Linked to occupancy and office access",
    endUser: "Balanced access to several work corridors",
    investor: "Compare construction-stage risk with ready stock",
    connectivity: "Connects Extension Road, Sohna Road and NH-48",
    checks: "Construction traffic and project approach roads",
  },
  {
    corridor: "Sohna Road",
    positioning: "Established broad-budget family market",
    budget: "Value to premium by society",
    stock: "Completed resale-led inventory",
    rental: "Established, but society quality changes demand",
    endUser: "Daily infrastructure is a relative strength",
    investor: "Maintenance and age affect exit liquidity",
    connectivity: "Road access to central and south Gurgaon",
    checks: "Building condition, parking and society management",
  },
  {
    corridor: "New Gurgaon",
    positioning: "Value-led apartments and townships",
    budget: "Lower entry bands than central luxury corridors",
    stock: "Ready and under construction",
    rental: "Uneven; occupancy and nearby employment matter",
    endUser: "More space where commute logic works",
    investor: "Future supply can limit quick exits",
    connectivity: "NH-48 and developing sector roads",
    checks: "Social infrastructure and resale depth",
  },
  {
    corridor: "Central Gurgaon",
    positioning: "Mature mid-premium and premium neighbourhoods",
    budget: "Broad resale bands",
    stock: "Mostly completed homes and floors",
    rental: "Established where office access is practical",
    endUser: "Strong for mature daily infrastructure",
    investor: "Renovation-adjusted entry price is key",
    connectivity: "Central roads, Metro and business districts",
    checks: "Age, title chain and redevelopment assumptions",
  },
  {
    corridor: "Gwal Pahari",
    positioning: "Low-density luxury",
    budget: "Premium and luxury",
    stock: "Mostly resale plus select launches",
    rental: "Niche; do not assume central-corridor depth",
    endUser: "Space-led choice for suitable commute patterns",
    investor: "Exit depth can be project-specific",
    connectivity: "Faridabad Road and south Gurgaon access",
    checks: "Last-mile access and daily-use infrastructure",
  },
] as const;

const FAQS = [
  {
    q: "How should I shortlist flats for sale in Gurgaon within a fixed budget?",
    a: "Separate stamp duty, registration, brokerage, fit-out and financing costs from the property budget first. Then compare suitable corridors, possession stage, unit size, maintenance, commute and seller expectations before arranging visits.",
  },
  {
    q: "Why is a project price different from the asking price of a specific unit?",
    a: "A project-level figure is only an indicative range. A specific unit can differ because of size, tower, floor, view, furnishing, parking, payment status, seller urgency and whether the quoted figure includes statutory or transfer charges.",
  },
  {
    q: "How do floor, view and tower affect Gurgaon apartment prices?",
    a: "Preferred towers, open views and suitable middle or higher floors may command premiums, while road noise, heat exposure, construction-facing views or less convenient access can reduce a sensible offer. The premium should be compared with competing units in the same project.",
  },
  {
    q: "Is a ready-to-move property safer than an under-construction property?",
    a: "Ready homes allow physical inspection and document review of the completed building, but can carry renovation and maintenance risks. Under-construction homes may provide newer specifications, while adding delivery, payment-plan and future-supply risk. Neither category is automatically better.",
  },
  {
    q: "Which RERA, occupation and title checks should a buyer make?",
    a: "Confirm the exact project phase and tower, review available Haryana RERA disclosures, check completion or occupation documentation where applicable, and examine the transaction-specific ownership and title papers through a qualified professional before paying a token.",
  },
  {
    q: "Can Shubh Estate Brokers help with valuation and a home loan?",
    a: "Yes. The team can coordinate eligibility, property valuation, lender-document requirements and bank follow-up. Final sanction, rate, loan-to-value and property approval remain subject to the chosen lender's policy.",
  },
  {
    q: "Can an NRI buy a Gurgaon property remotely?",
    a: "Shortlisting, live video walkthroughs, price comparison, home-loan coordination and much of the transaction follow-up can be handled remotely. Transaction-specific tax, foreign-exchange and power-of-attorney questions should be confirmed with qualified professionals.",
  },
  {
    q: "How are Gurgaon site visits coordinated?",
    a: "Share the budget, preferred corridors, configuration, timeline and financing position first. The team can then group genuinely relevant projects and units into a practical visit plan instead of arranging disconnected promotional visits.",
  },
  {
    q: "What additional costs should I budget beyond the asking price?",
    a: "Depending on the transaction, costs may include stamp duty, registration, brokerage, transfer or administrative charges, maintenance deposits, parking, club charges, fit-out, loan charges and applicable taxes. Ask for a unit-specific cost sheet.",
  },
  {
    q: "How often are prices and availability updated?",
    a: "Listings with a Shubh seller record are updated when availability is reconfirmed. Wider project ranges are labelled as indicative market samples with a review date. When reliable current evidence is insufficient, the directory shows price on request instead of an old launch figure.",
  },
];

function absoluteImageUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `${SITE_ORIGIN}${value.startsWith("/") ? value : `/${value}`}`;
}

function normalizedPage(value: unknown) {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 && page <= 100 ? page : undefined;
}

function isCorridor(value: unknown): value is CorridorSearchValue {
  return typeof value === "string" && value in CORRIDOR_SEARCH_VALUES;
}

export const Route = createFileRoute("/flats-for-sale-in-gurgaon")({
  validateSearch: (search: Record<string, unknown>): GurgaonCatalogueSearch => {
    const result: GurgaonCatalogueSearch = {};
    if (typeof search["q"] === "string" && search["q"].trim()) {
      result.q = search["q"].trim().slice(0, 100);
    }
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
    if (search["channel"] === "resale" || search["channel"] === "new-booking") {
      result.channel = search["channel"];
    }
    if (isCorridor(search["corridor"])) result.corridor = search["corridor"];
    const page = normalizedPage(search["page"]);
    if (page !== undefined) result.page = page;
    return result;
  },
  loaderDeps: ({ search }) => ({
    q: search.q,
    purpose: search.purpose ?? "sale",
    status: search.status,
    channel: search.channel,
    corridor: search.corridor,
    page: search.page ?? 1,
  }),
  loader: async ({ deps }) => {
    const [catalogue, projectHubs] = await Promise.all([
      listPublicCataloguePage({
        data: {
          page: deps.page,
          pageSize: PAGE_SIZE,
          q: deps.q,
          purpose: deps.purpose,
          status: deps.status,
        },
      }),
      listPublicProjectHubs(),
    ]);
    const projectGuideLinks = Object.fromEntries(
      projectHubs.map((project) => [project.name, `/projects/${project.slug}`]),
    );
    return {
      ...catalogue,
      projectGuideCount: projectHubs.length,
      projectGuideLinks,
      appliedSearch: deps,
    };
  },
  head: ({ loaderData }) => {
    const properties = loaderData?.properties ?? [];
    const page = loaderData?.page ?? 1;
    const pageSize = loaderData?.pageSize ?? PAGE_SIZE;
    const total = loaderData?.total ?? properties.length;
    const appliedSearch = loaderData?.appliedSearch;
    const hasFacet = Boolean(
      appliedSearch?.q ||
      appliedSearch?.status ||
      appliedSearch?.channel ||
      appliedSearch?.corridor ||
      (appliedSearch?.purpose && appliedSearch.purpose !== "sale"),
    );
    const isParameterVariant = hasFacet || page > 1;
    const canonical = `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`;
    const title =
      page > 1 && !hasFacet
        ? `Flats for Sale in Gurgaon – Page ${page} | Shubh Estate Brokers`
        : "Flats for Sale in Gurgaon | Current Prices & Projects";
    const description =
      "Compare flats, apartments and residential projects for sale in Gurgaon by budget, location, BHK and possession. Check current asking prices and availability.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        {
          property: "og:image",
          content: `${SITE_ORIGIN}/properties/puri-emerald-bay-2450/05-puri-emerald-bay-3bhk-living-room.jpg`,
        },
        {
          property: "og:image:alt",
          content: "Living room in a current Shubh Estate Brokers Gurgaon apartment listing",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${SITE_ORIGIN}/properties/puri-emerald-bay-2450/05-puri-emerald-bay-3bhk-living-room.jpg`,
        },
        ...(isParameterVariant ? [{ name: "robots", content: "noindex,follow" }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${SITE_ORIGIN}/flats-for-sale-in-gurgaon#webpage`,
            name: "Flats, Apartments & Residential Properties for Sale in Gurgaon",
            description,
            url: canonical,
            isPartOf: { "@type": "WebSite", url: SITE_ORIGIN, name: "Shubh Estate Brokers" },
            about: ["Flats for sale in Gurgaon", "Residential projects in Gurugram"],
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
                name: "Flats for Sale in Gurgaon",
                item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Current Gurgaon sale inventory",
            numberOfItems: total,
            itemListElement: properties.map((property, index) => ({
              "@type": "ListItem",
              position: (page - 1) * pageSize + index + 1,
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
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        },
      ],
    };
  },
  component: GurgaonCatalogue,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">The Gurgaon catalogue could not be loaded</h1>
      <p className="mt-2 text-muted-foreground">
        Please refresh the page or contact the advisory team.
      </p>
    </div>
  ),
});

function pageSearch(search: GurgaonCatalogueSearch, page: number): GurgaonCatalogueSearch {
  const result = { ...search };
  if (page > 1) result.page = page;
  else delete result.page;
  return result;
}

function GurgaonCatalogue() {
  const search = Route.useSearch();
  const {
    properties,
    total,
    page,
    pageSize,
    error,
    projectGuideCount,
    projectGuideLinks,
    projectUnitCounts,
  } = Route.useLoaderData() as {
    properties: ListingRow[];
    total: number;
    page: number;
    pageSize: number;
    error: string | null;
    projectGuideCount: number;
    projectGuideLinks: Record<string, string>;
    projectUnitCounts: Record<string, number>;
  };
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const selectedCorridor = search.corridor ? CORRIDOR_SEARCH_VALUES[search.corridor] : "all";

  return (
    <>
      <section className="surface-navy overflow-hidden">
        <div className="container-page relative py-14 md:py-20">
          <div
            className="absolute -right-24 top-8 size-72 rounded-full border border-gold/15"
            aria-hidden="true"
          />
          <div
            className="absolute -right-4 top-28 size-40 rounded-full border border-gold/20"
            aria-hidden="true"
          />
          <nav aria-label="Breadcrumb" className="relative text-xs text-navy-foreground/65">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Flats for Sale in Gurgaon</span>
          </nav>
          <div className="relative mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="eyebrow">Current inventory · project intelligence · buyer checks</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-6xl">
                Flats, Apartments & Residential Properties for Sale in Gurgaon
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-navy-foreground/75 md:text-lg">
                Compare current Shubh inventory with a carefully deduplicated directory of Gurgaon
                projects. Review price context, possession stage, financing and transaction risks
                before selecting a site visit or committing a token amount.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <a href="#project-directory">
                    <Search aria-hidden="true" />
                    Find matching properties
                  </a>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <a
                    href={CONTACT.phoneHref}
                    onClick={() => trackContact("phone", "gurgaon_catalogue_hero")}
                  >
                    <Phone aria-hidden="true" />
                    Call Arun
                  </a>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "gurgaon_catalogue_hero")}
                  >
                    <MessageCircle aria-hidden="true" />
                    WhatsApp Arun Madaan
                  </a>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <a href="#request-shortlist">Request a callback</a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel rounded-xl p-4">
                <p className="font-display text-3xl text-gold">{total}</p>
                <p className="mt-1 text-xs leading-5 text-navy-foreground/70">
                  Current matching sale listings
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <p className="font-display text-3xl text-gold">{GURGAON_PROJECT_COUNT}</p>
                <p className="mt-1 text-xs leading-5 text-navy-foreground/70">
                  Deduplicated project profiles
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <p className="font-display text-3xl text-gold">{projectGuideCount}</p>
                <p className="mt-1 text-xs leading-5 text-navy-foreground/70">
                  Published project guides
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <p className="font-display text-xl text-gold">{PROJECT_PRICE_REVIEW_DATE}</p>
                <p className="mt-1 text-xs leading-5 text-navy-foreground/70">
                  Latest directory price review
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="project-directory" className="container-page relative z-10 -mt-7 scroll-mt-28">
        <GurgaonProjectDirectory
          initialQuery={search.q ?? ""}
          initialCorridor={selectedCorridor}
          initialChannel={search.channel ?? "all"}
          projectUnitCounts={projectUnitCounts}
          projectGuideLinks={projectGuideLinks}
        />
      </section>

      <nav
        aria-label="Property advisory actions"
        className="container-page mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      >
        <a
          href="#project-comparison"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Compare selected projects
        </a>
        <a
          href="#request-shortlist"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Request a budget-based shortlist
        </a>
        <a
          href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Shubh Estate Brokers, please share the current price and availability for my shortlisted Gurgaon projects.")}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackContact("whatsapp", "gurgaon_catalogue_action_bar")}
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Ask for current price
        </a>
        <Link
          to="/home-loans"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Home-loan eligibility
        </Link>
        <a
          href="/contact?interest=Gurgaon%20property%20site%20visit"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Book a site visit
        </a>
        <Link
          to="/seller-submit"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Submit a property for sale
        </Link>
        <Link
          to="/nri"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-gold/50"
        >
          Request an NRI consultation
        </Link>
      </nav>

      <details className="container-page mt-6 rounded-2xl border border-border bg-card p-5">
        <summary className="cursor-pointer font-display text-xl">
          Browse the complete A–Z Gurgaon project index ({GURGAON_PROJECT_COUNT})
        </summary>
        <p className="mt-3 text-sm text-muted-foreground">
          Every seed project is listed once. A linked name opens an existing project guide; unlinked
          names remain in verification-led catalogue coverage without creating a thin project page.
        </p>
        <ul className="mt-5 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {SORTED_DIRECTORY_PROJECTS.map((project) => {
            const href = project.href ?? projectGuideLinks[project.name];
            return (
              <li key={`${project.name}-${project.sector}`} className="mb-2 break-inside-avoid">
                {href ? (
                  <a href={href} className="text-gold underline-offset-4 hover:underline">
                    {project.name}
                  </a>
                ) : (
                  <span>{project.name}</span>
                )}{" "}
                <span className="text-muted-foreground">· {project.sector}</span>
              </li>
            );
          })}
        </ul>
      </details>

      <section className="container-page py-16" aria-labelledby="buyer-paths-title">
        <div className="max-w-3xl">
          <p className="eyebrow">Choose by buying objective</p>
          <h2 id="buyer-paths-title" className="mt-3 font-display text-3xl md:text-4xl">
            Start with the decision you need to make
          </h2>
          <p className="mt-4 text-muted-foreground">
            These paths separate possession, property type, financing and remote-buyer needs so you
            do not have to search one undifferentiated list.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_PATHS.map(({ label, body, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold">
                Explore{" "}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        className="border-y border-border bg-secondary/50 py-16"
        aria-labelledby="corridor-title"
      >
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Gurgaon micro-markets</p>
            <h2 id="corridor-title" className="mt-3 font-display text-3xl md:text-4xl">
              Compare the corridor before comparing the tower
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each corridor has a different mix of pricing, occupancy, commute, future supply and
              resale depth. Choose the location logic before paying a premium for specifications.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CORRIDORS.map((corridor) => (
              <article key={corridor.slug} className="rounded-2xl border border-border bg-card p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  <MapPin className="size-4" aria-hidden="true" />
                  Gurgaon corridor
                </p>
                <h3 className="mt-3 font-display text-2xl">{corridor.label}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{corridor.profile}</p>
                <p className="mt-4 border-l-2 border-gold pl-3 text-sm">
                  <span className="font-medium">Often considered by:</span> {corridor.fit}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                  <Link
                    to="/flats-for-sale-in-gurgaon"
                    search={{ corridor: corridor.slug }}
                    className="text-gold hover:underline"
                  >
                    Filter projects
                  </Link>
                  <Link
                    to="/locations/$slug"
                    params={{ slug: corridor.locationSlug }}
                    className="text-gold hover:underline"
                  >
                    Read location guide
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="verified-inventory"
        className="container-page scroll-mt-28 py-16"
        aria-labelledby="inventory-title"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="eyebrow">Actual published inventory</p>
            <h2 id="inventory-title" className="mt-3 font-display text-3xl md:text-4xl">
              Current Shubh Estate Brokers sale listings
            </h2>
            <p className="mt-4 text-muted-foreground">
              These are unit-level listings published by the Shubh team. Confirm availability, owner
              instructions, floor, view, condition and final asking price before scheduling a visit.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {total} matching sale {total === 1 ? "listing" : "listings"}
          </p>
        </div>

        <form
          action="/flats-for-sale-in-gurgaon#verified-inventory"
          method="get"
          className="mt-7 grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-[1fr_220px_auto]"
        >
          <label className="relative">
            <span className="sr-only">Search current listings</span>
            <Search
              className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              defaultValue={search.q}
              placeholder="Search project, sector or configuration"
              className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm"
            />
          </label>
          <label>
            <span className="sr-only">Possession status</span>
            <select
              name="status"
              defaultValue={search.status ?? ""}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All possession stages</option>
              <option value="ready_to_move">Ready to move</option>
              <option value="under_construction">Under construction</option>
              <option value="new_launch">New launch</option>
            </select>
          </label>
          <input type="hidden" name="purpose" value="sale" />
          <Button type="submit" variant="gold" size="lg">
            <Search aria-hidden="true" />
            Search inventory
          </Button>
        </form>

        {error ? (
          <div className="mt-7 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="font-medium">Published properties could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please refresh the page or contact the advisory team directly.
            </p>
          </div>
        ) : properties.length ? (
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <ListingCard key={property.id} property={property} showContactActions />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav
                aria-label="Current Gurgaon inventory pages"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                {page > 1 ? (
                  <Link
                    to="/flats-for-sale-in-gurgaon"
                    search={pageSearch(search, page - 1)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                  </Link>
                ) : null}
                <span className="px-3 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    to="/flats-for-sale-in-gurgaon"
                    search={pageSearch(search, page + 1)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent"
                  >
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
            <h3 className="font-display text-2xl">No current listing matches this exact search</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Ask for a private shortlist; not every owner instruction is published online.
            </p>
            <Button asChild variant="goldOutline" className="mt-5">
              <a href="#request-shortlist">Request a shortlist</a>
            </Button>
          </div>
        )}
      </section>

      <section
        className="border-y border-border bg-secondary/50 py-16"
        aria-labelledby="comparison-title"
      >
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Location comparison</p>
            <h2 id="comparison-title" className="mt-3 font-display text-3xl md:text-4xl">
              A corridor changes the risk-reward equation
            </h2>
            <p className="mt-4 text-muted-foreground">
              This is positioning context, not a price promise. The specific project, unit and entry
              price still determine whether a purchase is sensible.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[1500px] border-collapse text-left text-sm">
              <thead className="bg-navy text-navy-foreground">
                <tr>
                  <th className="p-4 font-medium">Corridor</th>
                  <th className="p-4 font-medium">Positioning</th>
                  <th className="p-4 font-medium">Entry-budget context</th>
                  <th className="p-4 font-medium">Ready vs construction</th>
                  <th className="p-4 font-medium">Rental-demand context</th>
                  <th className="p-4 font-medium">End-user fit</th>
                  <th className="p-4 font-medium">Investor lens</th>
                  <th className="p-4 font-medium">Connectivity</th>
                  <th className="p-4 font-medium">Key buyer check</th>
                </tr>
              </thead>
              <tbody>
                {CORRIDOR_COMPARISON.map((row) => (
                  <tr key={row.corridor} className="border-b border-border last:border-0">
                    <td className="p-4 align-top font-medium">{row.corridor}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.positioning}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.budget}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.stock}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.rental}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.endUser}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.investor}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.connectivity}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.checks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="advisory-title">
        <div className="grid overflow-hidden rounded-3xl border border-border lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-navy p-7 md:p-10">
            <p className="eyebrow">Founder-led advisory</p>
            <h2 id="advisory-title" className="mt-4 font-display text-3xl md:text-4xl">
              Compare the price, paperwork, financing and exit—not only the brochure.
            </h2>
            <p className="mt-5 leading-7 text-navy-foreground/75">
              Arun Madaan, MBA and LLB, brings approximately 20 years of banking, mortgage,
              credit-evaluation and property-finance experience to Gurgaon property decisions.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Unit and price comparison",
                "RERA and approval context",
                "Title-document assessment",
                "Home-loan structuring",
                "Negotiation and site visits",
                "NRI transaction coordination",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-navy-foreground/80">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-card p-7 md:p-10">
            <p className="eyebrow">Advantages and watch-outs</p>
            <h3 className="mt-3 font-display text-2xl">
              A shortlist should include reasons to reject
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              A project can have strong connectivity and specifications while still being unsuitable
              at the wrong entry price, possession stage or financing cost. We compare the practical
              disadvantages alongside the marketing strengths.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <Link to="/property-buying-advisory-gurgaon">View buyer process</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/blog/gurgaon-property-due-diligence-checklist-2026">
                  Due-diligence checklist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="request-shortlist"
        className="border-y border-border bg-secondary/50 py-16 scroll-mt-28"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Budget-based shortlist</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Tell us the decision before discussing the project
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Share your usable property budget, preferred corridors, configuration, timeline,
              end-use or investment objective and financing position. The team can then compare
              relevant public and privately held options.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 text-gold" aria-hidden="true" />
                No guaranteed-return or forced-appreciation claims
              </p>
              <p className="flex items-start gap-2">
                <FileCheck2 className="mt-0.5 size-4 text-gold" aria-hidden="true" />
                Transaction-specific document and lender checks
              </p>
              <p className="flex items-start gap-2">
                <Landmark className="mt-0.5 size-4 text-gold" aria-hidden="true" />
                Property and financing evaluated together
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <EnquiryForm interest="Gurgaon budget-based property shortlist" />
          </div>
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">Buyer questions</p>
            <h2 id="faq-title" className="mt-3 font-display text-3xl md:text-4xl">
              Questions to settle before paying a token
            </h2>
            <p className="mt-4 text-muted-foreground">
              The answers below explain the comparison process. They do not replace
              transaction-specific legal, tax or lending advice.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container-page pb-6">
        <div className="rounded-xl border border-border bg-card p-5 text-xs leading-6 text-muted-foreground">
          <p>
            <strong className="text-foreground">Price and availability note:</strong> Project-level
            figures are indicative asking-price context, not registered transaction prices or
            binding offers. Final pricing can vary by configuration, size, phase, tower, floor,
            view, furnishing, payment status, seller urgency, taxes and statutory charges. Entries
            without adequate current evidence remain marked “Price on request”.
          </p>
          <p className="mt-2">
            Directory review date: {PROJECT_PRICE_REVIEW_DATE}. High-demand project inclusion
            reflects active buyer relevance, established resale interest or current launch activity;
            it is not an investment recommendation.
          </p>
        </div>
      </section>
    </>
  );
}
