// ============================================================================
// KDE PREP — SINGLE SOURCE OF TRUTH
// ============================================================================
// Edit this file after every lesson. Nothing else needs to change — every
// page on the site (dashboard, domains, writing, speaking, teachers, lesson
// logs) reads from the arrays below.
//
// ALL CONTENT IN THIS FILE IS CURRENTLY SAMPLE / PLACEHOLDER DATA.
// Replace it gradually with real session notes. Search for `isSample: true`
// to find lesson entries that still need replacing.
//
// See README.md → "Update the site after a lesson" for a step-by-step guide.
// ============================================================================

import type {
  Domain,
  LessonLog,
  PlannedSession,
  RecurringMistake,
  SkillLevel,
  SpeakingItem,
  Teacher,
  TopPriority,
  WritingTask,
} from "./types";
import { readinessFromStatuses, statusCounts } from "../lib/status";

// ---------------------------------------------------------------------------
// THE FOUR KDE SKILLS — one status word each. Detail lives in Domains,
// Writing and Speaking instead of a skill-by-skill breakdown everywhere.
// ---------------------------------------------------------------------------

export const skillLevels: SkillLevel[] = [
  { id: "hoeren", label: "Hören", level: "B1", status: "needs_review" },
  { id: "lesen", label: "Lesen", level: "A2", status: "started" },
  { id: "schreiben", label: "Schreiben", level: "A2", status: "started" },
  { id: "sprechen", label: "Sprechen", level: "B1", status: "started" },
];

// ---------------------------------------------------------------------------
// TEACHERS — each brief is written to be read in under a minute, in full,
// with no click required.
// ---------------------------------------------------------------------------

export const teachers: Teacher[] = [
  {
    id: "heidi",
    name: "Heidi",
    role: "Speaking coach",
    brief:
      "Heidi runs the oral-exam simulations: self-introduction, picture-card topics, and roleplays. She's the one to book whenever a domain needs to move from 'talked about it' to 'can perform it live'.",
    dontRepeat: [
      "Self-introduction basics — done 2026-06-30. Only the closing line still needs work.",
      "Leisure picture-card topic — done 2026-06-30. Use a new topic next time.",
    ],
    sessionPlan:
      "10 min warm-up Q&A → 20 min doctor roleplay → 15 min pharmacy roleplay → 15 min follow-up questions on both.",
    relatedSkills: ["sprechen"],
  },
  {
    id: "patrick",
    name: "Patrick",
    role: "Listening & conversation coach",
    brief:
      "Patrick owns listening and Swiss German survival — the weakest area overall. He also runs spontaneous spoken warm-ups. Short, frequent sessions work better here than long ones.",
    dontRepeat: [
      "Train-announcement listening — done 2026-06-15. Move on to voicemail-style audio.",
    ],
    sessionPlan:
      "5 min warm-up chat → 20 min Swiss German voicemail drill → 20 min standard-German roleplay → 15 min review of missed numbers/names.",
    relatedSkills: ["hoeren", "sprechen"],
  },
  {
    id: "denajder",
    name: "Denajdër",
    role: "Writing & reading coach",
    brief:
      "Denajdër drills the A2 writing checklist and timed reading. Best used for template-based writing correction and scanning real notices (Gemeinde, events) for key facts.",
    dontRepeat: [
      "Sommerfest-Fällanden reading — done 2026-06-22. Use a new notice (Stadtspital or Gemeinde) next time.",
    ],
    sessionPlan:
      "10 min correct last writing homework → 25 min new writing task (untimed) → 25 min timed reading text.",
    relatedSkills: ["lesen", "schreiben"],
  },
];

// ---------------------------------------------------------------------------
// DOMAINS — one status per domain. This is the main "what has Pierre
// covered" view. No per-skill breakdown: the real question is "can he
// handle this topic in German," yes or no.
// ---------------------------------------------------------------------------

export const domains: Domain[] = [
  {
    id: "personal-profile",
    label: "Personal profile",
    status: "started",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-06-30",
    nextAction: "Add a natural closing line to the self-introduction and time it.",
    note: "Fluent up to ~90 seconds; stalls without a closing line.",
  },
  {
    id: "housing",
    label: "Housing / neighbours",
    status: "started",
    priority: "medium",
    teacher: "denajder",
    lastPracticed: "2026-06-05",
    nextAction: "Roleplay responding to a neighbour's noise complaint, spoken and written.",
    note: "Can read a Hausordnung; hasn't spoken about it yet.",
  },
  {
    id: "work-study",
    label: "Work / study",
    status: "started",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-06-19",
    nextAction: "Add a work-related listening voicemail and a short reading text.",
    note: "Describes his job well; 'weil'-clauses still shaky.",
  },
  {
    id: "health",
    label: "Health / doctor / pharmacy",
    status: "needs_review",
    priority: "high",
    teacher: "heidi",
    lastPracticed: "2026-06-28",
    nextAction: "Roleplay: doctor appointment + pharmacy conversation + follow-up questions.",
    note: "Can explain symptoms and book an appointment; pharmacy scenario still open.",
  },
  {
    id: "gemeinde",
    label: "Gemeinde / administration",
    status: "started",
    priority: "high",
    teacher: "denajder",
    lastPracticed: "2026-06-05",
    nextAction: "Read one Gemeinde notice together and extract date, place, deadline.",
    note: "Administrative vocabulary still thin.",
  },
  {
    id: "school-family",
    label: "School / family / children",
    status: "not_covered",
    priority: "low",
    teacher: "denajder",
    lastPracticed: null,
    nextAction: "Introduce vocabulary only, then one short reading text.",
  },
  {
    id: "shopping-services",
    label: "Shopping / services",
    status: "started",
    priority: "low",
    teacher: "denajder",
    lastPracticed: "2026-06-12",
    nextAction: "Read a store flyer/notice; extract prices, dates, hours.",
    note: "Basic shopping vocabulary sits; complaint language missing.",
  },
  {
    id: "transport",
    label: "Transport / directions",
    status: "started",
    priority: "medium",
    teacher: "patrick",
    lastPracticed: "2026-06-15",
    nextAction: "More listening drills on real announcements — numbers and platform changes.",
    note: "Understands simple directions; misses numbers in fast announcements.",
  },
  {
    id: "leisure",
    label: "Leisure / events / clubs",
    status: "started",
    priority: "low",
    teacher: "patrick",
    lastPracticed: "2026-06-30",
    nextAction: "Listen to a radio-style event announcement; answer true/false questions.",
    note: "Can describe hobbies; event-listening not tested yet.",
  },
  {
    id: "waste",
    label: "Waste / recycling / environment",
    status: "not_covered",
    priority: "low",
    teacher: "denajder",
    lastPracticed: null,
    nextAction: "First reading pass on a waste-collection notice.",
  },
  {
    id: "civic-admin",
    label: "Civic-admin reading / voting logistics",
    status: "not_covered",
    priority: "medium",
    teacher: "denajder",
    lastPracticed: null,
    nextAction: "Reading drill: voting instructions as a language task (deadlines, requirements).",
    note: "Language-comprehension context only — not a civics test.",
  },
  {
    id: "swiss-german",
    label: "Swiss German listening survival",
    status: "needs_review",
    priority: "high",
    teacher: "patrick",
    lastPracticed: "2026-06-28",
    nextAction: "Weekly voicemail drill — extract key facts only, not full comprehension.",
    note: "Understands isolated words only; numbers and times are hardest.",
  },
  {
    id: "money-insurance",
    label: "Money / insurance / bills",
    status: "not_covered",
    priority: "medium",
    teacher: "denajder",
    lastPracticed: null,
    nextAction: "Read one invoice or insurance letter and extract amount, deadline, sender.",
    note: "Important everyday reading domain; no stable vocabulary yet.",
  },
  {
    id: "emergencies",
    label: "Emergencies / safety",
    status: "not_covered",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: null,
    nextAction: "Roleplay asking for help, describing a simple accident, and giving an address.",
    note: "High usefulness; needs controlled speaking formulas first.",
  },
  {
    id: "digital-services",
    label: "Digital services / appointments",
    status: "not_covered",
    priority: "low",
    teacher: "denajder",
    lastPracticed: null,
    nextAction: "Practice booking or changing an online appointment using simple written German.",
    note: "Good bridge between administration vocabulary and writing tasks.",
  },
];

// ---------------------------------------------------------------------------
// WRITING — A2 task checklist. Writing gets its own page because the exam
// needs concrete task competence, not general "reading/writing improved."
// ---------------------------------------------------------------------------

export const writingTasks: WritingTask[] = [
  {
    id: "invitation",
    label: "Write an invitation",
    status: "started",
    modelAnswer:
      "Zürich, 3. Juli 2026\n\nLiebe Kolleginnen und Kollegen\n\nSeit zehn Jahren arbeite ich in unserer Firma. Das möchte ich mit einem Apéro feiern. Er ist am Freitag, 17. Juli, ab 17 Uhr im Pausenraum. Bitte meldet euch bis 10. Juli bei mir an.\n\nFreundliche Grüsse\nPierre",
    mistakes: ["Text too short for the prompt (target: ca. 40 Wörter)", "Forgot to say where to register"],
    nextDrill: "Rewrite to about 40 words, keep the registration request.",
  },
  {
    id: "reply-to-invitation",
    label: "Reply to an invitation",
    status: "not_covered",
    mistakes: [],
    nextDrill: "First attempt: accept an invitation and ask one question about it.",
  },
  {
    id: "appointment-change",
    label: "Cancel or move an appointment",
    status: "started",
    mistakes: ["Sometimes omits the closing formula"],
    nextDrill: "Write a full version from scratch, then check the ca. 40-word target.",
  },
  {
    id: "information-request",
    label: "Request information",
    status: "not_covered",
    mistakes: [],
    nextDrill: "First attempt: ask the Gemeinde for a form or an opening-hours detail.",
  },
  {
    id: "apology-explanation",
    label: "Apologise / explain a problem",
    status: "not_covered",
    mistakes: [],
    nextDrill: "First attempt: explain why a delivery/appointment needs to change.",
  },
  {
    id: "neighbour-message",
    label: "Write a neighbour or housing message",
    status: "needs_review",
    mistakes: ["Word order after 'weil' when giving a reason"],
    nextDrill: "Rewrite the noise-complaint reply, checking 'weil' word order.",
  },
];

// ---------------------------------------------------------------------------
// SPEAKING — B1 checklist. Formulas and structure live in reference.ts;
// this is just the status of each trackable piece.
// ---------------------------------------------------------------------------

export const speakingChecklist: SpeakingItem[] = [
  {
    id: "self-introduction",
    label: "2-minute self-introduction",
    status: "started",
    note: "Fluent to ~90 seconds; needs a closing line to reach 2 minutes.",
  },
  {
    id: "picture-card",
    label: "Picture-card structure",
    status: "started",
    note: "First attempt done (leisure topic); ran short, giving an opinion was the weak step.",
  },
  {
    id: "follow-up-questions",
    label: "Follow-up question readiness",
    status: "not_covered",
    note: "Not drilled as a standalone exercise yet — hesitates when examiners improvise.",
  },
];

// ---------------------------------------------------------------------------
// LESSON LOG — concrete and reusable as study material: vocabulary, verbs,
// grammar, mistakes, what Pierre can now do, what to repeat next.
// ---------------------------------------------------------------------------

export const lessonLogs: LessonLog[] = [
  {
    id: "l1",
    date: "2026-06-10",
    teacher: "heidi",
    domains: ["personal-profile"],
    skills: ["sprechen"],
    practiced: "First draft of the 2-minute self-introduction (Name, Wohnort, Familie, Arbeit, Freizeit).",
    vocabulary: ["der Wohnort", "der Familienstand", "die Herkunft"],
    verbs: ["heissen", "wohnen", "arbeiten"],
    grammar: ["Verb-second word order in main clauses"],
    mistakes: ["Stops after ~70 seconds, no closing line"],
    canNowDo: "Introduce himself with name, home town and job in a fixed order.",
    repeatNext: "Add a closing sentence and repeat with timing.",
    isSample: true,
  },
  {
    id: "l2",
    date: "2026-06-15",
    teacher: "patrick",
    domains: ["transport", "swiss-german"],
    skills: ["hoeren"],
    practiced: "Train station announcements (delays, platform changes) and a first short Swiss German clip.",
    vocabulary: ["die Verspätung", "das Gleis", "umsteigen"],
    verbs: ["umsteigen", "ankommen", "abfahren"],
    grammar: ["Separable verbs in announcements (an-kommen, ab-fahren)"],
    mistakes: ["Misses platform numbers", "Understood almost nothing of the Swiss German clip"],
    canNowDo: "Recognise 'delay' and 'platform change' in slow standard German.",
    repeatNext: "Same clip type, slower Swiss German with pre-taught vocabulary.",
    isSample: true,
  },
  {
    id: "l3",
    date: "2026-06-17",
    teacher: "denajder",
    domains: ["work-study"],
    skills: ["schreiben"],
    practiced: "6-part writing structure; drafted the Apéro invitation task.",
    vocabulary: ["der Apéro", "die Kollegen", "sich anmelden"],
    verbs: ["einladen", "sich anmelden", "stattfinden"],
    grammar: ["Word order: time – manner – place"],
    mistakes: ["Text too short for the prompt (target: ca. 40 Wörter)", "Forgot to say where to register"],
    canNowDo: "Write a basic invitation with a date and a place.",
    repeatNext: "Rewrite to about 40 words including the registration request.",
    isSample: true,
  },
  {
    id: "l4",
    date: "2026-06-19",
    teacher: "heidi",
    domains: ["work-study"],
    skills: ["sprechen"],
    practiced: "Talking about work: role, daily tasks, colleagues.",
    vocabulary: ["der Arbeitgeber", "die Teilzeit", "der Kollege"],
    verbs: ["arbeiten", "zusammenarbeiten", "gefallen"],
    grammar: ["Word order after 'weil' (verb-final)"],
    mistakes: ["'weil ich bin froh' instead of 'weil ich froh bin'"],
    canNowDo: "Describe his job and daily tasks in simple sentences.",
    repeatNext: "5 more 'weil' sentences about work, checked for word order.",
    isSample: true,
  },
  {
    id: "l5",
    date: "2026-06-22",
    teacher: "denajder",
    domains: ["leisure"],
    skills: ["lesen"],
    practiced: "Reading the 'Sommerfest in Fällanden' programme: dates, times, locations.",
    vocabulary: ["die Anmeldefrist", "das Programm", "die Teilnahme"],
    verbs: ["teilnehmen", "sich anmelden", "stattfinden"],
    grammar: ["Dates written as '14. Juni' vs '14.6.'"],
    mistakes: ["Missed the registration deadline in the text"],
    canNowDo: "Find dates, times and locations in a short event programme.",
    repeatNext: "New text under time pressure (Stadtspital open day).",
    isSample: true,
  },
  {
    id: "l6",
    date: "2026-06-24",
    teacher: "patrick",
    domains: ["health", "swiss-german"],
    skills: ["hoeren"],
    practiced: "Short Swiss German clip: doctor's practice voicemail about an appointment change.",
    vocabulary: ["de Arzttermin", "verschiebe"],
    verbs: ["verschieben", "zrugruefe (zurückrufen)"],
    grammar: ["Numbers in Swiss German (zwänzg, drüssg)"],
    mistakes: ["Could not extract the new date/time"],
    canNowDo: "Recognise the word 'Termin' in Swiss German audio.",
    repeatNext: "Same voicemail type daily this week, different examples.",
    isSample: true,
  },
  {
    id: "l7",
    date: "2026-06-28",
    teacher: "patrick",
    domains: ["health"],
    skills: ["sprechen", "hoeren"],
    practiced: "Explaining symptoms, making a doctor appointment, understanding a voicemail.",
    vocabulary: ["der Termin", "verschieben", "die Apotheke", "der Notfalldienst", "die Beschwerden"],
    verbs: ["anrufen", "absagen", "verschieben", "brauchen"],
    grammar: ["Word order after 'weil'"],
    mistakes: ["Word order after 'weil'", "Difficulty understanding the Swiss German voicemail"],
    canNowDo: "Ask for a doctor appointment in simple German.",
    repeatNext: "Swiss German voicemail + pharmacy roleplay.",
    isSample: true,
  },
  {
    id: "l8",
    date: "2026-06-30",
    teacher: "heidi",
    domains: ["leisure", "personal-profile"],
    skills: ["sprechen"],
    practiced: "First picture-card simulation (leisure/clubs) using the 6-step speaking structure.",
    vocabulary: ["der Verein", "das Sommerfest"],
    verbs: ["mitmachen", "organisieren"],
    grammar: ["Giving an opinion: 'Ich finde ... weil ...'"],
    mistakes: ["Struggled to give a personal opinion", "Ran under time (3 of 5 minutes)"],
    canNowDo: "Describe a picture and connect it to his personal life.",
    repeatNext: "Second picture-card simulation on a health/doctor topic, full 5 minutes.",
    isSample: true,
  },
];

// ---------------------------------------------------------------------------
// PLANNED SESSIONS
// ---------------------------------------------------------------------------

export const plannedSessions: PlannedSession[] = [
  {
    id: "p1",
    date: "2026-07-08",
    teacher: "patrick",
    domain: "swiss-german",
    goal: "Swiss German voicemail drill: 3 short messages (injury, Elternabend, transport) — key facts only.",
  },
  {
    id: "p2",
    date: "2026-07-09",
    teacher: "denajder",
    domain: "work-study",
    goal: "Writing: invitation word count, then appointment change and information request.",
  },
  {
    id: "p3",
    date: "2026-07-10",
    teacher: "heidi",
    domain: "health",
    goal: "Roleplay: doctor appointment, follow-up questions, then a pharmacy scenario.",
  },
  {
    id: "p4",
    date: "2026-07-14",
    teacher: "heidi",
    domain: "leisure",
    goal: "Second picture-card simulation, full 5-minute structure with follow-up questions.",
  },
];

// ---------------------------------------------------------------------------
// TOP PRIORITIES — short list. This is what "study next" means right now.
// ---------------------------------------------------------------------------

export const priorities: TopPriority[] = [
  { id: "pr1", rank: 1, text: "Finish the 2-minute self-introduction with a closing line." },
  { id: "pr2", rank: 2, text: "Practice the health/doctor/pharmacy scenario end-to-end." },
  { id: "pr3", rank: 3, text: "Practice Swiss German voicemail comprehension (numbers, times, key facts)." },
  { id: "pr4", rank: 4, text: "Work through the writing checklist: invitation, appointment change, information request." },
  { id: "pr5", rank: 5, text: "Read Gemeinde notices and event programmes for key facts." },
  { id: "pr6", rank: 6, text: "Run one full timed mock exam." },
];

// ---------------------------------------------------------------------------
// RECURRING MISTAKES
// ---------------------------------------------------------------------------

export const recurringMistakes: RecurringMistake[] = [
  {
    id: "weil-word-order",
    mistake: "Verb-final word order after 'weil' is often skipped",
    example: "Ich kann nicht kommen, weil ich bin krank.",
    correction: "Ich kann nicht kommen, weil ich krank bin.",
    relatedSkills: ["sprechen", "schreiben"],
  },
  {
    id: "swiss-german-numbers",
    mistake: "Numbers, times and place names are misheard in Swiss German audio",
    example: "Hears 'zwänzg' as 'zwei', or misses the callback number entirely",
    correction: "Listen for key info only — pause after each number/name and write it down",
    relatedSkills: ["hoeren"],
  },
  {
    id: "dative-prepositions",
    mistake: "Mixes up dative/accusative after two-way prepositions (in, auf, bei)",
    example: "Ich gehe in der Apotheke. (should be 'in die Apotheke')",
    correction: "Drill motion (accusative) vs. location (dative) minimal pairs",
    relatedSkills: ["sprechen", "schreiben"],
  },
  {
    id: "perfekt-aux",
    mistake: "Wrong auxiliary verb in Perfekt (haben vs. sein)",
    example: "Ich habe zum Arzt gegangen. (should be 'bin gegangen')",
    correction: "Drill the sein-verb list (gehen, kommen, bleiben, sein...) separately",
    relatedSkills: ["sprechen", "schreiben"],
  },
];

// ---------------------------------------------------------------------------
// Helper lookups (do not edit — derived from the data above)
// ---------------------------------------------------------------------------

export const teacherById = (id: string) => teachers.find((t) => t.id === id);
export const domainById = (id: string) => domains.find((d) => d.id === id);

export const lessonLogsSorted = () =>
  [...lessonLogs].sort((a, b) => (a.date < b.date ? 1 : -1));

export const plannedSessionsSorted = () =>
  [...plannedSessions].sort((a, b) => (a.date < b.date ? -1 : 1));

export const nextPlannedSession = () => plannedSessionsSorted()[0];

// The teacher's "what to do next" — derived from plannedSessions instead of
// a separately-authored field, so the two can never drift out of sync.
export const nextSessionForTeacher = (teacherId: string) =>
  plannedSessionsSorted().find((p) => p.teacher === teacherId);

export const overallReadiness = () => readinessFromStatuses(domains);

export const readinessLabel = (pct: number) => {
  if (pct >= 76) return "Exam-ready";
  if (pct >= 51) return "Getting close";
  if (pct >= 26) return "Early preparation";
  return "Just starting";
};

export const domainStatusCounts = () => {
  const counts = statusCounts(domains);
  return {
    not_covered: counts.not_covered,
    started: counts.started,
    needs_review: counts.needs_review,
    ready: counts.ready,
  };
};
