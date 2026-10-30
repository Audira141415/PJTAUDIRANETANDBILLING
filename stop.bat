@echo off
setlocal enabledelayedexpansion
title AUDIRA NET ^& BILLING - Ecosystem Shutdown
cd /d "%~dp0"
color 0C

echo.
echo  +========================================================================+
echo  ^|                                                                        ^|
echo  ^|      AAA   U   U DDDD   III RRRR    AAA        N   N EEEEE TTTTT       ^|
echo  ^|     A   A  U   U D   D   I  R   R  A   A       NN  N E       T         ^|
echo  ^|     AAAAA  U   U D   D   I  RRRR   AAAAA  ---  N N N EEEEE   T         ^|
echo  ^|     A   A  U   U D   D   I  R  R   A   A       N  NN E       T         ^|
echo  ^|     A   A   UUU  DDDD   III R   R  A   A       N   N EEEEE   T         ^|
echo  ^|                                                                        ^|
echo  +========================================================================+
echo.
echo           Audira Net ^& Billing System - Server Shutdown
echo  ========================================================================
echo.
echo  [INFO] Menghentikan seluruh service AUDIRA NET ^& BILLING...
echo.

REM 1. Jalankan AUDIRA-BILLING shutdown jika ada
if exist "%~dp0AUDIRA-BILLING\stop-servers.bat" (
    call "%~dp0AUDIRA-BILLING\stop-servers.bat"
)

REM 2. Pastikan port 3217, 3218, 3219, 3001 benar-benar mati via PowerShell & Netstat
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3217,3218,3219,3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }" >nul 2>&1

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3217" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3218" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3219" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM 3. Bersihkan sisa jendela CMD
taskkill /FI "WindowTitle eq AudiraNET Backend*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AudiraNET Frontend*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AudiraNET Customer Portal*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AUDIRA Backend API*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AUDIRA Web Admin*" /F >nul 2>&1
taskkill /FI "WindowTitle eq AUDIRA Customer Portal*" /F >nul 2>&1
taskkill /FI "WindowTitle eq Audira Desk*" /F >nul 2>&1

echo.
echo  ========================================================================
echo   [SUKSES] Seluruh port dan layanan AUDIRA NET ^& BILLING telah bersih!
echo  ========================================================================
echo.
ping -n 3 127.0.0.1 >nul 2>&1
exit /b 0
