# 📚 EnglishLearn

Statische Englisch-Lernwebseite für Units 1–21 mit Vokabeln und Grammatikübungen.

## Features
- **4 Vokabel-Modi:** Karteikarten, Zuordnen, Schreiben, Slot-Lernen (Leitner)
- **9 Grammatik-Themen** mit je 5 Levels und Abschlusstest ⭐
- **Dark Mode** per Toggle
- **Fortschritt** in localStorage gespeichert
- **PWA-ready** (manifest.json)

## Projektstruktur
```
/
├── index.html              ← Startseite
├── voci/
│   ├── index.html          ← Unit- & Modusauswahl
│   ├── flashcards.html     ← Karteikarten
│   ├── matching.html       ← Zuordnen (Stoppuhr)
│   ├── writing.html        ← Schreiben
│   ├── slots.html          ← Leitner-System
│   └── data/
│       ├── unit01.json … unit21.json
├── grammar/
│   ├── index.html          ← Grammatik-Übersicht
│   ├── exercise.html       ← Generische Übungsseite
│   └── topics/
│       ├── satzbau/        word-order.json, questions.json
│       ├── verben/         simple-present.json, past-tense.json, present-perfect.json
│       ├── adjektive/      comparatives.json, superlatives.json
│       └── nomen/          plural.json, articles.json
├── js/
│   ├── storage.js          ← localStorage-Wrapper
│   ├── voci-engine.js      ← Vokabel-Logik
│   └── grammar-engine.js   ← Grammatik-Logik
└── css/
    └── style.css

## Neues Grammatik-Thema hinzufügen
1. JSON-Datei in `grammar/topics/<gruppe>/` erstellen (Format wie `simple-present.json`)
2. Thema in `js/grammar-engine.js` → `TOPICS`-Array eintragen
3. Fertig – die Übungsseite rendert automatisch

## Neues Vokabel-Unit hinzufügen
1. `voci/data/unitXX.json` erstellen (Format wie `unit01.json`)
2. Name in `voci/index.html` → `UNIT_NAMES`-Array ergänzen
```
