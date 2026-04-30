'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EnquireModal } from './EnquireModal'

interface EnquireButtonProps {
  label?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles = {
  primary: 'bg-gold hover:bg-gold-600 text-white shadow-gold hover:shadow-lg active:scale-[0.98]',
  outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white active:scale-[0.98]',
  ghost:   'border border-white/20 text-white hover:bg-white/10 active:scale-[0.98]',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function EnquireButton({
  label = 'Enquire Now',
  variant = 'primary',
  size = 'md',
  className,
}: EnquireButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
      >
        {label}
      </button>

      <EnquireModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
