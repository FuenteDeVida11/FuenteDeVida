(function () {
  'use strict';

  // Traducción segura: usa el motor i18n si está cargado, o el texto por defecto
  function tr(key, fallback, params) {
    if (typeof window.t === 'function') return window.t(key, fallback, params);
    return fallback || key;
  }

  // Inicializar EmailJS sin fallar si la librería no está disponible
  try {
    if (window.emailjs && typeof emailjs.init === 'function') {
      emailjs.init('kDH7feAla0TaB3Ejz');
    } else {
      console.warn('EmailJS no está disponible en este entorno.');
    }
  } catch (err) {
    console.error('Error inicializando EmailJS:', err);
  }

  // Cooldown anti-spam: evita reenvíos en menos de 30s (dura solo la sesión)
  var FORM_COOLDOWN_MS = 30000;
  var FORM_COOLDOWN_KEY = 'fdv_registro_last_submit';

  var form = document.getElementById('registroForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var statusDiv = document.getElementById('statusMessage');
    var botonEnvio = e.target.querySelector('button[type="submit"]');

    // Muestra un error y reactiva el botón (el texto se toma del idioma actual)
    function mostrarError(msg, restaurarBoton) {
      statusDiv.textContent = msg;
      statusDiv.className = 'form-message form-message--error';
      statusDiv.style.display = 'block';
      if (restaurarBoton) {
        botonEnvio.disabled = false;
        botonEnvio.textContent = tr('visitas.submit', 'Registrarme');
      }
    }

    // Honeypot: si el campo oculto tiene contenido, es un bot; abortar en silencio
    var honeypot = document.getElementById('website');
    if (honeypot && honeypot.value.trim() !== '') return;

    // Cooldown
    var lastSubmit = Number(sessionStorage.getItem(FORM_COOLDOWN_KEY) || 0);
    var now = Date.now();
    if (lastSubmit && (now - lastSubmit) < FORM_COOLDOWN_MS) {
      var segundos = Math.ceil((FORM_COOLDOWN_MS - (now - lastSubmit)) / 1000);
      mostrarError(tr('visitas.cooldown', 'Ya enviaste el formulario. Espera {seconds} segundos antes de intentar de nuevo.', { seconds: segundos }), false);
      return;
    }

    botonEnvio.disabled = true;
    botonEnvio.textContent = tr('visitas.sending', 'Enviando...');
    statusDiv.style.display = 'none';

    var nombre = document.getElementById('nombre').value.trim();
    var horarioElem = document.querySelector('input[name="horario"]:checked');
    var invitado = document.getElementById('invitado').value.trim();
    var email = document.getElementById('email').value.trim();
    var telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !invitado || !email) {
      mostrarError(tr('visitas.errRequired', 'Por favor completa los campos obligatorios.'), true);
      return;
    }

    if (!horarioElem) {
      mostrarError(tr('visitas.errTime', 'Selecciona la hora en la que asistirás.'), true);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarError(tr('visitas.errEmail', 'Ingresa un correo electrónico válido.'), true);
      return;
    }

    if (!navigator.onLine) {
      mostrarError(tr('visitas.errOffline', 'No estás conectado a internet.'), true);
      return;
    }

    // El valor del radio permanece en español para que los correos al equipo sean consistentes
    var horario = horarioElem.value;
    var idioma = (window.FDV_I18N && window.FDV_I18N.getLang()) || 'es';

    try {
      if (!window.emailjs || typeof emailjs.send !== 'function') {
        throw new Error('Email service unavailable');
      }

      await emailjs.send('service_svti20s', 'template_sr378qp', {
        nombre: nombre,
        invitado: invitado,
        email: email,
        telefono: telefono || 'No proporcionado',
        horario: horario,
        fecha: new Date().toLocaleDateString('es-ES'),
        idioma: idioma === 'en' ? 'English' : 'Español'
      });

      sessionStorage.setItem(FORM_COOLDOWN_KEY, String(Date.now()));

      statusDiv.textContent = tr('visitas.success', '¡Registro enviado correctamente! Te esperamos.');
      statusDiv.className = 'form-message form-message--success';
      statusDiv.style.display = 'block';
      form.reset();

      setTimeout(function () {
        statusDiv.style.display = 'none';
        botonEnvio.disabled = false;
        botonEnvio.textContent = tr('visitas.submit', 'Registrarme');
      }, 5000);
    } catch (error) {
      console.error('Error al enviar:', error);

      var friendly = tr('visitas.error', 'Error al enviar. Intenta de nuevo o contáctanos directamente.');
      var errMsg = (error && (error.text || error.message)) ? (error.text || error.message) : '';
      var isNonBrowser = /non-browser/i.test(errMsg) || (error && error.status === 403);

      statusDiv.className = 'form-message form-message--error';
      statusDiv.textContent = '';

      if (isNonBrowser) {
        // Se construye con DOM (sin innerHTML) para evitar inyección
        statusDiv.appendChild(document.createTextNode(friendly + ' ' + tr('visitas.errBlocked', '')));
        statusDiv.appendChild(document.createElement('br'));
        var a = document.createElement('a');
        a.href = 'https://dashboard.emailjs.com/admin/account/security';
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = tr('visitas.openSecurity', 'Abrir configuración de seguridad en EmailJS');
        statusDiv.appendChild(a);
        statusDiv.appendChild(document.createElement('br'));
        statusDiv.appendChild(document.createTextNode(tr('visitas.orHost', '')));
      } else {
        var detail = errMsg ? ' (' + errMsg + ')' : '';
        var statusInfo = error && error.status ? ' [status:' + error.status + ']' : '';
        statusDiv.textContent = friendly + detail + statusInfo;
      }

      statusDiv.style.display = 'block';
      botonEnvio.disabled = false;
      botonEnvio.textContent = tr('visitas.submit', 'Registrarme');
    }
  });
})();
