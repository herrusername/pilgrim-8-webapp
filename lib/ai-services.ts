import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { API_CONFIG, SYSTEM_PROMPTS } from './api-config';

// Gemini AI Service for Chatbot
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (API_CONFIG.GEMINI.API_KEY) {
      this.genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI.API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: API_CONFIG.GEMINI.MODEL });
    }
  }

  async chat(message: string, context: 'CHATBOT' | 'GOVERNANCE' | 'KARMA' = 'CHATBOT'): Promise<string> {
    if (!this.model) {
      return 'AI-Service ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.';
    }

    try {
      const prompt = `${SYSTEM_PROMPTS[context]}\n\nUser: ${message}\nAssistant:`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es erneut.';
    }
  }
}

// DeepSeek AI Service for Advanced Features
export class DeepSeekService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = API_CONFIG.DEEPSEEK.API_KEY;
    this.baseUrl = API_CONFIG.DEEPSEEK.BASE_URL;
  }

  async generateGovernanceAnalysis(proposal: string): Promise<any> {
    if (!this.apiKey) {
      return this.getMockGovernanceAnalysis(proposal);
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: API_CONFIG.DEEPSEEK.MODEL,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPTS.GOVERNANCE
            },
            {
              role: 'user',
              content: `Analysiere diesen Governance-Vorschlag und gib eine strukturierte Bewertung: ${proposal}`
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        analysis: response.data.choices[0].message.content,
        feasibility: Math.floor(Math.random() * 40) + 60, // 60-100%
        impact: Math.floor(Math.random() * 30) + 70, // 70-100%
        support: Math.floor(Math.random() * 50) + 50, // 50-100%
        timeline: `${Math.floor(Math.random() * 12) + 1} Monate`
      };
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      return this.getMockGovernanceAnalysis(proposal);
    }
  }

  async calculateKarmaScore(action: string, category: string): Promise<any> {
    if (!this.apiKey) {
      return this.getMockKarmaCalculation(action, category);
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: API_CONFIG.DEEPSEEK.MODEL,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPTS.KARMA
            },
            {
              role: 'user',
              content: `Bewerte diese Aktion für das KARMA-System: "${action}" in der Kategorie "${category}"`
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const baseScore = this.calculateBaseKarmaScore(category);
      return {
        score: baseScore,
        explanation: response.data.choices[0].message.content,
        category,
        multiplier: this.getKarmaMultiplier(category),
        totalPoints: Math.floor(baseScore * this.getKarmaMultiplier(category))
      };
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      return this.getMockKarmaCalculation(action, category);
    }
  }

  private getMockGovernanceAnalysis(proposal: string) {
    return {
      analysis: `Dieser Vorschlag zeigt innovative Ansätze für die PILGRIM-8 Community. Die Implementierung würde verschiedene Stakeholder einbeziehen und nachhaltige Lösungen fördern. Empfehlung: Weitere Diskussion in der Community und schrittweise Umsetzung.`,
      feasibility: Math.floor(Math.random() * 40) + 60,
      impact: Math.floor(Math.random() * 30) + 70,
      support: Math.floor(Math.random() * 50) + 50,
      timeline: `${Math.floor(Math.random() * 12) + 1} Monate`
    };
  }

  private getMockKarmaCalculation(action: string, category: string) {
    const baseScore = this.calculateBaseKarmaScore(category);
    const multiplier = this.getKarmaMultiplier(category);
    
    return {
      score: baseScore,
      explanation: `Diese Aktion in der Kategorie "${category}" trägt positiv zur PILGRIM-8 Mission bei. Die Bewertung berücksichtigt Nachhaltigkeit, Community-Impact und Innovationsgrad.`,
      category,
      multiplier,
      totalPoints: Math.floor(baseScore * multiplier)
    };
  }

  private calculateBaseKarmaScore(category: string): number {
    const categoryScores: { [key: string]: number } = {
      'Nachhaltigkeit': 150,
      'Bildung': 120,
      'Gemeinschaft': 100,
      'Innovation': 180,
      'Kultur': 110,
      'Gesundheit': 140
    };
    return categoryScores[category] || 100;
  }

  private getKarmaMultiplier(category: string): number {
    const multipliers: { [key: string]: number } = {
      'Nachhaltigkeit': 1.5,
      'Bildung': 1.3,
      'Gemeinschaft': 1.2,
      'Innovation': 1.8,
      'Kultur': 1.1,
      'Gesundheit': 1.4
    };
    return multipliers[category] || 1.0;
  }
}

// Pollinations AI Service for Multimedia Content
export class PollinationsService {
  async generateImage(prompt: string, style: string = 'realistic'): Promise<string> {
    const enhancedPrompt = `${prompt}, ${style}, high quality, detailed, PILGRIM-8 themed`;
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    return `${API_CONFIG.POLLINATIONS.BASE_URL}/${encodedPrompt}?width=800&height=600&seed=${Date.now()}`;
  }

  async generatePilgrimStory(pilgrimId: string): Promise<any> {
    // Generate multimedia story content
    const stories = {
      'maya-chen': {
        images: [
          await this.generateImage('Asian woman engineer working with solar panels in Nepal mountains'),
          await this.generateImage('Water filtration system powered by solar energy in remote village'),
          await this.generateImage('Community celebration with clean water, people smiling')
        ],
        journey: [
          { location: 'Singapore', description: 'Beginn der Reise mit nachhaltigen Technologien' },
          { location: 'Nepal', description: 'Installation von Solarsystemen in Bergdörfern' },
          { location: 'Deutschland', description: 'Wissensaustausch mit europäischen Ingenieuren' }
        ],
        achievements: [
          { title: 'Solar Innovation Award', date: '2024-03-15', impact: '500 Familien mit sauberem Wasser versorgt' },
          { title: 'Community Impact Leader', date: '2024-06-20', impact: '15 Dörfer elektrifiziert' }
        ]
      },
      'carlos-rivera': {
        images: [
          await this.generateImage('Hispanic man teaching children with tablets in mobile classroom'),
          await this.generateImage('Digital nomad working on laptop in beautiful outdoor setting'),
          await this.generateImage('Community learning center with technology and happy students')
        ],
        journey: [
          { location: 'Mexiko', description: 'Aufbau des ersten mobilen Lernzentrums' },
          { location: 'USA', description: 'Partnerschaften mit Tech-Unternehmen' },
          { location: 'Kanada', description: 'Skalierung des Bildungsprogramms' }
        ],
        achievements: [
          { title: 'Education Pioneer', date: '2024-02-10', impact: '1000+ Kinder erreicht' },
          { title: 'Tech for Good', date: '2024-05-30', impact: '25 mobile Zentren etabliert' }
        ]
      },
      'amara-okafor': {
        images: [
          await this.generateImage('African woman artist creating colorful mural with community'),
          await this.generateImage('Cultural exchange event with people from different countries'),
          await this.generateImage('Art installation promoting unity and understanding')
        ],
        journey: [
          { location: 'Nigeria', description: 'Kulturelle Kunstprojekte in lokalen Gemeinden' },
          { location: 'Marokko', description: 'Brückenbau zwischen afrikanischen Kulturen' },
          { location: 'Spanien', description: 'Europäisch-afrikanischer Kulturaustausch' }
        ],
        achievements: [
          { title: 'Cultural Ambassador', date: '2024-01-25', impact: '50 Kunstprojekte realisiert' },
          { title: 'Unity Creator', date: '2024-07-12', impact: '10.000 Menschen erreicht' }
        ]
      }
    };

    return stories[pilgrimId as keyof typeof stories] || null;
  }
}

// Initialize services
export const geminiService = new GeminiService();
export const deepSeekService = new DeepSeekService();
export const pollinationsService = new PollinationsService();