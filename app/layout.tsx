import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// ─── Site constants ───────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://edunest.in'
const SITE_NAME = 'Edunest'

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C2340',
}

// ─── Global metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} — Study in Georgia | Indian Students' Gateway to Georgian Universities`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    'Edunest is India\'s trusted education consultancy for studying in Georgia. Expert guidance for MBBS, engineering & business programs at NMC-approved Georgian universities. Free counselling available.',

  keywords: [
    'study in Georgia',
    'MBBS in Georgia for Indian students',
    'Georgian universities',
    'education consultancy India',
    'Georgian medical university',
    'study abroad India',
    'Tbilisi universities',
    'NMC approved Georgia',
    'FMGE coaching Georgia',
    'affordable MBBS abroad',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Your Gateway to Georgian Universities`,
    description:
      'Expert education consultancy helping Indian students gain admission to top Georgian universities. Free counselling, visa support & end-to-end guidance.',
    images: [
      {
        url: '/opengraph-image',   // resolved via app/opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Study in Georgia`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@edunest',
    creator: '@edunest',
    title: `${SITE_NAME} — Study in Georgia`,
    description:
      'Expert education consultancy for Indian students. Gain admission to top Georgian universities with Edunest.',
    images: ['/opengraph-image'],
  },

  alternates: {
    canonical: SITE_URL,
  },

  // Add your Google Search Console token here once verified
  // verification: { google: 'YOUR_VERIFICATION_TOKEN' },

  category: 'education',
}

// ─── Organisation JSON-LD (sitewide) ──────────────────────────────────────────
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Edunest is an education consultancy connecting Indian students with top universities in Georgia (the country).',
  foundingDate: '2019',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Delhi',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@edunest.in',
      telephone: '+91-12345-67890',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/edunest',
    'https://www.facebook.com/edunest',
    'https://www.linkedin.com/company/edunest',
    'https://www.youtube.com/@edunest',
  ],
}

// ─── Root layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="font-sans antialiased bg-white text-charcoal">
        {/*
          Skip-to-content link for keyboard / screen-reader users.
          The matching id="main-content" lives on the <main> element below.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
