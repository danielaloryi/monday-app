# monday.app — Replica for review purposes

A production-quality Monday.com–style experience built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Design system
Built around Monday's signature color-coded "pulse" spectrum. Tokens live in `src/app/globals.css` (`@theme`). Display type is **Poppins**, body is **Figtree**, both self-hosted via `next/font/local`.

Accessibility floor: visible keyboard focus, `prefers-reduced-motion` respected, semantic roles on tabs, responsive down to mobile.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## Structure
```
src/
  app/
    globals.css            # design tokens + animations
    layout.tsx             # fonts + metadata
    page.tsx               # landing page
    product/page.tsx       # app shell route
    fonts/                 # self-hosted woff2
  components/
    Logo.tsx  ui.tsx
    landing/   SiteNav, Hero, BoardMockup, LogoStrip, Features,
               ViewShowcase, Social, Pricing, FooterCTA
    app/       AppShell, Sidebar, Topbar, BoardView
  lib/
    data.ts                # board / people / status model
    icons.tsx              # inline SVG icon set
```
