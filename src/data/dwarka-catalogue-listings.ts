type CatalogueStatus = "ready_to_move" | "under_construction" | "new_launch" | "sold_out";

type StaticUnit = {
  configuration: string;
  area: number;
  floor?: string;
  facing?: string;
  price: string;
  status?: CatalogueStatus;
};

type StaticProject = {
  slug: string;
  project: string;
  sector: string;
  status?: CatalogueStatus;
  units: StaticUnit[];
};

const DWARKA_PATH = "/dwarka-expressway-flats-for-sale-gurgaon";

const projects: StaticProject[] = [
  {
    slug: "pareena-express-heights",
    project: "Pareena Express Heights",
    sector: "Sector 99",
    status: "ready_to_move",
    units: [
      { configuration: "4 BHK + Servant", area: 2425, floor: "3rd floor", facing: "Dwarka Expressway facing", price: "Price on request" },
    ],
  },
  {
    slug: "emaar-imperial-gardens",
    project: "Emaar Imperial Gardens",
    sector: "Sector 102",
    units: [
      { configuration: "3 BHK + Servant", area: 2025, floor: "6th floor", price: "₹2.40 Cr" },
      { configuration: "3 BHK + Servant", area: 2025, floor: "5th floor", price: "₹2.45 Cr" },
      { configuration: "3 BHK + Servant", area: 2025, floor: "5th floor", price: "₹2.55 Cr" },
    ],
  },
  {
    slug: "ats-triumph",
    project: "ATS Triumph",
    sector: "Sector 104",
    status: "ready_to_move",
    units: [
      { configuration: "3 BHK", area: 2290, floor: "Lower floor", facing: "Park, pool & expressway facing", price: "₹3.25 Cr" },
      { configuration: "3 BHK", area: 2290, floor: "Middle floor", facing: "Park, pool & expressway facing", price: "₹3.22 Cr" },
      { configuration: "3 BHK", area: 2290, floor: "Middle floor", facing: "Club facing", price: "₹3.30 Cr" },
      { configuration: "4 BHK", area: 3150, floor: "Lower floor", facing: "Park facing", price: "₹4.30 Cr" },
      { configuration: "4 BHK", area: 3150, floor: "Higher floor", facing: "Internal facing", price: "₹4.25 Cr" },
    ],
  },
  {
    slug: "puri-emerald-bay",
    project: "Puri Emerald Bay",
    sector: "Sector 104",
    status: "ready_to_move",
    units: [
      { configuration: "3 BHK + Servant", area: 2450, floor: "Higher floor", facing: "Wing unit, outer facing", price: "₹3.45–₹3.55 Cr" },
      { configuration: "3 BHK + Servant", area: 2450, floor: "Lower floor", facing: "Wing unit, park & pool facing", price: "₹3.60 Cr" },
      { configuration: "2 BHK + Servant", area: 1700, floor: "Lower floor", facing: "Nose unit, park facing", price: "₹2.55–₹2.60 Cr" },
      { configuration: "2 BHK", area: 1550, floor: "Lower floor", facing: "Wing unit, park & pool facing", price: "₹2.20–₹2.25 Cr" },
      { configuration: "3 BHK + Servant", area: 2450, floor: "High floor, Tower A3", facing: "Nose unit; park, pool, club & expressway views", price: "₹3.70 Cr" },
    ],
  },
  {
    slug: "hero-homes-sector-104",
    project: "Hero Homes",
    sector: "Sector 104",
    units: [
      { configuration: "2 BHK", area: 1099, floor: "Higher floor", price: "₹1.75 Cr" },
      { configuration: "3 BHK", area: 1359, floor: "Higher floor", price: "₹2.25 Cr" },
      { configuration: "3 BHK", area: 1389, floor: "Lower floor", price: "₹2.10 Cr" },
      { configuration: "4 BHK – Tower 8", area: 2450, floor: "Higher floor", price: "₹3.50 Cr", status: "under_construction" },
    ],
  },
  {
    slug: "godrej-meridien",
    project: "Godrej Meridien",
    sector: "Sector 106",
    units: [
      { configuration: "3 BHK", area: 1855, floor: "Middle to higher floor", price: "₹3.22–₹3.25 Cr" },
      { configuration: "3 BHK + Servant", area: 2002, floor: "Lower to higher floor", price: "₹3.45 Cr" },
      { configuration: "4 BHK", area: 2720, floor: "Lower to higher floor", price: "₹4.35 Cr" },
    ],
  },
  {
    slug: "elan-the-presidential",
    project: "Elan The Presidential",
    sector: "Sector 106",
    status: "under_construction",
    units: [
      { configuration: "3 BHK", area: 2700, floor: "Higher floor", facing: "Corner / nose unit", price: "₹18,750 per sq ft" },
    ],
  },
  {
    slug: "sobha-city",
    project: "Sobha City",
    sector: "Sector 108",
    units: [
      { configuration: "3 BHK", area: 2072, floor: "Higher floor", price: "₹4.60 Cr" },
      { configuration: "3.5 BHK", area: 2343, floor: "Middle floor", price: "₹5.10 Cr" },
    ],
  },
  {
    slug: "sobha-vista-residences",
    project: "Sobha City – Vista Residences",
    sector: "Sector 108",
    units: [
      { configuration: "3 BHK – Tower D", area: 2134, floor: "Lower floor", price: "₹20,800 per sq ft" },
      { configuration: "3 BHK – Tower D", area: 2173, facing: "Internal facing", price: "₹25,000 per sq ft" },
      { configuration: "4 BHK – Tower D", area: 2423, floor: "Lower / higher floors", facing: "External facing; 2 units stated available", price: "₹21,500 per sq ft" },
      { configuration: "4 BHK – Tower D", area: 2434, floor: "Lower / higher floors", price: "₹22,000 per sq ft" },
      { configuration: "4 BHK – Tower D", area: 2423, floor: "Middle floor", facing: "Internal facing", price: "₹24,500 per sq ft" },
      { configuration: "4 BHK – Tower Z", area: 2913, floor: "Lower floor", price: "₹25,500 per sq ft" },
      { configuration: "3 BHK – Tower Z", area: 2073, floor: "Lower floor", price: "₹26,000 per sq ft" },
    ],
  },
  {
    slug: "indiabulls-enigma",
    project: "Indiabulls Enigma",
    sector: "Sector 110",
    status: "ready_to_move",
    units: [
      { configuration: "4 BHK + Servant", area: 3400, floor: "Lower floor", facing: "Expressway facing", price: "₹4.95 Cr" },
      { configuration: "4 BHK + Servant", area: 3350, floor: "Middle floor", facing: "Internal facing", price: "₹5.00 Cr" },
    ],
  },
  {
    slug: "mahindra-aura",
    project: "Mahindra Aura",
    sector: "Sector 110A",
    status: "ready_to_move",
    units: [
      { configuration: "3 BHK + Servant", area: 2042, floor: "Middle floor", price: "₹2.80 Cr" },
    ],
  },
  {
    slug: "puri-diplomatic-residences",
    project: "Puri Diplomatic Residences",
    sector: "Sector 111",
    status: "under_construction",
    units: [
      { configuration: "3 BHK – Tower A2", area: 2282, facing: "Central green / park facing", price: "₹19,000 per sq ft" },
    ],
  },
  {
    slug: "krisumi-waterfall-residences",
    project: "Krisumi Waterfall Residences",
    sector: "Sector 36A",
    status: "ready_to_move",
    units: [
      { configuration: "2 BHK (LDK)", area: 1478, floor: "10th–15th floor band", price: "₹22,200 per sq ft" },
      { configuration: "2 BHK (LDK)", area: 1448, floor: "20th–25th floor band", price: "₹3.25 Cr" },
    ],
  },
];

export const DWARKA_CATALOGUE_LISTINGS = projects.flatMap((project) =>
  project.units.map((unit, index) => ({
    id: `dwarka-${project.slug}-${index + 1}`,
    title: `${project.project} — ${unit.configuration}, ${unit.area} sq ft${unit.floor ? `, ${unit.floor}` : ""}`,
    slug: `${project.slug}-inventory-${index + 1}`,
    bhk: unit.configuration,
    property_type: "apartment",
    listing_type: "sale",
    status: unit.status ?? project.status ?? null,
    price: null,
    display_price: unit.price,
    area_sqft: unit.area,
    sector: project.sector,
    locality: "Dwarka Expressway",
    city: "Gurugram",
    cover_image_url: null,
    is_luxury: false,
    floor: unit.floor ?? null,
    facing: unit.facing ?? null,
    detail_href: `${DWARKA_PATH}#${project.slug}`,
  })),
);
