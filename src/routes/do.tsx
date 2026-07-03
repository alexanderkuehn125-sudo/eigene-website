import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/do")({
  head: () => ({
    meta: [
      { title: "Privat — do" },
      {
        name: "description",
        content: "The private side — doing, culture, the modern skyline.",
      },
    ],
  }),
  component: DoPage,
});

function DoPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] px-6 py-24 text-[#e6eaf2]">
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] opacity-60">
          Privat · do
        </p>
        <h1
          className="mb-8 text-6xl leading-[0.95] tracking-tight md:text-8xl"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300 }}
        >
          do.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed opacity-80">
          The private side lives here — grid, glass, momentum.
        </p>
        <Link
          to="/"
          className="mt-12 inline-block text-sm uppercase tracking-[0.3em] underline-offset-8 hover:underline"
        >
          ← back to the slider
        </Link>
      </div>
    </main>
  );
}
