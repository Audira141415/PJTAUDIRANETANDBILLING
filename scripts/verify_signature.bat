@echo off
chcp 65001 >nul
cls
title AUDIRA - Digital Signature Authenticity Checker
color 0A

echo ==============================================================================
echo        AUDIRA CRYPTOGRAPHIC SIGNATURE ^& DIGITAL IDENTITY VERIFIER
echo                    Author: Agus Dwi Rianto (AUDIRA)
echo                    Official Domain: https://audira.my.id
echo ==============================================================================
echo.

node "%~dp0verify_audira_signature.js"

echo.
echo ==============================================================================
pause
