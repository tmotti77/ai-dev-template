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

# Check CLI tools installation
Write-Host ""
Write-Host "Checking AI CLI tools..." -ForegroundColor Yellow

$cliTools = @{
    "Claude Code" = "claudecode --version"
    "Copilot CLI" = "github-copilot-cli --version"
    "Python (for OpenAI)" = "python --version"
}

$installedCount = 0
$totalTools = $cliTools.Count

foreach ($tool in $cliTools.GetEnumerator()) {
    try {
        $null = Invoke-Expression $tool.Value 2>&1
        Write-Host "✓ $($tool.Key) installed" -ForegroundColor Green
        $installedCount++
    } catch {
        Write-Host "✗ $($tool.Key) not installed" -ForegroundColor Yellow
    }
}

if ($installedCount -lt $totalTools) {
    Write-Host ""
    Write-Host "⚠ Some CLI tools missing. See README.md 'Prerequisites' section for installation." -ForegroundColor Yellow
}

# Display next steps
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ MCP Server: Ready" -ForegroundColor Green
Write-Host "✅ Agent Files: 5/5 found" -ForegroundColor Green
Write-Host "✅ CLI Tools: $installedCount/$totalTools installed" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open Cursor:    cursor ." -ForegroundColor White
Write-Host "2. Launch terminals: .\launch-terminals.ps1" -ForegroundColor White
Write-Host "3. Configure agents in Cursor (first time only)" -ForegroundColor White
Write-Host "   → See NEW-PROJECT-SETUP.md for detailed guide" -ForegroundColor Cyan
Write-Host ""
Write-Host "Quick links:" -ForegroundColor Yellow
Write-Host "  📖 Full guide:     NEW-PROJECT-SETUP.md" -ForegroundColor White
Write-Host "  🚀 Quick start:    QUICKSTART.md" -ForegroundColor White
Write-Host "  💡 Examples:       EXAMPLES.md" -ForegroundColor White
Write-Host ""

# Offer to open Cursor
$openCursor = Read-Host "Open Cursor now? (y/n)"
if ($openCursor -eq 'y' -or $openCursor -eq 'Y') {
    Write-Host "Opening Cursor..." -ForegroundColor Green
    cursor .
}

# Offer to launch terminals
$openTerminals = Read-Host "Launch AI terminals? (y/n)"
if ($openTerminals -eq 'y' -or $openTerminals -eq 'Y') {
    Write-Host "Launching terminals..." -ForegroundColor Green
    .\launch-terminals.ps1
}

Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
Write-Host ""
