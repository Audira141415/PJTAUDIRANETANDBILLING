@echo off
chcp 65001 >nul
cls
title AUDIRA NETWORKS - ISP Mobile Client Launcher (Android Emulator)
color 0B

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
echo  ║        AUDIRA NETWORKS • ISP MOBILE CLIENT EMULATOR LAUNCHER           ║
echo  ╚════════════════════════════════════════════════════════════════════════╝
echo.
echo           Founder: Agus Dwi Rianto • Official: https://audira.my.id
echo  ════════════════════════════════════════════════════════════════════════
echo.

REM 1. Resolusi direktori root dan direktori Flutter
set "SCRIPT_DIR=%~dp0"
if exist "%SCRIPT_DIR%AUDIRA-NET\pubspec.yaml" (
    set "PROJECT_ROOT=%SCRIPT_DIR%"
    set "FLUTTER_DIR=%SCRIPT_DIR%AUDIRA-NET"
) else if exist "%SCRIPT_DIR%pubspec.yaml" (
    set "PROJECT_ROOT=%SCRIPT_DIR%..\"
    set "FLUTTER_DIR=%SCRIPT_DIR%"
) else (
    set "PROJECT_ROOT=%SCRIPT_DIR%"
    set "FLUTTER_DIR=%SCRIPT_DIR%AUDIRA-NET"
)

REM 2. Deteksi Android SDK platform-tools
if exist "%LOCALAPPDATA%\Android\Sdk\platform-tools" (
    set "PATH=%LOCALAPPDATA%\Android\Sdk\platform-tools;%PATH%"
)
if defined ANDROID_HOME (
    if exist "%ANDROID_HOME%\platform-tools" (
        set "PATH=%ANDROID_HOME%\platform-tools;%PATH%"
    )
)

echo [1/4] Memeriksa instalasi Flutter SDK dan Android ADB...
where flutter >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [ERROR] Flutter SDK tidak ditemukan di PATH sistem!
    echo Pastikan Flutter SDK sudah terpasang dan ditambahkan ke System Environment Variables.
    pause
    exit /b 1
)
echo  - Flutter SDK: TERSEDIA

where adb >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [PERINGATAN] ADB command tidak ditemukan di PATH.
    echo Pastikan Android SDK platform-tools terpasang.
) else (
    echo  - Android ADB: TERSEDIA
)
echo.

REM 3. Deteksi Android Emulator yang Aktif
echo [2/4] Mendeteksi Android Emulator ISP yang sedang berjalan...
set "TARGET_EMU="
set "EMU_COUNT=0"

for /f "tokens=1" %%d in ('adb devices ^| findstr /R "emulator-[0-9]*"') do (
    set /a EMU_COUNT+=1
    if not defined TARGET_EMU (
        set "TARGET_EMU=%%d"
    )
)

if "%EMU_COUNT%"=="0" (
    echo  - Tidak ada emulator Android yang sedang aktif.
    echo  - Mencari Android Virtual Device (AVD)...
    set "AVD_NAME="
    for /f "tokens=1" %%a in ('emulator -list-avds 2^>nul') do (
        if not defined AVD_NAME set "AVD_NAME=%%a"
    )
    if defined AVD_NAME (
        echo  - Menjalankan AVD: %AVD_NAME%...
        start "" "%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe" -avd %AVD_NAME%
        echo  - Menunggu emulator boot selesai...
        adb wait-for-device
        timeout /t 10 /nobreak >nul
        set "TARGET_EMU=emulator-5554"
    ) else (
        echo  - Tidak ada AVD yang terdeteksi otomatis.
        echo.
        echo  [OPSI PILIHAN]:
        echo   [1] Jalankan di Windows Desktop
        echo   [2] Tunggu sampai Anda menyalakan emulator manual
        set /p "NO_EMU_CHOICE=Masukkan pilihan [1/2, default=1]: "
        if "%NO_EMU_CHOICE%"=="2" (
            echo Menunggu emulator aktif...
            adb wait-for-device
            set "TARGET_EMU=emulator-5554"
        ) else (
            echo Meluncurkan di Windows Desktop...
            cd /d "%FLUTTER_DIR%"
            flutter run -d windows
            pause
            exit /b 0
        )
    )
) else (
    echo  - Terdeteksi %EMU_COUNT% emulator aktif. Target default: %TARGET_EMU%
)
echo.

REM 4. Konfigurasi Reverse Port & Screen Wakeup
echo [3/4] Mengonfigurasi jaringan reverse port ADB & menyalakan layar...
if defined TARGET_EMU (
    echo  - Reverse port TCP 3218 (Backend NestJS API)...
    adb -s %TARGET_EMU% reverse tcp:3218 tcp:3218 >nul 2>nul
    echo  - Reverse port TCP 3217 (Admin Panel)...
    adb -s %TARGET_EMU% reverse tcp:3217 tcp:3217 >nul 2>nul
    echo  - Reverse port TCP 3219 (Customer Portal)...
    adb -s %TARGET_EMU% reverse tcp:3219 tcp:3219 >nul 2>nul
    echo  - Mengirim sinyal bangun layar emulator (Wakeup ^& Unlock)...
    adb -s %TARGET_EMU% shell input keyevent 224 >nul 2>nul
    adb -s %TARGET_EMU% shell input keyevent 82 >nul 2>nul
    echo [OK] Reverse port aktif! Aplikasi dapat mengakses API via http://localhost:3218
)
echo.

REM 5. Cek Kesehatan Backend API (Port 3218)
echo [4/4] Memeriksa status Backend API AUDIRA ISP (Port 3218)...
netstat -ano | findstr :3218 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo  - Backend API terdeteksi AKTIF di http://localhost:3218
) else (
    echo  - [PERHATIAN] Backend API belum berjalan di Port 3218!
    set /p "START_BE=Apakah Anda ingin menyalakan Backend API sekarang? [Y/n, default: Y]: "
    if /i "%START_BE%"=="" set "START_BE=Y"
    if /i "%START_BE%"=="Y" (
        echo  - Membuka jendela server Backend API...
        start "AUDIRA ISP - Backend API (Port 3218)" cmd /k "chcp 65001 >nul && title AUDIRA Backend API - Port 3218 && color 0B && cd /d "%PROJECT_ROOT%AUDIRA-BILLING\apps\backend" && npm run dev"
        echo  - Menunggu inisialisasi backend API...
        timeout /t 5 /nobreak >nul
    )
)
echo.

echo  ════════════════════════════════════════════════════════════════════════
echo   MELUNCURKAN APLIKASI ISP FLUTTER KE EMULATOR (%TARGET_EMU%)
echo  ════════════════════════════════════════════════════════════════════════
echo   * Petunjuk Hotkey Interaktif di Konsol Ini:
echo     - Tekan 'r' : Hot Reload (Pembaruan UI seketika tanpa reset state)
echo     - Tekan 'R' : Hot Restart (Reset state aplikasi sepenuhnya)
echo     - Tekan 'v' : Buka Flutter DevTools di browser
echo     - Tekan 'h' : Bantuan daftar perintah Flutter
echo     - Tekan 'q' : Berhenti / Keluar dari aplikasi
echo  ════════════════════════════════════════════════════════════════════════
echo.

cd /d "%FLUTTER_DIR%"
flutter run -d %TARGET_EMU%

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Gagal menjalankan aplikasi Flutter di emulator %TARGET_EMU%.
    pause
)
