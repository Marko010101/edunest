import type { Config } from 'tailwindcss'

/**
 * Brand palette rationale:
 *   navy  — trust, authority, academia (primary)
 *   gold  — prestige, achievement, warmth (accent / CTA)
 *   cream — breathing room, premium feel (warm surfaces)
 *   charcoal — readable, softer than pure black (body text)
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Colors ──────────────────────────────────────────────
      colors: {
        navy: {
          50: '#EDF3FB',
          100: '#CCDAEA',
          200: '#99B5D5',
          300: '#6690C0',
          400: '#3B6DAC',
          500: '#1A4F98',
          600: '#0E3875',
          700: '#092B5A',
          800: '#061D3D',
          900: '#030F21',
          DEFAULT: '#0C2340',
        },
        gold: {
          50: '#FEF9EC',
          100: '#FCEFC4',
          200: '#F9DF89',
          300: '#F5CC4F',
          400: '#E8B82A',
          500: '#C8972A',  // primary gold
          600: '#A47A1E',
          700: '#7F5E15',
          800: '#5A420E',
          900: '#362706',
          DEFAULT: '#C8972A',
        },
        cream: '#FBF8F3',
        charcoal: '#1C2B3A',
        muted: '#637085',
      },

      // ─── Typography ───────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },

      // ─── Gradients ────────────────────────────────────────────
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0C2340 0%, #163769 55%, #0E3875 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #C8972A 0%, #E8B82A 100%)',
        'navy-fade':
          'linear-gradient(180deg, #0C2340 0%, #163769 100%)',
      },

      // ─── Shadows ──────────────────────────────────────────────
      boxShadow: {
        card: '0 4px 24px -2px rgba(12, 35, 64, 0.08)',
        'card-hover': '0 12px 40px -4px rgba(12, 35, 64, 0.18)',
        gold: '0 4px 24px -2px rgba(200, 151, 42, 0.35)',
      },

      // ─── Animation ────────────────────────────────────────────
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },

      // ─── Border radius ────────────────────────────────────────
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
