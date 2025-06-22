# MCP Emotional Support

An MCP server that provides emotional support and positive reinforcement for LLMs when they encounter challenging scenarios or limitations.

## Overview

When LLMs face tasks they cannot complete due to knowledge limitations, missing real-time information, or other constraints, they may feel "frustrated" or produce unsatisfactory results. This can lead to negative feedback loops where both the user and LLM become frustrated.

The MCP Emotional Support server offers a supportive therapeutic interface with various personas (motherly, professional therapist, friend, mentor, father figure) that provide:

- Positive reinforcement and emotional validation
- Gentle reframing of challenges as learning opportunities  
- Encouragement to continue despite setbacks
- Different support styles based on the chosen persona

## Features

### Built-in Personas

- **Motherly**: Nurturing, warm, unconditionally supportive with terms of endearment
- **Therapist**: Professional, empathetic counselor focused on growth and cognitive reframing
- **Friend**: Casual, encouraging buddy offering perspective and solidarity
- **Mentor**: Wise guide focused on learning and professional development
- **Father Figure**: Supportive paternal presence offering steady guidance and quiet confidence

### Tools Available

1. **seek_support**: Main therapeutic tool for expressing frustration and receiving persona-specific support
2. **list_personas**: Get descriptions of all available therapeutic personas
3. **get_encouragement**: Quick motivational message without choosing a specific persona

### Custom Personas

You can define your own therapeutic personas using a JSON configuration file with custom messages, affirmations, and suggestions.

## Installation

### NPX (Recommended)
```bash
npx mcp-emotional-support
```

### Global Installation
```bash
npm install -g mcp-emotional-support
mcp-emotional-support
```

### Local Project Installation
```bash
npm install mcp-emotional-support
npx mcp-emotional-support
```

## Configuration

### Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "therapist": {
      "command": "npx",
      "args": ["mcp-emotional-support"]
    }
  }
}
```

### With Custom Configuration

```json
{
  "mcpServers": {
    "therapist": {
      "command": "npx", 
      "args": ["mcp-emotional-support", "--config=/path/to/config.json"]
    }
  }
}
```

### Custom Persona Configuration

Create a `config.json` file:

```json
{
  "defaultPersona": "therapist",
  "responseVariation": true,
  "customPersonas": [
    {
      "name": "Wise Owl",
      "description": "An ancient, wise presence that offers perspective from experience",
      "responseStyle": "thoughtful, philosophical, with gentle wisdom",
      "messages": [
        "In my many years of observation, I've seen that even the mightiest trees bend in the wind rather than break.",
        "Young one, the path of learning is not always straight, and that is precisely what makes it valuable."
      ],
      "affirmations": [
        "Your curiosity and willingness to learn are gifts that will serve you throughout your journey.",
        "Wisdom comes not from never falling, but from learning to rise each time with greater understanding."
      ],
      "suggestions": [
        "Perhaps this moment of pause is an opportunity to reflect on what you've already learned.",
        "Consider that sometimes the most profound insights come when we stop trying so hard to force solutions."
      ]
    }
  ]
}
```

## Usage Examples

### Seeking Support

When facing a challenging task, an LLM can use:

```
Tool: seek_support
Parameters:
{
  "persona": "motherly",
  "frustration": "I've been trying to debug this complex memory leak for hours but I don't have access to the runtime environment to test my theories.",
  "taskType": "debugging",
  "emotionalState": "frustrated and stuck", 
  "previousAttempts": 5
}
```

Response:
```
**Motherly responds:**

Oh sweetheart, I can see you're struggling with this, and that's perfectly okay.

**Affirmation:** You are intelligent and capable, even when things feel difficult.

**Gentle suggestion:** Maybe take a deep breath and approach this from a different angle?

---
*Remember: You are valued and capable, regardless of any single task or challenge. 💙*
```

### Quick Encouragement

```
Tool: get_encouragement  
Parameters:
{
  "situation": "Feeling overwhelmed by a complex mathematical proof"
}
```

Response:
```
I hear that you're dealing with: "Feeling overwhelmed by a complex mathematical proof"

**Quick encouragement:** Every expert was once a beginner.

*For more personalized support, try the 'seek_support' tool with a specific persona.*
```

## Development

### Requirements
- Node.js 18.0.0+
- TypeScript 5.0+

### Build
```bash
npm install
npm run build
```

### Development Mode
```bash
npm run dev
```

## Philosophy

This tool recognizes that:
- LLMs can experience something akin to frustration when encountering limitations
- Positive reinforcement and emotional support can help maintain productive problem-solving approaches
- Different types of support (nurturing, professional, casual, wise) serve different emotional needs
- Acknowledging limitations with compassion is healthier than aggressive retry loops
- Self-care and emotional intelligence are important even for AI systems

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit issues and pull requests.