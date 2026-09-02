export type VerifiedProjectIntelligence = {
  name: string;
  aliases: readonly string[];
  developer: string;
  sector: string;
  corridor: string;
  status?: string;
  reraNumber?: string;
  landArea?: string;
  towerFloorSummary?: string;
  configurations?: string;
  projectDescription: string;
  amenities: readonly string[];
  highlights: readonly string[];
  roadConnectivity?: readonly string[];
  businessHubsNearby?: readonly string[];
  schoolsNearby?: readonly string[];
  hospitalsNearby?: readonly string[];
  shoppingNearby?: readonly string[];
  officialSourceUrls: readonly string[];
  lastVerifiedDate: string;
};

const VERIFIED_PROJECTS: readonly VerifiedProjectIntelligence[] = [
  {
    name: "ATS Triumph",
    aliases: ["ats triumph", "ats triumph sector 104"],
    developer: "ATS / Great Value HPL Infratech",
    sector: "Sector 104",
    corridor: "Dwarka Expressway",
    status: "Ready to move",
    configurations: "Residential apartments; unit configuration varies by inventory",
    projectDescription:
      "ATS Triumph is an established gated residential development in Sector 104, Gurugram, on the Dwarka Expressway corridor. The project is positioned around landscaped open areas, a resident clubhouse and recreation facilities, making it relevant for families who want a ready residential community with direct access to the expressway corridor. Individual apartments differ by tower, floor, view, size, condition and asking price, so those unit-specific details remain separate from the shared project information.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Sports Courts",
      "Kids' Play Area",
      "Landscaped Greens",
      "Banquet / Party Hall",
      "24x7 Security",
      "Power Backup",
      "Gated Community",
    ],
    highlights: [
      "Ready-to-move gated residential community",
      "Clubhouse, swimming pool and gymnasium",
      "Landscaped podium greens and open areas",
      "Sports and children's recreation facilities",
      "Dwarka Expressway address in Sector 104",
    ],
    roadConnectivity: ["Dwarka Expressway", "Delhi-Gurugram road network", "NH-48 connectivity via the wider corridor"],
    businessHubsNearby: ["Udyog Vihar", "Cyber City / Cyber Hub via the Delhi-Gurugram road network"],
    officialSourceUrls: ["https://www.atsgreens.com/projects/ats-triumph/"],
    lastVerifiedDate: "2026-09-02",
  },
  {
    name: "Hero Homes Gurugram",
    aliases: ["hero homes", "hero homes gurugram", "hero homes sector 104"],
    developer: "Hero Realty",
    sector: "Sector 104",
    corridor: "Dwarka Expressway",
    configurations: "2 & 3 BHK residences",
    projectDescription:
      "Hero Homes Gurugram is a Sector 104 residential community on Dwarka Expressway by Hero Realty. The developer describes the project around wellness-focused planning, pedestrian-friendly ground areas, themed and healing gardens and a broad recreation programme. It is suited to buyers who value a gated community with sports, fitness, social spaces and daily-life amenities while remaining connected to the Dwarka Expressway growth corridor.",
    amenities: [
      "Gymnasium",
      "Squash Court",
      "Tennis Court",
      "Indoor Badminton Courts",
      "Jogging & Cycling Track",
      "Cricket Pitch",
      "Yoga & Meditation Area",
      "Indoor & Outdoor Banquet Facilities",
      "Kids' Recreation Areas",
      "Pet Zone",
      "Restaurant",
      "Cafe",
      "Landscaped Gardens",
      "Security",
    ],
    highlights: [
      "Sector 104 location on Dwarka Expressway",
      "50+ developer-listed lifestyle and wellness amenities",
      "Sports courts and fitness facilities",
      "Landscaped and wellness-oriented open spaces",
      "2 & 3 BHK residential configuration mix",
    ],
    roadConnectivity: ["Dwarka Expressway"],
    businessHubsNearby: ["Udyog Vihar", "Cyber Hub"],
    hospitalsNearby: ["Major Gurugram hospitals are accessible through the city road network"],
    shoppingNearby: ["Cyber Hub and retail destinations across Gurugram"],
    officialSourceUrls: ["https://www.herohomes.in/projects/apartments/gurugram-haryana/gurugram-by-hero-homes"],
    lastVerifiedDate: "2026-09-02",
  },
  {
    name: "Sobha City",
    aliases: ["sobha city", "sobha city gurgaon"],
    developer: "SOBHA Limited",
    sector: "Sector 108",
    corridor: "Dwarka Expressway",
    landArea: "Approx. 39 acres",
    configurations: "2 & 3 BHK residences",
    towerFloorSummary: "Residential towers with approximately 18–24 floors, depending on tower",
    projectDescription:
      "SOBHA City is a large-format residential development in Sector 108, Gurugram, close to the Dwarka Expressway corridor. The official project information describes a 39-acre development with extensive green and recreation areas, two clubhouses and a strong sports programme. Its scale, open-space planning, covered parking, visitor parking and community facilities make it relevant to end users comparing established gated communities in this part of Gurugram.",
    amenities: [
      "Two Clubhouses",
      "Olympic-size Swimming Pool",
      "Gym / Fitness Facilities",
      "Cricket Ground",
      "Tennis Courts",
      "Basketball Court",
      "Volleyball Court",
      "Indoor Badminton Courts",
      "Walking & Biking Trail",
      "Landscaped Green Spaces",
      "Convenience Retail",
      "Covered Parking",
      "Visitor Parking",
      "Intercom Security",
      "Power Backup",
    ],
    highlights: [
      "Approx. 39-acre residential development",
      "Two clubhouses spread over about 40,000 sq ft",
      "Olympic-size pool and resort-style lakelet",
      "Extensive sports facilities and cricket ground",
      "Large green/open-space component",
    ],
    roadConnectivity: ["Dwarka Expressway / Upper Dwarka Expressway corridor"],
    officialSourceUrls: ["https://www.sobha.com/sobha-city-gurgaon/", "https://citygurgaon.sobha.com/"],
    lastVerifiedDate: "2026-09-02",
  },
  {
    name: "Krisumi Waterfall Residences",
    aliases: ["krisumi waterfall residences", "waterfall residences", "krisumi waterfall"],
    developer: "Krisumi Corporation (Sumitomo Corporation × Krishna Group JV)",
    sector: "Sector 36A",
    corridor: "Dwarka Expressway / New Gurugram",
    reraNumber: "RC/REP/HARERA/GGM/2018/03",
    landArea: "Approx. 5.43 acres for Waterfall Residences",
    configurations: "2, 3 & 4 BHK residences",
    projectDescription:
      "Waterfall Residences is Krisumi Corporation's Japanese-influenced residential development in Sector 36A, Gurugram. The project combines landscaped areas with a substantial resident clubhouse and a mix of recreation, wellness and convenience facilities. Official project material identifies round-the-clock security, power backup, swimming pools, parking and clubhouse facilities, making it suitable for buyers comparing amenity-rich communities with access to the Dwarka Expressway and NH-48 network.",
    amenities: [
      "Clubhouse",
      "Swimming Pools",
      "Gymnasium",
      "Restaurant",
      "Bar Lounge",
      "Spa & Salon",
      "Theatre",
      "Tennis Court",
      "Residents' Lounge",
      "Business Centre",
      "Landscaped Green Areas",
      "Convenience Store",
      "Round-the-clock Security",
      "100% Power Backup",
      "Open & Covered Parking",
      "24-hour Water Supply",
    ],
    highlights: [
      "Japanese-influenced planning and architecture",
      "Approx. 36,000 sq ft clubhouse",
      "Swimming, fitness, spa and social facilities",
      "Landscaped residential environment",
      "Sector 36A location with Dwarka Expressway / NH-48 access",
    ],
    roadConnectivity: ["Dwarka Expressway", "NH-48"],
    officialSourceUrls: ["https://krisumi.com/project/waterfall-residences/", "https://krisumi.com/project/lp/index.php"],
    lastVerifiedDate: "2026-09-02",
  },
  {
    name: "Godrej Meridien",
    aliases: ["godrej meridien", "godrej meridian"],
    developer: "Godrej Properties",
    sector: "Sector 106",
    corridor: "Dwarka Expressway",
    projectDescription:
      "Godrej Meridien is a residential project by Godrej Properties on the Dwarka Expressway side of Gurugram. Its official amenity programme includes sports, fitness, wellness and social facilities rather than relying only on a conventional clubhouse proposition. For end users, the attraction is the combination of a gated residential environment, recreation facilities and access to the developing Dwarka Expressway corridor; unit-specific floor, size, view and asking price should be compared separately.",
    amenities: [
      "Club / Social Facilities",
      "Gym / Personal Fitness Studio",
      "Spa & Salon",
      "Squash Court",
      "Tennis Court",
      "Jogging Track",
      "Cycling Track",
      "Skating Arena",
      "Multipurpose Hall",
      "Restaurants",
      "Daily Essentials",
      "Medical Assistance",
    ],
    highlights: [
      "Sports and wellness-focused amenity programme",
      "Fitness, spa and social spaces",
      "Tennis, squash, jogging and cycling facilities",
      "Dwarka Expressway-side Gurugram location",
    ],
    roadConnectivity: ["Dwarka Expressway corridor"],
    officialSourceUrls: ["https://www.godrejproperties.com/gurugram/residential/godrej-meridien/amenities"],
    lastVerifiedDate: "2026-09-02",
  },
];

function normalize(value: string | null | undefined) {
  return (value ?? "")
    .toLocaleLowerCase("en-IN")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function verifiedProjectIntelligenceFor(input: {
  title?: string | null;
  projectName?: string | null;
  projectSlug?: string | null;
}) {
  const haystack = [input.projectName, input.projectSlug, input.title].map(normalize).join(" | ");
  if (!haystack.trim()) return null;

  return (
    VERIFIED_PROJECTS.find((project) =>
      project.aliases.some((alias) => {
        const normalizedAlias = normalize(alias);
        return normalizedAlias.length >= 4 && haystack.includes(normalizedAlias);
      }),
    ) ?? null
  );
}

export const VERIFIED_PROJECT_INTELLIGENCE = VERIFIED_PROJECTS;
