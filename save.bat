@echo off
setlocal enabledelayedexpansion
title AUDIRA NET & BILLING - GitHub Save and Push Utility
cd /d "%~dp0"

echo ==============================================================================
echo           AUDIRA NET & BILLING - GITHUB SAVE AND PUSH UTILITY
echo                  Created by Agus Dwi Rianto (AUDIRA)
echo ==============================================================================
echo Remote URL : https://github.com/Audira141415/PJTAUDIRANETANDBILLING.git
echo Working Dir: %cd%
echo ==============================================================================
echo.

REM 1. Verifikasi instalasi Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git tidak ditemukan di PATH sistem.
    echo Silakan instal Git for Windows terlebih dahulu: https://git-scm.com/
    echo.
    pause
    exit /b 1
)

REM 2. Setup GitHub CLI credential helper jika gh tersedia
where gh >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Mengoptimalkan kredensial Git via GitHub CLI...
    gh auth setup-git >nul 2>&1
)

REM 3. Inisialisasi Git jika belum ada
if not exist ".git" (
    echo [*] Menginisialisasi repositori Git lokal...
    git init
    git branch -M master
    echo.
)

REM 4. Konfigurasi Remote Origin
set "REPO_URL=https://github.com/Audira141415/PJTAUDIRANETANDBILLING.git"
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [*] Menambahkan remote origin: %REPO_URL%
    git remote add origin %REPO_URL%
) else (
    echo [*] Memperbarui remote origin ke: %REPO_URL%
    git remote set-url origin %REPO_URL%
)

REM 5. Deteksi Cabang Git Aktif (master atau main)
for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set "ACTIVE_BRANCH=%%i"
if not defined ACTIVE_BRANCH set "ACTIVE_BRANCH=master"
echo [*] Cabang aktif: !ACTIVE_BRANCH!

REM 6. Minta input pesan commit dari pengguna
set "DEFAULT_MSG=feat(monorepo): update AUDIRA NET & BILLING ecosystem %date% %time%"
echo.
set "USER_MSG=%~1"
if not defined USER_MSG (
    set /p "USER_MSG=Masukkan pesan commit (Tekan Enter untuk default): "
)
if not defined USER_MSG set "USER_MSG=!DEFAULT_MSG!"
set "TEST_EMPTY=!USER_MSG: =!"
if "!TEST_EMPTY!"=="" set "USER_MSG=!DEFAULT_MSG!"

REM 7. Staging berkas
echo.
echo [*] Melakukan git add...
git add .

REM 8. Periksa apakah ada perubahan untuk dicommit
git diff --cached --quiet
if %errorlevel% neq 0 (
    echo [*] Menyimpan commit: "!USER_MSG!"...
    git commit -m "!USER_MSG!"
) else (
    echo [INFO] Tidak ada perubahan baru yang perlu di-commit di root repo.
)

REM 9. Push ke GitHub
echo.
echo [*] Mengunggah (push) ke GitHub origin !ACTIVE_BRANCH!...
git push -u origin !ACTIVE_BRANCH!
set "PUSH_STATUS=%errorlevel%"
if !PUSH_STATUS! neq 0 (
    echo.
    echo [WARN] Push pertama ditolak. Kemungkinan remote memiliki commit berbeda.
    echo [*] Mencoba sinkronisasi aman: git pull --rebase origin !ACTIVE_BRANCH!...
    git pull --rebase origin !ACTIVE_BRANCH!
    echo [*] Mengulang proses push ke GitHub...
    git push -u origin !ACTIVE_BRANCH!
    set "PUSH_STATUS=!errorlevel!"
)

REM 10. Status Akhir Monorepo
echo.
if !PUSH_STATUS! equ 0 (
    echo ==============================================================================
    echo   [SUKSES] Berkas Monorepo berhasil di-push ke GitHub!
    echo   Lihat di: https://github.com/Audira141415/PJTAUDIRANETANDBILLING
    echo ==============================================================================
) else (
    echo ==============================================================================
    echo   [PERHATIAN] Push belum berhasil.
    echo   Pastikan akun GitHub Anda memiliki hak akses ke repo tersebut.
    echo ==============================================================================
)

echo.
echo ==============================================================================
echo [INFO] Repositori Ekosistem Terhubung:
echo  1. Mobile App   : https://github.com/Audira141415/AUDIRA-NET.git (AUDIRA-NET\save.bat)
echo  2. Web Engine   : https://github.com/Audira141415/AUDIRA-BILLING.git (AUDIRA-BILLING\save.bat)
echo  3. Monorepo Root: https://github.com/Audira141415/PJTAUDIRANETANDBILLING.git (save.bat)
echo ==============================================================================
echo.
pause
