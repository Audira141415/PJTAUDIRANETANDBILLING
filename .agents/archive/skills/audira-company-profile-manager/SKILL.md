---
name: audira-company-profile-manager
description: >-
  Use this skill when updating, generating, or managing company profile downloads,
  proposal media kits, and company metadata in AUDIRA DEV.
---

# Audira Company Profile & Media Kit Manager Skill

Petunjuk operasional untuk mengelola profil resmi perusahaan, paket proposal, dan media kit unduhan di website **AUDIRA DEV**.

---

## 1. Lokasi Berkas & Endpoint Download

* **API Route Profile**: `app/api/download-profile/route.ts`
* **Public Assets & Media**: `public/` (logo vektor, icon, dan dokumen ringkasan).
* **CTA Button**: Diletakkan pada halaman Hero ([app/page.tsx](file:///f:/AUIDRA-PORTOFOLIO/app/page.tsx)) dan halaman About ([app/about/page.tsx](file:///f:/AUIDRA-PORTOFOLIO/app/about/page.tsx)).

---

## 2. Standar Data Perusahaan Resmi

Setiap teks profil resmi yang dihasilkan atau diunduh wajib memuat data akurat:
* **Entitas**: AUDIRA DEV / Audira Multimedia Digital / Audira Sukses Mandiri.
* **Founder & Lead Developer**: Agus Dwi Rianto (AUDIRA).
* **Lokasi**: Batam, Kepulauan Riau, Indonesia.
* **Official Website**: `https://audira.my.id`.
* **Official Email**: `agusdwirianto@gmail.com`.
* **WhatsApp Hotline**: `+62 821-1200-1600`.
* **Tagline**: *"Code the Future, Automate the Rest"*.

---

## 3. Alur Pembaruan Dokumen Profil

1. Buka [app/api/download-profile/route.ts](file:///f:/AUIDRA-PORTOFOLIO/app/api/download-profile/route.ts).
2. Perbarui ringkasan statistik (jumlah proyek terselesaikan, pilar layanan baru, atau sertifikasi teknologi terbaru).
3. Pastikan header respons menyertakan:
   ```typescript
   headers: {
     "Content-Type": "text/plain; charset=utf-8",
     "Content-Disposition": 'attachment; filename="audira-dev-company-profile.txt"',
     "Cache-Control": "public, max-age=3600, s-maxage=3600",
   }
   ```
4. Verifikasi klik tombol download dari browser untuk memastikan file terunduh dengan utuh dan format UTF-8 rapi.
