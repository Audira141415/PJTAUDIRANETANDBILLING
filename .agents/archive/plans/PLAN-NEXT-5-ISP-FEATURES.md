# 🚀 MASTER IMPLEMENTATION PLAN — NEXT 5 ADVANCED ISP FEATURES
> **Module ID:** `AUDIRA-PLAN-ADVANCED-5`  
> **Target Environment:** AUDIRA-NET-BILLING (Next.js 14, NestJS 10, Prisma PostgreSQL, FreeRADIUS, GenieACS, Fonnte WA, Telegram Bot API)  
> **Author & Lead Architect:** Agus Dwi Rianto (AUDIRA)  
> **Status:** APPROVED & READY FOR STAGED EXECUTION  

---

## 🔍 HASIL AUDIT KODE SEBELUM IMPLEMENTASI (GAP ANALYSIS)

Sebelum memulai pengerjaan, tim agen telah melakukan audit kode secara mendalam di seluruh repositori:

| No | Fitur yang Diadopsi | Apa yang Sudah Ada di Sistem? | Apa yang Belum Ada (GAP)? | Kesimpulan Status |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **WhatsApp Self-Service Bot 24/7** | Outbound 1-arah: Notifikasi tagihan, bukti bayar, & pengingat via Fonnte (`whatsapp.service.ts`) | **Belum ada Inbound Webhook**: Tidak ada parser pesan masuk pelanggan, menu interaktif angka/keyword, auto-generate QRIS Midtrans di chat WA, dan integrasi perintah cek redaman / reboot TR-069 via chat. | 🟡 **Sebagian Ada (Hanya Outbound)** |
| **2** | **Turbo Bandwidth Booster (Add-On)** | Primitif teknis CoA `changeBandwidth()` di `radius.service.ts` | **Belum ada Model Bisnis**: Tidak ada model Prisma `BoosterPackage`, pembelian via QRIS on-demand, cron auto-revert kecepatan setelah durasi (6/24/48 jam) habis, dan UI katalog booster. | 🟡 **Hanya Primitif Jaringan** |
| **3** | **Telegram NOC Bot & Mass Outage Detector** | Belum ada sama sekali kode Telegram di backend | **Belum ada Bot Telegram**: Tidak ada alert mass outage (kabel FO putus jika ≥5 pelanggan di ODP sama drop serentak) dan tidak ada CLI bot untuk tim teknisi lapangan (`/ping`, `/redaman`, `/kick`). | 🔴 **0% (Belum Ada)** |
| **4** | **Kolektor Lapangan (Door-to-Door Cash)** | `FieldService` hanya mencatat SPK teknisi (pasang baru / perbaikan kabel) | **Belum ada Penagihan Kas**: Tidak ada rute penagihan door-to-door per ODP/klaster, penerimaan tunai instan + cetak thermal bluetooth di tempat + auto unblock, dan rekonsiliasi setoran kas harian kolektor. | 🔴 **0% (Belum Ada)** |
| **5** | **OLT Auto-Discovery & Zero-Touch ONU** | GenieACS TR-069 hanya mengontrol CPE modem pelanggan dari sisi IP | **Belum ada Layer OLT**: Tidak ada model OLT (ZTE, Huawei, VSOL), polling Unregistered ONU di port PON via SNMP/CLI, dan auto-binding profile VLAN/TCONT/GEMPORT. | 🔴 **0% (Belum Ada)** |

---

## 🗺️ Roadmap Eksekusi 5 Fase Bertahap

```mermaid
graph TD
    subgraph Fase 1: Customer Self-Service Automation
        A1[Fonnte WhatsApp Webhook Endpoint] --> A2[Keyword & Menu Intent Router]
        A2 --> A3[Interactive Actions: Tagihan, QRIS, Redaman dBm, Reboot ONT]
    end

    subgraph Fase 2: Revenue Monetization (On-Demand Add-on)
        B1[Model Prisma: BoosterPackage & CustomerBooster] --> B2[Instant Purchase via Midtrans QRIS]
        B2 --> B3[RADIUS CoA Speed Boost + Auto-Revert Cron Scheduler]
    end

    subgraph Fase 3: Proactive NOC & Outage Intelligence
        C1[Telegram Bot Gateway & Auth] --> C2[Real-Time Outage Correlation Engine]
        C2 --> C3[Field Technician Commands: Ping, Redaman, Kick Session]
    end

    subgraph Fase 4: Offline Cash Collection & Field Reconciliation
        D1[Rute Penagihan Tagihan per Klaster ODP] --> D2[Penerimaan Tunai + Struk Thermal Bluetooth]
        D2 --> D3[Rekonsiliasi Kas Kolektor & Serah Terima Setoran]
    end

    subgraph Fase 5: Fiber Core OLT Provisioning
        E1[Model OLT Chassis & SNMP Engine] --> E2[Unregistered ONU Auto-Discovery Poller]
        E2 --> E3[Zero-Touch ONU Register & VLAN Profile Binding]
    end

    A3 --> B1
    B3 --> C1
    C3 --> D1
    D3 --> E1
```

---

## 🛠️ Rincian Teknis per Fase

### 🔹 FASE 1: WhatsApp Self-Service Bot 24/7 (Interactive Customer Care)
* **Tujuan**: Mengurangi 80% tiket pertanyaan rutin CS dengan bot interaktif 24 jam.
* **Arsitektur**:
  1. `apps/backend/src/whatsapp/whatsapp.controller.ts`:
     - Tambahkan route `POST /whatsapp/webhook` (bebas dari JWT Guard karena dipanggil oleh server Fonnte).
  2. `apps/backend/src/whatsapp/whatsapp-bot.service.ts`:
     - Identifikasi nomor telepon pengirim ➔ Cocokkan dengan data `Customer` di database.
     - State machine percakapan (Menu Utama, Submenu Tagihan, Submenu Teknis).
     - Response menu interaktif:
       * `1` ➔ Cek Tagihan Aktif & Kirim Link QRIS Bayar Instan.
       * `2` ➔ Cek Kesehatan Internet (IP PPPoE, Uptime, Redaman RX Power dBm via GenieACS).
       * `3` ➔ Perintah Restart Modem Pelanggan (Reboot via TR-069).
       * `4` ➔ Ganti Sandi WiFi Mandiri (Bot verifikasi OTP/identitas ➔ push sandi baru ke ONT).
       * `0` ➔ Sambungkan ke Admin / CS Manusia (Pemberitahuan ke Web Admin).

---

### 🔹 FASE 2: Turbo Bandwidth Booster (Add-On Speed on Demand)
* **Tujuan**: Sumber pemasukan kas baru dengan menjual percepatan bandwidth sementara.
* **Arsitektur**:
  1. `apps/backend/prisma/schema.prisma`:
     ```prisma
     model BoosterPackage {
       id          String   @id @default(uuid())
       name        String   // Misal: Turbo 50 Mbps (24 Jam)
       speed       String   // 50M/50M
       duration    Int      // Durasi dalam jam
       price       Int      // Rp 15.000
       isActive    Boolean  @default(true)
       boosters    CustomerBooster[]
     }

     model CustomerBooster {
       id          String         @id @default(uuid())
       customerId  String
       customer    Customer       @relation(fields: [customerId], references: [id])
       packageId   String
       package     BoosterPackage @relation(fields: [packageId], references: [id])
       originalSpeed String       // Speed awal untuk revert
       startedAt   DateTime       @default(now())
       expiresAt   DateTime
       status      String         @default("ACTIVE") // ACTIVE, EXPIRED
     }
     ```
  2. `apps/backend/src/billing/booster.service.ts`:
     - Aktivasi instan: Kirim RADIUS CoA Bandwidth Rate-Limit (`50M/50M`).
     - Cron scheduler setiap 15 menit: Cari booster yang `expiresAt < now()` ➔ revert kecepatan pelanggan ke paket asli via RADIUS CoA.
  3. `apps/frontend/src/pages/pelanggan/booster.tsx`: UI katalog pembelian booster bagi admin & pelanggan.

---

### 🔹 FASE 3: Telegram Bot NOC & Mass Outage Auto-Detector
* **Tujuan**: Deteksi proaktif kabel fiber putus sebelum ribuan pelanggan menelepon komplain.
* **Arsitektur**:
  1. `apps/backend/src/monitoring/telegram-noc.service.ts`:
     - Integrasi Telegram Bot API (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_NOC_CHAT_ID`).
  2. `apps/backend/src/monitoring/outage-detector.service.ts`:
     - Sensor korelasi ODP: Mengecek status sesi PPPoE setiap 60 detik.
     - Jika dalam 1 ODP terdapat ≥ 3 pelanggan offline bersamaan dalam jendela 2 menit ➔ Otomatis kirim alert Telegram:
       > 🚨 **PERINGATAN GANGGUAN MASSAL (POTENSI KABEL PUTUS)**  
       > **ODP Terkait**: ODP-MRD-01 (Jl. Merdeka)  
       > **Dampak**: 12 Pelanggan terputus serentak  
       > **Waktu**: 21-Okt-2026 23:15:00 WIB  
       > **Rekomendasi**: Periksa tiang T-42 atau jalur feeder ODC ke ODP.
  3. **Telegram Commands Handler**:
     - `/ping <ip>`: Ping langsung dari server core.
     - `/redaman <no_internet>`: Cek nilai dBm ONT via GenieACS.
     - `/kick <username>`: Eksekusi CoA disconnect sesi aktif.

---

### 🔹 FASE 4: Kolektor Lapangan & Kasir Keliling (Door-to-Door Cash Collection)
* **Tujuan**: Memfasilitasi pembayaran tunai di rumah pelanggan dengan pencatatan digital real-time dan anti-fraud.
* **Arsitektur**:
  1. `apps/backend/prisma/schema.prisma`:
     ```prisma
     model CollectorShift {
       id            String    @id @default(uuid())
       collectorId   String
       collectorName String
       date          DateTime  @default(now())
       totalCollected Float    @default(0)
       isHandedOver  Boolean   @default(false)
       handoverNotes String?
       payments      Transaction[]
     }
     ```
  2. `apps/backend/src/billing/collector.service.ts`:
     - Rute penagihan per klaster ODP (Daftar invoice overdue yang lokasinya berdekatan).
     - Pembayaran tunai di tempat: Langsung update status invoice ke `PAID` ➔ auto-unblock via CoA ➔ kirim WhatsApp tanda terima ke pelanggan.
     - Rekonsiliasi kas: Admin kantor memverifikasi jumlah uang fisik yang disetorkan sebelum shift ditutup.
  3. `apps/frontend/src/pages/kolektor.tsx`: Tampilan responsif mobile untuk petugas keliling dengan tombol cetak struk thermal bluetooth (58mm).

---

### 🔹 FASE 5: OLT Auto-Discovery & Zero-Touch ONU Provisioning (ZTE / Huawei / VSOL)
* **Tujuan**: Aktivasi modem pasang baru dalam 60 detik langsung dari web admin tanpa buka terminal OLT manual.
* **Arsitektur**:
  1. `apps/backend/prisma/schema.prisma`:
     ```prisma
     model OltDevice {
       id        String   @id @default(uuid())
       name      String   // Misal: OLT-ZTE-C320-Pusat
       brand     String   // ZTE, HUAWEI, VSOL, HIOSO
       ipAddress String
       snmpPort  Int      @default(161)
       telnetPort Int     @default(23)
       username  String
       password  String
       ponCount  Int      @default(8)
     }
     ```
  2. `apps/backend/src/olt/olt.service.ts`:
     - Polling periodik port PON untuk mendeteksi `Unregistered ONU / Serial Number baru`.
     - One-Click Register ONU:
       - Kirim template script registrasi via Telnet/SSH: Set TCONT, GEMPORT, VLAN ID, dan Service Profile.
       - Tautkan Serial Number modem ke Customer di database.
  3. `apps/frontend/src/pages/infrastruktur/olt.tsx`: Dashboard monitoring OLT dan modal one-click provisioning.

---

## 📅 Rencana Eksekusi Bertahap (STATUS: 100% SELESAI & TERVERIFIKASI)

| Fase | Fitur | Status | Bukti Pengujian & Hasil |
| :---: | :--- | :---: | :--- |
| **Fase 1** | **WhatsApp Self-Service Bot 24/7** | 🟢 **100% SELESAI** | Webhook `POST /whatsapp/webhook`, state machine interaktif (Menu 1-4, 0), normalisasi nomor HP, cek tagihan QRIS, cek redaman dBm TR-069 via GenieACS, reboot ONT, dan ubah sandi WiFi via chat. Terverifikasi 6 skenario live. |
| **Fase 2** | **Turbo Bandwidth Booster** | 🟢 **100% SELESAI** | Model DB `BoosterPackage` (4 paket auto-seeded) & `CustomerBooster`. On-demand speed boost via RADIUS CoA, 10-minute auto-revert cron, notifikasi WA aktivasi, UI `/booster` (HTTP 200). Terverifikasi `INT002` boosted ke 50 Mbps. |
| **Fase 3** | **Telegram NOC Bot & Outage Detector** | 🟢 **100% SELESAI** | Bot CLI commands (`/status`, `/ping`, `/redaman`, `/kick`, `/reboot`), mass outage detector cron (`*/2 * * * *`) deteksi korelasi putus serentak per ODP, terminal console web `/noc` (HTTP 200). Terverifikasi live. |
| **Fase 4** | **Kolektor Lapangan Door-to-Door** | 🟢 **100% SELESAI** | Model DB `CollectorShift`, rute penagihan per klaster ODP, bayar tunai di tempat + kirim tanda terima WA + auto-unblock via RADIUS CoA + serah terima kas + cetak thermal receipt 58mm di `/kolektor` (HTTP 200). Terverifikasi live. |
| **Fase 5** | **OLT Auto-Discovery & Zero-Touch ONU** | 🟢 **100% SELESAI** | Model DB `OltDevice` & `OltOnu` (auto-seeded ZTE C320 & VSOL V1600G), deteksi modem unregistered di port PON, generator script CLI vendor ZTE/Huawei/VSOL, one-click binding di `/infrastruktur/olt` (HTTP 200). Terverifikasi registrasi `ZTEGC89A2140` ke OLT-ZTE-C320-Pusat Port 1/1/2:1. |

