# ANTI-AI-SLOP & DESIGN INTELLIGENCE GOVERNANCE
> **Single Source of Truth untuk Kualitas Visual & UX Manusiawi (Human-Crafted) di AUDIRA DEV**  
> Diadaptasi dari referensi standar industri `UI/UX Pro Max` (192 Aturan Penalaran, 79 Gaya UI, 119 Panduan UX).

---

## 0. Filosofi: Tolak "AI Slop" & Generic Template

Website **AUDIRA DEV** adalah representasi studio rekayasa software modern tingkat tinggi (*elite engineering & creative studio*). Semua kode visual, tata letak, dan interaksi dilarang keras terlihat seperti hasil generate AI mentah (*AI slop*).

### 7 Dosa Besar "AI Slop" yang DILARANG KERAS:
1. **Gradien Ungu/Pink Klise**: Dilarang menggunakan gradien ungu-ke-pink generic (`linear-gradient(to right, #ec4899, #8b5cf6)`) tanpa fungsi semantik yang jelas. Gunakan warna aksen tegas: Electric Neon Blue (`#0070f3`) dan Electric Neon Purple (`#7928ca`) dengan kontras tinggi.
2. **Emoji Sebagai Ikon Pengganti**: Dilarang menggunakan karakter emoji (seperti 🚀, 💻, 🤖, 🌐, 📱) sebagai ikon utama fitur. Wajib menggunakan **vektor SVG presisi** (Lucide / Heroicons style SVG) yang tajam, terarah, dan profesional.
3. **Teks Abu-abu di Latar Abu-abu (Contrast Failing)**: Teks wajib memiliki kontras rasio minimal **4.5:1** (WCAG AA). Hindari `text-gray-400` di atas `bg-gray-100` atau `text-gray-600` di atas hitam pekat.
4. **Elemen Mengambang Tanpa Alasan (Floaty Blobs)**: Jangan menambahkan lingkaran blur acak yang tidak terhubung dengan arsitektur halaman. Setiap efek pencahayaan atau grid siber (seperti Three.js WebGL) harus memiliki fungsi identitas studio.
5. **Kurangnya Focus & Active State**: Semua tombol dan input wajib memiliki `:focus-visible` ring kontras minimal 2px perimeter solid untuk navigasi keyboard.
6. **Touch Targets Kerdil**: Semua elemen interaktif pada mobile (< 768px) wajib memiliki ukuran area sentuh minimal **44x44px** dengan jarak antar-elemen minimal 8px.
7. **Orphan Heading & Chip Overflows**: Judul headline tidak boleh memotong kata secara janggal. Kumpulan chip tag dan badge harus reflow secara rapi dengan padding yang terukur (`px-2.5 py-1`).

---

## 1. Karakteristik Visual AUDIRA DEV (Neo-Brutalism + Cyberpunk)

* **Gaya Utama**: **Neo-Brutalism + High-Tech Cyberpunk**.
* **Border**: Garis tegas solid 2px (`border-2 border-black dark:border-gray-700`).
* **Hard Drop Shadow**: Bayangan offset tajam tanpa blur (`shadow-[6px_6px_0px_#05070d] dark:shadow-[6px_6px_0px_#0070f3]`).
* **Hover Interaction**: Micro-movement responsif (`hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0px_#05070d]`).
* **Tipografi**:
  * Display / Headline: Sans-serif geometris tegas, *uppercase*, *tracking-tight*, berat *font-black* (900).
  * Monospace Code / Badges: Font Mono (`JetBrains Mono`, `Fira Code`, `ui-monospace`) untuk indikator port, status SLA, dan data sistem.
  * Body Text: Bersih, terbaca nyaman, *leading-relaxed*, ukuran dasar 15-16px.
* **Aksesibilitas**: Menghormati `prefers-reduced-motion` untuk semua animasi Framer Motion dan Three.js.

---

## 2. Checklist Pra-Delivery Antarmuka (Pre-Delivery Checklist)

Setiap komponen atau halaman baru yang dibuat di AUDIRA DEV wajib lolos checklist 8 poin ini:
- [ ] **Ikon**: Menggunakan vektor SVG murni, bukan karakter emoji.
- [ ] **Pointer**: Memiliki `cursor-pointer` pada seluruh elemen yang dapat diklik.
- [ ] **Hover & Active**: Hover states memiliki transisi halus (150–300ms) tanpa layout shift.
- [ ] **Kontras Teks**: Light mode dan dark mode memenuhi standar rasio kontras 4.5:1.
- [ ] **Aksesibilitas Keyboard**: Focus ring terlihat jelas saat navigasi tombol Tab.
- [ ] **Responsivitas**: Tuntas diuji pada 4 viewport: Mobile (375px), Tablet (768px), Laptop (1024px), Desktop (1440px).
- [ ] **CLS Zero Shift**: Ruang gambar dan canvas 3D telah dialokasikan dimensinya (Cumulative Layout Shift < 0.1).
- [ ] **Performa**: Lighthouse target 95–100, tidak ada memory leak pada animasi loop / useFrame.

---

## 3. Cara Mengakses Mesin UI/UX Pro Max Lokal

Asisten AI dan pengembang dapat menjalankan pencarian aturan kapan saja melalui script lokal di workspace:

```bash
# Mencari design system baru untuk fitur/industri tertentu:
python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "AUDIRA DEV"

# Mencari panduan UX spesifik (misal: contrast, keyboard, touch):
python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux

# Mencari best-practice Next.js / React:
python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs
```
