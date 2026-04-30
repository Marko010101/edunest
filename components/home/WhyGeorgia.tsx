import {
  Award,
  DollarSign,
  Globe,
  GraduationCap,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

const REASONS = [
  {
    Icon: Award,
    title: 'WHO & NMC Recognised',
    description:
      'Georgian medical universities are approved by WHO and India\'s National Medical Commission, ensuring your degree is valid for practice back home.',
  },
  {
    Icon: DollarSign,
    title: 'Highly Affordable',
    description:
      'Annual tuition: $3,000–$8,000 USD. Monthly living costs: under $500. A fraction of private Indian medical colleges—without compromising quality.',
  },
  {
    Icon: Globe,
    title: 'English-Medium Programs',
    description:
      'All professional programs at our partner universities are taught in English—zero language barrier for Indian students.',
  },
  {
    Icon: GraduationCap,
    title: 'High FMGE / NExT Pass Rate',
    description:
      'Students from our partner universities consistently outperform the national FMGE average, thanks to rigorous clinical training.',
  },
  {
    Icon: ShieldCheck,
    title: 'Safe & Welcoming Country',
    description:
      'Georgia ranks among the safest countries in Europe with warm hospitality and a rapidly growing community of Indian students.',
  },
  {
    Icon: Users,
    title: 'Thriving Indian Community',
    description:
      'Thousands of Indian students already study in Tbilisi. Cultural events, Indian restaurants, and a strong support network await you.',
  },
] as const

export function WhyGeorgia() {
  return (
    <section className="section-padding bg-cream" aria-labelledby="why-georgia-heading">
      <div className="container-padded">

        {/* Section header */}
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-3">Why Choose Georgia?</p>
          <h2
            id="why-georgia-heading"
            className="heading-section text-navy mb-4"
          >
            The Smart Choice for Indian Students
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Georgia offers a rare combination of globally recognised degrees,
            genuinely affordable education, and a quality of life that makes
            studying abroad feel like home.
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {REASONS.map(({ Icon, title, description }) => (
            <StaggerItem key={title}>
              <article className="group card-base p-6 md:p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-gold/10">
                  <Icon
                    className="w-6 h-6 text-navy transition-colors duration-300 group-hover:text-gold"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display font-semibold text-lg text-navy mb-2">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
