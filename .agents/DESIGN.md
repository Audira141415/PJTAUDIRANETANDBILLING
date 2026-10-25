# DESIGN — AUDIRA-NET & BILLING DESIGN SYSTEM

> Brand Identity, UI/UX Guidelines, Color Tokens, and Component Standards for AUDIRA Ecosystem.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Brand Identity & Design Philosophy

**AUDIRA Digital Network** menggabungkan estetika teknologi jaringan masa depan (*Cyber-Infrastructure & Future Connectivity*) dengan kejelasan antarmuka enterprise yang efisien, responsif, dan mudah dioperasikan oleh staf non-teknis maupun tim NOC tingkat lanjut.

### Core Principles:
1. **High Visual Clarity**: Data jaringan, status tagihan, dan IP address harus terbaca seketika tanpa kebingungan.
2. **Action-Driven Feedback**: Setiap aksi penagihan, reboot modem, atau pergantian paket harus memberikan umpan balik visual yang jelas (toast notification, badge warna status).
3. **Data Density with Breathing Room**: Dashboard ISP membutuhkan banyak data (grafik MRTG, redaman optik, daftar tagihan). Layout dirancang rapi menggunakan grid modular dan collapsible sidebar.

---

## 2. Color Palette & Tokens

### 2.1 Primary & Accent
- **AUDIRA Brand Cyan**: `#00f5ff` / `#0284c7` (Identitas jaringan fiber, konektivitas masa depan)
- **Deep Navy Slate**: `#0b0f19` / `#0f172a` (Latar belakang gelap modern yang nyaman di mata)
- **Indigo Glow**: `#6366f1` / `#8b5cf6` (Aksen sekunder untuk kartu metrik dan tombol premium)

### 2.2 Semantic Status Colors
- **Success (Aktif / Lunas)**: Emerald `#10b981` (Sesi online, invoice lunas, router terhubung)
- **Warning (Jatuh Tempo / Redaman Lemah)**: Amber `#f59e0b` (Mendekati isolir, redaman -24 dBm)
- **Danger (Terisolir / Gangguan / Kritis)**: Rose `#ef4444` (Sesi putus, LOS merah, invoice overdue)
- **Muted / Neutral**: Slate `#64748b` (Teks sekunder, border, separator)

---

## 3. Typography Standards

- **Primary Font**: `Plus Jakarta Sans` / `Inter` — Digunakan untuk judul, teks deskripsi, tombol, dan form input.
- **Monospace Font**: `JetBrains Mono` / `Courier New` — Digunakan untuk alamat IP (`192.168.1.1`), MAC Address, Redaman dBm, dan nominal mata uang.

---

## 4. Component Patterns

### 4.1 Status Badges
Setiap badge status harus memiliki kontras tinggi dengan dot indikator:
- `● Aktif`: Latar hijau lembut dengan teks hijau tua (`bg-emerald-50 text-emerald-700`).
- `● Terisolir`: Latar merah lembut dengan teks merah tua (`bg-rose-50 text-rose-700`).
- `● Menunggu`: Latar kuning lembut dengan teks oranye/kuning (`bg-amber-50 text-amber-700`).

### 4.2 Data Tables
- Selalu sediakan fitur pencarian instan (*quick search*).
- Filter status (Semua, Aktif, Isolir, Suspend).
- Tombol aksi cepat: Cetak Kwitansi, Kirim Tagihan WhatsApp, Edit, dan Detail.
- Pagination yang jelas dengan informasi total data (`Menampilkan 1-10 dari 250 pelanggan`).
