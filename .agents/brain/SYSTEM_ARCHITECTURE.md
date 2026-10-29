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

---

## 3. Advanced BSS/OSS ISP Subsystems (Port 3217 Web Admin)

1. **IPAM & CGNAT Forensics Engine** (`/infrastruktur/ipam`):
   - Alokasi Subnetting IPv4/IPv6 (Public Pool, CGNAT RFC 6598 `100.64.0.0/10`, Dedicated Subnet `/29`–`/30`).
   - Forensik Investigasi Hukum (Bareskrim / Kominfo): Pencocokan cepat `Public IP + Port + Timestamp` ke identitas pelanggan dan riwayat sesi PPPoE.

2. **Live MRTG & Uplink Capacity Monitor** (`/infrastruktur/traffic`):
   - Telemetri real-time 1s–5m antarmuka Uplink (Tier-1 IP Transit, OpenIXP, IIX APJII, CDIX, OLT Trunk).
   - Indikator kapasitas Peak Hour (Pukul 19:00 - 22:30 WIB) & Peringatan Ambang Batas 85%–95% utilisasi.
   - Formula kalkulasi tagihan 95th Percentile Burstable Billing.

3. **Kalkulator Jarak Putus Fiber OTDR & Core Splicing Matrix** (`/infrastruktur/otdr`):
   - Proyeksi titik putus serat optik dari tembakan OTDR (dalam satuan meter) ke polyline rute kabel di GIS Map.
   - Visualisasi kode warna 12/24/48 Core standar TIA-598 (Tube & Core matrix status).

4. **Mesin Janji Bayar & Dispensasi Isolir Sementara 24/48 Jam (Grace Period Engine)** (`/pelanggan/suspend`):
   - Alur kerja dispensasi isolir tunggakan tagihan: Pembukaan internet sementara (24 jam, 48 jam, 72 jam, kustom) terintegrasi database PostgreSQL.
   - Autonomous FreeRADIUS CoA & MikroTik Kick Session: Memulihkan sesi internet pelanggan dalam < 2 detik tanpa restart modem atau kunjungan teknisi.
   - BillingCronService (interval 30 menit): Evaluasi otomatis kedaluwarsa komitmen janji bayar, re-isolir bagi penunggak belum lunas, serta integrasi pengiriman WhatsApp konfirmasi & peringatan.



