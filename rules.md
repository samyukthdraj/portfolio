# Core Repository Standards and Development Guardrails

## 1. Architectural Integrity
- **25-File Limit**: The project must strictly adhere to the defined 25-file architecture. No extra files, components, or utilities should be added without explicit re-evaluation of the entire structure.
- **Atomic Design**: Components must follow atomic design principles. Do not combine distinct UI modules or project systems into a single file. Primitives must be decoupled and highly reusable.
- **Server Components by Default**: React components must be Server Components unless they require state (`useState`), lifecycle effects (`useEffect`), or DOM interactions. Mark Client Components explicitly with `"use client"`.

## 2. Design & Aesthetics (Signal Minimal)
- **Anti-AI Slop**: Strictly avoid any design tropes that make the UI look like "AI slop" (e.g., glowing purple/blue gradients, sparkle icons, floating magical orbs, excessive box-shadows).
- **Canvas & Surfaces**: 
  - Base Background: `bg-slate-950` (#030712).
  - Panel Surfaces: `bg-slate-900/50` with `backdrop-blur-md`.
- **Borders & Grids**: Sharp, hardware-like lines via `border-slate-800`. 1px solid, NO gradients on borders.
- **Typography**: Strictly use `Geist Mono` or similar technical monospace fonts.
  - Primary text: `text-slate-100`.
  - Secondary text: `text-slate-400`.
- **Accent Colors**: Use system green `text-emerald-400` exclusively for active system states, simulator logs, and interactive terminal accents. No primary-color gradients.
- **Icons**: Sharp, technical SVG icons (e.g., Lucide React icons like Terminal, Activity, Server). Corners tightly rounded (`rounded-md` or `rounded-lg`), not perfectly circular.

## 3. Data & Backend Engineering
- **Database Modularity**: Treat SkillUp 2.0, SkillUp C2K EDIS, and StackPilot as completely separate, independent architectural items within the Redis schemas.
- **Server Actions**: All mutations must use Next.js Server Actions with `revalidatePath` to purge the router cache and provide instant UI updates.
- **Edge Security**: `/admin/*` routes must be rigorously protected by `middleware.ts` verifying an HTTP-only JWT token against `ADMIN_PASSWORD`.

## 4. Performance & UX Fallbacks
- **Zero CLS (Cumulative Layout Shift)**: Loading states must stagger animate cleanly using a hardware-accelerated CSS pulse effect. Use rigid layout skeletons in `components/ui/skeleton.tsx` matching exactly the bento cell dimensions.
- **Empty States**: Unpopulated data must trigger a clean, professional "Not yet uploaded" alert block inside the terminal panel without shifting grids or throwing errors.
- **Error Boundaries**: Wrap separate dashboard panels inside localized boundaries (`components/ui/error-boundary.tsx`). A failing query must only drop its respective cell, keeping the rest of the site interactive.

## 5. Development Safety
- Before finalizing global typing structures, always review these rules to maintain codebase harmony.
- Verify environment variables (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_PASSWORD`) are properly defined in the deployment environment.
