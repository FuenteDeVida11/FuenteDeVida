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
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Martha Amaya',
        timoteo: 'Ana Soto',
        address: '15 Kessel Court 34',
        lat: 43.04753700030561,
        lng: -89.47966625979561,
        dia: 'Jueves',
        hora: '12:00 pm'
      },
        {
        id: 2,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Gladis Castro',
        timoteo: 'Jorge',
        address: '319 Island Dr Madison',
        lat: 43.062721335429075,
        lng: -89.48537163095888,
        dia: 'Jueves',
        hora: '6:30 pm'
      },
        {
        id: 3,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Facundo',
        timoteo: 'Reyna',
        address: '4876 Brassica Rd Fitchburg',
        lat: 43.013330044321414,
        lng: -89.37270035979779,
        dia: 'Martes',
        hora: '7:00 pm'
      },
       {
        id: 4,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Reyna Alejandro',
        timoteo: 'N/A',
        address: '1719 Onsgard Rd',
        lat: 43.12247753496569,
        lng: -89.32190135979084,
        dia: 'Jueves',
        hora: '7:00 pm'
      },
       {
        id: 5,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Ricardo Chavarria',
        timoteo: 'Christian Lopez',
        address: '5226 Pacadilly',
        lat: 43.1013480792046, 
        lng: -89.2905757904785,
        dia: 'Miercoles',
        hora: '7:30 pm'
      },
       {
        id: 6,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Ricardo Chavarria',
        timoteo: 'Yuretzy castillo',
        address: '4702 Dutch Mill',
        lat: 43.05056559469954, 
        lng: -89.3015575497344,
        dia: 'Martes',
        hora: '8:15 pm'
      },
       {
        id: 7,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Ricardo Chavarria',
        timoteo: 'Heidy Alanis',
        address: '200 Der Valley 7',
        lat: 43.034896071521146, 
        lng: -89.38698395979642,
        dia: 'Jueves',
        hora: '7:00 pm'
      },
       {
        id: 8,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Ricardo Chavarria',
        timoteo: 'Kenia Moran',
        address: '2818 Curry Rd',
        lat: 43.03409807345884, 
        lng: -89.42658680397547,
        dia: 'Martes',
        hora: '7:00 pm'
      },
      {
        id: 9,
        red: 'Red Roja',
        pastorDeRed: 'Ricardo Chavarria',
        lideresDecelula: 'Martha Amaya',
        timoteo: 'N/A',
        address: '606 Mark Dr',
        lat: 42.989956528467964, 
        lng: -89.54477276164985,
        dia: 'Miercoles',
        hora: '6:00 pm'
      },
      
      
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
