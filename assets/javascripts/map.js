// docs/assets/javascripts/map.js

// --- Vollbild-Handling ---
function toggleFullscreen() {
  var container = document.getElementById('map-container');
  var btn = document.getElementById('fullscreen-btn');
  if (container.classList.contains('fullscreen')) {
    container.classList.remove('fullscreen');
    btn.innerHTML = '<span class="material-icons">fullscreen</span>';
  } else {
    container.classList.add('fullscreen');
    btn.innerHTML = '<span class="material-icons">fullscreen_exit</span>';
  }
  // Leaflet muss die Größe neu berechnen!
  setTimeout(() => { map.invalidateSize(); }, 350);
}

// --- Leaflet Map ---
var map = L.map('mapid').setView([45, 15], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
}).addTo(map);

fetch('../../assets/maps/herkunftssprachen.json')
  .then(response => response.json())
  .then(sprachen => {
    sprachen.forEach(function(eintrag) {
      eintrag.koordinaten.forEach(function(coord, i) {
        L.circleMarker(coord, {
          color: eintrag.farbe,
          radius: 7,
          fillOpacity: 0.5
        })
        .addTo(map)
        .bindPopup(
          `<div class="popup-sprachenkarte">
              <span class="popup-title">${eintrag.sprache}</span><br>
              <span class="popup-familie">${eintrag.sprachfamilie}</span><br>
              <div class="popup-herkunft">${eintrag.herkunft[i]}</div>
          </div>`
        );
      });
    });
  });

// Karte initialisieren
var map = L.map('mapid');

var bounds = [
    [25, 0],
    [45, 100]
];
map.fitBounds(bounds);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
}).addTo(map);

// Lade Sprachdaten von JSON-Datei
fetch('../assets/maps/herkunftssprachen.json')
  .then(response => response.json())
  .then(sprachen => {
    sprachen.forEach(function(eintrag) {
      eintrag.koordinaten.forEach(function(coord, i) {
        L.circleMarker(coord, {
          color: eintrag.farbe,
          radius: 9,
          fillOpacity: 0.7
        })
        .addTo(map)
        .bindPopup(
          `<b>${eintrag.sprache}</b><br>${eintrag.herkunft[i]}<br><span style="font-size:0.9em;color:#777">${eintrag.sprachfamilie}</span>`
        );
      });
    });
  });
