import { Link } from "react-router-dom";
import {
  domains,
  overallReadiness,
  plannedSessionsSorted,
  priorities,
  recurringMistakes,
  sections,
  sessionsSorted,
  teachers,
} from "../data/progress";
import { Card, CardHeading } from "../components/Card";
import { SectionCard } from "../components/SectionCard";
import { SessionCard } from "../components/SessionCard";
import { Badge } from "../components/Badge";
import { CoverageMatrix } from "../components/CoverageMatrix";
import { StatusLegend } from "../components/StatusLegend";
import { Collapsible } from "../components/Collapsible";

export function Dashboard() {
  const readiness = overallReadiness();
  const upcoming = plannedSessionsSorted().slice(0, 3);
  const recent = sessionsSorted().slice(0, 3);
  const topPriorities = priorities.slice(0, 5);
  const topMistakes = recurringMistakes.filter((m) => m.frequency === "high");

  return (
    <div className="flex flex-col gap-8">
      {/* Exam readiness overview */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              KDE — Kantonaler Deutschtest für die Einbürgerung · Zürich
            </p>
            <h1 className="text-2xl font-semibold text-ink">Exam readiness snapshot</h1>
          </div>
          <span className="font-mono text-3xl font-semibold text-ink">
            {readiness}%
          </span>
        </div>
        <Card className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sections.map((s) => (
            <div key={s.id}>
              <p className="text-xs font-medium text-muted uppercase">{s.label}</p>
              <p className="font-mono text-xl font-semibold text-ink">{s.coverage}%</p>
              <p className="text-xs text-muted">Level {s.level}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* 4 exam-section cards */}
      <section>
        <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
          Exam sections
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <SectionCard key={s.id} section={s} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top priorities */}
        <Card>
          <CardHeading title="Top priorities this week" />
          <ol className="space-y-2 text-sm">
            {topPriorities.map((p) => (
              <li key={p.id} className="flex gap-3">
                <span className="font-mono text-muted">{p.rank}.</span>
                <span className="text-ink-soft">{p.text}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Weak recurring mistakes */}
        <Card>
          <CardHeading title="Weak recurring mistakes" right={<Badge color="red">High frequency</Badge>} />
          <ul className="space-y-3 text-sm">
            {topMistakes.map((m) => (
              <li key={m.id} className="border-l-2 border-status-red-fg/40 pl-3">
                <p className="font-medium text-ink">{m.mistake}</p>
                <p className="text-ink-soft">
                  <span className="text-muted">e.g. </span>
                  {m.example}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next sessions */}
        <Card>
          <CardHeading
            title="Next planned sessions"
            right={
              <Link to="/log" className="text-xs font-medium text-ink underline">
                Full log
              </Link>
            }
          />
          <ul className="space-y-3 text-sm">
            {upcoming.map((p) => (
              <li key={p.id} className="rounded-lg bg-canvas p-3">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted">{p.date}</span>
                  <span className="font-medium text-ink">
                    {teachers.find((t) => t.id === p.teacher)?.name}
                  </span>
                  <Badge color="blue">{p.status}</Badge>
                </div>
                <p className="text-ink-soft">{p.goal}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Teacher focus */}
        <Card>
          <CardHeading
            title="Teacher focus"
            right={
              <Link to="/teachers/brief" className="text-xs font-medium text-ink underline">
                Teacher brief
              </Link>
            }
          />
          <ul className="space-y-3 text-sm">
            {teachers.map((t) => (
              <li key={t.id}>
                <Link to={`/teachers/${t.id}`} className="font-medium text-ink hover:underline">
                  {t.name}
                </Link>
                <p className="text-ink-soft">{t.nextSessionPlan}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recent lesson summaries */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Recent lesson summaries
          </h2>
          <Link to="/log" className="text-xs font-medium text-ink underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {recent.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </section>

      {/* Domain coverage matrix */}
      <section>
        <Card>
          <Collapsible
            summary={
              <div>
                <p className="text-xs font-medium tracking-wide text-muted uppercase">
                  All 12 domains × 7 skills
                </p>
                <h2 className="text-lg font-semibold text-ink">Domain coverage matrix</h2>
              </div>
            }
          >
            <div className="mb-3">
              <StatusLegend />
            </div>
            <CoverageMatrix domains={domains} />
          </Collapsible>
        </Card>
      </section>
    </div>
  );
}
