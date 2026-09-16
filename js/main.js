(function(){
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- scroll-triggered reveals: runs FIRST, wrapped defensively so content
   visibility never depends on the rest of this file executing cleanly ---- */
try {
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
} catch (err) {
  // if reveal setup fails for any reason, force everything visible rather than leaving blank sections
  document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
}

/* ---- toast ---- */
var toastEl = document.getElementById('toast');
function toast(msg){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(function(){ toastEl.classList.remove('show'); }, 2600);
}
window.nabaToast = toast;

/* ---- custom SVG brand icons (replace emojis without breaking the existing layout) ---- */
function setSvgIcon(el, svgMarkup){
  if(!el || !svgMarkup) return;
  el.innerHTML = svgMarkup;
  el.setAttribute('aria-hidden', 'true');
}
(function(){
  var iconSvg = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="5.5" fill="none" stroke="currentColor" stroke-width="1.9"></circle><path d="M16 16L21 21" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"></path></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"></circle><path d="M3 12h18M12 3c2.8 2.9 4.3 5.9 4.3 9S14.8 18.1 12 21c-2.8-2.9-4.3-5.9-4.3-9S9.2 5.9 12 3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.9"></circle><path d="M5 19c1.6-3.1 4.1-4.7 7-4.7s5.4 1.6 7 4.7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"></path></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18.5 3 21V6.8A2.8 2.8 0 0 1 5.8 4h12.4A2.8 2.8 0 0 1 21 6.8v7.4A2.8 2.8 0 0 1 18.2 17H6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8 9h8M8 12h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'
  };
  var map = {
    searchBtn: 'search',
    langBtn: 'globe',
    accountBtn: 'user',
    assistantLauncher: 'chat'
  };
  Object.keys(map).forEach(function(id){
    var el = document.getElementById(id);
    if (el) setSvgIcon(el, iconSvg[map[id]]);
  });
})();

/* ---- scroll progress ---- */
var progressBar = document.getElementById('progressBar');
if(progressBar){
  window.addEventListener('scroll', function(){
    var h = document.documentElement;
    var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = pct + '%';
  }, {passive:true});
}

/* ---- mobile nav ---- */
var toggle = document.getElementById('menuBtn');
var links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.has-dropdown').forEach(function(item){ item.classList.remove('open'); var trigger=item.querySelector('a'); if(trigger) trigger.setAttribute('aria-expanded','false'); });
    }
  });
}

/* ---- More dropdown toggle for desktop and mobile ---- */
document.querySelectorAll('.has-dropdown').forEach(function(drop){
  var trigger = drop.querySelector('a');
  if (!trigger) return;
  trigger.setAttribute('aria-expanded', 'false');
  trigger.addEventListener('click', function (e) {
    if (window.innerWidth <= 1180 || trigger.getAttribute('href') === '#') {
      e.preventDefault();
    }
    var isOpen = drop.classList.contains('open');
    document.querySelectorAll('.has-dropdown').forEach(function(item){
      item.classList.remove('open');
      var itemTrigger = item.querySelector('a');
      if (itemTrigger) itemTrigger.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      drop.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});
document.addEventListener('click', function (e) {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(function(item){
      item.classList.remove('open');
      var trigger = item.querySelector('a');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }
});

/* ---- language modal ---- */
var langBtn = document.getElementById('langBtn');
var langBackdrop = document.getElementById('langBackdrop');
if(langBtn && langBackdrop){
  langBtn.onclick = function(){ langBackdrop.classList.add('open'); };
  langBackdrop.onclick = function(e){ if(e.target === langBackdrop) langBackdrop.classList.remove('open'); };
  document.querySelectorAll('.lang-row').forEach(function(row){
    row.onclick = function(){
      document.querySelectorAll('.lang-row').forEach(function(r){ r.classList.remove('active'); });
      row.classList.add('active');
      toast('Language set to ' + row.querySelector('.name').textContent.trim().split(' ')[1]);
      setTimeout(function(){ langBackdrop.classList.remove('open'); }, 250);
    };
  });
}

/* ---- accessibility toolbar: text size + high contrast (persisted) ---- */
var sizeSteps = ['', 'text-lg', 'text-xl'];
var sizeIdx = parseInt(localStorage.getItem('naba_textsize') || '0', 10);
var contrastOn = localStorage.getItem('naba_contrast') === '1';
function applyA11y(){
  document.documentElement.classList.remove('text-lg','text-xl');
  if(sizeSteps[sizeIdx]) document.documentElement.classList.add(sizeSteps[sizeIdx]);
  document.documentElement.classList.toggle('contrast', contrastOn);
  var cBtn = document.getElementById('a11yContrast');
  if(cBtn) cBtn.classList.toggle('active', contrastOn);
}
applyA11y();
var a11yPlus = document.getElementById('a11yPlus');
var a11yMinus = document.getElementById('a11yMinus');
var a11yContrast = document.getElementById('a11yContrast');
if(a11yPlus){
  a11yPlus.addEventListener('click', function(){
    sizeIdx = Math.min(sizeIdx+1, sizeSteps.length-1);
    localStorage.setItem('naba_textsize', sizeIdx);
    applyA11y();
    toast('Text size increased');
  });
}
if(a11yMinus){
  a11yMinus.addEventListener('click', function(){
    sizeIdx = Math.max(sizeIdx-1, 0);
    localStorage.setItem('naba_textsize', sizeIdx);
    applyA11y();
    toast(sizeIdx === 0 ? 'Text size reset' : 'Text size decreased');
  });
}
if(a11yContrast){
  a11yContrast.addEventListener('click', function(){
    contrastOn = !contrastOn;
    localStorage.setItem('naba_contrast', contrastOn ? '1' : '0');
    applyA11y();
    toast(contrastOn ? 'High contrast on' : 'High contrast off');
  });
}

/* ---- search overlay ---- */
var searchBtn = document.getElementById('searchBtn');
var searchOverlay = document.getElementById('searchOverlay');
var siteSearch = document.getElementById('siteSearch');
var searchResults = document.getElementById('searchResults');
var searchIndex = [
  {label:'Home', href:'index.html', tag:'Page'},
  {label:'About & Our Legacy', href:'about.html', tag:'Page'},
  {label:'Sheku Bayoh Legacy', href:'about.html#legacy', tag:'About'},
  {label:'Values & Beliefs', href:'about.html#values', tag:'About'},
  {label:'Community Directory', href:'directory.html', tag:'Page'},
  {label:'Events & Road Trip', href:'events.html', tag:'Page'},
  {label:'Edinburgh to Lagos Road Trip', href:'events.html#roadtrip', tag:'Events'},
  {label:'Youth Hub', href:'youth-hub.html', tag:'Page'},
  {label:'Mentorship Programme', href:'youth-hub.html#mentorship', tag:'Youth Hub'},
  {label:'Resource Library', href:'youth-hub.html#resources', tag:'Youth Hub'},
  {label:'Funding & Partners', href:'youth-hub.html#funding', tag:'Youth Hub'},
  {label:'Volunteer & Partnerships', href:'volunteer.html', tag:'Page'},
  {label:'Cuisine', href:'cuisine.html', tag:'Page'},
  {label:'Contact & Offices', href:'contact.html', tag:'Page'},
  {label:'Frequently Asked Questions', href:'contact.html#faq', tag:'Contact'}
];
if(searchBtn && searchOverlay){
  function renderSearch(q){
    q = (q||'').toLowerCase();
    var rows = q ? searchIndex.filter(function(i){ return i.label.toLowerCase().indexOf(q) !== -1; }) : searchIndex;
    searchResults.innerHTML = rows.length ? rows.map(function(i){
      return '<a href="'+i.href+'">'+i.label+'<span>'+i.tag+'</span></a>';
    }).join('') : '<div class="search-empty">No matches — try a different term.</div>';
  }
  searchBtn.addEventListener('click', function(){
    searchOverlay.classList.add('open');
    renderSearch('');
    setTimeout(function(){ siteSearch.focus(); }, 50);
  });
  searchOverlay.addEventListener('click', function(e){ if(e.target === searchOverlay) searchOverlay.classList.remove('open'); });
  siteSearch.addEventListener('input', function(e){ renderSearch(e.target.value); });
  searchResults.addEventListener('click', function(e){ if(e.target.closest('a')) searchOverlay.classList.remove('open'); });
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape') searchOverlay.classList.remove('open');
    if((e.metaKey || e.ctrlKey) && e.key === 'k'){ e.preventDefault(); searchBtn.click(); }
    if(e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA'){ e.preventDefault(); searchBtn.click(); }
  });
}

/* ---- back to top ---- */
var backTop = document.getElementById('backTop');
if(backTop){
  window.addEventListener('scroll', function(){ backTop.classList.toggle('show', window.scrollY > 700); }, {passive:true});
  backTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
}

/* ---- account icon: reflect signed-in state ---- */
var accountBtn = document.getElementById('accountBtn');
if(accountBtn && window.nabaAuth){
  var u = window.nabaAuth.currentUser();
  if(u){
    accountBtn.href = 'dashboard.html';
    accountBtn.textContent = u.name.trim().charAt(0).toUpperCase();
    accountBtn.title = u.name + ' — ' + u.role;
  }
}

/* ---- magnetic buttons (desktop only) ---- */
if(window.matchMedia('(pointer:fine)').matches && !reduce){
  document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width/2) * 0.25;
      var y = (e.clientY - r.top - r.height/2) * 0.35;
      btn.style.transform = 'translate('+x.toFixed(1)+'px,'+(y-3).toFixed(1)+'px) scale(1.03)';
    });
    btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
  });
}

/* ---- generic expand modal: any [data-expand] element opens detail or navigates ---- */
(function(){
  var backdrop = document.createElement('div');
  backdrop.className = 'expand-modal-backdrop';
  backdrop.innerHTML = '<div class="expand-modal"><button class="expand-modal__close" aria-label="Close">✕</button><div class="expand-modal__inner"></div></div>';
  document.body.appendChild(backdrop);
  var inner = backdrop.querySelector('.expand-modal__inner');
  var closeBtn = backdrop.querySelector('.expand-modal__close');

  function openExpand(el){
    var title = el.getAttribute('data-expand-title') || '';
    var tag = el.getAttribute('data-expand-tag') || '';
    var desc = el.getAttribute('data-expand-desc') || '';
    var img = el.getAttribute('data-expand-img') || '';
    var href = el.getAttribute('data-expand-href') || '';
    var cta = el.getAttribute('data-expand-cta') || 'View more';
    inner.innerHTML =
      (img ? '<img class="expand-modal__img" src="'+img+'" alt="">' : '') +
      '<div class="expand-modal__body">' +
      (tag ? '<div class="expand-modal__tag">'+tag+'</div>' : '') +
      '<div class="expand-modal__title">'+title+'</div>' +
      '<div class="expand-modal__desc">'+desc+'</div>' +
      (href ? '<a class="btn btn--solid rippleBtn" href="'+href+'">'+cta+' &rarr;</a>' : '') +
      '</div>';
    backdrop.classList.add('open');
  }
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-expand]');
    if(!el) return;
    if(e.target.closest('a,button') && e.target.closest('a,button') !== el) return;
    openExpand(el);
  });
  closeBtn.addEventListener('click', function(){ backdrop.classList.remove('open'); });
  backdrop.addEventListener('click', function(e){ if(e.target === backdrop) backdrop.classList.remove('open'); });
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape') backdrop.classList.remove('open'); });
})();

/* ---- .ics calendar export: works off data-ics-* attributes on any button ---- */
document.addEventListener('click', function(e){
  var btn = e.target.closest('[data-ics]');
  if(!btn) return;
  var title = btn.getAttribute('data-ics-title') || 'NABA Event';
  var start = btn.getAttribute('data-ics-start');
  var end = btn.getAttribute('data-ics-end') || start;
  var loc = btn.getAttribute('data-ics-loc') || '';
  var desc = btn.getAttribute('data-ics-desc') || '';
  if(!start) return;
  var ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//NABA//Events//EN','BEGIN:VEVENT',
    'UID:' + Date.now() + '@nabaorg.uk',
    'DTSTAMP:' + start,
    'DTSTART:' + start,
    'DTEND:' + end,
    'SUMMARY:' + title,
    'LOCATION:' + loc,
    'DESCRIPTION:' + desc.replace(/,/g, '\\,'),
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  var blob = new Blob([ics], { type: 'text/calendar' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = title.replace(/[^a-z0-9]/gi,'-').toLowerCase() + '.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast('Calendar file downloaded');
});

/* ---- Ask NABA: rule-based FAQ assistant (keyword-matched, not an LLM) ---- */
(function(){
  var launcher = document.getElementById('assistantLauncher');
  if(!launcher) return;
  var panel = document.getElementById('assistantPanel');
  var body = document.getElementById('assistantBody');
  var quick = document.getElementById('assistantQuick');
  var form = document.getElementById('assistantForm');
  var input = document.getElementById('assistantInput');
  var closeBtn = document.getElementById('assistantClose');

  var FAQ = [
    {q:'How do I volunteer with NABA', keys:['volunteer','help out','give time'], a:'Head to the Volunteering and Partnerships page and submit the form. Applications are reviewed within 5 working days.', href:'volunteer.html', label:'Go to Volunteering'},
    {q:'How do I get a mentor', keys:['mentor','mentorship','youth hub'], a:'The Youth Hub has a dedicated mentorship section where young people can request a mentor and mentors can apply. It is open now.', href:'youth-hub.html#mentorship', label:'Go to Youth Hub'},
    {q:'How do I find a service or business', keys:['directory','service','business','find a'], a:'The Community Directory lists 70+ businesses and services across 10 service-provider categories, searchable and filterable.', href:'directory.html', label:'Go to Directory'},
    {q:'What events are coming up', keys:['event','road trip','gamsca','cultural week'], a:'Check the Events page for the full list, including the Edinburgh to Lagos Road Trip and GAMSCA Cultural Week. Several events can be added to your calendar directly.', href:'events.html', label:'Go to Events'},
    {q:'Is NABA a registered charity', keys:['charity','registered','legal','official'], a:'NABA is a Scottish-based, not-for-profit organisation and a listed member of the Scottish Council for Voluntary Organisations (SCVO).', href:'about.html', label:'Learn more'},
    {q:'How do I contact NABA', keys:['contact','phone','email','call','address'], a:'You can call 07990 753498, email admin@nabaorg.uk, or use the contact form. Offices are in Glasgow and Edinburgh.', href:'contact.html', label:'Go to Contact'},
    {q:'I need urgent support', keys:['urgent','crisis','emergency','help now','safe'], a:'If you need help right now, use the Get Help Now button in the corner of every page, or go straight to Contact.', href:'contact.html', label:'Get Help Now'},
    {q:'What food and drink partners do you have', keys:['food','restaurant','cuisine','eat'], a:'The Cuisine page lists real NABA food and drink partners across Glasgow and Edinburgh, with addresses and phone numbers.', href:'cuisine.html', label:'Go to Cuisine'},
    {q:'How do I list my business', keys:['list my business','get listed','add my business'], a:'Email admin@nabaorg.uk with your business details and category and the team will get you listed.', href:'contact.html', label:'Contact us'},
    {q:'Are there jobs or vacancies at NABA', keys:['job','vacancy','career','work for naba'], a:'NABA is open to volunteers and internships. See the Careers and Vacancies section on the Volunteering page.', href:'volunteer.html#careers', label:'See Careers'}
  ];

  function addMsg(text, who){
    var el = document.createElement('div');
    el.className = 'assistant-msg ' + who;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function addBotAnswer(item){
    var el = addMsg(item.a, 'bot');
    if(item.href){
      var a = document.createElement('a');
      a.href = item.href;
      a.className = 'textlink';
      a.style.display = 'inline-block';
      a.style.marginTop = '6px';
      a.textContent = item.label + ' \u203a';
      el.appendChild(document.createElement('br'));
      el.appendChild(a);
    }
  }
  function findAnswer(text){
    var lower = text.toLowerCase();
    var best = null;
    FAQ.forEach(function(item){
      item.keys.forEach(function(k){
        if(lower.indexOf(k) !== -1 && !best) best = item;
      });
    });
    return best;
  }
  function renderQuick(){
    quick.innerHTML = '';
    FAQ.slice(0,4).forEach(function(item){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = item.q;
      b.addEventListener('click', function(){
        addMsg(item.q, 'user');
        addBotAnswer(item);
      });
      quick.appendChild(b);
    });
  }

  var started = false;
  function openPanel(){
    panel.classList.add('open');
    if(!started){
      started = true;
      addMsg('Hi, I am the NABA assistant. I answer from a fixed set of common questions below, not a live AI, so my answers are predictable. Ask me something or tap a suggestion.', 'bot');
      renderQuick();
    }
  }
  launcher.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', function(){ panel.classList.remove('open'); });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var text = input.value.trim();
    if(!text) return;
    addMsg(text, 'user');
    input.value = '';
    var answer = findAnswer(text);
    if(answer){
      addBotAnswer(answer);
    } else {
      addMsg('I do not have a fixed answer for that yet. Try the search icon in the header, or use Get Help Now to reach the team directly.', 'bot');
    }
  });
})();

/* ---- ripple buttons ---- */
document.querySelectorAll('.rippleBtn').forEach(function(btn){
  btn.addEventListener('click', function(e){
    var rect = this.getBoundingClientRect();
    var circle = document.createElement('span');
    var size = Math.max(rect.width, rect.height);
    circle.className = 'ripple';
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = (e.clientX - rect.left - size/2) + 'px';
    circle.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(circle);
    setTimeout(function(){ circle.remove(); }, 650);
  });
});

/* ---- hero word reveal ---- */
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

/* ---- hero parallax ---- */
var heroBg = document.querySelector('.hero__bg');
if (heroBg && !reduce) {
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      heroBg.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px) scale(' + (1 + Math.min(y, 400) * 0.0004).toFixed(4) + ')';
      ticking = false;
    });
  }, { passive: true });
}

/* ---- footer year ---- */
var yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

/* ---- generic tab switcher: <div class="tab" data-tab="x"> + <form data-panel="x"> ---- */
document.querySelectorAll('.tab-row').forEach(function(row){
  row.querySelectorAll('.tab').forEach(function(tab){
    tab.onclick = function(){
      row.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var group = row.nextElementSibling ? row.parentElement : document;
      row.parentElement.querySelectorAll('.form-panel, .tab-panel').forEach(function(p){ p.classList.remove('active'); });
      var target = row.parentElement.querySelector('[data-panel="'+tab.dataset.tab+'"]');
      if(target) target.classList.add('active');
    };
  });
});

/* ---- generic form submit -> success message + toast (+ save to backend if configured) ---- */
document.querySelectorAll('form[data-form]').forEach(function(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var msg = form.querySelector('.success-msg');
    var collection = form.dataset.collection;
    if (collection && window.nabaCMS && window.nabaCMS.isEnabled()){
      var data = {};
      new FormData(form).forEach(function(v,k){ if(typeof v === 'string') data[k] = v; });
      window.nabaCMS.submitPublic(collection, data);
    }
    if(msg) msg.classList.add('show');
    toast('Submitted — thank you!');
    form.reset();
  });
});

/* ---- expandable tiles (Our Mission / NABA Focus, etc.) ---- */
document.querySelectorAll('.card--expand').forEach(function(card){
  card.addEventListener('click', function(){
    var open = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
});

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-q').forEach(function(btn){
  btn.addEventListener('click', function(){
    var item = btn.closest('.faq-item');
    var wasOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); i.querySelector('.faq-q').setAttribute('aria-expanded','false'); });
    if(!wasOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  });
});

/* ---- countdown (Edinburgh -> Lagos road trip) ---- */
var cdD = document.getElementById('cd-d');
if(cdD){
  var target = new Date('2027-11-06T08:00:00');
  function tick(){
    var now = new Date();
    var diff = target - now;
    if(diff < 0) diff = 0;
    var d = Math.floor(diff/86400000);
    var h = Math.floor((diff%86400000)/3600000);
    var m = Math.floor((diff%3600000)/60000);
    var s = Math.floor((diff%60000)/1000);
    document.getElementById('cd-d').textContent = d;
    document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
  }
  tick(); setInterval(tick, 1000);
}

/* ---- journey scrubber ---- */
var scrub = document.getElementById('journeyScrub');
if(scrub){
  var scrubInfoText = [
    '<strong>Edinburgh, Scotland —</strong> Departure point. The convoy sets off from NABA’s Edinburgh office at Summit House.',
    '<strong>Rabat, Morocco —</strong> Midpoint stopover, crossing from Europe into North Africa before the long haul south.',
    '<strong>Lagos, Nigeria —</strong> Final destination. Arrival celebrations connect the convoy with West African partner communities.'
  ];
  var scrubInfo = document.getElementById('scrubInfo');
  var waypoints = document.querySelectorAll('.waypoint');
  function setWaypoint(i){
    waypoints.forEach(function(w){ w.classList.toggle('active', w.dataset.i === String(i)); });
    scrubInfo.innerHTML = scrubInfoText[i];
  }
  scrub.addEventListener('input', function(e){ setWaypoint(parseInt(e.target.value,10)); });
  waypoints.forEach(function(w){ w.addEventListener('click', function(){ scrub.value = w.dataset.i; setWaypoint(parseInt(w.dataset.i,10)); }); });
}

/* ---- video block -> use local asset when available, otherwise keep the section in-page and allow future swap without pointing to the old site ---- */
document.querySelectorAll('.video-block').forEach(function(vb){
  var localVideo = vb.getAttribute('data-video');
  var onKey = function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); vb.click(); } };
  vb.addEventListener('keydown', onKey);
  vb.addEventListener('click', function(){
    if(localVideo && localVideo.indexOf('assets/') === 0){
      var url = localVideo;
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.click();
      return;
    }
    vb.classList.toggle('is-highlighted');
    vb.setAttribute('aria-label', 'Video ready for future upload');
  });
});

})();
