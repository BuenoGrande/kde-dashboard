import { writingStructure } from "../data/reference";
import { writingTasks } from "../data/progress";
import { StatusCard } from "../components/StatusCard";
import { Card, CardHeading } from "../components/Card";
import { STATUS_LABEL } from "../lib/status";

export function Writing() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          A2 · 1 task, 25 minutes, 40–80 words
        </p>
        <h1 className="text-2xl font-semibold text-ink">Writing</h1>
      </div>

      <Card className="bg-canvas">
        <CardHeading title="Structure — every task follows this order" />
        <ol className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-soft">
          {writingStructure.map((s, i) => (
            <li key={s}>
              {i + 1}. {s}
              {i < writingStructure.length - 1 ? " ·" : ""}
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex flex-col gap-3">
        {writingTasks.map((task) => (
          <StatusCard key={task.id} status={task.status}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-ink">{task.label}</h2>
              <span className="text-xs font-medium text-muted">{STATUS_LABEL[task.status]}</span>
            </div>

            {task.mistakes.length > 0 && (
              <p className="mb-2 text-sm text-ink-soft">
                <span className="text-xs font-medium text-muted uppercase">Mistakes: </span>
                {task.mistakes.join("; ")}
              </p>
            )}

            <p className="mb-3 text-sm text-ink-soft">
              <span className="text-xs font-medium text-muted uppercase">Next drill: </span>
              {task.nextDrill}
            </p>

            {task.modelAnswer && (
              <details className="text-sm">
                <summary className="cursor-pointer font-medium text-ink">Model answer</summary>
                <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-surface p-4 font-sans text-ink-soft">
                  {task.modelAnswer}
                </pre>
              </details>
            )}
          </StatusCard>
        ))}
      </div>
    </div>
  );
}
