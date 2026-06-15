# RESPONSIVENESS_ARCHITECTURE_PLAN.md

---

# 1. DIRECTORY & DOM AUDIT MATRIX

## 1.1 Directory Structure (2026-05-18)

```
/ (root)
├── bun.lock
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── public/
│   ├── index.ts
│   ├── logo.svg
│   ├── runtime.html
│   └── styles.css
├── README_EMAIL_SETUP.md
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── ... (all UI primitives)
│   ├── hooks/
│   ├── lib/
│   ├── router.tsx
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── routeTree.gen.ts
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── supabase/
│   └── functions/
│       └── contact-email/
│           └── index.ts
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

## 1.2 DOM Tree Analysis: `public/runtime.html`

- `<html>`: Root, theme-driven, sets global CSS variables.
  - **Tertiary Structural Frame**
- `<head>`: Meta, fonts, and embedded CSS.
  - **Tertiary Structural Frame**
- `<body>`: Main content container.
  - **Tertiary Structural Frame**
  - `<nav.dotnav>`: Fixed vertical navigation (section anchors).
    - **Primary Core Utility** (navigation)
  - `<section#sec1>`: Hero/Intro
    - `.blob.a`, `.blob.b`: Decorative, parallax backgrounds.
      - **Tertiary Structural Frame**
    - `.meta.tl`, `.meta.tr`, `.meta.bl`, `.meta.br`: Inline metadata.
      - **Secondary Contextual Data**
    - `.strapp-text`, `.strapp-subtext`: Main headline, subtext used for the sync up hero experience.
      - **Primary Core Utility**
    - `.mode-array`: Theme switcher buttons.
      - **Primary Core Utility**
    - `.cta-row`: Call-to-action (CTA) buttons.
      - **Primary Core Utility**
  - `<section#sec2>`: Google Visibility Offer
    - `.blob.c`: Decorative.
      - **Tertiary Structural Frame**
    - `.meta.*`: Metadata.
      - **Secondary Contextual Data**
    - `.engine-wrap`: Content grid.
      - **Tertiary Structural Frame**
      - `.eyebrow`, `.h-display`, `.sub`, `.price-tag`: Headline, description, price.
        - **Primary Core Utility**
      - `.cta-row`: CTAs.
        - **Primary Core Utility**
  - `<section#sec3>`: Website Features
    - `.blob.a`: Decorative.
      - **Tertiary Structural Frame**
    - `.meta.*`: Metadata.
      - **Secondary Contextual Data**
    - `.engine-wrap`: Content grid.
      - **Tertiary Structural Frame**
      - `.h-display`, `.sub`: Headline, description.
        - **Primary Core Utility**
      - `.preset-grid`: Feature cards.
        - **Primary Core Utility**
  - `<section#sec4>`: Process & Contact
    - `.meta.*`: Metadata.
      - **Secondary Contextual Data**
    - `.engine-wrap` (implied): Content grid.
      - **Tertiary Structural Frame**
      - `.dash`: 3-column grid (process, payment, contact).
        - **Primary Core Utility**
      - `.cell`: Each info block.
        - **Primary Core Utility**
      - `.cta#ctaContact`: Contact button.
        - **Primary Core Utility**
      - `#contactModal > #contactForm`: Modal form.
        - **Primary Core Utility**
  - `<button#returnBtn>`: Return to original mode.
    - **Primary Core Utility**
  - `<aside.cookie>`: POPIA consent drawer.
    - **Primary Core Utility**

---

# 2. BREAKPOINT SPECIFICATION & TARGET GRID

## 2.1 Tier 1: Desktop / Workstation / PC (≥1200px)
- **Grid**: Multi-column (3+), max-width 1100px for content blocks.
- **Spacing**: Generous padding (`--pad:40px`), large gaps (32px+).
- **Hover**: All CTAs, nav, and cards have explicit hover/focus states.
- **Assets**: Parallax blobs, full-res images, all metadata visible.
- **Typography**: Large headlines (clamp(44px,8vw,110px)), max legibility.

## 2.2 Tier 2: Mid-Display / Tablets (768px–1023px)
- **Grid**: Collapse to 1–2 columns, `.dash` grid switches to 1 column at <760px.
- **Spacing**: Reduced padding (`--pad:22px`), moderate gaps.
- **Touch**: Tap targets ≥48px, hover states degrade to focus/active.
- **Assets**: Blobs scale down, metadata remains visible but less prominent.
- **Typography**: Responsive scaling, subtext remains readable.

## 2.3 Tier 3: High-End Mobile (320px–480px)
- **Grid**: Full vertical serialization, all grids become single column.
- **Spacing**: Minimal padding, tight vertical stacking.
- **Touch**: All interactive elements ≥48x48px, no hover, only active/focus.
- **Assets**: Blobs fade/scale, only essential metadata shown.
- **Typography**: Font sizes scale down, max 1.2em for subtext.
- **Data Prioritization**: Only primary utility elements above the fold; secondary/tertiary elements collapse or hide.

---

# 3. THE "BILLION-DOLLAR" CONTENT HIERARCHY BLUEPRINT

## 3.1 Desktop (Tier 1)
1. **Nav**: Dotnav always visible, anchors all sections.
2. **Section 1**: Hero headline, subtext, theme switcher, CTA.
3. **Section 2**: Visibility offer, price, CTA.
4. **Section 3**: Features grid, all cards visible.
5. **Section 4**: Process, payment, contact, modal form.
6. **Footer/Return**: Sticky return button, cookie drawer.

## 3.2 Tablet (Tier 2)
1. **Nav**: Dotnav visible, slightly smaller.
2. **Section 1**: Hero, subtext, theme switcher, CTA.
3. **Section 2**: Visibility offer, price, CTA.
4. **Section 3**: Features grid collapses to 1–2 columns.
5. **Section 4**: Dash grid collapses to 1 column, modal form full width.
6. **Footer/Return**: Sticky return button, cookie drawer.

## 3.3 Mobile (Tier 3)
1. **Nav**: Dotnav collapses, may become horizontal or overlay.
2. **Section 1**: Hero headline, subtext, theme switcher, CTA (all stacked vertically).
3. **Section 2**: Visibility offer, price, CTA (stacked).
4. **Section 3**: Features grid is single column, cards stack.
5. **Section 4**: Dash grid is single column, modal form is full width, only essential metadata shown.
6. **Footer/Return**: Return button floats, cookie drawer overlays.

### Data-Reduction Logic
- **Tertiary elements** (blobs, extra metadata) fade or hide on mobile.
- **Secondary elements** (labels, price tags) shrink or move below primary content.
- **Primary elements** (headlines, CTAs, forms) always remain visible and accessible.

### Touch Target & Accessibility Engineering
- **All interactive elements**: min 48x48px on mobile, 32x32px on desktop.
- **Form fields**: Full width, large padding, clear focus/active states.
- **Contrast**: All text/buttons must meet WCAG AA (4.5:1) contrast.
- **Keyboard navigation**: All CTAs, nav, and form fields must be tab-accessible.

---

# 4. IMPLEMENTATION MATRIX (TAILWIND CSS / RAW UTILITY SPEC)

## 4.1 Core Containers
- `body`: `bg-black text-white font-sans min-h-screen w-full`
- `.dotnav`: `fixed top-1/2 right-4 z-50 flex flex-col gap-4 md:right-2 sm:top-auto sm:bottom-0 sm:left-0 sm:flex-row sm:w-full sm:justify-center`
- `section`: `relative w-screen min-h-screen flex flex-col justify-center items-center px-10 py-20 md:px-6 md:py-10 sm:px-2 sm:py-4 transition-bg duration-500`
- `.engine-wrap`: `max-w-5xl w-full grid grid-cols-1 gap-8 md:gap-6`
- `.dash`: `grid grid-cols-3 gap-5 w-full max-w-5xl mt-9 overflow-y-auto max-h-[55vh] md:grid-cols-1 md:gap-4`
- `.preset-grid`: `grid grid-cols-3 gap-4 mt-7 w-full max-w-5xl overflow-y-auto max-h-[45vh] md:grid-cols-2 sm:grid-cols-1`
- `.cell`: `p-6 rounded-xl bg-neutral-900 border border-neutral-700`
- `.cta-row`: `mt-7 flex gap-4 flex-wrap`
- `.cta`: `font-mono text-xs px-6 py-4 rounded-lg bg-white text-black border-none cursor-pointer tracking-wider uppercase transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent`
- `.mode-array`: `mt-9 flex gap-3 flex-wrap justify-center opacity-0 translate-y-3 transition-opacity duration-700`
- `.mode-array.show`: `opacity-100 translate-y-0`
- `.meta`: `absolute font-mono text-[11px] tracking-widest uppercase text-muted select-none`
- `.meta.tl`: `top-10 left-10 md:top-4 md:left-4`
- `.meta.tr`: `top-10 right-10 md:top-4 md:right-4`
- `.meta.bl`: `bottom-10 left-10 md:bottom-4 md:left-4`
- `.meta.br`: `bottom-10 right-10 md:bottom-4 md:right-4`
- `#contactForm`: `bg-black border border-neutral-700 max-w-md rounded-3xl p-12 md:p-8 sm:p-4 shadow-xl transition-all duration-500`
- `.f-grid`: `grid grid-cols-2 gap-6 sm:grid-cols-1`
- `.f-field`: `mb-7 border-b border-neutral-700 transition-colors duration-300 relative focus-within:border-accent`
- `.f-label`: `block font-mono text-[9px] uppercase tracking-widest text-muted mb-1.5`
- `.f-input`: `w-full bg-transparent border-none outline-none font-mono text-base py-2 text-white placeholder:text-muted placeholder:opacity-20`
- `#contactForm button[type="submit"]`: `bg-white text-black py-6 rounded-xl font-mono text-xs font-bold tracking-widest uppercase border-none cursor-pointer transition-all duration-300 mt-4 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent`

## 4.2 Responsive Utilities
- `md:` for tablets (≥768px)
- `sm:` for mobile (≤640px)
- Use `gap-4 md:gap-2 sm:gap-1`, `px-10 md:px-6 sm:px-2`, `py-20 md:py-10 sm:py-4` for all major containers.
- All grids: `grid-cols-3 md:grid-cols-2 sm:grid-cols-1` or as appropriate.
- All text: `text-4xl md:text-2xl sm:text-lg`, `leading-tight`, `font-extrabold` for headlines.
- All buttons: `min-w-[48px] min-h-[48px]` on mobile, `min-w-[32px] min-h-[32px]` on desktop.

---

# 5. EXECUTION & VALIDATION CHECKLIST

1. **Viewport Simulation**: Test in Chrome DevTools (Device Toolbar) for all breakpoints: 1440px, 1024px, 768px, 480px, 375px.
2. **Grid Integrity**: Confirm all `.engine-wrap`, `.dash`, `.preset-grid` containers collapse/expand as specified.
3. **Padding Consistency**: Validate all sections have consistent horizontal/vertical padding at each breakpoint.
4. **Aspect Ratio**: Ensure all blobs, images, and cards maintain correct aspect ratio and do not overflow or distort.
5. **Font Legibility**: Check all text for minimum 16px on mobile, 20px+ for headlines, and proper contrast.
6. **Touch Target Sizing**: All interactive elements (buttons, nav, form fields) must be ≥48x48px on mobile.
7. **Keyboard Navigation**: Tab through all CTAs, nav, and form fields; ensure visible focus states.
8. **CLS (Cumulative Layout Shift)**: No layout shift on load, resize, or theme switch.
9. **Accessibility**: All ARIA labels, roles, and alt text present; color contrast meets/exceeds WCAG AA.
10. **Cookie Consent**: Cookie drawer overlays and is accessible on all devices.

---

> **Institutional Note:**
> This plan is designed for zero ambiguity. All implementation teams must follow the above taxonomy, grid, and utility class matrix with no deviation. Any design or code review must reference this document as the single source of truth for responsive and content architecture.
