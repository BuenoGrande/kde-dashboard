import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { lessonLogsSorted, teachers } from "../data/progress";
import { LessonLogCard } from "../components/LessonLogCard";

export function LessonLogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const teacherFilter = searchParams.get("teacher") ?? "all";
  const all = lessonLogsSorted();
  const filtered = useMemo(
    () => (teacherFilter === "all" ? all : all.filter((l) => l.teacher === teacherFilter)),
    [all, teacherFilter],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Vocabulary, verbs, grammar and mistakes from every lesson
          </p>
          <h1 className="text-2xl font-semibold text-ink">Lesson logs</h1>
        </div>
        <div className="flex gap-1.5 text-sm">
          <button
            onClick={() => setSearchParams({})}
            className={`rounded-md px-2.5 py-1.5 font-medium ${
              teacherFilter === "all" ? "bg-ink text-white" : "border border-border bg-surface text-ink-soft"
            }`}
          >
            All
          </button>
          {teachers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSearchParams({ teacher: t.id })}
              className={`rounded-md px-2.5 py-1.5 font-medium ${
                teacherFilter === t.id
                  ? "bg-ink text-white"
                  : "border border-border bg-surface text-ink-soft"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((l) => (
          <LessonLogCard key={l.id} log={l} />
        ))}
      </div>
    </div>
  );
}
