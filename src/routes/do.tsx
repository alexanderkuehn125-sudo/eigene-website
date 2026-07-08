import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/do")({
  head: () => ({
    meta: [
      { title: "Privat — Übersicht" },
      {
        name: "description",
        content:
          "Skills, über mich, Referenzen, Impressum, Kontakt — die private Seite.",
      },
    ],
  }),
  component: DoPage,
});

const items = [
  {
    n: "01",
    label: "Skills",
    hint: "Was ich kann — Werkzeuge, Sprachen, Handwerk.",
    to: "/do/skills",
  },
  {
    n: "02",
    label: "Über mich",
    hint: "Ein kurzer Weg durch Herkunft und Haltung.",
    to: "/do/ueber-mich",
  },
  {
    n: "03",
    label: "Referenzen",
    hint: "Projekte, Partner, Stimmen.",
    to: "/do/referenzen",
  },
  {
    n: "04",
    label: "Impressum",
    hint: "Rechtliches, klar und knapp.",
    to: "/do/impressum",
  },
  {
    n: "05",
    label: "Kontakt",
    hint: "Direkter Draht — Mail, Telefon, Post.",
    to: "/do/kontakt",
  },
] as const;

function DoPage() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #efe9de 0%, #e6ddc9 45%, #d9cdb2 100%)",
        color: "#2a2620",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 md:px-12 md:py-16">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← zurück
          </Link>
          <span
            className="text-[11px] uppercase tracking-[0.4em] opacity-60"
          >
            Privat
          </span>
        </header>

        {/* Title */}
        <section className="mt-16 md:mt-24">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] opacity-60">
            Übersicht
          </p>
          <h1
            className="text-5xl leading-[0.95] tracking-tight md:text-7xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Was dich hier erwartet.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            Fünf Räume — ruhig, aufgeräumt, in natürlichen Tönen. Wähle einen
            Einstieg.
          </p>
        </section>

        {/* Menu */}
        <nav className="mt-14 md:mt-20">
          <ul className="divide-y divide-[#2a2620]/15 border-y border-[#2a2620]/15">
            {items.map((it) => (
              <li key={it.label}>
                <Link
                  to={it.to}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-6 py-6 transition-colors hover:bg-[#2a2620]/[0.04] md:grid-cols-[4rem_1fr_auto] md:py-8"
                >
                  <span className="text-[11px] uppercase tracking-[0.35em] opacity-50">
                    {it.n}
                  </span>
                  <span
                    className="text-3xl leading-none tracking-tight md:text-5xl"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                    }}
                  >
                    {it.label}
                  </span>
                  <span className="hidden max-w-md text-right text-sm opacity-60 md:block">
                    {it.hint}
                  </span>
                  <span className="col-span-3 -mt-2 text-sm opacity-60 md:hidden">
                    {it.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="mt-auto pt-16 text-[11px] uppercase tracking-[0.35em] opacity-50">
          Manhattan · heute
        </footer>
      </div>
    </main>
  );
}
