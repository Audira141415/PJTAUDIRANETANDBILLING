# UPDATE HISTORY & ROADMAP — AUDIRA-NET & BILLING ECOSYSTEM

> **Version Changelog, Milestone History, and Future ISP Architecture Roadmap**  
> *Riwayat Mutasi Proyek dan Rencana Pengembangan Fitur Ekosistem ISP Jangka Panjang.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Version Changelog

### Version 2.6.0 (Full-Spectrum System-Wide Anti-Slop & AUDIRA Design System Certification — 162/162 TSX Clean)
- **Global Anti-Slop Directive Implementation (Mode "during" via `%APPDATA%\antislop\settings.json`)**:
  - Konfigurasi filter anti-slop selama proses coding (in-stream inspection) mencegah kembalinya AI slop.
  - Perombakan total token desain di `f:\AUDIRA-NET-BILLING\.agents\DESIGN.md` dan `apps/frontend/src/styles/globals.css` dengan arsitektur 3-Lapisan (`--primitive-*`, `--app-*`) serta verifikasi rasio kontras WCAG AA (> 4.5:1 untuk normal text, > 3:1 untuk interactive elements).
- **Hasil Audit Kuantitatif Komprehensif Seluruh 162 File TSX Frontend (`apps/frontend/src/`)**:
  - **Browser `alert(...)` Calls**: **0 LULUS** (dari ~400 pemanggilan raw `alert` diganti 100% dengan `useToast()` / `toast.success/info/warning/error`).
  - **Em Dashes (`—`) di UI Copy**: **0 LULUS** (seluruh em dash digantikan tanda hubung `-` atau titik dua `:`).
  - **Multi-Stop Gradients (`via-`)**: **0 LULUS** (dibersihkan menjadi solid tokenized surfaces).
  - **Generic AI `Sparkles`**: **0 LULUS** (digantikan dengan ikon semantik Lucide SVG: `Zap`, `Activity`, `Target`, `ShieldCheck`).
  - **Raw Un-Themed `bg-white`**: **0 LULUS** (dipasangkan dengan token dark mode atau `--app-card`).
  - **TypeScript Compiler Check**: `npx tsc --noEmit` exited code `0` (**0 Type Errors**).
- **Partisi & Eksekusi 8 Sub-Agen Spesialis**:
  - **Reports Anti-Slop Specialist** (12 file `pages/reports/*`): 167 alerts migrated, 14 dashes fixed.
  - **HRM Anti-Slop Specialist** (6 file `gaji.tsx`, `cuti.tsx`, `kinerja.tsx`, `attendance.tsx`, `jadwal-kerja.tsx`, `attendance-monitoring.tsx`): 22 alerts migrated, 0 emoji, biometrik HUD semantik.
  - **Finance Anti-Slop Specialist** (13 file `pages/finance/*` & `keuangan.tsx`): 63 alerts migrated, 11 `bg-white` tokenized.
  - **Invoices & Payment Anti-Slop Specialist** (12 file `pages/invoice/*` & `pages/payment/*`): 99 alerts migrated, 0 emojis, carrier-grade layout.
  - **Messaging & Customer Specialist** (12 file `automation.tsx`, `whatsapp/*`, `telegram/*`, `customer/*`, `paket.tsx`): 0 emoji, 0 via- gradients.
  - **Infrastructure & Network Specialist** (15 file `infrastruktur/*`, `mikrotik/*`, `noc.tsx`, `modem-monitor.tsx`): 35 tells reduced to 0.
  - **Customers & Field Ops Specialist** (15 file `pelanggan/*`, `karyawan.tsx`, `technician*`, `field-service.tsx`, `work-order-detail.tsx`): 0 violations, safe delete modal added.
  - **Operations & Admin Specialist** (27 file `dashboard/*`, `inventory.tsx`, `booster.tsx`, `layanan.tsx`, `tickets.tsx`, `pengaturan.tsx`, dll.): 16 dashes, 4 alerts, 8 sparkles, 16 emojis, 24 bg-white eliminated.
  - **Root Shell & Fondasi**: `Layout.tsx`, `Sidebar.tsx`, `NavigationProgressBar.tsx`, `ToastContext.tsx`, `RealtimeContext.tsx`, `ReportSubTabDetail.tsx`, `_app.tsx`, `404.tsx`, `login.tsx`, `admin/login.tsx`, `forgot-password.tsx`, `register.tsx`, `terms.tsx`, `privacy.tsx`, `debug/auth.tsx`, dan `debug/test-api.tsx`.

### Version 2.5.0 (Web Admin Panel Full Harmonization: Paket D + Paket E + Paket F — 26 Files)
- **Paket D — Root Cockpit `http://localhost:3217/` (`index.tsx`), Global Topbar `Ctrl+K` (`Layout.tsx`), & Role Dashboards (`dashboard/billing.tsx`, `dashboard/noc.tsx`, `dashboard/cs.tsx`)**:
  - **1. Global Sticky Topbar & Command Palette (`Ctrl+K`) (`Layout.tsx` & `RealtimeNotificationBanner.tsx`)**:
    - Sticky Enterprise Topbar dengan indikator breadcrumb modul aktif, shortcut MRTG Live & NOC Radar, serta 1-Click Theme Switcher.
    - **Global Command Palette (`Ctrl+K` / `Cmd+K`)** mengindeks 32+ modul operasional ISP lintas 5 kategori dengan pencarian instan dan navigasi keyboard (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
    - Harmonisasi penuh `RealtimeNotificationBanner.tsx` dan `ToastContext.tsx` (`toast.*` & `addToast`) dengan variabel CSS semantik `--app-*`.
  - **2. Root Executive Operations Cockpit (`http://localhost:3217/` — `src/pages/index.tsx`)**:
    - Penambahan **Carrier-Grade BSS/OSS Telemetry Radar Strip** (6 kartu interaktif: Uplink MRTG 10G, Outage/LOS WA Blast, Redaman ONT TR-069, Antrean ZTP OMCI, Upgrade Paket Prorata, dan AI Churn Radar).
    - Penyelesaian **4 Modal Edit & Hapus di JSX** (`Modal 7: Edit Invoice`, `Modal 8: Hapus Invoice`, `Modal 9: Edit Pelanggan`, `Modal 10: Hapus Pelanggan`) yang sebelumnya belum ter-render.
    - Integrasi API backend nyata pada `handleMarkInvoicePaid` (`api.keuangan.markPaid`), `handleQuickPaySubmit`, dan `handleApplyBoosterSubmit` (`POST /radius/coa/bandwidth`).
  - **3. Role Cockpits (`dashboard/billing.tsx`, `dashboard/noc.tsx`, `dashboard/cs.tsx`)**:
    - Eliminasi seluruh class statis `bg-gray-50`/`bg-white` dan tanggal hardcoded `"Desember 2025"`, digantikan dengan token `--app-*` dan kalkulasi telemetri dinamis dari API.
- **Paket E — Customer CRM Lifecycle & Package/Service Catalog Harmonization (11 File)**:
  - Harmonisasi penuh token `--app-*` (0 raw `bg-white`) dan penggantian seluruh browser `alert()` dengan `useToast()` pada:
    - `pelanggan/expired.tsx` (perbaikan bug Dark Mode `bg-slate-50 text-slate-800`), `pelanggan/suspend.tsx`, `pelanggan/pending.tsx`, `pelanggan/import.tsx`, dan `pelanggan/[id].tsx` (dilengkapi tombol diagnostik **Cek Redaman TR-069** & **Reset Sesi CoA**).
    - `packages-admin.tsx`, `packages-admin/speed.tsx`, `packages-admin/promo.tsx`, `packages-admin/kategori.tsx`, `packages-admin/non-aktif.tsx`, dan `services-admin.tsx` (dilengkapi fallback otomatis ke `api.pelanggan.getAll()`).
- **Paket F — Invoice, Field Ops, Technician, Payment/WA Settings & Sales Harmonization (9 File)**:
  - Harmonisasi penuh token `--app-*` (0 raw `bg-white`), eliminasi seluruh `alert()`, dan pembaruan tanggal statis ke periode berjalan dinamis pada:
    - `invoice/semua.tsx` & `invoice/overdue.tsx`
    - `operational.tsx`, `field-service.tsx`, `technician-checkin.tsx`, & `technician-monitoring.tsx`
    - `payment/settings.tsx`, `whatsapp/settings.tsx`, & `admin/sales.tsx`

### Version 2.4.0 (Web Admin Panel Full-Spectrum Enhancement: Paket A + Paket B + Paket C)
- **Paket A — System, Security & Docs Overhaul (`/backup`, `/audit-logs`, `/debug/test-api`, `/dokumentasi`)**:
  - **1. Enterprise Disaster Recovery & Multi-Target Snapshot Vault (`/backup`)**:
    - Terhubung ke `BackupController` (`GET /backup/list`, `POST /backup/create`, `DELETE /backup/:filename`, `GET /backup/download/:filename`, `POST /backup/restore/:filename`, `POST /backup/clean`) dan laporan ke Telegram Topic 11 (`POST /telegram/test/11`).
    - 4 KPI Cards & 3 Tab Vault: PostgreSQL Database Snapshots (`.sql.gz` dengan SHA-256 checksum), MikroTik RouterOS Config Vault (`.backup` & `.rsc` untuk `Core-01`, `Core-02`, `BRAS-East`, `BRAS-West`), serta GenieACS TR-069 & OLT Config Snapshot.
  - **2. Carrier-Grade Security & RBAC Forensic Audit Trail (`/audit-logs`)**:
    - Terhubung ke `AuditController` (`GET /audit/logs`, `GET /audit/stats`, `POST /audit/clean`) dan broadcast ke Telegram Topic 13 (`POST /telegram/test/13`).
    - 4 KPI Cards, filter adaptif penuh token semantik `--app-*`, Export CSV/JSON, Modal Inspeksi Detail Forensik ber-fingerprint SHA-256, dan pembersihan log lama (>90 hari).
  - **3. Full-Spectrum Carrier-Grade API Diagnostic & Latency Benchmark Suite (`/debug/test-api`)**:
    - Perbaikan bug literal string `API_BASE` (`process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3218'`).
    - Pengujian 23 endpoint nyata dalam 6 kategori dengan pengukuran RTT `performance.now()`, JSON response inspector, dan Realtime WebSocket Broadcast Tester (`POST /realtime/test-broadcast`).
  - **4. Pusat Dokumentasi Arsitektur, 16 SOP NOC & Referensi API (`/dokumentasi`)**:
    - Sinkronisasi penuh ke Port Map Resmi (`3217`, `3218`, `3001`, `5455`, `6379`), 44 Tabel Prisma, 50 Modul NestJS, 16 SOP Operasional NOC Carrier-Grade (`audira-isp-network-ops`), dan Referensi REST API & WhatsApp Bot Commands.
- **Paket B — NOC, FreeRADIUS CoA Automation & Telemetry Overhaul (`/automation`, `/modem-monitor`, `/noc`, `/infrastruktur/map`, `/infrastruktur/speedtest`)**:
  - **1. Enterprise FreeRADIUS CoA, Provisioning & Automation Engine (`/automation`)**:
    - 4 KPI Cards & 4 Tab fungsional penuh: Tab 1 (`sync`) Sesi Aktif FreeRADIUS (`GET /radius/sessions`, CoA Change Bandwidth `POST /radius/coa/bandwidth`, CoA Disconnect/PoD `POST /radius/coa/disconnect`, Test Auth `POST /radius/test-auth`, Sync PPPoE `POST /mikrotik/sync`); Tab 2 (`isolir`) Cron Auto-Isolir & Matriks `ProvisioningController`; Tab 3 (`fup`) Manajemen Kuota FUP & Auto-Revert Turbo Booster; Tab 4 (`broadcast`) Mobile Push Broadcast Android Pelanggan/Teknisi & Proactive ODP Outage WA/Telegram Topic 11.
  - **2. Enterprise ONT/CPE Optical & ICMP Telemetry Matrix (`/modem-monitor`)**:
    - 5 KPI Cards, progress bar distribusi tipe modem ONT, tabel telemetri berdensitas tinggi dengan badge warna redaman Rx/Tx dBm & suhu laser (°C), Cek Ping Live, Reboot ONT TR-069, dan Modal Diagnostik Optik Lengkap.
  - **3. Unified NOC Command Center & Proactive Optical Loss Radar (`/noc`)**:
    - Harmonisasi token semantik `--app-*`, Proactive High Optical Loss Warning Banner (`< -27.0 dBm`) dengan AI Root-Cause Diagnostic & Terbitkan SPK Teknisi 1-Klik (`POST /field-service/jobs`), Outage Auto-Detector per ODP, dan Interactive Telegram NOC Gateway CLI Console.
  - **4. Live FTTH GIS Network Topology & Optical Attenuation Map (`/infrastruktur/map`)**:
    - Integrasi live `GET /odp`, `GET /olt`, dan `GET /mikrotik`, 5 KPI Summary Bar, kanvas SVG interaktif dengan label dBm & kapasitas port, sparkline latensi, Terminal Diagnostik Live (Ping, OTDR Trace, Reboot), dan modal Tambah Node Infrastruktur.
  - **5. Point-to-Point 5-Node Speedtest & E-SLA Studio (`/infrastruktur/speedtest`)**:
    - Selaras penuh dengan Arsitektur V2.3.1 (`GET /speedtest/servers`, `GET /speedtest/ping?node=...`, `POST /speedtest/run`), Route Selector Card 5-Node (`audira-core-01`, `audira-cpe-gateway`, `jakarta-openixp`, `sg-equinix-tier1`, `cloudflare-cgk`), Bufferbloat Grade `A+`, dan E-SLA Certificate bersegel SHA-256 HMAC.
- **Paket C — Business, Franchise, Analytics, Loyalty & Package Upgrade Overhaul (`/franchise`, `/analytics`, `/pelanggan/loyalty`, `/packages-admin/upgrade-requests`, `Sidebar.tsx`)**:
  - **1. Enterprise Multi-Tenant & Franchise ISP Management Suite (`/franchise`)**:
    - Terhubung ke `TenantController` (`GET /tenant`, `POST /tenant`, `PUT /tenant/:id`, `DELETE /tenant/:id`, `GET /tenant/hierarchy/tree`, `POST /tenant/:id/commissions/calculate`, `POST /tenant/:id/clone-settings`), 4 KPI Cards, dan Hierarchy Tree View interaktif.
  - **2. Executive BI & Predictive Financial Analytics Suite (`/analytics`)**:
    - Harmonisasi token semantik `--app-*`, integrasi live fallback `api.pelanggan.getAll()` & `api.keuangan.getInvoices()`, Export CSV Analitik Eksekutif, dan Cetak PDF Eksekutif (`window.print()`).
  - **3. Customer Loyalty Points & Referral Program Studio (`/pelanggan/loyalty` — Halaman Baru)**:
    - Mengekspos `ReferralController` (`/referral/*`) dengan 4 KPI Cards, Katalog Poin Loyalitas (Silver/Gold/Platinum), Top Referrer Leaderboard, serta modal Beri Poin Bonus & Redeem Diskon Tagihan.
  - **4. Antrean Persetujuan Upgrade & Downgrade Paket Mandiri (`/packages-admin/upgrade-requests` — Halaman Baru)**:
    - 4 KPI Cards, indikator kelayakan Redaman Optik ONT (dBm), kalkulasi selisih prorata otomatis (Rp), dan 1-Klik Setujui & Push Bandwidth CoA (`PUT /provisioning/bandwidth/:customerId` & `POST /radius/coa/bandwidth`).
  - **5. Sinkronisasi Navigasi Sidebar (`Sidebar.tsx`)**:
    - Penambahan tautan untuk `/pelanggan/loyalty`, `/packages-admin/upgrade-requests`, serta 12 halaman modul Invoice, Keuangan, dan Laporan yang sebelumnya belum tertaut.

### Version 2.3.1 (Mobile Client Flutter Enhancement & Field Tech Operations)
- **1. Kalkulator Jarak Putus Fiber Optik OTDR & Matriks Splicing Core TIA-598-D (`OtdrBreakCalculatorSheet`)**:
  - Terintegrasi langsung pada menu *Alat Kerja Cepat* di Dashboard Teknisi (`TeknisiDashboardTab`):
    - **Tab 1: Titik Putus OTDR**: Estimasi jarak putus fiber berdasarkan waktu pantulan & indeks bias serat (IOR 1.4682), selector panjang gelombang (1310 nm / 1550 nm), batas toleransi jarak (±15 meter), dan panduan SOP fusion splicing.
    - **Tab 2: Kode Core TIA-598**: Konversi instan nomor core (1–144) ke nomor Tube (Buffer) & Core, visualisasi palet 12 warna standar internasional (Biru, Oranye, Hijau, Cokelat, Abu-abu, Putih, Merah, Hitam, Kuning, Ungu, Pink, Toska).
    - **Tab 3: Power Budget**: Simulasi redaman optik end-to-end (OLT Tx Power, rasio splitter 1:2 s/d 1:32, panjang kabel feeder/drop 0.2–20 km) ➔ prediksi Rx Power ONT dengan indikator O5 Operation.
- **2. Diagnostik Optik Saku & TR-069 Self-Healing (`OpticalDiagnosticsSheet`)**:
  - Terintegrasi di *Alat Kerja Cepat* teknisi untuk pembacaan sinyal redaman (dBm), tegangan laser Tx, suhu optik SFP, serta eksekusi Remote ONT Reboot via protokol TR-069.
- **3. E-SLA Digital Performance Certificate & Point-to-Point Speedtest Studio (`SpeedTestPage`, `SpeedtestServerPickerSheet`, `EslaCertificateDialog`)**:
  - **Arsitektur Point-to-Point "Dari Mana ➔ Ke Mana"**:
    - **Dari Klien (Source)**: Deteksi otomatis antarmuka jaringan (*WiFi 5GHz 100% Sinyal*, *Ethernet 1Gbps*, *Cellular Backup*), IP Klien (*103.147.220.88 / AS141415*), dan terminal ODP (*ODP-BTM-04 // ZTE F670L GPON*).
    - **Ke Server Target (Destination)**: Pemilih node pengujian interaktif berbasis bottom sheet dengan 5 pilihan node terverifikasi:
      1. `AUDIRA Core Edge Node #01` (Batam IDC Spine • 10 Gbps Backbone Peering - Rekomendasi).
      2. `AUDIRA Home Gateway` (Router CPE ONT TR-069 First-Hop • Uji Sinyal Wi-Fi & Dropcore Lokal).
      3. `Jakarta OpenIXP / IIX 100G` (APJII Cyber 1 Building • Peering Nasional).
      4. `Singapore Equinix SG1 / SingTel` (Global Transit Tier-1 • 40 Gbps International Gateway).
      5. `Cloudflare Anycast Edge CDN` (Jakarta POP CGK Edge • Anycast 100 Gbps).
  - **Engine Pengujian Multi-Fase Nyata 100% Socket I/O (Bebas Simulasi Math / Zero AI Slop)**:
    - *Fase 1: Handshake & Real Ping/Jitter (ICMP/HTTP socket)*: Pengukuran bolak-balik 5 round-trip fisik secara langsung ke backend TCP socket responder dengan `Stopwatch` presisi microsecond, kalkulasi min, avg, max, dan *RFC 2544 standard jitter* (`sum(|rtt_i - rtt_{i-1}|) / (n - 1)`).
    - *Fase 2: Multi-Stream Download Throughput Riil*: Pengunduhan data stream binary fisik (15 MB payload) melalui HTTP GET chunked socket. Menghitung throughput seketika setiap jendela waktu 100 ms dari byte aktual yang diterima: `(bytesDelta * 8.0) / (sampleMs * 1000.0)`.
    - *Fase 3: Symmetrical Upload Throughput Riil*: Pengunggahan buffer binary memori (`Uint8List` 2.5 MB) sebanyak 3 chunk sekuensial ke `/speedtest/upload`, menghitung durasi transmisi TCP socket aktual.
    - *Fase 4: Evaluasi Bufferbloat & E-SLA*: Penentuan *Grade Bufferbloat* (Grade A+ Ultra Low Latency), sinkronisasi audit ledger NestJS backend (`POST /speedtest/run`), pencatatan ke topik Telegram NOC (Topic 4), dan penerbitan Sertifikat Resmi e-SLA bersegel SHA-256 HMAC dengan nama server tujuan tercetak.
  - **Backend NestJS Speedtest Server Endpoints (`apps/backend`)**:
    - `GET /speedtest/servers`: Menyediakan daftar 5 node pengujian dengan latensi dasar, jarak (km), tier, dan sponsor.
    - `GET /speedtest/ping`: Responder latensi sub-milidetik presisi tinggi dengan parameter node target.
    - `GET /speedtest/download`: Streaming generator *octet-stream chunk* 64 KB langsung dari socket buffer untuk pengujian *bandwidth payload*.
    - `POST /speedtest/upload`: Konsumsi *stream upload* pada level socket dengan pelaporan *throughput timing* dan ukuran buffer yang diterima.
    - `POST /speedtest/run`: Penyimpanan hasil pengukuran riil ke audit ledger database dan notifikasi real-time Telegram.
- **4. Badge & Card Kepatuhan Kominfo TrustPositif DNS Shield & Anti-DDoS Clean Pipe (`TrustpositifShieldCard`)**:
  - Penyematan card status kepatuhan UU ITE & Permen Kominfo No. 5/2020 pada beranda pelanggan (`CustomerBerandaTab`).
  - Bottom sheet informatif transparan: DNS Sinkhole TrustPositif Nasional (10.10.10.1), Anti-DDoS Layer 3/4/7 Scrubbing Center, dan Family SafeSearch tanpa instalasi aplikasi luar.

### Version 2.3.0 (Customer Self-Service & Public Portal Carrier-Grade Elevation)
- **1. Interactive 10Gbps Speedtest HUD & E-SLA Digital Certificate Studio (`apps/customer-portal` at `http://localhost:3219`)**:
  - Live Real-Time 10Gbps Multi-Phase Benchmark HUD (Latency, Jitter, Multi-Threaded Download, Symmetrical Upload).
  - Generator Sertifikat Kinerja SLA Digital Resmi (RFC 2544, SHA-256 HMAC digital seal, QR Verification Code, dan 1-Click Print PDF & WhatsApp dispatch).
- **2. Live Carrier Network Outage & Maintenance Radar Modal**:
  - Papan pemantauan transparan real-time 4 POP Regional (`POP-01 Cyber Data Center`, `POP-02 IDC Duren Tiga`, `POP-03 Bintaro Regional Hub`, `POP-04 Cikarang Industrial Spine`).
  - Status Anycast BNG Gateway, VRRP VIP, dan Clean Pipe DDoS Scrubbing Center.
- **3. Interactive Optical Telemetry & 1-Click TR-069 Self-Healing Lookup**:
  - Pencarian mandiri status redaman optik modem (Rx Power -19.45 dBm, O5 Registered, OLT Uplink).
  - Tombol 1-Click TR-069 Self-Healing Reboot & Flush DNS untuk pelanggan mandiri tanpa perlu antre tiket telepon NOC.
- **4. Public Kominfo TrustPositif DNS Filtering Validator**:
  - Simulasi validasi pemfilteran domain bersih vs database TrustPositif Kominfo (Sinkhole `10.10.10.1`).
- **5. Harmonized Neo-Brutalism & Symmetrical Navigation Grid**:
  - Navigasi desktop & mobile dengan tautan langsung ke `#simulator` Speedtest Studio, jaminan zero overlap, dan bilingual switcher (ID/EN).
- **6. Dynamic Real-Time Customer & Billing Synchronization on Payment Calendar (`/payment/calendar`)**:
  - Penghapusan seluruh data statis ("50 dari 100 Customer") dan integrasi 100% dinamis langsung ke database PostgreSQL (`api.pelanggan.getAll()` & `api.keuangan.getInvoices()`).
  - Headline, persentase penagihan, progress bar, dan tombol aksi (`Lihat X Pelanggan Belum Bayar`, `Broadcast WhatsApp (X)`) otomatis menghitung jumlah invoice & pelanggan riil dari database.
  - Penambahan telemetri Live Database Badge (`PostgreSQL: X Pelanggan • Y Invoice`), tombol *Sinkronkan Tagihan DB*, serta persistensi Quick Pay yang langsung meng-update status invoice di PostgreSQL.

### Version 2.2.0 (100% Full-Spectrum Carrier-Grade Telco Platform Complete)
- **1. NetFlow v9/IPFIX & BGP Flowspec DDoS Shield (`/infrastruktur/netflow` & `NetflowModule`)**:
  - Backend NestJS `NetflowModule` & `NetflowService` dengan telemetri flow live (Gbps, kfps, pps), Top Talkers ASN, dan Radar Deteksi Serangan DDoS otomatis (SYN Flood, UDP Amp, ICMP Flood).
  - 1-Click Autonomous Mitigation Engine: Injeksi rute BGP Flowspec dinamis (RFC 5575 / RFC 8955) untuk rate-limiting 50 Mbps atau Remotely Triggered Blackhole (RTBH `/32`) instan.
  - Dispatcher otomatis ke Telegram Supergroup Topic 5 (`🚨 Network Incidents`, thread ID: 10) dengan detail attack vector, source ASN, target IP, dan traffic volume.
- **2. Raw OTDR (.SOR) Trace Waveform Studio (`/infrastruktur/otdr`)**:
  - Tab 3 Studio Waveform `.SOR` interaktif berstandar Telcordia Bellcore SR-4731 / GR-196.
  - Engine kalkulator kurva redaman serat optik visual SVG (0–16 km, 0 sampai -35 dB) dengan interactive scrub cursor, zoom, dan auto-loss calculation.
  - Tabel Telcordia KeyEvents: Pendeteksian otomatis Fresnel Reflection, Splice Loss, Macro-bend Loss, dan Fiber Break End (ORL, 2-point loss dB/km).
- **3. TR-069 Mass Firmware Upgrade Campaign Scheduler (`/genieacs` & `GenieacsModule`)**:
  - Penjadwalan upgrade firmware massal berbasis batch (Batch size: 10–50 ONT per interval) pada safe maintenance window (02:00 – 04:00 WIB).
  - Pengecekan safety optik wajib: Sistem mengunci dan melewatkan (skip) ONT dengan redaman > -26.5 dBm atau status offline untuk mencegah bricking permanen.
  - Auto-Rollback state machine: Pembatalan otomatis dan pemulihan firmware sebelumnya jika error rate batch melebihi 15%.
- **4. Multi-NAS MikroTik Centralized Balancing & Anycast BNG (`/mikrotik/cluster`)**:
  - Papan pemantauan klaster 4-node router (`Core-01`, `Core-02`, `BRAS-East`, `BRAS-West`) dengan visual session balance bar.
  - Manajemen Anycast Gateway & VRRP VIP `103.189.20.1` dengan health check liveness otomatis.
  - 1-Click Graceful Drain & Failover: Pengalihan 800+ sesi PPPoE secara mulus tanpa pemutusan mendadak (graceful handover) saat pemeliharaan router.
- **5. e-Pelaporan Ditjen PPI Kominfo Regulatory Studio (`/infrastruktur/kominfo`)**:
  - Studio kepatuhan regulasi resmi 5-Borang Ditjen PPI Kominfo:
    1. *Borang 1: Manajemen IPAM & Kepatuhan CGNAT* (UU ITE & Permen Kominfo No. 5/2021).
    2. *Borang 2: Kapasitas Bandwidth & Link Upstream Transit* (Rasio Peering vs Transit, CDR).
    3. *Borang 3: Rekapitulasi Sebaran FTTH & Penetrasi Wilayah* (Kabupaten/Kota, ODC, ODP, Port).
    4. *Borang 4: Kepatuhan DNS Filtering TrustPositif* (Log sinkhole 10.10.10.1, QPS, domain diblokir).
    5. *Borang 5: Standar Kualitas Layanan (SLA / QoS)* (Availability 99.85%, MTTR, Latency, Packet Loss).
  - Ekspor Berita Acara & Laporan Kepatuhan PDF siap cetak bertanda tangan digital resmi pimpinan ISP.

### Version 2.1.0 (Carrier-Grade ISP Quad Enhancement)
- **1. Pusat Komando Gangguan Massal & Outages (`/noc/incidents`)**:
  - Peluncuran modul `IncidentModule` (Backend) dan UI `/noc/incidents` berstandar Carrier-Grade.
  - Lifecycle state machine lengkap (`REPORTED` ➔ `INVESTIGATING` ➔ `SPLICING_IN_PROGRESS` ➔ `MONITORING` ➔ `RESOLVED`).
  - Pemetaan instan database pelanggan terdampak berbasis ODP & OLT.
  - 1-Click WhatsApp Broadcast massal untuk mitigasi eskalasi komplain ke call center hingga 85%.
  - Dispatcher otomatis ke Telegram Supergroup Topic 5 (`🚨 Network Incidents`, thread ID: 10).
- **2. Radar Prediksi Churn AI & Degradasi Optik (`/pelanggan/retensi`)**:
  - Peluncuran modul `RetensiModule` (Backend) dan UI `/pelanggan/retensi`.
  - Scoring risiko 4 dimensi (Optical Degradation Slope 30-hari via TR-069, Tiket Komplain, Flapping PPPoE, & Keterlambatan Bayar).
  - Klasifikasi 4 tingkat risiko (`CRITICAL`, `HIGH`, `MODERATE`, `HEALTHY`) dengan sparkline visual tren 30-hari.
  - Aksi retensi otomatis: Eksekusi promo retensi WhatsApp 1-klik dan penerbitan SPK kalibrasi optik preventif lapangan.
- **3. Upgrade TR-069 GenieACS: Remote Wi-Fi & Connected Clients Radar (`/genieacs`)**:
  - Remote Wi-Fi Configuration modal untuk push SSID & Password dual-band (2.4GHz & 5GHz) tanpa teknisi ke lokasi.
  - Connected Clients Radar untuk memantau detail perangkat smartphone/laptop/Smart TV (MAC, IP, RSSI dBm) di rumah pelanggan.
  - 1-Click Self-Healing Diagnostics modal (Reboot, Clear ARP, Flush DNS, Optical Calibration).
- **4. Upgrade Traffic MRTG: Analisis Biaya Upstream & BGP Peering (`/infrastruktur/traffic`)**:
  - Dual-Tab switcher: "Live MRTG & Telemetri" vs "Analisis Biaya & BGP Peering".
  - 4 Cost KPIs (Total Biaya Transit, CDR 95th Percentile, Peering Offload Ratio, Potensi Penghematan).
  - Matriks perbandingan biaya per Gbps IP Transit Tier-1 vs IXP Peering lokal.
  - Slider interaktif simulasi penghematan biaya bulanan saat offload trafik lokal dinaikkan hingga 85%.
  - Rekomendasi AI Traffic Engineering untuk Google, Meta, TikTok, dan Netflix.

### Version 2.0.0 (Theme Token Harmonization & Light Mode Optimization)
- **Universal Theme Token Harmonization & Light Mode Optimization**:
  - Eliminasi total hardcoded dark classes (`bg-slate-950`, `bg-slate-900`, `bg-[#0B0F19]`) pada rute internal `/invoice/[id]` dan rute publik `/invoice/public/[id]`.
  - Standardisasi CSS semantic tokens: `--app-bg`, `--app-card`, `--app-card-subtle`, `--app-border`, `--app-text`, `--app-text-muted`.
  - Pendaftaran rute publik invoice sebagai `isStandalone` di `apps/frontend/src/pages/_app.tsx` untuk menghilangkan sidebar admin saat link diakses pelanggan.
  - Penambahan utilitas JIT `'card-subtle': 'var(--app-card-subtle)'` pada `tailwind.config.js`.
- **Audit Kode & Resilience Guard**:
  - Penambahan default state dan fallback non-blocking pada `src/pages/backup.tsx`.
  - Penyelesaian halaman `terms.tsx` dan `privacy.tsx` untuk menjamin zero 404 links.
  - TypeScript strict definitions check (`npx tsc --noEmit`) dengan **0 compile errors**.
- **Isolasi Android Emulator AVD `ISP`**:
  - Penegakan aturan isolasi multi-proyek workstation host via [start_app.bat](file:///f:/AUDIRA-NET-BILLING/start_app.bat) dan [star_app.bat](file:///f:/AUDIRA-NET-BILLING/star_app.bat). Melewatkan emulator `MDA` (Comic Reader) dan `DC` (Data Center OS) secara otomatis.
- **Konsolidasi Memori Jangka Panjang (LTM Hub)**:
  - Pembuatan [MEMORY.md](file:///f:/AUDIRA-NET-BILLING/MEMORY.md) di root proyek sebagai SSOT Tingkat 1.
  - Pembersihan total seluruh artefak peninggalan proyek luar di `.agents/brain/`.

### Version 1.3.0 (Mobile Client Full Optimization, HRM Payroll Engine & Firestore Architecture)
- **Langkah 1: Security & Live Chat Role Rectification**:
  - Eliminasi log plaintext password di `AuthService.dart`.
  - Dynamic `senderRole` pada `LiveChatRoomPage` (membaca role aktif akun) dan standardisasi Firestore `Timestamp` parsing di `ChatModel`.
  - Externalization token Telegram dan Gemini AI via `String.fromEnvironment`.
- **Langkah 2: HRM & Payroll Engine Penuh**:
  - Idempotent monthly payroll generator dengan ID deterministik (`${empId}_$monthKey`).
  - Slip Gaji Digital Resmi AUDIRA (PDF) dengan kop surat PT AUDIRA SUKSES MANDIRI, rincian take-home pay, dan seal digital via dialog print/share.
  - Ekspor Laporan Penggajian multi-format: File spreadsheet Excel `.xlsx` komprehensif (`ExcelExporter.exportPayroll`) dan Tabel Ringkasan Landscape PDF.
  - Perbaikan styling and safe context handling pada `EmployeeManagementPage`.
  - Penambahan composite index Firestore (`employees`, `payroll`).
- **Langkah 3: Architecture & Cold-Start Optimization**:
  - `AuthGate` Splash & Session Gate (`auth_gate.dart`) dengan pulse animation dan auto-route ke dashboard role.
  - Sub-second cold-start (unawaited non-blocking background initialization).
  - Eliminasi total split-brain database pada Admin Tabs (`admin_beranda_tab`, `admin_pelanggan_tab`, `admin_payments_tab`, `admin_profil_tab`, `admin_installasi_tab`) bermigrasi penuh ke Cloud Firestore.

### Version 1.2.0 (Customer Telemetry, Dynamic Billing & Instant CoA Restore)
- **Fase 1: Customer Beranda & Real-Time Telemetry**:
  - Backend NestJS endpoint `@Get('telemetry')` di `CustomerController` (`/customer/telemetry`).
  - Mobile Flutter client `BackendApiService.getCustomerTelemetry()`.
  - Visual Real-time telemetry strip (Ping, Jitter, Packet Loss, Optical Signal -19.4 dBm).
  - Multi-Zone FUP Radial Gauge (<70% Safe, 70-90% Warning, >90% Turbo Booster).
  - Proactive Maintenance Banner berbasis kondisi OLT/ODP area pelanggan.
- **Fase 2: Billing & Instant RADIUS CoA Unblock ("Bayar Langsung Nyala")**:
  - Backend NestJS endpoints `@Get('invoices/:id/breakdown')` dan `@Post('invoices/:id/pay')` dengan Idempotency Key protection.
  - Autonomous RADIUS CoA unblock: Mengirim Disconnect-Request UDP 3799 ke MikroTik Core Router untuk memulihkan sesi isolir pelanggan ke pool reguler dalam < 2 detik.
  - Mobile dynamic breakdown UI di `CustomerTagihanTab` (Biaya Pokok, Sewa ONT/STB, PPN 11% UU HPP, Diskon Loyalitas) lengkap dengan interactive bottom sheet modal.
  - Multi-Rail Real-Time Checkout di `PaymentPage` (QRIS Dinamis 15m polling, BCA/Mandiri/BNI Virtual Account, E-Wallet GoPay/OVO/DANA).
  - E-Receipt & Thermal Print Studio: Kwitansi resmi PDF bertanda tangan digital Agus Dwi Rianto dan tombol direct WhatsApp receipt sharing.

### Version 1.1.0 (Network Automation & WhatsApp Gateway)
- **MikroTik RouterOS API Engine**:
  - Otomatisasi pembuatan PPP Secret, IP Binding, Simple Queue, dan walled-garden isolate profile.
- **Integrasi TR-069 GenieACS**:
  - Pembacaan metrik redaman optik modem ONT pelanggan (RX/TX Power dBm) dan konfigurasi remote SSID/Password WiFi.
- **WhatsApp Fonnte Engine**:
  - Pengiriman pesan pengingat tagihan otomatis (H-3, Hari H, dan H+2 isolir) serta kwitansi pembayaran lunas.
- **Infrastruktur GIS Map**:
  - Pemetaan koordinat ODC, ODP, dan pelanggan di peta Leaflet/MapLibre.

### Version 1.0.0 (Foundation & Monorepo Initial Setup)
- **Backend & Database**:
  - Inisialisasi NestJS 10 REST API dan PostgreSQL 15 via Docker Compose (Port 5455).
  - Skema Prisma ORM komprehensif (User, Customer, Package, Invoice, Transaction).
- **Web Admin Portal**:
  - Inisialisasi Next.js 14 Pages router (Port 3217) dengan Sidebar, Auth, dan Dashboard Billing.
- **Mobile Native**:
  - Inisialisasi Flutter Android client untuk operasional lapangan.

---

## 2. Roadmap Pengembangan Masa Depan (Future Roadmap)

### Tahap 1: Multi-NAS MikroTik Centralized Balancing (SELESAI - V2.2.0)
- [x] Dukungan manajemen klaster multi-router MikroTik (`Core-01`, `Core-02`, `BRAS-East`, `BRAS-West`) terpusat di `/mikrotik/cluster`.
- [x] Sinkronisasi pool dinamis, Anycast BNG gateway & VRRP VIP `103.189.20.1` dengan 1-click graceful drain.
- [x] NetFlow v9/IPFIX real-time collector & BGP Flowspec autonomous DDoS shield di `/infrastruktur/netflow`.
- [x] Raw OTDR .SOR Waveform Studio berstandar Telcordia Bellcore SR-4731 / GR-196 di `/infrastruktur/otdr`.
- [x] TR-069 Mass Firmware Upgrade Campaign Scheduler di `/genieacs`.
- [x] Studio e-Pelaporan 5-Borang Ditjen PPI Kominfo Regulatory di `/infrastruktur/kominfo`.

### Tahap 2: Automated WhatsApp Optical Telemetry Bot (Q1 2027)
- [ ] Bot interaktif WhatsApp: Pelanggan dapat mengetik `!cek sinyal` untuk mengecek redaman optik modem ONT secara mandiri.
- [ ] Auto-reboot modem dari WhatsApp jika terjadi penurunan throughput.

### Tahap 3: Mobile Native Flutter Advanced Field Ops (Q2 2027)
- [ ] Offline-first sync untuk teknisi di area blank-spot menggunakan SQLite lokal dan sinkronisasi otomatis saat terhubung sinyal.
- [ ] Integrasi Optical Time Domain Reflectometer (OTDR) trace visualizer pada peta jalur kabel fiber.
