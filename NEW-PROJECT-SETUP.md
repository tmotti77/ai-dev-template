# Starting a New Project with AI Dev Template

This is your step-by-step guide to use this template for a brand new project.

## One-Time Setup (Do This Once)

### Install All AI CLI Tools (Only Need To Do Once)

```powershell
# 1. Claude Code CLI
npm install -g @anthropics/claude-code
claudecode auth login

# 2. GitHub Copilot CLI
npm install -g @githubnext/github-copilot-cli
github-copilot-cli auth

# 3. OpenAI (for Codex)
pip install openai
# Set API key permanently in PowerShell profile
notepad $PROFILE
# Add this line: $env:OPENAI_API_KEY="your-key-here"

# 4. Google Gemini
# Set API key permanently
notepad $PROFILE
# Add this line: $env:GOOGLE_API_KEY="your-key-here"
```

**After setting API keys in profile, restart PowerShell.**

---

## Every New Project Setup

### Step 1: Clone Template (2 minutes)

```powershell
# Go to where you keep your projects
cd C:\Users\YourName\Projects

# Clone this template
git clone https://github.com/tmotti77/ai-dev-template.git my-new-project

# Enter the project
cd my-new-project

# Remove old git history and start fresh
Remove-Item -Recurse -Force .git
git init
git add .
git commit -m "Initial commit from AI dev template"
```

### Step 2: Install MCP Server (30 seconds)

```powershell
# Install dependencies
cd mcp-server
npm install
cd ..
```

### Step 3: Open in Cursor (30 seconds)

```powershell
# Open Cursor in this directory
cursor .

# Or manually: File → Open Folder → Select this directory
```

### Step 4: Configure Cursor Agents (First Time: 5 minutes, After: Auto)

#### Option A: Manual Setup (First Project)

In Cursor:

1. Click **"Agents"** panel (left sidebar)
2. Click **"New Agent"** button
3. Create each agent:

**Agent 1 - Claude (Lead Dev)**
- Name: `Claude - Lead Dev`
- Model: Select `Claude` (your preferred Claude version)
- Prompt: Copy **entire contents** of `.cursor/agents/claude.md`
- Click Save

**Agent 2 - Grok (Reviewer)**
- Name: `Grok - Reviewer`
- Model: Select `Grok`
- Prompt: Copy entire contents of `.cursor/agents/grok.md`
- Click Save

**Agent 3 - Gemini (Refactor)**
- Name: `Gemini - Refactor`
- Model: Select `Gemini`
- Prompt: Copy entire contents of `.cursor/agents/gemini.md`
- Click Save

**Agent 4 - Codex (Test Engineer)**
- Name: `Codex - Test Engineer`
- Model: Select `GPT-4` or `Codex`
- Prompt: Copy entire contents of `.cursor/agents/codex.md`
- Click Save

**Agent 5 - Copilot (CLI Runner)**
- Name: `Copilot - CLI Runner`
- Model: Select `GPT-4` or `Copilot`
- Prompt: Copy entire contents of `.cursor/agents/copilot.md`
- Click Save

#### Option B: MCP Configuration (Advanced)

Add to Cursor settings (Settings → MCP):

```json
{
  "mcpServers": {
    "ai-dev-team": {
      "command": "node",
      "args": ["C:\\full\\path\\to\\your\\project\\mcp-server\\server.js"]
    }
  }
}
```

Replace `C:\\full\\path\\to\\your\\project` with your actual project path.

### Step 5: Launch AI Terminals (10 seconds)

```powershell
# From your project directory
.\launch-terminals.ps1
```

**This opens 4 PowerShell windows:**
- ✅ Claude Code terminal
- ✅ Gemini terminal
- ✅ Copilot terminal
- ✅ Codex terminal

---

## What Auto-Opens vs Manual

### ✅ Auto-Opens (Just Run launch-terminals.ps1)
- 4 PowerShell terminals with AI CLIs
- Each terminal titled and ready

### ❌ Does NOT Auto-Open (Manual First Time)
- Cursor editor (you open it with `cursor .`)
- Cursor Agents panel (you click it in sidebar)
- Agent configurations (you create them once in Cursor)

### 🔄 After First Setup
Once you configure agents in Cursor **once**, they're saved to Cursor's settings. For future projects:
- Agents are already in Cursor (you can reuse them)
- Or export/import agent configurations between projects

---

## Quick Start Checklist

For **every new project**, do this:

```powershell
# 1. Clone template
git clone https://github.com/tmotti77/ai-dev-template.git my-new-project
cd my-new-project

# 2. Install MCP server
cd mcp-server
npm install
cd ..

# 3. Open Cursor
cursor .

# 4. Launch terminals
.\launch-terminals.ps1

# 5. Start coding!
```

✅ **First project**: Also setup Cursor agents (Step 4 above) - 5 minutes
✅ **Future projects**: Skip agent setup, they're already in Cursor!

---

## Typical Workflow

### Morning Routine

```powershell
# 1. Open project
cd my-project
cursor .

# 2. Launch all AI terminals
.\launch-terminals.ps1

# 3. Start working with agents in Cursor
```

### During Development

**In Cursor (for coding):**
- Switch between agents in Agents panel
- Ask Claude to implement features
- Ask Grok to review code
- Ask Codex to write tests

**In Terminals (for CLI operations):**
- Terminal 1 (Claude Code): Run interactive Claude sessions
- Terminal 2 (Gemini): Use Gemini for quick questions
- Terminal 3 (Copilot): Get code suggestions
- Terminal 4 (Codex): Generate code snippets

### End of Day

```powershell
# Commit your work
git add .
git commit -m "Your changes"
git push

# Close all terminals
# (Right-click PowerShell in taskbar → Close all windows)
```

---

## FAQ

### Q: Do I need to reconfigure agents for every project?
**A:** No! Configure them **once** in Cursor. They're saved globally. Just open Cursor and they're there.

### Q: Do terminals auto-open when I open Cursor?
**A:** No. Run `.\launch-terminals.ps1` manually when you want them.

### Q: Can I make terminals auto-open?
**A:** Yes! Add to your PowerShell profile:

```powershell
# Edit profile
notepad $PROFILE

# Add this function
function Start-DevEnv {
    param([string]$ProjectPath)
    cd $ProjectPath
    cursor .
    .\launch-terminals.ps1
}

# Usage:
# Start-DevEnv "C:\Projects\my-project"
```

### Q: What if I don't want all 4 terminals?
**A:** Edit `launch-terminals.ps1` and comment out the ones you don't want.

### Q: Does MCP auto-connect?
**A:** Only if you added it to Cursor settings (Step 4, Option B). Otherwise, agents work independently.

### Q: Can I use this template without Cursor?
**A:** Yes! The terminals and MCP server work standalone. Cursor is just for the integrated agent experience.

---

## Pro Tips

1. **Bookmark Your Template**
   ```powershell
   # Create alias for quick cloning
   notepad $PROFILE
   # Add:
   function New-AIProject {
       param([string]$Name)
       git clone https://github.com/tmotti77/ai-dev-template.git $Name
       cd $Name
       cd mcp-server; npm install; cd ..
       cursor .
   }
   # Usage: New-AIProject "my-new-app"
   ```

2. **Keep Terminals Organized**
   - Arrange them on second monitor
   - Use Windows 11 Snap Layouts (Win + Z)
   - Or keep minimized and Alt+Tab when needed

3. **Customize Per Project**
   - Edit `.cursor/agents/*.md` to add project-specific rules
   - Update `mcp-server/mcp-config.json` for custom workflows

4. **Share Agent Configs**
   - Export Cursor agent settings
   - Share with team for consistent setup

---

## Next Steps

1. ✅ Follow the checklist above
2. ✅ Try example from `EXAMPLES.md`
3. ✅ Customize agents for your tech stack
4. ✅ Build something awesome!

**Need Help?**
- See `README.md` for full documentation
- See `EXAMPLES.md` for workflow examples
- See `MCP-TEST.md` for MCP testing info
- Check `QUICKSTART.md` for 5-minute intro
