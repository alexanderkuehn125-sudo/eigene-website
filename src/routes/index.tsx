import { createFileRoute } from "@tanstack/react-router";
import { LandingSlider } from "@/components/LandingSlider";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <LandingSlider />;
}
