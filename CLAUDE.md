# Edunest — Claude Code Reference

Education consultancy site connecting Indian students with Georgian universities.
Conversion-focused, frontend-heavy, no dedicated backend.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 — `tailwind.config.ts` |
| Animation | Framer Motion — scroll-triggered only, tasteful |
| Icons | Lucide React |
| Class merging | `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` |
| Fonts | Inter (body `font-sans`) + Playfair Display (headings `font-display`) via `next/font/google` |

---

## Brand Tokens (Tailwind)

```
navy   DEFAULT #0C2340   trust / authority / backgrounds
gold   DEFAULT #C8972A   prestige / CTAs / accents
cream  #FBF8F3           warm section backgrounds
charcoal #1C2B3A         body text
muted  #637085           secondary text
```

Gradients defined in `tailwind.config.ts`:
- `bg-hero-gradient` — navy diagonal gradient (hero / dark sections)
- `bg-gold-gradient` — gold diagonal gradient (stats bar / accents)

---

## Key CSS Utilities (globals.css)

```css
.section-padding      /* py-16 md:py-24 lg:py-32 */
.container-padded     /* container mx-auto px-4 sm:px-6 lg:px-8 */
.heading-display      /* font-display bold 4xl→6xl tight */
.heading-section      /* font-display bold 3xl→4xl tight */
.eyebrow              /* gold-500, uppercase, tracking-widest, text-xs→sm */
.card-base            /* white bg, rounded-2xl, shadow-card, hover:shadow-card-hover */
.text-gradient-gold   /* bg-gold-gradient bg-clip-text text-transparent */
.page-top-offset      /* pt-[104px] md:pt-[120px] — for non-hero pages */
```

---

## Directory Structure

```
app/
  layout.tsx              ← root layout: fonts, global SEO metadata, Header, Footer
  page.tsx                ← homepage
  about/page.tsx          ← About Us (done)
  universities/page.tsx   ← listing grid (TODO)
  universities/[slug]/    ← individual university (TODO)
  contact/page.tsx        ← contact/apply form (TODO)
  sitemap.ts
  robots.ts
  opengraph-image.tsx     ← dynamic OG image via @vercel/og

components/
  layout/
    Header.tsx            ← 'use client' — universal burger, WhatsApp top bar
    Footer.tsx            ← server component
  home/
    Hero.tsx              ← 'use client' — staggered Framer Motion intro
    StatsBar.tsx          ← gold bar, StaggerContainer/Item
    WhyGeorgia.tsx        ← 6-card grid
    FeaturedUniversities.tsx
    HowItWorks.tsx        ← 4-step process on navy bg
    ContactSection.tsx    ← CTA banner
  shared/
    AnimatedSection.tsx   ← 'use client' — exports AnimatedSection, StaggerContainer, StaggerItem
    Button.tsx            ← polymorphic (Link | <a> | <button>), forwards onClick
  seo/
    JsonLd.tsx            ← server component, injects JSON-LD <script>

lib/
  types.ts                ← University, Service, FAQ, Testimonial, ContactFormData
  utils.ts                ← cn(), formatCurrency()
  data/
    universities.ts       ← 6 universities; featuredUniversities = filtered subset
    services.ts
    faqs.ts
```

---

## Animation Primitives

Always import from `@/components/shared/AnimatedSection` — never create new motion wrappers.

```tsx
// Standalone scroll-triggered fade-up
<AnimatedSection delay={0.15} className="...">...</AnimatedSection>

// Staggered grid/list — parent orchestrates, children inherit timing
<StaggerContainer className="grid ...">
  <StaggerItem>...</StaggerItem>
  <StaggerItem>...</StaggerItem>
</StaggerContainer>
```

Rules:
- `StaggerItem` must be a direct or near-direct child of `StaggerContainer` — no extra `motion.div` between them
- `AnimatedSection` fires once, `viewport={{ once: true, margin: '-80px' }}`
- Keep `duration` ≤ 0.6s, `delay` ≤ 0.3s — nothing dramatic

---

## Header Architecture

```
<div fixed top-0 z-50 h-10>          ← WhatsApp top bar (navy, always visible)
<header fixed top-[40px] z-40>       ← Nav bar (transparent → white on scroll)
  Logo | Burger button
<aside> (drawer, z-50)               ← Slides from right, spring animation
  Logo | Close
  Nav links (staggered entrance)
  CTA button + WhatsApp button
```

- Update number: `WA_DISPLAY` and `WA_LINK` constants at top of `Header.tsx`
- Active page: gold dot indicator in drawer, underline on nav bar (layoutId="nav-indicator")
- Body scroll locked while drawer is open

---

## Page Pattern

Every page follows this template:

```tsx
// app/some-page/page.tsx  ← server component
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Page Title',
  description: '...',
  alternates: { canonical: '/some-page' },
  openGraph: { title: '...', description: '...', url: '/some-page' },
}

const pageJsonLd = { '@context': 'https://schema.org', '@type': '...', ... }

export default function SomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      {/* sections */}
    </>
  )
}
```

- Pages with a full-bleed dark hero: add `pt-[136px] pb-20 md:pt-[156px] md:pb-28` to the hero section
- Pages without a hero: wrap content in `<div className="page-top-offset">`

---

## Data Layer

All content lives in `lib/data/`. To add a university:

```ts
// lib/data/universities.ts
{
  id: '7',
  slug: 'university-name-slug',
  name: 'University Full Name',
  location: 'City, Georgia',
  established: 2000,
  programs: ['Medicine', 'Business'],
  annualFee: { min: 4000, max: 6000, currency: 'USD' },
  ranking: 'Top 5',            // optional
  accreditation: ['WHO', 'NMC'],
  imageUrl: '/images/universities/filename.jpg',
  featured: false,             // true = shown on homepage
  description: '...',
  highlights: ['point 1', 'point 2', 'point 3', 'point 4'],
}
```

`featuredUniversities` is auto-derived — just set `featured: true`.

---

## Environment Variables

```env
# .env.local (never commit)
NEXT_PUBLIC_SITE_URL=https://edunest.in
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@edunest.in
```

---

## TODO — Pages Not Yet Built

- [ ] `/universities` — filterable grid of all 6 universities
- [ ] `/universities/[slug]` — university detail page with highlights, fees, programs, apply CTA
- [ ] `/contact` — enquiry form (Resend integration or placeholder UI)
- [ ] `/api/contact/route.ts` — server-side form handler

When building these, follow the page pattern above and reuse `StaggerContainer`/`StaggerItem` for any grids.
