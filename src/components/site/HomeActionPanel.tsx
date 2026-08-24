import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Globe2, Landmark, Upload } from "lucide-react";

const ACTIONS = [
  {
    label: "Browse Verified Properties",
    body: "Compare luxury homes, residential apartments and sector-specific listings with realistic price context—not inflated asking-price claims.",
    eyebrow: "HOMEBUYERS",
    icon: Building2,
    to: "/flats-for-sale-in-gurgaon",
    search: { purpose: "sale" },
  },
  {
    label: "NRI Property Selling & Remote Services",
    body: "POA assistance, tenant coordination, local property oversight and remote resale execution for owners living outside Gurugram or overseas.",
    eyebrow: "NRI & REMOTE OWNERS",
    icon: Globe2,
    to: "/nri-sell-property-gurgaon",
  },
  {
    label: "Home Loan & Mortgage Structuring",
    body: "Integrated loan coordination, valuation analysis, balance transfer, property-debt takeover and eligible overdraft structuring.",
    eyebrow: "FINANCIALLY FOCUSED BUYERS",
    icon: Landmark,
    to: "/home-loans",
  },
  {
    label: "Post Your Property",
    body: "Receive a practical property assessment, transparent price benchmarks and seller due-diligence coordination before marketing begins.",
    eyebrow: "SELLERS",
    icon: Upload,
    to: "/seller-submit",
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
              Choose the property outcome you need
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Go directly to the relevant advisory path—without navigating a crowded property portal
              or sitting through an aggressive sales pitch.
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
              LIVE DWARKA EXPRESSWAY INVENTORY
            </p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              37 flats for sale across 13 Dwarka Expressway project groups
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Compare current resale and selected under-construction options in Sectors 99–111,
              including Puri Emerald Bay, ATS Triumph, Godrej Meridien, Sobha City, Hero Homes and more.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold">
            View current inventory
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map(({ label, body, eyebrow, icon: Icon, to, ...action }) => (
            <Link
              key={label}
              to={to}
              {...("search" in action ? { search: action.search } : {})}
              className="group relative min-h-[250px] overflow-hidden rounded-2xl border border-border bg-card p-6 text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)]"
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
          Seller submissions remain private and are visible only to the Shubh Estate Brokers team
          until reviewed and approved for marketing.
        </p>
      </div>
    </section>
  );
}
