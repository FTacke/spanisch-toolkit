# 🔧 Toolkit Spanische Linguistik @ School

[![DOI](https://zenodo.org/badge/974128729.svg)](https://doi.org/10.5281/zenodo.15348687)
![Material for MkDocs](https://img.shields.io/badge/MkDocs-Material-blue)  
[![License: CC BY‐NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)](https://creativecommons.org/licenses/by-nc/4.0/)


## 🎯 Projektüberblick

Dieses **digitale Sachbuch** erschließt zentrale Teilgebiete der spanischen Linguistik (Aussprache, Morphologie, Typologie, Sprachwandel, Normen) und verknüpft sie eng mit didaktischen Fragestellungen.  
Entstanden im Rahmen eines Seminars an der Philipps-Universität Marburg, entsteht es kollaborativ mit Studierenden als lebendiges **Beta-Projekt**.

## 🚀 Features

- Modernes, responsives Layout mit [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)  
- Kapitel in modularem Aufbau, laufend ergänzt und überarbeitet  
- Querverweise, Fußnoten, ausklappbare Details und Tabs  
- Offenes GitHub-Repository: Issues, Pull Requests und Diskussionen willkommen

## 🛠️ Installation & Lokaler Start

1. Klone das Repository  
   ```bash
   git clone https://github.com/<DeinUser>/<DeinRepo>.git
   cd <DeinRepo>
   ```
2. Erstelle eine Python-Umgebung und installiere Abhängigkeiten  
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install mkdocs-material
   ```
3. Starte den lokalen Entwicklungsserver  
   ```bash
   mkdocs serve
   ```
4. Öffne im Browser  
   ```
   http://127.0.0.1:8000
   ```

## 📦 Build & Deployment

- **Build**:  
  ```bash
  mkdocs build
  ```
- **Deployment**:  
  Nutze GitHub Actions (siehe `.github/workflows/deploy.yml`) oder konfiguriere dein eigenes CI-Skript, um den Inhalt aus `site/` auf GitHub Pages oder einen anderen Webserver zu veröffentlichen.

## 📂 Projektstruktur

```
.
├── docs/
│   ├── assets/
│   │   ├── images/
│   │   └── stylesheets/
│   │       └── overrides.css   # Deine Anpassungen
│   ├── aussprache/
│   ├── normen/
│   ├── typologie/
│   ├── wandel/
│   ├── wortbildung/
│   ├── index.md
│   ├── einleitung.md
│   └── projekt.md             # Über dieses Projekt
├── mkdocs.yml
├── .gitignore
└── LICENSE
```

## 🤝 Mitmachen

1. Issue anlegen oder in bestehenden Diskussionen mitwirken  
2. Ein Kapitel als Pull Request überarbeiten oder ein neues Thema vorschlagen  
3. Peer-Review: Feedback für Texte, Quellen und Codebeispiele  
4. Bitte die [Contribution Guidelines](CONTRIBUTING.md) beachten

## 📖 Lizenz

Dieses Projekt steht unter der Creative Commons Lizenz **CC BY-NC 4.0**.  
Siehe [LICENSE](LICENSE) für Details.

---

*Marburg, Mai 2025*  
Prof. Dr. Felix Tacke  
