// Inicializar EmailJS con seguridad (no fallar si la librer¿a no est¿ disponible)
      try {

        if (window.emailjs && typeof emailjs.init === 'function') {

          emailjs.init("kDH7feAla0TaB3Ejz"); // Reemplaza con tu clave p¿blica

        } else {

          console.warn('EmailJS no est¿ disponible en este entorno.');

        }

      } catch (err) {

        console.error('Error inicializando EmailJS:', err);

      }
      // Cooldown anti-spam: evita reenvios del mismo visitante en menos de 30s (dura solo la pestaña/sesión)
      const FORM_COOLDOWN_MS = 30000;
      
      const FORM_COOLDOWN_KEY = 'fdv_registro_last_submit';

      // Manejar el formulario de registro con validaciones b¿sicas y mejor manejo de errores
      document.getElementById("registroForm").addEventListener("submit", async function(e) {
      
        e.preventDefault();

        const statusDiv = document.getElementById("statusMessage");
      
        const botonEnvio = e.target.querySelector('button[type="submit"]');
      
        const textoOriginal = botonEnvio.textContent;
        // Honeypot: si el campo oculto "website" tiene contenido, es un bot; abortar en silencio
        const honeypot = document.getElementById("website");
        
        if (honeypot && honeypot.value.trim() !== '') {
        
          return;
        
        }

        // Cooldown: bloquear reenvios repetidos dentro de la ventana de tiempo
        const lastSubmit = Number(sessionStorage.getItem(FORM_COOLDOWN_KEY) || 0);
        
        const now = Date.now();
        
        if (lastSubmit && (now - lastSubmit) < FORM_COOLDOWN_MS) {
        
          const segundosRestantes = Math.ceil((FORM_COOLDOWN_MS - (now - lastSubmit)) / 1000);
        
          statusDiv.textContent = window.t('form_cooldown', 'Ya enviaste el formulario. Espera ' + segundosRestantes + ' segundos antes de intentar de nuevo.');
        
          statusDiv.className = "form-message form-message--error";
        
          statusDiv.style.display = "block";
        
          return;
        
        }

        // Deshabilitar boton y mostrar estado
        
        botonEnvio.disabled = true;
        
        botonEnvio.textContent = window.t('form_sending', 'Enviando...');
        
        statusDiv.style.display = "none";
        
        const nombre = document.getElementById("nombre").value.trim();
        
        const horarioElem = document.querySelector('input[name="horario"]:checked');
        
        const invitado = document.getElementById("invitado").value.trim();
        
        const email = document.getElementById("email").value.trim();
        
        const telefono = document.getElementById("telefono").value.trim();
        // Validaciones basicas
        if (!nombre || !invitado || !email) {
        
          statusDiv.textContent = window.t('form_error_required', 'Por favor completa los campos obligatorios.');
        
          statusDiv.className = "form-message form-message--error";
        
          statusDiv.style.display = "block";
        
          botonEnvio.disabled = false;
        
          botonEnvio.textContent = textoOriginal;
        
          return;
        
        }

        if (!horarioElem) {
        
          statusDiv.textContent = window.t('form_error_horario', 'Selecciona la hora en la que asistirás.');
        
          statusDiv.className = "form-message form-message--error";
        
          statusDiv.style.display = "block";
        
          botonEnvio.disabled = false;
        
          botonEnvio.textContent = textoOriginal;
        
          return;
        
        }
        // Validacion simple de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
        
          statusDiv.textContent = window.t('form_error_email', 'Ingresa un correo electr¿nico v¿lido.');
        
          statusDiv.className = "form-message form-message--error";
        
          statusDiv.style.display = "block";
        
          botonEnvio.disabled = false;
        
          botonEnvio.textContent = textoOriginal;
        
          return;
       
        }

        if (!navigator.onLine) {
       
          statusDiv.textContent = window.t('form_error_offline', 'No est¿s conectado a internet. Intenta de nuevo cuando tengas conexi¿n.');
          
          statusDiv.className = "form-message form-message--error";
          
          statusDiv.style.display = "block";
          
          botonEnvio.disabled = false;
          
          botonEnvio.textContent = textoOriginal;
          
          return;
        
        }

        const horario = horarioElem ? horarioElem.value : '';

        try {
        
          if (!window.emailjs || typeof emailjs.send !== 'function') {
        
            throw new Error('Email service unavailable');
        
          }

          await emailjs.send("service_svti20s", "template_sr378qp", {
        
            nombre: nombre,
        
            invitado: invitado,
        
            email: email,
        
            telefono: telefono || "No proporcionado",
        
            horario: horario,
        
            fecha: new Date().toLocaleDateString("es-ES")
        
          });
          // Registrar el momento del envio exitoso para el cooldown
          sessionStorage.setItem(FORM_COOLDOWN_KEY, String(Date.now()));
          // Mostrar mensaje de txito
          statusDiv.textContent = window.t('form_success', ' Registro enviado correctamente! Te esperamos.');
      
          statusDiv.className = "form-message form-message--success";
        
          statusDiv.style.display = "block";
          // Limpiar formulario
          document.getElementById("registroForm").reset();
          // Ocultar mensaje despues de 5 segundos
          setTimeout(() => {
            statusDiv.style.display = "none";
          
            botonEnvio.disabled = false;
          
            botonEnvio.textContent = textoOriginal;
          
          }, 5000);

        } catch (error) {
          
          console.error("Error al enviar:", error);
          
          const friendly = window.t('form_error', ' Error al enviar. Intenta de nuevo o contactanos directamente.');
          
          const detail = (error && (error.text || error.message)) ? ` (${error.text || error.message})` : '';
          
          const statusInfo = error && error.status ? ` [status:${error.status}]` : '';
          // Detectar error especifico de EmailJS sobre "non-browser environments"
          const errMsg = (error && (error.text || error.message)) ? (error.text || error.message) : '';
          
          const isNonBrowser = /non-browser/i.test(errMsg) || (error && error.status === 403);

          if (isNonBrowser) {
          
            statusDiv.innerHTML = `${friendly} ${window.t('emailjs_nonbrowser', 'API access from non-browser environments is currently disabled.')}<br><a href="https://dashboard.emailjs.com/admin/account/security" target="_blank" rel="noopener">${window.t('open_emailjs_security','Abrir configuraci¿n de seguridad en EmailJS')}</a><br>${window.t('or_host','O sirve el sitio desde HTTP (ej. Live Server o `python -m http.server`) para evitar el bloqueo.')}`;
          
          } else {
          
            statusDiv.textContent = friendly + detail + statusInfo;
          
          }

          statusDiv.className = "form-message form-message--error";

          statusDiv.style.display = "block";
          // Rehabilitar boton
          botonEnvio.disabled = false;

          botonEnvio.textContent = textoOriginal;

        }

      });
