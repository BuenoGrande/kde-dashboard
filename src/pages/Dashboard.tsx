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

const STATUS_ORDER = ["not_covered", "started", "needs_review", "ready"] as const;

export function Dashboard() {
  const readiness = overallReadiness();
  const next = nextPlannedSession();
  const counts = domainStatusCounts();
  const watchDomains = domains
    .filter((d) => d.priority === "high" && d.status !== "ready")
    .slice(0, 3);
  const recentLogs = lessonLogsSorted().slice(0, 3);
  const topPriorities = priorities.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
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
