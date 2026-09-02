import { Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Dumbbell,
  ExternalLink,
  Landmark,
  MapPin,
  ShieldCheck,
  Trees,
  Waves,
} from "lucide-react";
import { GURGAON_DIRECTORY_PROJECTS } from "@/data/gurgaon-project-directory";
import { verifiedProjectIntelligenceFor } from "@/data/project-intelligence";
import { corridorPath, projectIdentityFor } from "@/lib/project-hubs";

const AMENITY_ICONS: Array<[RegExp, typeof Building2]> = [
  [/swimming|pool/i, Waves],
  [/gym|fitness|yoga|spa|wellness/i, Dumbbell],
  [/garden|green|landscap|walking|jogging|cycling/i, Trees],
  [/security|gated|cctv|intercom/i, ShieldCheck],
  [/club|hall|lounge|restaurant|cafe|theatre|banquet/i, Landmark],
];

function normalize(value: string | null | undefined) {
  return (value ?? "")
    .toLocaleLowerCase("en-IN")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function directoryProjectFor(input: {
  title: string;
  projectName?: string | null;
  sector?: string | null;
}) {
  const haystack = normalize(`${input.projectName ?? ""} ${input.title}`);
  const normalizedSector = normalize(input.sector);

  const candidates = GURGAON_DIRECTORY_PROJECTS.filter((item) => {
    const aliases = [item.name, ...item.inventoryAliases].map(normalize).filter((alias) => alias.length >= 4);
    return aliases.some((alias) => haystack.includes(alias));
  });

  if (candidates.length <= 1) return candidates[0] ?? null;
  return candidates.find((item) => normalize(item.sector) === normalizedSector) ?? candidates[0] ?? null;
}

function AmenityIcon({ name }: { name: string }) {
  const Icon = AMENITY_ICONS.find(([pattern]) => pattern.test(name))?.[1] ?? CheckCircle2;
  return <Icon className="size-4 text-gold" aria-hidden="true" />;
}

export function ProjectExperience({
  title,
  project,
  locality,
  sector,
}: {
  title: string;
  project?: {
    name: string;
    slug: string;
    description?: string | null;
    rera_number?: string | null;
  } | null;
  locality?: string | null;
  sector?: string | null;
}) {
  const intelligence = verifiedProjectIntelligenceFor({
    title,
    projectName: project?.name,
    projectSlug: project?.slug,
  });
  const directoryProject = directoryProjectFor({
    title,
    projectName: project?.name,
    sector,
  });
  const identity = projectIdentityFor({ title, sector, project });

  if (!intelligence && !directoryProject && !project?.description) return null;

  const projectName = intelligence?.name ?? directoryProject?.name ?? project?.name ?? identity?.name ?? "Project";
  const projectHref = identity ? `/projects/${identity.slug}` : project?.slug ? `/projects/${project.slug}` : null;
  const corridor = intelligence?.corridor ?? directoryProject?.corridor ?? locality;
  const locationHref = corridorPath(corridor);
  const rera = intelligence?.reraNumber ?? project?.rera_number ?? directoryProject?.reraNumber;
  const developer = intelligence?.developer ?? directoryProject?.developer;
  const projectSector = intelligence?.sector ?? directoryProject?.sector ?? sector;
  const projectStatus = intelligence?.status ?? directoryProject?.status;
  const configurations = intelligence?.configurations ?? directoryProject?.configuration;
  const officialSources = intelligence?.officialSourceUrls ?? (directoryProject?.officialSourceUrl ? [directoryProject.officialSourceUrl] : []);
  const reviewedOn = intelligence?.lastVerifiedDate ?? directoryProject?.factReviewedOn ?? null;
  const fallbackDescription = directoryProject
    ? `${directoryProject.name} is a ${directoryProject.status.toLocaleLowerCase("en-IN")} ${directoryProject.propertyType.toLocaleLowerCase("en-IN")} project by ${directoryProject.developer} in ${directoryProject.sector}, Gurugram. The current project directory records ${directoryProject.configuration.toLocaleLowerCase("en-IN")} and places the project in the ${directoryProject.corridor} micro-market. Apartment-specific size, floor, view, furnishing, possession and asking price are shown separately because those details vary by unit.`
    : null;
  const description = intelligence?.projectDescription ?? project?.description ?? fallbackDescription;

  return (
    <div className="space-y-10">
      <section aria-labelledby="about-project">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Project / society experience</p>
            <h2 id="about-project" className="mt-2 font-display text-3xl">
              About {projectName}
            </h2>
          </div>
          {projectHref ? (
            <Link to={projectHref} className="text-sm font-semibold text-gold underline-offset-4 hover:underline">
              View full project guide
            </Link>
          ) : null}
        </div>
        {description ? <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">{description}</p> : null}
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {developer ? <Fact label="Developer" value={developer} /> : null}
          <Fact label="Location" value={[projectSector, corridor].filter(Boolean).join(" · ")} />
          {projectStatus ? <Fact label="Project status" value={projectStatus} /> : null}
          {intelligence?.landArea ? <Fact label="Project scale" value={intelligence.landArea} /> : null}
          {intelligence?.towerFloorSummary ? <Fact label="Towers / floors" value={intelligence.towerFloorSummary} /> : null}
          {configurations ? <Fact label="Project configurations" value={configurations} /> : null}
          {rera ? <Fact label="RERA" value={rera} /> : null}
        </dl>
      </section>

      {intelligence?.amenities.length ? (
        <section aria-labelledby="project-amenities">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Verified resident facilities</p>
          <h2 id="project-amenities" className="mt-2 font-display text-3xl">Project amenities</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            The facilities below are shown as crawlable text and are limited to amenities established from the cited project sources. Unit-specific features are shown separately.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intelligence.amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm">
                <AmenityIcon name={amenity} />
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {intelligence?.highlights.length ? (
        <section aria-labelledby="project-highlights">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Why buyers shortlist the society</p>
          <h2 id="project-highlights" className="mt-2 font-display text-3xl">Project highlights</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {intelligence.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {corridor ? (
        <section aria-labelledby="project-connectivity">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Micro-market context</p>
          <h2 id="project-connectivity" className="mt-2 font-display text-3xl">Location & connectivity</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 font-semibold"><MapPin className="size-4 text-gold" aria-hidden="true" />Road & corridor access</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(intelligence?.roadConnectivity ?? [corridor]).map((item) => <li key={item}>• {item}</li>)}
              </ul>
              <Link to={locationHref} className="mt-4 inline-block text-sm font-semibold text-gold underline-offset-4 hover:underline">
                Explore properties on this corridor
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold">Nearby business & daily-life context</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {[...(intelligence?.businessHubsNearby ?? []), ...(intelligence?.hospitalsNearby ?? []), ...(intelligence?.schoolsNearby ?? []), ...(intelligence?.shoppingNearby ?? [])]
                  .slice(0, 8)
                  .map((item) => <li key={item}>• {item}</li>)}
                {!intelligence?.businessHubsNearby?.length && !intelligence?.hospitalsNearby?.length && !intelligence?.schoolsNearby?.length && !intelligence?.shoppingNearby?.length ? (
                  <li>Sector-specific school, hospital, shopping and business-hub details are added only after source review rather than inferred automatically.</li>
                ) : null}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {officialSources.length ? (
        <section className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Project fact sources</p>
          <p className="mt-1 leading-6">
            {reviewedOn ? `Project-level facts were last reviewed on ${reviewedOn}. ` : ""}
            Current availability, asking price and unit-specific details are confirmed at the time of enquiry.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {officialSources.map((url) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-gold hover:underline">
                Official project source <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium">{value}</dd>
    </div>
  );
}
