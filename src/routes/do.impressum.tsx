import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";

export const Route = createFileRoute("/do/impressum")({
  head: () => ({ meta: [{ title: "Impressum — Privat" }, { name: "description", content: "Rechtliche Angaben." }] }),
  component: () => (
    <SubPage
      section={{
        slug: "impressum",
        eyebrow: "04 · Impressum",
        title: "Rechtliches, klar und knapp.",
        body: "Hier folgen die Pflichtangaben nach § 5 TMG sowie Kontaktdaten und Verantwortlichkeiten.",
      }}
    />
  ),
});
