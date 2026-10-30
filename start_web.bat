@echo off
setlocal enabledelayedexpansion
title AUDIRA NET ^& BILLING - Web Ecosystem Launcher [Web Only]

echo ========================================================
echo   AUDIRA NET ^& BILLING - Web Ecosystem Launcher
echo   Mode: Khusus Web ^& Backend (Tanpa Mobile Emulator)
echo   Founder: Agus Dwi Rianto - https://audira.my.id
echo ========================================================
echo.

set "PROJECT_ROOT=%~dp0"

REM 1. Periksa dan Nyalakan Database Docker
echo [1/4] Memeriksa status Database Docker...
docker ps >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    docker start sebilling-postgres sebilling-redis >nul 2>&1
    echo  - PostgreSQL [Port 5455]: AKTIF
    echo  - Redis Cache [Port 6379]: AKTIF
) else (
    echo  [PERINGATAN] Docker daemon tidak terdeteksi aktif.
    echo  Jika database belum berjalan, pastikan Docker Desktop menyala.
)
echo.

REM 2. Periksa dan Luncurkan Backend REST API (Port 3218)
echo [2/4] Memeriksa status Backend REST API [Port 3218]...
netstat -ano | findstr :3218 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo  - Backend API: SUDAH AKTIF di http://localhost:3218
) else (
    echo  - Meluncurkan Backend API di Port 3218...
    start "AUDIRA Backend API" cmd /k "title AUDIRA Backend API - Port 3218 && color 0B && cd /d "%PROJECT_ROOT%AUDIRA-BILLING\apps\backend" && npm run dev"
    echo  - Menunggu inisialisasi Backend...
    ping -n 4 127.0.0.1 >nul 2>&1
)
echo.

REM 3. Periksa dan Luncurkan Web Admin Portal (Port 3217)
echo [3/4] Memeriksa status Web Admin Portal [Port 3217]...
netstat -ano | findstr :3217 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo  - Web Admin: SUDAH AKTIF di http://localhost:3217
) else (
    echo  - Meluncurkan Web Admin di Port 3217...
    start "AUDIRA Web Admin" cmd /k "title AUDIRA Web Admin - Port 3217 && color 0E && cd /d "%PROJECT_ROOT%AUDIRA-BILLING\apps\frontend" && npm run dev"
    ping -n 3 127.0.0.1 >nul 2>&1
)
echo.

REM 4. Periksa dan Luncurkan Customer Self-Service Portal (Port 3219)
echo [4/4] Memeriksa status Customer Portal [Port 3219]...
netstat -ano | findstr :3219 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo  - Customer Portal: SUDAH AKTIF di http://localhost:3219
) else (
    echo  - Meluncurkan Customer Portal di Port 3219...
    start "AUDIRA Customer Portal" cmd /k "title AUDIRA Customer Portal - Port 3219 && color 0A && cd /d "%PROJECT_ROOT%AUDIRA-BILLING\apps\customer-portal" && npm run dev"
    ping -n 3 127.0.0.1 >nul 2>&1
)
echo.

echo ========================================================
echo   SELURUH LAYANAN WEB AUDIRA BERHASIL DIJALANKAN
echo ========================================================
echo   * Landing Page Produk (SaaS) : http://localhost:3217/landing [Brosur Jual ala SeBilling]
echo   * Web Admin ^& NOC Cockpit    : http://localhost:3217
echo   * Customer Self-Care Portal  : http://localhost:3219
echo   * Backend REST API           : http://localhost:3218
echo   * Database PostgreSQL        : localhost:5455
echo   * Redis Cache Server         : localhost:6379
echo   * Mobile Emulator            : TIDAK DIAKTIFKAN [Hemat Resource RAM]
echo ========================================================
echo.
echo Membuka portal ^& landing page di browser default...
start http://localhost:3217/landing
start http://localhost:3217
start http://localhost:3219

echo.
echo Tekan tombol apa saja untuk menutup jendela peluncur ini...
pause >nul
exit /b 0
