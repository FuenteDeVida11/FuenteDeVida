document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("transcriptDialog");
  const closeButton = dialog && dialog.querySelector(".transcript-dialog-close");
  const list = document.getElementById("transcriptList");
  const content = document.getElementById("transcriptContent");
  const status = document.getElementById("transcriptStatus");
  const previousButton = document.getElementById("transcriptPrevious");
  const nextButton = document.getElementById("transcriptNext");

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
      title: title ? title.textContent.trim() : link.textContent.trim(),
    };
  });
  const cache = new Map();
  const retryButton = document.createElement("button");
  let currentIndex = -1;
  let loadId = 0;
  let previousBodyOverflow = "";

  retryButton.type = "button";
  retryButton.className = "transcript-retry";
  retryButton.hidden = true;
  retryButton.addEventListener("click", function () {
    if (currentIndex >= 0) loadTranscript(currentIndex);
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

  async function loadTranscript(index) {
    const transcript = transcripts[index];
    if (!transcript) return;

    currentIndex = index;
    const thisLoad = ++loadId;
    content.replaceChildren();
    status.textContent = translate(
      "sermones.transcriptLoading",
      "Cargando transcripción…",
    );
    retryButton.hidden = true;
    updateNavigation();

    try {
      let transcriptPromise = cache.get(transcript.href);
      if (!transcriptPromise) {
        transcriptPromise = fetch(transcript.href).then(function (response) {
          if (!response.ok) {
            throw new Error(
              "Transcript request failed with status " + response.status,
            );
          }
          return response.text();
        });
        cache.set(transcript.href, transcriptPromise);
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

      content.replaceChildren(document.importNode(article, true));
      status.textContent = "";
    } catch (error) {
      cache.delete(transcript.href);
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
    if (currentIndex < transcripts.length - 1) loadTranscript(currentIndex + 1);
  });

  document.addEventListener("fdv:languagechange", function () {
    if (retryButton.hidden) return;
    retryButton.textContent = translate(
      "sermones.transcriptRetry",
      "Intentar de nuevo",
    );
  });
});
