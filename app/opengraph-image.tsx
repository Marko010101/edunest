import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Edunest — Study in Georgia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Dynamic OG image generated at request time via @vercel/og.
 * Replace the static /og-image.png in metadata with this route
 * by pointing metadata.openGraph.images to '/opengraph-image'.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0C2340 0%, #163769 55%, #0E3875 100%)',
          fontFamily: 'Georgia, serif',
          padding: '60px',
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              background: '#C8972A',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🎓
          </div>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.5px',
            }}
          >
            Edunest
          </span>
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontSize: 18,
            color: '#C8972A',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Your Gateway to Georgian Universities
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 900,
            margin: '0 0 24px',
          }}
        >
          Study in Georgia — World-Class Education, Indian Prices
        </h1>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: 40, marginTop: 12 }}>
          {['500+ Students Placed', 'NMC Approved', 'Free Counselling'].map((badge) => (
            <div
              key={badge}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'rgba(255,255,255,0.65)',
                fontSize: 18,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#C8972A',
                }}
              />
              {badge}
            </div>
          ))}
        </div>

        {/* URL */}
        <p
          style={{
            position: 'absolute',
            bottom: 36,
            right: 60,
            fontSize: 16,
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          edunest.in
        </p>
      </div>
    ),
    { ...size },
  )
}
