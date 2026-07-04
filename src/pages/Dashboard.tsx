import { Link } from "react-router-dom";
import { Dot } from "../components/Badge";
import { Card, CardHeading } from "../components/Card";
import { CompetencyTile } from "../components/CompetencyTile";
import { examFormatTasks, transcriptAgentOutputs } from "../data/courseContent";
import {
  domains,
  lessonLogsSorted,
  nextPlannedSession,
  priorities,
  skillLevels,
  speakingChecklist,
  teacherById,
  writingTasks,
} from "../data/progress";
import type { Status } from "../data/types";
import {
  STATUS_LABEL,
  STATUS_ORDER,
  readinessFromStatuses,
  statusBadgeClasses,
  statusCounts,
} from "../lib/status";

interface BoardSummaryProps {
  title: string;
  href: string;
  statusItems: { id: string; label: string; status: Status }[];
  detail: string;
}

function BoardSummary({ title, href, statusItems, detail }: BoardSummaryProps) {
  const counts = statusCounts(statusItems);
  const readiness = readinessFromStatuses(statusItems);

  return (
    <Link
      to={href}
      className="block rounded-lg border border-border bg-surface p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-28px_rgba(36,44,39,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{detail}</p>
        </div>
        <span className="font-mono text-2xl font-semibold text-ink">{readiness}%</span>
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {statusItems.slice(0, 10).map((item) => (
          <span key={item.id} title={STATUS_LABEL[item.status]}>
            <Dot status={item.status} />
          </span>
        ))}
      </div>
      <div className="mb-3 space-y-1.5 text-xs text-ink-soft">
        {statusItems
          .filter((item) => item.status !== "ready")
          .slice(0, 2)
          .map((item) => (
            <p key={item.id} className="truncate">
              <span className="font-semibold text-muted">{STATUS_LABEL[item.status]}:</span> {item.label}
            </p>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-[0.68rem] font-semibold uppercase text-muted">
        {STATUS_ORDER.filter((status) => counts[status] > 0).map((status) => (
          <span key={status} className="rounded-md bg-canvas px-2 py-1">
            {counts[status]} {STATUS_LABEL[status]}
          </span>
        ))}
      </div>
    </Link>
  );
}

function coverageLabel(pct: number) {
  if (pct >= 76) return "Broad coverage";
  if (pct >= 51) return "Building coverage";
  if (pct >= 26) return "Early preparation";
  return "Just starting";
}

export function Dashboard() {
  const next = nextPlannedSession();
  const recentLogs = lessonLogsSorted().slice(0, 3);
  const topPriorities = priorities.slice(0, 4);
  const listeningTasks = examFormatTasks.filter((item) => item.mode === "listening");
  const readingTasks = examFormatTasks.filter((item) => item.mode === "reading");
  const allCompetencies = [
    ...domains.map((item) => ({ id: `domain-${item.id}`, label: item.label, status: item.status })),
    ...writingTasks.map((item) => ({ id: `writing-${item.id}`, label: item.label, status: item.status })),
    ...speakingChecklist.map((item) => ({ id: `speaking-${item.id}`, label: item.label, status: item.status })),
    ...examFormatTasks.map((item) => ({ id: `exam-${item.id}`, label: item.label, status: item.status })),
  ];
  const overall = readinessFromStatuses(allCompetencies);
  const counts = statusCounts(allCompetencies);
  const writtenGate = skillLevels.filter((skill) => ["hoeren", "lesen", "schreiben"].includes(skill.id));
  const oralGate = skillLevels.filter((skill) => skill.id === "sprechen");
  const closestToReady = allCompetencies.filter((item) => item.status === "needs_review").slice(0, 2);
  const watchDomains = domains.filter((domain) => domain.priority === "high" && domain.status !== "ready").slice(0, 3);
  const reviewWriting = writingTasks.filter((task) => task.status !== "ready").slice(0, 2);
  const reviewSpeaking = speakingChecklist.filter((task) => task.status !== "ready").slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden bg-panel">
          <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-muted">Preparation map</p>
              <h1 className="mt-2 text-4xl font-semibold leading-none tracking-tight text-ink">
                {coverageLabel(overall)}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
                One view for Pierre and the teachers. The percentage is study coverage, not
                a KDE pass score; the exam gates below keep Hören, Lesen, Schreiben and
                Sprechen visible.
              </p>
              <div className="mt-4 grid gap-2 text-xs font-semibold uppercase text-muted sm:grid-cols-2">
                <span className="rounded-md bg-surface px-2.5 py-1.5">
                  Written: {readinessFromStatuses(writtenGate)}%
                </span>
                <span className="rounded-md bg-surface px-2.5 py-1.5">
                  Oral: {readinessFromStatuses(oralGate)}%
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-surface p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted">Study coverage</p>
                  <p className="font-mono text-6xl font-semibold leading-none text-ink">{overall}%</p>
                </div>
                <p className="text-right text-sm text-ink-soft">
                  <span className="block font-semibold text-ink">{counts.ready}</span>
                  exam-ready items
                </p>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-accent" style={{ width: `${overall}%` }} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold uppercase text-muted">
                <span className="rounded-md bg-canvas px-2.5 py-1.5">{counts.needs_review} to review</span>
                <span className="rounded-md bg-canvas px-2.5 py-1.5">{counts.not_covered} not covered</span>
                <span className="rounded-md bg-canvas px-2.5 py-1.5">{counts.started} started</span>
                <span className="rounded-md bg-canvas px-2.5 py-1.5">{counts.ready} ready</span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-ink-soft">
                {closestToReady.map((item) => (
                  <p key={item.id}>
                    <span className="font-semibold text-muted">Closest to ready:</span> {item.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeading eyebrow="Next session" title={next ? next.goal : "Nothing scheduled"} />
          {next ? (
            <div className="space-y-3 text-sm text-ink-soft">
              <p>
                <span className="font-mono text-xs text-muted">{next.date}</span>{" "}
                <span className="font-semibold text-ink">{teacherById(next.teacher)?.name}</span>
              </p>
              <Link to={`/domains/${next.domain}`} className="inline-flex rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white transition active:scale-[0.98]">
                Open domain
              </Link>
            </div>
          ) : (
            <p className="text-sm text-muted">Add the next planned session in progress.ts.</p>
          )}
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <BoardSummary
          title="Vocabulary"
          href="/domains"
          statusItems={domains.map((item) => ({ id: item.id, label: item.label, status: item.status }))}
          detail="Topic content: words, questions and scenarios."
        />
        <BoardSummary
          title="Writing"
          href="/exam?track=writing"
          statusItems={writingTasks.map((item) => ({ id: item.id, label: item.label, status: item.status }))}
          detail="Schreiben practice patterns, with KDE model invite task."
        />
        <BoardSummary
          title="Speaking"
          href="/exam?track=speaking"
          statusItems={speakingChecklist.map((item) => ({ id: item.id, label: item.label, status: item.status }))}
          detail="Sprechen drills: introduction, picture card, follow-ups."
        />
        <BoardSummary
          title="Listening"
          href="/exam?track=listening"
          statusItems={listeningTasks.map((item) => ({ id: item.id, label: item.label, status: item.status }))}
          detail="Hören: 4 tasks, numbers, actions and key facts."
        />
        <BoardSummary
          title="Reading"
          href="/exam?track=reading"
          statusItems={readingTasks.map((item) => ({ id: item.id, label: item.label, status: item.status }))}
          detail="Lesen: 4 tasks, notices, ads and official instructions."
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {watchDomains.map((domain, index) => (
            <CompetencyTile
              key={domain.id}
              title={domain.label}
              status={domain.status}
              meta="High priority domain"
              detail={domain.nextAction}
              to={`/domains/${domain.id}`}
              index={index}
            />
          ))}
          {reviewWriting.map((task, index) => (
            <CompetencyTile
              key={task.id}
              title={task.label}
              status={task.status}
              meta="Writing drill"
              detail={task.nextDrill}
              to={`/exam?track=writing&item=${task.id}`}
              index={index + watchDomains.length}
            />
          ))}
          {reviewSpeaking.map((task, index) => (
            <CompetencyTile
              key={task.id}
              title={task.label}
              status={task.status}
              meta="Speaking drill"
              detail={task.note}
              to={`/exam?track=speaking&item=${task.id}`}
              index={index + watchDomains.length + reviewWriting.length}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeading eyebrow="Study next" title="Highest leverage tasks" />
            <ol className="space-y-3 text-sm text-ink-soft">
              {topPriorities.map((priority) => (
                <li key={priority.id} className="flex gap-3">
                  <span className="font-mono text-xs text-muted">{priority.rank}</span>
                  <span>{priority.text}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="bg-agent-teacher">
            <CardHeading eyebrow="Transcript agent" title="After every lesson" />
            <div className="grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
              {transcriptAgentOutputs.slice(0, 6).map((item) => (
                <p key={item} className="rounded-lg bg-surface/80 px-3 py-2">
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeading eyebrow="Current levels" title="Skill targets tracked by the dashboard" />
          <div className="grid gap-2">
            {skillLevels.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between rounded-lg bg-canvas px-3 py-2">
                <span className="font-semibold text-ink">{skill.label}</span>
                <span className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${statusBadgeClasses(skill.status)}`}>
                  {skill.level} · {STATUS_LABEL[skill.status]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-muted">Recent lessons</p>
              <h2 className="text-lg font-semibold leading-tight tracking-tight text-ink">Evidence from the logs</h2>
            </div>
            <Link to="/logs" className="text-xs font-semibold uppercase text-ink hover:underline">
              Full log
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
            {recentLogs.map((log) => (
              <li key={log.id} className="border-l-2 border-border pl-3">
                <span className="font-mono text-xs text-muted">{log.date}</span>{" "}
                <span className="font-semibold text-ink">{teacherById(log.teacher)?.name}</span>
                <span className="text-ink-soft">: {log.practiced}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
