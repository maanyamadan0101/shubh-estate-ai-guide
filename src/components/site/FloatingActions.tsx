import { Link } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/data/site";

export function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:inset-x-auto md:right-6 md:bottom-6 md:rounded-full md:border md:shadow-[var(--shadow-elegant)]">
      <div className="mx-auto flex max-w-md items-center justify-around gap-1 px-2 py-2 md:max-w-none md:gap-2 md:px-3">
        <a
          href={CONTACT.phoneHref}
          className="flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-3 py-1.5 text-[0.68rem] font-medium transition-colors hover:bg-accent md:flex-row md:gap-2 md:text-sm"
        >
          <Phone className="size-4 text-gold" aria-hidden="true" />
          Call Now
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-3 py-1.5 text-[0.68rem] font-medium transition-colors hover:bg-accent md:flex-row md:gap-2 md:text-sm"
        >
          <MessageCircle className="size-4 text-gold" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          to="/contact"
          className="flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-full bg-primary px-3 py-1.5 text-[0.68rem] font-medium text-primary-foreground transition-opacity hover:opacity-90 md:flex-row md:gap-2 md:text-sm"
        >
          <CalendarCheck className="size-4 text-gold" aria-hidden="true" />
          Book Site Visit
        </Link>
      </div>
    </div>
  );
}
