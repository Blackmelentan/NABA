/* =====================================================================
   NABA — Supabase configuration
   -----------------------------------------------------------------------
   Project: NABA WEBSITE  |  Ref: qaxozohjsbezanbazrhz
   Region:  AWS EU-West-1 (Ireland)
   Domain:  nabagobal.org

   Add your NABA_SUPABASE_ANON_KEY below (or inject via GitHub Secrets /
   a meta tag at build time). The URL is derived from the project ref and
   never needs to change.
   ===================================================================== */

(function () {
  /* ---- Project URL (derived from project ref — no secret) ---- */
  var PROJECT_REF = 'qaxozohjsbezanbazrhz';
  var SUPABASE_URL = 'https://' + PROJECT_REF + '.supabase.co';

  /* ---- Anon key: injected via GitHub Secret / environment variable.
          Replace the empty string ONLY if you are running locally and
          know the key won't be committed to git.
          In production, set VITE_SUPABASE_ANON_KEY (or inject via
          a <meta> tag from your CI/CD pipeline). ---- */
  var ANON_KEY =
    (typeof process !== 'undefined' && process.env && process.env.SUPABASE_ANON_KEY) ||
    document.querySelector('meta[name="supabase-anon-key"]')?.content ||
    window.__SUPABASE_ANON_KEY ||
    '';                                                   // ← paste key here for local dev only

  var STORAGE_BUCKET = 'naba-site';

  /* ---- Expose globals for cms.js & public-render.js ---- */
  window.NABA_SUPABASE_URL             = SUPABASE_URL;
  window.NABA_SUPABASE_ANON_KEY        = ANON_KEY;
  window.NABA_SUPABASE_STORAGE_BUCKET  = STORAGE_BUCKET;
  window.NABA_SUPABASE_ENABLED         = !!(SUPABASE_URL && ANON_KEY);

  if (!window.NABA_SUPABASE_ENABLED) {
    console.warn(
      '[NABA] Supabase credentials not set — running in local-storage mode.\n' +
      'To connect the live backend, set SUPABASE_ANON_KEY in GitHub Secrets\n' +
      'or add <meta name="supabase-anon-key" content="YOUR_KEY"> to each page.'
    );
  }
})();
