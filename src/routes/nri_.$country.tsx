import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nri_/$country")({
  beforeLoad: () => {
    throw redirect({ href: "/nri-sell-property-gurgaon", statusCode: 301 });
  },
});
