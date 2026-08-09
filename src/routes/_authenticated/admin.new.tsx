import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin/AdminShell";
import { EMPTY_PROPERTY, PropertyForm } from "@/components/admin/PropertyForm";
import { listTaxonomy } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/new")({
  head: () => ({
    meta: [
      { title: "Add a Property | Shubh Estate Brokers" },
      { name: "description", content: "Create and publish a new property listing." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NewProperty,
});

function NewProperty() {
  const { data } = useQuery({ queryKey: ["taxonomy"], queryFn: () => listTaxonomy() });

  return (
    <AdminShell title="Add Property" subtitle="Add details, media and description, then preview or publish.">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Manage Content</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Complete the four sections below. You can save a draft at any time and return later to edit it.
          </p>
        </div>
        <PropertyForm initial={EMPTY_PROPERTY} builders={data?.builders ?? []} projects={data?.projects ?? []} />
      </div>
    </AdminShell>
  );
}
