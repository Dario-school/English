# 📚 Vokabel- & Grammatiktrainer

Ein einfacher, komplett browser-basierter Trainer für Englisch-Vokabeln und Grammatik – kein Backend, keine Installation.  
Läuft direkt auf GitHub Pages oder lokal in VS Code.

---

## 🚀 Schnellstart

1. Repository klonen oder herunterladen
2. `index.html` im Browser öffnen – fertig!

---

## 📁 Projektstruktur

```
vocab-trainer/
├── index.html          ← Einzige HTML-Datei (alle Screens)
├── style.css           ← Alle Styles
├── main.js             ← App-Logik (Zuordnen, Karteikarten, Slot, Grammatik)
├── data/
│   ├── vocabularies.js ← Vokabeln für alle 21 Units
│   └── grammar.js      ← Grammatikaufgaben (erweiterbar)
└── README.md
```

---

## 🃏 Voci-Modi

### 1. Zuordnen
Klassisches Wörter-Matching: Deutsche und englische Wörter werden gemischt angezeigt.  
Du klickst zuerst ein deutsches Wort, dann das passende englische – bei Treffer verschwinden beide, bei Fehler gibt es kurzes visuelles Feedback.  
Alle Wörter werden in Gruppen von 5 Paaren präsentiert, bis die gesamte Unit durch ist.

### 2. Karteikarten
Eine Karte wird angezeigt (Vorder- oder Rückseite, je nach Einstellung). Klick auf die Karte dreht sie um.  
Danach bewertest du selbst: **✓ Gewusst** oder **✗ Nicht gewusst**.  
Die App zählt deine Treffer mit. Die Richtung (DE→EN oder EN→DE) wählst du vor dem Start.

### 3. Slot lernen (3-Stufen-System)
**Idee:** Wörter wandern durch drei Slots – von «neu» zu «gelernt».

| Situation | Ergebnis |
|-----------|---------|
| Richtig in **Slot 1** | → Slot 2 |
| Richtig in **Slot 2** | → Slot 3 ✓ |
| Falsch in **Slot 1**  | bleibt in Slot 1 |
| Falsch in **Slot 2**  | zurück in Slot 1, sofort wiederholen |

- Alle Wörter starten in Slot 1.
- Solange Wörter in Slot 1 sind, wird aus Slot 1 geübt.
- Wörter, die aus Slot 2 fallen, haben **Priorität**: sie werden sofort nochmals gezeigt.
- Wenn alle Wörter in Slot 3 sind, ist die Unit «gemeistert».
- **Fortschritt wird gespeichert** (localStorage) – du kannst mittendrin aufhören und weitermachen.

---

## ✏️ Grammatik

Grammatikthemen werden als Karten angezeigt. Pro Thema gibt es:
- Eine **Regel-Box** mit der Grammatikerklärung
- **Lückentexte** (du tippst die richtige Form ein) und/oder **Multiple Choice**

Aktuell verfügbare Themen:
- **Present Perfect** (15 Aufgaben)
- **Past Simple** (Platzhalter – bereit zum Befüllen)
- **If-Clauses Typ I** (Platzhalter – bereit zum Befüllen)

---

## ➕ Neue Vokabeln/Units hinzufügen

Öffne `data/vocabularies.js`. Jede Unit sieht so aus:

```js
17: {
  title: "Unit 17 – Mein Thema",
  words: [
    { en: "apple",  de: "Apfel" },
    { en: "banana", de: "Banane" },
    // ... beliebig viele weitere Wörter
  ]
}
```

- Passe einfach die Nummer, den Titel und die `words`-Liste an.
- Units 1–15 und 17–21 enthalten Platzhalter-Wörter mit einem `// TODO`-Kommentar.
- **Unit 16** ist vollständig aus dem Lehrmittel befüllt.

---

## ➕ Neue Grammatikthemen hinzufügen

Öffne `data/grammar.js` und füge ein neues Objekt im `GRAMMAR_TOPICS`-Array ein:

```js
{
  id: "past_continuous",           // einmaliger Bezeichner
  title: "Past Continuous",        // Anzeigename
  description: "Kurze Erklärung", // erscheint auf der Themen-Karte
  rule: `<strong>Bildung:</strong> was/were + Verb + -ing ...`,  // HTML erlaubt
  exercises: [
    {
      type: "fill",                // Lückentext
      sentence: "She ___ when I called.",
      answer: "was sleeping",
      hint: "Past Continuous: was/were + -ing"
    },
    {
      type: "choice",              // Multiple Choice
      sentence: "They ___ TV at 8 pm.",
      options: ["watched", "were watching", "are watching", "watch"],
      answer: "were watching",
      hint: "Kontinuierliche Vergangenheitshandlung → Past Continuous"
    }
  ]
}
```

---

## 🌐 Deployment auf GitHub Pages

1. Erstelle ein neues Repository auf GitHub (z.B. `vocab-trainer`).
2. Lade alle Dateien in den `main`-Branch hoch.
3. Gehe zu **Settings → Pages**.
4. Wähle unter *Source*: `Deploy from a branch` → `main` / `/ (root)`.
5. Klicke *Save* – nach wenigen Minuten ist die App unter  
   `https://<dein-username>.github.io/vocab-trainer/` erreichbar.

> ⚠️ Achte darauf, dass der Ordner `data/` mit hochgeladen wird.

---

## 💡 Lokale Entwicklung mit VS Code

1. Öffne den Ordner in VS Code.
2. Installiere die Extension **Live Server** (Ritwick Dey).
3. Rechtsklick auf `index.html` → *Open with Live Server*.
4. Die App öffnet sich unter `http://localhost:5500`.

Änderungen an `.js`- oder `.css`-Dateien werden sofort im Browser aktualisiert.

---

## 🔧 Anpassungen

| Was | Wo |
|-----|-----|
| Vokabeln ändern/ergänzen | `data/vocabularies.js` |
| Grammatikaufgaben | `data/grammar.js` |
| Farben & Schriften | `style.css` → CSS-Variablen am Anfang (`:root`) |
| Anzahl Paare im «Zuordnen»-Modus | `main.js` → `const ZUORDNEN_BATCH = 5` |
| Flashcard-Logik | `main.js` → Abschnitt 6 |
| Slot-Lern-Logik | `main.js` → Abschnitt 7 |
