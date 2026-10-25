---
name: audira-blog-publishing
description: >-
  Use this skill when drafting, publishing, or optimizing technical blog articles,
  SEO metadata, and content categories for AUDIRA DEV.
---

# Audira Blog Publishing & SEO Skill

Petunjuk operasional untuk menulis dan menerbitkan artikel blog teknis berkualitas tinggi di website **AUDIRA DEV**.

---

## 1. Lokasi Data & Skema Artikel Blog

Seluruh data blog dikelola di `lib/blog-data.ts`. Setiap artikel memiliki struktur:

```typescript
export interface BlogPost {
  slug: string;           // URL identifier (contoh: 'memilih-stack-web-modern-2026')
  title: string;          // Judul artikel lengkap
  excerpt: string;        // Ringkasan untuk kartu preview dan Google Meta Description
  category: string;       // Kategori: 'WEB DEV', 'AI', 'TUTORIAL', 'BUSINESS'
  readTime: string;       // Estimasi waktu baca (misal: '6 min read')
  publishedAt: string;    // Format tanggal: '10 Okt 2026'
  content: string;        // Isi artikel lengkap (HTML atau Markdown string)
}
```

---

## 2. Praktik Terbaik SEO Konten

1. **Struktur Heading Semantik**:
   - Judul utama otomatis menjadi `<h1>`.
   - Gunakan `<h2>` untuk bagian sub-topik dan `<h3>` untuk detail teknis.
2. **Keyword Optimization**:
   - Sisipkan kata kunci relevan secara natural: *Web Development Batam, AI Chatbot Indonesia, Next.js 16, Cloud Solutions*.
3. **Internal Linking**:
   - Sertakan tautan kontekstual ke `/services`, `/portfolio`, atau `/contact` untuk meningkatkan konversi pembaca menjadi calon klien.
