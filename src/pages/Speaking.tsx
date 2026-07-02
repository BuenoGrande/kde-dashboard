import { Link } from "react-router-dom";
import { repairPhrases, selfIntroductionPoints, speakingStructure } from "../data/reference";
import { domains, lessonLogsSorted, speakingChecklist } from "../data/progress";
import { StatusCard } from "../components/StatusCard";
import { Card, CardHeading } from "../components/Card";
import { LessonLogCard } from "../components/LessonLogCard";
import { STATUS_LABEL } from "../lib/status";

export function Speaking() {
  const priorityDomains = domains.filter((d) => d.priority === "high");
  const recentSpeakingLogs = lessonLogsSorted()
    .filter((l) => l.skills.includes("sprechen"))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          B1 · 15–20 minutes, two candidates, two examiners
        </p>
        <h1 className="text-2xl font-semibold text-ink">Speaking</h1>
      </div>

      <div className="flex flex-col gap-3">
        {speakingChecklist.map((item) => (
          <StatusCard key={item.id} status={item.status}>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-ink">{item.label}</h2>
              <span className="text-xs font-medium text-muted">{STATUS_LABEL[item.status]}</span>
            </div>
            <p className="text-sm text-ink-soft">{item.note}</p>
            {item.id === "self-introduction" && (
              <p className="mt-2 text-sm text-ink-soft">
                <span className="text-xs font-medium text-muted uppercase">Covers: </span>
                {selfIntroductionPoints.join(", ")}
              </p>
            )}
          </StatusCard>
        ))}
      </div>

      <Card className="bg-canvas">
        <CardHeading title="Picture-card structure" />
        <ol className="space-y-1.5 text-sm text-ink-soft">
          {speakingStructure.map((s, i) => (
            <li key={s}>
              <span className="font-mono text-muted">{i + 1}.</span>{" "}
              <span className="italic">&ldquo;{s}&rdquo;</span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeading title="Repair phrases" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {repairPhrases.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeading title="Priority speaking domains" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {priorityDomains.map((d) => (
              <li key={d.id}>
                <Link to={`/domains/${d.id}`} className="hover:underline">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {recentSpeakingLogs.length > 0 && (
        <section>
          <CardHeading title="Recent speaking lessons" />
          <div className="grid gap-4 lg:grid-cols-2">
            {recentSpeakingLogs.map((l) => (
              <LessonLogCard key={l.id} log={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
