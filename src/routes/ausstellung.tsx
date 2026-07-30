import { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import type { ImgHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImpressumContent } from "@/components/ImpressumContent";
import { CuratorRoulette } from "@/components/CuratorRoulette";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/ausstellung")({
  head: () => ({
    meta: [
      { title: "Ausstellung — Fotografie von Alexander Kühn" },
      {
        name: "description",
        content:
          "Eine persönliche fotografische Ausstellung von Alexander Kühn — Momente, Orte, Licht und architektonische Perspektiven.",
      },
      {
        tagName: "style",
        content: `
          @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');
        `,
      },
    ],
  }),
  component: DoPage,
});

export type Photo = {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
  span?: "tall" | "wide" | "square";
  originalIndex: number;
};

// Dynamisches Laden aller Bilder im Ordner (funktioniert durch Vite automatisch)
// Lade alle Bilddateien aus dem Verzeichnis. Vite gibt uns direkt die URLs als String zurück.
const imageModules = import.meta.glob("@/assets/photos/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

let photos: Photo[] = Object.entries(imageModules)
  .map(([path, url], index) => {
    // Extrahiere den Dateinamen ohne Endung, um ihn als Titel zu nutzen
    const filename = path.split("/").pop() || `foto-${index}`;
    const title = filename.split(".")[0].replace(/[-_]/g, " ") || `Foto ${index + 1}`;

    const categories = ["Momente", "Orte", "Licht"];
    const category = categories[index % categories.length];

    return {
      id: `p${index}`,
      src: url as string,
      title: title,
      caption: title, // Kann natürlich später individuell erweitert werden
      category: category,
      span: "tall" as const,
      originalIndex: index,
    };
  })
  .sort((a, b) => a.originalIndex - b.originalIndex);

// Gewünschte Umordnung: Spezifische Bilder ans Ende verschieben
const reorderedPhotos = [...photos];

// Hilfsfunktion zum sicheren Verschieben anhand des originalIndex
function moveToBoytom(origIndex: number) {
  const idx = reorderedPhotos.findIndex((p) => p.originalIndex === origIndex);
  if (idx !== -1) {
    const photo = reorderedPhotos.splice(idx, 1)[0];
    reorderedPhotos.push(photo);
  }
}

// 1. Zuerst Bild 40/58 (originalIndex 39) ans Ende
moveToBoytom(39);
// 2. Dann das neue Bild "DSC_0062 23" (originalIndex 36) ganz ans Ende, also unter Bild 40
moveToBoytom(36);

photos = reorderedPhotos;

type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
  eager?: boolean;
};

function LazyImage({ eager, className = "", onLoad, ...rest }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    // Wenn das Bild bereits vollständig geladen oder aus dem Cache ist
    if (img.complete) {
      setLoaded(true);
    }

    const handleLoad = () => setLoaded(true);
    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleLoad);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleLoad);
    };
  }, [rest.src]);

  return (
    <img
      {...rest}
      ref={ref}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      draggable={false}
      className={`${className} transition-opacity duration-1000 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={() => setLoaded(true)}
    />
  );
}

function preloadImage(src: string) {
  if (typeof window === "undefined") return;
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  img.decode?.().catch(() => {});
}

function DoPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<"kontakt" | "impressum" | null>(null);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleCategoryClick = (cat: string) => {
    if (cat === activeCategory || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 450); // Dauer des Vorhang-Fades
  };

  const filteredPhotos = useMemo(() => {
    return activeCategory === "Alle" ? photos : photos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Zwingt den Browser, beim Neuladen (F5 / Refresh) wieder ganz oben zu starten
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const active = filteredPhotos.find((p) => p.id === openId);

  useEffect(() => {
    if (!openId) return;
    const idx = filteredPhotos.findIndex((p) => p.id === openId);
    if (idx < 0) return;
    preloadImage(filteredPhotos[idx].src);
    preloadImage(filteredPhotos[(idx + 1) % filteredPhotos.length].src);
    preloadImage(filteredPhotos[(idx - 1 + filteredPhotos.length) % filteredPhotos.length].src);
  }, [openId, filteredPhotos]);

  const openPhoto = (id: string) => {
    const p = filteredPhotos.find((x) => x.id === id);
    if (p) preloadImage(p.src);
    setOpenId(id);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const navigateLightbox = (dir: 1 | -1) => {
    setOpenId((prev) => {
      if (!prev) return prev;
      const idx = filteredPhotos.findIndex((p) => p.id === prev);
      if (idx < 0) return prev;
      return filteredPhotos[(idx + dir + filteredPhotos.length) % filteredPhotos.length].id;
    });
  };

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, filteredPhotos]);

  return (
    <main
      className="relative min-h-screen w-full bg-[#050504] text-[#EFECE4] overflow-clip md:[&_a]:cursor-none md:[&_button]:cursor-none"
      style={{
        background: "radial-gradient(circle at 50% 30%, #1c1a18 0%, #050504 100%)",
        color: "#EFECE4",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Film-Grain Overlay entfernt für deutlich bessere Scroll-Performance auf der Bilder-Seite */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-10 pb-5 md:px-12 md:pt-16 md:pb-8 page-transition-enter">
        {/* Header */}
        <header className="flex items-center justify-between pt-2 relative z-50 hidden md:flex">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Start
          </Link>
          <Link
            to="/portfolio"
            className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
          >
            Portfolio →
          </Link>
        </header>

        <section className="mt-20 mb-10 md:mt-24 md:mb-16 flex justify-center relative z-50">
          <FadeIn>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-center leading-[1.3] tracking-wide"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                color: "#EFECE4",
              }}
            >
              Eine persönliche Auswahl <br />
              <span className="opacity-80 text-[0.8em]">Momente, Orte, Licht.</span>
            </h1>

            {/* Filters */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] md:text-xs uppercase tracking-[0.25em]">
              <div className="w-full md:hidden flex justify-center">
                <CuratorRoulette photos={photos} mobileInline={true} />
              </div>
              
              {["Alle", "Momente", "Orte", "Licht"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-all duration-500 ease-out ${
                    activeCategory === cat
                      ? "opacity-100 font-bold scale-105"
                      : "opacity-40 hover:opacity-80 hover:scale-105"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Grid - The Cinematic Dark Room (3 Spalten, Versetzt) */}
        <section className="mt-12 group columns-1 gap-12 sm:columns-2 md:mt-16 md:columns-3 md:gap-16 lg:gap-24 relative z-10">
          <AnimatePresence>
            {filteredPhotos.map((p, i) => {
              // Versetzte Hängung (Staggered Grid) für organische Tiefe
              const margins = [
                "md:mt-0 md:mb-40",
                "md:mt-32 md:mb-24",
                "md:mt-16 md:mb-32",
                "md:mt-48 md:mb-16",
                "md:mt-8 md:mb-48",
              ];

              // Variierende horizontale Abstände durch unterschiedliche Margins und Breiten
              const widths = [
                "w-full",
                "w-[85%] md:ml-12", // Bild nach rechts geschoben -> linker Gap wirkt größer
                "w-[90%] md:mr-16", // Bild nach links geschoben -> rechter Gap wirkt größer
                "w-[80%] mx-auto", // Viel Luft auf beiden Seiten
                "w-[95%] md:ml-8",
                "w-[85%] md:mr-24",
              ];

              const marginClass = margins[i % margins.length];
              let widthClass = widths[i % widths.length];
              let maxHClass = "max-h-[60vh]";
              let zClass = "z-10";

              // Sonderbehandlung anhand des originalIndex, damit die Bilder ihre Größe behalten, auch wenn sie verschoben wurden
              const isHero =
                p.originalIndex === 7 || // 08/58
                p.originalIndex === 9 || // 10/58
                p.originalIndex === 39 || // 40/58 (wurde ans Ende verschoben)
                p.originalIndex === 49 || // 50/58
                p.originalIndex === 57 || // 58/58 (ehemals das letzte)
                p.originalIndex === 36; // Neu: DSC_0062 23 (unter 40 verschoben)

              if (isHero) {
                if (p.originalIndex === 39) {
                  // Extragroße Sonderbehandlung für Bild 40/58 (nochmals ~20% größer als andere Heros)
                  widthClass = "w-[115%] md:w-[140%] md:-ml-[20%]";
                  maxHClass = "max-h-[100vh]"; // Volle Bildschirmhöhe erlaubt
                  zClass = "z-30"; // Ganz obenauf
                } else if (p.originalIndex === 36) {
                  // Sondergröße für das neue Schlussbild (DSC_0062 23)
                  widthClass = "w-[110%] md:w-[130%] md:-ml-[15%]";
                  maxHClass = "max-h-[90vh]";
                  zClass = "z-30";
                } else {
                  // Standard Hero-Bilder
                  widthClass = "w-[105%] md:w-[120%] md:-ml-[10%]";
                  maxHClass = "max-h-[85vh]";
                  zClass = "z-20";
                }
              }

              return (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: { type: "spring", bounce: 0, duration: 2.2 },
                    opacity: { duration: 0.8, ease: "easeOut" },
                    y: { duration: 0.8, ease: "easeOut" },
                  }}
                  key={p.id}
                  id={p.id}
                  className={`relative block text-left mb-24 ${widthClass} ${marginClass} ${zClass}`}
                  style={{ breakInside: "avoid" }}
                >
                  <div
                    onClick={() => openPhoto(p.id)}
                    onPointerEnter={() => preloadImage(p.src)}
                    className="group/item block w-full transition-opacity duration-700 cursor-pointer focus:outline-none lg:group-hover:opacity-30 lg:hover:!opacity-100 md:cursor-none cursor-trigger-zoom"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="relative flex justify-center w-full">
                      {/* 3D-Glas-Platten Effekt vereinfacht für extrem verbesserte Scroll-Performance */}
                      <div className="relative overflow-hidden bg-[#0A0A0A] transform-gpu rounded-[2px] shadow-2xl transition-all duration-700">
                        <LazyImage
                          src={p.src}
                          alt={p.title}
                          eager={i < 6}
                          // maxHClass steuert nun die Höhe flexibel (z.B. für Ausreißer)
                          className={`block h-auto w-auto max-w-full ${maxHClass} object-contain transition-transform duration-[800ms] ease-out group-hover/item:scale-[1.03] translate-z-0`}
                        />
                      </div>
                    </div>

                    {/* Dezente Nummerierung schwebend unterhalb, blendet nur bei Hover über DIESES Bild ein */}
                    <div className="absolute -bottom-7 left-0 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100">
                      <span
                        aria-hidden
                        className="text-[9px] sm:text-[10px] tracking-[0.3em] font-medium text-white/90 uppercase"
                      >
                        {String(i + 1).padStart(2, "0")}/
                        {String(filteredPhotos.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        <div className="w-full relative z-[99] pointer-events-auto bg-[#050504] pt-8">
          <div className="mt-8 flex flex-col items-center gap-6 md:mt-12">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer md:cursor-none"
            >
              nach oben ↑
            </button>
          </div>

          <footer className="mt-16 flex flex-col items-center gap-4 text-[11px] uppercase tracking-[0.35em] opacity-70 md:mt-24">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setModalOpen("kontakt")}
                className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer md:cursor-none"
              >
                Kontakt
              </button>
              <button
                type="button"
                onClick={() => setModalOpen("impressum")}
                className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer md:cursor-none"
              >
                Impressum
              </button>
            </div>
            <span className="opacity-70 text-center">
              © {new Date().getFullYear()} Alexander Kühn · Alle Rechte vorbehalten
            </span>
          </footer>
        </div>
      </div>

      {/* Modals im React Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="do-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 md:cursor-none cursor-trigger-close"
              style={{
                background: "rgba(45, 42, 34, 0.55)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setModalOpen(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#1A1918] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:p-12 md:[&_a]:cursor-none md:[&_button]:cursor-none cursor-content-area"
                style={{ color: "#EFECE4" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  aria-label="Schließen"
                  className="absolute right-4 top-4 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100 p-4 -m-4"
                >
                  ×
                </button>
                <h2
                  className="mb-8 pr-8 text-4xl leading-tight tracking-tight md:text-5xl"
                  style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
                >
                  {modalOpen === "kontakt" ? "Kontakt" : "Impressum"}
                </h2>
                {modalOpen === "kontakt" ? (
                  <div className="text-base md:text-lg lg:text-xl leading-relaxed opacity-80 font-light">

                    <ContactForm />
                  </div>
                ) : (
                  <ImpressumContent />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Lightbox im React Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {active && (
            <motion.div
              key="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 md:cursor-none cursor-trigger-close"
              style={{
                background: "rgba(20, 18, 15, 0.95)",
                backdropFilter: "blur(12px)",
              }}
              onClick={() => setOpenId(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex max-h-[95vh] max-w-[95vw] flex-col overflow-hidden bg-[#11100F] cursor-default rounded-sm shadow-2xl md:[&_a]:cursor-none md:[&_button]:cursor-none cursor-content-area"
                style={{ color: "#EFECE4" }}
                onClick={(e) => e.stopPropagation()}
              >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Schließen"
              className="absolute right-4 top-4 z-10 text-3xl leading-none opacity-60 transition-opacity hover:opacity-100 mix-blend-difference text-white p-4 -m-4"
            >
              ×
            </button>

            {/* Inner container for image */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#11100F]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex items-center justify-center h-full w-full"
                >
                  <LazyImage
                    src={active.src}
                    alt={active.title}
                    eager
                    className="block max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain md:cursor-none cursor-trigger-close"
                    onClick={() => setOpenId(null)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Numbering and controls at the bottom */}
            <div className="absolute bottom-4 left-4 flex items-center justify-center mix-blend-difference text-white">
              <span className="text-[9px] sm:text-[11px] tracking-[0.3em] font-medium uppercase opacity-50">
                {String(photos.findIndex((p) => p.id === active.id) + 1).padStart(2, "0")}/
                {String(photos.length).padStart(2, "0")}
              </span>
            </div>

            {/* Mobile Touch Navigation Zones */}
            <div
              className="absolute inset-y-0 left-0 w-1/3 z-20 flex items-center pl-4 cursor-pointer md:hidden opacity-50 mix-blend-difference text-white text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
            >
              ◀
            </div>
            <div
              className="absolute inset-y-0 right-0 w-1/3 z-20 flex items-center justify-end pr-4 cursor-pointer md:hidden opacity-50 mix-blend-difference text-white text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
            >
              ▶
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>,
      document.body
    )}
      <CustomCursor />
      
      {/* Desktop-only floating button */}
      <div className="hidden md:block">
        <CuratorRoulette photos={photos} />
      </div>
    </main>
  );
}

function FadeIn({
  children,
  className = "",
  style = {},
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // rootMargin: "150px" sorgt dafür, dass die Animation schon minimal früher startet,
      // bevor das Bild überhaupt den Bildschirmrand erreicht. Das macht es bei schnellem Scrollen flüssiger.
      { rootMargin: "150px", threshold: 0.01 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Deutlich längere Duration (1800ms) und kürzere Fallhöhe (translate-y-10 statt 24)
      // für einen schwebenden, ultra-weichen Parallax-artigen Effekt.
      className={`${className} transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
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
      } else if (el.closest(".cursor-trigger-close") && !el.closest(".cursor-content-area")) {
        state = "close";
      } else if (el.closest(".widget-cursor-area") && el.closest("a, button, input")) {
        state = "widget";
      } else if (el.closest("input") || el.closest("textarea")) {
        state = "input";
      } else if (el.closest("a, button")) {
        state = "hover";
      } else {
        state = "default";
      }

      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (cursorRef.current && ringRef.current && textRef.current) {
          const dot = document.getElementById("cursor-dot");
          // Positioniert den Container extrem schnell und ohne Delay am Mauszeiger
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

          // Animiert sanft die Skalierung und Sichtbarkeit des inneren Rings
          if (state === "default") {
            ringRef.current.style.opacity = "0";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "0";
          } else if (state === "zoom") {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1.5)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "1";
          } else if (state === "close") {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1.5)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "1";
          } else if (state === "hover") {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "1";
          } else if (state === "widget") {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1.5)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "1";
          } else if (state === "input") {
            ringRef.current.style.opacity = "0";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(0.5)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "0";
          } else {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1.5)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "1";
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex"
      style={{ width: 0, height: 0 }}
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full text-white shadow-sm transition-all duration-300 ease-out overflow-hidden"
        style={{
          width: "32px",
          height: "32px",
          opacity: 0,
          transform: "translate3d(-50%, -50%, 0) scale(1)",
        }}
      >
        {/* Elegant White Border Layer */}
        <div
          className="absolute inset-0 z-0 rounded-full border border-white/60"
        />

        {/* White Dot */}
        <div
          id="cursor-dot"
          className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-opacity duration-300 z-30"
        />

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
