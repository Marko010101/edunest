import { Suspense } from 'react'
import type { Metadata } from 'next'
import { GraduationCap, Building2, ShieldCheck } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { UniversityGrid } from '@/components/universities/UniversityGrid'
import { universities } from '@/lib/data/universities'

export const metadata: Metadata = {
  title: 'Georgian Universities — MBBS, Business & More | Edunest',
  description:
    'Browse all NMC-approved Georgian universities partnered with Edunest. Compare fees, programmes, and accreditations to find your perfect match.',
  alternates: { canonical: '/universities' },
  openGraph: {
    title: 'Georgian Universities for Indian Students — Edunest',
    description:
      'Explore 10 top Georgian universities with NMC approval, English-medium programmes, and fees from $2,500/year.',
    url: '/universities',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Georgian Universities — Edunest',
  url: 'https://edunest.in/universities',
  description: 'Directory of Georgian universities partnered with Edunest for Indian students.',
}

const STATS = [
  { Icon: Building2, value: `${universities.length}`, label: 'Partner Universities' },
  { Icon: ShieldCheck, value: '7+', label: 'NMC Approved' },
  { Icon: GraduationCap, value: '500+', label: 'Students Placed' },
] as const

export default function UniversitiesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-hero-gradient overflow-hidden pt-[136px] pb-20 md:pt-[156px] md:pb-28"
        aria-label="Universities"
      >
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full bg-navy-400/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-gold/8 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <div className="container-padded relative z-10">
          <p className="eyebrow text-gold mb-4">Our Partner Institutions</p>
          <h1 className="heading-display text-white mb-5 max-w-3xl">
            Top Georgian Universities for{' '}
            <span className="text-gradient-gold">Indian Students</span>
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-xl mb-10">
            Every university in our network is hand-picked for accreditation, English-medium
            instruction, and proven track records with Indian students.
          </p>

          {/* Inline stats */}
          <div className="flex flex-wrap gap-6">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-white leading-none">{value}</p>
                  <p className="text-white/55 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── University grid ───────────────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="universities-heading">
        <div className="container-padded">
          <AnimatedSection className="mb-10">
            <h2 id="universities-heading" className="sr-only">All partner universities</h2>
          </AnimatedSection>
          <AnimatedSection>
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted text-sm">Loading…</div>}>
              <UniversityGrid universities={universities} />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
