# FEATURE CATALOG — AUDIRA-NET & BILLING ECOSYSTEM

> **Master Catalog of Backend Modules, Frontend Web Admin Pages, Customer Portal, and Flutter Mobile Screens**  
> *Single Source of Truth (SSOT) untuk Seluruh Modul Fitur & Endpoint (Anti-Redundansi).*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Master Katalog Backend NestJS REST API (Port 3218)

Backend NestJS 10 di `apps/backend` memiliki arsitektur modular enterprise dengan 50 modul inti:

| ID Modul | Nama Modul | Tanggung Jawab & Cakupan Fungsionalitas |
| :--- | :--- | :--- |
| **MOD-01** | `AuthModule` | Login, Registrasi, Refresh Token, JWT Guards, RBAC Roles (`ADMIN`, `BILLING`, `CS`, `NOC`, `TECH`). |
| **MOD-02** | `PelangganModule` | Manajemen siklus hidup pelanggan (Registrasi, Aktivasi, Pending, Suspend, Expired, Import Excel). |
| **MOD-03** | `CustomerModule` | Endpoint self-service pelanggan, riwayat invoice, telemetry profil, FUP usage. |
| **MOD-04** | `BillingModule` | Mesin penagihan otomatis, prorata instalasi, perhitungan denda, siklus jatuh tempo. |
| **MOD-05** | `InvoiceModule` | CRUD invoice, batch generate, batch send WA, credit note, refund, tax, public shareable link. |
| **MOD-06** | `PaymentModule` | Gateway pembayaran Midtrans (QRIS, VA BCA/Mandiri/BNI), konfirmasi manual, webhook callback. |
| **MOD-07** | `MikrotikModule` | RouterOS API client, sinkronisasi PPPoE Secrets, hotspot users, isolated profile walled-garden. |
| **MOD-08** | `RadiusModule` | FreeRADIUS server integration, CoA Disconnect Request (UDP 3799), session accounting. |
| **MOD-09** | `GenieacsModule` | TR-069 Auto Configuration Server client, monitoring redaman optik (RX/TX dBm), konfigurasi WiFi ONT. |
| **MOD-10** | `OltModule` & `OdpModule` | Manajemen OLT (EPON/GPON), visualisasi splitter ODP, monitoring utilisasi port fiber optic. |
| **MOD-11** | `FieldServiceModule` | Penugasan teknisi lapangan, instalasi baru (PSB), integrasi GPS, bukti pasang digital. |
| **MOD-12** | `TicketModule` | Ticketing gangguan jaringan pelanggan (Open, In Progress, Resolved, Closed), SLA tracking. |
| **MOD-13** | `WhatsAppModule` | Gateway notifikasi WhatsApp Fonnte / WAHA Baileys, WhatsApp Chatbot pintar 2-arah (`WhatsAppBotService`: `!tagihan`, `!ceksinyal`, `!reboot`, `!wifi`, `CS`), template tagihan dinamis, broadcast pengumuman, dan reminder scheduler otomatis (`BillingCronService`: H-3, Hari-H, Overdue). |
| **MOD-14** | `ReferralModule` & `SalesModule` | Program kemitraan sales, kode referral, kalkulasi komisi PSB otomatis, penarikan saldo dompet (payout). |
| **MOD-15** | `EmployeeModule` & `SalaryModule` | HRM staf ISP, absensi GPS & selfie, penggajian, insentif teknisi PSB. |
| **MOD-16** | `KeuanganModule` | Akuntansi komprehensif, bagan akun (COA), jurnal umum, buku besar, neraca, laba rugi, arus kas. |
| **MOD-17** | `ReportsModule` & `AnalyticsModule` | Laporan eksekutif, pendapatan MRR, retensi pelanggan, analitik churn, ekspor PDF/Excel. |
| **MOD-18** | `BoosterModule` | Layanan speed on demand / turbo booster temporer untuk pelanggan FUP. |
| **MOD-19** | `CollectorModule` | Manajemen penagihan lapangan (kolektor door-to-door), shift kerja, setoran tunai. |
| **MOD-20** | `InventoryModule` | Manajemen stok ONT modem, kabel dropcore, patchcord, ODP splitter, log mutasi barang. |
| **MOD-21** | `TelegramModule` | Integrasi bot Telegram `@AudiraISPBot` ke Supergroup Forum `AUDIRA ISP | Operations Center` dengan 14 topik spesifik, telemetri otomatis, broadcast interaktif, dan sinkronisasi mobile app. |
| **MOD-22** | `DnsModule` | DNS Filtering & Internet Positif Kominfo (TrustPositif sync, DNS sinkhole Port 53, 5 kategori blokir, custom whitelist/blacklist, audit log stream, Walled Garden landing, dan Telegram Topic 11 alert). |
| **MOD-23** | `SpeedtestModule` | Speedtest Server Lokal & Diagnostic SLA Studio (10Gbps Core Edge engine, evaluasi kepatuhan rasio SLA %, AI Root-Cause Diagnostic redaman optik & beban PON, E-SLA Certificate generator, dan Telegram Topic 4 alert). |
| **MOD-24** | `ZtpModule` | Zero-Touch Provisioning (ZTP) & Discovery Queue (Otomasi 3-langkah OLT PON ➔ MikroTik PPPoE Secret ➔ GenieACS TR-069 WiFi dalam 2.1 detik, unassigned radar queue, dan Telegram Topic 8 alert). |
| **MOD-25** | `IncidentModule` | Manajemen Gangguan Massal (Outages) Carrier-Grade, isolasi dampak OLT/ODP, estimasi pelanggan terdampak, 1-Click WhatsApp Broadcast massal, timeline investigasi/splicing/pemulihan, dan auto-dispatch alert ke Telegram Topic 5 (#10). |
| **MOD-26** | `RetensiModule` | Radar Prediksi Churn AI & Telemetri Degradasi Optik, deteksi slope pelemahan redaman dBm 30-hari, scoring keluhan pelanggan, klasifikasi 4 tingkat risiko (CRITICAL, HIGH, MODERATE, HEALTHY), serta eksekusi promo retensi WA & SPK kalibrasi optik preventif. |
| **MOD-27** | `NetflowModule` | NetFlow v9 & IPFIX Flow Analyzer, Top Talkers ASN Matrix, Radar Deteksi DDoS L4/L7, Injeksi Mitigasi BGP Flowspec & RTBH Blackholing ke MikroTik Core, serta auto-dispatch ke Telegram Topic 4 & Topic 5. |

---

## 2. Master Katalog Frontend Web Admin (Next.js 14 - Port 3217)

Frontend Next.js Pages router di `apps/frontend` mencakup 80+ halaman terstruktur:

### 2.1 Dashboard, NOC & Analitik Eksekutif
- `Layout.tsx` & `RealtimeNotificationBanner.tsx`: Global Sticky Enterprise Topbar dengan **Global Command Palette (`Ctrl+K` / `Cmd+K`)** yang mengindeks 32+ modul ISP (navigasi keyboard `↑↓`, `Enter`, `Esc`), breadcrumb dinamis, shortcut MRTG & NOC Radar, theme switcher, serta Realtime Notification Center adaptif Dark/Light mode.
- `/` ([index.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/index.tsx)): Root Executive Operations Cockpit (`http://localhost:3217/`) dengan **Carrier-Grade BSS/OSS Telemetry Radar Strip** (MRTG Uplink `Gbps`, Outage/LOS WA Blast, Redaman ONT TR-069, Antrean ZTP OMCI, Prorata Upgrade Paket, & AI Churn Radar), 4 KPI Cards, integrasi API nyata pada Quick Pay / Mark Paid / CoA Speed Booster, serta 10 modal interaktif lengkap (termasuk Edit & Hapus Invoice/Pelanggan).
- `/dashboard/billing`: Billing & Revenue Role Cockpit terharmonisasi token `--app-*`, sinkronisasi live `api.keuangan.getInvoices()` & `api.pelanggan.getAll()`, periode bulan berjalan dinamis, Blast WA Pengingat, dan pintasan Rekonsiliasi Bank.
- `/dashboard/noc`: NOC Engineering Role Cockpit terharmonisasi token `--app-*`, Proactive High Optical Loss Warning Banner (`< -27.0 dBm` TR-069 GenieACS + AI Root-Cause Diagnostic + 1-Click SPK Dispatch), dan matriks navigasi teknis NOC.
- `/dashboard/cs`: Customer Service & Care Role Cockpit terharmonisasi token `--app-*` untuk meja tiket keluhan SLA, WhatsApp Live Chat, verifikasi PSB, dan dispensasi Janji Bayar CoA.
- `/analytics`: Executive BI & Predictive Financial Analytics Suite (Revenue Trend, 3-Month AI Revenue Forecast, Distribusi Pendapatan Paket, Customer Acquisition Funnel, Profit Margin Breakdown, Churn Risk Radar, Top Customer Lifetime Value CLV, Export CSV Analitik Eksekutif, dan Cetak PDF Eksekutif).
- `/noc`: Unified NOC Command Center, Proactive Optical Loss Radar (`< -27.0 dBm` dengan AI Root-Cause Diagnostic & 1-Click SPK Dispatch), Outage Auto-Detector per ODP, dan Interactive Telegram NOC Gateway CLI Console (`/status`, `/ping`, `/redaman`, `/olt-check`, `/kick`, `/reboot`).
- `/noc/incidents`: Pusat Komando Gangguan Massal & Outages (Mass Outage Incident Manager) berstandar Carrier-Grade dengan 4 KPI status insiden, live search & filter severity, New Incident Wizard dengan mapping otomatis pelanggan terimbas, drawer timeline investigasi/splicing/pemulihan, 1-Click Mass WhatsApp Broadcast modal, dan auto-dispatch alert ke Telegram Topic 5 (#10).
- `/telegram`: Telegram Bot & 14 Forum Topics Operations Hub (Status bot @AudiraISPBot, Supergroup forum, matriks 14 topik lengkap dengan thread ID & tombol tes 1-klik, komposer broadcast pesan real-time ber-template, dan feed log telemetri).

### 2.2 Manajemen Pelanggan & Paket (`/pelanggan` & `/packages-admin`)
- `/pelanggan`: Daftar seluruh pelanggan ISP, filter status (`active`, `isolated`, `pending`, `expired`), pencarian cepat.
- `/pelanggan/[id]`: Detail komprehensif profil pelanggan, riwayat invoice, statistik redaman modem, konfigurasi PPPoE.
- `/pelanggan/retensi`: Radar Prediksi Churn AI & Degradasi Redaman Optik dengan 4 KPI mitigasi churn, kartu tabel skor risiko retensi, visual sparkline telemetri redaman optik 30-hari, dan modal eksekusi tindakan retensi preventif (WhatsApp diskon loyalti & SPK kalibrasi optik preventif).
- `/pelanggan/loyalty`: Customer Loyalty Points & Referral Program Studio (4 KPI Cards, Katalog Poin Loyalitas Pelanggan dengan tier Silver/Gold/Platinum, Top Referrer Leaderboard, modal Beri Poin Bonus & Redeem Diskon Tagihan, serta Aturan Poin Bayar Tepat Waktu).
- `/pelanggan/tambah`: Formulir registrasi pelanggan baru, pemilihan paket, penugasan ODP dan teknisi.
- `/pelanggan/pending`: Antrean calon pelanggan yang menunggu instalasi fisik.
- `/pelanggan/suspend`: Manajemen Pelanggan Terisolir & Mesin Janji Bayar (Dispensasi 24/48 Jam) terintegrasi FreeRADIUS CoA unblock otomatis dalam < 2 detik dan cron re-isolir berkala.
- `/pelanggan/import`: Wizard impor data pelanggan massal dari file Excel / CSV.
- `/packages-admin/upgrade-requests`: Antrean Persetujuan Upgrade & Downgrade Paket Mandiri (BoD & CoA Queue) lengkap dengan 4 KPI Cards, indikator kelayakan Redaman Optik ONT (dBm), kalkulasi selisih prorata otomatis (Rp), dan 1-Klik Setujui & Push Bandwidth CoA (`PUT /provisioning/bandwidth/:customerId` & `POST /radius/coa/bandwidth`).

### 2.3 Modul Tagihan & Invoice (`/invoice`)
- `/invoice/semua`: Master tabel seluruh invoice (Unpaid, Paid, Overdue, Cancelled).
- `/invoice/[id]`: Rincian invoice internal, breakdown SLA, catatan pembayaran, instruksi transfer BCA/Mandiri/QRIS.
- `/invoice/public/[id]`: Rute publik tanpa sidebar untuk dibagikan ke pelanggan via WhatsApp / SMS.
- `/invoice/generate`: Pembuatan invoice manual perorangan dengan opsi diskon/penyesuaian.
- `/invoice/batch-generate`: Generator invoice massal awal bulan berbasis paket aktif pelanggan.
- `/invoice/batch-send`: Pengiriman notifikasi tagihan massal via WhatsApp Gateway Fonnte.
- `/invoice/due`: Daftar tagihan mendekati jatuh tempo untuk penjadwalan reminder.
- `/invoice/overdue`: Daftar tagihan menunggak untuk eksekusi isolir massal.
- `/payment`: Dashboard Kasir & Pembayaran, pencatatan transaksi masuk, filter metode bayar.
- `/payment/calendar`: Kalender Jatuh Tempo & Monitoring Penagihan Harian (Visualisasi matriks bulanan 7-hari, hero radar output harian rasio pelanggan sudah bayar vs belum bayar misalnya 50 dari 100 customer, 5 KPI finansial, drilldown drawer pelanggan jatuh tempo tanggal terpilih, 1-klik pengingat WhatsApp bot perorangan via server gateway / WA Web, modal kasir cepat instan lunas, broadcast WhatsApp massal server gateway, simulator interaktif Chatbot WA 2-arah `!tagihan`, status auto-cron reminder H-3/Hari-H/Overdue, cetak lembar penagihan kolektor, dan ekspor CSV).
- `/invoice/credit-note` & `/invoice/refund`: Manajemen nota kredit dan pengembalian dana pembayaran.

### 2.4 Infrastruktur & Jaringan (`/infrastruktur` & `/mikrotik`)
- `/mikrotik`: Manajemen router MikroTik terhubung, sinkronisasi secret PPPoE, live queue bandwidth monitor.
- `/mikrotik/cluster`: Multi-NAS MikroTik Centralized Balancing & Anycast BNG (Orkestrator multi-router Core & BRAS, live session balancing, VRRP VIP 103.189.20.1 redundansi, dan 1-klik session drain / failover).
- `/infrastruktur/netflow`: NetFlow v9 & IPFIX Flow Analyzer + BGP Flowspec DDoS Shield (Throughput Gbps, packet rate PPS, matriks Top Talkers ASN, radar pendeteksi serangan DDoS SYN/UDP/ICMP, 1-klik injeksi mitigasi BGP Flowspec / RTBH Blackholing ke MikroTik Core, dan integrasi alert Telegram Topic 4 & 5).
- `/infrastruktur/kominfo`: e-Pelaporan Regulator Ditjen PPI Kominfo (5 Borang Data Teknis resmi: Alokasi Subnet IP Publik APJII & CGNAT RFC 6598, Kapasitas Bandwidth Domestik & Internasional, Sebaran Pelanggan FTTH, Kepatuhan Blokir TrustPositif, Mutu Layanan SLA/QoS, serta cetak Berita Acara PDF bertanda tangan digital resmi).
- `/infrastruktur/ipam`: IPAM Subnet Manager (IPv4/IPv6, CGNAT RFC 6598) & Mesin Forensik Log CGNAT untuk Kepatuhan Regulasi UU ITE / Kominfo.
- `/infrastruktur/traffic`: Live Bandwidth MRTG & Analisis Biaya Upstream BGP Peering (Dual-Tab switcher: "Live MRTG & Telemetri" vs "Analisis Biaya & BGP Peering", 4 Cost KPIs, Matriks Biaya Upstream per Gbps IP Transit vs OpenIXP/IIX, Slider Simulasi Penghematan Peering IXP interaktif, dan Rekomendasi AI Traffic Engineering untuk Google, Meta, TikTok, dan Netflix).
- `/infrastruktur/otdr`: Kalkulator Jarak Putus Fiber OTDR terintegrasi GIS Map, Matriks Splicing Core 12/24/48 standar TIA-598, dan Studio Waveform .SOR Raw Trace (Standar Telcordia Bellcore SR-4731 / GR-196-CORE dengan kursor interaktif dB vs km, deteksi reflektansi konektor, dan tabel analisis kejadian optik KeyEvents).
- `/infrastruktur/map`: Live FTTH GIS Network Topology & Optical Attenuation Map (Integrasi live `GET /odp`, `GET /olt`, `GET /mikrotik`, 5 KPI Summary Bar, kanvas SVG interaktif dengan label dBm & kapasitas port, sparkline latensi, Terminal Diagnostik Live Ping/OTDR Trace/Reboot, modal Tambah Node Infrastruktur, dan tombol Buka Google Maps / Terbitkan SPK).
- `/infrastruktur/odp`: Visualisasi detail hardware splitter ODP (kapasitas 1:8 / 1:16, port terpakai, redaman dBm).
- `/infrastruktur/olt`: Monitoring OLT EPON/GPON, temperatur chassis, uptime, dan daftar ONU/ONT terdaftar.
- `/infrastruktur/ztp`: Zero-Touch Provisioning (ZTP) & Discovery Queue (Radar deteksi otomatis modem ONT baru unassigned ZTE/Huawei/VSOL, aktivasi 3-step pipeline OLT ➔ MikroTik PPPoE ➔ GenieACS TR-069 WiFi dalam 2.1 detik, riwayat aktivasi, dan integrasi notifikasi Telegram Topic 8).
- `/infrastruktur/dns`: DNS Filtering & Internet Positif Kominfo (Sinkronisasi otomatis database TrustPositif Kominfo, DNS sinkhole Port 53, toggle 5 kategori regulasi, custom blacklist/whitelist domain rules, live QPS monitor, stream log intersepsi Walled Garden, dan integrasi notifikasi Telegram Topic 11).
- `/infrastruktur/speedtest`: Speedtest Server Lokal & Diagnostic SLA Studio V2.3.1 (Arsitektur Point-to-Point 5-Node: `audira-core-01`, `audira-cpe-gateway`, `jakarta-openixp`, `sg-equinix-tier1`, `cloudflare-cgk`, Route Selector Card "Dari Klien Source ➔ Ke Server Target Destination", Bufferbloat Grade `A+ Ultra Low Latency`, AI Root-Cause Diagnostic, dan E-SLA Digital Performance Certificate bersegel SHA-256 HMAC).
- `/genieacs`: Manajemen Perangkat CPE TR-069 GenieACS Enterprise dengan Remote Wi-Fi SSID & Password Management (2.4G & 5G dual-band), Connected Clients Radar, 1-Click Remote ONT Self-Healing Diagnostics, serta Kampanye Upgrade Firmware Massal (Campaign Scheduler batch dini hari 02:00 WIB, throttling ONT, & pre-flight check redaman).
- `/modem-monitor`: Enterprise ONT/CPE Optical & ICMP Telemetry Matrix (5 KPI Cards, progress bar distribusi tipe modem ONT, tabel telemetri redaman Rx/Tx dBm & suhu laser °C, Cek Ping Live, Reboot ONT TR-069, dan Modal Diagnostik Optik Lengkap).
- `/automation`: Enterprise FreeRADIUS CoA, Provisioning & Automation Engine (4 Tab penuh: Sinkronisasi PPPoE & FreeRADIUS AAA CoA UDP 3799, Auto-Isolir & Provisioning Lifecycle, Manajemen FUP & Auto-Revert Turbo Booster, serta Outage WA & Mobile Push Broadcast).
- `/hotspot`: Manajemen voucher hotspot WiFi, profil bandwidth, dan cetak massal kupon voucher.
- `/booster`: Pengaturan turbo booster bandwidth on-demand bagi pelanggan.

### 2.5 Keuangan & Akuntansi (`/finance`)
- `/finance/dashboard`: Ringkasan keuangan ISP (Penerimaan Kas, Beban Operasional, Margin Laba Bersih).
- `/finance/akun`: Bagan Akun (Chart of Accounts / COA) aset, kewajiban, ekuitas, pendapatan, dan beban.
- `/finance/transaksi`: Jurnal transaksi harian masuk dan keluar kas/bank.
- `/finance/laba-rugi`: Laporan Laba Rugi periodik (Gross Profit & Net Income).
- `/finance/neraca`: Laporan Neraca Keuangan (Balance Sheet).
- `/finance/arus-kas`: Laporan Arus Kas metode langsung (Operasional, Investasi, Pendanaan).
- `/finance/anggaran`: Manajemen plafon anggaran operasional bulanan per divisi.
- `/finance/rekonsiliasi`: Rekonsiliasi mutasi rekening bank dengan transaksi tagihan.
- `/finance/pajak`: Pelaporan PPN 11% tagihan internet dan PPh 21/23.

### 2.6 Kemitraan Sales, Referral & Multi-Tenant Franchise (`/admin/sales`, `/sales/daftar`, `/franchise`)
- `/admin/sales`: Dashboard kemitraan sales partner, verifikasi pendaftaran calon mitra, persetujuan penarikan komisi (payout), dan buku besar mutasi dompet mitra.
- `/sales/daftar`: Formulir pendaftaran mitra reseller / sales referral AUDIRA-NET.
- `/franchise`: Enterprise Multi-Tenant & Franchise ISP Management Suite (4 KPI Cards, Hierarchy Tree View Root HQ ➔ Regional Branch ➔ Sub-Franchise Reseller, CRUD Mitra terhubung ke `TenantController`, Kalkulator & Pencairan Komisi Bagi Hasil, serta Clone Konfigurasi Paket & Billing dari Induk).

### 2.7 Layanan Lapangan, WhatsApp & Pengaturan Sistem (`/backup`, `/audit-logs`, `/dokumentasi`, `/debug/test-api`)
- `/technician` & `/technician-monitoring`: Pelacakan lokasi teknisi, antrean tugas instalasi & perbaikan.
- `/technician-checkin`: Papan Presensi Mandiri Teknisi & Monitoring NOC berfitur Geotagging GPS Geofence & Cyberpunk Camera HUD Watermark.
- `/tickets` & `/work-order-detail`: Pengelolaan trouble ticket pelanggan dan Surat Perintah Kerja (SPK).
- `/whatsapp`: Dashboard WhatsApp Gateway Fonnte, monitoring status koneksi nomor gateway, scheduler pengingat otomatis.
- `/backup`: Enterprise Disaster Recovery & Multi-Target Snapshot Vault (3 Tab: PostgreSQL Database `.sql.gz`, MikroTik RouterOS `.backup/.rsc`, serta GenieACS TR-069 & OLT Config Snapshot lengkap dengan SHA-256 checksum & laporan ke Telegram Topic 11).
- `/audit-logs`: Carrier-Grade Security & RBAC Forensic Audit Trail (4 KPI Cards, filter forensik adaptif, Export CSV/JSON, pembersihan log >90 hari, Modal Inspeksi Detail Forensik SHA-256, dan broadcast ke Telegram Topic 13).
- `/dokumentasi`: Pusat Dokumentasi Arsitektur, 16 SOP Operasional NOC Carrier-Grade (`audira-isp-network-ops`), Port Map Resmi (`3217`/`3218`/`3001`/`5455`/`6379`), dan Referensi REST API & Webhook.
- `/debug/test-api`: Full-Spectrum Carrier-Grade API Diagnostic & Latency Benchmark Suite (Pengujian 23 endpoint nyata lintas 6 kategori dengan pengukuran RTT `performance.now()`, JSON inspector, dan Realtime WebSocket Broadcast Tester).

### 2.8 Logistik & Inventaris Perangkat (`/inventory`)
- `/inventory`: Enterprise Ultimate Inventory & Asset Management ISP dengan 6 kartu metrik KPI, 4 tab fungsional (Katalog Perangkat, Alokasi Pelanggan Terpasang, Log Servis & Klaim Garansi RMA, dan Audit Scanner Barcode / Stock Opname), 5 modal interaktif, generator stiker label QR tag aset cetak, auto-generator SN & MAC, serta integrasi endpoint Prisma.

### 2.9 Manajemen Karyawan & HRIS ISP Ecosystem (8 Modul Ultimate)
- `/hrm-dashboard`: Dashboard HRM Eksekutif dengan 6 kartu metrik real-time, active 24/7 shift monitoring (Pagi, Sore, Malam), persentase distribusi departemen, dan pintasan alur kerja.
- `/karyawan`: Direktori SDM & Teknisi ISP dengan 5 KPI, multi-view (Tabel Data & ID Badges), pendaftaran multi-tab lengkap dengan sertifikasi optik K3, ID Card digital vertikal siap cetak dengan QR Code verifikasi, dan ekspor CSV.
- `/jadwal-kerja`: Manajemen Roster Shift 24/7 ISP dengan matriks mingguan 7 hari (Pagi, Siang, Malam, Office, Libur), generator jadwal otomatis mingguan 1-klik, modal tukar shift (Shift Swap), dan lembar tugas harian (Daily Duty Sheet).
- `/attendance`: Terminal Presensi & Absensi Biometric Cyberpunk HUD dengan jam digital live NTP, deteksi otomatis shift berjalan, Geofence GPS Markas ISP vs On-Field ODC Splicing, kamera WebRTC dengan reticle grid overlay & watermarking audit canvas otomatis, serta live elapsed duration counter.
- `/attendance-monitoring`: NOC Live Fleet Radar dengan 5 KPI kehadiran, sinkronisasi otomatis tiap 20 detik, filter multi-dimensi, link Google Maps koordinat presisi, modal audit zoom foto biometrik dengan hash watermark, supervisor status override manual, dan ekspor CSV.
- `/cuti`: Sistem Pengajuan & Manajemen Cuti Staf berstandar ketenagakerjaan dengan 4 KPI, kalkulator kuota cuti tahunan (12 hari), formulir multi-tipe (tahunan, sakit, darurat, melahirkan, tanpa gaji), serah terima tugas (Handover PIC ISP), dan persetujuan 2-arah supervisor.
- `/gaji`: Sistem Penggajian (Payroll) & Remunerasi ISP dengan 5 KPI finansial, formula komputasi otomatis (Gaji Pokok + Tunjangan + Insentif PSB FTTH Rp 50.000 + Lembur Shift Malam Rp 35.000 - BPJS 1%), generator payroll massal 1-klik, cetak Slip Gaji Digital Resmi AUDIRA (`window.print()`) ber-kop surat resmi PT AUDIRA SUKSES MANDIRI lengkap dengan terbilang IDR, serta pengiriman slip via WhatsApp langsung.
- `/kinerja`: Scorecard KPI Karyawan 360° berbasis 6 pilar teknis ISP riil (Kecepatan MTTR Tiket, Kualitas Redaman Kabel FO dBm, Presensi Shift 24/7, Kepatuhan K3 & Prosedur Tiang, Kerjasama Tim NOC, dan Tanggap Darurat FO Cut), predikat grade A+/A/B/C, radar visual, formulir review berkala dengan slider interaktif, dan modal detail inspeksi performa.

---

## 3. Customer Self-Service & Public Portal (Next.js 14 - Port 3219)

Portal publik dan mandiri pelanggan di `apps/customer-portal` (Port 3219):
- `/`: Landing Page Publik Carrier-Grade Terpadu:
  - **Live 10Gbps Speedtest HUD & E-SLA Performance Certificate Studio**: Multi-phase live benchmark (Ping, Jitter, Multi-Threaded Download, Symmetrical Upload), sertifikat SLA IETF RFC 2544 digital seal HMAC SHA-256 dengan QR verifikasi, tombol cetak PDF (`window.print()`), dan direct WhatsApp sharing.
  - **Live Carrier Network Outage & Maintenance Radar Modal**: Status real-time 4 POP Regional (`POP-01 Cyber DC`, `POP-02 IDC Duren Tiga`, `POP-03 Bintaro Regional`, `POP-04 Cikarang Spine`), status Anycast BNG, VRRP VIP, dan Clean Pipe Scrubbing Center.
  - **Interactive Customer Area & TR-069 Optical Telemetry Lookup**: Pencarian mandiri status redaman optik modem (Rx Power -19.45 dBm, O5 Registered, OLT Uplink) & 1-Click TR-069 Self-Healing Reboot & Flush DNS tanpa antre tiket.
  - **Public Kominfo TrustPositif DNS Filtering Validator**: Validasi kepatuhan pemfilteran domain bersih vs database TrustPositif Kominfo (Sinkhole `10.10.10.1`).
  - **Interactive Bandwidth Simulator**: Estimasi durasi unduh game 50GB, unggah video 10GB, dan streaming 4K simultan.
  - **Peta Jangkauan ODP Fiber**: Pencarian ketersediaan ODP tiang optik di kelurahan/komplek perumahan.
  - **Katalog Paket Internet & Dual-Mode Registrasi**: Formulir pemesanan online instan (QRIS/VA) dan WhatsApp CS.
  - **VIRA AI 24/7 Web Concierge**: Asisten rute cerdas interaktif untuk konsultasi paket dan SLA.
  - **Neo-Brutalism + Cyberpunk Theme**: Dukungan penuh Dark/Light Mode adaptif dan pemilih dwibahasa (ID/EN).
- `/login`: Autentikasi pelanggan terpadu via Nomor Internet / WhatsApp & Password.
- `/c/[inet]/dashboard`: Dashboard interaktif pelanggan dengan telemetri redaman optik TR-069 live, tombol restart modem jarak jauh, kuota bandwidth simetris, dan pintasan bayar tagihan.
- `/c/[inet]/invoices`: Riwayat tagihan, breakdown PPN 11%, dan pembayaran instan via QRIS Dinamis.
- `/c/[inet]/tickets`: Tiket pengaduan kendala koneksi internet 24/7 ke NOC.
- `/c/[inet]/upgrade`: Permintaan upgrade bandwidth on-demand (BoD) mandiri.

---

## 4. Mobile Native App (Flutter `AUDIRA-NET` - AVD `ISP`)

Aplikasi Android mobile untuk operasional lapangan ISP, teknisi, admin, dan pelanggan:
- **AuthGate Splash & High-Speed Session Router (`auth_gate.dart`)**:
  - Splash screen beranimasi pulse branding AUDIRA Cyberpunk & Neo-Brutalism.
  - Memeriksa sesi aktif `FirebaseAuth.currentUser` dan memuat profil Firestore untuk routing otomatis tanpa login ulang ke `Routes.adminHome`, `Routes.teknisiHome`, atau `Routes.customerHome`.
  - Cold-start sub-second (unawaited non-blocking background initialization).
- **Security & Integrity Hardening**:
  - Eliminasi total pencatatan password plaintext di `AuthService`.
  - Dynamic `senderRole` pada Live Chat (`live_chat_room_page.dart`) sesuai role aktif akun Firestore.
  - Konversi native `Timestamp` Firestore pada `ChatModel` dengan fallback fail-safe.
  - Externalization token Telegram dan Gemini AI via `String.fromEnvironment`.
- **HRM & Payroll Engine Penuh (`payroll_page.dart`, `employee_management_page.dart`)**:
  - Generator penggajian bulanan idempoten dengan ID deterministik (`${empId}_$monthKey`) guna mencegah duplikasi gaji.
  - Penghitungan otomatis gaji bruto, tunjangan, potongan BPJS & PPh21, dan gaji bersih.
  - Pembuatan **Slip Gaji Digital Resmi AUDIRA (PDF)** lengkap dengan kop surat PT AUDIRA SUKSES MANDIRI, rincian take-home pay, dan stempel digital terverifikasi via dialog print/share native.
  - Ekspor Laporan Penggajian multi-format: File spreadsheet Excel `.xlsx` komprehensif (`ExcelExporter.exportPayroll`) dan Tabel Ringkasan Landscape PDF.
  - Manajemen Direktori Karyawan & Teknisi (CRUD, filter departemen & status aktif).
- **Arsitektur Firestore Penuh (Eliminasi Split-Brain DB)**:
  - Migrasi seluruh tab operasional Admin (`admin_beranda_tab.dart`, `admin_pelanggan_tab.dart`, `admin_payments_tab.dart`, `admin_profil_tab.dart`, `admin_installasi_tab.dart`) ke koleksi Cloud Firestore (`users`, `customers`, `payments`, `speed_tests`, `installations`, `bills`, `tickets`).
  - Pemakaian agregasi `count().get()` server-side tanpa beban pembacaan dokumen.
- **Dashboard Teknisi & Field Operations**:
  - Monitoring tiket perbaikan harian, SPK instalasi baru (`teknisi_home.dart`).
  - Optical Diagnostics Sheet: Pengecekan kualitas sinyal redaman kabel fiber optik langsung dari modem ONT (`optical_diagnostics_sheet.dart`).
  - Proof of Work Digital: Pengambilan foto bukti instalasi, tanda tangan pelanggan, dan geotag GPS (`digital_proof_of_work_dialog.dart`).
- **Customer Self-Care Tab**:
  - Pembayaran tagihan QRIS instan, uji kecepatan internet (*Speed Test*), dan monitoring FUP usage.
