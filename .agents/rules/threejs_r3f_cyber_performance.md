# THREE.JS & R3F CYBERSCENE PERFORMANCE RULES
> **Rule ID**: `R3F-CYBER-01`  
> **Target**: Seluruh AI Agent, Komponen 3D, WebGL Shaders, dan Animasi Canvas.  
> **Level**: MANDATORY (Kinerja WebGL dan Pencegahan Memory Leak).

---

## 1. Konteks 3D Canvas di AUDIRA DEV

Proyek ini menggunakan Three.js (`three`), `@react-three/fiber`, dan `@react-three/drei` untuk merender background 3D futuristik di Hero section (`components/CyberScene.tsx`), yang terdiri dari:
- Bola terdistorsi dinamis (`MeshDistortMaterial`) kawat biru neon.
- Grid siber 3D (`TechGrid` / `gridHelper`).
- Tata cahaya titik ganda (Neon Blue `#0070f3` dan Neon Purple `#7928ca`).

---

## 2. Aturan Kinerja WebGL & DPR Clamping

1. **Pixel Ratio Clamping**:
   - Canvas R3F WAJIB dibatasi dengan `dpr={[1, 1.5]}`.
   - Dilarang membiarkan DPR naik hingga 3.0x pada layar Retina/HiDPI karena akan meningkatkan beban shader GPU hingga sembilan kali lipat tanpa penambahan kualitas visual yang berarti.
2. **Mobile Guard & Fallback**:
   - Canvas 3D HANYA BOLEH dirender jika viewport memenuhi lebar minimum desktop (`window.matchMedia("(min-width: 768px)")`).
   - Pada layar mobile (`< 768px`), komponen WAJIB merender fallback CSS murni (`animate-pulse-glow` & `animate-float`) untuk menghemat baterai ponsel pengguna.

---

## 3. Aturan `useFrame` Render Loop

Dalam loop render `useFrame((_, delta) => { ... })`:
1. **Dilarang Alokasi Objek Baru**:
   - ⛔ JANGAN pernah membuat `new THREE.Vector3()`, `new THREE.Color()`, atau `new THREE.Matrix4()` di dalam `useFrame`.
   - ✅ Gunakan delta time untuk rotasi mulus: `meshRef.current.rotation.x = timeRef.current * 0.2`.
2. **Dilarang Memanggil React `setState`**:
   - ⛔ JANGAN memanggil hook setter React di dalam `useFrame` yang berjalan 60 kali per detik. Hal ini akan memicu re-render tak berujung pada pohon React.
   - ✅ Mutasikan properti objek Three.js secara langsung melalui `ref.current`.

---

## 4. Disposal Protocol

Pastikan geometri dan material bawaan yang dibuat secara imperatif (jika ada) dibersihkan saat komponen di-unmount menggunakan `.dispose()` untuk mencegah memory leak WebGL.
