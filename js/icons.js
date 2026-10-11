/**
 * Íconos de línea (estilo Lucide) para el menú desplegable y las redes sociales.
 *
 * Reemplaza los <i class="fas fa-..."> por SVG inline creados con el DOM
 * (sin innerHTML, sin librerías ni CDN), por lo que respeta la CSP.
 * Si este script no carga, los íconos de Font Awesome siguen visibles como respaldo.
 * Para agregar un ícono: añade su geometría en ICONS y su clase de FA en FA_MAP.
 */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  // Geometría de cada ícono: [etiqueta, {atributos}]
  var ICONS = {
    'user-plus': [
      ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }],
      ['circle', { cx: 9, cy: 7, r: 4 }],
      ['line', { x1: 19, x2: 19, y1: 8, y2: 14 }],
      ['line', { x1: 22, x2: 16, y1: 11, y2: 11 }]
    ],
    'clock': [
      ['circle', { cx: 12, cy: 12, r: 10 }],
      ['path', { d: 'M12 6v6l4 2' }]
    ],
    'map-pin': [
      ['path', { d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' }],
      ['circle', { cx: 12, cy: 10, r: 3 }]
    ],
    'users': [
      ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }],
      ['path', { d: 'M16 3.128a4 4 0 0 1 0 7.744' }],
      ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }],
      ['circle', { cx: 9, cy: 7, r: 4 }]
    ],
    'scroll-text': [
      ['path', { d: 'M15 12h-5' }],
      ['path', { d: 'M15 8h-5' }],
      ['path', { d: 'M19 17V5a2 2 0 0 0-2-2H4' }],
      ['path', { d: 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3' }]
    ],
    'church': [
      ['path', { d: 'M10 9h4' }],
      ['path', { d: 'M12 7v5' }],
      ['path', { d: 'M14 22v-4a2 2 0 0 0-4 0v4' }],
      ['path', { d: 'M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22' }],
      ['path', { d: 'm18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7' }]
    ],
    'book-open': [
      ['path', { d: 'M12 5v16' }],
      ['path', { d: 'M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z' }]
    ],
    'circle-play': [
      ['path', { d: 'M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z' }],
      ['circle', { cx: 12, cy: 12, r: 10 }]
    ],
    'calendar-days': [
      ['path', { d: 'M8 2v3' }],
      ['path', { d: 'M16 2v3' }],
      ['rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }],
      ['path', { d: 'M3 9h18' }],
      ['path', { d: 'M8 13h.01' }],
      ['path', { d: 'M12 13h.01' }],
      ['path', { d: 'M16 13h.01' }],
      ['path', { d: 'M8 17h.01' }],
      ['path', { d: 'M12 17h.01' }],
      ['path', { d: 'M16 17h.01' }]
    ],
    'mail': [
      ['path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }],
      ['rect', { x: 2, y: 4, width: 20, height: 16, rx: 2 }]
    ],
    'hand-heart': [
      ['path', { d: 'M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16' }],
      ['path', { d: 'm14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95' }],
      ['path', { d: 'm2 15 6 6' }],
      ['path', { d: 'm7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91' }]
    ],
    'facebook': [
      ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' }]
    ],
    'instagram': [
      ['rect', { width: 20, height: 20, x: 2, y: 2, rx: 5, ry: 5 }],
      ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }],
      ['line', { x1: 17.5, x2: 17.51, y1: 6.5, y2: 6.5 }]
    ],
    'youtube': [
      ['path', { d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17' }],
      ['path', { d: 'm10 15 5-3-5-3z' }]
    ]
  };

  // Clase de Font Awesome -> ícono de línea
  var FA_MAP = {
    'fa-clipboard-check': 'user-plus',
    'fa-clock': 'clock',
    'fa-map-marker-alt': 'map-pin',
    'fa-users': 'users',
    'fa-book-open': 'scroll-text',
    'fa-cross': 'church',
    'fa-bible': 'book-open',
    'fa-video': 'circle-play',
    'fa-calendar-alt': 'calendar-days',
    'fa-envelope': 'mail',
    'fa-hand-holding-heart': 'hand-heart',
    'fa-facebook-f': 'facebook',
    'fa-instagram': 'instagram',
    'fa-youtube': 'youtube'
  };

  // Dónde se aplica cada grupo (se limita a menú y redes; el resto del sitio conserva Font Awesome)
  var GROUPS = [
    { selector: '.menu-col-links li a > i', cls: 'fdv-icon' },
    { selector: '.menu-social-btn > i', cls: 'fdv-icon fdv-icon--social' },
    { selector: '.red-social > i', cls: 'fdv-icon fdv-icon--inline' }
  ];

  function build(name, cls) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.75');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', cls);
    ICONS[name].forEach(function (part) {
      var el = document.createElementNS(NS, part[0]);
      Object.keys(part[1]).forEach(function (k) { el.setAttribute(k, part[1][k]); });
      svg.appendChild(el);
    });
    return svg;
  }

  function iconName(i) {
    for (var k = 0; k < i.classList.length; k++) {
      if (FA_MAP[i.classList[k]]) return FA_MAP[i.classList[k]];
    }
    return null;
  }

  GROUPS.forEach(function (group) {
    document.querySelectorAll(group.selector).forEach(function (i) {
      var name = iconName(i);
      if (name) i.replaceWith(build(name, group.cls));
    });
  });
})();
