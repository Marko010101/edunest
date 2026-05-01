import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MapPin, Calendar, CheckCircle, ArrowLeft, ArrowRight, MessageCircle, BookOpen, DollarSign, Award } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/shared/Button'
import { EnquireButton } from '@/components/shared/EnquireButton'
import { universities } from '@/lib/data/universities'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return universities.map(u => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const u = universities.find(u => u.slug === slug)
  if (!u) return {}
  return {
    title: `${u.name} — Fees, Programmes & Admissions | Edunest`,
    description: `Study at ${u.name} in ${u.location}. ${u.accreditation.join(', ')} accredited. Annual fees from $${u.annualFee.min.toLocaleString()} USD. Free counselling available.`,
    alternates: { canonical: `/universities/${u.slug}` },
    openGraph: {
      title: `${u.name} | Edunest`,
      description: u.description,
      url: `/universities/${u.slug}`,
    },
  }
}

const WA_LINK = 'https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20studying%20in%20Georgia.'

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params
  const u = universities.find(u => u.slug === slug)
  if (!u) notFound()

  const feeRange = `$${u.annualFee.min.toLocaleString()} – $${u.annualFee.max.toLocaleString()} ${u.annualFee.currency}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: u.name,
    url: `https://edunest.in/universities/${u.slug}`,
    foundingDate: String(u.established),
    address: { '@type': 'PostalAddress', addressLocality: u.location },
    description: u.description,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-hero-gradient overflow-hidden pt-[136px] pb-20 md:pt-[156px] md:pb-28"
        aria-label={u.name}
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
          {/* Back link */}
          <Button href="/universities" variant="ghost" size="sm" className="mb-6 text-white/70 hover:text-white border-white/20 hover:bg-white/10 hover:border-white/30">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Universities
          </Button>

          {/* Abbreviation badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
            <span className="font-display font-bold text-gold text-sm">{u.abbrev}</span>
            <span className="w-px h-3 bg-white/20" aria-hidden="true" />
            <span className="text-white/70 text-xs">Est. {u.established}</span>
          </div>

          <h1 className="heading-display text-white mb-5 max-w-3xl">{u.name}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-white/65 text-sm">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
              {u.location}
            </span>
            <span className="flex items-center gap-1.5 text-white/65 text-sm">
              <Calendar className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
              Established {u.established}
            </span>
          </div>

          {/* Accreditation badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {u.accreditation.map(a => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                <CheckCircle className="w-3 h-3 text-gold" aria-hidden="true" />
                {a} Recognised
              </span>
            ))}
            {u.ranking && (
              <span className="inline-flex items-center gap-1.5 bg-gold/20 border border-gold/30 text-gold text-xs font-semibold px-3 py-1 rounded-full">
                <Award className="w-3 h-3" aria-hidden="true" />
                {u.ranking}
              </span>
            )}
          </div>

          <EnquireButton label="Apply Now — Free Counselling" size="lg" />
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="section-padding" aria-label="University details">
        <div className="container-padded">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* ── Left: details ──────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* About */}
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-gold" aria-hidden="true" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-navy">About the University</h2>
                </div>
                <p className="text-muted leading-relaxed">{u.description}</p>
              </AnimatedSection>

              {/* Highlights */}
              <AnimatedSection delay={0.1}>
                <h2 className="font-display font-bold text-xl text-navy mb-5">Why Choose {u.abbrev}?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {u.highlights.map(h => (
                    <div key={h} className="flex items-start gap-3 bg-cream rounded-2xl p-5">
                      <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-gold" aria-hidden="true" />
                      </div>
                      <p className="text-charcoal text-sm leading-relaxed font-medium">{h}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Programmes */}
              <AnimatedSection delay={0.15}>
                <h2 className="font-display font-bold text-xl text-navy mb-5">Programmes Offered</h2>
                <div className="flex flex-wrap gap-2.5">
                  {u.programs.map(p => (
                    <span
                      key={p}
                      className="bg-white border border-gray-200 text-navy text-sm font-medium px-4 py-2 rounded-xl shadow-sm"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* ── Right: sticky fee card ──────────────────────────────────── */}
            <AnimatedSection delay={0.2} className="lg:col-span-1">
              <div className="lg:sticky lg:top-[120px] flex flex-col gap-4">

                {/* Fee card */}
                <div className="card-base p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-navy text-lg">Annual Tuition</h3>
                  </div>
                  <p className="font-display font-bold text-3xl text-navy mb-1">{feeRange}</p>
                  <p className="text-muted text-xs mb-6">Per academic year · Does not include accommodation</p>

                  <div className="flex flex-col gap-3">
                    <EnquireButton
                      label="Apply Now — It's Free"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center"
                    />
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-charcoal hover:border-navy hover:text-navy text-sm font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Key facts */}
                <div className="card-base p-6">
                  <h3 className="font-semibold text-navy text-sm uppercase tracking-wider mb-4">Key Facts</h3>
                  <dl className="flex flex-col gap-3">
                    {[
                      { label: 'Location', value: u.location },
                      { label: 'Established', value: String(u.established) },
                      { label: 'Accreditations', value: u.accreditation.join(', ') },
                      { label: 'Programmes', value: `${u.programs.length} offered` },
                      { label: 'Medium', value: 'English' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4 text-sm py-2 border-b border-gray-50 last:border-0">
                        <dt className="text-muted font-medium flex-shrink-0">{label}</dt>
                        <dd className="text-charcoal font-semibold text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream" aria-label="Apply">
        <div className="container-padded">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 md:px-16 md:py-20 text-center">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy-400/20 blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="eyebrow text-gold mb-4">Ready to Apply?</p>
                <h2 className="heading-section text-white mb-4">
                  Start Your Journey at {u.abbrev}
                </h2>
                <p className="text-navy-200 leading-relaxed mb-10">
                  Our counsellors will guide you through every step — from your application to landing in Georgia.
                  Free, honest advice with no pressure.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <EnquireButton label="Get Free Counselling" variant="primary" size="lg" />
                  <Button href="/universities" variant="outline" size="lg">
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                    Browse All Universities
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
