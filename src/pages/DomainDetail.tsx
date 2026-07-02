import { Link, Navigate, useParams } from "react-router-dom";
import {
  MATRIX_COLUMN_LABELS,
  MATRIX_COLUMNS,
  domainById,
  domains,
  sessions,
  teacherById,
} from "../data/progress";
import type { MatrixColumnId } from "../data/types";
import { Card, CardHeading } from "../components/Card";
import { Badge } from "../components/Badge";
import { SessionCard } from "../components/SessionCard";
import { cellColor, cellLabel } from "../lib/status";

export function DomainDetail() {
  const { domainId } = useParams();
  const domain = domainId ? domainById(domainId) : undefined;
  if (!domain) return <Navigate to="/domains" replace />;

  const teacher = teacherById(domain.assignedTeacher);
  const relatedSessions = sessions
    .filter((s) => s.domains.includes(domain.id))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const idx = domains.findIndex((d) => d.id === domain.id);
  const prev = domains[(idx - 1 + domains.length) % domains.length];
  const next = domains[(idx + 1) % domains.length];

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="mb-1 flex items-center justify-between text-xs text-muted">
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Exam relevance: {domain.relevance}
            </p>
            <h1 className="text-2xl font-semibold text-ink">{domain.label}</h1>
          </div>
          <span className="text-sm text-muted">
            Assigned teacher:{" "}
            <Link to={`/teachers/${teacher?.id}`} className="font-medium text-ink hover:underline">
              {teacher?.name}
            </Link>
          </span>
        </div>
      </section>

      <section>
        <CardHeading title="Status per skill" />
        <Card className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {MATRIX_COLUMNS.map((col) => {
            const cell = domain.skills[col as MatrixColumnId];
            return (
              <div key={col}>
                <p className="mb-1 text-xs font-medium text-muted uppercase">
                  {MATRIX_COLUMN_LABELS[col]}
                </p>
                <Badge color={cellColor(cell.status)}>{cellLabel(cell.status)}</Badge>
                {cell.teacher && (
                  <p className="mt-1 text-xs text-muted">{teacherById(cell.teacher)?.name}</p>
                )}
                {cell.plannedDate && (
                  <p className="text-xs text-muted">Planned {cell.plannedDate}</p>
                )}
              </div>
            );
          })}
        </Card>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Strengths" />
          {domain.strengths.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
              {domain.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">None recorded yet.</p>
          )}
        </Card>
        <Card>
          <CardHeading title="Weaknesses" />
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {domain.weaknesses.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeading title="Key vocabulary" />
        <div className="flex flex-wrap gap-1.5">
          {domain.vocabulary.map((v) => (
            <span key={v} className="rounded-full bg-canvas px-2.5 py-1 text-sm text-ink-soft">
              {v}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Likely oral questions" />
          {domain.likelyQuestions.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
              {domain.likelyQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Not applicable for this domain.</p>
          )}
        </Card>
        <Card>
          <CardHeading title="Possible listening situations" />
          {domain.listeningSituations.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
              {domain.listeningSituations.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Not applicable for this domain.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeading title="Possible reading texts" />
          {domain.readingTexts.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
              {domain.readingTexts.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Not applicable for this domain.</p>
          )}
        </Card>
        <Card>
          <CardHeading title="Possible writing prompts" />
          {domain.writingPrompts.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
              {domain.writingPrompts.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Not applicable for this domain.</p>
          )}
        </Card>
      </div>

      <Card>
        <CardHeading title="Latest session notes" />
        <p className="text-sm text-ink-soft">{domain.latestNote}</p>
      </Card>

      <Card className="bg-canvas">
        <CardHeading title="Next recommended teacher activity" />
        <p className="text-sm text-ink-soft">{domain.nextAction}</p>
      </Card>

      {relatedSessions.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
            Sessions covering this domain
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
