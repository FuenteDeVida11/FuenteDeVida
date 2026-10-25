/*
 * Traducciones compartidas de las páginas de células (celulas-*.html) y de js/cell-map-*.js.
 * Requiere js/translations.js (window.fdvAddTranslations) cargado antes.
 */

// Ayudantes para traducir datos de las células (red, día) con respaldo al valor original
window.fdvCells = (function () {
  // Normaliza nombres de redes y días para construir claves de traducción.
  function norm(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  return {
    // 'Red Azul' -> clave celulas.red.azul
    red: function (name) {
      return window.t(
        "celulas.red." + norm(String(name).replace(/^red\s+/i, "")),
        name,
      );
    },
    // 'Viernes, Sabado' -> cada día se traduce por separado
    day: function (value) {
      return String(value)
        .split(",")
        .map(function (part) {
          var clean = part.trim();
          return window.t("celulas.day." + norm(clean), clean);
        })
        .join(", ");
    },
  };
})();

window.fdvAddTranslations("es", {
  // --- Contenido común de las páginas de células ---
  "celulas.title": "Conéctate en tu comunidad",
  "celulas.subtitle":
    "Únete a una célula y crece espiritualmente con tu comunidad de fe",
  "celulas.map": "Mapa",
  "celulas.list": "Lista",
  "celulas.cta.title": "¿Quieres saber más?",
  "celulas.cta.text":
    "Únete a nosotros en persona cada domingo y vive la experiencia completa.",
  "celulas.cta.button": "Ver Horarios",

  // --- Textos de los mapas y listas (js/cell-map-*.js) ---
  "celulas.pastor": "Pastor de red",
  "celulas.leaders": "Líderes de célula",
  "celulas.timoteo": "Timoteo",
  "celulas.day": "Día",
  "celulas.time": "Hora",
  "celulas.cell": "Célula",

  // --- Redes ---
  "celulas.red.azul": "Red Azul",
  "celulas.red.fdv": "Red Fuente de Vida",
  "celulas.red.guinda": "Red Guinda",
  "celulas.red.morada": "Red Morada",
  "celulas.red.roja": "Red Roja",
  "celulas.red.rosa": "Red Rosa",
  "celulas.red.verde": "Red Verde",

  // --- Días ---
  "celulas.day.lunes": "Lunes",
  "celulas.day.martes": "Martes",
  "celulas.day.miercoles": "Miércoles",
  "celulas.day.jueves": "Jueves",
  "celulas.day.viernes": "Viernes",
  "celulas.day.sabado": "Sábado",
  "celulas.day.sabados": "Sábados",
  "celulas.day.domingo": "Domingo",

  // --- Metadatos por página ---
  "meta.celulas-azul.title": "Células Azul | Fuente de Vida",
  "meta.celulas-azul.description":
    "Conoce la red azul de células de la Iglesia Fuente de Vida y su ministerio de comunidad y crecimiento espiritual.",
  "meta.celulas-azul.ogTitle": "Células Azul | Fuente de Vida",
  "meta.celulas-azul.ogDescription":
    "Red azul de células con comunidad, adoración y discipulado en Fuente de Vida.",

  "meta.celulas-fdv.title": "Células Fuente de Vida | Comunidad y Discipulado",
  "meta.celulas-fdv.description":
    "Descubre las células de Fuente de Vida en Madison y cómo la comunidad crece en fe, oración y discipulado.",
  "meta.celulas-fdv.ogTitle": "Células Fuente de Vida",
  "meta.celulas-fdv.ogDescription":
    "Células, comunidad y discipulado en la iglesia Fuente de Vida.",

  "meta.celulas-jovenes.title": "Células Jóvenes | Fuente de Vida",
  "meta.celulas-jovenes.description":
    "Únete a las células de jóvenes de Fuente de Vida para crecer en fe, amistad y propósito.",
  "meta.celulas-jovenes.ogTitle": "Células Jóvenes | Fuente de Vida",
  "meta.celulas-jovenes.ogDescription":
    "Nuestra comunidad de jovenes creciendo juntos en fe, oracion y discipulado.",

  "meta.celulas-morada.title": "Células Morada | Fuente de Vida",
  "meta.celulas-morada.description":
    "Conoce la red morada de células y su enfoque en la comunidad, la oración y el crecimiento espiritual.",
  "meta.celulas-morada.ogTitle": "Células Morada | Fuente de Vida",
  "meta.celulas-morada.ogDescription":
    "Red morada de células de Fuente de Vida en Madison, Wisconsin.",

  "meta.celulas-roja.title": "Células Roja | Fuente de Vida",
  "meta.celulas-roja.description":
    "Descubre la red roja de células Fuente de Vida y cómo se fortalece la comunidad cristiana.",
  "meta.celulas-roja.ogTitle": "Células Roja | Fuente de Vida",
  "meta.celulas-roja.ogDescription":
    "Grupo de células roja con raíces en oración, discipulado y comunidad.",

  "meta.celulas-rosa.title": "Células Rosa | Fuente de Vida",
  "meta.celulas-rosa.description":
    "Explora la red rosa de células Fuente de Vida y su misión de apoyar a familias y nuevos creyentes.",
  "meta.celulas-rosa.ogTitle": "Células Rosa | Fuente de Vida",
  "meta.celulas-rosa.ogDescription":
    "Células rosa con enfoque en familias, comunidad y crecimiento espiritual.",

  "meta.celulas-verde.title": "Células Verde | Fuente de Vida",
  "meta.celulas-verde.description":
    "Conoce la red verde de células en Fuente de Vida y su trabajo de evangelismo y discipulado.",
  "meta.celulas-verde.ogTitle": "Células Verde | Fuente de Vida",
  "meta.celulas-verde.ogDescription":
    "Red verde de células en Fuente de Vida, concentrada en evangelismo y comunidad.",
});

window.fdvAddTranslations("en", {
  // --- Shared content for the cell pages ---
  "celulas.title": "Connect with your community",
  "celulas.subtitle":
    "Join a cell group and grow spiritually with your faith community",
  "celulas.map": "Map",
  "celulas.list": "List",
  "celulas.cta.title": "Want to know more?",
  "celulas.cta.text":
    "Join us in person every Sunday and experience the full service.",
  "celulas.cta.button": "See Service Times",

  // --- Map and list texts (js/cell-map-*.js) ---
  "celulas.pastor": "Network pastor",
  "celulas.leaders": "Cell leaders",
  "celulas.timoteo": "Timothy",
  "celulas.day": "Day",
  "celulas.time": "Time",
  "celulas.cell": "Cell",

  // --- Networks ---
  "celulas.red.azul": "Blue Network",
  "celulas.red.fdv": "Fuente de Vida Network",
  "celulas.red.guinda": "Burgundy Network",
  "celulas.red.morada": "Purple Network",
  "celulas.red.roja": "Red Network",
  "celulas.red.rosa": "Pink Network",
  "celulas.red.verde": "Green Network",

  // --- Days ---
  "celulas.day.lunes": "Monday",
  "celulas.day.martes": "Tuesday",
  "celulas.day.miercoles": "Wednesday",
  "celulas.day.jueves": "Thursday",
  "celulas.day.viernes": "Friday",
  "celulas.day.sabado": "Saturday",
  "celulas.day.sabados": "Saturdays",
  "celulas.day.domingo": "Sunday",

  // --- Per-page metadata ---
  "meta.celulas-azul.title": "Blue Cell Groups | Fuente de Vida",
  "meta.celulas-azul.description":
    "Meet the blue network of cell groups at Fuente de Vida Church and its ministry of community and spiritual growth.",
  "meta.celulas-azul.ogTitle": "Blue Cell Groups | Fuente de Vida",
  "meta.celulas-azul.ogDescription":
    "The blue network of cell groups, with community, worship and discipleship at Fuente de Vida.",

  "meta.celulas-fdv.title":
    "Fuente de Vida Cell Groups | Community and Discipleship",
  "meta.celulas-fdv.description":
    "Discover the Fuente de Vida cell groups in Madison and how our community grows in faith, prayer and discipleship.",
  "meta.celulas-fdv.ogTitle": "Fuente de Vida Cell Groups",
  "meta.celulas-fdv.ogDescription":
    "Cell groups, community and discipleship at Fuente de Vida church.",

  "meta.celulas-jovenes.title": "Youth Cell Groups | Fuente de Vida",
  "meta.celulas-jovenes.description":
    "Join the Fuente de Vida youth cell groups to grow in faith, friendship and purpose.",
  "meta.celulas-jovenes.ogTitle": "Youth Cell Groups | Fuente de Vida",
  "meta.celulas-jovenes.ogDescription":
    "Our young people growing together in faith, prayer and discipleship.",

  "meta.celulas-morada.title": "Purple Cell Groups | Fuente de Vida",
  "meta.celulas-morada.description":
    "Meet the purple network of cell groups and its focus on community, prayer and spiritual growth.",
  "meta.celulas-morada.ogTitle": "Purple Cell Groups | Fuente de Vida",
  "meta.celulas-morada.ogDescription":
    "The purple network of Fuente de Vida cell groups in Madison, Wisconsin.",

  "meta.celulas-roja.title": "Red Cell Groups | Fuente de Vida",
  "meta.celulas-roja.description":
    "Discover the red network of Fuente de Vida cell groups and how it strengthens the Christian community.",
  "meta.celulas-roja.ogTitle": "Red Cell Groups | Fuente de Vida",
  "meta.celulas-roja.ogDescription":
    "The red network of cell groups, rooted in prayer, discipleship and community.",

  "meta.celulas-rosa.title": "Pink Cell Groups | Fuente de Vida",
  "meta.celulas-rosa.description":
    "Explore the pink network of Fuente de Vida cell groups and its mission to support families and new believers.",
  "meta.celulas-rosa.ogTitle": "Pink Cell Groups | Fuente de Vida",
  "meta.celulas-rosa.ogDescription":
    "Pink network cell groups focused on families, community and spiritual growth.",

  "meta.celulas-verde.title": "Green Cell Groups | Fuente de Vida",
  "meta.celulas-verde.description":
    "Meet the green network of cell groups at Fuente de Vida and its work in evangelism and discipleship.",
  "meta.celulas-verde.ogTitle": "Green Cell Groups | Fuente de Vida",
  "meta.celulas-verde.ogDescription":
    "The green network of cell groups at Fuente de Vida, focused on evangelism and community.",
});
