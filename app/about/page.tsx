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
              Built by a car person,<br />for car people.
            </h1>
            <p style={{ fontSize: '1.1rem', color: muted, lineHeight: 1.7 }}>
              DRIVKIND. started with a Golf 3 GTI and a frustration.
            </p>
          </div>
        </section>

        {/* ── STORY SECTIONS ───────────────────────────────────── */}
        <section style={{ backgroundColor: '#0d0d0d', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            {[
              {
                heading: 'The gap',
                body: 'South Africa has one of the most passionate car cultures in the world. Lowriders in Mitchells Plain. Stance crews in Soweto. Track days in Kyalami. Concours d\'Elegance in Franschhoek. We show up. We build. We live it. But there was no platform built for us. AutoTrader lists cars like a classifieds directory. Instagram is too noisy. Facebook groups are a mess. WhatsApp groups forget everything. We deserved better.',
              },
              {
                heading: 'Who built this',
                body: 'Robin Kley. Car guy. Johannesburg. Currently restoring a 1998 Volkswagen Golf 3 GTI — Build Thread #1 on DRIVKIND. Built this platform alone, from scratch, because he couldn\'t find what he was looking for and decided to build it himself.',
              },
              {
                heading: 'The mission',
                body: 'DRIVKIND. is not an app. It\'s a home. For the MK1 hunter. The daily driver. The weekend warrior. The detailer who treats every car like a work of art. The dealer who knows every car on his lot by name. We built the platform SA car culture deserves — and we\'re just getting started.',
              },
              {
                heading: 'Why DRIVKIND.',
                body: 'Find your kind. It\'s that simple. Car people are a kind. A tribe. Whether you\'re into JDM, German, American muscle, SA classics, or anything that moves — there\'s a kind for you here. The period is deliberate. DRIVKIND. is a statement, not just a name.',
              },
            ].map(({ heading, body }, i) => (
              <div key={heading} style={{
                borderLeft: `2px solid ${border}`,
                paddingLeft: '2rem',
                marginBottom: i < 3 ? '3.5rem' : 0,
              }}>
                <p style={{
                  fontSize: '0.68rem', color: copper,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontWeight: 700, marginBottom: '0.75rem',
                }}>
                  {heading}
                </p>
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
