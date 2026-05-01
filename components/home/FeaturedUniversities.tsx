'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/shared/Button'
import { universities } from '@/lib/data/universities'
import { formatCurrency } from '@/lib/utils'

export function FeaturedUniversities() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const amount = card ? card.offsetWidth + 24 : 324   // 24 = gap-6
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section className="section-padding overflow-hidden" aria-labelledby="universities-heading">
      <div className="container-padded">

        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="eyebrow mb-3">Partner Universities</p>
            <h2 id="universities-heading" className="heading-section text-navy">
              Our Featured Universities
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous universities"
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:border-navy hover:bg-navy hover:text-white text-charcoal flex items-center justify-center transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next universities"
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:border-navy hover:bg-navy hover:text-white text-charcoal flex items-center justify-center transition-all duration-200 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <Button href="/universities" variant="ghost" size="sm" className="ml-1">
              View all
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Scrollable track */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #fff, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #fff, transparent)' }}
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-4 snap-x snap-mandatory"
        >
          {universities.map((uni) => (
            <Link
              key={uni.id}
              href={`/universities/${uni.slug}`}
              aria-label={`View ${uni.name}`}
              className="group w-[300px] flex-shrink-0 snap-start card-base overflow-hidden flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Card header */}
              <div className="h-24 bg-hero-gradient relative overflow-hidden flex items-center justify-center flex-shrink-0">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                  aria-hidden="true"
                />
                <span className="font-display font-bold text-3xl text-white/90 relative z-10 tracking-tight select-none">
                  {uni.abbrev}
                </span>
                {uni.ranking && (
                  <span className="absolute top-2.5 right-2.5 bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {uni.ranking}
                  </span>
                )}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-gradient" aria-hidden="true" />
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div>
                  <p className="font-display font-bold text-navy text-base leading-tight group-hover:text-gold transition-colors duration-200 line-clamp-2">
                    {uni.name}
                  </p>
                  <p className="flex items-center gap-1 text-muted text-xs mt-1.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    {uni.location}
                  </p>
                </div>

                {/* Accreditations */}
                <div className="flex flex-wrap gap-1">
                  {uni.accreditation.slice(0, 3).map(acc => (
                    <span
                      key={acc}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-navy bg-navy-50 px-2 py-0.5 rounded-full"
                    >
                      <BadgeCheck className="w-2.5 h-2.5 text-gold" aria-hidden="true" />
                      {acc}
                    </span>
                  ))}
                </div>

                {/* Fee + arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">From</p>
                    <p className="font-bold text-navy text-sm">
                      {formatCurrency(uni.annualFee.min, uni.annualFee.currency)}/yr
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-navy-50 group-hover:bg-gold flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-navy group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
