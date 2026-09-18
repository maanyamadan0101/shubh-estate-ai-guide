import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/emaar-urban-oasis-sector-62";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Emaar Urban Oasis Sector 62 Gurgaon | Resale Price, RERA & Sizes";
const description =
  "Emaar Urban Oasis Sector 62 Gurgaon resale guide: RERA GGM/741/473/2023/85, 3 & 4 BHK sizes, current asking prices, amenities and Golf Course Extension Road location.";
const EMAAR_PAGE = "https://in.emaar.com/en/properties/urban-oasis/";
const EMAAR_BROCHURE = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Urban-Oasis-EOI.pdf";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/project_preview_open/2518";
const CURRENT_LISTING = "/property/3-bhk-emaar-urban-oasis-apartment-sector-62-gurgaon";
const HERO = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Home-Page-Banner-1620x832.jpg";
const GREEN = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Main-Community-Image-1-1-1620x832.jpg";
const POOL = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Amenities-680-x-680-1.jpg";
const VIDEO = "https://www.youtube-nocookie.com/embed/Fr8KUYb3rWY";
const WATCH_VIDEO = "https://www.youtube.com/watch?v=Fr8KUYb3rWY";
const RERA_NUMBER = "GGM/741/473/2023/85";
const WA = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hello Mr Arun Madaan, I am interested in Emaar Urban Oasis Sector 62. Please share current resale / assignment inventory, tower, floor, facing, view, payment status and best available price.",
)}`;

const FACTS = [
  ["Developer", "Emaar India"],
  ["Location", "Sector 62, Golf Course Extension Road"],
  ["Original offering", "3 & 4 BHK, simplex & duplex"],
  ["Advertised sizes", "Approx. 2,122–5,266 sq ft"],
  ["Haryana RERA", RERA_NUMBER],
  ["Developer status", "Official Emaar page currently shows Sold Out"],
] as const;

const RESALE_SNAPSHOT = [
  ["2,122 sq ft", "₹3.72 Cr", "₹17.53K/sq ft", "Housing.com · updated Sep 2026"],
  ["2,122 sq ft", "₹4.00 Cr", "₹18.85K/sq ft", "Housing.com · updated Aug 2026"],
  ["2,122 sq ft", "₹4.13 Cr", "₹19.46K/sq ft", "Housing.com · updated Aug 2026"],
  ["2,122 sq ft", "₹4.40 Cr", "₹20.73K/sq ft", "Housing.com · updated Jul 2026"],
] as const;

const AMENITIES = [
  ["Swimming & wellness", "Swimming pool, yoga zone and wellness-oriented recreation spaces."],
  ["Fitness", "Modern gym and active-lifestyle facilities within the community."],
  ["Family recreation", "Kids' play area, indoor games and landscaped community spaces."],
  ["Community", "Open amphitheatre and social areas are highlighted in Emaar's official material."],
] as const;

const FAQS = [
  [
    "Is Emaar Urban Oasis still available directly from the developer?",
    "Emaar's official Urban Oasis page currently displays Sold Out for the original 3 and 4 BHK offering. Current opportunities may therefore be resale or assignment inventory unless Emaar releases a separate phase or inventory. Always verify the exact unit and phase before paying a token.",
  ],
  [
    "What is the RERA number of Emaar Urban Oasis?",
    `The original Urban Oasis registration referenced by Emaar is ${RERA_NUMBER}, dated 7 August 2023. Phase-specific registrations should be checked separately because later phases can have different RERA numbers and configurations.`,
  ],
  [
    "What is the current resale asking price for a 2,122 sq ft 3 BHK?",
    "A portal snapshot reviewed on 18 September 2026 shows 2,122 sq ft asking references from about ₹3.72 Cr to ₹4.40 Cr. These are advertisements, not registered transaction evidence, and pricing varies by tower, floor, view, payment status and seller terms.",
  ],
  [
    "Does a portal's price per sq ft represent the real transaction rate?",
    "Not necessarily. Portal prices are asking prices and can be duplicated, stale or based on different area definitions. Compare the exact area basis, seller payment status, future builder demands, transfer charges and unit attributes before using a price per sq ft benchmark.",
  ],
  [
    "How is Urban Oasis connected to Golf Course Extension Road?",
    "The project is in Sector 62 in the Golf Course Extension Road micro-market. Buyers should compare the exact route, nearby infrastructure and commute requirements rather than relying only on promotional travel-time claims.",
  ],
] as const;

function Heading({ eyebrow, title: h, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">{h}</h2>
      {copy ? <p className="mt-4 leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

export const Route = createFileRoute("/projects/emaar-urban-oasis-sector-62")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: HERO },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: HERO },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ApartmentComplex",
              name: "Emaar Urban Oasis",
              url: canonical,
              description,
              image: [HERO, GREEN, POOL],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 62, Golf Course Extension Road",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              additionalProperty: [
                { "@type": "PropertyValue", name: "Developer", value: "Emaar India" },
                { "@type": "PropertyValue", name: "RERA", value: RERA_NUMBER },
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_ORIGIN}/projects` },
                { "@type": "ListItem", position: 3, name: "Emaar Urban Oasis", item: canonical },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map(([q, a]) => ({
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
  component: Page,
});

function Page() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="surface-navy text-white">
        <div className="container-page grid min-h-[700px] items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-white/55">
              <Link to="/">Home</Link><span className="px-2">/</span><Link to="/projects">Projects</Link><span className="px-2">/</span><span>Emaar Urban Oasis</span>
            </nav>
            <div className="mt-7 flex flex-wrap gap-2">
              <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">Sector 62 · Golf Course Extension Road</Badge>
              <Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">Resale & assignment research</Badge>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Premium 3 & 4 BHK · Unit-level due diligence</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">Emaar Urban Oasis<span className="mt-2 block text-gradient-gold">Sector 62, Gurugram</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              A buyer-focused guide to Emaar Urban Oasis with official Emaar references, RERA context and current resale asking signals. Emaar's official page currently marks the original offering <strong className="text-white">Sold Out</strong>, so this page focuses on verifying resale and assignment opportunities rather than implying fresh developer inventory.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="gold"><a href={WA} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "urban_oasis_hero")}>Get Current Resale Inventory <MessageCircle /></a></Button>
              <Button asChild size="xl" variant="goldOutline"><a href="#price">Check Current Asking Prices <ArrowRight /></a></Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
            <img src={HERO} alt="Official Emaar artistic impression of Urban Oasis Sector 62 Gurugram" width={1620} height={832} fetchPriority="high" className="aspect-[16/10] w-full object-cover" />
            <figcaption className="bg-navy px-5 py-3 text-xs text-white/60">Official Emaar artistic impression</figcaption>
          </figure>
        </div>
      </section>

      <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur" aria-label="Page sections">
        <div className="container-page flex gap-7 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">
          {[["Overview","#overview"],["Resale prices","#price"],["Official video","#video"],["Amenities","#amenities"],["Location","#location"],["Due diligence","#due-diligence"],["FAQ","#faq"]].map(([label, href]) => <a key={href} href={href} className="shrink-0 hover:text-gold">{label}</a>)}
        </div>
      </nav>

      <section id="overview" className="container-page py-16 sm:py-20">
        <Heading eyebrow="Project overview" title="Separate the original Emaar offering from today's resale market" copy="The original Urban Oasis page from Emaar remains the primary source for project positioning and amenities. Current resale availability and prices are unit-specific and should be independently verified." />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map(([label, value]) => <div key={label} className="bg-card p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-lg text-navy">{value}</dd></div>)}
        </dl>
        <div className="mt-7 flex flex-wrap gap-4 text-sm">
          <a href={EMAAR_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline">Official Emaar page <ExternalLink className="size-4" /></a>
          <a href={EMAAR_BROCHURE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline">Official brochure <ExternalLink className="size-4" /></a>
          <a href={RERA_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline">Haryana RERA <ExternalLink className="size-4" /></a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Research reviewed 18 September 2026.</p>
      </section>

      <section id="price" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page">
          <Heading eyebrow="Current online asking snapshot" title="2,122 sq ft 3 BHK listings currently span a wide range" copy="Recent portal advertisements demonstrate why an average project rate is not enough. Floor, view, seller payment status, outstanding builder demands and transfer economics can materially change the effective acquisition cost." />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-[.8fr_.8fr_.8fr] gap-3 border-b border-border bg-muted/40 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-4"><span>Area</span><span>Asking</span><span>₹/sq ft</span><span className="hidden sm:block">Reference</span></div>
            {RESALE_SNAPSHOT.map(([area, asking, rate, reference]) => <div key={`${asking}-${rate}`} className="grid grid-cols-[.8fr_.8fr_.8fr] gap-3 border-b border-border px-5 py-4 text-sm last:border-0 sm:grid-cols-4"><span className="font-medium text-navy">{area}</span><span className="font-semibold">{asking}</span><span>{rate}</span><span className="hidden text-muted-foreground sm:block">{reference}</span></div>)}
          </div>
          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950"><strong>Price caution:</strong> These are online asking references, not registered transaction prices. A lower asking price can reflect a different floor/view, payment stage, urgent seller terms or incomplete cost disclosure. Verify the complete acquisition cost before comparison.</div>
          <div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="gold"><a href={WA} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "urban_oasis_price")}>Request Verified Resale Inventory <MessageCircle /></a></Button><Button asChild variant="outline"><Link to={CURRENT_LISTING}>View Current Shubh Listing</Link></Button></div>
        </div>
      </section>

      <section id="video" className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div><Video className="size-8 text-gold" /><Heading eyebrow="Official Emaar promotional film" title="See the project vision before comparing a resale unit" copy="Use project marketing to understand the planned environment, then verify the exact resale unit separately." /><Button asChild variant="navy" className="mt-7"><a href={WATCH_VIDEO} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink /></a></Button></div>
          <div className="aspect-video overflow-hidden rounded-3xl border border-border bg-black shadow-xl"><iframe className="h-full w-full" src={VIDEO} title="Official Emaar Urban Oasis promotional video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
        </div>
      </section>

      <section id="amenities" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page">
          <Heading eyebrow="Official amenities" title="Lifestyle features highlighted by Emaar" copy="Amenities below are based on Emaar's official Urban Oasis material; exact operational status and phase access should be verified at possession." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{AMENITIES.map(([name, body]) => <article key={name} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><ShieldCheck className="size-6 text-gold" /><h3 className="mt-5 font-display text-xl text-navy">{name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div>
          <div className="mt-10 grid gap-5 md:grid-cols-2"><figure className="overflow-hidden rounded-3xl border border-border bg-card"><img src={GREEN} alt="Official Emaar Urban Oasis landscaped green artistic impression" loading="lazy" className="aspect-[16/10] w-full object-cover" /><figcaption className="p-4 text-xs text-muted-foreground">Official Emaar artistic impression</figcaption></figure><figure className="overflow-hidden rounded-3xl border border-border bg-card"><img src={POOL} alt="Official Emaar Urban Oasis amenity and pool artistic impression" loading="lazy" className="aspect-[16/10] w-full object-cover" /><figcaption className="p-4 text-xs text-muted-foreground">Official Emaar artistic impression</figcaption></figure></div>
        </div>
      </section>

      <section id="location" className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><MapPin className="size-8 text-gold" /><Heading eyebrow="Sector 62" title="Golf Course Extension Road market context" copy="Urban Oasis should be compared with Sector 62 and the wider Golf Course Extension Road corridor, not evaluated in isolation." /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/locations/golf-course-extension-road" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50"><h3 className="font-display text-xl text-navy">Golf Course Extension Road guide</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare the wider corridor, connectivity and residential micro-markets.</p></Link>
            <Link to="/property-sector-62-gurgaon" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50"><h3 className="font-display text-xl text-navy">Property in Sector 62 Gurgaon</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">See Sector 62 inventory and location-level options.</p></Link>
            <Link to="/higher-floor-apartments-golf-course-extension-road" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50"><h3 className="font-display text-xl text-navy">Higher-floor apartments</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Useful when floor, view and openness materially affect the shortlist.</p></Link>
            <Link to="/projects/godrej-vrikshya-sector-103-gurgaon" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50"><h3 className="font-display text-xl text-navy">Compare Godrej Vrikshya</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare this Golf Course Extension Road option with a Sector 103 Dwarka Expressway project.</p></Link>
          </div>
        </div>
      </section>

      <section id="due-diligence" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page">
          <Heading eyebrow="Resale due diligence" title="What to verify before agreeing on a resale price" copy="The correct comparison is the effective acquisition cost of the exact unit—not the portal headline alone." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[
            ["Exact unit & phase", "Tower, floor, facing, view, unit schedule and the applicable RERA registration."],
            ["Area basis", "Carpet area, balcony/exclusive area and the saleable or built-up figure used in advertisements."],
            ["Payment position", "Amount already paid, future Emaar demands, overdue amounts and seller receivables."],
            ["Transfer terms", "Assignment/resale eligibility, developer process, documentation and applicable charges."],
            ["Comparable asks", "Like-for-like units rather than mixing different sizes, floors, payment stages or phases."],
            ["Funding & valuation", "Bank valuation, loan eligibility and timing of disbursement relative to transfer."],
          ].map(([name, body]) => <article key={name} className="rounded-2xl border border-border bg-card p-6"><CheckCircle2 className="size-5 text-gold" /><h3 className="mt-4 font-display text-xl text-navy">{name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="navy"><Link to="/property-buying-advisory-gurgaon">Property Buying Advisory <ArrowRight /></Link></Button><Button asChild variant="outline"><Link to="/blog/gurgaon-property-due-diligence-checklist-2026">Due Diligence Checklist</Link></Button></div>
        </div>
      </section>

      <section id="faq" className="container-page py-16 sm:py-20">
        <Heading eyebrow="Buyer FAQ" title="Emaar Urban Oasis questions to resolve before paying a token" />
        <div className="mt-9 grid gap-4 lg:grid-cols-2">{FAQS.map(([q, a]) => <article key={q} className="rounded-2xl border border-border bg-card p-6"><h3 className="font-display text-xl text-navy">{q}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p></article>)}</div>
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-8 rounded-3xl surface-navy p-7 text-white sm:p-10 lg:grid-cols-[1fr_24rem]">
          <div><p className="eyebrow">Resale shortlist</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Compare the exact Urban Oasis unit</h2><p className="mt-4 max-w-2xl leading-7 text-white/70">Share your budget, preferred size, floor and view. We can compare current seller asks with payment status, future demands and transaction structure before a site visit.</p></div>
          <div className="rounded-2xl bg-white p-5 text-foreground"><EnquiryForm interest="Emaar Urban Oasis Sector 62 resale" compact includeRequirements /></div>
        </div>
      </section>
    </main>
  );
}
