---
name: audira-safe-deployment
description: >-
  Use this skill when validating Next.js builds, checking port availability (3447/3448),
  running linters, and executing git push via save.bat for AUDIRA DEV.
---

# Audira Safe Deployment & Runbook Skill

Petunjuk operasional dan standar keselamatan untuk memvalidasi kompilasi kode (`npm run build`), memeriksa port lokal, dan mengeksekusi git commit push via `save.bat`.

---

## 1. Safety Gates & Critical Directives

1. **MULTI-PROJECT WORKSPACE ISOLATION**:
   - Di workstation pengguna terdapat beberapa proyek aktif (`AUDIRA-TOPUPGAME`, `AUDIRA-3D-SIMULATOR`, `AUIDRA-PORTOFOLIO`).
   - Dilarang mematikan proses node di luar port `3447` dan `3448`.
   - Gunakan `stop.bat` yang secara khusus hanya menargetkan port 3447 dan 3448.
2. **PRE-FLIGHT VALIDATION**:
   - Setiap rilis atau commit wajib lulus kompilasi lokal (`npm run build`) dengan 0 kesalahan TypeScript.

---

## 2. Checklist Validasi Pre-Flight

Jalankan perintah berikut sebelum commit atau push:

```bash
# 1. Periksa status git
git status

# 2. Linter kode
npm run lint

# 3. Validasi tipe TypeScript
npx tsc --noEmit

# 4. Kompilasi build Next.js produksi
npm run build
```

---

## 3. Eksekusi Script Otomasi Lokal

- **Menjalankan Dev Server**:
  ```cmd
  .\start.bat
  ```
  *(Membuka server di port 3447)*

- **Menghentikan Dev Server**:
  ```cmd
  .\stop.bat
  ```
  *(Membersihkan port 3447 & 3448 via taskkill)*

- **Commit & Push ke GitHub**:
  ```cmd
  .\save.bat
  ```
  *(Menambahkan perubahan, meminta pesan commit, dan push ke branch main)*
