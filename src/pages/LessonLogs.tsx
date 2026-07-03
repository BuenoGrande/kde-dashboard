import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { domains, lessonLogsSorted, teachers } from "../data/progress";
import { LessonLogCard } from "../components/LessonLogCard";
import type { LessonLog } from "../data/types";

export const EXTRA_LESSONS_KEY = "kde-extra-lessons";

const loadExtraLessons = (): LessonLog[] => {
  try {
    return JSON.parse(localStorage.getItem(EXTRA_LESSONS_KEY) || "[]");
  } catch {
    return [];
  }
};

const splitList = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export function LessonLogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [extraLessons, setExtraLessons] = useState(loadExtraLessons);
  const teacherFilter = searchParams.get("teacher") ?? "all";
  const all = [...extraLessons, ...lessonLogsSorted()].sort((a, b) => (a.date < b.date ? 1 : -1));
  const filtered = useMemo(
    () => (teacherFilter === "all" ? all : all.filter((l) => l.teacher === teacherFilter)),
    [all, teacherFilter],
  );

  const saveLesson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const domain = String(data.get("domain") || domains[0].id);
    const teacher = String(data.get("teacher") || teachers[0].id);
    const lesson: LessonLog = {
      id: `local-${Date.now()}`,
      date: String(data.get("date") || new Date().toISOString().slice(0, 10)),
      teacher,
      domains: [domain],
      skills: ["sprechen"],
      practiced: String(data.get("practiced") || "KDE practice"),
      vocabulary: splitList(data.get("vocabulary")),
      verbs: [],
      grammar: splitList(data.get("grammar")),
      mistakes: splitList(data.get("mistakes")),
      canNowDo: String(data.get("canNowDo") || "Captured a concrete lesson artifact."),
      repeatNext: String(data.get("repeatNext") || "Review the new vocabulary in the trainer."),
    };
    const next = [lesson, ...extraLessons];
    setExtraLessons(next);
    localStorage.setItem(EXTRA_LESSONS_KEY, JSON.stringify(next));
    form.reset();
  };

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
      <form onSubmit={saveLesson} className="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <div className="mb-3">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            After today’s lesson
          </p>
          <h2 className="text-lg font-semibold text-ink">Capture concrete review material</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm font-medium text-ink">
            Date
            <input name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-ink">
            Teacher
            <select name="teacher" className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2">
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-ink">
            Domain
            <select name="domain" className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2">
              {domains.map((domain) => (
                <option key={domain.id} value={domain.id}>{domain.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm font-medium text-ink">
            Tasks practised
            <textarea name="practiced" rows={3} className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2" placeholder="Voicemail callback, doctor roleplay, 40-word cancellation" />
          </label>
          <label className="text-sm font-medium text-ink">
            New vocabulary
            <textarea name="vocabulary" rows={3} className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2" placeholder="Termin verschieben, Notfalldienst, Beschwerden" />
          </label>
          <label className="text-sm font-medium text-ink">
            Mistake / grammar to fix
            <textarea name="mistakes" rows={3} className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2" placeholder="weil word order: ich krank bin" />
          </label>
          <label className="text-sm font-medium text-ink">
            What Pierre can now do
            <textarea name="canNowDo" rows={3} className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2" placeholder="Can ask for a doctor appointment with reason and date." />
          </label>
        </div>
        <label className="mt-3 block text-sm font-medium text-ink">
          Next review
          <input name="repeatNext" className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2" placeholder="Review the new words in the trainer before next class." />
        </label>
        <button className="mt-4 rounded-md bg-ink px-3 py-2 text-sm font-medium text-white">
          Save lesson
        </button>
      </form>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((l) => (
          <LessonLogCard key={l.id} log={l} />
        ))}
      </div>
    </div>
  );
}
