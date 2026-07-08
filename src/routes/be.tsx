import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/be")({
  head: () => ({
    meta: [
      { title: "Portfolio — Übersicht" },
      {
        name: "description",
        content:
          "Skills, über mich, Referenzen, Impressum, Kontakt — das Portfolio.",
      },
    ],
  }),
  component: BePage,
});

type Item = {
  n: string;
  label: string;
  to: string;
  kicker: string;
  body: string;
};

const items: readonly Item[] = [
  {
    n: "01",
    label: "Skills",
    to: "/be/skills",
    kicker: "Werkzeuge & Handschrift",
    body: "Konzeption, Gestaltung, Umsetzung. Von der ersten Skizze bis zum ausgelieferten Produkt — mit Blick für Typografie, Struktur und Detail. Interfaces, Editorial, Motion, Prototyping.",
  },
  {
    n: "02",
    label: "Über mich",
    to: "/be/ueber-mich",
    kicker: "Wer hier arbeitet",
    body: "Ein kurzer Blick auf Werdegang, Haltung und Arbeitsweise. Zwischen konzeptioneller Tiefe und pragmatischem Handwerk — an Projekten interessiert, die Substanz haben.",
  },
  {
    n: "03",
    label: "Referenzen",
    to: "/be/referenzen",
    kicker: "Ausgewählte Arbeiten",
    body: "Eine Auswahl realisierter Projekte aus Kultur, Wirtschaft und öffentlichem Raum. Fallstudien mit Kontext, Prozess und Ergebnis — statt bloßer Bilderreihen.",
  },
  {
    n: "04",
    label: "Impressum",
    to: "/be/impressum",
    kicker: "Rechtliches",
    body: "Anbieterkennzeichnung, verantwortliche Personen, Kontaktdaten und Hinweise nach TMG und DSGVO. Alles Formale — klar und vollständig.",
  },
  {
    n: "05",
    label: "Kontakt",
    to: "/be/kontakt",
    kicker: "Sprich mich an",
    body: "Für Anfragen, Kooperationen oder einen ersten unverbindlichen Austausch. Per Mail oder Telefon — Antwort in der Regel innerhalb von 24 Stunden.",
  },
] as const;

function BePage() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <main
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #f2ede0 0%, #e6ddc9 45%, #cfc0a3 100%)",
        color: "#2d2a22",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 md:px-12 md:py-16">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← zurück
          </Link>

          <h1
            className="text-base uppercase tracking-[0.4em] md:text-lg"
            style={{ fontWeight: 400 }}
          >
            Portfolio
          </h1>

          {/* Dropdown */}
          <div ref={ref} className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-haspopup="menu"
              aria-label="Menü öffnen"
              className="group flex items-center gap-2.5 border border-[#2d2a22]/25 bg-[#2d2a22]/[0.03] px-3.5 py-2.5 transition-colors hover:bg-[#2d2a22]/[0.06]"
            >
              <span
                aria-hidden
                className="flex items-end gap-[3px]"
              >
                <span className="block h-3 w-[2px] bg-[#2d2a22]" />
                <span className="block h-4 w-[2px] bg-[#2d2a22]" />
                <span className="block h-2.5 w-[2px] bg-[#2d2a22]" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.35em] opacity-80">
                Menü
              </span>
              <span
                aria-hidden
                className={`inline-block text-[10px] transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {open && (
              <ul
                role="menu"
                className="absolute right-0 top-full z-20 mt-2 w-52 divide-y divide-[#2d2a22]/15 border border-[#2d2a22]/25 bg-[#f5efe1] shadow-[0_20px_60px_-20px_rgba(45,42,34,0.35)]"
              >
                {items.map((it) => (
                  <li key={it.label} role="none">
                    <Link
                      to={it.to}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="grid grid-cols-[2rem_1fr] items-baseline gap-3 px-3.5 py-2.5 transition-colors hover:bg-[#2d2a22]/[0.06]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.35em] opacity-50">
                        {it.n}
                      </span>
                      <span
                        className="text-base leading-none tracking-tight md:text-xl"
                        style={{ fontWeight: 300 }}
                      >
                        {it.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {/* Five panels — vertical stack, each adapting to the page height */}
        <section className="mt-10 flex-1 grid grid-cols-1 grid-rows-5 gap-4 md:mt-12 md:gap-5">
          {items.map((it) => (
            <Link
              key={it.label}
              to={it.to}
              className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#2d2a22]/10 bg-[#faf6ed]/95 shadow-[0_4px_24px_-8px_rgba(45,42,34,0.18)] backdrop-blur-[2px] transition-all hover:bg-[#fffdf8] hover:shadow-[0_8px_32px_-10px_rgba(45,42,34,0.25)]"
            >
              {/* Header row */}
              <div className="flex items-baseline justify-between border-b border-[#2d2a22]/10 px-4 py-2.5 md:px-5 md:py-3">
                <span className="text-[10px] uppercase tracking-[0.35em] opacity-60">
                  {it.n}
                </span>
                <span className="text-[10px] uppercase tracking-[0.35em] opacity-60">
                  {it.kicker}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 px-4 py-3 md:px-5 md:py-4">
                <h2
                  className="mb-2 text-xl leading-tight tracking-tight md:text-2xl"
                  style={{ fontWeight: 300 }}
                >
                  {it.label}
                </h2>
                <p className="text-sm leading-relaxed opacity-80">
                  {it.body}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-[#2d2a22]/10 px-4 py-2.5 md:px-5 md:py-3">
                <span className="text-[10px] uppercase tracking-[0.35em] opacity-60">
                  öffnen
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
