import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { getVideoWatchPage } from "@/data/video-watch-pages";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/videos/$slug")({
  loader: ({ params }) => {
    const video = getVideoWatchPage(params.slug);
    if (!video) throw notFound();
    return video;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Video unavailable" }, { name: "robots", content: "noindex" }],
      };
    }

    const watchUrl = `${SITE_ORIGIN}/videos/${loaderData.slug}`;
    const contentUrl = `${SITE_ORIGIN}${loaderData.mediaPath}`;
    const thumbnailUrl = `${SITE_ORIGIN}${loaderData.thumbnailPath}`;

    return {
      meta: [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        {
          name: "robots",
          content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
        },
        {
          name: "googlebot",
          content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
        },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "video.other" },
        { property: "og:url", content: watchUrl },
        { property: "og:video", content: contentUrl },
        { property: "og:video:type", content: "video/mp4" },
        { property: "og:image", content: thumbnailUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.title },
        { name: "twitter:description", content: loaderData.description },
      ],
      links: [{ rel: "canonical", href: watchUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "VideoObject",
                "@id": `${watchUrl}#video`,
                name: loaderData.title,
                description: loaderData.description,
                thumbnailUrl,
                uploadDate: loaderData.uploadDate,
                contentUrl,
                url: watchUrl,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: loaderData.projectLabel,
                    item: `${SITE_ORIGIN}${loaderData.projectPath}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Video walkthrough",
                    item: watchUrl,
                  },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: VideoWatchPage,
});

function VideoWatchPage() {
  const video = Route.useLoaderData();

  return (
    <main className="bg-background">
      <section className="border-b border-border bg-muted/20">
        <div className="container-page py-10 md:py-14">
          <a
            href={video.projectPath}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to {video.projectLabel}
          </a>

          <div className="mx-auto mt-8 max-w-5xl">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <PlayCircle className="size-4" aria-hidden="true" />
              Property video
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl text-center font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              {video.title}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-center leading-7 text-muted-foreground">
              {video.description}
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-black shadow-xl">
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.thumbnailPath}
                className="aspect-video w-full bg-black object-contain"
                aria-label={video.title}
              >
                <source src={video.mediaPath} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>

            <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row">
              <div>
                <p className="text-sm font-semibold text-foreground">{video.projectLabel}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open the project or property page for pricing, availability and enquiry options.
                </p>
              </div>
              <a
                href={video.projectPath}
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                View property details <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
