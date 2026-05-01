'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Calendar, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { University } from '@/lib/types'

interface Props {
  universities: University[]
}

const FILTERS = [
  { label: 'All Universities', value: 'all' },
  { label: 'Medicine & MBBS', value: 'medicine' },
  { label: 'Business', value: 'business' },
  { label: 'Law', value: 'law' },
  { label: 'Technology', value: 'tech' },
] as const

type FilterValue = (typeof FILTERS)[number]['value']

function matchesFilter(u: University, filter: FilterValue): boolean {
  if (filter === 'all') return true
  const p = u.programs.map(x => x.toLowerCase())
  if (filter === 'medicine')
    return p.some(x => ['medicine', 'mbbs', 'dentistry', 'pharmacy', 'public health'].some(k => x.includes(k)))
  if (filter === 'business')
    return p.some(x => x.includes('business'))
  if (filter === 'law')
    return p.some(x => x.includes('law'))
  if (filter === 'tech')
    return p.some(x => ['computer', 'engineering', 'informatics', 'architecture', 'technology'].some(k => x.includes(k)))
  return true
}

// Accent colours cycling through the cards
const ACCENTS = [
  'from-navy to-navy-700',
  'from-[#0C2340] to-[#1a3a5c]',
  'from-navy-700 to-navy',
  'from-[#162d47] to-navy',
  'from-navy to-[#0a1c30]',
]

function UniversityCard({ university, index }: { university: University; index: number }) {
  const fee = `$${university.annualFee.min.toLocaleString()} – $${university.annualFee.max.toLocaleString()} ${university.annualFee.currency}`
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <article className="card-base overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
      {/* Decorative header */}
      <div className={cn('h-28 bg-gradient-to-br relative overflow-hidden flex items-center justify-center flex-shrink-0', accent)}>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          aria-hidden="true"
        />
        <span className="font-display font-bold text-4xl text-white/90 relative z-10 tracking-tight select-none">
          {university.abbrev}
        </span>
        {university.ranking && (
          <span className="absolute top-3 right-3 bg-gold/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
            {university.ranking}
          </span>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gold-gradient" aria-hidden="true" />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Name + location */}
        <div>
          <h3 className="font-display font-bold text-navy text-lg leading-tight mb-2 group-hover:text-gold transition-colors duration-200">
            {university.name}
          </h3>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {university.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              Est. {university.established}
            </span>
          </div>
        </div>

        {/* Accreditations */}
        <div className="flex flex-wrap gap-1.5">
          {university.accreditation.map(a => (
            <span
              key={a}
              className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-100 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            >
              <CheckCircle className="w-2.5 h-2.5" aria-hidden="true" />
              {a}
            </span>
          ))}
        </div>

        {/* Programs */}
        <div className="flex flex-wrap gap-1.5">
          {university.programs.slice(0, 4).map(p => (
            <span key={p} className="bg-navy-50 text-navy text-[11px] font-medium px-2.5 py-1 rounded-lg">
              {p}
            </span>
          ))}
          {university.programs.length > 4 && (
            <span className="bg-gray-100 text-muted text-[11px] font-medium px-2.5 py-1 rounded-lg">
              +{university.programs.length - 4} more
            </span>
          )}
        </div>

        {/* Fee + CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Annual Fee</p>
            <p className="text-navy font-bold text-sm">{fee}</p>
          </div>
          <Link
            href={`/universities/${university.slug}`}
            className="inline-flex items-center gap-1.5 bg-navy hover:bg-gold text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors duration-200 flex-shrink-0"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

const VALID_FILTERS = FILTERS.map(f => f.value)

export function UniversityGrid({ universities }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const raw = searchParams.get('filter') ?? 'all'
  const active = (VALID_FILTERS.includes(raw as FilterValue) ? raw : 'all') as FilterValue

  const setFilter = (value: FilterValue) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') params.delete('filter')
    else params.set('filter', value)
    const qs = params.toString()
    router.replace(`/universities${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const filtered = universities.filter(u => matchesFilter(u, active))

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by programme">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={active === value}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
              active === value
                ? 'bg-navy text-white border-navy shadow-sm'
                : 'bg-white text-charcoal border-gray-200 hover:border-navy hover:text-navy',
            )}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto self-center text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? 'university' : 'universities'}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u, i) => (
            <UniversityCard key={u.id} university={u} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted">
          <p className="text-lg font-medium">No universities match this filter.</p>
        </div>
      )}
    </div>
  )
}
