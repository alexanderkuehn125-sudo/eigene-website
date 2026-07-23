import { useState } from "react";
import { createPortal } from "react-dom";
import { Coffee, Sparkles, X, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PrognoseResult {
  prognose: string;
  status_titel: string;
  ki_schritt: string;
  punchline: string;
}

export function CoffeeToProjectConverter() {
  const [isOpen, setIsOpen] = useState(false);
  const [coffee, setCoffee] = useState(4);
  const [chaos, setChaos] = useState(3);
  const [days, setDays] = useState(3);
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PrognoseResult | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const prompt = `Du bist der 'Kaffee-zu-Projekt-Konverter' auf einem Projektmanager-Portfolio. Generiere aus den Parametern Kaffee (${coffee} Tassen), Chaos (${chaos} von 5) und Resttage (${days} Tage) eine witzige, treffende Projekt-Prognose im JSON-Format mit genau folgenden Feldern:
- prognose: Humorvolle Situationsbeschreibung
- status_titel: Witziger Team-Status
- ki_schritt: Ein konkreter agiler Tipp, wie KI das Chaos strukturiert
- punchline: Exakt der Wortlaut 'KI bringt das Tempo, Erfahrung die Struktur – so wird aus Koffein echter Fortschritt.'
Gib AUSSCHLIESSLICH valides JSON zurück, ohne Markdown-Formatierung wie \`\`\`json.`;

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

      if (!response.ok) {
        throw new Error("API Anfrage fehlgeschlagen");
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Cleanup falls das Modell doch Markdown zurückgibt
      const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanedText) as PrognoseResult;
      
      setResult(parsed);
    } catch (error) {
      console.error(error);
      setResult({
        prognose: "Die API scheint gerade eine Kaffeepause zu machen. Bitte überprüfe den API-Key oder versuche es später nochmal.",
        status_titel: "System-Fehler 418: I'm a teapot",
        ki_schritt: "Manuelles Debugging statt KI-Magie.",
        punchline: "KI bringt das Tempo, Erfahrung die Struktur – so wird aus Koffein echter Fortschritt.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button (Option 1: Floating Bottom Left) */}
      {createPortal(
        <div className="fixed bottom-6 md:bottom-12 left-6 md:left-12 z-50 pointer-events-auto">
          <motion.button
            onClick={() => setIsOpen(true)}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="group relative flex items-center overflow-hidden rounded-full border border-white/20 bg-black/20 backdrop-blur-md p-4 text-[#EFECE4] transition-all hover:border-white/40 hover:bg-white/10 focus:outline-none cursor-none shadow-2xl"
          >
            <Coffee className="h-10 w-10 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs tracking-[0.15em] uppercase opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[300px] group-hover:opacity-100 group-hover:pl-4 group-hover:pr-2">
               Projekt - Prognose 
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
          </motion.button>
        </div>,
        document.body
      )}

      {/* Modal im React Portal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop (Klickbar für Schließen, nativer Cursor) */}
            <div
              className="absolute inset-0 cursor-default"
              style={{
                background: "rgba(20, 18, 15, 0.9)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setIsOpen(false)}
            />
            {/* Eigentliches Modal */}
            <div
              className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-[#C5A059]/20 bg-[#141210] p-6 md:p-10 shadow-2xl widget-cursor-area"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-light tracking-wide text-[#EFECE4] uppercase">
                    Kaffee-zu-Projekt <br/><span className="text-[#C5A059]/80">Konverter</span>
                  </h3>
                  <p className="mt-2 text-sm text-[#EFECE4]/60 max-w-sm">
                    Simuliere die Projektlage. Die KI analysiert das Chaos und liefert den Ausweg.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#C5A059]/50 hover:text-[#C5A059] transition-colors focus:outline-none cursor-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Links: Controls */}
                <div className="space-y-8">
                  {/* Slider 1: Kaffee */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-[#EFECE4]/80 uppercase tracking-widest">
                      <span>Kaffeekonsum</span>
                      <span className="text-[#C5A059]">{coffee} Tassen</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={coffee}
                      onChange={(e) => setCoffee(Number(e.target.value))}
                      className="w-full h-1 bg-[#C5A059]/20 rounded-full appearance-none outline-none accent-[#C5A059] cursor-none"
                    />
                  </div>

                  {/* Slider 2: Chaos */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-[#EFECE4]/80 uppercase tracking-widest">
                      <span>Chaos-Faktor</span>
                      <span className="text-[#C5A059]">Level {chaos}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={chaos}
                      onChange={(e) => setChaos(Number(e.target.value))}
                      className="w-full h-1 bg-[#C5A059]/20 rounded-full appearance-none outline-none accent-[#C5A059] cursor-none"
                    />
                  </div>

                  {/* Input 3: Resttage */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-[#EFECE4]/80 uppercase tracking-widest">
                      <span>Resttage bis Go-Live</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-sm px-4 py-2 text-[#EFECE4] outline-none focus:border-[#C5A059]/60 transition-colors cursor-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 border border-[#C5A059]/30 bg-[#C5A059]/10 px-6 py-4 text-sm tracking-widest uppercase text-[#EFECE4] transition-all hover:bg-[#C5A059]/20 hover:border-[#C5A059]/60 hover:text-[#C5A059] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-none shadow-[0_0_15px_rgba(197,160,89,0.0)] hover:shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#C5A059]" />
                    ) : (
                      <Zap className="h-4 w-4 text-[#C5A059]" />
                    )}
                    <span>{isLoading ? "Analysiere..." : "Koffein verwandeln"}</span>
                  </button>
                </div>

                {/* Rechts: Output */}
                <div className="relative min-h-[300px] border border-[#C5A059]/15 bg-[#C5A059]/5 p-6 rounded-sm flex flex-col justify-center shadow-inner">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <h4 className="text-xs text-[#C5A059]/60 uppercase tracking-widest">Status</h4>
                          <p className="text-lg text-[#C5A059] font-medium leading-snug drop-shadow-sm">{result.status_titel}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-xs text-[#C5A059]/60 uppercase tracking-widest">Prognose</h4>
                          <p className="text-sm text-[#EFECE4]/90 leading-relaxed">{result.prognose}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs text-[#C5A059]/60 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-[#C5A059]" /> KI-Lösungsansatz
                          </h4>
                          <p className="text-sm text-[#EFECE4]/90 leading-relaxed italic border-l border-[#C5A059]/30 pl-4">{result.ki_schritt}</p>
                        </div>

                        <div className="pt-4 border-t border-[#C5A059]/20 mt-auto">
                          <p className="text-[10px] text-[#C5A059]/80 uppercase tracking-[0.2em] font-medium">
                            {result.punchline}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-[#C5A059]/70 space-y-4 p-8 text-center"
                      >
                        <Coffee className="h-12 w-12 opacity-80 text-[#C5A059]" />
                        <p className="text-xs uppercase tracking-widest leading-relaxed font-medium">
                          Passe die Parameter an und starte die Projekt-Prognose.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
