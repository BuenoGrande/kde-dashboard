import { Link, Navigate, useParams } from "react-router-dom";
import { Card, CardHeading } from "../components/Card";
import {
  AgentFeedback,
  MiniCourseBlock,
  ScenarioGrid,
  VocabularyGrid,
} from "../components/CoursePanel";
import { LessonLogCard } from "../components/LessonLogCard";
import { Badge } from "../components/Badge";
import { domainCourses, fallbackDomainCourse } from "../data/courseContent";
import { domainById, domains, lessonLogs, teacherById } from "../data/progress";
import { STATUS_LABEL } from "../lib/status";

const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

export function DomainDetail() {
  const { domainId } = useParams();
  const domain = domainId ? domainById(domainId) : undefined;
  if (!domain) return <Navigate to="/domains" replace />;

  const course = domainCourses[domain.id] ?? fallbackDomainCourse;
  const teacher = teacherById(domain.teacher);
  const relatedLogs = lessonLogs
    .filter((log) => log.domains.includes(domain.id))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const sortedDomains = [...domains].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.label.localeCompare(b.label),
  );
  const idx = sortedDomains.findIndex((item) => item.id === domain.id);
  const prev = sortedDomains[(idx - 1 + sortedDomains.length) % sortedDomains.length];
  const next = sortedDomains[(idx + 1) % sortedDomains.length];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase text-muted">
        <Link to={`/domains/${prev.id}`} className="hover:text-ink">
          Prev: {prev.label}
        </Link>
        <Link to="/domains" className="rounded-md bg-surface px-3 py-1.5 hover:text-ink">
          All vocabulary
        </Link>
        <Link to={`/domains/${next.id}`} className="text-right hover:text-ink">
          Next: {next.label}
        </Link>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <Card className="bg-panel">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-muted">{domain.priority} priority</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">{domain.label}</h1>
              {domain.note && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{domain.note}</p>}
            </div>
            <Badge status={domain.status}>{STATUS_LABEL[domain.status]}</Badge>
          </div>
        </Card>

        <Card>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase text-muted">Teacher</p>
              <Link to={`/teachers#${teacher?.id}`} className="text-sm font-semibold text-ink hover:underline">
                {teacher?.name}
              </Link>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted">Last practiced</p>
              <p className="text-sm text-ink-soft">{domain.lastPracticed ?? "Not yet"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted">Next drill</p>
              <p className="text-sm text-ink-soft">{domain.nextAction}</p>
            </div>
          </div>
        </Card>
      </section>

      <MiniCourseBlock course={course.miniCourse} />
      <ScenarioGrid scenarios={course.scenarios} />
      <AgentFeedback teacher={course.teacherAgent} student={course.studentAgent} />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeading eyebrow="Starter word bank" title="Words to expand after real lessons" />
          <VocabularyGrid items={course.vocabulary} />
        </Card>

        <Card>
          <CardHeading eyebrow="Questions" title="Likely exam or teacher prompts" />
          <div className="grid gap-2">
            {course.keyQuestions.map((question) => (
              <p key={question} className="rounded-lg bg-canvas px-3 py-2 text-sm text-ink-soft">
                {question}
              </p>
            ))}
          </div>
        </Card>
      </section>

      {relatedLogs.length > 0 && (
        <section>
          <CardHeading title="Recent lessons in this domain" />
          <div className="grid gap-4 lg:grid-cols-2">
            {relatedLogs.map((log) => (
              <LessonLogCard key={log.id} log={log} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
