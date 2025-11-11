// docs/assets/javascripts/map_countries.js

// --- Vollbild-Handling ---
// Vollbild-Handling für die Variation-Map (eigener Name, um Konflikte zu vermeiden)
function toggleFullscreenVariation() {
  const container = document.getElementById('map-container');
  const btn = document.getElementById('fullscreen-btn');
  container.classList.toggle('fullscreen');
  btn.innerHTML = container.classList.contains('fullscreen')
    ? '<span class="material-icons">fullscreen_exit</span>'
    : '<span class="material-icons">fullscreen</span>';
  // variationMap wird unten lokal definiert; falls vorhanden, invaldiere Größe
  if (window.variationMap) {
    setTimeout(() => window.variationMap.invalidateSize(), 350);
  }
}

// Warten, bis das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // --- Leaflet Map ---
  // Zentriert auf den Atlantik
    if (document.getElementById('mapid')) {
    // Verwende eine lokal benannte Map-Instanz, die global unter window.variationMap erreichbar ist
    const variationMap = L.map('mapid');
    // Setze initiale Ansicht abhängig von der Bildschirmbreite:
    // - Auf Mobilgeräten zentrieren wir auf Zentral-/Mittelamerika
    // - Auf größeren Bildschirmen zeigen wir die Atlantik-Übersicht
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    if (isMobile) {
      // Mobile: zentriere stärker auf Zentral- und Südamerika (in der mobilen
      // Ansicht soll Central + South America deutlich sichtbar sein)
      // (lat, lon, zoom)
      variationMap.setView([-10, -65], 3);
    } else {
      // Desktop/Tablet: breite Atlantik-Übersicht (Amerika + Europa)
      variationMap.setView([20, -40], 2);
    }
    window.variationMap = variationMap;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(variationMap);

    // Daten laden und Marker setzen
    fetch('/assets/maps/countries.json')
      .then(r => r.json())
      .then(laender => {
        const bounds = L.latLngBounds([]);

        // Vorbereitung: max GDN finden für Skalierung
        const gdns = laender.map(l => Number(l.GDN || 0)).filter(n => !isNaN(n) && n > 0);
        const maxGdn = gdns.length ? Math.max(...gdns) : 1;

        // LayerGroup für Marker
        const markerLayer = L.layerGroup().addTo(variationMap);

        laender.forEach(eintrag => {
          // Länder können eine einzelne Koordinate [lat,lng] oder mehrere Koordinaten [[lat,lng], ...] enthalten
          const raw = eintrag.Koordinaten;
          const coords = Array.isArray(raw) && raw.length && typeof raw[0] === 'number' ? [raw] : (raw || []);

          coords.forEach((coord, i) => {
            if (!coord || coord.length !== 2) return; // skip invalid

            // Radius nach GDN (quadratische Skalierung für bessere Visualisierung)
            const gdn = Number(eintrag.GDN) || 0;
            const radius = gdn > 0 ? Math.max(4, 4 + 24 * Math.sqrt(gdn / maxGdn)) : 6;

            // Farbe nach Anteil_GDN (dunkleres Rot bei höherem Anteil)
            const anteil = Number(eintrag.Anteil_GDN) || 0; // percent
            const lightness = Math.max(30, 70 - anteil * 1.2); // 70% -> light, 30% -> dark
            const color = `hsl(0, 80%, ${lightness}%)`;

            const marker = L.circleMarker(coord, {
              color: color,
              fillColor: color,
              radius: radius,
              fillOpacity: 0.7,
              weight: 1
            }).addTo(markerLayer);

            // Popup (als tooltip-ähnliches Verhalten): verwenden wir Popups statt Tooltips,
            // weil Popups `keepInView` und `autoPan` unterstützen und so am Kartenrand
            // automatisch sichtbar gehalten werden können.
            const popupHtml = `
              <div class="popup-sprachenkarte">
                <div class="popup-title">${eintrag.Land ?? ''}</div>
                <div class="popup-hauptstadt">${eintrag.Hauptstadt ?? ''}</div>
                ${gdn ? `<div class="popup-line"><span class="popup-label">Anzahl Sprecher:innen:</span> <span class="popup-value">${Number(gdn).toLocaleString()}</span></div>` : ''}
                ${eintrag.Anteil_GDN ? `<div class="popup-line"><span class="popup-label">Anteil Hispanophonie:</span> <span class="popup-value">${eintrag.Anteil_GDN}%</span></div>` : ''}
              </div>`;

            marker.bindPopup(popupHtml, {autoPan: true, keepInView: true, offset: [0, -radius], maxWidth: 240});
            // Öffne Popup beim Hover, schließe beim Verlassen (tooltip-ähnliches Verhalten)
            marker.on('mouseover', function() { this.openPopup(); });
            marker.on('mouseout', function() { this.closePopup(); });
            // Allow click to toggle persistent popup
            marker.on('click', function() {
              if (this.isPopupOpen()) this.closePopup(); else this.openPopup();
            });

            bounds.extend(coord);
          });
        });

        if (bounds.isValid()) {
          // On mobile we want a Central America focused view; do not override
          // it with fitBounds so the map stays centered on the requested region.
          if (!isMobile) {
            variationMap.fitBounds(bounds.pad(0.1));
          }
        }
      })
      .catch(err => console.error('Fehler beim Laden der Länder-Daten:', err));
  } else {
    console.error('Map container #mapid not found');
  }
});