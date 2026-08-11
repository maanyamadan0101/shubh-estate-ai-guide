export const SITE_ORIGIN = "https://www.shubhestatebroker.in";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function formatINR(value: number | null | undefined): string {
  if (!value || value <= 0) return "Price on request";
  if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  if (value >= 100000) return `₹ ${(value / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
  return `₹ ${value.toLocaleString("en-IN")}`;
}

export function formatArea(value: number | null | undefined): string {
  if (!value) return "—";
  return `${Number(value).toLocaleString("en-IN")} sq.ft.`;
}

export const PROPERTY_TYPE_LABEL: Record<string, string> = {
  apartment: "Apartment",
  builder_floor: "Builder Floor",
  villa: "Villa",
  plot: "Plot",
  commercial: "Commercial",
  office: "Office",
  retail: "Retail",
};

export const STATUS_LABEL: Record<string, string> = {
  ready_to_move: "Ready to Move",
  under_construction: "Under Construction",
  new_launch: "New Launch",
  sold_out: "Sold / Rented",
};

export type SeoSource = {
  title: string;
  bhk?: string | null;
  propertyType?: string | null;
  listingType?: string | null;
  projectName?: string | null;
  builderName?: string | null;
  sector?: string | null;
  locality?: string | null;
  city?: string | null;
  price?: number | null;
  areaSqft?: number | null;
  description?: string | null;
};

function parts(s: SeoSource) {
  const type = PROPERTY_TYPE_LABEL[s.propertyType ?? ""] ?? "Property";
  const place = [s.sector, s.locality].filter(Boolean).join(", ");
  const city = s.city || "Gurugram";
  const searchCity = /gurugram/i.test(city) ? "Gurgaon" : city;
  return { type, place, city, searchCity };
}

export function buildSlug(s: SeoSource): string {
  const { type, searchCity } = parts(s);
  return slugify(
    [s.bhk, s.projectName || s.title, type, s.sector, searchCity].filter(Boolean).join(" "),
  );
}

export function buildSeoTitle(s: SeoSource): string {
  const { type, searchCity } = parts(s);
  const action = s.listingType === "rent" ? "Rent" : "Sale";
  const head = [s.bhk, type, "for", action].filter(Boolean).join(" ");
  const where = [s.projectName, s.sector, searchCity].filter(Boolean).join(", ");
  return `${head} in ${where}`.replace(/\s+/g, " ").trim().slice(0, 68);
}

export function buildMetaDescription(s: SeoSource): string {
  const { type, searchCity } = parts(s);
  const bits = [
    `${s.bhk ?? ""} ${type}`.trim(),
    s.projectName ? `at ${s.projectName}` : null,
    s.sector ? `in ${s.sector}, ${searchCity}` : `in ${searchCity}`,
    s.areaSqft ? `${formatArea(s.areaSqft)}` : null,
    s.price ? `${formatINR(s.price)}` : null,
  ].filter(Boolean);
  return `${bits.join(" · ")}. View property details, location, home-loan assistance and availability from Shubh Estate Brokers, Gurugram.`.slice(
    0,
    160,
  );
}

export function buildOgTitle(s: SeoSource): string {
  const { searchCity } = parts(s);
  return `${s.projectName || s.title} — ${s.bhk ?? ""} ${s.sector ? `${s.sector}, ` : ""}${searchCity}`
    .replace(/\s+/g, " ")
    .trim();
}

export function buildImageAlt(s: SeoSource, index: number): string {
  const { type, searchCity } = parts(s);
  const base = [
    s.bhk,
    type,
    s.projectName ? `at ${s.projectName}` : null,
    s.sector ? `in ${s.sector}, ${searchCity}` : `in ${searchCity}`,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
  const views = [
    "property exterior",
    "living room",
    "bedroom",
    "kitchen",
    "balcony view",
    "interior view",
  ];
  return `${base} — ${views[index % views.length]}`;
}

export function buildCanonical(slug: string): string {
  return `${SITE_ORIGIN}/property/${slug}`;
}
