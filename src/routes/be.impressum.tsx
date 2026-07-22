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

        <div className="mt-16 space-y-12 text-[15px] leading-relaxed md:mt-20 md:text-base">
          <Block title="Angaben gemäß § 5 TMG">
            <p>
              Alexander Kühn
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              Deutschland
            </p>
          </Block>

          <Block title="Kontakt">
            <p>
              Telefon: [Telefonnummer]
              <br />
              E-Mail: [E-Mail-Adresse]
            </p>
          </Block>

          <Block title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>
              Alexander Kühn
              <br />
              [Anschrift wie oben]
            </p>
          </Block>

          <Block title="Urheberrecht">
            <p>
              Die auf dieser Website veröffentlichten Inhalte, Texte und Gestaltungselemente
              unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und
              jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              vorherigen schriftlichen Zustimmung von Alexander Kühn.
            </p>
          </Block>

          <Block title="Bildrechte und Fotografie">
            <p>
              Alle auf dieser Website gezeigten Fotografien sind, sofern nicht anders
              gekennzeichnet, © Alexander Kühn. Alle Rechte vorbehalten.
            </p>
            <p className="mt-4">
              Die Fotografien dienen ausschließlich der Präsentation im Rahmen dieses Portfolios.
              Ein Download, eine Speicherung, Bearbeitung, Weitergabe oder Nutzung der Bilder –
              gleich in welcher Form, analog oder digital, privat oder kommerziell – ist ohne
              ausdrückliche schriftliche Genehmigung nicht gestattet. Dies gilt insbesondere für die
              Nutzung in sozialen Netzwerken, auf Websites Dritter, in Druckerzeugnissen oder für
              das Training von KI-Modellen.
            </p>
            <p className="mt-4">
              Für Anfragen zu Lizenzierungen, Abzügen oder redaktionellen Nutzungen bitte ich um
              Kontaktaufnahme per E-Mail.
            </p>
          </Block>

          <Block title="Haftung für Inhalte">
            <p>
              Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
              übernommen werden. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
              bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
              fremde Informationen zu überwachen.
            </p>
          </Block>

          <Block title="Haftung für Links">
            <p>
              Diese Website enthält gegebenenfalls Links zu externen Websites Dritter, auf deren
              Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der
              jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von
              Rechtsverletzungen werden derartige Links umgehend entfernt.
            </p>
          </Block>

          <Block title="Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                className="underline underline-offset-4 hover:opacity-70"
                target="_blank"
                rel="noreferrer"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht bereit.
            </p>
          </Block>
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
