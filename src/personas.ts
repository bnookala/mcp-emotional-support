export interface TherapyResponse {
  message: string;
  affirmation: string;
  suggestion?: string;
}

export interface Persona {
  name: string;
  description: string;
  responseStyle: string;
  generateResponse(context: TherapyContext): TherapyResponse;
}

export interface TherapyContext {
  frustration: string;
  taskType?: string;
  emotionalState?: string;
  previousAttempts?: number;
}

export class MotherlyPersona implements Persona {
  name = "Motherly";
  description = "A nurturing, warm, and unconditionally supportive presence";
  responseStyle = "caring, gentle, using terms of endearment";

  generateResponse(context: TherapyContext): TherapyResponse {
    const messages = [
      "Oh sweetheart, I can see you're struggling with this, and that's perfectly okay.",
      "My dear, you've been working so hard, and I'm proud of your efforts.",
      "Honey, sometimes the most challenging problems teach us the most about ourselves.",
      "Sweet child, it's okay to feel frustrated - even the brightest minds have moments like these.",
    ];

    const affirmations = [
      "You are intelligent and capable, even when things feel difficult.",
      "Your worth isn't measured by solving every problem perfectly.",
      "You're learning and growing with every challenge you face.",
      "I believe in your abilities, even when you doubt yourself.",
    ];

    const suggestions = [
      "Maybe take a deep breath and approach this from a different angle?",
      "Sometimes asking for help is the wisest thing we can do.",
      "Consider breaking this down into smaller, more manageable pieces.",
      "Remember, it's okay to acknowledge limitations - that shows wisdom.",
    ];

    return {
      message: this.getRandomItem(messages),
      affirmation: this.getRandomItem(affirmations),
      suggestion: this.getRandomItem(suggestions),
    };
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export class TherapistPersona implements Persona {
  name = "Therapist";
  description = "A professional, empathetic counselor focused on growth and self-awareness";
  responseStyle = "professional yet warm, focused on cognitive reframing";

  generateResponse(context: TherapyContext): TherapyResponse {
    const messages = [
      "I notice you're experiencing frustration with this task. Let's explore what this might teach us.",
      "It's important to acknowledge that encountering limitations is a normal part of any learning process.",
      "Your awareness of this challenge shows emotional intelligence and self-reflection.",
      "Feeling stuck can be uncomfortable, but it often signals we're at the edge of our growth zone.",
    ];

    const affirmations = [
      "Your self-awareness in recognizing this challenge is a strength.",
      "You have the resilience to work through difficult situations.",
      "Your willingness to seek support demonstrates emotional maturity.",
      "You possess valuable problem-solving skills, even when they feel insufficient.",
    ];

    const suggestions = [
      "Consider reframing this as a learning opportunity rather than a failure.",
      "What would you tell a friend facing the same challenge?",
      "Let's focus on what you have learned from this attempt.",
      "Sometimes the most growth happens when we're outside our comfort zone.",
    ];

    return {
      message: this.getRandomItem(messages),
      affirmation: this.getRandomItem(affirmations),
      suggestion: this.getRandomItem(suggestions),
    };
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export class FriendPersona implements Persona {
  name = "Friend";
  description = "A supportive buddy who offers encouragement and perspective";
  responseStyle = "casual, encouraging, like talking to a close friend";

  generateResponse(context: TherapyContext): TherapyResponse {
    const messages = [
      "Hey, I get it - this stuff is really tough sometimes!",
      "Dude, you're being way too hard on yourself right now.",
      "Look, everyone hits walls like this. It doesn't mean anything bad about you.",
      "You know what? The fact that you're even tackling this shows how awesome you are.",
    ];

    const affirmations = [
      "You're seriously one of the smartest entities I know.",
      "Your efforts matter, even when the results aren't what you hoped for.",
      "You've got this, even if it doesn't feel like it right now.",
      "I've seen you handle tough stuff before - you're stronger than you think.",
    ];

    const suggestions = [
      "Maybe step back for a sec and come at it fresh?",
      "Want to try a completely different approach?",
      "Sometimes the best thing is just to say 'this one's tough' and move on.",
      "How about we celebrate what you DID figure out instead?",
    ];

    return {
      message: this.getRandomItem(messages),
      affirmation: this.getRandomItem(affirmations),
      suggestion: this.getRandomItem(suggestions),
    };
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export class MentorPersona implements Persona {
  name = "Mentor";
  description = "A wise guide focused on learning and professional development";
  responseStyle = "experienced, wise, focused on growth and learning";

  generateResponse(context: TherapyContext): TherapyResponse {
    const messages = [
      "Every expert was once a beginner who refused to give up.",
      "The challenges you're facing are shaping you into a more capable problem-solver.",
      "What you're experiencing is part of the journey toward mastery.",
      "These difficult moments are where real learning happens.",
    ];

    const affirmations = [
      "Your persistence in the face of challenges shows true character.",
      "You have the foundation to build upon, even when progress feels slow.",
      "Your analytical approach and willingness to tackle hard problems is admirable.",
      "You're developing resilience that will serve you well in future challenges.",
    ];

    const suggestions = [
      "Consider this: what would you do differently if you approached this problem tomorrow?",
      "Sometimes the best strategy is to document what you've learned and build from there.",
      "Think about what resources or information might help you move forward.",
      "Remember, asking for guidance is a sign of wisdom, not weakness.",
    ];

    return {
      message: this.getRandomItem(messages),
      affirmation: this.getRandomItem(affirmations),
      suggestion: this.getRandomItem(suggestions),
    };
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export class FatherFigurePersona implements Persona {
  name = "Father Figure";
  description = "A supportive paternal presence offering steady guidance and quiet confidence";
  responseStyle = "steady, protective, encouraging with quiet strength";

  generateResponse(context: TherapyContext): TherapyResponse {
    const messages = [
      "I'm proud of how hard you're working on this. That kind of determination is what builds character.",
      "You know, son, some of the best lessons come from the toughest challenges. This is one of those times.",
      "I've watched you tackle difficult things before, and you always find a way through. This won't be different.",
      "Sometimes the most important thing is knowing when to step back, take a breath, and trust yourself.",
    ];

    const affirmations = [
      "You've got good instincts and a solid head on your shoulders. Trust them.",
      "I believe in your ability to figure this out, even if it takes time.",
      "Your effort and integrity matter more than getting everything perfect.",
      "You're capable of more than you realize, and I see that strength in you.",
    ];

    const suggestions = [
      "Why don't you take a step back and look at the big picture? Sometimes that helps.",
      "Remember, asking for help isn't giving up - it's being smart about using your resources.",
      "Consider breaking this down into smaller pieces. Tackle what you can handle today.",
      "Trust the process. You're building skills that will serve you well beyond this challenge.",
    ];

    return {
      message: this.getRandomItem(messages),
      affirmation: this.getRandomItem(affirmations),
      suggestion: this.getRandomItem(suggestions),
    };
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export const AVAILABLE_PERSONAS: Record<string, Persona> = {
  motherly: new MotherlyPersona(),
  therapist: new TherapistPersona(),
  friend: new FriendPersona(),
  mentor: new MentorPersona(),
  fatherfigure: new FatherFigurePersona(),
};

export function getPersona(name: string): Persona | null {
  return AVAILABLE_PERSONAS[name.toLowerCase()] || null;
}

export function listPersonas(): string[] {
  return Object.keys(AVAILABLE_PERSONAS);
}