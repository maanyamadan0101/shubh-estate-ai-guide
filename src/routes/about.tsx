import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const ARUN_LINKEDIN = "https://in.linkedin.com/in/arun-madan-94ab4224";

export const Route = createFileRoute("/about")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/about`;
    const title = "Arun Madaan | Founder, Shubh Estate Brokers Gurgaon";
    const description =
      "Meet Arun Madaan, Founder of Shubh Estate Brokers in Gurugram, with banking, mortgage, property valuation, title assessment and real-estate advisory experience.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${canonical}#profile-page`,
            url: canonical,
            name: "Arun Madaan — Founder of Shubh Estate Brokers, Gurugram",
            description,
            dateModified: "2026-08-27T08:44:00+05:30",
            mainEntity: {
              "@type": "Person",
              "@id": `${canonical}#arun-madan`,
              name: "Arun Madaan",
              alternateName: "Arun Madan",
              jobTitle: "Founder & Promoter, Shubh Estate Brokers",
              description:
                "Gurugram real estate and mortgage advisor, MBA and LLB, and former senior banking professional with practical experience in mortgages, credit, property valuation, documentation, title assessment and investment risk review.",
              url: canonical,
              sameAs: [ARUN_LINKEDIN],
              worksFor: {
                "@type": "RealEstateAgent",
                "@id": `${SITE_ORIGIN}/#real-estate-agent`,
                name: "Shubh Estate Brokers",
                url: SITE_ORIGIN,
                areaServed: "Gurugram, Haryana, India",
              },
              knowsAbout: [
                "Gurugram real estate advisory",
                "Gurgaon property consulting",
                "Mortgage lending",
                "Home loan structuring",
                "Property valuation",
                "Property title assessment",
                "Banking documentation",
                "Real estate due diligence",
                "Property investment risk assessment",
              ],
            },
          }),
        },
      ],
    };
  },
  component: About,
});

const EXPERTISE = [
  "Gurugram Real Estate Advisory",
  "Mortgage Lending",
  "Property Valuation",
  "Loan Structuring",
  "Title Creation & Assessment",
  "Legal Verification",
  "Investment Safety Review",
  "Banking Documentation",
  "Due Diligence",
  "Risk Assessment",
];

const PROMISE = [
  "Integrity First",
  "Fair Pricing",
  "Transparent Advice",
  "Title & Documentation Clarity",
  "Mortgage Support",
  "Investment Protection",
  "After-Sales Support",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Arun Madaan & Shubh Estate Brokers"
        title="Arun Madaan — Founder of Shubh Estate Brokers, Gurugram"
        body="Arun Madaan, MBA and LLB, is the Founder & Promoter of Shubh Estate Brokers and a former senior banking professional. His Gurugram real estate advisory combines local property knowledge with mortgage expertise, valuation experience and practical understanding of title, documentation and investment risk."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead eyebrow="Our Promise" title="Integrity, clarity and investment safety before the transaction" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {PROMISE.map((p) => (
                <li key={p} className="rounded-lg border border-border bg-card px-5 py-4 text-sm">{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl surface-navy p-8">
            <p className="eyebrow">Our approach</p>
            <p className="mt-4 text-navy-foreground/80">A property can look attractive and still be a poor financial decision. The risk may sit in an inflated price, unclear ownership history, incomplete title chain, unsuitable financing, weak documentation or an exit assumption that does not stand up to scrutiny. Our process starts by understanding these risks before asking a client to commit capital.</p>
            <p className="mt-5 text-navy-foreground/80">We believe the brokerage relationship must be built on integrity. When a deal does not make financial, legal or practical sense, the client should hear that clearly — even if it means walking away from the transaction.</p>
            <Button asChild variant="gold" className="mt-8"><Link to="/contact">Book a consultation</Link></Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <SectionHead eyebrow="Founder Profile" title="Arun Madaan — Gurugram Real Estate & Mortgage Advisor" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="font-display text-2xl">Arun Madaan</p>
              <p className="mt-1 text-sm text-muted-foreground">Founder & Promoter, Shubh Estate Brokers · MBA · LLB · Former Senior Banking Professional</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Gurugram Property & Investment Advisory</li>
                <li>Mortgage & Credit Perspective</li>
                <li>Property Valuation</li>
                <li>Title Creation & Legal Title Assessment</li>
                <li>Investment Risk & Safety Review</li>
              </ul>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">Professional exposure includes</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {["HDFC Bank", "ICICI Bank", "Citigroup", "IndusInd Bank"].map((b) => (
                  <li key={b} className="rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold">{b}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-muted-foreground">Arun Madaan leads Shubh Estate Brokers in Gurugram. His senior-level banking exposure provides a perspective that goes beyond conventional property brokerage. Years spent around credit, mortgages, collateral valuation, documentation and title processes shape how he evaluates residential property transactions and investment decisions today.</p>
              <p className="mt-5 text-muted-foreground">This background brings a deeper understanding of how title is created and examined, how lenders assess a property, where documentation gaps can create risk, how financing affects the true cost of ownership, and how buyers and investors should think about capital protection before expected returns.</p>
              <p className="mt-5 text-muted-foreground">Through Shubh Estate Brokers, Arun advises buyers, sellers and property investors across Gurugram, including resale property, luxury homes, builder floors, mortgage coordination, valuation and title/documentation assessment. The guiding principle is simple: integrity comes before commission.</p>
              <p className="mt-8 eyebrow">Core Expertise</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {EXPERTISE.map((e) => <li key={e} className="text-sm text-muted-foreground">· {e}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="navy"><a href={CONTACT.phoneHref}>Speak with Arun Madaan</a></Button>
                <Button asChild variant="outline"><a href={CONTACT.googleBusinessProfile} target="_blank" rel="noreferrer">View Shubh Estate Brokers on Google</a></Button>
                <Button asChild variant="outline"><a href={ARUN_LINKEDIN} target="_blank" rel="noreferrer">Arun Madaan on LinkedIn</a></Button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link to="/property-buying-advisory-gurgaon" className="rounded-xl border border-border bg-card p-5 hover:border-gold/50"><p className="font-display text-xl">Gurugram buyer advisory</p><p className="mt-2 text-sm text-muted-foreground">See how Arun and Shubh Estate Brokers shortlist, compare and review Gurgaon property before a commitment.</p></Link>
            <Link to="/home-loans" className="rounded-xl border border-border bg-card p-5 hover:border-gold/50"><p className="font-display text-xl">Mortgage coordination</p><p className="mt-2 text-sm text-muted-foreground">Understand eligibility, valuation, documentation, balance transfer and lender coordination.</p></Link>
            <Link to="/flats-for-sale-in-gurgaon" className="rounded-xl border border-border bg-card p-5 hover:border-gold/50"><p className="font-display text-xl">Current Gurugram properties</p><p className="mt-2 text-sm text-muted-foreground">Browse current resale, rental and under-construction inventory across Gurugram.</p></Link>
          </div>
        </div>
      </section>
    </>
  );
}
