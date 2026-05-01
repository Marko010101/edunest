'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Send, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INDIA_STATES, INDIA_STATES_CITIES } from '@/lib/data/india-locations'

interface EnquireModalProps {
  isOpen: boolean
  onClose: () => void
}

const inputBase =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-charcoal text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200'

const selectBase = cn(inputBase, 'appearance-none cursor-pointer pr-10')

export function EnquireModal({ isOpen, onClose }: EnquireModalProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const cities = form.state ? (INDIA_STATES_CITIES[form.state] ?? []) : []

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      const t = setTimeout(() => {
        setForm({ name: '', email: '', phone: '', state: '', city: '' })
        setSubmitted(false)
      }, 300)
      return () => clearTimeout(t)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Submission failed.')
      }
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="enquire-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel wrapper — centers the card */}
          <motion.div
            key="enquire-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Enquire Now"
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal header */}
              <div className="bg-hero-gradient px-6 py-5 flex items-start justify-between flex-shrink-0">
                <div>
                  <p className="eyebrow text-gold-400 mb-1">Free counselling</p>
                  <h2 className="font-display font-bold text-xl text-white leading-tight">
                    Enquire Now
                  </h2>
                  <p className="text-white/60 text-sm mt-0.5">We'll reach out within 24 hours</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors mt-0.5 flex-shrink-0"
                  aria-label="Close enquiry form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="px-6 py-6 overflow-y-auto">
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-6 gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle className="w-9 h-9 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-navy mb-1">
                        Thank you!
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        We've received your enquiry and will contact you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-1 px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-600 text-white text-sm font-semibold transition-colors active:scale-[0.98]"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="enq-name" className="block text-xs font-semibold text-charcoal mb-1.5">
                        Full Name <span className="text-gold-500">*</span>
                      </label>
                      <input
                        id="enq-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="enq-email" className="block text-xs font-semibold text-charcoal mb-1.5">
                        Email Address <span className="text-gold-500">*</span>
                      </label>
                      <input
                        id="enq-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>

                    {/* Phone with +91 prefix */}
                    <div>
                      <label htmlFor="enq-phone" className="block text-xs font-semibold text-charcoal mb-1.5">
                        Phone Number <span className="text-gold-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center rounded-xl rounded-r-none border border-r-0 border-gray-200 bg-gray-100 px-3 text-sm text-muted font-medium select-none flex-shrink-0">
                          +91
                        </span>
                        <input
                          id="enq-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="98765 43210"
                          value={form.phone}
                          onChange={handleChange}
                          pattern="[6-9][0-9]{9}"
                          maxLength={10}
                          className={cn(inputBase, 'rounded-l-none flex-1')}
                        />
                      </div>
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="enq-state" className="block text-xs font-semibold text-charcoal mb-1.5">
                        State <span className="text-gold-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="enq-state"
                          name="state"
                          required
                          value={form.state}
                          onChange={handleChange}
                          className={selectBase}
                        >
                          <option value="">Select your state</option>
                          {INDIA_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="enq-city" className="block text-xs font-semibold text-charcoal mb-1.5">
                        City <span className="text-gold-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="enq-city"
                          name="city"
                          required
                          value={form.city}
                          onChange={handleChange}
                          disabled={!form.state}
                          className={cn(selectBase, !form.state && 'opacity-50 cursor-not-allowed')}
                        >
                          <option value="">
                            {form.state ? 'Select your city' : 'Select state first'}
                          </option>
                          {cities.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Error message */}
                    {submitError && (
                      <p role="alert" className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {submitError}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-1 w-full py-3 rounded-xl bg-gold hover:bg-gold-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] shadow-gold"
                    >
                      {submitting ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        <Send className="w-4 h-4" aria-hidden="true" />
                      )}
                      {submitting ? 'Sending…' : 'Submit Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
