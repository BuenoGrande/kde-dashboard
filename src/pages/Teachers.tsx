import { Link } from "react-router-dom";
import { domainById, lessonLogsSorted, nextSessionForTeacher, recurringMistakes, teachers } from "../data/progress";
import { Card } from "../components/Card";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-xs font-medium tracking-wide text-muted uppercase">{children}</p>;
}

export function Teachers() {
  const allLogs = lessonLogsSorted();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Read your section in under a minute, before the lesson
          </p>
          <h1 className="text-2xl font-semibold text-ink">Teachers</h1>
        </div>
        <div className="flex gap-3 text-sm">
          {teachers.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="font-medium text-ink underline">
              {t.name}
            </a>
          ))}
        </div>
      </div>

      {teachers.map((t) => {
        const mistakes = recurringMistakes.filter((m) =>
          m.relatedSkills.some((s) => t.relatedSkills.includes(s)),
        );
        const recentLogs = allLogs.filter((l) => l.teacher === t.id).slice(0, 2);
        const next = nextSessionForTeacher(t.id);
        const nextDomain = next ? domainById(next.domain) : undefined;

        return (
          <Card key={t.id} className="scroll-mt-20">
            <div id={t.id} className="mb-4">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">{t.role}</p>
              <h2 className="text-xl font-semibold text-ink">{t.name}</h2>
            </div>

            <p className="mb-4 text-sm text-ink-soft">{t.brief}</p>

            <div className="mb-4 rounded-lg bg-canvas p-4">
              <Label>Do this next</Label>
              {next ? (
                <p className="text-sm text-ink-soft">
                  <span className="font-mono text-xs text-muted">{next.date}</span> — {next.goal}
                  {nextDomain && (
                    <>
                      {" "}
                      <Link to={`/domains/${nextDomain.id}`} className="text-ink underline">
                        ({nextDomain.label})
                      </Link>
                    </>
                  )}
                </p>
              ) : (
                <p className="text-sm text-muted">Nothing scheduled yet.</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Don't repeat</Label>
                <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
                  {t.dontRepeat.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Label>Mistakes to correct</Label>
                <ul className="space-y-1 text-sm text-ink-soft">
                  {mistakes.map((m) => (
                    <li key={m.id}>
                      {m.mistake} <span className="text-muted">— {m.correction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <Label>Suggested 60-minute session plan</Label>
              <p className="text-sm text-ink-soft">{t.sessionPlan}</p>
            </div>

            {recentLogs.length > 0 && (
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <Label>Relevant recent lessons</Label>
                  <Link
                    to={`/logs?teacher=${t.id}`}
                    className="text-xs font-medium text-ink underline"
                  >
                    All lessons with {t.name}
                  </Link>
                </div>
                <ul className="space-y-1.5 text-sm text-ink-soft">
                  {recentLogs.map((l) => (
                    <li key={l.id}>
                      <span className="font-mono text-xs text-muted">{l.date}</span> — {l.practiced}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
