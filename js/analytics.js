window.GA_MEASUREMENT_ID = 'G-71PNQ7G8RJ';
  window.GA_DISABLE_STORAGE_KEY = 'fdv_disable_ga';

  (function () {

    const params = new URLSearchParams(window.location.search);

    if (params.get('noanalytics') === '1') {

      localStorage.setItem(window.GA_DISABLE_STORAGE_KEY, '1');

    } else if (params.get('noanalytics') === '0') {

      localStorage.removeItem(window.GA_DISABLE_STORAGE_KEY);

    }

    if (localStorage.getItem(window.GA_DISABLE_STORAGE_KEY) === '1') {

      window['ga-disable-' + window.GA_MEASUREMENT_ID] = true;
    }

  })();

  window.disableAnalyticsTracking = function () {

    localStorage.setItem(window.GA_DISABLE_STORAGE_KEY, '1');

    window['ga-disable-' + window.GA_MEASUREMENT_ID] = true;

  };

  window.enableAnalyticsTracking = function () {

    localStorage.removeItem(window.GA_DISABLE_STORAGE_KEY);

    window['ga-disable-' + window.GA_MEASUREMENT_ID] = false;

};

window.dataLayer = window.dataLayer || [];
  
  function gtag(){dataLayer.push(arguments);}
  
  gtag('js', new Date());
  
  gtag('config', 'G-71PNQ7G8RJ');
