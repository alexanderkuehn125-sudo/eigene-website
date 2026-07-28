import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";
import { motion } from "framer-motion";

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
    glow: "rgba(66, 133, 244, 0.15)", 
    color: "" 
  },
  { client: "IAA MOBILITY", project: "Citizens Lab 2023", tasks: ["Projektmanagement", "Kundenkommunikation", "Konzeption", "Produktionsleitung", "Ausschreibungserstellung", "Dienstleister-Handling", "Budget-Kontrolle"], glow: "rgba(0, 150, 214, 0.15)", color: "text-[#0096D6]" },
  { client: "Sport1", project: "Hauptversammlung 2015", tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], glow: "rgba(237, 28, 36, 0.15)", color: "text-[#ED1C24]" },
  { client: "CSU", project: "CSU-Parteitage", tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Dienstleister-Handling", "Budget-Kontrolle", "Logistik"], glow: "rgba(0, 112, 185, 0.15)", color: "text-[#0070B9]" },
  { client: "Krombacher", project: "Festivalauftritte 2022-2025", tasks: ["Projektmanagement", "Kundenkommunikation", "Konzeption", "Produktionsleitung", "Ausschreibungserstellung", "Dienstleister-Handling", "Budget-Kontrolle"], glow: "rgba(212, 175, 55, 0.15)", color: "text-[#D4AF37]" },
  { client: "Messe München", project: "Eröffnungsfeier neue Hallen 2018", tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], glow: "rgba(0, 74, 153, 0.15)", color: "text-[#004A99]" },
  { client: "KRONES", project: "Messeauftritt gesamt 2017", tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], glow: "rgba(0, 85, 165, 0.15)", color: "text-[#0055A5]" },
  { client: "LIEBHERR", project: "Liebherr-Familientag 2018", tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Logistik", "Dienstleister-Handling", "Budget-Kontrolle", "Personalplanung"], glow: "rgba(255, 204, 0, 0.15)", color: "text-[#FFCC00]" },
];

export const Route = createFileRoute("/be/referenzen")({
  head: () => ({
    meta: [
      { title: "Exemplarische Projekte — Portfolio" },
      { name: "description", content: "Projekte, Partner, Stimmen." },
    ],
  }),
  component: () => (
    <SubPage
      section={{
        slug: "referenzen",
        eyebrow: "03 · Exemplarische Projekte",
        title: "Projekte & Aufgaben.",
        body: "Ein Auszug der letzten 10 Jahre. Eine Übersicht ausgewählter Partner und meiner spezifischen Verantwortlichkeiten.",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full pb-10">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex aspect-square w-full items-center justify-center md:cursor-none cursor-trigger-zoom z-10 hover:z-50"
          >
          {/* Base Tile (Idle State) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#141312] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:scale-95 group-hover:opacity-0 group-hover:blur-sm"
            style={{ boxShadow: `inset 0 0 40px ${proj.glow}, inset 0 0 2px rgba(255,255,255,0.05)` }}
          >
            {/* White Text Layer */}
            <span
              className="absolute text-center text-xl md:text-2xl font-light tracking-wider text-[#EFECE4]/90 transition-opacity duration-300 group-hover:opacity-0"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              {proj.client}
            </span>
            {/* Colored Brand Text Layer (Fades in on early hover before popup covers it) */}
            <span
              className={`absolute text-center text-xl md:text-2xl font-light tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${proj.color && proj.color.includes('bg-clip') ? proj.color : ''}`}
              style={proj.color && proj.color.includes('bg-clip') ? { fontFamily: "'Jost', sans-serif", fontWeight: 300 } : { fontFamily: "'Jost', sans-serif", fontWeight: 300, color: proj.color ? proj.color.replace('text-[', '').replace(']', '') : undefined }}
            >
              {proj.clientNode ? proj.clientNode : proj.client}
            </span>
          </div>

          {/* Pop-Out Overlay (Hover State) */}
          <div className="absolute inset-4 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-6 opacity-0 shadow-[0_30px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] group-hover:-inset-4 md:group-hover:-inset-6 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
            <span className="mb-4 text-center text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#EFECE4]/60">
              {proj.project}
            </span>
            <ul className="flex w-full flex-col items-center gap-1.5 md:gap-2 text-center text-[9px] md:text-[10px] uppercase tracking-wider text-[#EFECE4]">
              {proj.tasks.map((task, j) => (
                <li key={j} className="opacity-90 leading-tight">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        ))}
      </div>
    </SubPage>
  ),
});
