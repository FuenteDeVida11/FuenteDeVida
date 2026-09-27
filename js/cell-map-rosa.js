// Network Colors
    const NETWORK_COLORS = {
      'Red Rosa': '#D4537E',
      'Red Morada': '#7F77DD',
      'Red Roja': '#E24B4A',
      'Red Guinda': '#7B2D3E',
      'Red Azul': '#378ADD',
      'Red Verde': '#639922'
    };

    // Cell Data
    const cellsData = [
      {
        id: 1,
        red: 'Red Rosa',
        pastorDeRed: 'Jorge Mac¿as',
        lideresDecelula: 'Jorge Mac¿as',
        timoteo: 'Jorge Jr',
        address: '1228 W South St',
        lat: 42.92763550627386,
        lng: -89.23788327451953,
        dia: 'Sabado',
        hora: '7:00 pm'
      },
      {
        id: 2,
        red: 'Red Rosa',
        pastorDeRed: 'Jorge Macias',
        lideresDecelula: 'Esgardo Trejo',
        timoteo: 'Carlos',
        address: '1609 N Thompson Dr',
        lat: 43.12037444467443,
        lng: -89.29781507698468,
        dia: 'Miercoles',
        hora: '7:00 pm'
      },
      {
        id: 3,
        red: 'Red Rosa',
        pastorDeRed: 'Jorge Mac¿as',
        lideresDecelula: 'Jaime Olivos',
        timoteo: 'N/A',
        address: '4678 Hayes Rd, Madison, WI',
        lat: 43.14281955087064,
        lng: -89.30171499047583,
        dia: 'Lunes',
        hora: '8:00 am'
      },
      {
        id: 4,
        red: 'Red Rosa',
        pastorDeRed: 'Jorge Mac¿as',
        lideresDecelula: 'Jose Rios',
        timoteo: 'N/A',
        address: '1922 Fordem Av',
        lat: 43.09842901513742,
        lng: -89.36432135979236,
        dia: 'Sabados',
        hora: '7:00 pm'
      }
    ];

    let map;
    let markers = [];
    let currentView = 'map';

    // Initialize Map
    function initMap() {
      map = L.map('map').setView([43.0731, -89.4012], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '¿ OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Add markers for each cell
      cellsData.forEach(cell => {
        const color = NETWORK_COLORS[cell.red] || '#1a7a8a';
        const marker = L.circleMarker([cell.lat, cell.lng], {
          radius: 12,
          fillColor: color,
          color: color,
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map);

        const popupContent = `
          <div class="popup-content">
            <div class="popup-badge" style="background-color: ${color};">${cell.red}</div>
            <div class="popup-info">
              <strong>Pastor de red:</strong> ${cell.pastorDeRed}
            </div>
            <div class="popup-info">
              <strong>Líderes de célula:</strong> ${cell.lideresDecelula}
            </div>
            <div class="popup-info">
              <strong>Timoteo:</strong> ${cell.timoteo}
            </div>
            <div class="popup-info">
              <i class="fas fa-map-pin"></i> ${cell.address}
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        markers.push(marker);
      });
    }

    // Render List View
    function renderListView() {
      const listContainer = document.getElementById('listContainer');
      listContainer.innerHTML = '';

      // Group cells by red (network)
      const groupedByRed = {};
      cellsData.forEach(cell => {
        if (!groupedByRed[cell.red]) {
          groupedByRed[cell.red] = [];
        }
        groupedByRed[cell.red].push(cell);
      });

      // Render each red group
      Object.entries(groupedByRed).forEach(([red, cells]) => {
        const color = NETWORK_COLORS[red] || '#1a7a8a';
        const redGroupHTML = `
          <div class="red-group">
            <div class="red-group-title">
              <div class="red-color-badge" style="background-color: ${color};"></div>
              ${red}
            </div>
            <div class="cells-grid">
              ${cells.map(cell => `
                <div class="cell-card" style="border-left-color: ${color};">
                  <div class="cell-badge" style="background-color: ${color};">${cell.red}</div>
                  <h3>Célula ${cell.id}</h3>
                  <div class="cell-info">
                    <strong>Pastor de red:</strong><br>${cell.pastorDeRed}
                  </div>
                  <div class="cell-info">
                    <strong>Líderes de célula:</strong><br>${cell.lideresDecelula}
                  </div>
                  <div class="cell-info">
                    <strong>Timoteo:</strong><br>${cell.timoteo}
                  </div>
                  <div class="cell-info">
                    <strong>Día:</strong> ${cell.dia}
                  </div>
                  <div class="cell-info">
                    <strong>Hora:</strong> ${cell.hora}
                  </div>
                  <div class="cell-address">
                    <i class="fas fa-map-pin"></i>
                    <span>${cell.address}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        listContainer.innerHTML += redGroupHTML;
      });
    }

    // Toggle View
    function toggleView(view) {
      currentView = view;
      const mapView = document.getElementById('mapView');
      const listView = document.getElementById('listView');
      const mapToggle = document.getElementById('mapToggle');
      const listToggle = document.getElementById('listToggle');

      if (view === 'map') {
        mapView.classList.remove('hidden');
        listView.classList.remove('active');
        mapToggle.classList.add('active');
        listToggle.classList.remove('active');
        setTimeout(() => map.invalidateSize(), 100);
      } else {
        mapView.classList.add('hidden');
        listView.classList.add('active');
        mapToggle.classList.remove('active');
        listToggle.classList.add('active');
        renderListView();
      }
    }

    // Event Listeners
    document.getElementById('mapToggle').addEventListener('click', () => toggleView('map'));
    document.getElementById('listToggle').addEventListener('click', () => toggleView('list'));

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
      initMap();
      renderListView();
    });
