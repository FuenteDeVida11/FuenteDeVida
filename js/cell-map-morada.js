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
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Rebeca Macias',
        timoteo: 'Alicia/Dexi',
        address: '4546 Thurston Ln',
        lat: 43.03165559214676,
        lng: -89.4559427751398,
        dia: 'Martes',
        hora: '7:30 pm'
      },
        {
        id: 2,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Lino',
        timoteo: 'N/A',
        address: '2405 Chalet Gardens',
        lat: 43.028689729518284,
        lng: -89.46306619048313,
        dia: 'Viernes',
        hora: '8:00 pm'
      },
        {
        id: 3,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Aaron Rea',
        timoteo: 'Sofia Sanches',
        address: '6823 Park Edge Madison',
        lat: 43.05009633055052,
        lng: -89.49820707036066,
        dia: 'Viernes',
        hora: '7:00 pm'
      },
       {
        id: 4,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Raymundo Bautista',
        timoteo: 'Mario',
        address: '2202 Post Roas Fitchburg',
        lat: 43.02723109013108,
        lng: -89.41738659233376,
        dia: 'Martes',
        hora: '7:00 pm'
      },
       {
        id: 5,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Raymundo Bautista',
        timoteo: 'N/A',
        address: '1907 Eggum Rd Mount Horeb',
        lat: 43.00155866687463,
        lng: -89.71155674630592,
        dia: 'Lunes',
        hora: '7:00 pm'
      },
       {
        id: 6,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Raymundo Bautista',
        timoteo: 'Luiz Lopez',
        address: '4910 Marvin Ave',
        lat: 43.03668611575562,
        lng: -89.46181993281105,
        dia: 'Viernes',
        hora: '7:00 pm'
      },
      
       {
        id: 7,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Raymundo Bautista',
        timoteo: 'N/A',
        address: '2106 Red Trail Apt 7',
        dia: 'Sabado',
        hora: '2:30 pm'
      },
        {
        id: 8,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Ramon',
        timoteo: 'Marcelino',
        address: 'Fish Hatcehry',
        dia: 'Lunes',
        hora: '7:00 pm'
      },
      {
        id: 9,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Carlos Barrera',
        timoteo: 'Yaquelin Acuna',
        address: 'Comercial Ave',
        dia: 'Viernes',
        hora: '7:00 pm'
      },
      {
        id: 10,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Carlos Barrera',
        timoteo: 'N/A',
        address: 'Sun Praire',
        dia: 'Sabado',
        hora: '7:00 pm'
      },
      {
        id: 11,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Carlos Barrera',
        timoteo: 'Yaquelin Acuna',
        address: 'Fish Hatchery',
        dia: 'Sabado',
        hora: '5:00 pm'
      },
      {
        id: 12,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Carlos Barrera',
        timoteo: 'N/A',
        address: 'Greenways Cross',
        dia: 'Jueves',
        hora: '7:00 pm'
      },
      {
        id: 13,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Daniel Mota',
        timoteo: 'N/A',
        address: 'West',
        dia: 'Viernes',
        hora: '6:30 am'
      },
      {
        id: 14,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Osmara Macias',
        timoteo: 'N/A',
        address: 'West',
        dia: 'Martes',
        hora: '6:30 pm'
      },
      {
        id: 15,
        red: 'Red Morada',
        pastorDeRed: 'Omar Robles',
        lideresDecelula: 'Omar Robles',
        timoteo: 'Daniel',
        address: 'Stougthon',
        dia: 'Jueves',
        hora: '8:30 pm'
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
