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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
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
      {/* Trigger Button (Option B) */}
      <div className="pt-8">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm tracking-[0.15em] uppercase text-[#EFECE4] transition-all hover:border-white/40 hover:bg-white/5 focus:outline-none cursor-none"
        >
          <Coffee className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span>Projekt-Prognose starten</span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
        </button>
      </div>

      {/* Modal im React Portal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 cursor-none cursor-trigger-close"
            style={{
              background: "rgba(20, 18, 15, 0.9)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0A0908] p-6 md:p-10 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-light tracking-wide text-[#EFECE4] uppercase">
                    Kaffee-zu-Projekt <br/><span className="text-white/50">Konverter</span>
                  </h3>
                  <p className="mt-2 text-sm text-[#EFECE4]/60 max-w-sm">
                    Simuliere die Projektlage. Die KI analysiert das Chaos und liefert den Ausweg.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/50 hover:text-white transition-colors focus:outline-none cursor-none"
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
                      <span>{coffee} Tassen</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={coffee}
                      onChange={(e) => setCoffee(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none accent-[#EFECE4] cursor-none"
                    />
                  </div>

                  {/* Slider 2: Chaos */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-[#EFECE4]/80 uppercase tracking-widest">
                      <span>Chaos-Faktor</span>
                      <span>Level {chaos}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={chaos}
                      onChange={(e) => setChaos(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none accent-[#EFECE4] cursor-none"
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
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-[#EFECE4] outline-none focus:border-white/30 transition-colors cursor-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-4 text-sm tracking-widest uppercase text-[#EFECE4] transition-colors hover:bg-white/10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-none"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                    <span>{isLoading ? "Analysiere..." : "Koffein verwandeln"}</span>
                  </button>
                </div>

                {/* Rechts: Output */}
                <div className="relative min-h-[300px] border border-white/5 bg-white/5 p-6 rounded-sm flex flex-col justify-center">
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
                          <h4 className="text-xs text-white/40 uppercase tracking-widest">Status</h4>
                          <p className="text-lg text-[#EFECE4] font-medium leading-snug">{result.status_titel}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-xs text-white/40 uppercase tracking-widest">Prognose</h4>
                          <p className="text-sm text-[#EFECE4]/80 leading-relaxed">{result.prognose}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="h-3 w-3" /> KI-Lösungsansatz
                          </h4>
                          <p className="text-sm text-[#EFECE4]/80 leading-relaxed italic border-l border-white/20 pl-4">{result.ki_schritt}</p>
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-auto">
                          <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium">
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
                        className="absolute inset-0 flex flex-col items-center justify-center text-white/20 space-y-4 p-8 text-center"
                      >
                        <Coffee className="h-12 w-12 opacity-50" />
                        <p className="text-xs uppercase tracking-widest leading-relaxed">
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
