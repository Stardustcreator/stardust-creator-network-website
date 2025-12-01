# Fix npm PATH issue
Write-Host "=== Node.js and npm Diagnostic Tool ===" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "1. Checking Node.js installation..." -ForegroundColor Yellow
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if ($nodePath) {
    Write-Host "   Node.js found at: $($nodePath.Source)" -ForegroundColor Green
    $nodeVersion = node --version 2>&1
    Write-Host "   Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   Node.js NOT FOUND in PATH" -ForegroundColor Red
    Write-Host "   Checking common installation locations..." -ForegroundColor Yellow
    
    $commonPaths = @(
        "C:\Program Files\nodejs\node.exe",
        "C:\Program Files (x86)\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\nodejs\node.exe"
    )
    
    $found = $false
    foreach ($path in $commonPaths) {
        if (Test-Path $path) {
            Write-Host "   Found Node.js at: $path" -ForegroundColor Green
            $found = $true
            break
        }
    }
    
    if (-not $found) {
        Write-Host "   Node.js is not installed. Please install from: https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
}

# Check npm
Write-Host "`n2. Checking npm..." -ForegroundColor Yellow
$npmPath = Get-Command npm -ErrorAction SilentlyContinue
if ($npmPath) {
    Write-Host "   npm found at: $($npmPath.Source)" -ForegroundColor Green
    $npmVersion = npm --version 2>&1
    Write-Host "   npm version: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "   npm NOT FOUND in PATH" -ForegroundColor Yellow
    Write-Host "   Attempting to fix PATH..." -ForegroundColor Yellow
    
    # Try to add Node.js to PATH for current session
    $nodejsPaths = @(
        "C:\Program Files\nodejs",
        "C:\Program Files (x86)\nodejs",
        "$env:LOCALAPPDATA\Programs\nodejs"
    )
    
    foreach ($nodejsPath in $nodejsPaths) {
        if (Test-Path "$nodejsPath\node.exe") {
            Write-Host "   Adding to PATH: $nodejsPath" -ForegroundColor Yellow
            $env:Path += ";$nodejsPath"
            
            # Verify npm is now accessible
            $npmCheck = Get-Command npm -ErrorAction SilentlyContinue
            if ($npmCheck) {
                Write-Host "   SUCCESS! npm is now accessible." -ForegroundColor Green
                $npmVersion = npm --version 2>&1
                Write-Host "   npm version: $npmVersion" -ForegroundColor Green
                break
            }
        }
    }
    
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "   Could not automatically fix PATH." -ForegroundColor Red
        Write-Host "   Please:" -ForegroundColor Yellow
        Write-Host "   1. Restart your terminal/PowerShell" -ForegroundColor Yellow
        Write-Host "   2. Or restart Cursor/VS Code" -ForegroundColor Yellow
        Write-Host "   3. Or manually add Node.js to your system PATH" -ForegroundColor Yellow
    }
}

# Final verification
Write-Host "`n3. Final verification..." -ForegroundColor Yellow
try {
    $nodeVer = node --version 2>&1
    $npmVer = npm --version 2>&1
    Write-Host "   Node.js: $nodeVer" -ForegroundColor Green
    Write-Host "   npm: $npmVer" -ForegroundColor Green
    Write-Host "`n=== SUCCESS! You can now use npm ===" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "   cd c:\Users\DELL\.cursor\stardust-creator-network-website" -ForegroundColor White
    Write-Host "   npm install" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
} catch {
    Write-Host "   ERROR: $($_.Exception.Message)" -ForegroundColor Red
}
