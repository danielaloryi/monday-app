# monday.work — Work Management Platform

A production-quality Monday.com–style experience built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## What's inside

**Marketing landing page (`/`)**
- Sticky navbar with a product mega-menu and a mobile drawer
- Hero with an animated gradient headline + a live, color-coded board mockup and floating status chips
- Auto-scrolling trusted-by logo marquee
- Six-card feature grid (boards, automations, dashboards, docs, inbox, integrations)
- Interactive "see work your way" showcase — Table / Kanban / Timeline / Calendar tabs over the same dataset
- Stats band, testimonials, pricing with a monthly/yearly toggle, gradient CTA, and a full footer

**Application shell (`/product`)**
- Collapsible left sidebar with workspaces and color-coded boards
- Top app bar with search, notifications, AI-assist, collaborator avatars, and invite
- A fully **interactive board**:
  - Click any **Status** cell to cycle Not started → Working on it → Stuck → Done (progress auto-updates)
  - Collapse / expand groups
  - **Add tasks** inline (type + Enter)
  - Live legend summary recomputes from board state
  - Switch between **Main table**, **Kanban**, and **Timeline** views

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

> Demo experience. Not affiliated with monday.com.
