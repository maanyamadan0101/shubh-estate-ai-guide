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
  { patterns: ["emaar emerald estate"], name: "Emaar Emerald Estate" },
  { patterns: ["emaar emerald hills"], name: "Emaar Emerald Hills" },
  { patterns: ["emaar mgf palm hills", "emaar palm hills"], name: "Emaar MGF Palm Hills" },
  { patterns: ["puri emerald bay"], name: "Puri Emerald Bay" },
  { patterns: ["pareena micasa", "pareena mi casa"], name: "Pareena MiCasa" },
  { patterns: ["residency grand"], name: "Residency Grand" },
  { patterns: ["vatika sovereign"], name: "Vatika Sovereign" },
  { patterns: ["m3m merlin"], name: "M3M Merlin" },
  { patterns: ["m3m golf hills"], name: "M3M Golf Hills" },
  { patterns: ["m3m crown"], name: "M3M Crown" },
  { patterns: ["m3m capital"], name: "M3M Capital" },
  { patterns: ["m3m antalya hills"], name: "M3M Antalya Hills" },
  { patterns: ["dlf the arbour", "dlf arbour"], name: "DLF The Arbour" },
  { patterns: ["dlf the primus", "dlf primus"], name: "DLF The Primus" },
  { patterns: ["dlf the skycourt", "dlf skycourt"], name: "DLF The Skycourt" },
  { patterns: ["dlf express greens"], name: "DLF Express Greens" },
  { patterns: ["godrej 101"], name: "Godrej 101" },
  { patterns: ["godrej air"], name: "Godrej Air" },
  { patterns: ["godrej summit"], name: "Godrej Summit" },
  { patterns: ["godrej zenith"], name: "Godrej Zenith" },
  { patterns: ["whiteland the aspen", "the aspen whiteland"], name: "Whiteland The Aspen" },
  { patterns: ["whiteland blissville"], name: "Whiteland Blissville" },
  { patterns: ["sobha city"], name: "Sobha City" },
  { patterns: ["tata primanti"], name: "Tata Primanti" },
  { patterns: ["tulip melrose"], name: "Tulip Melrose" },
  { patterns: ["vatika city acacia"], name: "Vatika City Acacia" },
  { patterns: ["microtek greenburg"], name: "Microtek Greenburg" },
  { patterns: ["bestech park view ananda"], name: "Bestech Park View Ananda" },
  { patterns: ["signature global city 79b"], name: "Signature Global City 79B" },
  { patterns: ["signature global city 81"], name: "Signature Global City 81" },
  { patterns: ["signature global city 63a"], name: "Signature Global City 63A" },
  { patterns: ["signature global daxin vistas", "daxin vistas"], name: "Signature Global Daxin Vistas" },
  { patterns: ["mapsko casa bella"], name: "Mapsko Casa Bella" },
  { patterns: ["mapsko royale ville"], name: "Mapsko Royale Ville" },
  { patterns: ["green court"], name: "Green Court" },
  { patterns: ["lotus homz"], name: "Lotus Homz" },
  { patterns: ["pivotal paradise"], name: "Pivotal Paradise" },
  { patterns: ["cosmos express 99"], name: "Cosmos Express 99" },
  { patterns: ["shree vardhman flora"], name: "Shree Vardhman Flora" },
  { patterns: ["ansal highland park", "ansals highland park"], name: "Ansals Highland Park" },
  { patterns: ["aipl riviera", "riviera at aipl lakecity", "riviera at aipl lake city"], name: "AIPL Riviera" },
  {
    patterns: ["tata raisina residency", "tata raisena residency", "raisina residency"],
    name: "Tata Raisina Residency",
  },
];

export const DEDICATED_PROJECT_GUIDES: Record<string, string> = {
  "dlf-skycourt": "/dlf-skycourt-sector-86-gurgaon",
  "dlf-the-skycourt": "/dlf-skycourt-sector-86-gurgaon",
  "dlf-the-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101": "/godrej-101-sector-79-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
  "dlf-the-arbour": "/projects/dlf-the-arbour-sector-63-gurgaon",
  "dlf-the-arbour-sector-63": "/projects/dlf-the-arbour-sector-63-gurgaon",
  "dlf-the-primus": "/projects/dlf-the-primus-sector-82a-gurgaon",
  "dlf-the-primus-sector-82a": "/projects/dlf-the-primus-sector-82a-gurgaon",
  "m3m-golf-hills": "/projects/m3m-golf-hills-sector-79-gurgaon",
  "m3m-golf-hills-sector-79": "/projects/m3m-golf-hills-sector-79-gurgaon",
  "aipl-riviera": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "aipl-riviera-sector-103": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "riviera-at-aipl-lake-city": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "riviera-at-aipl-lakecity": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "ansal-highland-park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansals-highland-park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansal-highland-park-sector-103": "/projects/ansals-highland-park-sector-103-gurgaon",
  "ansals-highland-park-sector-103": "/projects/ansals-highland-park-sector-103-gurgaon",
  "emaar-urban-oasis": "/projects/emaar-urban-oasis-sector-62",
  "emaar-urban-oasis-sector-62": "/projects/emaar-urban-oasis-sector-62",
  "emaar-emerald-estate": "/projects/emaar-emerald-estate-sector-65-gurgaon",
  "emaar-emerald-estate-sector-65": "/projects/emaar-emerald-estate-sector-65-gurgaon",
  "tata-raisina-residency": "/projects/tata-raisina-residency-sector-59",
  "tata-raisina-residency-sector-59": "/projects/tata-raisina-residency-sector-59",
  "godrej-sora": "/projects/godrej-sora-sector-53-gurgaon",
  "godrej-sora-sector-53": "/projects/godrej-sora-sector-53-gurgaon",
};

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

export function projectGuideHref(identity: ProjectIdentity | null | undefined) {
  if (!identity) return null;
  return DEDICATED_PROJECT_GUIDES[identity.slug] ?? `/projects/${identity.slug}`;
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
