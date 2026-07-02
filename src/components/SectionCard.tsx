import { Link } from "react-router-dom";
import type { ExamSection } from "../data/types";
import { sessionById, teacherById } from "../data/progress";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { STATUS_COLOR_LABEL } from "../lib/status";

export function SectionCard({ section }: { section: ExamSection }) {
  const lastSession = section.lastSessionId
    ? sessionById(section.lastSessionId)
    : undefined;
  const teacherNames = section.assignedTeachers
    .map((id) => teacherById(id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      to={`/${section.id}`}
      className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {section.labelEn} · Level {section.level}
          </p>
          <h3 className="text-xl font-semibold text-ink">{section.label}</h3>
        </div>
        <Badge color={section.status}>{STATUS_COLOR_LABEL[section.status]}</Badge>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted">
          <span>Coverage</span>
          <span className="font-mono">{section.coverage}%</span>
        </div>
        <ProgressBar value={section.coverage} color={section.status} />
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-medium text-muted uppercase">Main weak point</p>
          <p className="text-ink-soft">{section.weaknesses[0]}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-muted uppercase">Next planned work</p>
          <p className="text-ink-soft">{section.nextActions[0]}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted">
        <span>Teacher: {teacherNames}</span>
        {lastSession && <span>Last session: {lastSession.date}</span>}
      </div>
    </Link>
  );
}
