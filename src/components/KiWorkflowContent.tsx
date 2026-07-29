export function KiWorkflowContent() {
  return (
    <div className="text-base md:text-lg leading-relaxed opacity-90 max-w-3xl font-light space-y-12 pb-12">
      <div>
        <h3 className="text-2xl md:text-3xl tracking-wide mb-6">
          <span className="font-light">Die Entstehung der Website</span>
        </h3>
        <p className="opacity-70 text-sm md:text-base">
          Die Entwicklung dieser Website erfolgte in einem iterativen Prozess zwischen verschiedenen KI-Systemen und Plattformen. Nachfolgend eine sachliche Übersicht des Workflows sowie der zentralen Herausforderungen und deren Lösungen.
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Phase 1 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          Phase 1: Lovable ➔ GitHub
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Grundgerüst & Schnelligkeit
        </strong>
        <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Prozess:</span> Definition der Basis (Dark Mode, Premium-Look) in <em>Lovable</em> zur schnellen Erstellung des React-Grundgerüsts.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Problem:</span> Einschränkungen der KI bei komplexer Logik und verschachtelten Layouts.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Lösung:</span> Export des Rohentwurfs auf <strong>GitHub</strong> zur Übernahme der vollständigen Kontrolle über die Codebasis.
          </li>
        </ul>
      </div>

      {/* Phase 2 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          Phase 2: Antigravity ➔ GitHub
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Komplexität & Responsive Design
        </strong>
        <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Prozess:</span> Übergabe der Codebasis an <em>Antigravity</em> (fortgeschrittener KI-Agent) für detailliertes Debugging.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Problem:</span> Auf mobilen Endgeräten wurden Bilder (Lightbox) fehlerhaft außerhalb des sichtbaren Bereichs gerendert.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Lösung:</span> Implementierung von <em>React Portals</em> zur sauberen Entkopplung der Lightbox vom Hauptlayout. Rückführung des Codes zu GitHub.
          </li>
        </ul>
      </div>

      {/* Phase 3 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          Phase 3: Lovable ➔ GitHub
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Inhalte, Design & Übersetzungs-Konflikte
        </strong>
        <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Prozess:</span> Hinzufügen weiterer visueller Elemente und Inhalte über Lovable auf Basis des stabilisierten Codes.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Problem 1 (Mauszeiger):</span> Konflikte zwischen dem programmierten Custom Cursor und dem System-Mauszeiger führten zu Ruckeln.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Problem 2 (Sprache & Schriftarten):</span> Das Basis-Setup der Seite war initial auf Englisch eingestellt. Externe Tests offenbarten, dass die automatische Übersetzungsfunktion (z.B. in Google Chrome) das Layout und die verwendeten Schriftarten fehlerhaft darstellte. Dieser Fehler blieb intern zunächst unentdeckt, da die Übersetzungsfunktion im Entwicklungsumfeld deaktiviert war.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Lösung:</span> Erneute Synchronisierung über GitHub zur Fehlerbehebung im nächsten Entwicklungsschritt, inklusive korrekter Sprachdeklaration für den Browser.
          </li>
        </ul>
      </div>

      {/* Phase 4 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          Phase 4: Antigravity ➔ GitHub ➔ Vercel
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Finalisierung & Deployment
        </strong>
        <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Prozess:</span> Abschließender Code-Feinschliff durch Antigravity (Integration fließender Animationen via <code>AnimatePresence</code>).
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Problem:</span> Geplantes Hosting über <em>GitHub Pages</em> erwies sich als ineffizient (fehlerhaftes Routing bei Unterseiten, schwierige Domain-Anbindung, blockierende TypeScript-Fehler).
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Lösung:</span> Strikte Code-Bereinigung und Migration zu <strong>Vercel</strong>. Dies ermöglicht nun eine professionelle CI/CD-Pipeline mit automatisierten Tests und fehlerfreien Deployments bei jedem GitHub-Push.
          </li>
        </ul>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Phase 5 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          Phase 5: Gemini API & Interaktivität
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Die drei KI-Widgets
        </strong>
        <ul className="list-disc list-outside ml-5 space-y-2 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Prozess:</span> Entwicklung und Integration von drei dynamischen Widget-Buttons (Risk Scanner, Coffee Converter, KI-Kurator) zur aktiven Einbindung der Besucher.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Problem:</span> Implementierung intelligenter, kontextbezogener Echtzeit-Interaktion in eine klassische Frontend-Architektur, ohne ein eigenes, aufwendiges Backend aufbauen zu müssen.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Lösung:</span> Direkte Anbindung an das Google Gemini KI-Modell über eine API-Schnittstelle. Die Widgets senden Prompts im Hintergrund an die KI, strukturieren die dynamischen Antworten und machen das statische Portfolio so zu einer interaktiven Erfahrung.
          </li>
        </ul>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Zusammenfassung */}
      <div className="relative border border-[#C5A059]/40 bg-[#C5A059]/5 p-6 md:p-8 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.05)]">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059] rounded-l-sm"></div>
        <p className="text-sm md:text-base leading-relaxed opacity-90">
          <strong className="text-[#C5A059] uppercase tracking-wider block mb-2 text-xs">💡 Zusammenfassung des Stacks:</strong>
          Dieser Prozess demonstriert ein modernes Zusammenspiel der Werkzeuge: <strong>Lovable</strong> für schnelle Architektur, <strong>Antigravity</strong> für komplexes Engineering, <strong>GitHub</strong> als zentrale Versionskontrolle und <strong>Vercel</strong> für automatisiertes Hosting.
        </p>
      </div>
    </div>
  );
}
