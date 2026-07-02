import { useMemo, useState } from "react";
import { sessionsSorted, teachers } from "../data/progress";
import { SessionCard } from "../components/SessionCard";

export function LessonLog() {
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const all = sessionsSorted();
  const filtered = useMemo(
    () => (teacherFilter === "all" ? all : all.filter((s) => s.teacher === teacherFilter)),
    [all, teacherFilter],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Full session history
          </p>
          <h1 className="text-2xl font-semibold text-ink">Lesson log</h1>
        </div>
        <div className="flex gap-1.5 text-sm">
          <button
            onClick={() => setTeacherFilter("all")}
            className={`rounded-md px-2.5 py-1.5 font-medium ${
              teacherFilter === "all" ? "bg-ink text-white" : "bg-surface text-ink-soft border border-border"
            }`}
          >
            All
          </button>
          {teachers.map((t) => (
            <button
              key={t.id}
              onClick={() => setTeacherFilter(t.id)}
              className={`rounded-md px-2.5 py-1.5 font-medium ${
                teacherFilter === t.id
                  ? "bg-ink text-white"
                  : "bg-surface text-ink-soft border border-border"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </div>
    </div>
  );
}
