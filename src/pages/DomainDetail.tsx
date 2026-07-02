import { Link, Navigate, useParams } from "react-router-dom";
import { domainById, domains, lessonLogs, teacherById } from "../data/progress";
import { StatusCard } from "../components/StatusCard";
import { Card, CardHeading } from "../components/Card";
import { LessonLogCard } from "../components/LessonLogCard";
import { STATUS_LABEL } from "../lib/status";

export function DomainDetail() {
  const { domainId } = useParams();
  const domain = domainId ? domainById(domainId) : undefined;
  if (!domain) return <Navigate to="/domains" replace />;

  const teacher = teacherById(domain.teacher);
  const relatedLogs = lessonLogs
    .filter((l) => l.domains.includes(domain.id))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const idx = domains.findIndex((d) => d.id === domain.id);
  const prev = domains[(idx - 1 + domains.length) % domains.length];
  const next = domains[(idx + 1) % domains.length];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <Link to={`/domains/${prev.id}`} className="underline">
          ← {prev.label}
        </Link>
        <Link to="/domains" className="underline">
          All domains
        </Link>
        <Link to={`/domains/${next.id}`} className="underline">
          {next.label} →
        </Link>
      </div>

      <StatusCard status={domain.status}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              {domain.priority} priority
            </p>
            <h1 className="text-2xl font-semibold text-ink">{domain.label}</h1>
          </div>
          <p className="text-sm font-medium text-ink">{STATUS_LABEL[domain.status]}</p>
        </div>
        {domain.note && <p className="mt-3 text-sm text-ink-soft">{domain.note}</p>}
      </StatusCard>

      <Card className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium text-muted uppercase">Teacher responsible</p>
          <Link to={`/teachers#${teacher?.id}`} className="text-sm font-medium text-ink hover:underline">
            {teacher?.name}
          </Link>
        </div>
        <div>
          <p className="text-xs font-medium text-muted uppercase">Last practiced</p>
          <p className="text-sm text-ink-soft">{domain.lastPracticed ?? "Not yet"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted uppercase">Next planned action</p>
          <p className="text-sm text-ink-soft">{domain.nextAction}</p>
        </div>
      </Card>

      {relatedLogs.length > 0 && (
        <section>
          <CardHeading title="Recent lessons in this domain" />
          <div className="grid gap-4 lg:grid-cols-2">
            {relatedLogs.map((l) => (
              <LessonLogCard key={l.id} log={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
