````markdown
# 🔧 Toolkit „Spanische Linguistik @ School“

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.15348687.svg)](https://doi.org/10.5281/zenodo.15348687)  
![Material for MkDocs](https://img.shields.io/badge/MkDocs-Material-blue) ![PDF Export](https://img.shields.io/badge/PDF-Export-Chromium-green)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-blue.svg)](LICENSE-CONTENT)

## 🧩 Open Educational Resource (OER)

**Inhalte:** CC BY-SA 4.0 → freie Nutzung, Bearbeitung, Weitergabe, auch kommerziell, mit Namensnennung, Lizenzlink und Änderungsvermerk.  
**Code:** basiert auf *Material for MkDocs* (MIT), von mir angepasst; Quellcode im Repo unter **MIT**.

Ziel: einfache Wiederverwendung für neue digitale Lehrbücher/OERs. Forken, Inhalte anpassen, als Website veröffentlichen.

**So setzt du ein eigenes OER auf:**
1. Repo forken: https://github.com/FTacke/spanisch-toolkit  
2. Inhalte bearbeiten: `docs/` anpassen, `mkdocs.yml` konfigurieren  
3. Lizenz wählen: Inhalte **CC BY-SA 4.0**, Code **MIT** (`LICENSE`, `LICENSE-CONTENT`)  
4. Veröffentlichung: GitHub Pages aktivieren (Branch `gh-pages`) oder anders hosten

Lizenzlinks:  
- Inhalte: https://creativecommons.org/licenses/by-sa/4.0/  
- Code: siehe [`LICENSE`](LICENSE); Inhalte: [`LICENSE-CONTENT`](LICENSE-CONTENT)

## 🎯 Projektüberblick
Dieses **digitale Sachbuch** erschließt zentrale Teilgebiete der spanischen Linguistik (Aussprache, Morphologie, Typologie, Sprachwandel, Normen) und verknüpft sie eng mit didaktischen Fragestellungen.  
Entstanden im Rahmen eines Seminars an der Philipps-Universität Marburg, wächst es kollaborativ mit Studierenden als lebendiges **Beta-Projekt**.

## 🚀 Features
- Modernes, responsives Layout dank [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)  
- PDF-Export 1 : 1 via **Playwright / Chromium** (keine WeasyPrint-Limitationen, alle Icons), automatisch bei jedem Build  
- Querverweise, Fußnoten, Tabs, ausklappbare Details  
- Offenes GitHub-Repository – Issues, Pull-Requests, Diskussionen willkommen

## 🛠️ Lokales Setup

1. **Repository klonen**
   ```bash
   git clone https://github.com/<DeinUser>/<DeinRepo>.git
   cd <DeinRepo>
````

2. **Python-Umgebung & Abhängigkeiten**

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   playwright install chromium
   ```

3. **Entwicklungsserver starten**

   ```bash
   mkdocs serve
   # Browser: http://127.0.0.1:8000
   ```

4. **Statischer Build (HTML + PDF)**

   ```bash
   mkdocs build --clean
   # Alternativ nur PDFs neu erzeugen:
   mkdocs exporter
   ```

> **Hinweis:** Der Ordner `site/` wird lokal *nicht* eingecheckt – er entsteht bei jedem Build neu und wird durch die GitHub-Action automatisch veröffentlicht.

## ⚙️ CI / GitHub Pages Deployment

Der Workflow `.github/workflows/deploy.yml`

* installiert Python­-Dependencies + Playwright-Chromium,
* baut HTML **und** PDFs,
* veröffentlicht den Inhalt von `site/` im `gh-pages`-Branch.
  Alles geschieht automatisch bei jedem Push auf `main`.

## 📂 Projektstruktur

```
.
├── docs/
│   ├── assets/
│   ├── aussprache/
│   ├── fehlerlinguistik/
│   ├── herkunftssprachen/
│   ├── lexik/
│   ├── orthographie/
│   ├── variation/
│   ├── wandel/
│   ├── index.md
│   ├── einleitung.md
│   └── projekt.md
├── mkdocs.yml
├── requirements.txt
├── LICENSE                 # Code: MIT
├── LICENSE-CONTENT         # Inhalte: CC BY-SA 4.0
└── .gitignore

```

## 🤝 Mitmachen

1. Issue erstellen oder in bestehende Diskussionen einsteigen
2. Kapitel als Pull-Request überarbeiten oder neues Thema vorschlagen
3. Peer-Review für Texte, Quellen und Codebeispiele
4. Bitte die **Contribution Guidelines** (CONTRIBUTING.md) beachten

## 📖 Lizenzen

- **Code:** MIT (siehe `LICENSE`)
- **Inhalte (Texte, Abbildungen etc.):** CC BY-SA 4.0 (siehe `LICENSE-CONTENT`)
- Ausnahmen: Logos/Material Dritter wie gekennzeichnet



---

*Marburg, 2025*
Prof. Dr. Felix Tacke

```
```
