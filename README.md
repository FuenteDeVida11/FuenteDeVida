![Preview](./docs/preview.png)

# Fuente de Vida — Church Website

A static, multi-page website for Fuente de Vida, a Christian church in Madison, WI. Built as a fully static site (no backend, no build tools) with a few JavaScript-powered interactive features layered on top of vanilla HTML/CSS/JS.

**Live site:** [https://fuentedevidawi.com](https://fuentedevidawi.com)

## Features

- **Bible verse lookup** — search any verse by reference (e.g. `Juan 3:16`) in either Spanish (RVR1960, via `biblia-api.qhar.in`) or English (KJV, via the `wldeh/bible-api` dataset on jsDelivr), with request timeouts and response validation before anything is rendered.
- **Interactive cell group (células) map** — built with Leaflet.js + OpenStreetMap tiles, with map pins and list-view badges color-coded per network/group (`NETWORK_COLORS` mapping), plus a toggle between map view and list view.
- **Sermon archive with live search** — a filterable list of past sermons (title/preacher) with an embedded YouTube player for the featured sermon and thumbnail cards for the rest.
- **Visitor registration form** — sends submissions via EmailJS (no custom backend). Hardened against spam with an invisible honeypot field, a submit-cooldown (session-scoped, no persistent tracking), and a disabled "sending..." state to prevent duplicate submits.
- **Google Analytics (GA4)** integration with a simple opt-out mechanism (`?noanalytics=1` / `disableAnalyticsTracking()`), so tracking can be disabled per-browser without a cookie banner library.
- **Bilingual-friendly content** — service schedules and key strings are written to serve both Spanish- and English-speaking visitors; a small `window.t(key, fallback)` helper exists in the code as a first step toward full string externalization (see note below).
- **Reusable scroll-to-top button** — a single self-contained script injects the button and its behavior on every page, no HTML duplication required.
- **SEO basics** — `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph/Twitter meta tags, and a custom `404.html`.

> **Note on i18n:** the codebase includes a `window.t()` fallback helper used across form/status messages, but there isn't yet a live ES/EN language switcher (no `data-i18n` markup or toggle UI exists). It's a foundation for future localization rather than a shipped feature today.

## Tech Stack

- **HTML5 / CSS3** — vanilla CSS with custom properties (CSS variables) for theming, no preprocessor.
- **JavaScript (vanilla)** — no framework, no bundler; each page is a self-contained HTML file with inline `<script>` blocks plus a couple of shared `.js` files.
- **[Leaflet.js](https://leafletjs.com/)** — interactive maps for the cell groups page.
- **[EmailJS](https://www.emailjs.com/)** — client-side email delivery for the registration form (no server required).
- **Font Awesome** (via cdnjs) — icons.
- **GitHub Pages** — static hosting, custom domain via `CNAME` + DNS managed through Squarespace.
- **Google Analytics (GA4)** + **Google Search Console** — analytics and search indexing/SEO monitoring.

## Notable Technical Decisions

- **Content-Security-Policy via `<meta>` tag, not HTTP headers.** GitHub Pages doesn't allow custom response headers, so the CSP is declared per-page as a `<meta http-equiv="Content-Security-Policy">` with an explicit allowlist of every external domain the site actually calls (Leaflet/unpkg, Google Fonts, the two Bible APIs, EmailJS, YouTube, Google Analytics). `'unsafe-inline'` is intentionally kept for `script-src`/`style-src` because the site has many inline `<script>`/`style` blocks and no build step to generate per-request nonces — a deliberate, documented trade-off rather than an oversight.
- **Spam protection without a backend.** Since the contact/registration form has no server of its own (EmailJS handles delivery), abuse mitigation is done entirely client-side: an invisible honeypot field, a `sessionStorage`-based cooldown (not `localStorage`, to avoid persistent cross-session tracking), and a disabled submit button during in-flight requests.
- **Subresource Integrity pinned to real, verified hashes.** Every third-party script/stylesheet loaded from a CDN (Leaflet, Font Awesome, EmailJS) ships with an `integrity` attribute computed from the actual bytes served by that CDN at the pinned version — not guessed — so a compromised or tampered CDN response would simply fail to load rather than execute.
- **Defensive parsing of third-party API responses.** The Bible-lookup fetches validate response shape before touching the DOM and render results with `textContent`/DOM nodes instead of `innerHTML`, so a malformed or malicious API response can't inject markup into the page.
- **UTF-8 encoding bug hunting.** Several pages had mojibake (`Ã±`, `¿` placeholders) from earlier encoding mishaps; the `python/` folder contains small one-off scripts (`fix_encoding.py`, `fix_final.py`, `clean_styles.py`) used to detect and repair corrupted characters in the committed HTML/CSS.

## Project Structure

```
├── index.html              # Home page
├── 404.html                 # Custom error page
├── CNAME                    # GitHub Pages custom domain
├── robots.txt, sitemap.xml  # SEO
├── css/                     # Shared stylesheet
├── js/                      # Shared scripts (e.g. scroll-to-top.js)
├── jpg/                     # Site images
├── html/                    # Secondary pages (sermons, cell groups, leadership, events, etc.)
├── python/                  # One-off maintenance scripts (encoding fixes)
├── docs/                    # Documentation assets (e.g. preview screenshot)
└── .github/workflows/       # CI (HTML validation)
```

## Running Locally

This is a fully static site — no build step, no dependencies to install. Any static file server works:

```bash
# Option 1: Python (built-in, no install needed)
python -m http.server 8000

# Option 2: VS Code "Live Server" extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

> Serving over `http://`/`https://` (rather than opening the file directly with `file://`) is required for EmailJS and some `fetch()` calls to work correctly in the browser.

## License / Author

Developed and maintained solely by **Jorge** (Igelsia / Fuente de Vida). All rights reserved.
