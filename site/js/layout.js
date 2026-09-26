/* =====================================================================
   NABA — Shared Header & Footer Injector
   Injects consistent nav, social bar, and footer across all pages.
   Run BEFORE main.js to avoid flash of unstyled navigation.
   ===================================================================== */
(function () {

  /* ---- Social links (update when handles confirmed) ---- */
  var SOCIALS = {
    tiktok:    { url: 'https://www.tiktok.com/@nabacommunity?_r=1&_t=ZN-99x5EKp6R8w', label: 'TikTok' },
    facebook:  { url: 'https://www.facebook.com/profile.php?id=61578371739909', label: 'Facebook' },
    instagram: { url: 'https://www.instagram.com/nabacommunity/', label: 'Instagram' },
    youtube:   { url: 'https://www.youtube.com/@nabacommunity', label: 'YouTube' }
  };

  var SOCIAL_ICONS = {
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
  };

  /* ---- Determine current page for nav active state ---- */
  function currentPage() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    return file;
  }

  function navLink(href, label, i18nKey, extra) {
    var page = currentPage();
    var isActive = page === href;
    var ariaCurrent = isActive ? ' aria-current="page"' : '';
    var dataI18n = i18nKey ? ' data-i18n="' + i18nKey + '"' : '';
    var cls = extra || '';
    return '<li' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<a href="' + href + '"' + ariaCurrent + dataI18n + '>' + label + '</a></li>';
  }

  /* ---- Build social bar HTML ---- */
  function buildSocialBar() {
    var links = Object.keys(SOCIALS).map(function (key) {
      var s = SOCIALS[key];
      return '<a href="' + s.url + '" class="social-top__link social-top__link--' + key +
        '" aria-label="' + s.label + '" target="_blank" rel="noopener noreferrer">' +
        SOCIAL_ICONS[key] + '</a>';
    });
    return '<div class="social-top" aria-label="NABA on social media">' + links.join('') + '</div>';
  }

  /* ---- Build header HTML ---- */
  function buildHeader() {
    var page = currentPage();

    var html =
      '<div class="progress-bar" id="progressBar"></div>' +
      '<header class="site-header">' +

      /* Social bar ABOVE logo */
      '<div class="social-topbar">' +
        '<div class="wrap">' +
          buildSocialBar() +
          '<div class="topbar-right">' +
            '<span class="topbar-tagline">Scotland\'s African &amp; Black Community Hub</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* Ticker */
      '<div class="ticker-wrap" aria-live="off" aria-atomic="false">' +
        '<div class="ticker">' +
          '<span data-i18n="ticker.1">Youth Hub is now live &middot; Mentorship applications open</span>' +
          '<span data-i18n="ticker.2">Edinburgh &rarr; Lagos Road Trip &middot; 6 Nov 2027</span>' +
          '<span data-i18n="ticker.3">70+ Community Businesses Listed</span>' +
          '<span data-i18n="ticker.1">Youth Hub is now live &middot; Mentorship applications open</span>' +
          '<span data-i18n="ticker.2">Edinburgh &rarr; Lagos Road Trip &middot; 6 Nov 2027</span>' +
          '<span data-i18n="ticker.3">70+ Community Businesses Listed</span>' +
        '</div>' +
      '</div>' +

      /* Main nav */
      '<div class="wrap">' +
        '<nav class="nav" aria-label="Primary">' +
          '<a class="brand" href="index.html" aria-label="NABA — Home">' +
            '<span class="brand__badge">' +
              '<img src="assets/logo-light.png" alt="NABA logo" width="68" height="68" ' +
                'onerror="this.src=\'assets/NABA_Full_Lockup_Light_BG.png\'">' +
            '</span>' +
            '<span class="brand__name">' +
              '<b>National African &amp;</b>' +
              '<span>Black Association</span>' +
            '</span>' +
          '</a>' +
          '<ul class="nav__links" id="nav-links">' +
            navLink('index.html', 'Home', 'nav.home') +
            navLink('directory.html', 'Community', 'nav.community') +
            navLink('events.html', 'Events', 'nav.events') +
            navLink('news.html', 'News', 'nav.news') +
            navLink('about.html', 'About Us', 'nav.about') +
            navLink('volunteer.html', 'Volunteering &amp; Partnerships', 'nav.volunteering') +
            navLink('cuisine.html', 'Cuisine', 'nav.cuisine') +
            navLink('contact.html', 'Contact Us', 'nav.contact') +
            '<li class="has-dropdown">' +
              '<a href="youth-hub.html" aria-expanded="false" data-i18n="nav.more">More &#x25BE;</a>' +
              '<div class="dropdown" role="menu">' +
                '<a href="youth-hub.html" role="menuitem" data-i18n="nav.youth">Youth Hub</a>' +
                '<a href="impact.html" role="menuitem" data-i18n="nav.impact">Impact Tree</a>' +
                '<a href="gallery.html" role="menuitem">Photo Gallery</a>' +
                '<a href="legacy.html" role="menuitem">Legacy of Sheku Bayoh</a>' +
              '</div>' +
            '</li>' +
          '</ul>' +
          '<div class="nav__actions">' +
            '<button class="icon-btn" id="searchBtn" aria-label="Search the site" type="button"></button>' +
            '<button class="icon-btn" id="langBtn" aria-label="Change language" type="button" data-lang="en"></button>' +
            '<a class="icon-btn" href="login.html" id="accountBtn" aria-label="My account"></a>' +
            '<button class="nav__toggle" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links" type="button">' +
              '<span></span>' +
            '</button>' +
          '</div>' +
        '</nav>' +
      '</div>' +
      '</header>' +

      /* Language modal */
      '<div id="langModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="langModalTitle" hidden>' +
        '<div class="modal-box">' +
          '<button class="modal-close" id="langModalClose" aria-label="Close language picker" type="button">&times;</button>' +
          '<h2 id="langModalTitle" data-i18n="lang.choose">Choose Language</h2>' +
          '<div class="lang-grid">' +
            '<button class="lang-option" data-lang="en" type="button"><span class="lang-flag">🇬🇧</span> <span>English</span></button>' +
            '<button class="lang-option" data-lang="fr" type="button"><span class="lang-flag">🇫🇷</span> <span>Français</span></button>' +
            '<button class="lang-option" data-lang="es" type="button"><span class="lang-flag">🇪🇸</span> <span>Español</span></button>' +
            '<button class="lang-option" data-lang="ar" type="button"><span class="lang-flag">🇸🇦</span> <span>العربية</span></button>' +
            '<button class="lang-option" data-lang="pt" type="button"><span class="lang-flag">🇵🇹</span> <span>Português</span></button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* Search overlay */
      '<div id="searchOverlay" class="search-overlay" hidden>' +
        '<button class="search-close" id="searchClose" aria-label="Close search" type="button">&times;</button>' +
        '<form class="search-form" id="searchForm" role="search">' +
          '<label for="searchInput" class="sr-only">Search NABA</label>' +
          '<input type="search" id="searchInput" placeholder="Search events, news, services…" autocomplete="off">' +
          '<button type="submit" aria-label="Submit search">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<circle cx="11" cy="11" r="5.5"/><path d="M16 16L21 21" stroke-linecap="round"/>' +
            '</svg>' +
          '</button>' +
        '</form>' +
        '<div id="searchResults" class="search-results"></div>' +
      '</div>' +

      /* Toast notification */
      '<div id="toast" role="status" aria-live="polite" aria-atomic="true"></div>' +

      /* Chat assistant launcher */
      '<button class="assistant-fab" id="assistantLauncher" aria-label="Open chat assistant" type="button">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path d="M6 18.5 3 21V6.8A2.8 2.8 0 0 1 5.8 4h12.4A2.8 2.8 0 0 1 21 6.8v7.4A2.8 2.8 0 0 1 18.2 17H6Z" ' +
            'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
          '<path d="M8 9h8M8 12h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
        '</svg>' +
      '</button>' +

      /* Chat assistant panel */
      '<div class="assistant-panel" id="assistantPanel" role="dialog" aria-labelledby="assistantTitle" aria-modal="false" hidden>' +
        '<div class="asst-header">' +
          '<span id="assistantTitle">NABA Assistant</span>' +
          '<button class="asst-close" id="assistantClose" aria-label="Close assistant" type="button">&times;</button>' +
        '</div>' +
        '<div class="asst-messages" id="assistantMessages"></div>' +
        '<div class="asst-quick" id="assistantQuick"></div>' +
        '<form class="asst-form" id="assistantForm">' +
          '<input type="text" id="assistantInput" placeholder="Ask a question…" autocomplete="off">' +
          '<button type="submit" aria-label="Send">&#9654;</button>' +
        '</form>' +
      '</div>';

    return html;
  }

  /* ---- Build footer HTML ---- */
  function buildFooter() {
    return '<footer class="site-footer">' +
      '<div class="wrap">' +

        /* Newsletter */
        '<div class="newsletter">' +
          '<h4 data-i18n="footer.newsletter">Stay in the loop</h4>' +
          '<p data-i18n="footer.newsletter.sub">Cultural weeks, town halls, and road trip updates straight to your inbox.</p>' +
          '<form data-form data-collection="newsletterSignups">' +
            '<input type="email" name="email" required placeholder="you@email.com" data-i18n-ph="footer.newsletter.ph">' +
            '<button type="submit" data-i18n="footer.newsletter.btn">Join</button>' +
          '</form>' +
          '<div class="success-msg">Subscribed — welcome to NABA.</div>' +
        '</div>' +

        '<div class="footer-top">' +
          /* Brand col */
          '<div>' +
            '<div class="footer-brand">' +
              '<img src="assets/logo-dark.png" alt="NABA logo" width="110" height="92" ' +
                'onerror="this.src=\'assets/logo-light.png\'">' +
              '<b>National African &amp;<br>Black Association</b>' +
            '</div>' +
            '<p class="footer-tagline" data-i18n="footer.tagline">' +
              'Our community is our strength — connecting African and Black communities across Scotland to trusted services, culture, and each other.' +
            '</p>' +
            /* Social row in footer */
            '<div class="social-row">' +
              '<a href="' + SOCIALS.tiktok.url + '" aria-label="TikTok" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.tiktok + '</a>' +
              '<a href="' + SOCIALS.facebook.url + '" aria-label="Facebook" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.facebook + '</a>' +
              '<a href="' + SOCIALS.instagram.url + '" aria-label="Instagram" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.instagram + '</a>' +
              '<a href="' + SOCIALS.youtube.url + '" aria-label="YouTube" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.youtube + '</a>' +
            '</div>' +
          '</div>' +

          /* Explore col */
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.explore">Explore</h4>' +
            '<ul>' +
              '<li><a href="about.html">About Us</a></li>' +
              '<li><a href="directory.html">Community</a></li>' +
              '<li><a href="events.html">Events</a></li>' +
              '<li><a href="news.html">News</a></li>' +
              '<li><a href="gallery.html">Gallery</a></li>' +
              '<li><a href="youth-hub.html">Youth Hub</a></li>' +
              '<li><a href="impact.html">Impact Tree</a></li>' +
            '</ul>' +
          '</div>' +

          /* Offices col */
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.offices">Offices</h4>' +
            '<address><b>Glasgow</b><br>Parkhead Schoolhouse, 135 Westmuir St<br>Glasgow, G31 5EX</address>' +
            '<address style="margin-top:14px;"><b>Edinburgh</b><br>Gyleview House, 3 Redheughs Rigg<br>Edinburgh, EH12 9DQ</address>' +
            '<address style="margin-top:14px;"><b>Glasgow Correspondence</b><br>Clyde Offices, 2nd Floor<br>48 West George St, Glasgow, G2 1BP</address>' +
          '</div>' +

          /* Connect col */
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.connect">Connect</h4>' +
            '<ul>' +
              '<li><a href="volunteer.html">Volunteering &amp; Partnerships</a></li>' +
              '<li><a href="volunteer.html#careers">Careers &amp; Vacancies</a></li>' +
              '<li><a href="cuisine.html">Cuisine</a></li>' +
              '<li><a href="contact.html">Contact us</a></li>' +
              '<li><a href="tel:07990753498">07990 753 498</a></li>' +
              '<li><a href="mailto:admin@nabaorg.uk">admin@nabaorg.uk</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' + /* end footer-top */

        '<div class="footer-bar">' +
          '<span>&copy; <span id="year"></span> <span data-i18n="footer.copyright">National African &amp; Black Association.</span></span>' +
          '<ul>' +
            '<li><a href="privacy.html" data-i18n="footer.privacy">Privacy</a></li>' +
            '<li><a href="accessibility.html" data-i18n="footer.accessibility">Accessibility</a></li>' +
            '<li><a href="safeguarding.html" data-i18n="footer.safeguarding">Safeguarding</a></li>' +
            '<li><a href="admin.html" data-i18n="footer.stafflogin">Staff Login</a></li>' +
          '</ul>' +
          '<span style="display:block;opacity:.8;margin-top:8px;" data-i18n="footer.credit">Web design by Kaabu Technologies</span>' +
        '</div>' +

      '</div>' + /* end wrap */
      '</footer>';
  }

  /* ---- Inject on DOMContentLoaded or immediately if ready ---- */
  function initLayout() {
    /* Check if page has its own static header (skip inject if so) */
    if (document.querySelector('.site-header')) {
      /* Page has static header — just patch logos and add social bar */
      patchExistingHeader();
    } else {
      /* Inject full header */
      var headerHtml = buildHeader();
      document.body.insertAdjacentHTML('afterbegin', headerHtml);
    }

    /* Check if page has its own static footer */
    if (!document.querySelector('.site-footer')) {
      document.body.insertAdjacentHTML('beforeend', buildFooter());
    } else {
      patchExistingFooter();
    }

    /* Footer year */
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initLayout();
      updateHeaderHeight();
    });
  } else {
    initLayout();
    updateHeaderHeight();
  }

  function updateHeaderHeight() {
    var header = document.querySelector('.site-header');
    if (header) {
      var h = header.offsetHeight;
      document.documentElement.style.setProperty('--header-h', h + 'px');
    }
  }
  window.addEventListener('resize', function() {
    updateHeaderHeight();
  }, { passive: true });

  function patchExistingHeader() {
    /* Replace old logo src */
    document.querySelectorAll('img[src*="new-naba-logo"], img[src*="crest.png"], img[src*="naba-brand-mark"]').forEach(function (img) {
      var w = img.width || 68;
      if (w > 100) {
        img.src = 'assets/logo-light.png';
      } else {
        img.src = 'assets/logo-light.png';
      }
    });

    /* Inject social bar before ticker if not already present */
    if (!document.querySelector('.social-topbar')) {
      var header = document.querySelector('.site-header');
      if (header) {
        header.insertAdjacentHTML('afterbegin',
          '<div class="social-topbar">' +
            '<div class="wrap">' +
              buildSocialBar() +
              '<div class="topbar-right">' +
                '<span class="topbar-tagline">Scotland\'s African &amp; Black Community Hub</span>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }
    }

    /* Remove conflicting static langBackdrop if present to avoid dual-modal screen takeover */
    var oldBackdrop = document.getElementById('langBackdrop');
    if (oldBackdrop) {
      oldBackdrop.remove();
    }

    /* Add modal and overlays if missing */
    if (!document.getElementById('langModal')) {
      document.body.insertAdjacentHTML('beforeend',
        '<div id="langModal" class="modal-overlay" role="dialog" aria-modal="true" ' +
          'aria-labelledby="langModalTitle" hidden>' +
          '<div class="modal-box">' +
            '<button class="modal-close" id="langModalClose" aria-label="Close" type="button">&times;</button>' +
            '<h2 id="langModalTitle" data-i18n="lang.choose">Choose Language</h2>' +
            '<div class="lang-grid">' +
              '<button class="lang-option" data-lang="en" type="button"><span class="lang-flag">🇬🇧</span> <span>English</span></button>' +
              '<button class="lang-option" data-lang="fr" type="button"><span class="lang-flag">🇫🇷</span> <span>Français</span></button>' +
              '<button class="lang-option" data-lang="es" type="button"><span class="lang-flag">🇪🇸</span> <span>Español</span></button>' +
              '<button class="lang-option" data-lang="ar" type="button"><span class="lang-flag">🇸🇦</span> <span>العربية</span></button>' +
              '<button class="lang-option" data-lang="pt" type="button"><span class="lang-flag">🇵🇹</span> <span>Português</span></button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }

    if (!document.getElementById('toast')) {
      document.body.insertAdjacentHTML('beforeend',
        '<div id="toast" role="status" aria-live="polite" aria-atomic="true"></div>');
    }

    if (!document.getElementById('searchOverlay')) {
      document.body.insertAdjacentHTML('beforeend',
        '<div id="searchOverlay" class="search-overlay" hidden>' +
          '<button class="search-close" id="searchClose" aria-label="Close search" type="button">&times;</button>' +
          '<form class="search-form" id="searchForm" role="search">' +
            '<label for="searchInput" class="sr-only">Search NABA</label>' +
            '<input type="search" id="searchInput" placeholder="Search events, news, services…" autocomplete="off">' +
            '<button type="submit" aria-label="Submit search">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<circle cx="11" cy="11" r="5.5"/><path d="M16 16L21 21" stroke-linecap="round"/>' +
              '</svg>' +
            '</button>' +
          '</form>' +
          '<div id="searchResults" class="search-results"></div>' +
        '</div>'
      );
    }

    if (!document.getElementById('assistantLauncher')) {
      document.body.insertAdjacentHTML('beforeend',
        '<button class="assistant-fab" id="assistantLauncher" aria-label="Open chat assistant" type="button">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M6 18.5 3 21V6.8A2.8 2.8 0 0 1 5.8 4h12.4A2.8 2.8 0 0 1 21 6.8v7.4A2.8 2.8 0 0 1 18.2 17H6Z" ' +
              'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
            '<path d="M8 9h8M8 12h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
        '<div class="assistant-panel" id="assistantPanel" role="dialog" aria-labelledby="assistantTitle" aria-modal="false" hidden>' +
          '<div class="asst-header">' +
            '<span id="assistantTitle">NABA Assistant</span>' +
            '<button class="asst-close" id="assistantClose" aria-label="Close assistant" type="button">&times;</button>' +
          '</div>' +
          '<div class="asst-messages" id="assistantMessages"></div>' +
          '<div class="asst-quick" id="assistantQuick"></div>' +
          '<form class="asst-form" id="assistantForm">' +
            '<input type="text" id="assistantInput" placeholder="Ask a question…" autocomplete="off">' +
            '<button type="submit" aria-label="Send">&#9654;</button>' +
          '</form>' +
        '</div>'
      );
    }
  }

  function patchExistingFooter() {
    /* Replace old logo in footer */
    document.querySelectorAll('.footer-brand img, .site-footer img[src*="new-naba-logo"]').forEach(function (img) {
      img.src = 'assets/logo-dark.png';
    });

    /* Replace generic social links with real ones */
    var socialRow = document.querySelector('.social-row');
    if (socialRow) {
      socialRow.innerHTML =
        '<a href="' + SOCIALS.tiktok.url + '" aria-label="TikTok" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.tiktok + '</a>' +
        '<a href="' + SOCIALS.facebook.url + '" aria-label="Facebook" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.facebook + '</a>' +
        '<a href="' + SOCIALS.instagram.url + '" aria-label="Instagram" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.instagram + '</a>' +
        '<a href="' + SOCIALS.youtube.url + '" aria-label="YouTube" target="_blank" rel="noopener noreferrer">' + SOCIAL_ICONS.youtube + '</a>';
    }
  }

})();
