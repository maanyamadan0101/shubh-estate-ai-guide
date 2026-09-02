import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect } from "react";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";

const DIRECT_WHATSAPP = "https://wa.me/919911050561";

function directWhatsAppTarget() {
  if (typeof window === "undefined") return DIRECT_WHATSAPP;
  const text = new URLSearchParams(window.location.search).get("text");
  return text ? `${DIRECT_WHATSAPP}?text=${encodeURIComponent(text)}` : DIRECT_WHATSAPP;
}

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "Open WhatsApp | Shubh Estate Brokers" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
      { name: "googlebot", content: "noindex,nofollow,noarchive" },
    ],
  }),
  component: WhatsAppBridge,
});

function WhatsAppBridge() {
  useEffect(() => {
    const target = directWhatsAppTarget();
    trackContact("whatsapp", "whatsapp_bridge");
    window.location.replace(target);
  }, []);

  const continueToWhatsApp = () => {
    trackContact("whatsapp", "whatsapp_bridge_manual");
    window.location.assign(directWhatsAppTarget());
  };

  return (
    <section className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-7 text-center shadow-sm md:p-10">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-gold">
          <MessageCircle className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-3xl">Opening WhatsApp</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          You are being connected to Shubh Estate Brokers on WhatsApp. If WhatsApp does not open automatically, use the button below or call our Gurugram office.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={continueToWhatsApp}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4 text-gold" aria-hidden="true" />
            Continue to WhatsApp
          </button>
          <a
            href={CONTACT.phoneHref}
            onClick={() => trackContact("phone", "whatsapp_bridge")}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
          >
            <Phone className="size-4 text-gold" aria-hidden="true" />
            Call {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
