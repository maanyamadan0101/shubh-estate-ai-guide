import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { PropertyBulkImporterV2 } from "@/components/admin/PropertyBulkImporterV2";

export const Route = createFileRoute("/_authenticated/admin/import")({
  head: () => ({
    meta: [
      { title: "Import Properties | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ImportPropertiesPage,
});

function ImportPropertiesPage() {
  return (
    <AdminShell
      title="Import Properties"
      subtitle="Upload Excel, preview the rows, and optionally include licensed project images with credit and reuse details."
    >
      <PropertyBulkImporterV2 />
    </AdminShell>
  );
}
