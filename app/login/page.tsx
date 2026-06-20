import Link from 'next/link'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  backgroundColor: '#0d0d0d',
  border: `1px solid ${border}`,
  color: '#f0f0f0',
  padding: '13px 16px',
  borderRadius: 10,
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1rem' }}>

      <div style={{
        backgroundColor: '#111111',
        border: `1px solid ${border}`,
        borderRadius: 16,
        padding: '3rem',
        width: '100%',
        maxWidth: 440,
        marginTop: '15vh',
      }}>

        {/* Logo */}
        <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          DRIVKIND<span style={{ color: copper }}>.</span>
        </p>

        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f0f0f0', textAlign: 'center', marginBottom: '0.5rem' }}>
          Sign in to your dashboard
        </h1>
        <p style={{ fontSize: '0.85rem', color: muted, textAlign: 'center', marginBottom: '2rem' }}>
          Dealer and business partners only.
        </p>

        <form action="#" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Email</label>
            <input type="email" name="email" required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Password</label>
            <input type="password" name="password" required style={inputStyle} />
          </div>
          <button type="submit" style={{
            width: '100%', backgroundColor: copper, color: '#0d0d0d',
            border: 'none', padding: '14px', borderRadius: 999,
            fontWeight: 700, fontSize: '0.875rem',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'inherit',
            marginTop: '0.5rem',
          }}>
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: 1, backgroundColor: border }} />
          <span style={{ fontSize: '0.75rem', color: muted }}>or</span>
          <div style={{ flex: 1, height: 1, backgroundColor: border }} />
        </div>

        <Link href="/contact" style={{
          display: 'block', textAlign: 'center',
          backgroundColor: 'transparent', color: '#f0f0f0',
          border: `1px solid ${border}`,
          padding: '13px', borderRadius: 999,
          fontWeight: 600, fontSize: '0.855rem',
          textDecoration: 'none', letterSpacing: '0.07em',
          textTransform: 'uppercase',
        }}>
          Request access
        </Link>

        <p style={{ fontSize: '0.78rem', color: '#3a3a3a', textAlign: 'center', marginTop: '1.75rem', lineHeight: 1.6 }}>
          Don&apos;t have an account? We&apos;re onboarding partners personally — <Link href="/contact" style={{ color: muted, textDecoration: 'underline' }}>get in touch</Link>.
        </p>
      </div>

      <style>{`
        input:focus {
          border-color: #c98a3a !important;
          outline: none !important;
        }
      `}</style>
    </div>
  )
}
