---
name: audira-prisma-database
description: >-
  Use this skill when managing prisma/schema.prisma, running migrations, generating
  the Prisma Client, or inspecting PostgreSQL tables for AUDIRA DEV.
---

# Audira Prisma & Database Management Skill

Petunjuk operasional untuk mengelola skema database, migrasi, dan query data di **AUDIRA DEV**.

---

## 1. Arsitektur Model Database (`prisma/schema.prisma`)

Database menggunakan PostgreSQL dengan 5 model utama:

1. **`Contact`**: Menyimpan pesan prospek dari formulir kontak web.
   - Kolom: `id`, `name`, `email`, `message`, `createdAt`.
2. **`Newsletter`**: Menyimpan email pelanggan langganan newsletter.
   - Kolom: `id`, `email` (unique), `createdAt`.
3. **`Project`**: Menyimpan entri data proyek dinamis jika disimpan di database.
   - Kolom: `id`, `title`, `description`, `image`, `category`, `link`, `createdAt`.
4. **`BlogPost`**: Menyimpan artikel blog terbitan.
   - Kolom: `id`, `slug` (unique), `title`, `excerpt`, `content`, `category`, `readTime`, `published`, `createdAt`, `updatedAt`.
5. **`ClientAccount`**: Menyimpan entri registrasi akun klien & proyek portal.
   - Kolom: `id`, `accessKey` (unique), `contractCode` (unique), `companyName`, `picName`, `email`, `phone`, `serviceType`, `projectBrief`, `status`, `overallProgress`, `currentPhase`, `stagingUrl`, `githubRepo`, `nextWeeklyDemo`, `hoursUsed`, `hoursTotal`, `dcVisits`, `tier`, `createdAt`, `updatedAt`.

---

## 2. Perintah Operasional Database

```bash
# 1. Regenerate TypeScript client types setelah update schema
npx prisma generate

# 2. Buat file migrasi baru dan terapkan ke database (mode dev)
npx prisma migrate dev --name tambah_kolom_baru

# 3. Buka Prisma Studio web GUI untuk inspeksi data tabel secara visual
npx prisma studio

# 4. Push skema langsung ke database tanpa file migrasi (prototipe cepat)
npx prisma db push
```

---

## 3. Singleton Client Access

Selalu panggil client database dari singleton wrapper:

```typescript
import { prisma } from "@/lib/prisma";

// Query kontak terbaru
const contacts = await prisma.contact.findMany({
  orderBy: { createdAt: "desc" },
});
```
