import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Globe2, Handshake, KeyRound, Landmark, Upload } from "lucide-react";

const ACTIONS = [
  {
    label: "Buy Property in Gurgaon",
    body: "Browse verified resale, ready-to-move, new-launch and under-construction options with price, location and transaction context.",
    eyebrow: "BUYERS",
    icon: Building2,
    to: "/flats-for-sale-in-gurgaon",
  },
  {
    label: "Sell Property in Gurgaon",
    body: "Start with valuation, pricing, listing preparation, buyer screening, negotiation and transaction coordination.",
    eyebrow: "SELLERS",
    icon: Upload,
    to: "/sell-property-gurgaon",
  },
  {
    label: "Rent Out Your Property",
    body: "Request a market-rent assessment, tenant search, viewing coordination and rental transaction support.",
    eyebrow: "LANDLORDS",
    icon: KeyRound,
    to: "/rent-out-property-in-gurgaon",
  },
  {
    label: "Give a Selling Mandate",
    body: "Appoint one accountable advisor for coordinated pricing, marketing, qualified-buyer screening, visits and negotiation.",
    eyebrow: "PROPERTY OWNERS",
    icon: Handshake,
    to: "/mandate-to-sell-property-in-gurgaon",
  },
  {
    label: "Home Loan & Mortgage Structuring",
    body: "Coordinate eligibility, valuation, loan structuring, balance transfer, takeover and eligible overdraft-linked options.",
    eyebrow: "FINANCING",
    icon: Landmark,
    to: "/home-loans",
  },
  {
    label: "Managing Property Remotely?",
    body: "Owners outside Gurgaon can use WhatsApp, email and video consultation for sale, rent-out or property coordination without a separate country journey.",
    eyebrow: "REMOTE OWNERS",
    icon: Globe2,
    to: "/property-services-gurgaon",
  },
] as const;

export function HomeActionPanel() {
  return (
    <section className="bg-secondary/60 py-14 md:py-16" aria-labelledby="start-here-title">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="start-here-title" className="mt-3 font-display text-3xl md:text-4xl">
              Choose the Gurgaon property outcome you need
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Buy, sell, rent out or appoint a selling representative in Gurgaon (Gurugram). The same core advisory pages remain accessible whether you are in Gurgaon, elsewhere in India or overseas.
            </p>
          </div>
          <span className="hidden text-right text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-muted-foreground sm:block">
            Clear information
            <br />
            Direct next steps
          </span>
        </div>

        <Link
          to="/dwarka-expressway-flats-for-sale-gurgaon"
          className="group mt-8 flex flex-col gap-4 rounded-2xl border border-gold/35 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-[var(--shadow-elegant)] md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">
              DWARKA EXPRESSWAY INVENTORY
            </p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              Compare flats for sale across key Dwarka Expressway project groups
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Review current resale and selected under-construction opportunities by project, sector, configuration and asking-price context.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold">
            View current inventory
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIONS.map(({ label, body, eyebrow, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group relative min-h-[235px] overflow-hidden rounded-2xl border border-border bg-card p-6 text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold/55 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-6 text-[0.65rem] font-bold tracking-[0.18em] text-gold">{eyebrow}</p>
              <h3 className="mt-2 font-display text-xl leading-tight">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          Owner enquiries remain private. Contact details and property documents are not automatically published as buyer-facing property listings.
        </p>
      </div>
    </section>
  );
}
