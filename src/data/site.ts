import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";

export const CONTACT = {
  name: "Shubh Estate Brokers",
  tagline: "Fair & Transparent Real Estate Deals at the Best Price",
  address: "15th Floor, Ocus Quantum Mall, Sector 51, Gurugram – 122003, Haryana",
  phone: "+91 9911050561",
  phoneHref: "tel:+919911050561",
  alternatePhone: "+91 8130785000",
  alternatePhoneHref: "tel:+918130785000",
  whatsapp: "https://wa.me/919911050561",
  email: "sales@shubhestatebroker.in",
  website: "shubhestatebroker.in",
  googleBusinessProfile:
    "https://www.google.com/search?q=Shubh+Estate+Brokers&stick=H4sIAAAAAAAA_-NgU1I1qDC2NEgxMjZJSjS1SDNJSjO1AgqlJKYZpBqYpSUlG5qbp5ouYhUJzihNylBwLS5JLElVcCrKz04tKgYAC6kHGEAAAAA&hl=en-GB&mat=CQc4_erXssgBElYBa0lj_ybgmqVIZrB49UjyibAzFmZh9OK8qFLi_nYKDltSnbMrwIBsFTUjH8wfBsu3gyXxLwV5zSI2FA9iRh2qJnxzRfuDGDzpEFaMfMJGQspwRNUuWw",
  googleReview: "https://g.page/r/CeV3wfsGDq89EBM/review",
  instagram: "https://www.instagram.com/shubhestatebrokers/",
  youtube: "https://www.youtube.com/channel/UCMryfMFC6_8fBP50_-WOLUA",
};

export const LOAN_DISCLAIMER =
  "Home loans are subject to the credit policies, eligibility criteria, documentation requirements, property eligibility, and final approval of the respective lending institution. Financing of up to 90% of the property value may be available for eligible applicants and qualifying properties, subject to lender policies and applicable regulations.";

export type Property = {
  id: string;
  title: string;
  builder: string;
  locality: string;
  sector: string;
  type: "Apartment" | "Builder Floor" | "Villa" | "Commercial";
  bhk: string;
  area: string;
  price: string;
  priceValue: number;
  status: "Ready to Move" | "Under Construction" | "New Launch";
  tags: string[];
  image: string;
};

export const PROPERTIES: Property[] = [
  {
    id: "dlf-the-arbour-63",
    title: "DLF The Arbour",
    builder: "DLF",
    locality: "Golf Course Extension Road",
    sector: "Sector 63",
    type: "Apartment",
    bhk: "4 BHK",
    area: "3,975 sq.ft.",
    price: "₹ 8.90 Cr",
    priceValue: 89000000,
    status: "Under Construction",
    tags: ["Luxury", "RERA Approved", "Loan Available"],
    image: prop1,
  },
  {
    id: "m3m-builder-floor-57",
    title: "Signature Builder Floor",
    builder: "Signature Global",
    locality: "Sohna Road",
    sector: "Sector 57",
    type: "Builder Floor",
    bhk: "3 BHK",
    area: "1,850 sq.ft.",
    price: "₹ 2.35 Cr",
    priceValue: 23500000,
    status: "Ready to Move",
    tags: ["Ready to Move", "Loan Available"],
    image: prop2,
  },
  {
    id: "sobha-villa-108",
    title: "Sobha International Villas",
    builder: "Sobha",
    locality: "Dwarka Expressway",
    sector: "Sector 108",
    type: "Villa",
    bhk: "5 BHK",
    area: "5,400 sq.ft.",
    price: "₹ 14.50 Cr",
    priceValue: 145000000,
    status: "New Launch",
    tags: ["Luxury", "New Launch", "RERA Approved"],
    image: prop3,
  },
  {
    id: "m3m-commercial-113",
    title: "M3M Corporate Suites",
    builder: "M3M",
    locality: "Dwarka Expressway",
    sector: "Sector 113",
    type: "Commercial",
    bhk: "Office Suite",
    area: "1,120 sq.ft.",
    price: "₹ 2.05 Cr",
    priceValue: 20500000,
    status: "Under Construction",
    tags: ["Investment", "Assured Rental", "RERA Approved"],
    image: prop4,
  },
  {
    id: "godrej-aristocrat-49",
    title: "Godrej Aristocrat",
    builder: "Godrej",
    locality: "Golf Course Extension Road",
    sector: "Sector 49",
    type: "Apartment",
    bhk: "3 BHK",
    area: "2,450 sq.ft.",
    price: "₹ 4.75 Cr",
    priceValue: 47500000,
    status: "New Launch",
    tags: ["New Launch", "Loan Available"],
    image: prop1,
  },
  {
    id: "elan-floors-82",
    title: "Elan Premium Floors",
    builder: "Elan",
    locality: "New Gurgaon",
    sector: "Sector 82",
    type: "Builder Floor",
    bhk: "4 BHK",
    area: "2,100 sq.ft.",
    price: "₹ 1.95 Cr",
    priceValue: 19500000,
    status: "Ready to Move",
    tags: ["Affordable Luxury", "Ready to Move"],
    image: prop2,
  },
];

export const BUILDERS = [
  "DLF",
  "M3M",
  "Godrej",
  "Signature Global",
  "Elan",
  "Smart World",
  "Sobha",
  "ATS",
  "Birla Estates",
  "Experion",
  "Central Park",
  "Adani Realty",
  "Emaar",
  "Tata Housing",
  "Trehan",
];

export const LOCALITIES = [
  { name: "Golf Course Road", price: "₹ 22,500 / sq.ft.", growth: "+11% YoY" },
  { name: "Golf Course Extension Road", price: "₹ 16,800 / sq.ft.", growth: "+14% YoY" },
  { name: "Dwarka Expressway", price: "₹ 13,200 / sq.ft.", growth: "+18% YoY" },
  { name: "Southern Peripheral Road (SPR)", price: "₹ 14,100 / sq.ft.", growth: "+16% YoY" },
  { name: "Sohna Road", price: "₹ 11,400 / sq.ft.", growth: "+9% YoY" },
  { name: "New Gurgaon (Sectors 82–95)", price: "₹ 9,800 / sq.ft.", growth: "+13% YoY" },
];

export const TESTIMONIALS = [
  {
    name: "Rohit Sharma",
    role: "Homebuyer, Sector 63A",
    quote:
      "Arun's banking background showed in every conversation. The title check and loan structuring saved us both money and months of uncertainty.",
  },
  {
    name: "Neha Kapoor",
    role: "NRI Investor, Dubai",
    quote:
      "Managing a Gurugram purchase from abroad felt effortless. Documentation, valuation and bank coordination were handled end to end.",
  },
  {
    name: "Vikram Sethi",
    role: "Seller, Golf Course Road",
    quote:
      "Fair pricing advice, genuine buyers and complete transparency. No inflated promises — just a clean, professional transaction.",
  },
];

export const FAQS = [
  {
    q: "Can you shortlist Gurgaon properties within my fixed budget instead of pushing overpriced projects?",
    a: "Yes. We first separate the usable property budget from stamp duty, registration, brokerage, loan charges and other expected costs. Properties are then shortlisted around the buyer's location, family or investment objective, timeline and financing position—not simply the highest-priced available inventory.",
  },
  {
    q: "How does Shubh Estate Brokers help buyers avoid overpaying in an overhyped Gurgaon area?",
    a: "We compare the specific unit with available market evidence, competing inventory, project stage, future supply, rental depth, developer quality and the premium already built into the asking price. Buyers receive the relevant disadvantages as well as the strengths before deciding whether to visit or make an offer.",
  },
  {
    q: "Can one Gurgaon adviser coordinate site visits, a home loan and the transaction process?",
    a: "Shubh Estate Brokers can coordinate the shortlist, planned site visits, price discussion, property-related lender requirements and transaction follow-up. Final lending, legal, tax and registration decisions remain with the relevant bank or qualified professional.",
  },
  {
    q: "Do you explain the disadvantages of each property instead of only promoting it?",
    a: "Yes. Our comparison considers price premium, construction or maintenance concerns, density, access, future supply, financing constraints and likely resale or rental depth where relevant. A client should be able to reject unsuitable options before paying a token amount.",
  },
  {
    q: "How do you verify builder credentials, approvals and property documents?",
    a: "We review available Haryana RERA information, project and developer disclosures, property documents supplied for the transaction and relevant lender acceptance. Transaction-specific legal conclusions should be confirmed by an independent qualified lawyer before funds are committed.",
  },
  {
    q: "Do you assist first-time homebuyers and women buyers?",
    a: "Yes. We explain budgeting, shortlisting, price comparison, site visits, documents, financing and the transaction sequence step by step. Buyers can also request clearly scheduled daytime visits and location comparisons based on commute, occupied surroundings and nearby daily-use facilities.",
  },
  {
    q: "Do you assist with home loans?",
    a: "Yes. We coordinate home-loan eligibility, documentation, lender valuation and bank follow-up for eligible salaried, self-employed and NRI applicants. Financing of up to 90% may be available for qualifying applicants and properties, subject to lender policies and final approval.",
  },
  {
    q: "Can an NRI buy or sell Gurgaon property while living abroad?",
    a: "Much of the shortlisting, video viewing, resale marketing, buyer communication and transaction coordination can be handled remotely. Transaction-specific power of attorney, tax and repatriation questions should be confirmed with the appropriate legal or tax professional.",
  },
];
