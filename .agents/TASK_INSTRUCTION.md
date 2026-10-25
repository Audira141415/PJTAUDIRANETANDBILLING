# TASK INSTRUCTION — AUDIRA-NET & BILLING ENGINEERING WORKFLOWS

> Standard Operating Procedures for AI Agents Executing Engineering Tasks.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Workflow Menambah Halaman Baru di Frontend Web Admin

1. **Buat File Halaman**:
   Tambahkan file baru di `AUDIRA-BILLING/apps/frontend/src/pages/` (misal: `src/pages/admin/sales.tsx`).
2. **Gunakan Layout Standar**:
   ```tsx
   import Layout from '@/components/Layout';

   export default function MyNewPage() {
     return (
       <Layout title="Judul Halaman - AUDIRA">
         <div className="p-6 space-y-6">
           {/* Konten Halaman */}
         </div>
       </Layout>
     );
   }
   ```
3. **Daftarkan ke Sidebar**:
   Buka `apps/frontend/src/components/Sidebar.tsx` dan tambahkan menu baru pada array `menuItems` dengan role yang sesuai.
4. **Verifikasi Tampilan**:
   Periksa di browser pada `http://localhost:3217/<nama-halaman>`.

---

## 2. Workflow Menambah Endpoint Baru di Backend NestJS

1. **Identifikasi Module**:
   Tentukan apakah endpoint masuk ke module yang sudah ada (misal `billing`, `customer`, `referral`) atau membutuhkan module baru.
2. **Buat DTO & Validasi**:
   Buat file DTO dengan `class-validator` di `apps/backend/src/<module>/dto/`.
3. **Implementasi Service**:
   Tulis business logic di `<module>.service.ts` dengan memanfaatkan `PrismaService`.
4. **Ekspos di Controller**:
   Tambahkan route handler dengan `@Post()`, `@Get()`, `@Put()`, atau `@Delete()`, sertakan `@UseGuards(JwtAuthGuard, RolesGuard)` jika membutuhkan proteksi.
5. **Uji Endpoint**:
   Gunakan `curl` atau halaman `src/pages/debug/test-api.tsx`.

---

## 3. Workflow Mengubah Skema Database Prisma

1. **Edit Skema**:
   Buka `AUDIRA-BILLING/apps/backend/prisma/schema.prisma` dan tambahkan model atau field baru.
2. **Generate Client**:
   ```powershell
   cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\backend
   pnpm run prisma:generate
   ```
3. **Push / Migrate ke Database**:
   Untuk development:
   ```powershell
   pnpm exec prisma db push
   ```
4. **Restart Backend**:
   Pastikan backend mengompilasi ulang types Prisma Client yang baru.

---

## 4. Workflow Menguji Aplikasi Mobile di Emulator

1. **Pastikan Emulator Aktif**:
   Jalankan `adb devices` dan pastikan `emulator-5554` terdeteksi.
2. **Reverse Port API**:
   Jalankan port forwarding agar emulator dapat mengakses backend host:
   ```powershell
   adb reverse tcp:3218 tcp:3218
   adb reverse tcp:4000 tcp:4000
   ```
3. **Kompilasi & Jalankan**:
   ```powershell
   cd f:\AUDIRA-NET-BILLING\AUDIRA-NET
   flutter run -d emulator-5554
   ```
4. **Verifikasi Layar**:
   Ambil screenshot via `adb shell screencap -p /sdcard/screen.png` untuk memastikan UI tampil sempurna.
