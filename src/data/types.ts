// Shared types for the KDE prep data model.
// Edit content in progress.ts — this file only defines shapes.

export type StatusColor = "red" | "orange" | "yellow" | "green" | "blue";

export type SkillId = "hoeren" | "lesen" | "schreiben" | "sprechen";

export type MatrixColumnId = SkillId | "vocabulary" | "grammar" | "mockExam";

export type CellStatus =
  | "not_started"
  | "planned"
  | "practiced_once"
  | "needs_review"
  | "improving"
  | "exam_ready";

export interface ExamSection {
  id: SkillId;
  label: string;
  labelEn: string;
  level: "A2" | "B1";
  coverage: number; // 0-100
  status: StatusColor;
  format: string;
  strengths: string[];
  weaknesses: string[];
  nextActions: string[];
  assignedTeachers: string[]; // teacher ids
  lastSessionId: string | null;
  exampleTaskTypes: string[];
}

export interface MatrixCell {
  status: CellStatus;
  teacher?: string; // teacher id
  plannedDate?: string;
  lastPracticed?: string;
  confidence?: number; // 0-5
  note?: string;
}

export interface Domain {
  id: string;
  label: string;
  relevance: "Very high" | "High" | "Medium" | "Low";
  skills: Record<MatrixColumnId, MatrixCell>;
  vocabulary: string[];
  likelyQuestions: string[];
  listeningSituations: string[];
  readingTexts: string[];
  writingPrompts: string[];
  strengths: string[];
  weaknesses: string[];
  latestNote: string;
  nextAction: string;
  assignedTeacher: string; // teacher id
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  focus: string[];
  strengths: string[];
  limitations: string[];
  bestUse: string;
  relevantSections: SkillId[];
  relevantDomains: string[]; // domain ids
  nextSessionPlan: string;
}

export interface Session {
  id: string;
  date: string; // ISO date
  teacher: string; // teacher id
  duration: number; // minutes
  sections: SkillId[];
  domains: string[]; // domain ids
  covered: string;
  wentWell: string[];
  strugglesWith: string[];
  recurringMistakes: string[];
  vocabulary: string[];
  homework: string;
  recommendedNext: string;
  isSample?: boolean;
}

export interface PlannedSession {
  id: string;
  date: string;
  teacher: string;
  section: SkillId;
  domain: string;
  goal: string;
  status: "planned" | "tentative";
}

export interface Priority {
  id: string;
  rank: number;
  text: string;
  relatedSections: SkillId[];
  relatedDomains: string[];
}

export interface RecurringMistake {
  id: string;
  mistake: string;
  example: string;
  correction: string;
  frequency: "high" | "medium" | "low";
  relatedSections: SkillId[];
  firstSeen: string;
  lastSeen: string;
}
