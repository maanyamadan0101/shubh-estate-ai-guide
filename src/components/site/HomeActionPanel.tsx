import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, KeyRound, Search, Send } from "lucide-react";

const ACTIONS = [
  {
    label: "Share Your Requirement",
    body: "Tell us your preferred location, budget and property requirement.",
    icon: Send,
    to: "/contact",
  },
  {
    label: "Browse Properties for Sale",
    body: "View current Gurgaon resale and sale inventory.",
    icon: Search,
    to: "/properties",
    search: { purpose: "sale" },
  },
  {
    label: "Post Your Available Property for Sale",
    body: "Owners can privately share property details with our team for sale.",
    icon: Home,
    to: "/seller-submit",
  },
  {
    label: "Post Your Property Available for Rent",
    body: "Share your available rental property privately for tenant coordination.",
    icon: KeyRound,
    to: "/seller-submit",
  },
] as const;

export function HomeActionPanel() {
  return (
    <div className="rounded-2xl border border-white/25 bg-background/95 p-5 text-foreground shadow-[0_28px_80px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Quick Property Actions</p>
      <h2 className="mt-2 font-display text-2xl leading-tight">What would you like to do?</h2>

      <div className="mt-5 grid gap-3">
        {ACTIONS.map(({ label, body, icon: Icon, to, ...action }) => (
          <Link
            key={label}
            to={to}
            {...("search" in action ? { search: action.search } : {})}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-sm"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-5 text-foreground group-hover:text-gold">{label}</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{body}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
