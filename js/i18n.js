/*
 * Motor de internacionalización (ES / EN) para Fuente de Vida.
 *
 * Se carga en el <head>, justo después de translations.js, para aplicar el idioma
 * lo antes posible y evitar el parpadeo de contenido sin traducir.
 *
 * Atributos admitidos en el HTML (el valor es siempre una clave de translations):
 *   data-i18n="clave"              -> texto del elemento
 *   data-i18n-html="clave"         -> HTML interno (solo cuando haga falta <strong>, <br>, etc.)
 *   data-i18n-placeholder="clave"  -> placeholder
 *   data-i18n-aria="clave"         -> aria-label
 *   data-i18n-alt="clave"          -> alt de imágenes
 *   data-i18n-title="clave"        -> title
 *   data-i18n-month="1..12"        -> nombre del mes según el idioma
 *
 * API pública: window.t(clave, respaldo, parametros) y window.FDV_I18N.
 * Evento: "fdv:languagechange" en document (detail: { lang, initial }).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'fdv_lang';
  var SUPPORTED = ['es', 'en'];
  var DEFAULT_LANG = 'es';
  var OG_LOCALES = { es: 'es_ES', en: 'en_US' };

  var root = document.documentElement;
  var current = DEFAULT_LANG;
  var warned = {};

  // ----- Persistencia (localStorage puede fallar en modo privado o con file://) -----
  function readStored() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(value) > -1 ? value : null;
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* sin persistencia: el cambio sigue funcionando en la sesión */ }
  }

  // Permite compartir enlaces con ?lang=en
  function readQuery() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      q = q ? q.toLowerCase() : null;
      return SUPPORTED.indexOf(q) > -1 ? q : null;
    } catch (e) {
      return null;
    }
  }

  // Prioridad: enlace (?lang) > elección guardada > idioma del navegador > español
  function detectLanguage() {
    var fromQuery = readQuery();
    if (fromQuery) {
      store(fromQuery);
      return fromQuery;
    }
    var stored = readStored();
    if (stored) return stored;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return String(nav).toLowerCase().indexOf('en') === 0 ? 'en' : DEFAULT_LANG;
  }

  // ----- Traducción de claves -----
  function lookup(key, lang) {
    var all = window.FDV_TRANSLATIONS || {};
    if (all[lang] && Object.prototype.hasOwnProperty.call(all[lang], key)) return all[lang][key];
    if (all[DEFAULT_LANG] && Object.prototype.hasOwnProperty.call(all[DEFAULT_LANG], key)) return all[DEFAULT_LANG][key];
    return undefined;
  }

  function format(text, params) {
    if (!params) return text;
    return String(text).replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(params, name) ? params[name] : match;
    });
  }

  function t(key, fallback, params) {
    var value = lookup(key, current);
    if (value === undefined) {
      if (!warned[key]) {
        warned[key] = true;
        console.warn('[i18n] Falta la clave:', key);
      }
      value = fallback !== undefined ? fallback : key;
    }
    return format(value, params);
  }

  function has(key) {
    return lookup(key, current) !== undefined;
  }

  // Nombre de la página: <html data-page="x"> o el nombre del archivo (index.html -> "index")
  function pageKey() {
    var explicit = root.getAttribute('data-page');
    if (explicit) return explicit;
    var match = window.location.pathname.match(/([^\/]+?)(?:\.html?)?$/);
    return match && match[1] ? match[1] : 'index';
  }

  // ----- Reglas del "chrome" compartido (menú, barras, pie) -----
  // Evita repetir atributos en cada HTML. [selector, tipo, clave]
  var CHROME_RULES = [
    ['a.nav-brand, a.menu-overlay-logo', 'aria', 'nav.home'],
    ['nav img, .menu-overlay-logo img', 'alt', 'nav.logoAlt'],
    ['.nav-links-horizontal a[href$="ultimo-sermon.html"]', 'text', 'nav.sermons'],
    ['.nav-links-horizontal a[href$="nuestra-historia.html"]', 'text', 'nav.history'],
    ['.nav-links-horizontal a[href$="nuestro-liderazgo.html"]', 'text', 'nav.leadership'],
    ['.nav-links-horizontal a[href$="nuestras-creencias.html"]', 'text', 'nav.beliefs'],
    ['.nav-links-horizontal a[href$="eventos.html"]', 'text', 'nav.events'],
    ['.nav-links-horizontal a[href*="checkout.square.site"]', 'text', 'nav.donate'],
    ['#menuBtn', 'aria', 'nav.openMenu'],
    ['#menuCloseBtn', 'aria', 'nav.closeMenu'],
    ['#menuOverlay', 'aria', 'nav.mainMenu'],
    ['.side-bar-left .side-bar-label', 'text', 'sidebar.follow'],
    ['.side-bar-right .side-bar-label', 'text', 'sidebar.discover'],
    ['#discoverBtn', 'aria', 'sidebar.discoverAria'],
    ['.hero-header', 'aria', 'hero.aria'],
    ['.menu-overlay a[href$="#visitar"]', 'text', 'menu.registro'],
    ['.menu-overlay a[href$="#horarios"]', 'text', 'menu.schedule'],
    ['.menu-overlay a[href$="#ubicacion"]', 'text', 'menu.location'],
    ['.menu-overlay a[href$="#liderazgo"]', 'text', 'menu.leadership'],
    ['.menu-overlay a[href$="nuestra-historia.html"]', 'text', 'menu.history'],
    ['.menu-overlay a[href$="nuestras-creencias.html"]', 'text', 'menu.beliefs'],
    ['.menu-overlay a[href$="#biblia"]', 'text', 'menu.bible'],
    ['.menu-overlay a[href$="ultimo-sermon.html"]', 'text', 'menu.sermon'],
    ['.menu-overlay a[href$="eventos.html"]', 'text', 'menu.events'],
    ['.menu-overlay a[href$="#contacto"]', 'text', 'menu.contact'],
    ['.menu-overlay a[href*="checkout.square.site"]', 'text', 'menu.donate'],
    ['.menu-social:not(.menu-lang) .menu-social-title', 'text', 'menu.social'],
    ['footer > span', 'text', 'footer.copyright'],
    ['.fc-phone', 'aria', 'footer.phone'],
    ['.fc-phone', 'title', 'footer.phone'],
    ['.fc-whatsapp', 'aria', 'footer.whatsapp'],
    ['.fc-whatsapp', 'title', 'footer.whatsapp'],
    ['.fc-email', 'aria', 'footer.email'],
    ['.fc-email', 'title', 'footer.email'],
    ['.scroll-to-top', 'aria', 'scrollTop.aria'],
    ['.scroll-to-top', 'title', 'scrollTop.title']
  ];

  // Reglas por posición (títulos de las 4 columnas del menú)
  var CHROME_BY_INDEX = [
    ['.menu-col-title', ['menu.visit', 'menu.about', 'menu.resources', 'menu.connect']]
  ];

  var ATTR_BY_TYPE = {
    text: 'data-i18n',
    aria: 'data-i18n-aria',
    alt: 'data-i18n-alt',
    title: 'data-i18n-title',
    placeholder: 'data-i18n-placeholder'
  };

  function tagOnce(el, attr, key) {
    if (!el.hasAttribute(attr) && !el.hasAttribute(attr + '-html')) el.setAttribute(attr, key);
  }

  function tagChrome() {
    CHROME_RULES.forEach(function (rule) {
      var attr = ATTR_BY_TYPE[rule[1]];
      Array.prototype.forEach.call(document.querySelectorAll(rule[0]), function (el) {
        tagOnce(el, attr, rule[2]);
      });
    });
    CHROME_BY_INDEX.forEach(function (rule) {
      Array.prototype.forEach.call(document.querySelectorAll(rule[0]), function (el, index) {
        if (rule[1][index]) tagOnce(el, 'data-i18n', rule[1][index]);
      });
    });
  }

  // ----- Aplicación al DOM -----
  // Si el elemento tiene hijos (por ejemplo un icono), solo se reemplaza su último nodo de texto
  function setText(el, value) {
    if (!el.children.length) {
      el.textContent = value;
      return;
    }
    var nodes = el.childNodes;
    for (var i = nodes.length - 1; i >= 0; i--) {
      if (nodes[i].nodeType === 3 && nodes[i].nodeValue.trim() !== '') {
        var parts = nodes[i].nodeValue.match(/^(\s*)[\s\S]*?(\s*)$/);
        nodes[i].nodeValue = parts[1] + value + parts[2];
        return;
      }
    }
    el.appendChild(document.createTextNode(' ' + value));
  }

  var ATTR_TARGETS = [
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-title', 'title']
  ];

  function translateTree(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n]'), function (el) {
      setText(el, t(el.getAttribute('data-i18n')));
    });
    // Las cadenas de data-i18n-html son contenido propio (translations), nunca de usuarios
    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-html]'), function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    ATTR_TARGETS.forEach(function (pair) {
      Array.prototype.forEach.call(scope.querySelectorAll('[' + pair[0] + ']'), function (el) {
        el.setAttribute(pair[1], t(el.getAttribute(pair[0])));
      });
    });
    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-month]'), function (el) {
      el.textContent = t('date.month.' + el.getAttribute('data-i18n-month'));
    });
  }

  // Elementos cuyo texto depende de un estado (botón de sonido del video)
  function updateDynamic() {
    var mute = document.getElementById('muteBtn');
    if (mute) {
      var unmuted = mute.getAttribute('aria-pressed') === 'true';
      mute.setAttribute('aria-label', t(unmuted ? 'sidebar.muteOff' : 'sidebar.muteOn'));
    }
  }

  // ----- Metadatos SEO -----
  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function ensureMeta(property, content) {
    var el = document.querySelector('meta[property="' + property + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function updateMeta() {
    var prefix = 'meta.' + pageKey() + '.';
    if (has(prefix + 'title')) document.title = t(prefix + 'title');
    if (has(prefix + 'description')) setMeta('meta[name="description"]', t(prefix + 'description'));
    if (has(prefix + 'ogTitle')) setMeta('meta[property="og:title"]', t(prefix + 'ogTitle'));
    if (has(prefix + 'ogDescription')) setMeta('meta[property="og:description"]', t(prefix + 'ogDescription'));

    ensureMeta('og:locale', OG_LOCALES[current]);
    var other = current === 'es' ? 'en' : 'es';
    var alt = document.querySelector('meta[property="og:locale:alternate"]');
    if (!alt) {
      alt = document.createElement('meta');
      alt.setAttribute('property', 'og:locale:alternate');
      document.head.appendChild(alt);
    }
    alt.setAttribute('content', OG_LOCALES[other]);

    // Structured data (JSON-LD): solo se actualiza la descripción
    if (has(prefix + 'ldDescription')) {
      Array.prototype.forEach.call(document.querySelectorAll('script[type="application/ld+json"]'), function (script) {
        try {
          var data = JSON.parse(script.textContent);
          if (data && typeof data === 'object' && 'description' in data) {
            data.description = t(prefix + 'ldDescription');
            script.textContent = JSON.stringify(data, null, 2);
          }
        } catch (e) { /* JSON-LD inválido: se deja intacto */ }
      });
    }
  }

  // ----- Selector de idioma -----
  var SWITCH_OPTIONS = [
    { lang: 'es', label: 'ES', aria: 'Español' },
    { lang: 'en', label: 'EN', aria: 'English' }
  ];

  function createButton(option) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-btn';
    btn.setAttribute('data-lang', option.lang);
    btn.setAttribute('lang', option.lang);
    btn.setAttribute('aria-label', option.aria);
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = option.label;
    btn.addEventListener('click', function () {
      setLanguage(option.lang);
    });
    return btn;
  }

  function createSwitcher(modifier) {
    var group = document.createElement('div');
    group.className = 'lang-switch ' + modifier;
    group.setAttribute('role', 'group');
    group.setAttribute('data-i18n-aria', 'lang.group');
    SWITCH_OPTIONS.forEach(function (option) {
      group.appendChild(createButton(option));
    });
    return group;
  }

  function injectSwitchers() {
    if (document.querySelector('.lang-switch')) return;

    // Cabecera de escritorio (se oculta en móvil por CSS)
    var navActions = document.querySelector('.nav-actions');
    if (navActions) navActions.insertBefore(createSwitcher('lang-switch--nav'), navActions.firstChild);

    // Menú desplegable (móvil y escritorio): bloque al final de la última columna
    var cols = document.querySelectorAll('.menu-col');
    if (cols.length) {
      var block = document.createElement('div');
      block.className = 'menu-social menu-lang';
      var title = document.createElement('span');
      title.className = 'menu-social-title';
      title.setAttribute('data-i18n', 'lang.title');
      title.textContent = 'Idioma';
      block.appendChild(title);
      block.appendChild(createSwitcher('lang-switch--menu'));
      cols[cols.length - 1].appendChild(block);
    }
  }

  function updateSwitchers() {
    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
      var active = btn.getAttribute('data-lang') === current;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
    });
  }

  // ----- Flujo principal -----
  function apply(silent, initial) {
    root.setAttribute('lang', current);
    tagChrome();
    translateTree(document);
    updateDynamic();
    updateMeta();
    updateSwitchers();
    root.classList.remove('i18n-pending');
    if (!silent) {
      document.dispatchEvent(new CustomEvent('fdv:languagechange', { detail: { lang: current, initial: !!initial } }));
    }
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    if (lang === current) {
      updateSwitchers();
      return;
    }
    current = lang;
    store(lang);
    apply(false, false);
  }

  // Arranque inmediato: fija <html lang> y oculta el body solo si hay que traducir a inglés
  current = detectLanguage();
  root.setAttribute('lang', current);
  if (current !== DEFAULT_LANG) root.classList.add('i18n-pending');
  // Red de seguridad: nunca dejar la página oculta si algo falla
  window.setTimeout(function () { root.classList.remove('i18n-pending'); }, 3000);

  function init() {
    injectSwitchers();
    apply(false, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Segunda pasada para elementos que otros scripts crean al final (p. ej. botón de subir)
  window.addEventListener('load', function () { apply(true); });

  window.t = t;
  window.FDV_I18N = {
    t: t,
    getLang: function () { return current; },
    setLang: setLanguage,
    apply: function () { apply(true); },
    supported: SUPPORTED.slice()
  };
})();
