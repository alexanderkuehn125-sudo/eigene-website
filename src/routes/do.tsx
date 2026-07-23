import { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import type { ImgHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImpressumContent } from "@/components/ImpressumContent";
import { CuratorRoulette } from "@/components/CuratorRoulette";

export const Route = createFileRoute("/do")({
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
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (!impressumOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImpressumOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [impressumOpen]);

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
      className="relative min-h-screen w-full bg-[#050504] text-[#EFECE4] overflow-clip [&_a]:cursor-none [&_button]:cursor-none"
      style={{
        background: "radial-gradient(circle at 50% 30%, #1c1a18 0%, #050504 100%)",
        color: "#EFECE4",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Film-Grain / Papier-Rauschen Overlay (Invertiert für dunklen Hintergrund) */}
      <div
        // Jetzt ohne mix-blend-screen (Hardware-Beschleunigung / kein GPU Repaint pro Frame beim Scrollen)
        // Reduzierte Opacity sorgt für denselben visuellen Effekt ohne Performance-Probleme
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 md:px-12 md:py-16 page-transition-enter">
        {/* Header */}
        <header className="flex items-center justify-between pt-2 relative z-50">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Start
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Ausstellung</span>
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
              Eine persönliche Auswahl <br className="hidden sm:block" />
              <span className="opacity-80 text-[0.8em]">Momente, Orte, Licht.</span>
            </h1>

            {/* Filters */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] md:text-xs uppercase tracking-[0.25em]">
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
                  <button
                    type="button"
                    onClick={() => openPhoto(p.id)}
                    onPointerEnter={() => preloadImage(p.src)}
                    onFocus={() => preloadImage(p.src)}
                    // Reines, nacktes Bild. Hover-Dim-Effekt greift auf die innere Button-Struktur (nur auf Desktop via lg:).
                    className="group/item w-full transition-opacity duration-700 focus:outline-none focus:ring-1 focus:ring-white/20 lg:group-hover:opacity-30 lg:hover:!opacity-100 cursor-none cursor-trigger-zoom"
                  >
                    <div className="relative flex justify-center w-full">
                      {/* 3D-Glas-Platten Effekt: 
                      1. inset 0 1px 1px -> Lichtreflexion an der oberen Kante (Deckenlicht)
                      2. inset 0 0 0 1px -> Hauchdünne Haarlinie zur Definition des Randes
                      3. 0 30px 60px -> Massiver, tiefschwarzer Drop-Shadow nach unten
                      4. 0 0 20px -> Schwarzer Ambient-Glow in alle Richtungen zur Trennung vom Hintergrund */}
                      <div className="relative overflow-hidden bg-[#0A0A0A] transform-gpu rounded-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.05),_0_30px_60px_-10px_rgba(0,0,0,1),_0_0_20px_rgba(0,0,0,0.8)] transition-all duration-700">
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
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

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
          <button
            type="button"
            onClick={() => setImpressumOpen(true)}
            className="text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
          >
            Impressum
          </button>
          <span className="opacity-70">
            © {new Date().getFullYear()} Alexander Kühn · Alle Rechte vorbehalten
          </span>
        </footer>
      </div>

      {/* Mobile Floating 'Start' Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Link
          to="/"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1918] border border-white/20 text-[#EFECE4] shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform hover:scale-105 focus:outline-none"
        >
          <span className="text-[8px] uppercase tracking-[0.25em] font-medium mt-[1px]">Start</span>
        </Link>
      </div>

      {/* Impressum modal */}
      {impressumOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-none cursor-trigger-close"
          style={{
            background: "rgba(45, 42, 34, 0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setImpressumOpen(false)}
        >
          <div
            className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#1A1918] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:p-12"
            style={{ color: "#EFECE4" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setImpressumOpen(false)}
              aria-label="Schließen"
              className="absolute right-4 top-4 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100 p-4 -m-4"
            >
              ×
            </button>
            <h2
              className="mb-8 pr-8 text-4xl leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
            >
              Impressum
            </h2>
            <ImpressumContent />
          </div>
        </div>
      )}

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 cursor-none cursor-trigger-close"
          style={{
            background: "rgba(20, 18, 15, 0.9)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative flex max-h-[95vh] max-w-[95vw] flex-col overflow-hidden bg-[#11100F] cursor-default"
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
              <LazyImage
                key={active.id}
                src={active.src}
                alt={active.title}
                eager
                className="block max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain cursor-none cursor-trigger-close"
                onClick={() => setOpenId(null)}
              />
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
          </div>
        </div>
      )}
      <CustomCursor />
      <CuratorRoulette photos={photos} />
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
