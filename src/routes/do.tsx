import { useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImpressumContent } from "@/components/ImpressumContent";
import img01 from "@/assets/photos/2008_02050072.jpeg.asset.json";
import img02 from "@/assets/photos/DC_NYC_289.jpeg.asset.json";
import img03 from "@/assets/photos/DSC_0001_30.jpeg.asset.json";
import img04 from "@/assets/photos/DSC_0004_48.jpeg.asset.json";
import img05 from "@/assets/photos/DSC_0011_6.jpeg.asset.json";
import img06 from "@/assets/photos/DSC_0014_26.jpeg.asset.json";
import img07 from "@/assets/photos/DSC_0019_39.jpeg.asset.json";
import img08 from "@/assets/photos/DSC_0024_26.jpeg.asset.json";
import img09 from "@/assets/photos/DSC_0027_38.jpeg.asset.json";
import img10 from "@/assets/photos/DSC_0032_7.jpeg.asset.json";
import img11 from "@/assets/photos/DSC_0032_18.jpeg.asset.json";
import img12 from "@/assets/photos/DSC_0034_32.jpeg.asset.json";
import img13 from "@/assets/photos/DSC_0038_11.jpeg.asset.json";
import img14 from "@/assets/photos/DSC_0043_23.jpeg.asset.json";
import img15 from "@/assets/photos/DSC_0044_4.jpeg.asset.json";
import img16 from "@/assets/photos/DSC_0044_19.jpeg.asset.json";
import img17 from "@/assets/photos/DSC_0051_18.jpeg.asset.json";
import img18 from "@/assets/photos/DSC_0051_20.jpeg.asset.json";
import img19 from "@/assets/photos/DSC_0052_6.jpeg.asset.json";
import img20 from "@/assets/photos/DSC_0052_16.jpeg.asset.json";
import img21 from "@/assets/photos/DSC_0054_12.jpeg.asset.json";
import img22 from "@/assets/photos/DSC_0059_30.jpeg.asset.json";
import img23 from "@/assets/photos/DSC_0062_23.jpeg.asset.json";
import img24 from "@/assets/photos/DSC_0064_28.jpeg.asset.json";
import img25 from "@/assets/photos/DSC_0067_13.jpeg.asset.json";
import img26 from "@/assets/photos/DSC_0074_10.jpeg.asset.json";
import img27 from "@/assets/photos/DSC_0080_16.jpeg.asset.json";
import img28 from "@/assets/photos/DSC_0095_13.jpeg.asset.json";
import img29 from "@/assets/photos/DSC_0097_19.jpeg.asset.json";
import img30 from "@/assets/photos/DSC_0099_19.jpeg.asset.json";
import img31 from "@/assets/photos/DSC_0102_18.jpeg.asset.json";
import img32 from "@/assets/photos/DSC_0134_11.jpeg.asset.json";
import img33 from "@/assets/photos/DSC_0140_9.jpeg.asset.json";
import img34 from "@/assets/photos/DSC_0174.jpeg.asset.json";
import img35 from "@/assets/photos/DSC_0206_4.jpeg.asset.json";
import img36 from "@/assets/photos/DSC_0213_4-2.jpeg.asset.json";
import img37 from "@/assets/photos/DSC_0225_2-2.jpeg.asset.json";
import img38 from "@/assets/photos/DSC_0268_3-2.jpeg.asset.json";
import img39 from "@/assets/photos/DSC_0341-2.jpeg.asset.json";
import img40 from "@/assets/photos/DSCF0023-2.jpeg.asset.json";
import img41 from "@/assets/photos/DSCF0029.jpeg.asset.json";
import img42 from "@/assets/photos/DSCF0030.jpeg.asset.json";
import img43 from "@/assets/photos/DSCF0033.jpeg.asset.json";
import img44 from "@/assets/photos/DSCF0036.jpeg.asset.json";
import img45 from "@/assets/photos/DSCF0269.jpeg.asset.json";

export const Route = createFileRoute("/do")({
  head: () => ({
    meta: [
      { title: "Privat — Fotografie" },
      {
        name: "description",
        content:
          "Eine persönliche Auswahl an Fotografien — Momente, Orte, Licht.",
      },
    ],
  }),
  component: DoPage,
});

type Photo = {
  id: string;
  src: string;
  title: string;
  caption: string;
  span?: "tall" | "wide" | "square";
};

const photos: readonly Photo[] = [
  {
    id: "p01",
    src: img31.url,
    title: "Aufstieg",
    caption: "Leere Straße, Leitplanken, Himmel.",
    span: "tall",
  },
  {
    id: "p02",
    src: img17.url,
    title: "Streifen",
    caption: "Ein flacher Blick über die Ebene.",
    span: "wide",
  },
  {
    id: "p03",
    src: img04.url,
    title: "Überhang",
    caption: "Neue Architektur über alten Gleisen.",
    span: "tall",
  },
  {
    id: "p04",
    src: img35.url,
    title: "Oliver's Wharf",
    caption: "Themse, viktorianisches Speicherhaus.",
    span: "wide",
  },
  {

    id: "p05",
    src: img36.url,
    title: "The Grapes",
    caption: "Uferfront, Hochhäuser, Backstein.",
    span: "wide",
  },
  {
    id: "p06",
    src: img11.url,
    title: "Dachlinie",
    caption: "Fassade, Spiegelung, ein ferner Turm.",
    span: "wide",
  },
  {
    id: "p07",
    src: img33.url,
    title: "Covrigi Calzi",
    caption: "Bukarest, Altstadt, Fassaden.",
    span: "tall",
  },
  {
    id: "p08",
    src: img37.url,
    title: "Telefonzelle",
    caption: "Dresden, Sepia, Semperoper im Hintergrund.",
    span: "tall",
  },
  {
    id: "p09",
    src: img20.url,
    title: "Astoux & Brun",
    caption: "Zebrastreifen, Passanten, ein Mittag in Cannes.",
    span: "wide",
  },
  {
    id: "p10",
    src: img38.url,
    title: "Camden Lock",
    caption: "Jenny Wren wartet auf die Schleuse.",
    span: "square",
  },
  {
    id: "p11",
    src: img30.url,
    title: "Borough Market",
    caption: "Menschen in Bewegung unter den Trägern.",
    span: "wide",
  },
  {
    id: "p12",
    src: img14.url,
    title: "Cosco",
    caption: "Container gestapelt, Buchstaben als Landschaft.",
    span: "tall",
  },
  {
    id: "p13",
    src: img32.url,
    title: "Hinterhof",
    caption: "Kuppel zwischen Brandmauern.",
    span: "wide",
  },
  {
    id: "p14",
    src: img27.url,
    title: "Reachstacker",
    caption: "Container gegen Abendsonne, Staub in der Luft.",
    span: "wide",
  },
  {
    id: "p15",
    src: img22.url,
    title: "Salopetă",
    caption: "Werbebanner vor Bukarester Fassaden.",
    span: "wide",
  },
  {
    id: "p16",
    src: img19.url,
    title: "Schornsteine",
    caption: "Skyline im Winter, Rauch als Fahne.",
    span: "wide",
  },
  {
    id: "p17",
    src: img13.url,
    title: "Butter · Milch · Käse",
    caption: "Verlassenes Schaufenster, Bordsteinreste.",
    span: "tall",
  },
  {
    id: "p18",
    src: img28.url,
    title: "FIAT",
    caption: "Brücke über eine leere Landstraße.",
    span: "wide",
  },
  {
    id: "p19",
    src: img18.url,
    title: "Stapler",
    caption: "Silhouette gegen Morgenlicht, Staub in der Luft.",
    span: "tall",
  },
  {
    id: "p20",
    src: img12.url,
    title: "Unterstand",
    caption: "Autobahnbrücke, Schnee, ein wartender Ort.",
    span: "wide",
  },
  {
    id: "p21",
    src: img10.url,
    title: "Pfeil",
    caption: "Bodenmarkierung, Halle im Hintergrund.",
    span: "tall",
  },
  {
    id: "p22",
    src: img40.url,
    title: "Stufen",
    caption: "Verwitterter Beton, wachsendes Grün.",
    span: "wide",
  },
  {
    id: "p23",
    src: img15.url,
    title: "Zaun",
    caption: "Gitter, Schnee, warmes Abendlicht.",
    span: "wide",
  },
  {
    id: "p24",
    src: img26.url,
    title: "Hochhaus",
    caption: "Winterlicht auf Betonzeilen, Berlin.",
    span: "square",
  },
  {
    id: "p25",
    src: img21.url,
    title: "Ernest",
    caption: "Eckgebäude im Goldlicht, Cannes seit 1936.",
    span: "tall",
  },
  {
    id: "p26",
    src: img25.url,
    title: "Olympia",
    caption: "Kinofassade, alte Plakate, leerer Vorplatz.",
    span: "tall",
  },
  {
    id: "p27",
    src: img06.url,
    title: "Markt",
    caption: "Turm gegen Himmel — Gelb, Rot, Sepia.",
    span: "tall",
  },
  {
    id: "p28",
    src: img39.url,
    title: "Dresdner Straße",
    caption: "Gründerzeit, Gleise, Nachmittagslicht.",
    span: "tall",
  },
  {
    id: "p29",
    src: img08.url,
    title: "IBM",
    caption: "Zaun, Firmenschilder, gedeckte Abendfarben.",
    span: "wide",
  },
  {
    id: "p30",
    src: img07.url,
    title: "Blick hinein",
    caption: "Ein verlassener Raum, ein Sessel, das Licht.",
    span: "tall",
  },
  {
    id: "p31",
    src: img02.url,
    title: "Katz's",
    caption: "Späte Stunde am Tresen. New York, Lower East Side.",
    span: "wide",
  },
  {
    id: "p32",
    src: img01.url,
    title: "Aufgang",
    caption: "Geschlossenes Tor, geschwungene Treppe — ein Ort dazwischen.",
    span: "tall",
  },
  {
    id: "p33",
    src: img09.url,
    title: "Durchgang",
    caption: "Aus dem Dunkel Richtung Straße.",
    span: "wide",
  },
  {
    id: "p34",
    src: img29.url,
    title: "Bankside",
    caption: "Nasser Nachmittag, rosa Stühle, blauer Schirm.",
    span: "wide",
  },
  {
    id: "p35",
    src: img05.url,
    title: "Markenwelt",
    caption: "Beschilderung unter der Membran.",
    span: "wide",
  },
  {
    id: "p36",
    src: img24.url,
    title: "Plattenbau",
    caption: "Bukarester Fassade, Balkon an Balkon.",
    span: "wide",
  },
  {
    id: "p37",
    src: img23.url,
    title: "Toni Neuber",
    caption: "Stahllager, Garagen, Berliner Hinterhof.",
    span: "wide",
  },
  {
    id: "p38",
    src: img34.url,
    title: "Lava Jato",
    caption: "Wandmalerei, Kabel, Sonne.",
    span: "wide",
  },
  {
    id: "p39",
    src: img42.url,
    title: "Zeppelinfeld I",
    caption: "Steintreppe, Fassade, Zeit.",
    span: "tall",
  },
  {
    id: "p40",
    src: img43.url,
    title: "Portal",
    caption: "Schwarze Tür, grüne Marken, Sandstein.",
    span: "tall",
  },
  {
    id: "p41",
    src: img45.url,
    title: "Saída",
    caption: "Leere Ränge, ein Ausgang, Türkis.",
    span: "wide",
  },
  {
    id: "p42",
    src: img44.url,
    title: "Damen",
    caption: "Verwitterte Wand, kleines Wort.",
    span: "tall",
  },
  {
    id: "p43",
    src: img41.url,
    title: "Zeppelinfeld II",
    caption: "Aufstieg gegen Wolken.",
    span: "tall",
  },
] as const;


function DoPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const active = photos.find((p) => p.id === openId);

  useEffect(() => {
    if (!impressumOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImpressumOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [impressumOpen]);


  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = photos.findIndex((p) => p.id === openId);
        const next =
          e.key === "ArrowRight"
            ? (idx + 1) % photos.length
            : (idx - 1 + photos.length) % photos.length;
        setOpenId(photos[next].id);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <main
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(140% 90% at 50% -10%, #f7f2e6 0%, #ede3cc 35%, #c9b891 75%, #8a7a5c 100%)",
        color: "#2d2a22",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 md:px-12 md:py-16">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← zurück
          </Link>
          <h1
            className="text-lg uppercase tracking-[0.35em] md:text-2xl"
            style={{ fontWeight: 300 }}
          >
            Privat
          </h1>
          <span className="text-[11px] uppercase tracking-[0.35em] opacity-60">
            Fotografie
          </span>
        </header>

        <section className="mt-16 md:mt-24">
          <p
            className="text-base uppercase tracking-[0.35em] opacity-60 md:text-xl"
            style={{ fontWeight: 300 }}
          >
            Ausstellung
          </p>
        </section>

        {/* Grid */}
        <section className="mt-16 columns-1 gap-6 sm:columns-2 md:mt-24 md:columns-3 md:gap-8">
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpenId(p.id)}
              className="group relative mb-6 block w-full overflow-hidden text-left shadow-[0_2px_4px_-1px_rgba(45,42,34,0.15),0_10px_25px_-6px_rgba(45,42,34,0.28),0_30px_60px_-18px_rgba(45,42,34,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_3px_6px_-1px_rgba(45,42,34,0.18),0_18px_38px_-8px_rgba(45,42,34,0.38),0_44px_80px_-22px_rgba(45,42,34,0.55)] focus:outline-none focus:ring-2 focus:ring-[#2d2a22]/30 md:mb-8"
              style={{ breakInside: "avoid" }}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ backgroundColor: "#c9b891" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    boxShadow:
                      "inset 0 0 60px rgba(0,0,0,0.35), inset 0 0 12px rgba(0,0,0,0.25)",
                  }}
                />
                <LazyImage
                  src={p.src}
                  alt={p.title}
                  eager={i < 3}
                  className="block h-auto w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1.5 top-1.5 rounded-full bg-black/40 px-1.5 py-[1px] text-[5px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm md:left-2 md:top-2 md:text-[6px]"
                  style={{ fontWeight: 300 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-1.5 right-1.5 rounded-full bg-black/35 px-1.5 py-[1px] text-[6px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm md:bottom-2 md:right-2 md:text-[7px]"
                >
                  © Alexander Kühn
                </span>
              </div>
            </button>
          ))}
        </section>

        <div className="mt-16 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[11px] uppercase tracking-[0.35em] opacity-60 transition-opacity hover:opacity-100"
          >
            nach oben ↑
          </button>
        </div>

        <footer className="mt-16 flex flex-col items-center gap-4 border-t border-[#2d2a22]/15 pt-8 text-[11px] uppercase tracking-[0.35em] opacity-70 md:mt-24">
          <button
            type="button"
            onClick={() => setImpressumOpen(true)}
            className="rounded-full border border-[#2d2a22]/25 px-5 py-2.5 tracking-[0.35em] transition-colors hover:bg-[#2d2a22]/[0.06] hover:opacity-100"
          >
            Impressum
          </button>
          <span className="opacity-70">
            © {new Date().getFullYear()} Alexander Kühn · Alle Rechte vorbehalten
          </span>
        </footer>

        {/* Impressum modal */}
        {impressumOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{
              background: "rgba(45, 42, 34, 0.55)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setImpressumOpen(false)}
          >
            <div
              className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-y-auto rounded-2xl border border-[#f2ede0]/20 bg-[#faf6ed] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-12"
              style={{ color: "#2d2a22" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setImpressumOpen(false)}
                aria-label="Schließen"
                className="absolute right-5 top-4 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100"
              >
                ×
              </button>
              <h2
                className="mb-8 pr-8 text-4xl leading-tight tracking-tight md:text-5xl"
                style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
              >
                Impressum
              </h2>
              <ImpressumContent />
            </div>
          </div>
        )}


        {/* Lightbox */}
        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{
              background: "rgba(45, 42, 34, 0.55)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setOpenId(null)}
          >
            <div
              className="relative flex max-h-[92vh] max-w-[95vw] flex-col overflow-hidden border border-[#f2ede0]/20 bg-[#faf6ed] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
              style={{ color: "#2d2a22" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Schließen"
                className="absolute right-4 top-3 z-10 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100"
              >
                ×
              </button>
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#faf6ed]">
                <img
                  src={active.src}
                  alt={active.title}
                  className="block max-h-[82vh] max-w-[95vw] w-auto h-auto object-contain"
                  draggable={false}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/40 px-1.5 py-[2px] text-[7px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm md:text-[7px]"
                >
                  © Alexander Kühn
                </span>
              </div>
              <div className="flex items-center justify-center gap-6 border-t border-[#2d2a22]/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] opacity-70 md:px-6 md:py-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const i = photos.findIndex((p) => p.id === active.id);
                    setOpenId(photos[(i - 1 + photos.length) % photos.length].id);
                  }}
                  className="hover:opacity-100"
                >
                  ← zurück
                </button>
                <span className="opacity-60">
                  {String(photos.findIndex((p) => p.id === active.id) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const i = photos.findIndex((p) => p.id === active.id);
                    setOpenId(photos[(i + 1) % photos.length].id);
                  }}
                  className="hover:opacity-100"
                >
                  vor →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
