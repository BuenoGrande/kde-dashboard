// ============================================================================
// KDE PREP — SINGLE SOURCE OF TRUTH
// ============================================================================
// Edit this file after every lesson. Nothing else needs to change — every
// page on the site (dashboard, section pages, domain pages, teacher pages,
// lesson log) reads from the arrays below.
//
// ALL CONTENT IN THIS FILE IS CURRENTLY SAMPLE / PLACEHOLDER DATA.
// Replace it gradually with real session notes. Search for `isSample: true`
// to find lesson entries that still need replacing.
//
// See README.md → "How to update this site after a lesson" for a
// step-by-step guide.
// ============================================================================

import type {
  Domain,
  ExamSection,
  PlannedSession,
  Priority,
  RecurringMistake,
  Session,
  Teacher,
} from "./types";

export const MATRIX_COLUMNS = [
  "hoeren",
  "lesen",
  "schreiben",
  "sprechen",
  "vocabulary",
  "grammar",
  "mockExam",
] as const;

export const MATRIX_COLUMN_LABELS: Record<string, string> = {
  hoeren: "Hören",
  lesen: "Lesen",
  schreiben: "Schreiben",
  sprechen: "Sprechen",
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  mockExam: "Mock exam",
};

// ---------------------------------------------------------------------------
// TEACHERS
// ---------------------------------------------------------------------------

export const teachers: Teacher[] = [
  {
    id: "heidi",
    name: "Heidi",
    role: "Speaking coach — oral exam simulations",
    focus: [
      "Sprechen fluency",
      "Oral exam simulations (both tasks)",
      "Self-introduction",
      "Doctor / pharmacy roleplays",
      "Follow-up questions",
      "Picture-card simulations",
    ],
    strengths: [
      "Builds realistic two-person roleplays close to the real exam format",
      "Gives real-time feedback on sentence structure while speaking",
    ],
    limitations: [
      "Less focus on reading/writing correction",
      "Swiss German listening is not her specialty",
    ],
    bestUse:
      "60-minute live roleplay and picture-card sessions. Leave reading/writing correction to Denajdër and dedicated listening drills to Patrick.",
    relevantSections: ["sprechen"],
    relevantDomains: ["personal-profile", "health", "work-study", "leisure"],
    nextSessionPlan:
      "2026-07-10 — Health/doctor/pharmacy roleplay: symptoms, appointment, follow-up questions, then a pharmacy scenario.",
  },
  {
    id: "patrick",
    name: "Patrick",
    role: "Listening & pronunciation coach",
    focus: [
      "Hören",
      "Swiss German survival listening",
      "Pronunciation",
      "Spontaneous conversation",
      "Standard German everyday dialogues",
    ],
    strengths: [
      "Brings authentic everyday Swiss material (voicemails, announcements)",
      "Good at spontaneous, unscripted conversation warm-ups",
    ],
    limitations: [
      "Writing correction is outside his usual focus",
      "Less structured grammar explanation than Denajdër",
    ],
    bestUse:
      "Short, frequent listening drills (15–20 min) plus spontaneous conversation warm-ups before or after another teacher's session.",
    relevantSections: ["hoeren", "sprechen"],
    relevantDomains: ["transport", "swiss-german", "health", "leisure"],
    nextSessionPlan:
      "2026-07-08 — Swiss German voicemail drill: three short messages (injury, Elternabend, transport), extract key facts only.",
  },
  {
    id: "denajder",
    name: "Denajdër",
    role: "Writing & reading coach",
    focus: [
      "Schreiben",
      "Lesen",
      "Writing templates",
      "A2 written correction",
      "Practical notices and administrative texts",
    ],
    strengths: [
      "Very structured with templates and correction",
      "Good at building administrative / Gemeinde vocabulary",
    ],
    limitations: [
      "Not the main focus for free speaking practice",
      "Less material for Swiss German listening",
    ],
    bestUse:
      "Template-driven writing practice plus timed reading comprehension using real notices (Gemeinde, events, services).",
    relevantSections: ["lesen", "schreiben"],
    relevantDomains: ["gemeinde", "waste", "civic-admin", "leisure", "work-study"],
    nextSessionPlan:
      "2026-07-09 — Writing templates: invitation (Apéro), appointment change, information request. Check word count is 40–80.",
  },
];

// ---------------------------------------------------------------------------
// LESSON LOG
// ---------------------------------------------------------------------------
// Newest last practice: add new sessions to the END of this array.

export const sessions: Session[] = [
  {
    id: "s1",
    date: "2026-06-10",
    teacher: "heidi",
    duration: 60,
    sections: ["sprechen"],
    domains: ["personal-profile"],
    covered:
      "First draft of the 2-minute self-introduction (name, Wohnort, Familie, Arbeit, Freizeit).",
    wentWell: ["Clear structure, good pace"],
    strugglesWith: ["Ran out of things to say after 70 seconds", "No closing sentence"],
    recurringMistakes: ["weil-word-order"],
    vocabulary: ["Wohnort", "Familienstand", "Herkunft"],
    homework: "Write a closing sentence and memorize the full script.",
    recommendedNext: "Repeat self-introduction with the closing line added; time it.",
    isSample: true,
  },
  {
    id: "s2",
    date: "2026-06-15",
    teacher: "patrick",
    duration: 45,
    sections: ["hoeren"],
    domains: ["transport", "swiss-german"],
    covered:
      "Train station announcements (delays, platform changes) and a first short Swiss German clip.",
    wentWell: ["Understood standard German announcements about delays"],
    strugglesWith: ["Missed platform numbers", "Swiss German clip: understood almost nothing"],
    recurringMistakes: ["swiss-german-numbers"],
    vocabulary: ["Verspätung", "Gleis", "Umsteigen"],
    homework: "Listen to the same clip twice at home, note any recognisable words.",
    recommendedNext: "Repeat with slower Swiss German audio and pre-taught key vocabulary.",
    isSample: true,
  },
  {
    id: "s3",
    date: "2026-06-17",
    teacher: "denajder",
    duration: 60,
    sections: ["schreiben"],
    domains: ["work-study"],
    covered:
      "Introduced the 6-part writing structure and drafted the Apéro invitation task.",
    wentWell: ["Understood the structure quickly", "Good greeting/closing formulas"],
    strugglesWith: ["Text too short (28 words, needs 40–80)", "Forgot to mention where to register"],
    recurringMistakes: ["dative-prepositions"],
    vocabulary: ["Apéro", "Kollegen", "sich anmelden"],
    homework: "Rewrite the invitation to reach 60–70 words including a registration request.",
    recommendedNext: "Correct the rewritten invitation, then try an appointment-change task.",
    isSample: true,
  },
  {
    id: "s4",
    date: "2026-06-19",
    teacher: "heidi",
    duration: 60,
    sections: ["sprechen"],
    domains: ["work-study"],
    covered: "Talking about work: role, daily tasks, colleagues, likes/dislikes.",
    wentWell: ["Vocabulary about his job is solid"],
    strugglesWith: ["Subordinate clauses with 'weil' when explaining why he likes the job"],
    recurringMistakes: ["weil-word-order", "dative-prepositions"],
    vocabulary: ["Arbeitgeber", "Teilzeit", "Kollege"],
    homework: "Write 5 sentences about work using 'weil', check word order.",
    recommendedNext: "Quick review of the 5 sentences, then move to health-domain roleplay.",
    isSample: true,
  },
  {
    id: "s5",
    date: "2026-06-22",
    teacher: "denajder",
    duration: 45,
    sections: ["lesen"],
    domains: ["leisure"],
    covered:
      "Reading the 'Sommerfest in Fällanden' programme: dates, times, locations, activities.",
    wentWell: ["Found all dates and times correctly"],
    strugglesWith: ["Missed one detail about the registration deadline"],
    recurringMistakes: [],
    vocabulary: ["Anmeldefrist", "Programm", "Teilnahme"],
    homework: "Re-read the text and underline every deadline mentioned.",
    recommendedNext: "Try a second reading text under time pressure (Stadtspital open day).",
    isSample: true,
  },
  {
    id: "s6",
    date: "2026-06-24",
    teacher: "patrick",
    duration: 30,
    sections: ["hoeren"],
    domains: ["health", "swiss-german"],
    covered:
      "Short Swiss German clip: doctor's practice voicemail mentioning an appointment change.",
    wentWell: ["Recognised the word 'Termin'"],
    strugglesWith: ["Could not extract the new date/time", "General anxiety about Swiss German speed"],
    recurringMistakes: ["swiss-german-numbers"],
    vocabulary: ["Termin verschieben", "Hausarzt"],
    homework: "Listen once a day this week to the same voicemail type (different examples).",
    recommendedNext: "Slow-motion replay technique, then attempt without slowing down.",
    isSample: true,
  },
  {
    id: "s7",
    date: "2026-06-28",
    teacher: "patrick",
    duration: 60,
    sections: ["sprechen", "hoeren"],
    domains: ["health"],
    covered:
      "Explained symptoms, made a doctor appointment, listened to a voicemail from a practice.",
    wentWell: ["Pierre could explain basic symptoms and ask for an appointment"],
    strugglesWith: [
      "Word order after 'weil'",
      "Difficulty understanding the Swiss German voicemail",
    ],
    recurringMistakes: ["weil-word-order", "swiss-german-numbers"],
    vocabulary: ["Termin verschieben", "Hausarzt", "Notfalldienst", "Apotheke"],
    homework: "Repeat the appointment-change roleplay and add a pharmacy scenario.",
    recommendedNext: "Repeat appointment-change roleplay and add a pharmacy scenario.",
    isSample: true,
  },
  {
    id: "s8",
    date: "2026-06-30",
    teacher: "heidi",
    duration: 60,
    sections: ["sprechen"],
    domains: ["personal-profile", "leisure"],
    covered:
      "First picture-card simulation (leisure/clubs topic) using the 6-step speaking structure.",
    wentWell: ["Used 'Auf dem Bild sehe ich...' and 'Zum Beispiel...' naturally"],
    strugglesWith: [
      "Struggled to give a personal opinion (step 3)",
      "Ran under time (3 min instead of 5)",
    ],
    recurringMistakes: ["perfekt-aux"],
    vocabulary: ["Verein", "Sommerfest"],
    homework: "Prepare 2 opinion sentences ('Ich finde... weil...') for 3 different topics.",
    recommendedNext: "Second picture-card simulation with a health/doctor topic, aim for the full 5 minutes.",
    isSample: true,
  },
];

// ---------------------------------------------------------------------------
// PLANNED SESSIONS
// ---------------------------------------------------------------------------

export const plannedSessions: PlannedSession[] = [
  {
    id: "p1",
    date: "2026-07-10",
    teacher: "heidi",
    section: "sprechen",
    domain: "health",
    goal:
      "Roleplay: meeting a doctor, explaining symptoms, making an appointment, and asking follow-up questions — then a pharmacy scenario.",
    status: "planned",
  },
  {
    id: "p2",
    date: "2026-07-08",
    teacher: "patrick",
    section: "hoeren",
    domain: "swiss-german",
    goal:
      "Swiss German voicemail drill: three short messages (injury, Elternabend, transport) — extract key facts only.",
    status: "planned",
  },
  {
    id: "p3",
    date: "2026-07-09",
    teacher: "denajder",
    section: "schreiben",
    domain: "work-study",
    goal:
      "Writing templates: invitation (Apéro for colleagues), appointment change, information request. Check word count 40–80.",
    status: "planned",
  },
  {
    id: "p4",
    date: "2026-07-14",
    teacher: "heidi",
    section: "sprechen",
    domain: "leisure",
    goal:
      "Second picture-card simulation: leisure/clubs topic, full 5-minute structure with follow-up questions.",
    status: "tentative",
  },
];

// ---------------------------------------------------------------------------
// EXAM SECTIONS
// ---------------------------------------------------------------------------

export const sections: ExamSection[] = [
  {
    id: "hoeren",
    label: "Hören",
    labelEn: "Listening",
    level: "B1",
    coverage: 25,
    status: "red",
    format: "4 tasks, 15 minutes total, audio heard once",
    strengths: [
      "Understands simple directions when spoken slowly",
      "Can catch numbers when speech is slow and clear",
    ],
    weaknesses: [
      "Swiss German voicemails are barely understandable",
      "Fast announcements with several numbers/places at once",
      "True/false questions under time pressure",
    ],
    nextActions: [
      "Weekly Swiss German voicemail drill",
      "Train station announcements with numbers",
      "First full timed listening mock",
    ],
    assignedTeachers: ["patrick"],
    lastSessionId: "s7",
    exampleTaskTypes: [
      "Doctor's practice voicemail",
      "Radio announcement about a procession with road closures",
      "Train station announcement",
      "True/false statements about an announcement",
    ],
  },
  {
    id: "lesen",
    label: "Lesen",
    labelEn: "Reading",
    level: "A2",
    coverage: 35,
    status: "orange",
    format: "4 tasks, 35 minutes total",
    strengths: [
      "Can find dates, times and places in simple texts",
      "Basic understanding of event programmes",
    ],
    weaknesses: [
      "Administrative vocabulary (Gemeinde, voting) still thin",
      "Texts with several details under time pressure",
    ],
    nextActions: [
      "Read Gemeinde notices and underline key facts",
      "Use voting/ballot instructions as a reading-comprehension text",
      "Introduce a time limit (~9 min per task)",
    ],
    assignedTeachers: ["denajder"],
    lastSessionId: "s5",
    exampleTaskTypes: [
      "Sommerfest programme",
      "Tag der offenen Tür at the Stadtspital",
      "Paper-collection notice",
      "Dog tax / Einwohnerkontrolle notice",
      "Matching a situation to the right service",
    ],
  },
  {
    id: "schreiben",
    label: "Schreiben",
    labelEn: "Writing",
    level: "A2",
    coverage: 40,
    status: "orange",
    format: "1 task, 25 minutes, about 40–80 words",
    strengths: [
      "Knows the basic structure (date, greeting, reason, details, request, closing)",
      "Can cancel an appointment briefly",
    ],
    weaknesses: [
      "Texts often too short (needs 40–80 words)",
      "Word order in subordinate clauses",
      "Sometimes forgets the closing formula",
    ],
    nextActions: [
      "Finish drilling the Apéro invitation template",
      "Practice appointment change and information request",
      "Write model answers with a word-count check",
    ],
    assignedTeachers: ["denajder"],
    lastSessionId: "s3",
    exampleTaskTypes: [
      "Invitation to an Apéro after 10 years at the company",
      "Postponing/cancelling an appointment",
      "Requesting information",
      "Apology / explanation",
      "Message to a neighbour",
    ],
  },
  {
    id: "sprechen",
    label: "Sprechen",
    labelEn: "Speaking",
    level: "B1",
    coverage: 45,
    status: "yellow",
    format: "15–20 minutes, usually two candidates, two examiners",
    strengths: [
      "Self-introduction runs fluently up to 90 seconds",
      "Can describe his job and daily life",
    ],
    weaknesses: [
      "Word order after 'weil'",
      "Hesitates on follow-up questions",
      "Picture-card structure not yet automatic",
    ],
    nextActions: [
      "Add a closing line to the self-introduction",
      "Health picture-card simulation (Fri 2026-07-10)",
      "Targeted follow-up question drills",
    ],
    assignedTeachers: ["heidi"],
    lastSessionId: "s8",
    exampleTaskTypes: [
      "Self-introduction (2 min)",
      "Picture card: health",
      "Picture card: leisure/clubs",
      "Examiner follow-up questions",
    ],
  },
];

// ---------------------------------------------------------------------------
// DOMAINS
// ---------------------------------------------------------------------------

export const domains: Domain[] = [
  {
    id: "personal-profile",
    label: "Personal profile",
    relevance: "Very high",
    skills: {
      hoeren: { status: "practiced_once", teacher: "patrick", lastPracticed: "2026-06-15" },
      lesen: { status: "exam_ready", confidence: 4 },
      schreiben: { status: "improving", teacher: "denajder", lastPracticed: "2026-06-17" },
      sprechen: { status: "improving", teacher: "heidi", lastPracticed: "2026-06-30", confidence: 3 },
      vocabulary: { status: "improving" },
      grammar: { status: "needs_review", note: "verb position in subordinate clauses" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Wohnort", "Familienstand", "Herkunft", "Muttersprache", "Beruf", "seit wie vielen Jahren"],
    likelyQuestions: [
      "Wie heissen Sie?",
      "Wo wohnen Sie?",
      "Seit wann sind Sie in der Schweiz?",
      "Was machen Sie beruflich?",
      "Erzählen Sie etwas über Ihre Familie.",
    ],
    listeningSituations: [
      "Jemand stellt sich am Telefon vor",
      "Ein Formular wird am Schalter mündlich erklärt",
    ],
    readingTexts: ["Anmeldeformular Einwohnerkontrolle", "Kurzes Vorstellungs-E-Mail"],
    writingPrompts: ["Kurze Selbstvorstellung per E-Mail an eine neue Nachbarin"],
    strengths: ["Kann Namen, Wohnort und Beruf sicher nennen"],
    weaknesses: ["Zögert bei Fragen zur Aufenthaltsdauer", "Verwechselt manchmal 'seit' und 'für'"],
    latestNote:
      "Self-introduction runs fluently up to 90 seconds; needs a natural closing line.",
    nextAction: "Add a closing sentence to the self-intro script and drill it until automatic.",
    assignedTeacher: "heidi",
  },
  {
    id: "housing",
    label: "Housing / neighbours",
    relevance: "High",
    skills: {
      hoeren: { status: "planned", teacher: "patrick" },
      lesen: { status: "practiced_once", lastPracticed: "2026-06-05" },
      schreiben: { status: "practiced_once", teacher: "denajder" },
      sprechen: { status: "needs_review", teacher: "heidi" },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Nachbar", "Ruhestörung", "Mietvertrag", "Kündigungsfrist", "Waschküche", "Hausordnung"],
    likelyQuestions: [
      "Wie ist Ihre Wohnsituation?",
      "Haben Sie Kontakt zu Ihren Nachbarn?",
      "Was machen Sie, wenn es Lärm gibt?",
    ],
    listeningSituations: [
      "Nachbar beschwert sich per Telefonnachricht über Lärm",
      "Hausverwaltung informiert über Waschküchenzeiten",
    ],
    readingTexts: ["Hausordnung", "Mitteilung der Hausverwaltung", "Anschlag im Treppenhaus"],
    writingPrompts: ["Kurze Nachricht an Nachbarn wegen einer Party", "Entschuldigung wegen Lärm"],
    strengths: ["Versteht einfache Hausordnungstexte"],
    weaknesses: ["Unsicher beim Formulieren von Beschwerden", "Wortschatz zu Mietrecht lückenhaft"],
    latestNote: "Only reading has been tried so far; no live roleplay yet.",
    nextAction: "Roleplay: responding to a neighbour's noise complaint, spoken and written.",
    assignedTeacher: "denajder",
  },
  {
    id: "work-study",
    label: "Work / study",
    relevance: "High",
    skills: {
      hoeren: { status: "not_started" },
      lesen: { status: "not_started" },
      schreiben: { status: "practiced_once", teacher: "denajder", lastPracticed: "2026-06-17" },
      sprechen: { status: "practiced_once", teacher: "heidi", lastPracticed: "2026-06-19" },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "needs_review", note: "'weil' clauses" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Arbeitgeber", "Teilzeit", "Kollege", "Schicht", "Weiterbildung", "Lehrgang"],
    likelyQuestions: [
      "Was machen Sie beruflich?",
      "Wie gefällt Ihnen Ihre Arbeit?",
      "Arbeiten Sie im Team?",
    ],
    listeningSituations: [
      "Kollege hinterlässt Voicemail wegen Schichttausch",
      "Ansage über Kursanmeldung",
    ],
    readingTexts: ["Stelleninserat", "Info zu einem Deutschkurs mit Kinderbetreuung"],
    writingPrompts: ["Nachricht an einen Kollegen wegen Schichttausch", "Anmeldung für einen Kurs"],
    strengths: ["Kann den eigenen Beruf klar beschreiben"],
    weaknesses: ["Nebensätze mit 'weil' noch fehlerhaft", "Wenig Übung mit Arbeits-Voicemails"],
    latestNote: "Discussed his job with Heidi once; not yet tested in listening or reading.",
    nextAction: "Add a work-related listening voicemail and a short reading text.",
    assignedTeacher: "heidi",
  },
  {
    id: "health",
    label: "Health / doctor / pharmacy",
    relevance: "Very high",
    skills: {
      hoeren: { status: "needs_review", teacher: "patrick", lastPracticed: "2026-06-28" },
      lesen: { status: "not_started" },
      schreiben: { status: "not_started" },
      sprechen: {
        status: "planned",
        teacher: "heidi",
        plannedDate: "2026-07-10",
        confidence: 2,
        note: "Roleplay: doctor appointment + pharmacy conversation + follow-up questions",
      },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "needs_review", note: "'weil' clauses when explaining symptoms" },
      mockExam: { status: "not_started" },
    },
    vocabulary: [
      "Termin verschieben",
      "Hausarzt",
      "Notfalldienst",
      "Apotheke",
      "Symptome",
      "Rezept",
      "Krankenkasse",
    ],
    likelyQuestions: [
      "Was fehlt Ihnen?",
      "Seit wann haben Sie diese Beschwerden?",
      "Haben Sie schon Medikamente genommen?",
    ],
    listeningSituations: [
      "Arztpraxis hinterlässt Voicemail zur Terminbestätigung",
      "Jemand fragt nach dem Weg zur Apotheke",
    ],
    readingTexts: ["Öffnungszeiten Notfalldienst", "Infoblatt Spitex", "Tag der offenen Tür im Stadtspital"],
    writingPrompts: ["Termin absagen oder verschieben", "Anfrage an die Arztpraxis"],
    strengths: ["Kann Symptome grundlegend benennen"],
    weaknesses: ["Wortstellung nach 'weil' bei Erklärungen", "Unsicher bei Rückfragen des Arztes"],
    latestNote:
      "Practiced explaining symptoms and booking an appointment with Patrick on 2026-06-28; pharmacy scenario still open.",
    nextAction:
      "Roleplay with Heidi on 2026-07-10: doctor appointment + pharmacy conversation + follow-up questions.",
    assignedTeacher: "heidi",
  },
  {
    id: "gemeinde",
    label: "Gemeinde / administration",
    relevance: "Very high",
    skills: {
      hoeren: { status: "not_started" },
      lesen: { status: "practiced_once", teacher: "denajder" },
      schreiben: { status: "not_started" },
      sprechen: { status: "not_started" },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Einwohnerkontrolle", "Anmeldung", "Aufenthaltsbewilligung", "Gemeindeversammlung", "Formular", "Amt"],
    likelyQuestions: [
      "Wo haben Sie sich angemeldet?",
      "Was braucht man für die Anmeldung in der Gemeinde?",
    ],
    listeningSituations: [
      "Ansage im Gemeindehaus über Öffnungszeiten",
      "Automatische Ansage der Einwohnerkontrolle",
    ],
    readingTexts: ["Gemeinde-Mitteilungsblatt", "Hundesteuer-Anmeldung", "Einladung zur Gemeindeversammlung"],
    writingPrompts: ["Anfrage an die Gemeinde wegen eines Formulars"],
    strengths: [],
    weaknesses: ["Verwaltungsvokabular kaum geübt"],
    latestNote: "Only reading tried once with Denajdër; not yet in speaking or writing.",
    nextAction: "Read one Gemeinde notice together and extract key facts (date, place, deadline).",
    assignedTeacher: "denajder",
  },
  {
    id: "school-family",
    label: "School / family / children",
    relevance: "Medium",
    skills: {
      hoeren: { status: "not_started" },
      lesen: { status: "not_started" },
      schreiben: { status: "not_started" },
      sprechen: { status: "not_started" },
      vocabulary: { status: "not_started" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Elternabend", "Kindergarten", "Hausaufgaben", "Schulferien", "Klassenlehrer"],
    likelyQuestions: ["Haben Sie Kinder?", "Wie ist der Kontakt zur Schule?"],
    listeningSituations: ["Voicemail einer Lehrperson wegen Elternabend"],
    readingTexts: ["Einladung zum Elternabend", "Ferienplan der Schule"],
    writingPrompts: ["Entschuldigung für die Absage eines Elternabends"],
    strengths: [],
    weaknesses: ["Noch nicht behandelt"],
    latestNote:
      "Not started — lower priority since Pierre has no school-age children, but the theme appears in exam materials.",
    nextAction: "Introduce vocabulary only, then one short reading text.",
    assignedTeacher: "denajder",
  },
  {
    id: "shopping-services",
    label: "Shopping / services",
    relevance: "Medium",
    skills: {
      hoeren: { status: "not_started" },
      lesen: { status: "planned", teacher: "denajder" },
      schreiben: { status: "not_started" },
      sprechen: { status: "practiced_once", teacher: "heidi" },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Öffnungszeiten", "Umtausch", "Quittung", "Kundendienst", "Reklamation"],
    likelyQuestions: ["Wo kaufen Sie ein?", "Was machen Sie, wenn ein Produkt kaputt ist?"],
    listeningSituations: ["Ansage zu den Öffnungszeiten eines Geschäfts"],
    readingTexts: ["Flyer/Angebot eines Geschäfts", "Hinweise zur Reklamation"],
    writingPrompts: ["Reklamation wegen eines defekten Produkts"],
    strengths: ["Grundwortschatz Einkaufen sitzt"],
    weaknesses: ["Sprache für Reklamationen fehlt noch"],
    latestNote: "Basic shopping dialogue tried once with Heidi.",
    nextAction: "Read a store flyer/notice with Denajdër; extract prices, dates, hours.",
    assignedTeacher: "denajder",
  },
  {
    id: "transport",
    label: "Transport / directions",
    relevance: "High",
    skills: {
      hoeren: { status: "practiced_once", teacher: "patrick", lastPracticed: "2026-06-15" },
      lesen: { status: "not_started" },
      schreiben: { status: "not_started" },
      sprechen: { status: "practiced_once", teacher: "heidi" },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Verspätung", "Gleis", "Umsteigen", "Fahrplan", "Billett", "Haltestelle"],
    likelyQuestions: [
      "Wie kommen Sie zur Arbeit?",
      "Was machen Sie, wenn der Zug Verspätung hat?",
    ],
    listeningSituations: [
      "Bahnhofsansage über Verspätung/Gleisänderung",
      "Jemand fragt nach dem Weg zur Haltestelle",
    ],
    readingTexts: ["Fahrplanänderung", "Baustellen-Hinweis ÖV"],
    writingPrompts: ["Kurze Nachricht: man kommt später wegen Verspätung"],
    strengths: ["Kann einfache Wegbeschreibungen verstehen"],
    weaknesses: ["Zahlen/Gleisnummern im schnellen Hören", "Mundart-Durchsagen teils unklar"],
    latestNote: "One listening drill on train announcements done with Patrick; needs repetition.",
    nextAction:
      "More listening drills with real SBB-style announcements, focus on numbers and platform changes.",
    assignedTeacher: "patrick",
  },
  {
    id: "leisure",
    label: "Leisure / events / clubs",
    relevance: "Medium",
    skills: {
      hoeren: { status: "planned", teacher: "patrick" },
      lesen: { status: "practiced_once", teacher: "denajder", lastPracticed: "2026-06-22" },
      schreiben: { status: "not_started" },
      sprechen: { status: "practiced_once", teacher: "heidi", lastPracticed: "2026-06-30" },
      vocabulary: { status: "practiced_once" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Verein", "Sommerfest", "Anmeldefrist", "Teilnahme", "Programm"],
    likelyQuestions: ["Was machen Sie in der Freizeit?", "Sind Sie Mitglied in einem Verein?"],
    listeningSituations: ["Radioansage zu einem Dorffest / Umzug mit Strassensperrung"],
    readingTexts: ["Sommerfest in Fällanden — Programm", "Vereins-Flyer"],
    writingPrompts: ["Anmeldung zu einer Veranstaltung"],
    strengths: ["Kann Hobbys beschreiben"],
    weaknesses: ["Versteht Veranstaltungsdetails (Zeit/Ort) im Hörtext nicht immer sicher"],
    latestNote:
      "Read the Fällanden Sommerfest programme with Denajdër; the listening version is not done yet.",
    nextAction: "Listen to a radio-style event announcement and answer true/false questions.",
    assignedTeacher: "patrick",
  },
  {
    id: "waste",
    label: "Waste / recycling / environment",
    relevance: "Medium",
    skills: {
      hoeren: { status: "not_started" },
      lesen: { status: "planned", teacher: "denajder" },
      schreiben: { status: "not_started" },
      sprechen: { status: "not_started" },
      vocabulary: { status: "not_started" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Kehricht", "Recycling", "Wertstoffsammlung", "Grüngut", "Sperrgut", "Gebührensack"],
    likelyQuestions: ["Wie entsorgen Sie Ihren Abfall?", "Wo bringen Sie Glas und Papier hin?"],
    listeningSituations: ["Ansage zu Abfuhrterminen"],
    readingTexts: ["Papiersammlung-Mitteilung", "Entsorgungskalender der Gemeinde"],
    writingPrompts: [],
    strengths: [],
    weaknesses: ["Vokabular kaum bekannt"],
    latestNote: "Not started yet.",
    nextAction: "First reading pass on a waste-collection notice with Denajdër.",
    assignedTeacher: "denajder",
  },
  {
    id: "civic-admin",
    label: "Civic-admin reading / voting logistics",
    relevance: "High",
    skills: {
      hoeren: { status: "not_started" },
      lesen: { status: "planned", teacher: "denajder" },
      schreiben: { status: "not_started" },
      sprechen: { status: "not_started" },
      vocabulary: { status: "not_started" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["Abstimmung", "Wahlzettel", "Stimmrechtsausweis", "Frist", "brieflich"],
    likelyQuestions: ["Haben Sie schon einmal an einer Gemeindeversammlung teilgenommen?"],
    listeningSituations: ["Ansage zu Abstimmungsterminen"],
    readingTexts: ["Abstimmungsunterlagen / Stimmanleitung", "Hinweis zur brieflichen Stimmabgabe"],
    writingPrompts: [],
    strengths: [],
    weaknesses: ["Noch nicht behandelt — wichtig, da im Lesen oft als Kontext genutzt"],
    latestNote:
      "Not started; this is a reading-comprehension context, not a civics knowledge test.",
    nextAction:
      "Reading drill: understand voting instructions as a language task (deadlines, where to send, what is required).",
    assignedTeacher: "denajder",
  },
  {
    id: "swiss-german",
    label: "Swiss German listening survival",
    relevance: "Very high",
    skills: {
      hoeren: {
        status: "needs_review",
        teacher: "patrick",
        lastPracticed: "2026-06-28",
        confidence: 1,
        note: "High priority — flagged weak in every recent session",
      },
      lesen: { status: "not_started" },
      schreiben: { status: "not_started" },
      sprechen: { status: "not_started" },
      vocabulary: { status: "planned", teacher: "patrick" },
      grammar: { status: "not_started" },
      mockExam: { status: "not_started" },
    },
    vocabulary: ["gseh (gesehen)", "hät (hat)", "chunnt (kommt)", "gits (gibt es)", "hoi (hallo)"],
    likelyQuestions: [],
    listeningSituations: [
      "Swiss German Voicemail einer Arztpraxis",
      "Nachbar hinterlässt Mundart-Nachricht wegen eines Pakets",
      "Durchsage am Bahnhof in Mundart",
    ],
    readingTexts: [],
    writingPrompts: [],
    strengths: [],
    weaknesses: [
      "Versteht nur einzelne Wörter in Schweizerdeutsch",
      "Zahlen und Zeitangaben in Mundart schwer verständlich",
    ],
    latestNote:
      "Flagged as high priority weak area. Pierre only needs passive understanding — not production.",
    nextAction:
      "Weekly short Swiss German voicemail listening drill with Patrick, focused on extracting key info, not full comprehension.",
    assignedTeacher: "patrick",
  },
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
    frequency: "high",
    relatedSections: ["sprechen", "schreiben"],
    firstSeen: "2026-06-10",
    lastSeen: "2026-06-28",
  },
  {
    id: "swiss-german-numbers",
    mistake: "Numbers, times and place names are misheard in Swiss German audio",
    example: "Hears 'zwänzg' as 'zwei', or misses the callback number entirely",
    correction: "Listen for key info only — pause after each number/name and write it down immediately",
    frequency: "high",
    relatedSections: ["hoeren"],
    firstSeen: "2026-06-15",
    lastSeen: "2026-06-28",
  },
  {
    id: "dative-prepositions",
    mistake: "Mixes up dative/accusative after two-way prepositions (in, auf, bei)",
    example: "Ich gehe in der Apotheke. (should be 'in die Apotheke')",
    correction: "Drill motion (accusative) vs. location (dative) minimal pairs",
    frequency: "medium",
    relatedSections: ["sprechen", "schreiben"],
    firstSeen: "2026-06-17",
    lastSeen: "2026-06-30",
  },
  {
    id: "perfekt-aux",
    mistake: "Wrong auxiliary verb in Perfekt (haben vs. sein)",
    example: "Ich habe zum Arzt gegangen. (should be 'bin gegangen')",
    correction: "Drill the sein-verb list (gehen, kommen, bleiben, sein...) separately",
    frequency: "medium",
    relatedSections: ["sprechen", "schreiben"],
    firstSeen: "2026-06-22",
    lastSeen: "2026-06-30",
  },
];

// ---------------------------------------------------------------------------
// TOP PRIORITIES
// ---------------------------------------------------------------------------

export const priorities: Priority[] = [
  {
    id: "pr1",
    rank: 1,
    text: "Prepare a flexible 2-minute self-introduction with a natural closing line.",
    relatedSections: ["sprechen"],
    relatedDomains: ["personal-profile"],
  },
  {
    id: "pr2",
    rank: 2,
    text: "Automate the B1 speaking picture-card structure (describe → personalize → opinion → example → advice → Swiss-life link).",
    relatedSections: ["sprechen"],
    relatedDomains: ["leisure", "health"],
  },
  {
    id: "pr3",
    rank: 3,
    text: "Practice the health/doctor/pharmacy scenario end-to-end (symptoms, appointment, follow-up questions, pharmacy).",
    relatedSections: ["sprechen", "hoeren"],
    relatedDomains: ["health"],
  },
  {
    id: "pr4",
    rank: 4,
    text: "Practice Swiss German voicemail comprehension (numbers, times, key facts — not full understanding).",
    relatedSections: ["hoeren"],
    relatedDomains: ["swiss-german"],
  },
  {
    id: "pr5",
    rank: 5,
    text: "Learn writing templates for invitation, appointment change, and information request.",
    relatedSections: ["schreiben"],
    relatedDomains: ["work-study", "health"],
  },
  {
    id: "pr6",
    rank: 6,
    text: "Practice reading Gemeinde notices and event programmes (Sommerfest, Stadtspital, dog registration).",
    relatedSections: ["lesen"],
    relatedDomains: ["gemeinde", "leisure", "civic-admin"],
  },
  {
    id: "pr7",
    rank: 7,
    text: "Practice listening for numbers, times, dates, places, and phone numbers.",
    relatedSections: ["hoeren"],
    relatedDomains: ["transport", "health"],
  },
  {
    id: "pr8",
    rank: 8,
    text: "Keep building the recurring-mistake list after every lesson.",
    relatedSections: ["sprechen", "schreiben"],
    relatedDomains: [],
  },
  {
    id: "pr9",
    rank: 9,
    text: "Run at least one full timed mock exam (90-minute written + oral simulation).",
    relatedSections: ["hoeren", "lesen", "schreiben", "sprechen"],
    relatedDomains: [],
  },
  {
    id: "pr10",
    rank: 10,
    text: "Convert every lesson summary into a website update within 48 hours.",
    relatedSections: [],
    relatedDomains: [],
  },
];

// ---------------------------------------------------------------------------
// Helper lookups (do not edit — derived from the data above)
// ---------------------------------------------------------------------------

export const teacherById = (id: string) => teachers.find((t) => t.id === id);
export const domainById = (id: string) => domains.find((d) => d.id === id);
export const sectionById = (id: string) => sections.find((s) => s.id === id);
export const sessionById = (id: string) => sessions.find((s) => s.id === id);

export const sessionsSorted = () =>
  [...sessions].sort((a, b) => (a.date < b.date ? 1 : -1));

export const plannedSessionsSorted = () =>
  [...plannedSessions].sort((a, b) => (a.date < b.date ? -1 : 1));

export const overallReadiness = () =>
  Math.round(sections.reduce((sum, s) => sum + s.coverage, 0) / sections.length);
