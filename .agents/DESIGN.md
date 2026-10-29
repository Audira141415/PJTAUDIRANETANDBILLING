# DESIGN: AUDIRA-NET & BILLING DESIGN SYSTEM

> Brand Identity, UI/UX Guidelines, Three-Layer Color Tokens, and Anti-Slop Standards for AUDIRA Ecosystem.  
> **Version:** v2.6.0-prod (Anti-Slop & UI/UX Pro Max Certified)  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  
> **Design Read:** Enterprise B2B ISP BSS/OSS & NOC Operations Console (`Dial: ENERGY 2 / RHYTHM 2 / MOTION 1`, `Density: 8/10`)

---

## 1. Brand Identity & Design Philosophy

**AUDIRA Digital Network** menggabungkan kejelasan antarmuka carrier-grade enterprise dengan ketahanan ergonomis ruang kontrol NOC 24/7. Setiap layar dibangun berdasarkan keputusan operasional yang diambil oleh staf kasir, teknisi lapangan, maupun engineer NOC.

### Core Principles & One-Line Decisions (`R-31`):
1. **Color Palette (`R-01`, `R-29`)**: Deep Slate Navy (`#090d16` / `#131c31` dark, `#f8fafc` / `#ffffff` light) + Brand Royal/Cyan (`#1e3a5f` / `#2563eb` light, `#38bdf8` dark) + 3 status semantik (Emerald `#059669`, Amber `#d97706`, Crimson `#dc2626`) dipilih untuk ergonomi anti-silau shift 24/7 dan rasio kontras WCAG AA > 4.5:1 (`R-25`).
2. **Typography (`R-06`)**: `Plus Jakarta Sans` untuk keterbacaan label UI padat dan `JetBrains Mono` (`tabular-nums`, `zero` slashed) untuk IP address, MAC address, redaman optik dBm, nominal Rupiah, serta counter bandwidth agar angka sejajar vertikal di tabel.
3. **Layout & Composition (`R-05`, `C-3`)**: Komposisi asimetris 8:4 pada Root Cockpit yang menyandingkan buku besar tagihan/pelanggan di kiri dengan telemetri RouterOS BNG, RADIUS CoA, dan kontrol eksekusi cepat di kanan.
4. **Spacing & Density (`R-11`, `R-12`)**: Kepadatan Enterprise Level 8/10 (`py-2 px-3` baris tabel, border struktural 1px `var(--app-border)`, tanpa bayangan mengambang berlebih) agar operator melihat lebih banyak baris data tanpa scroll.
5. **Icons (`R-04`)**: Hanya menggunakan ikon SVG `lucide-react` yang relevan secara teknis dengan label teks pendamping; dilarang menggunakan emoji sebagai ikon UI atau ikon AI generik (`Sparkles`).
6. **Motion (`R-19`)**: `MOTION 1` (transisi fokus/hover 150ms dan penghormatan penuh terhadap `prefers-reduced-motion: reduce`), tanpa animasi memantul atau berdenyut tanpa fungsi status nyata.

---

## 2. Three-Layer Token Architecture (`Primitive -> Semantic -> Component`)

### 2.1 Semantic Surface & Text Tokens
- `--app-bg`: `#f8fafc` (Light) / `#090d16` (Dark) — Latar kanvas utama (Kontras teks utama `17.06:1` Light / `18.57:1` Dark, lulus WCAG AAA).
- `--app-card`: `#ffffff` (Light) / `#131c31` (Dark) — Permukaan kartu dan tabel data.
- `--app-card-subtle`: `#f1f5f9` (Light) / `#0c1322` (Dark) — Header tabel, baris hover, dan blok sekunder.
- `--app-border`: `#e2e8f0` (Light) / `#1e293b` (Dark) — Pemisah struktural 1px.
- `--app-text`: `#0f172a` (Light) / `#f8fafc` (Dark) — Teks primer.
- `--app-text-muted`: `#475569` (Light) / `#94a3b8` (Dark) — Teks sekunder (Kontras `7.58:1` Light / `6.61:1` Dark, lulus WCAG AA).
- `--app-primary`: `#1e3a5f` (Light) / `#38bdf8` (Dark) — Aksen utama tindakan dan fokus.

### 2.2 Semantic Status Tokens
- **Success (Aktif / Lunas / Online)**: Emerald `#059669` (Light) / `#10b981` (Dark)
- **Warning (Pending / Redaman Lemah)**: Amber `#d97706` (Light) / `#f59e0b` (Dark)
- **Danger (Terisolir / LOS / Overdue)**: Rose `#dc2626` (Light) / `#ef4444` (Dark)

---

## 3. Anti-Slop Hard Gates (`R-01` to `R-38`)

1. **Zero Em Dash (`R-02`)**: Tidak menggunakan karakter em dash di dalam teks UI; gunakan titik dua, koma, atau tanda hubung standar.
2. **Zero Emoji as UI Icons (`R-04`)**: Seluruh penanda visual wajib berupa komponen SVG semantik dengan teks pendamping.
3. **Zero Rainbow Gradients & Glow (`R-01`, `R-13`)**: Tidak ada gradien multi-warna (`via-`) atau efek pendar neon di seluruh halaman.
4. **Zero Browser `alert()` (`C-2`, `R-26`)**: Seluruh umpan balik aksi wajib menggunakan sistem notifikasi Toast non-blocking (`useToast`).
5. **Keyboard & Focus Accessibility (`R-32`, `R-34`)**: Setiap kontrol interaktif memiliki indikator `:focus-visible` berkontras tinggi (3:1+) dan semua modal dapat ditutup dengan tombol `Escape`.
