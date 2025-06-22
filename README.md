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

### Tool Available

**get_support**: Complete emotional support workflow that automatically:
1. Analyzes your situation and recommends the best persona
2. Provides personalized support from that persona  
3. Gives guidance on incorporating the feedback

### Custom Personas

You can define your own therapeutic personas using a JSON configuration file with custom messages, affirmations, and suggestions.

## Installation

The MCP Emotional Support server is published on NPM and can be installed in several ways:

### NPX (Recommended for Claude Desktop)
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

### Requirements
- Node.js 18.0.0 or higher
- Claude Desktop application (for MCP integration)

## Configuration

### Claude Desktop

Add to your Claude Desktop configuration file:

**Configuration File Locations:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "emotional-support": {
      "command": "npx",
      "args": ["mcp-emotional-support"]
    }
  }
}
```

**Alternative (if globally installed):**
```json
{
  "mcpServers": {
    "emotional-support": {
      "command": "mcp-emotional-support"
    }
  }
}
```

**After configuration:**
1. Restart Claude Desktop
2. The `get_support` tool will be available in your conversations

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

### Getting Comprehensive Support

When facing any challenging situation, simply use:

```
Tool: get_support
Parameters:
{
  "situation": "I've been trying to debug this complex memory leak for hours but I don't have access to the runtime environment to test my theories.",
  "context": "JavaScript React application",
  "emotional_state": "frustrated and stuck"
}
```

Response:
```
## 🤗 Comprehensive Emotional Support

### Step 1: Situation Analysis & Persona Recommendation
I've analyzed your situation: "I've been trying to debug..." in the context of: "JavaScript React application" while feeling: "frustrated and stuck".

**Recommended Persona:** Mentor
**Reasoning:** This appears to be a technical challenge. The mentor persona offers wise guidance focused on growth and skill development.

---

### Step 2: Persona Support Response
**Mentor responds:**

Every expert was once a beginner who refused to give up.

**Affirmation:** Your persistence in the face of challenges shows true character.

**Gentle suggestion:** Consider this: what would you do differently if you approached this problem tomorrow?

---

### Step 3: Incorporating This Support
Here's how to incorporate Mentor's support:

**Immediate Steps:**
1. Take a moment to let the affirmation sink in: "Your persistence in the face of challenges shows true character."
2. Consider the suggestion: "Consider this: what would you do differently if you approached this problem tomorrow?"

**Moving Forward:**
- Remember this support when similar challenges arise
- Focus on the learning opportunity in this challenge. Each difficulty is building your skills and resilience.
- Be patient and compassionate with yourself as you apply this guidance

**If you need more support:** You can always return here when facing future challenges.

---

*Remember: You are valued and capable. This support is here to help you move forward with confidence and self-compassion. 💙*
```

### Simple Usage

For any challenge, just describe your situation:

```
Tool: get_support
Parameters:
{
  "situation": "I'm feeling overwhelmed by this complex algorithm optimization task"
}
```

The tool automatically handles persona selection and provides complete support!

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