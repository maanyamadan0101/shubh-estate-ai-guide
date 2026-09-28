import { SITE_ORIGIN } from "./seo";

/** Distinct inventory pages keep their own canonical; facets stay excluded. */
export function catalogueIndexing({
  page,
  hasFacet,
  hasError,
  itemCount,
  basePath = "/flats-for-sale-in-gurgaon",
}: {
  page: number;
  hasFacet: boolean;
  hasError: boolean;
  itemCount: number;
  basePath?: string;
}) {
  const base = `${SITE_ORIGIN}${basePath.startsWith("/") ? basePath : `/${basePath}`}`;
  return {
    canonical: !hasFacet && page > 1 ? `${base}?page=${page}` : base,
    noindex: hasFacet || hasError || (page > 1 && itemCount === 0),
  };
}
