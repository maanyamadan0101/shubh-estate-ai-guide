import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, CalendarDays, CheckCircle2, Home, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/dwarka-expressway-flats-for-sale-gurgaon";
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const LAST_UPDATED = "21 August 2026";

const corridorImage = {
  url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dwarka%20Expressway.jpg",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Dwarka_Expressway.jpg",
  credit: "Baba Ovian / Wikimedia Commons",
  license: "CC BY-SA 3.0",
};

type Unit = {
  configuration: string;
  area: string;
  floor?: string;
  facing?: string;
  price: string;
  note?: string;
};

type ProjectInventory = {
  slug: string;
  project: string;
  sector: string;
  context: string;
  units: Unit[];
};

const inventory: ProjectInventory[] = [
  {
    slug: "pareena-express-heights",
    project: "Pareena Express Heights",
    sector: "Sector 99, Gurugram",
    context: "Ready-to-move residential project in the Dwarka Expressway catchment.",
    units: [
      {
        configuration: "4 BHK + Servant",
        area: "2425 sq ft",
        floor: "3rd floor",
        facing: "Dwarka Expressway facing",
        price: "Price on request",
        note: "Semi-furnished. Registry case as stated by the seller network; documents should be verified before token payment.",
      },
    ],
  },
  {
    slug: "emaar-imperial-gardens",
    project: "Emaar Imperial Gardens",
    sector: "Sector 102, Gurugram",
    context: "Established residential development close to Dwarka Expressway. The commonly marketed 3 BHK + servant layout is approximately 2025 sq ft.",
    units: [
      { configuration: "3 BHK + Servant", area: "Approx. 2025 sq ft", floor: "6th floor", price: "₹2.40 Cr" },
      { configuration: "3 BHK + Servant", area: "Approx. 2025 sq ft", floor: "5th floor", price: "₹2.45 Cr" },
      { configuration: "3 BHK + Servant", area: "Approx. 2025 sq ft", floor: "5th floor", price: "₹2.55 Cr" },
    ],
  },
  {
    slug: "ats-triumph",
    project: "ATS Triumph",
    sector: "Sector 104, Gurugram",
    context: "Ready-to-move premium apartments on the Dwarka Expressway corridor.",
    units: [
      { configuration: "3 BHK", area: "2290 sq ft", floor: "Lower floor", facing: "Park, pool & expressway facing", price: "₹3.25 Cr" },
      { configuration: "3 BHK", area: "2290 sq ft", floor: "Middle floor", facing: "Park, pool & expressway facing", price: "₹3.22 Cr" },
      { configuration: "3 BHK", area: "2290 sq ft", floor: "Middle floor", facing: "Club facing", price: "₹3.30 Cr" },
      { configuration: "4 BHK", area: "3150 sq ft", floor: "Lower floor", facing: "Park facing", price: "₹4.30 Cr" },
      { configuration: "4 BHK", area: "3150 sq ft", floor: "Higher floor", facing: "Internal facing", price: "₹4.25 Cr" },
    ],
  },
  {
    slug: "puri-emerald-bay",
    project: "Puri Emerald Bay",
    sector: "Sector 104, Gurugram",
    context: "Ready-to-move 2 and 3 BHK residences in a prominent Dwarka Expressway location.",
    units: [
      { configuration: "3 BHK + Servant", area: "2450 sq ft", floor: "Higher floor", facing: "Wing unit, outer facing", price: "₹3.45–₹3.55 Cr" },
      { configuration: "3 BHK + Servant", area: "2450 sq ft", floor: "Lower floor", facing: "Wing unit, park & pool facing", price: "₹3.60 Cr" },
      { configuration: "2 BHK + Servant", area: "1700 sq ft", floor: "Lower floor", facing: "Nose unit, park facing", price: "₹2.55–₹2.60 Cr" },
      { configuration: "2 BHK", area: "1550 sq ft", floor: "Lower floor", facing: "Wing unit, park & pool facing", price: "₹2.20–₹2.25 Cr" },
      { configuration: "3 BHK + Servant", area: "2450 sq ft", floor: "High floor, Tower A3", facing: "Nose unit; park, pool, club & expressway views", price: "₹3.70 Cr" },
    ],
  },
  {
    slug: "hero-homes-sector-104",
    project: "Hero Homes",
    sector: "Sector 104, Gurugram",
    context: "Dwarka Expressway residential development. The 2450 sq ft 4 BHK is part of the newer Tower 8 product and should be assessed separately from the earlier 2–3 BHK inventory.",
    units: [
      { configuration: "2 BHK", area: "1099 sq ft", floor: "Higher floor", price: "₹1.75 Cr" },
      { configuration: "3 BHK", area: "1359 sq ft", floor: "Higher floor", price: "₹2.25 Cr" },
      { configuration: "3 BHK", area: "1389 sq ft", floor: "Lower floor", price: "₹2.10 Cr" },
      { configuration: "4 BHK – Tower 8", area: "2450 sq ft", floor: "Higher floor", price: "₹3.50 Cr", note: "Tower 8 is an under-construction 4 BHK phase; confirm the exact tower, payment schedule and possession terms." },
    ],
  },
  {
    slug: "godrej-meridien",
    project: "Godrej Meridien",
    sector: "Sector 106, Gurugram",
    context: "Large residential development in Sector 106 on the Dwarka Expressway corridor.",
    units: [
      { configuration: "3 BHK", area: "1855 sq ft", floor: "Middle to higher floor", price: "₹3.22–₹3.25 Cr" },
      { configuration: "3 BHK + Servant", area: "2002 sq ft", floor: "Lower to higher floor", price: "₹3.45 Cr" },
      { configuration: "4 BHK", area: "2720 sq ft", floor: "Lower to higher floor", price: "₹4.35 Cr" },
    ],
  },
  {
    slug: "elan-the-presidential",
    project: "Elan The Presidential",
    sector: "Sector 106, Gurugram",
    context: "Ultra-luxury under-construction project in Sector 106, Dwarka Expressway.",
    units: [
      { configuration: "3 BHK", area: "2700 sq ft", floor: "Higher floor", facing: "Corner / nose unit", price: "₹18,750 per sq ft" },
    ],
  },
  {
    slug: "sobha-city",
    project: "Sobha City",
    sector: "Sector 108, Gurugram",
    context: "Large premium residential township near Dwarka Expressway with multiple apartment configurations.",
    units: [
      { configuration: "3 BHK", area: "2072 sq ft", floor: "Higher floor", price: "₹4.60 Cr", note: "Key-in-hand availability stated by the seller network; reconfirm before scheduling a visit." },
      { configuration: "3.5 BHK", area: "2343 sq ft", floor: "Middle floor", price: "₹5.10 Cr" },
    ],
  },
  {
    slug: "sobha-vista-residences",
    project: "Sobha City – Vista Residences",
    sector: "Sector 108, Gurugram",
    context: "Vista Residences is a premium phase within Sobha City, including Tower D and Tower Z inventory.",
    units: [
      { configuration: "3 BHK – Tower D", area: "2134 sq ft", floor: "Lower floor", price: "₹20,800 per sq ft" },
      { configuration: "3 BHK – Tower D", area: "2173 sq ft", facing: "Internal facing", price: "₹25,000 per sq ft" },
      { configuration: "4 BHK – Tower D", area: "2423 sq ft", floor: "Lower / higher floors", facing: "External facing; 2 units stated available", price: "₹21,500 per sq ft" },
      { configuration: "4 BHK – Tower D", area: "2434 sq ft", floor: "Lower / higher floors", price: "₹22,000 per sq ft" },
      { configuration: "4 BHK – Tower D", area: "2423 sq ft", floor: "Middle floor", facing: "Internal facing", price: "₹24,500 per sq ft" },
      { configuration: "4 BHK – Tower Z", area: "2913 sq ft", floor: "Lower floor", price: "₹25,500 per sq ft" },
      { configuration: "3 BHK – Tower Z", area: "2073 sq ft", floor: "Lower floor", price: "₹26,000 per sq ft" },
    ],
  },
  {
    slug: "indiabulls-enigma",
    project: "Indiabulls Enigma",
    sector: "Sector 110, Gurugram",
    context: "Ready-to-move large-format residences in Sector 110 on the Dwarka Expressway corridor.",
    units: [
      { configuration: "4 BHK + Servant", area: "3400 sq ft", floor: "Lower floor", facing: "Expressway facing", price: "₹4.95 Cr" },
      { configuration: "4 BHK + Servant", area: "3350 sq ft", floor: "Middle floor", facing: "Internal facing", price: "₹5.00 Cr" },
    ],
  },
  {
    slug: "mahindra-aura",
    project: "Mahindra Aura",
    sector: "Sector 110A, Gurugram",
    context: "Ready-to-move residential project in Sector 110A, close to the Dwarka Expressway corridor.",
    units: [
      { configuration: "3 BHK + Servant", area: "2042 sq ft", floor: "Middle floor", price: "₹2.80 Cr" },
    ],
  },
  {
    slug: "puri-diplomatic-residences",
    project: "Puri Diplomatic Residences",
    sector: "Sector 111, Gurugram",
    context: "Under-construction luxury residential project in Sector 111, Dwarka Expressway.",
    units: [
      { configuration: "3 BHK – Tower A2", area: "2282 sq ft", facing: "Central green / park facing", price: "₹19,000 per sq ft", note: "Seller-network reference price was ₹18,400 per sq ft; quoted resale demand is ₹19,000 per sq ft." },
    ],
  },
  {
    slug: "krisumi-waterfall-residences",
    project: "Krisumi Waterfall Residences",
    sector: "Sector 36A, Gurugram",
    context: "Ready residential inventory in Sector 36A within the wider Dwarka Expressway / New Gurugram catchment.",
    units: [
      { configuration: "2 BHK (LDK)", area: "1478 sq ft", floor: "10th–15th floor band", price: "₹22,200 per sq ft" },
      { configuration: "2 BHK (LDK)", area: "1448 sq ft", floor: "20th–25th floor band", price: "₹3.25 Cr" },
    ],
  },
];

const totalOptions = inventory.reduce((sum, item) => sum + item.units.length, 0);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Current Dwarka Expressway Gurgaon residential sale inventory",
  numberOfItems: totalOptions,
  itemListElement: inventory.flatMap((project) =>
    project.units.map((unit) => ({
      "@type": "ListItem",
      position: 0,
      name: `${project.project} ${unit.configuration} ${unit.area} – ${unit.price}`,
      url: `${PAGE_URL}#${project.slug}`,
    })),
  ).map((item, index) => ({ ...item, position: index + 1 })),
};

export const Route = createFileRoute("/dwarka-expressway-flats-for-sale-gurgaon")({
  head: () => ({
    meta: [
      {
        title: "Dwarka Expressway Flats for Sale Gurgaon | Current Resale Inventory | Shubh Estate Brokers",
      },
      {
        name: "description",
        content:
          "Browse current residential flats for sale on Dwarka Expressway Gurgaon across Sectors 99 to 111 and selected nearby projects. Compare configuration, area, floor, view and asking price with Shubh Estate Brokers.",
      },
      {
        name: "keywords",
        content:
          "Dwarka Expressway flats for sale Gurgaon, apartments for sale Dwarka Expressway, Sector 104 Gurgaon flats, Sector 106 Gurgaon property, Sector 108 Gurgaon apartments, Sector 110 Gurgaon flats",
      },
      { property: "og:title", content: "Dwarka Expressway Flats for Sale in Gurgaon" },
      {
        property: "og:description",
        content: `${totalOptions} current sale options across premium residential projects, updated ${LAST_UPDATED}.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: corridorImage.url },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(itemListSchema) }],
  }),
  component: DwarkaExpresswayInventory,
});

function UnitCard({ unit }: { unit: Unit }) {
  return (
    <article className="rounded-xl border border-border bg-background p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">{unit.configuration}</h3>
          <p className="mt-1 text-sm font-medium text-foreground">{unit.area}</p>
        </div>
        <span className="rounded-full bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">
          {unit.price}
        </span>
      </div>
      <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
        {unit.floor ? (
          <div className="flex gap-2">
            <dt className="font-medium text-foreground">Floor:</dt>
            <dd>{unit.floor}</dd>
          </div>
        ) : null}
        {unit.facing ? (
          <div className="flex gap-2">
            <dt className="font-medium text-foreground">View / facing:</dt>
            <dd>{unit.facing}</dd>
          </div>
        ) : null}
      </dl>
      {unit.note ? <p className="mt-3 text-xs leading-5 text-muted-foreground">{unit.note}</p> : null}
    </article>
  );
}

function DwarkaExpresswayInventory() {
  return (
    <>
      <PageHero
        eyebrow="Current Residential Sale Inventory"
        title="Flats for sale on Dwarka Expressway, Gurgaon"
        body={`Compare ${totalOptions} current resale and under-construction residential options across key Dwarka Expressway sectors. Inventory updated ${LAST_UPDATED}; availability and asking prices are subject to reconfirmation.`}
      />

      <section className="container-page pt-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src={corridorImage.url}
            alt={`Dwarka Expressway in Gurugram — ${corridorImage.credit}, ${corridorImage.license}`}
            className="h-56 w-full object-cover md:h-72"
            loading="eager"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-muted-foreground">
            <span>Representative corridor image — not a photograph of any specific listed apartment.</span>
            <a
              href={corridorImage.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gold underline-offset-4 hover:underline"
            >
              {corridorImage.credit} · {corridorImage.license}
            </a>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <Building2 className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 text-2xl font-semibold">{inventory.length}</p>
            <p className="text-sm text-muted-foreground">Project groups</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Home className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 text-2xl font-semibold">{totalOptions}</p>
            <p className="text-sm text-muted-foreground">Current unit options</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <CalendarDays className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 text-lg font-semibold">{LAST_UPDATED}</p>
            <p className="text-sm text-muted-foreground">Inventory update date</p>
          </div>
        </div>
      </section>

      <section className="container-page pb-6">
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl">Buyer verification before payment</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                These are current market leads received through the seller and broker network and cleaned for public display. Before paying any token, confirm the exact unit, ownership/title, RERA and tower details where applicable, occupation/completion documentation for ready homes, maintenance dues, transfer charges, parking, furnishing and the final negotiated price.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page space-y-10 py-10">
        {inventory.map((project) => (
          <div id={project.slug} key={project.slug} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  <MapPin className="size-4" aria-hidden="true" />
                  {project.sector}
                </p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">{project.project}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{project.context}</p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {project.units.length} {project.units.length === 1 ? "option" : "options"}
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.units.map((unit, index) => (
                <UnitCard key={`${project.slug}-${index}`} unit={unit} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-gold/30 bg-card p-7 md:p-9">
          <h2 className="font-display text-2xl">Shortlist a Dwarka Expressway property</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Share your preferred sector, budget, configuration, floor and view. Shubh Estate Brokers can help compare the available unit against competing inventory and coordinate site visits, home-loan assessment and transaction due diligence.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-10 items-center rounded-md bg-gold px-5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              Enquire for current availability
            </Link>
            <Link
              to="/locations/$slug"
              params={{ slug: "dwarka-expressway" }}
              className="inline-flex min-h-10 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
            >
              Dwarka Expressway buying guide
            </Link>
            <Link
              to="/projects/aipl-riviera-resale-sector-103-gurgaon"
              className="inline-flex min-h-10 items-center rounded-md border border-gold bg-gold/5 px-5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              AIPL Riviera resale around ₹12,000/sq ft
            </Link>
            <Link
              to="/projects/ansals-highland-park-sector-103-gurgaon"
              className="inline-flex min-h-10 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
            >
              Ansals Highland Park value guide
            </Link>
            <Link
              to="/home-loans"
              className="inline-flex min-h-10 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
            >
              Home-loan assistance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
