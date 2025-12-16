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

### Leaflet-Layer (innerhalb der Karte)
```
200  - Tiles (Kartenkacheln)
400  - Controls (Zoom, Attribution)
600  - Markers
800  - Popup Pane
850  - Popups
```

### Page-Level Z-Index (Material for MkDocs)
```
1000 - Header (.md-header)
1200 - Fullscreen Map Container
2000 - Navigation Drawer + Overlay (.md-sidebar, .md-nav, .md-overlay)
```

**⚠️ KRITISCH:** Der Material for MkDocs Navigation-Drawer (`.md-nav`, `.md-sidebar`) muss auf Mobile einen sehr hohen z-index haben (`2000 !important`), um **garantiert** über allen Karten-Elementen zu liegen.

### Stacking-Context-Fallen (WICHTIG!)

Selbst mit korrektem z-index kann der Drawer hinter Karten verschwinden, wenn ein Parent-Element einen neuen **Stacking-Context** erstellt. Häufige Ursachen:

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

### Mobile Safe Space (Top App Bar)

Auf Mobile liegt die Material for MkDocs Top App Bar (Header) über dem Viewport. Leaflet Controls würden sonst von der App Bar verdeckt.

**Lösung: Safe Space + Control Offset**

```css
@media (max-width: 599px) {
  /* Map-Container: Padding oben für App Bar */
  #map-container,
  [data-map] {
    padding-top: 64px; /* Höhe der Material Top App Bar */
    box-sizing: border-box;
  }

  /* Leaflet-Container: Höhe anpassen */
  #mapid {
    height: calc(100% - 64px);
  }

  /* Controls: Nach unten verschieben */
  .leaflet-top.leaflet-left,
  .leaflet-top.leaflet-right {
    margin-top: 72px !important; /* Sicherer Abstand */
  }
}
```

**AutoPan Padding angepasst:**
- Desktop: `autoPanPaddingTopLeft: [50, 100]`
- Mobile: `autoPanPaddingTopLeft: [20, 100]` (erhöht von 80 auf 100 wegen App Bar)

### Implementierte Lösung

**In `overrides.css` am Ende:**

```css
/* Material for MkDocs Navigation + Overlay IMMER über Fullscreen-Karten */
.md-sidebar,
.md-nav,
.md-overlay,
.md-drawer {
  z-index: 2000 !important;
}

/* Verhindere Stacking-Context-Fallen bei Karten-Containern */
.map-container,
.map-container.fullscreen,
#map-container,
#map-container.fullscreen,
[data-map="herkunft"],
[data-map="variation"],
[data-map="variation_tempora"] {
  transform: none !important;
  filter: none !important;
  perspective: none !important;
}
```

**Geändert in Fullscreen-Containern:**
```css
/* ALT (FALSCH): */
#map-container.fullscreen {
  z-index: 9999 !important; /* Verdeckt Nav-Drawer! */
}

/* NEU (RICHTIG): */
#map-container.fullscreen {
  z-index: 1200 !important; /* Unter Nav-Drawer */
  transform: none !important; /* Kein neuer Stacking-Context */
}
```

## Referenzen

- **CO.RA.PAN Projekt** (Referenzimplementierung für responsive Popups)
- **Leaflet Dokumentation:** https://leafletjs.com/reference.html#popup
- **Material for MkDocs:** https://squidfunk.github.io/mkdocs-material/

---

**✅ Migration erfolgreich abgeschlossen**
