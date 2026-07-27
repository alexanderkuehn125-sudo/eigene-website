import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    
    setStatus("submitting");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      alert("Fehler: Kein Web3Forms Access Key in der .env.local gefunden!");
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        alert("Es gab ein Problem beim Senden der Nachricht.");
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      alert("Es gab ein Problem beim Senden der Nachricht.");
      setStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative w-full max-w-xl mt-4">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
            // Abflug-Animation
            exit={{ 
              y: -800, 
              x: 200, 
              rotate: 15, 
              scale: 0.3, 
              opacity: 0 
            }}
            transition={{ duration: 1.2, ease: [0.32, 0, 0.67, 0] }} // Sanfter Abflug
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] opacity-50 pl-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b border-white/20 py-2 text-lg md:text-xl text-[#EFECE4] placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
                placeholder="Dein Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] opacity-50 pl-1">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b border-white/20 py-2 text-lg md:text-xl text-[#EFECE4] placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
                placeholder="hallo@beispiel.de"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] opacity-50 pl-1">
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b border-white/20 py-2 text-lg md:text-xl text-[#EFECE4] placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors resize-none disabled:opacity-50"
                placeholder="Wie kann ich helfen?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-4 self-start inline-flex items-center gap-2 text-xl md:text-2xl tracking-wide opacity-80 hover:opacity-100 transition-opacity disabled:opacity-50"
            >
              <span className="underline underline-offset-8">
                {status === "submitting" ? "Wird gesendet..." : "Nachricht senden"}
              </span>
              {!status.includes("submitting") && <span className="no-underline">↗</span>}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }} // Warte bis der Vogel (fast) weg ist
            className="flex flex-col items-start gap-4"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
          >
            <h3 className="text-2xl md:text-3xl tracking-wide">
              Nachricht verschickt.
            </h3>
            <p className="opacity-70 text-lg">
              Vielen Dank für deine Nachricht. Ich melde mich in Kürze bei dir.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", email: "", message: "" });
              }}
              className="mt-4 text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4"
            >
              Weitere Nachricht senden
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
