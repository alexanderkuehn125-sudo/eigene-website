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
      
      {/* Filigranes Linien-Netz */}
      <svg className="absolute top-0 left-0 w-full h-full z-10" viewBox="0 0 800 300" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(197,160,89,0.8)" />
            <stop offset="50%" stopColor="rgba(197,160,89,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          {/* Hauchdünne Netz-Linien (organisch fließend) */}
          <path d="M 100 0 Q 300 50, 400 150 T 700 250" fill="none" stroke="url(#line-gradient-subtle)" strokeWidth="0.8" />
          <path d="M 200 0 Q 400 80, 500 200 T 800 250" fill="none" stroke="url(#line-gradient-subtle)" strokeWidth="0.5" />
          <path d="M 50 50 Q 250 100, 350 200" fill="none" stroke="url(#line-gradient-subtle)" strokeWidth="0.8" />
          
          {/* Querverbindungen */}
          <path d="M 400 150 L 500 200 L 350 200" fill="none" stroke="rgba(197,160,89,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
          
          {/* Dezente Knotenpunkte */}
          <circle cx="400" cy="150" r="2" fill="rgba(197,160,89,0.8)" />
          <circle cx="500" cy="200" r="1.5" fill="rgba(197,160,89,0.6)" />
          <circle cx="350" cy="200" r="1.5" fill="rgba(197,160,89,0.5)" />
          
          {/* Pulsierender Hauptknoten */}
          <motion.circle 
            cx="400" cy="150" r="6" 
            fill="none" 
            stroke="rgba(197,160,89,0.5)" 
            strokeWidth="0.5"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
