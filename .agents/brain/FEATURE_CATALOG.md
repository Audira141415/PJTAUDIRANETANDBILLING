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
| **MOD-13** | `WhatsAppModule` | Gateway notifikasi WhatsApp Fonnte API, template tagihan dinamis, broadcast pengumuman. |
| **MOD-14** | `ReferralModule` & `SalesModule` | Program kemitraan sales, kode referral, kalkulasi komisi PSB otomatis, penarikan saldo dompet (payout). |
| **MOD-15** | `EmployeeModule` & `SalaryModule` | HRM staf ISP, absensi GPS & selfie, penggajian, insentif teknisi PSB. |
| **MOD-16** | `KeuanganModule` | Akuntansi komprehensif, bagan akun (COA), jurnal umum, buku besar, neraca, laba rugi, arus kas. |
| **MOD-17** | `ReportsModule` & `AnalyticsModule` | Laporan eksekutif, pendapatan MRR, retensi pelanggan, analitik churn, ekspor PDF/Excel. |
| **MOD-18** | `BoosterModule` | Layanan speed on demand / turbo booster temporer untuk pelanggan FUP. |
| **MOD-19** | `CollectorModule` | Manajemen penagihan lapangan (kolektor door-to-door), shift kerja, setoran tunai. |
| **MOD-20** | `InventoryModule` | Manajemen stok ONT modem, kabel dropcore, patchcord, ODP splitter, log mutasi barang. |

---

## 2. Master Katalog Frontend Web Admin (Next.js 14 - Port 3217)

Frontend Next.js Pages router di `apps/frontend` mencakup 80+ halaman terstruktur:

### 2.1 Dashboard & Operasional
- `/` atau `/dashboard/billing`: Dashboard utama metrik ISP (MRR, Total Pelanggan Aktif, Tagihan Menunggu, Tiket Gangguan).
- `/dashboard/noc`: Dashboard Network Operations Center (Status Router MikroTik, Traffic Uplink, OLT Ping).
- `/noc`: Command Center monitoring perangkat jaringan, log insiden, dan status interface.

### 2.2 Manajemen Pelanggan (`/pelanggan`)
- `/pelanggan`: Daftar seluruh pelanggan ISP, filter status (`active`, `isolated`, `pending`, `expired`), pencarian cepat.
- `/pelanggan/[id]`: Detail komprehensif profil pelanggan, riwayat invoice, statistik redaman modem, konfigurasi PPPoE.
- `/pelanggan/tambah`: Formulir registrasi pelanggan baru, pemilihan paket, penugasan ODP dan teknisi.
- `/pelanggan/pending`: Antrean calon pelanggan yang menunggu instalasi fisik.
- `/pelanggan/suspend`: Daftar pelanggan terisolir karena melewati batas jatuh tempo.
- `/pelanggan/import`: Wizard impor data pelanggan massal dari file Excel / CSV.

### 2.3 Modul Tagihan & Invoice (`/invoice`)
- `/invoice/semua`: Master tabel seluruh invoice (Unpaid, Paid, Overdue, Cancelled).
- `/invoice/[id]`: Rincian invoice internal, breakdown SLA, catatan pembayaran, instruksi transfer BCA/Mandiri/QRIS.
- `/invoice/public/[id]`: Rute publik tanpa sidebar untuk dibagikan ke pelanggan via WhatsApp / SMS.
- `/invoice/generate`: Pembuatan invoice manual perorangan dengan opsi diskon/penyesuaian.
- `/invoice/batch-generate`: Generator invoice massal awal bulan berbasis paket aktif pelanggan.
- `/invoice/batch-send`: Pengiriman notifikasi tagihan massal via WhatsApp Gateway Fonnte.
- `/invoice/due`: Daftar tagihan mendekati jatuh tempo untuk penjadwalan reminder.
- `/invoice/overdue`: Daftar tagihan menunggak untuk eksekusi isolir massal.
- `/invoice/credit-note` & `/invoice/refund`: Manajemen nota kredit dan pengembalian dana pembayaran.

### 2.4 Infrastruktur & Jaringan (`/infrastruktur` & `/mikrotik`)
- `/mikrotik`: Manajemen router MikroTik terhubung, sinkronisasi secret PPPoE, live queue bandwidth monitor.
- `/infrastruktur/map`: Peta GIS interaktif persebaran jalur kabel fiber optic, ODC, ODP, dan sebaran pelanggan.
- `/infrastruktur/odp`: Visualisasi detail hardware splitter ODP (kapasitas 1:8 / 1:16, port terpakai, redaman dBm).
- `/infrastruktur/olt`: Monitoring OLT EPON/GPON, temperatur chassis, uptime, dan daftar ONU/ONT terdaftar.
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

### 2.6 Kemitraan Sales & Referral (`/admin/sales` & `/sales/daftar`)
- `/admin/sales`: Dashboard kemitraan sales partner, verifikasi pendaftaran calon mitra, persetujuan penarikan komisi (payout), dan buku besar mutasi dompet mitra.
- `/sales/daftar`: Formulir pendaftaran mitra reseller / sales referral AUDIRA-NET.

### 2.7 Layanan Lapangan & WhatsApp
- `/technician` & `/technician-monitoring`: Pelacakan lokasi teknisi, antrean tugas instalasi & perbaikan.
- `/tickets` & `/work-order-detail`: Pengelolaan trouble ticket pelanggan dan Surat Perintah Kerja (SPK).
- `/whatsapp`: Dashboard WhatsApp Gateway Fonnte, monitoring status koneksi nomor gateway, scheduler pengingat otomatis.

---

## 3. Customer Self-Service Portal (Next.js 14 - Port 3001)

Portal mandiri pelanggan di `apps/customer-portal`:
- `/customer/login`: Login pelanggan menggunakan Nomor Internet / WhatsApp & Password.
- `/customer/dashboard`: Beranda pelanggan, status koneksi internet, masa aktif paket, dan pintasan bayar.
- `/customer/invoices`: Riwayat seluruh tagihan, download kwitansi digital PDF.
- `/customer/profile`: Informasi pelanggan, ganti sandi WiFi / router, dan alamat pemasangan.
- `/customer/tickets`: Pengaduan gangguan internet langsung ke NOC 24/7.

---

## 4. Mobile Native App (Flutter `AUDIRA-NET` - AVD `ISP`)

Aplikasi Android mobile untuk operasional lapangan:
- **Auth & Role Gate**: Login terpadu teknisi, sales, NOC, dan pelanggan (`unified_login_page.dart`).
- **Dashboard Teknisi**: Monitoring tiket perbaikan harian, SPK instalasi baru (`teknisi_home.dart`).
- **Barcode & QR Scanner**: Scan barcode serial number ONT/modem saat pemasangan di rumah pelanggan (`barcode_scanner_page.dart`).
- **Optical Diagnostic Sheet**: Pengecekan kualitas sinyal redaman kabel fiber optik langsung dari modem ONT (`optical_diagnostics_sheet.dart`).
- **Proof of Work Digital**: Pengambilan foto bukti instalasi, tanda tangan pelanggan, dan geotag GPS (`digital_proof_of_work_dialog.dart`).
- **Customer Self-Care Tab**: Pembayaran tagihan QRIS instan, uji kecepatan internet (*Speed Test*), dan monitoring FUP usage.
