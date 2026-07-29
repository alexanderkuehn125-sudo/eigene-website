import React from "react";
import { motion } from "framer-motion";

export function NetworkBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0 opacity-50 md:opacity-100">
      {/* Sanftes, wärmendes Radial-Glow (Aura) */}
      <div 
        className="absolute top-[-100px] right-[-100px] md:top-[-50px] md:right-[10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0) 70%)",
          filter: "blur(40px)"
        }}
      />
      
      {/* Abstraktes Linien-Netz (Neuronales Netzwerk / Topografie) */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(197,160,89,0.6)" />
            <stop offset="50%" stopColor="rgba(197,160,89,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Netz-Linien */}
          <path d="M 1000 50 Q 800 100, 700 250 T 400 450" fill="none" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <path d="M 1000 150 Q 850 150, 750 350 T 500 550" fill="none" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <path d="M 850 -50 Q 750 50, 600 200 T 350 400" fill="none" stroke="url(#line-gradient)" strokeWidth="0.5" />
          <path d="M 900 100 L 700 250 L 750 350 L 500 550" fill="none" stroke="rgba(197,160,89,0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M 700 250 L 600 200" fill="none" stroke="rgba(197,160,89,0.15)" strokeWidth="0.5" />
          
          {/* Knotenpunkte (Nodes) */}
          <circle cx="700" cy="250" r="2.5" fill="rgba(197,160,89,0.5)" />
          <circle cx="750" cy="350" r="1.5" fill="rgba(197,160,89,0.4)" />
          <circle cx="600" cy="200" r="2" fill="rgba(197,160,89,0.6)" />
          <circle cx="400" cy="450" r="1.5" fill="rgba(197,160,89,0.3)" />
          
          {/* Pulsierender Hauptknoten */}
          <motion.circle 
            cx="700" cy="250" r="8" 
            fill="none" 
            stroke="rgba(197,160,89,0.4)" 
            strokeWidth="0.5"
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
