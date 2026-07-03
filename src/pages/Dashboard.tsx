import { Link } from "react-router-dom";
import {
  domainStatusCounts,
  domains,
  lessonLogsSorted,
  nextPlannedSession,
  nextSessionForTeacher,
  overallReadiness,
  priorities,
  readinessLabel,
  skillLevels,
  teacherById,
  teachers,
} from "../data/progress";
import { Card } from "../components/Card";
import { STATUS_LABEL } from "../lib/status";

const STATUS_ORDER = ["not_seen", "planned", "seen", "reviewed"] as const;

export function Dashboard() {
  const readiness = overallReadiness();
  const next = nextPlannedSession();
  const counts = domainStatusCounts();
  const watchDomains = domains
    .filter((d) => d.priority === "high" && d.status !== "reviewed")
    .slice(0, 3);
  const recentLogs = lessonLogsSorted().slice(0, 3);
  const latestLog = recentLogs[0];
  const recentWords = [...new Set(recentLogs.flatMap((log) => log.vocabulary))].slice(0, 8);
  const topPriorities = priorities.slice(0, 3);
  const nextFocus =
    domains.find((d) => d.priority === "high" && d.status === "planned") ??
    domains.find((d) => d.status === "planned") ??
    domains.find((d) => d.status === "not_seen") ??
    domains[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          What is the plan?
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-soft">
          Pierre and any teacher should see the next useful action in under 30 seconds.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card className="bg-status-blue-bg">
          <p className="mb-2 text-xs font-medium tracking-wide text-status-blue-fg uppercase">
            Work on this next
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">{nextFocus.label}</h2>
          <p className="mt-2 text-sm text-ink-soft">{nextFocus.nextAction}</p>
          <p className="mt-2 text-xs text-muted">
            Why: {nextFocus.priority === "high" ? "high KDE relevance" : "planned or not seen yet"} ·{" "}
            {STATUS_LABEL[nextFocus.status]}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/trainer" className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white">
              Practice 5 items now
            </Link>
            <Link to={`/domains/${nextFocus.id}`} className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink">
              Open domain
            </Link>
          </div>
        </Card>

        <Card>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
            2-minute teacher brief
          </p>
          <h2 className="text-xl font-semibold text-ink">Phone / voicemail into callback speaking</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Extract caller, reason, time/date, number and action. Then roleplay the callback.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            <span className="font-medium text-ink">Do not repeat:</span> long curriculum overview.
            Use self-introduction only as a 90-second warm-up.
          </p>
        </Card>
      </div>

      {/* 1. KDE readiness snapshot */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              KDE readiness
            </p>
            <p className="text-2xl font-semibold text-ink">{readinessLabel(readiness)}</p>
          </div>
          <span className="font-mono text-4xl font-semibold text-ink">{readiness}%</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4 text-sm">
          {skillLevels.map((s) => (
            <span key={s.id} className="text-ink-soft">
              <span className="font-medium text-ink">{s.label}</span> ({s.level}):{" "}
              {STATUS_LABEL[s.status]}
            </span>
          ))}
        </div>
      </Card>

      {/* 2. Next session */}
      {next && (
        <Card className="bg-status-blue-bg">
          <p className="mb-1 text-xs font-medium tracking-wide text-status-blue-fg uppercase">
            Next session · {next.date}
          </p>
          <p className="text-sm text-ink-soft">
            <span className="font-medium text-ink">{teacherById(next.teacher)?.name}</span> —{" "}
            {next.goal}
          </p>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 3. Domain readiness */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
              Domain readiness
            </h2>
            <Link to="/domains" className="text-xs font-medium text-ink underline">
              All 12 domains
            </Link>
          </div>
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
            {STATUS_ORDER.map((s) => (
              <span key={s}>
                <span className="font-medium text-ink">{counts[s] ?? 0}</span> {STATUS_LABEL[s]}
              </span>
            ))}
          </div>
          {watchDomains.length > 0 && (
            <>
              <p className="mb-1.5 text-xs font-medium text-muted uppercase">Needs attention</p>
              <ul className="space-y-1 text-sm">
                {watchDomains.map((d) => (
                  <li key={d.id}>
                    <Link to={`/domains/${d.id}`} className="text-ink-soft hover:underline">
                      {d.label} — <span className="text-muted">{STATUS_LABEL[d.status]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        {/* 4. Top priorities */}
        <Card>
          <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
            Top priorities
          </h2>
          <ol className="space-y-2 text-sm">
            {topPriorities.map((p) => (
              <li key={p.id} className="flex gap-2">
                <span className="font-mono text-muted">{p.rank}.</span>
                <span className="text-ink-soft">{p.text}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Coverage map
          </h2>
          <Link to="/domains" className="text-xs font-medium text-ink underline">
            Update statuses
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain) => (
            <Link
              key={domain.id}
              to={`/domains/${domain.id}`}
              className="rounded-lg border border-border bg-canvas p-3 transition-opacity hover:opacity-80"
            >
              <p className="text-sm font-medium text-ink">{domain.label}</p>
              <p className="mt-1 text-xs text-muted">{STATUS_LABEL[domain.status]}</p>
            </Link>
          ))}
        </div>
      </Card>

      {/* 5. Recent lesson logs */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Recent lesson logs
          </h2>
          <Link to="/logs" className="text-xs font-medium text-ink underline">
            Full log
          </Link>
        </div>
        <ul className="space-y-2 text-sm">
          {recentLogs.map((l) => (
            <li key={l.id}>
              <span className="font-mono text-xs text-muted">{l.date}</span>{" "}
              <span className="font-medium text-ink">{teacherById(l.teacher)?.name}</span>
              <span className="text-ink-soft"> — {l.practiced}</span>
            </li>
          ))}
        </ul>
      </Card>

      {latestLog && (
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
              Recently learned
            </h2>
            <Link to="/logs" className="text-xs font-medium text-ink underline">
              Lesson logs
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentWords.map((word) => (
              <span key={word} className="rounded-md bg-canvas px-2 py-1 text-sm text-ink-soft">
                {word}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-soft">{latestLog.canNowDo}</p>
        </Card>
      )}

      {/* 6. Teacher briefs */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Teacher briefs
          </h2>
          <Link to="/teachers" className="text-xs font-medium text-ink underline">
            Full briefs
          </Link>
        </div>
        <ul className="space-y-2 text-sm">
          {teachers.map((t) => {
            const next = nextSessionForTeacher(t.id);
            return (
              <li key={t.id}>
                <span className="font-medium text-ink">{t.name}</span>
                <span className="text-ink-soft">
                  {" "}
                  — {next ? next.goal : "Nothing scheduled yet."}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
