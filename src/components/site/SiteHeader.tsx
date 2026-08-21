import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/under-construction-projects-gurgaon", label: "New Projects" },
  { to: "/property-services-gurgaon", label: "Services" },
  { to: "/sell-property-gurgaon", label: "Sell / Rent" },
  { to: "/nri", label: "NRI" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
] as const;

const PROPERTY_LINKS = [
  { to: "/properties", label: "All Gurgaon Properties", description: "Browse sale and rental listings" },
  {
    to: "/dwarka-expressway-flats-for-sale-gurgaon",
    label: "Dwarka Expressway Flats for Sale",
    description: "Current sale inventory across key projects",
  },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Shubh Estate Brokers home">
          <span className="flex size-10 items-center justify-center rounded-sm surface-navy font-display text-lg text-gold">S</span>
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-tight">Shubh Estate Brokers</span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">Gurugram · Advisory & Mortgage</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground">Home</Link>

          <div className="group relative">
            <Link
              to="/properties"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              Properties
              <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-xl border border-border bg-background p-2 shadow-[var(--shadow-elegant)]">
                {PROPERTY_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block rounded-lg px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <span className="block text-sm font-medium text-foreground">{item.label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV.slice(1).map((item) => (
            <Link key={item.to} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="gold" className="hidden sm:inline-flex">
            <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "site_header")}><Phone aria-hidden="true" /><span>{CONTACT.phone}</span></a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="min-h-11 min-w-11 lg:hidden" aria-label="Open menu"><Menu aria-hidden="true" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-display text-xl">Menu</SheetTitle>
              <nav className="mt-6 grid gap-1" aria-label="Mobile">
                <Link to="/" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent">Home</Link>

                <div className="my-1 rounded-lg border border-border bg-secondary/35 p-2">
                  <Link
                    to="/properties"
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent"
                  >
                    Properties
                  </Link>
                  <div className="grid gap-1 border-l border-gold/30 pl-2">
                    {PROPERTY_LINKS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {NAV.slice(1).map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent">{item.label}</Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
