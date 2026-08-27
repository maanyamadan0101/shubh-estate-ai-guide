// Use the canonical production host everywhere. The apex domain redirects to www, so emitting www URLs avoids redirect hops and duplicate URL signals.
export const SITE_ORIGIN = "https://www.shubhestatebroker.in";
export const SEO_TITLE_MAX = 60;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
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
  floorNumber?: number | null;
  facing?: string | null;
  description?: string | null;
};

function parts(s: SeoSource) {
  const type = PROPERTY_TYPE_LABEL[s.propertyType ?? ""] ?? "Property";
  const place = [s.sector, s.locality].filter(Boolean).join(", ");
  const city = s.city || "Gurugram";
  const searchCity = /gurugram/i.test(city) ? "Gurgaon" : city;
  return { type, place, city, searchCity };
}

export function stripInternalListingReference(value: string): string {
  return value
    .replace(/\s*[|–—-]\s*SEB-[A-Z0-9-]+\b/gi, "")
    .replace(/\bRef(?:erence)?\s*:?[ ]*SEB-[A-Z0-9-]+\.?/gi, "")
    .replace(/\bSEB-[A-Z0-9-]+\b/gi, "")
    .replace(/\s+([,.;:|])/g, "$1")
    .replace(/\|\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function wordSafeText(value: string, maxLength: number): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;

  const candidate = compact.slice(0, Math.max(1, maxLength - 1));
  const lastSpace = candidate.lastIndexOf(" ");
  const safe = lastSpace > Math.max(20, maxLength - 30) ? candidate.slice(0, lastSpace) : candidate;
  return `${safe.replace(/[,:;\-–—|]+$/g, "").trim()}…`;
}

/**
 * Keeps title tags within a conservative crawler-friendly length without
 * ending them with an ellipsis. Google does not mandate a character count,
 * but this avoids repetitive audit flags while preserving complete words.
 */
export function compactSeoTitle(value: string, maxLength = SEO_TITLE_MAX): string {
  const compact = stripInternalListingReference(value).replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;

  const candidate = compact.slice(0, maxLength);
  const lastSpace = candidate.lastIndexOf(" ");
  const safe = lastSpace > Math.max(28, maxLength - 22) ? candidate.slice(0, lastSpace) : candidate;
  return safe.replace(/[,:;\-–—|]+$/g, "").trim();
}

/**
 * Builds the normal public inventory slug from stable, meaningful attributes.
 * Price is intentionally excluded because asking prices change. New listings
 * should not rely on meaningless -2/-3 collision suffixes; the save layer uses
 * the permanent SEB listing reference only when two genuine units still collide.
 */
export function buildSlug(s: SeoSource): string {
  const { type, searchCity } = parts(s);
  const area = s.areaSqft ? `${Math.round(s.areaSqft)} sq ft` : null;
  const floor = s.floorNumber !== null && s.floorNumber !== undefined ? `${s.floorNumber} floor` : null;
  const facing = s.facing ? `${s.facing} facing` : null;
  return slugify(
    [
      s.projectName || s.title,
      s.sector,
      s.bhk,
      type,
      area,
      floor,
      facing,
      searchCity,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

/**
 * Public property SEO title. Apartment is omitted when the BHK already makes
 * the residential intent clear, while non-apartment property types remain
 * explicit. Internal SEB references are operational identifiers, not search
 * terms, and are intentionally excluded from the title.
 */
export function buildSeoTitle(s: SeoSource): string {
  const { type, searchCity } = parts(s);
  const action = s.listingType === "rent" ? "for Rent" : "for Sale";
  const typeForTitle = type === "Apartment" && s.bhk ? null : type;
  const head = [s.bhk, typeForTitle, action].filter(Boolean).join(" ");
  const project = s.projectName?.trim() || null;
  const sector = s.sector?.trim() || null;

  const candidates = [
    project && sector ? `${head} in ${project}, ${sector} ${searchCity}` : null,
    project && sector ? `${head} in ${project}, ${sector}` : null,
    project ? `${head} in ${project} ${searchCity}` : null,
    sector ? `${head} in ${sector} ${searchCity}` : null,
    `${head} in ${searchCity}`,
  ].filter((value): value is string => Boolean(value));

  return compactSeoTitle(
    candidates.find((value) => stripInternalListingReference(value).length <= SEO_TITLE_MAX) ?? candidates[0],
  );
}

export function buildMetaDescription(s: SeoSource): string {
  const { type, searchCity } = parts(s);
  const listingIntent = s.listingType === "rent" ? "for rent" : "for sale";
  const subject = [s.bhk, type].filter(Boolean).join(" ");
  const location = [s.projectName ? `at ${s.projectName}` : null, s.sector ? `in ${s.sector}, ${searchCity}` : `in ${searchCity}`]
    .filter(Boolean)
    .join(" ");
  const details = [
    s.areaSqft ? formatArea(s.areaSqft) : null,
    s.floorNumber !== null && s.floorNumber !== undefined ? `floor ${s.floorNumber}` : null,
    s.facing ? `${s.facing} facing` : null,
    s.price ? formatINR(s.price) : null,
  ].filter(Boolean);
  const detailText = details.length ? ` ${details.join(" · ")}.` : "";
  return wordSafeText(
    `${subject} ${listingIntent} ${location}.${detailText} View photos, specifications, home-loan assistance and current availability from Shubh Estate Brokers.`
      .replace(/\s+/g, " ")
      .trim(),
    158,
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
  const views = ["property exterior", "living room", "bedroom", "kitchen", "balcony view", "interior view"];
  return `${base} — ${views[index % views.length]}`;
}

export function buildCanonical(slug: string): string {
  return `${SITE_ORIGIN}/property/${slug}`;
}

export function listingReference(id: string): string {
  const compact = id.replace(/-/g, "").toUpperCase();
  return `SEB-${compact.slice(0, 8)}`;
}

export function listingReferenceSlug(id: string): string {
  return listingReference(id).toLowerCase();
}

export function hasLegacyNumericSlugSuffix(slug: string): boolean {
  return /-\d+$/.test(slug);
}
