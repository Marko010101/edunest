import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { Hero } from '@/components/home/Hero'
import { StatsBar } from '@/components/home/StatsBar'
import { WhyGeorgia } from '@/components/home/WhyGeorgia'
import { FeaturedUniversities } from '@/components/home/FeaturedUniversities'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ContactSection } from '@/components/home/ContactSection'

// ─── Page-level metadata (overrides layout defaults) ─────────────────────────
export const metadata: Metadata = {
  title: 'Study in Georgia — Top Universities for Indian Students',
  description:
    'Edunest connects Indian students with top Georgian universities. MBBS, engineering & business programs. NMC approved, English-medium, free counselling.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Edunest — Your Gateway to Georgian Universities',
    description:
      'India\'s trusted consultancy for studying in Georgia. Expert guidance, NMC-approved universities, visa support & free counselling.',
    url: '/',
  },
}

// ─── Page-level JSON-LD ───────────────────────────────────────────────────────
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Edunest',
  url: 'https://edunest.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://edunest.in/universities?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Education Consultancy',
  name: 'Study in Georgia Consultancy',
  provider: { '@type': 'Organization', name: 'Edunest' },
  areaServed: { '@type': 'Country', name: 'India' },
  audience: { '@type': 'Audience', audienceType: 'Indian students seeking foreign education' },
  description:
    'End-to-end education consultancy helping Indian students study at Georgian universities — covering admissions, visa, accommodation, and on-ground support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    description: 'Free initial counselling session',
  },
}

// ─── Page component ───────────────────────────────────────────────────────────
/**
 * Homepage — composed purely from server components except Hero (client).
 * Render order mirrors the visual hierarchy; each section is independently
 * animated via <AnimatedSection> / <StaggerContainer> client boundaries.
 */
export default function HomePage() {
  return (
    <>
      {/* Page-specific structured data */}
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={serviceJsonLd} />

      {/*
        Hero — 'use client' for staggered Framer Motion intro animation.
        All remaining sections are server components; animation is handled
        inside their <AnimatedSection> / <StaggerContainer> client sub-trees.
      */}
      <Hero />

      {/* Gold stats bar — immediate social proof after hero */}
      <StatsBar />

      {/* Why Study in Georgia — 6 benefit cards, cream background */}
      <WhyGeorgia />

      {/* Featured Universities — 3 partner university cards */}
      <FeaturedUniversities />

      {/* How It Works — 4-step process on navy background */}
      <HowItWorks />

      {/* Final CTA banner */}
      <ContactSection />
    </>
  )
}
