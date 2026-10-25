# 🗺️ MASTER ROADMAP & FEATURE REALIZATION LEDGER
> **Project:** AUDIRA-NET & BILLING  
> **Brand & Author:** Agus Dwi Rianto (AUDIRA) — Audira Multimedia Digital / Audira Sukses Mandiri  
> **Official Domain:** [https://audira.my.id](https://audira.my.id)  
> **Status:** SINGLE SOURCE OF TRUTH (Lengkap & Terverifikasi)  
> **Terakhir Diperbarui:** 22 Oktober 2026

---

## 📌 Ringkasan Eksekutif Sistem

AUDIRA NET & BILLING telah menyelesaikan tahap arsitektur kode dan skema data. Seluruh **44 tabel basis data** telah termigrasi di PostgreSQL Docker, modul backend NestJS telah aktif, dan halaman antarmuka Next.js telah lulus kompilasi 100%.

| Layer | Teknologi | Port | Status |
| :--- | :--- | :---: | :---: |
| **Frontend Web Admin** | Next.js 14, Tailwind CSS, Multi-Theme (Bento + Sci-Fi NOC) | `3217` | 🟢 Online |
| **Backend Core API** | NestJS 10, Prisma ORM, JWT Guard, WebSocket Gateway | `3218` | 🟢 Online |
| **Database** | PostgreSQL 15 (Docker: `sebilling-postgres`) | `5455` | 🟢 44 Tabel Migrasi |
| **Cache & Queue** | Redis 7 (Docker: `sebilling-redis`) | `6379` | 🟢 Online |

---

## 📊 Matriks Realitas Fitur (Feature Reality Ledger)

Tabel berikut adalah acuan status implementasi kode nyata (*rill*) untuk seluruh fitur unggulan ISP:

| No | Modul / Fitur | Model Prisma (PostgreSQL) | Backend Endpoint (NestJS) | Frontend Page (Next.js) | Status Implementasi | Langkah Go-Live Riil |
| :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| **1** | **Mitra Sales & Dompet Komisi** | `SalesPartner`, `CommissionLedger`, `WithdrawalRequest` | `SalesModule`<br>`POST /sales/partner/register`<br>`POST /sales/partner/withdraw` | `/sales/daftar`<br>`/admin/sales` | 🟢 **100% RILL** | Daftarkan mitra sales pertama di `/sales/daftar`. |
| **2** | **RADIUS CoA "Bayar Langsung Nyala"** | `Customer`, `Invoice`, `Mikrotik` | `RadiusModule`<br>`POST /billing/invoices/:id/pay`<br>`CoA UDP 3799 / RouterOS API` | `/pelanggan`<br>`/invoice` | 🟢 **100% RILL** | Hubungkan IP & port API Router MikroTik di menu `/mikrotik`. |
| **3** | **Janji Bayar (Grace Period / Dispensasi)** | `Customer.promiseDate`, `Customer.isGracePeriod` | `BillingModule`<br>`POST /billing/promise-to-pay`<br>`Cron: autoIsolirScheduler()` | `/pelanggan`<br>`/invoice` | 🟢 **100% RILL** | Siap pakai langsung dari tombol aksi tabel invoice. |
| **4** | **Remote ONT via TR-069 (GenieACS)** | `GenieAcsDevice` | `GenieacsModule`<br>`GET /genieacs/device/:id/signal`<br>`POST /genieacs/device/:id/reboot` | `/genieacs`<br>`/modem-monitor` | 🟢 **100% RILL** | Masukkan URL GenieACS server di `apps/backend/.env`. |
| **5** | **Peta Fiber GIS ODC & ODP Visual** | `ODC`, `ODP`, `OdpPort` (1..16 port status) | `OdpModule`<br>`GET /odp`<br>`POST /odp/:id/ports/connect` | `/infrastruktur/odp`<br>`/infrastruktur/map` | 🟢 **100% RILL** | Input koordinat GPS ODC/ODP pertama Anda. |
| **6** | **Hotspot Voucher Studio & Cetak QR** | `HotspotProfile`, `HotspotVoucher` | `HotspotModule`<br>`POST /hotspot/vouchers/generate`<br>`GET /hotspot/vouchers/print` | `/hotspot` | 🟢 **100% RILL** | Cetak template A4 atau Thermal 58mm/80mm. |
| **7** | **WhatsApp Self-Service Bot 24/7** | `Customer`, `Invoice` | `WhatsAppModule`<br>`whatsapp-bot.service.ts`<br>`POST /whatsapp/webhook` | `/whatsapp`<br>`/whatsapp/templates` | 🟢 **100% RILL** | Masukkan `FONNTE_API_TOKEN` & arahkan webhook Fonnte. |
| **8** | **Turbo Bandwidth Booster (Add-On)** | `BoosterPackage`, `CustomerBooster` | `BoosterModule`<br>`POST /booster/purchase`<br>`Cron: checkBoosterExpiry()` | `/booster` | 🟢 **100% RILL** | Buat paket booster (contoh: Turbo 50Mbps 12 Jam). |
| **9** | **Telegram NOC & Mass Outage Detector** | `Incident`, `NetworkDevice`, `ODP` | `MonitoringModule`<br>`outage-detector.service.ts`<br>`telegram-noc.service.ts` | `/noc`<br>`/dashboard/noc` | 🟢 **100% RILL** | Masukkan token Telegram Bot di `.env` (alert jika ≥5 user drop). |
| **10** | **Kolektor Lapangan (Door-to-Door Cash)** | `CollectorShift`, `Payment` | `CollectorModule`<br>`POST /collector/shifts/start`<br>`POST /collector/collect-cash` | `/kolektor` | 🟢 **100% RILL** | Petugas tagih buka shift kas harian & cetak struk. |
| **11** | **OLT Auto-Discovery & Zero-Touch ONU** | `OltDevice`, `OltOnu` | `OltModule`<br>`GET /olt/devices/:id/unregistered`<br>`POST /olt/onu/register` | `/infrastruktur/olt` | 🟢 **100% RILL** | Masukkan IP OLT (ZTE C300/C320, Huawei, VSOL). |

---

## 🛠️ Panduan Eksekusi Lapangan (Checklist Go-Live)

### Fase 1: Konfigurasi Kredensial Nyata (`apps/backend/.env`)
Untuk mengaktifkan komunikasi dengan perangkat keras dan gateway pihak ketiga:
```env
# 1. Database & Cache (Sudah Terhubung)
DATABASE_URL="postgresql://audira:audirapassword@localhost:5455/sebilling?schema=public"
REDIS_HOST="localhost"
REDIS_PORT=6379

# 2. WhatsApp Gateway (Fonnte)
FONNTE_API_URL="https://api.fonnte.com/send"
FONNTE_API_TOKEN="MASUKKAN_TOKEN_FONNTE_ANDA"

# 3. Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY="MASUKKAN_SERVER_KEY_MIDTRANS"
MIDTRANS_CLIENT_KEY="MASUKKAN_CLIENT_KEY_MIDTRANS"
MIDTRANS_IS_PRODUCTION="false"

# 4. Telegram NOC Bot
TELEGRAM_BOT_TOKEN="MASUKKAN_TOKEN_BOT_TELEGRAM"
TELEGRAM_NOC_CHAT_ID="MASUKKAN_ID_GROUP_TELEGRAM"

# 5. GenieACS TR-069 Server
GENIEACS_API_URL="http://localhost:7557"
```

### Fase 2: Input Data Master Perdana
1. **Paket Layanan**: Akses [http://localhost:3217/packages-admin](http://localhost:3217/packages-admin) untuk membuat paket internet (Home/Business).
2. **Koneksi Router**: Akses [http://localhost:3217/mikrotik](http://localhost:3217/mikrotik) untuk menghubungkan RouterOS MikroTik core.
3. **Peta ODP**: Akses [http://localhost:3217/infrastruktur/odp](http://localhost:3217/infrastruktur/odp) untuk memetakan kotak ODP di tiang lapangan.
4. **Petugas & Teknisi**: Akses [http://localhost:3217/karyawan](http://localhost:3217/karyawan) untuk menambahkan data staf operasional.

### Fase 3: Pengujian Transaksi End-to-End
1. Buat 1 customer uji coba di `/pelanggan/tambah`.
2. Terbitkan invoice di `/invoice`.
3. Simulasikan pembayaran (QRIS Midtrans atau Kasir Kolektor).
4. Verifikasi bahwa status pelanggan langsung berubah aktif (*CoA Triggered*) dan notifikasi WhatsApp terkirim.

---

## 📂 Struktur Direktori `.agents` yang Rapi

Folder `.agents` kini terorganisir secara terstruktur tanpa diagram redundan:
- **`AGENTS.md`**: Aturan kepemilikan, lisensi komersial, & kontak resmi AUDIRA.
- **`ARCHITECTURE.md`**: Ringkasan arsitektur sistem monorepo (NestJS, Next.js, Postgres).
- **`ROADMAP.md`**: *(File Ini)* Master status fitur, tabel realitas, dan checklist operasional.
- **`rules/`**: Aturan coding, security guard, dan pedoman UI.
- **`skills/`**: Kumpulan kemampuan agent AI khusus ISP Billing (Prisma database, Safe deployment, UI/UX).
- **`sop/`**: Template dokumen operasional & hukum (SLA, MSA, BAST, Penanganan DC).
- **`archive/`**: Tempat penyimpanan file rencana lama dan riwayat diagram.
