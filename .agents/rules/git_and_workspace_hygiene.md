# GIT & WORKSPACE HYGIENE STANDARDS
> **Rule ID**: `WORKSPACE-HYGIENE-PORTOFOLIO-01`  
> **Target**: Seluruh AI Agent, Pair Programmer, dan Pengembang di AUDIRA DEV.  
> **Level**: MANDATORY (Integritas Repositori & Isolasi Lingkungan Port).

---

## 1. Multi-Port Workspace Isolation

1. **Port Alokasi Khusus**:
   * Frontend: Port `3447` (`npm run dev:frontend` atau `.\start.bat`).
   * Backend / API: Port `3448` (`npm run dev:backend`).
2. **Larangan Keras**:
   * Dilarang menjalankan perintah pembersihan port global (`kill-port`, `taskkill`) tanpa filter yang dapat mematikan proses proyek Audira lain yang sedang berjalan di mesin developer.
   * Gunakan selalu skrip [stop.bat](file:///f:/AUIDRA-PORTOFOLIO/stop.bat) yang secara terarah hanya menargetkan port `3447` dan `3448`.

---

## 2. Standar Commit & Git Workflow (`save.bat`)

1. **Format Pesan Commit Konvensional**:
   Setiap commit wajib memiliki format deskriptif dengan tipe awalan:
   * `feat: ...` (Menambahkan fitur baru / studi kasus / artikel blog)
   * `fix: ...` (Memperbaiki bug fungsional atau tampilan visual)
   * `docs: ...` (Memperbarui dokumentasi brain, rules, atau README)
   * `style: ...` (Perbaikan CSS Neo-Brutalism tanpa mengubah logika)
   * `perf: ...` (Optimasi Three.js WebGL atau bundle Next.js)
   * `chore: ...` (Pembaruan dependencies, skrip batch, atau konfigurasi)
2. **Otomasi Aman via `save.bat`**:
   * Seluruh alur `git add -A`, `git commit -m`, dan `git push origin main` wajib divalidasi terlebih dahulu agar tidak melakukan push kode rusak (`npm run build` sukses).
   * Dilarang menjalankan perintah destruktif seperti `git push --force` atau `git reset --hard` pada branch utama `main`.
