import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";

export const Route = createFileRoute("/be/skills")({
  head: () => ({ meta: [{ title: "Skills — Portfolio" }, { name: "description", content: "Werkzeuge, Sprachen, Handwerk." }] }),
  component: () => (
    <SubPage
      section={{
        slug: "skills",
        eyebrow: "01 · Skills",
        title: "Werkzeuge, mit denen ich arbeite.",
        body: "Hier entsteht eine ruhige Liste dessen, was ich kann — von Sprachen über Werkzeuge bis Handwerk.",
      }}
    />
  ),
});
