import { Link } from "@tanstack/react-router";

type Section = {
  slug: "skills" | "ueber-mich" | "referenzen" | "impressum" | "kontakt";
  eyebrow: string;
  title: string;
  body: string;
};

export function SubPage({ section }: { section: Section }) {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #f2ede0 0%, #e6ddc9 45%, #cfc0a3 100%)",
        color: "#2d2a22",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 md:px-12 md:py-16">
        <header className="flex items-center justify-between">
          <Link
            to="/be"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← Übersicht
          </Link>
          <span className="text-[11px] uppercase tracking-[0.4em] opacity-60">
            Portfolio
          </span>
        </header>

        <section className="mt-16 md:mt-24">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] opacity-60">
            {section.eyebrow}
          </p>
          <h1
            className="text-5xl leading-[0.95] tracking-tight md:text-7xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            {section.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            {section.body}
          </p>
        </section>

        <footer className="mt-auto pt-16 text-[11px] uppercase tracking-[0.35em] opacity-50">
          In Arbeit
        </footer>
      </div>
    </main>
  );
}
