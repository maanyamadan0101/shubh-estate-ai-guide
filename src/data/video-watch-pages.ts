export type VideoWatchPage = {
  slug: string;
  title: string;
  description: string;
  projectLabel: string;
  projectPath: string;
  mediaPath: string;
  thumbnailPath: string;
  uploadDate: string;
};

function video(
  input: Omit<VideoWatchPage, "thumbnailPath">,
): VideoWatchPage {
  return {
    ...input,
    thumbnailPath: `/video-thumbnails/${input.slug}`,
  };
}

export const VIDEO_WATCH_PAGES: readonly VideoWatchPage[] = [
  video({
    slug: "ansals-highland-park-2-bhk",
    title: "Ansals Highland Park 2 BHK Walkthrough | Sector 103 Gurugram",
    description:
      "Watch a short 2 BHK property walkthrough preview from Ansals Highland Park, Sector 103, Gurugram, near the Dwarka Expressway corridor.",
    projectLabel: "Ansals Highland Park, Sector 103",
    projectPath: "/projects/ansals-highland-park-sector-103-gurgaon",
    mediaPath: "/media/video/ansals-highland-park-2-bhk",
    uploadDate: "2026-08-26T12:13:34+05:30",
  }),
  video({
    slug: "ansals-highland-park-3-bhk",
    title: "Ansals Highland Park 3 BHK Walkthrough | Sector 103 Gurugram",
    description:
      "Watch a short 3 BHK property walkthrough preview from Ansals Highland Park, Sector 103, Gurugram, with project availability available on request.",
    projectLabel: "Ansals Highland Park, Sector 103",
    projectPath: "/projects/ansals-highland-park-sector-103-gurgaon",
    mediaPath: "/media/video/ansals-highland-park-3-bhk",
    uploadDate: "2026-08-26T12:16:54+05:30",
  }),
  video({
    slug: "ansals-highland-park-4-bhk",
    title: "Ansals Highland Park 4 BHK Walkthrough | Sector 103 Gurugram",
    description:
      "Watch a short 4 BHK property walkthrough preview from Ansals Highland Park, Sector 103, Gurugram, and review the project guide for current resale availability.",
    projectLabel: "Ansals Highland Park, Sector 103",
    projectPath: "/projects/ansals-highland-park-sector-103-gurgaon",
    mediaPath: "/media/video/ansals-highland-park-4-bhk",
    uploadDate: "2026-08-26T12:16:15+05:30",
  }),
  video({
    slug: "dlf-the-primus-sector-82a",
    title: "DLF The Primus Walkthrough | Sector 82A Gurugram",
    description:
      "Watch a short property walkthrough preview from DLF The Primus, Sector 82A, Gurugram, and open the project guide for current 3 and 4 BHK resale context.",
    projectLabel: "DLF The Primus, Sector 82A",
    projectPath: "/projects/dlf-the-primus-sector-82a-gurgaon",
    mediaPath: "/media/video/dlf-the-primus-sector-82a",
    uploadDate: "2026-08-26T12:15:18+05:30",
  }),
  video({
    slug: "dlf-skycourt-sector-86",
    title: "DLF Skycourt Walkthrough | Sector 86 Gurugram",
    description:
      "Watch a short property walkthrough preview from DLF Skycourt, Sector 86, Gurugram, and review the dedicated project page for current market information.",
    projectLabel: "DLF Skycourt, Sector 86",
    projectPath: "/dlf-skycourt-sector-86-gurgaon",
    mediaPath: "/media/video/dlf-skycourt-sector-86",
    uploadDate: "2026-08-26T12:15:42+05:30",
  }),
  video({
    slug: "aipl-riviera-sector-103",
    title: "AIPL Riviera Walkthrough | Sector 103 Gurugram",
    description:
      "Watch the AIPL Riviera property walkthrough for Sector 103, Gurugram, and open the project guide for current resale availability and pricing context.",
    projectLabel: "AIPL Riviera, Sector 103",
    projectPath: "/projects/aipl-riviera-resale-sector-103-gurgaon",
    mediaPath: "/projects/aipl-riviera/aipl-riviera-sector-103-walkthrough.mp4",
    uploadDate: "2026-08-24T16:12:20+05:30",
  }),
  video({
    slug: "puri-emerald-bay-3-bhk-sector-104",
    title: "Puri Emerald Bay 3 BHK Walkthrough | Sector 104 Gurugram",
    description:
      "Watch the 3 BHK apartment walkthrough from Puri Emerald Bay, Sector 104, Gurugram, and open the property page for the published listing details.",
    projectLabel: "Puri Emerald Bay, Sector 104",
    projectPath: "/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon",
    mediaPath: "/properties/puri-emerald-bay-2450/puri-emerald-bay-3bhk-walkthrough.mp4",
    uploadDate: "2026-08-20T18:34:26+05:30",
  }),
] as const;

export function getVideoWatchPage(slug: string) {
  return VIDEO_WATCH_PAGES.find((item) => item.slug === slug) ?? null;
}

export const PROJECT_VIDEO_WATCH_PAGES: Record<string, readonly VideoWatchPage[]> = {
  "/projects/ansals-highland-park-sector-103-gurgaon": VIDEO_WATCH_PAGES.filter((video) =>
    video.slug.startsWith("ansals-highland-park-"),
  ),
  "/projects/dlf-the-primus-sector-82a-gurgaon": VIDEO_WATCH_PAGES.filter(
    (video) => video.slug === "dlf-the-primus-sector-82a",
  ),
  "/dlf-skycourt-sector-86-gurgaon": VIDEO_WATCH_PAGES.filter(
    (video) => video.slug === "dlf-skycourt-sector-86",
  ),
};
