// Mapa de ubicación de la iglesia (Leaflet). Se inicia solo en los contenedores que existan en la página.
(function () {
  var ids = ["mapaUbicacion", "mapaOracion"];
  if (typeof L === "undefined") return;

  ids.forEach(function (id) {
    if (!document.getElementById(id)) return;

    var mapa = L.map(id).setView([43.120351, -89.31647], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapa);

    L.circleMarker([43.120351, -89.31647], {
      radius: 10,
      color: "#1a7a8a",
      fillColor: "#1a7a8a",
      fillOpacity: 0.9,
    })
      .addTo(mapa)
      .bindPopup("Iglesia Fuente de Vida");
  });
})();
