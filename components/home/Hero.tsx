'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/shared/Button'

const TRUST_POINTS = [
  '500+ Students Placed',
  'NMC Approved Universities',
  'Free Counselling',
] as const

// ─── Stagger orchestration for hero content ───────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export function Hero() {
  return (
    <section
      className="relative min-h-[95svh] flex items-center bg-hero-gradient overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Decorative background blobs ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute -top-16 -right-16 w-[500px] h-[500px] rounded-full bg-navy-400/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="container-padded relative z-10 py-28 md:py-36">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Pill badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-7">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full pl-1.5 pr-4 py-1">
              <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse-soft" />
              </span>
              <span className="text-white/90 text-sm font-medium">
                Trusted by 500+ Indian Students
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="heading-display text-white mb-6">
            Your Pathway to{' '}
            <span className="text-gradient-gold relative">
              World-Class Education
            </span>{' '}
            in Georgia
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Expert consultancy helping Indian students gain admission to top Georgian
            universities. Affordable MBBS, engineering &amp; business programs with
            end-to-end support.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button href="/universities" size="lg">
              Explore Universities
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Get Free Counselling
            </Button>
          </motion.div>

          {/* Trust points */}
          <motion.ul
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
            role="list"
            aria-label="Key trust indicators"
          >
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-white/65 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 text-white/35 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
