import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function WidgetContainer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 md:top-auto md:right-auto md:bottom-6 md:left-6 z-[90] pointer-events-auto flex flex-col md:flex-row gap-4 items-end md:items-center">
      {children}
    </div>,
    document.body
  );
}
