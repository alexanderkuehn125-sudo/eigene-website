import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImpressumContent } from "@/components/ImpressumContent";


export const Route = createFileRoute("/do")({
  head: () => ({
    meta: [
      { title: "Privat — Fotografie" },
      {
        name: "description",
        content:
          "Eine persönliche Auswahl an Fotografien — Momente, Orte, Licht.",
      },
    ],
  }),
  component: DoPage,
});

type Photo = {
  id: string;
  src: string;
  title: string;
  caption: string;
  span?: "tall" | "wide" | "square";
};

// Placeholders — bitte durch eigene Fotos ersetzen.
const photos: readonly Photo[] = [
  {
    id: "p01",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    title: "Bergstille",
    caption: "Frühes Licht, klare Luft — irgendwo in den Alpen.",
    span: "tall",
  },
  {
    id: "p02",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    title: "Küstenlinie",
    caption: "Ein langer Nachmittag am Meer.",
    span: "wide",
  },
  {
    id: "p03",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80",
    title: "Nebelwald",
    caption: "Zwischen Bäumen, kurz nach Sonnenaufgang.",
    span: "square",
  },
  {
    id: "p04",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
    title: "Reflexion",
    caption: "Ein ruhiger See als Spiegel.",
    span: "square",
  },
  {
    id: "p05",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    title: "Weite",
    caption: "Wo Landschaft in Himmel übergeht.",
    span: "wide",
  },
  {
    id: "p06",
    src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1400&q=80",
    title: "Stadtnacht",
    caption: "Späte Stunde, wache Straßen.",
    span: "tall",
  },
] as const;

function DoPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const active = photos.find((p) => p.id === openId);

  useEffect(() => {
    if (!impressumOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImpressumOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [impressumOpen]);


  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = photos.findIndex((p) => p.id === openId);
        const next =
          e.key === "ArrowRight"
            ? (idx + 1) % photos.length
            : (idx - 1 + photos.length) % photos.length;
        setOpenId(photos[next].id);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId]);

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
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 md:px-12 md:py-16">
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
            Privat
          </h1>
          <span className="text-[11px] uppercase tracking-[0.35em] opacity-60">
            Fotografie
          </span>
        </header>

        <section className="mt-16 md:mt-24">
          <p
            className="text-lg uppercase tracking-[0.35em] opacity-60 md:text-2xl"
            style={{ fontWeight: 300 }}
          >
            Ausstellung
          </p>
        </section>

        {/* Grid */}
        <section className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-5">
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpenId(p.id)}
              className={`group relative block overflow-hidden rounded-2xl border border-[#2d2a22]/10 bg-[#faf6ed]/95 text-left shadow-[0_1px_1px_-0.5px_rgba(45,42,34,0.05),0_6px_18px_-6px_rgba(45,42,34,0.12),0_20px_40px_-12px_rgba(45,42,34,0.16)] transition-all hover:-translate-y-1 hover:shadow-[0_1px_1px_-0.5px_rgba(45,42,34,0.05),0_12px_30px_-8px_rgba(45,42,34,0.18),0_28px_56px_-16px_rgba(45,42,34,0.22)] focus:outline-none focus:ring-2 focus:ring-[#2d2a22]/30 ${
                p.span === "tall"
                  ? "sm:row-span-2"
                  : p.span === "wide"
                    ? "sm:col-span-2"
                    : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  p.span === "tall"
                    ? "aspect-[3/4] sm:aspect-[3/5]"
                    : p.span === "wide"
                      ? "aspect-[16/9]"
                      : "aspect-square"
                }`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  draggable={false}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/35 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm md:bottom-3 md:right-3 md:text-[10px]"
                >
                  © Alexander Kühn
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#2d2a22]/10 px-4 py-2.5 md:px-5 md:py-3">
                <span
                  className="text-[11px] uppercase tracking-[0.35em] opacity-60"
                  style={{ fontWeight: 300 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="text-[11px] uppercase tracking-[0.35em] opacity-50 transition-transform group-hover:translate-x-1"
                >
                  ansehen →
                </span>
              </div>
            </button>
          ))}
        </section>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[11px] uppercase tracking-[0.35em] opacity-60 transition-opacity hover:opacity-100"
          >
            nach oben ↑
          </button>
        </div>

        {/* Lightbox */}
        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{
              background: "rgba(45, 42, 34, 0.55)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setOpenId(null)}
          >
            <div
              className="relative flex w-full max-w-6xl max-h-[92vh] flex-col overflow-hidden rounded-2xl border border-[#f2ede0]/20 bg-[#faf6ed] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
              style={{ color: "#2d2a22" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Schließen"
                className="absolute right-4 top-3 z-10 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100"
              >
                ×
              </button>
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#2d2a22]">
                <img
                  src={active.src}
                  alt={active.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                  draggable={false}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm md:text-[11px]"
                >
                  © Alexander Kühn
                </span>
              </div>
              <div className="flex items-center justify-between gap-6 border-t border-[#2d2a22]/10 px-5 py-4 md:px-8 md:py-5">
                <div>
                  <h3
                    className="text-xl tracking-tight md:text-2xl"
                    style={{ fontWeight: 300 }}
                  >
                    {active.title}
                  </h3>
                  <p className="mt-1 text-sm opacity-75 md:text-base">
                    {active.caption}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] opacity-60">
                  <button
                    type="button"
                    onClick={() => {
                      const i = photos.findIndex((p) => p.id === active.id);
                      setOpenId(photos[(i - 1 + photos.length) % photos.length].id);
                    }}
                    className="hover:opacity-100"
                  >
                    ← vor
                  </button>
                  <span className="opacity-50">
                    {photos.findIndex((p) => p.id === active.id) + 1} / {photos.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const i = photos.findIndex((p) => p.id === active.id);
                      setOpenId(photos[(i + 1) % photos.length].id);
                    }}
                    className="hover:opacity-100"
                  >
                    zurück →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
