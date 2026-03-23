// grammar-engine.js – Grammar exercise logic for EnglishLearn

const GrammarEngine = (() => {

  let topicData    = null;
  let currentLevel = null;
  let exercises    = [];
  let currentIdx   = 0;
  let results      = [];

  // ── Shuffle helper ────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Load topic from JSON ──────────────────────────────────────
  async function loadTopic(group, topicId) {
    const path = `topics/${group}/${topicId}.json`;
    const res  = await fetch(path);
    topicData  = await res.json();
    return topicData;
  }

  // ── Start a level – zieht zufällig SESSION_SIZE Fragen aus dem Pool ──
  function startLevel(levelNum) {
    currentLevel = topicData.levels.find(l => l.level === levelNum);
    if (!currentLevel) throw new Error(`Level ${levelNum} not found`);

    const pool        = currentLevel.exercises;
    const sessionSize = topicData.session_size || 20;

    // Falls Level 5 (Abschlusstest): Mix aus allen Levels 1-4
    if (levelNum === 5 || pool.length === 0) {
      exercises = buildFinalTest();
    } else {
      // Zufällig session_size Fragen aus dem Pool ziehen
      exercises = shuffle(pool).slice(0, Math.min(sessionSize, pool.length));
    }

    currentIdx = 0;
    results    = [];
    return exercises.length;
  }

  function currentExercise() { return exercises[currentIdx] || null; }
  function totalExercises()  { return exercises.length; }
  function currentPos()      { return currentIdx; }
  function isDone()          { return currentIdx >= exercises.length; }
  function advance()         { currentIdx++; }

  // ── Check answer ──────────────────────────────────────────────
  function checkAnswer(exercise, userAnswer) {
    const ua      = userAnswer.trim().toLowerCase();
    const correct = Array.isArray(exercise.answer)
      ? exercise.answer.map(a => a.toLowerCase())
      : [exercise.answer.toLowerCase()];
    const ok = correct.includes(ua);
    results.push({ exercise, userAnswer, correct: ok });
    return ok;
  }

  // ── Level 5 (Abschlusstest): 20 zufällig aus allen Levels 1–4 ──
  function buildFinalTest() {
    if (!topicData) return [];
    const sessionSize = topicData.session_size || 20;
    const all = topicData.levels
      .filter(l => l.level < 5)
      .flatMap(l => l.exercises);
    return shuffle(all).slice(0, Math.min(sessionSize, all.length));
  }

  function getSummary() {
    const total   = results.length;
    const correct = results.filter(r => r.correct).length;
    return { total, correct, percent: total ? Math.round(correct / total * 100) : 0 };
  }

  // ── Alle Themen (für Übersicht) ──────────────────────────────
  const TOPICS = [
    // Satzbau
    { group: 'satzbau',   id: 'word-order',          title: 'Word Order',        desc: 'Wortstellung in Aussagesätzen' },
    { group: 'satzbau',   id: 'questions',            title: 'Questions',         desc: 'Wh- und Yes/No-Fragen' },
    // Verben
    { group: 'verben',    id: 'simple-present',       title: 'Simple Present',    desc: 'Aussage, Verneinung & Fragen' },
    { group: 'verben',    id: 'past-tense',           title: 'Past Tense',        desc: 'Simple Past – regulär & irregulär' },
    { group: 'verben',    id: 'present-perfect-neu',  title: 'Present Perfect',   desc: 'have/has + Partizip – 3 Fälle', pool: 100 },
    { group: 'verben',    id: 'gerundium',            title: 'Gerundium',         desc: 'Die -ing Form als Nomen', pool: 100 },
    { group: 'verben',    id: 'pp-vs-ps',             title: 'PP vs. Past Simple', desc: 'Jetzt-Bezug vs. abgeschlossene Vergangenheit', pool: 100 },
    // Adjektive
    { group: 'adjektive', id: 'comparatives',         title: 'Comparatives',      desc: 'Vergleiche mit -er / more' },
    { group: 'adjektive', id: 'superlatives',         title: 'Superlatives',      desc: 'The -est / most Formen' },
    // Nomen
    { group: 'nomen',     id: 'plural',               title: 'Plural Forms',      desc: 'Reguläre & irreguläre Pluralformen' },
    { group: 'nomen',     id: 'articles',             title: 'Articles',          desc: 'a / an / the – Verwendung' },
  ];

  const GROUP_LABELS = {
    satzbau:   '📐 Satzbau',
    verben:    '🔧 Verben',
    adjektive: '🎨 Adjektive',
    nomen:     '📦 Nomen',
  };

  function getTopics()      { return TOPICS; }
  function getGroupLabels() { return GROUP_LABELS; }

  return {
    loadTopic, startLevel, currentExercise, totalExercises, currentPos,
    isDone, advance, checkAnswer, buildFinalTest, getSummary,
    getTopics, getGroupLabels, topicData: () => topicData
  };
})();
