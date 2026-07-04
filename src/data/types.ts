// Shared types for the KDE prep data model.
// Edit content in progress.ts — this file only defines shapes.

// One status vocabulary, reused everywhere (domains, writing tasks,
// speaking checklist items). Fewer concepts to learn, fewer colors on screen.
export type Status = "not_covered" | "started" | "needs_review" | "ready" | "planned";

export type Priority = "high" | "medium" | "low";

// Used only internally, to filter which lessons/mistakes show up on the
// Speaking/Writing pages and teacher briefs. Never rendered as a matrix.
export type SkillId = "hoeren" | "lesen" | "schreiben" | "sprechen";

export interface SkillLevel {
  id: SkillId;
  label: string;
  level: "A2" | "B1";
  status: Status;
}

export interface Domain {
  id: string;
  label: string;
  status: Status;
  priority: Priority;
  teacher: string; // teacher id
  lastPracticed: string | null; // ISO date
  nextAction: string;
  note?: string; // one short line: key vocabulary or the main weakness
}

export interface WritingTask {
  id: string;
  label: string;
  status: Status;
  modelAnswer?: string;
  mistakes: string[];
  nextDrill: string;
}

export interface SpeakingItem {
  id: string;
  label: string;
  status: Status;
  note: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  brief: string; // one-minute brief — always visible, never hidden
  dontRepeat: string[];
  sessionPlan: string;
  relatedSkills: SkillId[];
}

export interface LessonLog {
  id: string;
  date: string; // ISO date
  teacher: string; // teacher id
  domains: string[]; // domain ids
  skills: SkillId[];
  practiced: string;
  vocabulary: string[];
  verbs: string[];
  grammar: string[];
  mistakes: string[];
  canNowDo: string;
  repeatNext: string;
  isSample?: boolean;
}

export interface PlannedSession {
  id: string;
  date: string;
  teacher: string;
  domain: string;
  goal: string;
}

export interface TopPriority {
  id: string;
  rank: number;
  text: string;
}

export interface RecurringMistake {
  id: string;
  mistake: string;
  example: string;
  correction: string;
  relatedSkills: SkillId[];
}
