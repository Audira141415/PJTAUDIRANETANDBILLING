# 👥 ROLE-BASED ACCESS CONTROL (RBAC) & PERSONA ECOSYSTEM
## AUDIRA-NET & BILLING ARCHITECTURE SPECIFICATION

> **Document Class:** Enterprise ISP RBAC, UI/UX Persona Differentiation & Security Matrix  
> **Status:** ACTIVE SPECIFICATION & BRAIN MEMORY  
> **Author & Architect:** Agus Dwi Rianto (AUDIRA)  
> **Target Platforms:** Next.js 14 Web Portal (Port 3217), NestJS 10 REST API (Port 3218), Flutter Mobile App (`AVD: ISP`)

---

## 1. Filosofi & Hierarki 4 Peran Utama ISP

Dalam ekosistem penyedia layanan internet (ISP) modern, setiap pengguna memiliki kebutuhan informasi, kapabilitas operasional, dan batasan privasi yang sangat berbeda. Menampilkan antarmuka yang sama untuk semua pengguna adalah bentuk *anti-pattern* dan pelanggaran keamanan data (separation of duties).

```
                      ┌──────────────────────────────────────┐
                      │    👑 OWNER / SUPERADMIN / CEO       │
                      │  Profit, P&L, Tax, SLA Macro, Audit  │
                      └──────────────────┬───────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│  🌐 NOC ENGINEER  │           │ 🛠️ TEKNISI KABEL │           │ 👤 CUSTOMER USER │
│ BGP, OLT, NetFlow│           │ SPK, OTDR, BAST  │           │ Tagihan, QRIS,   │
│ Outages, TR-069  │           │ GPS Geotag, ONT  │           │ Sinyal Optik ONT │
└──────────────────┘           └──────────────────┘           └──────────────────┘
```

---

## 2. Matriks Hak Akses & Perbedaan Antarmuka Web (UI/UX)

| Dimensi | 👑 OWNER / SUPERADMIN | 🌐 NOC ENGINEER | 🛠️ TEKNISI LAPANGAN | 👤 CUSTOMER / PELANGGAN |
| :--- | :--- | :--- | :--- | :--- |
| **Default Landing Route** | `/` (Executive Cockpit) | `/` ➔ `/noc` (Radar NOC) | `/` ➔ `/field-service` | `/customer/dashboard` |
| **KPI Utama di Home** | MRR, Net Margin, EBITDA, Churn %, 99.98% SLA, Cash In vs Due | MRTG Gbps, BGP Peering, Drop Core LOS, OLT PON load, Top Talkers | SPK Hari Ini, Pasang Baru Pending, Rute GPS ODP, Tiket Selesai | Status Paket, Tagihan Aktif, RX dBm, Speedtest SLA, FUP Bar |
| **Finansial & Gaji** | **FULL AKSES** (Laba Rugi, Gaji Karyawan, Pajak 11% UU HPP) | **DILARANG** (Nilai kas disembunyikan/dibatasi) | **DILARANG TOTAL** (Hanya melihat insentif PSB pribadi) | **DILARANG TOTAL** (Hanya tagihan internet miliknya) |
| **Infrastruktur Jaringan** | Ringkasan Status Uptime (Macro Gauge) | **FULL AKSES** (MikroTik, OLT, NetFlow, BGP, GenieACS TR-069, IPAM) | Terbatas pada Peta GIS ODP, Kalkulator OTDR, & Port Allocation | **DILARANG TOTAL** (Hanya cek sinyal ONT miliknya) |
| **Operasional Lapangan** | Audit Log & Monitoring Kinerja Tim | Koordinasi Dispatch Insiden Massal (P1/P2) | **FULL AKSES** (Surat Tugas SPK, Presensi GPS, Scan ONT, BAST) | Dapat memantau status estimasi teknisi datang |
| **Sidebar Menu Navigation** | Menampilkan semua 7 kelompok menu | Ringkasan Utama, Jaringan & Infra, Operasional Lapangan | Layanan Lapangan, Gudang, Presensi, Tiket | **Tanpa Sidebar Admin** (Dedicated Customer Navigation) |

---

## 3. Spesifikasi Rinci Antarmuka per Role

### 👑 1. Role: OWNER / SUPERADMIN (`OWNER`, `SUPERADMIN`, `ADMIN`)
- **Tujuan**: Memimpin bisnis ISP, memantau profitabilitas, arus kas, ekspansi jaringan, dan risiko legalitas.
- **Hero Cockpit**:
  - **Financial Health Radar**: MRR (Monthly Recurring Revenue), Pendapatan Kas Masuk, Piutang Tertunda, Biaya Operasional (OPEX + Transit Bandwidth), dan Net Profit Margin.
  - **Network Macro SLA**: Gauge persentase kepatuhan SLA 99.98% tanpa detail CLI router.
  - **Subscriber Growth & Churn Radar**: Grafik pertumbuhan bersih pelanggan bulanan dan peringatan risiko churn dini.
  - **Payroll & Tax Pulse**: Total beban gaji periode berjalan dan estimasi setor PPN 11% Ditjen Pajak.
- **Aksi Cepat Eksekutif**:
  - Download Laporan Eksekutif Bulanan (PDF/Excel).
  - Persetujuan Pencairan Komisi Mitra Sales & Pengajuan Cuti Staf.
  - Audit Trail Log Aktivitas Karyawan.

### 🌐 2. Role: NOC ENGINEER (`NOC`)
- **Tujuan**: Menjaga stabilitas backbone, routing BGP, mitigasi DDoS, isolasi gangguan fiber, dan kepatuhan regulasi Kominfo.
- **Hero Cockpit**:
  - **Telemetry Radar Strip**: Live MRTG Uplink Transit vs OpenIXP/IIX, BNG Anycast VRRP health, dan TR-069 Inform frequency.
  - **Mass Outage Command Box**: Deteksi instan kabel putus (LOS / Fiber Cut) beserta tombol WhatsApp broadcast massal ke pelanggan terdampak.
  - **DDoS Flowspec Status**: Deteksi anomali trafik NetFlow v9 dan status perlindungan BGP Flowspec.
  - **Optical Degradation Alert**: Daftar ONT pelanggan dengan redaman kritis (< -27.0 dBm).
- **Aksi Cepat NOC**:
  - Buka Studio Waveform OTDR `.SOR` (Telcordia SR-4731).
  - Eksekusi Kick CoA Session / Unblock Grace Period.
  - Batch Firmware Upgrade Scheduler GenieACS (02:00–04:00 WIB).

### 🛠️ 3. Role: TEKNISI LAPANGAN (`TECHNICIAN`)
- **Tujuan**: Menyelesaikan tugas instalasi pasang baru (PSB), investigasi gangguan sinyal dropcore, dan pemeliharaan perangkat.
- **Hero Cockpit**:
  - **Kanban Surat Perintah Kerja (SPK)**:
    - *Antrean Ditugaskan (Assigned)*
    - *Menuju Lokasi (On-Route)*
    - *Sedang Dikerjakan (In-Progress)*
    - *Tuntas Hari Ini (Completed)*
  - **Terminal Presensi & Geotagging**: Tombol Cepat Check-In GPS + Foto Selfie Ber-Watermark Otomatis.
  - **Toolbox Cepat Teknisi**:
    - *Kalkulator Jarak Putus OTDR*: Menghitung meteran putus kabel ke tiang/ODP terdekat.
    - *Scan Barcode/QR ONT*: Pindai SN & MAC perangkat untuk auto-binding ZTP.
    - *Digital BAST*: Lembar serah terima dengan tanda tangan digital pelanggan di layar sentuh.
- **Aksi Cepat Teknisi**:
  - Hubungi Pelanggan via WhatsApp 1-Tap (`wa.me`).
  - Navigasi Google Maps ke titik koordinat ODP pelanggan.

### 👤 4. Role: PELANGGAN MANDIRI (`CUSTOMER`)
- **Tujuan**: Memantau layanan internet pribadi, membayar tagihan tepat waktu, memeriksa kualitas sinyal, dan meminta bantuan tanpa antre.
- **Hero Cockpit (Customer Self-Care Layout)**:
  - **Status Koneksi & Paket**: Kartu paket (mis. *Ultra Gamer 50 Mbps*), nomor internet PPPoE, dan status aktif normal.
  - **Invoicing & 1-Tap Payment**: Kartu jatuh tempo dengan nominal rapi (ber-PPN 11%) dan generator QRIS Dinamis & Virtual Account otomatis.
  - **Dokter Jaringan 1-Tap**: Pengecekan mandiri sinyal serat optik (-19.4 dBm) dan tombol kirim sinyal reboot modem TR-069.
  - **Speedtest RFC 2544**: Uji kecepatan mandiri ber-sertifikat digital SLA resmi ber-hash SHA-256 HMAC.
  - **Kelola Wi-Fi Keluarga**: Ubah SSID dan password Wi-Fi serta pantau perangkat yang tersambung di rumah.

---

## 4. Persistent Role Switcher Docks ("Nempel Biar Enak Pencet-pencetnya")

Untuk mempercepat testing, staging, dan demo lapangan, sistem dilengkapi bilah switch peran permanen di Web dan Mobile tanpa perlu logout dan input credential berulang:

### A. Web Dock Bar (`RoleSwitcherBar.tsx`)
- **Posisi**: Terpasang di bagian bawah layar tengah (`fixed bottom-3 left-1/2 -translate-x-1/2 z-[9999]`).
- **Fitur 1-Tap**:
  - 👑 **Superadmin**: Membuka seluruh menu (Keuangan, Gaji, BGP, OLT, Tiket).
  - ⚡ **NOC Core**: Membuka telemetri jaringan, mengunci menu finance.
  - 🔧 **Teknisi**: Membuka SPK, OTDR, Presensi GPS, mengunci menu finance & BGP core.
  - 💳 **Billing**: Membuka invoice, kasir, reminder WA, mengunci router core.
  - 👤 **Pelanggan**: Meluncur ke portal `/customer/dashboard` tanpa sidebar admin.
- **Minimasi**: Tersedia tombol perkecil ke floating pill kompak.

### B. Mobile Floating Cyber-Dock (`mobile_role_switcher.dart`)
- **Posisi**: Draggable floating dock pada `MaterialApp.builder` yang melayang di atas layar.
- **Fitur 1-Tap**:
  - 👑 **Admin**: Pindah ke `Routes.adminHome` + set context data Admin ISP.
  - 🛠️ **Teknisi**: Pindah ke `Routes.teknisiHome` + set context data Teknisi Lapangan.
  - 👤 **Pelanggan**: Pindah ke `Routes.customerHome` + set context data Pelanggan Mandiri.
- **Ergonomi**: Dapat digeser (drag) ke posisi mana saja agar tidak menutupi tombol form atau peta. Tersedia mode minimize menjadi kapsul kecil.

---

## 5. Rencana Implementasi Bertahap (Sprint Roadmap)

1. **Fase 1: Tipe Data RBAC & Context Switcher Preview** [SELESAI]
2. **Fase 2: Root Dashboard Role Adapter (`pages/index.tsx`)** [SELESAI]
3. **Fase 3: Pemurnian Hak Akses Navigasi Sidebar (`Sidebar.tsx`)** [SELESAI]
4. **Fase 4: Backend API Guard Enforcement (`RolesGuard`)** [SELESAI]
5. **Fase 5: Docked Interactive Switchers di Web & Mobile** [SELESAI]
6. **Fase 6: Anti-Slop & Design Consistency Verification** [SELESAI]
