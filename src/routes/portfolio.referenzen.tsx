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
  { client: "KRONES", project: "Messeauftritt gesamt 2017", tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"], color: "text-[#0055A5]", bgColor: "bg-[#0055A5]" },
  { client: "LIEBHERR", project: "Liebherr-Familientag 2018", tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Logistik", "Dienstleister-Handling", "Budget-Kontrolle", "Personalplanung"], color: "text-[#FFCC00]", bgColor: "bg-[#FFCC00]" },
];

export const Route = createFileRoute("/portfolio/referenzen")({
  head: () => ({
    meta: [
      { title: "Projekte — Portfolio" },
      { name: "description", content: "Projekte, Partner, Stimmen." },
    ],
  }),
  component: () => (
    <SubPage
      section={{
        slug: "referenzen",
        eyebrow: "03 · Projekte",
        title: "Projekte & Aufgaben.",
        body: "Ein Auszug der letzten 10 Jahre. Eine exemplarische Übersicht ausgewählter Partner und meiner spezifischen Verantwortlichkeiten.",
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
            tabIndex={0}
            className="group relative flex aspect-square w-full items-center justify-center md:cursor-none cursor-trigger-zoom z-10 hover:z-50 focus:z-50 focus:outline-none"
          >
          {/* Base Tile (Idle State) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 ${proj.bgColor} transition-all duration-500 group-hover:scale-95 group-hover:opacity-0 group-hover:blur-sm group-focus:scale-95 group-focus:opacity-0 group-focus:blur-sm animate-smooth-pulse`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            {/* White Text Layer */}
            <span
              className="text-center text-xl md:text-2xl font-light tracking-wider text-[#EFECE4]/90"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              {proj.client}
            </span>
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
        </motion.div>
        ))}
      </div>
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
    </SubPage>
  ),
});
