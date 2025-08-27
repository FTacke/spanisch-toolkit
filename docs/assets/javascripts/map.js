// docs/assets/javascripts/map.js

// --- Vollbild-Handling ---
function toggleFullscreen() {
  const container = document.getElementById('map-container');
  const btn = document.getElementById('fullscreen-btn');
  container.classList.toggle('fullscreen');
  btn.innerHTML = container.classList.contains('fullscreen')
    ? '<span class="material-icons">fullscreen_exit</span>'
    : '<span class="material-icons">fullscreen</span>';
  setTimeout(() => map.invalidateSize(), 350);
}

// --- Leaflet Map ---
const map = L.map('mapid').setView([45, 15], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
}).addTo(map);

// Daten laden und Marker setzen
fetch('../../assets/maps/herkunftssprachen.json')
  .then(r => r.json())
  .then(sprachen => {
    const bounds = L.latLngBounds([]);

    sprachen.forEach(eintrag => {
      eintrag.koordinaten.forEach((coord, i) => {
        L.circleMarker(coord, {
          color: eintrag.farbe,
          radius: 8,
          fillOpacity: 0.7,
          weight: 2
        })
        .addTo(map)
        .bindPopup(
          `<div class="popup-sprachenkarte">
            <span class="popup-title">${eintrag.sprache}</span><br>
            <span class="popup-familie">${eintrag.sprachfamilie}</span><br>
            <div class="popup-herkunft">${eintrag.herkunft?.[i] ?? ''}</div>
          </div>`
        );

        bounds.extend(coord);
      });
    });

    if (bounds.isValid()) map.fitBounds(bounds.pad(0.1));
  });
