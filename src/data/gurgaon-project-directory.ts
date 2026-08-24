export const PROJECT_PRICE_REVIEW_DATE = "24 Aug 2026";

export const PROJECT_CORRIDORS = [
  "Golf Course Road & Central Luxury",
  "Golf Course Extension Road",
  "Dwarka Expressway",
  "SPR, Sohna Road & South Gurgaon",
  "New Gurgaon",
  "Gwal Pahari & Other Luxury Locations",
] as const;

export type ProjectCorridor = (typeof PROJECT_CORRIDORS)[number];
export type ProjectStatus =
  "Ready to move" | "Under construction" | "New launch" | "Mixed phases" | "Check current phase";
export type ProjectType = "Apartment" | "Builder Floor" | "Villa" | "Mixed";
export type ProjectPriceBasis = "market_sample" | "verified_inventory" | "on_request";
export type ProjectAreaBasis = "carpet_area" | "built_up_area" | "super_area" | "not_stated";
export type ProjectPriceScope =
  "asking_total" | "asking_rate_per_sq_ft" | "builder_basic_price" | "all_inclusive" | "not_stated";
export type ProjectConfidence = "medium" | "verification_pending";
export type ProjectReraCheck = "guide_checked" | "phase_check_required";

export type ConfigurationPriceRange = {
  configuration: string;
  minimumCr: number | null;
  maximumCr: number | null;
  note: string;
};

export type GurgaonDirectoryProject = {
  name: string;
  developer: string;
  sector: string;
  phase?: string;
  corridor: ProjectCorridor;
  configuration: string;
  sizeRange: string;
  propertyType: ProjectType;
  status: ProjectStatus;
  priceLabel: string;
  priceMinCr: number | null;
  priceMaxCr: number | null;
  priceBasis: ProjectPriceBasis;
  pricePerSqFt?: string;
  configurationPriceRanges: readonly ConfigurationPriceRange[];
  sizeMinSqFt: number | null;
  sizeMaxSqFt: number | null;
  areaBasis: ProjectAreaBasis;
  priceScope: ProjectPriceScope;
  reviewedOn: string | null;
  internalSourceRecord: string;
  confidence: ProjectConfidence;
  reraCheck: ProjectReraCheck;
  inventoryAliases: readonly string[];
  href?: string;
  featured?: boolean;
};

type ProjectOptions = Partial<
  Omit<GurgaonDirectoryProject, "name" | "developer" | "sector" | "corridor">
>;

function project(
  name: string,
  developer: string,
  sector: string,
  corridor: ProjectCorridor,
  options: ProjectOptions = {},
): GurgaonDirectoryProject {
  const result: GurgaonDirectoryProject = {
    name,
    developer,
    sector,
    corridor,
    configuration: "Multiple configurations",
    sizeRange: "Confirm current inventory",
    propertyType: "Apartment",
    status: "Check current phase",
    priceLabel: "Price on request",
    priceMinCr: null,
    priceMaxCr: null,
    priceBasis: "on_request",
    configurationPriceRanges: [],
    sizeMinSqFt: null,
    sizeMaxSqFt: null,
    areaBasis: "not_stated",
    priceScope: "not_stated",
    reviewedOn: null,
    internalSourceRecord: "project_seed_pending_live_verification",
    confidence: "verification_pending",
    reraCheck: "phase_check_required",
    inventoryAliases: [name],
    ...options,
  };

  if (result.priceBasis !== "on_request") {
    result.internalSourceRecord =
      options.internalSourceRecord ??
      (result.priceBasis === "verified_inventory"
        ? "shubh_public_inventory_review_2026-08-24"
        : "comparable_market_sample_review_2026-08-24");
    result.confidence = options.confidence ?? "medium";
    result.priceScope =
      options.priceScope ?? (result.pricePerSqFt ? "asking_rate_per_sq_ft" : "asking_total");
  }

  if (result.href && options.reraCheck === undefined) result.reraCheck = "guide_checked";
  return result;
}

function normalizedProjectKey(project: GurgaonDirectoryProject) {
  return [project.name, project.sector, project.phase ?? ""]
    .map((value) =>
      value
        .toLocaleLowerCase("en-IN")
        .replace(/[^a-z0-9]+/g, " ")
        .trim(),
    )
    .join("|");
}

function validateUniqueProjects(projects: GurgaonDirectoryProject[]) {
  const seen = new Set<string>();
  for (const item of projects) {
    const key = normalizedProjectKey(item);
    if (seen.has(key)) throw new Error(`Duplicate Gurgaon project key: ${key}`);
    seen.add(key);
  }
  return projects;
}

const CENTRAL: ProjectCorridor = "Golf Course Road & Central Luxury";
const EXTENSION: ProjectCorridor = "Golf Course Extension Road";
const DWARKA: ProjectCorridor = "Dwarka Expressway";
const SOUTH: ProjectCorridor = "SPR, Sohna Road & South Gurgaon";
const NEW_GURGAON: ProjectCorridor = "New Gurgaon";
const OTHER_LUXURY: ProjectCorridor = "Gwal Pahari & Other Luxury Locations";

// Indicative figures below are deliberately limited to projects with a recent
// Shubh inventory record or a comparable-market sample reviewed on 24 Aug 2026.
// Every other entry stays "Price on request" rather than publishing an old
// launch price as a current buying price.
const SEEDED_GURGAON_PROJECTS: GurgaonDirectoryProject[] = [
  project("DLF The Camellias", "DLF", "Sector 42", CENTRAL, {
    configuration: "4, 5 & 6 BHK residences",
    sizeRange: "Large-format residences",
    status: "Ready to move",
    priceLabel: "Indicative asking range ₹69–73 Cr+*",
    priceMinCr: 69,
    priceMaxCr: 73,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("DLF The Magnolias", "DLF", "Sector 42", CENTRAL, {
    configuration: "4 & 5 BHK residences",
    sizeRange: "Approx. 6,400 sq ft onwards",
    sizeMinSqFt: 6400,
    areaBasis: "super_area",
    status: "Ready to move",
    priceLabel: "Indicative asking range ₹45–69 Cr*",
    priceMinCr: 45,
    priceMaxCr: 69,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("DLF The Aralias", "DLF", "Sector 42", CENTRAL, {
    configuration: "4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF The Dahlias", "DLF", "Sector 54", CENTRAL, {
    configuration: "Ultra-luxury residences",
    status: "Under construction",
  }),
  project("DLF The Crest", "DLF", "Sector 54", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF Park Place", "DLF", "Sector 54", CENTRAL, {
    configuration: "2, 3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF The Belaire", "DLF", "Sector 54", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF The Summit", "DLF", "Sector 54", CENTRAL, {
    configuration: "4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF West Park", "DLF", "Golf Course Road", CENTRAL),
  project("Suncity Platinum Towers", "Suncity", "Sector 28", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Tulip Monsella", "Tulip Infratech", "Sector 53", CENTRAL, {
    configuration: "3, 4 & 5 BHK residences",
    status: "Under construction",
  }),
  project("Godrej Astra", "Godrej Properties", "Sector 54", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Godrej Sora", "Godrej Properties", "Sector 53", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Godrej Samaris", "Godrej Properties", "Sector 53", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Experion One 42", "Experion Developers", "Sector 42", CENTRAL, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("DLF The Grove", "DLF", "DLF Phase 5", CENTRAL, {
    configuration: "4 & 5 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("DLF Signature Residences", "DLF", "DLF Phase 4", CENTRAL, {
    configuration: "4 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("DLF Royale Residences", "DLF", "DLF Phases 1 & 3", CENTRAL, {
    configuration: "4 & 5 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("DLF Imperial Residences", "DLF", "DLF Phases 1, 2 & 3", CENTRAL, {
    configuration: "4 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("Ambience Caitriona", "Ambience Group", "Sector 24", CENTRAL, {
    configuration: "4 & 5 BHK residences",
    status: "Ready to move",
  }),
  project("Ambience Creacions", "Ambience Group", "Sector 22", CENTRAL, {
    configuration: "2–5 BHK residences",
    status: "Ready to move",
  }),

  project("DLF The Arbour", "DLF", "Sector 63", EXTENSION, {
    configuration: "4 BHK + utility residences",
    sizeRange: "Approx. 3,950–3,956 sq ft",
    sizeMinSqFt: 3950,
    sizeMaxSqFt: 3956,
    areaBasis: "super_area",
    status: "Under construction",
    priceLabel: "Indicative asking range ₹10–12 Cr*",
    priceMinCr: 10,
    priceMaxCr: 12,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/projects/dlf-the-arbour-sector-63-gurgaon",
    featured: true,
  }),
  project("TARC Ishva", "TARC", "Sector 63A", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Puri The Aravallis", "Puri Constructions", "Sector 61", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Conscient Hines Elevate", "Conscient & Hines", "Sector 59", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
    priceLabel: "Indicative asking range ₹5.25–8.70 Cr*",
    priceMinCr: 5.25,
    priceMaxCr: 8.7,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Mahindra Luminare", "Mahindra Lifespaces", "Sector 59", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Pioneer Araya", "Pioneer Urban", "Sector 62", EXTENSION, {
    configuration: "3, 4 & 5 BHK residences",
    status: "Ready to move",
  }),
  project("Pioneer Presidia", "Pioneer Urban", "Sector 62", EXTENSION, {
    configuration: "4 & 5 BHK residences",
    status: "Ready to move",
  }),
  project("Pioneer Advait", "Pioneer Urban", "Sector 50", EXTENSION, {
    configuration: "2 BHK + study residences",
    status: "Under construction",
  }),
  project("Ireo Grand Arch", "IREO", "Sector 58", EXTENSION, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
  }),
  project("Ireo Skyon", "IREO", "Sector 60", EXTENSION, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
  }),
  project("Ireo Victory Valley", "IREO", "Sector 67", EXTENSION, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
  }),
  project("Conscient Heritage One", "Conscient", "Sector 62", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Emaar DigiHomes", "Emaar India", "Sector 62", EXTENSION, {
    configuration: "2 & 3 BHK residences",
    status: "Ready to move",
  }),
  project("Emaar Urban Oasis", "Emaar India", "Sector 62", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
    priceLabel: "Contact for current unit-specific price",
    priceBasis: "on_request",
    href: "/projects/emaar-urban-oasis-sector-62",
    featured: true,
  }),
  project("Emaar Emerald Hills", "Emaar India", "Sector 65", EXTENSION, {
    configuration: "Floors, row houses & plots",
    propertyType: "Mixed",
    status: "Ready to move",
    priceLabel: "Featured 4 BHK asking ₹5 Cr*",
    priceMinCr: 5,
    priceMaxCr: 5,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/emaar-emerald-hills-sector-65-gurgaon",
    featured: true,
  }),
  project("Emaar Emerald Floors", "Emaar India", "Sector 65", EXTENSION, {
    configuration: "Independent floors",
    propertyType: "Builder Floor",
    status: "Ready to move",
  }),
  project("Emaar Emerald Floors Premier", "Emaar India", "Sector 65", EXTENSION, {
    configuration: "Premium independent floors",
    propertyType: "Builder Floor",
    status: "Ready to move",
  }),
  project("Emaar Marbella Villas", "Emaar India", "Sector 66", EXTENSION, {
    configuration: "4 & 5 BHK villas",
    propertyType: "Villa",
    status: "Ready to move",
  }),
  project("M3M Golf Estate", "M3M India", "Sector 65", EXTENSION, {
    configuration: "3, 4 & 5 BHK residences",
    status: "Ready to move",
    priceLabel: "Indicative asking range ₹7.50–18.90 Cr*",
    priceMinCr: 7.5,
    priceMaxCr: 18.9,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("M3M Polo Suites", "M3M India", "Sector 65", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("M3M St. Andrews", "M3M India", "Sector 65", EXTENSION, {
    configuration: "4 & 5 BHK residences",
    status: "Ready to move",
  }),
  project("M3M Latitude", "M3M India", "Sector 65", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
    priceLabel: "Indicative asking range ₹5.85–7.45 Cr*",
    priceMinCr: 5.85,
    priceMaxCr: 7.45,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
  }),
  project("M3M Altitude", "M3M India", "Sector 65", EXTENSION, {
    configuration: "4 BHK residences",
    status: "Under construction",
  }),
  project("M3M Heights", "M3M India", "Sector 65", EXTENSION, {
    configuration: "2 & 3 BHK residences",
    status: "Ready to move",
  }),
  project("M3M Skycity", "M3M India", "Sector 65", EXTENSION, {
    configuration: "2 & 3 BHK residences",
    status: "Ready to move",
  }),
  project("M3M Merlin", "M3M India", "Sector 67", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Trump Towers Delhi NCR", "Tribeca & M3M", "Sector 65", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Trump Residences Gurgaon", "Tribeca Developers", "Sector 69", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Smartworld The Edition", "Smartworld Developers", "Sector 66", EXTENSION, {
    configuration: "3.5 & 4.5 BHK residences",
    status: "New launch",
  }),
  project("Birla Navya", "Birla Estates", "Sector 63A", EXTENSION, {
    configuration: "Premium independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("Adani Samsara Arya", "Adani Realty", "Sector 60", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Adani Samsara Ivana", "Adani Realty", "Sector 63", EXTENSION, {
    configuration: "Independent floors",
    propertyType: "Builder Floor",
    status: "Under construction",
  }),
  project("Adani Samsara Avasa", "Adani Realty", "Sector 63", EXTENSION, {
    configuration: "Independent floors",
    propertyType: "Builder Floor",
    status: "Under construction",
  }),
  project("Adani Samsara Vilasa", "Adani Realty", "Sector 63", EXTENSION, {
    configuration: "Independent floors",
    propertyType: "Builder Floor",
    status: "Under construction",
  }),
  project("4S The Aurrum", "4S Developers", "Sector 59", EXTENSION, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),

  project("Elan The Presidential", "Elan Group", "Sector 106", DWARKA, {
    configuration: "3, 4 & 5 BHK residences",
    status: "Under construction",
    priceLabel: "Indicative asking range ₹4.40–14 Cr*",
    priceMinCr: 4.4,
    priceMaxCr: 14,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Elan The Emperor", "Elan Group", "Sector 106", DWARKA, {
    configuration: "4 & 5 BHK residences",
    status: "New launch",
  }),
  project("Sobha City", "Sobha", "Sector 108", DWARKA, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
    priceLabel: "Current featured 4 BHK asking ₹6 Cr*",
    priceMinCr: 6,
    priceMaxCr: 6,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Sobha Vista Residences", "Sobha", "Sector 108", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Mixed phases",
    inventoryAliases: ["Sobha Vista Residences", "Sobha City Vista Residences"],
  }),
  project("Sobha Altus", "Sobha", "Sector 106", DWARKA, {
    configuration: "Studios, 3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Sobha International City", "Sobha", "Sector 109", DWARKA, {
    configuration: "4 & 5 BHK villas",
    propertyType: "Villa",
    status: "Ready to move",
  }),
  project("Puri Diplomatic Residences", "Puri Constructions", "Sector 111", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Puri Diplomatic Greens", "Puri Constructions", "Sectors 110A & 111", DWARKA, {
    configuration: "3 & 4 BHK residences and villas",
    propertyType: "Mixed",
    status: "Ready to move",
  }),
  project("Puri Emerald Bay", "Puri Constructions", "Sector 104", DWARKA, {
    configuration: "2 & 3 BHK residences",
    sizeRange: "Approx. 1,550–2,450 sq ft",
    sizeMinSqFt: 1550,
    sizeMaxSqFt: 2450,
    areaBasis: "super_area",
    status: "Ready to move",
    priceLabel: "Current asking range ₹2.20–3.70 Cr*",
    priceMinCr: 2.2,
    priceMaxCr: 3.7,
    priceBasis: "verified_inventory",
    configurationPriceRanges: [
      { configuration: "2 BHK", minimumCr: 2.2, maximumCr: 2.6, note: "Asking range" },
      { configuration: "3 BHK", minimumCr: 3.45, maximumCr: 3.7, note: "Asking range" },
    ],
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon",
    featured: true,
  }),
  project("ATS Triumph", "ATS Infrastructure", "Sector 104", DWARKA, {
    configuration: "3 & 4 BHK residences",
    sizeRange: "Approx. 2,290–3,150 sq ft",
    sizeMinSqFt: 2290,
    sizeMaxSqFt: 3150,
    areaBasis: "super_area",
    status: "Ready to move",
    priceLabel: "Current asking range ₹3.22–4.30 Cr*",
    priceMinCr: 3.22,
    priceMaxCr: 4.3,
    priceBasis: "verified_inventory",
    configurationPriceRanges: [
      { configuration: "3 BHK", minimumCr: 3.22, maximumCr: 3.3, note: "Asking range" },
      { configuration: "4 BHK", minimumCr: 4.25, maximumCr: 4.3, note: "Asking range" },
    ],
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Godrej Meridien", "Godrej Properties", "Sector 106", DWARKA, {
    configuration: "2, 3 & 4 BHK residences",
    status: "Ready to move",
    priceLabel: "Indicative asking range ₹2.86–6.92 Cr*",
    priceMinCr: 2.86,
    priceMaxCr: 6.92,
    priceBasis: "market_sample",
    configurationPriceRanges: [
      { configuration: "3 BHK", minimumCr: 3.22, maximumCr: 3.45, note: "Shubh sample" },
      { configuration: "4 BHK", minimumCr: 4.35, maximumCr: 4.35, note: "Shubh sample" },
    ],
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Godrej Vrikshya", "Godrej Properties", "Sector 103", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Godrej Summit", "Godrej Properties", "Sector 104", DWARKA, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
    priceLabel: "Current Shubh inventory from ₹1.70 Cr*",
    priceMinCr: 1.7,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
  }),
  project("Hero Homes", "Hero Realty", "Sector 104", DWARKA, {
    configuration: "2–4 BHK residences",
    status: "Mixed phases",
  }),
  project("M3M Crown", "M3M India", "Sector 111", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
    priceLabel: "Current Shubh inventory from ₹2.65 Cr*",
    priceMinCr: 2.65,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
  }),
  project("M3M Capital", "M3M India", "Sector 113", DWARKA, {
    configuration: "2–4 BHK residences",
    status: "Under construction",
  }),
  project("M3M Mansion", "M3M India", "Sector 113", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Smartworld One DXP", "Smartworld Developers", "Sector 113", DWARKA, {
    configuration: "2.5–4.5 BHK residences",
    status: "Under construction",
  }),
  project("Emaar Urban Ascent", "Emaar India", "Sector 112", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Emaar The 88", "Emaar India", "Sector 112", DWARKA, {
    configuration: "2 & 3 BHK residences",
    status: "Under construction",
  }),
  project("Emaar Gurgaon Greens", "Emaar India", "Sector 102", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Emaar Imperial Gardens", "Emaar India", "Sector 102", DWARKA, {
    configuration: "3 BHK + servant residences",
    sizeRange: "Approx. 2,025 sq ft",
    sizeMinSqFt: 2025,
    sizeMaxSqFt: 2025,
    areaBasis: "super_area",
    status: "Ready to move",
    priceLabel: "Current asking range ₹2.40–2.55 Cr*",
    priceMinCr: 2.4,
    priceMaxCr: 2.55,
    priceBasis: "verified_inventory",
    configurationPriceRanges: [
      { configuration: "3 BHK + servant", minimumCr: 2.4, maximumCr: 2.55, note: "Asking range" },
    ],
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Experion Windchants", "Experion Developers", "Sector 112", DWARKA, {
    configuration: "2.5–4.5 BHK residences",
    status: "Ready to move",
  }),
  project("Experion Heartsong", "Experion Developers", "Sector 108", DWARKA, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
  }),
  project("Tata Gurgaon Gateway", "Tata Housing", "Sector 112", DWARKA, {
    configuration: "3 & 3.5 BHK residences",
    status: "Ready to move",
  }),
  project("Adani Oyster Grande", "Adani Realty", "Sector 102", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Conscient Heritage Max", "Conscient", "Sector 102", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("BPTP Amstoria", "BPTP", "Sector 102", DWARKA, {
    configuration: "Floors and villas",
    propertyType: "Mixed",
    status: "Ready to move",
  }),
  project("BPTP Gaia Residences", "BPTP", "Sector 102", DWARKA, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("AIPL Riviera at AIPL LakeCity", "AIPL", "Sector 103", DWARKA, {
    configuration: "3 & 4 BHK residences",
    sizeRange: "Approx. 2,196–3,211 sq ft",
    sizeMinSqFt: 2196,
    sizeMaxSqFt: 3211,
    areaBasis: "super_area",
    status: "New launch",
    priceLabel: "Select resale options around ₹12,000/sq ft*",
    priceMinCr: 2.64,
    priceBasis: "verified_inventory",
    pricePerSqFt: "Approx. ₹12,000/sq ft for select resale options",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/projects/aipl-riviera-resale-sector-103-gurgaon",
    featured: true,
  }),
  project("Satya Levante Residences", "Satya Group", "Sector 104", DWARKA, {
    configuration: "3, 4 & 5 BHK residences",
    status: "New launch",
  }),
  project("Ansals Highland Park", "Ansal Housing", "Sector 103", DWARKA, {
    configuration: "2, 3 & large-format residences",
    sizeRange: "Approx. 1,361–2,670 sq ft",
    status: "Under construction",
    priceLabel: "Current market price from ₹1.04 Cr*",
    priceMinCr: 1.04,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/projects/ansals-highland-park-sector-103-gurgaon",
    featured: true,
  }),
  project("Indiabulls Enigma", "Indiabulls Real Estate", "Sector 110", DWARKA, {
    configuration: "4 BHK + servant residences",
    status: "Ready to move",
  }),
  project("Whiteland Westin Residences", "Whiteland Corporation", "Sector 103", DWARKA, {
    configuration: "Luxury residences",
    status: "New launch",
  }),

  project("DLF Privana South", "DLF", "Sectors 76–77", SOUTH, {
    configuration: "4 BHK residences",
    status: "Under construction",
    priceLabel: "Indicative asking range ₹6.57–6.80 Cr*",
    priceMinCr: 6.57,
    priceMaxCr: 6.8,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("DLF Privana West", "DLF", "Sector 76", SOUTH, {
    configuration: "4 BHK residences",
    status: "Under construction",
  }),
  project("DLF Privana North", "DLF", "Sector 77", SOUTH, {
    configuration: "4 & 5 BHK residences",
    status: "New launch",
    priceLabel: "Indicative entry ₹9.35–9.74 Cr*",
    priceMinCr: 9.35,
    priceMaxCr: 9.74,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
  }),
  project("Whiteland The Aspen", "Whiteland Corporation", "Sector 76", SOUTH, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
    priceLabel: "Indicative asking range ₹3.47–6 Cr*",
    priceMinCr: 3.47,
    priceMaxCr: 6,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Whiteland Blissville", "Whiteland Corporation", "Sector 76", SOUTH, {
    configuration: "3 BHK low-rise homes",
    propertyType: "Builder Floor",
    status: "Ready to move",
  }),
  project("Signature Global Titanium SPR", "Signature Global", "Sector 71", SOUTH, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Signature Global Cloverdale SPR", "Signature Global", "Sector 71", SOUTH, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Tata Primanti", "Tata Housing", "Sector 72", SOUTH, {
    configuration: "3 & 4 BHK residences",
    sizeRange: "Approx. 2,550–3,300 sq ft in current catalogue",
    sizeMinSqFt: 2550,
    sizeMaxSqFt: 3300,
    areaBasis: "super_area",
    status: "Ready to move",
    priceLabel: "Current Shubh inventory ₹5–6 Cr*",
    priceMinCr: 5,
    priceMaxCr: 6,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("DLF Alameda", "DLF", "Sector 73", SOUTH, {
    configuration: "Floors and plotted homes",
    propertyType: "Mixed",
    status: "Mixed phases",
  }),
  project("Godrej Aristocrat", "Godrej Properties", "Sector 49", SOUTH, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Tulip Crimson", "Tulip Infratech", "Sector 70", SOUTH, {
    configuration: "4 BHK residences",
    status: "Under construction",
  }),
  project("Tulip Melrose", "Tulip Infratech", "Sector 70", SOUTH, {
    configuration: "5 BHK residences",
    status: "Under construction",
  }),
  project("Central Park Sky Villas", "Central Park", "Sector 48", SOUTH, {
    configuration: "Luxury sky villas",
    propertyType: "Villa",
    status: "Ready to move",
  }),
  project("Experion The Trillion", "Experion Developers", "Sector 48", SOUTH, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Vatika Sovereign", "Vatika", "Sector 49", SOUTH, {
    configuration: "4 BHK + servant residences",
    status: "Ready to move",
    priceLabel: "Featured seller asking price requires confirmation",
    priceBasis: "on_request",
  }),
  project("Vatika City", "Vatika", "Sector 49", SOUTH, {
    configuration: "Apartments and villas",
    propertyType: "Mixed",
    status: "Ready to move",
  }),
  project("Emaar The Palm Drive", "Emaar India", "Sector 66", SOUTH, {
    configuration: "2–5 BHK residences",
    status: "Ready to move",
  }),
  project("Emaar Palm Terraces Select", "Emaar India", "Sector 66", SOUTH, {
    configuration: "4 BHK residences",
    status: "Ready to move",
  }),
  project("Central Park Flower Valley", "Central Park", "Sohna", SOUTH, {
    configuration: "Apartments, floors and villas",
    propertyType: "Mixed",
    status: "Mixed phases",
  }),

  project("M3M Golf Hills", "M3M India", "Sectors 79 & 79B", NEW_GURGAON, {
    configuration: "2.5, 3.5 & 4.5 BHK residences",
    sizeRange: "Illustrative inventory approx. 1,420–2,685 sq ft",
    sizeMinSqFt: 1420,
    sizeMaxSqFt: 2685,
    areaBasis: "super_area",
    status: "Under construction",
    priceLabel: "Select seller-held units from ₹13,000/sq ft*",
    priceMinCr: 1.85,
    priceBasis: "verified_inventory",
    pricePerSqFt: "From ₹13,000/sq ft for select seller-held units",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/projects/m3m-golf-hills-sector-79-gurgaon",
    featured: true,
  }),
  project("M3M Antalya Hills", "M3M India", "Sector 79", NEW_GURGAON, {
    configuration: "2.5 & 3.5 BHK low-rise homes",
    propertyType: "Builder Floor",
    status: "Under construction",
  }),
  project("Conscient Parq", "Conscient", "Sector 80", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Bestech Altura", "Bestech Group", "Sector 79", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Bestech Park View Grand Spa", "Bestech Group", "Sector 81", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("Bestech Park View Ananda", "Bestech Group", "Sector 81", NEW_GURGAON, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
    priceLabel: "Current Shubh inventory from ₹1.85 Cr*",
    priceMinCr: 1.85,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
  }),
  project("DLF The Primus", "DLF", "Sector 82A", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    sizeRange: "Approx. 1,799–2,576 sq ft",
    sizeMinSqFt: 1799,
    sizeMaxSqFt: 2576,
    areaBasis: "super_area",
    status: "Ready to move",
    priceLabel: "Indicative resale range ₹2.80–4.60 Cr*",
    priceMinCr: 2.8,
    priceMaxCr: 4.6,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    href: "/projects/dlf-the-primus-sector-82a-gurgaon",
    featured: true,
  }),
  project("DLF The Ultima", "DLF", "Sector 81", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF Regal Gardens", "DLF", "Sector 90", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Ready to move",
  }),
  project("DLF Gardencity Enclave", "DLF", "Sector 93", NEW_GURGAON, {
    configuration: "3 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Under construction",
  }),
  project("Godrej 101", "Godrej Properties", "Sector 79", NEW_GURGAON, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
    href: "/godrej-101-sector-79-gurgaon",
  }),
  project("Godrej Air", "Godrej Properties", "Sector 85", NEW_GURGAON, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
    priceLabel: "Current Shubh inventory from ₹3.20 Cr*",
    priceMinCr: 3.2,
    priceBasis: "verified_inventory",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
  }),
  project("Godrej Zenith", "Godrej Properties", "Sector 89", NEW_GURGAON, {
    configuration: "2–4 BHK residences",
    status: "Under construction",
  }),
  project("Suncity Monarch", "Suncity", "Sector 78", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Ashiana Amarah", "Ashiana Housing", "Sector 93", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Mixed phases",
  }),
  project("Emaar Serenity Hills", "Emaar India", "Sector 86", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Signature Global City 79B", "Signature Global", "Sector 79B", NEW_GURGAON, {
    configuration: "2 & 3 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("Signature Global City 93", "Signature Global", "Sector 93", NEW_GURGAON, {
    configuration: "2 & 3 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Mixed phases",
  }),
  project("Signature Global Twin Tower DXP", "Signature Global", "Sector 84", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Signature Global De Luxe DXP", "Signature Global", "Sector 37D", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "Under construction",
  }),
  project("Signature Global Sarvam", "Signature Global", "Sector 37D", NEW_GURGAON, {
    configuration: "2 & 3 BHK residences",
    status: "New launch",
  }),
  project("Signature Global Daxin Vistas", "Signature Global", "Sohna", NEW_GURGAON, {
    configuration: "2 & 3 BHK independent floors",
    propertyType: "Builder Floor",
    status: "Under construction",
  }),
  project("Max Estate 360", "Max Estates", "Sector 36A", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("Max Estate 361", "Max Estates", "Sector 36A", NEW_GURGAON, {
    configuration: "3 & 4 BHK residences",
    status: "New launch",
  }),
  project("The Terraces at Estate 361", "Max Estates", "Sector 36A", NEW_GURGAON, {
    configuration: "1.5 & 2 BHK residences",
    status: "New launch",
  }),
  project("Krisumi Waterfall Residences", "Krisumi Corporation", "Sector 36A", NEW_GURGAON, {
    configuration: "2–4 BHK residences",
    status: "Ready to move",
  }),

  project("Paras Quartier", "Paras Buildtech", "Gwal Pahari", OTHER_LUXURY, {
    configuration: "4 BHK residences",
    status: "Ready to move",
    priceLabel: "Indicative asking range ₹8–11.50 Cr*",
    priceMinCr: 8,
    priceMaxCr: 11.5,
    priceBasis: "market_sample",
    reviewedOn: PROJECT_PRICE_REVIEW_DATE,
    featured: true,
  }),
  project("Paras The Manor", "Paras Buildtech", "Gwal Pahari", OTHER_LUXURY, {
    configuration: "4 BHK residences",
    status: "Under construction",
  }),
  project("Adani Lushlands", "Adani Realty", "Gwal Pahari", OTHER_LUXURY, {
    configuration: "4 & 6 BHK residences",
    status: "Under construction",
  }),
  project("Ireo Gurgaon Hills", "IREO", "Gwal Pahari", OTHER_LUXURY, {
    configuration: "4 & 5 BHK residences",
    status: "Ready to move",
  }),
  project("Central Park Resorts", "Central Park", "Sector 48", OTHER_LUXURY, {
    configuration: "Luxury residences and suites",
    propertyType: "Mixed",
    status: "Ready to move",
  }),
  project("Central Park Belgravia", "Central Park", "Sector 48", OTHER_LUXURY, {
    configuration: "Luxury serviced residences",
    status: "Mixed phases",
  }),
  project("Central Park Bellavista", "Central Park", "Sector 48", OTHER_LUXURY, {
    configuration: "Luxury serviced residences",
    status: "Ready to move",
  }),
  project("Central Park Belaperla", "Central Park", "Sector 48", OTHER_LUXURY, {
    configuration: "Luxury serviced residences",
    status: "Ready to move",
  }),
];

export const GURGAON_DIRECTORY_PROJECTS = validateUniqueProjects(SEEDED_GURGAON_PROJECTS);

export const GURGAON_PROJECT_COUNT = GURGAON_DIRECTORY_PROJECTS.length;
