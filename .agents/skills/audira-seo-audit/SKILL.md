---
name: audira-seo-audit
description: >-
  Use this skill when auditing, enhancing, or generating SEO metadata, OpenGraph cards,
  JSON-LD structured data, dynamic sitemap.ts, and robots.ts in AUDIRA DEV.
---

# Audira SEO Audit & Metadata Skill

Petunjuk operasional untuk mengelola Search Engine Optimization (SEO), OpenGraph social cards, dan JSON-LD Structured Data di website **AUDIRA DEV**.

---

## 1. File Kunci & Lokasi Arsitektur SEO

* **Root Metadata & Layout**: `app/layout.tsx` (title template, default openGraph, metadataBase).
* **Robots Configuration**: `app/robots.ts` (crawl rules, sitemap link).
* **Dynamic Sitemap**: `app/sitemap.ts` (menggabungkan rute statis, blog slugs dari `lib/blog-data.ts`, dan portfolio slugs dari `lib/portfolio-data.ts`).
* **Dynamic OpenGraph Generator**: `app/opengraph-image.tsx` (edge rendering banner media sosial).

---

## 2. Standar Metadata Halaman Baru (`generateMetadata`)

Setiap halaman baru di `app/*` wajib mengekspor objek `metadata` atau fungsi `generateMetadata`:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Tech Stack | AUDIRA DEV",
  description: "Layanan pengembangan web modern, integrasi AI kustom, dan arsitektur cloud berkinerja tinggi oleh AUDIRA di Batam.",
  alternates: {
    canonical: "https://audira.my.id/services",
  },
  openGraph: {
    title: "Services & Tech Stack | AUDIRA DEV",
    description: "Solusi digital tingkat lanjut: Next.js, AI Agents, dan Cloud Infrastructure.",
    url: "https://audira.my.id/services",
    siteName: "AUDIRA DEV",
    locale: "id_ID",
    type: "website",
  },
};
```

---

## 3. JSON-LD Structured Data Standar

Untuk halaman brand, portofolio, atau blog, sertakan script JSON-LD terstruktur:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AUDIRA DEV",
      url: "https://audira.my.id",
      logo: "https://audira.my.id/og-image.png",
      founder: {
        "@type": "Person",
        name: "Agus Dwi Rianto",
        jobTitle: "Founder & Lead Architect",
      },
      sameAs: [
        "https://github.com/Audira141415",
      ],
    }),
  }}
/>
```

---

## 4. Checklist Verifikasi SEO

1. **Title Tag**: Menggunakan format `Page Title | AUDIRA DEV`.
2. **Meta Description**: 120-160 karakter dengan kata kunci relevan (Next.js, Batam, AI, Web Development).
3. **Heading Hierarchy**: Tepat satu `<h1>` per halaman, diikuti `<h2>` dan `<h3>` hierarkis.
4. **Canonical URL**: Selalu mengarah ke domain resmi `https://audira.my.id/path`.
5. **Alt Text Gambar**: Semua tag `Image` memiliki `alt` deskriptif tanpa teks kosong.
6. **Sitemap Sync**: Pastikan rute baru otomatis terdaftar di `app/sitemap.ts`.
