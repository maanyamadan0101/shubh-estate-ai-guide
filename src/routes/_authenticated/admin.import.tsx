import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { PropertyBulkImporter } from "@/components/admin/PropertyBulkImporter";

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
      subtitle="Upload the Shubh Estate Excel template, preview the rows and publish them to the website."
    >
      <PropertyBulkImporter />
    </AdminShell>
  );
}
