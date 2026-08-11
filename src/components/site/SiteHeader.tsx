import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/luxury", label: "Luxury" },
  { to: "/sell-property-gurgaon", label: "Sell Property" },
  { to: "/nri", label: "NRI" },
  { to: "/home-loans", label: "Home Loans" },
  { to: "/emi-calculator", label: "EMI Calculator" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Shubh Estate Brokers home">
          <span className="flex size-10 items-center justify-center rounded-sm surface-navy font-display text-lg text-gold">
            S
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-tight">Shubh Estate Brokers</span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">
              Gurugram · Advisory & Mortgage
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" className="hidden sm:inline-flex">
            <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "site_header")}>
              <Phone aria-hidden="true" />
              <span>{CONTACT.phone}</span>
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="min-h-11 min-w-11 lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-display text-xl">Menu</SheetTitle>
              <nav className="mt-6 grid gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
