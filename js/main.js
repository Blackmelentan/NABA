/* =====================================================================
   NABA — main.js  v18
   Core site JavaScript: animations, nav, search, lang switcher, assistant,
   expandable sections, forms, countdown, read-more, and more.
   ===================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     SCROLL REVEALS
     ============================================================== */
  try {
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  } catch (_) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ================================================================
     TOAST NOTIFICATION
     ============================================================== */
  var toastEl = document.getElementById('toast');
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.getElementById('toast');
      if (!toastEl) return;
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
  }
  window.nabaToast = toast;

  /* ================================================================
     SVG ICONS (replace emoji placeholders)
     ============================================================== */
  var iconSvg = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="5.5" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M16 16L21 21" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    globe:  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.8 2.9 4.3 5.9 4.3 9S14.8 18.1 12 21c-2.8-2.9-4.3-5.9-4.3-9S9.2 5.9 12 3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    user:   '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M5 19c1.6-3.1 4.1-4.7 7-4.7s5.4 1.6 7 4.7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    chat:   '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18.5 3 21V6.8A2.8 2.8 0 0 1 5.8 4h12.4A2.8 2.8 0 0 1 21 6.8v7.4A2.8 2.8 0 0 1 18.2 17H6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 9h8M8 12h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  (function setSvgIcons() {
    var map = { searchBtn: 'search', langBtn: 'globe', accountBtn: 'user', assistantLauncher: 'chat' };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.querySelector('svg')) {
        el.innerHTML = iconSvg[map[id]];
      }
    });
  })();

  /* ================================================================
     SCROLL PROGRESS BAR
     ============================================================== */
  var progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ================================================================
     MOBILE NAV
     ============================================================== */
  var menuToggle = document.getElementById('menuBtn');
  var navLinks   = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && !e.target.closest('.has-dropdown')) {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
      }
    });
  }

  /* ================================================================
     DROPDOWN NAV (More menu)
     ============================================================== */
  function closeAllDropdowns() {
    document.querySelectorAll('.has-dropdown').forEach(function (d) {
      d.classList.remove('open');
      var t = d.querySelector('a');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.has-dropdown').forEach(function (drop) {
    var trigger = drop.querySelector(':scope > a');
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', function (e) {
      var isSmall = window.innerWidth <= 1180;
      if (isSmall || trigger.getAttribute('href') === '#') e.preventDefault();
      var wasOpen = drop.classList.contains('open');
      closeAllDropdowns();
      if (!wasOpen) {
        drop.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) closeAllDropdowns();
  });

  /* ================================================================
     LANGUAGE SWITCHER (full site translation)
     ============================================================== */
  /* ================================================================
     LANGUAGE SWITCHER (full site translation)
     ============================================================== */
  function getLangModal() {
    return document.getElementById('langModal') || document.getElementById('langBackdrop');
  }

  function openLangModal() {
    var modal = getLangModal();
    if (!modal) return;
    modal.hidden = false;
    modal.removeAttribute('hidden');
    modal.classList.add('open');
    var box = modal.querySelector('.modal-box, .lang-modal');
    if (box && box.focus) box.focus();
  }

  function closeLangModal() {
    var modal = getLangModal();
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('hidden', '');
    modal.classList.remove('open');
    var btn = document.getElementById('langBtn');
    if (btn) btn.focus();
  }

  /* Delegated clicks for language button, options, close button, and backdrop */
  document.addEventListener('click', function (e) {
    if (e.target.closest('#langBtn')) {
      e.preventDefault();
      openLangModal();
      return;
    }
    if (e.target.closest('#langModalClose') || e.target.closest('.modal-close')) {
      e.preventDefault();
      closeLangModal();
      return;
    }
    var opt = e.target.closest('.lang-option, .lang-row');
    if (opt) {
      e.preventDefault();
      var lang = opt.getAttribute('data-lang');
      if (lang && window.NABA_I18N) {
        window.NABA_I18N.setLang(lang);
      }
      closeLangModal();
      var labelEl = opt.querySelector('span:not(.lang-flag)') || opt.querySelector('span');
      var label = labelEl ? labelEl.textContent.trim() : (lang || '').toUpperCase();
      toast('Language: ' + label);
      return;
    }
    var modal = getLangModal();
    if (modal && modal.classList.contains('open') && !e.target.closest('.modal-box, .lang-modal')) {
      if (e.target === modal || modal.contains(e.target)) {
        closeLangModal();
      }
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var modal = getLangModal();
      if (modal && modal.classList.contains('open')) {
        closeLangModal();
      }
    }
  });

  /* Apply saved language on load */
  if (window.NABA_I18N) {
    window.NABA_I18N.apply();
  }

  /* ================================================================
     SEARCH OVERLAY
     ============================================================== */
  var searchBtn     = document.getElementById('searchBtn');
  var searchOverlay = document.getElementById('searchOverlay');
  var searchClose   = document.getElementById('searchClose');
  var searchInput   = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  var searchForm    = document.getElementById('searchForm');

  /* Site search index — extend with real CMS data */
  var SEARCH_INDEX = [
    { title: 'About NABA', url: 'about.html', desc: 'Learn about the National African & Black Association.' },
    { title: 'Events', url: 'events.html', desc: 'Upcoming community events across Scotland.' },
    { title: 'News', url: 'news.html', desc: 'Latest news and stories from the community.' },
    { title: 'Community Directory', url: 'directory.html', desc: 'Find African & Black-owned businesses in Scotland.' },
    { title: 'Youth Hub', url: 'youth-hub.html', desc: 'Mentorship, support, and opportunities for young people.' },
    { title: 'Impact Tree', url: 'impact.html', desc: 'See the impact NABA is making across Scotland.' },
    { title: 'Gallery', url: 'gallery.html', desc: 'Photos from NABA events and community gatherings.' },
    { title: 'Volunteer & Partnerships', url: 'volunteer.html', desc: 'Get involved, volunteer, or partner with NABA.' },
    { title: 'Cuisine', url: 'cuisine.html', desc: 'African and Caribbean food culture and recipes.' },
    { title: 'Contact Us', url: 'contact.html', desc: 'Get in touch with the NABA team.' },
    { title: 'Legacy of Sheku Bayoh', url: 'legacy.html', desc: 'Honouring the legacy and fighting for justice.' },
    { title: 'Sign Up', url: 'signup.html', desc: 'Join NABA as a member.' },
    { title: 'Privacy Policy', url: 'privacy.html', desc: 'Our privacy and data protection policy.' },
    { title: 'Accessibility Statement', url: 'accessibility.html', desc: 'Our commitment to digital accessibility.' },
    { title: 'Safeguarding Policy', url: 'safeguarding.html', desc: 'How we protect vulnerable community members.' }
  ];

  function doSearch(q) {
    if (!q || q.length < 2) { searchResults.innerHTML = ''; return; }
    var lower = q.toLowerCase();
    var results = SEARCH_INDEX.filter(function (item) {
      return item.title.toLowerCase().includes(lower) || item.desc.toLowerCase().includes(lower);
    });
    if (!results.length) {
      searchResults.innerHTML = '<p class="search-empty">No results for "<strong>' + esc(q) + '</strong>"</p>';
      return;
    }
    searchResults.innerHTML = results.map(function (r) {
      return '<a href="' + r.url + '" class="search-result">' +
        '<strong>' + esc(r.title) + '</strong>' +
        '<span>' + esc(r.desc) + '</span>' +
        '</a>';
    }).join('');
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
    document.body.classList.add('search-open');
    if (searchInput) { searchInput.value = ''; searchInput.focus(); }
    if (searchResults) searchResults.innerHTML = '';
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = true;
    document.body.classList.remove('search-open');
    if (searchBtn) searchBtn.focus();
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchInput) {
    searchInput.addEventListener('input', function () { doSearch(searchInput.value.trim()); });
  }
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      doSearch(searchInput ? searchInput.value.trim() : '');
    });
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay && !searchOverlay.hidden) closeSearch();
  });

  /* ================================================================
     CHAT ASSISTANT
     ============================================================== */
  var launcher       = document.getElementById('assistantLauncher');
  var panel          = document.getElementById('assistantPanel');
  var assistantClose = document.getElementById('assistantClose');
  var messages       = document.getElementById('assistantMessages');
  var quick          = document.getElementById('assistantQuick');
  var assistantForm  = document.getElementById('assistantForm');
  var assistantInput = document.getElementById('assistantInput');

  var FAQ = [
    { q: 'How do I join NABA?', a: 'You can join NABA by visiting our <a href="signup.html">Sign Up page</a> and completing the membership form. Membership is free and open to all who support our mission.', link: 'signup.html' },
    { q: 'Where are your offices?', a: 'We have offices in <strong>Glasgow</strong> (Parkhead Schoolhouse, 135 Westmuir St, G31 5EX) and <strong>Edinburgh</strong> (Gyleview House, 3 Redheughs Rigg, EH12 9DQ).', link: 'contact.html' },
    { q: 'How do I volunteer?', a: 'We\'d love your help! Visit our <a href="volunteer.html">Volunteering page</a> to see current opportunities and submit an application.', link: 'volunteer.html' },
    { q: 'What is the Youth Hub?', a: 'The Youth Hub offers mentorship, skills workshops, and support for young African and Black people across Scotland. Visit the <a href="youth-hub.html">Youth Hub page</a> for more.', link: 'youth-hub.html' },
    { q: 'How do I contact NABA?', a: 'You can reach us at <a href="mailto:admin@nabaorg.uk">admin@nabaorg.uk</a> or call <a href="tel:07990753498">07990 753 498</a>. Or use our <a href="contact.html">contact form</a>.', link: 'contact.html' },
    { q: 'What is the Edinburgh to Lagos road trip?', a: 'The Edinburgh → Lagos Road Trip is a landmark community journey departing 6 November 2027, connecting our Scottish community with West African partner communities. Follow us on social media for updates.', link: 'events.html' },
    { q: 'How do I list my business in the directory?', a: 'Visit our <a href="directory.html">Community Directory</a> and use the "Add Your Business" form. It\'s free for African and Black-owned businesses in Scotland.', link: 'directory.html' },
    { q: 'What events are coming up?', a: 'See all upcoming events on our <a href="events.html">Events page</a>. We host town halls, cultural weeks, and community activities across Scotland.', link: 'events.html' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function addMsg(html, who) {
    if (!messages) return;
    var d = document.createElement('div');
    d.className = 'asst-msg asst-msg--' + who;
    d.innerHTML = html;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  function findAnswer(text) {
    var lower = text.toLowerCase();
    var best = null, bestScore = 0;
    FAQ.forEach(function (item) {
      var qWords = item.q.toLowerCase().split(/\s+/);
      var score = qWords.filter(function (w) { return lower.includes(w) && w.length > 3; }).length;
      if (score > bestScore) { bestScore = score; best = item; }
    });
    return bestScore >= 1 ? best : null;
  }

  function addBotAnswer(item) {
    addMsg(item.a, 'bot');
    if (item.link) {
      addMsg('<a href="' + item.link + '" class="asst-link">Go to page &rarr;</a>', 'bot');
    }
  }

  function renderQuickReplies() {
    if (!quick) return;
    quick.innerHTML = '';
    FAQ.slice(0, 4).forEach(function (item) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'asst-quick-btn';
      b.textContent = item.q;
      b.addEventListener('click', function () {
        addMsg(esc(item.q), 'user');
        addBotAnswer(item);
        quick.innerHTML = '';
      });
      quick.appendChild(b);
    });
  }

  var assistantStarted = false;

  function openAssistant() {
    if (!panel) return;
    panel.hidden = false;
    panel.removeAttribute('hidden');
    if (!assistantStarted) {
      assistantStarted = true;
      addMsg('Hi! I\'m the NABA assistant. I can answer common questions about NABA, our services, events, and how to get involved. What would you like to know?', 'bot');
      renderQuickReplies();
    }
  }

  function closeAssistant() {
    if (!panel) return;
    panel.hidden = true;
    if (launcher) launcher.focus();
  }

  if (launcher) launcher.addEventListener('click', openAssistant);
  if (assistantClose) assistantClose.addEventListener('click', closeAssistant);
  if (assistantForm) {
    assistantForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = assistantInput ? assistantInput.value.trim() : '';
      if (!text) return;
      addMsg(esc(text), 'user');
      if (assistantInput) assistantInput.value = '';
      if (quick) quick.innerHTML = '';
      var answer = findAnswer(text);
      if (answer) {
        addBotAnswer(answer);
      } else {
        addMsg('I don\'t have a specific answer for that yet. Try the <a href="contact.html">Contact page</a> or call us on <a href="tel:07990753498">07990 753 498</a>.', 'bot');
      }
    });
  }

  /* ================================================================
     RIPPLE BUTTONS
     ============================================================== */
  document.querySelectorAll('.rippleBtn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = this.getBoundingClientRect();
      var circle = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      circle.className = 'ripple';
      circle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;' +
        'left:' + (e.clientX - rect.left - size / 2) + 'px;' +
        'top:' + (e.clientY - rect.top - size / 2) + 'px;';
      this.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 650);
    });
  });

  /* ================================================================
     HERO WORD REVEAL ANIMATION
     ============================================================== */
  document.querySelectorAll('[data-split]').forEach(function (h1) {
    var words = h1.textContent.trim().split(/\s+/);
    h1.textContent = '';
    words.forEach(function (w, i) {
      var span = document.createElement('span');
      span.className = 'word';
      var inner = document.createElement('i');
      inner.textContent = w;
      inner.style.setProperty('--i', i);
      span.appendChild(inner);
      h1.appendChild(span);
      if (i < words.length - 1) h1.appendChild(document.createTextNode(' '));
    });
  });

  requestAnimationFrame(function () { document.body.classList.add('loaded'); });

  /* ================================================================
     HERO PARALLAX
     ============================================================== */
  var heroBg = document.querySelector('.hero__bg');
  if (heroBg && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        heroBg.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px) scale(' +
          (1 + Math.min(y, 400) * 0.0004).toFixed(4) + ')';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ================================================================
     FOOTER YEAR
     ============================================================== */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ================================================================
     GENERIC TAB SWITCHER
     ============================================================== */
  document.querySelectorAll('.tab-row').forEach(function (row) {
    row.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        row.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        row.parentElement.querySelectorAll('.form-panel, .tab-panel').forEach(function (p) { p.classList.remove('active'); });
        var target = row.parentElement.querySelector('[data-panel="' + tab.dataset.tab + '"]');
        if (target) target.classList.add('active');
      });
    });
  });

  /* ================================================================
     GENERIC FORM SUBMIT → SUCCESS + TOAST + BACKEND
     ============================================================== */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.success-msg');
      var collection = form.dataset.collection;
      if (collection && window.nabaCMS) {
        var data = {};
        new FormData(form).forEach(function (v, k) {
          if (typeof v === 'string') data[k] = v;
        });
        window.nabaCMS.submitPublic(collection, data);
      }
      if (msg) msg.classList.add('show');
      var t = window.NABA_I18N ? window.NABA_I18N.t('contact.success') : 'Submitted — thank you!';
      toast(t);
      form.reset();
    });
  });

  /* ================================================================
     EXPANDABLE CARDS (Our Mission / NABA Focus / etc.)
     ============================================================== */
  document.querySelectorAll('.card--expand').forEach(function (card) {
    /* Add "Read more" button if not already present */
    if (!card.querySelector('.card__more')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card__more';
      btn.innerHTML = '<span class="expand-text">Read more</span> <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      card.appendChild(btn);
    }
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('click', function (e) {
      /* Don't toggle when clicking links inside */
      if (e.target.tagName === 'A') return;
      var open = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', open ? 'false' : 'true');
      var btn = card.querySelector('.expand-text');
      if (btn) btn.textContent = open ? 'Read more' : 'Read less';
    });
  });

  /* ================================================================
     FAQ ACCORDION
     ============================================================== */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var q = i.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ================================================================
     READ MORE — news cards, media cards, story cards, etc.
     ============================================================== */
  document.querySelectorAll('.news-card__body, .story-body, .mc-body, .dir-card__body').forEach(function (body) {
    var full = body.querySelector('.news-card__full, .story-full, .expand-content');
    if (!full) {
      /* If text is longer than 220 chars and no full section exists, create an expandable block */
      var p = body.querySelector('p');
      if (p && p.textContent.length > 220 && !body.querySelector('.read-more-btn')) {
        var text = p.textContent;
        var cutoff = text.lastIndexOf(' ', 180);
        if (cutoff > 80) {
          var preview = text.substring(0, cutoff) + '…';
          var rest = text.substring(cutoff);
          p.textContent = preview;
          full = document.createElement('span');
          full.className = 'expand-content';
          full.textContent = rest;
          full.style.display = 'none';
          p.appendChild(full);
        }
      }
    }
    if (!full || body.querySelector('.read-more-btn')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'read-more-btn';
    btn.textContent = 'Read more →';
    btn.setAttribute('aria-expanded', 'false');
    full.style.display = 'none';
    body.appendChild(btn);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      full.style.display = open ? 'none' : 'inline';
      full.classList.toggle('is-expanded', !open);
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      btn.textContent = open ? 'Read more →' : 'Read less ←';
    });
  });

  /* ================================================================
     COUNTDOWN — Edinburgh → Lagos road trip (6 Nov 2027)
     ============================================================== */
  var cdD = document.getElementById('cd-d');
  if (cdD) {
    var tripTarget = new Date('2027-11-06T08:00:00');
    function tick() {
      var diff = Math.max(0, tripTarget - new Date());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      document.getElementById('cd-d').textContent = d;
      document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
      document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
      document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ================================================================
     JOURNEY SCRUBBER (road trip interactive map)
     ============================================================== */
  var scrub = document.getElementById('journeyScrub');
  if (scrub) {
    var scrubInfoText = [
      '<strong>Edinburgh, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿</strong> Departure point. The convoy sets off from NABA\'s Edinburgh office at Gyleview House, Redheughs Rigg.',
      '<strong>Rabat, Morocco 🇲🇦</strong> Midpoint stopover, crossing from Europe into North Africa before the long haul south.',
      '<strong>Lagos, Nigeria 🇳🇬</strong> Final destination. Arrival celebrations connect the convoy with West African partner communities.'
    ];
    var scrubInfo  = document.getElementById('scrubInfo');
    var waypoints  = document.querySelectorAll('.waypoint');

    function setWaypoint(i) {
      waypoints.forEach(function (w) { w.classList.toggle('active', w.dataset.i === String(i)); });
      if (scrubInfo) scrubInfo.innerHTML = scrubInfoText[i] || '';
    }
    scrub.addEventListener('input', function (e) { setWaypoint(parseInt(e.target.value, 10)); });
    waypoints.forEach(function (w) {
      w.addEventListener('click', function () {
        scrub.value = w.dataset.i;
        setWaypoint(parseInt(w.dataset.i, 10));
      });
    });
    setWaypoint(0);
  }

  /* ================================================================
     VIDEO BLOCKS
     ============================================================== */
  document.querySelectorAll('.video-block').forEach(function (vb) {
    var localVideo = vb.getAttribute('data-video');
    vb.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); vb.click(); }
    });
    vb.addEventListener('click', function () {
      if (localVideo && localVideo.indexOf('assets/') === 0) {
        var a = document.createElement('a');
        a.href = localVideo; a.target = '_blank'; a.rel = 'noopener';
        a.click();
        return;
      }
      vb.classList.toggle('is-highlighted');
    });
  });

  /* ================================================================
     STORY SCROLL — drag/swipe
     ============================================================== */
  var storyScroll = document.getElementById('storyScroll');
  if (storyScroll) {
    var isDown = false, startX, scrollLeft;
    storyScroll.addEventListener('mousedown', function (e) {
      isDown = true;
      storyScroll.classList.add('dragging');
      startX = e.pageX - storyScroll.offsetLeft;
      scrollLeft = storyScroll.scrollLeft;
    });
    storyScroll.addEventListener('mouseleave', function () { isDown = false; storyScroll.classList.remove('dragging'); });
    storyScroll.addEventListener('mouseup', function () { isDown = false; storyScroll.classList.remove('dragging'); });
    storyScroll.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - storyScroll.offsetLeft;
      storyScroll.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  }

  /* ================================================================
     HEADER SCROLL EFFECT — shrinks on scroll
     ============================================================== */
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var current = window.scrollY;
      if (current > 60) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
      /* Hide on scroll down, show on scroll up */
      if (current > lastScroll && current > 200) {
        siteHeader.classList.add('nav-hidden');
      } else {
        siteHeader.classList.remove('nav-hidden');
      }
      lastScroll = current;
    }, { passive: true });
  }

  /* ================================================================
     ACTIVE NAV LINK HIGHLIGHT
     ============================================================== */
  (function highlightNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  })();

  /* ================================================================
     SMOOTH ANCHOR SCROLL
     ============================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ================================================================
     IMAGE LAZY LOAD (fallback for browsers without native loading=lazy)
     ============================================================== */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      img.src = img.dataset.src;
    });
  } else {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var img = en.target;
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(function (img) { imgObserver.observe(img); });
  }

  /* ================================================================
     STATS COUNTER ANIMATION
     ============================================================== */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1800;
    var start = null;
    var suffix = el.getAttribute('data-count-suffix') || '';

    function animateCount(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(animateCount);
    }

    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          requestAnimationFrame(animateCount);
          countObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    countObserver.observe(el);
  });

  /* ================================================================
     BACK TO TOP BUTTON
     ============================================================== */
  var backToTop = document.getElementById('backToTop');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.type = 'button';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>';
    document.body.appendChild(backToTop);
  }
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ================================================================
     COOKIE / GDPR BANNER
     ============================================================== */
  if (!localStorage.getItem('naba_cookie_ok')) {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p>We use essential cookies to make this site work. By continuing, you agree to our ' +
      '<a href="privacy.html">Privacy Policy</a>.</p>' +
      '<div class="cookie-actions">' +
        '<button type="button" id="cookieAccept" class="btn btn--solid">Accept</button>' +
        '<button type="button" id="cookieDecline">Decline</button>' +
      '</div>';
    document.body.appendChild(banner);
    setTimeout(function () { banner.classList.add('show'); }, 1200);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      localStorage.setItem('naba_cookie_ok', '1');
      banner.classList.remove('show');
      setTimeout(function () { banner.remove(); }, 400);
    });
    document.getElementById('cookieDecline').addEventListener('click', function () {
      banner.classList.remove('show');
      setTimeout(function () { banner.remove(); }, 400);
    });
  }

  /* ================================================================
     GALLERY LIGHTBOX (used on gallery.html)
     ============================================================== */
  (function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Image viewer');
      lb.hidden = true;
      lb.innerHTML =
        '<button class="lb-close" aria-label="Close" type="button">&times;</button>' +
        '<button class="lb-prev" aria-label="Previous image" type="button">&#8592;</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""></div>' +
        '<p class="lb-caption"></p>' +
        '<button class="lb-next" aria-label="Next image" type="button">&#8594;</button>';
      document.body.appendChild(lb);
    }

    var lbImg  = lb.querySelector('.lb-img');
    var lbCap  = lb.querySelector('.lb-caption');
    var lbPrev = lb.querySelector('.lb-prev');
    var lbNext = lb.querySelector('.lb-next');
    var galleryItems = [];
    var currentIdx  = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      var item = galleryItems[idx];
      if (!item) return;
      lbImg.src = item.src;
      lbImg.alt = item.alt || '';
      if (lbCap) lbCap.textContent = item.caption || item.alt || '';
      lb.hidden = false;
      lb.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }

    function closeLightbox() {
      lb.hidden = true;
      document.body.style.overflow = '';
    }

    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', function () { openLightbox((currentIdx - 1 + galleryItems.length) % galleryItems.length); });
    if (lbNext) lbNext.addEventListener('click', function () { openLightbox((currentIdx + 1) % galleryItems.length); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    window.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox((currentIdx - 1 + galleryItems.length) % galleryItems.length);
      if (e.key === 'ArrowRight') openLightbox((currentIdx + 1) % galleryItems.length);
    });

    /* Wire up gallery images */
    function initGalleryImages() {
      var imgs = document.querySelectorAll('.gallery-grid img, .gallery-item img, [data-gallery] img');
      galleryItems = Array.from(imgs).map(function (img) {
        return { src: img.src, alt: img.alt, caption: img.closest('[data-caption]') ? img.closest('[data-caption]').dataset.caption : img.alt };
      });
      imgs.forEach(function (img, i) {
        img.style.cursor = 'pointer';
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.addEventListener('click', function () { openLightbox(i); });
        img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } });
      });
    }

    initGalleryImages();
    /* Re-init when CMS loads new images */
    document.addEventListener('naba:galleryUpdated', initGalleryImages);
  })();

  /* ================================================================
     MEMBER STATS BAR ANIMATION (homepage / about)
     ============================================================== */
  document.querySelectorAll('.stat-bar').forEach(function (bar) {
    var fill = bar.querySelector('.stat-bar__fill');
    var pct  = parseInt(bar.getAttribute('data-pct') || '0', 10);
    if (!fill) return;
    fill.style.width = '0';
    var barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          fill.style.width = pct + '%';
          barObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    barObs.observe(bar);
  });

})();
