# FEATURE CATALOG — AUDIRA DEV
> **Master Catalog of Pages, Components, UI Widgets, and API Endpoints**  
> *Single Source of Truth untuk Seluruh Modul Fitur (Anti-Redundansi).*

---

## 1. Katalog Halaman Publik (App Router Pages)

| ID Fitur | Rute Path | Deskripsi & Komponen Kunci | Status |
| :--- | :--- | :--- | :--- |
| **PAGE-01** | `/` | **Landing Page Utama**: Hero dengan Three.js 3D Sphere, What We Build (Services Grid), How We Work (5 Langkah), Featured Work, Testimoni, CTA. | ✅ Aktif |
| **PAGE-02** | `/services` | **Halaman Layanan**: Detail Web Dev, AI Integration, UI/UX Design, Cloud/DevOps, Tech Stack Badges, FAQ interaktif. | ✅ Aktif |
| **PAGE-03** | `/portfolio` | **Katalog Portofolio**: Filter kategori (All, Web App, AI, Design), grid studi kasus, preview thumbnail gambar dan metrik hasil. | ✅ Aktif |
| **PAGE-04** | `/portfolio/[slug]` | **Detail Studi Kasus**: Halaman rute dinamis dengan The Challenge, The Solution, Stack Teknologi, dan Impact Results. | ✅ Aktif |
| **PAGE-05** | `/pricing` | **Transparansi Harga**: Paket Starter, Growth, Enterprise, perbandingan fitur tabel, dan kalkulator estimasi biaya interaktif. | ✅ Aktif |
| **PAGE-06** | `/blog` | **Repositori Artikel**: Daftar postingan teknis, pencarian kategori, estimasi waktu baca, dan tanggal rilis. | ✅ Aktif |
| **PAGE-07** | `/blog/[slug]` | **Baca Artikel Blog**: Render artikel lengkap, tipografi nyaman, share buttons, dan rekomendasi artikel terkait. | ✅ Aktif |
| **PAGE-08** | `/about` | **Profil Studio & Visi**: Cerita perjalanan Audira Dev dari Batam, nilai-nilai studio, dan standar kualitas pengerjaan. | ✅ Aktif |
| **PAGE-09** | `/team` | **Profil Tim**: Tim engineer, desainer, dan spesialis AI di balik Audira Dev. | ✅ Aktif |
| **PAGE-10** | `/contact` | **Hubungi Kami**: Formulir pesan langsung, alamat studio Batam, peta lokasi, hotline WhatsApp, dan email resmi. | ✅ Aktif |
| **PAGE-11** | `/admin` | **Admin Command Terminal**: Dashboard autentikasi administrator untuk melihat pesan leads masuk, subscriber newsletter, ringkasan proyek & blog, diagnostik server, dan ekspor CSV/TXT. | ✅ Aktif |

---

## 2. Katalog Komponen & Widget Interaktif

| ID Widget | Komponen | Deskripsi & Fungsionalitas | Status |
| :--- | :--- | :--- | :--- |
| **WIDGET-01**| `CyberScene.tsx` | Kanvas 3D WebGL Three.js dengan bola kawat distorsi dan grid siber. Memiliki fallback CSS glow otomatis untuk layar ponsel. | ✅ Aktif |
| **WIDGET-02**| `Navbar.tsx` | Header navigasi lengket (*sticky*) dengan efek glassmorphism, menu drawer mobile responsif, dan link aktif. | ✅ Aktif |
| **WIDGET-03**| `ThemeToggle.tsx` | Switcher mode terang dan gelap dengan icon matahari/bulan dan penyimpanan preferensi di localStorage. | ✅ Aktif |
| **WIDGET-04**| `CustomCursor.tsx` | Kursor magnetik visual desktop dengan animasi trailing halus. | ✅ Aktif |
| **WIDGET-05**| `ScrollProgress.tsx`| Garis progress bar di bagian atas layar yang membaca persentase scroll halaman. | ✅ Aktif |
| **WIDGET-06**| `WhatsAppWidget.tsx`| Tombol floating di pojok kanan bawah yang langsung membuka percakapan WhatsApp resmi (`+62 82112001600`). | ✅ Aktif |
| **WIDGET-07**| `NewsletterForm.tsx`| Formulir langganan newsletter dengan AJAX fetch ke `/api/newsletter` dan status feedback visual. | ✅ Aktif |
| **WIDGET-08**| `BackToTop.tsx` | Tombol halus untuk scroll kembali ke puncak halaman saat pengguna telah men-scroll jauh ke bawah. | ✅ Aktif |
| **WIDGET-09**| `AdminDashboardClient.tsx` | Antarmuka interaktif Admin Console bergaya Neo-Brutalism + Cyberpunk dengan tab Inquiries, Subscribers, Showcase, dan System Monitor. | ✅ Aktif |
| **WIDGET-10**| `CyberTerminal.tsx` | Interactive System Shell HUD & Hotkey (`Ctrl+K` / `` ` ``) dengan instruksi CLI (`help`, `about`, `founder`, `stack`, `quote`, `matrix`, `contact`), audio synthesizer Web Audio API, dan CRT styling. | ✅ Aktif |
| **WIDGET-11**| `TechComparisonLab.tsx` | Simulator ROI & Speed Benchmark interaktif (Legacy WordPress vs Next.js 16) dengan slider traffic bulanan, nilai AOV, dan estimasi omzet terselamatkan. | ✅ Aktif |
| **WIDGET-12**| `DeviceSimulatorModal.tsx` | Modal simulator responsif multi-device di halaman Portofolio untuk menguji proyek di layar Desktop, Tablet, dan Mobile dengan metrik performa real-time. | ✅ Aktif |
| **WIDGET-13**| `DiscoveryCallModal.tsx` | Modal booking jadwal video call instan (Cal.com / Google Meet) dengan deteksi otomatis zona waktu klien. | ✅ Aktif |
| **WIDGET-14**| `CurrencySwitcher.tsx` | Komponen seleksi mata uang (USD/IDR/SGD) dengan konversi harga instan di halaman Pricing & Estimator. | ✅ Aktif |
| **WIDGET-15**| `QuotePdfExportButton.tsx`| Generator & downloader file PDF estimasi proyek ber-kop formal AUDIRA DEV. | ✅ Aktif |
| **WIDGET-16**| `EmergencyDispatchModal.tsx`| Modal dispatch darurat Data Center Batam dengan form urgensi & garansi waktu respons SLA < 2 jam. | ✅ Aktif |
| **WIDGET-17**| `ClientPortalPreview.tsx` | Showcase interaktif alur kerja transparan & demo workspace klien (roadmap, staging preview, checklist). | ✅ Aktif |

---

## 3. Katalog API Route Handlers

| ID Endpoint | Path | Metode | Fungsi & Handler | Status |
| :--- | :--- | :--- | :--- | :--- |
| **API-01** | `/api/contact` | `POST` | Menerima pesan formulir kontak dan menyimpannya ke tabel `Contact` database PostgreSQL via Prisma. | ✅ Aktif |
| **API-02** | `/api/newsletter`| `POST` | Menerima pendaftaran email newsletter dan menyimpannya ke tabel `Newsletter` Prisma. | ✅ Aktif |
| **API-03** | `/api/download-profile`| `GET` | Menyajikan unduhan file Company Profile PDF resmi Audira Dev. | ✅ Aktif |
| **API-04** | `/api/admin/auth`| `POST`, `GET`, `DELETE` | Endpoint autentikasi admin via HttpOnly session cookies dan verifikasi password. | ✅ Aktif |
| **API-05** | `/api/admin/data`| `GET`, `DELETE` | Endpoint terlindungi untuk membaca/menghapus leads kontak dan subscriber, serta statistik portofolio & blog. | ✅ Aktif |
| **API-06** | `/api/emergency-dispatch`| `POST` | Endpoint prioritas tinggi untuk menangani panggilan teknisi darurat Data Center Batam. | ✅ Aktif |

