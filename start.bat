@echo off
chcp 65001 >nul
cls
title AUDIRA NET & BILLING - Server Launcher
cd /d "%~dp0"

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
echo           Audira Net & Billing System - Master Launcher
echo  ════════════════════════════════════════════════════════════════════════
echo.
echo  Pilih opsi layanan yang ingin dijalankan:
echo.
echo  [1] Jalankan Semua Server Billing (Backend: 3218, Admin: 3217, Portal: 3219) [DEFAULT]
echo  [2] Jalankan Frontend Admin Saja (Port 3217)
echo  [3] Jalankan Backend API Saja (Port 3218)
echo  [4] Jalankan Customer Portal & Landing Saja (Port 3219)
echo  [5] Jalankan Mobile App AUDIRA-NET (Flutter)
echo  [6] Jalankan Full Integration (Billing + Mobile)
echo  [0] Keluar
echo.
echo  ════════════════════════════════════════════════════════════════════════
set /p "CHOICE=Masukkan pilihan Anda [1-6, default=1]: "

if "%CHOICE%"=="" set "CHOICE=1"
if "%CHOICE%"=="1" goto opt_billing_all
if "%CHOICE%"=="2" goto opt_frontend
if "%CHOICE%"=="3" goto opt_backend
if "%CHOICE%"=="4" goto opt_portal
if "%CHOICE%"=="5" goto opt_mobile
if "%CHOICE%"=="6" goto opt_full
if "%CHOICE%"=="0" exit /b 0

echo [ERROR] Pilihan tidak valid. Menjalankan default opsi [1]...
timeout /t 2 >nul
goto opt_billing_all

:opt_billing_all
echo.
echo [*] Meluncurkan seluruh server AUDIRA-BILLING...
cd /d "%~dp0AUDIRA-BILLING"
call start-servers.bat
exit /b 0

:opt_frontend
echo.
echo [*] Meluncurkan Frontend Admin (Port 3217)...
cd /d "%~dp0AUDIRA-BILLING\apps\frontend"
start "AudiraNET Frontend" cmd /k "chcp 65001 >nul && color 0E && echo. && echo AUDIRA WEB ADMIN - PORT 3217 && echo. && npm run dev"
echo [OK] Frontend berhasil dijalankan di http://localhost:3217
pause
exit /b 0

:opt_backend
echo.
echo [*] Meluncurkan Backend API (Port 3218)...
cd /d "%~dp0AUDIRA-BILLING\apps\backend"
start "AudiraNET Backend" cmd /k "chcp 65001 >nul && color 0B && echo. && echo AUDIRA BACKEND API - PORT 3218 && echo. && pnpm run dev"
echo [OK] Backend berhasil dijalankan di http://localhost:3218
pause
exit /b 0

:opt_portal
echo.
echo [*] Meluncurkan Customer Portal & Landing (Port 3219)...
cd /d "%~dp0AUDIRA-BILLING\apps\customer-portal"
start "AudiraNET Customer Portal" cmd /k "chcp 65001 >nul && color 0A && echo. && echo AUDIRA CUSTOMER PORTAL - PORT 3219 && echo. && npm run dev"
echo [OK] Customer Portal berhasil dijalankan di http://localhost:3219
pause
exit /b 0

:opt_mobile
echo.
echo [*] Meluncurkan AUDIRA-NET Mobile di Android Emulator...
cd /d "%~dp0"
call start_app.bat
exit /b 0

:opt_full
echo.
echo [*] Meluncurkan Full Integration (Billing + Mobile)...
cd /d "%~dp0AUDIRA-BILLING"
start cmd /c "call start-servers.bat"
timeout /t 5 /nobreak >nul
cd /d "%~dp0AUDIRA-NET"
call start-flutter-only.bat
pause
exit /b 0
