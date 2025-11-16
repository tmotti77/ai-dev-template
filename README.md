# AI Development Team Template

A ready-to-use template that orchestrates multiple AI models as a coordinated development team in Cursor.

## Overview

This template sets up 5 specialized AI agents that work together as a development team:

- **Claude** - Lead Developer (architecture, implementation, coordination)
- **Grok** - Code Reviewer (quality, security, best practices)
- **Gemini** - Refactoring Specialist (code improvement, optimization)
- **Codex** - Test Engineer (testing, coverage, quality assurance)
- **Copilot** - CLI Runner (builds, tests, tooling)

## Prerequisites - Install AI CLI Tools

Before using this template, install the CLI tools for each AI model. This allows you to work with them in separate terminals.

### PowerShell Commands (Recommended for Windows)

```powershell
# 1. Claude Code CLI
npm install -g @anthropics/claude-code

# Login (follow prompts)
claudecode auth login

# Test it works
claudecode --version

# 2. Gemini CLI (Google AI)
npm install -g @google/generative-ai-cli

# Login with your Google API key
$env:GOOGLE_API_KEY="your-api-key-here"

# Or set permanently in PowerShell profile
# Add to: $PROFILE
# $env:GOOGLE_API_KEY="your-api-key"

# 3. GitHub Copilot CLI
npm install -g @githubnext/github-copilot-cli

# Login
github-copilot-cli auth

# Test
github-copilot-cli --version

# 4. OpenAI CLI (for Codex)
pip install openai

# Set API key
$env:OPENAI_API_KEY="your-openai-api-key"

# Or add to PowerShell profile permanently
```

### Open All AI Terminals at Once

Use the provided launcher script:

```powershell
# Run the terminal launcher
.\launch-terminals.ps1
```

This opens 4 PowerShell windows, one for each AI CLI:
- **Claude Code** - Lead Developer
- **Gemini** - Refactoring/Analysis
- **Copilot** - Code Assistance
- **Codex** - Testing/Code Generation

### Manual Terminal Setup

If you prefer to open them manually:

```powershell
# Terminal 1: Claude Code
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "claudecode"

# Terminal 2: Gemini
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "Write-Host 'Gemini CLI Ready' -ForegroundColor Cyan"

# Terminal 3: Copilot
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "github-copilot-cli"

# Terminal 4: Codex/OpenAI
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "Write-Host 'OpenAI CLI Ready' -ForegroundColor Green"
```

## Quick Start

### 1. Clone or Use This Template

```powershell
# Clone for a new project
git clone https://github.com/tmotti77/ai-dev-template.git my-new-project
cd my-new-project

# Or use as GitHub template
# Click "Use this template" on GitHub
```

### 2. Install MCP Server

```powershell
cd mcp-server
npm install
cd ..
```

### 3. Configure Cursor

#### Option A: Using Cursor's Agent Panel

1. Open Cursor
2. Go to the "Agents" panel (shown in your screenshot)
3. Click "New Agent"
4. For each agent file in `.cursor/agents/`, create an agent:
   - Name: `Claude - Lead Dev`
   - Model: Select your Claude model
   - Prompt: Copy contents from `.cursor/agents/claude.md`
   - Repeat for `grok.md`, `gemini.md`, `codex.md`, `copilot.md`

#### Option B: Using MCP Configuration

Add to your Cursor settings (`~/.cursor/mcp.json` or workspace settings):

```json
{
  "mcpServers": {
    "ai-dev-team": {
      "command": "node",
      "args": ["./mcp-server/server.js"]
    }
  }
}
```

## Usage

### Working with Individual Agents

In Cursor, select the appropriate agent for your task:

- **Need to implement a new feature?** → Use Claude (Lead Dev)
- **Want code reviewed?** → Use Grok (Reviewer)
- **Code needs refactoring?** → Use Gemini (Refactor)
- **Need tests written?** → Use Codex (Test Engineer)
- **Run commands or builds?** → Use Copilot (CLI Runner)

### Using Workflows

The MCP server provides predefined workflows:

#### Feature Development Workflow
```
1. Claude designs and implements the feature
2. Codex writes comprehensive tests
3. Copilot runs tests and build
4. Grok reviews code and tests
5. Gemini refactors if needed
```

#### Bug Fix Workflow
```
1. Grok analyzes the bug and impact
2. Claude implements the fix
3. Codex adds regression test
4. Copilot verifies the fix works
```

#### Refactor Workflow
```
1. Grok identifies code smells
2. Gemini refactors the code
3. Copilot ensures tests still pass
4. Grok verifies improvements
```

#### Code Review Workflow
```
1. Grok reviews for bugs and quality
2. Codex verifies test coverage
3. Gemini suggests improvements
```

### Example: Implementing a New Feature

```
You: "I need to add user authentication"

[Switch to Claude agent]
Claude: *Designs architecture and implements core auth logic*

[Switch to Codex agent]
You: "@codex Write tests for the authentication feature"
Codex: *Creates unit and integration tests*

[Switch to Copilot agent]
You: "@copilot Run the test suite"
Copilot: *Executes tests, reports results*

[Switch to Grok agent]
You: "@grok Review the authentication implementation"
Grok: *Provides detailed code review*

[If needed, switch to Gemini]
You: "@gemini Refactor the auth code based on Grok's review"
Gemini: *Improves code structure*
```

## Directory Structure

```
.
├── .cursor/
│   └── agents/
│       ├── claude.md      # Lead Developer instructions
│       ├── grok.md        # Code Reviewer instructions
│       ├── gemini.md      # Refactoring Specialist instructions
│       ├── codex.md       # Test Engineer instructions
│       └── copilot.md     # CLI Runner instructions
│
├── mcp-server/
│   ├── server.js          # MCP server implementation
│   ├── mcp-config.json    # Agent and workflow configuration
│   └── package.json       # Node.js dependencies
│
└── README.md              # This file
```

## Customization

### Adding Custom Workflows

Edit `mcp-server/mcp-config.json` to add your own workflows:

```json
{
  "workflows": {
    "my-custom-workflow": {
      "description": "My custom workflow",
      "steps": [
        {"agent": "claude", "task": "do something"},
        {"agent": "grok", "task": "review it"}
      ]
    }
  }
}
```

### Modifying Agent Behavior

Edit the agent files in `.cursor/agents/` to customize their behavior:

- Add project-specific guidelines
- Include coding standards
- Add technology stack information
- Customize output formats

### Example Customization

```markdown
# In .cursor/agents/claude.md, add:

## Project-Specific Rules
- Always use TypeScript strict mode
- Follow our company's React patterns
- Use our custom error handling utilities
```

## Tips for Best Results

1. **Be Specific**: Tell agents exactly what you need
2. **Provide Context**: Share relevant files and requirements
3. **Use the Right Agent**: Match the task to the agent's specialty
4. **Iterate**: Use multiple agents in sequence for complex tasks
5. **Review Output**: Always verify agent suggestions before applying

## Common Workflows

### Daily Development

```
Morning:
1. @grok Review overnight PRs
2. @claude Plan today's features

During Development:
3. @claude Implement feature
4. @codex Write tests
5. @copilot Run tests/build

Before Commit:
6. @grok Final review
7. @gemini Quick refactor if needed
8. @copilot Run linters and tests
```

### Code Quality Sprint

```
1. @grok Audit codebase for issues
2. @gemini Refactor problematic areas
3. @codex Improve test coverage
4. @copilot Run quality metrics
5. @grok Verify improvements
```

## Troubleshooting

### Agents Not Showing Up

- Verify agent files exist in `.cursor/agents/`
- Check Cursor settings for agent configuration
- Restart Cursor

### MCP Server Not Working

```bash
# Test the server manually
cd mcp-server
node server.js

# Check Node.js version
node --version  # Should be >= 14.0.0
```

### Agents Giving Generic Responses

- Ensure you've loaded the agent-specific prompts
- Provide more context in your requests
- Reference specific files or code sections

## Contributing

This is a template repository. Feel free to:
- Fork and customize for your needs
- Submit issues for improvements
- Share your custom workflows

## License

MIT License - Feel free to use this template for any project

## Acknowledgments

Built for use with:
- [Cursor](https://cursor.sh/) - AI-powered code editor
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) - Agent coordination
- Multiple AI models working in harmony
