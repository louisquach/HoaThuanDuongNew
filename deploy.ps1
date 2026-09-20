# Deploy script — packages standalone build into ./deploy-bundle/
# Usage: .\deploy.ps1
# Then copy deploy-bundle/ to your server and run: node server.js

$ErrorActionPreference = "Stop"
$deployDir = "deploy-bundle"

Write-Host "Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed!" -ForegroundColor Red; exit 1 }

# Clean previous bundle
if (Test-Path $deployDir) { Remove-Item $deployDir -Recurse -Force }

Write-Host "Assembling deploy bundle..." -ForegroundColor Cyan

# 1. Copy standalone output (includes server.js + minimal node_modules)
Copy-Item ".next/standalone" $deployDir -Recurse

# 2. Copy static assets into the bundle
Copy-Item ".next/static" "$deployDir/.next/static" -Recurse

# 3. Copy public folder
Copy-Item "public" "$deployDir/public" -Recurse

# 4. Copy .env if it exists
if (Test-Path ".env") { Copy-Item ".env" "$deployDir/.env" }

$size = (Get-ChildItem $deployDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ""
Write-Host "Done! Bundle at ./$deployDir/ ($([math]::Round($size, 1)) MB)" -ForegroundColor Green
Write-Host ""
Write-Host "To deploy:" -ForegroundColor Yellow
Write-Host "  1. Copy entire folder (including .next hidden dir):" -ForegroundColor Yellow
Write-Host "     rsync -avz ./deploy-bundle/ user@server:/var/www/your-site/" -ForegroundColor White
Write-Host "     OR: scp -r ./deploy-bundle/.  user@server:/var/www/your-site/" -ForegroundColor White
Write-Host "  2. On server: cd /var/www/your-site && node server.js"
Write-Host "  3. Server runs on port 3000 (set PORT env var to change)"
