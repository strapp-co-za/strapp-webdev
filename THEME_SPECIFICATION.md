# Visual Architecture & Design System Specification

This document provides a low-level technical breakdown of the "sync up" design system, covering the global styling, multi-theme logic, and typographic hierarchies implemented in `public/index.html`.

## 1. Global Visual Engine

### 1.1 Textural Layer (Noise/Grain)
The UI implements a high-frequency grain overlay to disrupt flat digital gradients.
- **Method**: SVG Turbulence Filter injected via `body::before`.
- **Filter Type**: `fractalNoise`.
- **Frequency**: `0.9` base frequency with `2` octaves.
- **Blending**: `mix-blend-mode: multiply` at `35%` opacity.
- **Z-Index**: `1000` (Universal overlay).

### 1.2 Layout & Motion
- **Containment**: `100vw/100vh` viewport-fit.
- **Scroll Behavior**: `y-axis mandatory` scroll-snapping.
- **Transition Logic**: `0.6s ease` on `background` and `color` properties for smooth state transitions between theme modes.
- **Parallax Matrix**: Blobs utilize `translate3d` at variable scalar multipliers (`0.15`, `0.25`, `0.1`) triggered by the `requestAnimationFrame` loop on the scroll event.

## 2. Typographic Specification

The system utilizes four distinct font families loaded via Google Fonts, mapped to specific semantic tokens.

| Token | Family | Weights | Usage |
| :--- | :--- | :--- | :--- |
| `--font-display` | `Inter` | 300, 400, 600, 800 | Primary UI, Body Copy, Retail UI |
| `--font-mono` | `JetBrains Mono` | 300, 400, 600 | Metadata, Code-like labels, Clock |
| `Display (Special)` | `Archivo Black` | 800+ | Industrial Mode Headers |
| `Display (Special)` | `Playfair Display` | 600, 800 | Professional Mode Headers |

### 2.1 Typographic Scale
- **Root Text**: `clamp(44px, 8vw, 110px)` with `-0.04em` tracking.
- **Section Headers**: `clamp(36px, 5.5vw, 72px)` with `-0.035em` tracking.
- **Subtext**: `13px` - `14px` with `1.55` line-height.
- **Metadata**: `11px` with `0.15em` - `0.25em` character spacing (uppercase).

## 3. Theme Matrices (State-Based CSS Variables)

The application uses a `data-theme` attribute on the `<html>` element to hot-swap the following color tokens:

### 3.1 sync up (Original Core)
- **Primary Background**: `#E8F0FE` (Google Blue tint)
- **Secondary Background**: `#F3E8FF` (Lavender)
- **Tertiary Background**: `#F0FDFA` (Mint)
- **Accent**: `#7C3AED` (Vivid Violet)
- **Text**: `#1E293B` (Slate 800)

### 3.2 Industrial (Heavy Operations)
- **Primary Background**: `#23272e` (Deep Charcoal)
- **Accent**: `#F59E0B` (Safety Amber)
- **Text**: `#FFFFFF`
- **Styling**: `font-weight: 800`, `text-shadow: 0 1px 2px rgba(0,0,0,0.18)`.

### 3.3 Retail (Food & Service)
- **Primary Background**: `#FEF3C7` (Amber 100)
- **Accent**: `#EA580C` (Rust Orange)
- **Text**: `#1E293B`
- **Font**: Switches to `Inter` for casual legibility.

### 3.4 Professional (Firm & Legal)
- **Primary Background**: `#F8FAF6` (White Smoke)
- **Accent**: `#0F172A` (Ink Black)
- **Font**: `Playfair Display` (Serif) for high-authority presentation.

## 4. Component Architecture

### 4.1 "Billion Dollar" Form System
- **Border-Radius**: `32px` on container, `16px` on buttons.
- **Interaction**: `:focus-within` triggers `--accent` border coloration.
- **Shadow Depth**: `0 40px 100px -20px rgba(0,0,0,0.15)`.
- **Input Design**: Minimalist `border-bottom` only, no background, `0.2` opacity placeholders.

### 4.2 Dot Matrix Navigation
- **Default State**: `12px` circle, `25%` alpha.
- **Active State**: Width expansion to `150px`, pill-shape, `0.3s ease`.
- **Content**: Uses Unicode glyphs (`◐`, `◧`, `◩`, `◉`) for low-weight iconography.

### 4.3 Dashboard Cells
- **Grid**: `repeat(3, 1fr)` responsive to `1fr`.
- **Background**: `#F8FAFC`.
- **Status Indicators**: `10B981` (Emerald) dots with a `1.8s` infinite pulse animation.

## 5. Visual Effects Specs

### 5.1 Parallax Blobs
- **Filter**: `blur(60px)`.
- **Opacity**: `55%`.
- **Gradients**: 
  - Blob A: `radial-gradient(circle, #a5b4fc, transparent 70%)`
  - Blob B: `radial-gradient(circle, #fbcfe8, transparent 70%)`
  - Blob C: `radial-gradient(circle, #99f6e4, transparent 70%)`

### 5.2 Cookie Drawer (POPIA)
- **Entrance**: `0.5s cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Glassmorphism**: `backdrop-filter: blur(20px)` with a `6%` alpha border.

---
*Document Generated: SAST (South African Standard Time)*