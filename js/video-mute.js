const heroVideo = document.querySelector('.hero-video');
const muteButton = document.getElementById('muteBtn');

if (heroVideo && muteButton) {
  const muteIcon = muteButton.querySelector('i');
  heroVideo.muted = true;

  muteButton.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    const isMuted = heroVideo.muted;

    muteButton.setAttribute('aria-pressed', String(!isMuted));
    muteButton.setAttribute(
      'aria-label',
      isMuted ? 'Activar sonido del video' : 'Silenciar video'
    );

    if (muteIcon) {
      muteIcon.classList.toggle('fa-volume-mute', isMuted);
      muteIcon.classList.toggle('fa-volume-up', !isMuted);
    }
  });
}