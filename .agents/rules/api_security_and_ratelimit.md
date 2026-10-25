# API SECURITY & RATE-LIMITING STANDARDS
> **Rule ID**: `SEC-API-PORTOFOLIO-01`  
> **Target**: Seluruh AI Agent, Backend Route Handlers (`app/api/**/route.ts`), dan Form Actions.  
> **Level**: MANDATORY (Pertahanan Sistem Terhadap Serangan & Bot Spam).

---

## 1. Validasi Input & Anti-XSS Sanitization

1. **Sanitasi String Wajib**: Seluruh input teks pengguna (nama, email, pesan) wajib melalui sanitasi HTML (`replace(/<[^>]*>/g, "")` atau sanitizer parser) sebelum diproses atau disimpan ke database.
2. **Validasi Email Ketat**: Format alamat email wajib divalidasi dengan regex standar RFC atau validator pustaka.
3. **Pencegahan Prototype Pollution**: Jangan menggunakan `Object.assign` langsung pada payload JSON request yang tidak divalidasi.

---

## 2. Throttling & In-Memory Rate Limiting

1. Setiap endpoint publik yang menerima mutasi data (`POST`, `PUT`, `DELETE` seperti `/api/contact` dan `/api/newsletter`) wajib dilindungi oleh proteksi laju request (Rate Limiting).
2. **Batas Standar**: Maksimum 5 request per menit per alamat IP (`x-forwarded-for`).
3. **Respons HTTP 429**: Jika ambang batas terlampaui, kembalikan response seragam:
   ```json
   { "error": "Rate limit exceeded. Please wait a moment." }
   ```
   dengan status HTTP `429 Too Many Requests`.

---

## 3. Pencegahan Kebocoran Informasi (Error Obfuscation)

1. Dalam blok `catch (error)` pada Route Handlers:
   * **Dilarang keras**: Mengembalikan objek `error.stack`, pesan internal database Prisma, atau kredensial server ke client (`return NextResponse.json({ err: error.message }, { status: 500 })`).
   * **Wajib**: Catat detail error ke `console.error` di server, lalu kembalikan pesan ramah umum ke pengguna:
     ```typescript
     return NextResponse.json(
       { error: "Internal server error. Silakan coba lagi nanti." },
       { status: 500 }
     );
     ```
