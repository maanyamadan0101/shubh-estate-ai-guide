import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Globe2,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  PlayCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Trees,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/aipl-riviera-resale-sector-103-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "AIPL Riviera Resale Sector 103 | ₹12,000/Sq Ft";
const description =
  "Explore select AIPL Riviera resale units in Sector 103 Gurgaon around ₹12,000/sq ft, approximately 31% below the published launch reference. NRI and end-user assistance.";
const LAST_REVIEWED = "24 August 2026";
const REFERENCE_RATE = 17_450;
const OPPORTUNITY_RATE = 12_000;
const DISCOUNT_PERCENT = Math.round((1 - OPPORTUNITY_RATE / REFERENCE_RATE) * 100);

const AIPL_PAGE = "https://aipl.com/riviera/";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/searchprojectDetail/3752";
const RERA_CERTIFICATE = "https://haryanarera.gov.in/view_project/view_certificate/MjAzNw%3D%3D";
const VIDEO_PATH = "/projects/aipl-riviera/aipl-riviera-sector-103-walkthrough.mp4";
const VIDEO_POSTER = "/projects/aipl-riviera/aipl-riviera-walkthrough-poster.jpg";

const QUICK_FACTS = [
  ["Resale rate", "Around ₹12,000/sq ft"],
  ["Published reference", "₹17,450/sq ft"],
  ["Value gap", `Approx. ${DISCOUNT_PERCENT}% lower`],
  ["Project", "2 towers / 344 homes"],
  ["Configuration", "Spacious 3 & 4 BHK"],
  ["RERA completion", "30 June 2033"],
] as const;

const UNIT_COMPARISON = [
  {
    configuration: "3 BHK",
    area: 2_196,
    resale: "₹2.64 Cr",
    reference: "₹3.83 Cr",
    saving: "Approx. ₹1.20 Cr",
  },
  {
    configuration: "3 BHK + Utility",
    area: 2_398,
    resale: "₹2.88 Cr",
    reference: "₹4.18 Cr",
    saving: "Approx. ₹1.31 Cr",
  },
  {
    configuration: "Larger 3 BHK + Utility/Study",
    area: 2_650,
    resale: "₹3.18 Cr",
    reference: "₹4.62 Cr",
    saving: "Approx. ₹1.44 Cr",
  },
  {
    configuration: "4 BHK + Utility",
    area: 3_211,
    resale: "₹3.85 Cr",
    reference: "₹5.60 Cr",
    saving: "Approx. ₹1.75 Cr",
  },
] as const;

const END_USER_REASONS = [
  "Large-format homes with wrap-around decks and natural-light-focused planning",
  "Low-density residential phase with 344 homes across two towers",
  "Central lake, landscaped greens and pedestrian-oriented community spaces",
  "Delhi-facing Sector 103 location with Dwarka Expressway and airport connectivity",
] as const;

const NRI_SUPPORT = [
  "Live video presentation and unit-by-unit remote shortlisting",
  "Seller allotment, payment ledger and transfer-document coordination",
  "Price, outstanding builder demand and total acquisition-cost comparison",
  "NRI home-loan, power-of-attorney, TDS and registration-process coordination",
] as const;

const BUYER_CHECKS = [
  {
    title: "Confirm the exact unit is transferable",
    text: "Obtain the promoter's written confirmation of the unit number, seller ledger, outstanding instalments, transfer process, transfer charges and any lock-in or consent requirement.",
  },
  {
    title: "Check the frozen-inventory position",
    text: "The project has pending land-partition litigation. Confirm in writing that the shortlisted unit does not fall within the proportionate saleable carpet area directed to remain frozen.",
  },
  {
    title: "Match the agreement and RERA disclosures",
    text: "Review the Agreement for Sale, allotment chain and the complete litigation disclosure required by Haryana RERA before paying a token or transfer amount.",
  },
  {
    title: "Verify approvals and access",
    text: "Check the latest environment, fire, service-plan and construction approvals, along with the present approach road and the status of the proposed 30-metre access road.",
  },
  {
    title: "Compare total cost, not only the headline rate",
    text: "Add the seller premium, builder outstanding, transfer charges, applicable taxes, maintenance advance, stamp duty and registration to arrive at the actual acquisition cost.",
  },
] as const;

const FAQS = [
  {
    q: "What is the resale price of AIPL Riviera Sector 103?",
    a: "Shubh Estate currently has select resale or transfer opportunities indicated around ₹12,000 per sq ft, subject to the exact apartment, floor, view, seller payment position, builder transfer approval and continuing availability.",
  },
  {
    q: "How much lower is ₹12,000 per sq ft than the launch reference?",
    a: "Compared with AIPL's published inaugural reference of ₹17,450 per sq ft, a ₹12,000 per sq ft opportunity is approximately 31% lower, a difference of about ₹5,450 per sq ft.",
  },
  {
    q: "Is this a fresh booking from AIPL?",
    a: "No. These are select seller-held allotments proposed for resale or transfer. The buyer should verify the seller's allotment documents, paid amount, future builder instalments and the promoter's current transfer procedure.",
  },
  {
    q: "What apartment sizes are available in AIPL Riviera?",
    a: "The project is primarily positioned around spacious 3 and 4 BHK residences. Commonly marketed areas include approximately 2,196, 2,398, 2,650 and 3,211 sq ft, although current resale availability may be limited to particular units.",
  },
  {
    q: "When is AIPL Riviera expected to be completed?",
    a: "The Haryana RERA registration records 30 June 2033 as the project completion date declared by the promoter.",
  },
  {
    q: "Can an NRI buy an AIPL Riviera resale unit remotely?",
    a: "Much of the unit comparison, video presentation, seller-document review, loan coordination and transaction follow-up can be handled remotely. Transaction-specific FEMA, tax, TDS and power-of-attorney advice should be confirmed with the appropriate qualified professional.",
  },
  {
    q: "Is there any legal issue buyers should know about?",
    a: "Yes. Haryana RERA records pending land-partition litigation and requires prominent disclosure. The proportionate saleable carpet area linked with the disputed land is to remain frozen until the proceedings attain finality, so written unit-level verification is essential.",
  },
] as const;

export const Route = createFileRoute("/projects/aipl-riviera-resale-sector-103-gurgaon")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_ORIGIN}${VIDEO_POSTER}` },
      { property: "og:video", content: `${SITE_ORIGIN}${VIDEO_PATH}` },
      { property: "og:video:type", content: "video/mp4" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            {
              "@type": "ListItem",
              position: 2,
              name: "Gurgaon Project Guides",
              item: `${SITE_ORIGIN}/projects`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "AIPL Riviera Resale Sector 103 Gurgaon",
              item: canonical,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ApartmentComplex",
          "@id": `${canonical}#project`,
          name: "Riviera at AIPL Lake City",
          alternateName: "AIPL Riviera",
          url: canonical,
          description,
          image: `${SITE_ORIGIN}${VIDEO_POSTER}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Village Daulatabad, Sector 103",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          numberOfAccommodationUnits: 344,
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Developer",
              value: "AIPL Bharat Infrastructure Pvt. Ltd.",
            },
            { "@type": "PropertyValue", name: "Project area", value: "5.1375 acres" },
            { "@type": "PropertyValue", name: "Residential towers", value: "2" },
            { "@type": "PropertyValue", name: "RERA registration", value: "GGM/1019/751/2025/122" },
            { "@type": "PropertyValue", name: "RERA completion", value: "30 June 2033" },
            {
              "@type": "PropertyValue",
              name: "Select resale indication",
              value: "Around INR 12,000 per sq ft",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "AIPL Riviera at AIPL LakeCity Sector 103 walkthrough",
          description:
            "Walkthrough video of Riviera at AIPL LakeCity, the luxury residential development in Sector 103 Gurugram.",
          thumbnailUrl: `${SITE_ORIGIN}${VIDEO_POSTER}`,
          contentUrl: `${SITE_ORIGIN}${VIDEO_PATH}`,
          uploadDate: "2026-08-24",
          duration: "PT3M28S",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: AiplRivieraResalePage,
});

function AiplRivieraResalePage() {
  const whatsappMessage = encodeURIComponent(
    "Hello Mr Arun Madaan, I am interested in AIPL Riviera resale options around ₹12,000 per sq ft. Please share the available size, tower, seller payment status and total acquisition cost.",
  );

  return (
    <>
      <section className="surface-navy border-b border-gold/20">
        <div className="container-page grid items-center gap-9 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-white/60">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link to="/projects" className="hover:text-gold">
                Projects
              </Link>
              <span className="px-2">/</span>
              <span className="text-white">AIPL Riviera Resale</span>
            </nav>

            <div className="mt-7 flex flex-wrap gap-2">
              <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                Select resale opportunity
              </Badge>
              <Badge className="border-white/20 bg-white/5 text-white hover:bg-white/5">
                NRI & end-user assistance
              </Badge>
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              AIPL Riviera resale at around{" "}
              <span className="text-gradient-gold">₹12,000/sq. ft.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              Select seller-held units in Riviera at AIPL LakeCity, Sector 103 Gurgaon, indicated at
              approximately {DISCOUNT_PERCENT}% below AIPL&apos;s published ₹17,450/sq. ft.
              inaugural reference. A rare value entry into a lake-centric luxury project on Dwarka
              Expressway.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "aipl_riviera_resale_hero")}
                >
                  <MessageCircle aria-hidden="true" />
                  Check Available Units
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => trackContact("phone", "aipl_riviera_resale_hero")}
                >
                  Call {CONTACT.phone}
                </a>
              </Button>
            </div>

            <p className="mt-5 max-w-2xl text-xs leading-5 text-white/60">
              Indicative resale rate for select transferable units; exact availability and total
              acquisition cost are confirmed unit by unit. Market position reviewed {LAST_REVIEWED}.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <div className="relative">
              <video
                className="aspect-video w-full bg-black object-contain"
                controls
                preload="metadata"
                playsInline
                poster={VIDEO_POSTER}
                aria-label="AIPL Riviera at AIPL LakeCity Sector 103 walkthrough video"
              >
                <source src={VIDEO_PATH} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
            <div className="flex items-start gap-3 border-t border-white/10 px-4 py-4">
              <PlayCircle className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white">Project walkthrough</p>
                <p className="mt-1 text-xs leading-5 text-white/60">
                  View the planned towers, landscape and lifestyle concept before requesting the
                  exact resale inventory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-6">
          {QUICK_FACTS.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-border px-4 py-5 sm:border-r lg:border-b-0 last:border-r-0"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold leading-5">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <nav
        className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"
        aria-label="AIPL Riviera page sections"
      >
        <div className="container-page flex gap-5 overflow-x-auto py-3 text-sm">
          <a href="#opportunity" className="whitespace-nowrap hover:text-gold">
            Value opportunity
          </a>
          <a href="#prices" className="whitespace-nowrap hover:text-gold">
            Price comparison
          </a>
          <a href="#video" className="whitespace-nowrap hover:text-gold">
            Walkthrough
          </a>
          <a href="#buyers" className="whitespace-nowrap hover:text-gold">
            NRI & end users
          </a>
          <a href="#project" className="whitespace-nowrap hover:text-gold">
            Project overview
          </a>
          <a href="#diligence" className="whitespace-nowrap hover:text-gold">
            Due diligence
          </a>
          <a href="#faq" className="whitespace-nowrap hover:text-gold">
            FAQ
          </a>
        </div>
      </nav>

      <main>
        <section id="opportunity" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                The resale value case
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-3xl leading-tight md:text-4xl">
                A potential ₹5,450 per sq. ft. entry-price advantage
              </h2>
              <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">
                AIPL announced Riviera&apos;s inaugural reference at ₹17,450 per sq. ft. after the
                introductory benefit. Select resale or allotment-transfer opportunities now
                indicated around ₹12,000 per sq. ft. create an approximate {DISCOUNT_PERCENT}% rate
                gap—before transaction-specific charges and the seller&apos;s exact payment position
                are reconciled.
              </p>
              <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
                This opportunity is most relevant for buyers who want AIPL Riviera&apos;s planning,
                large decks, low-density environment and Dwarka Expressway location but do not want
                to enter at the full primary-market reference. The transaction must be structured
                around the exact allotment, builder outstanding and transfer eligibility.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: IndianRupee,
                    title: `Approx. ${DISCOUNT_PERCENT}% lower`,
                    text: "Measured against the published ₹17,450/sq. ft. inaugural reference.",
                  },
                  {
                    icon: Building2,
                    title: "Large home formats",
                    text: "Commonly marketed 3 and 4 BHK areas extend from roughly 2,196 to 3,211 sq. ft.",
                  },
                  {
                    icon: Landmark,
                    title: "Structured transaction",
                    text: "Seller ledger, future instalments and promoter transfer terms are reviewed together.",
                  },
                ].map(({ icon: Icon, title: cardTitle, text }) => (
                  <div key={cardTitle} className="rounded-xl border border-border bg-card p-5">
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl">{cardTitle}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-2xl border border-gold/30 bg-gold/5 p-6 lg:self-start">
              <ShieldCheck className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl">Shubh Estate position</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The pricing gap is substantial enough to merit serious evaluation, provided the
                selected unit clears the promoter-transfer, payment-ledger and land-litigation
                checks described on this page.
              </p>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Reviewed by Arun Madaan, MBA, LLB · Founder & Promoter · Former Senior Banking
                Professional.
              </p>
            </aside>
          </div>
        </section>

        <section id="prices" className="scroll-mt-24 border-y border-border bg-muted/30">
          <div className="container-page py-14 md:py-16">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Illustrative size-wise comparison
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                What a ₹12,000/sq. ft. resale entry may mean
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                The table compares the same published area at ₹12,000 and ₹17,450 per sq. ft. It
                demonstrates the value gap; it is not a substitute for the exact seller and builder
                cost sheet.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                <thead className="bg-secondary/70">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Configuration</th>
                    <th className="px-5 py-4 font-semibold">Published area</th>
                    <th className="px-5 py-4 font-semibold">At ₹12,000/sq. ft.</th>
                    <th className="px-5 py-4 font-semibold">At ₹17,450/sq. ft.</th>
                    <th className="px-5 py-4 font-semibold">Illustrative gap</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIT_COMPARISON.map((row) => (
                    <tr key={row.area} className="border-t border-border align-top">
                      <td className="px-5 py-4 font-semibold">{row.configuration}</td>
                      <td className="px-5 py-4">{row.area.toLocaleString("en-IN")} sq. ft.</td>
                      <td className="px-5 py-4 font-semibold text-gold">{row.resale}</td>
                      <td className="px-5 py-4 text-muted-foreground">{row.reference}</td>
                      <td className="px-5 py-4 font-semibold">{row.saving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-7 text-muted-foreground">
              <strong className="text-foreground">Cost-sheet check:</strong> Final acquisition cost
              depends on the actual unit, seller premium, amount already paid to AIPL, outstanding
              construction instalments, transfer charges, applicable taxes, maintenance advance,
              stamp duty and registration.
            </div>
          </div>
        </section>

        <section id="video" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.55fr)]">
            <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-elegant">
              <video
                className="aspect-video w-full bg-black object-contain"
                controls
                preload="metadata"
                playsInline
                poster={VIDEO_POSTER}
                aria-label="Full AIPL Riviera Sector 103 project walkthrough"
              >
                <source src={VIDEO_PATH} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Watch before you shortlist
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                Riviera at AIPL LakeCity walkthrough
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                The walkthrough presents the planned arrival, high-rise architecture, landscaped
                lake environment, amenities and residence concept. NRI buyers can request a live
                call covering the exact resale unit, payment ledger and view orientation.
              </p>
              <Button asChild variant="gold" className="mt-6">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "aipl_riviera_video")}
                >
                  Request a Unit-Level Video Call
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section id="buyers" className="scroll-mt-24 border-y border-border bg-muted/30">
          <div className="container-page py-14 md:py-16">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Two buyer journeys, one unit-level process
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Built for Gurgaon end users and NRIs buying remotely
              </h2>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <Building2 className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl">For end users</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Best suited to families who can hold through the construction period and value
                  larger layouts, greenery and Delhi-facing connectivity over immediate possession.
                </p>
                <ul className="mt-6 space-y-3">
                  {END_USER_REASONS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
                <Globe2 className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl">For NRI buyers</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Shubh Estate can coordinate the practical transaction work in Gurugram while the
                  buyer evaluates and approves the purchase from overseas.
                </p>
                <ul className="mt-6 space-y-3">
                  {NRI_SUPPORT.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="goldOutline" className="mt-6">
                  <Link to="/nri">View NRI Property Services</Link>
                </Button>
              </article>
            </div>
          </div>
        </section>

        <section id="project" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Project planning and lifestyle
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Lake-centric luxury living in Sector 103
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                Riviera is a 5.1375-acre residential phase within AIPL LakeCity, planned with two
                residential towers and 344 homes. The official concept places a central lake,
                landscaped open areas and limited surface-vehicle movement at the heart of the
                community. The project is IGBC Platinum pre-certified.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Trees,
                    title: "Nature-led landscape",
                    text: "Central lake, mindfulness garden, flowing garden and Japanese Miyawaki forest.",
                  },
                  {
                    icon: Sparkles,
                    title: "Lifestyle amenities",
                    text: "Signature pool, event lawn, outdoor gym, sports area and pet garden.",
                  },
                  {
                    icon: Building2,
                    title: "International consultants",
                    text: "Morphogenesis architecture, Aspect Studio landscape and Blink Design clubhouse interiors.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Long-horizon project",
                    text: "The Haryana RERA completion date declared by the promoter is 30 June 2033.",
                  },
                ].map(({ icon: Icon, title: cardTitle, text }) => (
                  <div key={cardTitle} className="rounded-xl border border-border bg-card p-5">
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl">{cardTitle}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-4 text-sm">
                <a
                  href={AIPL_PAGE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                >
                  Official AIPL project page{" "}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href={RERA_PAGE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                >
                  Haryana RERA project record{" "}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>

            <aside className="rounded-2xl surface-navy p-6 lg:self-start">
              <MapPin className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl text-white">Published location context</h3>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ["Dwarka Expressway", "Approx. 5 minutes"],
                  ["Proposed metro", "Approx. 5 minutes"],
                  ["DPS School", "Approx. 5 minutes"],
                  ["Yashobhoomi", "Approx. 10 minutes"],
                  ["IGI Airport", "Approx. 20 minutes"],
                ].map(([place, time]) => (
                  <div
                    key={place}
                    className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <dt className="text-white/65">{place}</dt>
                    <dd className="text-right font-medium text-white">{time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-5 text-white/50">
                Travel times are developer estimates and depend on traffic and future
                infrastructure.
              </p>
            </aside>
          </div>
        </section>

        <section id="diligence" className="scroll-mt-24 border-y border-border bg-muted/30">
          <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Banking-grade buyer checks
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                A strong price only works with a clean, transferable unit
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                Haryana RERA identifies Riviera at AIPL Lake City under registration
                GGM/1019/751/2025/122 dated 8 December 2025. The certificate records pending
                land-partition litigation before the Punjab and Haryana High Court and requires
                prominent disclosure in marketing material and every Agreement for Sale.
              </p>
              <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/5 p-6">
                <div className="flex gap-3">
                  <FileCheck2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl">
                      Unit-specific written verification is essential
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      The proportionate saleable carpet area linked with the disputed land is to
                      remain frozen until the partition proceedings attain finality. A buyer should
                      not rely only on the project&apos;s overall RERA registration; the exact
                      resale unit must be cleared in writing.
                    </p>
                    <a
                      href={RERA_CERTIFICATE}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline"
                    >
                      Read the official RERA certificate
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
                {BUYER_CHECKS.map((item, index) => (
                  <div
                    key={item.title}
                    className={`grid gap-2 p-5 md:grid-cols-[16rem_1fr] ${index ? "border-t border-border" : ""}`}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28 lg:self-start">
              <Scale className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl">End-to-end coordination</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Shubh Estate coordinates the unit shortlist, seller papers, promoter transfer,
                project diligence, price reconciliation, home-loan processing and registration
                follow-up for eligible transactions.
              </p>
              <Button asChild variant="gold" className="mt-6 w-full">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "aipl_riviera_diligence")}
                >
                  Request Unit Documents
                </a>
              </Button>
            </aside>
          </div>
        </section>

        <section id="faq" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
              Frequently asked questions
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              AIPL Riviera resale buyer questions
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-border bg-card p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold leading-6 marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="surface-navy border-t border-gold/20">
          <div className="container-page grid gap-9 py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-16">
            <div>
              <p className="eyebrow">Current resale availability</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-white md:text-4xl">
                Ask for the exact AIPL Riviera unit behind the ₹12,000/sq. ft. opportunity
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-white/70">
                Receive the available configuration, floor, view, seller payment position, future
                builder instalments, transfer status and total acquisition-cost comparison.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <a
                    href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "aipl_riviera_final_cta")}
                  >
                    <MessageCircle aria-hidden="true" />
                    WhatsApp Arun Madaan
                  </a>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <a
                    href={CONTACT.phoneHref}
                    onClick={() => trackContact("phone", "aipl_riviera_final_cta")}
                  >
                    Call {CONTACT.phone}
                  </a>
                </Button>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="font-display text-2xl text-white">Request a callback</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Add your country code if you are enquiring from outside India.
              </p>
              <div className="mt-5">
                <EnquiryForm interest="AIPL Riviera resale around ₹12,000 per sq ft" compact />
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
