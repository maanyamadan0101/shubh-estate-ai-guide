import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  beforeLoad: () => {
    throw redirect({ href: "/projects-in-gurgaon", statusCode: 301 });
  },
});
