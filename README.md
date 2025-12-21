# Project: PJT Audira Net & Billing (monorepo)

This repository contains multiple projects and supporting documentation. Changes made to structure:

- Added `.gitignore` at repository root to ignore build artifacts and sensitive files.
- Added `docs/` and `docs/audits/` to group audit and analysis markdown files.
- Added `scripts/move_audit_docs.bat` to safely relocate audit markdown files from the repo root into `docs/audits/`.

Important notes:
- Do NOT commit sensitive files (for example `google-services.json`, keystore files). Keep them out of the repo and provide setup instructions in the relevant subproject's README.
- The move script will skip files that don't exist and will report what it moves. Review `docs/TOC.md` for expected files.

To move the audit markdown files into the new folder, run (from repository root):

```powershell
.\scripts\move_audit_docs.bat
```

If you want me to run the move script now, tell me and I'll execute it.
