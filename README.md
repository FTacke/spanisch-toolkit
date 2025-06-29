````markdown
# 🔧 Toolkit „Spanische Linguistik @ School“

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.15348687.svg)](https://doi.org/10.5281/zenodo.15348687)  
![Material for MkDocs](https://img.shields.io/badge/MkDocs-Material-blue) ![PDF Export](https://img.shields.io/badge/PDF-Export-Chromium-green)  
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)](https://creativecommons.org/licenses/by-nc/4.0/)

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
   pip install -r requirements.txt        # mkdocs-material, mkdocs-exporter, playwright
   playwright install chromium            # einmalig: Headless-Chromium laden
   ```

3. **Entwicklungsserver starten**

   ```bash
   mkdocs serve            # HTML-Site + PDF-Button live
   # Browser: http://127.0.0.1:8000
   ```

4. **Statischer Build (HTML + PDF)**

   ```bash
   mkdocs build --clean    # Ergebnis liegt unter ./site/
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
│   │   └── stylesheets/overrides.css   # eigene Styles + PDF-Fix
│   ├── aussprache/
│   ├── fehlerlinguistik/
│   ├── variation/
│   ├── typologie/
│   ├── wandel/
│   ├── index.md
│   ├── einleitung.md
│   └── projekt.md
├── mkdocs.yml
├── requirements.txt        # pinnt mkdocs-material, exporter, playwright
├── .gitignore              # ignoriert .venv/, site/, pdf/, Playwright-Cache
└── LICENSE
```

## 🤝 Mitmachen

1. Issue erstellen oder in bestehende Diskussionen einsteigen
2. Kapitel als Pull-Request überarbeiten oder neues Thema vorschlagen
3. Peer-Review für Texte, Quellen und Codebeispiele
4. Bitte die **Contribution Guidelines** (CONTRIBUTING.md) beachten

## 📖 Lizenz

Dieses Projekt steht unter **CC BY-NC 4.0**.
Siehe [LICENSE](LICENSE) für Details.

---

*Marburg, Mai 2025*
Prof. Dr. Felix Tacke

```
```
