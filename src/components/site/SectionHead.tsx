export function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
      <span className="gold-rule mt-4" />
      {body ? <p className="mt-4 text-muted-foreground">{body}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="surface-navy">
      <div className="container-page py-16 md:py-24">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl md:text-5xl">{title}</h1>
        {body ? <p className="mt-5 max-w-2xl text-navy-foreground/75">{body}</p> : null}
      </div>
    </section>
  );
}
