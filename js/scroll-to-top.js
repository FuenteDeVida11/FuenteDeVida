// Crea un control flotante para volver al inicio desde cualquier sección.
(function () {
  // El botón se agrega al documento para compartirlo entre páginas.
  const button = document.createElement("button");
  button.className = "scroll-to-top";
  button.setAttribute("aria-label", "Subir a la parte superior de la página");
  button.setAttribute("title", "Subir");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(button);

  // Solo muestra el control después de que el usuario avance por la página.
  function updateButtonVisibility() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 400) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  }

  // Vuelve al inicio sin interrumpir bruscamente la lectura.
  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Actualiza la visibilidad mientras cambia la posición de desplazamiento.
  window.addEventListener("scroll", updateButtonVisibility);

  // Sincroniza el estado inicial si la página carga desplazada.
  updateButtonVisibility();
})();
