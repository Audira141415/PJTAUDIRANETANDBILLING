/**
 * AUDIRA Digital Signature Verifier
 * Author: Agus Dwi Rianto (AUDIRA)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const sealPath = path.join(__dirname, 'audira_signature_seal.json');

if (!fs.existsSync(sealPath)) {
    console.error('[!] File audira_signature_seal.json tidak ditemukan.');
    process.exit(1);
}

try {
    const meta = JSON.parse(fs.readFileSync(sealPath, 'utf8'));
    const pubHex = meta.ed25519_public_key_hex;
    const sigHex = meta.ed25519_signature_hex;
    const payloadStr = JSON.stringify(meta.identity, Object.keys(meta.identity).sort());

    const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
    const fullPub = Buffer.concat([spkiPrefix, Buffer.from(pubHex, 'hex')]);

    const isVerified = crypto.verify(
        null,
        Buffer.from(payloadStr, 'utf8'),
        { key: fullPub, format: 'der', type: 'spki' },
        Buffer.from(sigHex, 'hex')
    );

    if (isVerified) {
        console.log(' [+] STATUS          : TERVERIFIKASI ASLI (AUTHENTIC)');
        console.log(' [+] AUTHOR          : ' + meta.identity.author + ' (' + meta.identity.alias + ')');
        console.log(' [+] ORGANIZATION    : ' + meta.identity.organization);
        console.log(' [+] DOMAIN RESMI    : ' + meta.identity.official_domain);
        console.log(' [+] FINGERPRINT SHA : ' + meta.sha256_fingerprint);
        console.log(' [+] PUBLIC KEY      : ' + pubHex.substring(0, 32) + '...');
        console.log(' [+] SIGNATURE SEAL  : ' + sigHex.substring(0, 32) + '...');
        console.log('\n >> Tanda tangan digital kriptografis MELEKAT dan SAH!');
        process.exit(0);
    } else {
        console.log(' [!] STATUS          : PALSU / TELAH DIMODIFIKASI SECARA ILEGAL!');
        process.exit(1);
    }
} catch (e) {
    console.error(' [!] Error memeriksa signature: ' + e.message);
    process.exit(1);
}
