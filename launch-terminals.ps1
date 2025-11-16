# AI Dev Team Terminal Launcher
# Opens 4 PowerShell windows, one for each AI CLI tool

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Dev Team - Terminal Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$terminals = @(
    @{
        Name = "Claude Code - Lead Dev"
        Color = "Blue"
        Command = "claudecode"
        CheckCommand = "claudecode --version"
    },
    @{
        Name = "Gemini - Refactor Specialist"
        Color = "Cyan"
        Command = "Write-Host 'Gemini CLI Ready - Use Google AI CLI or SDK' -ForegroundColor Cyan; Write-Host 'API Key: `$env:GOOGLE_API_KEY' -ForegroundColor Yellow"
        CheckCommand = "node --version"  # Just check node is available
    },
    @{
        Name = "Copilot - CLI Runner"
        Color = "Green"
        Command = "github-copilot-cli"
        CheckCommand = "github-copilot-cli --version"
    },
    @{
        Name = "Codex - Test Engineer"
        Color = "Magenta"
        Command = "Write-Host 'OpenAI CLI Ready - Use openai python package' -ForegroundColor Magenta; Write-Host 'API Key: `$env:OPENAI_API_KEY' -ForegroundColor Yellow; python --version"
        CheckCommand = "python --version"
    }
)

$launchedCount = 0

foreach ($terminal in $terminals) {
    Write-Host "Launching: $($terminal.Name)..." -ForegroundColor $terminal.Color

    # Check if the tool is available (optional, won't block launch)
    try {
        $checkResult = Invoke-Expression $terminal.CheckCommand 2>&1
        Write-Host "  ✓ Ready" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠ Warning: Tool may not be installed" -ForegroundColor Yellow
        Write-Host "  Will launch anyway - check README for installation" -ForegroundColor Yellow
    }

    # Build the PowerShell command
    $psCommand = @"
`$Host.UI.RawUI.WindowTitle = '$($terminal.Name)'
Write-Host '========================================' -ForegroundColor $($terminal.Color)
Write-Host '$($terminal.Name)' -ForegroundColor $($terminal.Color)
Write-Host '========================================' -ForegroundColor $($terminal.Color)
Write-Host ''
$($terminal.Command)
"@

    # Launch the terminal
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", $psCommand
    $launchedCount++

    Start-Sleep -Milliseconds 500  # Small delay between launches
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Launched $launchedCount terminals!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminals opened:" -ForegroundColor Yellow
Write-Host "  1. Claude Code    - Lead Developer"
Write-Host "  2. Gemini         - Refactoring Specialist"
Write-Host "  3. Copilot        - CLI Runner"
Write-Host "  4. Codex/OpenAI   - Test Engineer"
Write-Host ""
Write-Host "Tips:" -ForegroundColor Yellow
Write-Host "  • Use each terminal for its specialty"
Write-Host "  • Switch between them based on your task"
Write-Host "  • See README.md for usage examples"
Write-Host "  • Close all: Right-click PowerShell icon → Close all windows"
Write-Host ""
