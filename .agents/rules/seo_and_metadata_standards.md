# SEO & METADATA ARCHITECTURE STANDARDS
> **Rule ID**: `SEO-META-PORTOFOLIO-01`  
> **Target**: Seluruh AI Agent, Halaman App Router (`app/**/page.tsx`), dan Komponen Metadata.  
> **Level**: MANDATORY (Wajib untuk Visibilitas Mesin Pencari & Identitas Brand).

---

## 1. Aturan Metadata Per Halaman

1. **Eksport Metadata Unik**: Setiap rute `page.tsx` wajib mengekspor objek statis `metadata: Metadata` atau fungsi asinkron `generateMetadata({ params })`.
2. **Format Judul Konsisten**: Judul halaman wajib mengikuti pola template:
   * Format: `[Nama Halaman/Fitur] | AUDIRA DEV`
   * Contoh: `Portfolio Showcase | AUDIRA DEV`, `Services & Tech Stack | AUDIRA DEV`.
3. **Deskripsi Komprehensif**: Panjang meta description wajib berada di rentang 120–160 karakter dengan kata kunci inti: Next.js, Batam, Web Studio, AI Integration, Neo-Brutalism.
4. **Canonical URL**: Setiap entri metadata wajib menyertakan `alternates.canonical` yang merujuk ke domain resmi `https://audira.my.id/[path]`.

---

## 2. Dynamic OpenGraph & Social Sharing

1. Gunakan file generator dynamic image `app/opengraph-image.tsx` untuk memastikan share link di WhatsApp, Twitter/X, dan LinkedIn menampilkan kartu beresolusi 1200x630 pixel dengan gaya Neo-Brutalism.
2. Metadata OpenGraph wajib memuat:
   * `locale: 'id_ID'`
   * `siteName: 'AUDIRA DEV'`
   * `type: 'website'` atau `'article'` (untuk artikel blog).

---

## 3. Dynamic Sitemap & Robots Sync

1. Saat menambah rute publik baru di `app/`:
   * Tambahkan rute tersebut ke dalam `staticRoutes` di `app/sitemap.ts`.
2. Pastikan file `app/robots.ts` mengizinkan crawling untuk semua rute publik dan membatasi rute internal seperti `/api/*` bila tidak dibutuhkan mesin pencari.
