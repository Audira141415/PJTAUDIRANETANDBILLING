# TESTING — AUDIRA-NET & BILLING VERIFICATION PROTOCOLS

> Quality Assurance, Preflight Checks, and Smoke Testing Suites for AUDIRA Ecosystem.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Preflight Verification Checklist

Sebelum menyerahkan tugas atau melakukan commit ke repositori:

1. **Docker Database Health**:
   - `sebilling-postgres` berjalan di port 5455.
   - `sebilling-redis` berjalan di port 6379.
2. **Backend API Health**:
   - `GET http://localhost:3218/health` merespons dengan status 200/401 tanpa crash.
   - Tidak ada error kompilasi TypeScript pada log NestJS.
3. **Frontend Web Admin Health**:
   - `GET http://localhost:3217` merespons dengan status 200 OK.
   - Halaman yang dimodifikasi tidak mengalami error console atau hydration mismatch.
4. **Mobile Native App Health**:
   - Aplikasi Flutter `AUDIRA-NET` berhasil melewati splash screen dan membuka halaman Login di emulator.

---

## 2. Perintah Pengujian per Komponen

### 2.1 Backend (NestJS)
```powershell
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\backend
# Cek kompilasi TypeScript
pnpm exec tsc --noEmit

# Jalankan linter
pnpm run lint
```

### 2.2 Frontend (Next.js)
```powershell
cd f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend
# Cek tipe TypeScript
npx tsc --noEmit

# Validasi build (opsional saat rilis)
npm run build
```

### 2.3 Mobile (Flutter)
```powershell
cd f:\AUDIRA-NET-BILLING\AUDIRA-NET
# Analisis kode Dart
flutter analyze

# Build test APK debug
flutter build apk --debug
```

---

## 3. Smoke Test Skenario Kritis

1. **Skenario Login Admin**:
   - Buka `http://localhost:3217/login`
   - Masukkan `admin@audira.net` / `admin123`
   - Pastikan diarahkan ke dashboard utama dengan metrik terisi.
2. **Skenario Invoice Generation**:
   - Buka menu Invoice -> Generate Invoice.
   - Pastikan invoice terbit dan tercatat di database PostgreSQL.
3. **Skenario WhatsApp Notification Mock**:
   - Buka menu WhatsApp -> Test Kirim Pesan.
   - Pastikan webhook/API merespons tanpa melempar unhandled exception.
