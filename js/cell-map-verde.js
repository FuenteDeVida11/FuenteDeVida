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
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Allan RDZ',
        timoteo: 'N/A',
        address: '4060 Village Green ',
        lat: 43.14129681577106,
        lng: -89.30438937883382,
        dia: 'Martes',
        hora: '3:30 pm'
      },
        {
        id: 2,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Allan RDZ',
        timoteo: 'Pedro Benavidez',
        address: '457 Warbler Ln',
        lat: 43.13336265722114, 
        lng: -89.35275816349119,
        dia: 'Miercoles',
        hora: '6:00 pm'
      },
        {
        id: 3,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Levi Aleman',
        timoteo: 'David',
        address: '805 Redland Dr',
        lat: 43.10920405623755, 
        lng: -89.30445410397063,
        dia: 'Sabado',
        hora: '6:00 pm'
      },
       {
        id: 4,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Luisa',
        timoteo: 'Ines',
        address: '5148 Anton Dr',
        lat: 43.0235795169129, 
        lng: -89.47340337699086,
        dia: 'Sabado',
        hora: '12:00 pm'
      },
       {
        id: 5,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Eduarrdo Garcia',
        timoteo: 'Milton',
        address: '200 S Division St',
        lat: 43.19049878206165, 
        lng: -89.4465872481444,
        dia: 'Martes',
        hora: '6:30 pm'
      },
       {
        id: 6,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Eduardo Garcia',
        timoteo: 'Emiliano',
        address: '1717 Onsgard Rd',
        lat: 43.12241488761593, 
        lng: -89.32213441931297,
        dia: 'Miercoles',
        hora: '6:30 pm'
      },
       {
        id: 7,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Luisa',
        timoteo: 'Ines',
        address: '5148 Anton Dr',
        lat: 43.02354814265735, 
        lng: -89.47343556349821,
        dia: 'Sabado',
        hora: '12:00 am'
      },
       {
        id: 8,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Samantha',
        timoteo: 'N/A',
        address: '1244 Huxley St',
        lat: 43.11342795166993, 
        lng: -89.35992753068616,
        dia: 'Martes',
        hora: '6:30 pm'
      },
      {
        id: 9,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Sthephany Velez',
        timoteo: 'Carmen Pacehco',
        address: '1100 Preserve BLVD',
        lat:44.77864609702616, 
        lng: -93.90179412807561,
        dia: 'Viernes',
        hora: '6:30 pm'
      },
      {
        id: 10,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Lili Gonzalez',
        timoteo: 'Yoselin Cid',
        address: '229 Talon Sun Praire',
        lat:43.17888071116095, 
        lng: -89.22344004999565,
        dia: 'Lunes',
        hora: '5:30 pm'
      },
      {
        id: 11,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Mario Davila',
        timoteo: 'Carol, Erik',
        address: 'Leopold Way Madison',
        dia: 'Lunes',
        hora: '5:30 pm'
      },
          {
        id: 12,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Liseth',
        timoteo: 'Freddy',
        address: 'Darlington wi',
        dia: 'Sabado',
        hora: '11:00 am'
          },
               {
        id: 13,
        red: 'Red Verde',
        pastorDeRed: 'Luis Rosas',
        lideresDecelula: 'Liseth',
        timoteo: 'N/A',
        address: '7 Waunona Woods',
        dia: 'Viernes',
        hora: '11:30 am'
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
