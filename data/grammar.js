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

  // ── PRESENT PERFECT – TEIL 1: have / has ────────────────────
  // Fokus: Hilfsverb richtig wählen (have vs. has)
  {
    id: "present_perfect_have_has",
    title: "Present Perfect – have / has",
    description: "Übe, wann du 'have' und wann du 'has' brauchst.",
    rule: `
      <strong>Bildung:</strong> <em>have</em> oder <em>has</em> + Past Participle (3. Verbform)<br><br>
      <table style="width:100%;border-collapse:collapse;font-size:.9em;margin-top:6px;">
        <tr><td style="padding:4px 8px 4px 0;font-weight:700;">I / you / we / they</td><td><em>have</em> worked</td></tr>
        <tr style="background:rgba(0,0,0,.03)"><td style="padding:4px 8px 4px 0;font-weight:700;">he / she / it</td><td><em>has</em> worked</td></tr>
      </table><br>
      <strong>Kurzformen:</strong> I've · you've · we've · they've &nbsp;|&nbsp; he's · she's · it's
    `,
    exercises: [
      { type: "fill",   sentence: "She ___ already finished her homework.",          answer: "has",  hint: "she → has" },
      { type: "fill",   sentence: "They ___ never been to New York.",                answer: "have", hint: "they → have" },
      { type: "fill",   sentence: "I ___ just eaten lunch.",                         answer: "have", hint: "I → have" },
      { type: "fill",   sentence: "He ___ lived here for ten years.",                answer: "has",  hint: "he → has" },
      { type: "fill",   sentence: "We ___ already visited the Statue of Liberty.",   answer: "have", hint: "we → have" },
      { type: "fill",   sentence: "It ___ been raining all day.",                    answer: "has",  hint: "it → has" },
      { type: "fill",   sentence: "My uncle ___ been to the theatre three times.",   answer: "has",  hint: "my uncle = er → has" },
      { type: "fill",   sentence: "The children ___ eaten all the sandwiches.",      answer: "have", hint: "the children = sie (Plural) → have" },
      { type: "fill",   sentence: "The government ___ not yet decided on a new law.",answer: "has",  hint: "the government = es → has" },
      { type: "fill",   sentence: "You ___ grown a lot since I last saw you.",       answer: "have", hint: "you → have" },
      { type: "choice", sentence: "The tourists ___ just arrived at the hotel.",     options: ["have","has","had","are"],      answer: "have", hint: "'the tourists' = Plural → have" },
      { type: "choice", sentence: "Maria ___ never ridden the subway before.",       options: ["have","has","had","is"],       answer: "has",  hint: "Maria = sie → has" },
      { type: "choice", sentence: "___ you ever seen the Empire State Building?",   options: ["Have","Has","Had","Did"],      answer: "Have", hint: "Fragesatz mit 'you' → Have" },
      { type: "choice", sentence: "He ___ already downloaded the app.",              options: ["have","has","had","is"],       answer: "has",  hint: "he → has" },
      { type: "choice", sentence: "My parents ___ never tried sushi.",               options: ["have","has","had","are"],      answer: "have", hint: "my parents = Plural → have" },
      { type: "choice", sentence: "___ she ever flown in a plane before?",           options: ["Has","Have","Had","Is"],       answer: "Has",  hint: "she → Has (Fragesatz)" },
      { type: "fill",   sentence: "Nobody ___ seen him today.",                      answer: "has",  hint: "nobody = 3. Person Einzahl → has" },
      { type: "fill",   sentence: "Both of us ___ finished the book.",               answer: "have", hint: "both of us = Plural → have" },
    ]
  },

  // ── PRESENT PERFECT – TEIL 2: Past Participle bilden ────────
  // Fokus: regelmässige & unregelmässige Verbformen
  {
    id: "present_perfect_participle",
    title: "Present Perfect – Past Participle",
    description: "Bilde die korrekte 3. Verbform – regelmässig und unregelmässig.",
    rule: `
      <strong>Regelmässig:</strong> Infinitiv + <em>-ed</em><br>
      <span style="font-size:.88em;color:#7A6A54">work → worked &nbsp;·&nbsp; play → played &nbsp;·&nbsp; finish → finished</span><br><br>
      <strong>Unregelmässig:</strong> eigene 3. Form auswendig lernen<br>
      <span style="font-size:.88em;color:#7A6A54">go → gone &nbsp;·&nbsp; do → done &nbsp;·&nbsp; see → seen &nbsp;·&nbsp; write → written<br>
      eat → eaten &nbsp;·&nbsp; take → taken &nbsp;·&nbsp; break → broken &nbsp;·&nbsp; lose → lost<br>
      know → known &nbsp;·&nbsp; give → given &nbsp;·&nbsp; fly → flown &nbsp;·&nbsp; be → been</span>
    `,
    exercises: [
      // Regelmässig
      { type: "fill", sentence: "I have ___ (work) here for five years.",          answer: "worked",   hint: "work → worked (regelmässig: +ed)" },
      { type: "fill", sentence: "She has ___ (finish) her homework.",              answer: "finished",  hint: "finish → finished (regelmässig)" },
      { type: "fill", sentence: "They have ___ (play) three matches this week.",   answer: "played",    hint: "play → played (regelmässig)" },
      { type: "fill", sentence: "He has ___ (start) a new job.",                   answer: "started",   hint: "start → started (regelmässig)" },
      { type: "fill", sentence: "We have ___ (visit) Paris several times.",        answer: "visited",   hint: "visit → visited (regelmässig)" },
      // Unregelmässig
      { type: "fill", sentence: "She has ___ (go) to the market.",                 answer: "gone",      hint: "go → gone (unregelmässig)" },
      { type: "fill", sentence: "I have ___ (eat) already.",                       answer: "eaten",     hint: "eat → eaten (unregelmässig)" },
      { type: "fill", sentence: "Have you ever ___ (be) to Scotland?",             answer: "been",      hint: "be → been (unregelmässig)" },
      { type: "fill", sentence: "He has ___ (do) his homework.",                   answer: "done",      hint: "do → done (unregelmässig)" },
      { type: "fill", sentence: "I have ___ (write) three emails today.",          answer: "written",   hint: "write → written (unregelmässig)" },
      { type: "fill", sentence: "She has ___ (break) her leg.",                    answer: "broken",    hint: "break → broken (unregelmässig)" },
      { type: "fill", sentence: "We have ___ (lose) the match.",                   answer: "lost",      hint: "lose → lost (unregelmässig)" },
      { type: "fill", sentence: "I have ___ (know) him for ten years.",            answer: "known",     hint: "know → known (unregelmässig)" },
      { type: "fill", sentence: "She has never ___ (fly) in a plane.",             answer: "flown",     hint: "fly → flown (unregelmässig)" },
      { type: "fill", sentence: "They have ___ (see) that film three times.",      answer: "seen",      hint: "see → seen (unregelmässig)" },
      { type: "fill", sentence: "He has ___ (take) the subway to work.",           answer: "taken",     hint: "take → taken (unregelmässig)" },
      { type: "choice", sentence: "I have ___ two cups of tea today.",             options: ["drank","drunk","drink","drinked"],  answer: "drunk",  hint: "drink → drunk (unregelmässig)" },
      { type: "choice", sentence: "She has ___ all the good advice.",              options: ["gived","give","gave","given"],       answer: "given",  hint: "give → given (unregelmässig)" },
    ]
  },

  // ── PRESENT PERFECT – TEIL 3: Verneinung & Fragen ───────────
  {
    id: "present_perfect_neg_questions",
    title: "Present Perfect – Verneinung & Fragen",
    description: "Bilde Verneinungen mit haven't / hasn't und Fragen mit Have / Has.",
    rule: `
      <strong>Verneinung:</strong> Subject + <em>have not (haven't)</em> / <em>has not (hasn't)</em> + Past Participle<br>
      <span style="font-size:.88em;color:#7A6A54">I <em>haven't seen</em> him today. &nbsp;·&nbsp; She <em>hasn't done</em> it.</span><br><br>
      <strong>Ja/Nein-Fragen:</strong> <em>Have/Has</em> + Subject + Past Participle?<br>
      <span style="font-size:.88em;color:#7A6A54"><em>Have</em> you finished? &nbsp;·&nbsp; <em>Has</em> she seen this film?</span><br><br>
      <strong>W-Fragen:</strong> Fragewort + <em>have/has</em> + Subject + Past Participle?<br>
      <span style="font-size:.88em;color:#7A6A54"><em>Where have</em> you been? &nbsp;·&nbsp; <em>How long has</em> he lived here?</span>
    `,
    exercises: [
      { type: "fill",   sentence: "I ___ not seen him today. (have/has)",           answer: "have",    hint: "I → have not (haven't)" },
      { type: "fill",   sentence: "She ___ not finished yet. (have/has)",           answer: "has",     hint: "she → has not (hasn't)" },
      { type: "fill",   sentence: "___ you ever been to New York? (Have/Has)",      answer: "Have",    hint: "Fragesatz mit 'you' → Have" },
      { type: "fill",   sentence: "___ he finished his homework? (Have/Has)",       answer: "Has",     hint: "Fragesatz mit 'he' → Has" },
      { type: "fill",   sentence: "They ___ not visited us yet. (have/has)",        answer: "have",    hint: "they → have not (haven't)" },
      { type: "choice", sentence: "She ___ not eaten anything since morning.",      options: ["have","has","had","is"],           answer: "has",   hint: "she → has not" },
      { type: "choice", sentence: "___ your parents ever tried Indian food?",       options: ["Has","Have","Had","Did"],          answer: "Have",  hint: "your parents = Plural → Have" },
      { type: "choice", sentence: "I ___ not heard that song before.",              options: ["have","has","had","am"],           answer: "have",  hint: "I → have not" },
      { type: "fill",   sentence: "Where ___ you been all day? (have/has)",         answer: "have",    hint: "W-Frage mit 'you' → have" },
      { type: "fill",   sentence: "How long ___ she lived in London? (have/has)",   answer: "has",     hint: "W-Frage mit 'she' → has" },
      { type: "choice", sentence: "___ nobody told you the news?",                  options: ["Has","Have","Had","Did"],          answer: "Has",   hint: "nobody = 3. Person Einzahl → Has" },
      { type: "fill",   sentence: "We ___ not had much homework so far this year.", answer: "have",    hint: "we → have not (haven't)" },
    ]
  },

  // ── PRESENT PERFECT – TEIL 4: Signalwörter ──────────────────
  // Fokus: ever / never / just / already / yet / recently / so far
  {
    id: "present_perfect_signals",
    title: "Present Perfect – Signalwörter",
    description: "Wähle das passende Signalwort: ever, never, just, already, yet, since, for, so far, recently.",
    rule: `
      <strong>ever</strong> – jemals (Fragen): Have you <em>ever</em> been to Rome?<br>
      <strong>never</strong> – nie: She has <em>never</em> tried sushi.<br>
      <strong>just</strong> – gerade eben: I have <em>just</em> arrived.<br>
      <strong>already</strong> – schon (früher als erwartet): They have <em>already</em> done it.<br>
      <strong>yet</strong> – noch nicht (Verneinung) / schon? (Frage): I haven't finished <em>yet</em>. / Have you finished <em>yet</em>?<br>
      <strong>since</strong> – seit (Startpunkt): She has lived here <em>since</em> 2018.<br>
      <strong>for</strong> – seit (Zeitraum): We have known each other <em>for</em> years.<br>
      <strong>so far / recently / lately</strong> – bis jetzt / kürzlich / in letzter Zeit
    `,
    exercises: [
      { type: "choice", sentence: "Have you ___ been to Scotland?",                  options: ["ever","never","just","already"],          answer: "ever",     hint: "Frage nach Erfahrung → ever" },
      { type: "choice", sentence: "I have ___ tried sushi – it doesn't interest me.", options: ["ever","never","just","already"],          answer: "never",    hint: "nie → never" },
      { type: "choice", sentence: "She has ___ arrived – she's at the door now.",    options: ["just","already","yet","never"],            answer: "just",     hint: "gerade eben → just" },
      { type: "choice", sentence: "They have ___ done their homework. (early!)",      options: ["already","yet","just","never"],            answer: "already",  hint: "schon, früher als erwartet → already" },
      { type: "choice", sentence: "I haven't finished the book ___.",                 options: ["yet","already","just","ever"],             answer: "yet",      hint: "noch nicht → yet (Verneinung)" },
      { type: "choice", sentence: "Have you finished packing ___?",                   options: ["yet","already","just","never"],            answer: "yet",      hint: "schon? (Frage) → yet" },
      { type: "choice", sentence: "She has lived in London ___ 2015.",                options: ["since","for","just","already"],            answer: "since",    hint: "Startpunkt (Jahr) → since" },
      { type: "choice", sentence: "We have known each other ___ ten years.",          options: ["since","for","just","yet"],                answer: "for",      hint: "Zeitraum (10 years) → for" },
      { type: "choice", sentence: "I have drunk two coffees ___.",                    options: ["so far","yesterday","last week","ago"],    answer: "so far",   hint: "bis jetzt → so far" },
      { type: "choice", sentence: "He has ___ been very busy – lots of new projects.", options: ["recently","yesterday","ago","last week"],  answer: "recently", hint: "in letzter Zeit → recently" },
      { type: "fill",   sentence: "Have you ___ eaten octopus? (ever/never)",         answer: "ever",    hint: "Frage nach Erfahrung → ever" },
      { type: "fill",   sentence: "I haven't seen that film ___. (yet/already)",      answer: "yet",     hint: "Verneinung + noch nicht → yet" },
      { type: "fill",   sentence: "She has worked here ___ three years. (since/for)", answer: "for",     hint: "Zeitraum: three years → for" },
      { type: "fill",   sentence: "I have ___ finished – we can go! (just/yet)",      answer: "just",    hint: "gerade eben fertig → just" },
      { type: "fill",   sentence: "We haven't had any problems ___ this year. (so far/since)", answer: "so far", hint: "bis jetzt → so far" },
    ]
  },

  // ── PRESENT PERFECT – TEIL 5: since vs. for ─────────────────
  {
    id: "present_perfect_since_for",
    title: "Present Perfect – since / for",
    description: "Entscheide: braucht der Satz 'since' (Startpunkt) oder 'for' (Zeitraum)?",
    rule: `
      <strong>since</strong> → <em>Startpunkt</em> (Datum, Uhrzeit, Ereignis)<br>
      <span style="font-size:.88em;color:#7A6A54">since 2010 &nbsp;·&nbsp; since Monday &nbsp;·&nbsp; since I was a child &nbsp;·&nbsp; since Christmas</span><br><br>
      <strong>for</strong> → <em>Zeitraum / Dauer</em><br>
      <span style="font-size:.88em;color:#7A6A54">for two years &nbsp;·&nbsp; for a long time &nbsp;·&nbsp; for months &nbsp;·&nbsp; for ages</span><br><br>
      <strong>Trick:</strong> Kannst du „lang" dahinterstellen? → <em>for</em>. Ist es ein Punkt auf dem Zeitstrahl? → <em>since</em>.
    `,
    exercises: [
      { type: "choice", sentence: "She has lived here ___ 2015.",             options: ["since","for"],  answer: "since", hint: "2015 = Startpunkt → since" },
      { type: "choice", sentence: "I have known him ___ ten years.",          options: ["since","for"],  answer: "for",   hint: "ten years = Zeitraum → for" },
      { type: "choice", sentence: "They have been friends ___ school.",       options: ["since","for"],  answer: "since", hint: "school = Ereignis/Startpunkt → since" },
      { type: "choice", sentence: "He has worked at the bank ___ a long time.",options: ["since","for"],  answer: "for",   hint: "a long time = Dauer → for" },
      { type: "choice", sentence: "We haven't spoken ___ last Monday.",       options: ["since","for"],  answer: "since", hint: "last Monday = Startpunkt → since" },
      { type: "choice", sentence: "I have been waiting ___ two hours.",       options: ["since","for"],  answer: "for",   hint: "two hours = Zeitraum → for" },
      { type: "choice", sentence: "She hasn't eaten ___ this morning.",       options: ["since","for"],  answer: "since", hint: "this morning = Startpunkt → since" },
      { type: "choice", sentence: "They have lived in New York ___ ages.",    options: ["since","for"],  answer: "for",   hint: "ages = Zeitraum → for" },
      { type: "fill",   sentence: "I have worked here ___ January.",          answer: "since",  hint: "January = Monatsname (Startpunkt) → since" },
      { type: "fill",   sentence: "She has had that job ___ six months.",     answer: "for",    hint: "six months = Zeitraum → for" },
      { type: "fill",   sentence: "He has been ill ___ last Thursday.",       answer: "since",  hint: "last Thursday = Startpunkt → since" },
      { type: "fill",   sentence: "We haven't seen each other ___ years.",    answer: "for",    hint: "years = Zeitraum → for" },
    ]
  },

  // ── PRESENT PERFECT – TEIL 6: PP vs. Simple Past ────────────
  {
    id: "present_perfect_vs_past",
    title: "Present Perfect vs. Simple Past",
    description: "Entscheide: Present Perfect (Bezug zur Gegenwart) oder Simple Past (abgeschlossen, Zeitangabe)?",
    rule: `
      <strong>Simple Past</strong> → abgeschlossene Zeitangabe: <em>yesterday, last week, in 2010, two days ago, when I was young</em><br>
      <span style="font-size:.88em;color:#7A6A54">I <em>went</em> to the museum yesterday. ✓</span><br><br>
      <strong>Present Perfect</strong> → offene / nicht abgeschlossene Zeit: <em>today, this week, this year, so far, recently</em><br>
      <span style="font-size:.88em;color:#7A6A54">I <em>have been</em> to the museum twice this year. ✓</span><br><br>
      <strong>Merksatz:</strong> Gibt es eine <em>abgeschlossene</em> Zeitangabe? → Simple Past.<br>
      Ist die Zeit <em>noch offen</em> oder kein Zeitpunkt genannt? → Present Perfect.
    `,
    exercises: [
      {
        type: "choice",
        sentence: "I ___ to the museum yesterday.",
        options: ["went","have gone","have been","go"],
        answer: "went",
        hint: "'yesterday' = abgeschlossene Zeit → Simple Past"
      },
      {
        type: "choice",
        sentence: "She ___ already finished her homework.",
        options: ["has","had","was","did"],
        answer: "has",
        hint: "kein abgeschlossener Zeitpunkt → Present Perfect (has + PP)"
      },
      {
        type: "choice",
        sentence: "We ___ three films this week.",
        options: ["have seen","saw","see","had seen"],
        answer: "have seen",
        hint: "'this week' = noch nicht vorbei → Present Perfect"
      },
      {
        type: "choice",
        sentence: "I ___ her last Friday.",
        options: ["saw","have seen","see","have saw"],
        answer: "saw",
        hint: "'last Friday' = abgeschlossen → Simple Past"
      },
      {
        type: "choice",
        sentence: "He ___ in London when he was young.",
        options: ["lived","has lived","has been living","lives"],
        answer: "lived",
        hint: "'when he was young' = abgeschlossene Vergangenheit → Simple Past"
      },
      {
        type: "choice",
        sentence: "I ___ Paris several times – it's a beautiful city.",
        options: ["have visited","visited","visit","had visited"],
        answer: "have visited",
        hint: "kein konkreter Zeitpunkt → Present Perfect (Erfahrung)"
      },
      {
        type: "choice",
        sentence: "They ___ to New York in 2019.",
        options: ["went","have gone","have been","go"],
        answer: "went",
        hint: "'in 2019' = abgeschlossenes Datum → Simple Past"
      },
      {
        type: "choice",
        sentence: "I ___ two cups of tea today – and it's only 9 am!",
        options: ["have drunk","drank","drink","had drunk"],
        answer: "have drunk",
        hint: "'today' = Tag noch nicht vorbei → Present Perfect"
      },
      {
        type: "choice",
        sentence: "Did you see that film? — Yes, I ___ it last year.",
        options: ["saw","have seen","see","had seen"],
        answer: "saw",
        hint: "'last year' = abgeschlossen → Simple Past"
      },
      {
        type: "choice",
        sentence: "___ you ever tried Thai food?",
        options: ["Have","Did","Had","Are"],
        answer: "Have",
        hint: "Lebenserfahrung ohne konkreten Zeitpunkt → Present Perfect"
      },
      {
        type: "fill",
        sentence: "I ___ (lose) my keys – I can't find them anywhere! (PP/Past?)",
        answer: "have lost",
        hint: "Ergebnis wirkt jetzt → Present Perfect: have lost"
      },
      {
        type: "fill",
        sentence: "She ___ (break) her arm two weeks ago.",
        answer: "broke",
        hint: "'two weeks ago' = abgeschlossen → Simple Past: broke"
      },
      {
        type: "fill",
        sentence: "We ___ (finish) all our work so far this month.",
        answer: "have finished",
        hint: "'so far this month' = noch laufend → Present Perfect"
      },
      {
        type: "fill",
        sentence: "He ___ (start) this company in 2005.",
        answer: "started",
        hint: "'in 2005' = Datum abgeschlossen → Simple Past"
      },
    ]
  },

  // ── PRESENT PERFECT – TEIL 7: Fehlerkorrektur ───────────────
  {
    id: "present_perfect_errors",
    title: "Present Perfect – Fehler korrigieren",
    description: "Wähle den korrekten Satz – ein typischer Fehler ist versteckt.",
    rule: `
      <strong>Häufige Fehler beim Present Perfect:</strong><br><br>
      ❌ Present Perfect + abgeschlossene Zeitangabe:<br>
      <span style="font-size:.88em;color:#C0392B">I <em>have seen</em> her yesterday.</span> → falsch!<br>
      <span style="font-size:.88em;color:#0E7A5F">I <em>saw</em> her yesterday.</span> → richtig ✓<br><br>
      ❌ Falsches Hilfsverb:<br>
      <span style="font-size:.88em;color:#C0392B">She <em>have</em> finished.</span> → falsch!<br>
      <span style="font-size:.88em;color:#0E7A5F">She <em>has</em> finished.</span> → richtig ✓<br><br>
      ❌ Falsches Past Participle:<br>
      <span style="font-size:.88em;color:#C0392B">I have <em>went</em> there.</span> → falsch!<br>
      <span style="font-size:.88em;color:#0E7A5F">I have <em>gone</em> there.</span> → richtig ✓
    `,
    exercises: [
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["I have seen her yesterday.","I saw her yesterday.","I have saw her yesterday.","I see her yesterday."],
        answer: "I saw her yesterday.",
        hint: "'yesterday' → Simple Past: saw"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["She have finished her work.","She has finish her work.","She has finished her work.","She finished her work already."],
        answer: "She has finished her work.",
        hint: "she → has + Past Participle (finished)"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["I have went to Paris.","I have go to Paris.","I have been to Paris.","I was go to Paris."],
        answer: "I have been to Paris.",
        hint: "go → gone, aber für Orte: have been to = ich war dort"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["Have you ever went there?","Have you ever gone there?","Did you ever gone there?","Have you ever go there?"],
        answer: "Have you ever gone there?",
        hint: "go → gone; Erfahrung → Have you ever + PP"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["I lived here since 2010.","I have lived here since 2010.","I live here since 2010.","I was live here since 2010."],
        answer: "I have lived here since 2010.",
        hint: "'since' + Startpunkt = Dauer bis jetzt → Present Perfect"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["He has worked there last year.","He worked there last year.","He has work there last year.","He have worked there last year."],
        answer: "He worked there last year.",
        hint: "'last year' = abgeschlossen → Simple Past"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["They have already ate.","They have already eaten.","They already have eaten.","They already eaten."],
        answer: "They have already eaten.",
        hint: "eat → eaten; Wortstellung: have + already + PP"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["I haven't finished yet my report.","I haven't yet finished my report.","I haven't finished my report yet.","I not have finished my report yet."],
        answer: "I haven't finished my report yet.",
        hint: "'yet' steht am Satzende in Verneinungen"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["She has never been to Paris before.","She never has been to Paris before.","She has never went to Paris before.","She have never been to Paris before."],
        answer: "She has never been to Paris before.",
        hint: "she → has; be → been; Wortstellung: has + never + PP"
      },
      {
        type: "choice",
        sentence: "Welcher Satz ist RICHTIG?",
        options: ["How long do you live here?","How long have you been living here?","How long are you living here?","How long you have lived here?"],
        answer: "How long have you been living here?",
        hint: "Dauer bis jetzt → Present Perfect (Continuous); W-Frage: How long have + Subject + PP?"
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
