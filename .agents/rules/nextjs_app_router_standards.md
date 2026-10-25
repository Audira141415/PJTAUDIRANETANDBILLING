# NEXT.JS 16 & REACT 19 APP ROUTER STANDARDS
> **Rule ID**: `NEXT16-APP-ROUTER-01`  
> **Target**: Seluruh AI Agent, Komponen Halaman, Layout, dan API Route Handlers.  
> **Level**: MANDATORY (Kepatuhan Arsitektur Framework).

---

## 1. Konteks Breaking Changes Next.js 16

Next.js versi 16 membawa sejumlah breaking changes dari versi terdahulu:
- Halaman default adalah **React Server Components (RSC)**.
- Parameter dinamis rute (`params` dan `searchParams`) sekarang berbentuk **`Promise`** yang harus di-`await`.
- Konvensi metadata menggunakan fungsi `generateMetadata` asinkron.
- Dokumentasi acuan lokal tersedia di `node_modules/next/dist/docs/`.

---

## 2. Aturan Server vs Client Components

1. **Server Components Secara Default:**
   - JANGAN menambahkan `"use client"` di baris paling atas file kecuali komponen tersebut membutuhkan:
     - React Hooks seperti `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`.
     - Browser API seperti `window`, `document`, `localStorage`, `matchMedia`.
     - Event Listeners seperti `onClick`, `onChange`, `onSubmit`.
     - Three.js WebGL rendering (`@react-three/fiber`) atau animasi interaktif `framer-motion`.
2. **Prinsip Leaf Components (Karantina Klien):**
   - Bungkus hanya bagian yang interaktif ke dalam komponen klien terpisah.
   - Jangan mengubah seluruh halaman (`page.tsx`) menjadi Client Component jika hanya ada satu formulir kecil di dalamnya. Jadikan form tersebut komponen tersendiri (seperti `NewsletterForm.tsx`).

---

## 3. Penanganan Parameter Rute Asinkron

Contoh implementasi yang BENAR pada Next.js 16:

```tsx
// ✅ BENAR (Next.js 16)
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
```

```tsx
// ⛔ SALAH (Pola Next.js Usang yang Menyebabkan Error / Warning)
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug; // ERROR: params is a Promise in Next.js 16!
}
```

---

## 4. Metadata & SEO Standards

Setiap halaman di folder `app/` wajib mendefinisikan objek `metadata` atau fungsi `generateMetadata`:
- Memiliki `title` unik yang mencerminkan isi halaman.
- Memiliki `description` ringkas yang relevan untuk snippet pencarian Google.
- Menggunakan `openGraph` tags untuk tampilan kartu preview media sosial.
