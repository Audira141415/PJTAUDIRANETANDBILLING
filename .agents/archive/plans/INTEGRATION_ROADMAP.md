# INTEGRATION ROADMAP — AUDIRA-NET & BILLING ECOSYSTEM

> Master Integration Pipeline, Mobile Sync, and Multi-Service Milestones.  
> **Author & Lead Architect:** Agus Dwi Rianto (AUDIRA)  
> **Status:** Active Execution  

---

## 📌 Executive Summary

Dokumen ini adalah panduan roadmap aksi untuk mengintegrasikan seluruh kapabilitas backend NestJS, database PostgreSQL, Next.js Web Admin, Customer Portal, serta aplikasi Mobile (Flutter `AUDIRA-NET` & Expo `apps/mobile`).

---

## 📅 Master Roadmap & Milestones

### 🚀 Fase 0: Stabilisasi Core & Multi-Port (Selesai / Terverifikasi)
- [x] Docker Container `sebilling-postgres` (Port 5455) & `sebilling-redis` (Port 6379) aktif.
- [x] Backend NestJS berjalan di **Port 3218** dengan database Prisma PostgreSQL.
- [x] Web Admin Next.js berjalan di **Port 3217**.
- [x] Launcher otomatis `start.bat` & port cleaner `stop-servers.bat` siap pakai.
- [x] Aplikasi mobile Flutter `AUDIRA-NET` (`com.example.AudiraNET_app`) sukses di-compile dan berjalan di Android Emulator `emulator-5554` (AVD `ISP`).
- [x] Perbaikan error splash screen Flutter dengan pengamanan try-catch pada inisialisasi Firestore.

### 🌐 Fase 1: Customer Portal & Payment Automation (Sedang Berjalan)
- [x] Customer self-service dashboard (`apps/customer-portal` di Port 3001).
- [x] Integrasi pembayaran Midtrans (QRIS instan, Virtual Account).
- [x] Notifikasi tagihan otomatis via Fonnte WhatsApp Gateway.
- [ ] Pengujian menyeluruh webhook payment status callback & auto-unblock internet.

### 👥 Fase 2: Sales Partner & Referral Wallet System (Selesai / Terverifikasi)
- [x] Halaman registrasi publik mitra sales luar (`/sales/daftar`).
- [x] Panel Admin verifikasi mitra sales baru (`/admin/sales`).
- [x] Aturan bonus komisi per paket layanan internet (Bonus PSB).
- [x] Dompet digital komisi (E-Wallet) & workflow pencairan saldo (Withdrawal Request).
- [x] Notifikasi WhatsApp otomatis ke mitra sales saat komisi masuk via Fonnte Gateway.

### 📡 Fase 3: Network Automation & ONT Telemetry
- [ ] MikroTik API: Pembuatan otomatis PPPoE Secret & Queue saat PSB disetujui.
- [ ] Isolir otomatis terpadu via MikroTik Address List / FreeRADIUS CoA.
- [ ] Pemantauan redaman optik ONT modem via GenieACS (TR-069).
- [ ] Pemetaan visual ODC & ODP pada antarmuka peta GIS.

### 📱 Fase 4: Full Mobile Field Service Integration
- [ ] Sinkronisasi tiket PSB & gangguan ke aplikasi mobile teknisi Flutter.
- [ ] Fitur check-in lokasi GPS teknisi & upload foto bukti instalasi.
- [ ] Tanda tangan digital pelanggan di aplikasi mobile saat serah terima layanan.
