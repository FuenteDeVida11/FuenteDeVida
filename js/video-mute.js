const heroVideo = document.querySelector('.hero-video');
const muteButton = document.getElementById('muteBtn');

if (heroVideo && muteButton) {
  const muteIcon = muteButton.querySelector('i');
  heroVideo.muted = true;

  muteButton.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    const isMuted = heroVideo.muted;

    muteButton.setAttribute('aria-pressed', String(!isMuted));
    const tr = window.t || ((k, f) => f);
    muteButton.setAttribute(
      'aria-label',
      isMuted ? tr('sidebar.muteOn', 'Activar sonido del video') : tr('sidebar.muteOff', 'Silenciar video')
    );

    if (muteIcon) {
      muteIcon.classList.toggle('fa-volume-mute', isMuted);
      muteIcon.classList.toggle('fa-volume-up', !isMuted);
    }
  });
}