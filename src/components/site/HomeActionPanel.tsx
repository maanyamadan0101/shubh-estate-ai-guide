import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, KeyRound, Search, Send } from "lucide-react";

const ACTIONS = [
  {
    label: "Share Your Requirement",
    body: "Tell us your budget, preferred location and property type.",
    eyebrow: "BUYER",
    icon: Send,
    to: "/contact",
    featured: true,
  },
  {
    label: "Browse Properties for Sale",
    body: "Explore current resale and sale opportunities across Gurgaon.",
    eyebrow: "EXPLORE",
    icon: Search,
    to: "/properties",
    search: { purpose: "sale" },
  },
  {
    label: "Post Property for Sale",
    body: "Share your available property privately with our team.",
    eyebrow: "OWNER",
    icon: Home,
    to: "/seller-submit",
  },
  {
    label: "Post Property for Rent",
    body: "Send rental availability for tenant matching and coordination.",
    eyebrow: "OWNER",
    icon: KeyRound,
    to: "/seller-submit",
  },
] as const;

export function HomeActionPanel() {
  return (
    <div className="lg:pl-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Start here</p>
          <h2 className="mt-2 max-w-md font-display text-2xl leading-tight text-white md:text-3xl">
            What can we help you with today?
          </h2>
        </div>
        <span className="hidden text-right text-xs leading-5 text-white/55 sm:block">
          Direct access.<br />No portal clutter.
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ACTIONS.map(({ label, body, eyebrow, icon: Icon, to, featured, ...action }) => (
          <Link
            key={label}
            to={to}
            {...("search" in action ? { search: action.search } : {})}
            className={`group relative min-h-[148px] overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.75)] ${
              featured
                ? "bg-gold text-navy"
                : "bg-white/95 text-navy backdrop-blur-sm hover:bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${
                  featured ? "bg-navy text-gold" : "bg-navy text-gold"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <ArrowUpRight
                className="size-5 opacity-55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>

            <p className={`mt-5 text-[0.65rem] font-bold tracking-[0.16em] ${featured ? "text-navy/65" : "text-gold"}`}>
              {eyebrow}
            </p>
            <h3 className="mt-1 font-display text-xl leading-tight">{label}</h3>
            <p className={`mt-2 text-xs leading-5 ${featured ? "text-navy/75" : "text-navy/65"}`}>{body}</p>
          </Link>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-white/55">
        Owner submissions remain private until reviewed by Shubh Estate Brokers.
      </p>
    </div>
  );
}
