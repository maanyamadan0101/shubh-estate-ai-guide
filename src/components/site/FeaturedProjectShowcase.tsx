import {
  ArrowUpRight,
  Building2,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GURGAON_DIRECTORY_PROJECTS } from "@/data/gurgaon-project-directory";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";
import { directoryProjectImageFor } from "@/lib/directory-project-images";
import { vercelSrcSet } from "@/lib/image-optimization";

const PROJECT_GUIDES: Record<string, string> = {
  "AIPL Riviera at AIPL LakeCity": "/projects/aipl-riviera-resale-sector-103-gurgaon",
  "Ansals Highland Park": "/projects/ansals-highland-park-sector-103-gurgaon",
  "DLF The Arbour": "/projects/dlf-the-arbour-sector-63-gurgaon",
  "Ireo Skyon": "/ireo-skyon-3-bhk-for-sale-sector-60-gurgaon",
  "Puri Emerald Bay": "/puri-emerald-bay-3-bhk-for-sale-sector-104-gurgaon",
};

function projectStatusClass(status: string) {
  if (status === "Ready to move") return "bg-emerald-50 text-emerald-800";
  if (status === "New launch") return "bg-violet-50 text-violet-800";
  if (status === "Under construction") return "bg-amber-50 text-amber-800";
  return "bg-background text-foreground";
}

export function FeaturedProjectShowcase({ projectNames }: { projectNames: readonly string[] }) {
  const requestedNames = new Set(projectNames);
  const projects = GURGAON_DIRECTORY_PROJECTS.filter((project) => requestedNames.has(project.name));

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const image = directoryProjectImageFor(project.name);
          const href = project.href ?? PROJECT_GUIDES[project.name] ?? "/projects";
          const message = encodeURIComponent(
            `Hi Arun, please share the current verified price, availability and buyer checks for ${project.name}, ${project.sector}.`,
          );

          return (
            <article
              key={project.name}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-elegant)] focus-within:border-gold/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                {image ? (
                  <img
                    src={image.src}
                    srcSet={vercelSrcSet(image.src, [360, 540, 720, 960])}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    width={960}
                    height={600}
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 47vw, 100vw"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="surface-navy relative flex size-full flex-col items-center justify-center overflow-hidden px-6 text-center text-navy-foreground">
                    <div className="absolute -right-12 -top-14 size-44 rounded-full border border-gold/15" />
                    <div className="absolute -bottom-24 -left-12 size-52 rounded-full border border-gold/10" />
                    <Building2 className="relative size-10 text-gold" aria-hidden="true" />
                    <p className="relative mt-4 font-display text-xl">{project.name}</p>
                    <p className="relative mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
                      Official project image awaited
                    </p>
                  </div>
                )}
                <Badge
                  className={`absolute left-3 top-3 border-0 ${projectStatusClass(project.status)}`}
                >
                  {project.status}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  {project.developer}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{project.name}</h3>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {project.sector} · {project.corridor}
                </p>

                <dl className="mt-5 grid gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Configuration</dt>
                    <dd className="mt-1 font-medium">{project.configuration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Current price context</dt>
                    <dd className="mt-1 font-medium text-gold">{project.priceLabel}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.reraNumber ? (
                    <Badge variant="outline" className="border-emerald-600/30 text-emerald-800">
                      <ShieldCheck className="size-3" aria-hidden="true" />
                      RERA registered
                    </Badge>
                  ) : null}
                  <Badge variant="outline" className="border-gold/35">
                    <Landmark className="size-3 text-gold" aria-hidden="true" />
                    Up to 90% loan*
                  </Badge>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                  <Button asChild variant="goldOutline" className="px-3">
                    <a
                      href={href}
                      onClick={() =>
                        trackEvent("project_card_click", {
                          project_name: project.name,
                          page_path: window.location.pathname,
                        })
                      }
                    >
                      View project
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild variant="gold" className="px-3">
                    <a
                      href={`${CONTACT.whatsapp}?text=${message}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackContact("whatsapp", "featured_project_card", {
                          project_name: project.name,
                        })
                      }
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-5 text-muted-foreground">* {LOAN_DISCLAIMER}</p>
    </>
  );
}
