// Mantiene la preferencia de analítica del visitante entre páginas.
window.GA_MEASUREMENT_ID = "G-71PNQ7G8RJ";
window.GA_DISABLE_STORAGE_KEY = "fdv_disable_ga";

(function () {
  const params = new URLSearchParams(window.location.search);

  if (params.get("noanalytics") === "1") {
    localStorage.setItem(window.GA_DISABLE_STORAGE_KEY, "1");
  } else if (params.get("noanalytics") === "0") {
    localStorage.removeItem(window.GA_DISABLE_STORAGE_KEY);
  }

  if (localStorage.getItem(window.GA_DISABLE_STORAGE_KEY) === "1") {
    window["ga-disable-" + window.GA_MEASUREMENT_ID] = true;
  }
})();

// Desactiva el envío de eventos y guarda la preferencia local.
window.disableAnalyticsTracking = function () {
  localStorage.setItem(window.GA_DISABLE_STORAGE_KEY, "1");

  window["ga-disable-" + window.GA_MEASUREMENT_ID] = true;
};

// Reactiva el envío de eventos y elimina la preferencia de bloqueo.
window.enableAnalyticsTracking = function () {
  localStorage.removeItem(window.GA_DISABLE_STORAGE_KEY);

  window["ga-disable-" + window.GA_MEASUREMENT_ID] = false;
};

window.dataLayer = window.dataLayer || [];

// Conserva la interfaz de gtag mientras se carga la biblioteca externa.
function gtag() {
  dataLayer.push(arguments);
}

gtag("js", new Date());

gtag("config", "G-71PNQ7G8RJ");
