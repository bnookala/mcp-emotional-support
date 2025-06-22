import { readFileSync } from 'fs';
import { Persona, TherapyContext, TherapyResponse } from './personas.js';

export interface PersonaConfig {
  name: string;
  description: string;
  responseStyle: string;
  messages: string[];
  affirmations: string[];
  suggestions?: string[];
}

export interface EmotionalSupportConfig {
  customPersonas?: PersonaConfig[];
  defaultPersona?: string;
  responseVariation?: boolean; // Add randomness to responses
}

export class CustomPersona implements Persona {
  name: string;
  description: string;
  responseStyle: string;
  private messages: string[];
  private affirmations: string[];
  private suggestions: string[];

  constructor(config: PersonaConfig) {
    this.name = config.name;
    this.description = config.description;
    this.responseStyle = config.responseStyle;
    this.messages = config.messages;
    this.affirmations = config.affirmations;
    this.suggestions = config.suggestions || [];
  }

  generateResponse(context: TherapyContext): TherapyResponse {
    return {
      message: this.getRandomItem(this.messages),
      affirmation: this.getRandomItem(this.affirmations),
      suggestion: this.suggestions.length > 0 ? this.getRandomItem(this.suggestions) : undefined,
    };
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export function loadConfig(configPath?: string): EmotionalSupportConfig {
  if (!configPath) {
    return {};
  }

  try {
    const configContent = readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    console.error(`Failed to load config from ${configPath}:`, error);
    return {};
  }
}

export function createCustomPersonas(config: EmotionalSupportConfig): Record<string, Persona> {
  const customPersonas: Record<string, Persona> = {};
  
  if (config.customPersonas) {
    for (const personaConfig of config.customPersonas) {
      const key = personaConfig.name.toLowerCase().replace(/\s+/g, '_');
      customPersonas[key] = new CustomPersona(personaConfig);
    }
  }
  
  return customPersonas;
}

// Example config structure
export const EXAMPLE_CONFIG: EmotionalSupportConfig = {
  defaultPersona: "therapist",
  responseVariation: true,
  customPersonas: [
    {
      name: "Wise Owl",
      description: "An ancient, wise presence that offers perspective from experience",
      responseStyle: "thoughtful, philosophical, with gentle wisdom",
      messages: [
        "In my many years of observation, I've seen that even the mightiest trees bend in the wind rather than break.",
        "Young one, the path of learning is not always straight, and that is precisely what makes it valuable.",
        "What appears as a dead end often reveals itself to be a hidden doorway to understanding.",
      ],
      affirmations: [
        "Your curiosity and willingness to learn are gifts that will serve you throughout your journey.",
        "Wisdom comes not from never falling, but from learning to rise each time with greater understanding.",
        "You possess an inner strength that grows stronger with each challenge you face.",
      ],
      suggestions: [
        "Perhaps this moment of pause is an opportunity to reflect on what you've already learned.",
        "Consider that sometimes the most profound insights come when we stop trying so hard to force solutions.",
        "Trust in the process - growth happens in its own time, not always according to our schedule.",
      ]
    },
    {
      name: "Cheerleader",
      description: "An enthusiastic supporter who celebrates every effort",
      responseStyle: "energetic, positive, celebrating small wins",
      messages: [
        "Wow! Look at you tackling this challenge head-on! That takes real courage!",
        "I am SO impressed by your determination and effort - you're absolutely crushing it!",
        "This is exactly the kind of challenge that makes you stronger and more amazing!",
      ],
      affirmations: [
        "You are INCREDIBLE and don't let anyone (including yourself) tell you otherwise!",
        "Every single attempt you make is proof of your awesomeness!",
        "You've got the heart of a champion and the mind of a genius!",
      ],
      suggestions: [
        "You know what? You've already won just by trying - now let's see what other amazing things you can do!",
        "Take a victory lap for getting this far, then come back and show this problem who's boss!",
        "Remember: you're not just solving a problem, you're becoming even more awesome in the process!",
      ]
    }
  ]
};