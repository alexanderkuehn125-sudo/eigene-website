import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImpressumContent } from "@/components/ImpressumContent";
import { CoffeeToProjectConverter } from "@/components/CoffeeToProjectConverter";
// Neues lokales Portrait
import portrait from "@/assets/Portrait.jpg";

export const Route = createFileRoute("/be")({
  head: () => ({
    meta: [
      { title: "Portfolio — Alexander Kühn | Projektmanagement & Event" },
      {
        name: "description",
        content:
          "20 Jahre Erfahrung im professionellen Projektmanagement & Eventsektor. Dipl. Eventmanager (IST), Berater digitales Vertriebsmanagement (IHK) und KI Berater.",
      },
      {
        tagName: "style",
        content: `
          @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');
        `,
      },
    ],
  }),
  component: BePage,
});

type Item = {
  n: string;
  label: string;
  slug: string;
  body: React.ReactNode;
};

// Filmstrip Karussell Komponente
function FadingFilmstrip() {
  const [activeIndex, setActiveIndex] = useState(4); // Startet beim 5. Bild (Mitte)

  const images = [
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800", // Stage lights
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800", // Empty chairs
    "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=800", // Stage setup
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800", // Abstract crowd
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800", // Cool Event/Party
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", // Conference
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800", // DJ/Vinyl
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", // Event detail
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", // Event lights
  ];

  // Automatischer Reset zur Mitte (Index 4) nach 5 Sekunden, wenn Randbilder (Index 0 oder 8) erreicht sind
  useEffect(() => {
    if (activeIndex === 0 || activeIndex === images.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex(4);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, images.length]);

  return (
    <div className="relative w-full h-[30vh] md:h-[40vh] mt-16 mb-12 flex items-center justify-center overflow-hidden">
      {images.map((img, i) => {
        const offset = i - activeIndex;
        return (
          <button
            key={i}
            type="button"
            className="absolute w-[65%] md:w-[50%] lg:w-[40%] h-full transition-all duration-[1.6s] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-none cursor-trigger-zoom"
            style={{
              transform: `translateX(${offset * 80}%) scale(${offset === 0 ? 1 : 0.85})`,
              opacity: offset === 0 ? 1 : Math.abs(offset) <= 2 ? 0.4 : 0,
              zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
              pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
            }}
            onClick={() => {
              if (offset !== 0) setActiveIndex(i);
            }}
          >
            <img
              src={img}
              alt={`Platzhalter ${i + 1}`}
              className="w-full h-full object-cover rounded-md shadow-2xl"
              style={{ filter: offset === 0 ? "grayscale(30%)" : "grayscale(100%)" }}
              draggable={false}
            />
            {offset === 0 && (
              <div className="absolute bottom-4 right-6 text-white text-[10px] tracking-[0.3em] font-medium opacity-90 mix-blend-difference pointer-events-none uppercase">
                {String(i + 1).padStart(2, "0")}/09
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Nur noch die Kern-Inhalte für den großen Monolith-Scroll
const items: readonly Item[] = [
  {
    n: "01",
    label: "Über mich",
    slug: "ueber-mich",
    body: (
      <>
        <p className="mb-6">
          Mit über 20 Jahren Erfahrung im professionellen Projektmanagement – stark verwurzelt in
          der hochkomplexen Eventbranche – kenne ich die physische und planerische Realität großer
          Vorhaben. Ob auf Agentur- oder Unternehmensseite, die Prinzipien erfolgreicher Steuerung
          bleiben universell.
        </p>
        <p>
          Was mich antreibt, ist die Verbindung dieser pragmatischen Projekterfahrung mit den
          massiven Möglichkeiten modernster digitaler Werkzeuge. Ich nutze Künstliche Intelligenz
          und digitale Vertriebsstrategien nicht als Selbstzweck, sondern als Hebel, um Prozesse
          effizienter, planbarer und zukunftsfähig zu machen.
        </p>
        <p className="mt-6 opacity-80">
          Mein Ansatz ist es, nicht nur zu verwalten, sondern aktiv zu gestalten. Dabei hilft mir
          ein gewachsenes Netzwerk aus Experten und mein unbedingter Anspruch an Qualität und
          Präzision. Jedes Projekt ist eine neue Herausforderung, bei der ich strategische Weitsicht
          mit operativer Exzellenz verbinde.
        </p>
      </>
    ),
  },
  {
    n: "02",
    label: "Skills",
    slug: "skills",
    body: (
      <>
        <p className="mb-6">
          Mein Werkzeugkasten ist hybrid: Auf der einen Seite klassische Projektsteuerung,
          technische Planung, Budgetierung und Teamführung. Auf der anderen Seite KI-Consulting,
          Prozessautomatisierung und digitales Vertriebsmanagement (IHK).
        </p>
        <p>
          Ich verstehe mich als Übersetzer zwischen der analogen Umsetzung und den digitalen
          Systemen im Hintergrund – immer mit dem Ziel, reibungslose Abläufe zu garantieren,
          branchenübergreifend und fokussiert.
        </p>
        <p className="mt-6 opacity-80">
          Zu meinen Kernkompetenzen zählen die souveräne Steuerung komplexer Budgets, die nahtlose
          Integration digitaler Schnittstellen und ein empathisches, aber zielführendes
          Stakeholdermanagement. Ich arbeite datengetrieben, behalte aber immer den menschlichen
          Faktor und die User Experience im Fokus.
        </p>
      </>
    ),
  },
  {
    n: "03",
    label: "Referenzen",
    slug: "referenzen",
    body: (
      <>
        <p className="mb-6">
          Eine fundierte Historie: Von der Konzeption bis zur technischen Umsetzung für namhafte
          Kunden und Unternehmen, historisch gewachsen im Eventsektor.
        </p>
        <p>
          Inzwischen erweitere ich dieses Portfolio zunehmend um branchenübergreifende
          Beratungsmandate. Hierbei begleite ich Organisationen darin, ihre Planungs- und
          Vertriebsprozesse durch digitale Systeme und KI-gestützte Werkzeuge zu modernisieren.
        </p>
        <FadingFilmstrip />
      </>
    ),
  },
] as const;

function BePage() {
  const [modalOpen, setModalOpen] = useState<"kontakt" | "impressum" | "menu" | null>(null);
  const [portraitOpen, setPortraitOpen] = useState(false);

  // Zwingt den Browser, beim Neuladen wieder ganz oben zu starten
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Escape Key handling for Modals
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  return (
    <main
      className="min-h-screen w-full relative bg-[#050504] text-[#EFECE4] overflow-clip [&_a]:cursor-none [&_button]:cursor-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Film-Grain / Papier-Rauschen Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Holographic Oil Slick / Diversity Gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18] blur-[80px] md:blur-[120px]"
        style={{
          background:
            "linear-gradient(45deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D)",
          backgroundSize: "300% 300%",
          animation: "rainbow-pan 12s ease-in-out infinite",
        }}
        aria-hidden
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes rainbow-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `,
        }}
      />

      {/* Global Ghost Portrait Background */}
      {createPortal(
        <figure
          className="fixed bottom-0 -right-[5vw] md:right-0 z-0 h-[60vh] md:h-[85vh] w-auto opacity-[0.13] hover:opacity-[0.20] transition-opacity duration-1000 pointer-events-auto"
          onClick={() => setPortraitOpen(true)}
        >
          <img
            src={portrait}
            alt="Alexander Kühn"
            draggable={false}
            className="h-full w-auto object-contain object-bottom mix-blend-screen"
            style={{
              filter: "grayscale(100%) contrast(1.3) brightness(1.2)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 100%, black 20%, transparent 70%)",
              maskImage: "radial-gradient(ellipse at 50% 100%, black 20%, transparent 70%)",
            }}
          />
        </figure>,
        document.body
      )}

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-12 px-6 pt-12 pb-10 md:grid-cols-12 md:gap-20 md:px-12 md:pt-24 md:pb-16 page-transition-enter">
        {/* Linke Spalte: Sticky Navigation & Intro */}
        <aside className="col-span-1 md:col-span-4 lg:col-span-4">
          <div className="sticky top-12 md:top-24 flex flex-col items-start">
            <Link
              to="/"
              className="mb-16 text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
            >
              ← Start
            </Link>

            <h1
              className="text-3xl lg:text-4xl leading-[1.1] tracking-wide mb-8"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
            >
              Alexander Kühn
            </h1>

            <div className="flex items-start gap-4 md:gap-6 mb-20">
              <div className="flex flex-col gap-4">
                <p className="text-xs uppercase tracking-[0.2em] opacity-80 leading-loose">
                  Projektmanagement.
                  <br />
                  Event.
                  <br />
                  KI & Digital.
                </p>
                <div className="text-[9px] uppercase tracking-[0.15em] opacity-50 leading-relaxed max-w-[150px]">
                  dipl. Eventmanager (IST)
                  <br />
                  Berater digitales Vertriebsmanagement (IHK)
                  <br />
                  KI Berater
                </div>
              </div>
            </div>

            <div className="mb-16">
              <CoffeeToProjectConverter />
            </div>

            <nav className="flex flex-col gap-6">
              {items.map((it) => (
                <a
                  key={it.slug}
                  href={`#${it.slug}`}
                  className="group flex items-baseline gap-4 text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(it.slug)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-50 transition-opacity group-hover:opacity-100">
                    {it.n}
                  </span>
                  <span
                    className="text-xl tracking-wide opacity-80 transition-opacity group-hover:opacity-100"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                  >
                    {it.label}
                  </span>
                </a>
              ))}

              <button
                type="button"
                className="group flex items-baseline gap-4 text-left"
                onClick={() => setModalOpen("kontakt")}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] opacity-50 transition-opacity group-hover:opacity-100">
                  04
                </span>
                <span
                  className="text-xl tracking-wide opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                >
                  Kontakt
                </span>
              </button>

              <button
                type="button"
                className="group flex items-baseline gap-4 text-left"
                onClick={() => setModalOpen("impressum")}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] opacity-50 transition-opacity group-hover:opacity-100">
                  05
                </span>
                <span
                  className="text-xl tracking-wide opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                >
                  Impressum
                </span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Rechte Spalte: Content (Scrollable) */}
        <section className="col-span-1 md:col-span-8 lg:col-span-7 md:col-start-6 pb-0 md:pt-32">
          {items.map((it, index) => (
            <article
              key={it.slug}
              id={it.slug}
              className={`relative pt-12 md:pt-24 ${index !== items.length - 1 ? "border-b border-white/15 pb-24 md:pb-32" : ""}`}
            >
              <div className="mb-12 flex items-baseline gap-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">{it.n}</span>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl tracking-wide"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                >
                  {it.label}
                </h2>
              </div>

              <div className="relative max-w-2xl">
                <div className="text-base md:text-lg lg:text-xl leading-relaxed opacity-80 font-light relative z-10">
                  {it.body}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Global Footer Area (Zentriert über den gesamten Bildschirm) */}
        <div className="col-span-1 md:col-span-12 w-full -mt-12 md:-mt-20">
          <div className="mt-16 flex flex-col items-center gap-6 md:mt-24">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
            >
              nach oben ↑
            </button>
          </div>

          <footer className="mt-16 flex flex-col items-center gap-4 text-[11px] uppercase tracking-[0.35em] opacity-70 md:mt-24">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setModalOpen("kontakt")}
                className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
              >
                Kontakt
              </button>
              <button
                type="button"
                onClick={() => setModalOpen("impressum")}
                className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
              >
                Impressum
              </button>
            </div>
            <span className="opacity-70">
              © {new Date().getFullYear()} Alexander Kühn · Alle Rechte vorbehalten
            </span>
          </footer>
        </div>
      </div>

      {/* Mobile Floating Menu Button (nur sichtbar auf kleinen Bildschirmen) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setModalOpen("menu")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1918] border border-white/20 text-[#EFECE4] shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform hover:scale-105 focus:outline-none"
        >
          <span className="text-[8px] uppercase tracking-[0.25em] font-medium mt-[1px]">Menü</span>
        </button>
      </div>

      {/* Modal Overlay (Analog zur Ausstellung) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-none cursor-trigger-close"
          style={{
            background: "rgba(45, 42, 34, 0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setModalOpen(null)}
        >
          <div
            className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#1A1918] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(null)}
              aria-label="Schließen"
              className="absolute right-5 top-4 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100"
            >
              ×
            </button>

            <h2
              className="mb-8 pr-8 text-4xl leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
            >
              {modalOpen === "kontakt"
                ? "Kontakt"
                : modalOpen === "impressum"
                  ? "Impressum"
                  : "Menü"}
            </h2>

            {modalOpen === "menu" ? (
              <nav className="flex flex-col gap-8 items-start">
                <Link
                  to="/"
                  onClick={() => setModalOpen(null)}
                  className="mb-4 text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
                >
                  ← Startseite
                </Link>
                {items.map((it) => (
                  <a
                    key={it.slug}
                    href={`#${it.slug}`}
                    className="flex flex-col gap-1 text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalOpen(null);
                      // Kurze Verzögerung, damit das Modal schließt bevor gescrollt wird
                      setTimeout(() => {
                        document
                          .getElementById(it.slug)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 150);
                    }}
                  >
                    <span className="text-[9px] uppercase tracking-[0.3em] opacity-50">{it.n}</span>
                    <span
                      className="text-3xl tracking-wide opacity-90"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                    >
                      {it.label}
                    </span>
                  </a>
                ))}
              </nav>
            ) : modalOpen === "kontakt" ? (
              <div className="text-base md:text-lg lg:text-xl leading-relaxed opacity-80 max-w-2xl font-light">
                <p className="mb-10">
                  Für Anfragen, Kooperationen oder einen ersten unverbindlichen Austausch. Per Mail
                  oder Telefon — Antwort in der Regel innerhalb von 24 Stunden.
                </p>
                <a
                  href="mailto:hallo@example.com"
                  className="inline-block text-2xl tracking-wide opacity-80 hover:opacity-100 transition-opacity underline underline-offset-8"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
                >
                  Nachricht schreiben ↗
                </a>
              </div>
            ) : (
              <ImpressumContent />
            )}
          </div>
        </div>
      )}

      {/* Portrait Lightbox */}
      {portraitOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 cursor-none cursor-trigger-close"
          style={{
            background: "rgba(20, 18, 15, 0.9)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setPortraitOpen(false)}
        >
          <div
            className="relative flex max-h-[95vh] max-w-[95vw] flex-col overflow-hidden bg-[#11100F] cursor-default"
            style={{ color: "#EFECE4" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 z-50 text-white/50 hover:text-white transition-colors cursor-none focus:outline-none"
              onClick={() => setPortraitOpen(false)}
            >
              ×
            </button>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#11100F]">
              <img
                src={portrait}
                alt="Alexander Kühn"
                className="block max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain cursor-none cursor-trigger-close shadow-2xl"
                onClick={() => setPortraitOpen(false)}
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      <CustomCursor />
    </main>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let state = "default";
    let isTouch = false;
    let rAF = 0;

    const onTouch = () => {
      isTouch = true;
    };
    window.addEventListener("touchstart", onTouch, { once: true });

    const onMouseMove = (e: MouseEvent) => {
      if (isTouch) return;

      const el = e.target as HTMLElement;
      if (!el || !el.closest) return;

      if (el.closest(".cursor-trigger-zoom")) {
        state = "zoom";
      } else if (el.closest(".cursor-trigger-close")) {
        state = "close";
      } else if (el.closest("a, button")) {
        state = "hover";
      } else {
        state = "default";
      }

      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (cursorRef.current && ringRef.current && textRef.current) {
          // Positioniert den Container extrem schnell und ohne Delay am Mauszeiger
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

          // Animiert sanft die Skalierung und Sichtbarkeit des inneren Rings
          if (state === "default") {
            ringRef.current.style.opacity = "0";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(0.5)`;
            textRef.current.innerText = "";
          } else if (state === "close") {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(0.65)`;
            textRef.current.innerText = "CLOSE";
          } else {
            // hover und zoom bekommen exakt dasselbe "VIEW" in mittlerer Größe
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(0.65)`;
            textRef.current.innerText = "VIEW";
          }
        }
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      if (rAF) cancelAnimationFrame(rAF);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return createPortal(
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex"
      style={{ width: 0, height: 0 }}
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full text-[#11100F] shadow-sm transition-all duration-300 ease-out overflow-hidden"
        style={{
          width: "64px",
          height: "64px",
          opacity: 0,
          transform: "translate3d(-50%, -50%, 0) scale(0.8)",
        }}
      >
        {/* Animated Rainbow Border Layer */}
        <div
          className="absolute inset-0 z-0 animate-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D, #FF0018)",
            animationDuration: "3s",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
            maskImage:
              "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
          }}
        />
        {/* Inner Solid Circle (stark transparent für Lesbarkeit) */}
        <div className="absolute inset-[2px] rounded-full bg-[#EFECE4]/20 z-10" />

        {/* Text */}
        <span
          ref={textRef}
          className="relative z-20 text-[10px] uppercase tracking-[0.2em] font-medium"
        />
      </div>
    </div>
  ,
    document.body
  );
}
