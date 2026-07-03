import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/be")({
  head: () => ({
    meta: [
      { title: "Portfolio — be" },
      {
        name: "description",
        content: "The public portfolio side — being, nature, unhurried work.",
      },
    ],
  }),
  component: BePage,
});

function BePage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] px-6 py-24 text-[#2d3325]">
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] opacity-60">
          Portfolio · be
        </p>
        <h1
          className="mb-8 text-6xl leading-[0.95] tracking-tight md:text-8xl"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300 }}
        >
          be.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed opacity-80">
          The public side is still growing here — orchard meadows before
          skyscrapers.
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
