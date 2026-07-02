import { Link } from "react-router-dom";
import { MATRIX_COLUMNS, MATRIX_COLUMN_LABELS, teacherById } from "../data/progress";
import type { Domain, MatrixColumnId } from "../data/types";
import { cellColor, cellLabel } from "../lib/status";
import { STATUS_COLOR_DOT } from "../lib/status";

export function CoverageMatrix({ domains }: { domains: Domain[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-[1] bg-surface px-3 py-2 text-left text-xs font-medium tracking-wide text-muted uppercase">
              Domain
            </th>
            {MATRIX_COLUMNS.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-center text-xs font-medium tracking-wide text-muted uppercase"
              >
                {MATRIX_COLUMN_LABELS[col]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <tr key={domain.id} className="border-t border-border">
              <td className="sticky left-0 z-[1] bg-surface px-3 py-2.5">
                <Link
                  to={`/domains/${domain.id}`}
                  className="font-medium text-ink hover:underline"
                >
                  {domain.label}
                </Link>
              </td>
              {MATRIX_COLUMNS.map((col) => {
                const cell = domain.skills[col as MatrixColumnId];
                const color = cellColor(cell.status);
                const teacher = cell.teacher ? teacherById(cell.teacher) : undefined;
                const title = [
                  cellLabel(cell.status),
                  teacher ? `Teacher: ${teacher.name}` : null,
                  cell.plannedDate ? `Planned: ${cell.plannedDate}` : null,
                  cell.lastPracticed ? `Last practiced: ${cell.lastPracticed}` : null,
                  cell.note ?? null,
                ]
                  .filter(Boolean)
                  .join(" — ");
                return (
                  <td key={col} className="px-3 py-2.5 text-center" title={title}>
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_COLOR_DOT[color]}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
