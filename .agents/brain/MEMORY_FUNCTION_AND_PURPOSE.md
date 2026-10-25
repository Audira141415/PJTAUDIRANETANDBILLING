# MEMORY FUNCTION & PURPOSE — AUDIRA DEV
> **Arsitektur Memori Jangka Panjang (Long-Term Memory / LTM) dan Protokol Operasi AI**  
> *Panduan Fundamental Mengenai Fungsi Memori, Hierarki Dokumen, dan Pencegahan Amnesia.*

---

## 1. Hakikat dan Peran Memori dalam Siklus Pengembangan

Dalam proyek berbasis Next.js 16 dan React 19 dengan integrasi grafis 3D WebGL, AI Agent dihadapkan pada ratusan variabel: konvensi async params, SSR boundaries, design tokens Tailwind v4, port server (3447/3448), dan skema database PostgreSQL.

Tanpa sistem memori yang persisten:
- AI akan merekomendasikan sintaks Next.js versi lama (misal: mengakses `params.slug` secara sinkron).
- AI akan lupa bahwa kanvas Three.js membutuhkan isolasi `"use client"` dan mobile fallback.
- AI akan lupa bahwa proyek dijalankan menggunakan `start.bat` di port `3447`.
- AI akan merusak gaya visual Neo-Brutalism dengan memperkenalkan bayangan halus (soft blur) yang tidak sesuai tema.

**Memory Hub** (yang terdiri dari `MEMORY.md` di root dan repositori `.agents/brain/`) bertindak sebagai jangkar pengetahuan (*ground truth anchor*).

---

## 2. Hierarki dan Pembagian Peran Dokumen Memori

```text
[ MEMORY.md (Root) ]  <----------------+   Tingkat 1: Ringkasan Eksekutif & Status Sesi
         |                             |   (Dibaca di awal & diupdate di akhir setiap sesi)
         v                             |
[ .agents/brain/INDEX.md ]             |   Tingkat 2: Peta Indeks & Penunjuk Arah
         |                             |   (Daftar modul pengetahuan terperinci)
         +-----------------------------+
         |
         +---> [ SYSTEM_ARCHITECTURE.md ] (Detail Next.js & WebGL Tree)
         +---> [ FEATURE_CATALOG.md ]     (Daftar Halaman & API)
         +---> [ DATABASE_AND_DATA_FLOW.md ] (Prisma & PostgreSQL Schema)
         +---> [ SECURITY_AND_GOVERNANCE.md ] (Sanitasi & Proteksi API)
         +---> [ PORTFOLIO_AND_SERVICE_MATRIX.md ] (Katalog Proyek & Artikel)
         +---> [ UPDATE_HISTORY_AND_ROADMAP.md ] (Changelog & Rencana V2)
```

---

## 3. Protokol Tri-Fase: Read, Act, Update

1. **Fase 1: Orientasi Konteks (Read)**:
   - Baca `MEMORY.md` untuk memahami pekerjaan yang sedang berjalan dan hal-hal yang perlu dihindari (*gotchas*).
   - Periksa sub-modul brain yang relevan sebelum menulis kode.
2. **Fase 2: Eksekusi Berdasarkan Aturan (Act)**:
   - Patuhi aturan di `.agents/rules/` dan panduan di `.agents/skills/`.
   - Jalankan verifikasi lokal (`npm run lint`, `npm run build`).
3. **Fase 3: Sinkronisasi Memori (Update)**:
   - Perbarui catatan tugas di `MEMORY.md`.
   - Jika ada fitur atau proyek baru yang ditambahkan, masukkan ke modul brain yang bersangkutan.
