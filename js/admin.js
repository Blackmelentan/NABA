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
  wireCollection(cms, 'members', renderMemberRow, buildMemberForm);
  wireCollection(cms, 'youthHub', renderYouthHubRow, buildYouthHubForm);
  wireReadOnly(cms, 'volunteerApplications', renderVolunteerRow);
  wireReadOnly(cms, 'partnerEnquiries', renderPartnerRow);
  wireReadOnly(cms, 'contactMessages', renderContactRow);
  wireNewsletter(cms);
}

/* ---------------- Add-form builders (data collected from the form) ---------------- */
function buildEventForm(fd){
  return {
    data: {
      title: fd.get('title'),
      date: fd.get('date'),
      location: fd.get('location'),
      category: fd.get('category'),
      description: fd.get('description'),
      link: fd.get('link')
    },
    file: null
  };
}
function buildNewsForm(fd){
  return {
    data: {
      tag: fd.get('tag'),
      title: fd.get('title'),
      excerpt: fd.get('excerpt'),
      body: fd.get('body')
    },
    file: fd.get('image') && fd.get('image').size ? fd.get('image') : null
  };
}
function buildGalleryForm(fd){
  return {
    data: {
      caption: fd.get('caption'),
      category: fd.get('category')
    },
    file: fd.get('image') && fd.get('image').size ? fd.get('image') : null
  };
}
function buildMemberForm(fd){
  return {
    data: {
      name: fd.get('name'),
      category: fd.get('category'),
      location: fd.get('location'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      website: fd.get('website'),
      description: fd.get('description')
    },
    file: fd.get('image') && fd.get('image').size ? fd.get('image') : null
  };
}
function buildYouthHubForm(fd){
  return {
    data: {
      title: fd.get('title'),
      category: fd.get('category'),
      eligibility: fd.get('eligibility'),
      deadline: fd.get('deadline'),
      description: fd.get('description'),
      link: fd.get('link')
    },
    file: null
  };
}

/* ---------------- Row renderers (editable collections) ---------------- */
function renderEventRow(item){
  return '<div class="body"><h4>'+esc(item.title)+'</h4><p>'+esc(item.description||'')+'</p>' +
    '<div class="meta">'+esc(item.date||'')+(item.location?' · '+esc(item.location):'')+(item.category?' · <span class="status-pill">'+esc(item.category)+'</span>':'')+'</div></div>';
}
function renderNewsRow(item){
  var img = item.image_url || item.imageUrl;
  return (img ? '<img src="'+esc(img)+'" alt="">' : '') +
    '<div class="body"><h4>'+esc(item.title)+'</h4><p>'+esc(item.excerpt || item.body || '')+'</p><div class="meta">'+(item.tag ? '<span class="status-pill">'+esc(item.tag)+'</span>' : '')+'</div></div>';
}
function renderGalleryRow(item){
  var img = item.image_url || item.imageUrl;
  return (img ? '<img src="'+esc(img)+'" alt="">' : '') +
    '<div class="body"><h4>'+esc(item.caption||'Untitled')+'</h4>'+(item.category?'<div class="meta"><span class="status-pill">'+esc(item.category)+'</span></div>':'')+'</div>';
}
function renderMemberRow(item){
  var img = item.image_url || item.imageUrl;
  return (img ? '<img src="'+esc(img)+'" alt="">' : '') +
    '<div class="body"><h4>'+esc(item.name)+' <span class="status-pill">'+esc(item.category||'Business')+'</span></h4>' +
    '<p>'+esc(item.description||'')+'</p>' +
    '<div class="meta">'+(item.location ? esc(item.location)+' · ' : '')+(item.email ? esc(item.email)+' · ' : '')+(item.phone ? esc(item.phone) : '')+'</div></div>';
}
function renderYouthHubRow(item){
  return '<div class="body"><h4>'+esc(item.title)+' <span class="status-pill">'+esc(item.category||'Opportunity')+'</span></h4>' +
    '<p>'+esc(item.description||'')+'</p>' +
    '<div class="meta">'+(item.eligibility ? 'For: '+esc(item.eligibility)+' · ' : '')+(item.deadline ? 'Deadline: '+esc(item.deadline) : '')+'</div></div>';
}

/* ---------------- Read-only submission renderers ---------------- */
function renderVolunteerRow(item){
  return '<div class="body"><h4>'+esc(item.name||'Unnamed')+' <span class="status-pill '+esc(item.status)+'">'+esc(item.status||'new')+'</span></h4>' +
    '<p>'+esc(item.email||'')+(item.phone?' · '+esc(item.phone):'')+' · <b>Interest:</b> '+esc(item.interest||'')+'</p><p><b>Availability:</b> '+esc(item.availability||'')+'</p></div>';
}
function renderPartnerRow(item){
  return '<div class="body"><h4>'+esc(item.company||item.name||'Unnamed')+' <span class="status-pill '+esc(item.status)+'">'+esc(item.status||'new')+'</span></h4>' +
    '<p>'+esc(item.email||'')+(item.phone?' · '+esc(item.phone):'')+'</p><p>'+esc(item.message||'')+'</p></div>';
}
function renderContactRow(item){
  return '<div class="body"><h4>'+esc(item.name||'Unnamed')+' <span class="status-pill '+esc(item.status)+'">'+esc(item.status||'new')+'</span></h4>' +
    '<p>'+esc(item.email||'')+(item.phone?' · '+esc(item.phone):'')+'</p><p><b>'+esc(item.subject||'')+'</b>: '+esc(item.message||'')+'</p></div>';
}
function renderNewsletterRow(item){
  var dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString() : '';
  return '<div class="body"><h4>'+esc(item.email||'Unnamed')+'</h4><div class="meta">'+esc(dateStr)+'</div></div>';
}

/* ---------------- Wiring helpers ---------------- */
function wireCollection(cms, name, rowFn, formFn){
  var listEl = document.querySelector('.admin-list[data-list="'+name+'"]');
  var form = document.querySelector('form[data-add="'+name+'"]');
  if (!listEl) return;
  cms.listItems(name, function(items){
    listEl.innerHTML = items.length ? '' : '<p class="admin-empty">Nothing here yet.</p>';
    items.forEach(function(item){
      var row = document.createElement('div');
      row.className = 'admin-row';
      row.innerHTML = rowFn(item) +
        '<div class="actions"><button type="button" data-del class="danger">Delete</button></div>';
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
        (item.status !== 'approved' && name === 'volunteerApplications' ? '<button type="button" data-approve style="color:#1a7a34;">Approve</button>' : '') +
        '<button type="button" data-del class="danger">Delete</button></div>';
      var reviewBtn = row.querySelector('[data-review]');
      if (reviewBtn) reviewBtn.addEventListener('click', function(){ cms.updateItem(name, item.id, { status: 'reviewed' }); });
      var approveBtn = row.querySelector('[data-approve]');
      if (approveBtn) approveBtn.addEventListener('click', function(){ cms.updateItem(name, item.id, { status: 'approved' }); });
      row.querySelector('[data-del]').addEventListener('click', async function(){
        if (!confirm('Delete this submission?')) return;
        await cms.deleteItem(name, item.id);
      });
      listEl.appendChild(row);
    });
  });
}

function wireNewsletter(cms){
  var listEl = document.querySelector('.admin-list[data-list="newsletterSignups"]');
  var exportBtn = document.getElementById('exportNewsletterBtn');
  var subscribers = [];

  cms.listItems('newsletterSignups', function(items){
    subscribers = items;
    if (!listEl) return;
    listEl.innerHTML = items.length ? '' : '<p class="admin-empty">No subscribers yet.</p>';
    items.forEach(function(item){
      var row = document.createElement('div');
      row.className = 'admin-row';
      row.innerHTML = renderNewsletterRow(item) +
        '<div class="actions"><button type="button" data-del class="danger">Delete</button></div>';
      row.querySelector('[data-del]').addEventListener('click', async function(){
        if (!confirm('Remove subscriber?')) return;
        await cms.deleteItem('newsletterSignups', item.id);
      });
      listEl.appendChild(row);
    });
  });

  if (exportBtn) {
    exportBtn.addEventListener('click', function(){
      if (!subscribers.length) { alert('No subscribers to export.'); return; }
      var csv = 'Email,Date\n' + subscribers.map(function(s){
        return '"' + (s.email || '').replace(/"/g, '""') + '","' + (s.created_at || '') + '"';
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'naba-subscribers-' + new Date().toISOString().slice(0, 10) + '.csv';
      a.click();
    });
  }
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
