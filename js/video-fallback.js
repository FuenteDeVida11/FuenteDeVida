// Manejo de fallback para video en menu y hero si ocurre un error de carga
      function setupVideoFallback(videoSelector, posterSelector) {
    
        const video = document.querySelector(videoSelector);
    
        const poster = document.querySelector(posterSelector);
    
        if (!video || !poster) return;

        const showPoster = () => {
    
          poster.style.display = 'block';
    
          video.style.display = 'none';
    
        };

        video.addEventListener('error', showPoster, true);
    
        const source = video.querySelector('source');
    
        if (source) {
    
          source.addEventListener('error', showPoster);
    
        }
    
      }

      setupVideoFallback('.hero-video', '.hero-poster');
