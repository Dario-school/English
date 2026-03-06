/**
 * ============================================================
 *  VOKABELN – ALLE UNITS
 * ============================================================
 *  So fügst du neue Units hinzu oder passt Wörter an:
 *
 *  1. Kopiere ein bestehendes Unit-Objekt als Vorlage.
 *  2. Passe die Nummer (z.B. 17), den Titel und das words-Array an.
 *  3. Jedes Wort ist ein Objekt: { en: "englisches Wort", de: "deutsche Übersetzung" }
 *  4. Es gibt keine Begrenzung für die Anzahl der Wörter pro Unit.
 *
 *  BEISPIEL:
 *  17: {
 *    title: "Unit 17 – Mein Thema",
 *    words: [
 *      { en: "apple",  de: "Apfel" },
 *      { en: "banana", de: "Banane" },
 *    ]
 *  }
 * ============================================================
 */

const VOCABULARIES = {

  // ── UNIT 1 ──────────────────────────────────────────────────
  // TODO: Ersetze diese Platzhalter-Wörter durch die echten Unit-1-Vokabeln.
  1: {
    title: "Unit 1",
    words: [
      { en: "hello",        de: "Hallo" },
      { en: "goodbye",      de: "Auf Wiedersehen" },
      { en: "please",       de: "Bitte" },
      { en: "thank you",    de: "Danke" },
      { en: "yes",          de: "Ja" },
      { en: "no",           de: "Nein" },
      { en: "excuse me",    de: "Entschuldigung" },
      { en: "sorry",        de: "Es tut mir leid" },
    ]
  },

  // ── UNIT 2 ──────────────────────────────────────────────────
  2: {
    title: "Unit 2",
    words: [
      { en: "school",       de: "Schule" },
      { en: "teacher",      de: "Lehrer/-in" },
      { en: "student",      de: "Schüler/-in" },
      { en: "book",         de: "Buch" },
      { en: "pencil",       de: "Bleistift" },
      { en: "classroom",    de: "Klassenzimmer" },
      { en: "homework",     de: "Hausaufgaben" },
      { en: "lesson",       de: "Unterrichtsstunde" },
    ]
  },

  // ── UNIT 3 ──────────────────────────────────────────────────
  3: {
    title: "Unit 3",
    words: [
      { en: "family",       de: "Familie" },
      { en: "mother",       de: "Mutter" },
      { en: "father",       de: "Vater" },
      { en: "sister",       de: "Schwester" },
      { en: "brother",      de: "Bruder" },
      { en: "grandparents", de: "Grosseltern" },
      { en: "aunt",         de: "Tante" },
      { en: "uncle",        de: "Onkel" },
    ]
  },

  // ── UNIT 4 ──────────────────────────────────────────────────
  4: {
    title: "Unit 4",
    words: [
      { en: "Monday",       de: "Montag" },
      { en: "Tuesday",      de: "Dienstag" },
      { en: "Wednesday",    de: "Mittwoch" },
      { en: "Thursday",     de: "Donnerstag" },
      { en: "Friday",       de: "Freitag" },
      { en: "Saturday",     de: "Samstag" },
      { en: "Sunday",       de: "Sonntag" },
      { en: "weekend",      de: "Wochenende" },
    ]
  },

  // ── UNIT 5 ──────────────────────────────────────────────────
  5: {
    title: "Unit 5",
    words: [
      { en: "eat",          de: "essen" },
      { en: "drink",        de: "trinken" },
      { en: "sleep",        de: "schlafen" },
      { en: "run",          de: "rennen" },
      { en: "walk",         de: "gehen, laufen" },
      { en: "read",         de: "lesen" },
      { en: "write",        de: "schreiben" },
      { en: "listen",       de: "zuhören" },
    ]
  },

  // ── UNIT 6 ──────────────────────────────────────────────────
  6: {
    title: "Unit 6",
    words: [
      { en: "red",          de: "rot" },
      { en: "blue",         de: "blau" },
      { en: "green",        de: "grün" },
      { en: "yellow",       de: "gelb" },
      { en: "black",        de: "schwarz" },
      { en: "white",        de: "weiss" },
      { en: "purple",       de: "lila, violett" },
      { en: "orange",       de: "orange" },
    ]
  },

  // ── UNIT 7 ──────────────────────────────────────────────────
  7: {
    title: "Unit 7",
    words: [
      { en: "house",        de: "Haus" },
      { en: "kitchen",      de: "Küche" },
      { en: "bedroom",      de: "Schlafzimmer" },
      { en: "bathroom",     de: "Badezimmer" },
      { en: "living room",  de: "Wohnzimmer" },
      { en: "garden",       de: "Garten" },
      { en: "door",         de: "Tür" },
      { en: "window",       de: "Fenster" },
    ]
  },

  // ── UNIT 8 ──────────────────────────────────────────────────
  8: {
    title: "Unit 8",
    words: [
      { en: "food",         de: "Essen, Nahrung" },
      { en: "breakfast",    de: "Frühstück" },
      { en: "lunch",        de: "Mittagessen" },
      { en: "dinner",       de: "Abendessen" },
      { en: "hungry",       de: "hungrig" },
      { en: "thirsty",      de: "durstig" },
      { en: "delicious",    de: "lecker" },
      { en: "vegetable",    de: "Gemüse" },
    ]
  },

  // ── UNIT 9 ──────────────────────────────────────────────────
  9: {
    title: "Unit 9",
    words: [
      { en: "sport",        de: "Sport" },
      { en: "football",     de: "Fussball" },
      { en: "swimming",     de: "Schwimmen" },
      { en: "basketball",   de: "Basketball" },
      { en: "tennis",       de: "Tennis" },
      { en: "cycling",      de: "Radfahren" },
      { en: "win",          de: "gewinnen" },
      { en: "lose",         de: "verlieren" },
    ]
  },

  // ── UNIT 10 ─────────────────────────────────────────────────
  10: {
    title: "Unit 10",
    words: [
      { en: "weather",      de: "Wetter" },
      { en: "sunny",        de: "sonnig" },
      { en: "cloudy",       de: "bewölkt" },
      { en: "rainy",        de: "regnerisch" },
      { en: "windy",        de: "windig" },
      { en: "hot",          de: "heiss" },
      { en: "cold",         de: "kalt" },
      { en: "temperature",  de: "Temperatur" },
    ]
  },

  // ── UNIT 11 ─────────────────────────────────────────────────
  11: {
    title: "Unit 11",
    words: [
      { en: "travel",       de: "reisen" },
      { en: "airport",      de: "Flughafen" },
      { en: "passport",     de: "Pass, Reisepass" },
      { en: "suitcase",     de: "Koffer" },
      { en: "hotel",        de: "Hotel" },
      { en: "ticket",       de: "Fahrkarte, Ticket" },
      { en: "journey",      de: "Reise" },
      { en: "destination",  de: "Reiseziel" },
    ]
  },

  // ── UNIT 12 ─────────────────────────────────────────────────
  12: {
    title: "Unit 12",
    words: [
      { en: "music",        de: "Musik" },
      { en: "sing",         de: "singen" },
      { en: "dance",        de: "tanzen" },
      { en: "concert",      de: "Konzert" },
      { en: "band",         de: "Band" },
      { en: "song",         de: "Lied" },
      { en: "instrument",   de: "Instrument" },
      { en: "loud",         de: "laut" },
    ]
  },

  // ── UNIT 13 ─────────────────────────────────────────────────
  13: {
    title: "Unit 13",
    words: [
      { en: "nature",       de: "Natur" },
      { en: "forest",       de: "Wald" },
      { en: "river",        de: "Fluss" },
      { en: "mountain",     de: "Berg" },
      { en: "ocean",        de: "Ozean, Meer" },
      { en: "animal",       de: "Tier" },
      { en: "plant",        de: "Pflanze" },
      { en: "environment",  de: "Umwelt" },
    ]
  },

  // ── UNIT 14 ─────────────────────────────────────────────────
  14: {
    title: "Unit 14",
    words: [
      { en: "technology",   de: "Technologie" },
      { en: "computer",     de: "Computer" },
      { en: "internet",     de: "Internet" },
      { en: "phone",        de: "Telefon, Handy" },
      { en: "message",      de: "Nachricht" },
      { en: "website",      de: "Webseite" },
      { en: "download",     de: "herunterladen" },
      { en: "password",     de: "Passwort" },
    ]
  },

  // ── UNIT 15 ─────────────────────────────────────────────────
  15: {
    title: "Unit 15",
    words: [
      { en: "health",       de: "Gesundheit" },
      { en: "doctor",       de: "Arzt / Ärztin" },
      { en: "hospital",     de: "Krankenhaus" },
      { en: "medicine",     de: "Medizin, Medikament" },
      { en: "headache",     de: "Kopfschmerzen" },
      { en: "tired",        de: "müde" },
      { en: "rest",         de: "sich ausruhen, Ruhe" },
      { en: "exercise",     de: "Sport treiben, Übung" },
    ]
  },

  // ── UNIT 16 – DOWN FIFTH AVENUE ─────────────────────────────
  // Vollständig aus dem Lehrmittel (OW3, Unit 16)
  16: {
    title: "Unit 16 – Down Fifth Avenue",
    words: [
      // Keywords
      { en: "avenue",                 de: "Avenue, Boulevard" },
      { en: "comment",                de: "Bemerkung" },
      { en: "deli",                   de: "Delikatessengeschäft" },
      { en: "downside",               de: "Kehrseite" },
      { en: "famous",                 de: "berühmt" },
      { en: "follow-up question",     de: "Anschlussfrage, Folgefrage" },
      { en: "intersection (AmE)",     de: "Kreuzung (AmE)" },
      { en: "sight",                  de: "Anblick, Sehenswürdigkeit" },
      { en: "Statue of Liberty",      de: "Freiheitsstatue" },
      { en: "subway (AmE)",           de: "U-Bahn (AmE)" },
      // Out and about in NYC
      { en: "bench",                  de: "Bank" },
      { en: "cab",                    de: "Taxi" },
      { en: "circular",               de: "(kreis)rund" },
      { en: "down",                   de: "hier: hinunter" },
      { en: "dozen",                  de: "Dutzend" },
      { en: "feature",                de: "Merkmal" },
      { en: "first impression",       de: "erster Eindruck" },
      { en: "freedom",                de: "Freiheit" },
      { en: "get off",                de: "aussteigen" },
      { en: "government",             de: "Regierung" },
      { en: "impressed",              de: "beeindruckt" },
      { en: "impressive",             de: "beeindruckend" },
      { en: "literally",              de: "buchstäblich" },
      { en: "lose track of time",     de: "die Zeit aus den Augen verlieren" },
      { en: "matter",                 de: "von Bedeutung sein" },
      { en: "open to the public",     de: "für die Öffentlichkeit zugänglich" },
      { en: "place",                  de: "Ort" },
      { en: "post",                   de: "hier: Eintrag (auf einem Internet-Forum)" },
      { en: "present",                de: "Geschenk" },
      { en: "probably",               de: "wahrscheinlich" },
      { en: "shoot",                  de: "hier: filmen, drehen" },
      { en: "speechless",             de: "sprachlos" },
      { en: "station",                de: "Bahnhof, U-Bahnstation" },
      { en: "straight",               de: "gerade" },
      { en: "tall",                   de: "gross, hoch" },
      { en: "theatre",                de: "Theater" },
      { en: "USA",                    de: "USA (Vereinigte Staaten von Amerika)" },
      { en: "while",                  de: "während" },
      { en: "you name it",            de: "was auch immer" },
      // City living
      { en: "address",                de: "Adresse" },
      { en: "apartment (AmE)",        de: "Wohnung (AmE)" },
      { en: "attraction",             de: "hier: Attraktion" },
      { en: "bank",                   de: "Bank" },
      { en: "bank clerk",             de: "Bankangestellte/-r" },
      { en: "check (AmE)",            de: "Rechnung (AmE)" },
      { en: "city living",            de: "Stadtleben, Wohnen in der Stadt" },
      { en: "colourful / colorful",   de: "farbenfroh, farbig" },
      { en: "downtown (AmE)",         de: "in der Innenstadt, im Stadtzentrum (AmE)" },
      { en: "drive someone crazy",    de: "jemanden zum Wahnsinn treiben" },
      { en: "exchange visit",         de: "Austauschbesuch" },
      { en: "fake",                   de: "Fälschung" },
      { en: "goods",                  de: "Güter" },
      { en: "honestly",               de: "ehrlich" },
      { en: "in my opinion",          de: "meiner Meinung nach" },
      { en: "interviewer",            de: "Interviewer/-in" },
      { en: "jogging",                de: "Joggen, Jogging" },
      { en: "keep going",             de: "am Laufen halten" },
      { en: "love",                   de: "lieben" },
      { en: "on time",                de: "pünktlich" },
      { en: "opera",                  de: "Oper" },
      { en: "resident",               de: "Bewohner/-in" },
      { en: "sidewalk (AmE)",         de: "Trottoir, Gehweg (AmE)" },
      { en: "syllable",               de: "Silbe" },
      { en: "trendy",                 de: "trendy, modisch" },
      { en: "worry about",            de: "sich Sorgen machen um" },
      // AmE / BrE
      { en: "car park (BrE)",         de: "Parkplatz (BrE)" },
      { en: "dustbin (BrE)",          de: "Abfalleimer (BrE)" },
      { en: "first floor (AmE)",      de: "Erdgeschoss (AmE)" },
      { en: "garbage can (AmE)",      de: "Abfalleimer (AmE)" },
      { en: "gas (AmE)",              de: "Benzin (AmE)" },
      { en: "ground floor (BrE)",     de: "Erdgeschoss (BrE)" },
      { en: "highway (AmE)",          de: "Autobahn (AmE)" },
      { en: "lorry (BrE)",            de: "Lastwagen (BrE)" },
      { en: "motorway (BrE)",         de: "Autobahn (BrE)" },
      { en: "parking lot (AmE)",      de: "Parkplatz (AmE)" },
      { en: "petrol (BrE)",           de: "Benzin (BrE)" },
      { en: "railroad (AmE)",         de: "Eisenbahn (AmE)" },
      { en: "silent",                 de: "hier: stumm" },
      { en: "truck (AmE)",            de: "Lastwagen (AmE)" },
      { en: "yard (AmE)",             de: "Hof, Garten (AmE)" },
      // Focus
      { en: "crazy",                  de: "verrückt" },
      { en: "emergency",              de: "Notfall" },
      { en: "illegal",                de: "ungesetzlich, illegal" },
      { en: "surprising",             de: "überraschend, erstaunlich" },
      { en: "underground",            de: "unterirdisch, unter der Erde" },
    ]
  },

  // ── UNIT 17 ─────────────────────────────────────────────────
  // TODO: Ersetze diese Platzhalter-Wörter durch die echten Unit-17-Vokabeln.
  17: {
    title: "Unit 17",
    words: [
      { en: "shopping",     de: "Einkaufen" },
      { en: "price",        de: "Preis" },
      { en: "cheap",        de: "günstig, billig" },
      { en: "expensive",    de: "teuer" },
      { en: "buy",          de: "kaufen" },
      { en: "sell",         de: "verkaufen" },
      { en: "customer",     de: "Kunde / Kundin" },
      { en: "receipt",      de: "Quittung" },
    ]
  },

  // ── UNIT 18 ─────────────────────────────────────────────────
  18: {
    title: "Unit 18",
    words: [
      { en: "future",       de: "Zukunft" },
      { en: "dream",        de: "Traum, träumen" },
      { en: "ambition",     de: "Ehrgeiz, Ziel" },
      { en: "plan",         de: "Plan, planen" },
      { en: "career",       de: "Karriere, Beruf" },
      { en: "university",   de: "Universität" },
      { en: "job",          de: "Job, Stelle" },
      { en: "successful",   de: "erfolgreich" },
    ]
  },

  // ── UNIT 19 ─────────────────────────────────────────────────
  19: {
    title: "Unit 19",
    words: [
      { en: "culture",      de: "Kultur" },
      { en: "tradition",    de: "Tradition" },
      { en: "festival",     de: "Festival, Fest" },
      { en: "celebrate",    de: "feiern" },
      { en: "custom",       de: "Brauch, Gewohnheit" },
      { en: "language",     de: "Sprache" },
      { en: "religion",     de: "Religion" },
      { en: "belief",       de: "Glaube, Überzeugung" },
    ]
  },

  // ── UNIT 20 ─────────────────────────────────────────────────
  20: {
    title: "Unit 20",
    words: [
      { en: "media",        de: "Medien" },
      { en: "news",         de: "Nachrichten" },
      { en: "article",      de: "Artikel" },
      { en: "opinion",      de: "Meinung" },
      { en: "report",       de: "Bericht" },
      { en: "journalist",   de: "Journalist/-in" },
      { en: "headline",     de: "Schlagzeile" },
      { en: "social media", de: "soziale Medien" },
    ]
  },

  // ── UNIT 21 ─────────────────────────────────────────────────
  21: {
    title: "Unit 21",
    words: [
      { en: "global",       de: "global, weltweit" },
      { en: "climate",      de: "Klima" },
      { en: "pollution",    de: "Verschmutzung" },
      { en: "recycle",      de: "recyceln" },
      { en: "renewable",    de: "erneuerbar" },
      { en: "protect",      de: "schützen" },
      { en: "challenge",    de: "Herausforderung" },
      { en: "solution",     de: "Lösung" },
    ]
  },

};
