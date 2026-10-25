---
name: audira-component-creator
description: >-
  Use this skill when designing or scaffolding new UI components adhering strictly to
  Neo-Brutalism + Cyberpunk guidelines, Electric Neon tokens, and Framer Motion micro-interactions.
---

# Audira Component Creator Skill (Neo-Brutalism System)

Petunjuk operasional untuk merancang, memprogram, dan menstandarisasi komponen antarmuka pengguna (UI) di **AUDIRA DEV** dengan gaya **Neo-Brutalism + Cyberpunk Studio**.

---

## 1. Design Tokens & Visual Hierarchy

Setiap komponen baru wajib merefleksikan palet warna dan karakteristik geometris berikut:
* **Border**: `border-2 border-black dark:border-gray-700`
* **Hard Shadow**: `shadow-[6px_6px_0px_#05070d] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.15)]`
* **Hover Interaction**: `hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#05070d]`
* **Aksen Neon**:
  * Cyan / Electric Blue: `#0070f3` (`text-[#0070f3]` / `bg-[#0070f3]`)
  * Electric Purple / Violet: `#7928ca` (`text-[#7928ca]` / `bg-[#7928ca]`)
  * Deep Midnight Background: `#05070d` / `#0a0e1a`

---

## 2. Template Boilerplate Komponen (`components/ui/*`)

Saat membuat widget atau card interaktif baru:

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface CyberCardProps {
  title: string;
  badge?: string;
  description: string;
  children?: React.ReactNode;
}

export function CyberCard({ title, badge, description, children }: CyberCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, x: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="brutal border-2 border-black dark:border-gray-700 bg-white dark:bg-[#0a0e1a] p-6 shadow-[6px_6px_0px_#05070d] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.12)] transition-shadow hover:shadow-[10px_10px_0px_#0070f3]"
    >
      <div className="flex items-center justify-between mb-4">
        {badge && (
          <span className="font-mono text-xs uppercase px-2.5 py-1 font-bold bg-[#0070f3] text-white border border-black shadow-[2px_2px_0px_#000]">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {description}
      </p>
      {children}
    </motion.div>
  );
}
```

---

## 3. Checklist Kualitas Komponen

1. **Client / Server Boundary**: Komponen yang menggunakan state atau animasi `framer-motion` wajib memiliki directive `"use client"`. Komponen statis murni harus berupa Server Component.
2. **Accessible Contrast**: Teks di dark mode harus memiliki kontras tinggi (`text-white` atau `text-gray-200`, bukan abu-abu pudar di latar `#05070d`).
3. **Typography**: Menggunakan font sans modern tebal (`font-black`, `tracking-tight`) dan monospace untuk badge teknis (`font-mono`).
4. **Mobile Responsiveness**: Selalu uji padding pada layar kecil (`p-4 md:p-6`) dan pastikan ukuran hard shadow tidak menyebabkan horizontal overflow.
