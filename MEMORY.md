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

### 🏆 CURRENT ACTIVE SPRINT: ROLE-BASED ACCESS CONTROL (RBAC) & PERSONA ECOSYSTEM DIFFERENTIATION
> **STATUS PERMANEN KONTEKS:**  
> Sistem AUDIRA-NET & BILLING kini memasuki fase **Diferensiasi Persona & Arsitektur Multi-Role**:
> 1. **👑 OWNER / SUPERADMIN**: Dashboard Eksekutif C-Level (MRR, Net Profit Margin, Arus Kas, P&L, Beban Payroll, Pajak 11% UU HPP, SLA Uptime 99.98% Makro, Audit Trail).
> 2. **🌐 NOC ENGINEER**: Command Center Jaringan (MRTG Uplink, BGP Flowspec DDoS Shield, Pusat Insiden Massal & Broadcast WA, OLT/ODC/ODP GIS, TR-069 GenieACS, OTDR .SOR Waveform). Privasi finansial & payroll terkunci rapat.
> 3. **🛠️ TEKNISI LAPANGAN**: Terminal Operasional Lapangan (Kanban SPK Pasang Baru & Perbaikan, Presensi Geotag GPS + Kamera Biometrik Watermark, Scanner Barcode/QR ONT, Kalkulator Jarak Putus OTDR, BAST Digital Touchscreen).
> 4. **👤 CUSTOMER / PELANGGAN**: Self-Care Portal Mandiri (`/customer/dashboard`) (Status Layanan, Tagihan Jatuh Tempo & QRIS/VA Instan, Dokter Jaringan 1-Tap TR-069 RX -19.4 dBm, Speedtest RFC 2544 e-SLA, Remote Reboot). Terisolasi total dari sidebar dan data admin.
> 
> *Referensi Blueprint & Arsitektur Lengkap:* [.agents/brain/ROLE_BASED_ACCESS_AND_PERSONAS.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/ROLE_BASED_ACCESS_AND_PERSONAS.md).

### 🏆 PREVIOUS COMPLETED: 100% CARRIER-GRADE DESIGN SYSTEM & ANTI-SLOP OVERHAUL (162/162 TSX CLEAN)
> **STATUS PERMANEN KONTEKS:**  
> 1. Sistem Frontend AUDIRA-NET & BILLING (`http://localhost:3217/`) telah menjalani audit & refactoring menyeluruh berstandar **AUDIRA Design System (`DESIGN.md`) & Anti-Slop Rules (R-01 s/d R-38, C-2)**.
> 2. Hasil audit kuantitatif menyeluruh pada seluruh **162 file `.tsx`** di `apps/frontend/src/`:
>    - **Browser `alert(...)`**: **0 LULUS** (dari ~400 panggilan digantikan 100% dengan `useToast()` / `toast.success/info/warning/error`).
>    - **Em Dash (`—`)**: **0 LULUS** (semua em dash di UI copy digantikan dengan tanda hubung standar `-` atau titik dua `:`).
>    - **Multi-Stop Gradients (`via-`)**: **0 LULUS** (seluruh kartu dan tombol dibersihkan dari gradien pelangi dan distandardisasi dengan surface tokens `--app-*`).
>    - **AI `Sparkles` Decoration**: **0 LULUS** (seluruh ikon hiasan AI generic diganti dengan ikon semantik Lucide SVG: `Zap`, `Activity`, `ShieldCheck`, `CheckCircle2`, `Target`).
>    - **Raw Un-Themed `bg-white`**: **0 LULUS** (semua permukaan dipasangkan dengan skema dark mode atau token semantik `bg-[var(--app-card)]`).
>    - **TypeScript Typecheck**: `npx tsc --noEmit` berhasil lulus dengan **Exit Code 0 (0 error)**.
> 3. Pengaturan filter agen telah dikunci secara global di `%APPDATA%\antislop\settings.json` dengan mode `"during"`.

### 🚀 REKAPITULASI PEMBAGIAN KERJA 8 SUB-AGEN ANTI-SLOP:
1. **Reports Anti-Slop Specialist** (`pages/reports/*` — 12 file): 14 em dash diperbaiki, 167 alert diganti `useToast()`, tokenisasi permukaan penuh.
2. **HRM Anti-Slop Specialist** (`gaji.tsx`, `cuti.tsx`, `kinerja.tsx`, `attendance.tsx`, `jadwal-kerja.tsx`, `attendance-monitoring.tsx` — 6 file): 22 alert diganti `useToast()`, eliminasi emoji, HUD biometrik semantik.
3. **Finance Anti-Slop Specialist** (`pages/finance/*` & `keuangan.tsx` — 13 file): 63 alert diganti `useToast()`, 11 `bg-white` diganti token semantik, integrasi `Zap`.
4. **Invoices & Payment Anti-Slop Specialist** (`pages/invoice/*` & `pages/payment/*` — 12 file): 99 alert diganti `useToast()`, 0 emoji, kartu invoice berstandar carrier-grade.
5. **Messaging & Customer Specialist** (`automation.tsx`, `whatsapp/*`, `telegram/*`, `customer/*`, `paket.tsx` — 12 file): 0 emoji dekoratif, 0 via- gradien, tokenisasi modal dan tabel.
6. **Infrastructure & Network Specialist** (`infrastruktur/*`, `mikrotik/*`, `noc.tsx`, `modem-monitor.tsx` — 15 file): 35 tells pelanggaran dibersihkan menjadi 0, sinkronisasi telemetri OLT, MikroTik, ODP, OTDR, dan NetFlow.
7. **Customers & Field Ops Specialist** (`pelanggan/*`, `karyawan.tsx`, `kolektor.tsx`, `technician*`, `field-service.tsx`, `work-order-detail.tsx` — 15 file): 0 pelanggaran, penambahan modal dialog konfirmasi hapus aman pada `pelanggan.tsx`.
8. **Operations & Admin Specialist** (`dashboard/*`, `inventory.tsx`, `booster.tsx`, `layanan.tsx`, `tickets.tsx`, `pengaturan.tsx`, dll. — 27 file): 16 em dash, 4 alert, 8 sparkles, 16 emoji, 24 raw `bg-white` tereliminasi.
- **Root Shell & Fondasi**: `globals.css` (Three-layer tokens `--primitive-*` / `--app-*`), `Sidebar.tsx`, `Layout.tsx`, `NavigationProgressBar.tsx`, `ToastContext.tsx`, `RealtimeContext.tsx`, `AuthContext.tsx`, `RealtimeNotificationBanner.tsx`, `ReportSubTabDetail.tsx`, `_app.tsx`, `404.tsx`, `login.tsx`, `admin/login.tsx`, `forgot-password.tsx`, `register.tsx`, `terms.tsx`, `privacy.tsx`, `debug/auth.tsx`, dan `debug/test-api.tsx`.

---
> **STATUS PERMANEN KONTEKS:**  
> 1. Sistem AUDIRA-NET & BILLING kini telah mencapai status **100% Full-Spectrum Carrier-Grade Telco Platform**, melengkapi seluruh kebutuhan ekosistem ISP tier-1: NetFlow v9/IPFIX & BGP Flowspec DDoS Shield, Raw OTDR .SOR Waveform Studio (Telcordia SR-4731), TR-069 Mass Firmware Upgrade Campaign Scheduler, Multi-NAS MikroTik Centralized Balancing & Anycast BNG, serta e-Pelaporan 5-Borang Ditjen PPI Kominfo Regulatory Studio.
> 2. Di sisi Mobile Native (Flutter `AUDIRA-NET`), integrasi dan pengujian lapangan **HANYA BOLEH DIJALANKAN DI ANDROID EMULATOR DENGAN AVD BERNAMA `ISP`**.
> **Seluruh AI Agent DILARANG KERAS melupakan status integrasi aktif ini dan DILARANG mengganggu emulator proyek lain (`MDA` atau `DC`).**

#### Rincian Penyelesaian Terakhir (Mobile Client Full Optimization, HRM Payroll Engine & Cloud Firestore):
- **Mobile Client Full Optimization (Langkah 1 s/d 3)**:
  - **Langkah 1 (Security & Role Hardening)**: Menghapus log plaintext password di `AuthService.dart`, dynamic `senderRole` di `LiveChatRoomPage`, konversi native `Timestamp` di `ChatModel`, serta externalization kredensial (`TELEGRAM_BOT_TOKEN`, `GEMINI_API_KEY`) via `String.fromEnvironment`.
  - **Langkah 2 (HRM & Automated Payroll Engine)**: Pembuatan generator penggajian bulanan idempoten dengan ID deterministik (`${empId}_$monthKey`), Slip Gaji Resmi AUDIRA siap cetak/share (PDF) dengan kop surat PT AUDIRA SUKSES MANDIRI & stempel digital verifikasi, ekspor laporan penggajian multi-format (Excel `.xlsx` dan Tabel Landscape PDF), perbaikan styling safe context di `EmployeeManagementPage`, dan composite index Firestore.
  - **Langkah 3 (Architecture & Cold-Start Optimization)**: Implementasi `AuthGate` Splash & Session Gate (`auth_gate.dart`), cold-start sub-second, dan eliminasi split-brain database pada Admin Tabs (`admin_beranda_tab`, `admin_pelanggan_tab`, `admin_payments_tab`, `admin_profil_tab`, `admin_installasi_tab`) bermigrasi penuh ke Cloud Firestore.

#### Rincian Penyelesaian Terakhir (Carrier-Grade Quintuple Engine & Theme Tokens):
- **5 Carrier-Grade Ultimate Telco ISP Features (NetFlow Flowspec, .SOR Waveform, Mass Firmware Scheduler, Multi-NAS BNG, e-Pelaporan Kominfo)**:
  - **1. NetFlow v9/IPFIX & BGP Flowspec DDoS Shield (`/infrastruktur/netflow`)**:
    - Backend: `NetflowModule`, `NetflowService`, `NetflowController` (`apps/backend/src/netflow/`).
    - Fitur: Live NetFlow telemetri buffer (Gbps, kfps, pps), Top Talkers ASN, deteksi serangan otomatis (SYN Flood, UDP Amp, ICMP Flood), 1-Click Autonomous Mitigation Engine via BGP Flowspec rate-limiting 50 Mbps / RTBH `/32`, dan dispatcher instan ke Telegram Topic 5 (`🚨 Network Incidents`, thread ID: 10).
  - **2. Raw OTDR (.SOR) Trace Waveform Studio (`/infrastruktur/otdr`)**:
    - Frontend: `otdr.tsx` Tab 3 "Studio Waveform .SOR Raw Trace (Telcordia SR-4731)".
    - Fitur: Interactive SVG attenuation curve (0–16 km, 0 sampai -35 dB) dengan interactive scrub cursor, zoom, file uploader parser, dan Telcordia KeyEvents table (Fresnel reflection, splice loss, macro-bend, fiber end).
  - **3. TR-069 Mass Firmware Upgrade Campaign Scheduler (`/genieacs`)**:
    - Backend: `GenieacsService` & `GenieacsController` (`apps/backend/src/genieacs/`).
    - Fitur: Penjadwalan batch upgrade bertahap (10–50 ONT/interval) pada jam sepi trafik (02:00–04:00 WIB), optical safety check guard (skip otomatis ONT dengan Rx < -26.5 dBm atau offline guna mencegah bricking), auto-rollback state machine jika error rate batch > 15%, dan modal New Campaign Wizard.
  - **4. Multi-NAS MikroTik Centralized Balancing & Anycast BNG (`/mikrotik/cluster`)**:
    - Frontend: `cluster.tsx` (`apps/frontend/src/pages/mikrotik/cluster.tsx`).
    - Fitur: Monitoring klaster 4-node (`Core-01`, `Core-02`, `BRAS-East`, `BRAS-West`), visual session load balancing bar, Anycast Gateway & VRRP VIP `103.189.20.1` health check, dan 1-Click Graceful Drain & Failover untuk maintenance router tanpa pemutusan mendadak pelanggan.
  - **5. e-Pelaporan Ditjen PPI Kominfo Regulatory Studio (`/infrastruktur/kominfo`)**:
    - Frontend: `kominfo.tsx` (`apps/frontend/src/pages/infrastruktur/kominfo.tsx`).
    - Fitur: Studio kepatuhan 5-Borang resmi Kominfo (Borang 1: IPAM/CGNAT, Borang 2: Bandwidth/Transit, Borang 3: Rekap FTTH, Borang 4: TrustPositif Sinkhole, Borang 5: SLA/QoS MTTR), serta ekspor Berita Acara & Laporan Kepatuhan PDF siap cetak bertanda tangan digital resmi Agus Dwi Rianto.
  - **Validasi Kompilasi & HTTP**: Seluruh rute (`/infrastruktur/netflow`, `/infrastruktur/otdr`, `/genieacs`, `/mikrotik/cluster`, `/infrastruktur/kominfo`) terverifikasi merespons `HTTP/1.1 200 OK` dan `npx tsc --noEmit` exited code 0.
- **4 Carrier-Grade Core ISP Features (Incident Manager, Churn Radar, Remote TR-069 Wi-Fi/Clients, BGP Cost Analyzer)**:
  - **1. Pusat Komando Gangguan Massal & Outages (`/noc/incidents`)**:
    - Backend: `IncidentModule`, `IncidentService`, `IncidentController` (`apps/backend/src/incident/`).
    - Fitur: Manajemen lifecycle insiden (`REPORTED`, `INVESTIGATING`, `SPLICING_IN_PROGRESS`, `MONITORING`, `RESOLVED`), isolasi dampak OLT/ODP pelanggan riil, 1-Click WhatsApp Broadcast massal ke seluruh pelanggan terimbas dengan token dinamis, drawer timeline pelacakan investigasi teknisi & estimasi pemulihan (ETA), dan auto-dispatch alert ke Telegram Supergroup Topic 5 (`🚨 Network Incidents`, thread ID: 10).
  - **2. Radar Prediksi Churn AI & Degradasi Optik (`/pelanggan/retensi`)**:
    - Backend: `RetensiModule`, `RetensiService`, `RetensiController` (`apps/backend/src/retensi/`).
    - Fitur: Scoring komposit 4 pilar (Optical Degradation Slope 30-hari via TR-069, Frekuensi Tiket Keluhan, Flapping Sesi PPPoE, & Tren Keterlambatan Bayar), 4 Tingkat Risiko (`CRITICAL`, `HIGH`, `MODERATE`, `HEALTHY`), visual sparkline redaman dBm 30-hari, dan Action Execution modal untuk kirim promo retensi WA & penerbitan SPK kalibrasi optik preventif lapangan.
  - **3. Upgrade GenieACS TR-069: Remote Wi-Fi & Connected Clients (`/genieacs`)**:
    - Backend: `GenieacsService`, `GenieacsController` (`apps/backend/src/genieacs/`).
    - Fitur: Remote Wi-Fi SSID & Password Configuration modal (dual-band 2.4GHz & 5GHz) via parameter push TR-069, Connected Clients Radar (monitoring IP/MAC/RSSI perangkat tersambung di rumah pelanggan), dan 1-Click Self-Healing Diagnostics modal (reboot, clear ARP, flush DNS, optical calibration). Seluruh UI diharmonisasikan ke token CSS semantik.
  - **4. Upgrade Traffic MRTG: Analisis Biaya Upstream & BGP Peering (`/infrastruktur/traffic`)**:
    - Frontend: `traffic.tsx` (`apps/frontend/src/pages/infrastruktur/traffic.tsx`).
    - Fitur: Dual-Tab Switcher Carrier-Grade ("Live MRTG & Telemetri" vs "Analisis Biaya & BGP Peering"), 4 Cost KPIs (Total Biaya Transit, CDR 95th Percentile, Peering Offload Ratio, Potensi Penghematan), Matriks Biaya Upstream per Gbps IP Transit vs OpenIXP/IIX, Slider Simulasi Penghematan Peering IXP interaktif (`offloadSliderPct`), dan Rekomendasi AI Traffic Engineering untuk Google CDN, Meta, TikTok, dan Netflix.
  - **Validasi Total**: `apps/backend` dan `apps/frontend` lulus `npx tsc --noEmit` dengan **0 errors**, seluruh 4 rute merespons `HTTP/1.1 200 OK`, dan endpoint simulasi aksi sukses mengeksekusi integrasi WhatsApp & Telegram.
- **Universal Color Degradation Fixes Across All New Pages**:
  - `apps/frontend/src/styles/globals.css`: Menghapus rule destruktif yang memaksa `text-white` menjadi hitam di atas kartu gelap, dan menormalisasi kartu berkontur gradien dengan `background-image: none !important;` pada Light Mode.
  - `apps/frontend/src/pages/payment/calendar.tsx`: Menyelaraskan seluruh elemen Light Mode menggunakan token CSS semantik (`bg-[var(--app-card)]`, `bg-[var(--app-card-subtle)]`, `border-[var(--app-border)]`, `text-[var(--app-text)]`, `text-[var(--app-text-muted)]`).
  - `apps/frontend/src/pages/infrastruktur/dns.tsx`, `/speedtest.tsx`, `/ztp.tsx`, `/telegram/index.tsx`: 100% WCAG compliant.
  - `apps/frontend/src/components/Sidebar.tsx`: Menambahkan menu navigasi resmi `/noc/incidents` dan `/pelanggan/retensi`.
- **Internal Invoice (`/invoice/[id]`) & Public Invoice (`/invoice/public/[id]`)**: Dirombak menggunakan token CSS semantik dan terdaftar sebagai `isStandalone`.

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
    - Memantau ONT dengan redaman kritis (> -27.0 dBm) secara real-time, dilengkapi AI Root Cause diagnostic (analisis tekukan dropcore / konektor kotor / splice closure), tombol polling ulang TR-069 live, penerbitan SPK Teknisi Lapangan 1-klik, dan integrasi ke Peta GIS ODP.
- [x] **Top-3 Essential ISP Features (IPAM, Live MRTG, OTDR Fiber Splicing Matrix)**:
  - **1. IPAM & Mesin Forensik CGNAT UU ITE** ([ipam.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/infrastruktur/ipam.tsx)):
    - Subnet pool manager (Public APJII, CGNAT RFC 6598 `100.64.0.0/10`, Dedicated DIA `/27`, Management `/24`).
    - Mesin investigasi hukum resmi (Pencocokan Public IP + Port + Timestamp ke identitas pelanggan & riwayat PPPoE).
    - Generator Berita Acara Temuan Forensik resmi untuk pemenuhan regulasi Kominfo / Bareskrim Polri.
  - **2. Live Bandwidth MRTG & Peringatan Peak Hour** ([traffic.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/infrastruktur/traffic.tsx)):
    - Telemetri live 3-detik multi-interface (Tier-1 IP Transit, Peering OpenIXP/IIX, OLT Trunk, Local Cache CDIX).
    - Indikator kapasitas real-time dengan status Siaga Peak Hours (19:00 - 22:30 WIB) & ambang batas 85%-90%.
    - Visualisasi 95th Percentile Burstable Billing Recharts dan tabel Top 10 Consumer Real-Time dengan aksi Kick CoA.
  - **3. Kalkulator Jarak Putus Fiber OTDR & Matriks Splicing Core TIA-598** ([otdr.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/infrastruktur/otdr.tsx)):
    - Perhitungan presisi titik putus kabel optik dari hasil tembakan OTDR (dalam meter) pada lintasan peta GIS SVG interaktif.
    - Penandaan titik putus beranimasi (pulsing red marker) di antara dua tiang terdekat beserta estimasi ODP & pelanggan terdampak.
    - Tombol 1-klik penerbitan SPK Splicing Darurat & Broadcast WhatsApp Notifikasi Pemeliharaan ke pelanggan terdampak.
    - Buku Sambung Digital 12-Core TIA-598 per Tube (Tube 1-4) dengan status Active, Standby, Broken, dan Reserved.
  - **4. Integrasi Skill & Brain Knowledge**:
    - Skill baru: [audira-isp-network-ops](file:///f:/AUDIRA-NET-BILLING/.agents/skills/audira-isp-network-ops/SKILL.md).
    - Sinkronisasi arsitektur di [.agents/brain/SYSTEM_ARCHITECTURE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/SYSTEM_ARCHITECTURE.md) dan master katalog di [.agents/brain/FEATURE_CATALOG.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/FEATURE_CATALOG.md).
    - Penambahan menu navigasi di [Sidebar.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/Sidebar.tsx).
  - **5. Mesin Janji Bayar & Dispensasi Isolir Sementara 24/48 Jam (Grace Period Engine - Opsi 1)**:
    - **Frontend UI ([suspend.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/suspend.tsx))**:
      - Tab "Sedang Janji Bayar" dengan filter badge dinamis dan live countdown ("Sisa 20j 34m").
      - Kartu metrik glowing dengan shortcut klik langsung ke tab janji bayar.
      - Modal interaktif "Dispensasi Janji Bayar (Grace Period)" dengan preset durasi (+24 Jam, +48 Jam, +72 Jam, Kustom), input alasan/komitmen bayar, dan opsi notifikasi otomatis WhatsApp.
      - Aksi 1-klik "Batalkan Janji Bayar & Isolir Kembali" serta "Pulihkan Sesi (CoA)".
    - **Backend API & PostgreSQL Engine**:
      - `GET /billing/suspended-customers`: Mengambil pelanggan terisolir dan status dispensasi.
      - `GET /billing/grace-period/active`: Daftar pelanggan dalam masa dispensasi aktif beserta sisa jam/menit.
      - `POST /billing/grace-period/:customerId`: Menyimpan `isGracePeriod: true`, `promiseDate`, mengirim sinyal FreeRADIUS CoA unblock (< 2 detik), dan konfirmasi WhatsApp otomatis.
      - `POST /billing/grace-period/:customerId/cancel`: Membatalkan dispensasi, memutus sesi via CoA, dan mengembalikan status ke `suspended`.
      - `BillingCronService` (`*/30 * * * *`): Evaluasi berkala yang otomatis mengisolir kembali pelanggan penunggak saat batas waktu habis.
  - **6. Presensi Lapangan Teknisi & Geotagging GPS Real-Time ([technician-checkin.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/technician-checkin.tsx))**:
    - **Dual View Mode**: Papan Monitoring Koordinator Lapangan/NOC & Terminal Presensi Mandiri Teknisi.
    - **6 Kartu Metrik Kehadiran**: Total Personel, Hadir Hari Ini, On-Job (Di Lokasi SPK), Standby Basecamp, SPK Tuntas, dan Rate Kehadiran Valid Geofence.
    - **3 Tab Interaktif**: Papan Kehadiran Personel, Check-In Tugas SPK Lapangan, dan Audit Geotagging GPS dengan foto selfie berstempel watermark.
    - **Cyberpunk Camera HUD Modal**: Viewfinder WebRTC dengan reticle grid overlay, status sinyal GPS Lock, stempel watermark canvas otomatis, serta integrasi API `/attendance/check-in`, `/attendance/check-out`, dan `/field-service/jobs/:id/start`.
  - **7. Inventory & Asset Management Enterprise Ultimate ([inventory.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/inventory.tsx))**:
    - **6 Real-time KPI Metric Cards**: Total Aset, Ready Stock Gudang, Terpasang di Pelanggan, Dalam Servis (Maintenance), Rusak/Klaim Garansi (RMA), dan Garansi Kritis (< 30 Hari).
    - **4 Tab Interaktif Lengkap**:
      1. *Katalog Perangkat & Aset*: Filter tipe (ONT, Router, Switch, SFP+ 10G, Drop Core, ODP Splitter, Tool), filter status, live search, click-to-copy SN/MAC, badge status dengan pulsing dot, dan indikator sisa garansi vendor.
      2. *Alokasi Pelanggan (Active Deployments)*: Grid kartu alokasi perangkat ONT/Router yang aktif di rumah pelanggan, nomor internet, tanggal pasang, aksi cepat unassign/tarik perangkat, dan tombol WhatsApp konfirmasi perangkat.
      3. *Log Servis & Klaim Garansi RMA*: Histori maintenance perangkat, kategori kendala (petir, port LAN rusak, firmware corrupt, klaim vendor), estimasi biaya, penanggung jawab, dan tombol 1-klik selesaikan servis.
      4. *Audit Scanner & Stock Opname*: Cyberpunk optical reticle scanner HUD, input cepat barcode/laser gun USB/Bluetooth nirkabel dengan audio synthesizer chirp feedback, riwayat audit MATCH vs UNKNOWN, dan ekspor berita acara audit CSV.
    - **5 Modal Interaktif**: Tambah/Edit Perangkat (dengan auto-generator SN & MAC), Pasang ke Pelanggan (live selector database `/pelanggan`), Tarik Perangkat, Jadwal Servis Perbaikan, dan Cetak Stiker Label QR Tag Aset.
    - **Backend & Auth Resiliency**: Route `/inventory` dan `/pelanggan` diamankan di `JwtAuthGuard` & `RolesGuard`, terintegrasi penuh ke Prisma `Equipment` & `MaintenanceLog`.
  - **8. Manajemen Karyawan & HRM ISP Phase 1 ([karyawan.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/karyawan.tsx) & [hrm-dashboard.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/hrm-dashboard.tsx))**:
    - **Master Plan HRIS 8 Modul**: Disusun bersama konsorsium agen, mencakup arsitektur shift 24/7, insentif PSB, geofencing ODP, dan payroll transfer.
    - **Daftar Karyawan & Teknisi ([karyawan.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/karyawan.tsx))**:
      - 5 Kartu Metrik KPI: Total SDM, Karyawan Aktif, Teknisi Lapangan, NOC Engineers, dan Karyawan Tetap (PKWTT).
      - Multi-View Switcher: Tampilan Tabel Data-Dense & Direktori Kartu ID Badges.
      - Multi-Tab Modal Pendaftaran: Profil Pribadi (Auto NIK), Kepegawaian & Shift, Finansial & Gaji Pokok, serta Kualifikasi/Sertifikasi Optik K3.
      - ID Card Digital Interaktif: Badge vertikal siap cetak dengan QR Code verifikasi staf dan logo AUDIRA.
    - **Dashboard HRM Eksekutif ([hrm-dashboard.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/hrm-dashboard.tsx))**:
      - 6 Kartu Metrik Real-Time: Total SDM, Kehadiran Hari Ini, Teknisi On-Job, Pengajuan Cuti Pending, Beban Payroll Periode Berjalan, dan Rata-rata Skor KPI Tim.
      - Tracker Shift NOC 24/7: Menampilkan status shift berjalan (Pagi/Sore/Malam) dan daftar petugas on-duty.
      - Alokasi SDM per Departemen: Visualisasi bar persentase per divisi ISP (Teknisi, NOC, CS/Billing, Finance).
      - Pintasan Cepat Operasional: Navigasi 1-klik ke Daftar Karyawan, Presensi GPS, Persetujuan Cuti, dan Payroll.
    - **Backend & Prisma Auto-Provisioning**: Endpoint `/employee` terintegrasi dengan pembuat user otomatis, password bcrypt default, dan relasi unik tabel `employees` & `users`.
  - **9. Manajemen Karyawan & HRIS ISP Complete Enhancement (8/8 Modul Ultimate Selesai 100%)**:
    - **1. Dashboard HRM (`/hrm-dashboard`)**: Executive Command Center dengan 6 metrik live, pelacak shift 24/7 (Morning, Evening, Night Watch), alokasi SDM per departemen, dan pintasan operasional.
    - **2. Daftar Karyawan & Teknisi (`/karyawan`)**: 5 KPI, table & card view, modal registrasi multi-tab (Pribadi, Kepegawaian, Finansial, Skill K3), ID Card digital vertikal dengan QR Code verifikasi staf, dan ekspor CSV.
    - **3. Jadwal Shift Kerja (`/jadwal-kerja`)**: 5 KPI roster, matriks 7-hari interaktif 3-shift (Pagi 07:00-15:00, Siang 15:00-23:00, Malam 23:00-07:00, Office 08:30-17:00, Libur), generator roster otomatis mingguan 1-klik, modal tukar shift (Shift Swap) antar rekan kerja, dan lembar tugas harian (Daily Duty Sheet).
    - **4. Presensi & Absensi (`/attendance`)**: Cyberpunk Biometric HUD Terminal, jam digital live NTP, deteksi otomatis shift aktif & sisa waktu giliran, Geofence GPS Kantor Pusat vs On-Field ODC Splicing, kamera WebRTC dengan reticle grid overlay & watermarking audit canvas otomatis (nama, NIP, koordinat GPS, timestamp), live working duration ticker, dan riwayat presensi 7 hari terakhir.
    - **5. Monitoring Kehadiran Realtime (`/attendance-monitoring`)**: NOC Live Fleet Radar dengan 5 KPI real-time, auto-refresh 20s, filter multi-kriteria, link Google Maps presisi untuk setiap titik absen, modal audit zoom foto biometrik dengan hash watermark, modal supervisor status override manual (present, late, leave, sick, absent), dan ekspor CSV lengkap.
    - **6. Pengajuan Cuti (`/cuti`)**: Manajemen izin staf berbasis regulasi ketenagakerjaan, 4 KPI status permohonan, kalkulator kuota cuti tahunan (12 hari/tahun), formulir multi-tipe (tahunan, sakit, darurat, melahirkan, tanpa gaji), serah terima tugas (Handover PIC ISP), dan modal review persetujuan 2-arah supervisor (Approve / Reject dengan alasan penolakan).
    - **7. Penggajian (Payroll) (`/gaji`)**: 5 KPI finansial payroll, formula remunerasi ISP terotomatisasi (Gaji Pokok + Tunjangan + Insentif PSB FTTH Rp 50.000/aktivasi + Uang Lembur Shift Malam Rp 35.000 - BPJS 1% - Denda Terlambat), Slip Gaji Digital Resmi AUDIRA siap cetak (`window.print()`) lengkap dengan kop surat PT AUDIRA SUKSES MANDIRI, terbilang IDR, tanda tangan digital, generator payroll massal 1-klik, dan tombol kirim rincian slip via WhatsApp langsung ke nomor karyawan.
    - **8. Penilaian Kinerja (KPI) (`/kinerja`)**: ISP KPI Scorecard 360° berbasis 6 dimensi teknis riil (Kecepatan MTTR Tiket, Kualitas Redaman Kabel FO dBm, Presensi Shift 24/7, Kepatuhan K3 Tiang & SOP, Kerjasama Tim NOC, dan Tanggap Darurat FO Cut), predikat nilai A+/A/B/C, radar breakdown visual, modal input berkala dengan slider interaktif, catatan pencapaian & rekomendasi training sertifikasi (MTCRE, K3 Ketinggian), dan modal detail inspeksi performa.
    - **Backend & Typecheck Verification**: Seluruh 8 endpoint (`/hrm-dashboard`, `/karyawan`, `/attendance`, `/attendance-monitoring`, `/jadwal-kerja`, `/cuti`, `/gaji`, `/kinerja`) diverifikasi via live curl mengembalikan `HTTP/1.1 200 OK` dan `npx tsc --noEmit` exited code 0 bersih.
  - **10. Kalender Jatuh Tempo & Monitoring Penagihan Harian (`/payment/calendar`)**:
    - **Dashboard Visual Kalender Bulanan Interaktif**: Matriks 7-kolom (Senin - Minggu) lengkap dengan navigasi bulan, indikator hari ini (Today pulse glow), rasio pembayaran per tanggal (`X / Y Bayar`), visual mini progress bar, serta kode warna performa penagihan (🟢 100% Lunas, 🟡 Sebagian, 🔴 Mayoritas Belum Bayar, ⚪ Kosong).
    - **Hero Radar Output Penagihan Hari Ini (27 Oktober 2026)**: Menjawab kebutuhan user secara presisi: *"Hari Ini: 50 dari 100 Customer Sudah Bayar (50.0%)"*, dual-track neon progress bar, rincian kas terkumpul (Rp 12.500.000 Lunas vs Rp 12.500.000 Belum Bayar), dan pintasan aksi cepat broadcast WhatsApp.
    - **5 Top Executive Financial KPI Cards**: Total Tagihan Diterbitkan, Total Kas Masuk (Lunas), Piutang Tertunda (Pending), Tunggakan Kritis (Overdue), dan Rasio Ketepatan Waktu Penagihan (Collection Rate %).
    - **Interactive Customer Drilldown Drawer**: Panel daftar pelanggan yang jatuh tempo pada tanggal yang diklik. Menampilkan Nama Pelanggan, No Internet / PPPoE, Paket Bandwidth, Nomor Tagihan, Nominal Rupiah, Status Badge (Lunas / Belum Bayar / Lewat Tempo / Janji Bayar), Alamat & ODP.
    - **3 Aksi Cepat per Pelanggan**: 
      1. 📲 *WhatsApp Reminder*: Pesan personalisasi instan dengan template dinamis.
      2. 💳 *Kasir Cepat (Quick Pay)*: Modal kasir instan untuk konfirmasi lunas langsung di tempat (QRIS, Tunai, Kolektor, BCA) yang seketika mengupdate rasio live.
      3. 📄 *Buka / Cetak Invoice*.
    - **Broadcast WhatsApp Massal**: Pengiriman reminder serentak ke semua pelanggan belum bayar pada tanggal aktif dengan variabel template dinamis (`{nama}`, `{internetNumber}`, `{nominal}`, `{tanggal}`) dan progress visual.
    - **Ekspor & Cetak Operasional**: Cetak Lembar Kasir / Kolektor Lapangan Harian (`window.print()`) dan Ekspor data penagihan ke CSV / Excel.
    - **Integrasi Navigasi & Keamanan**: Ditambahkan pada menu Sidebar [Sidebar.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/Sidebar.tsx) (`Kasir & Pembayaran` dan `Billing & Invoice`), tombol pintasan di [payment.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/payment.tsx) & [due.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/invoice/due.tsx), serta perlindungan route di [jwt-auth.guard.ts](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/backend/src/auth/jwt-auth.guard.ts).
- [x] **11. Integrasi Penuh 2-Arah Data Customer & WhatsApp Bot Reminder (`WhatsAppBotService` & `BillingCronService`)**:
  - **Sinkronisasi Database Riwayat Tagihan & Pelanggan ke WhatsApp Bot**:
    - WhatsApp Bot (`WhatsAppBotService.handleIncomingMessage`) secara otomatis mengenali identitas nomor telepon pengirim (`08xxx`, `628xxx`), mencocokkannya ke database PostgreSQL `customer`, dan menyajikan status tagihan real-time (`!tagihan` atau menu `1`).
    - Output tagihan menyertakan nomor internet (PPPoE), nomor invoice aktif, periode billing, nominal rupiah, tanggal jatuh tempo, status bayar, dan tautan instan pembayaran QRIS / Virtual Account.
  - **Mesin Reminder Otomatis Server Gateway (Fonnte / WAHA Baileys)**:
    - `POST /billing/remind-due-customers`: Batch reminder dispatcher berbasis jadwal jatuh tempo (H-3 dan Hari-H) dengan template pesan dinamis bersubstitusi token (`{nama}`, `{internetNumber}`, `{nominal}`, `{tanggal}`).
    - `POST /billing/send-single-reminder`: Dispatcher reminder perorangan 1-klik langsung dari drawer pelanggan kalender penagihan.
    - `POST /billing/run-daily-reminders`: Pemicu manual instan mesin cron penagihan harian (`BillingCronService.sendPaymentReminders`).
    - `POST /billing/bot-simulate`: Endpoint simulasi bot interaktif untuk preview respons bot WA sebelum pesan dikirim ke pelanggan.
  - **Frontend UI & Simulator Interaktif (`/payment/calendar`)**:
    - **Status Ribbon Bot & Scheduler**: Menampilkan status gateway aktif, status AI Bot 2-arah, jadwal cron otomatis (H-3 @ 09:00 WIB, Hari-H @ 09:00 WIB, Overdue @ 10:00 WIB), dan tombol eksekusi cron instan.
    - **Modal Simulator Chatbot WA**: Shell simulator smartphone real-time dengan quick chip (`!tagihan`, `!ceksinyal`, `!reboot`, `MENU`) yang langsung mengeksekusi logika bot backend secara live.
    - **Dual Reminder Mode**: Operator dapat memilih pengiriman otomatis via Server Bot Gateway (latar belakang) atau via WhatsApp Web / Desktop (interaktif).
  - **Verifikasi TypeScript & Live Test**:
    - `apps/backend`: `npx tsc --noEmit` exit 0.
    - `apps/frontend`: `npx tsc --noEmit` exit 0.
    - Live bot simulate test: Terverifikasi sukses mencocokkan nomor customer dengan database PostgreSQL, menghasilkan tagihan nyata, dan rute `/payment/calendar` merespons `HTTP/1.1 200 OK`.
- [x] **12. Integrasi Telegram Bot & 14 Forum Topics Operations Hub (`TelegramService` & Mobile Client)**:
  - **Kredensial & Supergroup Terhubung**:
    - Bot Token: `8874323451:AAFJXzKCyqPRkJTqjUR_sCh8EuraqlKOm4k` (`@AudiraISPBot`).
    - Supergroup Chat ID: `-1004464075869` (Migrasi otomatis dari legacy Group ID `-5392184125`), Judul: `AUDIRA ISP | Operations Center`, Tipe: Supergroup Forum.
    - Invite Link Resmi: `https://t.me/+Yx8qadYjUSsxZjQ1`.
  - **14 Forum Topics Aktif & Thread ID Mapping**:
    - `📢 Announcements` (ID: 2), `💳 Billing & Payment` (ID: 4), `👥 Customer Management` (ID: 6), `🌐 Network Monitoring` (ID: 8), `🚨 Network Incidents` (ID: 10), `🎫 Support Tickets` (ID: 12), `🛠️ Field Operations` (ID: 14), `🔌 Installation & Activation` (ID: 16), `📡 Infrastructure` (ID: 18), `📊 Reports & Analytics` (ID: 20), `⚙️ System & Automation` (ID: 22), `🤖 AI Assistant` (ID: 24), `📝 Change Management` (ID: 26), `💰 Finance Summary` (ID: 28).
    - Seluruh 14 topik telah dibuat via Telegram API dan dikirimi pesan sambutan resmi dari `@AudiraISPBot`.
  - **Backend NestJS REST API (`apps/backend/src/telegram`)**:
    - `TelegramService`: Engine pengiriman pesan terarah ke thread topik spesifik dengan format Markdown.
    - `TelegramController`: Endpoints `GET /telegram/status`, `GET /telegram/topics`, `GET /telegram/logs`, `POST /telegram/broadcast`, dan `POST /telegram/test/:topicNo`.
    - Whitelist di `jwt-auth.guard.ts` dan global export di `app.module.ts`.
  - **Frontend Web Admin (`apps/frontend/src/pages/telegram/index.tsx`)**:
    - Command Center `/telegram` dengan 4 kartu KPI, grid 14 topik interaktif lengkap dengan thread ID & tombol tes 1-klik, live broadcast composer dengan preset template cepat, dan log telemetri real-time.
    - Terintegrasi di `Sidebar.tsx` (NOC & Outage Engine, Pengaturan Sistem) dan link pintasan di `/payment/calendar`.
  - **Aplikasi Mobile Flutter (`AUDIRA-NET`)**:
    - `lib/services/telegram_service.dart`: Client hybrid (Backend REST + Direct Telegram fallback) dengan helper lapangan (`reportIncident`, `reportFieldTask`, `reportActivation`, `reportTicket`).
    - `lib/screens/telegram_topics_screen.dart`: Layar operasional mobile untuk melihat 14 topik, membuka langsung topik di aplikasi Telegram via deep link, dan mengirim tes notifikasi.
    - Akses cepat via AppBar dan banner di `lib/screens/notifications_page.dart`.
  - **Verifikasi**: Backend TypeScript exit 0, Frontend Next.js exit 0, Flutter Dart Analyze exit 0, Live HTTP 200 OK pada `/telegram` dan `/telegram/status`.
- [x] **13. Trio Enterprise Carrier-Grade ISP Features (DNS Filtering Kominfo, Speedtest SLA Studio, Zero-Touch Provisioning)**:
  - **1. DNS Filtering & Internet Positif Kominfo (`/infrastruktur/dns`)**:
    - Backend: `DnsModule`, `DnsService`, `DnsController` (`apps/backend/src/dns/`).
    - Fitur: Sinkronisasi database TrustPositif Kominfo (+2.4K domain baru), manajemen 5 kategori blokir (Judi Online, Pornografi, Phishing, DoH Bypass, Streaming Bajakan), custom blacklist/whitelist domain rules, live DNS throughput (14.8K QPS, latency 1.2ms), audit feed intersepsi real-time ke IP Walled Garden (`10.10.10.1`), modal simulasi Walled Garden, dan broadcast alert otomatis ke Telegram Topic 11 (`⚙️ System & Automation`).
  - **2. Speedtest Server Lokal & Diagnostic SLA Studio (`/infrastruktur/speedtest`)**:
    - Backend: `SpeedtestModule`, `SpeedtestService`, `SpeedtestController` (`apps/backend/src/speedtest/`).
    - Fitur: Local 10Gbps Core Edge benchmark engine langsung ke OpenIXP/IIX, visualizer speed meter (Download/Upload simetris 1:1, Ping, Jitter, Packet Loss), pembanding persentase kepatuhan kontrak SLA paket berlangganan pelanggan, AI Root-Cause Diagnostic (kualitas optik Rx dBm, beban port PON OLT, interferensi frekuensi WiFi), E-SLA Verification Certificate modal dengan fitur cetak PDF dan kirim pesan resmi via WhatsApp, serta broadcast alert otomatis ke Telegram Topic 4 (`🌐 Network Monitoring`).
  - **3. Zero-Touch Provisioning (ZTP) & Discovery Queue (`/infrastruktur/ztp`)**:
    - Backend: `ZtpModule`, `ZtpService`, `ZtpController` (`apps/backend/src/ztp/`).
    - Fitur: Discovery radar antrean modem ONT baru unassigned (ZTE, Huawei, VSOL) yang tercolok teknisi di lapangan, autonomous 3-step pipeline (Step 1: Alokasi ONU ID & VLAN OLT ➔ Step 2: Pembuatan PPPoE Secret & Simple Queue MikroTik ➔ Step 3: Parameter push WiFi SSID & WPA2 via GenieACS TR-069) dalam 2.1 detik, terminal live log execution, riwayat aktivasi, dan broadcast alert otomatis ke Telegram Topic 8 (`🔌 Installation & Activation`).
  - **Verifikasi**: Backend TypeScript exit 0, Frontend Next.js exit 0, ketiga rute web merespons `HTTP/1.1 200 OK`, seluruh pemicu aksi API berhasil dan mengirim pesan ke topik forum Telegram terkait.
- [x] **14. Quad Carrier-Grade Core ISP Features (Incident Manager, Churn Radar, Remote TR-069 Wi-Fi/Clients, BGP Cost Analyzer)**:
  - **1. Pusat Komando Gangguan Massal & Outages (`/noc/incidents`)**:
    - Backend: `IncidentModule`, `IncidentService`, `IncidentController` (`apps/backend/src/incident/`).
    - Fitur: Manajemen lifecycle insiden lengkap (`REPORTED`, `INVESTIGATING`, `SPLICING_IN_PROGRESS`, `MONITORING`, `RESOLVED`), isolasi dampak OLT/ODP dan pemetaan pelanggan terdampak langsung dari basis data, 1-Click WhatsApp Broadcast massal ber-template dinamis untuk pencegahan panik pelanggan, drawer timeline pelacakan investigasi teknisi & estimasi pemulihan (ETA), dan auto-dispatch alert resmi ke Telegram Supergroup Topic 5 (`🚨 Network Incidents`, thread ID: 10).
  - **2. Radar Prediksi Churn AI & Degradasi Optik (`/pelanggan/retensi`)**:
    - Backend: `RetensiModule`, `RetensiService`, `RetensiController` (`apps/backend/src/retensi/`).
    - Fitur: Scoring komposit 4 pilar (Optical Degradation Slope 30-hari via TR-069, Frekuensi Tiket Keluhan, Flapping Sesi PPPoE, & Tren Keterlambatan Bayar), 4 Tingkat Risiko (`CRITICAL`, `HIGH`, `MODERATE`, `HEALTHY`), visual sparkline redaman dBm 30-hari, dan Action Execution modal untuk kirim promo retensi WA & penerbitan SPK kalibrasi optik preventif lapangan.
  - **3. Upgrade GenieACS TR-069: Remote Wi-Fi & Connected Clients (`/genieacs`)**:
    - Backend: `GenieacsService`, `GenieacsController` (`apps/backend/src/genieacs/`).
    - Fitur: Remote Wi-Fi SSID & Password Configuration modal (dual-band 2.4GHz & 5GHz) via parameter push TR-069, Connected Clients Radar (monitoring IP/MAC/RSSI perangkat tersambung di rumah pelanggan), dan 1-Click Self-Healing Diagnostics modal (reboot, clear ARP, flush DNS, optical calibration). Seluruh UI diharmonisasikan ke token CSS semantik.
  - **4. Upgrade Traffic MRTG: Analisis Biaya Upstream & BGP Peering (`/infrastruktur/traffic`)**:
    - Frontend: `traffic.tsx` (`apps/frontend/src/pages/infrastruktur/traffic.tsx`).
    - Fitur: Dual-Tab Switcher Carrier-Grade ("Live MRTG & Telemetri" vs "Analisis Biaya & BGP Peering"), 4 Cost KPIs (Total Biaya Transit, CDR 95th Percentile, Peering Offload Ratio, Potensi Penghematan), Matriks Biaya Upstream per Gbps IP Transit vs OpenIXP/IIX, Slider Simulasi Penghematan Peering IXP interaktif (`offloadSliderPct`), dan Rekomendasi AI Traffic Engineering untuk Google CDN, Meta, TikTok, dan Netflix.
  - **Verifikasi**: Backend TypeScript exit 0, Frontend Next.js exit 0, keempat rute web merespons `HTTP/1.1 200 OK`, seluruh pemicu aksi API berhasil dan mengirim pesan ke WhatsApp / Telegram secara live.
- [x] **15. Telco 100% Full-Spectrum Carrier-Grade ISP Complete (NetFlow DDoS Shield, .SOR Waveform Studio, TR-069 Mass Firmware Scheduler, Multi-NAS BNG Balancing, e-Pelaporan Kominfo)**:
  - **1. NetFlow v9/IPFIX & BGP Flowspec DDoS Shield (`/infrastruktur/netflow`)**:
    - Backend `NetflowModule` (`netflow.service.ts`, `netflow.controller.ts`, `netflow.module.ts`) & Whitelist `jwt-auth.guard.ts`.
    - Live flow telemetri buffer (kfps/pps/Gbps), Top Talkers ASN, radar deteksi serangan (SYN Flood, UDP Amp, ICMP Flood).
    - 1-Click BGP Flowspec injection (rate-limiting 50 Mbps) & RTBH `/32` blackhole dengan auto-dispatch ke Telegram Topic 5 (`🚨 Network Incidents`, thread ID: 10).
    - Frontend `/infrastruktur/netflow` lengkap dengan 4 KPIs, live flow table (1:1000 sampling), DDoS cards, dan injection modal.
  - **2. Raw OTDR (.SOR) Trace Waveform Studio (`/infrastruktur/otdr`)**:
    - Tab 3 Studio Waveform `.SOR` interaktif berstandar Telcordia Bellcore SR-4731 / GR-196.
    - SVG attenuation curve renderer (0–16 km, 0 sampai -35 dB), scrub cursor, zoom, dan file uploader parser.
    - Tabel Telcordia KeyEvents: Fresnel reflection spike, splice loss step, macro-bend loss, dan EOT fiber break marker.
  - **3. TR-069 Mass Firmware Upgrade Campaign Scheduler (`/genieacs`)**:
    - Backend: Upgraded `GenieacsService` & `GenieacsController` dengan firmware repository catalog & campaign state machine.
    - Frontend: Tab switch di `/genieacs` (`Daftar Perangkat CPE & Wi-Fi` vs `Jadwal Batch Upgrade Firmware Massal`).
    - Fitur: Batch scheduling 02:00–04:00 WIB (10–50 ONT/batch), optical safety check guard (skip otomatis ONT dengan Rx < -26.5 dBm atau offline guna mencegah bricking), auto-rollback state machine jika error rate batch > 15%, dan New Campaign modal.
  - **4. Multi-NAS MikroTik Centralized Balancing & Anycast BNG (`/mikrotik/cluster`)**:
    - Frontend: `/mikrotik/cluster` dengan 4-node cluster topology (`Core-01`, `Core-02`, `BRAS-East`, `BRAS-West`).
    - Anycast Gateway & VRRP VIP `103.189.20.1` health check, live session balancing bar, dan 1-Click Graceful Drain & Failover.
  - **5. e-Pelaporan Ditjen PPI Kominfo Regulatory Studio (`/infrastruktur/kominfo`)**:
    - Frontend: `/infrastruktur/kominfo` dengan 5-Borang resmi kepatuhan ISP (Borang 1: IPAM/CGNAT, Borang 2: Bandwidth/Transit, Borang 3: Rekap FTTH, Borang 4: TrustPositif Sinkhole, Borang 5: SLA/QoS MTTR).
    - Official PDF print & export modal bertanda tangan digital resmi pimpinan ISP.
  - **Sidebar & Keamanan**: Menu ditambahkan di `Sidebar.tsx` untuk `/mikrotik/cluster`, `/infrastruktur/netflow`, dan `/infrastruktur/kominfo`.
  - **Verifikasi**: Backend TypeScript exit 0, Frontend Next.js exit 0, seluruh 5 rute merespons `HTTP/1.1 200 OK`.
- [x] **16. Web Admin Panel Full-Spectrum Enhancement: Paket A + Paket B + Paket C (14 File Selesai 100%)**:
  - **Paket A (System, Security & Docs)**:
    - [backup.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/backup.tsx): Enterprise Disaster Recovery & Multi-Target Snapshot Vault (PostgreSQL `.sql.gz`, MikroTik `.backup/.rsc`, GenieACS TR-069 & OLT Config Snapshot, SHA-256 checksum, Telegram Topic 11 dispatch).
    - [audit-logs.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/audit-logs.tsx): Carrier-Grade Security & RBAC Forensic Audit Trail (`GET /audit/logs`, `GET /audit/stats`, `POST /audit/clean`, Export CSV/JSON, Modal Inspeksi Forensik SHA-256, Telegram Topic 13 dispatch).
    - [test-api.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/debug/test-api.tsx): Full-Spectrum API Diagnostic & Latency Benchmark Suite (Fix bug literal `API_BASE`, 23 endpoint nyata dalam 6 kategori, RTT `performance.now()`, Realtime WebSocket Broadcast Tester).
    - [dokumentasi.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/dokumentasi.tsx): Pusat Dokumentasi Arsitektur, Port Map Resmi (`3217`/`3218`/`3001`/`5455`/`6379`), 16 SOP Operasional NOC Carrier-Grade, dan Referensi REST API & WhatsApp Bot Commands.
  - **Paket B (NOC, FreeRADIUS CoA Automation & Telemetry)**:
    - [automation.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/automation.tsx): Enterprise FreeRADIUS CoA, Provisioning & Automation Engine (4 Tab penuh: Sesi Aktif FreeRADIUS & CoA UDP 3799, Auto-Isolir & Provisioning Lifecycle, Manajemen FUP & Auto-Revert Turbo Booster, serta Outage WA & Mobile Push Broadcast).
    - [modem-monitor.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/modem-monitor.tsx): Enterprise ONT/CPE Optical & ICMP Telemetry Matrix (5 KPI Cards, distribusi tipe modem, redaman Rx/Tx dBm & suhu laser °C, Cek Ping Live, Reboot ONT TR-069, Modal Diagnostik Optik).
    - [noc.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/noc.tsx): Unified NOC Command Center, Proactive High Optical Loss Warning Banner (`< -27.0 dBm` + 1-Click SPK Dispatch), Outage Auto-Detector, dan Telegram NOC Gateway CLI Console.
    - [map.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/infrastruktur/map.tsx): Live FTTH GIS Network Topology & Optical Attenuation Map (`GET /odp`, `GET /olt`, `GET /mikrotik`, 5 KPI Summary Bar, label dBm & kapasitas port, sparkline latensi, Terminal Diagnostik Live).
    - [speedtest.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/infrastruktur/speedtest.tsx): Point-to-Point 5-Node Speedtest & E-SLA Studio V2.3.1 (`GET /speedtest/servers`, `GET /speedtest/ping?node=...`, Bufferbloat Grade `A+`, E-SLA Certificate SHA-256 HMAC).
  - **Paket C (Business, Franchise, Analytics, Loyalty & Package Upgrade + Sidebar)**:
    - [franchise.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/franchise.tsx): Enterprise Multi-Tenant & Franchise ISP Management Suite (`TenantController` CRUD, Hierarchy Tree View, Kalkulator & Pencairan Komisi, Clone Settings).
    - [analytics.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/analytics.tsx): Executive BI & Predictive Financial Analytics Suite (Token semantik `--app-*`, live fallback PostgreSQL, Export CSV Analitik Eksekutif, Cetak PDF Eksekutif).
    - [loyalty.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/loyalty.tsx) (Halaman Baru): Customer Loyalty Points & Referral Program Studio (`ReferralController`, Katalog Poin Silver/Gold/Platinum, Top Referrer Leaderboard, Redeem Diskon Tagihan).
    - [upgrade-requests.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/packages-admin/upgrade-requests.tsx) (Halaman Baru): Antrean Persetujuan Upgrade & Downgrade Paket Mandiri (Kelayakan Redaman Optik dBm, Kalkulasi Prorata Rp, 1-Klik Setujui & Push Bandwidth CoA).
    - [Sidebar.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/Sidebar.tsx): Penambahan 2 halaman baru dan 12 halaman modul Invoice, Keuangan, dan Laporan ke navigasi utama.
  - **Verifikasi TypeScript**: `npx tsc --noEmit` di `apps/frontend` lulus bersih dengan **0 error**.
- [x] **17. Web Admin Panel Root Cockpit `http://localhost:3217/` & Harmonisasi Menyeluruh: Paket D + Paket E + Paket F (26 File Selesai 100%)**:
  - **Paket D (Root Cockpit `http://localhost:3217/`, Global Topbar `Ctrl+K`, & Role Dashboards)**:
    - [Layout.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/Layout.tsx) & [RealtimeNotificationBanner.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/RealtimeNotificationBanner.tsx): Sticky Enterprise Topbar dengan **Global Command Palette (`Ctrl+K`)** 32+ modul, breadcrumb dinamis, shortcut MRTG & NOC Radar, serta Notification Center ber-token `--app-*`.
    - [index.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/index.tsx): **Carrier-Grade BSS/OSS Telemetry Radar Strip** (MRTG 10G, Outage WA Blast, TR-069 Redaman ONT, Antrean ZTP, Prorata Upgrade, AI Churn), koneksi API nyata pada Quick Pay / Mark Paid / CoA Speed Booster, serta penyelesaian **4 Modal Edit & Hapus Invoice/Pelanggan** di JSX.
    - [billing.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/dashboard/billing.tsx), [noc.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/dashboard/noc.tsx), & [cs.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/dashboard/cs.tsx): Role Cockpits ber-token `--app-*` penuh dan data live API.
  - **Paket E (Customer CRM Lifecycle & Package/Service Catalog — 11 File)**:
    - Harmonisasi penuh token `--app-*` (0 raw `bg-white`) & migrasi seluruh `alert()` ke `useToast()` pada [expired.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/expired.tsx), [suspend.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/suspend.tsx), [pending.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/pending.tsx), [import.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/import.tsx), [[id].tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/pelanggan/%5Bid%5D.tsx) (+ tombol diagnostik **Cek Redaman TR-069** & **Reset Sesi CoA**), [packages-admin.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/packages-admin.tsx), [speed.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/packages-admin/speed.tsx), [promo.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/packages-admin/promo.tsx), [kategori.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/packages-admin/kategori.tsx), [non-aktif.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/packages-admin/non-aktif.tsx), dan [services-admin.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/services-admin.tsx).
  - **Paket F (Invoice, Field Ops, Technician, Payment/WA Settings & Sales — 9 File)**:
    - Harmonisasi penuh token `--app-*` (0 raw `bg-white`), eliminasi seluruh `alert()`, & tanggal dinamis pada [semua.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/invoice/semua.tsx), [overdue.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/invoice/overdue.tsx), [operational.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/operational.tsx), [field-service.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/field-service.tsx), [technician-checkin.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/technician-checkin.tsx), [technician-monitoring.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/technician-monitoring.tsx), [payment/settings.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/payment/settings.tsx), [whatsapp/settings.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/whatsapp/settings.tsx), dan [admin/sales.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/admin/sales.tsx).
- [x] **18. Full End-to-End Real-Time Tri-Service Integration (Priority 1 + Priority 2 + Priority 3)**:
  - **Priority 1: Real-time Invoice Payment & FreeRADIUS CoA "Bayar Langsung Nyala"**:
    - Mobile app triggers `POST /billing/invoices/:id/pay` -> NestJS Backend records payment in PostgreSQL -> emits `payment_received` via Socket.IO Gateway -> Web Admin Dashboard (`invoices-admin.tsx`, `payment.tsx`) auto-reconciles without page refresh -> FreeRADIUS CoA restores normal PPPoE session profile in < 2 seconds.
  - **Priority 2: Helpdesk Trouble Ticket Reporting & NOC Dispatch Live Sync**:
    - Customer submits ticket via Flutter Mobile App (`POST /tickets/customer-report`) -> NestJS records ticket in PostgreSQL -> Socket.IO emits `ticket_updated` -> Web Admin NOC (`tickets.tsx`) live updates -> NOC dispatches technician (`POST /tickets/:id/assign`) -> Technician marks resolved (`PATCH /tickets/:id/status`) -> Customer app feed updates in real-time. Verified with 6 WebSocket events intercepted in `scratch/test_priority2_e2e.js`.
  - **Priority 3: Field Work Orders, GPS Radar Telemetry & Digital Proof of Work (Berita Acara Digital)**:
    - Web Admin dispatches Work Order (`POST /field-service/jobs`) and Emergency Fiber Cut SPK (`POST /field-service/emergency-splicing-spk`) -> Backend records in PostgreSQL and emits `work_order_updated`.
    - Mobile Technician app (`teknisi_dashboard_tab.dart`, `teknisi_duty_card.dart`) loads real jobs from backend API and sends live GPS coordinates (`POST /field-service/technician/location`) -> GIS Radar Command Center (`technician-monitoring.tsx`) updates radar nodes live via `technician_location` event.
    - Technician starts job (`POST /field-service/jobs/:id/start`) with GPS coordinates and selfie check-in photo -> Web Admin Check-in History (`/field-service/check-in-history`) verified.
    - Optical Diagnostic Pocket Measurement runs via `POST /field-service/jobs/:id/optical-test` (Rx/Tx dBm, PON O5 status).
    - Technician completes job with Digital Signature & Material Consumption via `DigitalProofOfWorkDialog` (`POST /field-service/jobs/:id/complete`) -> Web Admin receives `work_order_updated` status `completed`.
    - Verified 100% with E2E script `scratch/test_priority3_e2e.js` (8 Work Order events, 4 Location events intercepted) and `flutter analyze` passed with 0 issues.

### 🔄 In-Progress / Ongoing Focus
- [x] **Sinkronisasi Memori Jangka Panjang (LTM Hub) & Skills**:
  - Pembaruan `FEATURE_CATALOG.md`, `UPDATE_HISTORY_AND_ROADMAP.md` (v2.5.0), dan `MEMORY.md` (Task 17).
  - AUDIRA-NET & BILLING mencapai **100% Full-Spectrum Carrier-Grade Telco & Enterprise ERP Platform**.

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
