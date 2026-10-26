# MEMORY.md — AUDIRA-NET & BILLING Long-Term Memory (LTM) & Context Retention Protocol

> **Fungsi Utama Dokumen Ini:**  
> `MEMORY.md` adalah **otak jangka panjang (Long-Term Memory / LTM)** dan **Single Source of Truth (SSOT)** sistem AUDIRA-NET & BILLING bagi Developer (Agus Dwi Rianto) dan seluruh AI Agent (Antigravity, Cursor, Windsurf, GitHub Copilot, Claude Code).  
> Dokumen ini memastikan seluruh AI Agent tidak mengalami *amnesia konteks*, tidak mengulangi kesalahan masa lalu, memahami arsitektur ISP multi-service, dan **SELALU MENGETAHUI & MEMATUHI ATURAN ISOLASI EMULATOR AVD `ISP` SERTA STANDAR DESIGN TOKENS THEME**.

---

## 📑 DAFTAR ISI

1. [Bagian I: Status Terkini & Fokus Aktif (Active Sprint)](#bagian-i-status-terkini--fokus-aktif)
2. [Bagian II: Profil Sistem & Matriks Port / Lingkungan](#bagian-ii-profil-sistem--matriks-port--lingkungan)
3. [Bagian III: Task Board & Tracking Perkembangan](#bagian-iii-task-board--tracking-perkembangan)
4. [Bagian IV: Gotchas, Pitfalls & Pelajaran Teknis Penting](#bagian-iv-gotchas-pitfalls--pelajaran-teknis-penting)
5. [Bagian V: Tiga Tingkatan Hierarki Memori (The 3-Tier Memory Architecture)](#bagian-v-tiga-tingkatan-hierarki-memori)
6. [Bagian VI: Protokol "READ FIRST, ACT SECOND, UPDATE ON FINISH"](#bagian-vi-protokol-read-first-act-second-update-on-finish)

---

## BAGIAN I: STATUS TERKINI & FOKUS AKTIF

### 🚨 CURRENT ACTIVE FOCUS: THEME TOKEN HARMONIZATION & MOBILE FIELD OPS (AVD `ISP`)
> **STATUS PERMANEN KONTEKS:**  
> 1. Terakhir dan saat ini, kita baru saja menyelesaikan **perbaikan kontras Light Mode pada Invoice & Theme Tokens** (menghilangkan seluruh blok pitch black / dark slate di Mode Terang dengan menerapkan token universal `--app-card`, `--app-card-subtle`, `--app-border`, `--app-text`, `--app-text-muted`).
> 2. Di sisi Mobile Native (Flutter `AUDIRA-NET`), integrasi dan pengujian lapangan **HANYA BOLEH DIJALANKAN DI ANDROID EMULATOR DENGAN AVD BERNAMA `ISP`**.
> **Seluruh AI Agent DILARANG KERAS melupakan status integrasi aktif ini dan DILARANG mengganggu emulator proyek lain (`MDA` atau `DC`).**

#### Rincian Penyelesaian Terakhir (Theme & Invoice Fixes):
- **Internal Invoice (`/invoice/[id]`)**: Dirombak menggunakan `bg-[var(--app-card-subtle)]`, `border-[var(--app-border)]`, dan `text-[var(--app-text)]` sehingga panel pelanggan, tabel layanan, rincian biaya, catatan jatuh tempo, dan saluran pembayaran BCA/Mandiri/QRIS tampil bersih putih & slate-50 di Mode Terang.
- **Public Invoice (`/invoice/public/[id]`)**: Menghilangkan hardcoded dark classes (`bg-[#0B0F19]`, `bg-slate-950`, `bg-slate-900`) dan mendaftarkan rute ini sebagai `isStandalone` di `apps/frontend/src/pages/_app.tsx` agar tidak memunculkan Admin Sidebar saat diakses publik.
- **Tailwind Config JIT**: Menambahkan `'card-subtle': 'var(--app-card-subtle)'` di `theme.colors.theme` untuk konsistensi token CSS.
- **Resilience Fixes**: Menambahkan default fallback pada `backup.tsx`, melengkapi halaman `terms.tsx` dan `privacy.tsx` untuk menghilangkan 404 pada register/login, serta memperbaiki TypeScript definitions di `customer/invoices.tsx`, `customer/tickets.tsx`, `pelanggan/[id].tsx`, dan `work-order-detail.tsx` (`tsc --noEmit` exit 0).

---

## BAGIAN II: PROFIL SISTEM & MATRIKS PORT / LINGKUNGAN

- **Nama Proyek**: AUDIRA-NET & BILLING ECOSYSTEM
- **Author & Founder**: **Agus Dwi Rianto (AUDIRA)**
- **Organisasi**: Audira Multimedia Digital / Audira Sukses Mandiri
- **Domain Resmi**: [https://audira.my.id](https://audira.my.id)
- **Email Resmi**: [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com)
- **WhatsApp Hotline**: `+62 821-1200-1600`
- **Lisensi**: Proprietary & Commercial (`LICENSE`)

### Matriks Alokasi Port & Layanan Workstation

| Layanan / Komponen | Host / Jaringan | Port | Protokol & Keterangan |
| :--- | :--- | :---: | :--- |
| **Frontend Web Admin** | `localhost` | `3217` | Next.js 14 Pages Router (`apps/frontend`, `start_web.bat`) |
| **Backend REST API** | `localhost` | `3218` | NestJS 10 Core Server (`apps/backend`, `start_web.bat`) |
| **Customer Portal** | `localhost` | `3001` | Next.js 14 Self-Service Portal (`apps/customer-portal`) |
| **PostgreSQL Database**| Docker Container | `5455` | PostgreSQL 15 Container `sebilling-postgres` (DB: `sebilling`) |
| **Redis Cache / Queue**| Docker Container | `6379` | Redis 7 Container `sebilling-redis` |
| **FreeRADIUS Server** | Docker / Host | `1812` / `1813` | RADIUS Authentication & Accounting |
| **Prisma Studio GUI** | Local CLI | `5555` | `pnpm run prisma:studio` (inspeksi tabel database) |
| **Android Emulator Host Loopback** | Android SDK | `10.0.2.2` | Loopback internal emulator ke port host (3218 / 3217) |
| **Android Emulator AVD `ISP`** | Local ADB Daemon | Port Dinamis | Khusus AVD **`ISP`** (`start_app.bat`), abaikan `MDA`/`DC` |

---

## BAGIAN III: TASK BOARD & TRACKING PERKEMBANGAN

### ✅ Completed Milestones
- [x] **Monorepo & Multi-Service Foundation**:
  - Konfigurasi Docker Compose untuk PostgreSQL 15 (port 5455) dan Redis 7 (port 6379).
  - NestJS 10 Core dengan 50 modul: Auth, Pelanggan, Billing, Mikrotik, OLT/ODP, GenieACS, Field Service, WhatsApp Fonnte, Payroll, Akuntansi Keuangan, Laporan.
  - Next.js 14 Web Admin Panel (port 3217) dengan 80+ halaman responsif.
  - Next.js 14 Customer Self-Service Portal (port 3001) untuk cek tagihan, riwayat invoice, dan QRIS instan.
- [x] **Isolasi Android Emulator AVD `ISP`**:
  - Script peluncur resmi [start_app.bat](file:///f:/AUDIRA-NET-BILLING/start_app.bat) dan [star_app.bat](file:///f:/AUDIRA-NET-BILLING/star_app.bat) dengan validasi nama AVD otomatis via ADB.
  - Isolasi total terhadap emulator proyek lain (`MDA` untuk Comic Reader, `DC` untuk Data Center OS).
- [x] **Zero-Touch Billing & Instant Restore (Bayar Langsung Nyala)**:
  - Automasi cron invoice tanggal 1 & prorata instalasi baru.
  - Notifikasi tagihan otomatis via WhatsApp Fonnte API dengan rincian pembayaran.
  - Automasi isolir walled-garden MikroTik & pemutusan sesi via FreeRADIUS CoA Disconnect saat jatuh tempo.
  - Verifikasi pembayaran instan (Midtrans Webhook / QRIS Dinamis) yang otomatis memulihkan profil normal dalam < 2 detik.
- [x] **Audit Dead Code & Null Safety Frontend**:
  - Null-safety guard pada seluruh tabel data (Invoice, Pelanggan, Transaksi, Laporan).
  - Pemasangan handler aktif pada 25+ tombol dead/statis di halaman keuangan dan laporan.
- [x] **Universal Light Mode & Token Harmonization**:
  - Pembersihan total class hardcoded dark (`bg-slate-950`, `bg-slate-900`) di rute Invoice internal dan public, serta halaman `admin/sales.tsx` dan `infrastruktur/odp.tsx`.
  - Standardisasi token CSS: `--app-bg`, `--app-card`, `--app-card-subtle`, `--app-border`, `--app-text`, `--app-text-muted`.
- [x] **Full 134-Page & Button Audit with Zero Empty State**:
  - Audit live HTTP terhadap seluruh 134 rute di `http://localhost:3217` (100% 200 OK dengan HTML substantial >100KB, 0 crash, 0 blank page).
  - Audit kode statis: 0 dead buttons, 0 dead anchors across all pages.
  - Implementasi komponen [ReportSubTabDetail.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/ReportSubTabDetail.tsx) pada 12 halaman laporan (`reports/customer`, `executive`, `finance`, `invoice`, `marketing`, `package`, `payment`, `revenue`, `sales`, `subscription`, `whatsapp`, dan `whatsapp/reports`), mengeliminasi seluruh tab placeholder kosong ("sedang dalam pengembangan") menjadi dashboard analitik interaktif ber-KPI, chart tren Recharts, dan tabel data granular.
- [x] **Full-Stack BSS/OSS Next-Gen Features Implemented (Radius & TR-069 Comparison Implementation)**:
  - **Customer Optical Self-Diagnostic Modal & TR-069 Remote Reboot**:
    - Ditambahkan pada Customer Dashboard internal ([customer/dashboard.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/customer/dashboard.tsx)) dan Customer Portal publik ([DashboardView.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/customer-portal/src/components/portal/DashboardView.tsx)).
    - Memvisualisasikan RX Optical Power (-19.45 dBm), TX Power (+2.40 dBm), suhu ONT, latensi ping gateway, konfigurasi dual-band WiFi (2.4G & 5G AC), serta tombol kirim sinyal reboot TR-069 via GenieACS dengan umpan balik status real-time.
  - **WhatsApp Bot Live Shortcut Commands**:
    - Diimplementasikan di [whatsapp-bot.service.ts](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/backend/src/whatsapp/whatsapp-bot.service.ts).
    - Menambahkan perintah kilat: `!ceksinyal`, `!cekmodem`, `!reboot`, `!tagihan`, `!wifi`, `!cs` sehingga pelanggan dapat mengecek redaman optik dan merestart modem langsung dari WhatsApp tanpa eskalasi manual.
  - **Proactive High Optical Loss Warning Banner & SPK Generator di NOC Dashboard**:
    - Diimplementasikan di [noc.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/dashboard/noc.tsx).
    - Memantau ONT dengan redaman kritis (&gt; -27.0 dBm) secara real-time, dilengkapi AI Root Cause diagnostic (analisis tekukan dropcore / konektor kotor / splice closure), tombol polling ulang TR-069 live, penerbitan SPK Teknisi Lapangan 1-klik, dan integrasi ke Peta GIS ODP.

### 🔄 In-Progress / Ongoing Focus
- [ ] **Sinkronisasi Memori Jangka Panjang (LTM Hub)**:
  - Pembaruan seluruh modul `.agents/brain/` agar 100% selaras dengan arsitektur ISP riil.
  - Eliminasi seluruh referensi usang *AUDIRA DEV* (Three.js WebGL studio, port 3447/3448).
- [ ] **Frontend Pages Theme Sweep**:
  - Audit sisa halaman frontend (`admin/sales.tsx`, `infrastruktur/odp.tsx`) untuk memastikan transisi light/dark mode sempurna tanpa kartu gelap tak bertuan di light mode.

---

## BAGIAN IV: GOTCHAS, PITFALLS & PELAJARAN TEKNIS PENTING

1. **JANGAN PERNAH HARDCODE CLASS GELAP TANPA PREFIX `dark:`**:
   - Class seperti `bg-slate-950`, `bg-slate-900`, `bg-slate-800`, `text-white` jika ditulis tanpa `dark:` akan tetap aktif di Light Mode!
   - Akibatnya, halaman di Mode Terang akan memiliki kotak-kotak hitam pekat yang merusak visual.
   - **Solusi Wajib**: Gunakan token CSS semantik `bg-[var(--app-card)]`, `bg-[var(--app-card-subtle)]`, `border-[var(--app-border)]`, dan `text-[var(--app-text)]` atau berikan pasangan eksplisit `bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100`.

2. **DILARANG MENGGANGGU EMULATOR PROYEK LAIN (`MDA` & `DC`)**:
   - Di workstation Agus Dwi Rianto, terdapat emulator `MDA` (komik) dan `DC` (data center) yang sering berjalan bersamaan di port `emulator-5554` atau `emulator-5556`.
   - Jangan pernah mengasumsikan nomor port emulator statis. Selalu periksa output:
     ```cmd
     adb -s <device_id> emu avd name
     ```
   - Hanya device yang mengembalikan nilai **`ISP`** yang boleh disentuh.

3. **PORT ALLOCATION DISCIPLINE**:
   - Web Admin: Port `3217`.
   - Backend API: Port `3218`.
   - Customer Portal: Port `3001`.
   - PostgreSQL: Port `5455`.
   - Redis: Port `6379`.
   - Dilarang keras mematikan proses global via `taskkill /f /im node.exe`. Gunakan skrip [stop.bat](file:///f:/AUDIRA-NET-BILLING/stop.bat) yang hanya mematikan port spesifik proyek ini.

4. **INTEGRITAS PRISMA & DATABASE**:
   - Dilarang keras menjalankan `prisma migrate reset` di database yang memiliki data pelanggan riil.
   - Semua mutasi kritis (isolir, delete pelanggan, void tagihan) wajib mencatat histori ke tabel audit log.

---

## BAGIAN V: TIGA TINGKATAN HIERARKI MEMORI

```text
[ TINGKAT 1: MEMORY.md (Root Proyek) ]
└── Ringkasan Eksekutif, Status Sprint Terkini, Port Map, Matriks Emulator, dan Task Board Aktif.
    (Wajib dibaca pertama kali oleh AI Agent saat sesi dimulai).

[ TINGKAT 2: .agents/brain/INDEX.md ]
└── Peta Pengetahuan Terpadu (Knowledge Map) & Penunjuk Arah Modul Detail.

[ TINGKAT 3: Sub-Modul Detail .agents/brain/*.md ]
├── SYSTEM_ARCHITECTURE.md        -> Monorepo topology, microservices, NestJS modules, Flutter ISP.
├── FEATURE_CATALOG.md            -> Master catalog 50 backend modules, 80+ Next.js pages, Flutter screens.
├── DATABASE_AND_DATA_FLOW.md     -> 900+ baris Prisma schema, relasi tabel, dan flow isolir/CoA unblock.
├── SECURITY_AND_GOVERNANCE.md    -> RBAC role guards, enkripsi MikroTik, webhook verification, hygiene.
├── ENV_AND_SECRETS_REFERENCE.md  -> Referensi port 3217/3218/3001/5455/6379, env vars, token sanitasi.
├── DEVICE_AND_EMULATOR_ENV.md    -> Aturan isolasi mutlak AVD `ISP`, peluncur resmi start_app.bat.
├── SERVICE_AND_PACKAGE_MATRIX.md -> Matriks paket internet, bandwidth, SLA, booster, dan fiber optic.
└── UPDATE_HISTORY_AND_ROADMAP.md -> Changelog versi, milestone terselesaikan, dan rencana pengembangan.
```

---

## BAGIAN VI: PROTOKOL "READ FIRST, ACT SECOND, UPDATE ON FINISH"

Setiap AI Agent yang bekerja di `AUDIRA-NET-BILLING` wajib mengikuti 3 langkah operasi:

1. **READ FIRST (Orientasi Konteks)**:
   - Baca [MEMORY.md](file:///f:/AUDIRA-NET-BILLING/MEMORY.md) untuk mengetahui fokus aktif dan batasan arsitektur.
   - Periksa sub-modul relevan di [.agents/brain/](file:///f:/AUDIRA-NET-BILLING/.agents/brain/) sebelum memodifikasi kode.
2. **ACT SECOND (Eksekusi Berdisiplin)**:
   - Tulis kode sesuai aturan [RULES.md](file:///f:/AUDIRA-NET-BILLING/.agents/RULES.md) dan [DESIGN.md](file:///f:/AUDIRA-NET-BILLING/.agents/DESIGN.md).
   - Pastikan dukungan Light/Dark mode dengan CSS tokens semantik.
   - Validasi integritas kode via TypeScript (`npx tsc --noEmit`).
3. **UPDATE ON FINISH (Sinkronisasi Memori)**:
   - Jika menyelesaikan milestone atau memodifikasi modul inti, perbarui [MEMORY.md](file:///f:/AUDIRA-NET-BILLING/MEMORY.md) dan sub-modul brain yang bersangkutan agar agen berikutnya tidak amnesia.
