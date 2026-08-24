import { useDeferredValue, useMemo, useState } from "react";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  IndianRupee,
  Layers3,
  MapPin,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT } from "@/data/site";
import {
  GURGAON_DIRECTORY_PROJECTS,
  PROJECT_CORRIDORS,
  type GurgaonDirectoryProject,
  type ProjectCorridor,
  type ProjectStatus,
  type ProjectType,
} from "@/data/gurgaon-project-directory";
import { trackContact, trackEvent } from "@/lib/analytics";

const PAGE_INCREMENT = 24;

type BudgetFilter = "all" | "under-3" | "3-5" | "5-10" | "10-plus" | "on-request";
type BhkFilter = "all" | "2" | "3" | "4" | "5";
type StatusFilter = "all" | ProjectStatus;
type TypeFilter = "all" | ProjectType;
type ChannelFilter = "all" | "resale" | "new-booking";
type SortOption = "featured" | "name" | "price" | "recent" | "size" | "possession";

type DirectoryFilters = {
  query: string;
  corridor: "all" | ProjectCorridor;
  budget: BudgetFilter;
  bhk: BhkFilter;
  status: StatusFilter;
  propertyType: TypeFilter;
  developer: string;
  channel: ChannelFilter;
  minimumArea: string;
  maximumArea: string;
  nriSupport: boolean;
  loanSupport: boolean;
  sort: SortOption;
};

const DEFAULT_FILTERS: DirectoryFilters = {
  query: "",
  corridor: "all",
  budget: "all",
  bhk: "all",
  status: "all",
  propertyType: "all",
  developer: "all",
  channel: "all",
  minimumArea: "",
  maximumArea: "",
  nriSupport: false,
  loanSupport: false,
  sort: "featured",
};

const DEVELOPERS = Array.from(
  new Set(GURGAON_DIRECTORY_PROJECTS.map((project) => project.developer)),
).sort((a, b) => a.localeCompare(b, "en-IN"));

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
  const message = encodeURIComponent(
    `Hi Shubh Estate Brokers, please share current price, availability and buyer checks for ${project.name}, ${project.sector}, Gurgaon.`,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]">
      <div className="surface-navy relative flex min-h-36 items-end overflow-hidden p-5">
        <div className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <Building2 className="size-5" aria-hidden="true" />
        </div>
        <div className="relative">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
            {project.developer}
          </p>
          <h3 className="mt-2 max-w-[17rem] font-display text-2xl leading-tight text-navy-foreground">
            {project.name}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-navy-foreground/70">
            <MapPin className="size-3.5 text-gold" aria-hidden="true" />
            {project.sector}, Gurugram
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={statusTone(project.status)}>
            {project.status}
          </Badge>
          {project.priceBasis === "verified_inventory" ? (
            <Badge className="bg-gold text-gold-foreground hover:bg-gold">Shubh inventory</Badge>
          ) : project.priceBasis === "market_sample" ? (
            <Badge variant="secondary">Market sample</Badge>
          ) : null}
          <Badge variant="outline">
            {project.reraCheck === "guide_checked" ? "RERA guide checked" : "RERA phase check due"}
          </Badge>
        </div>

        <dl className="mt-5 grid gap-3 text-sm">
          <div className="flex items-start gap-2.5">
            <Layers3 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <dt className="text-xs text-muted-foreground">Configuration</dt>
              <dd className="mt-0.5 font-medium">{project.configuration}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Building2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <dt className="text-xs text-muted-foreground">Property type and size</dt>
              <dd className="mt-0.5 font-medium">
                {project.propertyType} · {project.sizeRange}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">{areaBasisLabel(project)}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-5 rounded-xl border border-gold/25 bg-gold/5 p-4">
          <p className="flex items-start gap-2 font-display text-lg leading-snug">
            <IndianRupee className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            {project.priceLabel}
          </p>
          {project.pricePerSqFt ? (
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{project.pricePerSqFt}</p>
          ) : (
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Approx. rate: request a unit-specific comparable
            </p>
          )}
          <p className="mt-2 flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
            <CalendarClock className="size-3.5 text-gold" aria-hidden="true" />
            {project.reviewedOn
              ? `Price reviewed ${project.reviewedOn}`
              : "Current price verification requested"}
          </p>
          <p className="mt-1.5 text-[0.68rem] text-muted-foreground">
            {unitCount} current published Shubh {unitCount === 1 ? "unit" : "units"}
          </p>
          <p className="mt-1 text-[0.68rem] text-muted-foreground">{priceScopeLabel(project)}</p>
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
            {guideHref ? (
              <Button asChild variant="goldOutline" className="w-full px-3">
                <a href={guideHref}>View guide</a>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full px-3">
                <a href={`/contact?interest=${encodeURIComponent(project.name)}`}>Buyer checks</a>
              </Button>
            )}
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
                Live price
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
      if (filters.channel === "resale" && project.status === "New launch") return false;
      if (filters.channel === "new-booking" && project.status === "Ready to move") return false;
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
        if (a.reviewedOn && !b.reviewedOn) return -1;
        if (!a.reviewedOn && b.reviewedOn) return 1;
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
    filters.sort,
    filters.status,
  ]);

  const selectedProjects = useMemo(() => {
    const selected = new Set(selectedNames);
    return GURGAON_DIRECTORY_PROJECTS.filter((project) => selected.has(project.name));
  }, [selectedNames]);

  function updateFilter<K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisibleCount(PAGE_INCREMENT);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setVisibleCount(PAGE_INCREMENT);
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
    filters.corridor !== "all" ||
    filters.budget !== "all" ||
    filters.bhk !== "all" ||
    filters.status !== "all" ||
    filters.propertyType !== "all" ||
    filters.developer !== "all" ||
    filters.channel !== "all" ||
    filters.minimumArea !== "" ||
    filters.maximumArea !== "" ||
    filters.nriSupport ||
    filters.loanSupport;

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
                  {corridor}
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
            <span className="sr-only">Select resale or new booking</span>
            <select
              value={filters.channel}
              onChange={(event) => updateFilter("channel", event.target.value as ChannelFilter)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">Resale and new booking</option>
              <option value="resale">Resale opportunities</option>
              <option value="new-booking">New booking opportunities</option>
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

          <label>
            <span className="sr-only">Sort projects</span>
            <select
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value as SortOption)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="featured">Featured and relevant</option>
              <option value="recent">Recently price-reviewed</option>
              <option value="price">Lowest indicative entry</option>
              <option value="size">Smallest published size</option>
              <option value="possession">Possession status</option>
              <option value="name">Project name A–Z</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-4 md:col-span-2 lg:col-span-3">
            <label className="flex min-h-11 items-center gap-2 rounded-md border border-input px-3 text-sm">
              <input
                type="checkbox"
                checked={filters.nriSupport}
                onChange={(event) => updateFilter("nriSupport", event.target.checked)}
                className="size-4 accent-[var(--gold)]"
              />
              NRI remote-buying support
            </label>
            <label className="flex min-h-11 items-center gap-2 rounded-md border border-input px-3 text-sm">
              <input
                type="checkbox"
                checked={filters.loanSupport}
                onChange={(event) => updateFilter("loanSupport", event.target.checked)}
                className="size-4 accent-[var(--gold)]"
              />
              Home-loan assistance
            </label>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          NRI and loan filters identify advisory support, not legal suitability, lender approval or
          a guaranteed loan sanction.
        </p>

        {hasFilters ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {filters.query ? <Badge variant="secondary">Search: {filters.query}</Badge> : null}
            {filters.corridor !== "all" ? (
              <Badge variant="secondary">{filters.corridor}</Badge>
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
            {filters.nriSupport ? <Badge variant="secondary">NRI support</Badge> : null}
            {filters.loanSupport ? <Badge variant="secondary">Loan assistance</Badge> : null}
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
              Reset all filters
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
            <Button type="button" variant="goldOutline" className="mt-5" onClick={resetFilters}>
              Show all projects
            </Button>
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
      </div>
    </div>
  );
}
