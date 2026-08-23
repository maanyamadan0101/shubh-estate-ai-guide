export type ProjectIdentityInput = {
  title: string;
  sector?: string | null;
  project?: { name?: string | null; slug?: string | null } | null;
};

export type ProjectIdentity = {
  name: string;
  slug: string;
  sector: string | null;
};

const KNOWN_PROJECT_NAMES: Array<{ patterns: string[]; name: string }> = [
  { patterns: ["conscient heritage one", "heritage one conscient"], name: "Conscient Heritage One" },
  { patterns: ["ireo skyon"], name: "Ireo Skyon" },
  { patterns: ["emaar urban oasis"], name: "Emaar Urban Oasis" },
  {
    patterns: ["tata raisina residency", "tata raisena residency", "raisina residency"],
    name: "Tata Raisina Residency",
  },
];

export function slugifyProject(value: string) {
  return value
    .toLocaleLowerCase("en-IN")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function cleanProjectName(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/[,:;|\-–—]+$/g, "")
    .trim();
}

function inferKnownProjectName(title: string) {
  const normalized = title.toLocaleLowerCase("en-IN").replace(/\s+/g, " ");
  return KNOWN_PROJECT_NAMES.find((item) => item.patterns.some((pattern) => normalized.includes(pattern)))?.name ?? null;
}

function inferNameFromTitle(title: string) {
  const compact = title.replace(/\s+/g, " ").trim();

  const saleRent = compact.match(
    /(?:for\s+(?:sale|rent)\s+(?:in|at)|available\s+(?:for\s+)?(?:sale|rent)\s+(?:in|at))\s+(.+?)(?=\s*,?\s*Sector\s+\d+[A-Za-z]?\b|\s*,?\s*(?:Gurgaon|Gurugram)\b|\s+-\s+\d[\d,]*\s*(?:Sq\.?\s*Ft|Sqft|sq\.?\s*ft))/i,
  );
  if (saleRent?.[1]) return cleanProjectName(saleRent[1]);

  const atProject = compact.match(
    /\b(?:in|at)\s+(.+?)(?=\s*,?\s*Sector\s+\d+[A-Za-z]?\b|\s*,?\s*(?:Gurgaon|Gurugram)\b)/i,
  );
  if (atProject?.[1]) return cleanProjectName(atProject[1]);

  const dashProject = compact.match(/^(.+?)\s+[—–-]\s+\d+(?:\.\d+)?\s*BHK\b/i);
  if (dashProject?.[1]) return cleanProjectName(dashProject[1]);

  return null;
}

export function projectIdentityFor(input: ProjectIdentityInput): ProjectIdentity | null {
  const sector = input.sector?.trim() || null;
  const explicitName = input.project?.name?.trim() || null;
  const explicitSlug = input.project?.slug?.trim() || null;
  const inferredName = explicitName ?? inferKnownProjectName(input.title) ?? inferNameFromTitle(input.title);

  if (!inferredName || inferredName.length < 3) return null;

  const generic = new Set([
    "apartment",
    "flat",
    "property",
    "builder floor",
    "villa",
    "plot",
    "gurgaon",
    "gurugram",
  ]);
  if (generic.has(inferredName.toLocaleLowerCase("en-IN"))) return null;

  const base = explicitSlug ? slugifyProject(explicitSlug) : slugifyProject(inferredName);
  if (!base) return null;

  const sectorSlug = sector ? slugifyProject(sector) : "";
  const slug = explicitSlug || !sectorSlug || base.endsWith(sectorSlug) ? base : `${base}-${sectorSlug}`;

  return { name: inferredName, slug, sector };
}

export function corridorPath(locality: string | null | undefined) {
  const value = locality?.toLocaleLowerCase("en-IN") ?? "";
  if (value.includes("dwarka")) return "/locations/dwarka-expressway";
  if (value.includes("golf course extension")) return "/locations/golf-course-extension-road";
  if (value.includes("golf course road")) return "/locations/golf-course-road";
  if (value.includes("southern peripheral") || value.includes("spr")) {
    return "/locations/southern-peripheral-road";
  }
  if (value.includes("sohna")) return "/locations/sohna-road";
  if (value.includes("new gurugram") || value.includes("new gurgaon")) {
    return "/locations/new-gurgaon";
  }
  return "/locations/gurgaon";
}
