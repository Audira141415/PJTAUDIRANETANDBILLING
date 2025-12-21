@echo off
title Backend Services - AudiraNet
color 0A

echo.
echo ================================================
echo   STARTING BACKEND SERVICES
echo ================================================
echo.
echo [1] PostgreSQL Database (Docker)
echo [2] NestJS Backend API (Port 4000)
echo [3] Next.js Admin Web (Port 3000)
echo.
echo ================================================
echo.

REM Check if backend folder exists
if not exist "%~dp0..\PJTBillingByAudira" (
    color 0C
    echo [ERROR] Backend folder not found!
    echo Expected: %~dp0..\PJTBillingByAudira
    echo.
    pause
    exit /b 1
)

REM Navigate to backend folder and call start script
cd /d "%~dp0..\PJTBillingByAudira"

echo Starting backend services...
echo.
start "" "%~dp0..\PJTBillingByAudira\start-servers.bat"

echo.
echo Waiting for services to start (20 seconds)...
timeout /t 20 /nobreak

echo.
echo ================================================
echo   BACKEND SERVICES STARTED!
echo ================================================
echo.
echo Backend API:    http://localhost:4000
echo Admin Web:      http://localhost:3000
echo Health Check:   http://localhost:4000/health
echo.
echo Press any key to open health check...
pause >nul
start http://localhost:4000/health

echo.
cd /d "%~dp0"
pause
