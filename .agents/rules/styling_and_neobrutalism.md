# STYLING & NEO-BRUTALISM RULES
> **Rule ID**: `NEOBRUTAL-STYLE-01`  
> **Target**: Seluruh AI Agent, Desainer UI, dan Komponen Frontend.  
> **Level**: MANDATORY (Integritas Visual & Identitas Brand).

---

## 1. Identitas Visual AUDIRA DEV

AUDIRA DEV memiliki identitas visual khas **Neo-Brutalism + Cyberpunk Modern**:
- Karakter geometris tegas dengan garis tepi tebal 2px (`border-black dark:border-gray-700`).
- Bayangan keras tanpa blur (*hard offset shadows*): `box-shadow: 6px 6px 0px #05070d` (dan varian dark mode `box-shadow: 6px 6px 0px #1f2937`).
- Aksen elektrik: Neon Electric Blue (`#0070f3`) dan Neon Electric Purple (`#7928ca`).

---

## 2. Aturan Penggunaan Utility Class

1. **Komponen Kartu & Interaktif (`.brutal`)**:
   - Selalu terapkan class `.brutal` pada kartu layanan, kartu portofolio, dan panel informasi.
   - Efek hover wajib mempertahankan gaya: `transform: translate(-2px, -2px)` dengan penambahan offset bayangan ke `10px 10px 0px`.
2. **Tombol Aksi (`Button.tsx`)**:
   - `variant="primary"`: Latar hitam dengan teks putih (atau neon blue saat hover).
   - `variant="secondary"`: Latar putih dengan border hitam tebal brutal.
3. **Pewarnaan Teks Neon**:
   - Gunakan `.neon-text` untuk menonjolkan kata kunci utama (Electric Cyan Blue).
   - Gunakan `.neon-purple-text` untuk menonjolkan kata kunci kedua (Electric Violet Purple).

---

## 3. Aturan Dark Mode Fidelity

1. **Pewarnaan Kontras**:
   - Latar belakang dark mode adalah `#05070d` (Charcoal pekat) atau `#0a0e1a` (Midnight Navy).
   - Dilarang membuat teks abu-abu gelap di atas latar belakang hitam yang sulit dibaca.
2. **Dukungan Class `dark`**:
   - Pastikan setiap div kontainer memiliki varian `dark:bg-...` dan `dark:text-...` yang konsisten.
   - Jangan menulis style inline `style={{ backgroundColor: 'white' }}` yang mengabaikan class dark mode.
