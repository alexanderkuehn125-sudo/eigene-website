import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import portrait from "@/assets/alexander-kuehn.jpg.asset.json";

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
  slug: string;
  to: string;
  kicker: string;
  body: string;
};

const items: readonly Item[] = [
  {
    n: "01",
    label: "Über mich",
    slug: "ueber-mich",
    to: "/be/ueber-mich",
    kicker: "Wer hier arbeitet",
    body: "Ein kurzer Blick auf Werdegang, Haltung und Arbeitsweise. Zwischen konzeptioneller Tiefe und pragmatischem Handwerk — an Projekten interessiert, die Substanz haben.",
  },
  {
    n: "02",
    label: "Skills",
    slug: "skills",
    to: "/be/skills",
    kicker: "Werkzeuge & Handschrift",
    body: "Konzeption, Gestaltung, Umsetzung. Von der ersten Skizze bis zum ausgelieferten Produkt — mit Blick für Typografie, Struktur und Detail. Interfaces, Editorial, Motion, Prototyping.",
  },
  {
    n: "03",
    label: "Referenzen",
    slug: "referenzen",
    to: "/be/referenzen",
    kicker: "Ausgewählte Arbeiten",
    body: "Eine Auswahl realisierter Projekte aus Kultur, Wirtschaft und öffentlichem Raum. Fallstudien mit Kontext, Prozess und Ergebnis — statt bloßer Bilderreihen.",
  },
  {
    n: "04",
    label: "Impressum",
    slug: "impressum",
    to: "/be/impressum",
    kicker: "Rechtliches",
    body: "Anbieterkennzeichnung, verantwortliche Personen, Kontaktdaten und Hinweise nach TMG und DSGVO. Alles Formale — klar und vollständig.",
  },
  {
    n: "05",
    label: "Kontakt",
    slug: "kontakt",
    to: "/be/kontakt",
    kicker: "Sprich mich an",
    body: "Für Anfragen, Kooperationen oder einen ersten unverbindlichen Austausch. Per Mail oder Telefon — Antwort in der Regel innerhalb von 24 Stunden.",
  },
] as const;

function BePage() {
  const [open, setOpen] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlug(null);
    };
    if (openSlug) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [openSlug]);

  const activeItem = items.find((i) => i.slug === openSlug);

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
            className="text-lg uppercase tracking-[0.35em] md:text-2xl"
            style={{ fontWeight: 300 }}
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
                    <a
                      href={`#${it.slug}`}
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        document
                          .getElementById(it.slug)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
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
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {/* Five panels — vertical stack, each adapting to the page height */}
        <section className="mt-20 min-h-[170vh] flex-1 grid grid-cols-1 grid-rows-5 gap-4 md:mt-24 md:gap-5">
          {items.map((it) => (
            <Link
              key={it.label}
              id={it.slug}
              to={it.to}
              className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#2d2a22]/10 bg-[#faf6ed]/95 shadow-[0_1px_1px_-0.5px_rgba(45,42,34,0.05),0_6px_18px_-6px_rgba(45,42,34,0.12),0_20px_40px_-12px_rgba(45,42,34,0.16)] backdrop-blur-[2px] transition-all hover:-translate-y-1 hover:bg-[#fffdf8] hover:shadow-[0_1px_1px_-0.5px_rgba(45,42,34,0.05),0_12px_30px_-8px_rgba(45,42,34,0.18),0_28px_56px_-16px_rgba(45,42,34,0.22)]"
            >
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
              <div
                className="flex cursor-pointer items-center justify-between border-t border-[#2d2a22]/10 px-4 py-2.5 transition-colors hover:bg-[#2d2a22]/[0.04] md:px-5 md:py-3"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenSlug(it.slug);
                }}
              >
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

        {/* Back-to-top */}
        <div className="mt-12 flex justify-center md:mt-16">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Nach oben scrollen"
            className="text-[11px] uppercase tracking-[0.35em] opacity-60 transition-opacity hover:opacity-100"
          >
            nach oben ↑
          </button>
        </div>

        {/* Expanded panel modal */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              background: "rgba(45, 42, 34, 0.45)",
              backdropFilter: "blur(3px)",
            }}
            onClick={() => setOpenSlug(null)}
          >
            <div
              className="relative flex w-full max-w-[90vw] max-h-[90vh] min-h-[70vh] flex-col overflow-y-auto rounded-2xl border border-[#f2ede0]/20 bg-[#3A4A3A] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] md:p-12"
              style={{ color: "#f2ede0" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenSlug(null)}
                aria-label="Schließen"
                className="absolute right-5 top-5 text-[13px] uppercase tracking-[0.35em] opacity-80 transition-opacity hover:opacity-100"
              >
                ×
              </button>
              <h2
                className="mb-6 pr-8 text-4xl leading-tight tracking-tight md:text-5xl"
                style={{ fontWeight: 300 }}
              >
                {activeItem.label}
              </h2>
              <p className="max-w-3xl text-xl leading-relaxed opacity-90 md:text-2xl">
                {activeItem.body}
              </p>

              {activeItem.slug === "ueber-mich" && (
                <figure className="pointer-events-none absolute bottom-6 left-6 w-[38%] max-w-[320px] overflow-hidden rounded-2xl border border-[#f2ede0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:bottom-10 md:left-10">
                  <img
                    src={portrait.url}
                    alt="Alexander Kühn"
                    draggable={false}
                    className="block h-auto w-full object-cover opacity-60"
                    style={{ filter: "contrast(1.15) saturate(0.85)" }}
                  />
                </figure>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
