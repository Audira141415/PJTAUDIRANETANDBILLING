# DEPLOYMENT — AUDIRA-NET & BILLING ECOSYSTEM

> Local Environment, Port Allocation, Docker Setup, and Production Deployment Guide.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. System Requirements & Prerequisites

- **Operating System**: Windows 11 / 10 (or Ubuntu Server 22.04 LTS for production)
- **Node.js**: v20.x or v22.x LTS
- **Package Managers**: `pnpm` (v9.x) for Backend, `npm` for Frontend
- **Database Engine**: PostgreSQL 15 & Redis 7 (via Docker Desktop)
- **Mobile Toolchain**:
  - Flutter SDK 3.32+ / 3.44+
  - Android SDK (API 34/35/36, Build-Tools 35.0.0)
  - Android Emulator (AVD `ISP` on Google Pixel 8 Pro image)

---

## 2. Multi-Port Allocation Matrix

Pastikan port-port berikut tidak bentrok dengan aplikasi lain:

| Port | Service Name | Directory / Container | Method |
| :--- | :--- | :--- | :--- |
| **`3217`** | AUDIRA Web Admin | `AUDIRA-BILLING/apps/frontend` | `npm run dev` (`next dev -p 3217`) |
| **`3218`** | AUDIRA Backend API | `AUDIRA-BILLING/apps/backend` | `pnpm run dev` (`nest start --watch`) |
| **`3001`** | Customer Self-Service | `AUDIRA-BILLING/apps/customer-portal` | `npm run dev` (`next dev -p 3001`) |
| **`5455`** | PostgreSQL 15 | Container `sebilling-postgres` | `docker-compose up -d` |
| **`6379`** | Redis 7 Cache | Container `sebilling-redis` | `docker-compose up -d` |
| **`5554-5558`** | Android Emulator | Device AVD `ISP` (Deteksi Otomatis via `emu avd name`) | `start_app.bat` |

---

## 3. Langkah Menjalankan Aplikasi Secara Lokal (Development)

### Langkah 1: Jalankan Database Docker
```powershell
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING
docker-compose up -d
```
Pastikan kontainer `sebilling-postgres` (port 5455) dan `sebilling-redis` (port 6379) berstatus `Up`.

### Langkah 2: Jalankan Server Web & Backend
Cukup jalankan satu perintah:
```powershell
cd f:\AUDIRA-NET-BILLING
.\start.bat
```
Skrip ini akan otomatis:
1. Memeriksa ketersediaan Docker & PostgreSQL.
2. Membuka terminal Backend di Port 3218.
3. Membuka terminal Frontend di Port 3217.
4. Membuka browser pada alamat `http://localhost:3217`.

### Langkah 3: Jalankan Aplikasi Mobile (Flutter) di Emulator ISP
Cukup jalankan peluncur khusus yang otomatis mengisolasi ke AVD `ISP`:
```powershell
cd f:\AUDIRA-NET-BILLING
.\start_app.bat
```
*Catatan: Skrip akan otomatis mengabaikan emulator `MDA` dan `DC` milik proyek lain, melakukan reverse port forwarding `3218`, dan menyalakan Flutter run.*


---

## 4. Menghentikan Server
Untuk mematikan semua service yang berjalan di port 3217 dan 3218 secara bersih:
```powershell
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING
.\stop-servers.bat
```

---

## 5. Git Synchronization Workflow
Gunakan skrip `save.bat` untuk menyimpan perubahan, melakukan build sanity check, dan sinkronisasi ke repositori GitHub:
```powershell
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING
.\save.bat "deskripsi perubahan fitur"
```
