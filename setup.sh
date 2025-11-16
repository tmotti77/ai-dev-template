#!/bin/bash

# AI Dev Team Template Setup Script (Bash)

echo "========================================"
echo "AI Development Team Template Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js found: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js 14+ from https://nodejs.org${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm found: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi

# Install MCP Server dependencies
echo ""
echo -e "${YELLOW}Installing MCP server dependencies...${NC}"
cd mcp-server
if npm install; then
    echo -e "${GREEN}✓ MCP server dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi
cd ..

# Verify agent files
echo ""
echo -e "${YELLOW}Verifying agent files...${NC}"
agents=("claude" "grok" "gemini" "codex" "copilot")
all_found=true

for agent in "${agents[@]}"; do
    if [ -f ".cursor/agents/$agent.md" ]; then
        echo -e "${GREEN}✓ $agent.md found${NC}"
    else
        echo -e "${RED}✗ $agent.md missing${NC}"
        all_found=false
    fi
done

if [ "$all_found" = false ]; then
    echo -e "${RED}⚠ Some agent files are missing${NC}"
    exit 1
fi

# Test MCP server
echo ""
echo -e "${YELLOW}Testing MCP server...${NC}"
echo '{"method":"tools/list","params":{}}' | node mcp-server/server.js > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ MCP server is working${NC}"
else
    echo -e "${YELLOW}⚠ MCP server test inconclusive${NC}"
fi

# Make this script executable
chmod +x setup.sh

# Display next steps
echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Open this folder in Cursor"
echo "2. Go to Agents panel (see screenshot in README)"
echo "3. Create agents using the .cursor/agents/*.md files"
echo "4. Start using your AI dev team!"
echo ""
echo "Read README.md and EXAMPLES.md for usage examples"
echo ""
