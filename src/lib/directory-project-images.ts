export type DirectoryProjectImage = {
  src: string;
  alt: string;
  sourceOrganisation: string;
  sourceUrl: string;
  imageType: "project photograph" | "project marketing visual" | "walkthrough still";
  usageBasis: string;
};

const PROJECT_IMAGES: Record<string, DirectoryProjectImage> = {
  "aipl riviera": {
    src: "/projects/aipl-riviera/aipl-riviera-walkthrough-poster.jpg",
    alt: "AIPL Riviera official project walkthrough still",
    sourceOrganisation: "AIPL / Shubh Estate Brokers project media",
    sourceUrl: "/projects/aipl-riviera/aipl-riviera-walkthrough-poster.jpg",
    imageType: "walkthrough still",
    usageBasis: "Project media already supplied and hosted in the Shubh Estate Brokers repository",
  },
  "ansals highland park": {
    src: "/projects/ansals-highland-park/ansals-highland-park-bird-eye.webp",
    alt: "Ansals Highland Park bird's-eye project marketing visual",
    sourceOrganisation: "Shubh Estate Brokers project media",
    sourceUrl: "/projects/ansals-highland-park/ansals-highland-park-bird-eye.webp",
    imageType: "project marketing visual",
    usageBasis: "Project media already supplied and hosted in the Shubh Estate Brokers repository",
  },
  "ireo skyon": {
    src: "/properties/ireo-skyon-2045-sector-60/08-ireo-skyon-landscaped-community-view.webp",
    alt: "Ireo Skyon landscaped residential community in Sector 60 Gurugram",
    sourceOrganisation: "Shubh Estate Brokers listing photography",
    sourceUrl: "/properties/ireo-skyon-2045-sector-60/08-ireo-skyon-landscaped-community-view.webp",
    imageType: "project photograph",
    usageBasis: "Property media already supplied and hosted in the Shubh Estate Brokers repository",
  },
  "puri emerald bay": {
    src: "/properties/puri-emerald-bay-2450/08-puri-emerald-bay-3bhk-balcony-green-view.jpg",
    alt: "Green community view from Puri Emerald Bay in Sector 104 Gurugram",
    sourceOrganisation: "Shubh Estate Brokers listing photography",
    sourceUrl: "/properties/puri-emerald-bay-2450/08-puri-emerald-bay-3bhk-balcony-green-view.jpg",
    imageType: "project photograph",
    usageBasis: "Property media already supplied and hosted in the Shubh Estate Brokers repository",
  },
};

PROJECT_IMAGES["aipl riviera at aipl lakecity"] = PROJECT_IMAGES["aipl riviera"]!;

function normalizeProjectName(value: string) {
  return value
    .toLocaleLowerCase("en-IN")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function directoryProjectImageFor(projectName: string) {
  return PROJECT_IMAGES[normalizeProjectName(projectName)] ?? null;
}

export const DIRECTORY_PROJECT_IMAGE_REGISTER = Object.entries(PROJECT_IMAGES).map(
  ([projectName, image]) => ({ projectName, ...image }),
);
