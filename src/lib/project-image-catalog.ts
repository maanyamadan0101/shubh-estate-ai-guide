import { encodeProjectImageAlt } from "@/lib/project-image";

export type RepresentativeProjectImage = {
  url: string;
  altText: string;
  credit: string;
  license: string;
  sourceUrl: string;
};

const CATALOG: Array<{ matches: string[]; image: RepresentativeProjectImage }> = [
  {
    matches: ["ireo skyon"],
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ireo%20Skyon%20Gurugram.jpg",
      altText: encodeProjectImageAlt({
        description: "Ireo Skyon residential project in Gurugram — representative project image",
        credit: "Manoharhd",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ireo_Skyon_Gurugram.jpg",
      }),
      credit: "Manoharhd",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ireo_Skyon_Gurugram.jpg",
    },
  },
  {
    matches: ["suncity essel towers", "essel towers"],
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Apartmentingurgaon.JPG",
      altText: encodeProjectImageAlt({
        description: "Essel Towers in Gurgaon — representative project image",
        credit: "Deepak",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Apartmentingurgaon.JPG",
      }),
      credit: "Deepak",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Apartmentingurgaon.JPG",
    },
  },
];

export function representativeProjectImageFor(title: string | null | undefined): RepresentativeProjectImage | null {
  const text = (title ?? "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return null;
  return CATALOG.find((entry) => entry.matches.some((match) => text.includes(match)))?.image ?? null;
}
