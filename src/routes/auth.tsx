import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Team Sign In | Shubh Estate Brokers" },
      {
        name: "description",
        content: "Private sign-in for the Shubh Estate Brokers property team.",
      },
      { name: "robots", content: "noindex, nofollow" },
      {
        property: "og:title",
        content: "Team Sign In | Shubh Estate Brokers",
      },
      {
        property: "og:description",
        content: "Private sign-in for the Shubh Estate Brokers property team.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      void navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/admin",
        },
      });

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.session) {
        void navigate({ to: "/admin" });
      } else {
        toast.success("Check your email to confirm your account.");
      }
    }
  }

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl">
          {mode === "signin" ? "Team sign in" : "Create team account"}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Property publishing dashboard for Shubh Estate Brokers.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            required
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            minLength={8}
            required
          />

          {mode === "signin" && (
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            className="w-full"
            disabled={busy}
          >
            {busy
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline"
          onClick={() =>
            setMode(mode === "signin" ? "signup" : "signin")
          }
        >
          {mode === "signin"
            ? "Need an account? Create one"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}
