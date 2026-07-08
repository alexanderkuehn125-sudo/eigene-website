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

const items = [
  { n: "01", label: "Skills", to: "/be/skills" },
  { n: "02", label: "Über mich", to: "/be/ueber-mich" },
  { n: "03", label: "Referenzen", to: "/be/referenzen" },
  { n: "04", label: "Impressum", to: "/be/impressum" },
  { n: "05", label: "Kontakt", to: "/be/kontakt" },
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
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 md:px-12 md:py-16">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← zurück
          </Link>
          <span className="text-[11px] uppercase tracking-[0.4em] opacity-60">
            Portfolio
          </span>
        </header>

        <section className="mt-16 md:mt-24">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] opacity-60">
            Übersicht
          </p>
          <h1
            className="text-5xl leading-[0.95] tracking-tight md:text-7xl"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Was dich hier erwartet.
          </h1>
        </section>

        {/* Dropdown */}
        <div ref={ref} className="relative mt-14 md:mt-20 max-w-md">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex w-full items-center justify-between border border-[#2d2a22]/25 bg-[#2d2a22]/[0.03] px-5 py-4 text-left transition-colors hover:bg-[#2d2a22]/[0.06]"
          >
            <span className="text-[11px] uppercase tracking-[0.35em] opacity-70">
              Menü
            </span>
            <span
              className="text-2xl leading-none md:text-3xl"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              wählen
            </span>
            <span
              aria-hidden
              className={`ml-4 inline-block text-xs transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {open && (
            <ul
              role="menu"
              className="absolute left-0 right-0 z-20 mt-2 divide-y divide-[#2d2a22]/15 border border-[#2d2a22]/25 bg-[#f5efe1] shadow-[0_20px_60px_-20px_rgba(45,42,34,0.35)]"
            >
              {items.map((it) => (
                <li key={it.label} role="none">
                  <Link
                    to={it.to}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="grid grid-cols-[3rem_1fr] items-baseline gap-4 px-5 py-4 transition-colors hover:bg-[#2d2a22]/[0.06]"
                  >
                    <span className="text-[11px] uppercase tracking-[0.35em] opacity-50">
                      {it.n}
                    </span>
                    <span
                      className="text-2xl leading-none tracking-tight md:text-3xl"
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontStyle: "italic",
                        fontWeight: 300,
                      }}
                    >
                      {it.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
