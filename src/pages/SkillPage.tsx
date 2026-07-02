import { Link } from "react-router-dom";
import type { SkillId } from "../data/types";
import {
  domainById,
  domains,
  recurringMistakes,
  sectionById,
  sessions,
  teacherById,
} from "../data/progress";
import {
  examOverview,
  listeningTrainingSituations,
  readingTrainingTexts,
  selfIntroductionPoints,
  speakingDomains,
  speakingStructure,
  writingModelTask,
  writingStructure,
  writingTaskFamilies,
} from "../data/reference";
import { Card, CardHeading } from "../components/Card";
import { Badge } from "../components/Badge";
import { ProgressBar } from "../components/ProgressBar";
import { CoverageMatrix } from "../components/CoverageMatrix";
import { SessionCard } from "../components/SessionCard";
import { STATUS_COLOR_LABEL } from "../lib/status";

export function SkillPage({ sectionId }: { sectionId: SkillId }) {
  const section = sectionById(sectionId)!;
  const relatedSessions = sessions
    .filter((s) => s.sections.includes(sectionId))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const relatedMistakes = recurringMistakes.filter((m) =>
    m.relatedSections.includes(sectionId),
  );
  const teacherNames = section.assignedTeachers
    .map((id) => teacherById(id)?.name)
    .join(", ");

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              {section.labelEn} · Required level {section.level}
            </p>
            <h1 className="text-2xl font-semibold text-ink">{section.label}</h1>
          </div>
          <Badge color={section.status}>{STATUS_COLOR_LABEL[section.status]}</Badge>
        </div>
        <Card>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="mb-1 text-xs font-medium text-muted uppercase">Official format</p>
              <p className="text-ink-soft">{section.format}</p>
            </div>
            <div className="sm:w-48">
              <div className="mb-1 flex justify-between text-xs text-muted">
                <span>Coverage</span>
                <span className="font-mono">{section.coverage}%</span>
              </div>
              <ProgressBar value={section.coverage} color={section.status} />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Teacher currently responsible: {teacherNames}
          </p>
        </Card>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Strengths" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {section.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeading title="Weaknesses" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {section.weaknesses.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Next drills" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {section.nextActions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeading title="Example task types" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {section.exampleTaskTypes.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
      </div>

      {sectionId === "hoeren" && <HoerenExtra />}
      {sectionId === "lesen" && <LesenExtra />}
      {sectionId === "schreiben" && <SchreibenExtra mistakes={relatedMistakes} />}
      {sectionId === "sprechen" && <SprechenExtra mistakes={relatedMistakes} />}

      <section>
        <CardHeading title="Coverage across domains" />
        <Card>
          <CoverageMatrix domains={domains} />
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Recent sessions covering {section.label}
          </h2>
          <Link to="/log" className="text-xs font-medium text-ink underline">
            Full log
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {relatedSessions.length ? (
            relatedSessions.map((s) => <SessionCard key={s.id} session={s} />)
          ) : (
            <p className="text-sm text-muted">No sessions logged yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function HoerenExtra() {
  const swissGerman = domainById("swiss-german")!;
  return (
    <section>
      <Card>
        <CardHeading
          title="Swiss German listening status"
          right={<Badge color="orange">High priority</Badge>}
        />
        <p className="mb-3 text-sm text-ink-soft">{swissGerman.latestNote}</p>
        <p className="mb-1 text-xs font-medium text-muted uppercase">Training situations</p>
        <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
          {listeningTrainingSituations.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

function LesenExtra() {
  return (
    <section>
      <Card>
        <CardHeading title="Scanning ability & training texts" />
        <p className="mb-3 text-sm text-ink-soft">
          Focus: scanning for dates, times, places, instructions and services —
          not full-text comprehension.
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
          {readingTrainingTexts.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

function SchreibenExtra({ mistakes }: { mistakes: typeof recurringMistakes }) {
  return (
    <>
      <section>
        <Card>
          <CardHeading title="Writing structure" />
          <ol className="grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
            {writingStructure.map((s, i) => (
              <li key={s} className="flex gap-2">
                <span className="font-mono text-muted">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeading title="Task types covered / to cover" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {writingTaskFamilies.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeading
            title="Model answer"
            right={<span className="text-xs text-muted">{writingModelTask.wordCount} words</span>}
          />
          <p className="mb-3 text-sm text-ink-soft">{writingModelTask.prompt}</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-canvas p-4 font-sans text-sm text-ink-soft">
            {writingModelTask.model}
          </pre>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeading title="Corrected recurring mistakes" />
          <ul className="space-y-2 text-sm">
            {mistakes.map((m) => (
              <li key={m.id}>
                <span className="text-ink-soft line-through opacity-70">{m.example}</span>
                {" → "}
                <span className="text-ink">{m.correction}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </>
  );
}

function SprechenExtra({ mistakes }: { mistakes: typeof recurringMistakes }) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Self-introduction" right={<Badge color="yellow">Improving</Badge>} />
          <p className="mb-2 text-sm text-ink-soft">Covers: {selfIntroductionPoints.join(", ")}.</p>
          <p className="text-sm text-ink-soft">
            Runs fluently up to 90 seconds; needs a natural closing line to reach the full 2 minutes.
          </p>
        </Card>
        <Card>
          <CardHeading title="Picture-card topic" right={<Badge color="orange">Needs work</Badge>} />
          <p className="mb-2 text-sm text-ink-soft">Domains trained: leisure/clubs (once).</p>
          <p className="text-sm text-ink-soft">
            First attempt ran under time (3 of 5 min); giving a personal opinion (step 3) is the
            weakest link.
          </p>
        </Card>
      </div>
      <section>
        <Card>
          <CardHeading title="Speaking structure" />
          <ol className="space-y-2 text-sm text-ink-soft">
            {speakingStructure.map((s, i) => (
              <li key={s} className="flex gap-2">
                <span className="font-mono text-muted">{i + 1}.</span>
                <span className="italic">&ldquo;{s}&rdquo;</span>
              </li>
            ))}
          </ol>
        </Card>
      </section>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Follow-up question readiness" />
          <p className="text-sm text-ink-soft">
            Hesitates when examiners ask spontaneous follow-up questions. Needs targeted drills
            with short repair phrases (e.g. &ldquo;Können Sie die Frage wiederholen?&rdquo;,
            &ldquo;Moment, ich überlege…&rdquo;).
          </p>
        </Card>
        <Card>
          <CardHeading title="Speaking domains to cover" />
          <ul className="grid list-inside list-disc grid-cols-2 gap-x-2 gap-y-1 text-sm text-ink-soft">
            {speakingDomains.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Card>
      </div>
      <section>
        <Card>
          <CardHeading title="Recurring grammar mistakes" />
          <ul className="space-y-2 text-sm">
            {mistakes.map((m) => (
              <li key={m.id}>
                <span className="text-ink-soft line-through opacity-70">{m.example}</span>
                {" → "}
                <span className="text-ink">{m.correction}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
      <section>
        <Card className="bg-canvas">
          <p className="text-xs text-muted">
            Written-exam context (for reference): {examOverview.oral.notes.join(" · ")}
          </p>
        </Card>
      </section>
    </>
  );
}
