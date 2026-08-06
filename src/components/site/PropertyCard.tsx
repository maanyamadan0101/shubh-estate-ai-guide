import { MapPin, Maximize, BedDouble } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT, type Property } from "@/data/site";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={`${property.title} — ${property.bhk} ${property.type} in ${property.sector}, Gurugram`}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-gold text-gold-foreground hover:bg-gold">
          {property.status}
        </Badge>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{property.builder}</p>
          <h3 className="mt-1 font-display text-xl">{property.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 text-gold" aria-hidden="true" />
            {property.sector}, {property.locality}
          </p>
        </div>

        <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Configuration</dt>
            <dd>{property.bhk}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="size-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Area</dt>
            <dd>{property.area}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {property.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="font-display text-2xl">{property.price}</p>
          <Button asChild variant="goldOutline" size="sm">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
              Enquire
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
