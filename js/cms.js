/* =====================================================================
   NABA CMS — data access layer (Firebase Auth + Firestore + Storage)
   -----------------------------------------------------------------------
   Loaded as a <script type="module"> on every page. If NABA_FIREBASE_ENABLED
   is false (see firebase-config.js), every function below no-ops safely
   so the static site keeps working exactly as it does today.

   Collections used:
     events                — admin-added events (shown alongside the
                              existing static events on events.html/index.html)
     news                  — admin-added news posts
     gallery               — admin-added photos
     directoryListings     — admin-added community directory entries
     volunteerApplications — submissions from volunteer.html
     partnerEnquiries      — submissions from volunteer.html (partner tab)
     contactMessages       — submissions from contact.html
     newsletterSignups     — submissions from the footer newsletter form
   ===================================================================== */

let app, auth, db, storage;
let sdk = null;

const LOCAL_ADMIN_EMAIL = 'admin@nabaorg.uk';
const LOCAL_ADMIN_PASSWORD = 'naba1234';
const LOCAL_SESSION_KEY = 'naba_local_admin_session';
const LOCAL_DATA_KEY = 'naba_local_admin_data';

function readLocalData(){
  try {
    return JSON.parse(localStorage.getItem(LOCAL_DATA_KEY) || '{}');
  } catch (err) {
    return {};
  }
}
function writeLocalData(data){
  localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
}
function getLocalCollection(name){
  var all = readLocalData();
  return Array.isArray(all[name]) ? all[name] : [];
}
function setLocalCollection(name, items){
  var all = readLocalData();
  all[name] = items;
  writeLocalData(all);
}
function localUser(){
  var email = localStorage.getItem(LOCAL_SESSION_KEY);
  return email ? { email: email } : null;
}

async function loadFirebase(){
  if (!window.NABA_FIREBASE_ENABLED) return null;
  if (sdk) return sdk;
  const [appMod, authMod, fsMod, stMod] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"),
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"),
  ]);
  app = appMod.initializeApp(window.NABA_FIREBASE_CONFIG);
  auth = authMod.getAuth(app);
  db = fsMod.getFirestore(app);
  storage = stMod.getStorage(app);
  sdk = { appMod, authMod, fsMod, stMod };
  return sdk;
}

/* ---------------- Auth ---------------- */

async function login(email, password){
  if (!window.NABA_FIREBASE_ENABLED) {
    if (String(email).trim().toLowerCase() === LOCAL_ADMIN_EMAIL && String(password) === LOCAL_ADMIN_PASSWORD) {
      localStorage.setItem(LOCAL_SESSION_KEY, email.trim());
      return { ok: true };
    }
    return { ok: false, message: 'Incorrect email or password.' };
  }
  const { authMod } = await loadFirebase();
  if (!authMod) return { ok:false, message:"Firebase isn't configured yet — see SETUP.md." };
  try{
    await authMod.signInWithEmailAndPassword(auth, email, password);
    return { ok:true };
  }catch(err){
    return { ok:false, message: friendlyAuthError(err) };
  }
}

async function logout(){
  if (!window.NABA_FIREBASE_ENABLED) {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    return;
  }
  const { authMod } = await loadFirebase() || {};
  if (authMod) await authMod.signOut(auth);
}

async function onAuthChange(cb){
  if (!window.NABA_FIREBASE_ENABLED) {
    cb(localUser());
    return;
  }
  const { authMod } = await loadFirebase() || {};
  if (!authMod){ cb(null); return; }
  authMod.onAuthStateChanged(auth, cb);
}

function friendlyAuthError(err){
  var code = err && err.code || '';
  if (code.indexOf('user-not-found') !== -1 || code.indexOf('wrong-password') !== -1 || code.indexOf('invalid-credential') !== -1)
    return "Incorrect email or password.";
  if (code.indexOf('too-many-requests') !== -1)
    return "Too many attempts — please wait a moment and try again.";
  return "Sign-in failed: " + (err && err.message ? err.message : 'unknown error');
}

/* ---------------- Firestore CRUD ---------------- */

async function listItems(collectionName, cb){
  if (!window.NABA_FIREBASE_ENABLED) {
    cb(getLocalCollection(collectionName));
    return function unsubscribe(){};
  }
  const { fsMod } = await loadFirebase() || {};
  if (!fsMod){ cb([]); return function unsubscribe(){}; }
  const q = fsMod.query(fsMod.collection(db, collectionName), fsMod.orderBy('createdAt', 'desc'));
  return fsMod.onSnapshot(q, function(snap){
    var items = [];
    snap.forEach(function(doc){ items.push(Object.assign({ id: doc.id }, doc.data())); });
    cb(items);
  }, function(){ cb([]); });
}

async function uploadImage(file, pathPrefix){
  const { stMod } = await loadFirebase() || {};
  if (!stMod || !file) return null;
  var path = pathPrefix + '/' + Date.now() + '-' + file.name.replace(/[^a-z0-9.\-_]/gi,'_');
  var ref = stMod.ref(storage, path);
  await stMod.uploadBytes(ref, file);
  return await stMod.getDownloadURL(ref);
}

async function addItem(collectionName, data, imageFile){
  if (!window.NABA_FIREBASE_ENABLED) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    var item = Object.assign({}, data, {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      imageUrl: imageFile ? 'local-upload' : (data.imageUrl || null)
    });
    if (imageFile) item.imageUrl = 'local-upload:' + fileNameFor(imageFile);
    items.unshift(item);
    all[collectionName] = items;
    writeLocalData(all);
    return { ok: true };
  }
  const { fsMod } = await loadFirebase() || {};
  if (!fsMod) return { ok:false, message:"Firebase isn't configured yet." };
  try{
    var imageUrl = imageFile ? await uploadImage(imageFile, collectionName) : (data.imageUrl || null);
    await fsMod.addDoc(fsMod.collection(db, collectionName), Object.assign({}, data, {
      imageUrl: imageUrl,
      createdAt: fsMod.serverTimestamp()
    }));
    return { ok:true };
  }catch(err){
    return { ok:false, message: err.message };
  }
}

function fileNameFor(file){
  if (!file || !file.name) return 'upload';
  return String(file.name).replace(/[^a-z0-9.\-_]/gi, '_');
}

async function updateItem(collectionName, id, data, imageFile){
  if (!window.NABA_FIREBASE_ENABLED) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    var index = items.findIndex(function(item){ return String(item.id) === String(id); });
    if (index === -1) return { ok: false, message: 'Item not found.' };
    var updated = Object.assign({}, items[index], data);
    if (imageFile) updated.imageUrl = 'local-upload:' + fileNameFor(imageFile);
    items[index] = updated;
    all[collectionName] = items;
    writeLocalData(all);
    return { ok: true };
  }
  const { fsMod } = await loadFirebase() || {};
  if (!fsMod) return { ok:false, message:"Firebase isn't configured yet." };
  try{
    var patch = Object.assign({}, data);
    if (imageFile) patch.imageUrl = await uploadImage(imageFile, collectionName);
    await fsMod.updateDoc(fsMod.doc(db, collectionName, id), patch);
    return { ok:true };
  }catch(err){
    return { ok:false, message: err.message };
  }
}

async function deleteItem(collectionName, id){
  if (!window.NABA_FIREBASE_ENABLED) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    all[collectionName] = items.filter(function(item){ return String(item.id) !== String(id); });
    writeLocalData(all);
    return { ok: true };
  }
  const { fsMod } = await loadFirebase() || {};
  if (!fsMod) return { ok:false, message:"Firebase isn't configured yet." };
  try{
    await fsMod.deleteDoc(fsMod.doc(db, collectionName, id));
    return { ok:true };
  }catch(err){
    return { ok:false, message: err.message };
  }
}

/* Public, unauthenticated writes (form submissions) */
async function submitPublic(collectionName, data){
  if (!window.NABA_FIREBASE_ENABLED) {
    var all = readLocalData();
    var items = Array.isArray(all[collectionName]) ? all[collectionName] : [];
    items.unshift(Object.assign({}, data, {
      id: String(Date.now()),
      status: 'new',
      createdAt: new Date().toISOString()
    }));
    all[collectionName] = items;
    writeLocalData(all);
    return { ok:true };
  }
  const { fsMod } = await loadFirebase() || {};
  if (!fsMod) return { ok:false, message:"not-configured" };
  try{
    await fsMod.addDoc(fsMod.collection(db, collectionName), Object.assign({}, data, {
      createdAt: fsMod.serverTimestamp(),
      status: 'new'
    }));
    return { ok:true };
  }catch(err){
    return { ok:false, message: err.message };
  }
}

window.nabaCMS = {
  isEnabled: function(){ return true; },
  login: login,
  logout: logout,
  onAuthChange: onAuthChange,
  listItems: listItems,
  addItem: addItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
  submitPublic: submitPublic
};
