import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/property/dlf-the-primus-sector-82a-gurgaon")({
  loader: () => {
    throw redirect({
      href: "/projects/dlf-the-primus-sector-82a-gurgaon",
      statusCode: 301,
    });
  },
});
