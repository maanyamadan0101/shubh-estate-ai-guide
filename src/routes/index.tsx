import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  Building2,
  ChevronRight,
  FileCheck2,
  Landmark,
  Quote,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-gurugram.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PropertyCard } from "@/components/site/PropertyCard";
import { BUILDERS, CONTACT, FAQS, LOCALITIES, PROPERTIES, TESTIMONIALS } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Property in Gurgaon | Shubh Estate Brokers — Buy, Sell, Rent" },
      {
        name: "description",
        content:
          "Gurugram's trusted real estate advisory. Luxury apartments, builder floors, villas and commercial property with home loan assistance and legal due diligence.",
      },
      { property: "og:title", content: "Property in Gurgaon | Shubh Estate Brokers" },
      {
        property: "og:description",
        content: "Fair & transparent real estate deals at the best price, backed by banking and mortgage expertise.",
      },
    ],
  }),
  component: Home,
});

const WHY = [
  { icon: Landmark, title: "Banking Expertise", body: "Founder-led advisory shaped by two decades across HDFC, ICICI, Citigroup and IndusInd." },
  { icon: Scale, title: "Legal Due Diligence", body: "Title assessment, approvals and RERA verification before a single rupee moves." },
  { icon: Banknote, title: "Mortgage Structuring", body: "Loans arranged at the best available rates with minimal documentation." },
  { icon: TrendingUp, title: "Investment Advisory", body: "Micro-market data, rental yield and appreciation modelling on every recommendation." },
  { icon: ShieldCheck, title: "Fair & Transparent", body: "Honest pricing guidance — including when we advise you not to buy." },
  { icon: FileCheck2, title: "End-to-End Support", body: "Valuation, documentation, registry and after-sales assistance." },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Gurugram Cyber City skyline at twilight"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.21_0.042_248/0.92),oklch(0.21_0.042_248/0.72))]" />

        <div className="container-page py-24 text-navy-foreground md:py-36">
          <div className="max-w-3xl animate-rise">
            <span className="eyebrow">Gurugram · Since 2009</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              Fair & Transparent Real Estate Deals at the{" "}
              <span className="text-gradient-gold">Best Price</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-navy-foreground/75 md:text-lg">
              A boutique property advisory for Gurugram — luxury homes, builder floors, villas, plots and commercial
              assets, supported by mortgage structuring, valuation and legal due diligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/properties">Explore Properties</Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <Link to="/home-loans">Talk to a Mortgage Expert</Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 rounded-2xl glass-panel p-4 shadow-[var(--shadow-lift)] md:p-6">
            <Tabs defaultValue="buy">
              <TabsList className="bg-background/60">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
            </Tabs>

            <form
              className="mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <label className="sr-only" htmlFor="hero-search">
                  Search sector, locality, builder or project
                </label>
                <Input
                  id="hero-search"
                  placeholder="Sector, locality, builder or project"
                  className="h-11 bg-background pl-9"
                />
              </div>
              <Select>
                <SelectTrigger className="h-11 bg-background" aria-label="Property type">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="floor">Builder Floor</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-11 bg-background" aria-label="Budget">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Under ₹1 Cr</SelectItem>
                  <SelectItem value="2">₹1 – 3 Cr</SelectItem>
                  <SelectItem value="3">₹3 – 6 Cr</SelectItem>
                  <SelectItem value="4">₹6 Cr +</SelectItem>
                </SelectContent>
              </Select>
              <Button asChild variant="gold" size="lg" className="h-11">
                <Link to="/properties">Search</Link>
              </Button>
            </form>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-gold" aria-hidden="true" />
              AI-assisted matching across RERA-approved projects in Gurugram
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/60">
        <div className="container-page grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {[
            ["1,200+", "Families advised"],
            ["₹ 900 Cr+", "Transaction value"],
            ["15+ Years", "Banking experience"],
            ["100%", "Legal verification"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl">{stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead
          eyebrow="Featured Collection"
          title="Handpicked homes across Gurugram"
          body="Curated from RERA-approved inventory across Golf Course Road, Dwarka Expressway, SPR and New Gurgaon."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/properties">
              View all properties <ChevronRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="surface-navy py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">Home Loan Assistance</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Loans up to 90% at the best available interest rates
            </h2>
            <p className="mt-4 text-navy-foreground/75">
              We arrange home loans at the best available interest rates with minimal documentation through leading
              banks and financial institutions — structured by a former banker who has approved them from the other
              side of the table.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Property Valuation",
                "Legal Verification",
                "Title Assessment",
                "Loan Structuring",
                "Bank Coordination",
                "Balance Transfer",
                "Top-Up Loans",
                "NRI Home Loans",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-foreground/85">
                  <ShieldCheck className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/home-loans">Apply for Home Loan</Link>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <Link to="/emi-calculator">Open EMI Calculator</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl glass-panel p-8 text-foreground">
            <p className="eyebrow">Quick estimate</p>
            <h3 className="mt-3 font-display text-2xl">See your EMI before you shortlist</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Model property price, down payment, interest rate and tenure — with a full interest breakdown and
              amortisation view.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Typical rate band", "8.35% – 9.25% p.a."],
                ["Maximum tenure", "30 years"],
                ["Maximum funding", "Up to 90% of property value"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="navy" size="lg" className="mt-6 w-full">
              <Link to="/emi-calculator">Calculate my EMI</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="Why Shubh Estate Brokers" title="Advisory first. Brokerage second." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent">
                <Icon className="size-5 text-gold" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-page">
          <SectionHead eyebrow="Trending Localities" title="Where Gurugram is moving" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LOCALITIES.map((l) => (
              <div key={l.name} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg">{l.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Avg. {l.price}</p>
                <Badge className="mt-3 bg-accent text-accent-foreground hover:bg-accent">{l.growth}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="Top Builders" title="Developer relationships across Gurugram" />
        <ul className="mt-10 flex flex-wrap gap-3">
          {BUILDERS.map((b) => (
            <li
              key={b}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold"
            >
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-20">
        <SectionHead eyebrow="Client Voices" title="Trusted by buyers, sellers and NRIs" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-xl border border-border bg-card p-7">
              <Quote className="size-6 text-gold" aria-hidden="true" />
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.quote}</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-medium">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead eyebrow="FAQ" title="Questions we answer every week" />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-2xl surface-navy px-8 py-14 text-center">
          <Building2 className="mx-auto size-8 text-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">Let's find the right property — and the right loan</h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-foreground/75">
            Speak with our advisory team at {CONTACT.address.split(",")[0]}, Sector 51, Gurugram — or request a callback
            at a time that suits you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <Link to="/contact">Request a Callback</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
      <span className="gold-rule mt-4" />
      {body ? <p className="mt-4 text-muted-foreground">{body}</p> : null}
    </div>
  );
}
