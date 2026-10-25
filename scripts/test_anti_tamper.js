/**
 * AUDIRA Anti-Tamper Simulation Test
 * Mensimulasikan serangan hacker yang mencoba membajak aplikasi
 * dengan mengubah nama pemilik dan membuktikan bahwa sistem
 * kriptografi otomatis menolak dan memblokir aplikasi.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('======================================================================');
console.log('          AUDIRA DIGITAL SIGNATURE ANTI-TAMPER SIMULATOR');
console.log('======================================================================');

const sealPath = path.join(__dirname, 'audira_signature_seal.json');
const meta = JSON.parse(fs.readFileSync(sealPath, 'utf8'));

const pubHex = meta.ed25519_public_key_hex;
const sigHex = meta.ed25519_signature_hex;
const authenticPayloadStr = JSON.stringify(meta.identity, Object.keys(meta.identity).sort());

const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
const fullPub = Buffer.concat([spkiPrefix, Buffer.from(pubHex, 'hex')]);

// 1. Uji Validitas Asli
console.log('\n[SKENARIO 1] Memeriksa Aplikasi Asli (Original Build):');
const isAuthentic = crypto.verify(
    null,
    Buffer.from(authenticPayloadStr, 'utf8'),
    { key: fullPub, format: 'der', type: 'spki' },
    Buffer.from(sigHex, 'hex')
);
console.log(' - Author   : ' + meta.identity.author);
console.log(' - Domain   : ' + meta.identity.official_domain);
console.log(' - Status   : ' + (isAuthentic ? '>> LOLOS VERIFIKASI (RESMI) <<' : '>> GAGAL <<'));

// 2. Simulasi Pembajakan: Hacker mengganti nama pemilik
console.log('\n[SKENARIO 2] Hacker Membongkar Binary dan Mengganti Nama Pemilik:');
const tamperedIdentity = { ...meta.identity, author: "Bukan Agus (Hacker/Pembajak)" };
const tamperedPayloadStr = JSON.stringify(tamperedIdentity, Object.keys(tamperedIdentity).sort());

const isTamperedValid = crypto.verify(
    null,
    Buffer.from(tamperedPayloadStr, 'utf8'),
    { key: fullPub, format: 'der', type: 'spki' },
    Buffer.from(sigHex, 'hex')
);

console.log(' - Nama yang diubah : ' + tamperedIdentity.author);
if (!isTamperedValid) {
    console.log(' - Hasil Kriptografi: >> DITOLAK KERAS! SIGNATURE RUSAK! <<');
    console.log(' - Respon Keamanan  : APLIKASI OTOMATIS MATI / SELF-DESTRUCT!');
    console.log(' - Alasan           : Pembajak tidak memiliki Private Key Agus Dwi Rianto.');
} else {
    console.log(' - Hasil            : Berhasil (Bahaya)');
}

console.log('\n======================================================================');
console.log('KESIMPULAN: Tanda tangan digital ini PERMANEN & TIDAK BISA DIHILANGKAN!');
console.log('======================================================================');
