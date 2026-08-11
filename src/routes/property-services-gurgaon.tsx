import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeIndianRupee,
  FileSearch,
  Handshake,
  Home,
  KeyRound,
  Landmark,
  MapPinned,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const SERVICES = [
  {
    icon: Wrench,
    title: "Property management for remote owners",
    audience: "NRIs, outstation owners and busy landlords",
    body: "A local point of coordination for property inspections, maintenance follow-up, tenant communication, renewals and sale or rental preparation.",
    points: [
      "Periodic inspection coordination",
      "Repair and vendor follow-up",
      "Tenant and renewal coordination",
    ],
  },
  {
    icon: BadgeIndianRupee,
    title: "Market-linked property valuation",
    audience: "Owners planning to sell, rent, refinance or settle family decisions",
    body: "A practical price opinion based on the exact unit, competing inventory, condition, floor, view, project stage and available market evidence.",
    points: [
      "Sale and rental price positioning",
      "Comparable-inventory review",
      "Independent valuer coordination where required",
    ],
  },
  {
    icon: FileSearch,
    title: "Legal and document due-diligence coordination",
    audience: "Buyers and owners who cannot manage paperwork locally",
    body: "We organise the property-document checklist, available RERA and approval checks, lender requirements and qualified legal review before commitment.",
    points: [
      "Title-document checklist",
      "RERA and approval context",
      "Advocate and lender coordination",
    ],
  },
  {
    icon: Landmark,
    title: "Home-loan takeover and smart OD options",
    audience: "Borrowers reviewing rate, tenure, liquidity or top-up needs",
    body: "Compare the existing loan with eligible balance-transfer, top-up and overdraft-linked structures after considering fees and net savings.",
    points: [
      "Balance-transfer comparison",
      "Overdraft-linked loan options",
      "Property and bank documentation support",
    ],
  },
  {
    icon: KeyRound,
    title: "Tenant property search",
    audience: "Families, professionals and corporate tenants",
    body: "Share your location, budget, move-in date and furnishing preference. We shortlist suitable homes and coordinate visits and rental documentation.",
    points: [
      "Requirement-based shortlist",
      "Planned property visits",
      "Lease-process coordination",
    ],
  },
  {
    icon: Handshake,
    title: "Sell or rent out your property",
    audience: "Local, NRI and outstation property owners",
    body: "From pricing and listing preparation to buyer or tenant enquiries, negotiation and transaction follow-up through one Gurgaon-based team.",
    points: [
      "Listing and media preparation",
      "Qualified enquiry handling",
      "Negotiation and closing coordination",
    ],
  },
] as const;

const PROCESS = [
  [
    "01",
    "Understand the objective",
    "We record the property, location, timeline, documentation position and the outcome you need.",
  ],
  [
    "02",
    "Verify scope and evidence",
    "The team reviews available records, market evidence and specialist requirements before proposing the next action.",
  ],
  [
    "03",
    "Coordinate locally",
    "Visits, vendors, banks, tenants, buyers, advocates and valuers are coordinated with clear owner updates.",
  ],
  [
    "04",
    "Close with a document trail",
    "Important decisions, costs and pending items are summarised so remote owners retain control.",
  ],
] as const;

export const Route = createFileRoute("/property-services-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/property-services-gurgaon`;
    const title = "Property Management, Valuation & Legal Support in Gurgaon";
    const description =
      "Gurgaon property management, valuation, due-diligence coordination, tenant search, sale and rental support, and home-loan takeover assistance for local and remote owners.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Property services in Gurgaon",
            provider: {
              "@type": "RealEstateAgent",
              "@id": `${SITE_ORIGIN}/#real-estate-agent`,
              name: "Shubh Estate Brokers",
            },
            areaServed: "Gurugram, Haryana, India",
            serviceType: SERVICES.map((service) => service.title),
            url: canonical,
          }),
        },
      ],
    };
  },
  component: PropertyServices,
});

function PropertyServices() {
  const whatsappMessage = encodeURIComponent(
    "Hi Shubh Estate Brokers, I need help with property management, valuation, due diligence, renting, selling or a home-loan review. Please contact me.",
  );

  return (
    <>
      <PageHero
        eyebrow="Owner, Tenant & Mortgage Services"
        title="One Gurgaon team for the work that cannot be managed from a distance"
        body="Property management, reliable price context, document coordination, tenant search, sale or rental execution and smarter home-loan review for local, NRI and outstation clients."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHead
          eyebrow="Choose the support you need"
          title="Practical services around the complete property lifecycle"
          body="Each engagement begins with a defined scope. Where a formal legal opinion, certified valuation or lender sanction is required, we coordinate the relevant qualified professional or institution."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, audience, body, points }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-gold">
                {audience}
              </p>
              <h2 className="mt-2 font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-16 md:py-20">
        <div className="container-page">
          <SectionHead
            eyebrow="How remote execution works"
            title="Clear scope, local coordination, documented updates"
            body="The owner remains in control while the Gurgaon-side work is organised through one accountable point of contact."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map(([number, title, body]) => (
              <li key={number} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-3xl text-gold">{number}</span>
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl surface-navy p-8 md:p-10">
            <MapPinned className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-5 font-display text-3xl">Start with a 15-minute scope call</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-navy-foreground/75">
              Share the property location, ownership situation, current documents and the result you
              need. We will explain what can be handled directly and where a bank, advocate,
              registered valuer, tax adviser or other specialist should be involved.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Discuss on WhatsApp
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-foreground/70">
              <Link to="/nri" className="inline-flex items-center gap-1.5 hover:text-gold">
                NRI services <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link to="/home-loans" className="inline-flex items-center gap-1.5 hover:text-gold">
                Loan takeover review <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link
                to="/sell-property-gurgaon"
                className="inline-flex items-center gap-1.5 hover:text-gold"
              >
                Sell or list property <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 md:p-8">
            <Home className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl">Request a callback</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Briefly mention whether you are an owner, NRI, tenant or existing home-loan borrower.
            </p>
            <div className="mt-6">
              <EnquiryForm interest="Property management and owner services" compact />
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Shubh Estate Brokers provides real-estate advisory and transaction coordination. Formal
          legal opinions, title certificates, statutory valuations, tax advice and loan sanctions
          are provided only by the relevant qualified professional, registered valuer, tax adviser
          or lending institution.
        </p>
      </section>
    </>
  );
}
