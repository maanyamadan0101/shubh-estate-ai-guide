import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, GitCompareArrows, MessageCircle, Phone, SlidersHorizontal } from "lucide-react";
import type { ProjectHubListing } from "@/lib/project-hub.functions";
import { CONTACT } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";
import { formatArea, formatINR, PROPERTY_TYPE_LABEL, STATUS_LABEL } from "@/lib/seo";
import { vercelImageUrl, vercelSrcSet } from "@/lib/image-optimization";
import { Button } from "@/components/ui/button";

type Sort = "newest" | "price-low" | "price-high" | "area";

function updatedLabel(value: string | null) {
  if (!value) return "Reconfirm before visit";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function AstaireInventory({ listings }: { listings: ProjectHubListing[] }) {
  const [configuration, setConfiguration] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [compare, setCompare] = useState<string[]>([]);

  const configurations = [...new Set(listings.map((item) => item.bhk).filter(Boolean))] as string[];
  const propertyTypes = [...new Set(listings.map((item) => item.property_type).filter(Boolean))];
  const visible = useMemo(() => {
    const rows = listings.filter(
      (item) =>
        (configuration === "all" || item.bhk === configuration) &&
        (propertyType === "all" || item.property_type === propertyType),
    );
    return [...rows].sort((a, b) => {
      if (sort === "price-low")
        return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
      if (sort === "price-high") return (b.price ?? 0) - (a.price ?? 0);
      if (sort === "area") return (b.area_sqft ?? 0) - (a.area_sqft ?? 0);
      return new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime();
    });
  }, [configuration, propertyType, sort, listings]);
  const selected = listings.filter((item) => compare.includes(item.id));

  function toggleCompare(id: string) {
    setCompare((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 3
          ? [...current, id]
          : current;
      trackEvent("property_compare", {
        project: "BPTP Astaire Gardens",
        selected_count: next.length,
      });
      return next;
    });
  }

  return (
    <>
      <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Configuration
          <select
            value={configuration}
            onChange={(e) => setConfiguration(e.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground"
          >
            <option value="all">All configurations</option>
            {configurations.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Property type
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground"
          >
            <option value="all">All property types</option>
            {propertyTypes.map((value) => (
              <option key={value} value={value}>
                {PROPERTY_TYPE_LABEL[value as keyof typeof PROPERTY_TYPE_LABEL] ?? value}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground"
          >
            <option value="newest">Newest / recently updated</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
            <option value="area">Largest area</option>
          </select>
        </label>
      </div>

      {!listings.length ? (
        <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-6 md:p-8">
          <SlidersHorizontal className="size-6 text-gold" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl">
            No verified Shubh inventory is currently published
          </h3>
          <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
            Share your preferred configuration, budget, floor and area. We can check current owner
            inventory without presenting unverified portal listings as our own.
          </p>
          <Button asChild variant="gold" className="mt-5">
            <a href="#enquire">Send Requirement</a>
          </Button>
        </div>
      ) : !visible.length ? (
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <p className="font-medium">No published inventory matches these filters.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your requirement and we can check current owner inventory.
          </p>
          <Button asChild variant="goldOutline" className="mt-4">
            <a href="#enquire">Send Requirement</a>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {visible.map((listing) => (
            <article
              key={listing.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {listing.cover_image_url ? (
                <img
                  src={vercelImageUrl(listing.cover_image_url, 768)}
                  srcSet={vercelSrcSet(listing.cover_image_url, [480, 640, 768, 960])}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  width={960}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  alt={listing.title}
                  className="aspect-[3/2] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/2] items-center justify-center bg-muted text-sm text-muted-foreground">
                  Property photographs available on request
                </div>
              )}
              <div className="p-5">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-gold/10 px-2.5 py-1 text-gold">For Sale</span>
                  {listing.status ? (
                    <span className="rounded-full bg-muted px-2.5 py-1">
                      {STATUS_LABEL[listing.status] ?? listing.status}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug">{listing.title}</h3>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  {listing.bhk ? (
                    <div>
                      <dt className="text-muted-foreground">Configuration</dt>
                      <dd className="font-medium">{listing.bhk}</dd>
                    </div>
                  ) : null}
                  {listing.area_sqft ? (
                    <div>
                      <dt className="text-muted-foreground">Area</dt>
                      <dd className="font-medium">{formatArea(listing.area_sqft)}</dd>
                    </div>
                  ) : null}
                  {listing.floor ? (
                    <div>
                      <dt className="text-muted-foreground">Floor</dt>
                      <dd className="font-medium">{listing.floor}</dd>
                    </div>
                  ) : null}
                  {listing.facing ? (
                    <div>
                      <dt className="text-muted-foreground">Facing</dt>
                      <dd className="font-medium">{listing.facing}</dd>
                    </div>
                  ) : null}
                  {listing.parking ? (
                    <div>
                      <dt className="text-muted-foreground">Parking</dt>
                      <dd className="font-medium">
                        {listing.parking} car{listing.parking === 1 ? "" : "s"}
                      </dd>
                    </div>
                  ) : null}
                  {listing.furnishing ? (
                    <div>
                      <dt className="text-muted-foreground">Furnishing</dt>
                      <dd className="font-medium">{listing.furnishing}</dd>
                    </div>
                  ) : null}
                </dl>
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <p className="font-display text-2xl">
                      {listing.display_price || formatINR(listing.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Updated {updatedLabel(listing.updated_at)}
                    </p>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={compare.includes(listing.id)}
                      disabled={!compare.includes(listing.id) && compare.length >= 3}
                      onChange={() => toggleCompare(listing.id)}
                    />{" "}
                    Compare
                  </label>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button asChild variant="gold" size="sm">
                    <Link
                      to="/property/$slug"
                      params={{ slug: listing.slug }}
                      onClick={() =>
                        trackEvent("property_card_click", {
                          property_id: listing.id,
                          project: "BPTP Astaire Gardens",
                        })
                      }
                    >
                      Details
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={CONTACT.whatsapp}
                      onClick={() =>
                        trackContact("whatsapp", "astaire_property_card", {
                          property_id: listing.id,
                        })
                      }
                    >
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={CONTACT.phoneHref}
                      onClick={() =>
                        trackContact("phone", "astaire_property_card", { property_id: listing.id })
                      }
                    >
                      Call
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected.length ? (
        <section
          className="mt-10 overflow-hidden rounded-2xl border border-gold/30 bg-card"
          aria-labelledby="compare-title"
        >
          <div className="border-b border-border p-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <GitCompareArrows className="size-4" /> Compare up to three
            </p>
            <h3 id="compare-title" className="mt-2 font-display text-2xl">
              Selected properties
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Property",
                    "Price",
                    "Area",
                    "Floor",
                    "Facing",
                    "Parking",
                    "Furnishing",
                    "Updated",
                  ].map((h) => (
                    <th key={h} className="p-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium">{item.bhk ?? item.title}</td>
                    <td className="p-3">{item.display_price || formatINR(item.price)}</td>
                    <td className="p-3">{item.area_sqft ? formatArea(item.area_sqft) : "—"}</td>
                    <td className="p-3">{item.floor ?? "—"}</td>
                    <td className="p-3">{item.facing ?? "—"}</td>
                    <td className="p-3">{item.parking ?? "—"}</td>
                    <td className="p-3">{item.furnishing ?? "—"}</td>
                    <td className="p-3">{updatedLabel(item.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5">
            <Button asChild variant="gold">
              <a href="#enquire">Ask Shubh Estate Brokers to Compare These Properties</a>
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function AstaireMobileActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background p-2 shadow-[0_-8px_24px_rgba(0,0,0,.08)] md:hidden">
      <a
        href={CONTACT.whatsapp}
        onClick={() => trackContact("whatsapp", "astaire_mobile_bar")}
        className="flex min-h-11 items-center justify-center gap-1 text-xs font-medium"
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </a>
      <a
        href="#enquire"
        className="flex min-h-11 items-center justify-center gap-1 border-x border-border text-xs font-medium"
      >
        <Check className="size-4" />
        Enquire
      </a>
      <a
        href={CONTACT.phoneHref}
        onClick={() => trackContact("phone", "astaire_mobile_bar")}
        className="flex min-h-11 items-center justify-center gap-1 text-xs font-medium"
      >
        <Phone className="size-4" />
        Call
      </a>
    </div>
  );
}
