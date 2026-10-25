# MASTER IMPLEMENTATION PLAN — SALES PARTNER & REFERRAL WALLET SYSTEM
> **Module ID:** `AUDIRA-PLAN-SALES-01`  
> **Inspired by:** KelolaNet Sales & Partner Architecture  
> **Target Environment:** AUDIRA-BILLING (Next.js 14 Web Admin & NestJS 10 API + Prisma PostgreSQL)  
> **Status:** APPROVED FOR EXECUTION  
> **Author & Lead Architect:** Agus Dwi Rianto (AUDIRA)  

---

## 📌 1. Latar Belakang & Tujuan Arsitektural

Sistem penagihan dan operasional ISP **AUDIRA** saat ini telah memiliki manajemen pelanggan, billing, router MikroTik, dan laporan penjualan internal. Namun, untuk mempercepat akuisisi pelanggan baru di lapangan (*grassroots growth*), AUDIRA membutuhkan ekosistem **Mitra Sales Luar / Freelance Agent & Referral** yang mandiri:

1. **Pemisahan Entitas**: Mitra sales luar bukan karyawan (tidak digaji via slip gaji bulanan), melainkan dibayar berbasis hasil instalasi (PSB) via **Dompet Digital (E-Wallet)**.
2. **Pendaftaran Mandiri Terbuka (`/sales/daftar`)**: Memudahkan rekrutmen agen lokal (pemuda RT/RW, konter pulsa, teknisi freelance).
3. **Pencegahan Fraud (Anti-Fraud Guard)**: Komisi baru masuk ke saldo *Available* setelah pelanggan berhasil dipasang dan invoice pertama lunas terbayar.
4. **Alur Pencairan Transparan (Withdrawal Workflow)**: Pengajuan tarik dana oleh sales, persetujuan oleh Finance/Admin, dan bukti transfer.

---

## 🧱 2. Perubahan Skema Database (Prisma Schema)

Tambahkan 3 model baru dan 1 relasi pada model `Package` di `AUDIRA-BILLING/apps/backend/prisma/schema.prisma`:

```prisma
// ─── 1. Mitra Sales Luar / Freelance Partner ───
model SalesPartner {
  id              String               @id @default(uuid())
  code            String               @unique // Kode referral unik (misal: AGUS01)
  name            String
  phone           String               @unique // Nomor WhatsApp aktif
  email           String?              @unique
  password        String               // Hashed password untuk login portal mitra
  zone            String?              // Wilayah cover (misal: Batam Kota, Sekupang)
  bio             String?
  status          String               @default("PENDING") // PENDING, ACTIVE, SUSPENDED
  balance         Float                @default(0) // Saldo aktif yang bisa ditarik
  pendingBalance  Float                @default(0) // Saldo komisi menunggu invoice lunas
  bankName        String?              // Nama Bank / E-Wallet (BCA, Mandiri, DANA, GoPay)
  bankAccount     String?              // Nomor Rekening / Nomor HP E-Wallet
  bankAccountName String?              // Nama Pemilik Rekening
  createdAt       DateTime             @default(now())
  updatedAt       DateTime             @updatedAt
  
  commissions     CommissionLedger[]
  withdrawals     WithdrawalRequest[]
  leads           Customer[]           @relation("SalesPartnerCustomers")

  @@map("sales_partners")
}

// ─── 2. Buku Kas Mutasi Komisi (Commission Ledger) ───
model CommissionLedger {
  id              String        @id @default(uuid())
  salesPartnerId  String
  salesPartner    SalesPartner  @relation(fields: [salesPartnerId], references: [id])
  customerId      String?
  packageId       String?
  invoiceId       String?
  type            String        // CREDIT_PSB, CREDIT_RECURRING, DEBIT_WITHDRAW, ADJUSTMENT
  amount          Float
  status          String        @default("AVAILABLE") // HELD, AVAILABLE, PAID, CANCELLED
  description     String
  createdAt       DateTime      @default(now())

  @@map("commission_ledgers")
}

// ─── 3. Permintaan Pencairan Saldo (Withdrawal Request) ───
model WithdrawalRequest {
  id              String        @id @default(uuid())
  salesPartnerId  String
  salesPartner    SalesPartner  @relation(fields: [salesPartnerId], references: [id])
  amount          Float
  bankName        String
  bankAccount     String
  bankAccountName String
  status          String        @default("PENDING") // PENDING, APPROVED, REJECTED
  transferReceipt String?       // URL foto/bukti transfer
  notes           String?
  approvedBy      String?       // User ID Admin yang memproses
  approvedAt      DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@map("withdrawal_requests")
}
```

Modifikasi model `Package` & `Customer`:
```prisma
// Di model Package:
salesCommission Float @default(0) // Besaran bonus komisi PSB (Rp)

// Di model Customer:
salesPartnerId  String?
salesPartner    SalesPartner? @relation("SalesPartnerCustomers", fields: [salesPartnerId], references: [id])
```

---

## 🔌 3. Endpoint API Backend (NestJS 10)

Buat modul baru `SalesModule` di `apps/backend/src/sales/`:

| Method | Endpoint | Auth Guard | Fungsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/sales/register` | Publik | Pendaftaran mandiri mitra sales baru |
| `POST` | `/api/sales/login` | Publik | Login mitra sales ke portal mitra |
| `GET` | `/api/sales/partner/me` | JWT (Partner) | Profil, saldo dompet, link referral mitra |
| `GET` | `/api/sales/partner/leads` | JWT (Partner) | Daftar pelanggan yang dibawa mitra & statusnya |
| `POST` | `/api/sales/partner/withdraw`| JWT (Partner) | Pengajuan pencairan saldo dompet |
| `GET` | `/api/admin/sales/stats` | JWT (Admin) | KPI Dashboard (Menunggu, Penarikan, Aktif, Saldo) |
| `GET` | `/api/admin/sales/partners` | JWT (Admin) | List semua mitra sales & filter status |
| `PATCH`| `/api/admin/sales/partners/:id` | JWT (Admin) | Approve, Suspend, atau Update data mitra |
| `GET` | `/api/admin/sales/withdrawals` | JWT (Admin) | List pengajuan pencairan dana |
| `POST` | `/api/admin/sales/withdrawals/:id/approve` | JWT (Admin) | Konfirmasi transfer payout & upload bukti |
| `POST` | `/api/admin/sales/withdrawals/:id/reject` | JWT (Admin) | Tolak payout (saldo dikembalikan ke dompet) |

---

## 💻 4. Antarmuka Pengguna Frontend (Next.js 14)

### 4.1 Halaman Publik Pendaftaran Mitra (`/sales/daftar`)
- **Desain**: Form modern bergaya AUDIRA Digital Network dengan kartu floating.
- **Input**:
  - Nama Lengkap (wajib)
  - No. WhatsApp (wajib, divalidasi format Indonesia `08...` atau `628...`)
  - Email (opsional)
  - Wilayah Operasional (dropdown kecamatan/area atau text)
  - Kata Sandi & Konfirmasi Sandi
  - Info Pengalaman / Rekening Bank untuk pencairan komisi kelak.
- **Feedback**: Pesan sukses instan + tombol langsung hubungi Admin via WhatsApp.

### 4.2 Halaman Panel Admin Sales (`/admin/sales`)
- **Tampilan Header**:
  - Kotak Tautan Pendaftaran: `/sales/daftar` dengan tombol `[Salin]`, `[Bagikan ke WhatsApp]`, `[Buka]`.
- **4 KPI Cards**:
  1. `Menunggu Konfirmasi` (Badge kuning, counter pendaftaran baru).
  2. `Penarikan Menunggu` (Badge merah/oranye, counter withdraw pending).
  3. `Sales Aktif` (Badge hijau, counter mitra aktif).
  4. `Total Saldo Tertahan` (Nominal Rp komisi di dompet yang belum cair).
- **Tab Navigasi**:
  - **Tab 1: Mitra Sales**: Tabel daftar sales (Kode, Nama, WhatsApp, Wilayah, Total Pelanggan, Saldo, Status).
  - **Tab 2: Persetujuan Pendaftaran**: Tabel calon sales pending verifikasi dengan tombol `[Setujui]` & `[Tolak]`.
  - **Tab 3: Pencairan Saldo (Payout)**: Tabel permintaan withdraw dengan detail Bank/E-Wallet, nominal, tombol `[Proses Transfer]` & input bukti transfer.
  - **Tab 4: Riwayat Mutasi (Ledger)**: Histori komisi keluar/masuk secara transparan.

### 4.3 Navigasi Sidebar Admin (`apps/frontend/src/components/Sidebar.tsx`)
Tambahkan item menu baru di grup `CRM` atau grup terdedikasi `Sales Partner`:
```tsx
{ 
  name: 'Sales & Partner', 
  href: '/admin/sales', 
  icon: Users, 
  roles: ['ADMIN', 'BILLING'],
  subItems: [
    { name: 'Dashboard Partner', href: '/admin/sales' },
    { name: 'Persetujuan Sales', href: '/admin/sales?tab=approval' },
    { name: 'Pencairan Komisi', href: '/admin/sales?tab=payout' },
    { name: 'Riwayat Komisi', href: '/admin/sales?tab=ledger' },
    { name: 'Tautan Pendaftaran', href: '/sales/daftar', isNew: true },
  ]
}
```

---

## ⚡ 5. Integrasi Otomasi Pembayaran & WhatsApp (Trigger Engine)

Di service invoice/pembayaran ([apps/backend/src/billing/](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/backend/src/billing/)):
1. **Hook Saat Invoice PSB Lunas**:
   ```typescript
   if (invoice.type === 'INSTALLATION' || isFirstPaidInvoice(invoice)) {
     const customer = await prisma.customer.findUnique({ where: { id: invoice.customerId } });
     if (customer.salesPartnerId) {
       const packageData = await prisma.package.findUnique({ where: { id: customer.packageId } });
       const commissionAmount = packageData?.salesCommission || 50000;
       
       // 1. Catat ke Ledger
       await prisma.commissionLedger.create({
         data: {
           salesPartnerId: customer.salesPartnerId,
           customerId: customer.id,
           packageId: customer.packageId,
           invoiceId: invoice.id,
           type: 'CREDIT_PSB',
           amount: commissionAmount,
           status: 'AVAILABLE',
           description: `Bonus PSB Pelanggan ${customer.name} (${packageData?.name || 'Paket Internet'})`
         }
       });

       // 2. Tambahkan Saldo Aktif Mitra
       const partner = await prisma.salesPartner.update({
         where: { id: customer.salesPartnerId },
         data: { balance: { increment: commissionAmount } }
       });

       // 3. Kirim Pesan WhatsApp Otomatis ke Mitra Sales
       await whatsAppService.sendMessage(
         partner.phone,
         `🎉 *KABAR GEMBIRA - KOMISI CAIR!*\n\n` +
         `Halo ${partner.name},\n` +
         `Pemasangan internet untuk pelanggan *${customer.name}* telah LUNAS.\n\n` +
         `💰 *Komisi Anda*: Rp ${commissionAmount.toLocaleString('id-ID')}\n` +
         `💵 *Total Saldo Dompet*: Rp ${(partner.balance).toLocaleString('id-ID')}\n\n` +
         `Terima kasih atas kerja keras Anda bersama AUDIRA Digital Network!`
       );
     }
   }
   ```

---

## 📅 6. Tahapan Eksekusi Bertahap (Rollout Phases)

| Tahap | Aktivitas | File Terlibat | Status |
| :--- | :--- | :--- | :--- |
| **Tahap 1** | **Database Schema & Prisma Migration** | `schema.prisma`, `prisma db push`, `prisma:generate` | ✅ Selesai |
| **Tahap 2** | **Backend Module `SalesModule`** | `sales.controller.ts`, `sales.service.ts`, DTOs | ✅ Selesai |
| **Tahap 3** | **Frontend Admin Panel `/admin/sales`** | `apps/frontend/src/pages/admin/sales.tsx` | ✅ Selesai |
| **Tahap 4** | **Frontend Public Form `/sales/daftar`** | `apps/frontend/src/pages/sales/daftar.tsx` | ✅ Selesai |
| **Tahap 5** | **Integrasi Sidebar & WhatsApp Trigger** | `Sidebar.tsx`, `billing.service.ts` | ✅ Selesai |
| **Tahap 6** | **Pengujian End-to-End & Verifikasi UI** | Node.js E2E lifecycle test & curl | ✅ Selesai |

---

## 🏆 7. Hasil Verifikasi End-to-End Lifecycle
1. **Registrasi Mandiri**: Endpoint `POST /sales/register` berhasil diuji dan menghasilkan kode referral unik mitra (contoh: `AGUS7272`).
2. **Persetujuan Admin**: Mitra berhasil di-approve ke status `ACTIVE`.
3. **Kaitan Pelanggan**: Customer berhasil dihubungkan ke mitra via `salesPartnerId`.
4. **Trigger Komisi PSB**: Komisi Rp 50.000 berhasil dikreditkan ke saldo dompet mitra dan tercatat di `CommissionLedger`.
5. **Pencairan Saldo (Payout)**: Permintaan penarikan Rp 50.000 berhasil dibuat dan disetujui admin dengan bukti transfer.
6. **Buku Kas Mutasi**: 2 entri mutasi (`CREDIT_PSB` dan `DEBIT_WITHDRAW`) tersimpan akurat dan balance terekonsiliasi.
7. **Frontend Web Admin**: Halaman `http://localhost:3217/admin/sales` dan `http://localhost:3217/sales/daftar` merespons `200 OK`.
