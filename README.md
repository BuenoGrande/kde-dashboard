# KDE Prep — Pierre's Command Center

A calm, static coordination dashboard for Pierre's preparation for the **KDE
(Kantonaler Deutschtest für die Einbürgerung)**, Canton of Zürich, shared
between Pierre and his three teachers (Heidi, Patrick, Denajdër).

It answers six questions, nothing more: Is Pierre ready? What's covered?
What's weak? What should the next teacher do? What happened recently? What
vocabulary/verbs/grammar/mistakes came out of each lesson?

The checked-in lesson history now contains real transcript-derived session
notes only. Future lessons should be appended with the same evidence-first
style — see below.

## Design principle: one visible coverage state

The app may keep detailed internal status keys for planning, but the student
and teacher interface collapses them into one simple question: has Pierre
covered this yet?

| Visible state | Internal data | Meaning |
|---|---|---|
| Covered | `started`, `needs_review`, `ready` | It appeared in a completed lesson or was attempted. |
| To cover | `not_covered`, `planned` | No completed-lesson evidence yet. |

There is no skill-by-skill (Hören/Lesen/Schreiben/Sprechen) breakdown per
domain — the real question for most topics is just "can Pierre handle this
in German, yes or no." Writing and Speaking get their own pages because the
exam needs concrete task/format competence there, not a general topic score.

## KDE public model facts encoded here

The exam-format page follows the public KDE model material from Kanton Zürich:

- Hören: 4 tasks, 15 minutes.
- Lesen: 4 tasks, 35 minutes.
- Schreiben: 1 task, 25 minutes, total ca. 40 Wörter.
- The writing model is an invitation task; the other writing cards are A2
  practice patterns, not claimed as confirmed KDE task types.
- The oral-prep cards are training scaffolds for self-introduction,
  scenario/picture-card speaking and follow-up questions.

Sources: [Kanton Zürich KDE model test](https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/migration-integration/einbuergerung/kde/kde_modell_test.pdf)
and [KDE test-provider regulation](https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/migration-integration/einbuergerung/kde/reglement_gemeinden_testanbieter_kde_okt_2021.pdf).

## Pages

- **Dashboard** — one overview for vocabulary domains plus Hören, Lesen,
  Schreiben and Sprechen practice: covered, to cover, next session,
  high-priority drills, recent evidence and transcript
  agent outputs.
- **Vocabulary** — 15 life domains as a 2D grid of boxes; each click opens a
  mini-course with vocabulary, likely questions, scenarios, professor/student
  feedback, teacher, next drill and recent lessons.
- **Exam practice** — one page for Writing, Speaking, Listening and Reading.
  Each track has clickable competency boxes and a practice sheet for the
  selected task. Old `/writing` and `/speaking` links redirect here.
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
`recurringMistakes`. `src/data/courseContent.ts` adds the pedagogical layer:
domain vocabulary, questions, scenarios, writing/speaking/listening/reading mini
courses, and the professor/student feedback loops. `src/data/types.ts`
documents the core shapes; `src/data/reference.ts` holds fixed exam material
(speaking formulas, writing structure) that rarely changes.

A teacher's "do this next" on the Teachers page and Dashboard is **derived**
from `plannedSessions`, not stored separately — add/update a planned session
once and both places update automatically.

## Update the site after a lesson

1. Open `src/data/progress.ts`.
2. Copy this template and append it to the **end** of the `lessonLogs` array:

   ```ts
   {
     id: "l17", // next number in sequence
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

3. Update the matching domain in `domains[...]`: `status`, `lastPracticed`,
   and `nextAction` if this lesson changed how ready that topic is.
4. If a new mistake came up more than once, add it to `recurringMistakes`.
5. Remove the planned session that just happened from `plannedSessions`, and
   add the next one (with `date`, `teacher`, `domain`, `goal`).
6. If a writing or speaking checklist item changed status, update it in
   `writingTasks` or `speakingChecklist`. If reading/listening changed, update
   the matching listening or reading entry in `examFormatTasks` inside
   `src/data/courseContent.ts`.
7. Save, commit, and push — the GitHub Action rebuilds and redeploys the
   site automatically (see below).

Everything else (dashboard readiness %, teacher briefs, domain pages) is
computed from these edits — nothing else needs to change.

## Transcript reviewer agent

Use `agents/kde-transcript-reviewer.md` after every lesson. Paste the lesson
transcript, chat and documents into that prompt. It returns evidence, validated
competencies, errors, vocabulary, a draft `lessonLogs` entry and suggested
status updates.

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
- Lesson logs should only contain real transcript-derived sessions. Planned
  sessions run from 2026-07-08 onward and should be replaced as real lessons
  happen.
- Swiss German is tracked as a **passive listening strategy for Pierre** in
  this dashboard. It is not presented as a general KDE rule about what every
  candidate must or must not produce.
- Hören and Lesen no longer have dedicated pages — their status rolls up into
  the Dashboard's skill summary, and their course content lives under
  **Exam practice → Listening / Reading** plus the relevant vocabulary domains.
