import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Images, Video } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listAdminMedia } from "@/lib/admin.portal.functions";

export const Route = createFileRoute("/_authenticated/admin/media")({
  head: () => ({
    meta: [
      { title: "Photos & Videos | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-media"],
    queryFn: () => listAdminMedia(),
  });

  const images = data?.images ?? [];
  const videos = data?.videos ?? [];

  return (
    <AdminShell title="Photos & Videos" subtitle="Browse media already attached to your property listings.">
      <div className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-2">
          <MediaStat icon={Images} label="Property photos" value={images.length} />
          <MediaStat icon={Video} label="Property videos" value={videos.length} />
        </section>

        {isLoading ? <p className="text-sm text-muted-foreground">Loading media…</p> : null}
        {error ? <p className="text-sm text-destructive">Could not load media library.</p> : null}

        {!isLoading && !error ? (
          <>
            <section>
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Media Library</p>
                  <h2 className="mt-1 font-display text-2xl">Property Photos</h2>
                </div>
              </div>
              {images.length ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {images.map((image) => (
                    <article key={image.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                      <div className="aspect-[4/3] bg-muted">
                        <img src={image.image_url} alt={image.alt_text ?? image.property?.title ?? "Property photo"} className="size-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="min-w-0 flex-1 truncate text-sm font-medium">{image.property?.title ?? "Property"}</p>
                          {image.is_primary ? <Badge className="font-normal">Cover</Badge> : null}
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{image.alt_text || "No image description"}</p>
                        <Button asChild size="sm" variant="outline" className="mt-4">
                          <a href={`/admin/${image.property_id}`}>Edit Listing</a>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No property photos uploaded yet.</p>
              )}
            </section>

            <section>
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Media Library</p>
                <h2 className="mt-1 font-display text-2xl">Property Videos</h2>
              </div>
              {videos.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {videos.map((video) => {
                    const uploaded = video.feature_name.startsWith("/api/public/img/");
                    return (
                      <article key={video.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                        {uploaded ? (
                          <video src={video.feature_name} controls preload="metadata" className="aspect-video w-full bg-black object-contain" />
                        ) : (
                          <div className="flex aspect-video items-center justify-center bg-muted p-6 text-center">
                            <div>
                              <Video className="mx-auto size-8 text-gold" aria-hidden="true" />
                              <p className="mt-3 break-all text-xs text-muted-foreground">{video.feature_name}</p>
                            </div>
                          </div>
                        )}
                        <div className="p-4">
                          <p className="truncate text-sm font-medium">{video.property?.title ?? "Property video"}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {!uploaded ? (
                              <Button asChild size="sm" variant="outline">
                                <a href={video.feature_name} target="_blank" rel="noreferrer">Open Video</a>
                              </Button>
                            ) : null}
                            <Button asChild size="sm" variant="outline">
                              <a href={`/admin/${video.property_id}`}>Edit Listing</a>
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No property videos added yet.</p>
              )}
            </section>
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}

function MediaStat({ icon: Icon, label, value }: { icon: typeof Images; label: string; value: number }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold"><Icon className="size-5" aria-hidden="true" /></div>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl">{value}</p>
      </div>
    </div>
  );
}
