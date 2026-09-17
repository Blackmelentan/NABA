# Deploying this site

This repo contains a static site in the `site/` directory. The project can be deployed to Netlify or Vercel.

Netlify (recommended quick start)

1. Create a new site → Import from Git.
2. Select your repository.
3. Set `Publish directory` to `site`.
4. Add environment variables (Site → Site settings → Build & deploy → Environment):
   - `SUPABASE_URL` = https://<project-ref>.supabase.co
   - `SUPABASE_ANON_KEY` = <anon-key>
5. Deploy site.

Vercel (quick start)

1. Create a new project → Import Git repo.
2. In Project settings → General: set `Root Directory` to `/` (we use `vercel.json` to map requests to `site`).
3. Add Environment Variables in Vercel dashboard:
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY` (as above).
4. Deploy.

Notes
- Do not commit service role keys or other secrets.
- For Supabase, prefer adding client-side `anon` key as an environment variable; keep any server-only keys out of the frontend.
- If you want me to wire CI/CD, I can also add a GitHub Action to run a basic validation step before deploy.
