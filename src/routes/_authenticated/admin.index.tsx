import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapAdmin, listAdminProperties, setPropertyState, type AdminPropertyRow } from "@/lib/admin.functions";
import { formatINR, STATUS_LABEL } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Property Dashboard | Shubh Estate Brokers" },
      { name: "description", content: "Add, edit and publish property listings." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Property Dashboard" },
      { property: "og:description", content: "Add, edit and publish property listings." },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    void bootstrapAdmin().catch(() => undefined);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: () => listAdminProperties(),
  });

  async function toggle(id: string, isPublished: boolean) {
    try {
      await setPropertyState({ data: { id, is_published: !isPublished } });
      toast.success(isPublished ? "Unpublished" : "Published");
      void queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
    } catch {
      toast.error("Could not update this property.");
    }
  }

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Properties</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add a property in five short steps.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/auth" });
            }}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
          <Button asChild variant="gold">
            <Link to="/admin/new">
              <Plus className="size-4" aria-hidden="true" />
              Add property
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? <p className="mt-10 text-sm text-muted-foreground">Loading…</p> : null}
      {error ? (
        <p className="mt-10 rounded-lg border border-border p-6 text-sm text-muted-foreground">
          You don't have publishing access yet. Ask an administrator to grant it.
        </p>
      ) : null}

      <ul className="mt-8 grid gap-3">
        {(data ?? []).map((p: AdminPropertyRow) => (
          <li key={p.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted">
              {p.cover_image_url ? (
                <img src={p.cover_image_url} alt="" className="size-full object-cover" loading="lazy" />
              ) : null}
            </div>
            <div className="min-w-48 flex-1">
              <p className="font-display text-lg">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                {[p.sector, p.locality].filter(Boolean).join(", ")} · {formatINR(Number(p.price))}
              </p>
            </div>
            <Badge variant={p.is_published ? "default" : "secondary"} className="font-normal">
              {p.is_published ? "Published" : "Draft"}
            </Badge>
            <Badge variant="secondary" className="font-normal">
              {STATUS_LABEL[p.status] ?? p.status}
            </Badge>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/admin/$id" params={{ id: p.id }}>Edit</Link>
              </Button>
              <Button size="sm" variant="outline" onClick={() => void toggle(p.id, p.is_published)}>
                {p.is_published ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {data && data.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No properties yet. Click “Add property” to publish your first listing.
        </p>
      ) : null}
    </section>
  );
}
