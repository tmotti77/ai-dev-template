# Quick Start Guide

Get your AI development team running in 5 minutes!

## 1. Setup (1 minute)

### Windows (PowerShell)
```powershell
.\setup.ps1
```

### Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
```

## 2. Open in Cursor (30 seconds)

1. Launch Cursor
2. File → Open Folder → Select this directory

## 3. Configure Agents (3 minutes)

### Method 1: Manual Setup (Recommended for first time)

1. Click "Agents" in the sidebar (or press the shortcut)
2. Click "New Agent" button
3. For each agent, create:

**Claude - Lead Dev**
- Name: `Claude - Lead Dev`
- Model: Claude (select your preferred Claude model)
- Prompt: Copy entire contents of `.cursor/agents/claude.md`

**Grok - Reviewer**
- Name: `Grok - Reviewer`
- Model: Grok
- Prompt: Copy entire contents of `.cursor/agents/grok.md`

**Gemini - Refactor**
- Name: `Gemini - Refactor`
- Model: Gemini
- Prompt: Copy entire contents of `.cursor/agents/gemini.md`

**Codex - Test Engineer**
- Name: `Codex - Test Engineer`
- Model: Codex/GPT-4
- Prompt: Copy entire contents of `.cursor/agents/codex.md`

**Copilot - CLI Runner**
- Name: `Copilot - CLI Runner`
- Model: Copilot/GPT-4
- Prompt: Copy entire contents of `.cursor/agents/copilot.md`

### Method 2: MCP Configuration (Advanced)

Add to Cursor settings:
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

## 4. Start Coding! (Now)

### Your First Task

Try this to test your setup:

1. **Create a simple function**
   - Open new file `test.js`
   - Switch to Claude agent
   - Say: "Create a function that validates email addresses"

2. **Add tests**
   - Switch to Codex agent
   - Say: "@codex Write tests for this email validator"

3. **Run tests**
   - Switch to Copilot agent
   - Say: "@copilot Run node test.js"

4. **Get it reviewed**
   - Switch to Grok agent
   - Say: "@grok Review this code"

5. **Refactor if needed**
   - Switch to Gemini agent
   - Say: "@gemini Refactor based on Grok's suggestions"

## Common Tasks

### I want to...

**Build a new feature**
1. Claude → Design & implement
2. Codex → Write tests
3. Copilot → Run tests
4. Grok → Review code
5. Gemini → Refactor

**Fix a bug**
1. Grok → Analyze bug
2. Claude → Implement fix
3. Codex → Add regression test
4. Copilot → Verify fix

**Improve code quality**
1. Grok → Find issues
2. Gemini → Refactor
3. Copilot → Run tests
4. Grok → Verify improvements

**Add tests**
1. Codex → Write tests
2. Copilot → Run tests & coverage
3. Grok → Review test quality

## Agent Cheat Sheet

| Task | Agent | Example |
|------|-------|---------|
| Implement feature | Claude | "Build a user auth system" |
| Review code | Grok | "Review this function for bugs" |
| Refactor code | Gemini | "Simplify this complex function" |
| Write tests | Codex | "Write unit tests for this module" |
| Run commands | Copilot | "Run npm test and show results" |
| Design architecture | Claude | "Design a scalable API structure" |
| Find security issues | Grok | "Check for security vulnerabilities" |
| Optimize performance | Gemini | "Optimize this slow function" |
| Increase coverage | Codex | "Add tests to reach 80% coverage" |
| Debug errors | Copilot | "Run with verbose logging" |

## Tips for Success

1. **Be Specific**: Instead of "fix this", say "fix the null pointer error on line 45"

2. **Provide Context**: Share files, error messages, requirements

3. **Use Right Agent**: Match the task to the agent's specialty

4. **Chain Agents**: Use output from one agent as input to the next

5. **Iterate**: Don't expect perfection first try - refine!

## Troubleshooting

**Agents not appearing?**
- Restart Cursor
- Check agents were saved in Agents panel
- Verify agent files exist in `.cursor/agents/`

**Generic responses?**
- Ensure agent prompts were loaded correctly
- Provide more specific context
- Reference specific files/line numbers

**MCP server not working?**
- Run `node mcp-server/server.js` to test
- Check Node.js version (needs 14+)
- Review console for errors

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [EXAMPLES.md](EXAMPLES.md) for real-world workflows
- Customize agents in `.cursor/agents/` for your needs
- Add custom workflows to `mcp-server/mcp-config.json`

## Need Help?

- Check the documentation files
- Review example workflows
- Open an issue on GitHub
- Customize and experiment!

---

**Now start building with your AI team! 🚀**
