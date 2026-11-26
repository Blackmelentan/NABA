/* =====================================================================
   NABA — Firebase configuration
   -----------------------------------------------------------------------
   Firebase is optional for local testing. The site includes a browser-based
   local admin mode so staff can open admin.html and try content edits right away.
   When you are ready for a live backend, paste the Firebase values here.
   ===================================================================== */

window.NABA_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBoG2qe4yGT8cvr9Zl4p7EifpplEdaT8Bc",
  authDomain: "naba-d3299.firebaseapp.com",
  projectId: "naba-d3299",
  storageBucket: "naba-d3299.firebasestorage.app",
  messagingSenderId: "34953666087",
  appId: "1:34953666087:web:693c614ea230f445a57802",
  measurementId: "G-BLR7KF34D6"
};

window.NABA_FIREBASE_ENABLED = !!(window.NABA_FIREBASE_CONFIG.apiKey && window.NABA_FIREBASE_CONFIG.projectId);

/* Supabase-ready option: values live in js/supabase-config.js when you are ready to switch. */
window.NABA_SUPABASE_URL = window.NABA_SUPABASE_URL || '';
window.NABA_SUPABASE_ANON_KEY = window.NABA_SUPABASE_ANON_KEY || '';
window.NABA_SUPABASE_SERVICE_ROLE_KEY = window.NABA_SUPABASE_SERVICE_ROLE_KEY || '';
window.NABA_SUPABASE_STORAGE_BUCKET = window.NABA_SUPABASE_STORAGE_BUCKET || '';
window.NABA_SUPABASE_ENABLED = !!(window.NABA_SUPABASE_URL && window.NABA_SUPABASE_ANON_KEY);
