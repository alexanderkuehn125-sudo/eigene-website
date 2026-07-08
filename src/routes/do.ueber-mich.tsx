import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";

export const Route = createFileRoute("/do/ueber-mich")({
  head: () => ({ meta: [{ title: "Über mich — Privat" }, { name: "description", content: "Herkunft und Haltung." }] }),
  component: () => (
    <SubPage
      section={{
        slug: "ueber-mich",
        eyebrow: "02 · Über mich",
        title: "Ein kurzer Weg.",
        body: "Woher ich komme, was mich antreibt, wie ich denke. Ein paar Sätze — mehr braucht es zum Kennenlernen nicht.",
      }}
    />
  ),
});
