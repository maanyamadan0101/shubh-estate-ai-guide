import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Phone, UserRound, X } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CONTACT } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";

const SESSION_KEY = "shubh_property_assistant_seen";
const AUTO_OPEN_DELAY_MS = 6000;

export function LeadAssistant({ pathname }: { pathname: string }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showCallback, setShowCallback] = useState(false);

  const hiddenRoute =
    pathname.startsWith("/admin") ||
    pathname === "/auth" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  const whatsappHref = useMemo(() => {
    const page = `https://www.shubhestatebroker.in${pathname}`;
    const text = encodeURIComponent(
      `Hi Shubh Estate Brokers, I am viewing ${page} and would like help choosing the right property in Gurugram. Please guide me on suitable options, current pricing and availability.`,
    );
    return `${CONTACT.whatsapp}?text=${text}`;
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    if (hiddenRoute) return;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Ignore unavailable storage; the assistant can still work.
    }

    if (alreadySeen) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Ignore unavailable storage.
      }
      trackEvent("lead_assistant_open", {
        page_path: window.location.pathname,
        open_method: "automatic_delay",
      });
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [hiddenRoute]);

  if (!mounted || hiddenRoute) return null;

  const closeAssistant = () => {
    setOpen(false);
    setShowCallback(false);
    trackEvent("lead_assistant_close", { page_path: pathname });
  };

  const openAssistant = () => {
    setOpen(true);
    trackEvent("lead_assistant_open", {
      page_path: pathname,
      open_method: "manual_bubble",
    });
  };

  return (
    <>
      {open ? (
        <aside
          role="dialog"
          aria-label="Gurugram property assistant"
          className="fixed bottom-[5.75rem] right-3 z-50 w-[calc(100vw-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:bottom-24 md:right-6"
        >
          <div className="bg-primary px-5 py-4 text-primary-foreground">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <UserRound className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">Property Assistant</p>
                  <p className="mt-0.5 text-xs text-primary-foreground/75">Shubh Estate Brokers · Gurugram</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAssistant}
                aria-label="Close property assistant"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-primary-foreground/80 transition hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="p-5">
            <p className="font-display text-xl leading-snug text-foreground">
              How can I help you choose the right property in Gurugram?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Speak with our team now or leave your number and we’ll call you back.
            </p>

            {!showCallback ? (
              <div className="mt-5 grid gap-2.5">
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => trackContact("phone", "lead_assistant")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call Now
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "lead_assistant")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setShowCallback(true);
                    trackEvent("lead_assistant_callback_open", { page_path: pathname });
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition hover:opacity-90"
                >
                  <UserRound className="size-4" aria-hidden="true" />
                  Leave My Number
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">Request a callback</p>
                  <button
                    type="button"
                    onClick={() => setShowCallback(false)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    Back
                  </button>
                </div>
                <EnquiryForm
                  interest="Property assistant callback — Gurugram property"
                  compact
                  quick
                  submitLabel="Call Me Back"
                />
              </div>
            )}

            <p className="mt-4 text-[0.68rem] leading-5 text-muted-foreground">
              No automated sales pressure. Your enquiry goes directly to the Shubh Estate Brokers team.
            </p>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={openAssistant}
          aria-label="Open property assistant"
          className="fixed bottom-[5.75rem] right-3 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 md:bottom-24 md:right-6"
        >
          <MessageCircle className="size-4 text-gold" aria-hidden="true" />
          Ask Property Assistant
        </button>
      )}
    </>
  );
}
