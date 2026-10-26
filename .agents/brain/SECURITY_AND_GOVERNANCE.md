# SECURITY & GOVERNANCE — AUDIRA-NET & BILLING ECOSYSTEM

> **Data Privacy, RBAC Roles, MikroTik Secret Encryption, Webhook Verification, and Workspace Isolation**  
> *Standar Keamanan Aplikasi ISP, Proteksi Kredensial Jaringan, dan Tata Kelola Lingkungan Kerja.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Proteksi Autentikasi & RBAC (Role-Based Access Control)

Backend NestJS mengimplementasikan sistem proteksi otorisasi berlapis menggunakan JWT Guard dan Role Decorator:

1. **Role Hierarchy**:
   - `ADMIN`: Akses penuh ke seluruh konfigurasi sistem, database, pengaturan router, dan persetujuan payout keuangan.
   - `BILLING`: Manajemen invoice, pencatatan transaksi manual, verifikasi pembayaran, dan rekonsiliasi kas.
   - `CS` (Customer Service): Manajemen pelanggan, penerimaan aduan gangguan, pembuatan tiket, dan pengiriman pesan WhatsApp.
   - `NOC` (Network Operations Center): Monitoring OLT/ODP, konfigurasi profil MikroTik, diagnostik TR-069 GenieACS, dan monitoring traffic.
   - `TECH` (Teknisi Lapangan): Penerimaan WorkOrder (SPK), update status instalasi, foto bukti kerja (proof of work).
   - `CUSTOMER`: Akses terbatas ke Customer Portal (hanya data diri, tagihan, dan tiket miliknya sendiri).

2. **JWT Token Hygiene**:
   - Access token berumur pendek (15 menit - 1 jam) dengan refresh token tersimpan aman.
   - Password pengguna dienkripsi menggunakan hashing `bcrypt` dengan cost factor 10+.

---

## 2. Keamanan Kredensial MikroTik & Perangkat Jaringan

1. **Enkripsi Kredensial RouterOS**:
   - Password router MikroTik disimpan terenkripsi di database dan tidak boleh dikirimkan secara terbuka (plain text) ke antarmuka frontend.
   - Komunikasi API RouterOS diarahkan melalui port aman (8728 / 8729 API-SSL).
2. **TR-069 GenieACS Authentication**:
   - Modem ONT pelanggan berkomunikasi dengan ACS menggunakan HTTP Basic / Digest Authentication dengan secret unik per perangkat.
3. **FreeRADIUS Security**:
   - Secret shared key antara NAS (MikroTik) dan FreeRADIUS server dijaga ketat di file `.env`.
   - CoA Disconnect requests (UDP 3799) hanya diterima dari IP server backend resmi.

---

## 3. Verifikasi Webhook Pembayaran (Midtrans)

1. **Signature Key Validation**:
   - Setiap webhook notifikasi pembayaran dari Midtrans diverifikasi menggunakan formula SHA-512:
     `SHA512(order_id + status_code + gross_amount + ServerKey)`
   - Transaksi tanpa signature valid akan langsung ditolak (`403 Forbidden`) untuk mencegah pemalsuan status lunas.
2. **Idempotency Protection**:
   - Penanganan callback Midtrans menerapkan pengecekan idempotensi untuk mencegah duplikasi saldo atau ganda aktivasi akibat pengiriman ulang payload.

---

## 4. Isolasi Multi-Proyek di Workstation Lokal

Workstation pengembang menjalankan beberapa ekosistem AUDIRA secara paralel:
- **Port Khusus AUDIRA-NET-BILLING**:
  - Web Admin: **Port `3217`**
  - Backend REST API: **Port `3218`**
  - Customer Portal: **Port `3001`**
  - PostgreSQL Database: **Port `5455`**
  - Redis Cache: **Port `6379`**
- **Stop Script Aman**:
  - Skrip [stop.bat](file:///f:/AUDIRA-NET-BILLING/stop.bat) atau `AUDIRA-BILLING/stop-servers.bat` **HANYA** mematikan proses yang mendengarkan (*listening*) pada port 3217, 3218, dan 3001.
  - **DILARANG KERAS** menjalankan perintah global `taskkill /f /im node.exe` yang akan mematikan proses proyek Audira lainnya (`AUDIRA-KOMIK-MDA`, `AUDIRA-DCOS`, dll.).
- **Isolasi Android Emulator**:
  - Hanya Android Emulator dengan AVD bernama **`ISP`** yang boleh dihubungkan, dikonfigurasi reverse port, atau dideploy aplikasi Flutter. Dilarang menyentuh emulator `MDA` atau `DC`.
