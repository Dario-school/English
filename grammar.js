/**
 * ============================================================
 *  GRAMMATIK-DATEN
 * ============================================================
 *  So fügst du neue Grammatikthemen hinzu:
 *
 *  1. Füge ein neues Objekt in GRAMMAR_TOPICS ein (z.B. für Past Simple).
 *  2. Jedes Thema hat:
 *     - id:          einmaliger Bezeichner (z.B. "past_simple")
 *     - title:       Anzeigename (z.B. "Past Simple")
 *     - description: Kurze Erklärung des Themas
 *     - rule:        Grammatikregel als Text (wird im Trainer angezeigt)
 *     - exercises:   Array mit Aufgaben (Lückentexte)
 *
 *  AUFGABEN-FORMAT (type: "fill"):
 *  {
 *    sentence: "She ___ her homework.",   ← ___ wird zur Eingabe-Box
 *    answer: "has done",                  ← korrekte Antwort (Gross-/Kleinschreibung egal)
 *    hint: "Present Perfect, she → has"  ← optionaler Tipp bei Fehler
 *  }
 *
 *  AUFGABEN-FORMAT (type: "choice"):
 *  {
 *    sentence: "They ___ already left.",
 *    options: ["have", "has", "had", "are"],
 *    answer: "have",
 *    hint: "Plural subject → have"
 *  }
 * ============================================================
 */

const GRAMMAR_TOPICS = [

  // ── PRESENT PERFECT ─────────────────────────────────────────
  {
    id: "present_perfect",
    title: "Present Perfect",
    description: "Handlungen, die in der Vergangenheit stattgefunden haben und Bezug zur Gegenwart haben.",
    rule: `
      <strong>Bildung:</strong> have / has + Past Participle (3. Verbform)<br><br>
      <strong>I / you / we / they</strong> → <em>have</em> + PP &nbsp;&nbsp; Beispiel: I <em>have seen</em> it.<br>
      <strong>he / she / it</strong> → <em>has</em> + PP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Beispiel: She <em>has been</em> there.<br><br>
      <strong>Signalwörter:</strong> already, just, yet, ever, never, since, for, recently
    `,
    exercises: [
      // ── Lückentexte (fill) ───
      {
        type: "fill",
        sentence: "She ___ already finished her homework.",
        answer: "has",
        hint: "Subjekt: she (3. Person Einzahl) → has"
      },
      {
        type: "fill",
        sentence: "They ___ never been to New York.",
        answer: "have",
        hint: "Subjekt: they (Plural) → have"
      },
      {
        type: "fill",
        sentence: "I ___ just eaten lunch.",
        answer: "have",
        hint: "Subjekt: I → have"
      },
      {
        type: "fill",
        sentence: "He ___ lived here for ten years.",
        answer: "has",
        hint: "Subjekt: he (3. Person Einzahl) → has"
      },
      {
        type: "fill",
        sentence: "We ___ already visited the Statue of Liberty.",
        answer: "have",
        hint: "Subjekt: we (Plural) → have"
      },
      {
        type: "fill",
        sentence: "It ___ been raining all day.",
        answer: "has",
        hint: "Subjekt: it (3. Person Einzahl) → has"
      },
      // ── Multiple Choice ──────
      {
        type: "choice",
        sentence: "The tourists ___ just arrived at the hotel.",
        options: ["have", "has", "had", "are"],
        answer: "have",
        hint: "'the tourists' = Plural → have"
      },
      {
        type: "choice",
        sentence: "Maria ___ never ridden the subway before.",
        options: ["have", "has", "had", "is"],
        answer: "has",
        hint: "'Maria' = 3. Person Einzahl → has"
      },
      {
        type: "choice",
        sentence: "___ you ever seen the Empire State Building?",
        options: ["Have", "Has", "Had", "Did"],
        answer: "Have",
        hint: "Fragesatz mit 'you' → Have"
      },
      {
        type: "choice",
        sentence: "He ___ already downloaded the app.",
        options: ["have", "has", "had", "is"],
        answer: "has",
        hint: "'He' = 3. Person Einzahl → has"
      },
      {
        type: "fill",
        sentence: "The children ___ eaten all the sandwiches from the deli.",
        answer: "have",
        hint: "Subjekt: the children (Plural) → have"
      },
      {
        type: "fill",
        sentence: "My uncle ___ been to the theatre three times this year.",
        answer: "has",
        hint: "Subjekt: my uncle (3. Person Einzahl) → has"
      },
      {
        type: "choice",
        sentence: "You ___ grown a lot since I last saw you.",
        options: ["have", "has", "had", "were"],
        answer: "have",
        hint: "'You' → have"
      },
      {
        type: "fill",
        sentence: "The government ___ not yet decided on a new law.",
        answer: "has",
        hint: "Subjekt: the government (Einzahl) → has"
      },
      {
        type: "fill",
        sentence: "I ___ lost track of time while walking down Fifth Avenue.",
        answer: "have",
        hint: "Subjekt: I → have"
      },
    ]
  },

  // ── PAST SIMPLE ─────────────────────────────────────────────
  // TODO: Fülle dieses Thema mit eigenen Aufgaben.
  {
    id: "past_simple",
    title: "Past Simple",
    description: "Abgeschlossene Handlungen in der Vergangenheit.",
    rule: `
      <strong>Bildung (regelmässig):</strong> Verb + -ed &nbsp;&nbsp; Beispiel: walk → <em>walked</em><br>
      <strong>Bildung (unregelmässig):</strong> 2. Verbform &nbsp; Beispiel: go → <em>went</em><br><br>
      <strong>Verneinung:</strong> did not (didn't) + Infinitiv<br>
      <strong>Frage:</strong> Did + Subjekt + Infinitiv?<br><br>
      <strong>Signalwörter:</strong> yesterday, last week, in 2020, ago
    `,
    exercises: [
      {
        type: "fill",
        sentence: "She ___ (walk) to school yesterday.",
        answer: "walked",
        hint: "Regelmässiges Verb: walk + -ed"
      },
      {
        type: "fill",
        sentence: "They ___ (go) to the cinema last night.",
        answer: "went",
        hint: "Unregelmässiges Verb: go → went"
      },
      {
        type: "choice",
        sentence: "___ you see the famous sights of the city?",
        options: ["Did", "Does", "Have", "Was"],
        answer: "Did",
        hint: "Past Simple Frage → Did + Infinitiv"
      },
      {
        type: "fill",
        sentence: "He ___ (not know) the address.",
        answer: "didn't know",
        hint: "Verneinung: didn't + Infinitiv"
      },
    ]
  },

  // ── IF-CLAUSES (Typ I) ───────────────────────────────────────
  // TODO: Fülle dieses Thema mit eigenen Aufgaben.
  {
    id: "if_clauses_1",
    title: "If-Clauses (Typ I)",
    description: "Reale Bedingungen und ihre wahrscheinlichen Folgen.",
    rule: `
      <strong>Bildung:</strong> If + Present Simple, will + Infinitiv<br><br>
      Beispiel: If it <em>rains</em>, we <em>will stay</em> at home.<br><br>
      <strong>Wichtig:</strong> Im If-Satz steht <em>kein</em> will!
    `,
    exercises: [
      {
        type: "fill",
        sentence: "If she studies hard, she ___ (pass) the exam.",
        answer: "will pass",
        hint: "Hauptsatz: will + Infinitiv"
      },
      {
        type: "choice",
        sentence: "If you ___ on time, we can catch the subway.",
        options: ["arrive", "will arrive", "arrived", "arrives"],
        answer: "arrive",
        hint: "Im If-Satz: Present Simple (kein will!)"
      },
    ]
  },

];
