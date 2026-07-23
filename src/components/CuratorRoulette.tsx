import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export function CuratorRoulette() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showCritique, setShowCritique] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter Effekt
  useEffect(() => {
    if (showCritique && critique) {
      let i = 0;
      setDisplayedText("");
      const interval = setInterval(() => {
        if (i < critique.length) {
          setDisplayedText((prev) => prev + critique.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText("");
    }
  }, [showCritique, critique]);

  const handleSurpriseMe = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setShowCritique(false);
    setCritique(null);

    // 1. Zufälliges Bild aus dem Filmstrip wählen (0 bis 8)
    const randomIndex = Math.floor(Math.random() * 9);
    
    // 2. Event feuern, damit der Filmstrip dorthin slidet
    window.dispatchEvent(new CustomEvent("set-filmstrip-index", { detail: { index: randomIndex } }));

    // 3. Zum Filmstrip scrollen
    setTimeout(() => {
      const container = document.getElementById("filmstrip-container");
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    // 4. KI aufrufen (Wir erfinden eine pointierte Kritik passend zum Thema Architektur/Projekte)
    try {
      const prompt = `Du bist ein brillanter, aber leicht elitärer Kunstkurator auf einer Vernissage zum Thema 'Die Architektur digitaler Projekte'. 
Du betrachtest gerade ein faszinierendes architektonisches Kunstwerk (eine Blaupause, eine Stadtlandschaft oder eine Szene).
Verfasse eine kurze, pointierte Kunstkritik (max. 3-4 Sätze) über dieses Werk.
Verknüpfe dabei architektonische Metaphern (z.B. Fundament, Statik, Monolith, Ruine, gläserne Fassade) humorvoll mit IT-Projektmanagement-Begriffen (z.B. Scope Creep, Legacy Code, Agile, Wasserfall, Microservices).
Sei eloquent, analytisch und ein bisschen zynisch.
Gib NUR die fertige Kritik zurück, ohne Anführungszeichen oder Markdown.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) throw new Error("API Fehler");
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Ein Meisterwerk der Ineffizienz. Mehr kann ich dazu nicht sagen.";
      
      // Nach dem Scrollen und Laden (künstliche Verzögerung für Dramatik) anzeigen
      setTimeout(() => {
        setCritique(text.trim());
        setShowCritique(true);
        setIsAnalyzing(false);
      }, 1200); // Warten bis der Filmstrip zu Ende geslidet ist

    } catch (error) {
      setCritique("Das Netzwerk ist so fragil wie ein ungetestetes Release am Freitagabend. Bitte später erneut versuchen.");
      setTimeout(() => {
        setShowCritique(true);
        setIsAnalyzing(false);
      }, 1200);
    }
  };

  const handleClose = () => {
    setShowCritique(false);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Floating Button (Unten Rechts) */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-4 pointer-events-none">
        
        {/* Die Kritik Box */}
        <AnimatePresence>
          {showCritique && critique && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="pointer-events-auto relative w-80 md:w-96 rounded-sm border border-[#C5A059]/30 bg-[#141210]/95 p-6 shadow-2xl backdrop-blur-md widget-cursor-area"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#EFECE4]/40 hover:text-[#C5A059] transition-colors focus:outline-none"
              >
                ×
              </button>
              <div className="mb-3 flex items-center gap-2 text-[#C5A059]">
                <Search className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium">KI-Kurator Analyse</span>
              </div>
              <p className="text-sm leading-relaxed text-[#EFECE4]/90 min-h-[80px]">
                {displayedText}
                {displayedText.length < critique.length && (
                  <span className="inline-block w-1.5 h-3 ml-1 bg-[#C5A059] animate-pulse" />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Der Trigger Button */}
        <button
          onClick={handleSurpriseMe}
          disabled={isAnalyzing}
          className="pointer-events-auto group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#C5A059]/30 bg-[#141210]/90 px-6 py-3 shadow-lg backdrop-blur-sm transition-all hover:border-[#C5A059] hover:bg-[#1a1815] focus:outline-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <Search className={`h-4 w-4 text-[#C5A059] ${isAnalyzing ? 'animate-bounce' : ''}`} />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#EFECE4]">
            {isAnalyzing ? "Analysiere..." : "Werk analysieren"}
          </span>
        </button>
      </div>
    </>,
    document.body
  );
}
