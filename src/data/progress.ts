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
  { id: "lesen", label: "Lesen", level: "A2", status: "needs_review" },
  { id: "schreiben", label: "Schreiben", level: "A2", status: "started" },
  { id: "sprechen", label: "Sprechen", level: "B1", status: "needs_review" },
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
    status: "needs_review",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-07-03",
    nextAction: "Extend the self-introduction and personality answers, then repeat without French/English.",
    note: "Can produce core intro and personality chunks with support; still needs cleaner German-only delivery.",
  },
  {
    id: "housing",
    label: "Housing / neighbours",
    status: "needs_review",
    priority: "medium",
    teacher: "denajder",
    lastPracticed: "2026-07-04",
    nextAction: "Run a German-only neighbour roleplay, then write a 40-60 word complaint or reply about noise or rubbish.",
    note: "Can answer supported Wohnraum questions and use a basic polite neighbour complaint formula; still needs German-only delivery, word order and separable verbs.",
  },
  {
    id: "work-study",
    label: "Work / study",
    status: "needs_review",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-07-03",
    nextAction: "Prepare a short answer for why his personality fits research/work, using simple dass/weil clauses.",
    note: "Can connect curiosity/personality to work with support; production becomes unstable when sentences get complex.",
  },
  {
    id: "health",
    label: "Health / doctor / pharmacy",
    status: "needs_review",
    priority: "high",
    teacher: "heidi",
    lastPracticed: "2026-07-01",
    nextAction: "Roleplay: doctor appointment + pharmacy conversation + follow-up questions.",
    note: "Can handle simple health-notice reading with support; spoken doctor/pharmacy scenario still needs a full roleplay.",
  },
  {
    id: "gemeinde",
    label: "Gemeinde / administration",
    status: "started",
    priority: "high",
    teacher: "denajder",
    lastPracticed: "2026-07-01",
    nextAction: "Read one Gemeinde notice together and extract date, place, deadline.",
    note: "Exam purpose discussed; needs real timed Gemeinde reading/writing evidence.",
  },
  {
    id: "school-family",
    label: "School / family / children",
    status: "started",
    priority: "low",
    teacher: "denajder",
    lastPracticed: "2026-07-03",
    nextAction: "Practise four clean sentences about family members' personalities and similarities.",
    note: "Family personality was introduced: father, mother, brother, and similarity to father.",
  },
  {
    id: "shopping-services",
    label: "Shopping / services",
    status: "needs_review",
    priority: "low",
    teacher: "denajder",
    lastPracticed: "2026-07-02",
    nextAction: "Practise one shop/service roleplay with delivery, return or complaint follow-up.",
    note: "Can discuss simple food/shop preferences and Coop/Migros opinions with support; complaint language still missing.",
  },
  {
    id: "transport",
    label: "Transport / directions",
    status: "started",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-07-03",
    nextAction: "Describe a station photo and drill 'warten auf den Zug', delays, platforms and personal transport habits.",
    note: "Practised train-station picture description and accusative chunks; fast announcement listening still needs Patrick.",
  },
  {
    id: "leisure",
    label: "Leisure / events / clubs",
    status: "needs_review",
    priority: "low",
    teacher: "patrick",
    lastPracticed: "2026-07-02",
    nextAction: "Run a German-only holiday/free-time speaking drill, then a radio-style event listening task.",
    note: "Guided lyric reading and dream-holiday speaking practised; event-listening not tested yet.",
  },
  {
    id: "waste",
    label: "Waste / recycling / environment",
    status: "started",
    priority: "low",
    teacher: "denajder",
    lastPracticed: "2026-07-04",
    nextAction: "Read one waste-collection notice and practise Müll, wegwerfen, Abholung and Container.",
    note: "Introduced through a neighbour rubbish roleplay: der Müll, wegwerfen, Das ist nicht mein Müll.",
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
    status: "started",
    priority: "low",
    teacher: "denajder",
    lastPracticed: "2026-07-03",
    nextAction: "Write one appointment-change email independently under time pressure.",
    note: "Supported appointment-rescheduling email practised with Heidi; formal formulas and cases still need review.",
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
    status: "needs_review",
    mistakes: [
      "Sometimes omits the closing formula",
      "Needs support for formal greeting, date and Rückmeldung formula",
      "Case errors: den Termin, einen Arzt, zu unserem Termin",
    ],
    nextDrill: "Timed 40-60 word appointment-change email without a formula sheet, then correct only cases and word order.",
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
    status: "started",
    mistakes: ["Reason sentence needed teacher support: krank sein, Arzt besuchen, leider nicht kommen können"],
    nextDrill: "Write three short excuse sentences for an appointment, delivery and course absence.",
  },
  {
    id: "neighbour-message",
    label: "Write a neighbour or housing message",
    status: "needs_review",
    mistakes: ["Word order after 'weil' when giving a reason"],
    nextDrill: "Timed 40-60 word message to a neighbour: ask them to lower music or remove rubbish; include greeting, request, reason with weil, and closing.",
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
    status: "needs_review",
    note: "Core chunks are available, but the July 3 attempt was still short and needed support to expand free-time details.",
  },
  {
    id: "picture-card",
    label: "Picture-card structure",
    status: "needs_review",
    note: "Second attempt done with a train-station photo; can start the task, but needs longer description, opinion variety and case control.",
  },
  {
    id: "follow-up-questions",
    label: "Follow-up question readiness",
    status: "needs_review",
    note: "Handles supported follow-ups on Alltag, opinions, personality and neighbour conflicts, but still needs vocabulary rescue and often switches languages.",
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
  {
    id: "l9",
    date: "2026-07-01",
    teacher: "denajder",
    domains: ["personal-profile", "work-study", "gemeinde"],
    skills: ["sprechen", "schreiben", "lesen", "hoeren"],
    practiced:
      "First Denajder intake lesson: clarified KDE exam goals, explained background/work in mixed German-English, and agreed on exam-focused speaking, writing, listening and reading workflow.",
    vocabulary: [
      "die Staatsbürgerschaft",
      "die Prüfung",
      "in zwei Wochen",
      "die E-Mail",
      "die Frage",
      "das Formular",
      "die Frist",
    ],
    verbs: ["wohnen", "kommen", "arbeiten", "brauchen", "verstehen", "schreiben", "verschieben"],
    grammar: [
      "Verb-final word order after dass/weil",
      "Fixed chunks for cases: in der Schweiz, in den USA, für die Prüfung",
    ],
    mistakes: [
      "Frequent switch to French/English when searching for words",
      "Unstable self-introduction chunks: aus Frankreich / in der Schweiz / in den USA",
      "Time expression error around 'in zwei Wochen'",
      "Avoids cases/articles instead of memorising essential fixed phrases",
    ],
    canNowDo:
      "Explain the exam goal and personal background with support, and identify the lesson strategy for the next two weeks.",
    repeatNext:
      "Run one real Denajder task: 10-minute reading notice or 40-word A2 email, plus spontaneous speaking from pre-taught vocabulary.",
  },
  {
    id: "l10",
    date: "2026-07-01",
    teacher: "heidi",
    domains: ["personal-profile", "work-study", "leisure", "health", "gemeinde"],
    skills: ["sprechen", "lesen", "hoeren"],
    practiced:
      "First Heidi intake lesson: clarified the KDE exam format, gave a supported self-introduction, reviewed the model test, briefly listened to one sample audio, and worked through Sommerfest and Stadtspital A2 reading tasks.",
    vocabulary: [
      "die Prüfung",
      "in zwei Wochen",
      "die Staatsbürgerschaft",
      "der Bürger",
      "die Forschung",
      "der Wissenschaftler",
      "über den Alltag",
      "das Dorfszentrum",
      "außerhalb",
      "mitorganisieren",
      "die Feuerwehr",
      "der Verein",
      "der Wettbewerb",
      "die Anzeige",
      "Tag der offenen Tür",
      "kostenlos",
      "eintragen",
      "untersuchen lassen",
      "die Ausnahme",
    ],
    verbs: [
      "sich vorstellen",
      "wohnen",
      "arbeiten",
      "sich integrieren",
      "stattfinden",
      "mitorganisieren",
      "überprüfen",
      "eintragen",
      "untersuchen lassen",
    ],
    grammar: [
      "Fixed chunks: in zwei Wochen, in der Schweiz, in Frankreich, für die Prüfung",
      "über + Akkusativ: über den Alltag",
      "lassen as auxiliary: two infinitives in Perfekt, e.g. reparieren lassen",
      "Keep exam German simple instead of overbuilding grammar",
    ],
    mistakes: [
      "Said 'zwei Foren' instead of 'zwei Wochen'",
      "Frequent switches to French/English during self-introduction",
      "Unstable phrasing for Swiss citizenship / naturalisation goal",
      "Needed vocabulary support for common notice words such as außerhalb, Verein, Anzeige and Wettbewerb",
      "Article and case errors in reading discussion, e.g. 'ein kostenlose Gesundheitscheck'",
    ],
    canNowDo:
      "Explain the exam goal and personal context with support, and extract several key facts from simple event/health notices when guided.",
    repeatNext:
      "Run a German-only doctor appointment roleplay, then repeat a timed notice-reading task without vocabulary rescue before checking answers.",
  },
  {
    id: "l11",
    date: "2026-06-30",
    teacher: "patrick",
    domains: ["personal-profile", "work-study", "leisure", "shopping-services"],
    skills: ["sprechen", "lesen"],
    practiced:
      "First Patrick diagnostic lesson: German self-introduction, spontaneous Q&A, restaurant ordering roleplay, electronics-shop TV roleplay, and guided reading comprehension about a weekend in Vienna.",
    vocabulary: [
      "das Knie",
      "die Freizeit",
      "das Beispiel",
      "der Kellner",
      "der Apfelstrudel",
      "die Schlagsahne",
      "der Fernseher",
      "der Vorschlag",
      "die Vorschläge",
      "der Zoll",
      "die Altstadt",
      "die Sehenswürdigkeit",
      "die Aussicht",
      "die Ausstellung",
      "die Sonnenstrahlen",
    ],
    verbs: ["werden", "arbeiten", "bestellen", "zahlen", "kaufen", "liefern", "besuchen", "genießen"],
    grammar: [
      "Verb-second after fronted phrases: In meiner Freizeit mache ich...",
      "Fixed phrase: Ich möchte Schweizer werden.",
      "Question phrase: Soll ich die Frage beantworten?",
      "Polite service questions with Haben Sie...? and Können Sie...?",
    ],
    mistakes: [
      "Frequent switch to English/French when searching for words",
      "Unstable citizenship phrase before correction: Ich möchte Schweizer werden",
      "Article and case errors in common chunks: in meiner Freizeit, mit meiner Freundin, einen Fernseher",
      "Shop roleplay confusion between kaufen and verkaufen",
      "Guided reading needed vocabulary support for Altstadt, Sehenswürdigkeiten, Aussicht, Ausstellung and genossen",
    ],
    canNowDo:
      "Handle basic personal questions, order in a restaurant, ask for help buying a TV, and answer simple guided reading questions with support.",
    repeatNext:
      "Run a German-only speaking drill with repair phrases, then one timed A2 reading task without translation support.",
  },
  {
    id: "l12",
    date: "2026-07-02",
    teacher: "patrick",
    domains: ["personal-profile", "work-study", "leisure", "shopping-services"],
    skills: ["sprechen", "lesen"],
    practiced:
      "Second Patrick lesson: reviewed the exam plan and dashboard, worked through Adel Tawil's 'Lieder' for guided reading, pronunciation and vocabulary, then practised spontaneous speaking about daily routine, pizza, Coop/Migros opinions and dream holidays.",
    vocabulary: [
      "müde",
      "die Vorbereitung",
      "die fertige Version",
      "der Bildschirm",
      "die Nachricht",
      "die Begrüßung",
      "das Lied",
      "die Träne",
      "das Auge",
      "der Ägypter",
      "die Taube",
      "der Dornenwald",
      "wundervoll",
      "der Held",
      "der Regen",
      "fremd",
      "das eigene Land",
      "das Gehirn",
      "berühmt",
      "die Ewigkeit",
      "der Verlierer",
      "der Mönch",
      "der Alltag",
      "der Schinken",
      "die Pilze",
      "die Insel",
      "die Traumferien",
    ],
    verbs: [
      "bestätigen",
      "teilen",
      "lesen",
      "aussprechen",
      "verstehen",
      "aufstehen",
      "zu Mittag essen",
      "bestellen",
      "zustimmen",
      "reisen",
      "fliegen",
      "sich erinnern",
    ],
    grammar: [
      "Separable verbs: Ich stehe um neun Uhr auf.",
      "Verb-second after time phrases: Am Morgen lerne ich Deutsch. Dann arbeite ich.",
      "Verb-final word order after dass: Ich denke nicht, dass das Personal im Coop freundlicher ist.",
      "Location phrases: in der Bäckerei, im Bahnhof, auf einer Insel.",
      "Comparatives for opinions: besser als, freundlicher.",
      "Recognising simple past forms in song lyrics: ging, war, starb, ließ, sang, traf, hielt.",
    ],
    mistakes: [
      "Frequent switches to English/French when explaining the plan or searching for vocabulary",
      "Case/article errors: mit zwei anderen Lehrern, einen Saft, in der Bäckerei",
      "Unstable time phrase: Ich stehe um neun Uhr auf",
      "Needed support for everyday food/shop words: Schinken, Pilze, bestellen, Personal",
      "Confused similar-looking lyric words, especially Dornenwald and wundervoll",
      "Dream-holiday answer was hard to produce cleanly: auf Mauritius, auf einer Insel",
    ],
    canNowDo:
      "Give simple supported answers about daily routine, food preferences and Coop/Migros opinions, and work through song lyrics with vocabulary help.",
    repeatNext:
      "Run German-only vocabulary drills by domain, then start Swiss German key-fact listening with short voicemails.",
  },
  {
    id: "l13",
    date: "2026-07-03",
    teacher: "heidi",
    domains: ["personal-profile", "work-study", "leisure", "transport", "health", "digital-services"],
    skills: ["sprechen", "schreiben"],
    practiced:
      "Second Heidi lesson: self-introduction, train-station picture-card description, opinion phrases with ich denke/glaube/finde/meine, dass word order, accusative basics, and a supported formal email to postpone an appointment.",
    vocabulary: [
      "französisch",
      "die eigene Erfahrung",
      "der Bahnhof",
      "der Zug",
      "die Verspätung",
      "die Kenntnis",
      "der Termin",
      "die Rückmeldung",
      "die baldige Rückmeldung",
      "die Ausländerbehörde",
    ],
    verbs: [
      "auswählen",
      "warten auf",
      "nehmen",
      "sich erinnern",
      "tun",
      "machen",
      "schaffen",
      "verschieben",
      "vereinbaren",
      "besuchen",
      "schicken",
    ],
    grammar: [
      "Verb-final word order after dass: Ich denke, dass das Wetter kalt ist.",
      "Modal verb at the end in dass clauses: Ich denke, dass ich es tun kann.",
      "Accusative articles: der -> den, das -> das, die -> die.",
      "warten auf + Akkusativ: Sie warten auf den Zug.",
      "dir vs dich: Ich sehe dich; ich schicke dir.",
      "Formal email punctuation: lowercase after Sehr geehrte Frau Kamrani,",
      "Polite Konjunktiv II: Können wir den Termin ... vereinbaren?",
    ],
    mistakes: [
      "Self-introduction still too short for the exam; needs more detail and a closing line.",
      "Picture-card answer needed support for structure, length and opinion language.",
      "Article/case errors: auf den Zug, den Termin, einen Arzt.",
      "Word order after dass not automatic yet.",
      "Frequent switch to French/English when searching for words.",
      "Formal email formulas needed teacher support: greeting, closing and Rückmeldung sentence.",
    ],
    canNowDo:
      "Start a picture-card description about a train-station scene and write a supported appointment-rescheduling email with excuse, new time and formal closing.",
    repeatNext:
      "Repeat the same two tasks independently: one 5-minute picture-card answer and one timed 40-60 word appointment-change email without teacher-supplied formulas.",
  },
  {
    id: "l14",
    date: "2026-07-03",
    teacher: "denajder",
    domains: ["personal-profile", "work-study", "school-family"],
    skills: ["sprechen"],
    practiced:
      "Second Denajder lesson: personality-topic speaking from the book, including happiness, anger, arrogance, shyness, family personality, friendship qualities and what influences personality. Also discussed oral-exam format and next-step strategy for writing templates and domain vocabulary.",
    vocabulary: [
      "bitteschön",
      "klauen",
      "wütend",
      "dickköpfig",
      "schüchtern",
      "die Gelegenheit",
      "die Eigenschaft",
      "die Art",
      "geeignet",
      "neugierig",
      "ehrlich",
      "die Ehrlichkeit",
      "höflich",
      "die Höflichkeit",
      "selbstbewusst",
      "lügen",
    ],
    verbs: ["klauen", "entfernen", "beeinflussen", "verändern", "formen", "passen", "lügen", "verbessern"],
    grammar: [
      "Past-time clause with als: Als ich ein Kind war, war ich sehr schüchtern.",
      "Verb-final word order after dass: Ich denke, dass ich wie mein Vater bin.",
      "Relative clauses with die: Ich mag keine Leute, die wütend sind.",
      "Comparison with wie: Ich bin wie mein Vater.",
      "Dative after mit: mit meinem Vater, mit meinen Freunden, mit meinen Kollegen.",
    ],
    mistakes: [
      "Used wenn instead of als for a past-time childhood sentence.",
      "Unstable dass word order: Ich denke, dass ich wie mein Vater bin.",
      "Case/article errors around Vater/Freunde/Kollegen and von mir.",
      "Frequent switches to English/French while searching for vocabulary.",
      "Needed teacher support to build relative clauses such as die wütend sind.",
    ],
    canNowDo:
      "Answer supported personality questions and give simple opinions about himself, family members and friendship qualities.",
    repeatNext:
      "Turn the personality answers into 8 memorisable German-only model answers, then do one timed writing template and one timed reading notice.",
  },
  {
    id: "l15",
    date: "2026-07-04",
    teacher: "denajder",
    domains: ["housing", "waste"],
    skills: ["sprechen"],
    practiced:
      "Third Denajder lesson: Wohnraum discussion from the book, adapted into neighbour scenarios. Practised housing change over 50 years, city vs countryside, Wohngemeinschaften, polite noise complaint, party/police escalation, and a rubbish conflict roleplay.",
    vocabulary: [
      "der Wohnraum",
      "die Wohngemeinschaft",
      "heutzutage",
      "auf dem Land",
      "in Städten",
      "beliebt",
      "beliebter",
      "teuer",
      "günstiger",
      "der Nachbar",
      "respektvoll",
      "die Hausarbeiten",
      "laut",
      "leise",
      "die Erlaubnis",
      "die Polizei",
      "der Müll",
    ],
    verbs: [
      "sich verändern",
      "wohnen",
      "umziehen",
      "teilen",
      "helfen",
      "bevorzugen",
      "leiser machen",
      "anrufen",
      "wegwerfen",
      "wiederkommen",
    ],
    grammar: [
      "Reflexive verb: Der Wohnraum hat sich verändert.",
      "Verb-second after fronted phrases: Heutzutage leben mehr Menschen in Städten.",
      "Opinion frame with verb-second: Meiner Meinung nach sollen die Nachbarn respektvoll sein.",
      "Verb-final word order after weil: weil es in der Stadt mehr Arbeitsplätze gibt.",
      "Comparatives with als: teurer als vor fünfzig Jahren.",
      "zu + Infinitiv after bevorzugen: Ich bevorzuge, allein zu wohnen.",
      "Modal verbs without zu: Ich möchte allein wohnen.",
      "Polite Konjunktiv II: Könnten Sie die Musik bitte leiser machen?",
      "Separable verbs: Ich rufe die Polizei an; den Müll wegwerfen.",
    ],
    mistakes: [
      "Frequent switches to English/French when planning answers or searching for vocabulary.",
      "Comparison/time phrase errors: teurer als vor fünfzig Jahren.",
      "Word order after fronted phrases and after weil not automatic yet.",
      "Case/article errors after mit and in location phrases: mit einem Plan, in der Stadt.",
      "Plural and agreement errors: Häuser, Wohnungen sind teuer, Wohnraum ist teuer.",
      "Neighbour roleplay formulas needed teacher support, especially polite register and separable verbs.",
    ],
    canNowDo:
      "Produce supported short answers about housing and shared flats, and use a basic polite neighbour complaint formula: Könnten Sie die Musik bitte leiser machen?",
    repeatNext:
      "Repeat housing/neighbour roleplays German-only, then write a 40-60 word neighbour message about noise or rubbish without teacher-supplied formulas.",
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
    goal: "Domain vocabulary sprint, then Swiss German voicemail drill: key facts only.",
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
    id: "dass-word-order",
    mistake: "Verb-final word order after 'dass' is not automatic",
    example: "Ich denke, das Wetter kalt ist.",
    correction: "Ich denke, dass das Wetter kalt ist.",
    relatedSkills: ["sprechen", "schreiben"],
  },
  {
    id: "accusative-articles",
    mistake: "Accusative masculine article is often left as 'der' or avoided",
    example: "Ich nehme der Zug / Sie warten einen Zug.",
    correction: "Ich nehme den Zug / Sie warten auf den Zug.",
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
