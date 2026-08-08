import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { EMPTY_PROPERTY, PropertyForm } from "@/components/admin/PropertyForm";
import { listTaxonomy } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/new")({
  head: () => ({
    meta: [
      { title: "Add a Property | Shubh Estate Brokers" },
      { name: "description", content: "Publish a new property listing in five steps." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Add a Property" },
      { property: "og:description", content: "Publish a new property listing in five steps." },
    ],
  }),
  component: NewProperty,
});

function NewProperty() {
  const { data } = useQuery({ queryKey: ["taxonomy"], queryFn: () => listTaxonomy() });

  return (
    <section className="container-page py-12">
      <Link to="/admin" className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
        ← Back to properties
      </Link>
      <h1 className="mt-4 font-display text-3xl">Add a property</h1>
      <p className="mt-1 text-sm text-muted-foreground">Five short steps. Everything can be edited later.</p>
      <div className="mt-8">
        <PropertyForm initial={EMPTY_PROPERTY} builders={data?.builders ?? []} projects={data?.projects ?? []} />
      </div>
    </section>
  );
}
