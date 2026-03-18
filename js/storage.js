// storage.js – localStorage wrapper for EnglishLearn

const Storage = (() => {
  const PREFIX = 'el_';

  function get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function remove(key) {
    try { localStorage.removeItem(PREFIX + key); return true; }
    catch { return false; }
  }

  // ── Voci helpers ──────────────────────────────────────────────
  function getUnitData(unitNum) {
    return get(`voci_unit_${String(unitNum).padStart(2,'0')}`) || { words: {}, matching_besttime: null, last_direction: 'de_en' };
  }
  function saveUnitData(unitNum, data) {
    return set(`voci_unit_${String(unitNum).padStart(2,'0')}`, data);
  }
  function getLastCombination() {
    return get('voci_last_combination') || [];
  }
  function saveLastCombination(units) {
    return set('voci_last_combination', units);
  }

  // ── Word stats (for single units) ────────────────────────────
  function getWordStats(unitNum, wordId) {
    const ud = getUnitData(unitNum);
    return ud.words[wordId] || { slot: 1, correct: 0, wrong: 0 };
  }
  function updateWordStats(unitNum, wordId, correct) {
    const ud = getUnitData(unitNum);
    if (!ud.words[wordId]) ud.words[wordId] = { slot: 1, correct: 0, wrong: 0 };
    const w = ud.words[wordId];
    if (correct) {
      w.correct++;
      w.slot = Math.min(w.slot + 1, 3);
    } else {
      w.wrong++;
      w.slot = 1;
    }
    saveUnitData(unitNum, ud);
  }
  function saveBestTime(unitNum, seconds) {
    const ud = getUnitData(unitNum);
    if (!ud.matching_besttime || seconds < ud.matching_besttime) {
      ud.matching_besttime = seconds;
      saveUnitData(unitNum, ud);
    }
  }

  // ── Grammar helpers ───────────────────────────────────────────
  function getGrammarTopic(topicId) {
    return get(`grammar_${topicId}`) || { levels: {}, star: false };
  }
  function saveGrammarLevel(topicId, levelNum, score) {
    const t = getGrammarTopic(topicId);
    t.levels[levelNum] = { completed: true, score };
    if (levelNum === 5 && score >= 80) t.star = true;
    set(`grammar_${topicId}`, t);
  }
  function isLevelUnlocked(topicId, levelNum) {
    if (levelNum === 1) return true;
    const t = getGrammarTopic(topicId);
    const prev = t.levels[levelNum - 1];
    return prev && prev.completed && prev.score >= 70;
  }

  // ── Streak ───────────────────────────────────────────────────
  function updateStreak() {
    const today = new Date().toDateString();
    const data  = get('streak') || { last: null, count: 0 };
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (data.last === today) return data.count;
    data.count = data.last === yesterday ? data.count + 1 : 1;
    data.last  = today;
    set('streak', data);
    return data.count;
  }
  function getStreak() {
    const data = get('streak') || { last: null, count: 0 };
    const today = new Date().toDateString();
    if (data.last !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (data.last !== yesterday) data.count = 0;
    }
    return data.count;
  }

  // ── Dark mode ─────────────────────────────────────────────────
  function getDarkMode() { return get('dark_mode') === true; }
  function setDarkMode(v) { return set('dark_mode', v); }

  // ── Today's count ─────────────────────────────────────────────
  function getTodayCount() {
    const today = new Date().toDateString();
    const d = get('today_count') || { date: null, count: 0 };
    if (d.date !== today) return 0;
    return d.count;
  }
  function incrementTodayCount(n = 1) {
    const today = new Date().toDateString();
    const d = get('today_count') || { date: today, count: 0 };
    if (d.date !== today) { d.date = today; d.count = 0; }
    d.count += n;
    set('today_count', d);
  }

  // ── Export / Import ───────────────────────────────────────────
  function exportAll() {
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) result[key.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(key));
    }
    return JSON.stringify(result, null, 2);
  }
  function importAll(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      Object.entries(data).forEach(([key, val]) => set(key, val));
      return true;
    } catch { return false; }
  }

  return { get, set, remove, getUnitData, saveUnitData, getLastCombination, saveLastCombination,
    getWordStats, updateWordStats, saveBestTime, getGrammarTopic, saveGrammarLevel,
    isLevelUnlocked, updateStreak, getStreak, getDarkMode, setDarkMode,
    getTodayCount, incrementTodayCount, exportAll, importAll };
})();
