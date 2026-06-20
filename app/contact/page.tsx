import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  backgroundColor: '#111111',
  border: `1px solid ${border}`,
  color: '#f0f0f0',
  padding: '12px 16px',
  borderRadius: 8,
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, backgroundColor: '#0d0d0d' }}>

        {/* Hero */}
        <section style={{
          padding: '5rem 2rem 4rem',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Get in touch</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem' }}>
              Let&apos;s get you set up.
            </h1>
            <p style={{ fontSize: '1rem', color: muted, lineHeight: 1.7 }}>
              We&apos;re personally onboarding our first 10 dealers and businesses. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* Two column */}
        <section style={{ padding: '4rem 2rem 6rem' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            alignItems: 'flex-start',
          }}>

            {/* Left — contact details */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>Contact</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.68rem', color: muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Email</p>
                  <a href="mailto:robin@drivkind.co.za" style={{ fontSize: '1rem', color: copper, textDecoration: 'none', fontWeight: 600 }}>robin@drivkind.co.za</a>
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', color: muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Phone</p>
                  <p style={{ fontSize: '1rem', color: '#f0f0f0' }}>071 836 0010</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', color: muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Instagram</p>
                  <a href="https://instagram.com/drivkind.sa" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem', color: copper, textDecoration: 'none', fontWeight: 600 }}>@drivkind.sa</a>
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', color: muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>WhatsApp</p>
                  <a href="https://wa.me/27718360010" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem', color: copper, textDecoration: 'none', fontWeight: 600 }}>071 836 0010</a>
                </div>
                <p style={{ fontSize: '0.85rem', color: muted }}>Based in Johannesburg, South Africa.</p>
              </div>

              {/* Info box */}
              <div style={{ backgroundColor: '#111111', border: `1px solid ${border}`, borderRadius: 12, padding: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 2 }}>
                  DRIVKIND Technologies (Pty) Ltd<br />
                  Reg. 2026/465449/07<br />
                  <a href="mailto:robin@drivkind.co.za" style={{ color: copper, textDecoration: 'none' }}>robin@drivkind.co.za</a>
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>Send an enquiry</h2>

              <form action="#" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Name</label>
                  <input type="text" name="name" required style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</label>
                  <input type="email" name="email" required style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Phone</label>
                  <input type="tel" name="phone" style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Business / Dealership name</label>
                  <input type="text" name="business" style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Type</label>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    {['Dealer', 'Business'].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#f0f0f0', cursor: 'pointer' }}>
                        <input type="radio" name="type" value={opt.toLowerCase()} style={{ accentColor: copper }} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Plan interested in</label>
                  <select name="plan" style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Select a plan…</option>
                    <option value="forecourt">Forecourt (R599)</option>
                    <option value="showroom">Showroom (R999)</option>
                    <option value="flagship">Flagship (R1,999)</option>
                    <option value="essentials">Essentials (R599)</option>
                    <option value="pro">Pro (R999)</option>
                    <option value="premium">Premium (R1,999)</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Message</label>
                  <textarea name="message" rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
                </div>

                <button type="submit" style={{
                  width: '100%', backgroundColor: copper, color: '#0d0d0d',
                  border: 'none', padding: '14px 24px', borderRadius: 999,
                  fontWeight: 700, fontSize: '0.875rem',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Send enquiry
                </button>

                <p style={{ fontSize: '0.75rem', color: '#3a3a3a', textAlign: 'center' }}>
                  We&apos;ll respond within 24 hours. No spam, ever.<br />
                  Prefer WhatsApp? Message 071 836 0010 — we respond fast.
                </p>
              </form>

              <style>{`
                input:focus, select:focus, textarea:focus {
                  border-color: #c98a3a !important;
                  outline: none !important;
                }
                select option {
                  background: #111111;
                  color: #f0f0f0;
                }
              `}</style>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
