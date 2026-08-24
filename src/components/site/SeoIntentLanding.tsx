import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";

type IntentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type RelatedLink = {
  href: string;
  label: string;
};

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  intro: string;
  sections: IntentSection[];
  interest: string;
  ctaTitle?: string;
  ctaBody?: string;
  related?: RelatedLink[];
  media?: ReactNode;
};

export function SeoIntentLanding({
  eyebrow,
  title,
  body,
  intro,
  sections,
  interest,
  ctaTitle = "Tell us what you are looking for",
  ctaBody = "Share your budget, preferred location, configuration and timing. We will shortlist suitable options from the inventory available to us and explain the trade-offs before you visit.",
  related = [],
  media,
}: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} body={body} />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{intro}</p>
            </div>
          </div>

          {media ? <div className="mt-10">{media}</div> : null}

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl md:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {related.length ? (
            <div className="mt-12 rounded-2xl surface-navy p-7">
              <p className="eyebrow">Related Gurgaon Property Searches</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {related.map((item) => (
                  <a key={item.href} href={item.href} className="text-gold underline-offset-4 hover:underline">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <p className="mt-8 text-sm text-muted-foreground">
            Browse <Link to="/flats-for-sale-in-gurgaon" className="text-gold underline-offset-4 hover:underline">current flats and properties for sale in Gurgaon</Link> or <Link to="/contact" className="text-gold underline-offset-4 hover:underline">speak with Shubh Estate Brokers</Link>.
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">{ctaTitle}</h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{ctaBody}</p>
          <div className="mt-4">
            <EnquiryForm interest={interest} compact />
          </div>
        </aside>
      </section>
    </>
  );
}
