import { Link } from "react-router-dom";
import { teachers } from "../data/progress";

export function TeacherList() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Who's teaching what
          </p>
          <h1 className="text-2xl font-semibold text-ink">Teachers</h1>
        </div>
        <Link
          to="/teachers/brief"
          className="rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:bg-ink-soft"
        >
          Open 2-minute teacher brief
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {teachers.map((t) => (
          <Link
            key={t.id}
            to={`/teachers/${t.id}`}
            className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-ink/30"
          >
            <h2 className="mb-1 text-lg font-semibold text-ink">{t.name}</h2>
            <p className="mb-3 text-xs text-muted">{t.role}</p>
            <p className="text-sm text-ink-soft">{t.focus.slice(0, 3).join(" · ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
