import { Link } from "react-router-dom";
import { Card, CardHeading } from "../components/Card";
import { CompetencyTile } from "../components/CompetencyTile";
import { examFormatTasks } from "../data/courseContent";
import {
  domains,
  domainCoverageStatus,
  lessonLogsSorted,
  nextSessionForTeacher,
  plannedSessionsSorted,
  priorities,
  recurringMistakes,
  skillLevels,
  speakingChecklist,
  teacherById,
  teachers,
  writingTasks,
} from "../data/progress";
import type { Status } from "../data/types";
import {
  STATUS_LABEL,
  coveredStatus,
  coverageCounts,
  readinessFromStatuses,
  statusBadgeClasses,
} from "../lib/status";

interface BoardSummaryProps {
  title: string;
  href: string;
  statusItems: { id: string; label: string; status: Status }[];
  detail: string;
}

function coverageTone(pct: number) {
  if (pct >= 76) {
    return {
      card: "border-status-green-fg/45 bg-status-green-bg/90",
      bar: "bg-status-green-fg",
      text: "text-status-green-fg",
      label: "solid",
    };
  }
  if (pct >= 51) {
    return {
      card: "border-status-teal-fg/45 bg-status-teal-bg/90",
      bar: "bg-status-teal-fg",
      text: "text-status-teal-fg",
      label: "real progress",
    };
  }
  if (pct >= 26) {
    return {
      card: "border-status-orange-fg/45 bg-status-orange-bg/90",
      bar: "bg-status-orange-fg",
      text: "text-status-orange-fg",
      label: "in motion",
    };
  }
  return {
    card: "border-status-grey-fg/35 bg-status-grey-bg/90",
    bar: "bg-status-grey-fg",
    text: "text-status-grey-fg",
    label: "mapped",
  };
}

function BoardSummary({ title, href, statusItems, detail }: BoardSummaryProps) {
  const coverage = coverageCounts(statusItems);
  const readiness = readinessFromStatuses(statusItems);
  const tone = coverageTone(readiness);

  return (
    <Link
      to={href}
      className={`block rounded-lg border p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-28px_rgba(36,44,39,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${tone.card}`}
    >
      <div className="flex min-h-28 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-muted">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{detail}</p>
          </div>
          <span className="font-mono text-3xl font-semibold leading-none text-ink">{readiness}%</span>
        </div>
        <div className="mt-auto pt-4">
          <div className="h-2 overflow-hidden rounded-full bg-surface/80">
            <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${readiness}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.68rem] font-semibold uppercase text-muted">
            <span className={`mr-1 ${tone.text}`}>{tone.label}</span>
            <span className="rounded bg-surface/62 px-1.5 py-0.5 leading-tight">{coverage.covered} covered</span>
            <span className="rounded bg-surface/62 px-1.5 py-0.5 leading-tight">{coverage.toCover} to cover</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-ink-soft">
        {statusItems
          .filter((item) => coveredStatus(item.status) !== "ready")
          .slice(0, 2)
          .map((item) => (
            <p key={item.id} className="line-clamp-1">
              <span className="font-semibold text-muted">To cover:</span> {item.label}
            </p>
          ))}
      </div>
    </Link>
  );
}

function NextLessonsByTeacher() {
  return (
    <Card>
      <CardHeading eyebrow="Next lessons" title="One clear mission per teacher" />
      <div className="grid gap-3">
        {teachers.map((teacher) => {
          const next = nextSessionForTeacher(teacher.id);

          return (
            <div key={teacher.id} className="rounded-lg border-l-4 border-border bg-canvas px-3 py-3">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-ink">{teacher.name} mission</p>
                {next && <span className="font-mono text-xs text-muted">{next.date}</span>}
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">
                {next ? next.goal : "No lesson scheduled yet."}
              </p>
              {next && (
                <Link
                  to={`/domains/${next.domain}`}
                  className="mt-2 inline-flex text-xs font-semibold uppercase text-ink hover:underline"
                >
                  Open mission
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function coverageLabel(pct: number) {
  if (pct >= 76) return "Broad coverage";
  if (pct >= 51) return "Real progress";
  if (pct >= 26) return "Active preparation";
  return "Mapped, ready to start";
}

function progressWidth(status: Status) {
  if (status === "ready") return "100%";
  if (status === "needs_review") return "70%";
  if (status === "started") return "44%";
  if (status === "planned") return "22%";
  return "10%";
}

function SkillLane({ label, level, status }: { label: string; level: string; status: Status }) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface/72 px-3 py-2.5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-semibold leading-tight text-ink">{label}</span>
        <span className={`rounded-md px-2 py-1 text-[0.68rem] font-semibold uppercase ${statusBadgeClasses(status)}`}>
          {level} · {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border/80">
        <div className="h-full rounded-full bg-ink/72" style={{ width: progressWidth(status) }} />
      </div>
    </div>
  );
}

export function Dashboard() {
  const recentLogs = lessonLogsSorted().slice(0, 3);
  const topPriorities = priorities.slice(0, 4);
  const secondaryPriorities = priorities.slice(4, 6);
  const listeningTasks = examFormatTasks.filter((item) => item.mode === "listening");
  const readingTasks = examFormatTasks.filter((item) => item.mode === "reading");
  const allCompetencies = [
    ...domains.map((item) => ({ id: `domain-${item.id}`, label: item.label, status: domainCoverageStatus(item.id) })),
    ...writingTasks.map((item) => ({ id: `writing-${item.id}`, label: item.label, status: item.status })),
    ...speakingChecklist.map((item) => ({ id: `speaking-${item.id}`, label: item.label, status: item.status })),
    ...examFormatTasks.map((item) => ({ id: `exam-${item.id}`, label: item.label, status: item.status })),
  ];
  const overall = readinessFromStatuses(allCompetencies);
  const coverage = coverageCounts(allCompetencies);
  const writtenGate = skillLevels.filter((skill) => ["hoeren", "lesen", "schreiben"].includes(skill.id));
  const oralGate = skillLevels.filter((skill) => skill.id === "sprechen");
  const toCoverSoon = allCompetencies.filter((item) => coveredStatus(item.status) !== "ready").slice(0, 2);
  const watchDomains = domains.filter((domain) => domain.priority === "high" && domain.status !== "ready").slice(0, 3);
  const reviewWriting = writingTasks.filter((task) => task.status !== "ready").slice(0, 2);
  const reviewSpeaking = speakingChecklist.filter((task) => task.status !== "ready").slice(0, 2);
  const preparationPath = ["personal-profile", "health", "gemeinde", "swiss-german"]
    .map((id) => domains.find((domain) => domain.id === id))
    .filter((domain): domain is (typeof domains)[number] => Boolean(domain));
  const upcomingSessions = plannedSessionsSorted().slice(0, 3);
  const focusSteps = [
    { label: topPriorities[0]?.text, href: "/exam?track=speaking" },
    { label: watchDomains[0]?.nextAction, href: watchDomains[0] ? `/domains/${watchDomains[0].id}` : "/domains" },
    { label: reviewWriting[0]?.nextDrill, href: reviewWriting[0] ? `/exam?track=writing&item=${reviewWriting[0].id}` : "/exam" },
  ].filter((item): item is { label: string; href: string } => Boolean(item.label));
  const activeMistakes = recurringMistakes.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden bg-panel">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex min-h-full flex-col">
              <p className="text-xs font-semibold uppercase text-muted">Preparation map</p>
              <h1 className="mt-2 text-4xl font-semibold leading-none tracking-tight text-ink">
                {coverageLabel(overall)}
              </h1>
              <div className="mt-4 grid gap-2 text-xs font-semibold uppercase text-muted sm:grid-cols-2">
                <span className="rounded-md bg-surface px-2.5 py-1.5">
                  Written: {readinessFromStatuses(writtenGate)}%
                </span>
                <span className="rounded-md bg-surface px-2.5 py-1.5">
                  Oral: {readinessFromStatuses(oralGate)}%
                </span>
              </div>
              <div className="mt-6 rounded-lg border border-border/80 bg-surface/72 p-4">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">Preparation path</p>
                    <p className="mt-1 text-sm font-semibold text-ink">Four moves to exam-ready</p>
                  </div>
                  <span className="font-mono text-xs text-muted">{preparationPath.length} tracks</span>
                </div>
                <div className="space-y-2">
                  {preparationPath.map((domain, index) => (
                    <Link
                      key={domain.id}
                      to={`/domains/${domain.id}`}
                      className="group grid grid-cols-[1.75rem_1fr] gap-3 rounded-md px-1.5 py-1.5 transition duration-200 hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas font-mono text-[0.68rem] font-semibold text-muted">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center justify-between gap-2">
                          <span className="line-clamp-1 text-sm font-semibold text-ink">{domain.label}</span>
                          <span className="text-[0.68rem] font-semibold uppercase text-muted group-hover:text-ink">
                            {STATUS_LABEL[domain.status]}
                          </span>
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-ink-soft">{domain.nextAction}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-surface p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted">Study coverage</p>
                  <p className="font-mono text-6xl font-semibold leading-none text-ink">{overall}%</p>
                </div>
                <p className="text-right text-sm text-ink-soft">
                  <span className="block font-semibold text-ink">{coverage.covered}</span>
                  covered items
                </p>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-accent" style={{ width: `${overall}%` }} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold uppercase text-muted">
                <span className="rounded-md bg-canvas px-2.5 py-1.5">{coverage.covered} covered</span>
                <span className="rounded-md bg-canvas px-2.5 py-1.5">{coverage.toCover} to cover</span>
              </div>
              <div className="mt-5 grid gap-2">
                {skillLevels.map((skill) => (
                  <SkillLane key={skill.id} label={skill.label} level={skill.level} status={skill.status} />
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-border/70 bg-canvas px-3 py-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase text-muted">To cover</p>
                  <span className="text-xs font-semibold text-ink">{toCoverSoon.length} left</span>
                </div>
                <div className="grid gap-1.5 text-sm text-ink-soft">
                  {toCoverSoon.map((item) => (
                    <p key={item.id} className="line-clamp-1">
                      <span className="font-semibold text-ink">{item.label}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <NextLessonsByTeacher />
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

      <section className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {watchDomains.map((domain, index) => (
            <CompetencyTile
              key={domain.id}
              title={domain.label}
              status={domain.status}
              meta="Quest domain"
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
          <Card className="min-h-44 bg-panel md:col-span-2 xl:col-span-2">
            <CardHeading eyebrow="Today's focus" title="One clean study loop" />
            <div className="grid gap-2">
              {focusSteps.map((step, index) => (
                <Link
                  key={step.href}
                  to={step.href}
                  className="grid grid-cols-[1.75rem_1fr] gap-3 rounded-md bg-surface/72 px-3 py-2 transition duration-200 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <span className="font-mono text-xs text-muted">{index + 1}</span>
                  <span className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{step.label}</span>
                </Link>
              ))}
            </div>
          </Card>
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
            {secondaryPriorities.length > 0 && (
              <div className="mt-5 border-t border-border pt-4">
                <p className="mb-2 text-xs font-semibold uppercase text-muted">After that</p>
                <div className="grid gap-2 text-sm text-ink-soft">
                  {secondaryPriorities.map((priority) => (
                    <p key={priority.id} className="line-clamp-1">
                      <span className="mr-2 font-mono text-xs text-muted">{priority.rank}</span>
                      {priority.text}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Card>
          <Card>
            <CardHeading eyebrow="Practice rhythm" title="Next sessions" />
            <div className="grid gap-2">
              {upcomingSessions.map((session) => (
                <Link
                  key={session.id}
                  to={`/domains/${session.domain}`}
                  className="rounded-lg bg-canvas px-3 py-2.5 transition duration-200 hover:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="font-semibold text-ink">{teacherById(session.teacher)?.name}</span>
                    <span className="font-mono text-xs text-muted">{session.date}</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{session.goal}</p>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeading eyebrow="Mistake watch" title="Patterns to remove" />
            <div className="grid gap-3 text-sm">
              {activeMistakes.map((mistake) => (
                <div key={mistake.id} className="border-l-2 border-accent/45 pl-3">
                  <p className="font-semibold leading-snug text-ink">{mistake.mistake}</p>
                  <p className="mt-1 line-clamp-1 text-ink-soft">{mistake.correction}</p>
                </div>
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
