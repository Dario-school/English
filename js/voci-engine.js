// voci-engine.js – Vocabulary learning logic for EnglishLearn

const VociEngine = (() => {

  // ── Shared state ──────────────────────────────────────────────
  let words        = [];   // [{id, de, en}, ...]
  let unitNums     = [];   // [1] or [1,3,7]
  let isCombined   = false;
  let direction    = 'de_en'; // 'de_en' or 'en_de'
  let queue        = [];
  let currentIndex = 0;
  let sessionResults = [];  // [{word, correct}]

  // ── Load words from JSON files ────────────────────────────────
  async function loadUnits(unitNumbers) {
    unitNums  = unitNumbers;
    isCombined = unitNumbers.length > 1;
    words     = [];

    const dataPath = '../voci/data/';
    const base = window.location.pathname.includes('/voci/') ? '../voci/data/' : 'voci/data/';

    for (const num of unitNumbers) {
      try {
        const path = (window.location.pathname.includes('/voci/') ? '' : 'voci/') +
                     `data/unit${String(num).padStart(2,'0')}.json`;
        const res  = await fetch(path);
        const json = await res.json();
        words = [...words, ...json.words];
      } catch (e) { console.warn('Could not load unit', num, e); }
    }

    if (isCombined) Storage.saveLastCombination(unitNumbers);
    return words;
  }

  function setDirection(dir) { direction = dir; }
  function getDirection()    { return direction; }

  function prompt(word)  { return direction === 'de_en' ? word.de : word.en; }
  function answer(word)  { return direction === 'de_en' ? word.en : word.de; }

  // ── Shuffle helper ────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Flashcard & Writing mode ──────────────────────────────────
  function startQueue(shuffled = true) {
    queue   = shuffled ? shuffle([...words]) : [...words];
    currentIndex = 0;
    sessionResults = [];
  }

  function currentWord() { return queue[currentIndex] || null; }
  function totalWords()  { return queue.length; }
  function currentPos()  { return currentIndex; }
  function isDone()      { return currentIndex >= queue.length; }

  function recordResult(wordId, correct) {
    sessionResults.push({ wordId, correct });
    if (!isCombined) {
      Storage.updateWordStats(unitNums[0], wordId, correct);
    }
    Storage.incrementTodayCount(1);
  }

  function advance() { currentIndex++; }

  function getSessionSummary() {
    const total   = sessionResults.length;
    const correct = sessionResults.filter(r => r.correct).length;
    return { total, correct, percent: total ? Math.round(correct / total * 100) : 0, wrong: total - correct };
  }

  // ── Matching mode ─────────────────────────────────────────────
  function getMatchingSet(n = 5) {
    const pool = shuffle([...words]);
    return pool.slice(0, n);
  }

  // ── Writing: typo tolerance ───────────────────────────────────
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  function checkWriting(input, word, ignoreCase, tolerance) {
    const inp = ignoreCase ? input.trim().toLowerCase() : input.trim();
    const ans = ignoreCase ? answer(word).trim().toLowerCase() : answer(word).trim();
    if (inp === ans) return 'correct';
    if (tolerance && levenshtein(inp, ans) <= 1) return 'almost';
    return 'wrong';
  }

  // ── Slot (Leitner) mode ───────────────────────────────────────
  function getSlotWords() {
    if (isCombined || unitNums.length !== 1) return null;
    const unitNum = unitNums[0];
    const wordMap = {};
    words.forEach(w => {
      const stats = Storage.getWordStats(unitNum, w.id);
      wordMap[w.id] = { ...w, slot: stats.slot };
    });
    return wordMap;
  }

  function pickSlotWord(wordMap) {
    const slot1 = Object.values(wordMap).filter(w => w.slot === 1);
    const slot2 = Object.values(wordMap).filter(w => w.slot === 2);
    const slot3 = Object.values(wordMap).filter(w => w.slot === 3);
    if (slot1.length) return shuffle(slot1)[0];
    if (slot2.length) return shuffle(slot2)[0];
    return null; // all in slot3 → round complete
  }

  function getSlotCounts(wordMap) {
    const vals = Object.values(wordMap);
    return { s1: vals.filter(w => w.slot === 1).length,
             s2: vals.filter(w => w.slot === 2).length,
             s3: vals.filter(w => w.slot === 3).length,
             total: vals.length };
  }

  // ── Expose ───────────────────────────────────────────────────
  return {
    loadUnits, setDirection, getDirection, prompt, answer, words: () => words,
    startQueue, currentWord, totalWords, currentPos, isDone,
    recordResult, advance, getSessionSummary,
    getMatchingSet, checkWriting, levenshtein,
    getSlotWords, pickSlotWord, getSlotCounts,
    shuffle
  };
})();
