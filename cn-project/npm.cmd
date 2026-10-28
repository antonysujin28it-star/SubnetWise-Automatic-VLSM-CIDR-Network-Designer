@echo off
if "%1"=="start" goto start_server
if "%1"=="run" if "%2"=="start" goto start_server
if "%1"=="run" if "%2"=="dev" goto start_server
if "%1"=="dev" goto start_server
if "%1"=="test" goto run_tests
if "%1"=="install" goto info
if "%1"=="i" goto info

:start_server
echo Starting SubnetWise server on port 3000...
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000"
call "%~dp0node.cmd" "%~dp0server.js"
goto end

:run_tests
call "%~dp0node.cmd" "%~dp0src\tests\test-engine.js"
goto end

:info
echo ========================================================
echo SubnetWise — Zero npm dependencies required!
echo ========================================================
echo All libraries (React, ReactDOM, Tailwind CSS, SQLite) are
echo natively built-in and pre-bundled in public/vendor/.
echo.
echo No installation needed. The project is 100%% ready!
echo To start the server, run:
echo    .\npm.cmd start
echo or
echo    .\start.bat
echo ========================================================
goto end

:end
