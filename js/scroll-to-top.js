// Scroll to Top Button - Reusable component
(function() {
  // Create the button
  const button = document.createElement('button');
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Subir a la parte superior de la página');
  button.setAttribute('title', 'Subir');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(button);

  // Show/hide button based on scroll position
  function updateButtonVisibility() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 400) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  // Scroll to top smoothly
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Listen to scroll events
  window.addEventListener('scroll', updateButtonVisibility);

  // Check visibility on page load
  updateButtonVisibility();
})();
