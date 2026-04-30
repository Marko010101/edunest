import Link from 'next/link'
import { MapPin, ArrowRight, BadgeCheck } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/shared/Button'
import { featuredUniversities } from '@/lib/data/universities'
import { formatCurrency } from '@/lib/utils'

export function FeaturedUniversities() {
  return (
    <section className="section-padding" aria-labelledby="universities-heading">
      <div className="container-padded">

        {/* Section header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <p className="eyebrow mb-3">Partner Universities</p>
            <h2 id="universities-heading" className="heading-section text-navy">
              Our Featured Universities
            </h2>
          </div>
          <Button href="/universities" variant="ghost" className="self-start sm:self-auto shrink-0">
            View all universities
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </AnimatedSection>

        {/* University cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredUniversities.map((uni) => (
            <StaggerItem key={uni.id}>
              <article className="group card-base overflow-hidden h-full flex flex-col">

                {/* Placeholder image / gradient header */}
                <div className="relative h-44 bg-hero-gradient overflow-hidden flex-shrink-0">
                  {/* Diagonal shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <p className="font-display font-bold text-xl text-white leading-tight line-clamp-2">
                      {uni.name}
                    </p>
                    {uni.established && (
                      <p className="text-white/50 text-xs mt-1">Est. {uni.established}</p>
                    )}
                  </div>
                  {uni.ranking && (
                    <span className="absolute top-3 right-3 bg-gold text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow">
                      {uni.ranking}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Location */}
                  <p className="flex items-center gap-1.5 text-muted text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                    {uni.location}
                  </p>

                  {/* Description */}
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {uni.description}
                  </p>

                  {/* Accreditations */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {uni.accreditation.map((acc) => (
                      <span
                        key={acc}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-navy bg-navy-50 px-2 py-0.5 rounded-full"
                      >
                        <BadgeCheck className="w-3 h-3 text-gold" aria-hidden="true" />
                        {acc}
                      </span>
                    ))}
                  </div>

                  {/* Programs */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {uni.programs.slice(0, 3).map((prog) => (
                      <span
                        key={prog}
                        className="text-xs text-charcoal bg-gray-100 px-2.5 py-1 rounded-full"
                      >
                        {prog}
                      </span>
                    ))}
                    {uni.programs.length > 3 && (
                      <span className="text-xs text-charcoal bg-gray-100 px-2.5 py-1 rounded-full">
                        +{uni.programs.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Fee + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-[11px] text-muted uppercase tracking-wider">Annual fee from</p>
                      <p className="font-bold text-navy text-base">
                        {formatCurrency(uni.annualFee.min, uni.annualFee.currency)}/yr
                      </p>
                    </div>
                    <Link
                      href={`/universities/${uni.slug}`}
                      className="group/link inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-600 transition-colors"
                      aria-label={`Learn more about ${uni.name}`}
                    >
                      Learn More
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
