---
name: audira-leads-inspector
description: >-
  Use this skill when inspecting, verifying, querying, or testing Contact inquiries,
  Newsletter subscribers, honeypot anti-spam, and rate-limiting records in AUDIRA DEV.
---

# Audira Leads & Inquiries Inspector Skill

Petunjuk operasional untuk memverifikasi, menginspeksi, dan menguji masuknya data calon klien (Contact Leads) dan pelanggan Newsletter di sistem backend **AUDIRA DEV**.

---

## 1. Arsitektur Data Leads

Data leads dikelola melalui Prisma ORM dengan entitas:
* **`Contact`**: Menyimpan pesan prospek (`id`, `name`, `email`, `message`, `createdAt`).
* **`Newsletter`**: Menyimpan email subscriber unik (`id`, `email`, `createdAt`).
* **Route Handlers**:
  * `POST /api/contact` ([app/api/contact/route.ts](file:///f:/AUIDRA-PORTOFOLIO/app/api/contact/route.ts))
  * `POST /api/newsletter` ([app/api/newsletter/route.ts](file:///f:/AUIDRA-PORTOFOLIO/app/api/newsletter/route.ts))

---

## 2. Prosedur Inspeksi Data via Prisma Studio

Cara tercepat dan teraman untuk menginspeksi leads secara visual:

```bash
# Menjalankan Prisma Studio di port 5555
npx prisma studio
```
Buka browser pada `http://localhost:5555` untuk melihat daftar pesan kontak terbaru, memeriksa data uji coba, atau mengekspor leads.

---

## 3. Inspeksi Cepat via Script Node.js / Prisma Client

Untuk melihat leads terbaru tanpa membuka browser:

```bash
node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); p.contact.findMany({ take: 5, orderBy: { createdAt: 'desc' } }).then(r => console.table(r)).finally(() => p.$disconnect());"
```

---

## 4. Pengujian Keamanan & Rate Limiting

1. **Anti-Spam & Sanitasi**:
   - Pastikan tag HTML liar (`<script>`, `<style>`) dibersihkan oleh `sanitize()` sebelum disimpan ke database.
2. **Rate Limiting Guard**:
   - Endpoint `/api/contact` membatasi maksimal 5 request per menit per IP.
   - Uji batas ini menggunakan cURL atau script testing untuk memastikan HTTP 429 (`Rate limit exceeded`) dipicu dengan tepat.
3. **Validasi Email Format**:
   - Pastikan input email palsu (`bukan-email`) ditolak dengan HTTP 400.
