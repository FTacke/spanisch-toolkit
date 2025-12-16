# Leaflet Maps Implementierung im Projekt

## Übersicht

Das Projekt verwendet drei verschiedene interaktive Leaflet-Karten, die jeweils unterschiedliche Daten visualisieren. Alle Karten folgen einem ähnlichen Architekturmuster, sind aber auf unterschiedlichen Seiten eingebunden, um ID-Konflikte zu vermeiden.

---

## 1. Hispanophonie-Karte (Variation: Länder & Sprecherzahlen)

### Speicherorte
- **Seite:** `docs/variation/map_countries.md`
- **JavaScript:** `docs/assets/javascripts/map_countries.js`
- **Daten (JSON):** `docs/assets/maps/countries.json`
- **CSS:** `docs/assets/stylesheets/overrides.css` (Scope: `[data-map="variation"]`)

### HTML-Struktur in map_countries.md
```html
<div id="map-container" data-map="variation">
  <button id="fullscreen-btn" onclick="toggleFullscreenVariation()">
    <span class="material-icons">fullscreen</span>
  </button>
  <div id="mapid"></div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<script src="/assets/javascripts/map_countries.js"></script>
```

### JavaScript-Architektur
```javascript
// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
  // Prüft, ob #mapid existiert
  if (document.getElementById('mapid')) {
    const variationMap = L.map('mapid');
    // ... Karteninitialisierung
    window.variationMap = variationMap;
  }
});

// Vollbild-Toggle (global verfügbar)
function toggleFullscreenVariation() {
  const container = document.getElementById('map-container');
  const btn = document.getElementById('fullscreen-btn');
  // ...
}
```

### Datenstruktur (countries.json)
```json
[
  {
    "Land": "Mexiko",
    "Hauptstadt": "Mexiko-Stadt",
    "Koordinaten": [19.4326, -99.1332],
    "GDN": 124781373,
    "Anteil_GDN": 25.1
  }
]
```

### Features
- Responsive Ansicht (Mobile: Lateinamerika-fokussiert, Desktop: Atlantik-Übersicht)
- CircleMarker mit dynamischer Größe basierend auf GDN (Anzahl Sprecher:innen)
- Farbintensität basierend auf Anteil an Hispanophonie
- Hover-Tooltips mit Land, Hauptstadt, Sprecherzahl, Anteil
- Vollbildmodus

---

## 2. Herkunftssprachen-Karte

### Speicherorte
- **Seite:** `docs/herkunftssprachen.md`
- **JavaScript:** `docs/assets/javascripts/map.js`
- **Daten (JSON):** `docs/assets/maps/herkunftssprachen.json`
- **CSS:** `docs/assets/stylesheets/overrides.css` (Standard-Styles)

### HTML-Struktur in herkunftssprachen.md
```html
<div id="map-container" data-map="herkunft">
  <button id="fullscreen-btn" onclick="toggleFullscreen()">
    <span class="material-icons">fullscreen</span>
  </button>
  <div id="mapid"></div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

**Wichtig:** Das Script `map.js` wird NICHT in der Markdown-Datei eingebunden, sondern global in `mkdocs.yml`!

### JavaScript-Architektur
```javascript
// KEIN DOMContentLoaded! Code läuft sofort
const herkunftContainer = document.querySelector('[data-map="herkunft"]');
if (herkunftContainer) {
  function toggleFullscreen() {
    const container = herkunftContainer;
    const btn = container.querySelector('#fullscreen-btn');
    // ...
  }
  window.toggleFullscreen = toggleFullscreen;

  const mapEl = herkunftContainer.querySelector('#mapid');
  if (mapEl) {
    const map = L.map(mapEl).setView([45, 15], 3);
    window.herkunftMap = map;
    // ...
  }
}
```

### Datenstruktur (herkunftssprachen.json)
```json
[
  {
    "sprache": "Türkisch",
    "sprachfamilie": "Turksprachen",
    "herkunft": ["Türkei"],
    "koordinaten": [[39.9334, 32.8597]],
    "farbe": "#e74c3c"
  }
]
```

### Features
- Mehrere Koordinaten pro Sprache möglich
- Farbcodierung nach Sprachfamilie
- Popups mit Sprache, Sprachfamilie, Herkunft
- Vollbildmodus

---

## 3. Variation Tempora-Karte (Perfecto compuesto vs. simple)

### Speicherorte
- **Seite:** `docs/variation/variation_grammatik.md`
- **JavaScript:** `docs/assets/javascripts/map_variation_tempora.js`
- **Daten (JSON):** `docs/assets/maps/variation_tempora.json`
- **CSS:** `docs/assets/stylesheets/overrides.css` (Scope: `[data-map="variation_tempora"]`)

### HTML-Struktur in variation_grammatik.md
```html
<div id="map-container" data-map="variation_tempora">
  <button id="fullscreen-btn" onclick="toggleFullscreenTempora()">
    <span class="material-icons">fullscreen</span>
  </button>
  <div id="mapid"></div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<script src="/assets/javascripts/map_variation_tempora.js"></script>
```

### JavaScript-Architektur
```javascript
// DOMContentLoaded Event Listener (wie map.js, aber mit DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
  const temporaContainer = document.querySelector('[data-map="variation_tempora"]');
  if (!temporaContainer) return;

  function toggleFullscreenTempora() {
    const container = temporaContainer;
    const btn = container.querySelector('#fullscreen-btn');
    // ...
  }
  window.toggleFullscreenTempora = toggleFullscreenTempora;

  const mapEl = temporaContainer.querySelector('#mapid');
  if (mapEl) {
    const map = L.map(mapEl);
    window.temporaMap = map;
    // ...
  }
});
```

### Datenstruktur (variation_tempora.json)
```json
[
  {
    "Land": "Spanien (Zentrum)",
    "Hauptstadt": "Madrid",
    "Koordinaten": [40.416775, -3.70379],
    "Perfecto compuesto": "häufig bei Jetztbezug (hoy, esta mañana)",
    "Perfecto simple": "für abgeschlossene Vergangenheit",
    "Verwendung der Tempora": "Prototypischer Wert"
  }
]
```

### Features
- Responsive Ansicht (Mobile: Lateinamerika-fokussiert, Desktop: Atlantik-Übersicht)
- Einheitliche Marker-Größe (keine Skalierung nach Daten)
- Farbcodierung nach Verwendungsmuster (optional, vorbereitet)
- Popups zeigen nur gefüllte Felder an
- Vollbildmodus

---

## Globale Einbindung in mkdocs.yml

```yaml
extra_css:
  - assets/stylesheets/overrides.css
  - https://unpkg.com/leaflet/dist/leaflet.css

extra_javascript:
  - https://unpkg.com/leaflet/dist/leaflet.js
  - assets/javascripts/map.js  # Nur für Herkunftssprachen-Karte!
```

**Wichtig:** 
- Leaflet.js wird global geladen
- `map.js` (Herkunftssprachen) wird global geladen
- `map_countries.js` und `map_variation_tempora.js` werden **in den jeweiligen Markdown-Dateien** eingebunden

---

## Architektur-Muster & Best Practices

### ID-Strategie
Alle Karten verwenden die **gleichen generischen IDs** (`map-container`, `fullscreen-btn`, `mapid`), aber:
- Sie sind auf **verschiedenen Seiten** → kein Konflikt, da nur eine Seite gleichzeitig geladen ist
- Jeder Container hat ein **eindeutiges `data-map` Attribut** zur CSS-Isolierung:
  - `data-map="variation"` für Hispanophonie
  - `data-map="herkunft"` für Herkunftssprachen
  - `data-map="variation_tempora"` für Tempora-Variation

### JavaScript-Initialisierung

Es gibt zwei Muster:

**Pattern 1: DOMContentLoaded mit getElementById** (map_countries.js)
```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('mapid')) {
    const map = L.map('mapid');
    // ...
  }
});
```

**Pattern 2: querySelector auf Container** (map.js, map_variation_tempora.js)
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-map="xyz"]');
  if (!container) return;
  
  const mapEl = container.querySelector('#mapid');
  if (mapEl) {
    const map = L.map(mapEl);
    // ...
  }
});
```

**Pattern 2 ist robuster**, da es:
- Gezielt nach dem Container mit `data-map` Attribut sucht
- Innerhalb des Containers nach Elementen sucht (kein globales getElementById)
- Keine Konflikte verursacht, selbst wenn mehrere Karten auf einer Seite wären

### CSS-Scoping

Styles sind über das `data-map` Attribut isoliert:

```css
/* Nur für Hispanophonie-Karte */
#map-container[data-map="variation"] {
  height: 650px;
}

/* Nur für Tempora-Karte */
#map-container[data-map="variation_tempora"] {
  height: 500px;
}
```

### Vollbild-Funktionen

Jede Karte hat ihre eigene global verfügbare Toggle-Funktion:
- `toggleFullscreenVariation()` für Hispanophonie
- `toggleFullscreen()` für Herkunftssprachen
- `toggleFullscreenTempora()` für Tempora

Diese sind global, damit sie von `onclick` Attributen aufgerufen werden können.

### Map-Instanzen

Jede Karte speichert ihre Instanz global:
- `window.variationMap` für Hispanophonie
- `window.herkunftMap` für Herkunftssprachen
- `window.temporaMap` für Tempora

Wird für `invalidateSize()` beim Fullscreen-Toggle benötigt.

---

## Popup-Darstellung

Alle Karten verwenden Hover-Tooltips mit Click-Toggle:

```javascript
marker.bindPopup(popupHtml, {
  autoPan: true, 
  keepInView: true, 
  offset: [0, -radius], 
  maxWidth: 300
});

marker.on('mouseover', function() { this.openPopup(); });
marker.on('mouseout', function() { this.closePopup(); });
marker.on('click', function() {
  if (this.isPopupOpen()) this.closePopup(); 
  else this.openPopup();
});
```

### Popup-HTML-Struktur

```html
<div class="popup-sprachenkarte">
  <div class="popup-title">Land/Region</div>
  <div class="popup-hauptstadt">Hauptstadt</div>
  <div class="popup-line">
    <span class="popup-label">Label:</span> 
    <span class="popup-value">Wert</span>
  </div>
</div>
```

**Wichtig:** Nur gefüllte Felder werden angezeigt (bedingte Template-Logik mit `${field ? ... : ''}`).

---

## Troubleshooting

### Problem: "L is not defined"
**Ursache:** Leaflet.js noch nicht geladen
**Lösung:** Code in `DOMContentLoaded` Event-Listener wrappen

### Problem: "Leerer String an getElementById()"
**Ursache:** Mehrere Elemente mit gleicher ID auf verschiedenen Seiten
**Lösung:** Verwende `querySelector` auf Container mit `data-map` Attribut

### Problem: Karte wird nicht angezeigt
**Checks:**
1. Ist der Container vorhanden? (`document.querySelector('[data-map="xyz"]')`)
2. Ist Leaflet.js geladen? (vor dem eigenen Script in mkdocs.yml)
3. Hat der Container eine Höhe? (CSS prüfen)
4. Console-Fehler prüfen

### Problem: Source-Map-Fehler
**Info:** Harmlose Warnung von Leaflet CDN, kann ignoriert werden
**Optional:** Leaflet lokal hosten statt CDN

---

## Erweiterung: Neue Karte hinzufügen

1. **JSON-Datei erstellen** in `docs/assets/maps/`
2. **JavaScript-Datei erstellen** in `docs/assets/javascripts/`
   - Pattern 2 verwenden (querySelector auf Container)
   - Eindeutigen `data-map` Wert wählen
   - Eindeutigen Toggle-Funktionsnamen wählen
   - Eindeutige window.mapName Instanz wählen
3. **CSS hinzufügen** in `overrides.css` mit `[data-map="xyz"]` Scope
4. **Markdown einbinden**:
   ```html
   <div id="map-container" data-map="xyz">
     <button id="fullscreen-btn" onclick="toggleFullscreenXyz()">
       <span class="material-icons">fullscreen</span>
     </button>
     <div id="mapid"></div>
   </div>
   <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   <script src="/assets/javascripts/map_xyz.js"></script>
   ```

---

## Dateiübersicht

```
docs/
├── assets/
│   ├── javascripts/
│   │   ├── map.js                      # Herkunftssprachen (global in mkdocs.yml)
│   │   ├── map_countries.js            # Hispanophonie (lokal in MD)
│   │   └── map_variation_tempora.js    # Tempora (lokal in MD)
│   ├── maps/
│   │   ├── countries.json              # Hispanophonie-Daten
│   │   ├── herkunftssprachen.json      # Herkunftssprachen-Daten
│   │   └── variation_tempora.json      # Tempora-Daten
│   └── stylesheets/
│       └── overrides.css               # Alle Karten-Styles
├── variation/
│   ├── map_countries.md                # Hispanophonie-Seite
│   └── variation_grammatik.md          # Tempora-Seite (Karte integriert)
└── herkunftssprachen.md                # Herkunftssprachen-Seite

mkdocs.yml                               # Globale Leaflet-Einbindung
```

---

**Stand:** 16.12.2025  
**Autor:** Felix Tacke
