import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

const STATS = [
  { value: '500+', label: 'Students Placed' },
  { value: '15+', label: 'Partner Universities' },
  { value: '6', label: 'Years of Experience' },
  { value: '98%', label: 'Visa Success Rate' },
] as const

export function StatsBar() {
  return (
    <section className="bg-gold py-12 md:py-14" aria-label="Key statistics">
      <div className="container-padded">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map(({ value, label }) => (
            <StaggerItem
              key={label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="font-display text-3xl md:text-4xl font-bold text-white">
                {value}
              </span>
              <span className="text-white/80 text-sm font-medium">{label}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
