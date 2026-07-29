import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertTriangle, ChevronRight, Zap } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function ProjectRiskScanner() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [projectText, setProjectText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setScanResult(null);
    setProjectText("");
    setError(null);
  };

  const handleScan = async () => {
    if (!projectText.trim()) return;
    
    setIsScanning(true);
    setError(null);
    setScanResult(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key fehlt! Bitte VITE_GEMINI_API_KEY in der .env.local (und auf Vercel) hinterlegen.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 

      const prompt = `Du bist ein strenger Projektmanager und 'Devil's Advocate' mit tiefer Expertise im digitalen Vertriebsmanagement und KI.
Analysiere das folgende Vorhaben auf mögliche B2B/Digital-Risiken.
Vorhaben: "${projectText}"

Bitte antworte extrem präzise und strukturiert in folgendem Format (nutze Markdown):
1. **Risiko-Level:** (Niedrig, Mittel, Hoch)
2. **Top 3 Red Flags:** (Die drei größten Stolpersteine)
3. **Konkrete Gegenmaßnahme:** (Ein extrem kurzer, starker Ratschlag)`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setScanResult(text);
    } catch (err: any) {
      console.error("Fehler beim API Call:", err);
      setError(err.message || "Es gab ein Problem bei der Risikoanalyse. Bitte versuche es später noch einmal.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {mounted && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center overflow-hidden rounded-full border border-white/20 p-2.5 md:p-4 text-[#EFECE4] transition-all hover:border-white/40 focus:outline-none cursor-none shadow-[0_0_15px_rgba(197,160,89,0.15)] hover:shadow-[0_0_25px_rgba(197,160,89,0.3)] shrink-0"
        >
          {/* Smooth Glowing Pulse */}
          <motion.div
            initial={{ scale: 1.5 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -z-20 transition-opacity duration-700"
            style={{
              background: "linear-gradient(180deg, rgba(197,160,89,0.2) 0%, rgba(255,255,255,0.25) 50%, rgba(197,160,89,0.2) 100%)",
              filter: "blur(12px)",
            }}
          />
          {/* Textured Glass Overlay */}
          <div 
            className="absolute inset-0 -z-10 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" 
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.08) 6px, rgba(255,255,255,0.08) 7px)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          <ShieldAlert className="h-6 w-6 md:h-12 md:w-12 opacity-80 group-hover:opacity-100 transition-opacity shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[9px] md:text-sm tracking-[0.15em] uppercase opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[250px] md:group-hover:max-w-[350px] group-hover:opacity-100 group-hover:pl-2.5 md:group-hover:pl-5 group-hover:pr-1.5 md:group-hover:pr-2.5">
             Risiko - Scanner
          </span>
        </button>
      )}

      {/* Modal im React Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="risk-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 cursor-default"
                style={{
                  background: "rgba(20, 18, 15, 0.9)",
                  backdropFilter: "blur(8px)",
                }}
                onClick={handleClose}
              />
              {/* Eigentliches Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex w-full max-w-2xl flex-col max-h-[95vh] overflow-y-auto rounded-sm border border-[#C5A059]/20 bg-[#141210] p-6 md:p-10 shadow-2xl widget-cursor-area custom-scrollbar md:[&_a]:cursor-none md:[&_button]:cursor-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Schließen Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-[#EFECE4]/40 hover:text-[#C5A059] transition-colors focus:outline-none"
                  aria-label="Schließen"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mb-6 flex items-center gap-4">
                  <ShieldAlert className="h-6 w-6 md:h-8 md:w-8 text-[#C5A059]" />
                  <h2 className="text-xl md:text-2xl font-light tracking-wide text-[#EFECE4]">
                    KI-Risiko-<span className="text-[#C5A059]">Scanner</span>
                  </h2>
                </div>

                {!scanResult ? (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm md:text-base leading-relaxed opacity-70 font-light">
                      Beschreibe ein aktuelles oder geplantes Projekt (z.B. Vertriebskanal-Aufbau, CRM-Einführung). Die "Devil's Advocate" KI analysiert dein Vorhaben auf Schwachstellen.
                    </p>
                    
                    <textarea
                      value={projectText}
                      onChange={(e) => setProjectText(e.target.value)}
                      placeholder="Beispiel: Wir führen nächste Woche Salesforce in einem 50-köpfigen Vertriebsteam ein. Das Team arbeitet aktuell komplett in Excel."
                      className="w-full h-32 md:h-40 bg-black/40 border border-[#C5A059]/30 rounded-sm p-4 text-[#EFECE4] text-sm focus:outline-none focus:border-[#C5A059] transition-colors placeholder:opacity-40 custom-scrollbar resize-none"
                    />

                    {error && (
                      <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-sm text-red-200 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleScan}
                      disabled={isScanning || !projectText.trim()}
                      className="group flex w-full md:w-auto items-center justify-center gap-3 self-end rounded-sm bg-[#C5A059] px-6 py-3 text-xs md:text-sm uppercase tracking-widest text-[#141210] transition-all hover:bg-[#D5B069] disabled:opacity-50 disabled:hover:bg-[#C5A059]"
                    >
                      {isScanning ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          >
                            <Zap className="h-4 w-4" />
                          </motion.div>
                          <span>Analysiere...</span>
                        </>
                      ) : (
                        <>
                          <span>Risiken scannen</span>
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 text-[#C5A059] mb-2">
                      <AlertTriangle className="h-5 w-5 animate-pulse" />
                      <span className="text-xs uppercase tracking-widest font-medium">Analyse-Ergebnis</span>
                    </div>
                    
                    <div className="prose prose-invert prose-sm md:prose-base max-w-none 
                      prose-p:text-[#EFECE4]/80 prose-p:font-light prose-p:leading-relaxed 
                      prose-headings:text-[#C5A059] prose-headings:font-normal
                      prose-strong:text-[#EFECE4] prose-strong:font-medium
                      prose-ul:text-[#EFECE4]/80 prose-li:font-light"
                      dangerouslySetInnerHTML={{ __html: scanResult.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />

                    <button
                      onClick={() => { setScanResult(null); setProjectText(""); }}
                      className="group mt-4 flex w-full md:w-auto items-center justify-center gap-3 self-start rounded-sm border border-[#C5A059]/40 bg-transparent px-6 py-3 text-xs md:text-sm uppercase tracking-widest text-[#C5A059] transition-all hover:border-[#C5A059] hover:bg-[#C5A059]/10"
                    >
                      <span>Neues Projekt prüfen</span>
                    </button>
                  </div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
