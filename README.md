# JamJam — Portfolio

Schwarz-weißes Portfolio für **Jamie Milo Cürten (JamJam / jamjam1312)**.

## Vorschau / GitHub Pages

Statische Website ohne Build-System oder externe Laufzeit-Abhängigkeiten.
Sobald GitHub Pages unter **Settings → Pages → Deploy from a branch → main / (root)** aktiviert ist:

**https://jamjam1312.github.io/Jamjaminfo/**

Die Website kann lokal per HTTP-Server gestartet werden (z. B. mit Python: \`python -m http.server 8000\`); anschließend localhost:8000 öffnen.

## Aufbau

- \`index.html\`: Hero, animierte Hintergrund-Motive und Portfolio.
- \`styles.css\`: responsives Schwarz-Weiß-Design.
- \`app.js\`: Hintergrund mit Parallax-Effekt, Klick-/Touch-Steuerung, Barrierefreiheit.
- \`ai/index.html\`: öffentlich lesbare Profilseite für Menschen und Crawler.
- \`about.json\`: maschinenlesbares Profil mit bekannten Fakten.
- \`llms.txt\`: ergänzende Profilinformation für Systeme, die sie nutzen.
- \`sitemap.xml\`, \`robots.txt\`: Auffindbarkeit; Indexierung nicht garantiert.

Das Interaktionskonzept des Rasters wurde durch die **LOKRO OS** Website im Projekt \`jamjam1312/LOKROOS-Arch-based/website\` inspiriert; die Implementierung hier wurde neu geschrieben.

## YouTube und TikTok ergänzen

Die korrekten URLs sind noch nicht bestätigt, daher gibt es absichtlich keine falschen Links. Im oberen Bereich der Datei \`app.js\` die beiden Werte \`SOCIAL_LINKS.youtube\` und \`SOCIAL_LINKS.tiktok\` auf die tatsächlichen \`https://\`-Profil-URLs setzen. Anschließend die Texte in \`index.html\`, \`ai/index.html\`, \`llms.txt\` und \`about.json\` aktualisieren und beide URLs in \`sameAs\` der JSON-LD-Daten ergänzen.

## Domain und Google

Nach einem Domainwechsel **alle absoluten URLs** in \`index.html\`, \`ai/index.html\`, \`about.json\`, \`llms.txt\`, \`robots.txt\` und \`sitemap.xml\` auf die neue kanonische Domain ändern. Der Root-Pfad wechselt dabei von \`/Jamjaminfo/\` zu \`/\`.

1. GitHub: Settings → Pages aktivieren. Ggf. dort auch die gewünschte Custom Domain setzen (DNS beim Provider konfigurieren).
2. Live-URL testen; Search Console Property für die **endgültige URL** verifizieren.
3. Sitemap einreichen und URL-Prüfung → Indexierung beantragen.
4. LOKRO OS, GitHub und weitere bestätigte Profile gegenseitig verlinken.
5. Für KI-Suche ist **normale Google-Indexierung** entscheidend: \`llms.txt\` ist nur ein freiwilliges Zusatzformat, keine Zusage über Google AI Overviews.

**Wichtig:** Projektseiten auf GitHub Pages erben die \`robots.txt\`-Regeln der Domain-Root, nicht automatisch aus dem Unterordner. Nach Domainanschluss ist die Datei direkt am Root wirksam.

Es werden keine Cookies, Analytics oder externen Schriftbibliotheken verwendet.
