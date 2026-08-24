import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  ClipboardList,
  ExternalLink,
  FileSpreadsheet,
  Globe2,
  Images,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Settings2,
  UserRound,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function AdminShell({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border bg-card lg:border-b-0 lg:border-r">
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Link to="/admin" className="min-w-0">
              <p className="truncate font-display text-lg">Shubh Estate Brokers</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Business Dashboard</p>
            </Link>
          </div>

          <nav className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-visible" aria-label="Admin navigation">
            <AdminNavLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
            <AdminNavLink href="/admin#property-catalogue" icon={Building2} label="Property Catalogue" />
            <AdminNavLink href="/admin/new" icon={Plus} label="Add Property" />
            <AdminNavLink href="/admin/import" icon={FileSpreadsheet} label="Import Properties" />

            <p className="hidden px-3 pb-1 pt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground lg:block">Manage Business</p>
            <AdminNavLink href="/admin/enquiries" icon={Users} label="Enquiries / Leads" />
            <AdminNavLink href="/admin/seller-submissions" icon={ClipboardList} label="Private Seller Submissions" />
            <AdminNavLink href="/admin/media" icon={Images} label="Photos & Videos" />
            <AdminNavLink href="/admin/social" icon={Youtube} label="YouTube & Social" />
            <AdminNavLink href="/admin/profile" icon={UserRound} label="Business Profile" />

            <p className="hidden px-3 pb-1 pt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground lg:block">Growth & Settings</p>
            <AdminNavLink href="/admin/seo" icon={BarChart3} label="SEO / Google" />
            <AdminNavLink href="/admin/settings" icon={Settings} label="Website Settings" />
            <AdminNavLink href="/flats-for-sale-in-gurgaon" icon={Globe2} label="View Website" external />
          </nav>

          <div className="hidden border-t border-border p-3 lg:block">
            <div className="rounded-xl bg-muted/60 p-4">
              <div className="flex items-center gap-2">
                <Settings2 className="size-4 text-gold" aria-hidden="true" />
                <p className="text-sm font-medium">Manage Content</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Listings, leads, media, social links and website settings in one place.
              </p>
            </div>
            <Button variant="ghost" className="mt-2 w-full justify-start" onClick={() => void signOut()}>
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <div>
                <h1 className="font-display text-2xl">{title}</h1>
                {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
              </div>
              <div className="flex items-center gap-2">
                {actions}
                <Button asChild variant="gold" className="hidden sm:inline-flex">
                  <Link to="/admin/new">
                    <Plus className="size-4" aria-hidden="true" />
                    Add Property
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="lg:hidden" onClick={() => void signOut()} aria-label="Sign out">
                  <LogOut className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function AdminNavLink({
  href,
  icon: Icon,
  label,
  external = false,
}: {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:w-full"
    >
      <Icon className="size-4 text-gold" aria-hidden="true" />
      <span>{label}</span>
      {external ? <ExternalLink className="ml-auto size-3.5" aria-hidden="true" /> : null}
    </a>
  );
}
