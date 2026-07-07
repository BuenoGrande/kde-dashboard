// ============================================================================
// KDE PREP — SINGLE SOURCE OF TRUTH
// ============================================================================
// Edit this file after every lesson. Nothing else needs to change — every
// page on the site (dashboard, domains, writing, speaking, teachers, lesson
// logs) reads from the arrays below.
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
      "KDE format overview and supported self-introduction — covered 2026-07-01. Keep future sessions task-practice focused.",
      "Train-station picture-card setup — practised 2026-07-03. Reuse only to test independent performance.",
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
      "Diagnostic restaurant, TV-shop and Vienna-reading tasks — done 2026-06-30. Move to timed or German-only versions.",
      "Guided lyric reading with 'Lieder' — done 2026-07-02. Prefer domain vocabulary and Swiss German key facts next.",
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
      "Exam intake and background discussion — done 2026-07-01. Move to timed reading/writing tasks.",
      "Personality speaking prompts — done 2026-07-03. Reuse only as German-only model-answer review.",
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
    lastPracticed: "2026-07-06",
    nextAction: "Run a full 5-minute Wohnung/WG topic answer, then a neighbour-noise follow-up without English.",
    note: "Can answer supported Wohnraum/WG questions, compare city and countryside housing, and discuss noise complaints; still needs German-only delivery, cases and subordinate-clause word order.",
  },
  {
    id: "work-study",
    label: "Work / study",
    status: "needs_review",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-07-06",
    nextAction: "Prepare a clean 90-second study-history answer with Matura, EPFL, Winterthur, Biology and Informatik.",
    note: "Can describe study history with support, including Zurich, EPFL and Winterthur; production becomes unstable with connectors, cases and school vocabulary.",
  },
  {
    id: "health",
    label: "Health / doctor / pharmacy",
    status: "needs_review",
    priority: "high",
    teacher: "heidi",
    lastPracticed: "2026-07-06",
    nextAction: "Roleplay: doctor appointment + pharmacy conversation + follow-up questions, then repeat one Swiss German doctor voicemail.",
    note: "Can handle simple headache/migraine phrases and simple health-notice reading with support; spoken doctor/pharmacy scenario still needs a full roleplay.",
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
    status: "needs_review",
    priority: "low",
    teacher: "heidi",
    lastPracticed: "2026-07-07",
    nextAction: "Prepare one 5-minute Schule answer: general opinion, own study path, useful experience and conclusion.",
    note: "Schule topic speaking was attempted with support; Swiss German family/kitchen listening was introduced but not tested exam-style.",
  },
  {
    id: "shopping-services",
    label: "Shopping / services",
    status: "needs_review",
    priority: "low",
    teacher: "denajder",
    lastPracticed: "2026-07-07",
    nextAction: "Repeat one timed shop/service reading task without vocabulary rescue, then practise a return or complaint roleplay.",
    note: "Can answer supported A2 reading questions about a local food shop, opening hours, customers and orders; complaint language still needs drilling.",
  },
  {
    id: "transport",
    label: "Transport / directions",
    status: "started",
    priority: "medium",
    teacher: "heidi",
    lastPracticed: "2026-07-07",
    nextAction: "Describe a station photo and drill 'warten auf den Zug', delays, platforms and personal transport habits.",
    note: "Practised street/bike and train-scene listening in Swiss German; still needs fast announcement or voicemail key-fact testing.",
  },
  {
    id: "leisure",
    label: "Leisure / events / clubs",
    status: "needs_review",
    priority: "low",
    teacher: "patrick",
    lastPracticed: "2026-07-07",
    nextAction: "Redo the holiday/free-time answer in 90 seconds using corrected time phrases, then run a radio-style event listening task.",
    note: "Holiday speaking about Nizza, family, restaurants and swimming was attempted; accuracy still breaks on time phrases, cases and word order.",
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
    lastPracticed: "2026-07-07",
    nextAction: "Run image-free Swiss German mini-tests: answer who, where, what, action and time before transcript or translation help.",
    note: "Can understand the main idea of short Swiss German picture descriptions after repetition; key nouns and longer middle details still drop out.",
  },
  {
    id: "money-insurance",
    label: "Money / insurance / bills",
    status: "needs_review",
    priority: "medium",
    teacher: "denajder",
    lastPracticed: "2026-07-06",
    nextAction: "Read one invoice or insurance letter under light time pressure and extract amount, deadline, sender and required action.",
    note: "Supported speaking practised: Apple Pay, insurance cost, missed deadlines and saving money; letter/invoice reading still needs a real task.",
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
    status: "planned",
    mistakes: [],
    nextDrill: "First real attempt: write a complete 40-60 word invitation with reason, date, place, reply request and closing.",
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
    modelAnswer:
      "Samstag, 18. Juli 2026\n\nSehr geehrte Frau Kamrani,\n\nich habe heute einen Termin. Aber ich bin krank. Ich werde einen Arzt besuchen. Leider kann ich nicht zu unserem Termin kommen.\n\nIch muss leider den Termin verschieben. Können wir den Termin für Montag um 11 Uhr bitte vereinbaren?\n\nVielen Dank im Voraus. Ich freue mich auf Ihre baldige Rückmeldung.\n\nMit freundlichen Grüßen\nPierre Bongrand",
    mistakes: [
      "Sometimes omits the closing formula",
      "Needs support for formal greeting, date, Rückmeldung formula and final closing",
      "Case errors: einen Termin, den Termin, einen Arzt, zu unserem Termin",
      "Formal email errors in the July 3 draft: Sehr geehrter Heer, ein Termin, Freundlichen",
    ],
    nextDrill:
      "Timed 40-60 word appointment-change email without a formula sheet; must include greeting, one excuse, new appointment proposal, thanks and correct closing.",
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
    note: "Phone-picture attempt with Denajder added concrete position/detail practice; Heidi also introduced 5-minute oral-topic structure. Still needs a full German-only performance with choice, opinion, own experience, follow-ups and no English/French.",
  },
  {
    id: "follow-up-questions",
    label: "Follow-up question readiness",
    status: "needs_review",
    note: "Handles supported follow-ups on Alltag, opinions, personality, health and housing/WG conflicts, but still needs vocabulary rescue and often switches languages.",
  },
];

// ---------------------------------------------------------------------------
// LESSON LOG — concrete and reusable as study material: vocabulary, verbs,
// grammar, mistakes, what Pierre can now do, what to repeat next.
// ---------------------------------------------------------------------------

export const lessonLogs: LessonLog[] = [
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
      "Second Heidi lesson: self-introduction, train-station picture-card description, opinion phrases with ich denke/glaube/finde/meine, dass word order, accusative basics, and a supported formal email to postpone an appointment with date, greeting, excuse, new time, thanks and closing.",
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
      "Sehr geehrte Frau ...",
      "Sehr geehrter Herr ...",
      "Sehr geehrte Damen und Herren",
      "Mit freundlichen Grüßen",
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
      "Coordinating connectors such as aber, und and oder do not force inversion: Aber ich bin krank.",
      "Review connector contrast separately: dann was grouped with aber/und/oder in class notes, but it normally takes position 1.",
      "Termin cases: der Termin, den Termin, dem Termin.",
    ],
    mistakes: [
      "Self-introduction still too short for the exam; needs more detail and a closing line.",
      "Picture-card answer needed support for structure, length and opinion language.",
      "Article/case errors: auf den Zug, einen Termin, den Termin, einen Arzt.",
      "Word order after dass not automatic yet.",
      "Frequent switch to French/English when searching for words.",
      "Formal email formulas needed teacher support: Sehr geehrte Frau/Herr, Sehr geehrte Damen und Herren, Rückmeldung sentence and closing.",
      "Final email still contained errors: ich habe ein Termin heute; Sehr geehrter Heer; Freundlichen.",
    ],
    canNowDo:
      "Start a picture-card description about a train-station scene and write a supported appointment-rescheduling email with date, excuse, new time, thanks and a formal closing.",
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
      "Third Denajder lesson: Wohnraum discussion from the book, adapted into neighbour scenarios. Practised housing change over 50 years, city vs countryside, Wohngemeinschaften, polite noise complaint, party/police escalation, and a rubbish conflict roleplay; chat notes captured spelling corrections and reusable model sentences.",
    vocabulary: [
      "der Wohnraum",
      "die Wohngemeinschaft",
      "heutzutage",
      "sowie",
      "auf dem Land",
      "in Städten",
      "beliebt",
      "beliebter",
      "teuer",
      "günstiger",
      "günstig",
      "der Nachbar",
      "die Nachbarn",
      "ärgerlich",
      "nervig",
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
      "wirken",
      "bevorzugen",
      "leiser machen",
      "anrufen",
      "wegwerfen",
      "wiederkommen",
    ],
    grammar: [
      "Reflexive verb: Der Wohnraum hat sich verändert.",
      "Verb-second after fronted phrases: Heutzutage leben mehr Menschen in Städten.",
      "Model reason sentence: Viele Menschen ziehen in die Stadt um, weil die Stadt mehr Berufe sowie Geschäfte hat.",
      "Opinion frame with verb-second: Meiner Meinung nach sollen die Nachbarn respektvoll sein.",
      "Verb-final word order after weil: weil es in der Stadt mehr Arbeitsplätze gibt.",
      "Comparatives with als: teurer als vor fünfzig Jahren.",
      "zu + Infinitiv after bevorzugen: Ich bevorzuge, allein zu wohnen.",
      "Modal verbs without zu: Ich möchte allein wohnen.",
      "Pattern contrast from notes: modal verb + infinitive; normal conjugated verb + zu + infinitive.",
      "Polite Konjunktiv II: Könnten Sie die Musik bitte leiser machen?",
      "Separable verbs: Ich rufe die Polizei an; den Müll wegwerfen.",
    ],
    mistakes: [
      "Frequent switches to English/French when planning answers or searching for vocabulary.",
      "Spelling corrections from chat: Deuer -> teuer, Gutztinger -> günstiger, laud -> laut, nicth -> nicht, vieder -> wieder.",
      "Comparison/time phrase errors: teurer als vor fünfzig Jahren.",
      "Word order after fronted phrases and after weil not automatic yet.",
      "Case/article errors after mit and in location phrases: mit einem Plan, in der Stadt.",
      "Plural and agreement errors: Häuser, Wohnungen sind teuer, Wohnraum ist teuer.",
      "Separable verb spelling and chunking needed correction: weg verfein -> wegwerfen.",
      "Neighbour roleplay formulas needed teacher support, especially polite register and separable verbs.",
    ],
    canNowDo:
      "Produce supported short answers about housing and shared flats, and use a basic polite neighbour complaint formula: Könnten Sie die Musik bitte leiser machen?",
    repeatNext:
      "Repeat housing/neighbour roleplays German-only, then write a 40-60 word neighbour message about noise or rubbish without teacher-supplied formulas.",
  },
  {
    id: "l16",
    date: "2026-07-05",
    teacher: "patrick",
    domains: ["personal-profile", "health", "swiss-german"],
    skills: ["hoeren", "sprechen"],
    practiced:
      "Third Patrick lesson: Swiss German survival for greetings, self-introduction, small talk, numbers, dates, phone numbers and a doctor-appointment phrase. Practised extracting appointment dates and phone numbers from Swiss German speech, then drilled random numbers.",
    vocabulary: [
      "Hoi",
      "Grüezi",
      "Ich bin de Pierre",
      "Wie gahts?",
      "Wie laufts?",
      "Ziit",
      "Numme",
      "de Arzt",
      "Bauchschmerze",
      "min Chopf",
      "tuet weh",
      "will",
    ],
    verbs: ["ha / han", "gseh", "weh tue", "hätti", "lauffe"],
    grammar: [
      "Swiss German will can mean standard German weil.",
      "Swiss German number recognition: eis, zwei, drü, vier, foif/feuf, siebe, nün, zeh, zwänzg, drisg.",
      "Appointment phrase: Ich hätt Ziit am ...",
      "Phone numbers should be written in chunks, not translated word by word.",
    ],
    mistakes: [
      "Needed repetition for fast Swiss German appointment sentences.",
      "Confused phrase boundary in 'Ziit am 9. September' and briefly heard it as 19 September.",
      "Still struggles with Swiss German phone-number sounds, especially grouped numbers such as 20 50 and 10 82.",
      "Doctor-call phrase was mostly teacher-modelled, not independently produced.",
    ],
    canNowDo:
      "Recognise and practise basic Swiss German greetings, identify some dates and phone-number chunks after repetition, and understand a model doctor-appointment sentence with symptoms.",
    repeatNext:
      "Run three exam-style Swiss German voicemail drills without early transcript help: doctor appointment, appointment change and transport delay. Require caller, date, time, number and action.",
  },
  {
    id: "l17",
    date: "2026-07-06",
    teacher: "denajder",
    domains: ["money-insurance"],
    skills: ["sprechen"],
    practiced:
      "Fourth Denajder lesson: reviewed picture-description formulas, described a photo of two teenagers looking at their phones, then practised supported speaking questions about Geld, Bargeld, Apple Pay, Versicherungen, Zahlungsfristen, Inflation, Miete and saving money.",
    vocabulary: [
      "wählen",
      "das Bild",
      "die Bildbeschreibung",
      "im Vordergrund",
      "im Hintergrund",
      "in der Mitte",
      "Jugendliche",
      "Sie schauen auf ihr Handy.",
      "das Hemd",
      "praktisch",
      "sinnvoll",
      "die Rechnung",
      "der Betrag",
      "die Versicherung",
      "die Krankenkasse",
      "die Zahlungsfrist",
      "die Referenznummer",
      "der Absender",
      "der Brief",
      "das Bargeld",
      "die Miete",
      "fällig",
      "einschüchternd",
    ],
    verbs: [
      "wählen",
      "aktualisieren",
      "beschreiben",
      "zeigen",
      "darstellen",
      "auffallen",
      "bezahlen",
      "erhalten",
      "bekommen",
      "sich wenden an",
      "entnehmen",
      "anrufen",
      "senden",
      "schicken",
      "steigen",
      "sparen",
    ],
    grammar: [
      "wegen + Dativ: wegen des Themas / wegen der Situation.",
      "Position chunks for pictures: in der Mitte, rechts/links, im Hintergrund, am rechten Rand.",
      "Opinion and interpretation frame: Ich denke, dass ...",
      "Comparison with als: heutzutage schwieriger als früher.",
      "Result/change with geworden: Die Miete ist teurer geworden; Gas ist teurer geworden.",
      "Possessive/case chunks: mit meinem Smartphone, mit mir, auf ihr Handy.",
    ],
    mistakes: [
      "Frequent switch to English for core words: teenager, concerned, red, black, convenient, insurance, necessary, expensive, future, rent.",
      "Case and preposition errors: für ich -> für mich; mit meine Smartphone -> mit meinem Smartphone; mit mich -> mit mir.",
      "Picture-description articles and adjective endings unstable: die erste Foto -> das erste Foto; der Junge am Recht -> der Junge rechts; roten Schuhe -> rote Schuhe.",
      "Verb placement and conjugation still unstable: Ich immer bezahlen -> Ich bezahle immer; die Inflation umgestiegen ist -> die Inflation ist gestiegen.",
      "Money vocabulary needed teacher rescue: Versicherung, notwendig, Zahlungsfrist, Bargeld, Miete.",
    ],
    canNowDo:
      "Describe a simple picture with support and answer basic personal questions about money habits, insurance, late bills and saving money.",
    repeatNext:
      "Do one full picture-card answer using the new position map, then read a realistic invoice or insurance letter and extract amount, deadline, sender and required action.",
  },
  {
    id: "l18",
    date: "2026-07-06",
    teacher: "heidi",
    domains: ["health", "work-study", "school-family", "housing"],
    skills: ["sprechen"],
    practiced:
      "Fourth Heidi lesson: reviewed Perfekt with haben/sein, especially movement verbs, then practised KDE oral-topic speaking with Schule and Wohnung. Pierre gave supported answers about study history, Matura, Biology/Informatik, places he has lived, city vs countryside housing, WG life, Mitbewohner and noise complaints.",
    vocabulary: [
      "die Kopfschmerzen",
      "die Migräne",
      "die Matura",
      "das Abitur",
      "die Informatik",
      "der Verkehr",
      "die Wohnung",
      "die Miete",
      "die Wohngemeinschaft",
      "der Mitbewohner",
      "auf dem Land",
      "in der Stadt",
      "die Kopfhörer",
      "sich beschweren",
      "der Einstieg",
    ],
    verbs: [
      "essen",
      "trinken",
      "gehen",
      "fahren",
      "fliegen",
      "bleiben",
      "aufstehen",
      "studieren",
      "wohnen",
      "sich beschweren",
      "sich verhalten",
      "absolvieren",
    ],
    grammar: [
      "Perfekt with haben: Ich habe eine Pizza gegessen; Ich habe Wasser getrunken.",
      "Perfekt with sein for movement/change verbs: Ich bin nach Frankreich geflogen.",
      "Special sein verbs introduced: bleiben, aufstehen.",
      "Verb-final word order after wenn, weil and dass.",
      "For past life phases, als is often better than wenn: Als ich in Nizza gewohnt habe...",
      "Location chunks: in der Stadt, auf dem Land, in der Schweiz.",
      "Dative after mit: mit meinem Mitbewohner, mit meinen Nachbarn.",
      "Reflexive verbs: sich beschweren, sich respektvoll verhalten.",
    ],
    mistakes: [
      "Frequent switches to English for simple repair and topic words: Second, Internet-Connection, Computer Science, countries.",
      "Perfekt auxiliary still needs review; Pierre asked for the rule and exceptions before producing correct sein examples.",
      "Used gestudiert instead of studiert.",
      "Verb-second errors after fronted connectors: Nachher ich habe...",
      "Used wenn where als is better for a past life phase.",
      "Case/location errors: in die Schweiz, in die Stadt, in das Land instead of in der Schweiz, in der Stadt, auf dem Land.",
      "Dative errors after mit: mit meine Nachbar instead of mit meinem Mitbewohner or mit meinen Nachbarn.",
      "Housing plurals and agreement unstable: die Wohnung sind, Appartmenten.",
      "WG complaint sentence needed support: Sie haben sich beschwert, weil ich oft Musik gehört habe.",
    ],
    canNowDo:
      "Produce supported Perfekt examples, give a short school/study history, and discuss housing/WG experiences with teacher scaffolding.",
    repeatNext:
      "Run one full 5-minute German-only oral topic answer using the structure: general opinion, own experience, advantages/disadvantages, conclusion. Focus on Schule or Wohnung and stop English switches.",
  },
  {
    id: "l19",
    date: "2026-07-07",
    teacher: "patrick",
    domains: ["swiss-german", "transport", "school-family", "shopping-services", "leisure"],
    skills: ["hoeren", "sprechen"],
    practiced:
      "Fourth Patrick lesson: worked through Swiss German survival phrases from an ETH-style document, then practised picture-description listening. Patrick described everyday scenes in Swiss German while Pierre extracted main facts: car washing, bike/street scene, family cooking, park/picnic scene, bakery and train scene.",
    vocabulary: [
      "nöd",
      "nüt",
      "öppis",
      "mer",
      "chömmer",
      "chasch",
      "isch",
      "gäge",
      "Pächvogel",
      "s'Wätter",
      "chalt",
      "de Schwamm",
      "s'Velo",
      "d'Strass",
      "s'Trottoir",
      "d'Chuchi",
      "choche",
      "de Chorb",
      "d'Bäckerei",
      "d'Theke",
      "d'Tafle",
      "de Zug",
    ],
    verbs: ["verstah", "widerhole", "bruche", "gseh", "luege", "choche", "rede", "esse", "sueche", "ändere"],
    grammar: [
      "Swiss German recognition: han = habe, nöd = nicht, nüt = nichts, isch = ist.",
      "mer can mean man or wir depending on context: Wie seit mer? / Chömmer go esse gah?",
      "Useful repair phrase: Chasch du widerhole?",
      "Picture-listening strategy: identify person, place and action first, then weather, color, time and objects.",
    ],
    mistakes: [
      "Needed repetition for key Swiss German nouns: Schwamm, Wätter, Chuchi, Chorb.",
      "Longer Swiss German descriptions still overload him; he catches setting but drops middle details.",
      "Confused Zug with Zucker before seeing the picture context.",
      "Swiss German repair phrase Chasch du widerhole is recognised but pronunciation is not stable.",
      "Continues to switch to English for meta-comments and missing vocabulary during the task.",
    ],
    canNowDo:
      "Understand the main idea of short Swiss German picture descriptions after one or two repetitions, especially person/place/action, and recognise several survival phrases for repair and scheduling.",
    repeatNext:
      "Run exam-like Swiss German listening drills with no picture support at first: short scene or voicemail, then answer who/where/what/action/time before transcript or translation help.",
  },
  {
    id: "l20",
    date: "2026-07-07",
    teacher: "heidi",
    domains: ["shopping-services", "leisure"],
    skills: ["lesen", "sprechen"],
    practiced:
      "Fifth Heidi lesson: warm-up about Pierre's morning, vocabulary learning and Swiss German listening practice, then a KDE/A2-style reading exercise about Frau Keller's day in a neighbourhood food shop. Pierre answered true/false, multiple-choice, gap-fill and short-answer questions, then practised a holiday/free-time speaking monologue about Nizza, family, restaurants, July 4th and swimming in the Zurich lake.",
    vocabulary: [
      "die Übung",
      "der Wortschatz",
      "selbstbewusst",
      "der Sender",
      "die Regale",
      "genug",
      "ob",
      "draussen",
      "drinnen",
      "das Ereignis",
      "der Heimweg",
      "eigenes Abendessen",
      "der Treffpunkt",
      "während der Ferien",
    ],
    verbs: [
      "üben",
      "helfen",
      "aufräumen",
      "einräumen",
      "sich unterhalten",
      "zumachen",
      "schliessen",
      "einkaufen",
      "sich setzen",
      "reisen",
      "schwimmen",
    ],
    grammar: [
      "helfen + Dativ: Es hilft mir sehr.",
      "mit + Dativ: mit dir, mit meiner Freundin.",
      "Verb-final word order after weil: weil sie den Weg durch den Park sehr schön findet.",
      "Verb-second after a fronted wenn-clause: Wenn das Wetter schön ist, setzt sich Frau Keller auf eine Bank.",
      "Reflexive verb: sich setzen; ich setze mich, sie setzt sich.",
      "Neuter time phrase: letztes Wochenende.",
    ],
    mistakes: [
      "Wortschatz was repeatedly forgotten or mispronounced as Wortschaft.",
      "Case errors after mit: mit dich, mit meine Freundin instead of mit dir, mit meiner Freundin.",
      "Dative after helfen needed correction: Es hilft mir sehr.",
      "Holiday speaking used unstable time and travel phrases: Letzte Monat wäre ich, Über die Ferien.",
      "Verb-second after a fronted wenn-clause needed support.",
      "Subject-verb agreement and articles were unstable in the holiday monologue: Viele Leute mag, eine Restaurant.",
    ],
    canNowDo:
      "Answer most factual questions from a simple A2 reading text when supported with vocabulary, and produce a longer holiday-topic monologue with teacher correction.",
    repeatNext:
      "Repeat reading under a timer without vocabulary rescue, then redo the holiday answer in 90 seconds using während der Ferien, letzten Monat, war/bin gewesen, mit meiner Freundin and letztes Wochenende.",
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
    goal: "Three Swiss German voicemail drills: doctor appointment, appointment change and transport delay. Extract date, time, number and action before checking transcript.",
  },
  {
    id: "p2",
    date: "2026-07-09",
    teacher: "denajder",
    domain: "gemeinde",
    goal: "Gemeinde reading plus writing: extract deadline, location and required action, then write a 40-60 word information request.",
  },
  {
    id: "p3",
    date: "2026-07-10",
    teacher: "heidi",
    domain: "health",
    goal: "Doctor/pharmacy roleplay: make an appointment, explain symptoms, ask follow-up questions and repeat without French or English.",
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
    example: "Hears 'Ziit am 9' as possibly 19, or misses grouped callback numbers such as 044 737 10 82",
    correction: "Listen for key info only; chunk dates and phone numbers before trying to translate the whole sentence",
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
    id: "formal-email-formulas",
    mistake: "Formal email formulas are not stable yet",
    example: "Sehr geehrter Heer ... Freundlichen, Pierre",
    correction: "Sehr geehrter Herr ... Mit freundlichen Grüßen, Pierre",
    relatedSkills: ["schreiben"],
  },
  {
    id: "perfekt-aux",
    mistake: "Wrong auxiliary verb in Perfekt (haben vs. sein)",
    example: "Ich habe zum Arzt gegangen / Ich habe aufgestanden. (should be 'bin gegangen' / 'bin aufgestanden')",
    correction: "Drill the sein-verb list separately: gehen, kommen, fahren, fliegen, bleiben, aufstehen.",
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
