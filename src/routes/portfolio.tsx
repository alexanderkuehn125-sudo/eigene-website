import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImpressumContent } from "@/components/ImpressumContent";
import { KiWorkflowContent } from "@/components/KiWorkflowContent";
import { CoffeeToProjectConverter } from "@/components/CoffeeToProjectConverter";
import { ProjectRiskScanner } from "@/components/ProjectRiskScanner";
import { WidgetContainer } from "@/components/WidgetContainer";
import { NetworkBackground } from "@/components/NetworkBackground";
import { ContactForm } from "@/components/ContactForm";
import portrait from "@/assets/Portrait.jpg";
import kronesLogo from "@/assets/krones.svg";

export const Route = createFileRoute("/portfolio")({
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

type Project = {
  client: string;
  clientNode?: React.ReactNode;
  idleNode?: React.ReactNode;
  project: string;
  tasks: string[];
  color: string;
  bgColor: string;
};

const projects = [
  { 
    client: "Google Cloud", 
    clientNode: (
      <>
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
        <span className="text-[#EFECE4]"> Cloud</span>
      </>
    ),
    project: "Google Roadshow DACH 2024", 
    tasks: ["Projektmanagement", "Ausschreibungserstellung", "Produktionsleitung", "Locationmanagement", "Dienstleisterhandling", "Budget-Kontrolle"], 
    color: "",
    bgColor: "bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05]"
  },
  { client: "IAA MOBILITY", project: "Citizens Lab 2023", tasks: ["Projektmanagement", "Kundenkommunikation", "Konzeption", "Produktionsleitung", "Ausschreibungserstellung", "Dienstleister-Handling", "Budget-Kontrolle"], color: "text-[#0096D6]", bgColor: "bg-[#0096D6]" },
  { 
    client: "Sport1 MEDIEN", 
    clientNode: (
      <div className="flex flex-col items-center">
        <span className="text-xl md:text-2xl font-black italic lowercase tracking-tighter text-[#EFECE4]">sport1</span>
        <div className="h-[1px] w-[80%] bg-[#EFECE4]/50 my-1"></div>
        <span className="text-[9px] md:text-[10px] font-normal uppercase tracking-[0.3em] text-[#EFECE4]/80 ml-[0.3em]">Medien</span>
      </div>
    ),
    project: "Hauptversammlung 2015", 
    tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], 
    color: "text-[#EFECE4]", 
    bgColor: "bg-[#111111]" 
  },
  { client: "CSU", project: "CSU-Parteitage", tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Dienstleister-Handling", "Budget-Kontrolle", "Logistik"], color: "text-[#0070B9]", bgColor: "bg-[#0070B9]" },
  { client: "Krombacher", project: "Festivalauftritte 2022-2025", tasks: ["Projektmanagement", "Kundenkommunikation", "Konzeption", "Produktionsleitung", "Ausschreibungserstellung", "Dienstleister-Handling", "Budget-Kontrolle"], color: "text-[#D4AF37]", bgColor: "bg-[#D4AF37]" },
  { client: "Messe München", project: "Eröffnungsfeier neue Hallen 2018", tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], color: "text-[#004A99]", bgColor: "bg-[#004A99]" },
  { 
    client: "KRONES", 
    idleNode: <img src={kronesLogo} alt="KRONES" className="h-5 md:h-6 w-auto object-contain brightness-0 invert opacity-90" />,
    clientNode: <img src={kronesLogo} alt="KRONES" className="h-6 md:h-8 w-auto object-contain brightness-0 invert" />,
    project: "Messeauftritt gesamt 2017", 
    tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], 
    color: "text-[#EFECE4]", 
    bgColor: "bg-[#0055A5]" 
  },
  { client: "LIEBHERR", project: "Liebherr-Familientag 2018", tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Logistik", "Dienstleister-Handling", "Budget-Kontrolle", "Personalplanung"], color: "text-[#FFCC00]", bgColor: "bg-[#FFCC00]" },
];

function HoverRevealGrid() {
  return (
    <>
      <style>{`
        @keyframes smoothPulse {
          0%, 100% { 
            box-shadow: inset 0 0 10px rgba(255,255,255,0.02), 0 0 0px rgba(255,255,255,0); 
            border-color: rgba(255,255,255,0.08); 
          }
          50% { 
            box-shadow: inset 0 0 40px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.3); 
            border-color: rgba(255,255,255,0.9); 
          }
        }
        .animate-smooth-pulse {
          animation: smoothPulse 5s ease-in-out infinite;
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16 mb-12">
        {projects.map((proj, i) => (
          <div
            key={i}
            tabIndex={0}
            className="group relative flex aspect-square w-full items-center justify-center md:cursor-none cursor-trigger-zoom z-10 hover:z-50 focus:z-50 focus:outline-none"
          >
            {/* Base Tile (Idle State) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 ${proj.bgColor} transition-all duration-500 group-hover:scale-95 group-hover:opacity-0 group-hover:blur-sm group-focus:scale-95 group-focus:opacity-0 group-focus:blur-sm animate-smooth-pulse`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
            {/* White Text or Logo Layer */}
            <div className="flex items-center justify-center">
              {proj.idleNode ? proj.idleNode : (
                <span
                  className="text-center text-xl md:text-2xl font-light tracking-wider text-[#EFECE4]/90"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  {proj.client}
                </span>
              )}
            </div>
          </div>

          {/* Pop-Out Overlay (Hover State) */}
          <div className="absolute inset-4 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-6 opacity-0 shadow-[0_30px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] group-hover:-inset-10 md:group-hover:-inset-16 lg:group-hover:-inset-20 group-hover:opacity-100 group-focus:-inset-10 md:group-focus:-inset-16 lg:group-focus:-inset-20 group-focus:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto">
            
            {/* Client Name in Full Color */}
            <span
              className={`mb-2 text-center text-xl md:text-2xl font-normal tracking-wider ${proj.color && proj.color.includes('bg-clip') ? proj.color : ''}`}
              style={proj.color && proj.color.includes('bg-clip') ? { fontFamily: "'Jost', sans-serif" } : { fontFamily: "'Jost', sans-serif", color: proj.color ? proj.color.replace('text-[', '').replace(']', '') : '#EFECE4' }}
            >
              {proj.clientNode ? proj.clientNode : proj.client}
            </span>

            <span className="mb-5 text-center text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-[#EFECE4]/60">
              {proj.project}
            </span>
            <ul className="flex w-full flex-col items-center gap-2 md:gap-2.5 text-center text-[11px] md:text-[13px] font-medium tracking-wide text-[#EFECE4]">
              {proj.tasks.map((task, j) => (
                <li key={j} className="opacity-100 leading-snug">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    </>
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
          Nach mehr als 15 Jahren in Projektverantwortung weiß ich: Die besten Ergebnisse entstehen dort, wo man das große Ganze im Blick behält, ohne die Menschen dahinter aus den Augen zu verlieren.
        </p>
        <p className="mb-6">
          Ohne den Überblick zu verlieren, verstehe ich mich als Vermittler an den Schnittstellen komplexer Vorhaben. Mit einem soliden technischen Hintergrund und fundiertem PM-Handwerk steuere ich Abläufe so, dass aus vielen einzelnen Anforderungen eine klare Richtung wird. Dabei halte ich Teams den Rücken frei, höre zu und schaffe Räume, in denen alle fokussiert und verlässlich arbeiten können – auch wenn es mal hektischer wird.
        </p>
        <p>
          Mich treibt eine gesunde Neugier auf moderne Workflows an, immer mit dem Anspruch, neue Ansätze pragmatisch zu nutzen. Keine Buzzwords, sondern ehrlicher Austausch auf Augenhöhe, Bodenständigkeit und der lösungsorientierte Blick für das Wesentliche.
        </p>
      </>
    ),
  },
  {
    n: "02",
    label: "Skills",
    slug: "skills",
    body: (
      <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed">
        <div>
          <strong className="block mb-3 text-lg font-medium tracking-wide">1. Projekt- & Eventmanagement</strong>
          <p className="opacity-80 mb-2"><span className="font-medium text-white opacity-100">Ganzheitliche Projektsteuerung:</span> Von der ersten Konzeption und Budgetierung bis zur operativen Umsetzung.</p>
          <p className="opacity-80 mb-2"><span className="font-medium text-white opacity-100">Schnittstellenkompetenz:</span> Erfahrene Vermittlung zwischen Agenturen, Unternehmensseite, Dienstleistern und Technik-Teams, sowie Stakeholder-Management.</p>
          <p className="opacity-80"><span className="font-medium text-white opacity-100">Risiko- & Krisenmanagement:</span> Souveränes Handeln und schnelle Lösungsfindung in hektischen Live-Phasen.</p>
        </div>
        
        <div>
          <strong className="block mb-3 text-lg font-medium tracking-wide">2. Methodik & Agiles Arbeiten</strong>
          <p className="opacity-80 mb-2"><span className="font-medium text-white opacity-100">Agile Leadership:</span> Agiles Projektverständnis, pragmatische Prozessgestaltung und teamorientierte Führung auf Augenhöhe.</p>
          <p className="opacity-80"><span className="font-medium text-white opacity-100">Prozessoptimierung:</span> Analyse und Strukturierung komplexer Abläufe zur spürbaren Entlastung von Teams.</p>
        </div>

        <div>
          <strong className="block mb-3 text-lg font-medium tracking-wide">3. Digitale Workflows & KI-Integration</strong>
          <p className="opacity-80 mb-2"><span className="font-medium text-white opacity-100">AI & Prozess-Tools:</span> Praktische Anwendung von KI-gestützten Workflows (u. a. Prompt Engineering, KI-gestütztes Wissensmanagement) im Projektalltag.</p>
          <p className="opacity-80"><span className="font-medium text-white opacity-100">Digitales Vertriebsmanagement:</span> Digitalisierung von Vertriebsprozessen und Kunden-Schnittstellen-Kommunikation.</p>
        </div>

        <div>
          <strong className="block mb-3 text-lg font-medium tracking-wide">4. Technische Expertise</strong>
          <p className="opacity-80 mb-2"><span className="font-medium text-white opacity-100">Veranstaltungs- & Veranstaltungstechnik:</span> Fundiertes technisches Grundverständnis für die detaillierte Planung und Umsetzung.</p>
          <p className="opacity-80"><span className="font-medium text-white opacity-100">CAD & Fachsoftware:</span> Technisches Verständnis und Praxis-Erfahrung mit CAD-Anwendungen (u. a. Vectorworks / AutoCAD).</p>
        </div>
      </div>
    ),
  },
  {
    n: "03",
    label: "Projekte",
    slug: "referenzen",
    body: (
      <>
        <p className="mb-6">
          Eine exemplarische Übersicht der letzten 10 Jahre. Für detaillierte Einblicke navigieren Sie mit dem Cursor über die einzelnen Projekte, um die spezifischen Aufgabenbereiche einzusehen.
        </p>
        <HoverRevealGrid />
      </>
    ),
  },
] as const;

function BePage() {
  const [modalOpen, setModalOpen] = useState<"kontakt" | "impressum" | "kiworkflow" | "menu" | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
      className="min-h-screen w-full relative bg-[#050504] text-[#EFECE4] overflow-clip md:[&_a]:cursor-none md:[&_button]:cursor-none"
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


      {/* Global Ghost Portrait Background - Sticky Hack for Framer Motion Filter bug */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end items-start">
        <figure
          className="sticky top-0 h-screen w-full md:w-1/2 pointer-events-none"
          style={{
            opacity: 0.06,
            animation: "ghostFadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards"
          }}
        >
          <img
            src={portrait}
            alt="Alexander Kühn"
            draggable={false}
            className="h-full w-full object-cover object-center md:object-right mix-blend-screen"
            style={{
              filter: "grayscale(100%) contrast(1.3) brightness(1.2)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 100%, black 20%, transparent 70%)",
              maskImage: "radial-gradient(ellipse at 50% 100%, black 20%, transparent 70%)",
            }}
          />
        </figure>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-12 px-6 pt-12 pb-5 md:grid-cols-12 md:gap-20 md:px-12 md:pt-24 md:pb-8 page-transition-enter">
        {/* Link zur Ausstellung oben rechts (Desktop & Mobile) */}
        <Link
          to="/ausstellung"
          className="absolute right-6 top-12 md:right-12 md:top-24 z-50 text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
        >
          Ausstellung →
        </Link>

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
                <p className="text-[13px] uppercase tracking-[0.2em] opacity-80 leading-loose">
                  Projektmanagement.
                  <br />
                  Event.
                  <br />
                  KI & Digital.
                </p>
                <div className="text-[10px] uppercase tracking-[0.15em] opacity-50 leading-relaxed max-w-[150px]">
                  dipl. Eventmanager (IST)
                  <br />
                  Berater digitales Vertriebsmanagement und KI (IHK)
                </div>
              </div>
            </div>

            {/* Widget Area: Bottom Left / Mobile Right */}
            <WidgetContainer>
              <CoffeeToProjectConverter />
              <ProjectRiskScanner />
            </WidgetContainer>

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

              <button
                type="button"
                className="group flex items-baseline gap-4 text-left"
                onClick={() => setModalOpen("kiworkflow")}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] opacity-50 transition-opacity group-hover:opacity-100">
                  06
                </span>
                <span
                  className="text-xl tracking-wide opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  KI-Workflow Website
                </span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Rechte Spalte: Content (Scrollable) */}
        <section className="col-span-1 md:col-span-8 lg:col-span-7 md:col-start-6 pb-0 md:pt-32 relative">
          {/* Subtle Grafik für das 'schwarze Loch' oben */}
          <NetworkBackground />
          
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
      {mounted && createPortal(
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="be-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 md:cursor-none cursor-trigger-close"
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
                className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-2xl border border-white/5 bg-[#1A1918] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:p-12 md:[&_a]:cursor-none md:[&_button]:cursor-none cursor-content-area md:cursor-none custom-scrollbar"
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

            {modalOpen !== "kiworkflow" && (
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
            )}

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
                
                <button
                  type="button"
                  className="flex flex-col gap-1 text-left"
                  onClick={() => setModalOpen("kiworkflow")}
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-50">06</span>
                  <span
                    className="text-3xl tracking-wide opacity-90"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    KI-Workflow Website
                  </span>
                </button>
              </nav>
            ) : modalOpen === "kontakt" ? (
              <div className="text-base md:text-lg lg:text-xl leading-relaxed opacity-80 max-w-2xl font-light">

                <ContactForm />
              </div>
            ) : modalOpen === "impressum" ? (
              <ImpressumContent />
            ) : (
              <KiWorkflowContent />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
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
      } else if (el.closest(".cursor-trigger-close") && !el.closest(".cursor-content-area")) {
        state = "close";
      } else if (el.closest(".widget-cursor-area") && el.closest("a, button, input")) {
        state = "widget";
      } else if (el.closest("input") || el.closest("textarea")) {
        state = "input";
      } else if (el.closest("a, button")) {
        state = "hover";
      } else if (el.closest(".cursor-content-area")) {
        state = "content";
      } else {
        state = "default";
      }

      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (cursorRef.current && ringRef.current && textRef.current) {
          const dot = document.getElementById("cursor-dot-be");
          // Positioniert den Container extrem schnell und ohne Delay am Mauszeiger
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

          // Animiert sanft die Skalierung und Sichtbarkeit des inneren Rings
          if (state === "default") {
            ringRef.current.style.opacity = "0";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "0";
          } else if (state === "content") {
            ringRef.current.style.opacity = "1";
            ringRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
            textRef.current.innerText = "";
            if (dot) dot.style.opacity = "1";
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
          id="cursor-dot-be"
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
