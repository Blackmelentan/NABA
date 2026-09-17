# NABA Website — Setup Guide

This site is ready for staff testing immediately. The admin area can be opened in the browser without a live backend, and it can later be connected to Firebase or Supabase.

## Quick access

- Public site: open the pages in the `site/` folder
- Staff admin: open `site/admin.html`
- Local test login: use `admin@nabaorg.uk` and `naba1234`

> This local admin mode is for testing and editing inside the browser. It does not replace a live production backend.

---

## 1. Local admin testing mode (works now)

The site has a built-in browser storage mode so a staff member can open the admin area and test content edits without needing Firebase or Supabase credentials yet.

1. Open `site/admin.html` in the browser.
2. Sign in with:
   - Email: `admin@nabaorg.uk`
   - Password: `naba1234`
3. Add or edit items in the admin tabs to test the workflow.
4. Your edits are saved in the browser local storage for review.

This is a safe way to try the interface before adding a live database.

---

## 2. Supabase setup (recommended live backend)

Supabase is a good option for a small nonprofit site because it is simple to manage and gives you a clear admin dashboard and storage bucket.

### Supabase project setup

1. Go to https://supabase.com and create a free account.
2. Create a new project.
3. Copy the project URL and the anonymous key from the project dashboard.
4. Open `site/js/supabase-config.js` and paste the values there.
5. Create a storage bucket called `naba-site`.
6. Set the bucket to public read access if the site is meant to display uploaded images.
7. Add the admin table and page data structure below.

### Supabase keys and values

Use this config structure in `site/js/supabase-config.js`:

```js
window.NABA_SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';
window.NABA_SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
window.NABA_SUPABASE_SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY';
window.NABA_SUPABASE_STORAGE_BUCKET = 'naba-site';
```

### Recommended Supabase tables

Create these tables:

- `events`
  - `id` (uuid, primary key)
  - `title` (text)
  - `date` (text)
  - `location` (text)
  - `description` (text)
  - `image_url` (text, nullable)
  - `created_at` (timestamp)

- `news`
  - `id` (uuid, primary key)
  - `tag` (text)
  - `title` (text)
  - `body` (text)
  - `image_url` (text, nullable)
  - `created_at` (timestamp)

- `gallery`
  - `id` (uuid, primary key)
  - `caption` (text)
  - `image_url` (text)
  - `created_at` (timestamp)

- `volunteer_applications`
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `interest` (text)
  - `availability` (text)
  - `status` (text, default `new`)
  - `created_at` (timestamp)

- `partner_enquiries`
  - `id` (uuid, primary key)
  - `company` (text)
  - `email` (text)
  - `message` (text)
  - `status` (text, default `new`)
  - `created_at` (timestamp)

- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `message` (text)
  - `status` (text, default `new`)
  - `created_at` (timestamp)

- `newsletter_signups`
  - `id` (uuid, primary key)
  - `email` (text)
  - `created_at` (timestamp)

### Supabase storage policy example

Set storage policy to allow public read and authenticated write:

```sql
create policy "Public read access"
on storage.objects for select
using (true);

create policy "Authenticated insert access"
on storage.objects for insert
with check (auth.role() = 'authenticated');

create policy "Authenticated update access"
on storage.objects for update
using (auth.role() = 'authenticated');

create policy "Authenticated delete access"
on storage.objects for delete
using (auth.role() = 'authenticated');
```

### Supabase admin login

Create one staff account in Supabase Authentication:

- `admin@nabaorg.uk`
- choose a strong password

Then use those details in `site/admin.html` once the live Supabase integration is activated.

---

## 3. Firebase setup (optional fallback)

Firebase is still supported as a backup option.

1. Go to https://console.firebase.google.com
2. Create a project
3. Copy the web config values into `site/js/firebase-config.js`
4. Turn on Email/Password authentication
5. Enable Firestore and Storage
6. Add the security rules for each collection

This is useful if your team prefers Google’s ecosystem, but Supabase is the simpler option for a nonprofit website.

---

## 4. Upload to production

Upload the `site/` folder to any static host such as Netlify, GitHub Pages, or a standard web host.

Then open:

- `https://your-domain.com/admin.html`
- sign in with the staff account
- add or edit content
- check the public pages immediately after saving

---

## 5. Admin editing checklist

Before launch, confirm the following:

- the admin page loads correctly
- there is a working staff login
- events, news, and gallery updates appear live
- uploaded images display correctly
- contact and newsletter form submissions are visible to admin
- small text updates can be made by a non-technical staff member without touching code

---

## 6. Recommended next steps

1. Try the local admin mode now in the browser
2. Choose either Firebase or Supabase for live hosting
3. Add the actual staff login credentials
4. Publish the final site and test on mobile
5. Remove any unused placeholder files before launch
