# SECURITY — AUDIRA-NET & BILLING SECURITY STANDARDS

> Threat Model, Authentication Hygiene, MikroTik Vaulting, and Webhook Defense.  
> **Version:** v2.0.0-prod  
> **Author & Maintainer:** Agus Dwi Rianto (AUDIRA)  

---

## 1. Authentication & Role-Based Access Control (RBAC)

1. **JWT Architecture**:
   - Access token berbasis stateless JSON Web Token dengan expiration pendek (15 - 60 menit).
   - Penggunaan Refresh Token yang disimpan aman di storage/cookie.
2. **Hierarki Role & Permission**:
   - `ADMIN`: Akses penuh terhadap seluruh modul finansial, pengaturan router, karyawan, dan audit.
   - `BILLING`: Mengelola pelanggan, membuat invoice, konfirmasi pembayaran, dan refund.
   - `CS` (Customer Service): Membuat tiket gangguan, memeriksa status koneksi, pendaftaran pelanggan baru.
   - `NOC`: Akses router MikroTik, ODC/ODP, konfigurasi IP, dan pemantauan redaman GenieACS.
   - `TECHNICIAN`: Hanya dapat melihat tiket kerja / PSB yang ditugaskan kepada mereka di aplikasi mobile.
   - `CUSTOMER`: Akses terbatas pada data langganan, riwayat invoice, dan pembuatan tiket bantuan pribadi.

---

## 2. MikroTik & Infrastructure Vaulting

1. **Router Credentials**:
   - Jangan pernah menyimpan kata sandi router MikroTik dalam bentuk plaintext di log atau response API publik.
   - Komunikasi ke RouterOS wajib melalui API port aman atau terisolasi dalam jaringan manajemen privat (VPN/VLAN).
2. **RADIUS Security**:
   - Shared secret antara MikroTik NAS dan FreeRADIUS harus menggunakan kombinasi karakter acak yang kuat minimal 16 karakter.
   - Port autentikasi (1812) dan akunting (1813) dibatasi hanya untuk IP NAS yang terdaftar di database.

---

## 3. Payment Gateway Webhook Defense (Midtrans)

1. **Signature Verification**:
   - Setiap webhook notifikasi pembayaran yang masuk dari Midtrans wajib diverifikasi signature hash-nya:
     ```typescript
     const signatureKey = crypto.createHash('sha512')
       .update(`${order_id}${status_code}${gross_amount}${server_key}`)
       .digest('hex');
     if (signatureKey !== req.body.signature_key) {
       throw new UnauthorizedException('Invalid payment signature');
     }
     ```
2. **Idempotency**:
   - Webhook yang dikirim berulang kali untuk ID transaksi yang sama tidak boleh menyebabkan pelunasan invoice ganda atau kredit komisi dobel.

---

## 4. Perlindungan Data Pelanggan (PII)

- Nomor WhatsApp, foto KTP, dan alamat rumah pelanggan dilindungi dari crawling atau paparan tidak sah.
- Data export hanya dapat diunduh oleh role berwenang (`ADMIN` atau `BILLING`) dan aktivitas ekspor dicatat di Audit Log.
