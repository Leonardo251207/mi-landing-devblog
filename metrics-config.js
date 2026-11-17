/* ==========================================================
   Configuración del beacon de métricas para la landing.
   Solo expone datos públicos del sitio "devblog".
   ========================================================== */
(() => {
  "use strict";

  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  window.DEVBLOG_CONFIG = {
    METRICS_ENABLED: true,
    METRICS_BASE_URL: isLocal
      ? "http://127.0.0.1:8000"
      : "https://devblog-metrics-leonardo.onrender.com",
    METRICS_KEY: "pk_live_devblog_7f3a9c2e5b1d4a8f9c0e6b2d7a4f1c8e",
    METRICS_SITE: "devblog",
  };
})();
