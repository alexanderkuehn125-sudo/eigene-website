import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/be/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Alexander Kühn" },
      {
        name: "description",
        content:
          "Impressum, Kontakt und Hinweise zu Urheber- und Bildrechten des Portfolios von Alexander Kühn.",
      },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: "radial-gradient(120% 80% at 50% 0%, #f2ede0 0%, #e6ddc9 45%, #cfc0a3 100%)",
        color: "#2d2a22",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 md:px-12 md:py-16">
        <header className="flex items-center justify-between">
          <Link
            to="/be"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← Übersicht
          </Link>
          <span className="text-[11px] uppercase tracking-[0.4em] opacity-60">Portfolio</span>
        </header>

        <section className="mt-16 md:mt-24">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] opacity-60">04 · Impressum</p>
          <h1
            className="text-5xl leading-[0.95] tracking-tight md:text-7xl"
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
          >
            Rechtliches, klar und knapp.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            Pflichtangaben nach § 5 TMG, Kontaktdaten sowie Hinweise zu Urheber- und Bildrechten.
          </p>
        </section>

        <div className="mt-16 flex items-center justify-start text-[15px] leading-relaxed md:mt-20 md:text-base">
          <a 
            href="https://drive.google.com/file/d/1h5Ktnw_8Eh1lDnu9MIVd0Ze6BPBUJQf3/view?usp=sharing" 
            target="_blank" 
            rel="noreferrer"
            className="underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Zum vollständigen Impressum
          </a>
        </div>

        <footer className="mt-16 border-t border-[#2d2a22]/15 pt-6 text-[11px] uppercase tracking-[0.35em] opacity-55">
          © {new Date().getFullYear()} Alexander Kühn · Alle Rechte vorbehalten
        </footer>
      </div>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="mb-3 text-[11px] uppercase tracking-[0.35em] opacity-70"
        style={{ fontWeight: 400 }}
      >
        {title}
      </h2>
      <div className="opacity-85">{children}</div>
    </section>
  );
}
