import type { LessonLog } from "../data/types";
import { domainById, teacherById } from "../data/progress";

export function LessonLogCard({ log }: { log: LessonLog }) {
  const teacher = teacherById(log.teacher);
  const domainLabels = log.domains.map((id) => domainById(id)?.label).join(", ");

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span className="font-mono text-xs text-muted">{log.date}</span>
          <span className="font-medium text-ink">{teacher?.name}</span>
          <span className="text-muted">· {domainLabels}</span>
        </div>
      </div>

      <p className="mb-3 text-sm text-ink-soft">{log.practiced}</p>

      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-muted uppercase">New vocabulary</dt>
          <dd className="text-ink-soft">{log.vocabulary.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted uppercase">Useful verbs</dt>
          <dd className="text-ink-soft">{log.verbs.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted uppercase">Grammar</dt>
          <dd className="text-ink-soft">{log.grammar.join("; ")}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted uppercase">Mistakes to correct</dt>
          <dd className="text-ink-soft">{log.mistakes.join("; ")}</dd>
        </div>
      </dl>

      <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm">
        <p>
          <span className="text-xs font-medium text-muted uppercase">Pierre can now: </span>
          <span className="text-ink-soft">{log.canNowDo}</span>
        </p>
        <p>
          <span className="text-xs font-medium text-muted uppercase">Repeat next: </span>
          <span className="text-ink-soft">{log.repeatNext}</span>
        </p>
      </div>
    </div>
  );
}
