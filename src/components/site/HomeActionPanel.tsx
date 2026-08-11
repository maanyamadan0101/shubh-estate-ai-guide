import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Calculator,
  Home,
  KeyRound,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const INTENTS = [
  {
    id: "buy",
    label: "Buy",
    icon: Home,
    title: "Find a home that fits the budget and the decision",
    body: "Compare current Gurgaon listings, project stage, price, paperwork and financing before planning visits.",
    primary: { label: "Browse homes for sale", to: "/properties", search: { purpose: "sale" } },
    secondary: { label: "Share your requirement", to: "/contact" },
  },
  {
    id: "rent",
    label: "Rent",
    icon: KeyRound,
    title: "Tell us where and how you want to live",
    body: "We help tenants shortlist suitable homes, coordinate visits and support the rental documentation process.",
    primary: { label: "Find rental homes", to: "/properties", search: { purpose: "rent" } },
    secondary: { label: "Request tenant assistance", to: "/property-services-gurgaon" },
  },
  {
    id: "projects",
    label: "New Projects",
    icon: Building2,
    title: "Explore launches and under-construction projects",
    body: "Review current inventory with RERA, developer, construction-stage, payment-plan and exit-risk context.",
    primary: {
      label: "Explore new projects",
      to: "/under-construction-projects-gurgaon",
    },
    secondary: { label: "Book a video consultation", to: "/contact" },
  },
  {
    id: "owners",
    label: "Owners",
    icon: ShieldCheck,
    title: "Sell, rent out or manage property from anywhere",
    body: "Get price positioning, tenant or buyer coordination, documentation follow-up and local execution support.",
    primary: { label: "List your property", to: "/sell-property-gurgaon" },
    secondary: { label: "View owner services", to: "/property-services-gurgaon" },
  },
  {
    id: "loans",
    label: "Loans",
    icon: Landmark,
    title: "Review eligibility, takeover and smart loan options",
    body: "Compare loan structure, balance-transfer economics and eligible overdraft-linked products alongside the property.",
    primary: { label: "Check home-loan support", to: "/home-loans" },
    secondary: { label: "Calculate EMI", to: "/emi-calculator" },
  },
] as const;

type IntentId = (typeof INTENTS)[number]["id"];

export function HomeActionPanel() {
  const [activeId, setActiveId] = useState<IntentId>("buy");
  const active = INTENTS.find((item) => item.id === activeId) ?? INTENTS[0];
  const ActiveIcon = active.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/25 bg-background/95 text-foreground shadow-[0_28px_80px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl">
      <div
        role="tablist"
        aria-label="Choose a property service"
        className="grid grid-cols-3 border-b border-border sm:grid-cols-5"
      >
        {INTENTS.map((item) => {
          const Icon = item.icon;
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(item.id)}
              className={`relative flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-3 text-[0.68rem] font-medium transition-colors sm:text-xs ${
                selected
                  ? "bg-gold/10 text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-gold"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="p-6 md:p-8">
        <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-gold">
          <ActiveIcon className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl leading-tight">{active.title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{active.body}</p>

        <div className="mt-6 grid gap-3">
          <Button asChild variant="gold" size="lg" className="w-full justify-between">
            <Link
              to={active.primary.to}
              {...("search" in active.primary ? { search: active.primary.search } : {})}
            >
              {active.primary.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-between">
            <Link to={active.secondary.to}>
              {active.secondary.label}
              {active.id === "loans" ? (
                <Calculator aria-hidden="true" />
              ) : (
                <ArrowRight aria-hidden="true" />
              )}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
