# Sasi Kumar Karikuti — Portfolio

Single-page portfolio. Vite + React 18 + Bootstrap 5.3, with a "mission-control HUD" look in dark and light themes.

```bash
npm i
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve dist/ locally
```

## Before you publish (TODO)

| What | Where |
| --- | --- |
| Real resume (remove the phone number first) | replace `public/resume.pdf` (currently a placeholder) |
| Portrait photo | add `public/images/pic.webp` (square, ≤100 KB), then set `profile.photo` in `src/data.js` |
| Domain | replace `https://your-domain.example/` in `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| EmailJS keys | see below (the form falls back to `mailto:` until they're set) |
| Optional metrics | search `TODO` in `src/data.js`; add numbers only once they're cleared for publication |

## Editing content

All copy lives in **`src/data.js`**. Components only map over it, so one edit updates the card, the case-study drawer, the command palette and the skill filters together.

- **Projects**: each entry has `slug, title, tag, summary, problem, result, pipeline[], highlights[], stack[], terminal[]`.
  - `slug` drives the share link `#/p/<slug>`.
  - `pipeline` items (`{ name, note }`) become the animated diagram.
  - `terminal` lines are **synthetic** sample logs. Never paste real hostnames, paths, IDs or data.
- **Skills**: names must match project `stack` strings exactly (case-insensitive) for the cross-filter. Skills with no matching project render as plain tags.
- **Experience / Education / Certifications**: plain arrays. Set `profile.showCompany = false` to hide the employer name.
- **Earlier work**: set `public: false` on an item to hide it.
- **Experience years** in the TL;DR are computed from `profile.startDate` (`"2025-05"` gives `1.5+ yrs`).
- `index.html` repeats the name, title and description for SEO and JSON-LD. Update it if those change.

## Contact form (EmailJS)

1. Create an EmailJS account, an email service and a template that uses `{{from_name}}`, `{{reply_to}}`, `{{message}}`.
2. `cp .env.example .env.local` and fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
3. Restart `npm run dev`. If any key is missing, the form validates, then opens the visitor's mail app (`mailto:`).

The form includes a hidden honeypot field (`website`). Submissions that fill it are silently dropped.

## Deploy

**GitHub Pages**: push to `main`. `.github/workflows/deploy.yml` builds with `BASE_PATH=/<repo>/` and publishes `dist/`.
In the repo, open *Settings → Pages → Source* and choose **GitHub Actions**. Add the three `VITE_EMAILJS_*` values under *Settings → Secrets and variables → Actions*.
For a `<user>.github.io` repo or a custom domain, set `BASE_PATH: /` in the workflow.

**Vercel**: import the repo (framework preset: Vite) and add the three `VITE_EMAILJS_*` environment variables. No `BASE_PATH` needed.

## Keyboard

| Key | Action |
| --- | --- |
| `Ctrl/⌘ + K` or `/` | Command palette: jump to a section, open a project, download the resume, copy the email, toggle the theme |
| `↑ ↓ Enter Esc` | Move, run and close inside the palette |
| `Tab` | A skip link appears first; every control has a visible focus ring |

## Notes

- **Fonts**: Google Fonts (`display=swap`) load after the first contentful paint, then all three families switch in together (`html.fonts`). This keeps mobile Lighthouse Performance at 99 instead of about 92 with the usual approach.
- **Motion**: everything animated (reveal, particle canvas, pipeline, terminal typing, CSS keyframes) turns off under `prefers-reduced-motion`.
- The case-study drawer, the command palette and the EmailJS SDK are lazy-loaded chunks.
