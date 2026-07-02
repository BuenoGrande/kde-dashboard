import { Link } from "react-router-dom";
import { domains, plannedSessions, teacherById } from "../data/progress";
import { StatusCard } from "../components/StatusCard";
import { STATUS_LABEL } from "../lib/status";

const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

export function Domains() {
  const sorted = [...domains].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.label.localeCompare(b.label),
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Can Pierre handle this topic in German? — one status per domain
        </p>
        <h1 className="text-2xl font-semibold text-ink">Domains</h1>
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((d) => {
          const planned = plannedSessions.find((p) => p.domain === d.id);
          return (
            <Link key={d.id} to={`/domains/${d.id}`} className="block">
              <StatusCard status={d.status} className="transition-opacity hover:opacity-90">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-ink">{d.label}</h2>
                      {d.priority === "high" && (
                        <span className="text-xs text-muted">High priority</span>
                      )}
                      {planned && (
                        <span className="rounded-full bg-status-blue-bg px-2 py-0.5 text-xs font-medium text-status-blue-fg">
                          Planned {planned.date}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">{d.nextAction}</p>
                  </div>
                  <div className="shrink-0 text-right text-xs text-muted">
                    <p className="font-medium">{STATUS_LABEL[d.status]}</p>
                    <p>{teacherById(d.teacher)?.name}</p>
                  </div>
                </div>
              </StatusCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
