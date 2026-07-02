import { Link } from "react-router-dom";
import { MATRIX_COLUMNS, MATRIX_COLUMN_LABELS, domains } from "../data/progress";
import { Card } from "../components/Card";
import { StatusLegend } from "../components/StatusLegend";
import { cellColor } from "../lib/status";
import { Dot } from "../components/Badge";
import type { MatrixColumnId } from "../data/types";

export function DomainList() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          12 exam-relevant life domains
        </p>
        <h1 className="text-2xl font-semibold text-ink">Domains</h1>
      </div>
      <StatusLegend />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((d) => (
          <Link
            key={d.id}
            to={`/domains/${d.id}`}
            className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-ink/30"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="font-semibold text-ink">{d.label}</h2>
              <span className="shrink-0 text-xs text-muted">{d.relevance}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MATRIX_COLUMNS.map((col) => (
                <span
                  key={col}
                  title={`${MATRIX_COLUMN_LABELS[col]}: ${d.skills[col as MatrixColumnId].status}`}
                  className="inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[11px] text-muted"
                >
                  <Dot color={cellColor(d.skills[col as MatrixColumnId].status)} />
                  {MATRIX_COLUMN_LABELS[col]}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <Card className="text-sm text-ink-soft">
        <p>
          See the full <Link to="/" className="underline">domain × skill matrix</Link> on the
          dashboard for a condensed view of all 12 domains at once.
        </p>
      </Card>
    </div>
  );
}
