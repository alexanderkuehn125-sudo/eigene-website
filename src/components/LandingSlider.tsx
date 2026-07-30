import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import { ContactForm } from "@/components/ContactForm";
import { motion, AnimatePresence } from "framer-motion";

import beHorizontal from "@/assets/manhattan-18-horizontal.jpg";
import doHorizontal from "@/assets/manhattan-21-horizontal.jpg";
import beVertical from "@/assets/manhattan-18-vertical.jpg";
import doVertical from "@/assets/manhattan-21-vertical.jpg";

/**
 * Landing zone.
 *
 * Desktop (horizontal): left half = 18th-century Manhattan ("Portfolio" → /be),
 * right half = 21st-century Manhattan ("Privat" → /do). A vertical handle in
 * the middle drags left/right to reveal more of either side.
 *
 * Mobile (vertical): top half = 18th century (Portfolio), bottom half = 21st
 * century (Privat). A horizontal handle drags up/down.
 *
 * Left/top click → /be. Right/bottom click → /do.
 */
export function LandingSlider() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const beSideRef = useRef<HTMLDivElement>(null);
  const doSideRef = useRef<HTMLDivElement>(null);
  const beBalloonRef = useRef<HTMLSpanElement>(null);
  const doBalloonRef = useRef<HTMLSpanElement>(null);
  const draggingRef = useRef(false);
  const [pct, setPct] = useState(50); // % of the "be" side visible (from left/top)
  const [zoomOn, setZoomOn] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [beLens, setBeLens] = useState<{ x: number; y: number; visible: boolean; reveal: boolean }>({
    x: 0,
    y: 0,
    visible: false,
    reveal: false,
  });
  const [doLens, setDoLens] = useState<{ x: number; y: number; visible: boolean; reveal: boolean }>({
    x: 0,
    y: 0,
    visible: false,
    reveal: false,
  });
  const ZOOM = 2.5;
  const LENS_SIZE = 270;
  const BALLOON_FLOAT = "balloonFloat 34s linear infinite";
  const BALLOON_POS = { left: "50%", top: "3rem", marginTop: "-20px", marginLeft: "-20px" };

  const Balloon = () => (
    <svg
      width="40"
      height="64"
      viewBox="0 0 40 64"
      style={{ overflow: "visible", display: "block" }}
    >
      {/* Thin string — drawn first so it sits behind the knot */}
      <path
        d="M20 44 Q 17 50 20 56 T 20 64"
        stroke="rgba(15,15,15,0.9)"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Balloon body — rainbow cycles via filter animation */}
      <g style={{ animation: "rainbowHue 18s linear infinite", transformOrigin: "20px 22px" }}>
        <path
          d="M20 2 C 30 2 36 10 36 20 C 36 30 28 40 22 42 L 20 44 L 18 42 C 12 40 4 30 4 20 C 4 10 10 2 20 2 Z"
          fill="#e63946"
        />
        {/* Highlight */}
        <ellipse cx="14" cy="14" rx="3" ry="4.5" fill="rgba(255,255,255,0.55)" />
      </g>
    </svg>
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!zoomOn || isMobile || draggingRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const isBeSide = pctX <= pct;

    let reveal = false;
    const br = isBeSide ? beBalloonRef.current?.getBoundingClientRect() : doBalloonRef.current?.getBoundingClientRect();
    if (br) {
      const bx = br.left + br.width / 2 - rect.left;
      const by = br.top + br.height / 2 - rect.top;
      reveal = Math.hypot(bx - x, by - y) < LENS_SIZE / 2;
    }

    if (isBeSide) {
      setBeLens({ x, y, visible: true, reveal });
      setDoLens((l) => ({ ...l, visible: false, reveal: false }));
    } else {
      setDoLens({ x, y, visible: true, reveal });
      setBeLens((l) => ({ ...l, visible: false, reveal: false }));
    }
  };

  const handlePointerLeave = () => {
    setBeLens((l) => ({ ...l, visible: false, reveal: false }));
    setDoLens((l) => ({ ...l, visible: false, reveal: false }));
  };

  useEffect(() => {
    if (!zoomOn && !showWelcomeModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomOn) {
          setZoomOn(false);
          setBeLens((l) => ({ ...l, visible: false, reveal: false }));
          setDoLens((l) => ({ ...l, visible: false, reveal: false }));
        }
        if (showWelcomeModal) {
          setShowWelcomeModal(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOn, showWelcomeModal]);

  const updateFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw = isMobile
        ? ((clientY - rect.top) / rect.height) * 100
        : ((clientX - rect.left) / rect.width) * 100;
      setPct(Math.max(0, Math.min(100, raw)));
    },
    [isMobile],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromEvent(e.clientX, e.clientY);
    };
    const onUp = () => {
      if (draggingRef.current) {
        setPct((p) => {
          if (p <= 5) {
            setTimeout(() => { void navigate({ to: "/portfolio" }); }, 300);
            return 0;
          } else if (p >= 95) {
            setTimeout(() => { void navigate({ to: "/ausstellung" }); }, 300);
            return 100;
          }
          return p;
        });
      }
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromEvent, navigate]);

  const startDrag = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    document.body.style.cursor = isMobile ? "ns-resize" : "ew-resize";
    document.body.style.userSelect = "none";
    updateFromEvent(e.clientX, e.clientY);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (
      (isMobile && (e.key === "ArrowUp" || e.key === "ArrowDown")) ||
      (!isMobile && (e.key === "ArrowLeft" || e.key === "ArrowRight"))
    ) {
      e.preventDefault();
      const dir =
        e.key === "ArrowRight" || e.key === "ArrowDown" ? +1 : -1;
      setPct((p) => Math.max(0, Math.min(100, p + dir * step)));
    }
  };

  const goSide = (side: "be" | "do") => {
    if (draggingRef.current) return;
    void navigate({ to: side === "be" ? "/portfolio" : "/ausstellung" });
  };

  const beImg = isMobile ? beVertical : beHorizontal;
  const doImg = isMobile ? doVertical : doHorizontal;

  const doClip = isMobile
    ? `inset(${pct}% 0 0 0)`
    : `inset(0 0 0 ${pct}%)`;

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[100svh] w-full overflow-hidden bg-black select-none"
      aria-label="Landing — slide between 18th- and 21st-century Manhattan"
    >
      <div
        ref={beSideRef}
        className="absolute inset-0 block h-full w-full cursor-default"
      >
        <img
          src={beImg}
          alt="Manhattan in the 18th century, seen from north to south — forests, orchard meadows, a small Dutch village."
          className="block h-full w-full object-cover"
          style={isMobile ? { transform: "scale(1.15) translateY(-4%)" } : undefined}
          draggable={false}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden leading-none select-none">
          <span
            ref={beBalloonRef}
            className="absolute"
            style={{
              ...BALLOON_POS,
              animation: BALLOON_FLOAT,
            }}
            title="Up, up and away."
          >
            {/* BALLOON HIDDEN ON USER REQUEST: <Balloon /> */}
          </span>
        </div>
      </div>

      <div
        ref={doSideRef}
        className="absolute inset-0 block h-full w-full cursor-default"
        style={{
          clipPath: doClip,
          WebkitClipPath: doClip,
        }}
      >
        <img
          src={doImg}
          alt="Manhattan in the 21st century, seen from north to south — Central Park, Midtown, Lower Manhattan, the harbor."
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(6,10,20,0.5) 100%)",
          }}
        />
        <span aria-hidden className="window-light" style={{ left: "42%", top: "58%" }} />
        <span aria-hidden className="window-light window-light--slow" style={{ left: "56%", top: "63%" }} />
        <span aria-hidden className="window-light window-light--fast" style={{ left: "49%", top: "71%" }} />
        <span aria-hidden className="contrail" />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden leading-none select-none">
          <span
            ref={doBalloonRef}
            className="absolute"
            style={{
              ...BALLOON_POS,
              animation: BALLOON_FLOAT,
            }}
            title="Up, up and away."
          >
            {/* BALLOON HIDDEN ON USER REQUEST: <Balloon /> */}
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bg-white/70 mix-blend-overlay"
        style={
          isMobile
            ? { left: 0, right: 0, top: `${pct}%`, height: 1, transform: "translateY(-0.5px)" }
            : { top: 0, bottom: 0, left: `${pct}%`, width: 1, transform: "translateX(-0.5px)" }
        }
      />

      <div
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-orientation={isMobile ? "horizontal" : "vertical"}
        aria-label="Reveal 18th- vs 21st-century Manhattan"
        onPointerDown={startDrag}
        onKeyDown={onKey}
        onClick={(e) => e.stopPropagation()}
        className={`group absolute z-40 grid place-items-center rounded-full touch-none bg-transparent border border-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 ${
          isMobile ? "cursor-ns-resize" : "cursor-ew-resize"
        }`}
        style={
          isMobile
            ? {
                left: "50%",
                top: `${pct}%`,
                width: 68,
                height: 28,
                marginTop: -14,
                marginLeft: -34,
                animation: "handleBreathe 3.6s cubic-bezier(0.45,0,0.55,1) infinite",
              }
            : {
                top: "50%",
                left: `${pct}%`,
                width: 28,
                height: 68,
                marginTop: -34,
                marginLeft: -14,
                animation: "handleBreathe 3.6s cubic-bezier(0.45,0,0.55,1) infinite",
              }
        }
      >
        {isMobile ? (
          <span className="flex items-center gap-1 text-[10px] tracking-[0.3em] text-white/80">
            <span aria-hidden>▲</span>
            <span aria-hidden>▼</span>
          </span>
        ) : (
          <span className="flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] text-white/80">
            <span aria-hidden>◀</span>
            <span aria-hidden>▶</span>
          </span>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 select-none mix-blend-difference"
      >
        <span
          className="block whitespace-nowrap text-center text-white"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.38em",
            fontSize: "clamp(1.05rem, 1.65vw, 1.4rem)",
            textTransform: "uppercase",
          }}
        >
          Alexander Kühn
        </span>
      </div>

      <CloudTitle
        label="Portfolio"
        subtext="Projekt- / Eventmanagement und Digital"
        side="be"
        isMobile={isMobile}
        pct={pct}
        hidden={pct <= 27}
        onClick={() => goSide("be")}
        onContactClick={() => setContactModalOpen(true)}
      />

      <CloudTitle
        label="Ausstellung"
        subtext="Digitale Bilder"
        side="do"
        isMobile={isMobile}
        pct={pct}
        hidden={pct >= 73}
        onClick={() => goSide("do")}
      />

      {(["be", "do"] as const).map((side) => {
        const lensState = side === "be" ? beLens : doLens;
        const sideRef = side === "be" ? beSideRef : doSideRef;
        const img = side === "be" ? beImg : doImg;
        if (!zoomOn || isMobile || !lensState.visible) return null;
        const rect = sideRef.current?.getBoundingClientRect();
        if (!rect) return null;
        const bgW = rect.width * ZOOM;
        const bgH = rect.height * ZOOM;
        const offsetX = LENS_SIZE / 2 - lensState.x * ZOOM;
        const offsetY = LENS_SIZE / 2 - lensState.y * ZOOM;
        return (
          <div
            key={side}
            aria-hidden
            className="pointer-events-none absolute z-40 overflow-hidden rounded-full border-2 border-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lensState.x - LENS_SIZE / 2,
              top: lensState.y - LENS_SIZE / 2,
            }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: bgW,
                height: bgH,
                transform: `translate(${offsetX}px, ${offsetY}px)`,
              }}
            >
              <img
                src={img}
                alt=""
                className="block h-full w-full object-cover"
                draggable={false}
              />
              <span
                className="absolute leading-none select-none"
                style={{
                  left: BALLOON_POS.left,
                  top: BALLOON_POS.top,
                  transform: `scale(${ZOOM})`,
                  transformOrigin: "top left",
                  animation: BALLOON_FLOAT,
                }}
              >
                {/* BALLOON HIDDEN ON USER REQUEST: <Balloon /> */}
              </span>
            </div>
          </div>
        );
      })}

      {!isMobile && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoomOn((z) => !z);
            setBeLens((l) => ({ ...l, visible: false, reveal: false }));
            setDoLens((l) => ({ ...l, visible: false, reveal: false }));
          }}
          aria-pressed={zoomOn}
          aria-label="Zoom umschalten"
          className={`absolute bottom-4 left-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-medium backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 hover:shadow-2xl ${
            zoomOn
              ? "bg-white text-[#1a1a1a]"
              : "bg-black/50 text-white hover:bg-black/70"
          }`}
        >
          <span aria-hidden>🔍</span>
          <span>{zoomOn ? "Zoom an" : "Zoom"}</span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
        <p className="rounded-full bg-black/50 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.4em] text-white backdrop-blur-md shadow-lg">
          {isMobile
            ? "drag ↕ · tap a side to enter"
            : zoomOn
              ? "Zoom aktiv · Maus über das linke Bild bewegen"
              : "drag ↔ · click a side to enter"}
        </p>
      </div>

      {contactModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{
            background: "rgba(45, 42, 34, 0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#1A1918] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:p-12"
            style={{ color: "#EFECE4" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              aria-label="Schließen"
              className="absolute right-4 top-4 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100 p-4 -m-4 z-50 cursor-pointer"
            >
              ×
            </button>

            <h2
              className="mb-8 md:mb-12 pr-8 text-3xl leading-tight tracking-wide md:text-5xl uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              Kontakt
            </h2>
            
            <div className="text-base md:text-lg lg:text-xl leading-relaxed opacity-80 max-w-2xl font-light">
              <p className="mb-6">
                Für Anfragen, Kooperationen oder einen ersten unverbindlichen Austausch.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      )}

      {/* Hidden Welcome Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowWelcomeModal(true);
        }}
        className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
        aria-label="Welcome"
      />

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-8 z-[200] flex items-center justify-center rounded-3xl overflow-hidden"
            style={{
              background: "radial-gradient(circle at center, rgba(35, 30, 25, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(197, 160, 89, 0.15)",
              boxShadow: "0 0 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(197, 160, 89, 0.05)"
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowWelcomeModal(false);
            }}
          >
            {/* Subtle warm glow behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-20 blur-[100px] pointer-events-none"
                 style={{ background: "radial-gradient(circle, #C5A059 0%, transparent 70%)" }} />
            
            <div className="text-center p-8 text-white relative z-10">
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl tracking-wider font-light leading-snug"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Guten Morgen,<br />
                <span className="opacity-90 text-[#C5A059] text-3xl md:text-5xl lg:text-6xl mt-6 block leading-tight" style={{ textShadow: "0 2px 10px rgba(197, 160, 89, 0.3)" }}>
                  lieber Batch 18 und Dozenten!
                </span>
                <span className="text-2xl md:text-4xl mt-8 block leading-relaxed text-white font-light" style={{ letterSpacing: "0.05em" }}>
                  Herzlich Willkommen zu meiner kleinen Einführung in meine &quot;Eigene Website&quot;.
                </span>
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface CloudTitleProps {
  label: string;
  subtext: string;
  side: "be" | "do";
  isMobile: boolean;
  pct: number;
  hidden?: boolean;
  onClick: () => void;
  onContactClick?: () => void;
}

function CloudTitle({
  label,
  subtext,
  side,
  isMobile,
  pct,
  hidden,
  onClick,
  onContactClick,
}: CloudTitleProps) {
  // Fixed at the center of each half — independent of slider position.
  const center = side === "be" ? 25 : 75;
  const pos = isMobile
    ? { top: `${center}%`, left: "50%", transform: "translate(-50%, -50%)" }
    : { top: "50%", left: `${center}%`, transform: "translate(-50%, -50%)" };


  const tone =
    side === "be"
      ? { color: "rgba(255,250,235,1)", shadow: "0 0 40px rgba(255,236,180,0.8)" }
      : { color: "rgba(245,250,255,1)", shadow: "0 0 40px rgba(160,190,240,0.8)" };

  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const [letterPcts, setLetterPcts] = useState<number[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const parent = containerRef.current?.offsetParent as HTMLElement | null;
      const parentRect = parent?.getBoundingClientRect();
      if (!parentRect) return;
      const size = isMobile ? parentRect.height : parentRect.width;
      const origin = isMobile ? parentRect.top : parentRect.left;
      const pcts = letterRefs.current.map((el) => {
        if (!el) return 50;
        const r = el.getBoundingClientRect();
        const c = isMobile ? r.top + r.height / 2 : r.left + r.width / 2;
        return ((c - origin) / size) * 100;
      });
      setLetterPcts(pcts);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [label, isMobile]);

  // Smooth step easing across a soft edge width.
  const SOFT = 1.2;
  const opacityFor = (letterPct: number) => {
    // BE: visible when pct > letterPct; DO: visible when pct < letterPct.
    const t =
      side === "be"
        ? (pct - letterPct) / SOFT + 0.5
        : (letterPct - pct) / SOFT + 0.5;
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  };

  const subtextT =
    side === "be"
      ? (pct - (center + 12)) / 20 + 0.5
      : ((center - 12) - pct) / 20 + 0.5;
  const subtextX = Math.max(0, Math.min(1, subtextT));
  const subtextOpacity = subtextX * subtextX * (3 - 2 * subtextX);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="cloud-title group absolute z-30 focus:outline-none cursor-elegant flex flex-col items-center"
      style={{
        ...pos,
      }}
      aria-label={`Enter ${label}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span
        className="block text-center leading-none"
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 400,
          color: tone.color,
          textShadow: tone.shadow,
          letterSpacing: "0.02em",
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.85))",
          fontSize: "clamp(1.33rem, 4.47vw, 3.8rem)",
          whiteSpace: "nowrap",
        }}
      >
        {Array.from(label).map((ch, i) => {
          const o = letterPcts[i] !== undefined ? opacityFor(letterPcts[i]) : 1;
          return (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              style={{
                fontFamily: "'Jost', sans-serif",
                display: "inline-block",
                opacity: o,
                filter: `blur(${(1 - o) * 6}px)`,
                transition:
                  "opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </span>
      {/* Subtext */}
      <span
        className="block text-center mt-3"
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 500,
          color: tone.color,
          textShadow: tone.shadow,
          letterSpacing: "0.15em",
          fontSize: "clamp(0.6rem, 1vw, 0.9rem)",
          textTransform: "uppercase",
          opacity: subtextOpacity,
          filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.85)) blur(${(1 - subtextOpacity) * 6}px)`,
          transition: "opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {subtext}
      </span>
      
      {/* Optional Contact Button */}
      {onContactClick && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onContactClick();
          }}
          className="absolute top-full mt-8 inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-2.5 text-[13px] md:text-[16px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black pointer-events-auto cursor-pointer"
          style={{
            fontFamily: "'Roboto', sans-serif",
            opacity: subtextOpacity,
            filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.85)) blur(${(1 - subtextOpacity) * 6}px)`,
            transition: "opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Kontakt
        </button>
      )}
    </div>
  );
}

