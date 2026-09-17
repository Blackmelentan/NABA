/* =====================================================================
   NABA — Supabase configuration
   -----------------------------------------------------------------------
   Add your live Supabase project credentials here when you are ready to go live.
   Until then the browser local admin mode remains active and the page keeps working.
   ===================================================================== */

// Live Supabase project values (anon key is safe for client use).
// Do NOT expose the service role key to client-side code. It's stored as a repository secret for server-side use.
window.NABA_SUPABASE_STORAGE_BUCKET = window.NABA_SUPABASE_STORAGE_BUCKET || 'naba-site';
window.NABA_SUPABASE_ENABLED = !!(window.NABA_SUPABASE_URL && window.NABA_SUPABASE_ANON_KEY);
// Service role key must NOT be exposed to client-side code. It is stored in GitHub Actions secrets for server-side use.
window.NABA_SUPABASE_SERVICE_ROLE_KEY = window.NABA_SUPABASE_SERVICE_ROLE_KEY || '';
