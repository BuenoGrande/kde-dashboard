import type {
  CourseScenario,
  MiniCourse,
  SkillCourseContent,
  VocabularyItem,
} from "../data/courseContent";
import { Card, CardHeading } from "./Card";

export function VocabularyGrid({ items }: { items: VocabularyItem[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={`${item.de}-${item.fr}`} className="rounded-lg bg-canvas p-3">
          <p className="font-semibold text-ink">{item.de}</p>
          <p className="text-sm text-ink-soft">{item.fr}</p>
          {item.note && <p className="mt-1 text-xs text-muted">{item.note}</p>}
        </div>
      ))}
    </div>
  );
}

export function ScenarioGrid({ scenarios }: { scenarios: CourseScenario[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {scenarios.map((scenario) => (
        <article key={scenario.title} className="rounded-lg border border-border bg-surface p-4">
          <p className="mb-1 text-sm font-semibold text-ink">{scenario.title}</p>
          <p className="text-sm text-ink-soft">{scenario.setup}</p>
          <p className="mt-2 border-t border-border pt-2 text-sm text-ink-soft">{scenario.task}</p>
        </article>
      ))}
    </div>
  );
}

export function MiniCourseBlock({ course }: { course: MiniCourse }) {
  return (
    <Card>
      <CardHeading eyebrow="Mini course" title={course.goal} />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-muted">Lesson sequence</p>
          <ol className="space-y-2 text-sm text-ink-soft">
            {course.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-xs text-muted">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-muted">Validated when</p>
          <ul className="space-y-2 text-sm text-ink-soft">
            {course.success.map((item) => (
              <li key={item} className="border-l-2 border-accent pl-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function AgentFeedback({
  teacher,
  student,
}: {
  teacher: string;
  student: string;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Card className="bg-agent-teacher">
        <p className="mb-2 text-xs font-semibold uppercase text-muted">Professor agent feedback</p>
        <p className="text-sm leading-relaxed text-ink-soft">{teacher}</p>
      </Card>
      <Card className="bg-agent-student">
        <p className="mb-2 text-xs font-semibold uppercase text-muted">Student agent feedback</p>
        <p className="text-sm leading-relaxed text-ink-soft">{student}</p>
      </Card>
    </div>
  );
}

export function SkillCoursePanel({ content }: { content: SkillCourseContent }) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeading eyebrow="Practice task" title={content.lessonGoal} />
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-ink-soft">{content.examBrief}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {content.checkpoints.map((checkpoint) => (
            <p key={checkpoint} className="rounded-lg bg-canvas px-3 py-2 text-sm text-ink-soft">
              {checkpoint}
            </p>
          ))}
        </div>
      </Card>
      <MiniCourseBlock course={content.miniCourse} />
      <ScenarioGrid scenarios={content.scenarios} />
      <AgentFeedback teacher={content.teacherAgent} student={content.studentAgent} />
    </div>
  );
}
