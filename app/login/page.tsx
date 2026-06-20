'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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
  boxSizing: 'border-box',
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard')
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

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

        <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          DRIVKIND<span style={{ color: copper }}>.</span>
        </p>

        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f0f0f0', textAlign: 'center', marginBottom: '0.5rem' }}>
          Sign in to your dashboard
        </h1>
        <p style={{ fontSize: '0.85rem', color: muted, textAlign: 'center', marginBottom: '2rem' }}>
          Dealer and business partners only.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.82rem', color: '#ef4444', textAlign: 'center', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', backgroundColor: copper, color: '#0d0d0d',
              border: 'none', padding: '14px', borderRadius: 999,
              fontWeight: 700, fontSize: '0.875rem',
              letterSpacing: '0.07em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              marginTop: '0.5rem', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ fontSize: '0.82rem', color: muted, textAlign: 'center', marginTop: '1.5rem' }}>
          New to DRIVKIND.?{' '}
          <Link href="/signup" style={{ color: copper, textDecoration: 'none', fontWeight: 600 }}>
            Create your account →
          </Link>
        </p>

        <p style={{ fontSize: '0.78rem', color: '#3a3a3a', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
          Partners being onboarded personally —{' '}
          <Link href="/contact" style={{ color: muted, textDecoration: 'underline' }}>get in touch</Link>.
        </p>
      </div>

      <style>{`
        input:focus { border-color: #c98a3a !important; outline: none !important; }
      `}</style>
    </div>
  )
}
