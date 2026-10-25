# SOP-02: PRE-FLIGHT QUALITY CONTROL & ZERO-DOWNTIME DEPLOYMENT

> **Document Code:** AUDIRA-SOP-002  
> **Effective Date:** October 1, 2026 | Revision: 2.4  
> **Applicability:** All Production Releases, Next.js App Router Builds, Docker Containers & Server Syncs  
> **Enforcement:** Mandatory via Automated Git Hooks & Pre-Tool Inspection

---

## 1. Tujuan & Kebijakan Nol-Toleransi (Purpose & Zero-Defect Policy)
AUDIRA menerapkan standar kepatuhan teknis tanpa kompromi (*Anti-AI Slop & Zero-Defect*). Tidak ada kode yang diizinkan masuk ke server staging atau produksi tanpa melalui gerbang verifikasi (*pre-flight quality gate*) yang dipersyaratkan dokumen ini.

---

## 2. Gerbang Verifikasi Pre-Flight (Quality Gate 5-Pillar Checklist)

### Pilar 1: Static Analysis & Code Hygiene
- **TypeScript Strict Compliance**: Wajib menjalankan `npx tsc --noEmit`. Hasil harus **0 errors**. Dilarang menggunakan tipe `any` tanpa pengecualian tertulis.
- **ESLint Clean Slate**: Wajib menjalankan `npm run lint`. Hasil harus **0 errors dan 0 warnings**.
- **Next.js 16 Async Params Compliance**: Parameter dinamis (`params`, `searchParams`) wajib di-`await` (`const { slug } = await params;`).

### Pilar 2: Performance & Core Web Vitals Audit
- **Google Lighthouse Score Target**:
  - Performance: **≥ 95/100**
  - Accessibility: **≥ 95/100**
  - Best Practices: **≥ 95/100**
  - SEO: **100/100**
- **Core Web Vitals Thresholds**:
  - Largest Contentful Paint (LCP) < 1.2s
  - First Input Delay (FID) / INP < 50ms
  - Cumulative Layout Shift (CLS) < 0.05
- **Three.js / WebGL Safety**:
  - Canvas 3D hanya aktif pada viewport desktop (≥ 768px).
  - DPR dibatasi `[1, 1.5]` untuk menghemat GPU/baterai klien.
  - Listener `webglcontextlost` (`event.preventDefault()`) terpasang untuk mencegah crash browser.

### Pilar 3: Keamanan & Sanitasi Input (Security Hardening)
- **Honeypot Anti-Spam**: Setiap form publik (Contact, Inquiries, Newsletter) wajib memiliki input honeypot tersembunyi.
- **In-Memory / Redis Rate Limiter**: Maksimal 5 permintaan pengiriman per IP per 10 menit.
- **Environment Secrets Leak Prevention**: Tidak ada API Key, secret token, atau kredensial database yang di-hardcode di kode frontend (`NEXT_PUBLIC_*`).
- **HTTP Security Headers**: Header `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, dan `Strict-Transport-Security` aktif di produksi.

### Pilar 4: Cross-Device & Responsive Verification
- Uji tampilan pada 3 breakpoint baku:
  1. Desktop High-DPI (1920x1080 & 1440x900)
  2. Tablet Landscape & Portrait (768px & 1024px)
  3. Mobile Viewport (iPhone 375px & Android 412px)
- Seluruh tombol interaktif memiliki touch target minimum **44x44 px**.

### Pilar 5: Zero-Downtime Deployment & Rollback Protocol
- **Build Container**: Docker multi-stage build dengan image `node:22-slim` dan optimasi standalone output.
- **SFTP Sync Filter**: Mengabaikan direktori lokal `.git`, `node_modules`, `.next`, `.turbo`.
- **Health Check**: Endpoint `/` dan API krusial wajib mengembalikan `HTTP/1.1 200 OK` sebelum kontainer lama dipensiunkan.
- **Emergency Rollback**: Jika terjadi kegagalan health check dalam 30 detik:
  ```bash
  docker compose rollback || docker stop audira-portfolio-web && docker start audira-portfolio-backup
  ```

---

## 3. Log Eksekusi & Sertifikasi Rilis
Sebelum serah terima ke klien, Lead Engineer wajib mendokumentasikan log keberhasilan build:
```bash
✓ Compiled successfully
✓ Generating static pages using worker (41/41) in < 1s
✓ Container status: Up (0.0.0.0:3447->3447/tcp)
✓ HTTP/1.1 200 OK verified
```
