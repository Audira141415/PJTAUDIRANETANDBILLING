@echo off
chcp 65001 >nul
cls
title AUDIRA NET & BILLING - Shutdown Utility
cd /d "%~dp0"
color 0C

echo.
echo  ╔════════════════════════════════════════════════════════════════════════╗
echo  ║                                                                        ║
echo  ║            █████╗ ██╗   ██╗██████╗ ██╗██████╗  █████╗                 ║
echo  ║           ██╔══██╗██║   ██║██╔══██╗██║██╔══██╗██╔══██╗                ║
echo  ║           ███████║██║   ██║██║  ██║██║██████╔╝███████║                ║
echo  ║           ██╔══██║██║   ██║██║  ██║██║██╔══██╗██╔══██║                ║
echo  ║           ██║  ██║╚██████╔╝██████╔╝██║██║  ██║██║  ██║                ║
echo  ║           ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝                ║
echo  ║                                                                        ║
echo  ╚════════════════════════════════════════════════════════════════════════╝
echo.
echo           Audira Net & Billing System - Server Shutdown
echo  ════════════════════════════════════════════════════════════════════════
echo.
echo  [INFO] Menghentikan seluruh service AUDIRA NET & BILLING...
echo.

REM 1. Panggil shutdown handler dari AUDIRA-BILLING jika tersedia
if exist "%~dp0AUDIRA-BILLING\stop-servers.bat" (
    cd /d "%~dp0AUDIRA-BILLING"
    call stop-servers.bat
    cd /d "%~dp0"
) else (
    echo [1/4] Menghentikan Frontend Web Admin (Port 3217)...
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3217 ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )

    echo [2/4] Menghentikan Backend NestJS (Port 3218)...
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3218 ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )

    echo [3/4] Menghentikan Customer Portal (Port 3219)...
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3219 ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )

    echo [4/4] Menghentikan legacy service port 3001...
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)

REM 2. Tutup jendela CMD yang berjudul Audira
taskkill /FI "WindowTitle eq AudiraNET Backend*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AudiraNET Frontend*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AudiraNET Customer Portal*" /F >nul 2>&1
taskkill /FI "WindowTitle eq Audira Desk*" /F >nul 2>&1

echo.
echo  ════════════════════════════════════════════════════════════════════════
echo   [SUKSES] Seluruh layanan AUDIRA NET & BILLING telah dihentikan!
echo  ════════════════════════════════════════════════════════════════════════
echo.
timeout /t 3 /nobreak >nul
