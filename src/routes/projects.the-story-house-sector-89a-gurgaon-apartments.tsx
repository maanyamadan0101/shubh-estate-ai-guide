import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PATH = "/projects/the-story-house-sector-89a-gurgaon-apartments";
const ASSETS = "/projects/the-story-house";
const BROCHURE = `${ASSETS}/the-story-house-sector-89a-brochure.pdf`;
const RERA = "https://haryanarera.gov.in/view_project/searchprojectDetail/3629";
const CERTIFICATE = "https://haryanarera.gov.in/view_project/view_certificate/MTk5OQ==";
const AGREEMENT =
  "https://haryanarera.gov.in/project/view_uploaded_Document_open/8ea79da892NjA2NDc=";
const canonical = `${SITE_ORIGIN}${PATH}`;
const title = "The Story House Sector 89A Gurgaon | 2 & 3 BHK Senior Living";
const description =
  "Explore Arttech The Story House, Sector 89A Gurgaon: 2 & 3 BHK retirement homes, carpet areas, floor plans, amenities, sample-home videos and downloadable brochure.";
const layouts = [
  { name: "2 BHK Type 1", carpet: 756, balcony: 203, superArea: 1450 },
  { name: "2 BHK Type 2", carpet: 803, balcony: 305, superArea: 1548 },
  { name: "3 BHK Type 1", carpet: 1018, balcony: 309, superArea: 1785 },
  { name: "3 BHK Type 2", carpet: 992, balcony: 297, superArea: 1761 },
];
const amenityGroups = [
  {
    name: "Leisure & community",
    items: [
      "Indoor swimming pool",
      "Gymnasium with plush interiors",
      "Mini theatre",
      "Coffee lounge",
      "Games room: table tennis, chess & air hockey",
      "Children's play area",
      "Shopping centre",
      "Green areas",
    ],
  },
  {
    name: "Wellness & everyday living",
    items: [
      "Yoga & wellness room",
      "Meditation room",
      "Walking track",
      "Housekeeping services",
      "Physiotherapy room",
    ],
  },
  {
    name: "Care & support",
    items: [
      "Medical clinic",
      "Access to a doctor",
      "Access to nursing & health caregivers",
      "Clinical consultation room",
      "Ambulance & emergency services",
    ],
  },
];
const specifications = [
  [
    "Living, dining & bedrooms",
    "Porcelain, full-body or GVT tiles; emulsion paint/OBD for walls and ceilings; laminated or polished flush internal doors. Brands shown include Somany, Kajaria, Simpolo, Asian and Berger, or equivalents.",
  ],
  [
    "Entrance & windows",
    "One-hour fire-rated main door as specified in the brochure; aluminium external doors/windows with toughened glass, Eternia/Fenesta or equivalent, subject to design.",
  ],
  [
    "Kitchen",
    "Modular kitchen with stone countertop; tiled floor; wall tiles to 2 ft above the counter with paint above; gas-leak detection system. Actual fittings and appliance inclusions require confirmation.",
  ],
  [
    "Bathrooms",
    "Anti-skid floor tiles; wall tiles up to door level; master-bedroom bathroom granite counter with washbasin, pedestal washbasins in other toilets; wall-hung WC and CP fittings, Somany/Cera/Parryware or equivalent.",
  ],
  [
    "Balconies & common areas",
    "Anti-skid balcony flooring and railings to architectural design; anti-skid corridors, painted MS stair railings and precast tile/stone stair finishes.",
  ],
  [
    "Accessibility",
    "Alarm provision, washbasin/counter grab rail, apartment intercom, rounded-end stair handrails, minimum 900 mm door opening between jambs, grip/lever handles and fixed-cum-sliding external doors/windows.",
  ],
  [
    "Structure, lifts & fire systems",
    "RCC superstructure described as designed to National Building Code; fire systems to approved scheme; two stretcher-accommodating lifts per tower with emergency-call provision, Schindler/KONE or equivalent.",
  ],
  [
    "Security & movement",
    "Common-area CCTV, intercom and professionally managed security services; wheelchair ramps wherever necessary; anti-skid walkways and landscaped lighting.",
  ],
  [
    "Power backup",
    "Backup for external common areas; 1 kVA internal backup per apartment. Additional backup is described as chargeable.",
  ],
  [
    "Medical & wellness service provisions",
    "Brochure describes 24x7 ambulance service, emergency tie-up with a nearby hospital, a wheelchair in each tower, physiotherapy, yoga and meditation rooms. Confirm operator, staffing, activation dates, access and fees.",
  ],
  [
    "Sustainability",
    "Rainwater harvesting, sewage-treatment plant for reuse in landscaping, dual water system, trees and shrubs.",
  ],
];
const faqs = [
  [
    "Where is The Story House located?",
    "The Story House by Arttech Elegant Homes LLP is in Sector 89A, Gurugram. The brochure describes proximity to the Gurgaon-Rewari Expressway (NH352W) and Dwarka Expressway. View the supplied location map and assess your route during a visit.",
  ],
  [
    "What are the 2 and 3 BHK carpet areas?",
    "The brochure gives 2 BHK carpet areas of 756 and 803 sq ft, and 3 BHK carpet areas of 992 and 1,018 sq ft. Balcony and super-area figures are listed separately. Sales and pricing are on carpet area; the brochure states super area is for maintenance-charge purposes only.",
  ],
  [
    "Who can reside in this project?",
    "The HRERA-uploaded agreement describes retirement housing for eligible residents aged 55+. It permits an allottee to be a different person or legal entity, with use for an eligible resident. Other family members may stay temporarily under service-provider terms. Confirm the current agreement and occupancy conditions before booking.",
  ],
  [
    "What is the current price and payment plan?",
    "A current unit-wise price list, payment plan and available-unit list were not supplied. Request the developer's written all-inclusive cost sheet, carpet-area basis, payment schedule, recurring service charges and cancellation terms through Shubh Estate Brokers.",
  ],
  [
    "Is the project ready to move?",
    "The supplied videos show sample homes and artistic project visuals. They do not establish possession readiness. The registration certificate records 31 March 2032 as the promoter-declared phase completion date; this is not a promise of an earlier handover. Ask for current construction and possession details.",
  ],
  [
    "Are the displayed furniture and facilities included?",
    "Furniture, decoration and appliances shown in the sample homes are illustrative. Match actual unit inclusions to the signed specifications. Amenities and care services are described in the brochure; verify delivery, operational arrangements, usage terms and charges.",
  ],
  [
    "Can I download the project brochure?",
    "Yes. Use Download project brochure to save the original supplied 28-page PDF, including floor plans, location map, amenities and specifications. No enquiry form is required for the download.",
  ],
];

export const Route = createFileRoute("/projects/the-story-house-sector-89a-gurgaon-apartments")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_ORIGIN}${ASSETS}/project-aerial.webp` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${canonical}#webpage`,
              url: canonical,
              name: title,
              description,
              dateModified: "2026-10-02",
              about: {
                "@type": "ApartmentComplex",
                name: "The Story House",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Sector 89A",
                  addressLocality: "Gurugram",
                  addressRegion: "Haryana",
                  addressCountry: "IN",
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Residential projects in Gurgaon",
                  item: `${SITE_ORIGIN}/projects-in-gurgaon`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "The Story House, Sector 89A",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: StoryHousePage,
});

function DownloadBrochure() {
  return (
    <Button asChild variant="gold" size="lg">
      <a
        href={BROCHURE}
        download="The_Story_House_Sector_89A_Brochure.pdf"
        onClick={() =>
          trackEvent("download_project_brochure", { project: "The Story House", page_path: PATH })
        }
      >
        <Download aria-hidden="true" className="size-4" /> Download project brochure
      </a>
    </Button>
  );
}
function BrochureImage({ file, caption }: { file: string; caption: string }) {
  return (
    <figure>
      <a
        href={`${ASSETS}/${file}.webp`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View full-size: ${caption}`}
      >
        <img
          src={`${ASSETS}/${file}.webp`}
          alt={caption}
          width={1800}
          height={1270}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-xl border border-border"
        />
      </a>
      <figcaption className="mt-2 text-sm leading-6 text-muted-foreground">
        {caption}. Brochure visual; indicative. Select to enlarge.
      </figcaption>
    </figure>
  );
}
function ProjectVideo({ file, label }: { file: string; label: string }) {
  return (
    <figure>
      <h3 className="mb-3 font-display text-xl">{label}</h3>
      <video
        controls
        playsInline
        preload="none"
        poster={`${ASSETS}/${file}-poster.jpg`}
        className="max-h-[32rem] w-full rounded-xl bg-black"
        aria-label={label}
      >
        <source src={`${ASSETS}/${file}.mp4`} type="video/mp4" />
        <a href={`${ASSETS}/${file}.mp4`}>Open {label}</a>
      </video>
      <figcaption className="mt-2 text-sm leading-6 text-muted-foreground">
        Supplied project media. Sample furnishings and artistic visuals are illustrative; confirm
        actual unit inclusions.
      </figcaption>
    </figure>
  );
}
function StoryHousePage() {
  return (
    <>
      <nav
        className="container-page flex flex-wrap gap-2 py-4 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/projects-in-gurgaon">Residential projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">The Story House</span>
      </nav>
      <section className="surface-navy border-y border-gold/20">
        <div className="container-page grid items-center gap-8 py-10 md:py-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Arttech · Sector 89A, Gurugram</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              The Story House
            </h1>
            <p className="mt-4 text-xl text-gold">
              2 & 3 BHK apartments for senior living in Gurgaon
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-navy-foreground/80">
              A retirement-housing community with home layouts, wellness spaces and everyday support
              provisions. Explore the brochure, sample homes and specifications to plan your next
              chapter.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <DownloadBrochure />
              <Button asChild variant="goldOutline" size="lg">
                <a
                  href="#project-enquiry"
                  onClick={() => trackContact("site_visit", "story_house_hero")}
                >
                  Request price & site visit
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-navy-foreground/70">
              Original 28-page brochure · PDF · approximately 12 MB
            </p>
            <p className="mt-5 text-sm leading-6 text-navy-foreground/80">
              HRERA: GGM/984/716/2025/87 · Retirement Housing Policy
            </p>
          </div>
          <figure>
            <img
              src={`${ASSETS}/project-aerial.webp`}
              alt="The Story House Sector 89A Gurugram project aerial rendering from the supplied brochure"
              width={1800}
              height={1270}
              fetchPriority="high"
              className="h-auto w-full rounded-2xl border border-gold/30"
            />
            <figcaption className="mt-2 text-sm text-navy-foreground/70">
              Artist's impression from the project brochure.
            </figcaption>
          </figure>
        </div>
      </section>
      <nav
        className="container-page flex flex-wrap gap-x-6 gap-y-3 py-5 text-sm text-gold"
        aria-label="Project sections"
      >
        {[
          ["overview", "Project details"],
          ["layouts", "Sizes & floor plans"],
          ["amenities", "Amenities"],
          ["videos", "Videos"],
          ["location", "Location"],
          ["specifications", "Specifications"],
          ["faqs", "FAQs"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="underline-offset-4 hover:underline">
            {label}
          </a>
        ))}
      </nav>
      <div className="container-page grid gap-10 pb-14 pt-4 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 space-y-12">
          <section id="overview" className="scroll-mt-28">
            <h2 className="font-display text-3xl">Project details at a glance</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Developer / promoter", "Arttech Elegant Homes LLP"],
                ["Location", "Sector 89A, Gurugram, Haryana"],
                ["Home options", "2 BHK & 3 BHK apartments"],
                ["Price", "Current all-inclusive price on request"],
                ["Registered project area", "4.525 acres"],
                [
                  "Registered development",
                  "5 towers + 2 commercial; 406 residential + 78 commercial units",
                ],
                ["HRERA registration", "GGM/984/716/2025/87, dated 8 October 2025"],
                ["Declared phase completion", "31 March 2032 in registration certificate"],
              ].map(([term, value]) => (
                <div key={term} className="rounded-xl border border-border bg-card p-4">
                  <dt className="text-sm text-muted-foreground">{term}</dt>
                  <dd className="mt-2 text-base leading-6 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Registered development figures and phase completion date are from the{" "}
              <a
                href={CERTIFICATE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                HRERA registration certificate
              </a>
              . Completion date is a recorded declaration, not an earlier-possession commitment.
              Current construction status and available units are on request.
            </p>
            <div className="mt-6 rounded-xl border border-gold/40 bg-card p-5">
              <h3 className="font-display text-xl">Senior-living resident eligibility</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                The HRERA-uploaded agreement defines eligible residents as seniors aged 55+. The
                purchaser may be a different person or legal entity, while occupation is for an
                eligible resident. Temporary family stays are subject to service-provider terms.
                Confirm current occupancy conditions before selecting a home.
              </p>
              <a
                href={AGREEMENT}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-gold underline"
              >
                Read the uploaded agreement and resident terms
              </a>
            </div>
          </section>
          <section id="layouts" className="scroll-mt-28">
            <h2 className="font-display text-3xl">2 & 3 BHK sizes and floor plans</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Compare the carpet area separately from balconies and the brochure's super-area
              figures. The brochure states that sales and pricing are based on carpet area; super
              area is mentioned for maintenance charges only.
            </p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">The Story House brochure areas in square feet</caption>
                <thead className="bg-muted">
                  <tr>
                    {["Layout", "Carpet area", "Balcony area", "Super area*"].map((h) => (
                      <th scope="col" key={h} className="p-4 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {layouts.map((row) => (
                    <tr key={row.name} className="border-t border-border">
                      <th scope="row" className="p-4 font-medium">
                        {row.name}
                      </th>
                      <td className="p-4">{row.carpet.toLocaleString("en-IN")} sq ft</td>
                      <td className="p-4">{row.balcony} sq ft</td>
                      <td className="p-4">{row.superArea.toLocaleString("en-IN")} sq ft</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              *For maintenance-charge purposes as stated in the brochure. Confirm the selected
              unit's sanctioned plan, orientation and signed carpet-area schedule.
            </p>
            <div className="mt-6 grid gap-6">
              {[
                ["2bhk-floor-plan", "2 BHK Type 1 and Type 2 floor plan"],
                ["2bhk-cluster-plan", "2 BHK cluster layout"],
                ["3bhk-cluster-plan", "3 BHK cluster layout and area schedule"],
                ["3bhk-type-2-floor-plan", "3 BHK Type 2 floor plan"],
                ["3bhk-type-1-floor-plan", "3 BHK Type 1 floor plan"],
                ["site-plan", "The Story House site plan"],
              ].map(([file, caption]) => (
                <BrochureImage key={file} file={file!} caption={caption!} />
              ))}
            </div>
          </section>
          <section id="amenities" className="scroll-mt-28">
            <h2 className="font-display text-3xl">Amenities, wellness and support</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The supplied brochure presents the following facilities and services. Ask for current
              delivery dates, service providers, staffing, membership terms and recurring charges;
              their description does not establish that they are already operational.
            </p>
            <div className="mt-6 grid gap-5">
              {amenityGroups.map((group) => (
                <div key={group.name} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-xl">{group.name}</h3>
                  <ul className="mt-4 grid list-disc gap-x-8 gap-y-3 pl-5 text-base text-muted-foreground sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <BrochureImage file="indoor-pool" caption="Indoor swimming pool concept" />
              <BrochureImage file="gymnasium" caption="Gymnasium concept" />
              <BrochureImage file="games-room" caption="Games room concept" />
              <BrochureImage file="amenities" caption="Complete amenity list from the brochure" />
            </div>
          </section>
          <section id="videos" className="scroll-mt-28">
            <h2 className="font-display text-3xl">Explore the project and sample homes</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              View the supplied project overview and complete 2 and 3 BHK sample-home tours.
              Furnishing, decoration and appliances shown are not a unit-inclusion commitment.
            </p>
            <div className="mt-6 space-y-8">
              <ProjectVideo file="project-overview" label="Project overview and artistic visuals" />
              <ProjectVideo file="2bhk-sample-home" label="2 BHK sample-home walkthrough" />
              <ProjectVideo file="3bhk-sample-home" label="3 BHK sample-home walkthrough" />
              <details className="rounded-xl border border-border p-5">
                <summary className="cursor-pointer font-medium">
                  More supplied walkthrough clips
                </summary>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <ProjectVideo
                    file="additional-walkthrough-1"
                    label="Additional interior walkthrough 1"
                  />
                  <ProjectVideo
                    file="additional-walkthrough-2"
                    label="Additional interior walkthrough 2"
                  />
                </div>
              </details>
            </div>
          </section>
          <section id="location" className="scroll-mt-28">
            <h2 className="font-display text-3xl">Sector 89A location and connectivity</h2>
            <p className="mt-4 flex items-center gap-2 text-base">
              <MapPin className="size-5 text-gold" aria-hidden="true" />
              The Story House, Sector 89A, Gurugram
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The brochure describes a location approximately 100 metres from the Gurgaon-Rewari
              Expressway (NH352W), with access towards Dwarka Expressway. It also highlights
              schools, hospitals and daily conveniences in the surrounding area, and access to
              Sultanpur National Park.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              The brochure quotes 5 minutes to Dwarka Expressway and 25 minutes to Sultanpur
              National Park. These are indicative marketing estimates; actual routes and travel
              times depend on traffic. Evaluate access, commute and nearby services during your
              visit.
            </p>
            <div className="mt-6">
              <BrochureImage file="location-map" caption="The Story House brochure location map" />
            </div>
          </section>
          <section id="specifications" className="scroll-mt-28">
            <h2 className="font-display text-3xl">Home specifications and accessible design</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A readable summary of the brochure specification sheets. Named brands may be replaced
              by equivalents; the selected unit's signed agreement and specifications determine
              actual inclusions.
            </p>
            <dl className="mt-6 space-y-4">
              {specifications.map(([term, value]) => (
                <div key={term} className="rounded-xl border border-border bg-card p-5">
                  <dt className="font-semibold">{term}</dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <details className="mt-6 rounded-xl border border-border p-5">
              <summary className="cursor-pointer font-medium">
                View original brochure specification sheets
              </summary>
              <div className="mt-5 space-y-6">
                <BrochureImage
                  file="specifications-interiors"
                  caption="Living, bedroom and bathroom specifications"
                />
                <BrochureImage
                  file="specifications-kitchen-accessibility"
                  caption="Kitchen, balcony and accessibility specifications"
                />
                <BrochureImage
                  file="specifications-services"
                  caption="Structure, lifts, security, backup and service specifications"
                />
              </div>
            </details>
          </section>
          <section
            id="pricing"
            className="scroll-mt-28 rounded-2xl border border-gold/30 bg-card p-6"
          >
            <h2 className="font-display text-2xl">Request current price and availability</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Ask Shubh Estate Brokers for the current 2 or 3 BHK unit list, all-inclusive cost
              sheet, carpet-area price basis, payment plan, maintenance and care-service charges,
              specifications and project visit. No current selling price or payment schedule was
              included in the supplied brochure.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <DownloadBrochure />
              <Button asChild variant="goldOutline">
                <a href="#project-enquiry">Enquire about a home</a>
              </Button>
            </div>
          </section>
          <section id="faqs" className="scroll-mt-28">
            <h2 className="font-display text-3xl">Frequently asked questions</h2>
            <div className="mt-5 space-y-3">
              {faqs.map(([q, a]) => (
                <details key={q} className="rounded-xl border border-border bg-card p-5">
                  <summary className="cursor-pointer font-medium leading-6">{q}</summary>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="rounded-xl border border-border p-5">
            <h2 className="font-display text-xl">Project information and sources</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Updated 2 October 2026. Primary project material: the supplied 28-page brochure and
              videos. Registration, retirement-housing classification and recorded completion date
              are cross-checked against HRERA documents. Brochure drawings and visuals are
              indicative; confirm the current signed unit documents and service arrangements.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-gold">
              <li>
                <a href={BROCHURE} target="_blank" rel="noopener noreferrer" className="underline">
                  Open the original project brochure
                </a>
              </li>
              <li>
                <a href={RERA} target="_blank" rel="noopener noreferrer" className="underline">
                  Official HRERA project record
                </a>
              </li>
              <li>
                <a
                  href={CERTIFICATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  HRERA registration certificate
                </a>
              </li>
              <li>
                <a href={AGREEMENT} target="_blank" rel="noopener noreferrer" className="underline">
                  HRERA-uploaded agreement for sale
                </a>
              </li>
            </ul>
          </section>
          <nav
            aria-label="Related property guides"
            className="flex flex-wrap gap-5 text-sm text-gold"
          >
            <Link to="/projects-in-gurgaon">Residential projects in Gurgaon</Link>
            <a href="/locations/new-gurgaon">New Gurgaon property guide</a>
            <a href="/locations/dwarka-expressway">Dwarka Expressway property guide</a>
            <Link to="/senior-citizen-housing-gurgaon">Senior-living property guide</Link>
            <Link to="/home-loans">Home-loan assistance</Link>
          </nav>
        </div>
        <aside
          id="project-enquiry"
          className="scroll-mt-28 rounded-2xl border border-gold/30 bg-card p-6 lg:sticky lg:top-24 lg:self-start"
        >
          <p className="eyebrow">Speak with Shubh Estate Brokers</p>
          <h2 className="mt-3 font-display text-2xl">Find your next chapter</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Share your preferred layout, budget and timeline. We will help you obtain current
            details and arrange a project visit.
          </p>
          <div className="mt-5">
            <EnquiryForm
              interest="The Story House Sector 89A - 2/3 BHK senior living"
              compact
              includeRequirements
            />
          </div>
          <a
            href={CONTACT.phoneHref}
            onClick={() => trackContact("phone", "story_house_enquiry")}
            className="mt-6 flex items-center gap-2 text-sm text-gold"
          >
            <Phone aria-hidden="true" className="size-4" />
            {CONTACT.phone}
          </a>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            For retirement-housing occupancy and service terms, review the current developer
            agreement.
          </p>
        </aside>
      </div>
    </>
  );
}
