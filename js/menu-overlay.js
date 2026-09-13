// Control compartido del menú overlay desplegable y las barras laterales
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuBackdrop = document.getElementById('menuBackdrop');

  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('active');
    menuOverlay.setAttribute('aria-hidden', 'false');
    if (menuBackdrop) {
      menuBackdrop.classList.add('active');
      menuBackdrop.setAttribute('aria-hidden', 'false');
    }
    if (menuBtn) {
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('active');
    menuOverlay.setAttribute('aria-hidden', 'true');
    if (menuBackdrop) {
      menuBackdrop.classList.remove('active');
      menuBackdrop.setAttribute('aria-hidden', 'true');
    }
    if (menuBtn) {
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (menuOverlay && menuOverlay.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMenu);
  }

  if (menuOverlay) {
    const menuLinks = menuOverlay.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  });

  // Botón "Descubre" de la barra lateral derecha: baja a la siguiente sección
  const discoverBtn = document.getElementById('discoverBtn');
  if (discoverBtn) {
    discoverBtn.addEventListener('click', function () {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
  }
});
