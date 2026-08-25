import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, FileCheck2, Globe2, KeyRound, MessageCircle, Search, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { OwnerServiceForm } from "@/components/site/OwnerServiceForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const SERVICES = [
  { icon: Search, title: "Market rent assessment", body: "Review the project, unit size, furnishing, floor, condition, competing rental supply and current tenant demand before positioning the rent." },
  { icon: Camera, title: "Listing preparation", body: "Organise accurate property details, photographs or video, furnishing information, visit access and owner expectations before marketing begins." },
  { icon: Users, title: "Tenant sourcing and screening", body: "Qualify enquiries around intended occupancy, move-in timeline, budget and other relevant owner requirements before arranging visits." },
  { icon: KeyRound, title: "Viewing coordination", body: "Plan property access with the owner, tenant, caretaker or authorised representative and keep follow-up organised after each viewing." },
  { icon: FileCheck2, title: "Rent and documentation coordination", body: "Coordinate commercial terms and the practical documentation process. Transaction-specific legal drafting can be reviewed by the relevant qualified professional." },
  { icon: ShieldCheck, title: "Move-in and management support", body: "Coordinate handover details and discuss ongoing property-management assistance when an owner wants help after tenant placement." },
];

const FAQS = [
  {
    q: "How can I rent out my property in Gurgaon?",
    a: "Start with a realistic rent assessment and a complete property brief. We can then prepare the listing, source and screen enquiries, coordinate viewings, negotiate commercial terms and support documentation and move-in coordination.",
  },
  {
    q: "How do you estimate the rent for a Gurgaon apartment?",
    a: "We compare the specific unit with current competing rental inventory, furnishing, floor, view, condition, project demand, lease timing and the quality of available alternatives rather than relying on a single portal average.",
  },
  {
    q: "Can you find a tenant if I live outside Gurgaon or outside India?",
    a: "Yes. Owners can initiate the rental assessment remotely, share information digitally, arrange video consultation and authorise practical access through a suitable representative where appropriate. Physical and legal requirements depend on the specific property and lease.",
  },
  {
    q: "Do you help screen prospective tenants?",
    a: "We can screen enquiries for basic fit such as budget, intended occupancy, move-in timeline and information relevant to the owner's stated requirements. Any formal background or legal verification should be handled through the appropriate authorised process.",
  },
  {
    q: "Can you help with rental documentation?",
    a: "We can coordinate the information and commercial terms needed for the rental transaction and help keep the process organised. Legal drafting, registration and compliance questions should be confirmed with the relevant qualified professional where required.",
  },
  {
    q: "Do you also provide property management after the tenant moves in?",
    a: "Property-management assistance can be discussed depending on the property, location and owner's needs, including coordination support when the owner is not based in Gurgaon.",
  },
];

export const Route = createFileRoute("/rent-out-property-in-gurgaon")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/rent-out-property-in-gurgaon`;
    const title = "Rent Out Property in Gurgaon | Find a Tenant | Shubh Estate Brokers";
    const description =
      "Rent out your property in Gurgaon or Gurugram with market rent assessment, tenant sourcing, screening, viewings, negotiation and rental coordination.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Rent Out Property and Tenant Placement in Gurgaon",
            provider: { "@type": "RealEstateAgent", name: "Shubh Estate Brokers", url: SITE_ORIGIN },
            areaServed: "Gurugram, Haryana, India",
            serviceType: "Residential rental marketing, tenant sourcing and property management coordination",
            url: canonical,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "Rent Out Property in Gurgaon", item: canonical },
            ],
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
    };
  },
  component: RentOutPropertyPage,
});

function RentOutPropertyPage() {
  return (
    <>
      <PageHero
        eyebrow="For Gurgaon Landlords"
        title="Rent out your Gurgaon property with organised tenant sourcing"
        body="For landlords in Gurgaon (Gurugram) or living elsewhere, Shubh Estate Brokers can coordinate rent assessment, listing preparation, tenant enquiries, viewings, negotiation, documentation and move-in support."
      />

      <main className="container-page py-14">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="eyebrow">Landlord Service</p>
            <h2 className="mt-3 font-display text-3xl">Find a suitable tenant without turning the property into a mass listing exercise</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Good rental execution starts with the right rent expectation and a clear unit brief. We organise the property information, identify likely tenant fit, coordinate visits and keep commercial discussions consistent so the owner can evaluate enquiries on more than headline rent alone.
            </p>
          </div>
          <div className="rounded-2xl surface-navy p-7">
            <p className="eyebrow">Request Rental Assessment</p>
            <h2 className="mt-3 font-display text-2xl">Share your Gurgaon property</h2>
            <p className="mt-3 text-sm leading-6 text-navy-foreground/75">
              Start by WhatsApp or use the private landlord form below. International-format phone numbers are accepted.
            </p>
            <Button asChild variant="gold" className="mt-6 w-full">
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "rent_out_page")}>
                <MessageCircle aria-hidden="true" /> WhatsApp Rental Details
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <p className="eyebrow">What We Coordinate</p>
          <h2 className="mt-3 font-display text-3xl">From rent assessment to tenant move-in</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.title} className="rounded-xl border border-border bg-card p-6">
                <service.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-gold/30 bg-secondary/30 p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <Globe2 className="size-6 text-gold" aria-hidden="true" />
                <p className="eyebrow">Remote Landlord Support</p>
              </div>
              <h2 className="mt-3 font-display text-3xl">Managing your Gurgaon property from outside India?</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Overseas property owners and owners based outside Gurgaon can start the rental process remotely. We can discuss the expected rent by video call, receive documents and property information digitally, coordinate photography or access where practical, and keep tenant communication organised through the owner's preferred contact method.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Remote-friendly communication</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• WhatsApp and international-format phone numbers</li>
                <li>• Email and video consultation</li>
                <li>• Digital document sharing</li>
                <li>• Representative / access coordination where appropriate</li>
                <li>• India Standard Time scheduling</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="rent-out-my-property" className="mt-16 scroll-mt-24">
          <OwnerServiceForm mode="rent_out" />
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          <RelatedLink to="/sell-property-gurgaon" title="Sell Property in Gurgaon" body="For owners considering a sale instead of leasing the property." />
          <RelatedLink to="/mandate-to-sell-property-in-gurgaon" title="Selling Mandate" body="Appoint one accountable advisor for a coordinated sale process." />
          <RelatedLink to="/property-services-gurgaon" title="Property Management" body="Explore owner support, valuation and property-management services." />
        </section>

        <section className="mt-16">
          <p className="eyebrow">Landlord Questions</p>
          <h2 className="mt-3 font-display text-3xl">Frequently asked questions</h2>
          <dl className="mt-6 grid gap-4 lg:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}

function RelatedLink({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <a href={to} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
      <span className="mt-4 inline-block text-sm font-medium text-gold">Explore service →</span>
    </a>
  );
}
