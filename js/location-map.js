const mapaUbicacion = L.map('mapaUbicacion').setView([43.120351, -89.31647], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    
      attribution: '&copy; OpenStreetMap contributors',
    
      maxZoom: 19
    
    }).addTo(mapaUbicacion);
    
    L.circleMarker([43.120351, -89.31647], { radius: 10, color: '#1a7a8a', fillColor: '#1a7a8a', fillOpacity: 0.9 })
    
    .addTo(mapaUbicacion)
    
    .bindPopup('Iglesia Fuente de Vida');
