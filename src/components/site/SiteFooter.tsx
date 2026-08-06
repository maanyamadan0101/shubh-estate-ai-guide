import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 surface-navy">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">Shubh Estate Brokers</p>
          <p className="mt-2 max-w-sm text-sm text-navy-foreground/70">{CONTACT.tagline}</p>
          <address className="mt-6 space-y-3 text-sm not-italic text-navy-foreground/80">
            <span className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.address}
            </span>
            <a href={CONTACT.phoneHref} className="flex gap-3 hover:text-gold">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex gap-3 hover:text-gold">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.email}
            </a>
          </address>
        </div>

        <nav aria-label="Services">
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li>
              <Link to="/properties" className="hover:text-gold">
                Buy Property in Gurgaon
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-gold">
                Rent & Lease
              </Link>
            </li>
            <li>
              <Link to="/home-loans" className="hover:text-gold">
                Home Loan Assistance
              </Link>
            </li>
            <li>
              <Link to="/emi-calculator" className="hover:text-gold">
                EMI Calculator
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Property Valuation
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li>
              <Link to="/about" className="hover:text-gold">
                About & Founder
              </Link>
            </li>
            <li>
              <Link to="/gurugram-growth-story" className="hover:text-gold">
                Gurugram Growth Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page space-y-4 py-8">
          <p className="text-xs leading-relaxed text-navy-foreground/55">{LOAN_DISCLAIMER}</p>
          <p className="text-xs text-navy-foreground/55">
            © {new Date().getFullYear()} Shubh Estate Brokers, Gurugram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
