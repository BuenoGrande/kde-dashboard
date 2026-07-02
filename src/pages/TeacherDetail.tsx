import { Link, Navigate, useParams } from "react-router-dom";
import { domainById, domains, sectionById, sessions, teacherById } from "../data/progress";
import { Card, CardHeading } from "../components/Card";
import { SessionCard } from "../components/SessionCard";

export function TeacherDetail() {
  const { teacherId } = useParams();
  const teacher = teacherId ? teacherById(teacherId) : undefined;
  if (!teacher) return <Navigate to="/teachers" replace />;

  const relatedSessions = sessions
    .filter((s) => s.teacher === teacher.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const lastSession = relatedSessions[0];

  // Everything happening in this teacher's domains, regardless of who taught
  // it — so no one repeats work another teacher already did.
  const domainActivity = sessions
    .filter((s) => s.domains.some((d) => teacher.relevantDomains.includes(d)))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  const domainNextActions = domains.filter((d) => teacher.relevantDomains.includes(d.id));

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">{teacher.role}</p>
        <h1 className="text-2xl font-semibold text-ink">{teacher.name}</h1>
      </section>

      <Card className="bg-canvas">
        <CardHeading title="Suggested next session plan" />
        <p className="text-sm text-ink-soft">{teacher.nextSessionPlan}</p>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="What this teacher should focus on" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {teacher.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeading title="Latest session with this teacher" />
          {lastSession ? (
            <SessionCard session={lastSession} />
          ) : (
            <p className="text-sm text-muted">No sessions logged yet.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Strengths" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {teacher.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeading title="Limitations" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {teacher.limitations.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeading title="Best use of this teacher" />
        <p className="text-sm text-ink-soft">{teacher.bestUse}</p>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Relevant exam sections" />
          <div className="flex flex-wrap gap-1.5">
            {teacher.relevantSections.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                className="rounded-full bg-canvas px-2.5 py-1 text-sm text-ink-soft hover:bg-border"
              >
                {sectionById(id)?.label}
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeading title="Relevant domains" />
          <div className="flex flex-wrap gap-1.5">
            {teacher.relevantDomains.map((id) => (
              <Link
                key={id}
                to={`/domains/${id}`}
                className="rounded-full bg-canvas px-2.5 py-1 text-sm text-ink-soft hover:bg-border"
              >
                {domainById(id)?.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeading title="Next actions in your domains" />
        <ul className="space-y-2 text-sm">
          {domainNextActions.map((d) => (
            <li key={d.id}>
              <Link to={`/domains/${d.id}`} className="font-medium text-ink hover:underline">
                {d.label}
              </Link>
              <span className="text-ink-soft"> — {d.nextAction}</span>
            </li>
          ))}
        </ul>
      </Card>

      {domainActivity.length > 0 && (
        <Card>
          <CardHeading title="Recent activity in your domains (all teachers)" />
          <p className="mb-3 text-xs text-muted">
            Check this before planning — avoid repeating what another teacher already covered.
          </p>
          <ul className="space-y-2 text-sm">
            {domainActivity.map((s) => (
              <li key={s.id}>
                <span className="font-mono text-xs text-muted">{s.date}</span>{" "}
                <span className="font-medium text-ink">{teacherById(s.teacher)?.name}</span>
                <span className="text-ink-soft"> — {s.covered}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {relatedSessions.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
            All sessions with {teacher.name}
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {relatedSessions.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
