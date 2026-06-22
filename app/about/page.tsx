import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{
          backgroundColor: '#0d0d0d',
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '28px 28px',
          padding: '6rem 2rem 5rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>
              Our story
            </p>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900, fontStyle: 'italic',
              color: '#f0f0f0', letterSpacing: '-0.03em',
              lineHeight: 1.05, marginBottom: '1.25rem',
            }}>
              About DRIVKIND.
            </h1>
          </div>
        </section>

        {/* ── STORY SECTIONS ───────────────────────────────────── */}
        <section style={{ backgroundColor: '#0d0d0d', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            <div style={{ borderLeft: `2px solid ${border}`, paddingLeft: '2rem', marginBottom: '3.5rem' }}>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85 }}>
                South Africa has one of the most passionate car communities in the world.
              </p>
            </div>

            <div style={{ borderLeft: `2px solid ${border}`, paddingLeft: '2rem', marginBottom: '3.5rem' }}>
              <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
                For the community
              </p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>We spend weekends in workshops, garages, and at meets.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>We build. We drive. We show up.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>DRIVKIND. is bringing it all together in one place.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>Buy and sell cars and parts. Share your builds. Discover events. Connect with other enthusiasts.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>For dealers, workshops, brands, and service providers, DRIVKIND. offers direct access to a community that already cares.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85 }}>Whether you own, build, collect, race, detail, or simply love cars, there&apos;s a place for you here.</p>
            </div>

            <div style={{ borderLeft: `2px solid ${border}`, paddingLeft: '2rem' }}>
              <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
                The mission
              </p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>Our mission is simple.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85, marginBottom: '1rem' }}>To build the platform South African car culture deserves.</p>
              <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85 }}>Built in South Africa. Launching in 2026.</p>
            </div>

          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section style={{
          backgroundColor: '#111111',
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          padding: '5rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 900, fontStyle: 'italic',
              color: '#f0f0f0', letterSpacing: '-0.02em',
              marginBottom: '2.5rem',
            }}>
              Join us.
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <Link href="/pricing" style={{
                backgroundColor: copper, color: '#0d0d0d',
                padding: '14px 28px', borderRadius: 999,
                fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none', letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                For dealers and businesses
              </Link>
              <Link href="/contact" style={{
                backgroundColor: 'transparent', color: '#f0f0f0',
                border: '1px solid #f0f0f0',
                padding: '14px 28px', borderRadius: 999,
                fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none', letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                Join the community
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
