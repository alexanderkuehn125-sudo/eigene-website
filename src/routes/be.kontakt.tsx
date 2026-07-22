import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";

export const Route = createFileRoute("/be/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Portfolio" },
      { name: "description", content: "Mail, Telefon, Post." },
    ],
  }),
  component: () => (
    <SubPage
      section={{
        slug: "kontakt",
        eyebrow: "05 · Kontakt",
        title: "Direkter Draht.",
        body: "Mail, Telefon, Post — hier findest du bald alle Wege, mich zu erreichen.",
      }}
    />
  ),
});
