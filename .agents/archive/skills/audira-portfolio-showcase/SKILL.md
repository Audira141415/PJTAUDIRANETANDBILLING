---
name: audira-portfolio-showcase
description: >-
  Use this skill when adding, updating, or enhancing portfolio project case studies,
  tech stacks, challenges, solutions, or metrics in AUDIRA DEV.
---

# Audira Portfolio Showcase & Case Study Skill

Petunjuk operasional untuk mengelola dan memperbarui studi kasus proyek portofolio di website **AUDIRA DEV**.

---

## 1. Lokasi Data & Skema Proyek

Data portofolio terpusat di `lib/portfolio-data.ts`. Setiap entri wajib mematuhi interface `Project`:

```typescript
export interface Project {
  slug: string;           // URL-friendly slug unik (misal: 'e-commerce-batam')
  title: string;          // Judul display kapital (misal: 'BATAM LOGISTICS SYSTEM')
  category: string;       // Kategori: 'WEB APP', 'AI', 'UI/UX', 'DEVOPS'
  image: string;          // Path gambar di folder public (misal: '/portfolio/p1.svg')
  tech: string[];         // Daftar tag teknologi (misal: ['NEXT.JS', 'PRISMA', 'POSTGRES'])
  description: string;    // Ringkasan proyek untuk kartu overview
  challenge: string;      // Penjelasan masalah & tantangan teknis klien
  solution: string;       // Arsitektur & teknologi solusi yang dibangun
  results: string[];      // Daftar metrik keberhasilan atau pencapaian konkret
  type: "showcase" | "client"; // 'showcase' = demo internal, 'client' = proyek klien riil
}
```

---

## 2. Alur Penambahan Proyek Baru

1. **Buka file `lib/portfolio-data.ts`**.
2. **Tambahkan objek baru ke dalam array `projects`**.
3. **Simpan aset visual proyek**:
   - Letakkan gambar di `public/portfolio/`.
   - Gunakan format SVG atau WebP tajam dan ringan.
4. **Verifikasi Tampilan Rute**:
   - Buka `/portfolio` untuk memeriksa kartu portofolio baru.
   - Buka `/portfolio/[slug]` untuk memeriksa halaman detail studi kasus lengkap.
   - Pastikan teks, teknologi badge, dan metrik hasil tampil rapi.
