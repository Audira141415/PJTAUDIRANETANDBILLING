# BRAIN MANIFEST — AUDIRA-NET & BILLING ECOSYSTEM

> **Central Knowledge Repository & Persistent Project Intelligence**  
> *Single Source of Truth (SSOT) for Next.js 14 Web Admin, NestJS 10 REST API, Flutter Mobile Native, MikroTik API, FreeRADIUS, and Multi-Port Architecture.*  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Executive Overview & Filosofi Brain

**AUDIRA-NET & BILLING** adalah ekosistem manajemen Internet Service Provider (ISP) terpadu yang mencakup:
- **AUDIRA-BILLING (Web & API)**:
  - *Backend*: NestJS 10, Prisma ORM, PostgreSQL (Port 5455), Redis (Port 6379), JWT, MikroTik API, Fonnte WhatsApp, Midtrans. Berjalan di **Port 3218**.
  - *Frontend*: Next.js 14 Web Admin Portal untuk manajemen pelanggan, paket, penagihan, router, dan laporan. Berjalan di **Port 3217**.
  - *Customer Portal*: Next.js 14 self-service untuk pelanggan cek tagihan & bayar QRIS. Berjalan di **Port 3001**.
- **AUDIRA-NET (Mobile App)**:
  - *Mobile Native (Flutter)*: Aplikasi Android (`com.example.AudiraNET_app`) untuk operasional teknisi lapangan, NOC, dan CS. Berjalan khusus di Android Emulator bernama AVD **`ISP`** (isolasi ketat dari emulator proyek lain seperti `MDA` atau `DC`).
  - *Mobile React Native (Expo SDK 50)*: Aplikasi mobile alternatif untuk pelanggan & teknisi.

---

## 2. Peta Dokumen Brain (Brain Knowledge Map)

| Modul Brain | Lokasi File | Deskripsi & Fokus Konten |
| :--- | :--- | :--- |
| **Tingkat 1: Memory Hub** | [MEMORY.md](file:///f:/AUDIRA-NET-BILLING/MEMORY.md) | Otak LTM root: Ringkasan eksekutif, status sprint aktif, port map, gotchas penting. |
| **00. Panduan Memory** | [MEMORY_FUNCTION_AND_PURPOSE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/MEMORY_FUNCTION_AND_PURPOSE.md) | Filosofi memory, pencegahan amnesia arsitektur multi-service. |
| **01. Arsitektur Sistem** | [SYSTEM_ARCHITECTURE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/SYSTEM_ARCHITECTURE.md) | Topologi monorepo, NestJS modules, Next.js Pages router, Flutter app, database Docker. |
| **02. Katalog Fitur** | [FEATURE_CATALOG.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/FEATURE_CATALOG.md) | Master katalog 50 modul backend NestJS, 80+ halaman Web Admin, Customer Portal, Flutter screens. |
| **03. Keamanan & Tata Kelola**| [SECURITY_AND_GOVERNANCE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/SECURITY_AND_GOVERNANCE.md) | RBAC guards, enkripsi rahasia MikroTik, verifikasi signature Midtrans webhook, isolasi port. |
| **04. Database & Alur Data** | [DATABASE_AND_DATA_FLOW.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/DATABASE_AND_DATA_FLOW.md) | 900+ baris PostgreSQL Prisma schema, relasi tabel, dan siklus zero-touch billing. |
| **05. Variabel Lingkungan** | [ENV_AND_SECRETS_REFERENCE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/ENV_AND_SECRETS_REFERENCE.md) | Pemetaan port (3217/3218/3001/5455/6379), kredensial DB Docker, API keys. |
| **06. SOP Operasional** | [.agents/sop/INDEX.md](file:///f:/AUDIRA-NET-BILLING/.agents/sop/INDEX.md) | Prosedur penanganan insiden jaringan, onboarding pelanggan, dan penagihan. |
| **07. Lingkungan Emulator** | [DEVICE_AND_EMULATOR_ENVIRONMENT.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/DEVICE_AND_EMULATOR_ENVIRONMENT.md) | Isolasi multi-proyek emulator Android (khusus AVD `ISP`, abaikan `MDA`/`DC`). |
| **08. Matriks Layanan & Paket**| [SERVICE_AND_PACKAGE_MATRIX.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/SERVICE_AND_PACKAGE_MATRIX.md) | Katalog paket internet, bandwidth simetris/asimetris, SLA 99.8%, booster, saluran bayar. |
| **09. Analitik & Telemetri** | [ANALYTICS_AND_CONVERSION.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/ANALYTICS_AND_CONVERSION.md) | Metrik finansial ISP (MRR, ARPU, Churn, Collection Rate) & telemetri redaman optik TR-069. |
| **10. Riwayat & Roadmap** | [UPDATE_HISTORY_AND_ROADMAP.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/UPDATE_HISTORY_AND_ROADMAP.md) | Changelog versi (v1.0.0 s/d v2.0.0 Theme Harmonized) dan roadmap multi-NAS MikroTik. |
