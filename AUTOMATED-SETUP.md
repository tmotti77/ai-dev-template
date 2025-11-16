# 🤖 AUTOMATED AI AGENTS - Complete Setup Guide

## What This Does

This template gives you **5 specialized AI agents** that **automatically respond** based on what you ask:

- 🧠 **Claude** - Lead Developer (architecture, features)
- 🔍 **Grok** - Code Reviewer (quality, security)
- ✨ **Gemini** - Refactoring Specialist (optimization)
- 🧪 **Codex** - Test Engineer (testing, coverage)
- ⚡ **Copilot** - CLI Runner (commands, builds)

**The MCP server AUTO-ROUTES your questions to the right agent!**

---

## ONE-TIME Setup (Do Once On Your PC)

### 1. Install Node.js
```powershell
# Download from: https://nodejs.org
# Or install via winget:
winget install OpenJS.NodeJS
```

### 2. Install CLI Tools (Optional - for terminals)
```powershell
# Claude Code CLI
npm install -g @anthropics/claude-code
claudecode auth login

# GitHub Copilot CLI
npm install -g @githubnext/github-copilot-cli
github-copilot-cli auth

# OpenAI (for Codex)
pip install openai

# Set API keys in PowerShell profile
notepad $PROFILE
# Add:
# $env:OPENAI_API_KEY="your-key"
# $env:GOOGLE_API_KEY="your-key"
```

---

## FOR EVERY NEW PROJECT (3 Steps)

### Step 1: Clone Template (30 seconds)

```powershell
# Clone the template
git clone https://github.com/tmotti77/ai-dev-template.git my-new-project
cd my-new-project

# Run setup
.\setup.ps1
```

**The setup script will:**
- ✅ Install MCP server dependencies
- ✅ Verify all agent files exist
- ✅ Test the MCP server works
- ✅ Ask if you want to open Cursor (say YES)
- ✅ Ask if you want to launch terminals (say YES)

### Step 2: Enable MCP in Cursor (FIRST TIME ONLY - 1 minute)

**Do this ONCE per Cursor installation:**

1. Open Cursor Settings (`Ctrl+,`)
2. Go to **"Tools & MCP"** in left sidebar
3. Look for **"MCP Servers"** or **"Model Context Protocol"**
4. Click **"Add Server"** or **"Configure"**
5. Add this configuration:

```json
{
  "mcpServers": {
    "ai-dev-team": {
      "command": "node",
      "args": ["mcp-server/server.js"],
      "description": "AI Development Team"
    }
  }
}
```

**OR** Cursor might auto-detect the `.cursor/mcp-settings.json` file we included!

### Step 3: Start Using! (Now!)

**That's it!** The agents are ready.

---

## How It Works - AUTOMATIC ROUTING

When you ask Cursor a question, the MCP server **automatically**:

1. **Detects** what kind of task you're asking about
2. **Loads** the right agent's instructions
3. **Responds** as that specialized agent

### Examples:

**You ask:** "Write unit tests for my auth module"
→ **Auto-routes to:** CODEX (Test Engineer)
→ **Response:** Full test suite with AAA pattern

**You ask:** "Review this code for security issues"
→ **Auto-routes to:** GROK (Code Reviewer)
→ **Response:** Security audit with specific fixes

**You ask:** "Implement user authentication with JWT"
→ **Auto-routes to:** CLAUDE (Lead Developer)
→ **Response:** Architecture design + implementation

**You ask:** "Refactor this messy function"
→ **Auto-routes to:** GEMINI (Refactoring Specialist)
→ **Response:** Cleaner code with improvements

**You ask:** "Run the test suite"
→ **Auto-routes to:** COPILOT (CLI Runner)
→ **Response:** Test execution results

### Keywords That Trigger Each Agent:

**CODEX (Test Engineer):**
- test, coverage, unit, integration, spec, jest, pytest

**GROK (Code Reviewer):**
- review, check, audit, security, vulnerability, bug

**GEMINI (Refactoring):**
- refactor, clean, optimize, improve, simplify

**COPILOT (CLI Runner):**
- run, execute, build, deploy, install, command

**CLAUDE (Lead Dev):**
- implement, create, build, develop, feature, architecture

---

## Daily Workflow

### Morning:
```powershell
cd my-project
cursor .                    # Open Cursor
.\launch-terminals.ps1      # Open AI terminals (optional)
```

### During Development:

Just ask Cursor naturally:

```
❌ DON'T: "Switch to test engineer mode and write tests"
✅ DO: "Write tests for this function"
→ Auto-routes to Codex

❌ DON'T: "Use the code reviewer agent to check this"
✅ DO: "Review this code"
→ Auto-routes to Grok

❌ DON'T: "Run refactoring specialist on this"
✅ DO: "Refactor this function"
→ Auto-routes to Gemini
```

**The agents activate automatically based on your question!**

### Evening:
```powershell
git add .
git commit -m "Your work"
git push
```

---

## What Opens Automatically?

### ✅ With `.\setup.ps1`:
- Cursor editor (if you say yes)
- 4 AI terminal windows (if you say yes)

### ✅ With MCP Enabled:
- Auto-routing to right agent
- Agent context loaded automatically
- Specialized responses

### ❌ What's NOT Automated:
- Typing your questions 😄
- Git commits
- Choosing which AI model (Claude vs GPT-4 etc)

---

## Troubleshooting

### "MCP server not found"
```powershell
# Make sure you're in project directory
cd mcp-server
npm install
cd ..
```

### "Auto-routing not working"
```powershell
# Test MCP manually
cd mcp-server
echo '{"method":"tools/call","params":{"name":"auto_route","arguments":{"user_query":"write tests"}}}' | node server.js
```

You should see it route to CODEX!

### "Agents giving generic responses"
- Make sure MCP is enabled in Cursor settings
- Check that `.cursor/agents/*.md` files exist
- Try restarting Cursor

---

## Advanced: Using Terminals

If you launched terminals with `.\launch-terminals.ps1`:

**Terminal 1 - Claude Code:**
```powershell
# Interactive Claude sessions
claudecode
```

**Terminal 2 - Gemini:**
```powershell
# Use Gemini CLI or API calls
```

**Terminal 3 - Copilot:**
```powershell
# Get code suggestions
github-copilot-cli
```

**Terminal 4 - Codex:**
```powershell
# Use OpenAI CLI
```

---

## Comparison: Before vs After

### ❌ Before (Without This Template):
```
You: "I need to write tests for my auth module"
AI: [Generic response, may not follow testing best practices]
```

### ✅ After (With Auto-Routing):
```
You: "Write tests for my auth module"
MCP: 🤖 Auto-routed to: CODEX
AI: [Responds as Test Engineer with:
- AAA pattern tests
- Edge cases covered
- Proper mocking
- Coverage report format
- Run command]
```

---

## That's It!

**3 Steps for Every New Project:**

1. `git clone` + `.\setup.ps1`
2. Open Cursor (say yes when asked)
3. Start asking questions naturally!

The agents **automatically** handle the rest! 🚀

---

## Files Reference

- `.cursor/agents/` - Agent instruction files (5 agents)
- `mcp-server/` - Auto-routing server
- `.cursorrules` - General project rules
- `launch-terminals.ps1` - Terminal launcher

**Need help?** See `README.md` or `EXAMPLES.md`
