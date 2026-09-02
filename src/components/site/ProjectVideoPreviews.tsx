import { useRouterState } from "@tanstack/react-router";
import { SitewidePropertyContext } from "@/components/site/SitewidePropertyContext";
import { ANSALS_HIGHLAND_2BHK_PREVIEW } from "@/data/video-previews/ansals-highland-2bhk";
import { ANSALS_HIGHLAND_3BHK_PREVIEW } from "@/data/video-previews/ansals-highland-3bhk";
import { ANSALS_HIGHLAND_4BHK_PREVIEW } from "@/data/video-previews/ansals-highland-4bhk";
import { DLF_PRIMUS_PREVIEW } from "@/data/video-previews/dlf-primus";
import { DLF_SKYCOURT_PREVIEW } from "@/data/video-previews/dlf-skycourt";

type VideoPreview = {
  title: string;
  description: string;
  src: string;
};

const PROJECT_VIDEOS: Record<string, readonly VideoPreview[]> = {
  "/projects/ansals-highland-park-sector-103-gurgaon": [
    {
      title: "Ansals Highland Park - 2 BHK",
      description: "Short walkthrough preview from the 2 BHK property video.",
      src: ANSALS_HIGHLAND_2BHK_PREVIEW,
    },
    {
      title: "Ansals Highland Park - 3 BHK",
      description: "Short walkthrough preview from the 3 BHK property video.",
      src: ANSALS_HIGHLAND_3BHK_PREVIEW,
    },
    {
      title: "Ansals Highland Park - 4 BHK",
      description: "Short walkthrough preview from the 4 BHK property video.",
      src: ANSALS_HIGHLAND_4BHK_PREVIEW,
    },
  ],
  "/projects/dlf-the-primus-sector-82a-gurgaon": [
    {
      title: "DLF The Primus - Sector 82A",
      description: "Short walkthrough preview from the available DLF The Primus property video.",
      src: DLF_PRIMUS_PREVIEW,
    },
  ],
  "/dlf-skycourt-sector-86-gurgaon": [
    {
      title: "DLF Skycourt - Sector 86",
      description: "Short walkthrough preview from the available DLF Skycourt property video.",
      src: DLF_SKYCOURT_PREVIEW,
    },
  ],
};

export function ProjectVideoPreviews() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const videos = PROJECT_VIDEOS[pathname];
  const hiddenRoute =
    pathname.startsWith("/admin") ||
    pathname === "/auth" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/whatsapp";

  if (hiddenRoute) return null;

  if (!videos?.length) return <SitewidePropertyContext />;

  return (
    <>
      <section className="border-y border-border bg-muted/30" aria-labelledby="project-video-previews-title">
        <div className="container-page py-14 md:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">Property videos</p>
            <h2 id="project-video-previews-title" className="mt-3 font-display text-3xl md:text-4xl">
              Walkthrough previews
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              These are lightweight web previews prepared from Shubh Estate Brokers' original property walkthroughs. Contact us for the full walkthrough and current unit availability.
            </p>
          </div>

          <div className={`mt-8 grid gap-6 ${videos.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : "max-w-2xl"}`}>
            {videos.map((video) => (
              <figure key={video.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-black object-cover"
                  aria-label={`${video.title} walkthrough preview`}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
                <figcaption className="p-5">
                  <h3 className="font-display text-xl">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{video.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <SitewidePropertyContext />
    </>
  );
}
