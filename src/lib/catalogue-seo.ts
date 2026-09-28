import { SITE_ORIGIN } from "./seo";

/** Distinct inventory pages keep their own canonical; facets stay excluded. */
export function catalogueIndexing({
  page,
  hasFacet,
  hasError,
  itemCount,
}: {
  page: number;
  hasFacet: boolean;
  hasError: boolean;
  itemCount: number;
}) {
  const base = `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`;
  return {
    canonical: !hasFacet && page > 1 ? `${base}?page=${page}` : base,
    noindex: hasFacet || hasError || (page > 1 && itemCount === 0),
  };
}
