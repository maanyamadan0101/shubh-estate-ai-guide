import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";

const LOCATION_LINKS = [
  ["gurgaon", "Property in Gurgaon"],
  ["golf-course-road", "Golf Course Road"],
  ["golf-course-extension-road", "Golf Course Extension Road"],
  ["dwarka-expressway", "Dwarka Expressway"],
  ["southern-peripheral-road", "Southern Peripheral Road (SPR)"],
  ["sohna-road", "Sohna Road"],
  ["new-gurgaon", "New Gurgaon"],
] as const;

const NRI_MARKET_LINKS = [
  ["usa", "USA"],
  ["canada", "Canada"],
  ["australia", "Australia"],
  ["europe", "Europe"],
] as const;

const POPULAR_SEARCH_LINKS = [
  ["/desperate-deals-gurgaon", "Urgent Sale Deals"],
  ["/apartments-for-sale-dlf-phase-1-gurgaon", "DLF Phase 1 Apartments"],
  ["/higher-floor-apartments-golf-course-extension-road", "Higher-Floor Apartments"],
  ["/senior-citizen-housing-gurgaon", "Senior Citizen Housing"],
  ["/best-areas-gurgaon-property-investment", "Property Investment Areas"],
  ["/godrej-101-sector-79-gurgaon", "Godrej 101 Sector 79"],
  ["/property-sector-79-gurgaon", "Property in Sector 79"],
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 surface-navy">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl">Shubh Estate Brokers</p>
          <p className="mt-2 max-w-sm text-sm text-navy-foreground/70">{CONTACT.tagline}</p>
          <address className="mt-6 space-y-3 text-sm not-italic text-navy-foreground/80">
            <span className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.address}
            </span>
            <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "site_footer_primary")} className="flex gap-3 hover:text-gold">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a href={CONTACT.alternatePhoneHref} onClick={() => trackContact("phone", "site_footer_alternate")} className="flex gap-3 hover:text-gold">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.alternatePhone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex gap-3 hover:text-gold">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.googleBusinessProfile}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("google_business_profile_click", { location: "site_footer", page_path: window.location.pathname })}
              className="flex gap-3 hover:text-gold"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              View our verified Google Business Profile
            </a>
          </address>
        </div>

        <nav aria-label="Services">
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/properties" className="hover:text-gold">Buy Property in Gurgaon</Link></li>
            <li><Link to="/properties" className="hover:text-gold">Rent & Lease</Link></li>
            <li><Link to="/sell-property-gurgaon" className="hover:text-gold">Sell Property in Gurgaon</Link></li>
            <li><Link to="/nri" className="hover:text-gold">NRI Property Services</Link></li>
            <li><Link to="/nri-sell-property-gurgaon" className="hover:text-gold">NRI Owners: Sell from Abroad</Link></li>
            <li><Link to="/home-loans" className="hover:text-gold">Home Loan Assistance</Link></li>
            <li><Link to="/emi-calculator" className="hover:text-gold">EMI Calculator</Link></li>
          </ul>
        </nav>

        <nav aria-label="Gurgaon property locations">
          <p className="eyebrow">Locations</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            {LOCATION_LINKS.map(([slug, label]) => (
              <li key={slug}>
                <Link to="/locations/$slug" params={{ slug }} className="hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/about" className="hover:text-gold">About & Founder</Link></li>
            <li><Link to="/gurugram-growth-story" className="hover:text-gold">Gurugram Growth Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page space-y-4 py-8">
          <p className="text-xs text-navy-foreground/65">
            Popular property searches:{" "}
            {POPULAR_SEARCH_LINKS.map(([href, label], index) => (
              <span key={href}>
                {index > 0 ? " · " : ""}
                <a href={href} className="hover:text-gold">{label}</a>
              </span>
            ))}
          </p>
          <p className="text-xs text-navy-foreground/65">
            Overseas NRI buyers:{" "}
            {NRI_MARKET_LINKS.map(([slug, label], index) => (
              <span key={slug}>
                {index > 0 ? " · " : ""}
                <a href={`/nri/${slug}`} className="hover:text-gold">{label}</a>
              </span>
            ))}
            {" · "}<Link to="/nri" className="hover:text-gold">All NRI property services</Link>
          </p>
          <p className="text-xs leading-relaxed text-navy-foreground/55">{LOAN_DISCLAIMER}</p>
          <p className="text-xs text-navy-foreground/55">
            © {new Date().getFullYear()} Shubh Estate Brokers, Gurugram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
