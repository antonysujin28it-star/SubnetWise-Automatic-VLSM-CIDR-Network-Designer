# SubnetWise - PowerShell Launcher
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Starting SubnetWise - Automatic VLSM/CIDR Network Designer" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Launching server on http://localhost:3000..." -ForegroundColor Green
Write-Host "2. Opening default web browser..." -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

Start-Process "http://localhost:3000"
& "$PSScriptRoot\node.cmd" "$PSScriptRoot\server.js"
