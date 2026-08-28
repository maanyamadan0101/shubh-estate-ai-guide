import { Link } from "@tanstack/react-router";
import { CalendarClock, Laptop, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { ProjectVideoPreviews } from "@/components/site/ProjectVideoPreviews";
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

const POPULAR_SEARCH_LINKS = [
  ["/projects", "Gurgaon Project Guides"],
  ["/ready-to-move-flats-in-gurgaon", "Ready-to-Move Flats in Gurgaon"],
  ["/blog/gurgaon-property-due-diligence-checklist-2026", "Property Due Diligence Checklist"],
  ["/property-buying-advisory-gurgaon", "Gurgaon Buyer Advisory"],
  ["/dwarka-expressway-flats-for-sale-gurgaon", "Dwarka Expressway Flats for Sale"],
  ["/under-construction-projects-gurgaon", "Under-Construction Projects"],
  ["/best-areas-gurgaon-property-investment", "Property Investment Areas"],
  ["/sell-property-gurgaon", "Sell Property in Gurgaon"],
  ["/rent-out-property-in-gurgaon", "Rent Out Property in Gurgaon"],
  ["/mandate-to-sell-property-in-gurgaon", "Selling Mandate Gurgaon"],
] as const;

export function SiteFooter() {
  return (
    <>
      <ProjectVideoPreviews />
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
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "site_footer")} className="flex gap-3 hover:text-gold">
                <MessageCircle className="size-4 shrink-0 text-gold" aria-hidden="true" />
                WhatsApp Arun Madaan
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex gap-3 hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.email}
              </a>
              <span className="flex gap-3">
                <CalendarClock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{CONTACT.weekdayHours}<br />{CONTACT.saturdayHours}</span>
              </span>
              <span className="flex gap-3">
                <Laptop className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.serviceModes}
              </span>
              <a href={CONTACT.googleBusinessProfile} target="_blank" rel="noreferrer" onClick={() => trackEvent("google_business_profile_click", { location: "site_footer", page_path: window.location.pathname })} className="flex gap-3 hover:text-gold">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                View our Google Business Profile
              </a>
              <a href={CONTACT.googleReview} target="_blank" rel="noreferrer" onClick={() => trackEvent("google_review_click", { location: "site_footer", page_path: window.location.pathname })} className="flex gap-3 hover:text-gold">
                <Star className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                Read or leave a genuine Google review
              </a>
            </address>
          </div>

          <nav aria-label="Property services">
            <p className="eyebrow">Buy & Finance</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li><Link to="/flats-for-sale-in-gurgaon" className="hover:text-gold">Flats for Sale in Gurgaon</Link></li>
              <li><Link to="/ready-to-move-flats-in-gurgaon" className="hover:text-gold">Ready-to-Move Flats in Gurgaon</Link></li>
              <li><Link to="/projects" className="hover:text-gold">Gurgaon Project Guides</Link></li>
              <li><Link to="/under-construction-projects-gurgaon" className="hover:text-gold">New & Under-Construction Projects</Link></li>
              <li><Link to="/luxury" className="hover:text-gold">Luxury Property Gurgaon</Link></li>
              <li><Link to="/property-buying-advisory-gurgaon" className="hover:text-gold">Property Buying Advisory</Link></li>
              <li><Link to="/home-loans" className="hover:text-gold">Home Loan & Mortgage Assistance</Link></li>
              <li><Link to="/emi-calculator" className="hover:text-gold">EMI Calculator</Link></li>
            </ul>
          </nav>

          <nav aria-label="Owner services">
            <p className="eyebrow">Owner Services</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li><Link to="/sell-property-gurgaon" className="hover:text-gold">Sell Property in Gurgaon</Link></li>
              <li><Link to="/rent-out-property-in-gurgaon" className="hover:text-gold">Rent Out Property in Gurgaon</Link></li>
              <li><Link to="/mandate-to-sell-property-in-gurgaon" className="hover:text-gold">Give Selling Mandate</Link></li>
              <li><Link to="/property-services-gurgaon" className="hover:text-gold">Property Management & Valuation</Link></li>
              <li><Link to="/property-services-gurgaon" className="hover:text-gold">Due Diligence & Owner Support</Link></li>
              <li><Link to="/nri" className="hover:text-gold">NRI & Overseas Property Services</Link></li>
              <li><Link to="/nri-sell-property-gurgaon" className="hover:text-gold">Remote Sale Support</Link></li>
            </ul>
          </nav>

          <nav aria-label="Gurgaon property locations">
            <p className="eyebrow">Locations</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              {LOCATION_LINKS.map(([slug, label]) => (
                <li key={slug}><Link to="/locations/$slug" params={{ slug }} className="hover:text-gold">{label}</Link></li>
              ))}
            </ul>
            <p className="eyebrow mt-8">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li><Link to="/about" className="hover:text-gold">About & Founder</Link></li>
              <li><Link to="/blog" className="hover:text-gold">Gurgaon Property Insights</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-navy-foreground/10">
          <div className="container-page space-y-4 py-8">
            <p className="text-xs text-navy-foreground/65">
              Popular Gurgaon property searches:{" "}
              {POPULAR_SEARCH_LINKS.map(([href, label], index) => (
                <span key={href}>{index > 0 ? " · " : ""}<a href={href} className="hover:text-gold">{label}</a></span>
              ))}
            </p>
            <p className="text-xs text-navy-foreground/65">
              International property resources: <Link to="/nri" className="hover:text-gold">owners and buyers outside India</Link>. Core Gurgaon buying, selling, rent-out and mandate pages remain the primary site experience for visitors in every country.
            </p>
            <p className="text-xs leading-relaxed text-navy-foreground/55">{LOAN_DISCLAIMER}</p>
            <p className="text-xs text-navy-foreground/55">© {new Date().getFullYear()} Shubh Estate Brokers, Gurugram. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
