import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";
import portrait from "@/assets/alexander-kuehn.jpg.asset.json";

export const Route = createFileRoute("/be/ueber-mich")({
  head: () => ({
    meta: [
      { title: "Über mich — Portfolio" },
      { name: "description", content: "Herkunft und Haltung." },
    ],
  }),
  component: () => (
    <SubPage
      section={{
        slug: "ueber-mich",
        eyebrow: "02 · Über mich",
        title: "Ein kurzer Weg.",
        body: "Woher ich komme, was mich antreibt, wie ich denke. Ein paar Sätze — mehr braucht es zum Kennenlernen nicht.",
        image: {
          src: portrait.url,
          alt: "Portrait Alexander Kühn",
          caption: "Alexander Kühn",
        },
      }}
    />
  ),
});
