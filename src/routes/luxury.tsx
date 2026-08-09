import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/luxury")({
  beforeLoad: () => {
    throw redirect({ to: "/properties", replace: true, statusCode: 301 });
  },
});
