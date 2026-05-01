import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Free Counselling for Studying in Georgia',
  description:
    'Get in touch with the Edunest team. Book a free counselling session, ask about universities in Georgia, or start your application today.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Edunest — Start Your Journey to Georgia',
    description:
      'Reach out for free, personalised counselling on studying in Georgia. We respond within 24 hours.',
    url: '/contact',
  },
}

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Edunest',
  url: 'https://edunest.in/contact',
  description: 'Contact page for Edunest education consultancy',
  mainEntity: {
    '@type': 'Organization',
    name: 'Edunest',
    email: 'info@studywithedunest.com',
    telephone: '+91-98765-43210',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Delhi',
    },
  },
}

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: 'Email Us',
    value: 'info@studywithedunest.com',
    href: 'mailto:info@studywithedunest.com',
    sub: 'We reply within 24 hours',
  },
  {
    Icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    sub: 'Mon – Sat, 9 am – 7 pm IST',
  },
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98765 43210',
    href: 'https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20studying%20in%20Georgia.',
    sub: 'Quick replies, any time',
  },
  {
    Icon: MapPin,
    label: 'Our Offices',
    value: 'New Delhi & Mumbai',
    href: null,
    sub: 'Also headquartered in Tbilisi, Georgia',
  },
] as const

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-hero-gradient overflow-hidden pt-[136px] pb-20 md:pt-[156px] md:pb-28"
        aria-label="Contact us"
      >
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full bg-navy-400/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-gold/8 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <div className="container-padded relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-6">
            <Clock className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span className="text-white/75 text-xs font-medium tracking-wide">We respond within 24 hours</span>
          </div>
          <h1 className="heading-display text-white mb-5 max-w-2xl">
            Let&apos;s Start Your <span className="text-gradient-gold">Journey Together</span>
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-xl">
            Have questions about studying in Georgia? Ready to apply? Our team is here to give you honest,
            personalised guidance — completely free.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="contact-form-heading">
        <div className="container-padded">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ── Left: form (3 cols) ─────────────────────────────────────── */}
            <AnimatedSection className="lg:col-span-3">
              <div className="card-base p-8 md:p-10">
                <p className="eyebrow mb-2">Free Counselling</p>
                <h2 id="contact-form-heading" className="font-display font-bold text-2xl text-navy mb-1">
                  Send Us an Enquiry
                </h2>
                <p className="text-muted text-sm mb-8">
                  Fill in your details and we&apos;ll reach out to schedule your free session.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* ── Right: contact info (2 cols) ────────────────────────────── */}
            <AnimatedSection delay={0.15} className="lg:col-span-2 flex flex-col gap-4">
              {CONTACT_ITEMS.map(({ Icon, label, value, href, sub }) => (
                <div key={label} className="card-base p-6 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-semibold text-navy hover:text-gold transition-colors text-sm break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy text-sm">{value}</p>
                    )}
                    <p className="text-xs text-muted mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}

              {/* Promise card */}
              <div className="rounded-2xl bg-navy px-6 py-5 mt-2">
                <p className="eyebrow text-gold mb-2">Our Promise</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  No pressure, no sales tactics — just honest advice from a team that knows the Georgia
                  education system from the inside.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </>
  )
}
