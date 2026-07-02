# KDE Prep — Pierre's Command Center

A calm, static coordination dashboard for Pierre's preparation for the **KDE
(Kantonaler Deutschtest für die Einbürgerung)**, Canton of Zürich, shared
between Pierre and his three teachers (Heidi, Patrick, Denajdër).

It answers six questions, nothing more: Is Pierre ready? What's covered?
What's weak? What should the next teacher do? What happened recently? What
vocabulary/verbs/grammar/mistakes came out of each lesson?

**All content shipped in this repo is sample/placeholder data** so the site
is usable on day one. Replace it gradually with real session notes — see
below.

## Design principle: one status, everywhere

Every trackable thing (a domain, a writing task, a speaking checklist item)
has exactly **one** status, from the same five-value scale:

| Status | Color | Meaning |
|---|---|---|
| Not covered | grey | Not started |
| Started | yellow | Some practice, not stable |
| Needs review | orange | Practiced, but a real gap remains |
| Ready | green | Exam-ready |
| Planned | blue | Scheduled for an upcoming session |

There is no skill-by-skill (Hören/Lesen/Schreiben/Sprechen) breakdown per
domain — the real question for most topics is just "can Pierre handle this
in German, yes or no." Writing and Speaking get their own pages because the
exam needs concrete task/format competence there, not a general topic score.

## Pages

- **Dashboard** — readiness %, next session, domain-status counts + domains
  needing attention, top 3 priorities, recent lesson logs, one-line teacher
  briefs. Designed to be read in under 30 seconds.
- **Domains** — all 12 life domains as status-colored rows; click through for
  status, priority, teacher, last practiced date, and recent lessons.
- **Writing** — the A2 writing-task checklist (invitation, reply, appointment
  change, information request, apology, neighbour message), each with a
  status, common mistakes, next drill, and a model answer where available.
- **Speaking** — the B1 checklist (self-introduction, picture-card, follow-up
  questions), the picture-card formula structure, repair phrases, priority
  speaking domains, and recent speaking lessons.
- **Teachers** — Heidi, Patrick and Denajdër's one-minute briefs, all visible
  on one page with no clicks required: what to do next (linked to the
  relevant domain), what not to repeat, mistakes to correct, a suggested
  60-minute session plan, and their most recent lessons.
- **Lesson logs** — full history, filterable by teacher, each entry showing
  concrete vocabulary, verbs, grammar, mistakes, what Pierre can now do, and
  what to repeat next.

## How the data model works

Everything on the site comes from one file:

```
src/data/progress.ts
```

It exports plain arrays: `skillLevels`, `teachers`, `domains`, `writingTasks`,
`speakingChecklist`, `lessonLogs`, `plannedSessions`, `priorities`,
`recurringMistakes`. Every page reads from these — there's no separate
content to update per page. `src/data/types.ts` documents the shape of each
object; `src/data/reference.ts` holds fixed exam material (speaking
formulas, writing structure) that rarely changes.

A teacher's "do this next" on the Teachers page and Dashboard is **derived**
from `plannedSessions`, not stored separately — add/update a planned session
once and both places update automatically.

## Update the site after a lesson

1. Open `src/data/progress.ts`.
2. Copy this template and append it to the **end** of the `lessonLogs` array:

   ```ts
   {
     id: "l9", // next number in sequence
     date: "2026-07-10",
     teacher: "heidi", // "heidi" | "patrick" | "denajder"
     domains: ["health"], // ids from the `domains` array
     skills: ["sprechen"], // any of: hoeren, lesen, schreiben, sprechen — for filtering only
     practiced: "What you did in the session, one sentence.",
     vocabulary: ["der Termin", "..."],
     verbs: ["anrufen", "..."],
     grammar: ["Word order after 'weil'"],
     mistakes: ["..."],
     canNowDo: "What Pierre can now do that he couldn't before.",
     repeatNext: "What the next session should repeat or build on.",
   },
   ```

   Don't add `isSample: true` — that flag marks placeholder content only.

3. Update the matching domain in `domains[...]`: `status`, `lastPracticed`,
   and `nextAction` if this lesson changed how ready that topic is.
4. If a new mistake came up more than once, add it to `recurringMistakes`.
5. Remove the planned session that just happened from `plannedSessions`, and
   add the next one (with `date`, `teacher`, `domain`, `goal`).
6. If a writing or speaking checklist item changed status, update it in
   `writingTasks` or `speakingChecklist`.
7. Save, commit, and push — the GitHub Action rebuilds and redeploys the
   site automatically (see below).

Everything else (dashboard readiness %, teacher briefs, domain pages) is
computed from these edits — nothing else needs to change.

## How each teacher should use it

Open **Teachers**, read your own one-minute section — brief, what to do
next (click through to the domain to see what other teachers already
covered there), what not to repeat, mistakes to correct, and a 60-minute
session plan. That's the whole workflow; nothing is hidden behind extra
clicks.

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

- "Dénard" and "Denajdër" refer to the same teacher — the site uses
  **Denajdër** throughout.
- The default teacher/domain assignment (Heidi → speaking-heavy domains,
  Patrick → listening/Swiss German, Denajdër → writing/reading) is a
  starting point, not fixed — change `teacher` on any domain, or
  `relatedSkills` on a teacher, any time the division of labour changes.
- Sample lesson dates run through 2026-06-30; planned sessions run from
  2026-07-08 onward. Replace both as real lessons happen.
- Swiss German is tracked as a **passive listening** domain only — Pierre is
  not expected to produce it, per the KDE's Hochdeutsch-only speaking
  requirement.
- Hören and Lesen no longer have dedicated pages (removed in this redesign
  to cut duplication) — their status rolls up into the Dashboard's skill
  summary, and their content lives inside the relevant Domains and the
  Writing/Speaking pages.
