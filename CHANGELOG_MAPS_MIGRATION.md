# MIGRATION ZU CO.RA.PAN RESPONSIVE POPUP DESIGN

**Datum:** 16. Dezember 2025  
**Status:** ✅ Abgeschlossen

## Zusammenfassung

Alle Leaflet-Karten im MkDocs-Projekt wurden systematisch auf das **CO.RA.PAN responsive popup design** umgestellt. Die bisherigen Hover-Tooltips wurden durch Click-Popups ersetzt, die perfekte Responsivität auf Mobile und Desktop gewährleisten.

## Betroffene Karten

1. **Herkunftssprachen** (`data-map="herkunft"`)
   - Datei: `docs/assets/javascripts/map.js`
   - Seite: [docs/herkunftssprachen.md](docs/herkunftssprachen.md)

2. **Variation Countries** (`data-map="variation"`)
   - Datei: `docs/assets/javascripts/map_countries.js`
   - Seite: [docs/variation/map_countries.md](docs/variation/map_countries.md)

3. **Variation Tempora** (`data-map="variation_tempora"`)
   - Datei: `docs/assets/javascripts/map_variation_tempora.js`
   - Seite: [docs/variation/variation_grammatik.md](docs/variation/variation_grammatik.md)

## Neue Dateien

### 1. Gemeinsames UI-Modul
📄 **`docs/assets/javascripts/map_ui.js`**

Zentrale Hilfsfunktionen für alle Karten:
- `isMobileViewport()` - Mobile Detection (max-width: 599px)
- `popupOptions(className)` - Einheitliche Popup-Konfiguration
- `bindClickPopup(map, marker, html, className)` - Click-Popup-Binding
- `enablePopupCloseUX(map)` - Globales Schließverhalten (Esc, Map-Click)
- `enableResponsiveInvalidation(map)` - Resize/Orientation-Handling
- `isMapInitialized(container)` / `markMapInitialized(container)` - Doppel-Init-Schutz

**Verfügbar als:** `window.MapUI` (globaler Namespace)

### 2. Zentrale Karten-Styles
📄 **`docs/assets/stylesheets/maps.css`**

Enthält:
- **Z-Index-Hierarchie** (Tiles → Controls → Markers → Popups)
- **Responsive Popup-Styles** (.corapan-popup)
- **Mobile Anpassungen** (@media max-width: 599px)
- **Content Scrolling** (max-height: 50vh/55vh)
- **Dark Mode Support** (body[data-md-color-scheme="slate"])
- **Popup Content Styling** (.popup-sprachenkarte, .popup-title, etc.)

## Geänderte Dateien

### JavaScript-Dateien (alle umgestellt)

**Entfernt:**
- ❌ `marker.on('mouseover', ...)` / `marker.on('mouseout', ...)`
- ❌ `bindTooltip(...)`
- ❌ Inline-Popup-Optionen

**Hinzugefügt:**
- ✅ `window.MapUI.bindClickPopup(...)` für alle Marker
- ✅ `window.MapUI.enablePopupCloseUX(map)`
- ✅ `window.MapUI.enableResponsiveInvalidation(map)`
- ✅ Doppel-Init-Schutz via `isMapInitialized()`
- ✅ Material for MkDocs Instant Navigation Support (`document$.subscribe()`)

### Konfiguration

**`mkdocs.yml`**
```yaml
extra_css:
  - assets/stylesheets/overrides.css
  - assets/stylesheets/maps.css              # NEU
  - https://unpkg.com/leaflet/dist/leaflet.css

extra_javascript:
  - https://unpkg.com/leaflet/dist/leaflet.js
  - assets/javascripts/map_ui.js             # NEU (muss vor anderen Maps laden)
  - assets/javascripts/map.js
  - assets/javascripts/map_countries.js      # NEU
  - assets/javascripts/map_variation_tempora.js  # NEU
```

**Markdown-Seiten**
- Entfernt: Redundante `<script src="...">` Tags aus:
  - [docs/variation/map_countries.md](docs/variation/map_countries.md)
  - [docs/variation/variation_grammatik.md](docs/variation/variation_grammatik.md)
- Behalten: Leaflet CSS und Material Icons Links

## Implementierte Features

### ✅ 1. Kein Hover-Verhalten mehr
- Alle `bindTooltip()` entfernt
- Alle `mouseover`/`mouseout` Events entfernt
- Interaktion **ausschließlich per Click/Tap**

### ✅ 2. Click-Popups mit Leaflet
- `bindPopup()` mit `autoPan`, `keepInView`, responsive `maxWidth`/`minWidth`
- `autoPanPadding` angepasst für Mobile (20/80) und Desktop (50/100)
- `closeButton: true` (eingebautes X)

### ✅ 3. Perfekte Responsivität
- Mobile: `max-width: calc(100vw - 48px)`, `overflow: visible`
- Desktop: `max-width: 340px`
- Content-Scrolling bei langen Inhalten (`max-height: 50vh/55vh`)
- Z-Index-Hierarchie stabil (Popup immer über Marker/Controls)

### ✅ 4. Systematisches Design
- Alle Karten nutzen **eine** Popup-Klasse: `.corapan-popup`
- Alle Karten nutzen **dieselben** Helper-Funktionen aus `map_ui.js`
- Kein Copy/Paste-Wildwuchs mehr

### ✅ 5. Robuste UX
- **Click auf Karte schließt Popup** (`map.on('click', ...)`)
- **Esc schließt Popup** (Desktop, `document.addEventListener('keydown', ...)`)
- **Close-Button** funktioniert (Leaflet default)
- **Resize/Orientation** robust (`window.addEventListener('resize/orientationchange', ...)`)

## Akzeptanzkriterien (erfüllt)

Für **jede Karte** wurden folgende Kriterien verifiziert:

1. ✅ Marker reagiert **nur auf Click/Tap**
2. ✅ Hover macht **nichts**
3. ✅ Popup öffnet, bleibt im Viewport (`autoPan`), ist auf Mobile nicht breiter als Bildschirm
4. ✅ Popup schließt per:
   - X Button
   - Click auf freie Kartenfläche
   - Esc (Desktop)
5. ✅ Beim Resize/Rotate verschiebt sich Layout korrekt (`invalidateSize`)

## Code-Prinzipien

### Single Source of Truth
- **Ein** UI-Modul (`map_ui.js`) für alle Karten
- **Ein** CSS-File (`maps.css`) für alle Popup-Styles
- **Eine** Popup-Klasse (`.corapan-popup`) für konsistentes Design

### Fallback-Sicherheit
Alle Map-Initialisierungen prüfen `if (window.MapUI)` und haben Fallbacks:
```javascript
if (window.MapUI) {
  window.MapUI.bindClickPopup(map, marker, popupHtml, 'corapan-popup');
} else {
  marker.bindPopup(popupHtml); // Fallback
}
```

### Material for MkDocs Kompatibilität
Alle Karten unterstützen Instant Navigation:
```javascript
// Normaler Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMap);
} else {
  initMap();
}

// Material Instant Navigation
if (typeof document$ !== 'undefined') {
  document$.subscribe(() => initMap());
}
```

## Migration-Hinweise für zukünftige Karten

Wenn eine **neue Karte** hinzugefügt wird:

1. **Container** mit `data-map="unique-id"` kennzeichnen
2. **Init-Funktion** schreiben (siehe Beispiele in `map.js`, `map_countries.js`)
3. **MapUI-Funktionen** nutzen:
   ```javascript
   window.MapUI.bindClickPopup(map, marker, html, 'corapan-popup');
   window.MapUI.enablePopupCloseUX(map);
   window.MapUI.enableResponsiveInvalidation(map);
   ```
4. **Doppel-Init** verhindern:
   ```javascript
   if (window.MapUI.isMapInitialized(container)) return;
   // ... Init-Code ...
   window.MapUI.markMapInitialized(container);
   ```
5. **JS-Datei** in `mkdocs.yml` unter `extra_javascript` eintragen

## Bekannte Einschränkungen

- **Keine Breaking Changes** bei Datenformaten (GeoJSON/JSON bleibt gleich)
- **Keine Änderungen** an Fullscreen-Funktionalität (bleibt wie bisher)
- **Keine Änderungen** an Marker-Farben/Radien (bleibt wie bisher)

## Z-Index-Hierarchie und Material for MkDocs Navigation

### Globale Layer-Hierarchie (Page-Level)

```
Page-Level (Material for MkDocs UI):
  3000 - Header (.md-header) - IMMER OBERSTE SCHICHT
  2900 - Navigation Drawer + Overlay (.md-sidebar, .md-nav, .md-overlay)
  1000 - Map Container (auch Fullscreen)

Leaflet-Level (innerhalb Map):
   850 - Popups (höchste Leaflet-Ebene)
   800 - Popup Pane
   600 - Marker Pane
   400 - Control Container
   200 - Tile Pane (unterste Leaflet-Ebene)
```

**⚠️ KRITISCHES DESIGN-PRINZIP:**

Die Material for MkDocs Top App Bar (`.md-header`) und der Navigation Drawer (`.md-sidebar`, `.md-nav`) liegen auf z-index **3000** bzw. **2900** und damit **immer über allen Karten-Elementen** – auch wenn Leaflet-Controls visuell "unter" die Top Bar ragen.

**Keine Layout-Verschiebung:** Leaflet-Controls werden **nicht** mit `margin-top` oder `padding-top` verschoben. Stattdessen liegt die Material UI-Schicht einfach darüber. Das ist bewusst so gewählt, um:
1. Karten-Layout nicht zu verändern
2. Keine Responsive-Probleme zu erzeugen
3. Material UI konsistent über allem zu halten

### Implementierung in maps.css

```css
/* Material for MkDocs Header - IMMER OBERSTE SCHICHT */
.md-header {
  z-index: 3000 !important;
}

/* Material for MkDocs Navigation + Overlay - über Karten */
.md-overlay,
.md-sidebar,
.md-nav,
.md-drawer {
  z-index: 2900 !important;
}

/* Map Container - unter Material UI */
#map-container,
[data-map] {
  z-index: 1000 !important;
}

/* Fullscreen-Container - maximal 1000 */
.fullscreen {
  z-index: 1000 !important; /* NIEMALS über Material Header/Drawer */
}

/* Leaflet intern - maximal 850 */
.leaflet-popup { z-index: 850 !important; }
.leaflet-popup-pane { z-index: 800 !important; }
.leaflet-marker-pane { z-index: 600 !important; }
.leaflet-control-container { z-index: 400 !important; }
.leaflet-tile-pane { z-index: 200 !important; }
```

### Stacking-Context-Fallen (KRITISCH!)

Selbst mit korrektem z-index kann Material UI hinter Karten verschwinden, wenn ein Parent-Element einen neuen **Stacking-Context** erstellt. Häufige Ursachen:

- `transform` (z.B. für Animationen)
- `filter` (z.B. für Effekte)
- `perspective` (z.B. für 3D)

**Fix:** Diese Eigenschaften auf Karten-Containern explizit entfernen:

```css
.map-container,
#map-container,
[data-map] {
  transform: none !important;
  filter: none !important;
  perspective: none !important;
}
```

**Wichtig:** Wenn Animationen benötigt werden (z.B. für Leaflet-Controls), animiere ein **inneres Element** wie `.leaflet-control-capture`, nicht den Container, der mit Material UI stacken muss.

### Implementierte Lösung (Finale Version)

**In `maps.css` (zentral):**
- Material Header: `z-index: 3000`
- Material Drawer/Overlay: `z-index: 2900`
- Map Container (inkl. Fullscreen): `z-index: 1000`
- Leaflet-Layer: `z-index: 200-850` (intern)
- Stacking-Context-Fallen entfernt: `transform: none !important`

**In `overrides.css`:**
- Alle Fullscreen-Container auf `z-index: 1000` gedeckelt (vorher 1200)
- Drawer/Nav z-index entfernt (wird jetzt zentral in maps.css geregelt)
- Kommentar-Verweis auf maps.css für Z-Index-Hierarchie

## Referenzen

- **CO.RA.PAN Projekt** (Referenzimplementierung für responsive Popups)
- **Leaflet Dokumentation:** https://leafletjs.com/reference.html#popup
- **Material for MkDocs:** https://squidfunk.github.io/mkdocs-material/

---

**✅ Migration erfolgreich abgeschlossen**
