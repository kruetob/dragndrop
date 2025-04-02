# Drag'n'Drop Projekt

Dieses Projekt demonstriert eine Drag-and-Drop-Oberfläche mit Unterstützung für Maus- und Touch-Eingaben sowie eine animierte Verschiebung des Elements zwischen zwei Dropzones. Das Projekt ist in HTML, CSS und JavaScript unterteilt.

## Inhaltsverzeichnis

- [Projektübersicht](#projektübersicht)
- [Dateistruktur](#dateistruktur)
- [Funktionen](#funktionen)
- [Installation und Nutzung](#installation-und-nutzung)
- [Anpassungen und Weiterentwicklung](#anpassungen-und-weiterentwicklung)
- [Lizenz](#lizenz)

## Projektübersicht

Das Drag'n'Drop-Projekt bietet folgende Funktionalitäten:
- **Drag-and-Drop mit Maus:** Das Element wird per Drag-and-Drop zwischen zwei Zonen verschoben. Dabei wird das Element während des Ziehens unsichtbar, um Duplikate in der Dropzone zu vermeiden.
- **Touch-Unterstützung:** Das Element reagiert auf Touch-Events und kann auf mobilen Geräten ebenfalls verschoben werden.
- **Animierte Verschiebung:** Mit einem Button kann eine animierte Verschiebung des Elements zwischen den Zonen ausgelöst werden.
- **Reset-Funktion:** Ein Reset-Button bringt das Element zurück in die erste Dropzone.
- **Optimierungen:** Der Code wurde so strukturiert, dass Wiederverwendung, Modularität und Lesbarkeit gewährleistet sind.

## Dateistruktur

\`\`\`plaintext
├── index.html     # Hauptdatei mit der HTML-Struktur
├── style.css      # Enthält das CSS-Stylesheet für das Layout und Design
├── script.js      # JavaScript-Datei mit allen Funktionen (Drag-and-Drop, Animation etc.)
└── README.md      # Ausführliche Projektbeschreibung
\`\`\`

## Funktionen

### Drag-and-Drop mit Maus
- **dragstart:** Das Element wird beim Start des Drag-Events unsichtbar gemacht, um doppelte Darstellungen zu vermeiden.
- **dragend:** Das Element wird nach Beendigung des Drag-Events wieder sichtbar.
- **drop:** Beim Loslassen des Elements wird es in die entsprechende Dropzone eingefügt, die "over"-Markierung entfernt und ein kurzer Skalierungseffekt ausgelöst.

### Touch-Unterstützung
- **touchstart, touchmove, touchend:** Diese Events ermöglichen das Verschieben des Elements auf mobilen Geräten. Das Element folgt dem Finger und wird bei Loslassen in der richtigen Dropzone platziert.

### Animierte Verschiebung
- **Button "Animiert verschieben":** Ein "Ghost"-Element wird erstellt und animiert von der aktuellen zur Ziel-Dropzone bewegt. Eine Flagge (\`isAnimating\`) verhindert Mehrfachklicks während der Animation.

### Reset-Funktion
- **Button "Zurücksetzen":** Dieser Button bringt das Element in die ursprüngliche (erste) Dropzone zurück.

## Installation und Nutzung

1. **Repository klonen:**

   \`\`\`bash
   git clone https://github.com/DEIN-GITHUB-USERNAME/drag-and-drop-projekt.git
   cd drag-and-drop-projekt
   \`\`\`

2. **Projekt öffnen:**
   - Öffne die \`index.html\` in deinem Browser, um das Projekt auszuführen.
   - Alternativ kannst du einen lokalen Webserver verwenden (z. B. mit VSCode oder Python), um die Datei zu hosten.

3. **Interaktion:**
   - Ziehe das Element mit der Maus oder per Touch in die andere Dropzone.
   - Klicke auf "Animiert verschieben", um eine animierte Bewegung zu starten.
   - Verwende "Zurücksetzen", um das Element in die ursprüngliche Zone zurückzusetzen.

## Anpassungen und Weiterentwicklung

- **Design:** Passe die CSS-Datei an, um das Layout oder Farbschema zu ändern.
- **Funktionalität:** Der modulare JavaScript-Code ermöglicht es, weitere Funktionen (z. B. zusätzliche Dropzones) einfach zu integrieren.
- **Barrierefreiheit:** Es können zusätzliche Verbesserungen vorgenommen werden, um die Zugänglichkeit zu erhöhen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht. Siehe [LICENSE] für weitere Details.