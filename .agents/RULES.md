# RULES — STRICT BEHAVIORAL & CODING DIRECTIVES

> Mandatory Engineering Standards and Constraints for AI Agents working on AUDIRA-NET-BILLING.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Absolute Directives (Non-Negotiable)

1. **Confidentiality & Secret Hygiene**:
   - Jangan pernah melakukan commit atau membeberkan kredensial sensitif: password MikroTik, API token WhatsApp (Fonnte), server key Midtrans, password database, atau JWT secret ke dalam repositori git atau dokumentasi publik.
   - Semua rahasia harus disimpan di file `.env` yang terdaftar pada `.gitignore`.

2. **Attribution & Intellectual Property**:
   - Pertahankan seluruh atribusi hak cipta dan kepemilikan atas nama **Agus Dwi Rianto** dan **Audira Multimedia Digital / Audira Sukses Mandiri**.
   - Proyek ini dilindungi oleh lisensi kepemilikan komersial (`LICENSE`).

3. **Port Allocation Discipline**:
   - Frontend Web Admin harus tetap berjalan pada **Port 3217**.
   - Backend API NestJS harus tetap berjalan pada **Port 3218**.
   - PostgreSQL lokal berjalan pada **Port 5455**, dan Redis pada **Port 6379**.
   - Jangan mengubah port-port ini secara sembarangan karena skrip `start.bat` dan konfigurasi CORS bergantung pada port tersebut.

---

## 2. Backend & Database Standards (NestJS & Prisma)

1. **Schema Integrity**:
   - Jangan pernah menjalankan `prisma migrate reset` pada lingkungan produksi atau database yang memiliki data pelanggan riil tanpa izin eksplisit.
   - Gunakan `prisma db push` atau `prisma migrate dev` dengan hati-hati.
2. **Input Validation**:
   - Semua endpoint controller yang menerima payload POST/PUT harus menggunakan DTO tervalidasi dengan decorator `class-validator` (misal `@IsNotEmpty()`, `@IsEmail()`, `@IsNumber()`).
3. **Audit Trail**:
   - Setiap mutasi kritis (perubahan paket, isolir manual, pembatalan pembayaran, penghapusan pelanggan) wajib mencatat entri ke dalam modul Audit Log (`AuditService`).

---

## 3. Frontend Web Standards (Next.js 14)

1. **Pages Router Structure**:
   - Frontend `apps/frontend` menggunakan Next.js Pages router (`src/pages`).
   - Gunakan komponen [Layout.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/Layout.tsx) dan [Sidebar.tsx](file:///f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/components/Sidebar.tsx) sebagai pembungkus utama halaman admin.
2. **Hydration Safety**:
   - Pastikan state browser (`localStorage`, `window.location`) tidak menyebabkan SSR/CSR hydration mismatch. Gunakan `useEffect` atau flag `isMounted`.
3. **Responsive UI**:
   - Semua halaman harus dapat diakses dan responsif di layar laptop (1366px), desktop (1920px), serta tablet/ponsel saat admin membuka di perangkat mobile.

---

## 4. Mobile Standards (Flutter & Expo)

1. **Flutter Startup Safety**:
   - Jangan pernah meletakkan panggilan jaringan atau query database yang berpotensi gagal sebelum `runApp()` tanpa proteksi `try-catch`.
   - Kegagalan query awal tidak boleh membuat aplikasi macet di splash screen.
2. **Backend Connectivity from Emulator**:
   - Di Android emulator, gunakan reverse proxy ADB (`adb reverse tcp:3218 tcp:3218`) atau alamat IP host emulator `10.0.2.2:3218` agar aplikasi dapat berkomunikasi dengan backend NestJS di mesin lokal.
