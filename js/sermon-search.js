document.getElementById("search").addEventListener("input", function () {

        const query = this.value.toLowerCase();

        const sermonItems = document.querySelectorAll(".sermon-list li");

        let visibleCount = 0;



        sermonItems.forEach((item) => {

          const isMatch = item.textContent.toLowerCase().includes(query);

          item.style.display = isMatch ? "" : "none";

          if (isMatch) visibleCount++;

        });



        const noResultsMessage = document.getElementById("no-results");

        noResultsMessage.style.display = visibleCount === 0 && query.length > 0 ? "block" : "none";

      });

        // Etiquetas de idioma de cada sermón (Español / Bilingüe): se traducen; los títulos no.
        (function () {
          var LANG_KEYS = { "español": "sermones.langEs", "bilingüe": "sermones.langBi" };

          function translateLangLabels() {
            document.querySelectorAll(".sermon-info span").forEach(function (span) {
              if (!span.hasAttribute("data-lang-key")) {
                var key = LANG_KEYS[span.textContent.trim().toLowerCase()];
                if (!key) return;
                span.setAttribute("data-lang-key", key);
                span.setAttribute("data-lang-es", span.textContent.trim());
              }
              var fallback = span.getAttribute("data-lang-es");
              span.textContent = typeof window.t === "function" ? window.t(span.getAttribute("data-lang-key"), fallback) : fallback;
            });
          }

          translateLangLabels();
          // Al cambiar de idioma se actualizan las etiquetas y se vuelve a filtrar con el texto actual
          document.addEventListener("fdv:languagechange", function () {
            translateLangLabels();
            var input = document.getElementById("search");
            if (input && input.value) input.dispatchEvent(new Event("input"));
          });
        })();
