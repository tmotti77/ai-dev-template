# AI Dev Team Template Setup Script (PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Development Team Template Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 14+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check Cursor
Write-Host "Checking for Cursor..." -ForegroundColor Yellow
if (Test-Path "$env:LOCALAPPDATA\Programs\Cursor") {
    Write-Host "✓ Cursor installation found" -ForegroundColor Green
} else {
    Write-Host "⚠ Cursor not found in default location. Make sure it's installed." -ForegroundColor Yellow
}

# Install MCP Server dependencies
Write-Host ""
Write-Host "Installing MCP server dependencies..." -ForegroundColor Yellow
Set-Location mcp-server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ MCP server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Verify agent files
Write-Host ""
Write-Host "Verifying agent files..." -ForegroundColor Yellow
$agents = @("claude", "grok", "gemini", "codex", "copilot")
$allFound = $true
foreach ($agent in $agents) {
    $path = ".cursor\agents\$agent.md"
    if (Test-Path $path) {
        Write-Host "✓ $agent.md found" -ForegroundColor Green
    } else {
        Write-Host "✗ $agent.md missing" -ForegroundColor Red
        $allFound = $false
    }
}

if (-not $allFound) {
    Write-Host "⚠ Some agent files are missing" -ForegroundColor Red
    exit 1
}

# Test MCP server
Write-Host ""
Write-Host "Testing MCP server..." -ForegroundColor Yellow
$testRequest = '{"method":"tools/list","params":{}}'
$testResult = $testRequest | node mcp-server\server.js 2>&1

if ($testResult -match "tools") {
    Write-Host "✓ MCP server is working" -ForegroundColor Green
} else {
    Write-Host "⚠ MCP server test inconclusive" -ForegroundColor Yellow
}

# Display next steps
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open this folder in Cursor"
Write-Host "2. Go to Agents panel (see screenshot in README)"
Write-Host "3. Create agents using the .cursor/agents/*.md files"
Write-Host "4. Start using your AI dev team!"
Write-Host ""
Write-Host "Read README.md and EXAMPLES.md for usage examples"
Write-Host ""
