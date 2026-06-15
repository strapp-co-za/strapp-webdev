# About Section File Map

This document explains the purpose of the files that relate to the About section and the homepage in `durban-core-connect-main`. It also clarifies which section each file belongs to and which files work together.

## 1. Core About Section Files

### `src/routes/index.tsx`
- Purpose: the homepage route component.
- Role: contains the full page markup for the homepage, including the `About us` section in `section id="sec7"`.
- Section: Homepage / About section.
- Why it matters: this is the main source file for the About grid, cards, CTA, navigation controls, and horizontal scroll behavior.
- Related files:
  - `src/routes/index.css` for styling the About grid and cards.
  - `src/routes/__root.tsx` for the page shell and global layout.
  - `src/router.tsx` and `src/routeTree.gen.ts` for route registration.

### `src/routes/index.css`
- Purpose: homepage-specific styles.
- Role: defines grid layout, card sizing, spacing, breakpoints, card types, and scroll snapping for the About section.
- Section: Homepage styling / About section CSS.
- Why it matters: the Visual design and compact layout for the About cards are controlled here.
- Related files:
  - `src/routes/index.tsx` where the markup uses class names like `about-grid`, `about-card`, `about-card-xl`, `about-card-secondary`, and `about-card-story`.
  - `src/styles.css` for shared global styles and theme CSS variables.

## 2. App Shell and Routing

### `src/routes/__root.tsx`
- Purpose: the root route container.
- Role: provides the HTML shell, metadata, global CSS links, React Query provider, and error handling.
- Section: Application shell / route root.
- Why it matters: the About section is rendered inside this root shell via the `<Outlet />`.
- Related files:
  - `src/routes/index.tsx` as the child route component.
  - `src/styles.css` and generated app CSS to style the page.
  - `src/router.tsx` which wires the router to the generated route tree.

### `src/router.tsx`
- Purpose: creates the TanStack router instance.
- Role: initializes the router with `routeTree`, query client, scroll restoration, and preload settings.
- Section: Routing configuration.
- Why it matters: this router makes the homepage route available at `/`, including the About section.
- Related files:
  - `src/routeTree.gen.ts` auto-generated file that links `src/routes/index.tsx` into the route tree.
  - `src/routes/__root.tsx` as the parent route.

### `src/routeTree.gen.ts`
- Purpose: generated route definitions from TanStack Router.
- Role: registers the root route and the index route for `/`.
- Section: Routing internals.
- Why it matters: ensures the homepage is mounted correctly and should not be manually edited.
- Related files:
  - `src/routes/__root.tsx`
  - `src/routes/index.tsx`
  - `src/router.tsx`

## 3. Global and Deployment Files

### `src/styles.css`
- Purpose: global CSS styles for the app.
- Role: contains base styles, CSS variables, and theme-related utilities.
- Section: Project-wide style system.
- Why it matters: it is included in the root head and provides shared styling that the About section inherits.
- Related files:
  - `src/routes/__root.tsx` imports and links this stylesheet.
  - `src/routes/index.css` which adds homepage-specific styling.

### `vite.config.ts`
- Purpose: build and dev server configuration.
- Role: configures Vite, plugins, path aliases, and build targets.
- Section: Tooling.
- Why it matters: ensures the app bundles correctly, including route and CSS imports.
- Related files:
  - `package.json` scripts that run Vite.
  - `src/start.ts` for app startup configuration.

### `package.json`
- Purpose: dependency and script manifest.
- Role: defines packages used by the app and commands like `dev`, `build`, and `preview`.
- Section: Project metadata and tooling.
- Why it matters: includes React, TanStack Router, Tailwind, and build dependencies used by the homepage.
- Related files:
  - `vite.config.ts`
  - `src/routes/index.tsx`
  - `src/styles.css`

## 4. Assets Used by About Section

### `public/logo.svg`
- Purpose: brand asset used inside the About section cards.
- Role: displayed in the `our purpose` card and elsewhere as a visual brand mark.
- Section: Visual assets.
- Why it matters: references in `src/routes/index.tsx` for the About card image.

### `public/logo.png`
- Purpose: Open Graph / favicon image referenced in root metadata.
- Role: used in `<head>` metadata in `src/routes/__root.tsx`.
- Section: SEO / social preview assets.
- Why it matters: contributes to how the homepage is previewed when shared.

## 5. How the About Section Works Together

- `src/routes/index.tsx` defines the About section content and behavior.
- `src/routes/index.css` controls the visual layout, spacing, card sizes, and responsive fallback.
- `src/routes/__root.tsx` provides the document shell and includes the shared CSS.
- `src/router.tsx` and `src/routeTree.gen.ts` ensure the homepage route is available at `/`.
- `src/styles.css` supplies core page styles and global variables used by the About section.

## 6. Notes for ChatGPT

- The About section is implemented directly in the homepage route, not split into a separate component file.
- The key selectors are `about-grid`, `about-card`, and `about-card-*` class names.
- The section is inside `section id="sec7"`, and navigation logic is attached to `scrollAbout()`.
- If you change layout or card structure, update both `src/routes/index.tsx` and `src/routes/index.css` together.
