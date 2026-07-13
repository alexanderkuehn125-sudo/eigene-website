import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const beSideRef = useRef<HTMLButtonElement>(null);
  const doSideRef = useRef<HTMLButtonElement>(null);
  const beBalloonRef = useRef<HTMLSpanElement>(null);
  const doBalloonRef = useRef<HTMLSpanElement>(null);
  const draggingRef = useRef(false);
  const [pct, setPct] = useState(50); // % of the "be" side visible (from left/top)
  const [zoomOn, setZoomOn] = useState(false);
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
  const BALLOON_ANIM = "balloonFloat 34s ease-in-out infinite, rainbowHue 6s linear infinite";
  const BALLOON_STYLE = { left: "62%", top: "18%", fontSize: "36px" };

  const makeLensHandler = (
    sideRef: React.RefObject<HTMLButtonElement | null>,
    balloonRef: React.RefObject<HTMLSpanElement | null>,
    setter: typeof setBeLens,
  ) => (e: React.MouseEvent) => {
    if (!zoomOn || isMobile) return;
    const rect = sideRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const br = balloonRef.current?.getBoundingClientRect();
    let reveal = false;
    if (br) {
      const bx = br.left + br.width / 2 - rect.left;
      const by = br.top + br.height / 2 - rect.top;
      reveal = Math.hypot(bx - x, by - y) < LENS_SIZE / 2;
    }
    setter({ x, y, visible: true, reveal });
  };

  const updateFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw = isMobile
        ? ((clientY - rect.top) / rect.height) * 100
        : ((clientX - rect.left) / rect.width) * 100;
      setPct(Math.max(4, Math.min(96, raw)));
    },
    [isMobile],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromEvent(e.clientX, e.clientY);
    };
    const onUp = () => {
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
  }, [updateFromEvent]);

  const startDrag = (e: React.PointerEvent) => {
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
      setPct((p) => Math.max(4, Math.min(96, p + dir * step)));
    }
  };

  // Click on a side (not on the handle) → navigate.
  const goSide = (side: "be" | "do") => {
    if (draggingRef.current) return;
    void navigate({ to: side === "be" ? "/be" : "/do" });
  };

  const beImg = isMobile ? beVertical : beHorizontal;
  const doImg = isMobile ? doVertical : doHorizontal;

  // "do" layer is clipped by inset from the opposite side.
  const doClip = isMobile
    ? `inset(${pct}% 0 0 0)`
    : `inset(0 0 0 ${pct}%)`;

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-black select-none"
      aria-label="Landing — slide between 18th- and 21st-century Manhattan"
    >
      {/* BE side — 18th century, full bleed */}
      <button
        ref={beSideRef}
        type="button"
        onClick={() => goSide("be")}
        aria-label="Enter Portfolio"
        onMouseMove={makeLensHandler(beSideRef, beBalloonRef, setBeLens)}
        onMouseLeave={() => setBeLens((l) => ({ ...l, visible: false, reveal: false }))}
        className="absolute inset-0 block h-full w-full cursor-pointer focus:outline-none"
        style={zoomOn && !isMobile ? { cursor: "zoom-in" } : undefined}
      >
        <img
          src={beImg}
          alt="Manhattan in the 18th century, seen from north to south — forests, orchard meadows, a small Dutch village."
          className="h-full w-full object-cover"
          draggable={false}
        />
        {/* Warm painterly wash + soft vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(30,25,10,0.35) 100%)",
          }}
        />
        {/* Drifting mist — light animation */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="mist mist-a" />
          <div className="mist mist-b" />
        </div>

        {/* Rainbow balloon */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden leading-none select-none">
          <span
            ref={beBalloonRef}
            className="absolute"
            style={{
              ...BALLOON_STYLE,
              opacity: beLens.reveal ? 1 : 0.55,
              animation: BALLOON_ANIM,
              transition: "opacity 180ms ease-out",
            }}
            title="Up, up and away."
          >
            🎈
          </span>
        </div>

      </button>

      {/* DO side — 21st century, clipped */}
      <button
        ref={doSideRef}
        type="button"
        onClick={() => goSide("do")}
        aria-label="Enter Privat"
        onMouseMove={makeLensHandler(doSideRef, doBalloonRef, setDoLens)}
        onMouseLeave={() => setDoLens((l) => ({ ...l, visible: false, reveal: false }))}
        className="absolute inset-0 block h-full w-full cursor-pointer focus:outline-none"
        style={{
          clipPath: doClip,
          WebkitClipPath: doClip,
          ...(zoomOn && !isMobile ? { cursor: "zoom-in" } : {}),
        }}
      >
        <img
          src={doImg}
          alt="Manhattan in the 21st century, seen from north to south — Central Park, Midtown, Lower Manhattan, the harbor."
          className="h-full w-full object-cover"
          draggable={false}
        />
        {/* Cool cinematic wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(6,10,20,0.5) 100%)",
          }}
        />
        {/* Blinking window lights — light animation */}
        <span aria-hidden className="window-light" style={{ left: "42%", top: "58%" }} />
        <span aria-hidden className="window-light window-light--slow" style={{ left: "56%", top: "63%" }} />
        <span aria-hidden className="window-light window-light--fast" style={{ left: "49%", top: "71%" }} />
        {/* A silent airliner contrail crossing the sky */}
        <span aria-hidden className="contrail" />

        {/* Rainbow balloon */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden leading-none select-none">
          <span
            ref={doBalloonRef}
            className="absolute"
            style={{
              ...BALLOON_STYLE,
              opacity: doLens.reveal ? 1 : 0.55,
              animation: BALLOON_ANIM,
              transition: "opacity 180ms ease-out",
            }}
            title="Up, up and away."
          >
            🎈
          </span>
        </div>
      </button>

      {/* Divider line + handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute bg-white/70 mix-blend-overlay"
        style={
          isMobile
            ? { left: 0, right: 0, top: `${pct}%`, height: 1, transform: "translateY(-0.5px)" }
            : { top: 0, bottom: 0, left: `${pct}%`, width: 1, transform: "translateX(-0.5px)" }
        }
      />

      {/* Handle */}
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
        className={`group absolute z-20 grid place-items-center rounded-full bg-white/85 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/80 ${
          isMobile ? "cursor-ns-resize" : "cursor-ew-resize"
        }`}
        style={
          isMobile
            ? {
                left: "50%",
                top: `${pct}%`,
                width: 68,
                height: 28,
                transform: "translate(-50%, -50%)",
              }
            : {
                top: "50%",
                left: `${pct}%`,
                width: 28,
                height: 68,
                transform: "translate(-50%, -50%)",
              }
        }
      >
        {isMobile ? (
          <span className="flex items-center gap-1 text-[10px] tracking-[0.3em] text-[#1a1a1a]">
            <span aria-hidden>▲</span>
            <span aria-hidden>▼</span>
          </span>
        ) : (
          <span className="flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] text-[#1a1a1a]">
            <span aria-hidden>◀</span>
            <span aria-hidden>▶</span>
          </span>
        )}
      </div>

      {/* Cloud title — Portfolio (over BE side) */}
      <CloudTitle
        label="Portfolio"
        side="be"
        isMobile={isMobile}
        pct={pct}
        onClick={() => goSide("be")}
      />

      {/* Cloud title — Privat (over DO side) */}
      <CloudTitle
        label="Privat"
        side="do"
        isMobile={isMobile}
        pct={pct}
        onClick={() => goSide("do")}
      />


      {/* Zoom lenses — one per side */}
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
                  left: BALLOON_STYLE.left,
                  top: BALLOON_STYLE.top,
                  fontSize: `${36 * ZOOM}px`,
                  animation: BALLOON_ANIM,
                }}
              >
                🎈
              </span>
            </div>
          </div>
        );
      })}



      {/* Zoom toggle */}
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
          className={`absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.3em] backdrop-blur-sm transition-colors ${
            zoomOn
              ? "bg-white/90 text-[#1a1a1a]"
              : "bg-black/30 text-white/85 hover:bg-black/45"
          }`}
        >
          <span aria-hidden>🔍</span>
          <span>{zoomOn ? "Zoom an" : "Zoom"}</span>
        </button>
      )}

      {/* Foot hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
        <p className="rounded-full bg-black/25 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-white/80 backdrop-blur-sm">
          {isMobile
            ? "drag ↕ · tap a side to enter"
            : zoomOn
              ? "Zoom aktiv · Maus über das linke Bild bewegen"
              : "drag ↔ · click a side to enter"}
        </p>
      </div>
    </section>
  );
}

function CloudTitle({
  label,
  side,
  isMobile,
  pct,
  onClick,
}: {
  label: string;
  side: "be" | "do";
  isMobile: boolean;
  pct: number;
  onClick: () => void;
}) {
  // Fixed at the center of each half — independent of slider position.
  const center = side === "be" ? 25 : 75;
  const pos = isMobile
    ? { top: `${center}%`, left: "50%", transform: "translate(-50%, -50%)" }
    : { top: "50%", left: `${center}%`, transform: "translate(-50%, -50%)" };


  const tone =
    side === "be"
      ? { color: "rgba(250,244,225,0.92)", shadow: "0 0 60px rgba(255,236,180,0.35)" }
      : { color: "rgba(232,238,250,0.92)", shadow: "0 0 60px rgba(160,190,240,0.35)" };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="cloud-title group absolute z-30 focus:outline-none"
      style={{ ...pos }}
      aria-label={`Enter ${label}`}
    >
      <span
        className="block text-center leading-none"
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 300,
          color: tone.color,
          textShadow: tone.shadow,
          letterSpacing: "0.02em",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
          fontSize: "clamp(1.33rem, 4.47vw, 3.8rem)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
