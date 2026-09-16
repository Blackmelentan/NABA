/* =====================================================================
   NABA — Firebase configuration
   -----------------------------------------------------------------------
   Firebase is optional for local testing. The site includes a browser-based
   local admin mode so staff can open admin.html and try content edits right away.
   When you are ready for a live backend, paste the Firebase values here.
   ===================================================================== */

window.NABA_FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

window.NABA_FIREBASE_ENABLED = !!(window.NABA_FIREBASE_CONFIG.apiKey && window.NABA_FIREBASE_CONFIG.projectId);

/* Supabase-ready option: values live in js/supabase-config.js when you are ready to switch. */
window.NABA_SUPABASE_URL = window.NABA_SUPABASE_URL || '';
window.NABA_SUPABASE_ANON_KEY = window.NABA_SUPABASE_ANON_KEY || '';
window.NABA_SUPABASE_SERVICE_ROLE_KEY = window.NABA_SUPABASE_SERVICE_ROLE_KEY || '';
window.NABA_SUPABASE_STORAGE_BUCKET = window.NABA_SUPABASE_STORAGE_BUCKET || '';
window.NABA_SUPABASE_ENABLED = !!(window.NABA_SUPABASE_URL && window.NABA_SUPABASE_ANON_KEY);
