# DATABASE & DATA FLOW — AUDIRA-NET & BILLING ECOSYSTEM

> **PostgreSQL Schema, Prisma ORM Relations, Redis Caching, and End-to-End Business Flow**  
> *Single Source of Truth (SSOT) Arsitektur Data, Relasi Entitas, dan Alur Transaksi ISP.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Arsitektur Database & Penyimpanan

- **Database Engine**: PostgreSQL 15 running in Docker Container (`sebilling-postgres`)
- **Port Koneksi**: `5455` (Host) -> `5432` (Container)
- **Database Name**: `sebilling`
- **ORM**: Prisma Client v5+ (`@prisma/client`) dengan skema monorepo di `apps/backend/prisma/schema.prisma`
- **Cache & Queue**: Redis 7 running in Docker Container (`sebilling-redis`, Port `6379`)

---

## 2. Entitas Inti Skema Prisma (`apps/backend/prisma/schema.prisma`)

Skema Prisma terdiri dari 900+ baris kode dengan relasi terintegrasi:

### 2.1 Manajemen Pengguna & Keamanan
- `User`: Akun pengguna sistem dengan role berbasis RBAC (`ADMIN`, `BILLING`, `CS`, `NOC`, `TECH`). Memiliki relasi ke `Tenant`, `Employee`, `WorkOrder`, `Attendance`.
- `Tenant`: Multi-tenant ISP identifier untuk isolasi data cabang/unit bisnis.

### 2.2 Pelanggan & Paket Internet
- `Customer`: Profil pelanggan lengkap, meliputi `internetNumber` (ID Pelanggan unik), `ipAddress`, `installedModem`, `modemSerial`, `status` (`active`, `isolated`, `pending`, `expired`), `promiseDate` (janji bayar), `isGracePeriod` (dispensasi isolir), relasi ke `salesPartner`, `invoices`, `tickets`, `workOrders`.
- `Package`: Master paket langganan (nama paket, kecepatan `speed`, tarif bulanan `price`, `salesCommission` komisi mitra sales).
- `Service`: Layanan tambahan yang aktif pada pelanggan (misal: IP Publik Statis, TV Kabel, Tambahan STB).
- `CustomerBooster`: Paket penambah kecepatan / kuota on-demand temporer.

### 2.3 Penagihan & Pembayaran (Billing Engine)
- `Invoice`: Tagihan periodik pelanggan dengan nomor faktur unik (`INV-YYYY-MM-XXXX`), `amount`, `taxAmount` (PPN 11%), `subtotal`, `status` (`UNPAID`, `PAID`, `OVERDUE`, `CANCELLED`), tanggal terbit, dan `dueDate`.
- `InvoiceItem`: Rincian item tagihan (SLA Jaminan, Biaya Berlangganan, Sewa ONT, PPN).
- `Transaction`: Catatan penerimaan pembayaran kas/bank/gateway, relasi ke `Invoice` dan `Customer`.
- `PaymentGateway`: Konfigurasi integrasi Midtrans (Server Key, Client Key, mode sandbox/production).

### 2.4 Jaringan & Telemetri Perangkat
- `Router`: Data router MikroTik terhubung (IP host, port API 8728, kredensial terenkripsi, status koneksi).
- `MikrotikProfile`: Profil paket bandwith PPPoE / Hotspot di RouterOS.
- `GenieAcsDevice`: Data perangkat ONT modem pelanggan yang termonitor via TR-069 ACS (Sinyal RX/TX optik, uptime, WiFi SSID).
- `Olt` & `Odp` & `Odc`: Data topologi jaringan fiber optic, koordinat GPS GIS, dan kapasitas port splitter.

### 2.5 Layanan Lapangan, Tiket & Karyawan
- `Ticket`: Trouble ticket gangguan internet pelanggan, riwayat penanganan, waktu penyelesaian SLA.
- `WorkOrder`: Surat Perintah Kerja (SPK) untuk teknisi lapangan (Pemasangan PSB baru, perbaikan kabel putus, migrasi paket).
- `Employee`: Data kepegawaian staf (posisi, gaji pokok, tunjangan, tanggal bergabung).
- `Attendance`: Catatan absensi staf teknisi/admin dengan koordinat GPS dan foto selfie.
- `CollectorShift`: Catatan shift operasional penagih lapangan dan rekap setoran uang tagihan.

### 2.6 Kemitraan Sales & Buku Besar Komisi
- `SalesPartner`: Profil mitra sales/reseller, kode referral unik, nomor rekening bank/e-wallet, saldo dompet (`walletBalance`).
- `SalesCommission`: Catatan komisi yang didapat mitra dari pelanggan baru yang berhasil membayar tagihan pertama.
- `SalesWithdrawal`: Permintaan pencairan saldo dompet mitra sales ke rekening bank.
- `SalesLedger`: Buku besar mutasi kredit/debit dompet komisi mitra sales.

### 2.7 Akuntansi & Keuangan
- `AccountingAccount`: Bagan Akun (COA) standar akuntansi ISP.
- `AccountingJournal`: Jurnal transaksi debit dan kredit berpasangan (*double-entry bookkeeping*).
- `AccountingLedger`: Buku besar per akun untuk penyusunan laporan keuangan otomatis.

---

## 3. Diagram Alur Transaksi Kunci (End-to-End Data Flows)

### 3.1 Siklus Penagihan Otomatis & Pemulihan Instan ("Bayar Langsung Nyala")

```text
[ 1. CRON SCHEDULER BULANAN (Tanggal 1) ]
                  |
                  v
[ Backend NestJS: InvoiceService.generateMonthlyInvoices() ]
                  |
                  +---> Buat entri Invoice status 'UNPAID'
                  +---> Generate nomor unik (INV-2026-XX-XXXX)
                  |
                  v
[ 2. PENGIRIMAN NOTIFIKASI WHATSAPP (Fonnte API) ]
                  |
                  +---> Pesan WA terkirim dengan rincian total & link pembayaran publik
                  |
                  v
┌─────────────────┴─────────────────┐
│ Status: Pelanggan Membayar?       │
└─────────────────┬─────────────────┘
        BELUM     │     SUDAH
        ┌─────────┴─────────┐
        v                   v
[ Melewati Due Date ]    [ Webhook Midtrans / Admin Confirm ]
        |                   |
        v                   v
[ STATUS: OVERDUE ]      [ STATUS: PAID ]
        |                   |
        v                   v
[ 3. ISOLIR OTOMATIS ]   [ 4. PULIHKAN INTERNET INSTAN ]
- Ubah profile PPPoE     - Kembalikan profile normal di MikroTik
  menjadi 'isolir'       - Kirim FreeRADIUS CoA Disconnect (UDP 3799)
- Putus sesi aktif         untuk reset sesi pelanggan seketika (<2s)
  via RADIUS CoA         - Kirim Kwitansi Lunas via WhatsApp
- Alihkan traffic ke     - Kreditkan komisi ke SalesPartner (jika PSB pertama)
  halaman pembayaran     - Catat jurnal kas masuk ke Keuangan
```

### 3.2 Alur Tiket Gangguan & Dispatch Lapangan

```text
[ Pelanggan Lapor Gangguan (Customer Portal / WhatsApp) ]
                      |
                      v
[ Backend: TicketService.createTicket() ] -> Notifikasi ke CS & NOC Dashboard
                      |
                      v
[ Diagnostik Awal NOC: Cek Redaman Optik via GenieACS TR-069 ]
                      |
                      +---> Jika masalah redaman fisik kabel (RX > -27 dBm):
                      |     Terbitkan WorkOrder penugasan teknisi
                      v
[ Mobile App Flutter AVD ISP: Teknisi menerima SPK di tab 'Tugas' ]
                      |
                      v
[ Teknisi Datang ke Lokasi -> Scan QR ODP -> Splicing Kabel ]
                      |
                      v
[ Ambil Foto Bukti Pasang (Proof of Work) + Geotag GPS + Tanda Tangan ]
                      |
                      v
[ Tiket Closed -> Pelanggan menerima notifikasi penyelesaian via WhatsApp ]
```
