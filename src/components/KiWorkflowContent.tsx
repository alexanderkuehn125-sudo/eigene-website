export function KiWorkflowContent() {
  return (
    <div className="text-base md:text-lg leading-relaxed opacity-90 max-w-3xl font-light space-y-12 pb-12">
      <div>
        <h3 className="text-2xl md:text-3xl tracking-wide mb-6">
          <span className="font-light">Die Entstehung der Website</span>
        </h3>
        <p className="opacity-70 text-sm md:text-base">
          Die Entwicklung dieser Website war ein dynamischer Prozess zwischen verschiedenen KI-Systemen und Plattformen. Hier ist der genaue Workflow, die Hürden und wie wir sie gelöst haben.
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Phase 1 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          1. Phase: Lovable ➔ GitHub
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Der rasante Start & das Fundament
        </strong>
        <ul className="space-y-3 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Der Prozess:</span> Wir haben unsere Vision (Dark Mode, Premium-Look) in <em>Lovable</em> beschrieben. Lovable hat in Rekordzeit das Grundgerüst in React gebaut.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Das Problem:</span> Lovable ist fantastisch für den Start, baut aber manchmal "quick and dirty". Sobald es an tiefe Logik oder spezielle Layouts geht, stößt es an seine Grenzen.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Die Lösung:</span> Wir haben den ersten Rohentwurf gesichert und den Code auf <strong>GitHub</strong> hochgeladen, um ab hier die volle Kontrolle zu übernehmen.
          </li>
        </ul>
      </div>

      {/* Phase 2 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          2. Phase: Antigravity ➔ GitHub
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Deep-Dive Debugging & Komplexität
        </strong>
        <ul className="space-y-3 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Der Prozess:</span> Der Code wurde an <em>Antigravity</em> (den fortgeschrittenen KI-Agenten) übergeben, um die harten Nüsse zu knacken.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Das Problem (Der Browser-Kampf):</span> Auf dem Desktop sah alles toll aus, aber auf mobilen Geräten verschwanden Bilder (die "Lightbox") plötzlich im digitalen Nirgendwo außerhalb des Bildschirms.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Die Lösung:</span> Antigravity hat komplexe <em>React Portals</em> eingebaut. Dadurch wurde die Lightbox vom restlichen Layout entkoppelt und zentriert sich nun auf jedem Gerät perfekt. Der saubere Code ging zurück an GitHub.
          </li>
        </ul>
      </div>

      {/* Phase 3 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          3. Phase: Lovable ➔ GitHub
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Visueller Feinschliff & Content
        </strong>
        <ul className="space-y-3 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Der Prozess:</span> Mit dem stabilen Fundament haben wir in Lovable weitere visuelle Elemente und Inhalte (wie Texte und Bilder-Platzhalter) hinzugefügt.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Das Problem (Der Custom Cursor Konflikt):</span> Beim Hinzufügen von neuen Buttons und Links hat der eigens programmierte Mauszeiger (der weiße Kreis) plötzlich mit dem normalen System-Mauszeiger konkurriert. Alles wirkte ruckelig.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Die Lösung:</span> Erneute Synchronisierung über GitHub, um den Code für den nächsten Reparaturlauf bereitzustellen.
          </li>
        </ul>
      </div>

      {/* Phase 4 */}
      <div className="space-y-4">
        <h4 className="text-xl md:text-2xl tracking-wide text-[#C5A059]">
          4. Phase: Antigravity ➔ GitHub ➔ Vercel
        </h4>
        <strong className="block text-sm uppercase tracking-widest opacity-60 mb-2">
          Perfektionismus & Der Live-Gang
        </strong>
        <ul className="space-y-3 opacity-80 text-sm md:text-base">
          <li>
            <span className="font-medium text-white opacity-100">Der Prozess:</span> Der finale Code-Feinschliff durch Antigravity, inklusive fließender Animationen (<code>AnimatePresence</code>), damit nichts mehr unschön "aufpoppt".
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Das Problem (Das Hosting-Desaster):</span> Wir wollten die Seite anfangs über <em>GitHub Pages</em> hosten. Das war aber zu starr, das Routing (Unterseiten) funktionierte nicht richtig und es war schwer, eine eigene Domain sauber anzubinden. Zudem blockierten winzige TypeScript-Fehler den Build-Prozess.
          </li>
          <li>
            <span className="font-medium text-white opacity-100">Die Lösung:</span>
            <ol className="list-decimal list-inside ml-2 mt-2 space-y-1">
              <li><strong>Strikte Code-Bereinigung</strong> durch Antigravity, um alle versteckten Fehler zu eliminieren.</li>
              <li><strong>Der Umzug zu Vercel.</strong> Vercel bietet professionelles CI/CD. Jetzt wird jeder Code-Push auf GitHub vollautomatisch getestet und in Sekunden fehlerfrei als Live-Website im Internet veröffentlicht.</li>
            </ol>
          </li>
        </ul>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Zusammenfassung / TIP */}
      <div className="relative border border-[#C5A059]/40 bg-[#C5A059]/5 p-6 md:p-8 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.05)]">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059] rounded-l-sm"></div>
        <p className="text-sm md:text-base leading-relaxed opacity-90">
          <strong className="text-[#C5A059] uppercase tracking-wider block mb-2 text-xs">💡 Zusammenfassung für das Publikum:</strong>
          Dieser iterative Ping-Pong-Prozess zeigt perfekt modernes Projektmanagement: <strong>Lovable</strong> für die grobe Architektur und Schnelligkeit, <strong>Antigravity</strong> für das komplexe Engineering und Detail-Problemlösungen, <strong>GitHub</strong> als zentraler Ankerpunkt, und <strong>Vercel</strong> für das blitzschnelle, professionelle Hosting.
        </p>
      </div>
    </div>
  );
}
