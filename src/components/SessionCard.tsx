import type { Session } from "../data/types";
import { domainById, sectionById, teacherById } from "../data/progress";
import { Badge } from "./Badge";

export function SessionCard({ session }: { session: Session }) {
  const teacher = teacherById(session.teacher);
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-mono text-xs text-muted">{session.date}</span>
          <span className="font-medium text-ink">{teacher?.name}</span>
          <span className="text-xs text-muted">· {session.duration} min</span>
          {session.isSample && (
            <Badge color="blue">Sample</Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {session.sections.map((id) => (
            <span
              key={id}
              className="rounded-full bg-canvas px-2 py-0.5 text-xs text-ink-soft"
            >
              {sectionById(id)?.label}
            </span>
          ))}
        </div>
      </div>

      <p className="mb-1 text-xs font-medium text-muted uppercase">
        {session.domains.map((id) => domainById(id)?.label).join(", ")}
      </p>
      <p className="mb-3 text-sm text-ink-soft">{session.covered}</p>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-medium text-status-green-fg uppercase">Went well</p>
          <ul className="list-inside list-disc space-y-0.5 text-ink-soft">
            {session.wentWell.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-status-red-fg uppercase">Struggled with</p>
          <ul className="list-inside list-disc space-y-0.5 text-ink-soft">
            {session.strugglesWith.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      {session.vocabulary.length > 0 && (
        <p className="mt-3 text-sm text-ink-soft">
          <span className="text-xs font-medium text-muted uppercase">New vocabulary: </span>
          {session.vocabulary.join(", ")}
        </p>
      )}

      <p className="mt-3 rounded-lg bg-canvas px-3 py-2 text-sm text-ink-soft">
        <span className="text-xs font-medium text-muted uppercase">Next: </span>
        {session.recommendedNext}
      </p>
    </div>
  );
}
