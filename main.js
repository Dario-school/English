/**
 * ============================================================
 *  VOKABEL- & GRAMMATIKTRAINER  –  main.js
 *  Hauptlogik der App (vanilla JS, kein Framework nötig)
 * ============================================================
 *
 *  Datei-Überblick:
 *  1.  STATE & NAVIGATION
 *  2.  STARTSCREEN
 *  3.  UNIT-AUSWAHL
 *  4.  MODUS-AUSWAHL
 *  5.  MODUS: ZUORDNEN
 *  6.  MODUS: KARTEIKARTEN (Flashcard)
 *  7.  MODUS: SLOT LERNEN
 *  8.  GRAMMATIK-THEMEN
 *  9.  GRAMMATIK-ÜBUNG
 * 10.  HILFSFUNKTIONEN
 * ============================================================
 */

/* ============================================================
   1. STATE & NAVIGATION
   ============================================================ */

/** Globaler App-Zustand */
const state = {
  currentScreen: 'home',
  selectedUnit: null,      // Nummer 1–21
  selectedMode: null,      // 'zuordnen' | 'flashcard' | 'slot'
  flashcardDir: 'de-en',   // 'de-en' | 'en-de'
};

/** Alle Screens ausblenden, dann den gewünschten einblenden */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) {
    target.classList.add('active');
    state.currentScreen = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/** Pfeil-Icon als SVG-String */
const ICON_BACK   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`;

/* ============================================================
   2. STARTSCREEN
   ============================================================ */

document.getElementById('btn-voci').addEventListener('click', () => {
  showScreen('unit-select');
  renderUnitSelect();
});

document.getElementById('btn-grammar').addEventListener('click', () => {
  showScreen('grammar-topics');
  renderGrammarTopics();
});

/* ============================================================
   3. UNIT-AUSWAHL
   ============================================================ */

function renderUnitSelect() {
  const container = document.getElementById('unit-grid');
  container.innerHTML = '';

  for (let i = 1; i <= 21; i++) {
    const unit = VOCABULARIES[i];
    const btn  = document.createElement('button');
    btn.className = 'unit-btn';
    btn.innerHTML = `<span class="unit-num">${i}</span>${unit ? escHtml(unit.title.replace('Unit ' + i, '').replace('–', '').trim()) : ''}`;
    btn.addEventListener('click', () => {
      state.selectedUnit = i;
      showScreen('mode-select');
      renderModeSelect();
    });
    container.appendChild(btn);
  }
}

document.getElementById('back-unit-select').addEventListener('click', () => showScreen('home'));

/* ============================================================
   4. MODUS-AUSWAHL
   ============================================================ */

function renderModeSelect() {
  const unit = VOCABULARIES[state.selectedUnit];
  document.getElementById('mode-unit-title').textContent =
    unit ? unit.title : `Unit ${state.selectedUnit}`;
  document.getElementById('mode-word-count').textContent =
    unit ? `${unit.words.length} Wörter` : '';
}

document.getElementById('back-mode-select').addEventListener('click', () => {
  showScreen('unit-select');
  renderUnitSelect();
});

document.getElementById('btn-zuordnen').addEventListener('click',  () => startZuordnen());
document.getElementById('btn-flashcard').addEventListener('click', () => startFlashcard());
document.getElementById('btn-slot').addEventListener('click',      () => startSlot());

/* ============================================================
   5. MODUS: ZUORDNEN
   ============================================================ */

const ZUORDNEN_BATCH = 5;   // Anzahl Paare pro Runde

let zu = {   // Zuordnen-State
  words:      [],   // alle Wörter der Unit
  batches:    [],   // aufgeteilt in Gruppen à ZUORDNEN_BATCH
  batchIndex: 0,    // aktuelle Gruppe
  matched:    0,    // bereits gepaarte Wörter (gesamt)
  total:      0,    // Gesamtanzahl
  selDE:      null, // aktuell gewählte deutsche Karte
  selEN:      null, // aktuell gewählte englische Karte
  attempts:   0,    // Versuche gesamt
};

function startZuordnen() {
  const unit = VOCABULARIES[state.selectedUnit];
  if (!unit) return;

  zu.words      = shuffle([...unit.words]);
  zu.total      = zu.words.length;
  zu.matched    = 0;
  zu.attempts   = 0;
  zu.batches    = chunkArray(zu.words, ZUORDNEN_BATCH);
  zu.batchIndex = 0;
  zu.selDE      = null;
  zu.selEN      = null;

  showScreen('zuordnen');
  renderZuordnen();
}

function renderZuordnen() {
  const batch   = zu.batches[zu.batchIndex] || [];
  const matched = document.getElementById('zu-matched');
  const total   = document.getElementById('zu-total');
  const attempt = document.getElementById('zu-attempts');
  const progBar = document.getElementById('zu-progress-bar');

  matched.textContent = zu.matched;
  total.textContent   = zu.total;
  attempt.textContent = zu.attempts;
  progBar.style.width = (zu.total > 0 ? (zu.matched / zu.total) * 100 : 0) + '%';

  // Spalten aufbauen: DE links, EN rechts (beide gemischt)
  const deWords = shuffle(batch.map(w => ({ id: w.en, text: w.de, lang: 'de' })));
  const enWords = shuffle(batch.map(w => ({ id: w.en, text: w.en, lang: 'en' })));

  renderZuordnenCol('zu-col-de', deWords);
  renderZuordnenCol('zu-col-en', enWords);

  zu.selDE = null;
  zu.selEN = null;
}

function renderZuordnenCol(colId, items) {
  const col = document.getElementById(colId);
  col.innerHTML = '';
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'word-btn';
    btn.textContent = item.text;
    btn.dataset.id   = item.id;
    btn.dataset.lang = item.lang;
    btn.addEventListener('click', () => handleZuordnenClick(btn, item));
    col.appendChild(btn);
  });
}

function handleZuordnenClick(btn, item) {
  if (btn.classList.contains('matched')) return;

  // Gleiche Sprache neu wählen: vorherige Auswahl aufheben
  if (item.lang === 'de') {
    document.querySelectorAll('#zu-col-de .word-btn.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    zu.selDE = { btn, item };
  } else {
    document.querySelectorAll('#zu-col-en .word-btn.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    zu.selEN = { btn, item };
  }

  // Beide gewählt → prüfen
  if (zu.selDE && zu.selEN) {
    zu.attempts++;
    if (zu.selDE.item.id === zu.selEN.item.id) {
      // Richtig!
      zu.selDE.btn.classList.remove('selected');
      zu.selEN.btn.classList.remove('selected');
      zu.selDE.btn.classList.add('matched');
      zu.selEN.btn.classList.add('matched');
      zu.selDE.btn.textContent += ' ✓';
      zu.selEN.btn.textContent += ' ✓';
      zu.matched++;
      zu.selDE = null;
      zu.selEN = null;
      document.getElementById('zu-matched').textContent = zu.matched;
      document.getElementById('zu-attempts').textContent = zu.attempts;
      const pct = (zu.matched / zu.total) * 100;
      document.getElementById('zu-progress-bar').style.width = pct + '%';

      // Batch abgeschlossen?
      const batchDone = document.querySelectorAll('#zu-col-de .word-btn:not(.matched)').length === 0;
      if (batchDone) {
        setTimeout(() => {
          zu.batchIndex++;
          if (zu.batchIndex < zu.batches.length) {
            renderZuordnen();
          } else {
            showZuordnenResult();
          }
        }, 600);
      }
    } else {
      // Falsch!
      const dBtn = zu.selDE.btn;
      const eBtn = zu.selEN.btn;
      dBtn.classList.add('wrong-flash');
      eBtn.classList.add('wrong-flash');
      setTimeout(() => {
        dBtn.classList.remove('wrong-flash', 'selected');
        eBtn.classList.remove('wrong-flash', 'selected');
      }, 500);
      zu.selDE = null;
      zu.selEN = null;
    }
  }
}

function showZuordnenResult() {
  const acc = Math.round((zu.total / zu.attempts) * 100);
  document.getElementById('zu-res-emoji').textContent   = acc >= 80 ? '🎉' : acc >= 50 ? '👍' : '📚';
  document.getElementById('zu-res-matched').textContent = zu.total;
  document.getElementById('zu-res-attempts').textContent = zu.attempts;
  document.getElementById('zu-res-acc').textContent     = acc + '%';
  showScreen('zuordnen-result');
}

document.getElementById('back-zuordnen').addEventListener('click', () => {
  showScreen('mode-select');
  renderModeSelect();
});
document.getElementById('zu-again').addEventListener('click',    () => startZuordnen());
document.getElementById('zu-other-mode').addEventListener('click', () => {
  showScreen('mode-select');
  renderModeSelect();
});

/* ============================================================
   6. MODUS: KARTEIKARTEN (Flashcard)
   ============================================================ */

let fc = {
  words:   [],
  index:   0,
  correct: 0,
  wrong:   0,
  flipped: false,
};

function startFlashcard() {
  const unit = VOCABULARIES[state.selectedUnit];
  if (!unit) return;

  // Richtung aus Radio-Button lesen
  const dirEl = document.querySelector('input[name="fc-dir"]:checked');
  state.flashcardDir = dirEl ? dirEl.value : 'de-en';

  fc.words   = shuffle([...unit.words]);
  fc.index   = 0;
  fc.correct = 0;
  fc.wrong   = 0;
  fc.flipped = false;

  showScreen('flashcard');
  renderFlashcard();
}

function renderFlashcard() {
  if (fc.index >= fc.words.length) {
    showFlashcardResult();
    return;
  }

  const word = fc.words[fc.index];
  const isDE = (state.flashcardDir === 'de-en');
  const front = isDE ? word.de : word.en;
  const back  = isDE ? word.en : word.de;

  document.getElementById('fc-front-label').textContent = isDE ? 'Deutsch'  : 'Englisch';
  document.getElementById('fc-back-label').textContent  = isDE ? 'Englisch' : 'Deutsch';
  document.getElementById('fc-front-word').textContent  = front;
  document.getElementById('fc-back-word').textContent   = back;

  document.getElementById('fc-meta').innerHTML =
    `Karte <strong>${fc.index + 1}</strong> von <strong>${fc.words.length}</strong>`;
  document.getElementById('fc-score-correct').textContent = '✓ ' + fc.correct;
  document.getElementById('fc-score-wrong').textContent   = '✗ ' + fc.wrong;

  // Karte zurückdrehen
  fc.flipped = false;
  const inner = document.getElementById('fc-card-inner');
  inner.classList.remove('is-flipped');

  // Bewertungs-Buttons erst nach dem Umdrehen aktiv
  setFCButtons(false);
}

function setFCButtons(enabled) {
  document.getElementById('fc-btn-correct').disabled = !enabled;
  document.getElementById('fc-btn-wrong').disabled   = !enabled;
}

document.getElementById('fc-card').addEventListener('click', () => {
  if (!fc.flipped) {
    document.getElementById('fc-card-inner').classList.add('is-flipped');
    fc.flipped = true;
    setFCButtons(true);
  }
});

document.getElementById('fc-btn-correct').addEventListener('click', () => {
  fc.correct++;
  fc.index++;
  renderFlashcard();
});

document.getElementById('fc-btn-wrong').addEventListener('click', () => {
  fc.wrong++;
  fc.index++;
  renderFlashcard();
});

function showFlashcardResult() {
  const total = fc.correct + fc.wrong;
  const pct   = total > 0 ? Math.round((fc.correct / total) * 100) : 0;
  document.getElementById('fc-res-emoji').textContent   = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚';
  document.getElementById('fc-res-correct').textContent = fc.correct;
  document.getElementById('fc-res-wrong').textContent   = fc.wrong;
  document.getElementById('fc-res-pct').textContent     = pct + '%';
  showScreen('flashcard-result');
}

document.getElementById('back-flashcard').addEventListener('click', () => {
  showScreen('mode-select');
  renderModeSelect();
});
document.getElementById('fc-again').addEventListener('click', () => startFlashcard());
document.getElementById('fc-other-mode').addEventListener('click', () => {
  showScreen('mode-select');
  renderModeSelect();
});

/* ============================================================
   7. MODUS: SLOT LERNEN
   ============================================================ */

/**
 * Slot-Lern-System:
 *  - Alle Wörter starten in Slot 1
 *  - Richtig in Slot 1 → Slot 2
 *  - Richtig in Slot 2 → Slot 3
 *  - Falsch  in Slot 2 → zurück zu Slot 1, sofort wiederholen (priorityQueue)
 *  - Wenn alle in Slot 3 → fertig!
 *  Fortschritt wird per localStorage gespeichert (key: "slot_unit_{id}")
 */

let sl = {
  slot1:         [],
  slot2:         [],
  slot3:         [],
  totalWords:    0,
  currentWord:   null,
  currentFrom:   1,     // aus welchem Slot kommt das aktuelle Wort
  priorityQueue: [],    // Wörter, die aus Slot 2 zurückgefallen sind
  waitingNext:   false, // verhindert Doppelklick
  direction:     'en-de', // en → de eingeben  (konfigurierbar)
};

function getSlotKey() {
  return `slot_unit_${state.selectedUnit}`;
}

function loadSlotProgress() {
  try {
    const raw = localStorage.getItem(getSlotKey());
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function saveSlotProgress() {
  try {
    localStorage.setItem(getSlotKey(), JSON.stringify({
      slot1: sl.slot1,
      slot2: sl.slot2,
      slot3: sl.slot3,
      priorityQueue: sl.priorityQueue,
    }));
  } catch (e) { /* ignore */ }
}

function startSlot() {
  const unit = VOCABULARIES[state.selectedUnit];
  if (!unit) return;

  sl.totalWords  = unit.words.length;
  sl.waitingNext = false;
  sl.direction   = 'en-de'; // Englisch zeigen, Deutsch eingeben

  // Gespeicherten Fortschritt laden oder neu beginnen
  const saved = loadSlotProgress();
  if (saved &&
      (saved.slot1.length + saved.slot2.length + saved.slot3.length) === sl.totalWords) {
    sl.slot1         = saved.slot1;
    sl.slot2         = saved.slot2;
    sl.slot3         = saved.slot3;
    sl.priorityQueue = saved.priorityQueue || [];
  } else {
    sl.slot1         = shuffle([...unit.words]);
    sl.slot2         = [];
    sl.slot3         = [];
    sl.priorityQueue = [];
    saveSlotProgress();
  }

  showScreen('slot');
  renderSlotOverview();
  nextSlotWord();
}

/** Nächstes Wort auswählen */
function nextSlotWord() {
  sl.waitingNext = false;

  // Alle fertig?
  if (sl.slot1.length === 0 && sl.slot2.length === 0 && sl.priorityQueue.length === 0) {
    showSlotResult();
    return;
  }

  // Priorität: priorityQueue → Slot 1 → Slot 2
  if (sl.priorityQueue.length > 0) {
    sl.currentWord = sl.priorityQueue[0]; // noch nicht entfernen, erst nach richtiger Antwort
    sl.currentFrom = 1; // verhält sich wie Slot 1 (muss einmal richtig)
    document.getElementById('sl-from-badge').textContent = '⚠ Wiederholen (war in Slot 2)';
    document.getElementById('sl-from-badge').className   = 'slot-from-badge s2';
  } else if (sl.slot1.length > 0) {
    sl.currentWord = sl.slot1[0];
    sl.currentFrom = 1;
    document.getElementById('sl-from-badge').textContent = 'Aus Slot 1';
    document.getElementById('sl-from-badge').className   = 'slot-from-badge s1';
  } else {
    sl.currentWord = sl.slot2[0];
    sl.currentFrom = 2;
    document.getElementById('sl-from-badge').textContent = 'Aus Slot 2';
    document.getElementById('sl-from-badge').className   = 'slot-from-badge s2';
  }

  // Wort anzeigen (EN zeigen, DE eingeben)
  const prompt = sl.direction === 'en-de' ? sl.currentWord.en : sl.currentWord.de;
  document.getElementById('sl-prompt').textContent = prompt;
  document.getElementById('sl-input').value        = '';
  document.getElementById('sl-input').className    = 'slot-input';
  hideFeedback();
  document.getElementById('sl-input').focus();
}

function checkSlotAnswer() {
  if (sl.waitingNext || !sl.currentWord) return;

  const input    = document.getElementById('sl-input');
  const userVal  = input.value.trim();
  const expected = sl.direction === 'en-de' ? sl.currentWord.de : sl.currentWord.en;

  if (userVal === '') return;

  const correct = normalizeAnswer(userVal) === normalizeAnswer(expected);

  if (correct) {
    input.classList.add('correct');
    showFeedback(true, `✓ Richtig! → ${expected}`);

    if (sl.priorityQueue.length > 0 && sl.priorityQueue[0] === sl.currentWord) {
      // War in Priority-Queue: nach Slot 2 zurück
      sl.priorityQueue.shift();
      sl.slot2.push(sl.currentWord);
    } else if (sl.currentFrom === 1) {
      sl.slot1.shift();
      sl.slot2.push(sl.currentWord);
    } else {
      sl.slot2.shift();
      sl.slot3.push(sl.currentWord);
    }

    saveSlotProgress();
    sl.waitingNext = true;
    renderSlotOverview();
    setTimeout(nextSlotWord, 1400);

  } else {
    input.classList.add('wrong');
    showFeedback(false, `✗ Falsch. Richtig wäre: „${expected}"`);

    if (sl.currentFrom === 2) {
      // Aus Slot 2 rausgefallen → Slot 1, sofort wiederholen
      sl.slot2.shift();
      sl.slot1.unshift(sl.currentWord);   // ans Ende der Slot-1-Liste
      sl.priorityQueue.unshift(sl.currentWord); // Priority: sofort wieder dran
    }
    // Aus Slot 1: bleibt in Slot 1 (ans Ende schieben für Abwechslung)
    else if (sl.currentFrom === 1 && sl.slot1.length > 1) {
      const w = sl.slot1.shift();
      sl.slot1.push(w);
    }

    saveSlotProgress();
    sl.waitingNext = true;
    renderSlotOverview();
    setTimeout(() => {
      input.classList.remove('wrong');
      hideFeedback();
      sl.waitingNext = false;
      nextSlotWord();
    }, 2200);
  }
}

function showFeedback(correct, msg) {
  const el = document.getElementById('sl-feedback');
  el.textContent = msg;
  el.className = `slot-feedback show ${correct ? 'correct-msg' : 'wrong-msg'}`;
}
function hideFeedback() {
  document.getElementById('sl-feedback').className = 'slot-feedback';
}

/** Slot-Kreisdiagramme aktualisieren */
function renderSlotOverview() {
  const total = sl.totalWords || 1;
  const R     = 26; // Radius des SVG-Kreises (viewBox 64x64, center 32x32)
  const C     = 2 * Math.PI * R; // Umfang

  [
    { id: 1, arr: sl.slot1, fillId: 'sl-circ-1', countId: 'sl-count-1' },
    { id: 2, arr: sl.slot2, fillId: 'sl-circ-2', countId: 'sl-count-2' },
    { id: 3, arr: sl.slot3, fillId: 'sl-circ-3', countId: 'sl-count-3' },
  ].forEach(({ id, arr, fillId, countId }) => {
    const pct    = arr.length / total;
    const offset = C - pct * C;
    const circle = document.getElementById(fillId);
    if (circle) {
      circle.setAttribute('stroke-dasharray', C);
      circle.setAttribute('stroke-dashoffset', offset);
    }
    const countEl = document.getElementById(countId);
    if (countEl) countEl.textContent = arr.length;

    // Active-Slot-Markierung
    const slotItem = document.getElementById(`sl-slot-item-${id}`);
    if (slotItem) {
      slotItem.classList.remove('active-slot');
      const isActive =
        (id === 1 && (sl.slot1.length > 0 || sl.priorityQueue.length > 0)) ||
        (id === 2 && sl.slot1.length === 0 && sl.slot2.length > 0 && sl.priorityQueue.length === 0) ||
        (id === 3 && sl.slot1.length === 0 && sl.slot2.length === 0 && sl.slot3.length > 0);
      if (isActive) slotItem.classList.add('active-slot');
    }
  });

  // Gesamtfortschritt
  const pct = Math.round((sl.slot3.length / total) * 100);
  document.getElementById('sl-overall-pct').textContent = pct + '% in Slot 3';
}

// Enter → Antwort prüfen
document.getElementById('sl-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkSlotAnswer();
});
document.getElementById('sl-submit').addEventListener('click', checkSlotAnswer);

function showSlotResult() {
  document.getElementById('sl-res-emoji').textContent = '🏆';
  document.getElementById('sl-res-total').textContent = sl.totalWords;
  showScreen('slot-result');
  // Gespeicherten Fortschritt löschen (Unit abgeschlossen)
  try { localStorage.removeItem(getSlotKey()); } catch(e){}
}

document.getElementById('back-slot').addEventListener('click', () => {
  showScreen('mode-select');
  renderModeSelect();
});
document.getElementById('sl-again').addEventListener('click', () => {
  // Fortschritt zurücksetzen
  try { localStorage.removeItem(getSlotKey()); } catch(e){}
  startSlot();
});
document.getElementById('sl-other-mode').addEventListener('click', () => {
  showScreen('mode-select');
  renderModeSelect();
});
document.getElementById('sl-reset').addEventListener('click', () => {
  if (confirm('Möchtest du den Fortschritt für diese Unit wirklich zurücksetzen?')) {
    try { localStorage.removeItem(getSlotKey()); } catch(e){}
    startSlot();
  }
});

/* ============================================================
   8. GRAMMATIK-THEMEN
   ============================================================ */

function renderGrammarTopics() {
  const container = document.getElementById('grammar-topic-grid');
  container.innerHTML = '';
  GRAMMAR_TOPICS.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'grammar-topic-card';
    card.innerHTML = `<h3>${escHtml(topic.title)}</h3><p>${escHtml(topic.description)}</p>`;
    card.addEventListener('click', () => startGrammarTopic(topic.id));
    container.appendChild(card);
  });
}

document.getElementById('back-grammar-topics').addEventListener('click', () => showScreen('home'));

/* ============================================================
   9. GRAMMATIK-ÜBUNG
   ============================================================ */

let gr = {
  topic:     null,
  exercises: [],
  index:     0,
  correct:   0,
  wrong:     0,
};

function startGrammarTopic(topicId) {
  const topic = GRAMMAR_TOPICS.find(t => t.id === topicId);
  if (!topic) return;

  gr.topic     = topic;
  gr.exercises = shuffle([...topic.exercises]);
  gr.index     = 0;
  gr.correct   = 0;
  gr.wrong     = 0;

  document.getElementById('gr-title').textContent = topic.title;
  document.getElementById('gr-rule').innerHTML    = topic.rule;

  showScreen('grammar-practice');
  renderGrammarExercise();
}

function renderGrammarExercise() {
  const ex  = gr.exercises[gr.index];
  const tot = gr.exercises.length;

  // Fortschrittsbalken
  document.getElementById('gr-progress-bar').style.width = ((gr.index / tot) * 100) + '%';
  document.getElementById('gr-progress-label').textContent = `${gr.index + 1} / ${tot}`;

  const container = document.getElementById('gr-exercise-area');
  container.innerHTML = '';

  if (!ex) {
    showGrammarResult();
    return;
  }

  const div = document.createElement('div');
  div.className = 'grammar-exercise';
  div.innerHTML = `<div class="grammar-q-num">Aufgabe ${gr.index + 1} von ${tot}</div>`;

  if (ex.type === 'fill') {
    // Lückentext: ___ durch Input ersetzen
    const parts    = ex.sentence.split('___');
    const p        = document.createElement('p');
    p.className    = 'grammar-sentence';
    p.appendChild(document.createTextNode(parts[0]));
    const input    = document.createElement('input');
    input.type     = 'text';
    input.className = 'grammar-input';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('spellcheck', 'false');
    p.appendChild(input);
    if (parts[1]) p.appendChild(document.createTextNode(parts[1]));
    div.appendChild(p);

    // Hint
    const hintEl = document.createElement('div');
    hintEl.className = 'grammar-hint';
    hintEl.textContent = ex.hint || '';
    div.appendChild(hintEl);

    // Submit-Button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary';
    submitBtn.style.marginTop = '16px';
    submitBtn.textContent = 'Prüfen';
    div.appendChild(submitBtn);

    const check = () => {
      const val = input.value.trim();
      if (!val) return;
      const ok = normalizeAnswer(val) === normalizeAnswer(ex.answer);
      input.classList.add(ok ? 'correct-input' : 'wrong-input');
      input.disabled = true;
      submitBtn.disabled = true;
      if (!ok) {
        hintEl.textContent = `✗ Richtig wäre: „${ex.answer}"${ex.hint ? ' – ' + ex.hint : ''}`;
        hintEl.classList.add('show');
        gr.wrong++;
      } else {
        gr.correct++;
      }
      setTimeout(() => { gr.index++; renderGrammarExercise(); }, 1600);
    };
    submitBtn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });

  } else if (ex.type === 'choice') {
    // Multiple Choice
    const p = document.createElement('p');
    p.className = 'grammar-sentence';
    p.textContent = ex.sentence.replace('___', '______');
    div.appendChild(p);

    const hintEl = document.createElement('div');
    hintEl.className = 'grammar-hint';
    div.appendChild(hintEl);

    const optRow = document.createElement('div');
    optRow.className = 'grammar-options';
    ex.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'grammar-opt-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        const allBtns = optRow.querySelectorAll('.grammar-opt-btn');
        allBtns.forEach(b => b.disabled = true);
        const ok = normalizeAnswer(opt) === normalizeAnswer(ex.answer);
        btn.classList.add(ok ? 'opt-correct' : 'opt-wrong');
        // Zeige richtige Antwort an
        allBtns.forEach(b => {
          if (normalizeAnswer(b.textContent) === normalizeAnswer(ex.answer)) {
            b.classList.add('opt-correct');
          }
        });
        if (!ok) {
          hintEl.textContent = ex.hint || '';
          hintEl.classList.add('show');
          gr.wrong++;
        } else {
          gr.correct++;
        }
        setTimeout(() => { gr.index++; renderGrammarExercise(); }, 1600);
      });
      optRow.appendChild(btn);
    });
    div.appendChild(optRow);
  }

  container.appendChild(div);

  // Bei Fill-Übungen direkt in Input fokussieren
  const inp = div.querySelector('.grammar-input');
  if (inp) setTimeout(() => inp.focus(), 50);
}

function showGrammarResult() {
  const total = gr.correct + gr.wrong;
  const pct   = total > 0 ? Math.round((gr.correct / total) * 100) : 0;
  document.getElementById('gr-res-emoji').textContent   = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚';
  document.getElementById('gr-res-correct').textContent = gr.correct;
  document.getElementById('gr-res-wrong').textContent   = gr.wrong;
  document.getElementById('gr-res-pct').textContent     = pct + '%';
  showScreen('grammar-result');
}

document.getElementById('back-grammar-practice').addEventListener('click', () => {
  showScreen('grammar-topics');
  renderGrammarTopics();
});
document.getElementById('gr-again').addEventListener('click', () => startGrammarTopic(gr.topic.id));
document.getElementById('gr-other-topic').addEventListener('click', () => {
  showScreen('grammar-topics');
  renderGrammarTopics();
});

/* ============================================================
   10. HILFSFUNKTIONEN
   ============================================================ */

/** Array zufällig durchmischen (Fisher-Yates) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Array in Untergruppen aufteilen */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/** HTML-Sonderzeichen escapen */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Antwort normalisieren für Vergleich:
 * - Kleinschreibung
 * - Führende/nachfolgende Leerzeichen entfernen
 * - Mehrfache Leerzeichen zusammenfassen
 * - Sonderzeichen (Klammern, Bindestriche am Ende) ignorieren
 */
function normalizeAnswer(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\(.*?\)/g, '')   // Klammerinhalte entfernen (z.B. "(AmE)")
    .replace(/[-–,;.!?]+$/, '') // Interpunktion am Ende
    .trim();
}
