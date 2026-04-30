import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gold hover:bg-gold-600 text-white shadow-gold hover:shadow-lg active:scale-[0.98]',
  secondary:
    'bg-navy hover:bg-navy-700 text-white shadow-card hover:shadow-card-hover active:scale-[0.98]',
  outline:
    'border-2 border-white text-white hover:bg-white hover:text-navy active:scale-[0.98]',
  ghost:
    'text-navy hover:bg-navy-50 border border-transparent hover:border-navy-100 active:scale-[0.98]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center rounded-xl font-semibold',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={base} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
