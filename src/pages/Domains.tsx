import { domainCoverageStatus, domains, lessonCountForDomain, teacherById } from "../data/progress";
import { domainCourses, fallbackDomainCourse } from "../data/courseContent";
import { CompetencyTile } from "../components/CompetencyTile";
import { Card } from "../components/Card";
import { coverageCounts, readinessFromStatuses } from "../lib/status";

const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

export function Domains() {
  const sorted = [...domains].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.label.localeCompare(b.label),
  );
  const coverageItems = domains.map((domain) => ({
    id: domain.id,
    status: domainCoverageStatus(domain.id),
  }));
  const counts = coverageCounts(coverageItems);
  const readiness = readinessFromStatuses(coverageItems);

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Vocabulary domains</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">15 vocabulary missions</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Vocabulary is the topic layer: words, questions and scenarios by life domain.
            Exam practice is the format layer for Hören, Lesen, Schreiben and Sprechen.
          </p>
        </div>

        <Card className="bg-panel">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-muted">Vocabulary readiness</p>
              <p className="mt-1 font-mono text-4xl font-semibold text-ink">{readiness}%</p>
            </div>
            <div className="grid gap-2 text-right text-xs font-semibold uppercase text-muted sm:grid-cols-2 sm:text-left">
              <span className="rounded-md bg-surface px-2.5 py-1">{counts.covered} covered</span>
              <span className="rounded-md bg-surface px-2.5 py-1">{counts.toCover} to cover</span>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-accent" style={{ width: `${readiness}%` }} />
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((domain, index) => {
          const course = domainCourses[domain.id] ?? fallbackDomainCourse;
          const teacher = teacherById(domain.teacher);
          const lessonCount = lessonCountForDomain(domain.id);
          const coverageStatus = domainCoverageStatus(domain.id);

          return (
            <CompetencyTile
              key={domain.id}
              title={domain.label}
              status={coverageStatus}
              meta={teacher ? `${teacher.name} mission` : "Teacher mission"}
              detail={domain.nextAction}
              to={`/domains/${domain.id}`}
              index={index}
            >
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted">
                <span className="rounded-md bg-canvas px-2 py-1">{lessonCount} lessons</span>
                <span className="rounded-md bg-canvas px-2 py-1">{course.vocabulary.length} words</span>
                <span className="rounded-md bg-canvas px-2 py-1">{course.scenarios.length} scenarios</span>
              </div>
            </CompetencyTile>
          );
        })}
      </section>
    </div>
  );
}
