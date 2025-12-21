@echo off
REM Script to move audit markdown files from repo root to docs\audits\
SETLOCAL
if not exist "docs\audits" mkdir "docs\audits"

set files=EXECUTIVE_SUMMARY_WEB_VS_MOBILE.md FILE_LIST_SUMMARY.md INDEX_WEB_VS_MOBILE_AUDIT.md MOBILE_APP_FEATURES_ANALYSIS.md MOBILE_FEATURES_TABLE.md MOBILE_FILE_MAPPING.md MOBILE_VS_WEB_COMPARISON.md QUICK_REFERENCE_MISSING_FEATURES.md README_WEB_VS_MOBILE_AUDIT.md SECURITY_AUDIT_REPORT.md SECURITY_FIXES_COMPLETED.md VISUAL_COMPARISON_CHART.md WEB_ANALYSIS_SUMMARY.md WEB_APPLICATION_FEATURES_ANALYSIS.md WEB_FEATURES_TABLE.md WEB_FILE_MAPPING.md WEB_VS_MOBILE_AUDIT_REPORT.md

for %%f in (%files%) do (
  if exist "%%f" (
    move /Y "%%f" "docs\audits\" >nul
    echo Moved %%f
  ) else (
    echo Skipping missing %%f
  )
)

echo Done moving audit docs. Check docs\audits\
ENDLOCAL
