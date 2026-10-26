# SYSTEM ARCHITECTURE — AUDIRA-NET & BILLING ECOSYSTEM

> Monorepo Topology, Microservices Communication, Port Map, and Database Stack.  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. High-Level Architecture

```text
                               +----------------------------------------+
                               |              Clients Layer             |
                               +----------------------------------------+
                                 |                  |                 |
                   Port 3217     |      Port 3001   |    Android App  |
                       v         |          v       |          v      |
                 +---------------+  +---------------+  +--------------+
                 | AUDIRA Admin  |  |Customer Portal|  | AUDIRANET App|
                 | (Next.js 14)  |  | (Next.js 14)  |  |  (Flutter)   |
                 +---------------+  +---------------+  +--------------+
                         \                  |                 /
                          \                 |                /
                           v                v               v
+---------------------------------------------------------------------------------------+
|                    AUDIRA BACKEND SERVER (NestJS 10 - Port 3218)                      |
|                                                                                       |
|  - AuthModule (JWT, Refresh Token, Role Guards: ADMIN, BILLING, CS, NOC, TECH)        |
|  - PelangganModule & CustomerModule (Lifecycle, status, packages)                     |
|  - InvoiceModule & BillingModule (Auto-generate, prorata, due dates)                  |
|  - PaymentModule (Midtrans QRIS, VA, E-Wallet, webhook handler)                       |
|  - MikrotikModule (RouterOS API client, PPPoE secrets, isolated profiles)             |
|  - RadiusModule (FreeRADIUS CoA disconnect, session accounting)                       |
|  - GenieacsModule (TR-069 ACS client, optical RX/TX telemetry, WiFi config)           |
|  - WhatsAppModule (Fonnte API integration, automated templates)                       |
|  - FieldServiceModule & TicketModule (PSB installations, trouble tickets)             |
|  - ReferralModule (Referral codes, sales partner wallet, commission)                  |
|  - EmployeeModule & SalaryModule (HRM, attendance, technician PSB bonuses)            |
|  - ReportsModule & AnalyticsModule (Revenue, churn, tax reports)                      |
+---------------------------------------------------------------------------------------+
                           |                               |
                           v                               v
              +-------------------------+     +-------------------------+
              |   PostgreSQL 15 (Docker)|     |      Redis 7 (Docker)   |
              |   Port 5455             |     |      Port 6379          |
              |   Container:            |     |      Container:         |
              |   sebilling-postgres    |     |      sebilling-redis    |
              +-------------------------+     +-------------------------+
```

---

## 2. Port Map & Network Specifications

- **Frontend Web Admin**: `http://localhost:3217`
- **Backend REST API**: `http://localhost:3218`
- **Customer Self-Service Portal**: `http://localhost:3001`
- **PostgreSQL Database**: `localhost:5455` (User: `audira`, DB: `sebilling`)
- **Redis Cache**: `localhost:6379`
- **FreeRADIUS Server**: `localhost:1812` (Auth), `localhost:1813` (Acct)
- **Android Emulator**: Khusus AVD bernama **`ISP`** (Deteksi dinamis via `adb emu avd name | findstr /V /I "^OK"`). Dilarang menyentuh emulator `MDA` atau `DC` milik proyek lain.

