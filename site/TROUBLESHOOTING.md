# NABA Website — Comprehensive Troubleshooting Manual & Operational Guide

**National African & Black Association (NABA)**  
*Live Production Domain:* [http://nabagobal.org/](http://nabagobal.org/)  
*Repository Branch:* `main`  
*Current Architecture:* Static Jamstack (HTML5, Vanilla CSS3, ES6+ Modular JavaScript, Supabase BaaS)

---

## 1. Architecture & Repository Topology

The NABA website repository contains two mirrors that must remain synchronized:
1. **Root Directory (`/`)**: Main deployment root serving GitHub Pages and custom domain `nabagobal.org`.
2. **Site Subdirectory (`/site`)**: Staging / alternative root used by specific web servers or submodules.

```
/
├── assets/                 # Brand assets, high-res photos, SVG icons, favicons
├── css/                    # styles.css (design tokens, layout, responsive breakpoints)
├── js/
│   ├── auth.js             # Supabase authentication controller
│   ├── i18n.js             # 5-language translation engine (EN, FR, ES, AR, PT)
│   ├── layout.js           # Shared header/footer/social bar injector
│   ├── main.js             # Core interactions, search, FAQ assistant, accessibility
│   ├── public-render.js    # CMS live dynamic data renderer
│   └── supabase-config.js  # Supabase client initialization
├── *.html                  # 18 public pages and staff admin portal
├── CNAME                   # Custom domain pointer (nabagobal.org)
├── sitemap.xml             # Search engine index
├── site.webmanifest        # PWA / Mobile bookmark manifest
└── site/                   # Mirrored deployment mirror
```

---

## 2. Visual & Layout Issues: Diagnoses and Permanent Fixes

### Issue 2.1: Search Overlay Stuck Open in Center of Viewport
* **Symptom:** On page load, the search box ("Search NABA — directory, events, pages...") was permanently displayed in the middle of the screen covering the hero and cards.
* **Root Cause:** A CSS rule `.search-overlay:not([hidden]) { display: flex; }` was active at the bottom of `styles.css`. In the static HTML, `<div class="search-overlay" id="searchOverlay">` lacked the `hidden` attribute. The browser evaluated `:not([hidden])` as true and forced the search box visible.
* **Resolution:**
  1. Updated `styles.css`:
     ```css
     .search-overlay {
       display: none;
       position: fixed;
       inset: 0;
       background: rgba(46,31,5,.75);
       backdrop-filter: blur(8px);
       z-index: 240;
       align-items: flex-start;
       justify-content: center;
       padding: 12vh 20px 20px;
     }
     .search-overlay.open:not([hidden]),
     body.search-open .search-overlay:not([hidden]) {
       display: flex;
     }
     .search-overlay[hidden] {
       display: none !important;
       visibility: hidden !important;
       pointer-events: none !important;
     }
     ```
  2. Added explicit `hidden` attribute to `<div class="search-overlay" id="searchOverlay" hidden>` in all 18 HTML files.
  3. Added an initialization guard in `js/main.js` that ensures `searchOverlay.hidden = true` and `searchOverlay.classList.remove('open')` on boot.

---

### Issue 2.2: FAQ Chat Assistant ("Ask NABA") Stuck Open at Bottom-Left
* **Symptom:** On page load, the "Ask NABA" chat dialog box was immediately open on the bottom-left corner, obscuring content and the cookie banner.
* **Root Cause:** Similar to the search overlay, `.assistant-panel:not([hidden]) { display: flex; }` rendered the panel visible because the HTML element lacked `hidden`.
* **Resolution:**
  1. Enforced strict closed-by-default CSS:
     ```css
     .assistant-panel,
     .assistant-fab + .assistant-panel {
       display: none;
       position: fixed;
       bottom: 76px;
       left: 18px;
       z-index: 155;
       width: min(350px, calc(100vw - 36px));
       background: var(--cream);
       border: 1.5px solid var(--gold);
       border-radius: 18px;
       box-shadow: var(--shadow-lg);
       flex-direction: column;
       max-height: 65vh;
       overflow: hidden;
     }
     .assistant-panel.open:not([hidden]) {
       display: flex;
     }
     .assistant-panel[hidden] {
       display: none !important;
       visibility: hidden !important;
       pointer-events: none !important;
     }
     ```
  2. Added `hidden` attribute to `#assistantPanel` in all HTML files.
  3. Initialized `panel.hidden = true` and `panel.classList.remove('open')` on load in `js/main.js`.

---

### Issue 2.3: Bottom-Right Floating Controls Overlapping
* **Symptom:** High-contrast toggle (`◐`), font size controls (`A-`, `A+`), and the Back-to-Top button (`↑`) collided in the bottom-right corner.
* **Root Cause:**
  1. `.a11y-toolbar` was styled as a vertical column of three 40px buttons at `bottom: 14px; right: 16px;`, spanning 140px in height.
  2. `.back-top` was positioned at `bottom: 80px; right: 16px;`, placing it right in the center of the accessibility toolbar.
  3. A duplicate `#backToTop` element was created by JavaScript because HTML used `id="backTop"` while JS queried `id="backToTop"`.
* **Resolution:**
  1. Redesigned `.a11y-toolbar` into a sleek horizontal docked capsule:
     ```css
     .a11y-toolbar {
       position: fixed;
       bottom: 18px;
       right: 18px;
       z-index: 160;
       display: flex;
       flex-direction: row;
       align-items: center;
       gap: 6px;
       background: rgba(26,17,4,.88);
       backdrop-filter: blur(12px);
       padding: 4px 8px;
       border-radius: 30px;
       border: 1.5px solid rgba(238,181,79,.45);
       box-shadow: var(--shadow-md);
     }
     ```
  2. Positioned `.back-top` / `.back-to-top` cleanly above the capsule at `bottom: 68px; right: 18px;`.
  3. Replaced raw unicode characters (`◐`, `↑`) with crisp inline vector SVGs.
  4. Unified ID references in `main.js`: `var backToTop = document.getElementById('backToTop') || document.getElementById('backTop');` to eliminate duplicate buttons.

---

### Issue 2.4: Recent Work / Story Tiles Sticking to the Left
* **Symptom:** In the "What We've Been Up To Recently" section, cards were pressed against the left viewport edge with awkward white/cream empty space on the right on widescreen displays.
* **Root Cause:** In `index.html`, `<div class="story-scroll" id="storyScroll">` was located *outside* the max-width container `<div class="wrap">`. It had `margin: 0 calc(var(--gutter) * -1);` which spanned full screen width, but only 5 cards totaling ~1300px were present, leaving a visual gap on monitors >= 1440px.
* **Resolution:**
  1. Enclosed `story-scroll` inside `<div class="wrap">`.
  2. Refactored CSS to use an auto-fit responsive grid on desktop:
     ```css
     .story-scroll {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
       gap: 16px;
       justify-content: center;
       width: 100%;
     }
     @media(max-width: 960px) {
       .story-scroll {
         display: flex;
         gap: 14px;
         overflow-x: auto;
         scroll-snap-type: x mandatory;
         padding-bottom: 12px;
         margin: 0 calc(var(--gutter) * -1);
         padding-left: var(--gutter);
         padding-right: var(--gutter);
       }
     }
     ```
  3. Result: Cards are balanced and centered on desktop, and transform into a smooth horizontal touch-scrolling gallery on tablets and mobile phones.

---

### Issue 2.5: Top-Right Navigation Toggles Overlapping and Raw Emojis
* **Symptom:** Header search, language selector, account link, and hamburger menu were visually crowded, and buttons contained raw emojis (`🔍`, `🌐`, `👤`).
* **Root Cause:**
  1. `data-i18n="search"` and `data-i18n="account"` were targeted by `i18n.js`, which set `el.textContent = "Search"`. Placing long text strings inside 38px circular/square buttons caused content overflow and overlapping.
  2. Buttons used raw OS-dependent emojis that render in mismatched colors across Windows, macOS, Android, and iOS.
* **Resolution:**
  1. Replaced all header button contents with inline SVGs with standard 24x24 viewports and consistent stroke widths.
  2. Updated `data-i18n-attr="aria-label"` so translation updates accessible labels without replacing SVG markup.
  3. Added an explicit check in `i18n.js`:
     ```javascript
     if (el.classList.contains('icon-btn') || el.querySelector('svg')) {
       el.setAttribute('aria-label', val);
       return;
     }
     ```
  4. Added `flex-shrink: 0; gap: 10px;` to `.nav__actions`.

---

## 3. Brand Identity & Logo Variant Matrix

All logo variations have been processed into 32-bit transparent PNGs with tight bounding-box crops to avoid white box artifacts:

| Asset Name | Format | Dimensions | Purpose & Placement |
|:---|:---|:---|:---|
| `assets/logo-light.png` | 32-bit PNG (Transparent) | 172 x 220 | **Header & Navigation**: Golden lion crest + primary wordmark for light cream backgrounds (`--cream`). |
| `assets/logo-dark.png` | 32-bit PNG (Transparent) | 608 x 674 | **Footer (`.site-footer`)**: Rich warm gold lockup optimized for dark espresso backgrounds (`#2E1F05`). |
| `assets/logo-mono-black.png` | 32-bit PNG (Transparent) | 519 x 768 | **Official Documents & Staff Portal**: Used in `admin.html` login card, `safeguarding.html`, and `privacy.html` headers. |
| `assets/logo-mono-white.png` | 32-bit PNG (Transparent) | 1072 x 960 | **High-Contrast Dark Mode & Press Kit**: Crisp white silhouette for deep contrast scenarios. |
| `assets/crest.png` | 32-bit PNG (Transparent) | 172 x 220 | **Heritage Dividers & Badges**: Used in `.heritage-divider .hd-mark`, `#assistantTitle` badge, and favicon generation. |

---

## 4. Favicon Suite Architecture

To ensure high-DPI clarity and prevent low-resolution raster artifacts in browser tabs:

1. **`assets/favicon.svg`**: Embedded vector SVG container with high-res base64 lion crest, espresso `#1A1104` disk, and gold `#EEB54F` border ring.
2. **`assets/favicon-32.png` & `favicon-16.png`**: Multi-resolution PNG favicons rendered with bicubic anti-aliased resampling.
3. **`assets/favicon.png`**: 64x64 desktop browser shortcut icon.
4. **`assets/apple-touch-icon.png`**: 180x180 iOS home screen icon.
5. **`assets/android-chrome-192.png` & `android-chrome-512.png`**: PWA / Android splash icons.
6. **`favicon.ico`**: 32x32 standard legacy browser icon in repository root.

All `<head>` sections reference:
```html
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="64x64" href="assets/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
```

---

## 5. Multi-Language (i18n) Engine Guidelines

* Supported language codes: `en` (English), `fr` (Français), `es` (Español), `ar` (العربية), `pt` (Português).
* **RTL Support:** Arabic automatically sets `dir="rtl"` on `<html>` and updates typography.
* **Storage:** Selected language is stored in `localStorage.getItem('naba_lang')`.
* **Adding new translation strings:** Add dictionary entries to `window.NABA_I18N` in `js/i18n.js`.
* **Markup Rule:** Never use `data-i18n` on elements containing icons without specifying `data-i18n-attr="aria-label"`.

---

## 6. Accessibility & Keyboard Navigation (a11y)

* **High Contrast Mode:** Toggled via `#a11yContrast`. Applies `html.contrast` which switches design tokens to high-contrast monochrome values:
  ```css
  html.contrast {
    --cream: #FFFFFF;
    --ink: #000000;
    --muted: #000000;
    --hairline: #000000;
    --tan: #FFF3D6;
    --gold-deep: #A66A00;
  }
  ```
* **Text Resizing:** Toggled via `#a11yPlus` and `#a11yMinus`. Applies `html.text-lg` (112%) and `html.text-xl` (124%).
* **Skip Link:** Every page includes a hidden `.skip-link` pointing to `#main` for screen readers.
* **Keyboard Escape:** Pressing `Escape` automatically dismisses open modals, search overlays, and mobile navigation menus.

---

## 7. Deployment & Custom Domain Verification

1. **Domain:** The site is live at `http://nabagobal.org/`.
   * *Note on Spelling:* The domain currently registered is `nabagobal.org` (without the 'l' in global). The `CNAME` file in root must always contain `nabagobal.org`.
2. **Mirror Parity:** Before committing changes, always synchronize root files with `site/`:
   ```powershell
   Copy-Item "css\*" "site\css\" -Force
   Copy-Item "js\*" "site\js\" -Force
   Copy-Item "assets\*" "site\assets\" -Force
   Get-ChildItem "*.html" | ForEach-Object { Copy-Item $_.FullName ("site\" + $_.Name) -Force }
   ```
3. **Git Branch:** Production deploys automatically from `origin/main`.
