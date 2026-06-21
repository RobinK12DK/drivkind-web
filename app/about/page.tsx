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
              Built for SA car culture. By someone who lives it.
            </h1>
          </div>
        </section>

        {/* ── STORY SECTIONS ───────────────────────────────────── */}
        <section style={{ backgroundColor: '#0d0d0d', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            {[
              {
                heading: '',
                body: 'South Africa has one of the most passionate car cultures in the world. We build. We show up. We live it. DRIVKIND. is the platform that was missing — one place for the community to buy, sell, connect, and belong.',
              },
              {
                heading: 'Who built this',
                body: "Robin Kley. Car person. Johannesburg. Currently restoring a 1998 Volkswagen Golf 3 GTI — Build Thread #1 on DRIVKIND. Built this platform from scratch because the right one didn't exist.",
              },
              {
                heading: 'For dealers and businesses',
                body: "DRIVKIND. puts your brand in front of a community that already cares about cars. Not a general audience. Not passive scrollers. Enthusiasts — people who research, discuss, and buy. We built the tools to help you reach them, build your following, and grow.",
              },
              {
                heading: 'The mission',
                body: 'A platform SA car culture actually deserves. Community-first. Built here. Launching 2026.',
              },
            ].map(({ heading, body }, i) => (
              <div key={i} style={{
                borderLeft: `2px solid ${border}`,
                paddingLeft: '2rem',
                marginBottom: i < 3 ? '3.5rem' : 0,
              }}>
                {heading && (
                  <p style={{
                    fontSize: '0.68rem', color: copper,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    fontWeight: 700, marginBottom: '0.75rem',
                  }}>
                    {heading}
                  </p>
                )}
                <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.85 }}>
                  {body}
                </p>
              </div>
            ))}

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
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
