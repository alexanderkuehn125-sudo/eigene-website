import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";

export const Route = createFileRoute("/do/referenzen")({
  head: () => ({ meta: [{ title: "Referenzen — Privat" }, { name: "description", content: "Projekte, Partner, Stimmen." }] }),
  component: () => (
    <SubPage
      section={{
        slug: "referenzen",
        eyebrow: "03 · Referenzen",
        title: "Projekte & Stimmen.",
        body: "Eine kuratierte Auswahl an Arbeiten und Partnern — bald mit Bildern, Zitaten und Verweisen.",
      }}
    />
  ),
});
