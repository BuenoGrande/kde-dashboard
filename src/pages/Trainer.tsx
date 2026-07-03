import { useMemo, useState } from "react";
import { Card, CardHeading } from "../components/Card";
import { domains, lessonLogsSorted, speakingChecklist, writingTasks } from "../data/progress";
import { EXTRA_LESSONS_KEY } from "./LessonLogs";
import type { LessonLog } from "../data/types";

type TrainerResult = "known" | "review";
type TrainerFilter = "due" | "weak" | "lesson" | "words" | "speaking" | "writing";

interface TrainerItem {
  id: string;
  type: "word" | "phrase" | "speaking" | "writing";
  prompt: string;
  answer: string;
  hint: string;
  domain: string;
  source: string;
}

const STORAGE_KEY = "kde-trainer-results";

const seedItems: TrainerItem[] = [
  {
    id: "core-termin",
    type: "word",
    prompt: "der Termin",
    answer: "appointment / rendez-vous",
    hint: "You can make, cancel, or move it.",
    domain: "Appointments",
    source: "Priority 1 vocabulary",
  },
  {
    id: "core-praxis",
    type: "word",
    prompt: "die Praxis",
    answer: "doctor's practice / cabinet médical",
    hint: "Official listening model: a practice voicemail can say it is closed.",
    domain: "Health",
    source: "Official model-test domain",
  },
  {
    id: "core-unterlagen",
    type: "word",
    prompt: "die Unterlagen",
    answer: "documents / documents",
    hint: "Bring these to the Gemeinde.",
    domain: "Gemeinde",
    source: "Admin reading/writing",
  },
  {
    id: "core-zurueckrufen",
    type: "word",
    prompt: "zurückrufen",
    answer: "to call back / rappeler",
    hint: "Common voicemail action.",
    domain: "Phone / voicemail",
    source: "Official listening model",
  },
  {
    id: "core-repair",
    type: "phrase",
    prompt: "Könnten Sie das bitte wiederholen?",
    answer: "Could you please repeat that?",
    hint: "Use this instead of switching language.",
    domain: "Speaking repair",
    source: "Oral survival",
  },
  {
    id: "core-weil",
    type: "phrase",
    prompt: "Ich kann nicht kommen, weil ich krank ___.",
    answer: "bin",
    hint: "After weil, the conjugated verb goes to the end.",
    domain: "Grammar",
    source: "Recurring mistake",
  },
];

const loadResults = (): Record<string, TrainerResult> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveResults = (results: Record<string, TrainerResult>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
};

const loadExtraLessons = (): LessonLog[] => {
  try {
    return JSON.parse(localStorage.getItem(EXTRA_LESSONS_KEY) || "[]");
  } catch {
    return [];
  }
};

export function Trainer() {
  const [filter, setFilter] = useState<TrainerFilter>("due");
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState(loadResults);

  const lessonItems = useMemo<TrainerItem[]>(
    () =>
      [...loadExtraLessons(), ...lessonLogsSorted()]
        .flatMap((lesson) =>
          lesson.vocabulary.slice(0, 4).map((word) => ({
            id: `lesson-${lesson.id}-${word}`,
            type: "word" as const,
            prompt: word,
            answer: "Ask teacher to add English/French meaning after the lesson.",
            hint: `From ${lesson.date}: ${lesson.practiced}`,
            domain: lesson.domains.join(", "),
            source: "Lesson vocabulary",
          })),
        )
        .slice(0, 18),
    [],
  );

  const writingItems = writingTasks.map((task) => ({
    id: `writing-${task.id}`,
    type: "writing" as const,
    prompt: task.label,
    answer: task.modelAnswer ?? task.nextDrill,
    hint: task.nextDrill,
    domain: "Schreiben A2",
    source: "Writing task family",
  }));

  const speakingItems = speakingChecklist.map((item) => ({
    id: `speaking-${item.id}`,
    type: "speaking" as const,
    prompt: item.label,
    answer: item.note,
    hint: "Speak first. Then reveal the expected structure.",
    domain: "Sprechen B1",
    source: "Speaking competency",
  }));

  const domainItems = domains
    .filter((domain) => domain.status === "planned")
    .map((domain) => ({
      id: `domain-${domain.id}`,
      type: "speaking" as const,
      prompt: domain.nextAction,
      answer: domain.note ?? "Use a concrete example, a reason, and one repair phrase if needed.",
      hint: domain.label,
      domain: domain.label,
      source: "Planned domain",
    }));

  const allItems = [...seedItems, ...lessonItems, ...writingItems, ...speakingItems, ...domainItems];

  const visibleItems = allItems.filter((item) => {
    if (filter === "weak") return results[item.id] === "review";
    if (filter === "lesson") return item.source === "Lesson vocabulary";
    if (filter === "words") return item.type === "word" || item.type === "phrase";
    if (filter === "speaking") return item.type === "speaking";
    if (filter === "writing") return item.type === "writing";
    return results[item.id] !== "known";
  });

  const current = visibleItems[index % Math.max(visibleItems.length, 1)];
  const knownCount = Object.values(results).filter((value) => value === "known").length;
  const reviewCount = Object.values(results).filter((value) => value === "review").length;

  const mark = (result: TrainerResult) => {
    if (!current) return;
    const next = { ...results, [current.id]: result };
    setResults(next);
    saveResults(next);
    setShowAnswer(false);
    setShowHint(false);
    setIndex((value) => value + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Active recall · try first, reveal second
        </p>
        <h1 className="text-2xl font-semibold text-ink">Trainer</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <div className="mb-5 flex flex-wrap gap-2">
            {[
              ["due", "Due"],
              ["weak", "Weak"],
              ["lesson", "Lesson words"],
              ["words", "Words"],
              ["speaking", "Speaking"],
              ["writing", "Writing"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  setFilter(value as TrainerFilter);
                  setIndex(0);
                  setShowAnswer(false);
                  setShowHint(false);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  filter === value ? "bg-ink text-white" : "border border-border bg-surface text-ink-soft"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {current ? (
            <div>
              <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">
                {current.type} · {current.domain} · {current.source}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-ink">
                {current.prompt}
              </h2>

              {current.type === "writing" && (
                <textarea
                  className="mb-4 min-h-36 w-full rounded-lg border border-border bg-canvas p-3 text-sm text-ink"
                  placeholder="Write the short KDE answer here before revealing the model."
                />
              )}

              {current.type === "speaking" && (
                <div className="mb-4 rounded-lg bg-canvas p-4 text-sm text-ink-soft">
                  Speak for 60–90 seconds before revealing. Use a reason, an example, and one repair
                  phrase if needed.
                </div>
              )}

              <div className="mb-4 min-h-20 rounded-lg bg-canvas p-4 text-sm text-ink-soft">
                {showHint && <p><span className="font-medium text-ink">Hint:</span> {current.hint}</p>}
                {showAnswer && (
                  <p className="mt-2 whitespace-pre-wrap">
                    <span className="font-medium text-ink">Model:</span> {current.answer}
                  </p>
                )}
                {!showHint && !showAnswer && <p>Answer is hidden. Try first.</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="rounded-md border border-border px-3 py-2 text-sm font-medium" onClick={() => setShowHint(true)}>
                  Hint
                </button>
                <button className="rounded-md bg-status-blue-bg px-3 py-2 text-sm font-medium text-status-blue-fg" onClick={() => setShowAnswer(true)}>
                  Reveal answer
                </button>
                <button className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white" onClick={() => mark("known")}>
                  Known
                </button>
                <button className="rounded-md bg-status-yellow-bg px-3 py-2 text-sm font-medium text-status-yellow-fg" onClick={() => mark("review")}>
                  Needs review
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-canvas p-6 text-sm text-ink-soft">
              No cards in this filter. Add new vocabulary in the lesson log or switch to Due.
            </div>
          )}
        </Card>

        <Card>
          <CardHeading title="Session" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-canvas p-3">
              <p className="font-mono text-2xl font-semibold text-ink">{knownCount}</p>
              <p className="text-muted">known</p>
            </div>
            <div className="rounded-lg bg-canvas p-3">
              <p className="font-mono text-2xl font-semibold text-ink">{reviewCount}</p>
              <p className="text-muted">review</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            The trainer pulls from the KDE knowledge block, lesson vocabulary, writing tasks,
            speaking competencies, and planned domains.
          </p>
        </Card>
      </div>
    </div>
  );
}
