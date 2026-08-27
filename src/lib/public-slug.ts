const PUBLIC_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Public SEO slugs must be concrete, lowercase, hyphen-separated values.
 * Route-template tokens such as $slug, :slug or {slug} are intentionally
 * rejected so they can never leak into crawlable links or sitemap entries.
 */
export function isPublicSlug(value: unknown): value is string {
  return typeof value === "string" && PUBLIC_SLUG_PATTERN.test(value.trim());
}
