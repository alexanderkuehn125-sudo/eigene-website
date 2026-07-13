export function ImpressumContent() {
  return (
    <div className="max-w-3xl space-y-6 text-[15px] leading-relaxed opacity-90 md:text-base">
      <Section title="Angaben gemäß § 5 TMG">
        <p>
          Alexander Kühn
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          Deutschland
        </p>
      </Section>
      <Section title="Kontakt">
        <p>
          Telefon: [Telefonnummer]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>
      </Section>
      <Section title="Verantwortlich nach § 18 Abs. 2 MStV">
        <p>Alexander Kühn, Anschrift wie oben.</p>
      </Section>
      <Section title="Urheberrecht">
        <p>
          Die auf dieser Website veröffentlichten Inhalte, Texte und
          Gestaltungselemente unterliegen dem deutschen Urheberrecht.
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
          vorherigen schriftlichen Zustimmung von Alexander Kühn.
        </p>
      </Section>
      <Section title="Bildrechte und Fotografie">
        <p>
          Alle auf dieser Website gezeigten Fotografien sind, sofern nicht
          anders gekennzeichnet, © Alexander Kühn. Alle Rechte vorbehalten.
        </p>
        <p>
          Die Fotografien dienen ausschließlich der Präsentation im Rahmen
          dieses Portfolios. Download, Speicherung, Bearbeitung, Weitergabe
          oder Nutzung – analog oder digital, privat oder kommerziell – ist
          ohne ausdrückliche schriftliche Genehmigung nicht gestattet. Dies
          gilt insbesondere für die Nutzung in sozialen Netzwerken, auf
          Websites Dritter, in Druckerzeugnissen sowie für das Training von
          KI-Modellen.
        </p>
        <p>
          Anfragen zu Lizenzierungen, Abzügen oder redaktionellen Nutzungen
          bitte per E-Mail.
        </p>
      </Section>
      <Section title="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt
          erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann
          keine Gewähr übernommen werden. Als Diensteanbieter bin ich gemäß
          § 7 Abs. 1 TMG für eigene Inhalte verantwortlich, nach §§ 8 bis 10
          TMG jedoch nicht verpflichtet, übermittelte oder gespeicherte
          fremde Informationen zu überwachen.
        </p>
      </Section>
      <Section title="Haftung für Links">
        <p>
          Für Inhalte externer Links ist stets der jeweilige Anbieter
          verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden
          derartige Links umgehend entfernt.
        </p>
      </Section>
      <Section title="Streitschlichtung">
        <p>
          Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:opacity-80"
          >
            ec.europa.eu/consumers/odr
          </a>
          . Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht
          bereit.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 text-[11px] uppercase tracking-[0.35em] opacity-70">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
