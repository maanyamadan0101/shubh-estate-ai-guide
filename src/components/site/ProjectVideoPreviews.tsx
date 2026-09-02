import { useRouterState } from "@tanstack/react-router";
import { PROJECT_VIDEO_WATCH_PAGES } from "@/data/video-watch-pages";

export function ProjectVideoPreviews() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const videos = PROJECT_VIDEO_WATCH_PAGES[pathname];

  if (!videos?.length) return null;

  return (
    <section className="border-y border-border bg-muted/30" aria-labelledby="project-video-previews-title">
      <div className="container-page py-14 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">Property videos</p>
          <h2 id="project-video-previews-title" className="mt-3 font-display text-3xl md:text-4xl">
            Walkthrough previews
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Watch our property walkthrough previews here, or open the dedicated video page for a focused viewing experience. Contact Shubh Estate Brokers for current unit availability.
          </p>
        </div>

        <div className={`mt-8 grid gap-6 ${videos.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : "max-w-2xl"}`}>
          {videos.map((video) => (
            <figure key={video.slug} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <video
                controls
                muted
                playsInline
                preload="metadata"
                poster={video.thumbnailPath}
                className="aspect-video w-full bg-black object-cover"
                aria-label={`${video.title} walkthrough preview`}
              >
                <source src={video.mediaPath} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <figcaption className="p-5">
                <h3 className="font-display text-xl">{video.title.split(" | ")[0]}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{video.description}</p>
                <a
                  href={`/videos/${video.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Open dedicated video page
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
