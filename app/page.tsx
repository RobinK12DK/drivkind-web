import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Nav />

      <main style={{ paddingTop: 64 }}>

        {/* ── 1. HERO ─────────────────────────────────────────── */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column' as 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          backgroundColor: '#0d0d0d',
        }}>
          {/* Background image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/hero.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            zIndex: 0,
          }} />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.1) 20%, rgba(13,13,13,0.7) 60%, rgba(13,13,13,1) 100%)',
            zIndex: 1,
          }} />
          {/* Grid texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            zIndex: 2,
          }} />

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 10,
            maxWidth: 1100, margin: '0 auto', width: '100%',
            padding: '0 2rem 5rem',
          }}>
            <p style={{
              fontSize: '0.7rem', color: '#c98a3a',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontWeight: 600, marginBottom: '1.25rem',
            }}>
              South Africa&apos;s car culture platform
            </p>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900, fontStyle: 'italic',
              color: '#f0f0f0', lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 820, marginBottom: '1.5rem',
            }}>
              Your dealership.<br />The whole country.
            </h1>

            <p style={{
              fontSize: '1.1rem', color: '#888',
              maxWidth: 560, lineHeight: 1.65, marginBottom: '2.5rem',
            }}>
              DRIVKIND. connects dealers and businesses with the car enthusiasts who live and breathe cars. List your stock, build your brand, reach serious buyers.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
              <Link href="/contact" style={{
                backgroundColor: '#c98a3a', color: '#0d0d0d',
                padding: '14px 28px', borderRadius: 999,
                fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none', letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                Get Started
              </Link>
              <Link href="/pricing" style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#f0f0f0',
                padding: '14px 28px', borderRadius: 999,
                fontWeight: 600, fontSize: '0.82rem',
                textDecoration: 'none', letterSpacing: '0.07em',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
              }}>
                See Pricing
              </Link>
            </div>

            {/* Launch indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                backgroundColor: '#c98a3a',
                animation: 'copperPulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '0.72rem', color: '#c98a3a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Launching 2026
              </span>
            </div>
          </div>
        </section>

        {/* ── 2. SOCIAL PROOF BAR ─────────────────────────────── */}
        <section style={{ borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
          <div style={{ backgroundColor: '#111111', padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' as const, borderBottom: '1px solid #2a2a2a' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c98a3a' }}>Now onboarding founding partners</span>
            <span style={{ fontSize: '0.85rem', color: '#555' }}>— we&apos;re personally setting up our first 10 dealers and businesses. Spots are limited.</span>
            <a href="/contact" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c98a3a', textDecoration: 'none', borderBottom: '1px solid #c98a3a', paddingBottom: 1 }}>Reach out →</a>
          </div>
          <div style={{ backgroundColor: '#111111', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid #1a1a1a' }}>
            {[
              { num: '4,089', label: 'SA vehicle variants' },
              { num: 'R599', label: 'Starting per month' },
              { num: '10', label: 'Founding partner spots' },
              { num: '0', label: 'Setup fees' },
              { num: '0', label: 'Lock-in contracts' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '1.5rem', textAlign: 'center', borderRight: i < 4 ? '1px solid #2a2a2a' : 'none' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.25rem' }}>{stat.num}</div>
                <div style={{ fontSize: '0.72rem', color: '#555', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. TWO COLUMN PITCH ─────────────────────────────── */}
        <section style={{ backgroundColor: '#0d0d0d', padding: '5rem 2rem' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>

            {/* Dealers */}
            <div style={{
              backgroundColor: '#1a1a1a', borderRadius: 16,
              borderTop: '3px solid #c98a3a',
              padding: '2.5rem',
            }}>
              <p style={{ fontSize: '0.68rem', color: '#c98a3a', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
                For Dealers
              </p>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Your digital forecourt.
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.75, marginBottom: '2rem' }}>
                List your full stock, choose which vehicles get promoted into the app marketplace, and reach serious car buyers across South Africa. Track views, enquiries, and watchlists from your dashboard.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {[
                  'Pin on the map with your dealership profile',
                  'Stock management — upload unlimited vehicles',
                  'Promoted marketplace listings (tier-dependent)',
                  'Culture feed posts (template-based)',
                  'Performance dashboard and analytics',
                  'Verified dealer badge',
                ].map((f, i) => (
                  <li key={i} style={{ fontSize: '0.855rem', color: '#ccc', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', lineHeight: 1.5 }}>
                    <span style={{ color: '#c98a3a', flexShrink: 0 }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing#dealers" style={{ fontSize: '0.8rem', color: '#c98a3a', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.04em' }}>
                See dealer pricing →
              </Link>
            </div>

            {/* Businesses */}
            <div style={{
              backgroundColor: '#1a1a1a', borderRadius: 16,
              borderTop: '3px solid #c98a3a',
              padding: '2.5rem',
            }}>
              <p style={{ fontSize: '0.68rem', color: '#c98a3a', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
                For Businesses
              </p>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Be where your customers are.
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.75, marginBottom: '2rem' }}>
                Whether you&apos;re a workshop, detailer, parts supplier, or fitment centre — DRIVKIND. puts your business in front of the enthusiasts who need your services. Get found, get followed, get booked.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {[
                  'Pin on the map with your business profile',
                  'Listed in the Business Directory',
                  'Culture feed posts to build your following',
                  'Promoted placement in category searches',
                  'Special offers card on your profile',
                  'Verified business badge',
                ].map((f, i) => (
                  <li key={i} style={{ fontSize: '0.855rem', color: '#ccc', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', lineHeight: 1.5 }}>
                    <span style={{ color: '#c98a3a', flexShrink: 0 }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing#businesses" style={{ fontSize: '0.8rem', color: '#c98a3a', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.04em' }}>
                See business pricing →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4. HOW IT WORKS ─────────────────────────────────── */}
        <section style={{
          backgroundColor: '#0d0d0d',
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '28px 28px',
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', color: '#c98a3a', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
              Simple by design
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800, fontStyle: 'italic',
              color: '#f0f0f0', letterSpacing: '-0.02em',
              marginBottom: '3.5rem',
            }}>
              Up and running in minutes.
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2.5rem',
              textAlign: 'left',
            }}>
              {[
                {
                  num: '01',
                  title: 'Create your profile',
                  body: 'Set up your dealership or business page. Add your logo, location, contact details, and opening hours.',
                },
                {
                  num: '02',
                  title: 'Load your stock or services',
                  body: 'Upload your vehicles or describe your services. Choose what gets promoted into the app.',
                },
                {
                  num: '03',
                  title: 'Reach the community',
                  body: 'Your listings appear in the marketplace. Your profile appears on the map. Post culture content to build your following.',
                },
              ].map(({ num, title, body }) => (
                <div key={num}>
                  <div style={{
                    fontSize: '2.75rem', fontWeight: 900, fontStyle: 'italic',
                    color: '#c98a3a', opacity: 0.35, lineHeight: 1,
                    marginBottom: '1rem', letterSpacing: '-0.03em',
                  }}>
                    {num}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.65rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.855rem', color: '#555', lineHeight: 1.75 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. PRICING TEASER ───────────────────────────────── */}
        <section style={{
          backgroundColor: '#111111',
          borderTop: '1px solid #2a2a2a',
          borderBottom: '1px solid #2a2a2a',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800, fontStyle: 'italic',
            color: '#f0f0f0', letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            Transparent pricing. No surprises.
          </h2>
          <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2.5rem' }}>
            Two plans for dealers. Two plans for businesses. Starting at R599/month.
          </p>
          <Link href="/pricing" style={{
            display: 'inline-block',
            backgroundColor: '#c98a3a', color: '#0d0d0d',
            padding: '16px 36px', borderRadius: 999,
            fontWeight: 700, fontSize: '0.875rem',
            textDecoration: 'none', letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
          }}>
            View full pricing →
          </Link>
          <p style={{ fontSize: '0.75rem', color: '#3a3a3a', letterSpacing: '0.04em' }}>
            No setup fees. No lock-in contracts. Cancel anytime.
          </p>
        </section>

        {/* ── 6. EARLY ACCESS / CONTACT ───────────────────────── */}
        <section style={{ backgroundColor: '#0d0d0d', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: '#c98a3a', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
              Get early access
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800, fontStyle: 'italic',
              color: '#f0f0f0', letterSpacing: '-0.02em',
              marginBottom: '1.25rem', lineHeight: 1.1,
            }}>
              Be one of our first 10 partners.
            </h2>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              We&apos;re personally onboarding our first 10 dealers and businesses. If you want to be part of launch, reach out directly.
            </p>
            <a href="mailto:robin@drivkind.co.za" style={{
              display: 'block',
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: '#c98a3a', fontWeight: 700,
              textDecoration: 'underline',
              textDecorationColor: 'rgba(201,138,58,0.35)',
              textUnderlineOffset: 5,
              marginBottom: '1rem',
            }}>
              robin@drivkind.co.za
            </a>
            <p style={{ fontSize: '0.85rem', color: '#444' }}>
              Or call 071 836 0010
            </p>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes copperPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.8); }
        }
      `}</style>
    </>
  )
}
