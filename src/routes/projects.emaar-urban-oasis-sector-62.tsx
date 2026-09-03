import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ExternalLink, MapPin, MessageCircle, Phone, ShieldCheck, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/emaar-urban-oasis-sector-62";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Emaar Urban Oasis Sector 62 Gurgaon | Amenities, Price & Resale";
const description = "Explore Emaar Urban Oasis Sector 62 Gurgaon: official Emaar amenities, clubhouse, pools, premium specifications, 3 & 4 BHK sizes and resale guidance.";
const EMAAR_PAGE = "https://in.emaar.com/en/properties/urban-oasis/";
const EMAAR_BROCHURE = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Urban-Oasis-EOI.pdf";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/project_preview_open/2518";
const CURRENT_LISTING = "/property/3-bhk-emaar-urban-oasis-apartment-sector-62-gurgaon";
const HERO = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Home-Page-Banner-1620x832.jpg";
const GREEN = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Main-Community-Image-1-1-1620x832.jpg";
const POOL = "https://cdn.in.emaar.com/wp-content/uploads/2023/08/Amenities-680-x-680-1.jpg";
const VIDEO = "https://www.youtube-nocookie.com/embed/Fr8KUYb3rWY";
const WATCH_VIDEO = "https://www.youtube.com/watch?v=Fr8KUYb3rWY";
const WA = `${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Mr Arun Madaan, I am interested in Emaar Urban Oasis Sector 62. Please share current inventory, tower, floor, facing, view, payment status and best available price.")}`;

const FACTS = [
  ["Developer", "Emaar India"], ["Phase 1 & 2", "6.64 acres within 9.53-acre parcel"],
  ["Homes", "3 BHK, 4 BHK, simplex & duplex"], ["Sizes", "Approx. 2,122–5,266 sq ft"],
  ["Location", "Sector 62, Golf Course Extension Road"], ["RERA", "GGM/741/473/2023/85"],
] as const;
const AMENITIES = [
  ["Clubhouse & café", "Exclusive clubhouse, café, banquet lawn and community spaces."],
  ["Adult + kids pools", "Adult swimming pool, separate kids' pool and pool deck."],
  ["Fitness & sports", "Modern gym, outdoor gym, yoga, jogging track, indoor games and play court."],
  ["Landscape & family", "Lily Pond, Tree Plaza, amphitheatre, kids' play, crèche, teenage and elderly zones."],
] as const;
const SPECS = [
  ["Living / dining", ["Imported stone flooring", "Acrylic emulsion finish"]],
  ["Bedrooms", ["Laminated wooden flooring", "Modular wardrobes"]],
  ["Fully equipped kitchen", ["Hob + chimney", "Microwave + oven", "Dishwasher + refrigerator", "Washer-dryer + under-counter RO"]],
  ["Comfort & smart living", ["VRF AC in bedrooms, living/dining and kitchen", "Smart main-door lock + video door phone", "EV charging for one allotted parking spot", "Motion-sensor lift-lobby lighting"]],
] as const;
const UNITS = [
  ["3 BHK + 3T", "2,122.64 sq ft", "Approx. ₹4.25 Cr*"],
  ["4 BHK + Utility", "3,039.87 sq ft", "Approx. ₹6.08 Cr*"],
  ["4 BHK Duplex", "3,589.74 sq ft", "Approx. ₹7.18 Cr*"],
  ["Large 4 BHK + Terrace", "Up to approx. 5,266.31 sq ft", "Unit-specific"],
] as const;
const FAQS = [
  ["What amenities does Urban Oasis offer?", "Official Emaar material lists adult and kids' pools, clubhouse, café, gym, outdoor gym, yoga, jogging, indoor games, play court, amphitheatre, banquet/community lawns, kids' play, crèche, teenage and elderly zones, Lily Pond and Tree Plaza."],
  ["What premium specifications are included?", "The brochure specifies imported-stone living areas, wooden bedroom flooring, modular wardrobes, VRF AC including the kitchen, branded bathroom fittings and a fully equipped modular kitchen."],
  ["What is the current resale guidance?", "Our working guidance is around ₹20,000 per sq ft all-inclusive. Final pricing varies by tower, floor, facing, view, payment status and seller terms."],
  ["Is the project RERA registered?", "Yes. Phase 1 and 2 are registered under RC/REP/HARERA/GGM/741/473/2023/85 dated 7 August 2023. Verify the latest authority record for the exact phase and unit."],
] as const;

function Heading({ eyebrow, title: h, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">{h}</h2>{copy ? <p className="mt-4 leading-7 text-muted-foreground">{copy}</p> : null}</div>;
}

export const Route = createFileRoute("/projects/emaar-urban-oasis-sector-62")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description }, { name: "robots", content: "index,follow,max-image-preview:large,max-video-preview:-1" },
      { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" },
      { property: "og:url", content: canonical }, { property: "og:image", content: HERO }, { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:image", content: HERO },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ApartmentComplex", name: "Emaar Urban Oasis", url: canonical, description, image: [HERO, GREEN, POOL], address: { "@type": "PostalAddress", streetAddress: "Sector 62, Golf Course Extension Road", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" }, additionalProperty: [{ "@type": "PropertyValue", name: "Developer", value: "Emaar India" }, { "@type": "PropertyValue", name: "RERA", value: "RC/REP/HARERA/GGM/741/473/2023/85" }] }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }) },
    ],
  }),
  component: Page,
});

function Page() {
  return <main className="overflow-hidden bg-background">
    <section className="surface-navy text-white"><div className="container-page grid min-h-[700px] items-center gap-12 py-20 lg:grid-cols-2">
      <div><div className="flex flex-wrap gap-2"><Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">Sector 62 · Golf Course Extension Road</Badge><Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">Official Emaar amenities & specifications</Badge></div>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Luxury 3 & 4 BHK · Resale & assignment</p>
      <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">Emaar Urban Oasis<span className="mt-2 block text-gradient-gold">Sector 62, Gurugram</span></h1>
      <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">A premium Emaar community with adult and kids&apos; pools, clubhouse, café, gym, yoga, sports, amphitheatre and landscaped family zones—paired with imported-stone living areas, wooden bedroom flooring, VRF AC and a fully equipped modular kitchen. Current working resale guidance is <strong className="text-white">around ₹20,000 per sq ft</strong>, subject to the exact unit.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="xl" variant="gold"><a href={WA} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "urban_oasis_hero")}>Get Live Inventory <MessageCircle /></a></Button><Button asChild size="xl" variant="goldOutline"><a href="#amenities">Explore Amenities <ArrowRight /></a></Button></div></div>
      <figure className="overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl"><img src={HERO} alt="Official Emaar render of Urban Oasis Sector 62 Gurugram" width={1620} height={832} fetchPriority="high" className="aspect-[16/10] w-full object-cover" /><figcaption className="bg-navy px-5 py-3 text-xs text-white/60">Official Emaar artistic impression</figcaption></figure>
    </div></section>

    <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur" aria-label="Page sections"><div className="container-page flex gap-7 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">{[["Overview","#overview"],["Official video","#video"],["Amenities","#amenities"],["Specifications","#specs"],["Price & inventory","#inventory"],["FAQ","#faq"]].map(([l,h]) => <a key={h} href={h} className="shrink-0 hover:text-gold">{l}</a>)}</div></nav>

    <section id="overview" className="container-page py-16 sm:py-20"><Heading eyebrow="Project overview" title="Understand the complete project—not only the apartment" copy="Urban Oasis Phase 1 and 2 cover 6.64 acres within the larger 9.53-acre group housing parcel, combining large-format homes with a detailed recreation and landscape programme."/><dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{FACTS.map(([l,v]) => <div key={l} className="bg-card p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{l}</dt><dd className="mt-2 font-display text-lg text-navy">{v}</dd></div>)}</dl><div className="mt-6 flex flex-wrap gap-5 text-xs text-muted-foreground"><span>Reviewed 3 September 2026</span><a href={EMAAR_PAGE} target="_blank" rel="noreferrer" className="hover:text-gold">Official Emaar page</a><a href={EMAAR_BROCHURE} target="_blank" rel="noreferrer" className="hover:text-gold">Official brochure</a><a href={RERA_PAGE} target="_blank" rel="noreferrer" className="hover:text-gold">Haryana RERA</a></div></section>

    <section id="video" className="border-y border-border bg-secondary/25 py-16 sm:py-20"><div className="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><Video className="size-8 text-gold" /><Heading eyebrow="Official Emaar promotional film" title="Experience the Urban Oasis vision" copy="The official project film is embedded here so buyers can see the positioning before comparing individual resale units."/><Button asChild variant="navy" className="mt-7"><a href={WATCH_VIDEO} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink /></a></Button></div><div className="aspect-video overflow-hidden rounded-3xl border border-border bg-black shadow-xl"><iframe className="h-full w-full" src={VIDEO} title="Official Emaar Urban Oasis promotional video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></div></section>

    <section id="amenities" className="container-page py-16 sm:py-20"><Heading eyebrow="Lifestyle & premier facilities" title="Leisure, wellness, sport and community—not generic amenities" copy="These facilities are drawn from Emaar's official Urban Oasis material and master plan."/><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{AMENITIES.map(([n,t]) => <article key={n} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><ShieldCheck className="size-6 text-gold" /><h3 className="mt-5 font-display text-xl text-navy">{n}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{t}</p></article>)}</div><div className="mt-10 grid gap-5 md:grid-cols-2"><figure className="overflow-hidden rounded-3xl border border-border"><img src={GREEN} alt="Official Emaar Urban Oasis landscaped green render" loading="lazy" className="aspect-[16/10] w-full object-cover" /><figcaption className="p-4 text-xs text-muted-foreground">Official Emaar landscape artistic impression</figcaption></figure><figure className="overflow-hidden rounded-3xl border border-border"><img src={POOL} alt="Official Emaar Urban Oasis amenity and pool render" loading="lazy" className="aspect-[16/10] w-full object-cover" /><figcaption className="p-4 text-xs text-muted-foreground">Official Emaar amenity artistic impression</figcaption></figure></div></section>

    <section id="specs" className="border-y border-border bg-secondary/25 py-16 sm:py-20"><div className="container-page"><Heading eyebrow="Premium apartment specifications" title="The specification is a major Urban Oasis USP" copy="The exact agreement and unit schedule remain controlling, but Emaar's official brochure specifies a high level of finish and equipment."/><div className="mt-10 grid gap-5 md:grid-cols-2">{SPECS.map(([n,items]) => <article key={n} className="rounded-2xl border border-border bg-card p-6"><h3 className="font-display text-xl text-navy">{n}</h3><ul className="mt-4 space-y-2">{items.map(i => <li key={i} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" />{i}</li>)}</ul></article>)}</div><div className="mt-8 rounded-3xl surface-navy p-7 text-white"><p className="eyebrow">Standout specification</p><h3 className="mt-3 font-display text-3xl">Fully equipped kitchen + VRF AC including the kitchen</h3></div></div></section>

    <section id="inventory" className="container-page py-16 sm:py-20"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><Heading eyebrow="Resale & assignment inventory" title="Indicative size and value comparison" copy="Working guidance is around ₹20,000 per sq ft all-inclusive. Final price and total acquisition cost are unit-specific."/><Button asChild variant="gold"><a href={WA} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "urban_oasis_inventory")}>Get Live Inventory <MessageCircle /></a></Button></div><div className="mt-10 overflow-x-auto rounded-2xl border border-border"><table className="w-full min-w-[700px] text-left"><thead className="surface-navy text-white"><tr><th className="px-6 py-4">Configuration</th><th className="px-6 py-4">Approx. area</th><th className="px-6 py-4">Guidance</th><th className="px-6 py-4">Indicative total</th></tr></thead><tbody className="divide-y divide-border">{UNITS.map(([c,a,t]) => <tr key={c}><td className="px-6 py-5 font-medium text-navy">{c}</td><td className="px-6 py-5 text-sm text-muted-foreground">{a}</td><td className="px-6 py-5 text-sm text-muted-foreground">Around ₹20,000/sq ft*</td><td className="px-6 py-5 font-display text-lg text-navy">{t}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs text-muted-foreground">*Indicative guidance only; taxes, statutory charges, builder dues, transfer expenses and availability vary unit-wise.</p><div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:flex-row sm:items-center"><div><p className="font-display text-xl text-navy">Current 3 BHK Urban Oasis listing</p><p className="mt-1 text-sm text-muted-foreground">Compare it with live and off-market options.</p></div><Button asChild variant="gold"><Link to={CURRENT_LISTING}>View Listing <ArrowRight /></Link></Button></div></section>

    <section className="surface-navy py-16 text-white"><div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">Sector 62 location</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Right off Golf Course Extension Road</h2><p className="mt-5 leading-7 text-white/65">Connected towards Golf Course Road, business districts, Rapid Metro links, schools, healthcare and established retail.</p><Button asChild variant="gold" className="mt-7"><Link to="/locations/golf-course-extension-road">Explore Location <MapPin /></Link></Button></div><aside className="rounded-3xl border border-white/10 bg-white/5 p-7"><p className="font-display text-2xl">Buyer checks</p><ul className="mt-5 space-y-3 text-sm text-white/70">{["Tower, floor, facing and view","Seller payment status and builder dues","Transfer/NOC process","Total acquisition cost and latest project records"].map(i => <li key={i} className="flex gap-2"><CheckCircle2 className="size-5 shrink-0 text-gold" />{i}</li>)}</ul></aside></div></section>

    <section className="container-page py-16 sm:py-20"><div className="grid gap-10 lg:grid-cols-[1fr_.9fr]"><div><Heading eyebrow="Private buyer assistance" title="Request inventory, floor plans and best available price" copy="Share your budget, configuration, floor band and view. We will compare relevant live options."/><div className="mt-7 flex gap-3"><Button asChild variant="gold"><a href={WA} target="_blank" rel="noreferrer">WhatsApp <MessageCircle /></a></Button><Button asChild variant="navy"><a href={CONTACT.phoneHref}>Call {CONTACT.phone} <Phone /></a></Button></div></div><aside className="rounded-3xl border border-border bg-card p-7 shadow-sm"><EnquiryForm interest="Emaar Urban Oasis inventory, amenities and floor plans" compact /></aside></div></section>

    <section id="faq" className="border-y border-border bg-secondary/25 py-16 sm:py-20"><div className="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><Heading eyebrow="Buyer questions" title="Emaar Urban Oasis Sector 62 FAQ"/><div className="space-y-3">{FAQS.map(([q,a]) => <details key={q} className="rounded-2xl border border-border bg-card p-5"><summary className="cursor-pointer font-display text-lg text-navy">{q}</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p></details>)}</div></div></section>

    <section className="container-page py-16"><div className="rounded-[2rem] surface-navy px-7 py-12 text-center text-white"><p className="eyebrow">Urban Oasis buyer advisory</p><h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl sm:text-5xl">Choose the right Urban Oasis unit—not simply an available one</h2><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild variant="gold" size="xl"><a href={WA} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "urban_oasis_final")}>Get Live Inventory <MessageCircle /></a></Button><Button asChild variant="goldOutline" size="xl"><a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "urban_oasis_final")}>Call {CONTACT.phone} <Phone /></a></Button></div></div></section>

    <section className="container-page pb-16 text-xs leading-6 text-muted-foreground"><div className="border-t border-border pt-6"><p><strong className="text-foreground">Source note:</strong> Amenity and specification descriptions are based on Emaar India's official Urban Oasis material and brochure. Artistic impressions may not represent the completed view.</p><p className="mt-2"><strong className="text-foreground">Independent advisory:</strong> This page is operated by {CONTACT.name} and is not the official Emaar website. Pricing is indicative; signed agreements, latest RERA/builder records and unit-specific terms control the transaction.</p></div></section>
  </main>;
}
