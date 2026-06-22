'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { href: '/dashboard/profile', label: 'My Profile', icon: '◉' },
  { href: '/dashboard/stock', label: 'Stock', icon: '◈' },
  { href: '/dashboard/promote', label: 'Promote', icon: '◎' },
  { href: '/dashboard/enquiries', label: 'Enquiries', icon: '◇' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '▲' },
  { href: '/dashboard/billing', label: 'Billing', icon: '◆' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #2a2a2a', borderTopColor: '#fe4d5f' }} className="dash-spinner" />
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .dash-spinner { animation: spin 0.8s linear infinite; }
        `}</style>
      </div>
    )
  }

  const sidebarNav = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', margin: 0 }}>
          DRIVKIND<span style={{ color: '#c98a3a' }}>.</span>
        </p>
        <p style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
          Business Portal
        </p>
        <a href="/" className="dash-back-link" style={{ fontSize: '0.72rem', color: '#555', textDecoration: 'none', letterSpacing: '0.06em', display: 'block', marginTop: '0.5rem' }}>
          ← Back to website
        </a>
      </div>

      <nav style={{ flex: 1 }}>
        {navLinks.map(link => {
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                padding: '0.6rem 0.75rem', marginBottom: '0.2rem',
                borderRadius: 8, textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: active ? 600 : 400,
                color: active ? '#c98a3a' : '#555',
                borderLeft: active ? '2px solid #c98a3a' : '2px solid transparent',
                backgroundColor: active ? 'rgba(201,138,58,0.06)' : 'transparent',
              }}
            >
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '1rem', marginTop: '1rem' }}>
        <p style={{ fontSize: '0.72rem', color: '#555', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user?.email ?? ''}
        </p>
        <button
          onClick={handleSignOut}
          style={{ background: 'none', border: 'none', color: '#555', fontSize: '0.8rem', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
        >
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .dash-sidebar { display: none !important; }
          .dash-main { margin-left: 0 !important; padding-top: 72px !important; }
          .dash-topbar { display: flex !important; }
        }
        @media (min-width: 769px) {
          .dash-topbar { display: none !important; }
        }
        .dash-back-link:hover { color: #c98a3a !important; }
      `}</style>

      {/* Desktop sidebar */}
      <div className="dash-sidebar" style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 240,
        backgroundColor: '#0d0d0d', borderRight: '1px solid #2a2a2a',
        padding: '2rem 1.5rem', zIndex: 40,
      }}>
        {sidebarNav}
      </div>

      {/* Mobile top bar */}
      <div className="dash-topbar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, height: 56,
        backgroundColor: '#0d0d0d', borderBottom: '1px solid #2a2a2a',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', zIndex: 40,
      }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', margin: 0 }}>
          DRIVKIND<span style={{ color: '#c98a3a' }}>.</span>
        </p>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: '#f0f0f0', fontSize: '1.25rem', cursor: 'pointer', padding: '0.25rem' }}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 56, left: 0, bottom: 0, right: 0,
          backgroundColor: '#0d0d0d', zIndex: 39,
          padding: '1.5rem', borderTop: '1px solid #2a2a2a',
        }}>
          {sidebarNav}
        </div>
      )}

      {/* Main content */}
      <div className="dash-main" style={{
        marginLeft: 240, padding: '2.5rem',
        minHeight: '100vh', backgroundColor: '#0d0d0d',
      }}>
        {children}
      </div>
    </>
  )
}
