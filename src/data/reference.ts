// Fixed KDE reference material — formulas and structures that rarely change.
// Progress/status data lives in progress.ts instead.

export const speakingStructure = [
  "Auf dem Bild sehe ich …",
  "Bei mir ist es so, dass …",
  "Ich finde das wichtig, weil …",
  "Zum Beispiel …",
  "Wenn man ein Problem hat, sollte man …",
  "Das ist für den Alltag in der Schweiz wichtig.",
];

export const selfIntroductionPoints = ["Name", "Wohnort", "Familie", "Arbeit", "Freizeit"];

export const repairPhrases = [
  "Können Sie die Frage bitte wiederholen?",
  "Moment, ich überlege kurz …",
  "Ich bin nicht sicher, aber ich glaube …",
  "Wie sagt man … auf Deutsch?",
];

export const imageDescriptionMap = {
  title: "Die Bildbeschreibung",
  positions: [
    "oben",
    "unten",
    "links",
    "rechts",
    "in der Mitte / im Zentrum",
    "im Vordergrund",
    "im Hintergrund",
    "in der Ecke",
    "der Bildrand / der Rand",
  ],
  commentPhrases: [
    "darüber - darunter - dahinter - davor - rechts/links daneben befindet sich ...",
    "In der rechten oberen Ecke befindet sich ...",
    "Am rechten/linken Rand ...",
    "In der rechten/linken Bildhälfte ...",
    "Es handelt sich dabei um ein Schwarz-Weiß-Foto/Farbfoto ...",
  ],
};

export const imageDescriptionGuide = [
  {
    title: "Auswahl",
    prompts: [
      "Warum haben Sie dieses Bild gewählt?",
      "Was ist das Thema des Bildes?",
      "Was sieht man auf diesem Foto / Bild? Was geschieht gerade?",
    ],
    phrases: [
      "Ich habe dieses Bild/Foto/Gemälde gewählt, weil ich es wegen ... interessant finde.",
      "Ich habe dieses Bild gewählt, weil es mich an ... erinnert.",
      "Ich habe dieses Bild gewählt, weil ich mich immer schon für dieses Thema interessiert habe.",
      "Ich habe dieses Bild gewählt, weil es mir ganz einfach gefällt.",
      "Ich habe dieses Bild gewählt, weil ich ganz einfach gerne dort wäre.",
      "Ich könnte mir vorstellen, ein Teil dieses Bildes zu sein.",
    ],
  },
  {
    title: "Thema",
    prompts: [
      "Was zeigt das Foto/Bild hauptsächlich?",
      "Was wollte der Fotograf/Maler darstellen?",
      "Warum / weshalb / zu welchem Zweck wurde dieses Foto aufgenommen oder dieses Bild gemalt?",
      "Welchen Titel würden Sie dem Bild/Foto geben?",
    ],
    phrases: [
      "Ich würde dem Bild den Titel ... geben, weil ...",
      "Ich denke, das Hauptthema ist ...",
      "Wahrscheinlich wollte der Fotograf/Maler zeigen, dass ...",
      "Die Absicht/Intention des Fotografen war, ... darzustellen.",
    ],
  },
  {
    title: "Beschreibung",
    prompts: [
      "Was ist das zentrale Motiv des Bildes?",
      "Gibt es ein bestimmtes Zeichen oder Symbol?",
      "Was sieht man im Vordergrund, in der Mitte und im Hintergrund?",
    ],
    phrases: [
      "Dieses Bild zeigt ...",
      "Wir sehen auf diesem Foto ...",
      "Man sieht auf diesem Foto ...",
      "Ich nehme auf diesem Foto Folgendes wahr: ...",
      "Wenn ich dieses Bild betrachte, fällt mir zuerst ... auf.",
      "Ich denke, es handelt sich bei diesem Bild um ...",
    ],
  },
  {
    title: "Hintergrund",
    prompts: [
      "Welche Stimmung drückt das Foto aus?",
      "Wie wirkt das Foto auf mich?",
      "Welche Personen, Gebäude oder Landschaften sind dargestellt?",
      "Wie sieht die Landschaft aus?",
      "Welche Stimmung vermitteln Farben und Licht: Tag, Nacht, Natur, Personen, Farben?",
    ],
    phrases: [
      "Im Hintergrund sieht man ...",
      "Die Farben wirken ...",
      "Das Licht macht die Stimmung ...",
      "Auf mich wirkt das Foto ...",
    ],
  },
  {
    title: "Vordergrund und Details",
    prompts: [
      "Was ist im Zentrum zu sehen?",
      "Was fällt auf?",
      "Was sticht zuerst ins Auge?",
      "Was denken die Menschen oder Tiere? Was geht wohl in ihnen vor?",
      "Wie ist die Körperhaltung der Menschen?",
      "Welche Kleidung tragen die Menschen im Bild?",
      "Was befindet sich zwischen Vordergrund und Hintergrund?",
    ],
    phrases: [
      "Mir sticht zuerst ins Auge, dass ...",
      "Mir fällt auf, dass ...",
      "Im Zentrum des Bildes / in der Bildmitte sehe ich ...",
      "Links/rechts vom Zentrum befindet sich ...",
      "Am oberen/unteren/rechten/linken Bildrand sieht man ...",
      "Im Vordergrund / im Hintergrund erkennt man ...",
      "Ganz in der Nähe der Person befindet sich ...",
    ],
  },
  {
    title: "Perspektive und Wirkung",
    prompts: [
      "Aus welcher Perspektive ist das Foto aufgenommen oder das Bild gemalt?",
      "Warum ist die Darstellung so und nicht anders?",
      "Welche Absicht hat der Fotograf / der Künstler?",
      "Welche Wirkung hat das Bild auf mich?",
      "Welche Wirkung hat das Bild vermutlich auf andere Menschen?",
    ],
    phrases: [
      "Das Foto ist aus der Vogelperspektive aufgenommen.",
      "Das Foto ist aus der Normalperspektive aufgenommen.",
      "Das Foto ist aus der Froschperspektive aufgenommen.",
      "Auf mich wirkt das Bild ..., weil ...",
    ],
  },
];

export const describedLessonImage = {
  src: "lesson-images/denajder-phone-picture.png",
  alt: "Zwei Jugendliche sitzen draußen auf Stufen und schauen auf ihre Handys.",
  model: [
    "Ich wähle dieses Foto, weil es ein alltägliches Thema zeigt.",
    "Auf dem Bild sehe ich zwei Jugendliche, die draußen auf Stufen sitzen.",
    "Beide Jungen schauen auf ihr Handy.",
    "Der Junge rechts trägt rote Schuhe, eine blaue Jeans und ein grünes Hemd.",
    "Der Junge links trägt schwarze Schuhe, eine blaue Jeans und ein grünes Hemd.",
    "Im Hintergrund sieht man eine Statue und andere Menschen in der Stadt.",
    "Mir fällt auf, dass die Statue eine ähnliche Körperhaltung wie die Jugendlichen hat.",
    "Ich denke, das Thema ist Smartphone-Nutzung im Alltag.",
  ],
};

export const writingStructure = [
  "Date",
  "Greeting",
  "Reason",
  "Details: when, where, what",
  "Request",
  "Closing formula and name",
];
