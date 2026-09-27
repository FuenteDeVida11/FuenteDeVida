// Mapeo de nombres de libros en español -> código de 3 letras que usa biblia-api.qhar.in
const LIBROS_ES = {
  
  "genesis": "GEN", "genesis": "GEN",
  
  "exodo": "EXO", "exodo": "EXO",
  
  "levitico": "LEV", "levitico": "LEV",
  
  "numeros": "NUM", "numeros": "NUM",
  
  "deuteronomio": "DEU",
  
  "josue": "JOS", "josue": "JOS",
  
  "jueces": "JDG",
  
  "rut": "RUT",
  
  "1 samuel": "1SA", "2 samuel": "2SA",
  
  "1 reyes": "1KI", "2 reyes": "2KI",
  
  "1 cronicas": "1CH", "1 cronicas": "1CH",
  
  "2 cronicas": "2CH", "2 cronicas": "2CH",
  
  "esdras": "EZR",
  
  "nehemias": "NEH", "nehemias": "NEH",
  
  "ester": "EST",
  
  "job": "JOB",
  
  "salmos": "PSA", "salmo": "PSA",
  
  "proverbios": "PRO",
  
  "eclesiastes": "ECC", "eclesiastes": "ECC",
  
  "cantares": "SNG", "cantar de los cantares": "SNG",
  
  "isaias": "ISA", "isaias": "ISA",
  
  "jeremias": "JER", "jeremias": "JER",
  
  "lamentaciones": "LAM",
  
  "ezequiel": "EZK",
  
  "daniel": "DAN",
  
  "oseas": "HOS",
  
  "joel": "JOL",
  
  "amos": "AMO", "amos": "AMO",
  
  "abdias": "OBA", "abdías": "OBA",
  
  "jonas": "JON", "jonas": "JON",
  
  "miqueas": "MIC",
  
  "nahum": "NAM", "nahum": "NAM",
  
  "habacuc": "HAB",
  
  "sofonias": "ZEP", "sofonias": "ZEP",
  
  "hageo": "HAG",
  
  "zacarias": "ZEC", "zacarias": "ZEC",
  
  "malaquias": "MAL", "malaquias": "MAL",
  
  "mateo": "MAT",
  
  "marcos": "MRK",
  
  "lucas": "LUK",
  
  "juan": "JHN",
  
  "hechos": "ACT",
  
  "romanos": "ROM",
  
  "1 corintios": "1CO", "2 corintios": "2CO",
  
  "galatas": "GAL", "galatas": "GAL",
  
  "efesios": "EPH",
  
  "filipenses": "PHP",
  
  
  "colosenses": "COL",
  
  "1 tesalonicenses": "1TH", "2 tesalonicenses": "2TH",
  
  "1 timoteo": "1TI", "2 timoteo": "2TI",
  
  "tito": "TIT",
  
  "filemon": "PHM", "filemon": "PHM",
  
  "hebreos": "HEB",
  
  "santiago": "JAS",
  
  "1 pedro": "1PE", "2 pedro": "2PE",
  
  "1 juan": "1JN", "2 juan": "2JN", "3 juan": "3JN",
  
  "judas": "JUD",
  
  "apocalipsis": "REV"

};

// Mapeo para la API en ingles (wldeh) - nombres completos en minusculas
const LIBROS_EN = {

  "genesis": "genesis", "genesis": "genesis",

  "exodo": "exodus", "exodo": "exodus",

  "levitico": "leviticus", "levitico": "leviticus",

  "numeros": "numbers", "numeros": "numbers",

  "deuteronomio": "deuteronomy",

  "josue": "joshua", "josue": "joshua",

  "jueces": "judges",

  "rut": "ruth",

  "1 samuel": "1samuel", "2 samuel": "2samuel",

  "1 reyes": "1kings", "2 reyes": "2kings",

  "salmos": "psalms", "salmo": "psalms",

  "proverbios": "proverbs",

  "mateo": "matthew",

  "marcos": "mark",

  "lucas": "luke",

  "juan": "john",

  "hechos": "acts",

  "romanos": "romans",

  "apocalipsis": "revelation"

};

function normalizarTexto(str) {

  return str.toLowerCase().trim();

}

// Convierte "juan 3:16", "juan 3 16", "juan 3,16" o "juan3:16" en {libro, capitulo, versiculo}
function parsearReferencia(input, mapaLibros) {

  const texto = normalizarTexto(input);

  const match = texto.match(/^(\d?\s?[a-z¿¿¿¿¿¿]+)\s*(\d+)\s*[:,]?\s*(\d+)?(?:-(\d+))?$/i);

  if (!match) return null;

  const nombreLibro = match[1].trim();

  const capitulo = match[2];

  const versiculo = match[3] || null;

  const versiculoFin = match[4] || null;

  const libroId = mapaLibros[nombreLibro];

  if (!libroId) return null;

  return { libro: libroId, capitulo, versiculo, versiculoFin };

}

// Fetch con timeout via AbortController para no dejar la UI colgada si la API no responde
async function fetchConTimeout(url, timeoutMs = 9000) {

  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {

    return await fetch(url, { signal: controller.signal });

  } finally {

    clearTimeout(timeoutId);

  }

}

async function buscarEnEspanol(ref, inputTexto) {

  let url;

  if (ref.versiculo) {

    const versiculos = ref.versiculoFin
      ? `${ref.versiculo}-${ref.versiculoFin}`
      : ref.versiculo;

    url = `https://biblia-api.qhar.in/book/${ref.libro}/chapter/${ref.capitulo}/verse/${versiculos}`;

  } else {

    url = `https://biblia-api.qhar.in/book/${ref.libro}/chapter/${ref.capitulo}/verse`;

  }

  const response = await fetchConTimeout(url);

  if (!response.ok) throw new Error("No encontrado");

  let data = await response.json();

  if (!Array.isArray(data) || data.length === 0) throw new Error("Respuesta vacía o con formato inesperado");

  if (!ref.versiculo && !data.every(v => v && typeof v.content === 'string')) {

    const inicio = Number(data[0].number);
    const fin = Number(data[data.length - 1].number);

    if (!Number.isInteger(inicio) || !Number.isInteger(fin) || inicio < 1 || fin < inicio) {
      throw new Error("Formato de respuesta inesperado");
    }

    const urlRango = `https://biblia-api.qhar.in/book/${ref.libro}/chapter/${ref.capitulo}/verse/${inicio}-${fin}`;
    const responseRango = await fetchConTimeout(urlRango);

    if (!responseRango.ok) throw new Error("No encontrado");

    data = await responseRango.json();

    if (!Array.isArray(data) || data.length === 0) throw new Error("Respuesta vacía o con formato inesperado");
  }

  // Validar que cada elemento tenga el campo esperado antes de usarlo
  const lineas = data

  .filter(v => v && typeof v.content === 'string')

  .map(v => v.content);

  if (lineas.length === 0) throw new Error("Formato de respuesta inesperado");

  return { referencia: inputTexto, lineas };
}

async function buscarEnIngles(ref, inputTexto) {

  let url;

  const esRango = Boolean(ref.versiculo && ref.versiculoFin);

  if (ref.versiculo && !esRango) {

    url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${ref.libro}/chapters/${ref.capitulo}/verses/${ref.versiculo}.json`;
  
  } else {
  
    url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${ref.libro}/chapters/${ref.capitulo}.json`;
  
  }

  const response = await fetchConTimeout(url);
  
  if (!response.ok) throw new Error("No encontrado");
  
  const data = await response.json();

  if (!data || typeof data !== 'object') throw new Error("Respuesta con formato inesperado");

  let lineas = [];
  
  if (ref.versiculo && !esRango) {
  
    if (typeof data.text !== 'string') throw new Error("Formato de respuesta inesperado");
  
    lineas = [data.text];
  
  } else {

    const versiculos = Array.isArray(data.verses)
      ? data.verses
      : Array.isArray(data.data) ? data.data : [];

    const inicio = esRango ? Number(ref.versiculo) : null;
    const fin = esRango ? Number(ref.versiculoFin) : null;
    const vistos = new Set();

    lineas = versiculos

    .filter(v => {

      if (!v || typeof v.text !== 'string') return false;

      const numero = Number(v.verse);

      if (esRango && (!Number.isInteger(numero) || numero < inicio || numero > fin)) return false;

      if (typeof v.verse === 'undefined') return true;

      const numeroClave = String(v.verse);

      if (vistos.has(numeroClave)) return false;

      vistos.add(numeroClave);

      return true;

    })

    .map(v => (typeof v.verse !== 'undefined' ? `${v.verse} ${v.text}` : v.text));
  
  }

  if (lineas.length === 0) throw new Error("Formato de respuesta inesperado");

  return { referencia: inputTexto, lineas };

}

async function loadBibleVerse() {

  const versionSelect = document.getElementById("bible-version").value;

  const inputTexto = document.getElementById("bible-passage").value;

  const esEspanol = versionSelect === "RVR1960";

  const mapaLibros = esEspanol ? LIBROS_ES : LIBROS_EN;

  const ref = parsearReferencia(inputTexto, mapaLibros);

  if (!ref) {

    mostrarErrorBiblia(window.t('bible_error_invalid_ref', "No pude entender la referencia. Intenta algo como 'Juan 3 16' o 'Juan 3:16'."));
    
    return;
  
  }

  try {
  
    const resultado = esEspanol
  
    ? await buscarEnEspanol(ref, inputTexto)
  
    : await buscarEnIngles(ref, inputTexto);

    mostrarResultadoBiblia(resultado);
  
  } catch (error) {
  
    console.error("Error al buscar pasaje:", error);
  
    const mensaje = error && error.name === 'AbortError'
  
    ? window.t('bible_error_timeout', 'La búsqueda tardó demasiado. Verifica tu conexión e intenta de nuevo.')
  
    : window.t('bible_error_fetch', 'No se pudo obtener el pasaje. Verifica la escritura o inténtalo más tarde.');
  
    mostrarErrorBiblia(mensaje);
  
  }

}
// Construye el resultado con textContent (no innerHTML) para no ejecutar HTML/scripts si la API devuelve contenido malicioso
function mostrarResultadoBiblia(resultado) {

  const contenedor = document.querySelector(".bible-container");

  contenedor.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "bible-resultado";

  const titulo = document.createElement("p");
  
  const strong = document.createElement("strong");
  
  strong.textContent = resultado.referencia;
  
  titulo.appendChild(strong);
  
  wrapper.appendChild(titulo);

  resultado.lineas.forEach(linea => {
  
    const p = document.createElement("p");
  
    p.textContent = linea;
  
    wrapper.appendChild(p);
  
  });

  contenedor.appendChild(wrapper);

}

function mostrarErrorBiblia(mensaje) {

  const contenedor = document.querySelector(".bible-container");

  contenedor.innerHTML = "";

  const div = document.createElement("div");

  div.className = "form-message form-message--error";

  div.textContent = mensaje;

  contenedor.appendChild(div);

}

document.getElementById('bible-search-btn').addEventListener('click', loadBibleVerse);

document.getElementById('bible-passage').addEventListener('keydown', function(e){ if(e.key==='Enter') loadBibleVerse

(); });
