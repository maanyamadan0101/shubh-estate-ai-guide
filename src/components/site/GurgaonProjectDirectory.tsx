import { useDeferredValue, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  IndianRupee,
  Landmark,
  Layers3,
  MapPin,
  MessageCircle,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";
import {
  GURGAON_DIRECTORY_PROJECTS,
  PROJECT_CORRIDORS,
  type GurgaonDirectoryProject,
  type ProjectCorridor,
  type ProjectStatus,
  type ProjectType,
} from "@/data/gurgaon-project-directory";
import { trackContact, trackEvent } from "@/lib/analytics";
import { directoryProjectImageFor } from "@/lib/directory-project-images";
import { vercelSrcSet } from "@/lib/image-optimization";

const PAGE_INCREMENT = 24;

type BudgetFilter = "all" | "under-3" | "3-5" | "5-10" | "10-plus" | "on-request";
type BhkFilter = "all" | "2" | "3" | "4" | "5";
type StatusFilter = "all" | ProjectStatus;
type TypeFilter = "all" | ProjectType;
type ChannelFilter = "all" | "resale" | "new-booking";
type SortOption = "featured" | "name" | "price" | "recent" | "size" | "possession";

type DirectoryFilters = {
  query: string;
  sector: string;
  corridor: "all" | ProjectCorridor;
  budget: BudgetFilter;
  bhk: BhkFilter;
  status: StatusFilter;
  propertyType: TypeFilter;
  developer: string;
  channel: ChannelFilter;
  minimumArea: string;
  maximumArea: string;
  sort: SortOption;
};

const DEFAULT_FILTERS: DirectoryFilters = {
  query: "",
  sector: "all",
  corridor: "all",
  budget: "all",
  bhk: "all",
  status: "all",
  propertyType: "all",
  developer: "all",
  channel: "all",
  minimumArea: "",
  maximumArea: "",
  sort: "featured",
};

const QUICK_STATUS_FILTERS = [
  ["All projects", "all"],
  ["New launches", "New launch"],
  ["Under construction", "Under construction"],
  ["Ready to move", "Ready to move"],
] as const;

const DEVELOPERS = Array.from(
  new Set(GURGAON_DIRECTORY_PROJECTS.map((project) => project.developer)),
).sort((a, b) => a.localeCompare(b, "en-IN"));

const SECTORS = Array.from(
  new Set(GURGAON_DIRECTORY_PROJECTS.map((project) => project.sector)),
).sort((a, b) => a.localeCompare(b, "en-IN", { numeric: true }));

function corridorLabel(corridor: ProjectCorridor) {
  if (corridor === "Golf Course Road & Central Luxury") {
    return "Golf Course Road / Central Gurgaon";
  }
  if (corridor === "SPR, Sohna Road & South Gurgaon") {
    return "Southern Peripheral Road / Sohna Road";
  }
  if (corridor === "Gwal Pahari & Other Luxury Locations") {
    return "Gwal Pahari / Other luxury locations";
  }
  return corridor;
}

function budgetMatches(project: GurgaonDirectoryProject, budget: BudgetFilter) {
  if (budget === "all") return true;
  if (budget === "on-request") return project.priceMinCr == null;
  if (project.priceMinCr == null) return false;
  if (budget === "under-3") return project.priceMinCr < 3;
  if (budget === "3-5") return project.priceMinCr >= 3 && project.priceMinCr < 5;
  if (budget === "5-10") return project.priceMinCr >= 5 && project.priceMinCr < 10;
  return project.priceMinCr >= 10;
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase("en-IN")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function statusTone(status: ProjectStatus) {
  if (status === "Ready to move") return "border-emerald-600/30 bg-emerald-50 text-emerald-800";
  if (status === "New launch") return "border-violet-600/30 bg-violet-50 text-violet-800";
  if (status === "Under construction") return "border-amber-600/30 bg-amber-50 text-amber-800";
  return "border-border bg-secondary text-foreground";
}

function areaBasisLabel(project: GurgaonDirectoryProject) {
  if (project.areaBasis === "carpet_area") return "Carpet area";
  if (project.areaBasis === "built_up_area") return "Built-up area";
  if (project.areaBasis === "super_area") return "Super area";
  return "Area basis to confirm";
}

function priceScopeLabel(project: GurgaonDirectoryProject) {
  if (project.priceScope === "all_inclusive") return "All-inclusive context";
  if (project.priceScope === "builder_basic_price") return "Builder basic price";
  if (project.priceScope === "asking_rate_per_sq_ft") return "Asking rate; charges to confirm";
  if (project.priceScope === "asking_total") return "Asking total; charges to confirm";
  return "Basic versus all-inclusive basis to confirm";
}

function ProjectCard({
  project,
  selected,
  unitCount,
  guideHref,
  comparisonLimitReached,
  onToggle,
}: {
  project: GurgaonDirectoryProject;
  selected: boolean;
  unitCount: number;
  guideHref?: string | undefined;
  comparisonLimitReached: boolean;
  onToggle: (project: GurgaonDirectoryProject) => void;
}) {
  const image = directoryProjectImageFor(project.name);
  const responsiveSrcSet = image ? vercelSrcSet(image.src, [360, 540, 720, 960]) : undefined;
  const projectHref = guideHref ?? `/contact?interest=${encodeURIComponent(project.name)}`;
  const message = encodeURIComponent(
    `Hi Shubh Estate Brokers, please share current price, availability and buyer checks for ${project.name}, ${project.sector}, Gurgaon.`,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)] focus-within:border-gold/60 focus-within:shadow-[var(--shadow-elegant)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        {image ? (
          <img
            src={image.src}
            srcSet={responsiveSrcSet}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            width={960}
            height={600}
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 47vw, 100vw"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="surface-navy relative flex size-full flex-col items-center justify-center overflow-hidden px-6 text-center text-navy-foreground">
            <div className="absolute -right-12 -top-14 size-44 rounded-full border border-gold/15" />
            <div className="absolute -bottom-24 -left-12 size-52 rounded-full border border-gold/10" />
            <div className="relative flex size-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <Building2 className="size-7" aria-hidden="true" />
            </div>
            <p className="relative mt-4 max-w-xs font-display text-xl leading-snug">
              {project.name}
            </p>
            <p className="relative mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Official project image awaited
            </p>
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 bg-gradient-to-b from-navy/75 to-transparent p-3">
          <Badge className={statusTone(project.status)} variant="outline">
            {project.status}
          </Badge>
          {unitCount > 0 ? (
            <Badge className="border-0 bg-gold text-gold-foreground hover:bg-gold">
              Current resale available
            </Badge>
          ) : null}
        </div>

        {image ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-navy/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            {image.imageType}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
          {project.developer}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">{project.name}</h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          {project.sector} · {project.corridor}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.reraNumber ? (
            <Badge
              variant="outline"
              className="border-emerald-600/30 bg-emerald-50 text-emerald-800"
            >
              <ShieldCheck className="size-3" aria-hidden="true" />
              RERA registered
            </Badge>
          ) : (
            <Badge variant="outline">Phase-level RERA check required</Badge>
          )}
          <Badge variant="outline" className="border-gold/35 bg-gold/5 text-foreground">
            <Landmark className="size-3 text-gold" aria-hidden="true" />
            Up to 90% Home Loan Available*
          </Badge>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Layers3 className="size-3.5 text-gold" aria-hidden="true" />
              Configuration
            </dt>
            <dd className="mt-1 line-clamp-2 font-medium leading-5">{project.configuration}</dd>
          </div>
          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 className="size-3.5 text-gold" aria-hidden="true" />
              Size range
            </dt>
            <dd className="mt-1 line-clamp-2 font-medium leading-5">{project.sizeRange}</dd>
          </div>
        </dl>

        <div className="mt-3 rounded-xl border border-gold/25 bg-gold/5 p-3.5">
          <p className="flex items-start gap-2 font-display text-lg leading-snug text-navy">
            <IndianRupee className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            {project.priceLabel}
          </p>
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {project.pricePerSqFt ?? "Request a unit-specific price comparison"}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
            <CalendarClock className="size-3.5 text-gold" aria-hidden="true" />
            {project.factReviewedOn
              ? `Project facts checked ${project.factReviewedOn}`
              : project.reviewedOn
                ? `Price reviewed ${project.reviewedOn}`
                : "Current verification requested"}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.68rem] text-muted-foreground">
            <span>{project.propertyType}</span>
            <span>{areaBasisLabel(project)}</span>
            <span>{priceScopeLabel(project)}</span>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <label className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm transition-colors hover:bg-secondary">
            <input
              type="checkbox"
              checked={selected}
              disabled={comparisonLimitReached && !selected}
              onChange={() => onToggle(project)}
              className="size-4 accent-[var(--gold)] disabled:cursor-not-allowed"
            />
            Compare this project
          </label>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button asChild variant="goldOutline" className="w-full px-3">
              <a
                href={projectHref}
                onClick={() =>
                  trackEvent("project_card_click", {
                    project_name: project.name,
                    page_path: window.location.pathname,
                    has_guide: Boolean(guideHref),
                  })
                }
              >
                View project
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="gold" className="w-full px-3">
              <a
                href={`${CONTACT.whatsapp}?text=${message}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackContact("whatsapp", "gurgaon_project_card", {
                    project_name: project.name,
                  })
                }
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectComparison({
  projects,
  onRemove,
}: {
  projects: GurgaonDirectoryProject[];
  onRemove: (name: string) => void;
}) {
  if (projects.length === 0) return null;

  return (
    <section
      id="project-comparison"
      aria-labelledby="project-comparison-title"
      className="mb-8 rounded-2xl border border-gold/35 bg-gold/5 p-5 md:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Side-by-side shortlist</p>
          <h3 id="project-comparison-title" className="mt-2 font-display text-2xl">
            Compare selected projects
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Select up to three projects</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 font-medium text-muted-foreground">Project</th>
              <th className="p-3 font-medium text-muted-foreground">Location</th>
              <th className="p-3 font-medium text-muted-foreground">Configuration</th>
              <th className="p-3 font-medium text-muted-foreground">Status</th>
              <th className="p-3 font-medium text-muted-foreground">Price context</th>
              <th className="p-3">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.name} className="border-b border-border/70 align-top last:border-0">
                <td className="p-3 font-medium">{project.name}</td>
                <td className="p-3 text-muted-foreground">{project.sector}</td>
                <td className="p-3 text-muted-foreground">{project.configuration}</td>
                <td className="p-3 text-muted-foreground">{project.status}</td>
                <td className="p-3 text-muted-foreground">{project.priceLabel}</td>
                <td className="p-3 text-right">
                  <button
                    type="button"
                    onClick={() => onRemove(project.name)}
                    className="inline-flex size-9 items-center justify-center rounded-md hover:bg-background"
                    aria-label={`Remove ${project.name} from comparison`}
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function GurgaonProjectDirectory({
  initialQuery = "",
  initialCorridor = "all",
  initialChannel = "all",
  projectUnitCounts = {},
  projectGuideLinks = {},
}: {
  initialQuery?: string;
  initialCorridor?: "all" | ProjectCorridor;
  initialChannel?: ChannelFilter;
  projectUnitCounts?: Record<string, number>;
  projectGuideLinks?: Record<string, string>;
}) {
  const [filters, setFilters] = useState<DirectoryFilters>(() => ({
    ...DEFAULT_FILTERS,
    query: initialQuery,
    corridor: initialCorridor,
    channel: initialChannel,
  }));
  const [visibleCount, setVisibleCount] = useState(PAGE_INCREMENT);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const deferredQuery = useDeferredValue(filters.query);

  const filteredProjects = useMemo(() => {
    const query = normalize(deferredQuery);
    const projects = GURGAON_DIRECTORY_PROJECTS.filter((project) => {
      const searchable = normalize(
        [
          project.name,
          project.developer,
          project.sector,
          project.corridor,
          project.configuration,
          project.propertyType,
        ].join(" "),
      );
      if (query && !searchable.includes(query)) return false;
      if (filters.sector !== "all" && project.sector !== filters.sector) return false;
      if (filters.corridor !== "all" && project.corridor !== filters.corridor) return false;
      if (!budgetMatches(project, filters.budget)) return false;
      if (filters.bhk !== "all" && !normalize(project.configuration).includes(filters.bhk)) {
        return false;
      }
      if (filters.status !== "all" && project.status !== filters.status) return false;
      if (filters.propertyType !== "all" && project.propertyType !== filters.propertyType) {
        return false;
      }
      if (filters.developer !== "all" && project.developer !== filters.developer) return false;
      const currentUnitCount = projectUnitCounts[project.name] ?? 0;
      if (filters.channel === "resale" && currentUnitCount === 0) return false;
      if (
        filters.channel === "new-booking" &&
        project.status !== "New launch" &&
        project.status !== "Under construction"
      ) {
        return false;
      }
      const minimumArea = Number(filters.minimumArea);
      if (
        filters.minimumArea &&
        (!project.sizeMaxSqFt || !Number.isFinite(minimumArea) || project.sizeMaxSqFt < minimumArea)
      ) {
        return false;
      }
      const maximumArea = Number(filters.maximumArea);
      if (
        filters.maximumArea &&
        (!project.sizeMinSqFt || !Number.isFinite(maximumArea) || project.sizeMinSqFt > maximumArea)
      ) {
        return false;
      }
      return true;
    });

    return projects.sort((a, b) => {
      if (filters.sort === "name") return a.name.localeCompare(b.name, "en-IN");
      if (filters.sort === "price") {
        return (
          (a.priceMinCr ?? Number.POSITIVE_INFINITY) - (b.priceMinCr ?? Number.POSITIVE_INFINITY)
        );
      }
      if (filters.sort === "recent") {
        const aReviewed = a.factReviewedOn ?? a.reviewedOn;
        const bReviewed = b.factReviewedOn ?? b.reviewedOn;
        if (aReviewed && !bReviewed) return -1;
        if (!aReviewed && bReviewed) return 1;
      }
      if (filters.sort === "size") {
        return (
          (a.sizeMinSqFt ?? Number.POSITIVE_INFINITY) - (b.sizeMinSqFt ?? Number.POSITIVE_INFINITY)
        );
      }
      if (filters.sort === "possession") return a.status.localeCompare(b.status, "en-IN");
      if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name, "en-IN");
    });
  }, [
    deferredQuery,
    filters.bhk,
    filters.budget,
    filters.corridor,
    filters.developer,
    filters.channel,
    filters.maximumArea,
    filters.minimumArea,
    filters.propertyType,
    filters.sector,
    filters.sort,
    filters.status,
    projectUnitCounts,
  ]);

  const selectedProjects = useMemo(() => {
    const selected = new Set(selectedNames);
    return GURGAON_DIRECTORY_PROJECTS.filter((project) => selected.has(project.name));
  }, [selectedNames]);

  function updateFilter<K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisibleCount(PAGE_INCREMENT);
    if (key !== "query") {
      trackEvent("project_filter_use", {
        filter_name: key,
        filter_value: String(value),
        page_path: window.location.pathname,
      });
    }
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setVisibleCount(PAGE_INCREMENT);
    trackEvent("project_filters_clear", { page_path: window.location.pathname });
  }

  function toggleComparison(project: GurgaonDirectoryProject) {
    setSelectedNames((current) => {
      if (current.includes(project.name)) return current.filter((name) => name !== project.name);
      if (current.length >= 3) return current;
      trackEvent("project_compare_add", {
        project_name: project.name,
        page_path: window.location.pathname,
      });
      return [...current, project.name];
    });
  }

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasFilters =
    filters.query !== "" ||
    filters.sector !== "all" ||
    filters.corridor !== "all" ||
    filters.budget !== "all" ||
    filters.bhk !== "all" ||
    filters.status !== "all" ||
    filters.propertyType !== "all" ||
    filters.developer !== "all" ||
    filters.channel !== "all" ||
    filters.minimumArea !== "" ||
    filters.maximumArea !== "";

  return (
    <div>
      <div className="rounded-2xl border border-gold/30 bg-card p-5 shadow-[var(--shadow-elegant)] md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Search and compare
            </p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              Find projects around your budget
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground">
            <Scale className="size-4 text-gold" aria-hidden="true" />
            {selectedNames.length}/3 selected
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="relative md:col-span-2">
            <span className="sr-only">Search projects, developers or sectors</span>
            <Search
              className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              onBlur={() => {
                if (filters.query.trim()) {
                  trackEvent("project_filter_use", {
                    filter_name: "query",
                    filter_value: filters.query.trim(),
                    page_path: window.location.pathname,
                  });
                }
              }}
              placeholder="Search project, developer or sector"
              className="h-11 pl-10"
            />
          </label>

          <label>
            <span className="sr-only">Select corridor</span>
            <select
              value={filters.corridor}
              onChange={(event) =>
                updateFilter("corridor", event.target.value as DirectoryFilters["corridor"])
              }
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All Gurgaon corridors</option>
              {PROJECT_CORRIDORS.map((corridor) => (
                <option key={corridor} value={corridor}>
                  {corridorLabel(corridor)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Select sector</span>
            <select
              value={filters.sector}
              onChange={(event) => updateFilter("sector", event.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All Gurgaon sectors</option>
              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Select budget</span>
            <select
              value={filters.budget}
              onChange={(event) => updateFilter("budget", event.target.value as BudgetFilter)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All budgets</option>
              <option value="under-3">Under ₹3 Cr</option>
              <option value="3-5">₹3–5 Cr</option>
              <option value="5-10">₹5–10 Cr</option>
              <option value="10-plus">₹10 Cr+</option>
              <option value="on-request">Price on request</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Select BHK</span>
            <select
              value={filters.bhk}
              onChange={(event) => updateFilter("bhk", event.target.value as BhkFilter)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All configurations</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5 BHK</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Select possession status</span>
            <select
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value as StatusFilter)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All possession stages</option>
              <option value="Ready to move">Ready to move</option>
              <option value="Under construction">Under construction</option>
              <option value="New launch">New launch</option>
              <option value="Mixed phases">Mixed phases</option>
              <option value="Check current phase">Check current phase</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Select resale or new booking</span>
            <select
              value={filters.channel}
              onChange={(event) => updateFilter("channel", event.target.value as ChannelFilter)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">Resale and new booking</option>
              <option value="resale">Published resale available</option>
              <option value="new-booking">Fresh booking — verify inventory</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Sort projects</span>
            <select
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value as SortOption)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="featured">Featured and relevant</option>
              <option value="recent">Latest updated</option>
              <option value="price">Lowest indicative entry</option>
              <option value="size">Smallest published size</option>
              <option value="possession">Possession status</option>
              <option value="name">Project name A–Z</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Quick project filters">
          {QUICK_STATUS_FILTERS.map(([label, value]) => {
            const active = filters.status === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilter("status", value as StatusFilter)}
                className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border bg-background text-foreground hover:border-gold/50 hover:bg-gold/5"
                }`}
              >
                {label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={filters.channel === "resale"}
            onClick={() => updateFilter("channel", filters.channel === "resale" ? "all" : "resale")}
            className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
              filters.channel === "resale"
                ? "border-gold bg-gold text-gold-foreground"
                : "border-border bg-background text-foreground hover:border-gold/50 hover:bg-gold/5"
            }`}
          >
            Current resale
          </button>
        </div>

        <div className="mt-4">
          <button
            type="button"
            aria-expanded={advancedFiltersOpen}
            onClick={() => setAdvancedFiltersOpen((current) => !current)}
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:text-gold hover:underline"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {advancedFiltersOpen
              ? "Hide advanced filters"
              : "More filters: developer, type and area"}
          </button>
        </div>

        {advancedFiltersOpen ? (
          <div className="mt-3 grid gap-3 rounded-xl border border-border bg-muted/25 p-4 md:grid-cols-2 lg:grid-cols-4">
            <label>
              <span className="sr-only">Select property type</span>
              <select
                value={filters.propertyType}
                onChange={(event) => updateFilter("propertyType", event.target.value as TypeFilter)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All property types</option>
                <option value="Apartment">Apartments</option>
                <option value="Builder Floor">Builder floors</option>
                <option value="Villa">Villas</option>
                <option value="Mixed">Mixed developments</option>
              </select>
            </label>

            <label>
              <span className="sr-only">Select developer</span>
              <select
                value={filters.developer}
                onChange={(event) => updateFilter("developer", event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All developers</option>
                {DEVELOPERS.map((developer) => (
                  <option key={developer} value={developer}>
                    {developer}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Minimum area in square feet</span>
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={filters.minimumArea}
                onChange={(event) => updateFilter("minimumArea", event.target.value)}
                placeholder="Minimum area (sq ft)"
                className="h-11"
              />
            </label>

            <label>
              <span className="sr-only">Maximum area in square feet</span>
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={filters.maximumArea}
                onChange={(event) => updateFilter("maximumArea", event.target.value)}
                placeholder="Maximum area (sq ft)"
                className="h-11"
              />
            </label>
          </div>
        ) : null}

        <p className="mt-3 text-xs text-muted-foreground">
          Fresh-booking results identify likely launch-stage projects; current developer inventory
          is reconfirmed before any recommendation.
        </p>

        {hasFilters ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {filters.query ? <Badge variant="secondary">Search: {filters.query}</Badge> : null}
            {filters.sector !== "all" ? <Badge variant="secondary">{filters.sector}</Badge> : null}
            {filters.corridor !== "all" ? (
              <Badge variant="secondary">{corridorLabel(filters.corridor)}</Badge>
            ) : null}
            {filters.budget !== "all" ? (
              <Badge variant="secondary">Budget: {filters.budget}</Badge>
            ) : null}
            {filters.bhk !== "all" ? <Badge variant="secondary">{filters.bhk} BHK</Badge> : null}
            {filters.status !== "all" ? <Badge variant="secondary">{filters.status}</Badge> : null}
            {filters.propertyType !== "all" ? (
              <Badge variant="secondary">{filters.propertyType}</Badge>
            ) : null}
            {filters.developer !== "all" ? (
              <Badge variant="secondary">{filters.developer}</Badge>
            ) : null}
            {filters.channel !== "all" ? (
              <Badge variant="secondary">{filters.channel}</Badge>
            ) : null}
            {filters.minimumArea ? (
              <Badge variant="secondary">Min {filters.minimumArea} sq ft</Badge>
            ) : null}
            {filters.maximumArea ? (
              <Badge variant="secondary">Max {filters.maximumArea} sq ft</Badge>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p aria-live="polite" className="text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} match
            this requirement
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-10 items-center gap-2 font-medium text-gold underline-offset-4 hover:underline"
            >
              <X className="size-4" aria-hidden="true" />
              Clear all filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <ProjectComparison
          projects={selectedProjects}
          onRemove={(name) =>
            setSelectedNames((current) => current.filter((item) => item !== name))
          }
        />

        {visibleProjects.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={`${project.name}-${project.sector}`}
                project={project}
                selected={selectedNames.includes(project.name)}
                unitCount={projectUnitCounts[project.name] ?? 0}
                guideHref={project.href ?? projectGuideLinks[project.name]}
                comparisonLimitReached={selectedNames.length >= 3}
                onToggle={toggleComparison}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <ShieldCheck className="mx-auto size-8 text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">No project matches every selected filter</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Reset the filters or ask for a budget-based shortlist. Availability and prices can
              change before the directory is updated.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button type="button" variant="goldOutline" onClick={resetFilters}>
                Show all projects
              </Button>
              <Button asChild variant="gold">
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                    "Hi Arun, I could not find an exact project match. Please prepare a Gurgaon shortlist for my requirement.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "project_directory_no_results")}
                >
                  WhatsApp your requirement
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/contact">Discuss your requirement</a>
              </Button>
            </div>
          </div>
        )}

        {visibleCount < filteredProjects.length ? (
          <div className="mt-9 text-center">
            <Button
              type="button"
              variant="goldOutline"
              size="lg"
              onClick={() => setVisibleCount((current) => current + PAGE_INCREMENT)}
            >
              <CheckCircle2 aria-hidden="true" />
              Load {Math.min(PAGE_INCREMENT, filteredProjects.length - visibleCount)} more projects
            </Button>
          </div>
        ) : null}

        <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-5 text-muted-foreground">
          * {LOAN_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}
