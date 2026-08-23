import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/dlf-the-skycourt-sector-86")({
  loader: () => {
    throw redirect({ href: "/dlf-skycourt-sector-86-gurgaon", statusCode: 301 });
  },
});
