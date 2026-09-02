import { Link } from "@tanstack/react-router";
import { Landmark, MapPin, ShieldCheck } from "lucide-react";
import { CONTACT } from "@/data/site";

export function SitewidePropertyContext() {
  return (
    <section className="border-y border-border bg-secondary/35" aria-labelledby="gurgaon-advisory-context-title">
      <div className="container-page py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">Gurgaon property advisory</p>
            <h2 id="gurgaon-advisory-context-title" className="mt-3 font-display text-2xl md:text-3xl">
              Compare the property, price, documents and financing together
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              A useful Gurgaon property decision goes beyond a project name or an asking price. Buyers should compare the exact unit, usable area, floor and facing, competing resale inventory, maintenance and transfer costs, title and transaction documents, lender valuation and the amount of own contribution required. Sellers and landlords should similarly test the asking price against current competing inventory and the quality of genuine buyer or tenant demand before committing to a marketing strategy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg">Buyer checks</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Review price context, property documents, project status and transaction risks before paying a material token amount.
              </p>
              <Link to="/property-buying-advisory-gurgaon" className="mt-3 inline-block text-sm font-medium text-gold hover:underline">
                Buying advisory
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <Landmark className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg">Finance planning</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Consider loan eligibility, lender valuation, documentation and the final cash contribution alongside the property shortlist.
              </p>
              <Link to="/home-loans" className="mt-3 inline-block text-sm font-medium text-gold hover:underline">
                Home-loan assistance
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <MapPin className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg">Local, verifiable office</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Meet Shubh Estate Brokers at {CONTACT.address}. Buyers, sellers and overseas owners can also arrange online appointments.
              </p>
              <Link to="/contact" className="mt-3 inline-block text-sm font-medium text-gold hover:underline">
                Locate us & contact
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Explore <Link to="/flats-for-sale-in-gurgaon" className="font-medium text-gold hover:underline">current Gurgaon properties</Link>, <Link to="/projects" className="font-medium text-gold hover:underline">project guides</Link>, <Link to="/sell-property-gurgaon" className="font-medium text-gold hover:underline">owner sale support</Link>, <Link to="/rent-out-property-in-gurgaon" className="font-medium text-gold hover:underline">rent-out assistance</Link> and <Link to="/nri" className="font-medium text-gold hover:underline">remote property services</Link>. Final legal, tax and lender decisions should be confirmed with the appropriate qualified professional or institution.
        </p>
      </div>
    </section>
  );
}
