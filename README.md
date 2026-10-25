# 🌐 AUDIRA NET & BILLING (Monorepo)

<p align="center">
  <img src="AUDIRA-NET/assets/images/logo.png" alt="AUDIRA Logo" width="110" style="border-radius: 20px;"/>
</p>

<p align="center">
  <strong>Ecosystem Solusi Manajemen Jaringan ISP Terpadu, Real-Time Billing & Mobile Field Operations</strong><br/>
  Arsitektur Berstandar Industri Telekomunikasi Dikembangkan Secara Profesional oleh <strong>AUDIRA</strong>
</p>

<p align="center">
  <a href="https://flutter.dev"><img src="https://img.shields.io/badge/Flutter-3.32.8-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter"/></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14.x-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <a href="https://www.postgresql.org"><img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/></a>
  <a href="https://mikrotik.com"><img src="https://img.shields.io/badge/MikroTik-RouterOS%20v7-E11924?style=for-the-badge&logo=mikrotik&logoColor=white" alt="MikroTik"/></a>
  <a href="https://genieacs.com"><img src="https://img.shields.io/badge/CWMP-GenieACS%20TR--069-00B4D8?style=for-the-badge" alt="GenieACS"/></a>
  <a href="https://audira.my.id"><img src="https://img.shields.io/badge/Design-Neo--Brutalism%20Cyberpunk-00F0FF?style=for-the-badge" alt="Design System"/></a>
</p>

---

## 📌 Sekilas Proyek & Identitas Resmi
**AUDIRA NET & BILLING** adalah platform terintegrasi *end-to-end* untuk Penyedia Layanan Internet (ISP) dan RT/RW Net modern. Menghubungkan operasional inti jaringan (*core routing*, OLT, TR-069 ACS), sistem otomasi penagihan (*invoicing, isolir otomatis, payment gateway QRIS*), hingga aplikasi mobile terpadu untuk pelanggan, teknisi lapangan, dan Network Operation Center (NOC).

| Informasi Proyek | Detail Resmi |
| :--- | :--- |
| **Brand Resmi** | **AUDIRA** |
| **Founder & Author** | **Agus Dwi Rianto (AUDIRA)** |
| **Perusahaan / Organisasi** | **Audira Multimedia Digital / Audira Sukses Mandiri** |
| **Domain Resmi** | [https://audira.my.id](https://audira.my.id) |
| **Email Resmi** | [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com) |
| **WhatsApp Hotline** | [+62 821-1200-1600](https://wa.me/6282112001600) |
| **Lisensi Perangkat Lunak** | **AUDIRA Commercial & Proprietary Software License** ([`LICENSE`](./LICENSE)) |

---

## 🏛️ Arsitektur Monorepo & Ekosistem

Repositori ini menaungi seluruh komponen ekosistem ISP terpadu:

```
AUDIRA-NET-BILLING (Monorepo Root)
├── 📱 AUDIRA-NET/                     # Mobile App (Flutter 3.32+ / Android & iOS)
│   ├── lib/screens/customer/         # Portal Pelanggan (Beranda HUD, Invoicing, Bantuan, Profil)
│   ├── lib/screens/technician/       # Portal Teknisi Lapangan (Floating Capsule Dock, SPK, GPS)
│   ├── lib/screens/chat/             # Real-time Live Chat Dual-Engine (CS Siaga & Teknisi)
│   ├── lib/services/                 # Background push alerts, Firebase, Socket.IO, Mikrotik Telemetry
│   └── save.bat                      # GitHub Auto-Sync khusus repositori AUDIRA-NET
│
├── 🖥️ AUDIRA-BILLING/                 # Web Enterprise & Backend API (Next.js 14, Node.js, Prisma)
│   ├── apps/backend/                 # REST API, Mikrotik RouterOS v6/v7 Sync, Radius, GenieACS TR-069
│   ├── apps/frontend/                # ISP Admin Dashboard, NOC Monitor, Finance, HRM & CRM
│   ├── apps/customer-portal/         # Web Self-Care Pelanggan (PWA)
│   └── save.bat                      # GitHub Auto-Sync khusus repositori AUDIRA-BILLING
│
├── 📚 docs/                          # Dokumentasi Arsitektur, Protokol, API Endpoints
│   └── screenshots/                  # 13 High-Resolution UI Showcase Gallery (PNG)
│
├── ⚙️ scripts/                        # Ed25519 Digital Signature & Anti-Tamper Verification
├── 🚀 save.bat                       # GitHub Unified Push & Sync Utility (Master Repo)
├── ⚡ start.bat                       # One-Click Enterprise Stack Launcher
└── 🛑 stop.bat                        # Safe Process Shutdown
```

---

## 🛠️ Matriks Stack Teknologi Mutakhir

Platform ini dibangun menggunakan fondasi teknologi berkinerja tinggi, modular, dan berstandar *enterprise-grade*:

```
+-----------------------------------------------------------------------------------+
|                            AUDIRA NET & BILLING STACK                             |
+-----------------------------------------------------------------------------------+
|  [CLIENT LAYER]                                                                   |
|   • Mobile App       : Flutter 3.32.8 (Dart 3.8), Material 3, Neo-Brutalism System|
|   • Admin Web        : Next.js 14 (React 18), TypeScript, TailwindCSS, Radix UI   |
|   • Customer PWA     : Next.js 14 Web Self-Care with Responsive OLED Layout       |
+-----------------------------------------------------------------------------------+
|  [SERVICE & GATEWAY LAYER]                                                        |
|   • Backend API      : Node.js (v20 LTS), Express.js, Fastify microservices       |
|   • Realtime Gateway : Socket.IO 4.x & Firebase Firestore Realtime Stream Sync    |
|   • Cache & Pub/Sub  : Redis 7.x (In-memory token, session store, rate limiting)  |
|   • Database / ORM   : PostgreSQL 16 Enterprise with Prisma ORM                   |
+-----------------------------------------------------------------------------------+
|  [TELECOMMUNICATIONS & ISP HARDWARE LAYER]                                        |
|   • Core Routing     : Mikrotik RouterOS API (v6 & v7 ROS), Queues & PPP Secrets  |
|   • Provisioning ACS : GenieACS CWMP (TR-069 / TR-181) for remote ONT/ONU mgmt   |
|   • AAA Protocol     : FreeRADIUS 3.x integration for Hotspot & PPPoE auth        |
|   • GPON Monitoring  : OLT ZTE C320 / C300 & Huawei MA5608T optic telemetry      |
+-----------------------------------------------------------------------------------+
|  [PAYMENT RAILS & AUTOMATION]                                                     |
|   • Payment Gateway  : QRIS Realtime, Midtrans Snap, Virtual Account (BCA, Mandiri)|
|   • Notification Hub : WhatsApp Gateway (Baileys/Fonnte), Telegram NOC, SMTP Email|
|   • Security / Hash  : Ed25519 Asymmetric Digital Signature Seal & Anti-Tamper    |
+-----------------------------------------------------------------------------------+
```

---

## 🎨 Galeri Visual UI/UX — Neo-Brutalism + Cyberpunk Studio

Aplikasi mobile **AUDIRA-NET** mengadopsi bahasa desain **Neo-Brutalism + Cyberpunk Studio** yang futuristik, taktil, dan berkelas tinggi:
- **Canvas Dasar**: *Deep Midnight OLED* (`#05070D` & `#0A0E1A`) hemat daya dengan kontras cyber 100%.
- **Palet Neon Terkurasi**: Electric Cyan (`#00F0FF`), Neon Green (`#00FF9D`), Signal Blue (`#0070F3`), dan Vivid Purple (`#7928CA`).
- **Komponen Geometris**: Bento Box Grid, bayangan taktil keras tanpa blur (`offset: Offset(4, 4)`, `blurRadius: 0`), dan cyber border `1.8px - 2px`.
- **Dock Kapsul Melayang**: *Floating Cyber-Capsule Navigation Dock* yang responsif dan ergonomis.

---

### 🔹 Kategori 1: Autentikasi Terpadu & Multi-Role Gateway

| 01. Unified Cyber Login Portal | 06. Neo-Brutalist Logout Modal |
| :---: | :---: |
| <img src="docs/screenshots/01_login_cyberpunk_dark.png" alt="Unified Cyber Login" width="360"/> | <img src="docs/screenshots/06_customer_logout_dialog.png" alt="Logout Modal" width="360"/> |
| **Multi-Role Selector (Pelanggan / Teknisi / Admin)**<br/>Status telemetri gateway online, Passkey auth, dan quick login. | **Konfirmasi Keamanan Berkontras Tinggi**<br/>Pemberian peringatan sesi berakhir dengan pencegahan klik tidak disengaja. |

---

### 🔹 Kategori 2: Portal Pelanggan & Pengalaman Penagihan (Bento Invoicing)

| 02. Beranda HUD & Arc Gauge | 03. Bento Invoicing & QRIS Rails | 05. Profil Akun & ONT Hardware | 07. Beranda Daytime (Light Mode) |
| :---: | :---: | :---: | :---: |
| <img src="docs/screenshots/02_customer_beranda_hud.png" alt="Customer Beranda HUD" width="230"/> | <img src="docs/screenshots/03_customer_tagihan_bento.png" alt="Customer Tagihan Bento" width="230"/> | <img src="docs/screenshots/05_customer_profil_hardware.png" alt="Customer Profil Hardware" width="230"/> | <img src="docs/screenshots/07_customer_beranda_light.png" alt="Customer Beranda Light" width="230"/> |
| **Cyber Command HUD**<br/>Speedometer Arc, Live RX/TX bandwith, GPON Core telemetry, dan shortcut bento. | **Manajemen Tagihan Transparan**<br/>Rincian biaya itemized, integrasi QRIS Instan, BCA VA, Mandiri VA, dan e-wallet. | **Diagnostik Perangkat Pelanggan**<br/>ID digital verified, spesifikasi ONT Wi-Fi 6, pemantauan redaman optik (-19.4 dBm). | **Mode Terang Neo-Brutalism**<br/>Tampilan kontras tinggi untuk penggunaan di bawah sinar matahari langsung. |

---

### 🔹 Kategori 3: Pusat Komunikasi Live Chat 24/7 & Notifikasi Cerdas

| 10. Pusat Live Chat Center | 11. Live Chat CS Siaga 24/7 | 12. Live Chat Teknisi Lapangan | 13. Push Notification & Alert Center |
| :---: | :---: | :---: | :---: |
| <img src="docs/screenshots/10_live_chat_center.png" alt="Live Chat Center" width="230"/> | <img src="docs/screenshots/11_live_chat_cs_dialogue.png" alt="Live Chat CS Dialogue" width="230"/> | <img src="docs/screenshots/12_live_chat_teknisi_field.png" alt="Live Chat Teknisi Field" width="230"/> | <img src="docs/screenshots/13_push_notifications_center.png" alt="Push Notification Center" width="230"/> |
| **Kotak Masuk Multi-Kanal**<br/>Pemisahan ruang Customer Support vs Teknisi Lapangan, unread badge pill, enkripsi E2E. | **Dialog Interaktif Real-Time**<br/>Balasan pintar otomatis CS Senior, chip aksi instan (*quick replies*), dan nomor hotline darurat. | **Koordinasi Tiket Gangguan ODP**<br/>Pembaruan langsung estimasi kedatangan (ETA) teknisi & nilai redaman optik lapangan. | **Pusat Peringatan Terjadwal**<br/>Pengingat jatuh tempo H-3 otomatis, pesan chat masuk, notifikasi ODP maintenance, dan promo loyalitas. |

---

### 🔹 Kategori 4: Teknisi Lapangan & Network Operation Center (NOC)

| 04. Customer Bantuan & NOC Telemetry | 08. Floating Capsule Dock Teknisi | 09. Profil Teknisi & Evaluasi KPI |
| :---: | :---: | :---: |
| <img src="docs/screenshots/04_customer_bantuan_noc.png" alt="Customer Bantuan NOC" width="240"/> | <img src="docs/screenshots/08_teknisi_dashboard_capsule.png" alt="Teknisi Dashboard Capsule" width="240"/> | <img src="docs/screenshots/09_teknisi_profil_dark.png" alt="Teknisi Profil Dark" width="240"/> |
| **NOC Health & Hotline 24/7**<br/>Status Core Backbone 100%, latensi core 11ms, SLA 99.98%, akses AI *"Tanya Audi"*, dan tombol cepat chat teknisi tiket. | **Operasional Lapangan Digital**<br/>Floating Capsule Dock (Tugas, Absen, Peta, Profil), GPS selfie check-in, dan daftar penugasan SPK live. | **Evaluasi Kinerja & Inventori**<br/>Metrik KPI real-time (Tiket Selesai, Instalasi Baru, Rating Pelanggan, Speed Response), scanner barcode ONT. |

👉 *Dokumentasi resolusi penuh (1344 x 2992 px) beserta catatan teknis dapat dilihat di [docs/screenshots/README.md](docs/screenshots/README.md).*

---

## ⚡ Fitur Utama & Keunggulan Sistem

### 1. Dual-Engine Real-Time Live Chat
* **Sinkronisasi Ganda**: Menggunakan Socket.IO realtime stream dengan fallback ke Firebase Firestore untuk persistensi pesan offline.
* **Auto-Routing Tiket**: Tiket kendala yang dibuat pelanggan otomatis membuat ruang percakapan khusus dengan teknisi lapangan yang ditugaskan.
* **AI & CS Siaga Assist**: Dilengkapi asisten diagnostik cerdas untuk memandu pelanggan melakukan restart router jarak jauh, verifikasi redaman optik, atau konfirmasi bukti transfer.

### 2. Otomasi Penagihan & Isolir MikroTik
* **Siklus Tagihan Dinamis**: Penagihan bulanan terjadwal otomatis dengan toleransi masa tenggang (*grace period*).
* **Payment Gateway Terintegrasi**: Pembayaran QRIS instan otomatis terverifikasi via webhook tanpa perlu konfirmasi manual.
* **Isolir & Buka Isolir Otomatis**: Router MikroTik secara otomatis memindahkan *PPP Secret / Simple Queue* pelanggan yang menunggak ke profil isolir, dan mengembalikannya ke profil aktif dalam hitungan detik setelah pembayaran berhasil.

### 3. Otomasi Provisioning ONT/ONU (GenieACS TR-069)
* Mengelola konfigurasi jarak jauh untuk perangkat pelanggan (ZTE, Huawei, Fiberhome, dsb) tanpa harus mengunjungi lokasi fisik.
* Pemantauan parameter optik (*Optical RX/TX Power*), restart modem dari jarak jauh, ganti SSID Wi-Fi, dan pembaruan firmware berkala.

### 4. Surat Perintah Kerja (SPK) Lapangan & Kehadiran GPS
* Teknisi menerima SPK pemasangan baru atau perbaikan gangguan langsung di smartphone.
* Dilengkapi validasi absensi menggunakan verifikasi wajah (selfie camera) dan titik koordinat GPS anti-mocking.
* Pelaporan redaman optik ODP sebelum dan sesudah instalasi langsung tersimpan ke database pusat.

---

## 🔄 Manajemen Repositori & Utilitas GitHub (`save.bat`)

Proyek ini telah dilengkapi skrip otomasi **`save.bat`** di setiap repositori untuk menjamin proses commit dan sinkronisasi ke GitHub berjalan aman, rapi, dan konsisten:

### 1. Monorepo Utama (`save.bat` di root)
```cmd
REM Menjalankan push terpadu untuk repositori monorepo induk
F:\AUDIRA-NET-BILLING> save.bat "feat: sync all components and documentation"
```
* **Remote Target**: `https://github.com/Audira141415/PJTAUDIRANETANDBILLING.git`
* **Cabang Aktif**: `master` (Cabang default monorepo)

### 2. Repositori Mobile App (`AUDIRA-NET/save.bat`)
```cmd
REM Khusus sinkronisasi aplikasi mobile Flutter
F:\AUDIRA-NET-BILLING\AUDIRA-NET> save.bat "feat: update flutter mobile client"
```
* **Remote Target**: `https://github.com/Audira141415/AUDIRA-NET.git`
* **Cabang Aktif**: `main`

### 3. Repositori Web & Backend (`AUDIRA-BILLING/save.bat`)
```cmd
REM Khusus sinkronisasi web engine, API backend, dan customer portal
F:\AUDIRA-NET-BILLING\AUDIRA-BILLING> save.bat "feat: update billing web engine"
```
* **Remote Target**: `https://github.com/Audira141415/AUDIRA-BILLING.git`
* **Cabang Aktif**: `main`

---

## 🚀 Panduan Memulai Cepat (Quick Start)

### Prasyarat Sistem
* **Flutter SDK**: v3.32.8 atau lebih tinggi
* **Node.js**: v20.x LTS
* **pnpm**: v9.x
* **PostgreSQL**: v16+
* **Redis**: v7+

### 1. Menjalankan Aplikasi Mobile (Flutter)
```bash
cd AUDIRA-NET
flutter pub get
flutter run -d emulator-5554
```

### 2. Menjalankan Web Admin & API Backend
```bash
cd AUDIRA-BILLING
pnpm install
pnpm run db:generate
pnpm run dev
```
Atau cukup jalankan `start.bat` di direktori utama untuk meluncurkan seluruh layanan secara otomatis.

---

## 🔐 Keamanan, Tanda Tangan Digital & Anti-Tamper

Integritas kode sumber AUDIRA dilindungi oleh segel kriptografi asimetris **Ed25519**:
- **Kunci Publik Pemilik**: [`AgusDwiR_Audira_Ed25519.pub`](./AgusDwiR_Audira_Ed25519.pub)
- **Skrip Verifikasi Integritas**: Jalankan `scripts/verify_signature.bat` untuk memvalidasi keaslian berkas dan memastikan kode tidak dimodifikasi oleh pihak ketiga tanpa hak.

---

## ⚖️ Kebijakan Lisensi Komersial (Proprietary)
Perangkat lunak ini dilindungi oleh undang-undang hak cipta dan lisensi komersial kepemilikan pribadi (**AUDIRA Commercial & Proprietary Software License**).
* **Dilarang Keras**: Menggandakan, mengedarkan, menjual kembali, atau mempublikasikan ulang source code ini tanpa persetujuan tertulis resmi dari pemilik hak cipta.
* Ketentuan lisensi lengkap tercantum pada berkas [`LICENSE`](./LICENSE).

---

## 👥 Kontak Resmi & Dukungan

Untuk kerjasama bisnis, integrasi penyedia ISP, konsultasi teknis, atau pelaporan kerentanan keamanan, silakan hubungi kontak resmi:

| Jalur Komunikasi | Keterangan / Tautan |
| :--- | :--- |
| **Founder & Author** | Agus Dwi Rianto (AUDIRA) |
| **Perusahaan** | Audira Multimedia Digital / Audira Sukses Mandiri |
| **Situs Resmi** | [https://audira.my.id](https://audira.my.id) |
| **Email Resmi** | [agusdwirianto@gmail.com](mailto:agusdwirianto@gmail.com) |
| **WhatsApp Hotline** | [+62 821-1200-1600](https://wa.me/6282112001600) |
| **Telegram Channel** | *Akan segera diumumkan* |

---

<p align="center">
  <strong>© 2026 Agus Dwi Rianto (AUDIRA). Hak Cipta Dilindungi Undang-Undang.</strong><br/>
  <em>"Membangun Infrastruktur Digital Indonesia dengan Keandalan Telekomunikasi & Presisi Estetika Modern."</em>
</p>
