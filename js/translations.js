/*
 * Traducciones compartidas del sitio (Español / Inglés).
 *
 * - Son objetos JS (no JSON por fetch) para que funcionen con file:// y con la CSP actual.
 * - Las claves son planas y con punto: "seccion.elemento".
 * - El español es el idioma base: el HTML ya trae el texto en español como respaldo.
 * - Las páginas internas agregan sus propias claves en js/translations-<pagina>.js
 *   usando window.fdvAddTranslations('es' | 'en', { ... }).
 * - Marcadores admitidos en las cadenas: {nombre} se reemplaza con los parámetros de t().
 */
window.FDV_TRANSLATIONS = window.FDV_TRANSLATIONS || { es: {}, en: {} };

// Mezcla un bloque de claves dentro del idioma indicado
window.fdvAddTranslations = function (lang, dictionary) {
  var target = (window.FDV_TRANSLATIONS[lang] =
    window.FDV_TRANSLATIONS[lang] || {});
  Object.keys(dictionary).forEach(function (key) {
    target[key] = dictionary[key];
  });
};

/* ========================================================================
   ESPAÑOL (idioma por defecto)
   ======================================================================== */
window.fdvAddTranslations("es", {
  // --- Selector de idioma ---
  "lang.group": "Idioma / Language",
  "lang.title": "Idioma",

  // --- Navegación superior ---
  "nav.home": "Inicio - Fuente de Vida",
  "nav.logoAlt": "Logo Fuente de Vida",
  "nav.sermons": "Sermones",
  "nav.history": "Historia",
  "nav.leadership": "Liderazgo",
  "nav.beliefs": "Creencias",
  "nav.events": "Eventos",
  "nav.donate": "Donaciones",
  "nav.openMenu": "Abrir menú de navegación",
  "nav.closeMenu": "Cerrar menú",
  "nav.mainMenu": "Menú principal",

  // --- Barras laterales ---
  "sidebar.follow": "SÍGUENOS",
  "sidebar.discover": "DESCUBRE",
  "sidebar.discoverAria": "Descubre más, ir a la siguiente sección",
  "sidebar.muteOn": "Activar sonido del video",
  "sidebar.muteOff": "Silenciar video",
  "hero.aria": "Portada",

  // --- Menú desplegable ---
  "menu.visit": "Visítanos",
  "menu.about": "Nosotros",
  "menu.resources": "Recursos",
  "menu.connect": "Conecta",
  "menu.registro": "Registro de Visitas",
  "menu.schedule": "Horarios",
  "menu.location": "Ubicación",
  "menu.leadership": "Liderazgo",
  "menu.history": "Nuestra Historia",
  "menu.beliefs": "Nuestras Creencias",
  "menu.bible": "Lectura Bíblica",
  "menu.sermon": "Último Sermón",
  "menu.events": "Ver Eventos",
  "menu.contact": "Contacto",
  "menu.donate": "Donaciones",
  "menu.social": "Redes Sociales",

  // --- Pie de página y botones flotantes ---
  "footer.copyright":
    "2026 Iglesia Apostólica de la Fe en Cristo Jesús – Madison, WI",
  "footer.phone": "Llámanos por teléfono",
  "footer.whatsapp": "Escríbenos por WhatsApp",
  "footer.email": "Envíanos un correo electrónico",
  "scrollTop.aria": "Subir a la parte superior de la página",
  "scrollTop.title": "Subir",

  // --- Llamado a la acción del pie (index) ---
  "cta.title": "Te Esperamos",
  "cta.text":
    "Las puertas están abiertas para ti y tu familia. Ven tal como eres y vive una experiencia con Dios.",
  "cta.history": "Nuestra Historia",
  "cta.beliefs": "Nuestras Creencias",

  // --- Formatos de fecha ---
  "date.month.1": "Enero",
  "date.month.2": "Febrero",
  "date.month.3": "Marzo",
  "date.month.4": "Abril",
  "date.month.5": "Mayo",
  "date.month.6": "Junio",
  "date.month.7": "Julio",
  "date.month.8": "Agosto",
  "date.month.9": "Septiembre",
  "date.month.10": "Octubre",
  "date.month.11": "Noviembre",
  "date.month.12": "Diciembre",
  "date.locale": "es-ES",

  // --- Metadatos (SEO): meta.<pagina>.* ---
  "meta.index.title": "Fuente de Vida | Iglesia Cristiana en Madison, WI",
  "meta.index.description":
    "Iglesia Fuente de Vida en Madison, Wisconsin. Servicios dominicales bilingües, eventos, liderazgo, células y comunidad cristiana.",
  "meta.index.ogTitle": "Fuente de Vida | Iglesia Cristiana en Madison, WI",
  "meta.index.ogDescription":
    "Servicios dominicales bilingües, eventos, liderazgo, células y comunidad cristiana en Madison, Wisconsin.",
  "meta.index.ldDescription":
    "Iglesia Fuente de Vida en Madison, Wisconsin, con servicios bilingües, comunidad, células y eventos cristianos.",

  // --- Registro de visitas ---
  "visitas.title": "Registro de Visitas",
  "visitas.intro":
    "Nos alegra que estés interesado en visitarnos. Regístrate aquí para que podamos darte la bienvenida y prepararnos para recibirte.",
  "visitas.name": "Nombre",
  "visitas.namePh": "Tu nombre completo",
  "visitas.time": "Hora en la que asistirás",
  "visitas.morning": "Mañana",
  "visitas.morningTime": "12:00 pm (Bilingüe)",
  "visitas.evening": "Tarde",
  "visitas.eveningTime": "5:30 pm (Español)",
  "visitas.invitedBy": "¿Quién lo/la invitó?",
  "visitas.invitedByPh": "Nombre de la persona que te invitó",
  "visitas.email": "Correo Electrónico",
  "visitas.emailPh": "tu@correo.com",
  "visitas.phone": "Teléfono",
  "visitas.honeypot": "No llenar este campo",
  "visitas.submit": "Registrarme",
  "visitas.confidential":
    "Tus datos serán tratados con confidencialidad y solo se utilizarán para mejorar tu experiencia en nuestra iglesia.",
  "visitas.sending": "Enviando...",
  "visitas.cooldown":
    "Ya enviaste el formulario. Espera {seconds} segundos antes de intentar de nuevo.",
  "visitas.errRequired": "Por favor completa los campos obligatorios.",
  "visitas.errTime": "Selecciona la hora en la que asistirás.",
  "visitas.errEmail": "Ingresa un correo electrónico válido.",
  "visitas.errOffline":
    "No estás conectado a internet. Intenta de nuevo cuando tengas conexión.",
  "visitas.success": "¡Registro enviado correctamente! Te esperamos.",
  "visitas.error":
    "Error al enviar. Intenta de nuevo o contáctanos directamente.",
  "visitas.errBlocked":
    "El servicio de correo bloqueó el envío desde este entorno.",
  "visitas.openSecurity": "Abrir configuración de seguridad en EmailJS",
  "visitas.orHost":
    "O sirve el sitio desde HTTP (por ejemplo Live Server o python -m http.server) para evitar el bloqueo.",

  // --- Ubicación ---
  "ubicacion.title": "Ubicación",
  "ubicacion.mapAria": "Mapa de ubicación de Iglesia Fuente de Vida",
  "ubicacion.directions": "Cómo llegar",

  // --- Horarios ---
  "horarios.title": "Horarios de Servicios",
  "horarios.sunday": "Domingo",
  "horarios.time1": "12:00 pm",
  "horarios.service1": "Servicio Bilingüe",
  "horarios.time2": "5:30 pm",
  "horarios.service2": "Servicio en Español",

  // --- Qué es Fuente de Vida ---
  "about.title": "¿Qué es Fuente de Vida?",
  "about.text":
    "Somos un grupo de personas redimidos por el amor de JESUCRISTO, dispuestos a servir con amor y pasión para la gloria de Dios.",
  "about.welcome": "¡Bienvenidos a Fuente de Vida!",
  "about.more": "Aprende Más",

  // --- Liderazgo (resumen en index) ---
  "liderazgo.title": "Liderazgo",
  "liderazgo.role": "Pastores de Fuente de Vida, Madison WI",
  "liderazgo.cta": "Conoce Nuestros Líderes",

  // --- Contacto ---
  "contacto.title": "Información de Contacto",
  "contacto.phone": "Teléfono",
  "contacto.whatsappSub": "Escríbenos",
  "contacto.emailSub": "Contáctanos por Email",
  "contacto.socialTitle": "Síguenos en Redes Sociales",
  "contacto.facebookAria": "Facebook de Fuente de Vida",
  "contacto.instagramAria": "Instagram de Fuente de Vida",
  "contacto.youtubeAria": "YouTube de Fuente de Vida",

  // --- Lectura bíblica ---
  "biblia.title": "Lectura Bíblica",
  "biblia.intro": "Lee la Palabra de Dios en diferentes versiones.",
  "biblia.versionAria": "Versión de la Biblia",
  "biblia.placeholder": "Ej: Juan 3:16",
  "biblia.passageAria": "Pasaje bíblico",
  "biblia.search": "Buscar",
  "biblia.errInvalidRef":
    "No pude entender la referencia. Intenta algo como 'Juan 3 16' o 'Juan 3:16'.",
  "biblia.errTimeout":
    "La búsqueda tardó demasiado. Verifica tu conexión e intenta de nuevo.",
  "biblia.errFetch":
    "No se pudo obtener el pasaje. Verifica la escritura o inténtalo más tarde.",
});

/* ========================================================================
   ENGLISH
   ======================================================================== */
window.fdvAddTranslations("en", {
  // --- Language switcher ---
  "lang.group": "Idioma / Language",
  "lang.title": "Language",

  // --- Top navigation ---
  "nav.home": "Home - Fuente de Vida",
  "nav.logoAlt": "Fuente de Vida logo",
  "nav.sermons": "Sermons",
  "nav.history": "Our Story",
  "nav.leadership": "Leadership",
  "nav.beliefs": "Beliefs",
  "nav.events": "Events",
  "nav.donate": "Donate",
  "nav.openMenu": "Open navigation menu",
  "nav.closeMenu": "Close menu",
  "nav.mainMenu": "Main menu",

  // --- Side bars ---
  "sidebar.follow": "FOLLOW US",
  "sidebar.discover": "DISCOVER",
  "sidebar.discoverAria": "Discover more, go to the next section",
  "sidebar.muteOn": "Turn video sound on",
  "sidebar.muteOff": "Mute video",
  "hero.aria": "Cover",

  // --- Drop-down menu ---
  "menu.visit": "Visit Us",
  "menu.about": "About Us",
  "menu.resources": "Resources",
  "menu.connect": "Connect",
  "menu.registro": "Visitor Registration",
  "menu.schedule": "Service Times",
  "menu.location": "Location",
  "menu.leadership": "Leadership",
  "menu.history": "Our Story",
  "menu.beliefs": "What We Believe",
  "menu.bible": "Bible Reading",
  "menu.sermon": "Latest Sermon",
  "menu.events": "View Events",
  "menu.contact": "Contact",
  "menu.donate": "Give",
  "menu.social": "Social Media",

  // --- Footer and floating buttons ---
  "footer.copyright":
    "2026 Apostolic Church of the Faith in Christ Jesus – Madison, WI",
  "footer.phone": "Call us",
  "footer.whatsapp": "Message us on WhatsApp",
  "footer.email": "Send us an email",
  "scrollTop.aria": "Back to the top of the page",
  "scrollTop.title": "Back to top",

  // --- Footer call to action (index) ---
  "cta.title": "We Can’t Wait to Meet You",
  "cta.text":
    "The doors are open to you and your family. Come as you are and experience God with us.",
  "cta.history": "Our Story",
  "cta.beliefs": "What We Believe",

  // --- Date formats ---
  "date.month.1": "January",
  "date.month.2": "February",
  "date.month.3": "March",
  "date.month.4": "April",
  "date.month.5": "May",
  "date.month.6": "June",
  "date.month.7": "July",
  "date.month.8": "August",
  "date.month.9": "September",
  "date.month.10": "October",
  "date.month.11": "November",
  "date.month.12": "December",
  "date.locale": "en-US",

  // --- Metadata (SEO): meta.<page>.* ---
  "meta.index.title": "Fuente de Vida | Christian Church in Madison, WI",
  "meta.index.description":
    "Fuente de Vida Church in Madison, Wisconsin. Bilingual Sunday services, events, leadership, cell groups and a warm Christian community.",
  "meta.index.ogTitle": "Fuente de Vida | Christian Church in Madison, WI",
  "meta.index.ogDescription":
    "Bilingual Sunday services, events, leadership, cell groups and a welcoming Christian community in Madison, Wisconsin.",
  "meta.index.ldDescription":
    "Fuente de Vida Church in Madison, Wisconsin, with bilingual services, community, cell groups and Christian events.",

  // --- Visitor registration ---
  "visitas.title": "Visitor Registration",
  "visitas.intro":
    "We’re so glad you’re thinking of visiting us! Register here so we can welcome you and get ready to receive you.",
  "visitas.name": "Name",
  "visitas.namePh": "Your full name",
  "visitas.time": "Service you’ll attend",
  "visitas.morning": "Morning",
  "visitas.morningTime": "12:00 PM (Bilingual)",
  "visitas.evening": "Evening",
  "visitas.eveningTime": "5:30 PM (Spanish)",
  "visitas.invitedBy": "Who invited you?",
  "visitas.invitedByPh": "Name of the person who invited you",
  "visitas.email": "Email",
  "visitas.emailPh": "you@email.com",
  "visitas.phone": "Phone",
  "visitas.honeypot": "Leave this field empty",
  "visitas.submit": "Sign Me Up",
  "visitas.confidential":
    "Your information will be kept confidential and used only to improve your experience at our church.",
  "visitas.sending": "Sending...",
  "visitas.cooldown":
    "You already submitted the form. Please wait {seconds} seconds before trying again.",
  "visitas.errRequired": "Please fill in the required fields.",
  "visitas.errTime": "Please choose the service you’ll attend.",
  "visitas.errEmail": "Please enter a valid email address.",
  "visitas.errOffline":
    "You’re not connected to the internet. Please try again when you’re back online.",
  "visitas.success": "Registration sent! We look forward to seeing you.",
  "visitas.error":
    "Something went wrong. Please try again or contact us directly.",
  "visitas.errBlocked":
    "The email service blocked the request from this environment.",
  "visitas.openSecurity": "Open security settings in EmailJS",
  "visitas.orHost":
    "Or serve the site over HTTP (for example Live Server or python -m http.server) to avoid the block.",

  // --- Location ---
  "ubicacion.title": "Location",
  "ubicacion.mapAria": "Map showing the location of Fuente de Vida Church",
  "ubicacion.directions": "Get directions",

  // --- Service times ---
  "horarios.title": "Service Times",
  "horarios.sunday": "Sunday",
  "horarios.time1": "12:00 PM",
  "horarios.service1": "Bilingual Service",
  "horarios.time2": "5:30 PM",
  "horarios.service2": "Spanish Service",

  // --- What is Fuente de Vida ---
  "about.title": "Who Is Fuente de Vida?",
  "about.text":
    "We are a family of people redeemed by the love of JESUS CHRIST, ready to serve with love and passion for the glory of God.",
  "about.welcome": "Welcome to Fuente de Vida!",
  "about.more": "Learn More",

  // --- Leadership (summary on index) ---
  "liderazgo.title": "Leadership",
  "liderazgo.role": "Pastors of Fuente de Vida, Madison, WI",
  "liderazgo.cta": "Meet Our Leaders",

  // --- Contact ---
  "contacto.title": "Contact Information",
  "contacto.phone": "Phone",
  "contacto.whatsappSub": "Send us a message",
  "contacto.emailSub": "Contact us by email",
  "contacto.socialTitle": "Follow Us on Social Media",
  "contacto.facebookAria": "Fuente de Vida on Facebook",
  "contacto.instagramAria": "Fuente de Vida on Instagram",
  "contacto.youtubeAria": "Fuente de Vida on YouTube",

  // --- Bible reading ---
  "biblia.title": "Bible Reading",
  "biblia.intro": "Read God’s Word in different versions.",
  "biblia.versionAria": "Bible version",
  "biblia.placeholder": "e.g. John 3:16",
  "biblia.passageAria": "Bible passage",
  "biblia.search": "Search",
  "biblia.errInvalidRef":
    "We couldn't understand that reference. Try something like 'John 3 16' or 'John 3:16'.",
  "biblia.errTimeout":
    "The search took too long. Please check your connection and try again.",
  "biblia.errFetch":
    "We couldn’t retrieve the passage. Please check the spelling or try again later.",
});
