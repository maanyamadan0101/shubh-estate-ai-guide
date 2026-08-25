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
  { to: "/nri", label: "NRI" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
] as const;

const PROPERTY_LINKS = [
  { to: "/flats-for-sale-in-gurgaon", label: "All Gurgaon Properties", description: "Browse verified sale inventory" },
  {
    to: "/dwarka-expressway-flats-for-sale-gurgaon",
    label: "Dwarka Expressway Flats for Sale",
    description: "Current inventory across key projects",
  },
  {
    to: "/under-construction-projects-gurgaon",
    label: "Under-Construction Projects",
    description: "Compare new and upcoming residential options",
  },
] as const;

const OWNER_LINKS = [
  {
    to: "/sell-property-gurgaon",
    label: "Sell Property in Gurgaon",
    description: "Valuation, marketing, negotiation and transaction support",
  },
  {
    to: "/rent-out-property-in-gurgaon",
    label: "Rent Out Property",
    description: "Rent assessment, tenant search and viewing coordination",
  },
  {
    to: "/mandate-to-sell-property-in-gurgaon",
    label: "Give Selling Mandate",
    description: "One accountable advisor for a coordinated sale",
  },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Shubh Estate Brokers home">
          <img
            src="/shubh-estate-logo.png"
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 object-contain"
            aria-hidden="true"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-tight">Shubh Estate Brokers</span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">Gurugram · Advisory & Mortgage</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground">Home</Link>

          <NavDropdown label="Properties" to="/flats-for-sale-in-gurgaon" items={PROPERTY_LINKS} />
          <NavDropdown label="Owners" to="/sell-property-gurgaon" items={OWNER_LINKS} />

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
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="font-display text-xl">Menu</SheetTitle>
              <nav className="mt-6 grid gap-1" aria-label="Mobile">
                <Link to="/" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent">Home</Link>

                <MobileGroup title="Properties" primaryTo="/flats-for-sale-in-gurgaon" items={PROPERTY_LINKS} onClose={() => setOpen(false)} />
                <MobileGroup title="Owner Services" primaryTo="/sell-property-gurgaon" items={OWNER_LINKS} onClose={() => setOpen(false)} />

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

function NavDropdown({ label, to, items }: { label: string; to: string; items: readonly { to: string; label: string; description: string }[] }) {
  return (
    <div className="group relative">
      <Link
        to={to}
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
      </Link>
      <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-xl border border-border bg-background p-2 shadow-[var(--shadow-elegant)]">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className="block rounded-lg px-4 py-3 transition-colors hover:bg-accent">
              <span className="block text-sm font-medium text-foreground">{item.label}</span>
              <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ title, primaryTo, items, onClose }: { title: string; primaryTo: string; items: readonly { to: string; label: string }[]; onClose: () => void }) {
  return (
    <div className="my-1 rounded-lg border border-border bg-secondary/35 p-2">
      <Link to={primaryTo} onClick={onClose} className="block rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent">
        {title}
      </Link>
      <div className="grid gap-1 border-l border-gold/30 pl-2">
        {items.map((item) => (
          <Link key={item.to} to={item.to} onClick={onClose} className="rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
