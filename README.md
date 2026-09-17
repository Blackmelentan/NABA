# NABA Website

This repository contains the static marketing and community site for the National African & Black Association (NABA). The site is designed to be easy to update in plain HTML, CSS, and JavaScript without a build step.

## Quick start

Open the site folder in a browser or serve it locally with any static web server. For example:

```bash
cd "c:/New folder/dev con/naba/naba-website-17/site"
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in the browser.

## Project structure

- `site/index.html` — homepage and main brand landing page
- `site/about.html` — organisational story and legacy
- `site/directory.html` — community directory and service categories
- `site/events.html` — events and road trip information
- `site/volunteer.html` — volunteer and partnership forms
- `site/contact.html` — enquiry and office information
- `site/css/styles.css` — shared brand styling and layout rules
- `site/js/main.js` — global interactions, nav, search, modal behaviours, countdown, FAQ, ripple effects
- `site/js/auth.js` — prototype login and dashboard behaviour
- `site/js/cms.js` — CMS/backend abstraction for future content integration
- `site/js/firebase-config.js` — Firebase/Supabase-ready configuration switches
- `site/assets/` — images, icons, and branding assets

## Editing guidance

### For non-technical staff

- Most public pages are plain HTML and can be edited directly by a staff member with basic file-editing confidence.
- To update office information, contact details, event copy, or service listings, open the relevant page in the `site/` folder and edit the text blocks in place.
- Keep the page structure and links intact unless a new section is being added.
- Use the existing style patterns in the site rather than creating new custom layouts.

### Brand and logo

- Use the assets in `site/assets/` for logo, favicon, and placeholder imagery.
- Keep the transparent logo treatment on the site header and footer for visibility on warm backgrounds.
- The SVG favicon files are already included and should be the default brand references for browser tabs and share cards.

### Content updates

- Office details, calls to action, service counts, and event listings are easy to adjust in the page markup.
- If a future backend is added, the `data-form` and `data-collection` attributes are already prepared for submission hooks.
- The admin area is designed to be used by staff once a live backend is connected, without needing to touch the site code.

### Future backend

- Firebase is still prepared as a fallback backend via `site/js/firebase-config.js`.
- Supabase-ready placeholders are included, but the actual credentials should be added later when the project is ready to go live.
- The admin pages are front-end ready and intended for staff use once the backend is connected.

## Brand notes

- The site uses a warm cream, ink, and gold palette to match the NABA brand direction.
- Production favicon, social icon, and office logo assets are stored under `site/assets/`.
- No emoji-based brand icons should be used for the public-facing interface; use the custom SVG system in `site/js/main.js` instead.

## Launch checklist

- Confirm the live logo and asset set is finalised.
- Replace placeholder imagery with the final event and community photos.
- Add real Firebase or Supabase credentials.
- Review contact, office, and email details for live publication.
- Test the site on desktop and mobile before launch.

## Ownership / credits

The site includes a Kaabu Technologies credit placeholder for design and development support where relevant. Update wording if you need to swap the credit line to a different studio or internal team.
