import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, CheckCircle2, Home, Landmark, MapPin, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/affordable-flats-for-sale-in-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Affordable Flats in Gurgaon | 2 & 3 BHK from ₹45 Lakh";
const description = "Explore affordable flats for sale in Gurgaon. Selected 2 BHK homes from ₹45 lakh and 3 BHK from ₹62 lakh. Compare resale options and get home-loan assistance from Shubh Estate Brokers.";

type Project = { name: string; location: string; configurations: string; corridor: string; status: string };
const PROJECTS: Project[] = [
  { name: "Signature Global Solera", location: "Sector 107", configurations: "Confirm current configurations", corridor: "Dwarka Expressway", status: "Check current availability" },
  { name: "Conscient Habitat", location: "Sector 102 area", configurations: "Confirm exact project and configurations", corridor: "Dwarka Expressway", status: "Verify project identity" },
  { name: "Yashika 99A", location: "Sector 99A area", configurations: "Confirm official name and configurations", corridor: "Dwarka Expressway", status: "Verify project identity" },
  { name: "Signature Global The Millennia", location: "Sector 37D", configurations: "2 BHK", corridor: "Dwarka Expressway", status: "Check current availability" },
  { name: "Signature Global The Roselia", location: "Sector 95A", configurations: "2 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "Signature Global Orchard Avenue", location: "Sector 93", configurations: "1 & 2 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "Adani Aangan", location: "Sectors 88A–89A", configurations: "1 & 2 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "GLS Avenue 81", location: "Sector 81", configurations: "2 & 3 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "GLS Avenue 86", location: "Sector 86", configurations: "2 & 3 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "Pyramid Urban Homes 2", location: "Sector 86", configurations: "1 & 2 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "Pivotal Devaan", location: "Sector 84", configurations: "2 BHK", corridor: "New Gurgaon", status: "Check current availability" },
  { name: "Zara Aavaas", location: "Sector 104", configurations: "1 & 2 BHK", corridor: "Dwarka Expressway", status: "Check current availability" },
  { name: "Zara Rossa", location: "Sector 112", configurations: "2 BHK", corridor: "Dwarka Expressway", status: "Check current availability" },
  { name: "Agrante Kavyam Homes", location: "Sector 108", configurations: "2 BHK", corridor: "Dwarka Expressway", status: "Check current availability" },
  { name: "ROF Aalayas", location: "Sector 102", configurations: "1 & 2 BHK", corridor: "Dwarka Expressway", status: "Check current availability" },
  { name: "Pyramid Urban Homes", location: "Sector 70A", configurations: "1 & 2 BHK", corridor: "Central and western Gurugram", status: "Check current availability" },
  { name: "Signature Global The Serenas", location: "Sector 36, Sohna", configurations: "1 & 2 BHK", corridor: "Sohna and South Gurugram", status: "Check current availability" },
  { name: "Breez Global Hill View", location: "Sector 11, Sohna", configurations: "2 BHK", corridor: "Sohna and South Gurugram", status: "Check current availability" },
];

const FAQS = [
  { q: "What is the starting price of 2 BHK flats in Gurgaon?", a: "Selected 2 BHK units sourced through Shubh Estate Brokers may start from an indicative ₹45 lakh. This is not a guaranteed project-wide price; confirm the exact unit, floor, condition, seller expectation and applicable charges." },
  { q: "What is the starting price of 3 BHK flats in Gurgaon?", a: "Selected 3 BHK units may start from an indicative ₹62 lakh, subject to live inventory and unit-specific verification. Ask for a current cost sheet before making a decision." },
  { q: "Which affordable residential projects have resale units available?", a: "Availability changes frequently. The project directory below is a shortlist to check, not confirmation that every project has a live unit. Contact us for current resale inventory and unit-level details." },
  { q: "Are ready-to-move affordable apartments available in Gurugram?", a: "Options may be available in different sectors, but ready status must be checked for the specific tower and unit, including applicable occupation or completion documentation." },
  { q: "Can I buy an affordable flat with a home loan?", a: "Eligible buyers may apply for financing. Loan amount and approval depend on borrower eligibility, lender policy, property approval and valuation. Shubh Estate Brokers coordinates home-loan assistance through multiple banking relationships; we are not a bank." },
  { q: "What additional costs should I consider when buying a resale flat?", a: "Ask for a complete cost estimate covering the agreed price, stamp duty and registration, transfer or society charges where applicable, outstanding dues, brokerage, lender costs, repairs and other transaction-specific expenses." },
  { q: "What documents should be checked before purchasing a resale apartment?", a: "The checks may include ownership and transfer documents, title chain, encumbrances, approvals, applicable occupation/completion documents, maintenance and utility dues, seller identity and lender-specific legal/technical requirements. Obtain independent professional advice where needed." },
  { q: "Can I schedule a site visit?", a: "Yes. Submit the enquiry form with your preferred project, budget and timeline. Visits are arranged subject to the seller or project team's confirmation." },
  { q: "Why do prices vary between units in the same project?", a: "Price can vary by floor, view, tower, area basis, condition, furnishing, parking, payment status, seller urgency and outstanding dues. Compare unit-specific details rather than only project names." },
  { q: "How can I receive the latest list of available flats?", a: "Share your preferred BHK, budget, location and purchase timeline using the enquiry form. We can then check the current options that match your requirements." },
];

export const Route = createFileRoute("/affordable-flats-for-sale-in-gurgaon")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
  component: AffordableFlatsPage,
});

function AffordableFlatsPage() {
  const [configuration, setConfiguration] = useState("All");
  const [corridor, setCorridor] = useState("All");
  const [budget, setBudget] = useState("All");
  const filtered = useMemo(() => PROJECTS.filter((project) => {
    const configOk = configuration === "All" || project.configurations.includes(configuration) || project.configurations.startsWith("Confirm");
    const corridorOk = corridor === "All" || project.corridor === corridor;
    const budgetOk = budget === "All" || (budget === "Under ₹60 lakh" && configuration !== "3 BHK") || (budget === "₹60–80 lakh" && configuration === "3 BHK");
    return configOk && corridorOk && budgetOk;
  }), [configuration, corridor, budget]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Residential Properties", item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon` },
      { "@type": "ListItem", position: 3, name: "Affordable Flats in Gurgaon", item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative isolate overflow-hidden border-b border-border bg-navy text-navy-foreground">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/.24),transparent_48%),linear-gradient(120deg,hsl(var(--navy)),hsl(var(--navy)/.88))]" />
        <div className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-gold">Banking-grade real estate advisory</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Affordable Flats for Sale in Gurgaon – 2 BHK &amp; 3 BHK Homes</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-navy-foreground/80 sm:text-lg">Explore selected affordable apartments in Gurugram, with 2 BHK options starting from ₹45 lakh and 3 BHK options starting from ₹62 lakh. Compare available resale homes by budget, location and configuration with Shubh Estate Brokers.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg"><a href="#enquiry">Get Available Flats <ArrowRight className="ml-2 size-4" /></a></Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/5 text-white hover:bg-white/10"><a href="#enquiry">Book a Site Visit</a></Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
              {["Selected resale opportunities", "Transparent price confirmation", "Property & home-loan assistance"].map((item) => <div key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" /><span>{item}</span></div>)}
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[.06] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <p className="text-sm text-navy-foreground/70">Indicative selected-unit pricing</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/10 p-4"><p className="text-sm">2 BHK flats</p><p className="mt-1 font-display text-3xl text-gold">₹45 lakh+</p><p className="mt-1 text-xs text-navy-foreground/65">Selected units; confirm availability</p></div>
              <div className="rounded-xl border border-white/10 bg-black/10 p-4"><p className="text-sm">3 BHK flats</p><p className="mt-1 font-display text-3xl text-gold">₹62 lakh+</p><p className="mt-1 text-xs text-navy-foreground/65">Selected units; confirm availability</p></div>
            </div>
            <div className="mt-5 rounded-xl border border-gold/30 bg-gold/10 p-4"><p className="font-semibold">Up to 90% Home Loan Available*</p><p className="mt-1 text-xs leading-5 text-navy-foreground/70">Subject to borrower eligibility, lender policy, property approval and valuation. Loan approval and amount are not guaranteed.</p></div>
            <p className="mt-4 text-xs leading-5 text-navy-foreground/60">Prices and availability depend on the specific unit, configuration, floor, condition and applicable charges.</p>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-gold">Start with your budget</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Find a home that fits your plan</h2></div><p className="max-w-xl text-sm leading-6 text-muted-foreground">Starting prices are indicative for selected units—not guaranteed rates across every project.</p></div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"><div className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold"><Home /></div><p className="mt-5 text-sm text-muted-foreground">Selected options from</p><h3 className="mt-1 font-display text-3xl">2 BHK Flats in Gurgaon</h3><p className="mt-2 text-2xl font-semibold">₹45 lakh onwards</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare available resale homes by sector, floor, condition and total cost.</p><Button className="mt-5" onClick={() => { setConfiguration("2 BHK"); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>Explore 2 BHK Flats <ArrowDown className="ml-2 size-4" /></Button></article>
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"><div className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold"><Home /></div><p className="mt-5 text-sm text-muted-foreground">Selected options from</p><h3 className="mt-1 font-display text-3xl">3 BHK Flats in Gurgaon</h3><p className="mt-2 text-2xl font-semibold">₹62 lakh onwards</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Check family-sized options and compare unit-specific pricing before a visit.</p><Button className="mt-5" onClick={() => { setConfiguration("3 BHK"); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>Explore 3 BHK Flats <ArrowDown className="ml-2 size-4" /></Button></article>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 bg-secondary/30 py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-gold">Project shortlist</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Affordable residential projects to check</h2><p className="mt-3 leading-7 text-muted-foreground">This is an initial research list, not a live availability feed. Project identity, current unit inventory, prices, RERA details, amenities, possession status and photographs must be confirmed before publication as verified facts.</p></div>
          <div className="mt-7 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
            <label className="text-sm font-medium">Configuration<select value={configuration} onChange={(e) => setConfiguration(e.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3"><option>All</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option></select></label>
            <label className="text-sm font-medium">Location cluster<select value={corridor} onChange={(e) => setCorridor(e.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3"><option>All</option>{[...new Set(PROJECTS.map((p) => p.corridor))].map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="text-sm font-medium">Budget guide<select value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3"><option>All</option><option>Under ₹60 lakh</option><option>₹60–80 lakh</option></select></label>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{filtered.length} projects in this shortlist match your filters. All require current availability confirmation.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => <article key={project.name} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-gold"><MapPin /></div><h3 className="mt-4 font-display text-xl">{project.name}</h3><p className="mt-1 text-sm text-muted-foreground">{project.location} · {project.corridor}</p><div className="mt-4 space-y-2 text-sm"><p><span className="font-medium">Configurations:</span> {project.configurations}</p><p><span className="font-medium">Current price:</span> Price on request</p><p><span className="font-medium">Availability:</span> {project.status}</p></div><div className="mt-auto pt-5"><Button asChild variant="outline" className="w-full"><a href="#enquiry" onClick={() => { /* anchor opens the shared enquiry form below */ }}>Check Current Availability <ArrowRight className="ml-2 size-4" /></a></Button></div></article>)}
          </div>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">Project names and locations above are preliminary research inputs. Exact project identity, sector, configuration and current inventory are not represented as independently verified. No project photograph is shown until image reuse rights are documented.</p>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-border p-6"><MapPin className="size-6 text-gold" /><h3 className="mt-4 font-display text-xl">Location-first shortlisting</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare selected options around Dwarka Expressway, New Gurgaon, western Gurugram and Sohna based on commute, family needs and unit-level availability.</p></article>
          <article className="rounded-2xl border border-border p-6"><ShieldCheck className="size-6 text-gold" /><h3 className="mt-4 font-display text-xl">Fair and transparent advice</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Shortlisting, price comparison, negotiation support, documentation coordination and due-diligence checkpoints help buyers make informed decisions.</p></article>
          <article className="rounded-2xl border border-border p-6"><Landmark className="size-6 text-gold" /><h3 className="mt-4 font-display text-xl">Home-loan assistance</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Coordinate eligibility, lender documentation and valuation with participating banks. Approval and final loan terms remain the lender's decision.</p><Link to="/homeloan" className="mt-3 inline-flex items-center text-sm font-semibold text-gold hover:underline">Explore home-loan assistance <ArrowRight className="ml-1 size-4" /></Link></article>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 container-page pb-12 sm:pb-16">
        <div className="grid gap-8 rounded-2xl border border-gold/30 bg-card p-6 sm:p-9 lg:grid-cols-[1fr_24rem]">
          <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-gold">Tell us what you need</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">Get the latest affordable flat options</h2><p className="mt-3 leading-7 text-muted-foreground">Share your budget, preferred BHK, project or sector and expected purchase timeline. We will check suitable options and confirm unit-level details before suggesting a visit.</p><ul className="mt-5 space-y-3 text-sm">{["Shortlisting based on budget and family requirements", "Price negotiation and site-visit coordination", "Documentation and home-loan process assistance"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />{x}</li>)}</ul></div>
          <EnquiryForm interest="Affordable flats for sale in Gurgaon" compact includeRequirements submitLabel="Get Available Flats" />
        </div>
      </section>

      <section className="container-page pb-12 sm:pb-16">
        <div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-gold">Frequently asked questions</p><h2 className="mt-2 font-display text-3xl">Buying affordable flats in Gurgaon</h2><div className="mt-6 space-y-4">{FAQS.map((faq) => <article key={faq.q} className="rounded-xl border border-border bg-card p-5"><h3 className="font-display text-lg">{faq.q}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p></article>)}</div></div>
      </section>
    </>
  );
}
