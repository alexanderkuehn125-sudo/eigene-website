import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Image as ImageIcon } from "lucide-react";
import type { Photo } from "@/routes/do";

interface CuratorRouletteProps {
  photos: Photo[];
  mobileInline?: boolean;
}

export function CuratorRoulette({ photos, mobileInline = false }: CuratorRouletteProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showCritique, setShowCritique] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter Effekt
  useEffect(() => {
    if (showCritique && critique) {
      let i = 0;
      setDisplayedText("");
      const interval = setInterval(() => {
        setDisplayedText(critique.substring(0, i + 1));
        i++;
        if (i >= critique.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText("");
    }
  }, [showCritique, critique]);

  const handleSurpriseMe = async () => {
    if (isAnalyzing || !photos || photos.length === 0) return;
    
    setIsAnalyzing(true);
    setShowCritique(true);
    setCritique(null);

    // 1. Zufälliges Bild wählen
    const randomIndex = Math.floor(Math.random() * photos.length);
    const photo = photos[randomIndex];
    setSelectedPhoto(photo);

    // 2. KI aufrufen (Kritik an einer Fotografie, KEIN Projektmanagement)
    try {
      const prompt = `Du bist ein elitärer, leicht zynischer aber hochintelligenter Kunstkritiker auf einer Fotografie-Ausstellung von Alexander Kühn.
Das ausgestellte Werk stammt aus der Kategorie "${photo.category}".
Verfasse eine kurze, pointierte Kunstkritik (max. 3-4 Sätze) über die Bildkomposition.
Denke dir zwingend einen eigenen, extrem prätentiösen und leicht ironischen Titel für dieses Werk aus.
WICHTIG: Achte auf makellose Rechtschreibung, Grammatik und fehlerfreies Deutsch!
Verzichte auf zu obskure oder schwer verständliche Fachbegriffe. Schreibe stattdessen zugänglich, aber extrem witzig, überspitzt und unterhaltsam.
Erwähne KEINERLEI IT-Begriffe, kein Projektmanagement, kein Scrum oder Ähnliches. Bleibe strikt in der Welt der Kunst und Fotografie.
Gib AUSSCHLIESSLICH valides JSON zurück, ohne Markdown-Formatierung (wie \`\`\`json). Das JSON muss exakt so aussehen:
{
  "titel": "Dein erfundener Titel (ohne Anführungszeichen)",
  "kritik": "Deine fehlerfreie Kunstkritik..."
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
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
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      let finalCritique = "Ein Meisterwerk der Ineffizienz. Mehr kann ich dazu nicht sagen.";
      try {
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanedText);
        finalCritique = `„${parsed.titel}“\n\n${parsed.kritik}`;
      } catch (e) {
        finalCritique = text.trim();
      }
      
      setCritique(finalCritique);
      setIsAnalyzing(false);
    } catch (error) {
      setCritique("Das kreative Netzwerk ist aktuell überlastet. Der Kurator benötigt eine kurze Pause.");
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setShowCritique(false);
    // Nach kurzer Fade-Out-Zeit das Bild leeren
    setTimeout(() => {
      setSelectedPhoto(null);
      setCritique(null);
      setDisplayedText("");
    }, 300);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Das Modal mit dem analysierten Bild */}
      {showCritique && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 cursor-default transition-opacity duration-300"
            style={{
              background: "rgba(20, 18, 15, 0.95)",
              backdropFilter: "blur(12px)",
            }}
            onClick={handleClose}
          />
          
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex w-full max-w-5xl flex-col lg:flex-row max-h-[90vh] overflow-y-auto lg:overflow-hidden rounded-sm border border-[#C5A059]/20 bg-[#050504] shadow-2xl pointer-events-auto widget-cursor-area"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bild-Bereich (Links) */}
              <div className="w-full lg:w-3/5 bg-black/50 p-6 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-[#C5A059]/20 min-h-[300px]">
                {selectedPhoto ? (
                  <img 
                    src={selectedPhoto.src} 
                    alt={selectedPhoto.title} 
                    className="max-h-[50vh] lg:max-h-[80vh] w-auto max-w-full object-contain rounded-sm shadow-2xl"
                  />
                ) : (
                  <div className="animate-pulse flex items-center justify-center w-full h-full text-[#C5A059]/50">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              
              {/* Text-Bereich (Rechts) */}
              <div className="w-full lg:w-2/5 p-8 flex flex-col relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-[#EFECE4]/40 hover:text-[#C5A059] transition-colors focus:outline-none"
                  aria-label="Schließen"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mb-6 flex items-center gap-3 text-[#C5A059]">
                  <Search className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-[0.2em] font-medium">KI-Kurator Analyse</span>
                </div>
                
                {/* Dateinamen/Kategorie werden hier auf Nutzer-Wunsch bewusst nicht mehr gerendert, da sie kryptisch wirken können */}
                <div className="flex-1 overflow-y-auto pr-2">
                  <p className="text-sm md:text-base leading-relaxed text-[#EFECE4]/90">
                    {isAnalyzing && !critique && (
                      <span className="animate-pulse text-[#C5A059]/70 font-mono text-xs tracking-wider uppercase">Betrachtet das Werk...</span>
                    )}
                    {displayedText}
                    {displayedText.length < (critique?.length || 0) && critique && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-[#C5A059] animate-pulse align-middle" />
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}

      {/* Button Wrapper */}
      {(() => {
        const buttonContent = (
          <div 
            className={
              mobileInline 
                ? "flex flex-col items-center w-full mb-6 pointer-events-none md:hidden" 
                : "fixed bottom-6 right-6 md:bottom-6 md:right-6 z-[90] flex-col items-end gap-4 pointer-events-none hidden md:flex"
            }
          >
            <button
              onClick={handleSurpriseMe}
              disabled={isAnalyzing || showCritique}
              className="pointer-events-auto group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/20 px-5 py-2.5 md:px-6 md:py-3 shadow-[0_0_20px_rgba(197,160,89,0.25)] hover:shadow-[0_0_35px_rgba(197,160,89,0.45)] transition-all hover:border-white/40 focus:outline-none disabled:opacity-50 cursor-none"
            >
              {/* Smooth Glowing Pulse */}
              <motion.div
                initial={{ scale: 1.5 }}
                animate={{ opacity: [0.3, 0.65, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-20 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(180deg, rgba(197,160,89,0.1) 0%, rgba(225,185,115,0.3) 50%, rgba(197,160,89,0.1) 100%)",
                  filter: "blur(10px)",
                }}
              />
              
              <Search className={`h-[14px] w-[14px] text-[#EFECE4] opacity-80 group-hover:opacity-100 transition-opacity shrink-0 ${isAnalyzing && !showCritique ? 'animate-bounce' : ''}`} />
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-[#EFECE4] opacity-80 group-hover:opacity-100 transition-opacity">
                {isAnalyzing && !showCritique ? "Analysiere..." : "Werk analysieren"}
              </span>
            </button>
          </div>
        );

        if (!mounted) return mobileInline ? buttonContent : null;
        return mobileInline ? buttonContent : createPortal(buttonContent, document.body);
      })()}
    </>
  );
}
