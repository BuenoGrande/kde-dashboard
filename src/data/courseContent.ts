import type { Status } from "./types";

export interface VocabularyItem {
  de: string;
  fr: string;
  note?: string;
}

export interface CourseScenario {
  title: string;
  setup: string;
  task: string;
}

export interface MiniCourse {
  goal: string;
  steps: string[];
  success: string[];
}

export interface DomainCourse {
  vocabulary: VocabularyItem[];
  keyQuestions: string[];
  scenarios: CourseScenario[];
  miniCourse: MiniCourse;
  teacherAgent: string;
  studentAgent: string;
}

export const fallbackDomainCourse: DomainCourse = {
  vocabulary: [
    { de: "die Situation", fr: "la situation" },
    { de: "das Problem", fr: "le probleme" },
    { de: "die Frage", fr: "la question" },
    { de: "die Lösung", fr: "la solution" },
  ],
  keyQuestions: [
    "Was ist passiert?",
    "Was brauchen Sie?",
    "Was machen Sie als Nächstes?",
  ],
  scenarios: [
    {
      title: "Short everyday exchange",
      setup: "Pierre receives a practical question about this topic.",
      task: "Answer in 4-5 simple sentences, then ask one follow-up question.",
    },
  ],
  miniCourse: {
    goal: "Handle the topic with simple, controlled German.",
    steps: [
      "Learn 8-10 nouns and 4 useful verbs.",
      "Prepare three personal sentences.",
      "Practise one roleplay and one short written note.",
    ],
    success: [
      "Pierre can explain the problem without switching to French.",
      "Pierre can ask for one concrete next step.",
    ],
  },
  teacherAgent: "Check whether Pierre can produce a real answer, not just recognise words.",
  studentAgent: "I need the words, one model answer, and one roleplay before this feels usable.",
};

export const domainCourses: Record<string, DomainCourse> = {
  "personal-profile": {
    vocabulary: [
      { de: "die Staatsbürgerschaft", fr: "la nationalité / citoyenneté" },
      { de: "die Prüfung", fr: "l'examen" },
      { de: "in zwei Wochen", fr: "dans deux semaines" },
      { de: "die Freizeit", fr: "le temps libre" },
      { de: "Ich möchte Schweizer werden.", fr: "Je veux devenir Suisse.", note: "Patrick correction" },
      { de: "die eigene Erfahrung", fr: "sa propre expérience" },
    ],
    keyQuestions: [
      "Können Sie sich bitte kurz vorstellen?",
      "Wo wohnen Sie und seit wann leben Sie dort?",
      "Was machen Sie in Ihrer Freizeit?",
    ],
    scenarios: [
      {
        title: "2-minute introduction",
        setup: "The examiner asks Pierre to introduce himself naturally.",
        task: "Cover name, home, family, work and leisure, then close with one confident sentence.",
      },
      {
        title: "Follow-up about daily life",
        setup: "The examiner asks one spontaneous question about work or hobbies.",
        task: "Answer with one reason using weil, then ask for repetition if needed.",
      },
    ],
    miniCourse: {
      goal: "Make the self-introduction automatic enough to survive stress.",
      steps: [
        "Write six short sentences in a fixed order.",
        "Add two weil-sentences: work and free time.",
        "Practise once slowly, once timed, once with interruptions.",
      ],
      success: [
        "Pierre reaches 2 minutes without running out of content.",
        "The final sentence sounds complete, not abrupt.",
      ],
    },
    teacherAgent: "The course is good if Pierre can handle a follow-up question without restarting the whole script.",
    studentAgent: "I know what to say first, but I still need a closing line that sounds natural.",
  },
  housing: {
    vocabulary: [
      { de: "der Wohnraum", fr: "le logement / espace habitable" },
      { de: "die Wohngemeinschaft", fr: "la colocation" },
      { de: "der Nachbar", fr: "le voisin" },
      { de: "respektvoll", fr: "respectueux" },
      { de: "leiser machen", fr: "baisser le volume" },
      { de: "die Erlaubnis", fr: "l'autorisation" },
    ],
    keyQuestions: [
      "Wie wohnen Sie in der Schweiz?",
      "Was machen Sie, wenn es ein Problem mit den Nachbarn gibt?",
      "Was steht oft in einer Hausordnung?",
    ],
    scenarios: [
      {
        title: "Noise complaint",
        setup: "A neighbour says Pierre made too much noise on Saturday evening.",
        task: "Apologise, explain briefly, and propose a concrete solution.",
      },
      {
        title: "Broken appliance",
        setup: "The washing machine in the building is broken.",
        task: "Call the Verwaltung and give the address, problem and preferred appointment.",
      },
    ],
    miniCourse: {
      goal: "Speak and write politely about common housing problems.",
      steps: [
        "Learn housing, neighbour, noise and rubbish vocabulary.",
        "Practise a complaint reply with Entschuldigung and könnten.",
        "Write one short neighbour message about noise or rubbish.",
      ],
      success: [
        "Pierre can describe a problem without sounding aggressive.",
        "Pierre can identify who must act: neighbour, Verwaltung or Hauswart.",
      ],
    },
    teacherAgent: "Add one realistic Verwaltung text; this domain needs reading and speaking, not only vocabulary.",
    studentAgent: "The polite formulas help because I know exactly how to answer a complaint.",
  },
  "work-study": {
    vocabulary: [
      { de: "die Forschung", fr: "la recherche" },
      { de: "der Wissenschaftler", fr: "le scientifique" },
      { de: "die Vorbereitung", fr: "la préparation" },
      { de: "der Bildschirm", fr: "l'écran" },
      { de: "die E-Mail", fr: "l'e-mail" },
      { de: "geeignet", fr: "adapté / approprié" },
    ],
    keyQuestions: [
      "Was arbeiten Sie?",
      "Wie sieht ein normaler Arbeitstag aus?",
      "Warum ist Deutsch bei der Arbeit wichtig?",
    ],
    scenarios: [
      {
        title: "Talk about work",
        setup: "The examiner asks about Pierre's job and daily tasks.",
        task: "Give role, schedule, two tasks, and one reason with weil.",
      },
      {
        title: "Course registration",
        setup: "Pierre wants information about a German course or training.",
        task: "Ask about date, price, location and registration deadline.",
      },
    ],
    miniCourse: {
      goal: "Describe work clearly and use weil word order correctly.",
      steps: [
        "Prepare five job sentences with time, place and task.",
        "Transform three sentences into weil-sentences.",
        "Practise a short information request by email.",
      ],
      success: [
        "Verb-final word order after weil is correct at least 4 out of 5 times.",
        "Pierre can answer one spontaneous question about colleagues or schedule.",
      ],
    },
    teacherAgent: "Do not let the job description stay memorised only; ask small follow-ups.",
    studentAgent: "I need weil practice here because work is where I make the mistake most often.",
  },
  health: {
    vocabulary: [
      { de: "der Termin", fr: "le rendez-vous" },
      { de: "Bauchschmerze", fr: "maux de ventre", note: "Swiss German lesson form" },
      { de: "min Chopf", fr: "ma tête", note: "Swiss German lesson form" },
      { de: "tuet weh", fr: "fait mal", note: "Swiss German lesson form" },
      { de: "die Rückmeldung", fr: "le retour / la réponse" },
      { de: "untersuchen lassen", fr: "faire examiner" },
    ],
    keyQuestions: [
      "Welche Beschwerden haben Sie?",
      "Seit wann haben Sie Schmerzen?",
      "Was brauchen Sie in der Apotheke?",
    ],
    scenarios: [
      {
        title: "Doctor appointment",
        setup: "Pierre calls a doctor's practice because he has symptoms.",
        task: "Describe symptoms, ask for an appointment, and confirm the time.",
      },
      {
        title: "Pharmacy advice",
        setup: "Pierre needs medicine but does not know which product to buy.",
        task: "Explain the problem, mention allergies if relevant, and ask how often to take it.",
      },
    ],
    miniCourse: {
      goal: "Handle the doctor and pharmacy chain from first call to follow-up.",
      steps: [
        "Learn symptom nouns and appointment verbs.",
        "Practise seit wann plus simple time expressions.",
        "Run two roleplays: doctor call, then pharmacy question.",
      ],
      success: [
        "Pierre can state symptom, duration and urgency.",
        "Pierre can repeat back a time or instruction accurately.",
      ],
    },
    teacherAgent: "This is a high-priority domain; require exact times and medication instructions.",
    studentAgent: "This is useful, but I need the pharmacy scenario because the doctor call alone is not enough.",
  },
  gemeinde: {
    vocabulary: [
      { de: "die Staatsbürgerschaft", fr: "la nationalité / citoyenneté" },
      { de: "die Prüfung", fr: "l'examen" },
      { de: "das Formular", fr: "le formulaire" },
      { de: "die Frist", fr: "le delai" },
      { de: "die Anzeige", fr: "l'annonce" },
      { de: "Tag der offenen Tür", fr: "journée portes ouvertes" },
    ],
    keyQuestions: [
      "Was brauchen Sie von der Gemeinde?",
      "Bis wann muss man das Formular abgeben?",
      "Welche Unterlagen muss man mitbringen?",
    ],
    scenarios: [
      {
        title: "Counter request",
        setup: "Pierre goes to the Gemeinde counter to ask for a document.",
        task: "Say what he needs, ask which documents to bring, and confirm the deadline.",
      },
      {
        title: "Notice reading",
        setup: "Pierre reads a Gemeinde notice about opening hours or a deadline.",
        task: "Extract who, what, where, when and what to bring.",
      },
    ],
    miniCourse: {
      goal: "Turn administrative text into concrete facts.",
      steps: [
        "Underline date, place, deadline and required documents.",
        "Convert each fact into a short answer sentence.",
        "Practise one polite question with ich möchte / ich brauche.",
      ],
      success: [
        "Pierre can find deadlines without translating the whole text.",
        "Pierre can ask for a form or document politely.",
      ],
    },
    teacherAgent: "Give Pierre a real-looking notice and time-box extraction to five minutes.",
    studentAgent: "The five facts help me because administration texts feel long and unclear.",
  },
  "school-family": {
    vocabulary: [
      { de: "wütend", fr: "fâché / en colère" },
      { de: "dickköpfig", fr: "têtu" },
      { de: "schüchtern", fr: "timide" },
      { de: "die Eigenschaft", fr: "la qualité / caractéristique" },
      { de: "ehrlich", fr: "honnête" },
      { de: "selbstbewusst", fr: "sûr de soi" },
    ],
    keyQuestions: [
      "Wie ist Ihr Vater / Ihre Mutter / Ihr Bruder?",
      "Welche Eigenschaften sind Ihnen bei Freunden wichtig?",
      "Waren Sie als Kind anders als heute?",
    ],
    scenarios: [
      {
        title: "Family personality",
        setup: "The examiner asks Pierre to compare himself with someone in his family.",
        task: "Answer in 3-4 simple sentences using wie, mit and one adjective.",
      },
      {
        title: "Friendship qualities",
        setup: "Pierre explains what kind of people he likes or avoids.",
        task: "Use one relative clause, e.g. Leute, die ehrlich sind.",
      },
    ],
    miniCourse: {
      goal: "Answer personality and family questions without switching language.",
      steps: [
        "Memorise 6 personality adjectives with one family example each.",
        "Practise als for childhood: Als ich ein Kind war...",
        "Build two relative clauses with die.",
      ],
      success: [
        "Pierre can describe a family member with adjective + reason.",
        "Pierre can use als for a past childhood sentence.",
      ],
    },
    teacherAgent: "Keep it German-only and reuse the real personality prompts from the July 3 Denajder lesson.",
    studentAgent: "I need model answers because personality questions become messy when I improvise.",
  },
  "shopping-services": {
    vocabulary: [
      { de: "der Kellner", fr: "le serveur" },
      { de: "der Apfelstrudel", fr: "le strudel aux pommes" },
      { de: "die Schlagsahne", fr: "la crème fouettée" },
      { de: "der Fernseher", fr: "la télévision" },
      { de: "der Vorschlag", fr: "la proposition" },
      { de: "liefern", fr: "livrer" },
    ],
    keyQuestions: [
      "Wo kaufen Sie normalerweise ein?",
      "Was machen Sie, wenn ein Produkt kaputt ist?",
      "Welche Informationen stehen auf einem Flyer?",
    ],
    scenarios: [
      {
        title: "Return a product",
        setup: "Pierre bought something that does not work.",
        task: "Explain the problem, show the receipt, and ask for exchange or refund.",
      },
      {
        title: "Read a store flyer",
        setup: "A shop advertises special opening hours and discounts.",
        task: "Find price, date, place and whether the offer has a deadline.",
      },
    ],
    miniCourse: {
      goal: "Combine everyday service vocabulary with polite complaint language.",
      steps: [
        "Practise prices, dates and opening hours.",
        "Learn one calm complaint formula: Das funktioniert leider nicht.",
        "Roleplay a return with receipt and desired solution.",
      ],
      success: [
        "Pierre can state the problem and ask for one solution.",
        "Pierre can read numbers and opening hours without confusion.",
      ],
    },
    teacherAgent: "Make Pierre choose between refund, exchange and repair; that tests real control.",
    studentAgent: "This is easier if I know the exact complaint sentence before the roleplay.",
  },
  transport: {
    vocabulary: [
      { de: "der Bahnhof", fr: "la gare" },
      { de: "der Zug", fr: "le train" },
      { de: "die Verspätung", fr: "le retard" },
      { de: "warten auf", fr: "attendre", note: "warten auf + Akkusativ" },
      { de: "nehmen", fr: "prendre" },
      { de: "auf den Zug", fr: "le train", note: "accusative chunk" },
    ],
    keyQuestions: [
      "Wie kommen Sie zur Arbeit?",
      "Was machen Sie bei einer Verspaetung?",
      "Auf welchem Gleis faehrt der Zug ab?",
    ],
    scenarios: [
      {
        title: "Platform change",
        setup: "Pierre hears an announcement about a platform change.",
        task: "Write down train, platform, delay and new departure time.",
      },
      {
        title: "Ask for directions",
        setup: "Pierre is lost near a station.",
        task: "Ask for the way, repeat the instruction, and thank the person.",
      },
    ],
    miniCourse: {
      goal: "Catch key transport facts under speed and stress.",
      steps: [
        "Pre-teach platform, delay, connection and direction words.",
        "Listen once for numbers only, once for full meaning.",
        "Practise repeating instructions with zuerst, dann, links, rechts.",
      ],
      success: [
        "Pierre captures the right number or time at least twice in a row.",
        "Pierre can ask a clarification question instead of freezing.",
      ],
    },
    teacherAgent: "Numbers are the assessment point; do not accept vague comprehension.",
    studentAgent: "I need slow-first, fast-second listening because I miss the important numbers.",
  },
  leisure: {
    vocabulary: [
      { de: "der Verein", fr: "l'association / club" },
      { de: "das Lied", fr: "la chanson" },
      { de: "die Träne", fr: "la larme" },
      { de: "der Alltag", fr: "le quotidien" },
      { de: "die Insel", fr: "l'île" },
      { de: "die Traumferien", fr: "les vacances de rêve" },
    ],
    keyQuestions: [
      "Was machen Sie gern in der Freizeit?",
      "Warum sind Vereine wichtig?",
      "Wie meldet man sich für eine Veranstaltung an?",
    ],
    scenarios: [
      {
        title: "Picture-card opinion",
        setup: "The picture shows a club, sports group or community event.",
        task: "Describe the picture, connect to Pierre's life, and give an opinion with weil.",
      },
      {
        title: "Event programme",
        setup: "Pierre reads a programme for a local event.",
        task: "Find date, time, location, registration deadline and price.",
      },
    ],
    miniCourse: {
      goal: "Use leisure topics to practise opinion and community vocabulary.",
      steps: [
        "Prepare two hobbies and one reason for each.",
        "Practise the picture-card six-step structure.",
        "Read one programme and answer five factual questions.",
      ],
      success: [
        "Pierre gives an opinion instead of only describing facts.",
        "Pierre can connect the topic to daily life in Switzerland.",
      ],
    },
    teacherAgent: "Force the opinion step; recent speaking still needed support for longer, cleaner answers.",
    studentAgent: "I can describe hobbies, but the opinion sentence needs to become automatic.",
  },
  waste: {
    vocabulary: [
      { de: "der Müll", fr: "les déchets" },
      { de: "wegwerfen", fr: "jeter" },
      { de: "der Nachbar", fr: "le voisin" },
      { de: "laut", fr: "fort / bruyant" },
      { de: "leise", fr: "doucement / silencieux" },
      { de: "die Polizei", fr: "la police" },
    ],
    keyQuestions: [
      "Wie trennt man Abfall in Ihrer Gemeinde?",
      "Wann wird der Abfall abgeholt?",
      "Was darf man zur Sammelstelle bringen?",
    ],
    scenarios: [
      {
        title: "Collection calendar",
        setup: "Pierre receives a waste-collection calendar.",
        task: "Find the correct day for paper, green waste and household rubbish.",
      },
      {
        title: "Neighbour question",
        setup: "A neighbour asks where to put glass or cardboard.",
        task: "Give a simple instruction with place and time.",
      },
    ],
    miniCourse: {
      goal: "Read local recycling information and explain one rule.",
      steps: [
        "Learn waste categories and collection verbs.",
        "Read one calendar row by row.",
        "Produce three rule sentences with man darf / man muss.",
      ],
      success: [
        "Pierre can identify the correct collection date.",
        "Pierre can explain one prohibition or obligation.",
      ],
    },
    teacherAgent: "Use a table-format document; this domain is mainly reading accuracy.",
    studentAgent: "A calendar example makes this much clearer than a vocabulary list alone.",
  },
  "civic-admin": {
    vocabulary: [
      { de: "die Abstimmung", fr: "la votation" },
      { de: "die Unterlagen", fr: "les documents" },
      { de: "der Briefkasten", fr: "la boite aux lettres" },
      { de: "die Frist", fr: "le delai" },
      { de: "gültig", fr: "valable" },
      { de: "unterschreiben", fr: "signer" },
    ],
    keyQuestions: [
      "Welche Unterlagen bekommt man per Post?",
      "Bis wann muss man etwas zurückschicken?",
      "Was macht ein Dokument ungültig?",
    ],
    scenarios: [
      {
        title: "Instructions as reading task",
        setup: "Pierre reads voting or civic instructions as language practice.",
        task: "Extract deadline, required signature, envelope and return method.",
      },
      {
        title: "Ask for clarification",
        setup: "Pierre does not understand an administrative instruction.",
        task: "Ask one polite clarification question at the counter.",
      },
    ],
    miniCourse: {
      goal: "Understand logistics language around official instructions.",
      steps: [
        "Separate language task from political content.",
        "Mark deadline, required action and condition for validity.",
        "Practise one clarification formula: Bedeutet das, dass ...?",
      ],
      success: [
        "Pierre extracts the required action without debating content.",
        "Pierre can ask what a word or instruction means.",
      ],
    },
    teacherAgent: "Keep this strictly as language comprehension and logistics.",
    studentAgent: "I need to know what to do with the document, not discuss politics.",
  },
  "swiss-german": {
    vocabulary: [
      { de: "Hoi", fr: "salut", note: "Swiss German greeting" },
      { de: "Grüezi", fr: "bonjour", note: "Swiss German greeting" },
      { de: "Ich bin de Pierre", fr: "Je suis Pierre", note: "Swiss German intro chunk" },
      { de: "Ziit", fr: "temps / créneau", note: "Swiss German listening form" },
      { de: "Numme", fr: "numéro", note: "Swiss German listening form" },
      { de: "de Arzt", fr: "le médecin", note: "Swiss German listening form" },
    ],
    keyQuestions: [
      "Welche Zahl oder Uhrzeit haben Sie gehoert?",
      "Wer ruft an?",
      "Was soll Pierre tun?",
    ],
    scenarios: [
      {
        title: "Voicemail key facts",
        setup: "Pierre hears a short Swiss German voicemail.",
        task: "Extract caller, topic, date/time and requested action only.",
      },
      {
        title: "Announcement survival",
        setup: "A fast transport or appointment message contains numbers.",
        task: "Ignore unknown words and capture the numbers and names.",
      },
    ],
    miniCourse: {
      goal: "Survive Swiss German passively by catching key facts.",
      steps: [
        "Pre-teach five likely words in Swiss German and standard German.",
        "Listen for names and numbers before trying global meaning.",
        "Replay and write a four-field note: who, what, when, action.",
      ],
      success: [
        "Pierre captures at least two key facts from a short voicemail.",
        "Pierre does not panic when full comprehension is impossible.",
      ],
    },
    teacherAgent: "For Pierre's current plan, target key-fact extraction; train production only if you deliberately choose Swiss German for oral work.",
    studentAgent: "This feels manageable when I am allowed to ignore unknown words.",
  },
  "money-insurance": {
    vocabulary: [
      { de: "die Rechnung", fr: "la facture" },
      { de: "der Betrag", fr: "le montant" },
      { de: "die Versicherung", fr: "l'assurance" },
      { de: "die Krankenkasse", fr: "l'assurance maladie" },
      { de: "die Zahlungsfrist", fr: "le delai de paiement" },
      { de: "die Referenznummer", fr: "le numero de reference" },
      { de: "der Absender", fr: "l'expediteur" },
      { de: "der Brief", fr: "la lettre" },
      { de: "das Bargeld", fr: "l'argent liquide" },
      { de: "die Miete", fr: "le loyer" },
      { de: "bezahlen", fr: "payer" },
      { de: "fällig", fr: "echu / a payer", note: "deadline word on bills" },
      { de: "einschüchternd", fr: "intimidant", note: "official letters can feel this way" },
      { de: "praktisch", fr: "pratique", note: "Apple Pay answer" },
      { de: "sinnvoll", fr: "judicieux / utile", note: "insurance opinion word" },
    ],
    keyQuestions: [
      "Wie wichtig ist Geld für dich in deinem täglichen Leben?",
      "Bezahlst du im Alltag lieber mit Bargeld, mit Karte oder mit dem Smartphone? Warum?",
      "Welche Versicherungen sind deiner Meinung nach absolut notwendig?",
      "Hast du schon einmal eine Zahlungsfrist verpasst?",
      "Wie fühlst du dich bei einem offiziellen Brief von einer Behörde oder Versicherung?",
      "Ist es heutzutage schwieriger geworden, Geld für die Zukunft zu sparen?",
      "Was machst du, wenn du einen Brief oder eine Rechnung sprachlich nicht sofort verstehst?",
      "Sollten Jugendliche in der Schule mehr über Steuern, Rechnungen und Versicherungen lernen?",
      "Sind Krankenkassen und Versicherungen in deinem Heimatland ähnlich organisiert wie hier?",
      "Würdest du dir Geld von Freunden oder Familie leihen, wenn du eine hohe Rechnung bezahlen müsstest?",
      "Wie viel muss man bezahlen?",
      "Bis wann muss man bezahlen?",
      "An wen muss man sich bei Fragen wenden?",
      "Muss ich bezahlen, ein Dokument senden oder anrufen?",
    ],
    scenarios: [
      {
        title: "Invoice reading",
        setup: "Pierre receives a bill from an office or insurer.",
        task: "Find amount, deadline, reference number and contact.",
      },
      {
        title: "Question about insurance",
        setup: "Pierre does not understand a short insurance letter.",
        task: "Ask what the letter means and what he must do next.",
      },
      {
        title: "Personal money questions",
        setup: "The examiner asks how Pierre pays in daily life and how he saves money.",
        task: "Answer with one personal habit, one reason and one comparison with früher/heutzutage.",
      },
    ],
    miniCourse: {
      goal: "Discuss daily money habits, then extract amount, deadline and action from official letters.",
      steps: [
        "Learn invoice, insurance and payment words.",
        "Prepare three personal answers: Apple Pay/Bargeld, Versicherung, Sparen.",
        "Practise reading one bill or letter for numbers first.",
        "Write one short question asking for clarification.",
      ],
      success: [
        "Pierre can answer money questions without switching to English for core words.",
        "Pierre identifies amount and deadline correctly.",
        "Pierre can ask whether he must pay, send a document or call back.",
      ],
    },
    teacherAgent: "Pierre has spoken about the topic with support; next validation needs a realistic invoice or insurance letter under light time pressure.",
    studentAgent: "The personal questions are useful, but I need the letter-reading step to know what I must actually do.",
  },
  emergencies: {
    vocabulary: [
      { de: "der Unfall", fr: "l'accident" },
      { de: "die Hilfe", fr: "l'aide" },
      { de: "die Adresse", fr: "l'adresse" },
      { de: "die Polizei", fr: "la police" },
      { de: "der Krankenwagen", fr: "l'ambulance" },
      { de: "verletzen", fr: "blesser" },
    ],
    keyQuestions: [
      "Was ist passiert?",
      "Wo genau sind Sie?",
      "Brauchen Sie sofort Hilfe?",
    ],
    scenarios: [
      {
        title: "Ask for help",
        setup: "Pierre witnesses a small accident and needs help.",
        task: "Say what happened, where he is, and what help is needed.",
      },
      {
        title: "Safety instruction",
        setup: "Pierre hears or reads a safety instruction.",
        task: "Identify the danger and the required action.",
      },
    ],
    miniCourse: {
      goal: "Produce short, clear emergency sentences.",
      steps: [
        "Memorise three sentence frames: Es gab..., Wir brauchen..., Die Adresse ist...",
        "Practise giving an address slowly.",
        "Run one low-stress roleplay, then one timed roleplay.",
      ],
      success: [
        "Pierre can give location and problem in under 30 seconds.",
        "Pierre avoids long explanations when a short answer is safer.",
      ],
    },
    teacherAgent: "Keep sentences short and factual; fluency is less important than clarity.",
    studentAgent: "I need fixed sentence frames here because stress will be high.",
  },
  "digital-services": {
    vocabulary: [
      { de: "der Termin", fr: "le rendez-vous" },
      { de: "die Rückmeldung", fr: "la réponse / le retour" },
      { de: "die baldige Rückmeldung", fr: "la réponse rapide" },
      { de: "die Ausländerbehörde", fr: "l'autorité des étrangers" },
      { de: "verschieben", fr: "déplacer / reporter" },
      { de: "vereinbaren", fr: "convenir / fixer" },
    ],
    keyQuestions: [
      "Wie bucht man einen Termin online?",
      "Welche Bestaetigung haben Sie bekommen?",
      "Was machen Sie, wenn das Passwort nicht funktioniert?",
    ],
    scenarios: [
      {
        title: "Online appointment",
        setup: "Pierre needs to book or move an appointment online.",
        task: "Explain the problem and write a short confirmation question.",
      },
      {
        title: "Login problem",
        setup: "Pierre cannot access a service account.",
        task: "Ask for help and state email, service and problem.",
      },
    ],
    miniCourse: {
      goal: "Use digital-service vocabulary for simple written support requests.",
      steps: [
        "Learn account, password, confirmation and upload vocabulary.",
        "Practise one support message with problem and request.",
        "Check that date, email and desired appointment are included.",
      ],
      success: [
        "Pierre can describe a login or booking problem.",
        "Pierre can write a short message that includes all required facts.",
      ],
    },
    teacherAgent: "This domain can double as writing practice; require a complete message.",
    studentAgent: "I understand the situation if we practise one real support message.",
  },
};

export type ExamTrackId = "writing" | "speaking" | "listening" | "reading";

export const kdeExamStructure: {
  id: ExamTrackId;
  label: string;
  level: string;
  format: string;
  signals: string[];
}[] = [
  {
    id: "writing",
    label: "Writing",
    level: "A2",
    format: "Schreiben: 1 task, 25 minutes, total ca. 40 Wörter. Complete the prompt bullets: reason, date/place, registration request, closing.",
    signals: ["complete prompt bullets", "date and greeting", "clear date/place", "closing formula"],
  },
  {
    id: "speaking",
    label: "Speaking",
    level: "B1",
    format: "Sprechen: oral practice tracked as self-introduction plus speaking about a scenario-based picture card, with follow-up questions.",
    signals: ["answers spontaneously", "gives reasons", "repairs misunderstandings", "stays in German"],
  },
  {
    id: "listening",
    label: "Listening",
    level: "Hören",
    format: "Hören: 4 tasks, 15 minutes. Conversations, answering-machine messages, announcements and one Swiss German message in the public model test.",
    signals: ["true/false decisions", "numbers and times", "caller and action", "Swiss German key facts"],
  },
  {
    id: "reading",
    label: "Reading",
    level: "Lesen",
    format: "Lesen: 4 tasks, 35 minutes. Programmes, notices, ads and official instructions in the public model test.",
    signals: ["selects right answer", "matches situations to ads", "finds deadlines", "identifies required action"],
  },
];

export interface SkillCourseContent {
  examBrief: string;
  lessonGoal: string;
  checkpoints: string[];
  scenarios: CourseScenario[];
  miniCourse: MiniCourse;
  teacherAgent: string;
  studentAgent: string;
}

export const writingTaskCourses: Record<string, SkillCourseContent> = {
  invitation: {
    examBrief: "KDE model pattern: invite people, include reason, date, time, place and registration request. Target total: ca. 40 Wörter.",
    lessonGoal: "Write a complete invitation of about 40 words without forgetting the response instruction.",
    checkpoints: [
      "Date and greeting are present.",
      "Reason for the invitation is clear.",
      "Date, time and place are explicit.",
      "There is a request: please register / please answer.",
      "Closing formula and name are present.",
    ],
    scenarios: [
      {
        title: "Company apero",
        setup: "Pierre celebrates ten years at work and invites colleagues.",
        task: "Write about 40 words with location, deadline and reason.",
      },
      {
        title: "Neighbour coffee",
        setup: "Pierre invites neighbours for a short coffee after moving in.",
        task: "Write a friendly invitation and ask for a reply.",
      },
    ],
    miniCourse: {
      goal: "Make the six-part writing structure automatic.",
      steps: [
        "Draft only the skeleton first: date, greeting, reason, details, request, closing.",
        "Add one sentence per part.",
        "Count words and remove anything not needed for the task.",
      ],
      success: [
        "The message is between 40 and 80 words.",
        "A reader knows where, when and what to do next.",
      ],
    },
    teacherAgent: "Accept simple German, but do not accept a missing registration request.",
    studentAgent: "This course works because I can follow the six boxes and not improvise the whole text.",
  },
  "reply-to-invitation": {
    examBrief: "A2 practice pattern: accept or decline, thank the sender, give one reason, ask or answer one detail.",
    lessonGoal: "Answer an invitation politely without writing too much.",
    checkpoints: [
      "Thank the person.",
      "Say clearly yes or no.",
      "Give one reason if declining.",
      "Ask one practical question if needed.",
      "Use a closing formula.",
    ],
    scenarios: [
      {
        title: "Accept an invitation",
        setup: "A neighbour invites Pierre to a grill evening.",
        task: "Accept, thank them, ask what he should bring.",
      },
      {
        title: "Decline politely",
        setup: "A colleague invites Pierre but he has another appointment.",
        task: "Decline, explain briefly, and wish them a nice evening.",
      },
    ],
    miniCourse: {
      goal: "Produce a warm, short answer with a clear yes/no.",
      steps: [
        "Memorise Danke für die Einladung.",
        "Practise one accept and one decline version.",
        "Check that the answer matches the invitation.",
      ],
      success: [
        "The answer is polite and unambiguous.",
        "Pierre does not forget the closing line.",
      ],
    },
    teacherAgent: "Train both accept and decline as transfer practice; do not present this as a confirmed KDE task type.",
    studentAgent: "I need two templates because saying no politely is harder.",
  },
  "appointment-change": {
    examBrief: "A2 practice pattern: cancel or move an appointment, apologise, explain briefly, propose a new time.",
    lessonGoal: "Write a complete appointment-change message with closing formula.",
    checkpoints: [
      "Appointment is named.",
      "Cancellation or change is clear.",
      "Short reason is included.",
      "New date/time or request for new appointment is included.",
      "Closing formula is present.",
    ],
    scenarios: [
      {
        title: "Doctor appointment",
        setup: "Pierre cannot come to the doctor on Tuesday.",
        task: "Cancel, apologise and ask for a new appointment next week.",
      },
      {
        title: "Gemeinde appointment",
        setup: "Pierre must move an administrative appointment.",
        task: "Give old date, reason, and two possible new times.",
      },
    ],
    miniCourse: {
      goal: "Control appointment verbs: absagen, verschieben, vereinbaren.",
      steps: [
        "Write the old appointment in one sentence.",
        "Add reason with weil and check verb-final order.",
        "Offer two concrete alternatives.",
      ],
      success: [
        "The reader knows which appointment changes.",
        "The message ends politely and completely.",
      ],
    },
    teacherAgent: "The main risk is forgetting the closing formula; make Pierre check it every time.",
    studentAgent: "The old appointment plus new option structure keeps the text organised.",
  },
  "information-request": {
    examBrief: "A2 practice pattern: ask for information about opening hours, forms, prices, dates or registration.",
    lessonGoal: "Ask three clear questions without overcomplicating grammar.",
    checkpoints: [
      "Purpose is stated.",
      "At least two concrete questions are included.",
      "Questions cover key facts: when, where, price, documents.",
      "Polite formula is used.",
      "Closing formula is present.",
    ],
    scenarios: [
      {
        title: "Ask the Gemeinde",
        setup: "Pierre needs a form but does not know opening hours.",
        task: "Ask for opening hours, required documents and whether an appointment is needed.",
      },
      {
        title: "Ask a course provider",
        setup: "Pierre wants information about a language course.",
        task: "Ask about start date, price, location and registration.",
      },
    ],
    miniCourse: {
      goal: "Build simple, useful questions with können / wann / wo / wie viel.",
      steps: [
        "Choose three facts that are missing.",
        "Write each as one direct question.",
        "Add one polite opening and one closing.",
      ],
      success: [
        "The recipient can answer the request without guessing.",
        "The message stays inside the word limit.",
      ],
    },
    teacherAgent: "Do not let Pierre write vague requests; every question needs a target fact.",
    studentAgent: "Question words make this easy if I choose the missing facts first.",
  },
  "apology-explanation": {
    examBrief: "A2 practice pattern: apologise, explain what happened, say what you need or will do next.",
    lessonGoal: "Write a calm explanation with one reason and one next action.",
    checkpoints: [
      "Apology appears early.",
      "Problem is described simply.",
      "Reason uses weil or denn correctly.",
      "Next action is concrete.",
      "Tone stays polite.",
    ],
    scenarios: [
      {
        title: "Late delivery",
        setup: "Pierre cannot deliver or return something on time.",
        task: "Apologise, explain, and propose a new date.",
      },
      {
        title: "Missed appointment",
        setup: "Pierre missed an appointment because he was sick.",
        task: "Apologise, explain briefly, and ask for a new appointment.",
      },
    ],
    miniCourse: {
      goal: "Use a predictable apology pattern under time pressure.",
      steps: [
        "Start with Es tut mir leid.",
        "Explain in one sentence only.",
        "End with the next step, not another apology.",
      ],
      success: [
        "The text solves the practical problem.",
        "The weil-clause has verb-final order.",
      ],
    },
    teacherAgent: "Correct tone and word order, but keep the text short.",
    studentAgent: "I need permission to write simply; long explanations create mistakes.",
  },
  "neighbour-message": {
    examBrief: "A2 practice pattern: practical, polite, concrete housing messages about noise, repair or shared spaces.",
    lessonGoal: "Write a housing message using polite request language.",
    checkpoints: [
      "Neighbour or building context is clear.",
      "Problem is concrete.",
      "Request is polite.",
      "Reason is short.",
      "Closing formula is present.",
    ],
    scenarios: [
      {
        title: "Noise reply",
        setup: "A neighbour complained about noise.",
        task: "Apologise, explain and promise what Pierre will do differently.",
      },
      {
        title: "Laundry room",
        setup: "The laundry room booking is unclear.",
        task: "Ask politely about the correct time and rule.",
      },
    ],
    miniCourse: {
      goal: "Write housing messages without sounding too direct.",
      steps: [
        "Use leider and könnten to soften requests.",
        "State the problem in one sentence.",
        "Add one clear request or promise.",
      ],
      success: [
        "The message is polite but still clear.",
        "Weil word order is correct when giving a reason.",
      ],
    },
    teacherAgent: "This item should stay needs-review until the weil mistake disappears twice in a row.",
    studentAgent: "The polite words make me less afraid of sounding rude.",
  },
};

export const speakingItemCourses: Record<string, SkillCourseContent> = {
  "self-introduction": {
    examBrief: "B1 oral practice: introduce yourself clearly, naturally and long enough to give examiners stable material.",
    lessonGoal: "Reach a complete 2-minute self-introduction with a clean final sentence.",
    checkpoints: [
      "Name, origin and residence are covered.",
      "Family or personal context is mentioned.",
      "Work is described with tasks.",
      "Free time includes one opinion.",
      "There is a closing sentence.",
    ],
    scenarios: [
      {
        title: "Clean run",
        setup: "The examiner asks Pierre to introduce himself.",
        task: "Speak for two minutes, then stop with a clear closing line.",
      },
      {
        title: "Interrupted run",
        setup: "The examiner interrupts with one follow-up question.",
        task: "Answer and return to the structure without starting over.",
      },
    ],
    miniCourse: {
      goal: "Move from memorised script to controlled spoken performance.",
      steps: [
        "Practise the five blocks: name, home, family, work, leisure.",
        "Add one weil sentence in work and one in leisure.",
        "Record and time the answer twice.",
      ],
      success: [
        "Pierre reaches 2 minutes.",
        "Pierre can recover after a follow-up question.",
      ],
    },
    teacherAgent: "Ask one small interruption; the exam will not protect the script.",
    studentAgent: "I need the ending most because otherwise I just fade out.",
  },
  "picture-card": {
    examBrief: "B1 oral practice: choose one picture, explain why, describe visible facts, comment on mood/effect, connect it to personal life, give an opinion and answer follow-ups.",
    lessonGoal: "Complete a structured picture description without running short or switching language.",
    checkpoints: [
      "Picture choice is explained with weil.",
      "Describe visible facts first.",
      "Use position words: im Vordergrund, im Hintergrund, links, rechts, in der Mitte.",
      "Connect to Pierre's own life.",
      "Give an opinion.",
      "Give one example.",
      "Say why it matters in Switzerland.",
    ],
    scenarios: [
      {
        title: "Phone picture from Denajder",
        setup: "The picture shows two teenagers sitting outside and looking at their phones.",
        task: "Choose the picture, describe people/clothes/background, add one observation about the statue, then give an opinion on smartphone use.",
      },
      {
        title: "Leisure picture",
        setup: "The card shows a club or local event.",
        task: "Use the six-step structure and speak for the full time.",
      },
    ],
    miniCourse: {
      goal: "Turn a picture into a structured B1 answer.",
      steps: [
        "Choose the image: Ich habe dieses Bild gewählt, weil ...",
        "Start with Auf dem Bild sehe ich.",
        "Move through position words: in der Mitte, rechts, links, im Hintergrund.",
        "Add Bei mir ist es so, dass.",
        "Force an opinion with Ich finde das wichtig, weil.",
      ],
      success: [
        "Pierre describes the image for several connected sentences without vocabulary rescue.",
        "The answer reaches opinion and example before time runs out.",
      ],
    },
    teacherAgent: "The July 6 phone-picture attempt reached visible description with support; next time require choice, positions, opinion and one follow-up without English/French.",
    studentAgent: "The position map helps because I can move around the picture instead of guessing what to say next.",
  },
  "follow-up-questions": {
    examBrief: "B1 oral practice: answer follow-ups, ask for repetition, repair confusion and stay communicative.",
    lessonGoal: "Answer improvised questions without freezing or switching language.",
    checkpoints: [
      "Pierre asks for repetition when needed.",
      "Pierre buys thinking time politely.",
      "Pierre gives at least one reason.",
      "Pierre asks clarification instead of guessing silently.",
      "Pierre stays in German.",
    ],
    scenarios: [
      {
        title: "Rapid follow-up round",
        setup: "Teacher asks six short questions from different domains.",
        task: "Answer each in 2-3 sentences and use a repair phrase at least once.",
      },
      {
        title: "Misunderstood question",
        setup: "The examiner asks something Pierre does not fully understand.",
        task: "Ask for repetition and answer the part he understood.",
      },
    ],
    miniCourse: {
      goal: "Make repair language a strength, not a panic signal.",
      steps: [
        "Memorise four repair phrases.",
        "Practise answering with Ich glaube... when unsure.",
        "Run one mixed-domain follow-up drill.",
      ],
      success: [
        "Pierre uses repair phrases naturally.",
        "Pierre answers with partial information instead of stopping.",
      ],
    },
    teacherAgent: "Do not over-script this; the value is controlled improvisation.",
    studentAgent: "It helps to know that asking for repetition is allowed and useful.",
  },
};

export interface ExamFormatTask {
  id: string;
  label: string;
  status: Status;
  mode: "reading" | "listening";
  level: string;
  examBrief: string;
  nextDrill: string;
  mistakes: string[];
  checkpoints: string[];
  scenarios: CourseScenario[];
  miniCourse: MiniCourse;
  teacherAgent: string;
  studentAgent: string;
}

export const examFormatTasks: ExamFormatTask[] = [
  {
    id: "notice-key-facts",
    label: "Read notices for key facts",
    status: "needs_review",
    mode: "reading",
    level: "A2",
    examBrief: "Reading task: extract date, time, place, deadline and required action from notices, programmes or letters.",
    nextDrill: "Repeat a new notice or shop-service text under time pressure: answer date, place, organiser, action and deadline without vocabulary rescue.",
    mistakes: [
      "Misses registration deadlines when the text is dense",
      "Needs vocabulary support for common notice words such as außerhalb, Verein, Anzeige and Wettbewerb",
      "Not yet timed; tends to translate instead of scanning only key facts",
      "Completed one supported shop-service reading cleanly; still needs a timed repeat without vocabulary rescue",
    ],
    checkpoints: ["who", "what", "where", "when", "deadline", "required document"],
    scenarios: [
      {
        title: "Gemeinde notice",
        setup: "A notice announces changed opening hours.",
        task: "Find date, office, reason and what residents must do.",
      },
      {
        title: "Event programme",
        setup: "A local event programme lists several times and rooms.",
        task: "Select the right event and answer date, time and registration.",
      },
    ],
    miniCourse: {
      goal: "Read for action, not translation.",
      steps: [
        "Scan numbers, dates and names first.",
        "Underline only facts linked to the question.",
        "Answer in short German phrases.",
      ],
      success: [
        "Pierre finds the correct deadline.",
        "Pierre ignores irrelevant detail without losing confidence.",
      ],
    },
    teacherAgent: "Use a timer; reading must become selective.",
    studentAgent: "I need questions before reading, otherwise I try to translate everything.",
  },
  {
    id: "voicemail-key-facts",
    label: "Listen to voicemails",
    status: "needs_review",
    mode: "listening",
    level: "B1",
    examBrief: "Listening task: extract caller, topic, number, date, time and requested action from short everyday audio.",
    nextDrill: "Three image-free Swiss German mini-tests: two scene descriptions and one voicemail. Fill who, where, what, action, time/date or number before transcript help.",
    mistakes: [
      "Misses numbers and times in fast speech",
      "Swiss German clips feel overwhelming",
      "Confuses phrase boundaries around dates, e.g. 'Ziit am 9' can sound like 19",
      "Grouped phone numbers such as 044 737 10 82 still need repetition",
    ],
    checkpoints: ["caller", "topic", "date", "time", "number", "action"],
    scenarios: [
      {
        title: "Doctor voicemail",
        setup: "The practice moves Pierre's appointment.",
        task: "Write old time, new time and whether he must call back.",
      },
      {
        title: "Transport message",
        setup: "A message mentions delay and platform change.",
        task: "Extract delay, platform and departure time.",
      },
    ],
    miniCourse: {
      goal: "Catch the useful facts even when full comprehension fails.",
      steps: [
        "Listen once only for numbers.",
        "Listen again for the requested action.",
        "Compare notes with the transcript and mark missed sound patterns.",
      ],
      success: [
        "Pierre captures at least four fields from a six-field note.",
        "Pierre can repeat a number or time accurately.",
      ],
    },
    teacherAgent: "Do not replay too early; first train tolerance for incomplete comprehension.",
    studentAgent: "The six-field note gives me a target and lowers panic.",
  },
  {
    id: "forms-and-letters",
    label: "Read forms and letters",
    status: "not_covered",
    mode: "reading",
    level: "A2",
    examBrief: "Reading task: understand what a short official letter or form asks Pierre to provide.",
    nextDrill: "Read one simple form and identify required fields, documents and deadline.",
    mistakes: [],
    checkpoints: ["sender", "required action", "documents", "deadline", "contact"],
    scenarios: [
      {
        title: "Insurance letter",
        setup: "A short letter asks for missing information.",
        task: "Find what is missing, where to send it and by when.",
      },
      {
        title: "Registration form",
        setup: "A form asks for personal details and attachments.",
        task: "Identify required fields and optional fields.",
      },
    ],
    miniCourse: {
      goal: "Make official letters less intimidating.",
      steps: [
        "Identify sender and subject line.",
        "Circle modal verbs: müssen, sollen, können.",
        "Write the next action in one sentence.",
      ],
      success: [
        "Pierre can say what he must send or do.",
        "Pierre can find a contact route for questions.",
      ],
    },
    teacherAgent: "Use authentic layout if possible; forms are visual tasks.",
    studentAgent: "Sender, action and deadline are enough for a first pass.",
  },
];

export const transcriptAgentOutputs = [
  "lesson summary in 5 lines",
  "domains practised and evidence from the transcript",
  "writing, speaking, reading or listening competencies seen",
  "competencies validated, started, needs_review, or not enough evidence",
  "new vocabulary, useful verbs and grammar",
  "Pierre's recurring errors with correction examples",
  "updates to apply in src/data/progress.ts",
  "next lesson plan for the relevant teacher",
];
