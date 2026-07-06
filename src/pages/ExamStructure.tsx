import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { CompetencyTile } from "../components/CompetencyTile";
import { Card } from "../components/Card";
import { SkillCoursePanel } from "../components/CoursePanel";
import {
  examFormatTasks,
  kdeExamStructure,
  speakingItemCourses,
  type ExamTrackId,
  type SkillCourseContent,
  writingTaskCourses,
} from "../data/courseContent";
import {
  describedLessonImage,
  imageDescriptionGuide,
  imageDescriptionMap,
  repairPhrases,
  speakingStructure,
  writingStructure,
} from "../data/reference";
import { speakingChecklist, writingTasks } from "../data/progress";
import type { Status } from "../data/types";
import { STATUS_LABEL, STATUS_ORDER, statusBadgeClasses, statusCounts } from "../lib/status";

interface ExamItem {
  id: string;
  label: string;
  status: Status;
  meta: string;
  detail: string;
  content: SkillCourseContent;
  mistakes?: string[];
  modelAnswer?: string;
}

const TRACKS: ExamTrackId[] = ["writing", "speaking", "listening", "reading"];

function isTrack(value: string | null): value is ExamTrackId {
  return value !== null && TRACKS.includes(value as ExamTrackId);
}

export function ExamStructure() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTrack = searchParams.get("track");
  const track: ExamTrackId =
    requestedTrack === "comprehension" ? "listening" : isTrack(requestedTrack) ? requestedTrack : "writing";

  const items = useMemo<ExamItem[]>(() => {
    if (track === "writing") {
      return writingTasks.map((task) => ({
        id: task.id,
        label: task.label,
        status: task.status,
        meta: "A2 writing",
        detail: task.nextDrill,
        content: writingTaskCourses[task.id],
        mistakes: task.mistakes,
        modelAnswer: task.modelAnswer,
      }));
    }

    if (track === "speaking") {
      return speakingChecklist.map((item) => ({
        id: item.id,
        label: item.label,
        status: item.status,
        meta: "B1 speaking",
        detail: item.note,
        content: speakingItemCourses[item.id],
      }));
    }

    const mode = track === "listening" ? "listening" : "reading";
    return examFormatTasks.filter((task) => task.mode === mode).map((task) => ({
      id: task.id,
      label: task.label,
      status: task.status,
      meta: `${task.level} ${task.mode}`,
      detail: task.nextDrill,
      content: {
        examBrief: task.examBrief,
        lessonGoal: task.nextDrill,
        checkpoints: task.checkpoints,
        scenarios: task.scenarios,
        miniCourse: task.miniCourse,
        teacherAgent: task.teacherAgent,
        studentAgent: task.studentAgent,
      },
      mistakes: task.mistakes,
    }));
  }, [track]);

  const requestedItem = searchParams.get("item");
  const selected = items.find((item) => item.id === requestedItem) ?? items[0];
  const trackInfo = kdeExamStructure.find((item) => item.id === track) ?? kdeExamStructure[0];
  const counts = statusCounts(items);

  function setTrack(nextTrack: ExamTrackId) {
    setSearchParams({ track: nextTrack });
  }

  function setItem(itemId: string) {
    setSearchParams({ track, item: itemId });
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">KDE exam practice</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">Writing, speaking, listening, reading</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Exam practice is the format layer: Hören, Lesen, Schreiben and Sprechen drills.
            Vocabulary stays in the mission cards; this page checks whether Pierre can perform
            the exam-style task.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {kdeExamStructure.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTrack(item.id)}
              className={`rounded-lg border p-4 text-left transition duration-200 active:scale-[0.99] ${
                track === item.id
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-surface text-ink-soft hover:-translate-y-0.5"
              }`}
            >
              <span className="text-xs font-semibold uppercase opacity-75">{item.level}</span>
              <span className="mt-1 block font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <Card className="bg-panel">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-muted">{trackInfo.level}</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">{trackInfo.format}</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {trackInfo.signals.map((signal) => (
              <p key={signal} className="rounded-lg bg-surface/80 px-3 py-2 text-sm text-ink-soft">
                {signal}
              </p>
            ))}
          </div>
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.25fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-muted">
            {STATUS_ORDER.filter((status) => counts[status] > 0).map((status) => (
              <span key={status} className="rounded-md bg-surface px-2.5 py-1">
                {counts[status]} {STATUS_LABEL[status]}
              </span>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {items.map((item, index) => (
              <CompetencyTile
                key={item.id}
                title={item.label}
                status={item.status}
                meta={item.meta}
                detail={item.detail}
                selected={selected.id === item.id}
                index={index}
                onClick={() => setItem(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-muted">Selected task</p>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-ink">{selected.label}</h2>
              </div>
              <span className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase ${statusBadgeClasses(selected.status)}`}>
                {STATUS_LABEL[selected.status]}
              </span>
            </div>
          </Card>
          <SkillCoursePanel content={selected.content} />

          {selected.mistakes && selected.mistakes.length > 0 && (
            <Card>
              <p className="mb-2 text-xs font-semibold uppercase text-muted">Known mistakes</p>
              <ul className="space-y-2 text-sm text-ink-soft">
                {selected.mistakes.map((mistake) => (
                  <li key={mistake} className="border-l-2 border-review pl-3">
                    {mistake}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {track === "writing" && (
            <Card>
              <p className="mb-2 text-xs font-semibold uppercase text-muted">Writing skeleton</p>
              <ol className="grid gap-2 sm:grid-cols-2">
                {writingStructure.map((step, index) => (
                  <li key={step} className="rounded-lg bg-canvas px-3 py-2 text-sm text-ink-soft">
                    <span className="mr-2 font-mono text-xs text-muted">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              {selected.modelAnswer && (
                <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-surface p-4 font-sans text-sm leading-relaxed text-ink-soft">
                  {selected.modelAnswer}
                </pre>
              )}
            </Card>
          )}

          {track === "speaking" && (
            <Card>
              <p className="mb-2 text-xs font-semibold uppercase text-muted">Speaking formulas</p>
              <div className="grid gap-2">
                {speakingStructure.map((step, index) => (
                  <p key={step} className="rounded-lg bg-canvas px-3 py-2 text-sm text-ink-soft">
                    <span className="mr-2 font-mono text-xs text-muted">{index + 1}</span>
                    {step}
                  </p>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {repairPhrases.map((phrase) => (
                  <p key={phrase} className="rounded-lg bg-surface px-3 py-2 text-sm text-ink-soft">
                    {phrase}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </div>
      </section>

      {track === "speaking" && selected.id === "picture-card" && <ImageDescriptionReference />}
    </div>
  );
}

function ImageDescriptionReference() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="grid gap-5 xl:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-muted">Bildbeschreibung</p>
            <h2 className="mt-1 text-xl font-semibold leading-tight text-ink">Positionen und Kommentar</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {imageDescriptionMap.title}: use the position words first, then add one personal comment or interpretation.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-canvas p-4">
            <div className="mb-3 text-sm font-semibold text-ink">der Bildrand / der Rand</div>
            <div className="grid min-h-44 grid-cols-3 grid-rows-5 rounded-md border border-ink/70 bg-surface p-3 text-sm text-ink-soft">
              <span className="col-start-2 row-start-1 self-start justify-self-center font-semibold text-ink">oben</span>
              <span className="col-start-3 row-start-1 justify-self-end font-semibold text-ink">in der Ecke</span>
              <span className="col-start-2 row-start-2 self-center justify-self-center">im Hintergrund</span>
              <span className="col-start-1 row-start-3 self-center justify-self-start">links</span>
              <span className="col-start-2 row-start-3 self-center justify-self-center font-semibold underline">
                in der Mitte / im Zentrum
              </span>
              <span className="col-start-3 row-start-3 self-center justify-self-end">rechts</span>
              <span className="col-start-2 row-start-4 self-center justify-self-center">im Vordergrund</span>
              <span className="col-start-2 row-start-5 self-end justify-self-center font-semibold text-ink">unten</span>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-ink-soft">
              {imageDescriptionMap.commentPhrases.map((phrase) => (
                <p key={phrase} className="rounded-md bg-surface px-3 py-2">
                  {phrase}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase text-muted">Full sentence bank</p>
        <div className="grid gap-3 xl:grid-cols-2">
          {imageDescriptionGuide.map((section) => (
            <section key={section.title} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="text-sm font-semibold text-ink">{section.title}</h3>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-muted">Questions</p>
                  <ul className="space-y-2 text-sm text-ink-soft">
                    {section.prompts.map((prompt) => (
                      <li key={prompt} className="border-l-2 border-border pl-3">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-muted">Reusable phrases</p>
                  <ul className="space-y-2 text-sm text-ink-soft">
                    {section.phrases.map((phrase) => (
                      <li key={phrase} className="border-l-2 border-accent pl-3">
                        {phrase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </Card>

      <Card>
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <img
            src={`${import.meta.env.BASE_URL}${describedLessonImage.src}`}
            alt={describedLessonImage.alt}
            className="h-full max-h-80 w-full rounded-lg object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase text-muted">Denajder lesson image</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">Simple model answer</h2>
            <div className="mt-3 grid gap-2">
              {describedLessonImage.model.map((sentence, index) => (
                <p key={sentence} className="rounded-lg bg-canvas px-3 py-2 text-sm text-ink-soft">
                  <span className="mr-2 font-mono text-xs text-muted">{index + 1}</span>
                  {sentence}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
