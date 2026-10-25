# ARCHITECTURE — AUDIRA-NET & BILLING ECOSYSTEM

> Technical Architecture, Microservices/Monorepo Pipeline, and System Topology for AUDIRA ISP Management.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  
> **Organization:** Audira Multimedia Digital / Audira Sukses Mandiri  

---

## 1. System Topology Overview

**AUDIRA-NET & BILLING** adalah ekosistem manajemen Internet Service Provider (ISP) terpadu yang mencakup Billing, RADIUS Server, Integrasi RouterOS MikroTik, TR-069 ACS Modem, Gateway Pembayaran, CRM & Notifikasi WhatsApp, serta Aplikasi Mobile Lapangan:

```text
                               +----------------------------------------------------+
                               |                Client Access Layer                 |
                               +----------------------------------------------------+
                                 |                          |                     |
                 Port 3217       |          Port 3001       |     Android App     |
                     v           |              v           |          v          |
        +----------------------------+   +----------------------+   +-------------------+
        | AUDIRA Web Admin (Next.js) |   |   Customer Portal    |   | AUDIRANET Mobile  |
        |  Dashboard, Billing, CRM,  |   | (Next.js 14 Web App) |   |  (Flutter Native  |
        | Mikrotik, HR, Reports, ODP |   | Invoices, QRIS, Tiket|   |   & Expo React)   |
        +----------------------------+   +----------------------+   +-------------------+
                     \                          /                             /
                      \                        /                             /
                       v                      v                             v
+---------------------------------------------------------------------------------------+
|                    AUDIRA BACKEND SERVER (NestJS 10 - Port 3218)                      |
|                                                                                       |
|  +--------------------+  +--------------------+  +--------------------+  +---------+  |
|  | Auth & RBAC Guard  |  | Billing Engine     |  | Mikrotik API Engine|  | Free-   |  |
|  | (JWT, Refresh, Role|  | (Invoices, Prorata,|  | (RouterOS API,     |  | RADIUS  |  |
|  |  ADMIN, CS, TEK)   |  |  Due Dates, Tax)   |  |  Queue, PPPoE/DHCP)|  | (CoA/Dis|  |
|  +--------------------+  +--------------------+  +--------------------+  +---------+  |
|                                                                                       |
|  +--------------------+  +--------------------+  +--------------------+  +---------+  |
|  | Midtrans Gateway   |  | WhatsApp Engine    |  | GenieACS (TR-069)  |  | ODC/ODP |  |
|  | (QRIS, VA, Webhook)|  | (Fonnte API, Auto) |  | (Modem RX/TX, WiFi)|  | GIS Map |  |
|  +--------------------+  +--------------------+  +--------------------+  +---------+  |
|                                                                                       |
|  +--------------------+  +--------------------+  +--------------------+  +---------+  |
|  | Field Service/PSB  |  | Payroll & HRM      |  | Referral & Partner |  | Reports |  |
|  | (Tickets, WorkOrder|  | (Attendance, Gaji) |  | (Wallet, Commission|  | Analytic|  |
|  +--------------------+  +--------------------+  +--------------------+  +---------+  |
+------------------------------------+--------------------------------------------------+
                                     |
                +--------------------+--------------------+
                |                                         |
                v                                         v
    +-----------------------+                 +-----------------------+
    | PostgreSQL 15 Database|                 |     Redis 7 Cache     |
    | (Port 5455 - Docker)  |                 | (Port 6379 - Docker)  |
    | Prisma ORM Schema     |                 | Session, Rate-limit,  |
    | Multi-tenant Sebilling|                 | Queue & Pub/Sub       |
    +-----------------------+                 +-----------------------+
```

---

## 2. Port Allocation & Network Matrix

| Service | Technology | Port | Purpose |
| :--- | :--- | :--- | :--- |
| **Web Admin Panel** | Next.js 14 | `3217` | Panel administrasi ISP utama (Billing, Pelanggan, Jaringan) |
| **Backend API** | NestJS 10 | `3218` | Core REST API, business logic, automasi cron |
| **Customer Portal** | Next.js 14 | `3001` | Portal mandiri pelanggan (cek tagihan, bayar, tiket) |
| **PostgreSQL Database**| Postgres 15 (Docker) | `5455` | Primary relational database (`sebilling-postgres`) |
| **Redis Cache / Queue**| Redis 7 (Docker) | `6379` | Fast in-memory cache, background queues (`sebilling-redis`) |
| **Prisma Studio** | Prisma CLI | `5555` | GUI visual inspeksi data database (opsional) |
| **FreeRADIUS Auth/Acct**| FreeRADIUS daemon | `1812/1813` | Autentikasi PPPoE & Hotspot NAS Mikrotik |
| **Android Emulator** | QEMU / AVD `ISP` | `5554/5555` | Lingkungan runtime uji coba Flutter & Expo mobile |

---

## 3. Directory & Monorepo Structure

```text
f:\AUDIRA-NET-BILLING\
├── AUDIRA-BILLING/                        # Sub-sistem Web & Billing API
│   ├── apps/
│   │   ├── backend/                      # NestJS 10 REST API Server
│   │   │   ├── src/                      # Controllers, Services, Modules, Filters
│   │   │   ├── prisma/                   # schema.prisma, migrations, seed
│   │   │   └── .env                      # PORT=3218, DATABASE_URL, REDIS, JWT_SECRET
│   │   ├── frontend/                     # Next.js 14 Web Admin Portal
│   │   │   ├── src/pages/                # Pages router: dashboard, billing, invoice, mikrotik...
│   │   │   ├── src/components/           # Layout, Sidebar, Navbar, Tables, Modals
│   │   │   └── package.json              # dev: next dev -p 3217
│   │   ├── customer-portal/              # Next.js 14 Customer Portal
│   │   └── mobile/                       # React Native (Expo SDK 50) mobile app
│   ├── docker-compose.yml                # sebilling-postgres & sebilling-redis
│   ├── start.bat                         # Quick launcher for Billing system
│   ├── start-servers.bat                 # Comprehensive batch starter
│   └── stop-servers.bat                  # Port cleanup utility
│
├── AUDIRA-NET/                            # Sub-sistem Mobile Native (Flutter)
│   ├── lib/
│   │   ├── main.dart                     # Entry point & Firebase init
│   │   ├── config/                       # Routes & constants
│   │   ├── screens/                      # Login, Dashboard, Field Service, Maps
│   │   ├── services/                     # Auth, Firestore, Notifications, GPS
│   │   └── utils/                        # Theme, seeding helpers
│   ├── android/                          # Gradle wrapper, build.gradle.kts
│   └── pubspec.yaml                      # Flutter dependencies
│
└── .agents/                              # AI Agent Central Governance Hub
```

---

## 4. Key Workflows & Automation Pipelines

### 4.1 Siklus Penagihan Otomatis (Zero-Touch Billing Cycle)
1. **Faktur Terbit**: Cron job NestJS menghasilkan invoice secara terjadwal sesuai siklus pelanggan (1st of month atau prorata).
2. **Pengingat WhatsApp**: Fonnte WhatsApp API otomatis mengirimkan rincian tagihan beserta link pembayaran Midtrans/QRIS.
3. **Isolir Otomatis**: Jika melewati jatuh tempo tanpa pembayaran, backend menginstruksikan MikroTik/RADIUS untuk mengubah profil ke walled-garden isolir dan memutus sesi aktif (CoA Disconnect).
4. **Bayar Langsung Pulih**: Ketika webhook pembayaran (Midtrans/Manual) diterima, status diubah menjadi `PAID`, sesi isolir diputus, dan profil internet normal seketika diaktifkan kembali.
5. **Kredit Komisi Mitra Sales**: Begitu pembayaran invoice pertama pelanggan baru terkonfirmasi, komisi mitra sales otomatis masuk ke dompet digital sales.
