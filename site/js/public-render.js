/* =====================================================================
   NABA — public content renderer
   Injects admin-added Events / News / Gallery / Directory items
   (from Firestore, via cms.js) into the existing static pages.
   No-ops completely if Firebase isn't configured — the static
   content already on each page is the fallback, always.
   ===================================================================== */
import {} from "./cms.js"; // ensures load order isn't required; cms.js attaches window.nabaCMS itself

function waitForCMS(){
  return new Promise(function(resolve){
    (function check(){
      if (window.nabaCMS) resolve(window.nabaCMS);
      else setTimeout(check, 30);
    })();
  });
}

function fmtDate(ts){
  try{
    var d = ts && ts.toDate ? ts.toDate() : new Date(ts);
    return { day: d.toLocaleDateString('en-GB',{day:'2-digit'}), month: d.toLocaleDateString('en-GB',{month:'short'}) };
  }catch(e){ return { day:'—', month:'' }; }
}

async function renderEvents(cms){
  var listEl = document.getElementById('eventList');
  if (!listEl) return;
  await cms.listItems('events', function(items){
    if (!items.length) return;
    if (listEl){
      items.forEach(function(ev){
        var el = document.createElement('div');
        el.className = 'faq-item';
        el.innerHTML = '<button class="faq-q" aria-expanded="false"><span>' +
          (ev.date ? ev.date + ' — ' : '') + escapeHtml(ev.title||'Untitled event') +
          '</span><span class="plus">+</span></button>' +
          '<div class="faq-a"><p>' + escapeHtml(ev.description||'') +
          (ev.location ? ' <strong>(' + escapeHtml(ev.location) + ')</strong>' : '') + '</p></div>';
        var btn = el.querySelector('.faq-q');
        btn.addEventListener('click', function(){
          var wasOpen = el.classList.contains('open');
          el.parentElement.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); i.querySelector('.faq-q').setAttribute('aria-expanded','false'); });
          if(!wasOpen){ el.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
        });
        listEl.prepend(el);
      });
    }
  });
}

async function renderNews(cms){
  var grid = document.getElementById('mediaGrid');
  if (!grid) return;
  await cms.listItems('news', function(items){
    document.querySelectorAll('.media-card[data-dynamic]').forEach(function(n){ n.remove(); });
    items.forEach(function(n){
      var img = n.image_url || n.imageUrl;
      var el = document.createElement('div');
      el.className = 'media-card reveal in';
      el.setAttribute('data-dynamic','1');
      el.innerHTML =
        (img ? '<img src="'+escapeAttr(img)+'" alt="'+escapeAttr(n.title||'')+'">' : '') +
        '<div class="mc-body"><div class="mc-tag">'+escapeHtml(n.tag||'News')+'</div>' +
        '<h3>'+escapeHtml(n.title||'Untitled')+'</h3>' +
        '<p>'+escapeHtml(n.excerpt || n.body || '')+'</p>' +
        (n.body && n.excerpt && n.body !== n.excerpt ? '<div class="expand-content"><p>'+escapeHtml(n.body)+'</p></div><button type="button" class="read-more-btn" aria-expanded="false">Read more →</button>' : '') +
        '</div>';
      grid.prepend(el);
    });
  });
}

async function renderGallery(cms){
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;
  await cms.listItems('gallery', function(items){
    document.querySelectorAll('.gallery-item[data-dynamic]').forEach(function(n){ n.remove(); });
    items.forEach(function(g){
      var img = g.image_url || g.imageUrl;
      if (!img) return;
      var fig = document.createElement('figure');
      fig.className = 'gallery-item reveal in';
      fig.setAttribute('data-dynamic','1');
      fig.innerHTML = '<img src="'+escapeAttr(img)+'" alt="'+escapeAttr(g.caption||'')+'" loading="lazy">' +
        '<figcaption>'+escapeHtml(g.caption||'')+'</figcaption>';
      grid.prepend(fig);
    });
  });
}

async function renderMembers(cms){
  var grid = document.getElementById('dirGrid');
  if (!grid) return;
  await cms.listItems('members', function(items){
    document.querySelectorAll('.dir-card[data-dynamic]').forEach(function(n){ n.remove(); });
    items.forEach(function(m){
      var img = m.image_url || m.imageUrl;
      var el = document.createElement('div');
      el.className = 'dir-card card reveal in';
      el.setAttribute('data-dynamic','1');
      el.innerHTML =
        (img ? '<div class="dir-card__img"><img src="'+escapeAttr(img)+'" alt="'+escapeAttr(m.name||'')+'"></div>' : '') +
        '<div class="dir-card__body">' +
        '<span class="tag">'+escapeHtml(m.category||'Business')+'</span>' +
        '<h3>'+escapeHtml(m.name||'Untitled')+'</h3>' +
        '<p>'+escapeHtml(m.description||'')+'</p>' +
        (m.location ? '<p class="muted" style="font-size:0.8rem;">📍 '+escapeHtml(m.location)+'</p>' : '') +
        (m.website ? '<p style="margin-top:8px;"><a href="'+escapeAttr(m.website)+'" target="_blank" rel="noopener" class="link-btn">Visit Website →</a></p>' : '') +
        '</div>';
      grid.prepend(el);
    });
  });
}

async function renderYouthHub(cms){
  var grid = document.querySelector('#resources .resource-grid');
  if (!grid) return;
  await cms.listItems('youthHub', function(items){
    document.querySelectorAll('.resource-card[data-dynamic]').forEach(function(n){ n.remove(); });
    items.forEach(function(y){
      var el = document.createElement('a');
      el.className = 'resource-card reveal in';
      el.setAttribute('data-dynamic','1');
      el.href = y.link || '#';
      if (y.link) { el.target = '_blank'; el.rel = 'noopener'; }
      el.innerHTML =
        '<span class="rc-tag">'+escapeHtml(y.category||'Opportunity')+'</span>' +
        '<h4>'+escapeHtml(y.title||'Untitled')+'</h4>' +
        '<p>'+escapeHtml(y.description||'')+'</p>' +
        (y.deadline ? '<p class="muted" style="font-size:0.75rem;margin-top:4px;">Deadline: '+escapeHtml(y.deadline)+'</p>' : '');
      grid.prepend(el);
    });
  });
}

function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function escapeAttr(s){ return escapeHtml(s); }

(async function(){
  var cms = await waitForCMS();
  if (!cms.isEnabled()) return;
  renderEvents(cms);
  renderNews(cms);
  renderGallery(cms);
  renderMembers(cms);
  renderYouthHub(cms);
})();
