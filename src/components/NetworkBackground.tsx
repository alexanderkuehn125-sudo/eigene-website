import React from "react";
import { motion } from "framer-motion";

export function NetworkBackground() {
  return (
    <div 
      className="absolute top-0 left-0 w-[120%] h-[300px] pointer-events-none z-0 opacity-40 md:opacity-70 -ml-[10%]"
      style={{
        // Diese Maske lässt die Linien nach unten und an den Seiten weich ausblenden
        maskImage: "radial-gradient(ellipse at top center, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at top center, black 20%, transparent 70%)"
      }}
    >
      {/* Sanftes, wärmendes Radial-Glow (Aura) */}
      <div 
        className="absolute top-0 left-[20%] w-[400px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(197,160,89,0.1) 0%, rgba(197,160,89,0) 70%)",
          filter: "blur(40px)"
        }}
      />
      
      {/* Originales Linien-Netz (angepasst auf die neue Position) */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-80 z-10" viewBox="0 0 800 300" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(197,160,89,1)" />
            <stop offset="50%" stopColor="rgba(197,160,89,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Netz-Linien (verschoben & skaliert in den linken Bereich) */}
          <path d="M 800 0 Q 500 50, 300 150 T 150 250" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" />
          <path d="M 800 50 Q 600 100, 400 200 T 250 300" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" />
          <path d="M 600 -50 Q 400 0, 200 100 T 50 250" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" />
          
          {/* Kantige Querverbindungen */}
          <path d="M 500 50 L 300 150 L 400 200 L 250 300" fill="none" stroke="rgba(197,160,89,0.5)" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M 300 150 L 200 100" fill="none" stroke="rgba(197,160,89,0.4)" strokeWidth="1.5" />
          
          {/* Knotenpunkte (Nodes) */}
          <circle cx="300" cy="150" r="3.5" fill="rgba(197,160,89,1)" />
          <circle cx="400" cy="200" r="2.5" fill="rgba(197,160,89,0.8)" />
          <circle cx="200" cy="100" r="3" fill="rgba(197,160,89,0.9)" />
          <circle cx="150" cy="250" r="2.5" fill="rgba(197,160,89,0.7)" />
          
          {/* Pulsierender Hauptknoten */}
          <motion.circle 
            cx="300" cy="150" r="12" 
            fill="none" 
            stroke="rgba(197,160,89,0.8)" 
            strokeWidth="1"
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
