---
name: audira-performance-benchmark
description: >-
  Use this skill when auditing Next.js bundle sizes, analyzing Three.js WebGL draw calls,
  validating mobile fallbacks, and optimizing Core Web Vitals in AUDIRA DEV.
---

# Audira Performance Benchmark & Optimization Skill

Petunjuk operasional untuk memonitor, mengukur, dan mengoptimalkan performa loading, bundle footprint, serta rendering 3D WebGL di **AUDIRA DEV**.

---

## 1. Metrik Target Performa AUDIRA DEV

* **Lighthouse Performance Score**: $\ge 90$ pada Desktop, $\ge 80$ pada Mobile.
* **First Contentful Paint (FCP)**: $< 1.2\text{s}$.
* **Largest Contentful Paint (LCP)**: $< 2.5\text{s}$.
* **Cumulative Layout Shift (CLS)**: $< 0.1$.
* **Three.js Frame Budget**: Stabil 60 FPS pada Desktop, 0 FPS (Fallback CSS murni) pada layar mobile $< 768\text{px}$.

---

## 2. Prosedur Audit Kompilasi & Bundle Size

Jalankan kompilasi Next.js untuk menganalisis ukuran chunk halaman:

```bash
npm run build
```

Perhatikan output tabel rute Next.js:
* **First Load JS shared by all**: Harus di bawah 120 kB.
* **Halaman individual**: Rute non-3D (`/about`, `/pricing`, `/contact`, `/team`) tidak boleh memuat bundle Three.js / `@react-three/fiber`.

---

## 3. WebGL & Three.js Optimization Directives

Komponen 3D `CyberScene.tsx` wajib mematuhi aturan penghematan sumber daya:

1. **DPR Clamping**:
   - Batasi Device Pixel Ratio: `<Canvas dpr={[1, 1.5]}>`.
   - Hindari render pada DPR $> 2$ yang memboroskan GPU pada layar Retina/4K.
2. **Mobile Guard (Screen Breakpoint)**:
   - Komponen 3D tidak boleh di-mount pada viewport mobile (`< 768px`).
   - Gunakan fallback gradient CSS glow `CyberpunkGrid` tanpa overhead WebGL.
3. **Geometry & Material Cleanup**:
   - Selalu dispose geometry dan material ketika scene di-unmount.
   - Hindari pembuatan objek Three.js baru (`new THREE.Vector3()`) di dalam loop `useFrame`.

---

## 4. Asset & Font Optimization Checklist

* **Image Formats**: Utamakan format WebP atau SVG vektor tajam.
* **Next.js `<Image>`**: Selalu tentukan properti `width`, `height`, dan `priority` hanya pada banner Hero teratas untuk menghindari CLS.
* **Font Loading**: Gunakan `next/font` dengan subset `latin` dan `display: 'swap'`.
