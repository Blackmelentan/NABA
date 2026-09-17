import "./cms.js";

const root = document.getElementById('adminRoot');

function waitForCMS(){
  return new Promise(function(resolve){
    (function check(){ if (window.nabaCMS) resolve(window.nabaCMS); else setTimeout(check, 30); })();
  });
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

function showSetup(){
  root.innerHTML = '';
  root.appendChild(document.getElementById('tpl-setup').content.cloneNode(true));
}

function showLogin(cms){
  root.innerHTML = '';
  root.appendChild(document.getElementById('tpl-login').content.cloneNode(true));
  var form = document.getElementById('loginForm');
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    var email = document.getElementById('loginEmail').value.trim();
    var pw = document.getElementById('loginPassword').value;
    var errEl = document.getElementById('loginError');
    errEl.textContent = 'Signing in…';
    var res = await cms.login(email, pw);
    if (res.ok) {
      showDashboard(cms, { email: email });
      return;
    }
    errEl.textContent = res.message;
  });
}

function showDashboard(cms, user){
  document.body.innerHTML = ''; // clear including old root
  var wrap = document.createElement('div');
  wrap.appendChild(document.getElementById('tpl-dashboard').content.cloneNode(true));
  document.body.appendChild(wrap);
  document.getElementById('whoami').textContent = '— ' + (user.email || '');
  document.getElementById('logoutBtn').addEventListener('click', function(){ cms.logout(); location.reload(); });

  document.getElementById('adminTabs').addEventListener('click', function(e){
    var btn = e.target.closest('.admin-tab');
    if (!btn) return;
    document.querySelectorAll('.admin-tab').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var panel = btn.dataset.panel;
    document.querySelectorAll('.admin-panel').forEach(function(p){ p.classList.toggle('active', p.dataset.panel === panel); });
  });

  wireCollection(cms, 'events', renderEventRow, buildEventForm);
  wireCollection(cms, 'news', renderNewsRow, buildNewsForm);
  wireCollection(cms, 'gallery', renderGalleryRow, buildGalleryForm);
  wireReadOnly(cms, 'volunteerApplications', renderVolunteerRow);
  wireReadOnly(cms, 'partnerEnquiries', renderPartnerRow);
  wireReadOnly(cms, 'contactMessages', renderContactRow);
  wireReadOnly(cms, 'newsletterSignups', renderNewsletterRow);
}

/* ---------------- Add-form builders (data collected from the form) ---------------- */
function buildEventForm(fd){
  return { data: { title: fd.get('title'), date: fd.get('date'), location: fd.get('location'), description: fd.get('description') }, file: null };
}
function buildNewsForm(fd){
  return { data: { tag: fd.get('tag'), title: fd.get('title'), body: fd.get('body') }, file: fd.get('image') && fd.get('image').size ? fd.get('image') : null };
}
function buildGalleryForm(fd){
  return { data: { caption: fd.get('caption') }, file: fd.get('image') && fd.get('image').size ? fd.get('image') : null };
}

/* ---------------- Row renderers (editable collections) ---------------- */
function renderEventRow(item){
  return '<div class="body"><h4>'+esc(item.title)+'</h4><p>'+esc(item.description||'')+'</p>' +
    '<div class="meta">'+esc(item.date||'')+(item.location?' · '+esc(item.location):'')+'</div></div>';
}
function renderNewsRow(item){
  return (item.imageUrl?'<img src="'+esc(item.imageUrl)+'" alt="">':'') +
    '<div class="body"><h4>'+esc(item.title)+'</h4><p>'+esc(item.body||'')+'</p><div class="meta">'+esc(item.tag||'')+'</div></div>';
}
function renderGalleryRow(item){
  return (item.imageUrl?'<img src="'+esc(item.imageUrl)+'" alt="">':'') +
    '<div class="body"><h4>'+esc(item.caption||'Untitled')+'</h4></div>';
}

/* ---------------- Read-only submission renderers ---------------- */
function renderVolunteerRow(item){
  return '<div class="body"><h4>'+esc(item.name||'Unnamed')+' <span class="status-pill '+esc(item.status)+'">'+esc(item.status||'new')+'</span></h4>' +
    '<p>'+esc(item.email||'')+' · '+esc(item.interest||'')+'</p><p>'+esc(item.availability||'')+'</p></div>';
}
function renderPartnerRow(item){
  return '<div class="body"><h4>'+esc(item.company||item.name||'Unnamed')+' <span class="status-pill '+esc(item.status)+'">'+esc(item.status||'new')+'</span></h4>' +
    '<p>'+esc(item.email||'')+'</p><p>'+esc(item.message||'')+'</p></div>';
}
function renderContactRow(item){
  return '<div class="body"><h4>'+esc(item.name||'Unnamed')+' <span class="status-pill '+esc(item.status)+'">'+esc(item.status||'new')+'</span></h4>' +
    '<p>'+esc(item.email||'')+'</p><p>'+esc(item.message||'')+'</p></div>';
}
function renderNewsletterRow(item){
  return '<div class="body"><h4>'+esc(item.email||'Unnamed')+'</h4></div>';
}

/* ---------------- Wiring helpers ---------------- */
function wireCollection(cms, name, rowFn, formFn){
  var listEl = document.querySelector('.admin-list[data-list="'+name+'"]');
  var form = document.querySelector('form[data-add="'+name+'"]');
  cms.listItems(name, function(items){
    listEl.innerHTML = items.length ? '' : '<p class="admin-empty">Nothing here yet.</p>';
    items.forEach(function(item){
      var row = document.createElement('div');
      row.className = 'admin-row';
      row.innerHTML = rowFn(item) +
        '<div class="actions"><button type="button" data-del>Delete</button></div>';
      row.querySelector('[data-del]').addEventListener('click', async function(){
        if (!confirm('Delete this item?')) return;
        await cms.deleteItem(name, item.id);
      });
      listEl.appendChild(row);
    });
  });
  if (form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var msgEl = form.querySelector('[data-msg]');
      msgEl.className = 'admin-msg'; msgEl.textContent = 'Publishing…';
      var fd = new FormData(form);
      var built = formFn(fd);
      var res = await cms.addItem(name, built.data, built.file);
      if (res.ok){ msgEl.className = 'admin-msg ok'; msgEl.textContent = 'Published.'; form.reset(); }
      else { msgEl.className = 'admin-msg err'; msgEl.textContent = res.message; }
    });
  }
}

function wireReadOnly(cms, name, rowFn){
  var listEl = document.querySelector('.admin-list[data-list="'+name+'"]');
  if (!listEl) return;
  cms.listItems(name, function(items){
    listEl.innerHTML = items.length ? '' : '<p class="admin-empty">No submissions yet.</p>';
    items.forEach(function(item){
      var row = document.createElement('div');
      row.className = 'admin-row';
      row.innerHTML = rowFn(item) + '<div class="actions">' +
        (item.status !== 'reviewed' ? '<button type="button" data-review>Mark reviewed</button>' : '') +
        '<button type="button" data-del class="danger">Delete</button></div>';
      var reviewBtn = row.querySelector('[data-review]');
      if (reviewBtn) reviewBtn.addEventListener('click', function(){ cms.updateItem(name, item.id, { status: 'reviewed' }); });
      row.querySelector('[data-del]').addEventListener('click', async function(){
        if (!confirm('Delete this submission?')) return;
        await cms.deleteItem(name, item.id);
      });
      listEl.appendChild(row);
    });
  });
}

/* ---------------- Boot ---------------- */
(async function(){
  var cms = await waitForCMS();
  if (!cms.isEnabled()){ showSetup(); return; }
  showLogin(cms);
  cms.onAuthChange(function(user){
    if (user) showDashboard(cms, user);
    else showLogin(cms);
  });
})();
