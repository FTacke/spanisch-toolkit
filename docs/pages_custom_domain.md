# GitHub Pages Custom Domain Fix

## Problem

Nach jedem Deploy verschwand die Custom Domain `school.hispanistica.com` aus den GitHub Pages Settings. Die Website war dann nur noch unter `ftacke.github.io/spanisch-toolkit` erreichbar.

## Ursache

Die Custom Domain wird in GitHub Pages über eine `CNAME`-Datei im Root des `gh-pages` Branch gesetzt. 

Der GitHub Actions Deploy-Workflow hat bei jedem Deploy:
1. Die MkDocs-Site mit `mkdocs build --clean` neu gebaut (löscht `./site` komplett)
2. Das `./site` Verzeichnis zum `gh-pages` Branch gepusht
3. **Dabei wurde keine `CNAME`-Datei erstellt** → Custom Domain wurde zurückgesetzt

## Lösung

In der Datei `.github/workflows/deploy.yml` wurde der Parameter `cname` zur peaceiris/actions-gh-pages Action hinzugefügt:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./site
    cname: school.hispanistica.com  # ← Fix: CNAME wird automatisch erstellt
```

Die Action erstellt nun bei jedem Deploy automatisch eine `CNAME`-Datei mit dem Inhalt `school.hispanistica.com` im `gh-pages` Branch.

## Verifikation

Nach dem nächsten Deploy (Push auf `main`):

1. ✅ Der `gh-pages` Branch enthält eine `CNAME`-Datei im Root
2. ✅ GitHub Pages Settings → Custom Domain zeigt weiterhin `school.hispanistica.com`
3. ✅ `https://school.hispanistica.com` lädt korrekt

## Künftige Deploys

Keine Änderungen nötig. Bei jedem Push auf `main`:
- Workflow baut die Site neu
- Erstellt automatisch die CNAME-Datei
- Custom Domain bleibt erhalten

## Technische Details

- **Deploy-Methode**: GitHub Actions (`peaceiris/actions-gh-pages@v4`)
- **Publishing Branch**: `gh-pages` (automatisch verwaltet)
- **Build-Tool**: MkDocs + mkdocs-material
- **Custom Domain**: `school.hispanistica.com`
