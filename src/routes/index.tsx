import { createFileRoute } from "@tanstack/react-router";
import { RoofingExperience } from "../components/RoofingExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JR BIX Roofing | Premium Roofing Services in Clarksville, TN" },
      { name: "description", content: "Premium roof replacement, repair, inspections and storm damage services in Clarksville, TN. Call JR BIX Roofing for a free estimate." },
      { property: "og:title", content: "JR BIX Roofing | Clarksville, TN" },
      { property: "og:description", content: "Precision roofing craftsmanship built to protect your Clarksville home for years to come." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <RoofingExperience />;
}
