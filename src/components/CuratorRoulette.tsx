import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Image as ImageIcon } from "lucide-react";
import type { Photo } from "@/routes/do";

export function CuratorRoulette({ photos }: { photos: Photo[] }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showCritique, setShowCritique] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  return createPortal(
    <>
      {/* Das Modal mit dem analysierten Bild */}
      {showCritique && (
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
        </div>
      )}

      {/* Floating Button (Unten Rechts) */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-4 pointer-events-none">
        <motion.button
          onClick={handleSurpriseMe}
          disabled={isAnalyzing || showCritique}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-auto group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#C5A059]/30 bg-[#141210]/90 px-6 py-3 shadow-lg backdrop-blur-sm transition-all hover:border-[#C5A059] hover:bg-[#1a1815] focus:outline-none disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <Search className={`h-4 w-4 text-[#C5A059] ${isAnalyzing && !showCritique ? 'animate-bounce' : ''}`} />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#EFECE4]">
            {isAnalyzing && !showCritique ? "Analysiere..." : "Werk analysieren"}
          </span>
        </motion.button>
      </div>
    </>,
    document.body
  );
}
