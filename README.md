# LunaVision — Website

Statische Website für [lunavision.org](https://lunavision.org) — Video und Social Media
für Gastronomie und kleine Betriebe im Rhein-Neckar-Raum.

Kein Build-Schritt, kein Framework. Reines HTML, CSS und JavaScript, direkt über
GitHub Pages auslieferbar.

---

## Aufbau

```
.
├── index.html              Startseite
├── impressum.html          Impressum (§ 5 DDG)
├── datenschutz.html        Datenschutzerklärung (DSGVO / TDDDG)
├── favicon.ico
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── .nojekyll               verhindert Jekyll-Verarbeitung auf GitHub Pages
└── assets
    ├── css/style.css       Layout und Gestaltung
    ├── css/fonts.css       Schriften, lokal eingebunden
    ├── js/main.js          Navigation, Videos, Cookie-Einwilligung
    ├── fonts/              Anton, Inter, IBM Plex Mono (OFL 1.1)
    ├── img/                Logo, Favicon, App-Icons
    ├── poster/             Standbilder der Videos
    └── video/              Hochkant-Clips (9:16)
```

---

## Videos austauschen oder ergänzen

Die Startseite zeigt zwei Hochkant-Clips in Smartphone-Rahmen. Erwartet werden:

| Datei | Posterbild | Status |
|---|---|---|
| `assets/video/reel-asia-demo.mp4` | `assets/poster/reel-asia-demo.jpg` | vorhanden |
| `assets/video/reel-02.mp4` | `assets/poster/reel-02.jpg` | fehlt noch |

Solange eine Datei fehlt, blendet die Seite den Rahmen mit einem dunklen Verlauf und
dem Hinweis „In Arbeit“ ein. Es erscheint keine Fehlermeldung.

**Neuen Clip einbauen:** Datei unter dem erwarteten Namen in `assets/video/` ablegen,
Posterbild in `assets/poster/`, committen, pushen. Mehr ist nicht nötig. Die
Bildunterschrift steht in `index.html` im jeweiligen `.reel-caption`.

### Clip für das Web aufbereiten

Quellmaterial ist oft deutlich zu groß. Mit [ffmpeg](https://ffmpeg.org):

```bash
# Video auf webtaugliche Größe bringen (720×1280, ca. 5 MB pro 20 Sekunden)
ffmpeg -i quelle.mov \
  -c:v libx264 -profile:v high -preset slow -crf 24 \
  -maxrate 2200k -bufsize 4400k -pix_fmt yuv420p \
  -vf "scale=720:1280:flags=lanczos" \
  -c:a aac -b:a 128k -movflags +faststart \
  assets/video/reel-02.mp4

# Posterbild aus Sekunde 1,2 ziehen
ffmpeg -ss 1.2 -i quelle.mov -frames:v 1 -q:v 4 assets/poster/reel-02.jpg
```

`-movflags +faststart` ist wichtig: Ohne diesen Schalter beginnt die Wiedergabe erst,
wenn die komplette Datei geladen ist.

---

## Inhalte pflegen

| Was | Wo |
|---|---|
| Preise und Paketinhalte | `index.html`, Abschnitt `#pakete` |
| Leistungen | `index.html`, Abschnitt `#leistungen` |
| Telefonnummer und WhatsApp-Links | Suche nach `491572555178` in allen HTML-Dateien |
| Farben und Schriftgrößen | `assets/css/style.css`, Block `:root` |
| Rechtstexte | `impressum.html`, `datenschutz.html` |

---

## Datenschutz

Die Seite ist bewusst ohne Tracking gebaut:

- Schriften werden lokal ausgeliefert, **keine Verbindung zu Google Fonts**
- kein Meta Pixel, kein Google Analytics, keine eingebetteten Social-Media-Inhalte
- Videos liegen auf dem eigenen Server, kein YouTube- oder Vimeo-Player
- der Cookie-Banner speichert ausschließlich die Entscheidung „accept“ oder „decline“
  im `localStorage` des Browsers

Soll später eine Reichweitenmessung dazukommen, gehört sie in die Funktion
`ladeMessung()` in `assets/js/main.js`. Sie wird ausschließlich nach einer
ausdrücklichen Einwilligung aufgerufen. In diesem Fall muss Abschnitt 4 der
Datenschutzerklärung um den konkreten Dienst ergänzt werden.

---

## Lokal ansehen

```bash
python3 -m http.server 8080
```

Dann [http://localhost:8080](http://localhost:8080) öffnen. Ein Dateiaufruf per
Doppelklick funktioniert nicht, weil die Seite absolute Pfade verwendet.

---

## Veröffentlichen über GitHub Pages

```bash
git add -A
git commit -m "Inhalte aktualisiert"
git push
```

In den Repository-Einstellungen unter **Settings → Pages** als Quelle den Branch
`main` und den Ordner `/ (root)` wählen. Für die eigene Domain dort unter
*Custom domain* `lunavision.org` eintragen und **Enforce HTTPS** aktivieren.

Beim Domain-Anbieter müssen dafür folgende DNS-Einträge stehen:

```
A     @      185.199.108.153
A     @      185.199.109.153
A     @      185.199.110.153
A     @      185.199.111.153
CNAME www    <benutzername>.github.io.
```

GitHub legt beim Eintragen der Domain automatisch eine Datei `CNAME` im Repository an.

---

## Schriften

Anton, Inter und IBM Plex Mono stehen unter der
[SIL Open Font License 1.1](https://openfontlicense.org) und dürfen frei
ausgeliefert werden.
