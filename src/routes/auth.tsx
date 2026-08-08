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

function withTimeout<T>(promise: Promise<T>, ms = 12000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      window.setTimeout(
        () => reject(new Error("Login request timed out. Please try once more.")),
        ms,
      ),
    ),
  ]);
}

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    try {
      if (mode === "signin") {
        const { error } = await withTimeout(
          supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          }),
        );

        if (error) {
          toast.error(error.message);
          return;
        }

        void navigate({ to: "/admin" });
        return;
      }

      const { data, error } = await withTimeout(
        supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin + "/admin",
          },
        }),
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.session) {
        void navigate({ to: "/admin" });
      } else {
        toast.success("Check your email to confirm your account.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed unexpectedly.";
      console.error("Authentication error:", error);
      toast.error(message);
    } finally {
      setBusy(false);
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
            autoComplete="email"
            required
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
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
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          disabled={busy}
        >
          {mode === "signin"
            ? "Need an account? Create one"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}
