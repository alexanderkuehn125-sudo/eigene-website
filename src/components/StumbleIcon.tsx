import React from "react";

export const StumbleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    {/* Warning Triangle */}
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    
    {/* Slipping Person Head */}
    <circle cx="13" cy="9" r="1.2" fill="currentColor" />
    
    {/* Slipping Person Body & Limbs */}
    <path d="M12 11 l -1 3 l -2 1.5" /> {/* Body to forward leg */}
    <path d="M11 14 l 2 2.5 l -0.5 1.5" /> {/* Back leg */}
    <path d="M12 11 l -2 -1" /> {/* Back arm */}
    <path d="M12 11 l 2.5 1" /> {/* Forward arm */}
    
    {/* Slippery surface / puddle */}
    <path d="M8 18.5 c 2 1.5, 6 1.5, 8 0" />
  </svg>
);
