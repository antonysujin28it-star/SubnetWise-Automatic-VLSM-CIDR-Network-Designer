@echo off
title SubnetWise - Network Designer
echo ========================================================
echo Starting SubnetWise - Automatic VLSM/CIDR Network Designer
echo ========================================================
echo.
echo 1. Launching local web server on port 3000...
echo 2. Opening your browser to http://localhost:3000...
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo ========================================================

:: Open default browser after 1 second
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000"

:: Start the Node server using local node.cmd wrapper
call "%~dp0node.cmd" "%~dp0server.js"

pause
