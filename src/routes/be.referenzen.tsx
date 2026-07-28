import { createFileRoute } from "@tanstack/react-router";
import { SubPage } from "@/components/DoSubPage";
import { motion } from "framer-motion";

const projects = [
  {
    client: "Google Cloud",
    project: "Google Roadshow DACH 2024",
    tasks: ["Projektmanagement", "Ausschreibungserstellung", "Produktionsleitung", "Locationmanagement", "Dienstleisterhandling", "Budget-Kontrolle"],
  },
  {
    client: "IAA MOBILITY",
    project: "Citizens Lab 2023",
    tasks: ["Projektmanagement", "Kundenkommunikation", "Konzeption", "Produktionsleitung", "Ausschreibungserstellung", "Dienstleister-Handling", "Budget-Kontrolle"],
  },
  {
    client: "Sport1",
    project: "Hauptversammlung 2015",
    tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"],
  },
  {
    client: "CSU",
    project: "CSU-Parteitage",
    tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Dienstleister-Handling", "Budget-Kontrolle", "Logistik"],
  },
  {
    client: "Krombacher",
    project: "Festivalauftritte 2022-2025",
    tasks: ["Projektmanagement", "Kundenkommunikation", "Konzeption", "Produktionsleitung", "Ausschreibungserstellung", "Dienstleister-Handling", "Budget-Kontrolle"],
  },
  {
    client: "Messe München",
    project: "Eröffnungsfeier neue Hallen 2018",
    tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"],
  },
  {
    client: "KRONES",
    project: "Messeauftritt gesamt 2017",
    tasks: ["Projektmanagement", "Konzeption", "Detail-Planung", "Produktionsleitung", "Ausschreibungsbearbeitung", "Dienstleister-Handling", "Budget-Kontrolle"],
  },
  {
    client: "LIEBHERR",
    project: "Liebherr-Familientag 2018",
    tasks: ["Projektmanagement", "Detail-Planung", "Produktionsleitung", "Logistik", "Dienstleister-Handling", "Budget-Kontrolle", "Personalplanung"],
  },
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
            className="group relative flex aspect-[4/5] min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#2d2a22]/10 bg-[#faf6ed] shadow-sm transition-all duration-500 hover:shadow-xl hover:scale-105 md:cursor-none cursor-trigger-zoom z-10 hover:z-50"
          >
            {/* Initial State (Client Name) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-500 group-hover:scale-110 group-hover:opacity-0 group-hover:blur-sm z-10">
              <span
                className="text-center text-xl md:text-2xl font-light tracking-wide text-[#2d2a22] break-words max-w-full hyphens-auto"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
              >
                {proj.client}
              </span>
            </div>

            {/* Hover Reveal State (Glassmorphism overlay) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 p-4 md:p-6 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 z-20">
              <span className="mb-4 text-center text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#EFECE4]/60 break-words max-w-full">
                {proj.project}
              </span>
              <ul className="flex w-full flex-col items-center gap-1.5 text-center text-[9px] md:text-[10px] uppercase tracking-wider text-[#EFECE4] overflow-y-auto custom-scrollbar">
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
