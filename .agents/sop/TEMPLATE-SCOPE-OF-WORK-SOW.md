# TEMPLATE: SCOPE OF WORK (SOW) & SPRINT SCHEDULE

> **Document Code:** AUDIRA-LEGAL-SOW-2026  
> **Reference MSA:** AUDIRA-LEGAL-MSA-2026  
> **Project Classification:** Enterprise Web Application / Architectural Solution

---

## 1. Ikhtisar Proyek (Project Executive Summary)
- **Nama Proyek**: [Contoh: Modern FinTech Portal & Real-Time Trading Terminal]
- **Klien**: [Nama Perusahaan Klien]
- **Target Tanggal Mulai**: [Tanggal Mulai]
- **Target Tanggal Go-Live**: [Tanggal Rilis Produksi]
- **Lead Architect / PM**: Agus Dwi Rianto (AUDIRA)

---

## 2. Arsitektur Teknologi yang Digunakan (Technical Stack)
- **Frontend Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling & Motion**: Tailwind CSS v4, Framer Motion, Vanilla CSS Design Tokens
- **3D / Canvas**: Three.js, React Three Fiber (`dpr={[1, 1.5]}` dengan CSS Fallback mobile)
- **Database & Backend**: PostgreSQL, Prisma ORM 7, Node.js Serverless Routes
- **DevOps**: Docker Container (`node:22-slim`), Nginx Reverse Proxy, SSL/TLS Let's Encrypt

---

## 3. Rincian Deliverables & Milestone Jadwal (Milestone Breakdown)

| Milestone | Ruang Lingkup & Deliverables | Estimasi Durasi | Termin Pembayaran |
| :--- | :--- | :--- | :--- |
| **Milestone 1: Sprint 0 & Arsitektur** | Setup repository GitHub, schema database Prisma, arsitektur dasar Next.js 16, dan design token. | Minggu 1–2 | **50% DP ($____)** |
| **Milestone 2: Core Engineering & Alpha** | Pembuatan komponen UI, integrasi database, logika bisnis utama, dan REST API. | Minggu 3–5 | — |
| **Milestone 3: Beta & Staging UAT** | Uji coba fungsional oleh Klien, penyesuaian feedback, audit performa Lighthouse (≥ 95). | Minggu 6–7 | **30% UAT ($____)** |
| **Milestone 4: Go-Live & Handover** | Deployment ke server produksi klien, transfer kepemilikan repository GitHub, serah terima berkas. | Minggu 8 | **20% Final ($____)** |

---

## 4. Batasan Ruang Lingkup (Out-of-Scope Boundaries)
Hal-hal berikut ini berada di luar ruang lingkup SOW ini dan memerlukan kesepakatan *Change Request* terpisah:
1. Penyediaan konten copywriting atau aset fotografi komersial selain yang disediakan klien.
2. Integrasi ke sistem perbankan/ERP warisan (*legacy*) yang tidak memiliki dokumentasi REST/GraphQL API terbuka.
3. Biaya langganan infrastruktur cloud pihak ketiga (AWS, Cloudflare, OpenAI Token) menjadi beban Klien langsung.

---

## 5. Lembar Persetujuan SOW (Sign-Off Approval)

Disetujui oleh **AUDIRA**:  
Nama: **Agus Dwi Rianto**  
Tanda Tangan: ____________________ Tanggal: ______________

Disetujui oleh **[NAMA KLIEN]**:  
Nama: ____________________  
Tanda Tangan: ____________________ Tanggal: ______________
