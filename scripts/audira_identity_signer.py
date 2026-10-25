#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
           AUDIRA CRYPTOGRAPHIC IDENTITY & DIGITAL SIGNATURE GENERATOR
                       Author: Agus Dwi Rianto (AUDIRA)
                       Official Domain: https://audira.my.id
                       Email: agusdwirianto@gmail.com
=============================================================================
Sistem resmi untuk menghasilkan, menandatangani, dan memvalidasi Tanda Tangan
Digital Kriptografis (Ed25519 + SHA-256) untuk ekosistem aplikasi AUDIRA:
- AUDIRA-NET-BILLING (TypeScript / Node.js / Next.js)
- AUDIRA-NET (Flutter / Dart)
- AUDIRA-REMOTE-DESKTOP (Rust / Desktop)
=============================================================================
"""

import os
import sys
import json
import hashlib
from pathlib import Path
from cryptography.hazmat.primitives.asymmetric import ed25519

SCRIPT_DIR = Path(__file__).parent.resolve()
ROOT_DIR = SCRIPT_DIR.parent
KEY_FILE = ROOT_DIR / ".audira_author.key"
PUB_FILE = ROOT_DIR / "AgusDwiR_Audira_Ed25519.pub"

# Canonical Identity Payload
IDENTITY_PAYLOAD = {
    "brand": "AUDIRA",
    "author": "Agus Dwi Rianto",
    "alias": "AUDIRA",
    "organization": "Audira Multimedia Digital / Audira Sukses Mandiri",
    "official_domain": "https://audira.my.id",
    "official_email": "agusdwirianto@gmail.com",
    "license": "AUDIRA Commercial & Proprietary Software License",
    "security_protocol": "Zero-Trust Cryptographic Identity Seal (Ed25519 + SHA256)",
    "immutable_identifier": "AUDIRA-ID-SEAL-2026-AGUS-DWI-RIANTO-PROPRIETARY"
}

def get_canonical_bytes(data: dict) -> bytes:
    return json.dumps(data, sort_keys=True, separators=(',', ':')).encode('utf-8')

def load_or_create_keypair():
    if KEY_FILE.exists():
        print(f"[*] Membaca Master Private Key dari: {KEY_FILE}")
        with open(KEY_FILE, "rb") as f:
            priv_bytes = f.read()
        private_key = ed25519.Ed25519PrivateKey.from_private_bytes(priv_bytes)
    else:
        print(f"[*] Menghasilkan Master Private Key baru untuk Agus Dwi Rianto...")
        private_key = ed25519.Ed25519PrivateKey.generate()
        raw_priv = private_key.private_bytes_raw()
        with open(KEY_FILE, "wb") as f:
            f.write(raw_priv)
        print(f"[+] Master Private Key disimpan di: {KEY_FILE}")
    
    public_key = private_key.public_key()
    raw_pub = public_key.public_bytes_raw()
    with open(PUB_FILE, "wb") as f:
        f.write(raw_pub)
    print(f"[+] Public Key disimpan di: {PUB_FILE}")
    return private_key, public_key

def generate_typescript_module(pub_hex: str, sig_hex: str, payload_json: str, sha256_hex: str) -> str:
    return f"""/**
 * =============================================================================
 *      AUDIRA CRYPTOGRAPHIC IDENTITY & DIGITAL SIGNATURE ANCHOR (OFFICIAL)
 *                    Created by Agus Dwi Rianto (AUDIRA)
 *                    Organization: Audira Multimedia Digital
 *                    Official Domain: https://audira.my.id
 * =============================================================================
 * Modul integritas digital resmi. Memverifikasi bahwa aplikasi dijalankan
 * dengan tanda tangan kriptografis asli milik Agus Dwi Rianto (AUDIRA).
 * Jika ada pihak yang memodifikasi nama atau lisensi, verifikasi akan gagal.
 * =============================================================================
 */

import * as crypto from 'crypto';

export const OFFICIAL_AUTHOR = "Agus Dwi Rianto (AUDIRA)";
export const OFFICIAL_ORG = "Audira Multimedia Digital / Audira Sukses Mandiri";
export const OFFICIAL_DOMAIN = "https://audira.my.id";
export const OFFICIAL_EMAIL = "agusdwirianto@gmail.com";
export const IMMUTABLE_ID = "AUDIRA-ID-SEAL-2026-AGUS-DWI-RIANTO-PROPRIETARY";

export const CANONICAL_SHA256 = "{sha256_hex}";
export const AUTHOR_PUBLIC_KEY_HEX = "{pub_hex}";
export const AUTHOR_SIGNATURE_HEX = "{sig_hex}";
export const CANONICAL_PAYLOAD_STRING = {repr(payload_json)};

export interface IdentityStatus {{
  isValid: boolean;
  author: string;
  organization: string;
  domain: string;
  fingerprint: string;
  details: string;
}}

/**
 * Memverifikasi integritas payload dan tanda tangan digital Ed25519
 */
export function verifyAudiraSignature(): IdentityStatus {{
  try {{
    // 1. Verifikasi Hash SHA-256
    const calculatedHash = crypto
      .createHash('sha256')
      .update(CANONICAL_PAYLOAD_STRING, 'utf8')
      .digest('hex');

    if (calculatedHash !== CANONICAL_SHA256) {{
      return {{
        isValid: false,
        author: 'UNKNOWN / TAMPERED',
        organization: 'UNAUTHORIZED',
        domain: 'INVALID',
        fingerprint: calculatedHash,
        details: 'Integrity check failed: Payload hash does not match canonical SHA-256!',
      }};
    }}

    // 2. Verifikasi Ed25519 Signature
    const publicKeyBuffer = Buffer.from(AUTHOR_PUBLIC_KEY_HEX, 'hex');
    const signatureBuffer = Buffer.from(AUTHOR_SIGNATURE_HEX, 'hex');
    const payloadBuffer = Buffer.from(CANONICAL_PAYLOAD_STRING, 'utf8');

    // Buat SPKI format untuk Ed25519 Public Key
    const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
    const fullPublicKey = Buffer.concat([spkiPrefix, publicKeyBuffer]);

    const isVerified = crypto.verify(
      null,
      payloadBuffer,
      {{
        key: fullPublicKey,
        format: 'der',
        type: 'spki',
      }},
      signatureBuffer
    );

    if (isVerified) {{
      return {{
        isValid: true,
        author: OFFICIAL_AUTHOR,
        organization: OFFICIAL_ORG,
        domain: OFFICIAL_DOMAIN,
        fingerprint: CANONICAL_SHA256,
        details: 'Official Authentic AUDIRA Build - Cryptographically Verified',
      }};
    }} else {{
      return {{
        isValid: false,
        author: 'UNKNOWN / TAMPERED',
        organization: 'UNAUTHORIZED',
        domain: 'INVALID',
        fingerprint: CANONICAL_SHA256,
        details: 'Cryptographic signature verification failed! Code tampering detected.',
      }};
    }}
  }} catch (err: any) {{
    return {{
      isValid: false,
      author: 'ERROR',
      organization: 'ERROR',
      domain: 'ERROR',
      fingerprint: '',
      details: `Verification exception: ${{err.message}}`,
    }};
  }}
}}

/**
 * Validasi ketat saat booting server/aplikasi
 */
export function enforceAudiraAuthenticity(): void {{
  const status = verifyAudiraSignature();
  if (!status.isValid) {{
    console.error('======================================================================');
    console.error(' [SECURITY CRITICAL] AUDIRA TAMPER DETECTION TRIGGERED!');
    console.error(` Details: ${{status.details}}`);
    console.error(' Aplikasi ini adalah hak cipta resmi Agus Dwi Rianto (AUDIRA).');
    console.error(' Modifikasi ilegal terdeteksi. Proses dihentikan demi keamanan.');
    console.error('======================================================================');
    process.exit(1);
  }} else {{
    console.log(`[AUDIRA-SECURITY] Digital Signature VERIFIED: ${{status.author}} (${{status.domain}})`);
  }}
}}
"""

def generate_rust_module(pub_bytes: bytes, sig_bytes: bytes, payload_bytes: bytes, sha256_hex: str) -> str:
    pub_array = ", ".join(f"0x{b:02x}" for b in pub_bytes)
    sig_array = ", ".join(f"0x{b:02x}" for b in sig_bytes)
    payload_array = ", ".join(f"0x{b:02x}" for b in payload_bytes)
    
    return f"""// =============================================================================
//      AUDIRA CRYPTOGRAPHIC IDENTITY & DIGITAL SIGNATURE ANCHOR (OFFICIAL)
//                    Created by Agus Dwi Rianto (AUDIRA)
//                    Organization: Audira Multimedia Digital
//                    Official Domain: https://audira.my.id
// =============================================================================

use hbb_common::sodiumoxide::crypto::sign;
use sha2::{{Digest, Sha256}};

pub const OFFICIAL_AUTHOR: &str = "Agus Dwi Rianto (AUDIRA)";
pub const OFFICIAL_ORG: &str = "Audira Multimedia Digital / Audira Sukses Mandiri";
pub const OFFICIAL_DOMAIN: &str = "https://audira.my.id";
pub const CANONICAL_SHA256: &str = "{sha256_hex}";

pub const AUTHOR_PUBLIC_KEY: [u8; 32] = [
    {pub_array}
];

pub const AUTHOR_SIGNATURE: [u8; 64] = [
    {sig_array}
];

pub const CANONICAL_PAYLOAD_BYTES: &[u8] = &[
    {payload_array}
];

pub fn verify_identity() -> bool {{
    let mut hasher = Sha256::new();
    hasher.update(CANONICAL_PAYLOAD_BYTES);
    let calculated_hash = format!("{{:x}}", hasher.finalize());
    if calculated_hash != CANONICAL_SHA256 {{
        return false;
    }}

    let pk = sign::PublicKey(AUTHOR_PUBLIC_KEY);
    let sig = sign::Signature(AUTHOR_SIGNATURE);
    sign::verify_detached(&sig, CANONICAL_PAYLOAD_BYTES, &pk)
}}

pub fn enforce_identity() -> bool {{
    if !verify_identity() {{
        eprintln!("[CRITICAL SECURITY] AUDIRA Digital Signature is invalid! Program terminated.");
        std::process::exit(1);
    }}
    true
}}
"""

def main():
    print("=" * 76)
    print("      AUDIRA CRYPTOGRAPHIC IDENTITY & DIGITAL SIGNATURE GENERATOR")
    print("                 Author: Agus Dwi Rianto (AUDIRA)")
    print("=" * 76)
    
    priv_key, pub_key = load_or_create_keypair()
    raw_pub = pub_key.public_bytes_raw()
    
    payload_bytes = get_canonical_bytes(IDENTITY_PAYLOAD)
    payload_str = payload_bytes.decode('utf-8')
    sha256_hash = hashlib.sha256(payload_bytes).hexdigest()
    sig_bytes = priv_key.sign(payload_bytes)
    
    pub_key.verify(sig_bytes, payload_bytes)
    print("[+] Verifikasi mandiri Ed25519: VALID!")
    print(f"[+] SHA-256 Fingerprint: {sha256_hash}")
    print(f"[+] Public Key (Hex)   : {raw_pub.hex()}")
    print(f"[+] Signature (Hex)    : {sig_bytes.hex()}")
    
    # 1. Output TypeScript Module for AUDIRA-BILLING
    ts_code = generate_typescript_module(raw_pub.hex(), sig_bytes.hex(), payload_str, sha256_hash)
    ts_target = ROOT_DIR / "AUDIRA-BILLING" / "apps" / "backend" / "src" / "common" / "audira-signature.ts"
    ts_target.parent.mkdir(parents=True, exist_ok=True)
    with open(ts_target, "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"[+] Generated TypeScript Signature Module: {ts_target}")

    # 2. Output Rust Module for AUDIRA-REMOTE-DESKTOP
    rust_code = generate_rust_module(raw_pub, sig_bytes, payload_bytes, sha256_hash)
    rust_target = ROOT_DIR / "scripts" / "audira_signature_rust.rs"
    with open(rust_target, "w", encoding="utf-8") as f:
        f.write(rust_code)
    print(f"[+] Generated Rust Reference Module: {rust_target}")

    # 3. Output Summary JSON for Distribution
    meta_json = {
        "identity": IDENTITY_PAYLOAD,
        "sha256_fingerprint": sha256_hash,
        "ed25519_public_key_hex": raw_pub.hex(),
        "ed25519_signature_hex": sig_bytes.hex()
    }
    meta_target = ROOT_DIR / "scripts" / "audira_signature_seal.json"
    with open(meta_target, "w", encoding="utf-8") as f:
        json.dump(meta_json, f, indent=2)
    print(f"[+] Saved Metadata & Seal JSON: {meta_target}")
    
    print("=" * 76)
    print("SELESAI! Tanda tangan digital kriptografis telah dibuat secara mandiri.")
    print("=" * 76)

if __name__ == "__main__":
    main()
