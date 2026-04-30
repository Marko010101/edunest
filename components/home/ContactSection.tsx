import { ArrowRight, Phone } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/shared/Button'

export function ContactSection() {
  return (
    <section className="section-padding bg-cream" aria-labelledby="cta-heading">
      <div className="container-padded">
        <AnimatedSection>
          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 md:px-16 md:py-20 text-center">

            {/* Background blobs */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy-400/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="eyebrow text-gold mb-4">Ready to Start?</p>
              <h2 id="cta-heading" className="heading-section text-white mb-4">
                Take the First Step Today
              </h2>
              <p className="text-navy-200 leading-relaxed mb-10">
                Book your free counselling session and let our experts guide you to the
                perfect university in Georgia. No pressure — just honest, personalised advice.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" size="lg">
                  Apply Now — It&apos;s Free
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>

                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-2 text-white/75 hover:text-white transition-colors font-medium text-base"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  +91 12345 67890
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
