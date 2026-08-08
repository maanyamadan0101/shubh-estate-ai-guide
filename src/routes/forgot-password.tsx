import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset Password | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSent(true);
    toast.success("Password reset link sent.");
  }

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl">Reset password</h1>

        {sent ? (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              Check your email and click the password reset link.
            </p>

            <Link
              to="/auth"
              className="mt-6 inline-block text-sm underline underline-offset-4"
            >
              Back to sign in
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email"
              required
            />

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={busy}
            >
              {busy ? "Sending…" : "Send reset link"}
            </Button>

            <Link
              to="/auth"
              className="block text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </section>
  );
}
