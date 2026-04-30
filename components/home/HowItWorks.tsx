import { MessageSquare, FileText, Plane, GraduationCap } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

const STEPS = [
  {
    step: '01',
    Icon: MessageSquare,
    title: 'Free Counselling',
    description:
      'Book a free session with our expert advisors. We understand your goals, NEET score, and budget to create a personalised shortlist.',
  },
  {
    step: '02',
    Icon: FileText,
    title: 'Application & Documents',
    description:
      'We guide you through every document, deadline, and form — ensuring a complete, compelling application to your chosen university.',
  },
  {
    step: '03',
    Icon: Plane,
    title: 'Visa & Pre-Departure',
    description:
      'Our team handles the Georgian student visa process end-to-end and prepares you with a full pre-departure orientation.',
  },
  {
    step: '04',
    Icon: GraduationCap,
    title: 'Study & Succeed',
    description:
      'Arrive in Tbilisi with full confidence. Our on-ground team supports you throughout your academic journey.',
  },
] as const

export function HowItWorks() {
  return (
    <section className="section-padding bg-navy" aria-labelledby="how-it-works-heading">
      <div className="container-padded">

        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <p className="eyebrow text-gold mb-3">How It Works</p>
          <h2 id="how-it-works-heading" className="heading-section text-white mb-4">
            From Counselling to Campus in 4 Steps
          </h2>
          <p className="text-navy-200 max-w-xl mx-auto leading-relaxed">
            We handle the complexity so you can focus on getting ready to study.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-navy-700"
            aria-hidden="true"
          />

          {STEPS.map(({ step, Icon, title, description }) => (
            <StaggerItem key={step}>
              <div className="flex flex-col items-center text-center relative z-10">

                {/* Icon bubble */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-gold" aria-hidden="true" />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow"
                    aria-hidden="true"
                  >
                    <span className="text-white text-[10px] font-bold leading-none">{step}</span>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}

        </StaggerContainer>
      </div>
    </section>
  )
}
