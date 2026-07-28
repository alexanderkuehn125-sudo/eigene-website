import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";

export const Route = createFileRoute("/be/referenzen")({
  head: () => ({
    meta: [
      { title: "Exemplarische Projekte — Portfolio" },
      { name: "description", content: "Projekte, Partner, Stimmen." },
    ],
  }),
  component: () => (
    <SubPage
      section={{
        slug: "referenzen",
        eyebrow: "03 · Exemplarische Projekte",
        title: "Projekte & Stimmen.",
        body: "Eine kuratierte Auswahl an Arbeiten und Partnern — bald mit Bildern, Zitaten und Verweisen.",
      }}
    />
  ),
});
