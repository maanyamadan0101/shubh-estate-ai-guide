import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import heroImage from "@/assets/hero-gurugram.jpg";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { CONTACT } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const GA_MEASUREMENT_ID = "G-8EWLZD8V5H";
const SITE_ORIGIN = "https://www.shubhestatebroker.in";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_ORIGIN}/#real-estate-agent`,
  name: "Shubh Estate Brokers",
  description:
    "Founder-led Gurugram real estate advisory with former senior-level banking exposure, focused on title and documentation review, mortgage structuring, valuation, investment safety, integrity and fair, transparent transactions.",
  slogan: "Fair & Transparent Real Estate Deals at the Best Price",
  telephone: [CONTACT.phone, CONTACT.alternatePhone],
  email: CONTACT.email,
  url: SITE_ORIGIN,
  sameAs: [CONTACT.googleBusinessProfile, CONTACT.instagram, CONTACT.youtube],
  hasMap: CONTACT.googleBusinessProfile,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT.phone,
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  founder: {
    "@type": "Person",
    name: "Arun Madan",
    jobTitle: "Founder & Promoter",
    description:
      "Former banking professional with senior-level exposure across mortgage, credit, property valuation, documentation and title assessment.",
    knowsAbout: [
      "Real estate advisory",
      "Property title assessment",
      "Mortgage lending",
      "Property valuation",
      "Investment risk assessment",
      "Real estate due diligence",
    ],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "15th Floor, Ocus Quantum Mall, Sector 51",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122003",
    addressCountry: "IN",
  },
  areaServed: "Gurugram, Haryana, India",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "19:30",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shubh Estate Brokers",
  alternateName: "Shubh Estate",
  url: SITE_ORIGIN,
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Property in Gurgaon | Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "Buy, sell or invest in Gurgaon property with founder-led advice backed by banking, title assessment, valuation, mortgage and due-diligence experience.",
      },
      { name: "author", content: "Shubh Estate Brokers" },
      { property: "og:title", content: "Shubh Estate Brokers | Property Consultant in Gurgaon" },
      {
        property: "og:description",
        content:
          "Fair and transparent Gurugram real estate advice backed by former banking, mortgage, valuation and title-assessment experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_ORIGIN },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}` },
      {
        children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
      },
      { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="pb-0">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
    </QueryClientProvider>
  );
}
