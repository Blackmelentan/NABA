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
      var el = document.createElement('div');
      el.className = 'media-card reveal in';
      el.setAttribute('data-dynamic','1');
      el.innerHTML =
        (n.imageUrl ? '<img src="'+escapeAttr(n.imageUrl)+'" alt="'+escapeAttr(n.title||'')+'">' : '') +
        '<div class="mc-body"><div class="mc-tag">'+escapeHtml(n.tag||'News')+'</div>' +
        '<h3>'+escapeHtml(n.title||'Untitled')+'</h3>' +
        '<p>'+escapeHtml(n.body||'')+'</p></div>';
      grid.prepend(el);
    });
  });
}

async function renderGallery(cms){
  var grid = document.getElementById('galleryGrid');
  var empty = document.getElementById('galleryEmpty');
  if (!grid) return;
  await cms.listItems('gallery', function(items){
    document.querySelectorAll('.gallery-item[data-dynamic]').forEach(function(n){ n.remove(); });
    items.forEach(function(g){
      if (!g.imageUrl) return;
      var fig = document.createElement('figure');
      fig.className = 'gallery-item reveal in';
      fig.setAttribute('data-dynamic','1');
      fig.innerHTML = '<img src="'+escapeAttr(g.imageUrl)+'" alt="'+escapeAttr(g.caption||'')+'" loading="lazy">' +
        '<figcaption>'+escapeHtml(g.caption||'')+'</figcaption>';
      grid.prepend(fig);
    });
  });
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function escapeAttr(s){ return escapeHtml(s); }

(async function(){
  var cms = await waitForCMS();
  if (!cms.isEnabled()) return; // static content already on the page is the fallback
  renderEvents(cms);
  renderNews(cms);
  renderGallery(cms);
})();
