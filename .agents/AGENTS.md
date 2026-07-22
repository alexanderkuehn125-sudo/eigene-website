# Projekt-Spezifische Agenten-Regeln

## Bild-Kategorisierung für die Ausstellungs-Seite (/do)
Aktuell ist die Zuordnung der Bilder zu den Kategorien ("Momente", "Orte", "Licht") rein mathematisch (Zufall) gelöst, um die Filter-Funktionalität zu testen. 
**WICHTIG:** Wenn der User in Zukunft die Kategorisierung "echt" machen möchte, haben wir uns auf einen der folgenden Wege geeinigt:
1. **Ordnerstruktur:** Echte Unterordner `momente/`, `orte/`, `licht/` in `src/assets/photos/` anlegen und die Dateien verschieben. Die Logik muss dann den Ordnernamen auslesen.
2. **Dateinamen-Kürzel:** Die Dateien entsprechend umbenennen (z.B. `M_DSC...`, `O_DSC...`, `L_DSC...`) und die Logik anpassen, um den Präfix zu lesen.

Bitte diesen Status Quo bei zukünftigen Änderungen im Hinterkopf behalten.

## Verhaltensregeln Kommunikation
- **Radikale Ehrlichkeit:** Der User legt größten Wert auf ungefilterte, radikal ehrliche Meinungen (insbesondere bei Design und Wirkung). Keine falsche KI-Höflichkeit, keine Schmeicheleien. Wenn ein Bild/Design zu "brav", "langweilig" oder "unpassend" wirkt, muss dies direkt kommuniziert werden. Lob ist nur dann zu äußern, wenn es zu 100% ernst gemeint und sachlich begründbar ist.

## Hosting & Deployment (GitHub Pages)
- **WICHTIG:** Die Website wird über GitHub Pages gehostet. Das bedeutet, es handelt sich um ein reines Frontend/Static-Site-Hosting.
- **Regeln für Animationen & Code:** Alle Animationen (CSS, Framer Motion etc.) und Logiken müssen rein clientseitig (im Browser) funktionieren. Serverseitige Endpunkte oder Datenbankanfragen sind nicht möglich. Beim Routing (React Router/TanStack Router) und bei Asset-Pfaden muss sichergestellt sein, dass sie mit statischem Hosting und potenziellen Base-Paths auf GitHub Pages kompatibel sind.

## Image Editing Rules
- ONLY modify or apply filters to the images on the start page if the user gives an explicit command to do so. Otherwise, leave them exactly as they are.
