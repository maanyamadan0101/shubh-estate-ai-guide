import { ExternalLink, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Shubh%20Estate%20Brokers%20Ocus%20Quantum%20Mall%20Sector%2051%20Gurugram";

export function HomeVisitTrust() {
  return (
    <section className="container-page py-10 md:py-14" aria-labelledby="visit-us-title">
      <div className="grid overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-7 md:p-10">
          <p className="eyebrow">Visit / Locate Us</p>
          <h2 id="visit-us-title" className="mt-3 font-display text-3xl md:text-4xl">
            A real Gurgaon office you can visit
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Meet Shubh Estate Brokers for property buying, selling, rental, valuation, due-diligence
            coordination and home-loan assistance at our Sector 51, Gurugram office.
          </p>

          <address className="mt-6 flex max-w-2xl items-start gap-3 text-sm not-italic leading-6 text-foreground md:text-base">
            <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
            <span>
              <strong className="block">Shubh Estate Brokers</strong>
              {CONTACT.address}
            </span>
          </address>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="gold">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("google_maps_click", {
                    location: "homepage_visit_trust",
                    page_path: window.location.pathname,
                  })
                }
              >
                <MapPin className="size-4" aria-hidden="true" />
                View on Google Maps
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={CONTACT.googleBusinessProfile}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("google_business_profile_click", {
                    location: "homepage_visit_trust",
                    page_path: window.location.pathname,
                  })
                }
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Google Business Profile
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={CONTACT.googleReview}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("google_review_click", {
                    location: "homepage_visit_trust",
                    page_path: window.location.pathname,
                  })
                }
              >
                <Star className="size-4" aria-hidden="true" />
                Read / Leave a Google Review
              </a>
            </Button>
          </div>
        </div>

        <div className="min-h-72 border-t border-border lg:min-h-full lg:border-l lg:border-t-0">
          <iframe
            title="Shubh Estate Brokers office location in Sector 51 Gurugram"
            src="https://www.google.com/maps?q=Shubh%20Estate%20Brokers%20Ocus%20Quantum%20Mall%20Sector%2051%20Gurugram&output=embed"
            loading="lazy"
            className="h-full min-h-72 w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
