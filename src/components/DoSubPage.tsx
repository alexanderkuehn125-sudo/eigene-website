import { Link } from "@tanstack/react-router";

type Section = {
  slug: "skills" | "ueber-mich" | "referenzen" | "impressum" | "kontakt";
  eyebrow: string;
  title: string;
  body: string;
  image?: { src: string; alt: string; caption?: string };
};

export function SubPage({ section }: { section: Section }) {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: "radial-gradient(120% 80% at 50% 0%, #f2ede0 0%, #e6ddc9 45%, #cfc0a3 100%)",
        color: "#2d2a22",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 md:px-12 md:py-16">
        <header className="flex items-center justify-between">
          <Link
            to="/be"
            className="text-[11px] uppercase tracking-[0.35em] opacity-70 underline-offset-8 hover:underline"
          >
            ← Übersicht
          </Link>
          <span className="text-[11px] uppercase tracking-[0.4em] opacity-60">Portfolio</span>
        </header>

        <section className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-16">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] opacity-60">
              {section.eyebrow}
            </p>
            <h1
              className="text-5xl leading-[0.95] tracking-tight md:text-7xl"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 300,
              }}
            >
              {section.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
              {section.body}
            </p>
          </div>

          {section.image && (
            <figure className="relative md:mt-2">
              <div className="relative overflow-hidden rounded-2xl border border-[#2d2a22]/10 bg-[#faf6ed] shadow-[0_1px_1px_-0.5px_rgba(45,42,34,0.05),0_12px_30px_-8px_rgba(45,42,34,0.18),0_28px_56px_-16px_rgba(45,42,34,0.22)]">
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  loading="lazy"
                  draggable={false}
                  className="block h-auto w-full object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/35 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm md:bottom-3 md:right-3 md:text-[10px]"
                >
                  © Alexander Kühn
                </span>
              </div>
              {section.image.caption && (
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.35em] opacity-60">
                  {section.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </section>

        <footer className="mt-auto pt-16 text-[11px] uppercase tracking-[0.35em] opacity-50">
          In Arbeit
        </footer>
      </div>
    </main>
  );
}
