# DATABASE & DATA FLOW — AUDIRA DEV
> **Data Schemas, Entity Relationships, Prisma ORM, and Form-to-Database Flow**  
> *Spesifikasi Alur Pengiriman Data Formulir, Model Database PostgreSQL, dan Penanganan Data.*

---

## 1. Diagram Siklus Alur Data (Data Flow Cycle)

```text
[ Pengguna Mengisi Form Kontak / Newsletter ]
                     |
                     v
[ Client Component (onSubmit) ]
                     |  fetch() dengan body JSON
                     v
[ Next.js Route Handler (/api/contact atau /api/newsletter) ]
                     |
                     +---> [ Validasi Input String & Email ]
                     |
                     v
[ Prisma Client Singleton (lib/prisma.ts) ]
                     |
                     v
[ PostgreSQL Database (Tabel: Contact / Newsletter) ]
                     |
                     v
[ Respon JSON { success: true } dikembalikan ke Klien ]
                     |
                     v
[ Notifikasi Sukses / Pesan Konfirmasi Ditampilkan ke Pengguna ]
```

---

## 2. Skema Model Prisma (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  image       String?
  category    String
  link        String?
  createdAt   DateTime @default(now())
}

model Newsletter {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
}

model BlogPost {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  title       String
  excerpt     String
  content     String
  category    String
  readTime    String
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ClientAccount {
  id              Int      @id @default(autoincrement())
  accessKey       String   @unique
  contractCode    String   @unique
  companyName     String
  picName         String
  email           String
  phone           String
  serviceType     String
  projectBrief    String?
  status          String   @default("ACTIVE")
  overallProgress Int      @default(25)
  currentPhase    String   @default("Milestone 1: Project Provisioning & Architecture Alignment")
  stagingUrl      String?
  githubRepo      String?
  nextWeeklyDemo  String?  @default("Friday, 16:00 SGT (Google Meet)")
  hoursUsed       Int      @default(0)
  hoursTotal      Int      @default(40)
  dcVisits        Int      @default(0)
  tier            String   @default("ENTERPRISE_WEB")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 3. Data File Statis (`lib/portfolio-data.ts` & `lib/blog-data.ts`)

Untuk kecepatan maksimal dan SEO tanpa dependensi query database saat proses build SSG (*Static Site Generation*):
- Data portofolio utama disimpan langsung dalam file TypeScript di `lib/portfolio-data.ts`.
- Data blog teknis disimpan di `lib/blog-data.ts`.
- Model Prisma `Project` dan `BlogPost` disiapkan sebagai fondasi masa depan saat dashboard CMS admin diaktifkan.
