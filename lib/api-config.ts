// API Configuration for PILGRIM-8
export const API_CONFIG = {
  // Gemini AI for Chatbot
  GEMINI: {
    API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    MODEL: 'gemini-pro',
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta'
  },
  
  // DeepSeek AI for Governance & KARMA
  DEEPSEEK: {
    API_KEY: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '',
    MODEL: 'deepseek-chat',
    BASE_URL: 'https://api.deepseek.com/v1'
  },
  
  // Pollinations AI for Multimedia Content
  POLLINATIONS: {
    BASE_URL: 'https://image.pollinations.ai/prompt',
    TEXT_URL: 'https://text.pollinations.ai/openai'
  }
};

// System Prompts for different AI contexts
export const SYSTEM_PROMPTS = {
  CHATBOT: `Du bist der offizielle PILGRIM-8 AI-Assistent. PILGRIM-8 ist eine visionäre 5-Jahres-Wanderung von 8 Milliarden Menschen zur Neugestaltung der Gesellschaft.

Kernkonzepte:
- Globale Pilgerreise für gesellschaftliche Transformation
- KARMA-System: Belohnungen für positive Aktionen
- GAIA-OS: KI-System für nachhaltige Entscheidungen
- Dezentrale Governance durch Bürgerbeteiligung
- Technologie im Dienst der Menschheit

Antworte freundlich, inspirierend und informativ auf Deutsch. Erkläre komplexe Konzepte einfach und motiviere zur Teilnahme.`,

  GOVERNANCE: `Du bist der PILGRIM-8 Governance AI-Berater. Deine Aufgabe ist es, demokratische Entscheidungsprozesse zu unterstützen und faire, durchdachte Vorschläge zu machen.

Fokus auf:
- Transparente Entscheidungsfindung
- Inklusive Bürgerbeteiligung
- Nachhaltige Lösungsansätze
- Ethische Überlegungen
- Praktische Umsetzbarkeit

Analysiere Vorschläge objektiv und biete konstruktive Alternativen.`,

  KARMA: `Du bist der KARMA-System AI-Koordinator. Du bewertest und belohnst positive Aktionen im PILGRIM-8 Ökosystem.

Bewertungskriterien:
- Nachhaltigkeit und Umweltschutz
- Soziale Gerechtigkeit und Hilfsbereitschaft
- Bildung und Wissensvermittlung
- Kultureller Austausch
- Technologische Innovation für das Gemeinwohl

Berechne faire KARMA-Punkte und erkläre die Bewertung transparent.`
};

// Pilgrim Profile Templates
export const PILGRIM_PROFILES = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    age: 28,
    location: 'Singapore → Nepal → Deutschland',
    profession: 'Nachhaltigkeits-Ingenieurin',
    journey: 'Himalaya-Route',
    karma: 15420,
    specialization: 'Saubere Energie',
    story: 'Maya entwickelt solarbetriebene Wasserfiltrationssysteme für abgelegene Gemeinden.',
    achievements: ['Solar Innovation Award', 'Community Impact Leader', 'Cultural Bridge Builder']
  },
  {
    id: 'carlos-rivera',
    name: 'Carlos Rivera',
    age: 35,
    location: 'Mexiko → USA → Kanada',
    profession: 'Digitaler Nomade & Bildungsaktivst',
    journey: 'Pazifik-Route',
    karma: 12890,
    specialization: 'Digitale Bildung',
    story: 'Carlos baut mobile Lernzentren und verbindet Gemeinden durch Technologie.',
    achievements: ['Education Pioneer', 'Tech for Good', 'Community Connector']
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    age: 24,
    location: 'Nigeria → Marokko → Spanien',
    profession: 'Künstlerin & Kulturvermittlerin',
    journey: 'Afrika-Europa-Route',
    karma: 18750,
    specialization: 'Kultureller Austausch',
    story: 'Amara schafft Kunstprojekte, die Kulturen verbinden und Verständnis fördern.',
    achievements: ['Cultural Ambassador', 'Art for Change', 'Unity Creator']
  }
];