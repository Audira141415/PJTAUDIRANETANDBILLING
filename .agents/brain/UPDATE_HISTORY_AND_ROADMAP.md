# UPDATE HISTORY & ROADMAP — AUDIRA-NET & BILLING ECOSYSTEM

> **Version Changelog, Milestone History, and Future ISP Architecture Roadmap**  
> *Riwayat Mutasi Proyek dan Rencana Pengembangan Fitur Ekosistem ISP Jangka Panjang.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Version Changelog

### Version 2.0.0 (Status Saat Ini — Production Ready & Theme Harmonized)
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

### Tahap 1: Multi-NAS MikroTik Centralized Balancing (Q1 2027)
- [ ] Dukungan manajemen klaster multi-router MikroTik (Core, Distribution, BRAS/BNG) terpusat.
- [ ] Sinkronisasi otomatis database pelanggan ke router target sesuai area ODP pelanggan.

### Tahap 2: Automated WhatsApp Optical Telemetry Bot (Q1 2027)
- [ ] Bot interaktif WhatsApp: Pelanggan dapat mengetik `!cek sinyal` untuk mengecek redaman optik modem ONT secara mandiri.
- [ ] Auto-reboot modem dari WhatsApp jika terjadi penurunan throughput.

### Tahap 3: Mobile Native Flutter Advanced Field Ops (Q2 2027)
- [ ] Offline-first sync untuk teknisi di area blank-spot menggunakan SQLite lokal dan sinkronisasi otomatis saat terhubung sinyal.
- [ ] Integrasi Optical Time Domain Reflectometer (OTDR) trace visualizer pada peta jalur kabel fiber.
