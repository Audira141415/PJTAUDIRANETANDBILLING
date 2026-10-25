# ENVIRONMENT & SECRETS REFERENCE — AUDIRA-NET & BILLING
> **Knowledge Module ID**: `BRAIN-ENV-01`  
> **Status**: ACTIVE SSOT  
> **Scope**: Konfigurasi Lingkungan, Variabel `.env`, Port Spesifikasi, & Higienitas Secrets.

---

## 1. Pemetaan Variabel Lingkungan (`apps/backend/.env`)

| Variabel | Tujuan / Penggunaan | Format / Contoh Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | Koneksi Prisma ke PostgreSQL Docker | `postgresql://audira:audirapassword@localhost:5455/sebilling?schema=public` |
| `REDIS_HOST` | Host Redis cache | `localhost` |
| `REDIS_PORT` | Port Redis cache | `6379` |
| `PORT` | Port server Backend NestJS | `3218` |
| `JWT_SECRET` | Secret key penandatangan token JWT | String hash aman (256-bit) |
| `FRONTEND_URL` | Origin web admin yang diizinkan CORS | `http://localhost:3217` |
| `CUSTOMER_PORTAL_URL`| Origin customer portal yang diizinkan CORS | `http://localhost:3001` |
| `FONNTE_API_URL` | Endpoint gateway WhatsApp Fonnte | `https://api.fonnte.com/send` |
| `FONNTE_API_TOKEN` | Token akun WhatsApp Fonnte | String token |
| `MIDTRANS_SERVER_KEY`| Server key Midtrans payment gateway | `SB-Mid-server-...` / Prod key |
| `MIDTRANS_CLIENT_KEY`| Client key Midtrans frontend | `SB-Mid-client-...` / Prod key |
| `MIDTRANS_IS_PRODUCTION`| Status environment Midtrans | `false` (sandbox) / `true` (live) |

---

## 2. Multi-Port Specification

Dalam workstation developer AUDIRA, port dialokasikan secara ketat:
* **Port `3217`**: Next.js Web Admin Panel (`apps/frontend`). Dijalankan via `start.bat`.
* **Port `3218`**: NestJS Core Backend API (`apps/backend`). Dijalankan via `start.bat`.
* **Port `3001`**: Customer Self-Service Portal (`apps/customer-portal`).
* **Port `5455`**: PostgreSQL 15 Database (Docker: `sebilling-postgres`).
* **Port `6379`**: Redis 7 Cache & Queue (Docker: `sebilling-redis`).
* **Port `5555`**: Prisma Studio (inspeksi database visual via `pnpm run prisma:studio`).

---

## 3. Protokol Keamanan & Pencegahan Kebocoran (Hygiene)

1. **File `.env` Terisolasi**:
   - File `.env` dan `.env.local` WAJIB terdaftar di `.gitignore`.
   - Dilarang keras melakukan commit kredensial password, secret token, atau connection string produksi ke Git.
2. **Kredensial MikroTik**:
   - Password RouterOS MikroTik disimpan terenkripsi dan tidak boleh dikirimkan secara terbuka ke frontend client.
