'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const links = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid #2a2a2a', backgroundColor: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            DRIVKIND<span style={{ color: '#c98a3a' }}>.</span>
          </Link>
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.78rem', color: '#888', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{l.label}</Link>
            ))}
            {loggedIn ? (
              <Link href="/dashboard" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0d0d0d', backgroundColor: '#c98a3a', padding: '8px 20px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Dashboard</Link>
            ) : (
              <>
                <Link href="/login" style={{ fontSize: '0.78rem', color: '#888', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Sign in</Link>
                <Link href="/contact" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0d0d0d', backgroundColor: '#c98a3a', padding: '8px 20px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Get Started</Link>
              </>
            )}
          </div>
          <button className="nav-hamburger" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: '#f0f0f0', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem' }} aria-label="Menu">
            {open ? '✕' : '☰'}
          </button>
        </div>
        {open && (
          <div className="nav-mobile-menu" style={{ borderTop: '1px solid #2a2a2a', backgroundColor: '#0d0d0d' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '1rem 2rem', fontSize: '0.9rem', color: '#f0f0f0', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' }}>{l.label}</Link>
            ))}
            {loggedIn ? (
              <div style={{ padding: '1rem 2rem' }}>
                <Link href="/dashboard" onClick={() => setOpen(false)} style={{ display: 'block', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#0d0d0d', backgroundColor: '#c98a3a', padding: '12px 20px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Dashboard</Link>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} style={{ display: 'block', padding: '1rem 2rem', fontSize: '0.9rem', color: '#f0f0f0', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' }}>Sign in</Link>
                <div style={{ padding: '1rem 2rem' }}>
                  <Link href="/contact" onClick={() => setOpen(false)} style={{ display: 'block', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#0d0d0d', backgroundColor: '#c98a3a', padding: '12px 20px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Get Started</Link>
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}
