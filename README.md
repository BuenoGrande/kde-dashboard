# KDE Prep — Pierre's Command Center

A static dashboard for coordinating Pierre's preparation for the **KDE
(Kantonaler Deutschtest für die Einbürgerung)**, Canton of Zürich, between
Pierre and his three teachers (Heidi, Patrick, Denajdër).

It is not a curriculum or a learning app — it's a shared status board: what's
covered, what's weak, what's next, and who should do what in the next
session.

**All content shipped in this repo is sample/placeholder data** so the site
is usable on day one. Replace it gradually with real session notes — see
below.

## What's in it

- **Dashboard** — exam readiness snapshot, the four exam-section cards
  (Hören/Lesen/Schreiben/Sprechen), top priorities, recurring mistakes, next
  planned sessions, teacher focus, recent lessons, and a collapsible
  domain × skill coverage matrix.
- **Hören / Lesen / Schreiben / Sprechen pages** — official format, coverage,
  strengths/weaknesses, next drills, and skill-specific extras (Swiss German
  listening status, writing templates + model answer, speaking structure,
  etc.).
- **Domains** — 12 exam-relevant life domains (health, Gemeinde, transport,
  Swiss German survival, …), each with vocabulary, likely questions, listening
  situations, reading texts, writing prompts, strengths/weaknesses and next
  action.
- **Teachers** — one page per teacher (focus, strengths, limitations, best
  use, next session plan, cross-teacher activity so no one repeats another
  teacher's work) plus a **Teacher Brief** page readable in under two minutes
  before any lesson.
- **Lesson log** — full session history, filterable by teacher.

## How the data model works

Everything on the site is generated from one file:

```
src/data/progress.ts
```

It exports plain arrays: `sections`, `domains`, `teachers`, `sessions`,
`plannedSessions`, `priorities`, `recurringMistakes`. Every page reads from
these — there is no separate content to update per page. `src/data/types.ts`
documents the shape of each object, and `src/data/reference.ts` holds fixed
exam-format reference material (speaking structure, writing template, model
answer) that rarely changes.

## Update the site after a lesson

1. Open `src/data/progress.ts`.
2. Copy this template and append it to the **end** of the `sessions` array:

   ```ts
   {
     id: "s9", // next number in sequence
     date: "2026-07-10",
     teacher: "heidi", // "heidi" | "patrick" | "denajder"
     duration: 60,
     sections: ["sprechen"], // any of: hoeren, lesen, schreiben, sprechen
     domains: ["health"], // ids from the `domains` array below
     covered: "What you did in the session.",
     wentWell: ["..."],
     strugglesWith: ["..."],
     recurringMistakes: ["weil-word-order"], // ids from recurringMistakes, if applicable
     vocabulary: ["..."],
     homework: "...",
     recommendedNext: "...",
   },
   ```

   Don't add `isSample: true` — that flag marks placeholder content only.

3. Update the matching `domains[...].skills[...]` cell (status, teacher,
   `lastPracticed`) and the top-level `sections[...].coverage` / `.status` if
   the lesson changed how ready that skill or domain is.
4. If new mistakes came up, add them to `recurringMistakes`; if an old one
   didn't reappear in a while, you can leave it or delete it.
5. Update or remove entries in `plannedSessions` once they've happened, and
   add the next planned session.
6. Save, commit, and push — the GitHub Action rebuilds and redeploys the
   site automatically (see below).

Everything else (dashboard totals, teacher pages, domain pages, the lesson
log) updates itself from these edits — nothing else needs to change.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173/kde-dashboard/`).

To type-check and build a production bundle:

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Publish on GitHub Pages

This repo already includes `.github/workflows/deploy.yml`, which builds and
deploys the site on every push to `main`.

1. Push this repository to GitHub (see exact commands below).
2. In the GitHub repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions** (one-time setup).
3. Push to `main` — the workflow builds with `npm run build` and deploys the
   `dist/` folder.
4. The site will be published at:

   ```
   https://<your-github-username>.github.io/kde-dashboard/
   ```

`vite.config.ts` sets `base: '/kde-dashboard/'` to match this URL, and the
app uses `HashRouter` so client-side routes (`/#/domains/health`, etc.) work
correctly on GitHub Pages without any extra redirect/404 configuration. If
you rename the repository, update `base` in `vite.config.ts` to match.

### First-time push

```bash
git init
git add -A
git commit -m "Initial KDE prep dashboard"
git branch -M main
git remote add origin https://github.com/<your-github-username>/kde-dashboard.git
git push -u origin main
```

## Tech stack

- React + TypeScript + Vite
- React Router (`HashRouter`, for GitHub Pages compatibility)
- Tailwind CSS v4
- No backend, no database, no login — all state lives in `src/data/progress.ts`

## Assumptions made

- "Dénard" (section 9 of the brief) and "Denajdër" (top-level teacher list)
  refer to the same teacher — the site uses **Denajdër** throughout.
- The default teacher/skill assignment (Heidi → Sprechen, Patrick → Hören,
  Denajdër → Lesen/Schreiben) is a starting point, not fixed — change
  `assignedTeachers` / `assignedTeacher` / `relevantDomains` in
  `progress.ts` any time the division of labour changes.
- Sample lesson dates run through 2026-06-30 (marked `isSample: true`);
  planned sessions run from 2026-07-08 onward. Replace both as real lessons
  happen.
- Swiss German is tracked as a **passive listening** domain only — Pierre is
  not expected to produce it, per the KDE's Hochdeutsch-only speaking
  requirement.
