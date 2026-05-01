'use client'

import { useState } from 'react'
import { Send, CheckCircle, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INDIA_STATES, INDIA_STATES_CITIES } from '@/lib/data/india-locations'

type FormState = {
  name: string
  email: string
  phone: string
  state: string
  city: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', state: '', city: '', message: '' }

const inputBase =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-charcoal text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200'

const selectBase = cn(inputBase, 'appearance-none cursor-pointer pr-10')

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const cities = form.state ? (INDIA_STATES_CITIES[form.state] ?? []) : []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 gap-5">
        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-navy mb-2">Thank you!</h3>
          <p className="text-muted leading-relaxed max-w-sm">
            We&apos;ve received your enquiry and will contact you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => { setForm(EMPTY); setSubmitted(false) }}
          className="mt-2 px-6 py-2.5 rounded-xl bg-navy hover:bg-navy-800 text-white text-sm font-semibold transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Row 1 — Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="c-name" className="block text-xs font-semibold text-charcoal mb-1.5">
            Full Name <span className="text-gold-500">*</span>
          </label>
          <input
            id="c-name"
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
        <div>
          <label htmlFor="c-email" className="block text-xs font-semibold text-charcoal mb-1.5">
            Email Address <span className="text-gold-500">*</span>
          </label>
          <input
            id="c-email"
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
      </div>

      {/* Row 2 — Phone */}
      <div>
        <label htmlFor="c-phone" className="block text-xs font-semibold text-charcoal mb-1.5">
          Phone Number <span className="text-gold-500">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center rounded-xl rounded-r-none border border-r-0 border-gray-200 bg-gray-100 px-3 text-sm text-muted font-medium select-none flex-shrink-0">
            +91
          </span>
          <input
            id="c-phone"
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

      {/* Row 3 — State + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="c-state" className="block text-xs font-semibold text-charcoal mb-1.5">
            State <span className="text-gold-500">*</span>
          </label>
          <div className="relative">
            <select
              id="c-state"
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
        <div>
          <label htmlFor="c-city" className="block text-xs font-semibold text-charcoal mb-1.5">
            City <span className="text-gold-500">*</span>
          </label>
          <div className="relative">
            <select
              id="c-city"
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              disabled={!form.state}
              className={cn(selectBase, !form.state && 'opacity-50 cursor-not-allowed')}
            >
              <option value="">{form.state ? 'Select your city' : 'Select state first'}</option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Row 4 — Message */}
      <div>
        <label htmlFor="c-message" className="block text-xs font-semibold text-charcoal mb-1.5">
          Message <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={4}
          placeholder="Tell us about your goals, preferred programs, or any questions you have…"
          value={form.message}
          onChange={handleChange}
          className={cn(inputBase, 'resize-none')}
        />
      </div>

      {submitError && (
        <p role="alert" className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.99] shadow-gold"
      >
        {submitting ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <Send className="w-4 h-4" aria-hidden="true" />
        )}
        {submitting ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}
