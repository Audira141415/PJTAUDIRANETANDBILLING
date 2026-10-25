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
  - *Mobile Native (Flutter)*: Aplikasi Android (`com.example.AudiraNET_app`) untuk operasional teknisi lapangan, NOC, dan CS. Berjalan di Android Emulator `emulator-5554`.
  - *Mobile React Native (Expo SDK 50)*: Aplikasi mobile alternatif untuk pelanggan & teknisi.

---

## 2. Peta Dokumen Brain (Brain Knowledge Map)

| Modul Brain | Lokasi File | Deskripsi & Fokus Konten |
| :--- | :--- | :--- |
| **00. Panduan Memory** | [MEMORY_FUNCTION_AND_PURPOSE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/MEMORY_FUNCTION_AND_PURPOSE.md) | Filosofi memory, pencegahan amnesia arsitektur multi-service. |
| **01. Arsitektur Sistem** | [SYSTEM_ARCHITECTURE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/SYSTEM_ARCHITECTURE.md) | Topologi monorepo, NestJS modules, Next.js Pages router, Flutter app, database Docker. |
| **02. Katalog Fitur** | [FEATURE_CATALOG.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/FEATURE_CATALOG.md) | Rincian modul penagihan, pelanggan, mikrotik, tiket, absensi, dan laporan. |
| **03. Keamanan & Tata Kelola**| [SECURITY_AND_GOVERNANCE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/SECURITY_AND_GOVERNANCE.md) | RBAC guards, enkripsi rahasia MikroTik, verifikasi signature Midtrans webhook. |
| **04. Database & Alur Data** | [DATABASE_AND_DATA_FLOW.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/DATABASE_AND_DATA_FLOW.md) | PostgreSQL schema, Prisma ORM relations, Redis caching, dan alur isolir/reaktivasi. |
| **05. Variabel Lingkungan** | [ENV_AND_SECRETS_REFERENCE.md](file:///f:/AUDIRA-NET-BILLING/.agents/brain/ENV_AND_SECRETS_REFERENCE.md) | Pemetaan port (3217/3218/3001/5455/6379), kredensial DB Docker, API keys. |
| **06. SOP Operasional** | [.agents/sop/INDEX.md](file:///f:/AUDIRA-NET-BILLING/.agents/sop/INDEX.md) | Prosedur penanganan insiden jaringan, onboarding pelanggan, dan penagihan. |
