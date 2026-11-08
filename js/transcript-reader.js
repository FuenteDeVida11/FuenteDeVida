document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("transcriptDialog");
  const closeButton = dialog && dialog.querySelector(".transcript-dialog-close");
  const list = document.getElementById("transcriptList");
  const content = document.getElementById("transcriptContent");
  const status = document.getElementById("transcriptStatus");
  const previousButton = document.getElementById("transcriptPrevious");
  const nextButton = document.getElementById("transcriptNext");
  const languageToggle = document.getElementById("transcriptLanguageToggle");
  const languageButtons = languageToggle
    ? Array.from(languageToggle.querySelectorAll("[data-transcript-lang]"))
    : [];

  if (
    !dialog ||
    !closeButton ||
    !list ||
    !content ||
    !status ||
    !previousButton ||
    !nextButton ||
    typeof dialog.showModal !== "function"
  ) {
    return;
  }

  const transcriptLinks = Array.from(
    document.querySelectorAll(".sermon-transcript-link[href]"),
  );
  const transcripts = transcriptLinks.map(function (link) {
    const info = link.closest(".sermon-info");
    const title = info && info.querySelector("a:not(.sermon-transcript-link)");

    return {
      href: link.href,
      hrefEn: link.dataset.transcriptEn
        ? new URL(link.dataset.transcriptEn, document.baseURI).href
        : "",
      title: title ? title.textContent.trim() : link.textContent.trim(),
    };
  });
  const cache = new Map();
  const retryButton = document.createElement("button");
  let currentIndex = -1;
  let currentLanguage =
    window.FDV_I18N && typeof window.FDV_I18N.getLang === "function"
      ? window.FDV_I18N.getLang()
      : "es";
  let loadId = 0;
  let previousBodyOverflow = "";

  retryButton.type = "button";
  retryButton.className = "transcript-retry";
  retryButton.hidden = true;
  retryButton.addEventListener("click", function () {
    if (currentIndex >= 0) loadTranscript(currentIndex, currentLanguage);
  });
  status.insertAdjacentElement("afterend", retryButton);

  function translate(key, fallback) {
    return typeof window.t === "function" ? window.t(key, fallback) : fallback;
  }

  function updateNavigation() {
    previousButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex < 0 || currentIndex >= transcripts.length - 1;

    Array.from(list.children).forEach(function (item, index) {
      const button = item.querySelector("button");
      if (button) {
        if (index === currentIndex) {
          button.setAttribute("aria-current", "true");
        } else {
          button.removeAttribute("aria-current");
        }
      }
    });
  }

  function updateLanguageToggle(transcript) {
    if (!languageToggle) return;
    languageToggle.hidden = !transcript || !transcript.hrefEn;
    languageButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.transcriptLang === currentLanguage),
      );
    });
  }

  async function loadTranscript(index, requestedLanguage) {
    const transcript = transcripts[index];
    if (!transcript) return;

    currentLanguage = requestedLanguage || currentLanguage;
    if (currentLanguage === "en" && !transcript.hrefEn) {
      currentLanguage = "es";
    }
    const transcriptHref =
      currentLanguage === "en" ? transcript.hrefEn : transcript.href;
    currentIndex = index;
    const thisLoad = ++loadId;
    content.replaceChildren();
    status.textContent = translate(
      "sermones.transcriptLoading",
      "Cargando transcripción…",
    );
    retryButton.hidden = true;
    updateNavigation();
    updateLanguageToggle(transcript);

    try {
      let transcriptPromise = cache.get(transcriptHref);
      if (!transcriptPromise) {
        transcriptPromise = fetch(transcriptHref).then(function (response) {
          if (!response.ok) {
            throw new Error(
              "Transcript request failed with status " + response.status,
            );
          }
          return response.text();
        });
        cache.set(transcriptHref, transcriptPromise);
      }

      const html = await transcriptPromise;
      const transcriptDocument = new DOMParser().parseFromString(
        html,
        "text/html",
      );
      const article = transcriptDocument.querySelector(".transcript-page");

      if (!article) {
        throw new Error("Transcript page is missing its transcript content");
      }

      if (thisLoad !== loadId) return;

      const transcriptArticle = document.importNode(article, true);
      transcriptArticle.lang = currentLanguage;
      transcriptArticle.dataset.transcriptLanguage = currentLanguage;
      if (typeof window.FDV_FORMAT_TRANSCRIPT === "function") {
        window.FDV_FORMAT_TRANSCRIPT(transcriptArticle);
      }
      content.replaceChildren(transcriptArticle);
      status.textContent = "";
    } catch (error) {
      cache.delete(transcriptHref);
      if (thisLoad !== loadId) return;

      console.error("Unable to load sermon transcript:", error);
      status.textContent = translate(
        "sermones.transcriptError",
        "No se pudo cargar la transcripción. Intenta de nuevo.",
      );
      retryButton.textContent = translate(
        "sermones.transcriptRetry",
        "Intentar de nuevo",
      );
      retryButton.hidden = false;
    }
  }

  transcripts.forEach(function (transcript, index) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = transcript.title;
    button.addEventListener("click", function () {
      loadTranscript(index);
    });
    item.appendChild(button);
    list.appendChild(item);
  });

  transcriptLinks.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (!dialog.open) {
        previousBodyOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
      loadTranscript(index);
    });
  });

  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    document.body.style.overflow = previousBodyOverflow;
  });

  previousButton.addEventListener("click", function () {
    if (currentIndex > 0) loadTranscript(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    if (currentIndex < transcripts.length - 1) {
      loadTranscript(currentIndex + 1, currentLanguage);
    }
  });

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (currentIndex >= 0) {
        loadTranscript(currentIndex, button.dataset.transcriptLang);
      }
    });
  });

  document.addEventListener("fdv:languagechange", function (event) {
    const language = event.detail && event.detail.lang;
    if (language === "es" || language === "en") {
      currentLanguage = language;
      if (dialog.open && currentIndex >= 0) {
        loadTranscript(currentIndex, currentLanguage);
      }
    }
    if (!retryButton.hidden) {
      retryButton.textContent = translate(
        "sermones.transcriptRetry",
        "Intentar de nuevo",
      );
    }
  });
});
