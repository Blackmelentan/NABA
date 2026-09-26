/* =====================================================================
   NABA — CMS / backend abstraction layer
   Uses Supabase as primary backend, falls back to localStorage for
   local development when credentials are not yet configured.
   ===================================================================== */

/* ---- Local-storage fallback constants ---- */
var LOCAL_DATA_KEY    = 'naba_local_admin_data';
var LOCAL_SESSION_KEY = 'naba_local_admin_email';
var LOCAL_ADMIN_EMAIL = 'admin@nabaorg.uk';
var LOCAL_ADMIN_PASS  = 'naba-admin-2026';

/* ---- Supabase SDK (lazy-loaded) ---- */
var supabaseClient = null;

async function loadSupabase() {
  if (supabaseClient) return supabaseClient;
  if (!window.NABA_SUPABASE_ENABLED) return null;

  try {
    // Load Supabase v2 from CDN
    if (!window.supabase) {
      await new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    supabaseClient = window.supabase.createClient(
      window.NABA_SUPABASE_URL,
      window.NABA_SUPABASE_ANON_KEY
    );
    return supabaseClient;
  } catch (err) {
    console.error('[NABA CMS] Failed to load Supabase:', err);
    return null;
  }
}

/* ---- LocalStorage helpers ---- */
function readLocalData() {
  try { return JSON.parse(localStorage.getItem(LOCAL_DATA_KEY) || '{}'); }
  catch (_) { return {}; }
}
function writeLocalData(data) {
  localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
}
function getLocalCollection(name) {
  var all = readLocalData();
  return Array.isArray(all[name]) ? all[name] : [];
}
function setLocalCollection(name, items) {
  var all = readLocalData();
  all[name] = items;
  writeLocalData(all);
}
function localUser() {
  var email = localStorage.getItem(LOCAL_SESSION_KEY);
  return email ? { email: email } : null;
}

/* =====================================================================
   AUTH
   ===================================================================== */

async function login(email, password) {
  var sb = await loadSupabase();
  if (!sb) {
    // Local-mode login
    if (email.trim().toLowerCase() === LOCAL_ADMIN_EMAIL && password === LOCAL_ADMIN_PASS) {
      localStorage.setItem(LOCAL_SESSION_KEY, email.trim());
      return { ok: true };
    }
    return { ok: false, message: 'Incorrect email or password.' };
  }
  var { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: friendlyAuthError(error) };
  return { ok: true, user: data.user };
}

async function logout() {
  localStorage.removeItem(LOCAL_SESSION_KEY);
  var sb = await loadSupabase();
  if (sb) await sb.auth.signOut();
}

async function onAuthChange(cb) {
  var sb = await loadSupabase();
  if (!sb) {
    cb(localUser());
    return;
  }
  // Fire immediately with current session
  var { data: { session } } = await sb.auth.getSession();
  cb(session ? session.user : null);
  // Then listen for changes
  sb.auth.onAuthStateChange(function (event, session) {
    cb(session ? session.user : null);
  });
}

function friendlyAuthError(err) {
  var msg = err && err.message ? err.message.toLowerCase() : '';
  if (msg.includes('invalid') || msg.includes('credentials') || msg.includes('password')) {
    return 'Incorrect email or password.';
  }
  if (msg.includes('rate') || msg.includes('too many')) {
    return 'Too many attempts — please wait a moment and try again.';
  }
  return 'Sign-in failed: ' + (err.message || 'unknown error');
}

/* =====================================================================
   CRUD — Collection operations
   ===================================================================== */

/* Map frontend collection names to Supabase table names */
var TABLE_MAP = {
  events:                 'events',
  news:                   'news',
  gallery:                'gallery',
  volunteerApplications:  'volunteer_applications',
  partnerEnquiries:       'partner_enquiries',
  contactMessages:        'contact_messages',
  newsletterSignups:      'newsletter_signups',
  members:                'members',
  youthHub:               'youth_hub_entries'
};

function tableName(col) {
  return TABLE_MAP[col] || col;
}

/**
 * List items from a collection.
 * @param {string} collectionName
 * @param {function} cb  - called with items array; called again on real-time update
 * @returns {function}   - unsubscribe function
 */
async function listItems(collectionName, cb) {
  var sb = await loadSupabase();
  if (!sb) {
    cb(getLocalCollection(collectionName));
    return function () {};
  }

  var tbl = tableName(collectionName);

  // Initial fetch
  var { data, error } = await sb
    .from(tbl)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { console.error('[NABA CMS] listItems:', error); cb([]); return function () {}; }
  cb(data || []);

  // Real-time subscription
  var channel = sb
    .channel('rt-' + tbl)
    .on('postgres_changes', { event: '*', schema: 'public', table: tbl }, async function () {
      var { data: fresh } = await sb.from(tbl).select('*').order('created_at', { ascending: false });
      cb(fresh || []);
    })
    .subscribe();

  return function () { sb.removeChannel(channel); };
}

/**
 * Upload image to Supabase Storage.
 * @returns {string|null} public URL
 */
async function uploadImage(file, folder) {
  var sb = await loadSupabase();
  if (!sb || !file) return null;

  var ext = file.name.split('.').pop();
  var path = folder + '/' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
  var bucket = window.NABA_SUPABASE_STORAGE_BUCKET || 'naba-site';

  var { error } = await sb.storage.from(bucket).upload(path, file, {
    cacheControl: '31536000',
    upsert: false
  });

  if (error) { console.error('[NABA CMS] uploadImage:', error); return null; }

  var { data } = sb.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Add item to a collection.
 */
async function addItem(collectionName, data, imageFile) {
  var sb = await loadSupabase();
  if (!sb) {
    // Local mode
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    var item = Object.assign({}, data, {
      id: String(Date.now()),
      created_at: new Date().toISOString(),
      status: 'published',
      image_url: imageFile ? 'local:' + imageFile.name : (data.image_url || null)
    });
    items.unshift(item);
    all[collectionName] = items;
    writeLocalData(all);
    return { ok: true };
  }

  try {
    var imageUrl = imageFile ? await uploadImage(imageFile, collectionName) : (data.image_url || null);
    var payload = Object.assign({}, data, {
      image_url: imageUrl,
      created_at: new Date().toISOString(),
      status: data.status || 'published'
    });

    var { error } = await sb.from(tableName(collectionName)).insert([payload]);
    if (error) return { ok: false, message: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

/**
 * Update an item.
 */
async function updateItem(collectionName, id, data, imageFile) {
  var sb = await loadSupabase();
  if (!sb) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    var idx = items.findIndex(function (i) { return String(i.id) === String(id); });
    if (idx === -1) return { ok: false, message: 'Item not found.' };
    items[idx] = Object.assign({}, items[idx], data);
    if (imageFile) items[idx].image_url = 'local:' + imageFile.name;
    all[collectionName] = items;
    writeLocalData(all);
    return { ok: true };
  }

  try {
    var patch = Object.assign({}, data);
    if (imageFile) patch.image_url = await uploadImage(imageFile, collectionName);
    var { error } = await sb.from(tableName(collectionName)).update(patch).eq('id', id);
    if (error) return { ok: false, message: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

/**
 * Delete an item.
 */
async function deleteItem(collectionName, id) {
  var sb = await loadSupabase();
  if (!sb) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    all[collectionName] = items.filter(function (i) { return String(i.id) !== String(id); });
    writeLocalData(all);
    return { ok: true };
  }

  try {
    var { error } = await sb.from(tableName(collectionName)).delete().eq('id', id);
    if (error) return { ok: false, message: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

/**
 * Public (unauthenticated) form submission — newsletter, contact, volunteer, partner.
 */
async function submitPublic(collectionName, data) {
  var sb = await loadSupabase();
  if (!sb) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    items.unshift(Object.assign({}, data, {
      id: String(Date.now()),
      status: 'new',
      created_at: new Date().toISOString()
    }));
    all[collectionName] = items;
    writeLocalData(all);
    return { ok: true };
  }

  try {
    var payload = Object.assign({}, data, {
      created_at: new Date().toISOString(),
      status: 'new'
    });
    var { error } = await sb.from(tableName(collectionName)).insert([payload]);
    if (error) return { ok: false, message: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

/**
 * Fetch public data for rendering on public pages (events, news, gallery, etc.)
 */
async function fetchPublic(collectionName, options) {
  options = options || {};
  var sb = await loadSupabase();
  if (!sb) {
    var items = getLocalCollection(collectionName);
    if (options.limit) items = items.slice(0, options.limit);
    return items;
  }

  try {
    var q = sb.from(tableName(collectionName))
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (options.limit) q = q.limit(options.limit);
    if (options.filter) {
      Object.entries(options.filter).forEach(function ([k, v]) { q = q.eq(k, v); });
    }

    var { data, error } = await q;
    if (error) { console.error('[NABA CMS] fetchPublic:', error); return []; }
    return data || [];
  } catch (err) {
    console.error('[NABA CMS] fetchPublic:', err);
    return [];
  }
}

/* ---- Expose public API ---- */
window.nabaCMS = {
  isEnabled:    function () { return true; },  // always true (local-mode is still "enabled")
  isLive:       function () { return !!window.NABA_SUPABASE_ENABLED; },
  login:        login,
  logout:       logout,
  onAuthChange: onAuthChange,
  listItems:    listItems,
  addItem:      addItem,
  updateItem:   updateItem,
  deleteItem:   deleteItem,
  submitPublic: submitPublic,
  fetchPublic:  fetchPublic,
  uploadImage:  uploadImage
};
