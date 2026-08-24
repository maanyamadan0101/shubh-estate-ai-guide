import { createFileRoute, redirect } from "@tanstack/react-router";

type LegacyPropertySearch = {
  q?: string;
  purpose?: "sale" | "rent";
  status?: "ready_to_move" | "under_construction" | "new_launch";
  page?: number;
};

function legacyQuery(search: LegacyPropertySearch) {
  const query = new URLSearchParams();
  if (search.q) query.set("q", search.q);
  if (search.purpose) query.set("purpose", search.purpose);
  if (search.status) query.set("status", search.status);
  if (search.page && search.page > 1) query.set("page", String(search.page));
  const value = query.toString();
  return value ? `?${value}` : "";
}

export const Route = createFileRoute("/properties")({
  validateSearch: (search: Record<string, unknown>): LegacyPropertySearch => {
    const result: LegacyPropertySearch = {};
    if (typeof search["q"] === "string" && search["q"].trim()) {
      result.q = search["q"].trim().slice(0, 100);
    }
    if (search["purpose"] === "rent" || search["purpose"] === "sale") {
      result.purpose = search["purpose"];
    }
    if (
      search["status"] === "ready_to_move" ||
      search["status"] === "under_construction" ||
      search["status"] === "new_launch"
    ) {
      result.status = search["status"];
    }
    const page = Number(search["page"]);
    if (Number.isInteger(page) && page > 1 && page <= 100) result.page = page;
    return result;
  },
  beforeLoad: ({ search }) => {
    throw redirect({
      href: `/flats-for-sale-in-gurgaon${legacyQuery(search)}`,
      statusCode: 301,
    });
  },
});
