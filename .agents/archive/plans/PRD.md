# PRD — AUDIRA-NET & BILLING ECOSYSTEM

> Product Requirements Document: Enterprise Internet Service Provider (ISP) Management Platform.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  
> **Organization:** Audira Multimedia Digital / Audira Sukses Mandiri  

---

## 1. Executive Summary

**AUDIRA-NET & BILLING** adalah platform perangkat lunak terintegrasi kelas enterprise untuk penyedia layanan internet (ISP) dan jaringan RT/RW Net di Indonesia. Sistem ini menggabungkan penagihan otomatis, manajemen jaringan MikroTik & RADIUS, pemantauan modem TR-069, aplikasi teknisi lapangan, dan portal pelanggan mandiri.

### 5 Pilar Utama Sistem:
1. **Zero-Touch Automated Billing**: Siklus penagihan tanpa sentuhan manusia — faktur terbit otomatis, pengingat WhatsApp terkirim, isolir otomatis saat jatuh tempo, dan layanan pulih seketika saat dibayar.
2. **Comprehensive Network Control**: Integrasi MikroTik RouterOS API, FreeRADIUS multi-NAS, serta pemantauan redaman optik modem ONT pelanggan via GenieACS (TR-069).
3. **Field Service & Technician Automation**: Manajemen tiket gangguan dan instalasi PSB (Pemasangan Sambungan Baru) dengan aplikasi mobile berbasis Flutter & GPS.
4. **Partner & Referral Ecosystem**: Pendaftaran mandiri mitra sales luar, dompet komisi digital, dan sistem pencairan dana (withdraw) transparan.
5. **Multi-Role Governance**: Role-Based Access Control (RBAC) ketat untuk Admin, Billing, NOC, CS, Teknisi, dan Pelanggan.

---

## 2. Modul Fungsional Utama

### 2.1 Manajemen Pelanggan (Customer Management)
- Siklus hidup pelanggan: Prospek -> Survey -> Instalasi PSB -> Aktif -> Isolir / Suspend -> Berhenti.
- Data pelanggan lengkap: Identitas KTP, kontak WhatsApp, koordinat GPS, paket langganan, IP Address, secret PPPoE, dan titik ODP terhubung.
- Fitur import/export data pelanggan via Excel/CSV.

### 2.2 Billing & Penagihan Otomatis
- **Faktur Otomatis**: Mendukung siklus tanggal 1 bulanan, siklus tanggal pasang, dan kalkulasi tagihan prorata.
- **Isolir Otomatis**: Penunggak tagihan dialihkan ke walled-garden atau dinonaktifkan di MikroTik/RADIUS tepat saat jatuh tempo.
- **Pajak & PPN**: Perhitungan PPN otomatis (bisa diatur *include* atau *exclude*).
- **Payment Gateway**: Dukungan Midtrans (QRIS instan, Virtual Account bank, E-Wallet) dengan webhook otomatis.

### 2.3 MikroTik & RADIUS Integration
- Manajemen multi-router NAS MikroTik via RouterOS API.
- Pembuatan dan pembaruan Secret PPPoE, Hotspot User, dan IP Binding secara otomatis.
- Server FreeRADIUS untuk autentikasi skala besar, pencatatan sesi online, dan Change of Authorization (CoA) untuk putus sesi instan.

### 2.4 Monitoring Modem (GenieACS / TR-069)
- Membaca status real-time modem ONT pelanggan (ZTE, Huawei, Fiberhome).
- Deteksi redaman optik (RX/TX Power dBm), suhu perangkat, dan daftar perangkat terhubung ke WiFi pelanggan.
- Kemampuan mengubah SSID dan password WiFi pelanggan langsung dari panel web admin.

### 2.5 Field Service & Tiket Gangguan
- Pipeline instalasi PSB baru dan penugasan tiket ke teknisi perorangan atau tim.
- Aplikasi mobile teknisi untuk check-in di lokasi dengan foto bukti kerja, pembacaan barcode modem, dan tanda tangan digital pelanggan.

### 2.6 Mitra Sales Luar & Dompet Komisi (Sales Partner & Referral)
- Formulir pendaftaran publik calon mitra sales luar (`/sales/daftar`).
- Panel verifikasi pendaftaran mitra sales oleh Admin.
- Sistem dompet digital (E-Wallet) untuk pencairan komisi PSB sukses.
- Pengaturan bonus komisi bertingkat berdasarkan jenis paket internet yang diambil.

### 2.7 WhatsApp Gateway & Otomasi Notifikasi
- Integrasi API Fonnte untuk pesan WhatsApp otomatis:
  - Notifikasi tagihan baru dan tautan pembayaran QRIS.
  - Pengingat jatuh tempo H-3, H-1, dan hari H.
  - Notifikasi isolir dan kabar reaktivasi layanan lunas.
  - Notifikasi komisi mitra sales.

### 2.8 HRM, Absensi & Penggajian Karyawan
- Pencatatan absensi harian teknisi dan staf kantor.
- Manajemen jadwal shift, cuti, dan evaluasi performa KPI.
- Penggajian karyawan internal dan insentif bonus PSB per teknisi.

### 2.9 Laporan & Eksekutif Analitik
- Dashboard analitik pendapatan (*MRR*, *ARPU*).
- Laporan pertumbuhan pelanggan, tingkat churn, dan status kolektibilitas piutang.
- Rekapitulasi pajak masa untuk pelaporan SPT.
