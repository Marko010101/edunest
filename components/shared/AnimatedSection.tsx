'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Shared variant definitions ────────────────────────────────────────────────

/** Fade-up used by standalone AnimatedSection and StaggerItem */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

/** Stagger orchestration — no visual change on the wrapper itself */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

// ─── Components ───────────────────────────────────────────────────────────────

interface BaseProps {
  children: ReactNode
  className?: string
}

/**
 * AnimatedSection — scroll-triggered fade-up for standalone blocks.
 * Fires once when the element enters the viewport.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
}: BaseProps & { delay?: number }) {
  const variants: Variants =
    delay > 0
      ? {
          hidden: { opacity: 0, y: 22 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay },
          },
        }
      : fadeUpVariants

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer — scroll-triggered wrapper that staggers its StaggerItem children.
 * The container itself is invisible; only children animate.
 */
export function StaggerContainer({ children, className }: BaseProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem — child of StaggerContainer that inherits the stagger timing.
 * Do NOT wrap in its own whileInView; it relies on the parent's orchestration.
 */
export function StaggerItem({ children, className }: BaseProps) {
  return (
    <motion.div variants={fadeUpVariants} className={className}>
      {children}
    </motion.div>
  )
}
