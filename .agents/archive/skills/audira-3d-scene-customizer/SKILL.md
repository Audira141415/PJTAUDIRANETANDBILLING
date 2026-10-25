---
name: audira-3d-scene-customizer
description: >-
  Use this skill when modifying, tuning, or debugging Three.js, React Three Fiber,
  CyberScene animations, 3D lights, materials, or WebGL responsive fallbacks in AUDIRA DEV.
---

# Audira 3D Scene Customizer & WebGL Skill

Petunjuk operasional untuk mengonfigurasi komponen 3D interaktif Three.js / `@react-three/fiber` di `components/CyberScene.tsx`.

---

## 1. Komponen Utama 3D

- **`CyberScene.tsx`**: Host kanvas Three.js utama di belakang Hero section.
- **`AnimatedSphere`**: Bola 3D geometris dengan `MeshDistortMaterial`, warna biru elektrik `#0070f3`, kecepatan distorsi dinamis, dan efek wireframe.
- **`TechGrid`**: Grid siber bantuan teknis (`gridHelper`) dengan perpaduan warna biru neon dan abu-abu.
- **Pencahayaan**:
  - `ambientLight` intensitas 0.5.
  - `pointLight` posisi `[10, 10, 10]` warna `#0070f3` (Electric Blue).
  - `pointLight` posisi `[-10, -10, -10]` warna `#7928ca` (Electric Purple).

---

## 2. Tuning Parameter Visual

Jika ingin mengubah kecepatan putar, amplitudo distorsi, atau skala bola:
- **Distorsi**: Modifikasi properti `distort={0.4}` dan `speed={2}` di `MeshDistortMaterial`.
- **Rotasi**: Sesuaikan pengali delta waktu di `useFrame`:
  ```typescript
  meshRef.current.rotation.x = timeRef.current * 0.2;
  meshRef.current.rotation.y = timeRef.current * 0.3;
  ```
- **Ukuran Bola**: Sesuaikan argumen sphere `args={[1, 64, 64]}` dan `scale={2.4}`.

---

## 3. Verifikasi Kinerja

1. **Jaga FPS 60**: Gunakan Chrome Performance / Three.js Inspector untuk memastikan tidak ada drop frame.
2. **Uji Responsive**: Pastikan pada layar `< 768px`, kanvas 3D unmount secara otomatis dan digantikan oleh fallback CSS pulse.
