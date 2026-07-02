// Fixed KDE exam-format reference material. This rarely changes — unlike
// progress.ts, you probably won't need to edit this file often.

export const examOverview = {
  written: {
    totalMinutes: 90,
    parts: [
      { label: "Introduction", minutes: 15 },
      { label: "Hören — 4 tasks", minutes: 15 },
      { label: "Lesen — 4 tasks", minutes: 35 },
      { label: "Schreiben — 1 task", minutes: 25 },
    ],
  },
  oral: {
    minutes: "15–20",
    notes: [
      "Usually two candidates, two examiners",
      "Task 1: self-introduction, about 2 minutes",
      "Task 2: speak about one selected picture-card topic, about 5 minutes",
      "Examiners may ask follow-up questions",
    ],
  },
  languageNote:
    "The KDE is a German-language exam, not the Swiss civics test — but some Lesen/Hören material references Swiss/Gemeinde life (notices, voting logistics, school info). The oral exam is in Hochdeutsch; Pierre does not need to produce Swiss German, only understand simple everyday Swiss German passively (e.g. voicemails).",
};

export const speakingStructure = [
  "Auf dem Bild sehe ich …",
  "Bei mir ist es so, dass …",
  "Ich finde das wichtig, weil …",
  "Zum Beispiel …",
  "Wenn man ein Problem hat, sollte man …",
  "Das ist für den Alltag in der Schweiz wichtig.",
];

export const selfIntroductionPoints = ["Name", "Wohnort", "Familie", "Arbeit", "Freizeit"];

export const speakingDomains = [
  "Housing and neighbours",
  "Work and study",
  "Health, doctor, pharmacy",
  "Gemeinde and administration",
  "School, children, family",
  "Shopping and services",
  "Transport and directions",
  "Leisure, clubs, local events",
  "Waste and recycling",
  "Voting / admin language",
];

export const writingStructure = [
  "Date",
  "Greeting",
  "Reason",
  "Details: when, where, what",
  "Request",
  "Closing formula and name",
];

export const writingModelTask = {
  prompt:
    "Pierre schreibt an seine Kollegen, weil er seit zehn Jahren in der gleichen Firma arbeitet und einen Apéro plant. Die Nachricht soll enthalten: warum er schreibt, wann/wo der Apéro stattfindet, die Bitte, sich anzumelden, und eine Grussformel.",
  model:
    "Zürich, 3. Juli 2026\n\nLiebe Kolleginnen und Kollegen\n\nIch arbeite jetzt seit zehn Jahren in unserer Firma und möchte das gerne feiern. Deshalb lade ich euch herzlich zu einem Apéro ein.\n\nDatum: Freitag, 17. Juli 2026\nZeit: ab 17 Uhr\nOrt: Pausenraum, 2. Stock\n\nBitte meldet euch bis zum 10. Juli bei mir an, damit ich genug Getränke und Snacks bestellen kann.\n\nIch freue mich auf einen schönen Abend mit euch!\n\nFreundliche Grüsse\nPierre",
  wordCount: 68,
};

export const writingTaskFamilies = [
  "Invitation (e.g. Apéro after 10 years at the company)",
  "Appointment cancellation / change",
  "Request for information",
  "Apology / explanation",
  "Neighbour / housing message",
  "Work message",
];

export const listeningTrainingSituations = [
  "Someone asks where the doctor or pharmacy is",
  "A medical practice leaves an answering-machine message",
  "A radio announcement explains a children's procession and road closures",
  "A Swiss German voicemail mentions an injury, an Elternabend, transport, and calling back",
];

export const readingTrainingTexts = [
  "Sommerfest in Fällanden (event programme)",
  "Tag der offenen Tür im Stadtspital",
  "Paper collection notice",
  "Dog tax / Einwohnerkontrolle notice",
  "Voting instructions",
  "Pharmacy or emergency-doctor notice",
];
