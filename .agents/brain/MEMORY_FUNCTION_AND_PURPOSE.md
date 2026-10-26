# MEMORY FUNCTION & PURPOSE — AUDIRA-NET & BILLING ECOSYSTEM

> **Arsitektur Memori Jangka Panjang (Long-Term Memory / LTM) dan Protokol Operasi AI**  
> *Panduan Fundamental Mengenai Fungsi Memori, Hierarki Dokumen, dan Pencegahan Amnesia.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Hakikat dan Peran Memori dalam Siklus Pengembangan ISP

Dalam ekosistem terpadu **AUDIRA-NET & BILLING** yang mencakup Backend NestJS 10 (Port 3218), Frontend Web Admin Next.js 14 (Port 3217), Customer Portal (Port 3001), PostgreSQL Docker (Port 5455), Redis (Port 6379), serta Mobile Native Flutter (khusus Android Emulator AVD `ISP`), AI Agent dihadapkan pada puluhan variabel kritis dan dependensi multi-sistem.

Tanpa sistem memori yang persisten:
- AI akan lupa bahwa aplikasi mobile Flutter **HANYA BOLEH** dijalankan di emulator AVD bernama **`ISP`**, dan secara fatal dapat mengganggu emulator proyek lain yang sedang aktif di workstation (`MDA` untuk Comic Reader atau `DC` untuk Data Center OS).
- AI akan lupa bahwa skrip peluncur resmi adalah [start_web.bat](file:///f:/AUDIRA-NET-BILLING/start_web.bat) dan [start_app.bat](file:///f:/AUDIRA-NET-BILLING/start_app.bat).
- AI akan memperkenalkan class Tailwind gelap tanpa prefix `dark:` (seperti `bg-slate-950` atau `bg-slate-900`) yang menyebabkan kotak hitam pekat di Light Mode.
- AI akan lupa alokasi port baku (3217/3218/3001/5455/6379) atau mengeksekusi `taskkill /f /im node.exe` yang mematikan server proyek lain.
- AI akan menyarankan `prisma migrate reset` yang dapat menghapus data pelanggan riil.

**Memory Hub** (yang terdiri dari `MEMORY.md` di root dan repositori `.agents/brain/`) bertindak sebagai jangkar pengetahuan (*ground truth anchor*).

---

## 2. Hierarki dan Pembagian Peran Dokumen Memori

```text
[ MEMORY.md (Root Proyek) ]  <---------------+   Tingkat 1: Ringkasan Eksekutif & Status Sesi
         |                                    |   (Wajib dibaca di awal & diupdate di akhir)
         v                                    |
[ .agents/brain/INDEX.md ]                    |   Tingkat 2: Peta Indeks & Penunjuk Arah
         |                                    |   (Daftar modul pengetahuan terperinci)
         +------------------------------------+
         |
         +---> [ SYSTEM_ARCHITECTURE.md ]     (Topologi Monorepo, Microservices & Port Map)
         +---> [ FEATURE_CATALOG.md ]         (Master Katalog 50 Modul Backend & 80+ Halaman)
         +---> [ DATABASE_AND_DATA_FLOW.md ]  (Prisma ORM, Skema DB & Alur Zero-Touch Billing)
         +---> [ SECURITY_AND_GOVERNANCE.md ] (RBAC, Enkripsi MikroTik & Isolasi Port)
         +---> [ ENV_AND_SECRETS_REFERENCE.md](Variabel .env, Port Map & Kredensial Sanitasi)
         +---> [ DEVICE_AND_EMULATOR_ENV.md ] (Aturan Isolasi Mutlak Android Emulator AVD ISP)
         +---> [ SERVICE_AND_PACKAGE_MATRIX.md] (Katalog Paket Internet, Bandwidth & SLA ISP)
         +---> [ ANALYTICS_AND_CONVERSION.md ](Metrik Operasional ISP: MRR, ARPU, Churn, Uptime)
         +---> [ UPDATE_HISTORY_AND_ROADMAP.md] (Changelog Versi & Roadmap Pengembangan)
```

---

## 3. Protokol Tri-Fase: Read, Act, Update

1. **Fase 1: Orientasi Konteks (Read)**:
   - Baca [MEMORY.md](file:///f:/AUDIRA-NET-BILLING/MEMORY.md) di root untuk memahami pekerjaan yang sedang berjalan, fokus aktif, dan gotchas penting.
   - Periksa sub-modul brain yang relevan di `.agents/brain/` sebelum menulis atau mengubah kode.
2. **Fase 2: Eksekusi Berdasarkan Aturan (Act)**:
   - Patuhi aturan di `.agents/rules/` dan panduan di `.agents/skills/`.
   - Pastikan styling menggunakan token CSS semantik (`--app-card`, `--app-card-subtle`, `--app-border`, `--app-text`, `--app-text-muted`) agar tampilan Light/Dark mode selalu sempurna.
   - Jangan pernah menyentuh emulator selain AVD bernama **`ISP`**.
   - Jalankan verifikasi lokal (`npx tsc --noEmit`).
3. **Fase 3: Sinkronisasi Memori (Update)**:
   - Perbarui catatan tugas di [MEMORY.md](file:///f:/AUDIRA-NET-BILLING/MEMORY.md).
   - Jika ada modul, endpoint, atau skema baru yang ditambahkan, sinkronkan ke sub-modul brain yang bersangkutan.
