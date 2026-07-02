import {
  overallReadiness,
  plannedSessionsSorted,
  priorities,
  recurringMistakes,
  sections,
  sessionsSorted,
  teachers,
} from "../data/progress";
import { Card, CardHeading } from "../components/Card";
import { Badge } from "../components/Badge";
import { STATUS_COLOR_LABEL } from "../lib/status";

export function TeacherBrief() {
  const recent = sessionsSorted().slice(0, 3);
  const upcoming = plannedSessionsSorted().slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Read this in 2 minutes before any lesson
        </p>
        <h1 className="text-2xl font-semibold text-ink">Teacher brief</h1>
      </div>

      <Card>
        <CardHeading title="Where Pierre stands" right={<span className="font-mono text-lg">{overallReadiness()}% overall</span>} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {sections.map((s) => (
            <div key={s.id} className="rounded-lg bg-canvas p-3">
              <p className="text-xs font-medium text-muted uppercase">{s.label}</p>
              <Badge color={s.status}>{STATUS_COLOR_LABEL[s.status]}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeading title="Top 3 priorities right now" />
        <ol className="space-y-1.5 text-sm">
          {priorities.slice(0, 3).map((p) => (
            <li key={p.id} className="flex gap-2">
              <span className="font-mono text-muted">{p.rank}.</span>
              <span className="text-ink-soft">{p.text}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardHeading title="Don't repeat these — already covered recently" />
        <ul className="space-y-1.5 text-sm text-ink-soft">
          {recent.map((s) => (
            <li key={s.id}>
              <span className="font-mono text-xs text-muted">{s.date}</span> — {s.covered}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardHeading title="Correct these mistakes if they come up" />
        <ul className="space-y-1.5 text-sm text-ink-soft">
          {recurringMistakes.map((m) => (
            <li key={m.id}>
              <span className="text-ink">{m.mistake}</span>
              <span className="text-muted"> — {m.correction}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardHeading title="Next planned sessions, by teacher" />
        <div className="grid gap-3 sm:grid-cols-2">
          {teachers.map((t) => {
            const own = upcoming.filter((p) => p.teacher === t.id);
            return (
              <div key={t.id} className="rounded-lg bg-canvas p-3">
                <p className="mb-1 text-sm font-medium text-ink">{t.name}</p>
                {own.length ? (
                  own.map((p) => (
                    <p key={p.id} className="text-sm text-ink-soft">
                      <span className="font-mono text-xs text-muted">{p.date}</span> — {p.goal}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-muted">Nothing scheduled yet.</p>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
