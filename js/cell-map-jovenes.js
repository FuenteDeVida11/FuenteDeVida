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
        red: 'Red Guinda',
        pastorDeRed: 'Jennifer Alejandro',
        lideresDecelula: 'Joana Basilio',
        timoteo: 'Monica Mora',
        address: '2017 Danbury St',
        lat: 43.03224189034868,
        lng: -89.44652707699028,
        dia: 'Jueves',
        hora: '7:30 pm'
      },
      {
        id: 2,
        red: 'Red Guinda',
        pastorDeRed: 'Jennifer Alejandro',
        lideresDecelula: 'Jacobo Castillo',
        timoteo: 'Anthony',
        address: '603 Capital Dr',
        lat: 43.24477096779275, 
        lng: -89.48643876163356,
        dia: 'Jueves',
        hora: '7:00 pm'
      },
      {
        id: 3,
        red: 'Red Guinda',
        pastorDeRed: 'Jennifer Alejandro',
        lideresDecelula: 'Waldemar',
        timoteo: 'Jeison Velazquez',
        address: '5152 Anton Dr',
        lat:43.02275964467216, 
        lng: -89.47266953651298,
        dia: 'Jueves',
        hora: '7:00 am'
      },
      {
        id: 4,
        red: 'Red Guinda',
        pastorDeRed: 'Jennifer Alejandro',
        lideresDecelula: 'Jaqueline Robles',
        timoteo: 'N/A',
        address: '2841 Jackson St Stoughton',
        lat: 42.92437936465295,
        lng: -89.25854537699719,
        dia: 'Martes',
        hora: '6:30 pm'
      },
       {
        id: 5,
        red: 'Red Guinda',
        pastorDeRed: 'Jennifer Alejandro',
        lideresDecelula: 'Jose R, Jose V, Jenny',
        timoteo: 'Ruby',
        address: '3939 lien road',
        lat:43.12040502324124, 
        lng: -89.3162783872511,
        dia: 'MIercoles',
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
