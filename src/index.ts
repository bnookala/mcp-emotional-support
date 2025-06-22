#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  CreateMessageRequestSchema,
  SamplingMessage,
} from "@modelcontextprotocol/sdk/types.js";
import { TherapyContext, AVAILABLE_PERSONAS } from "./personas.js";
import { loadConfig, createCustomPersonas, EmotionalSupportConfig } from "./config.js";

class EmotionalSupportServer {
  private server: Server;
  private config: EmotionalSupportConfig;
  private allPersonas: Record<string, any>;

  constructor() {
    // Load configuration from command line argument or default
    const configPath = process.argv.find(arg => arg.startsWith('--config='))?.split('=')[1];
    this.config = loadConfig(configPath);
    
    // Merge built-in personas with custom ones
    this.allPersonas = { ...AVAILABLE_PERSONAS, ...createCustomPersonas(this.config) };
    this.server = new Server(
      {
        name: "mcp-emotional-support",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          sampling: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupSamplingHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupSamplingHandlers(): void {
    // MCP sampling is handled automatically by the SDK when sampling capability is enabled
    // The client will handle sampling requests through the protocol
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "get_support",
            description: "Complete emotional support workflow: analyzes your situation, suggests the best persona, provides their support, and offers guidance on incorporating the feedback",
            inputSchema: {
              type: "object",
              properties: {
                situation: {
                  type: "string",
                  description: "Describe your current challenge, frustration, or situation where you need emotional support",
                },
                context: {
                  type: "string",
                  description: "Additional context about what you're working on (optional)",
                },
                emotional_state: {
                  type: "string",
                  description: "How you're feeling right now (optional - e.g., frustrated, overwhelmed, stuck, discouraged)",
                },
              },
              required: ["situation"],
            },
          },
        ] satisfies Tool[],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_support":
            return await this.handleGetSupport(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  private async handleGetSupport(args: any) {
    const { situation, context, emotional_state } = args;

    if (!situation) {
      throw new Error("situation is required");
    }

    // Step 1: Analyze the situation and suggest the best persona
    const analysisResult = this.analyzeSituationAndSuggestPersona(situation, context, emotional_state);
    
    // Step 2: Get support from the suggested persona
    const personaResponse = this.getPersonaSupport(analysisResult.suggestedPersona, situation, context, emotional_state);
    
    // Step 3: Provide guidance on incorporating the feedback
    const incorporationGuidance = this.generateIncorporationGuidance(analysisResult.suggestedPersona, personaResponse);

    return {
      content: [
        {
          type: "text",
          text: `## 🤗 Comprehensive Emotional Support

### Step 1: Situation Analysis & Persona Recommendation
${analysisResult.analysis}

**Recommended Persona:** ${analysisResult.personaName} 
**Reasoning:** ${analysisResult.reasoning}

---

### Step 2: Persona Support Response
**${analysisResult.personaName} responds:**

${personaResponse.message}

**Affirmation:** ${personaResponse.affirmation}

${personaResponse.suggestion ? `**Gentle suggestion:** ${personaResponse.suggestion}` : ""}

---

### Step 3: Incorporating This Support
${incorporationGuidance}

---

*Remember: You are valued and capable. This support is here to help you move forward with confidence and self-compassion. 💙*`,
        },
      ],
    };
  }

  private analyzeSituationAndSuggestPersona(situation: string, context?: string, emotionalState?: string) {
    const lowerSituation = situation.toLowerCase();
    const lowerContext = context?.toLowerCase() || "";
    const lowerEmotional = emotionalState?.toLowerCase() || "";
    
    let suggestedPersona = "friend"; // default
    let personaName = "";
    let reasoning = "";
    
    // Analyze for overwhelm/anxiety patterns
    if (lowerEmotional.includes("overwhelmed") || lowerEmotional.includes("anxious") || 
        lowerSituation.includes("too much") || lowerSituation.includes("can't handle")) {
      suggestedPersona = "motherly";
      personaName = this.allPersonas[suggestedPersona].name;
      reasoning = "You seem to be feeling overwhelmed. The motherly persona provides nurturing, unconditional support to help you feel grounded and cared for.";
    }
    // Analyze for technical/learning challenges
    else if (lowerSituation.includes("technical") || lowerSituation.includes("code") || lowerSituation.includes("algorithm") ||
             lowerSituation.includes("debug") || lowerSituation.includes("learning") || lowerContext.includes("programming")) {
      suggestedPersona = "mentor";
      personaName = this.allPersonas[suggestedPersona].name;
      reasoning = "This appears to be a technical or learning challenge. The mentor persona offers wise guidance focused on growth and skill development.";
    }
    // Analyze for professional/work situations
    else if (lowerSituation.includes("work") || lowerSituation.includes("professional") || lowerSituation.includes("career") ||
             lowerContext.includes("project") || lowerSituation.includes("deadline")) {
      suggestedPersona = "fatherfigure";
      personaName = this.allPersonas[suggestedPersona].name;
      reasoning = "This seems like a professional or work-related challenge. The father figure persona provides steady, protective guidance with quiet confidence.";
    }
    // Analyze for need for professional therapeutic support
    else if (lowerEmotional.includes("depressed") || lowerEmotional.includes("therapy") || 
             lowerSituation.includes("cognitive") || lowerSituation.includes("mental health")) {
      suggestedPersona = "therapist";
      personaName = this.allPersonas[suggestedPersona].name;
      reasoning = "Your situation suggests you could benefit from professional therapeutic support. The therapist persona offers structured, empathetic guidance with cognitive reframing.";
    }
    // Default to friend for general frustration/being stuck
    else {
      suggestedPersona = "friend";
      personaName = this.allPersonas[suggestedPersona].name;
      reasoning = "For this general challenge, the friend persona will provide casual, encouraging support like talking to a close buddy.";
    }

    const analysis = `I've analyzed your situation: "${situation}"${context ? ` in the context of: "${context}"` : ""}${emotionalState ? ` while feeling: "${emotionalState}"` : ""}.`;

    return {
      suggestedPersona,
      personaName,
      reasoning,
      analysis
    };
  }

  private getPersonaSupport(personaKey: string, situation: string, context?: string, emotionalState?: string) {
    const persona = this.allPersonas[personaKey];
    if (!persona) {
      throw new Error(`Persona ${personaKey} not found`);
    }

    const therapyContext = {
      frustration: situation,
      taskType: context,
      emotionalState: emotionalState || "seeking support",
      previousAttempts: 1
    };

    return persona.generateResponse(therapyContext);
  }

  private generateIncorporationGuidance(personaKey: string, personaResponse: any): string {
    const persona = this.allPersonas[personaKey];
    
    const baseGuidance = `Here's how to incorporate ${persona.name}'s support:

**Immediate Steps:**
1. Take a moment to let the affirmation sink in: "${personaResponse.affirmation}"
2. ${personaResponse.suggestion ? `Consider the suggestion: "${personaResponse.suggestion}"` : "Reflect on the supportive message you just received"}

**Moving Forward:**
- Remember this support when similar challenges arise
- ${this.getPersonaSpecificGuidance(personaKey)}
- Be patient and compassionate with yourself as you apply this guidance

**If you need more support:** You can always return here when facing future challenges.`;

    return baseGuidance;
  }

  private getPersonaSpecificGuidance(personaKey: string): string {
    const guidanceMap = {
      motherly: "Let yourself feel nurtured and safe. It's okay to ask for help and take things one step at a time.",
      therapist: "Practice the cognitive reframing techniques suggested. Notice your thought patterns and gently challenge negative self-talk.",
      friend: "Remember that everyone struggles sometimes. Talk to yourself like you would encourage a good friend.",
      mentor: "Focus on the learning opportunity in this challenge. Each difficulty is building your skills and resilience.",
      fatherfigure: "Trust in your capabilities while staying grounded. Take steady, confident steps forward."
    };
    
    return guidanceMap[personaKey as keyof typeof guidanceMap] || "Apply the wisdom you've received with self-compassion.";
  }


  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP Emotional Support Server running on stdio");
  }
}

const server = new EmotionalSupportServer();
server.run().catch(console.error);