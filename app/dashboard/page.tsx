'use client'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'
const card = '#1a1a1a'

interface DealerListing {
  id: string
  make: string
  model: string
  year: number
  price: number
  status: string
  is_promoted: boolean
}

interface Stats {
  stock: number
  promoted: number
  enquiries: number
  unread: number
}

export default function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [dealerProfileId, setDealerProfileId] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats>({ stock: 0, promoted: 0, enquiries: 0, unread: 0 })
  const [recentStock, setRecentStock] = useState<DealerListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('welcome') === 'true') setShowWelcome(true)
  }, [])

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Fetch dealer profile
      const { data: profile } = await supabase
        .from('dealer_profiles')
        .select('id, onboarding_completed')
        .eq('user_id', session.user.id)
        .single()

      if (profile) {
        setDealerProfileId(profile.id)
        if (!profile.onboarding_completed) setShowWelcome(true)

        // Fetch stats in parallel
        const [stockRes, promotedRes, enquiriesRes, unreadRes] = await Promise.all([
          supabase.from('dealer_listings').select('id', { count: 'exact', head: true }).eq('dealer_id', profile.id),
          supabase.from('dealer_listings').select('id', { count: 'exact', head: true }).eq('dealer_id', profile.id).eq('is_promoted', true),
          supabase.from('dealer_enquiries').select('id', { count: 'exact', head: true }).eq('dealer_id', profile.id),
          supabase.from('dealer_enquiries').select('id', { count: 'exact', head: true }).eq('dealer_id', profile.id).eq('is_read', false),
        ])

        setStats({
          stock: stockRes.count ?? 0,
          promoted: promotedRes.count ?? 0,
          enquiries: enquiriesRes.count ?? 0,
          unread: unreadRes.count ?? 0,
        })

        // Fetch recent stock
        const { data: listings } = await supabase
          .from('dealer_listings')
          .select('id, make, model, year, price, status, is_promoted')
          .eq('dealer_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(3)

        if (listings) setRecentStock(listings as DealerListing[])
      }

      setLoading(false)
    }
    load()
  }, [])

  const dismissWelcome = async () => {
    if (!dealerProfileId) return
    await supabase.from('dealer_profiles').update({ onboarding_completed: true }).eq('id', dealerProfileId)
    setShowWelcome(false)
    // Clear URL param
    window.history.replaceState({}, '', '/dashboard')
  }

  const statCards = [
    { label: 'Stock', value: stats.stock },
    { label: 'Promoted', value: stats.promoted },
    { label: 'Enquiries', value: stats.enquiries },
    { label: 'Unread', value: stats.unread },
  ]

  const statusColor = (status: string): React.CSSProperties => {
    switch (status) {
      case 'active': return { backgroundColor: '#042C53', color: '#85B7EB' }
      case 'promoted': return { backgroundColor: '#412402', color: '#FAC775' }
      case 'sold': return { backgroundColor: '#173404', color: '#C0DD97' }
      case 'archived': return { backgroundColor: '#1a1a1a', color: '#444' }
      default: return { backgroundColor: '#2a2a2a', color: '#888' }
    }
  }

  return (
    <DashboardLayout>
      {/* Welcome banner */}
      {showWelcome && (
        <div style={{
          backgroundColor: card, border: `1px solid ${copper}`,
          borderRadius: 12, padding: '1.5rem', marginBottom: '2rem',
          position: 'relative',
        }}>
          <button
            onClick={dismissWelcome}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: muted, fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1 }}
          >
            ✕
          </button>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.5rem' }}>
            Welcome to DRIVKIND. 👋
          </h2>
          <p style={{ fontSize: '0.875rem', color: muted, lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: 480 }}>
            Start by completing your profile. Once that&apos;s done, add your stock and choose which vehicles go live in the marketplace.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard/profile" style={{
              backgroundColor: copper, color: '#0d0d0d', padding: '10px 20px', borderRadius: 999,
              textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              Complete my profile
            </Link>
            <Link href="/dashboard/stock/new" style={{
              border: `1px solid ${copper}`, color: copper, padding: '10px 20px', borderRadius: 999,
              textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              backgroundColor: 'transparent',
            }}>
              Upload first vehicle
            </Link>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map(({ label, value }) => (
          <div key={label} style={{ backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12, padding: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{label}</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.02em' }}>{loading ? '—' : value}</p>
          </div>
        ))}
      </div>

      {/* Recent stock */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0f0' }}>Recent stock</h2>
          <Link href="/dashboard/stock" style={{ fontSize: '0.8rem', color: copper, textDecoration: 'none', fontWeight: 600 }}>View all</Link>
        </div>

        {!loading && recentStock.length === 0 ? (
          <div style={{ backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12, padding: '2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: muted, marginBottom: '1.25rem' }}>No stock yet. Add your first vehicle.</p>
            <Link href="/dashboard/stock/new" style={{
              backgroundColor: copper, color: '#0d0d0d', padding: '10px 24px', borderRadius: 999,
              textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              Add vehicle
            </Link>
          </div>
        ) : (
          <div style={{ backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${border}` }}>
                  {['Make', 'Model', 'Year', 'Price', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.68rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentStock.map((l, i) => (
                  <tr key={l.id} style={{ borderBottom: i < recentStock.length - 1 ? `1px solid ${border}` : 'none' }}>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', color: '#f0f0f0', fontWeight: 600 }}>{l.make}</td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', color: '#f0f0f0' }}>{l.model}</td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', color: muted }}>{l.year}</td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', color: copper, fontWeight: 600 }}>R {l.price.toLocaleString()}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{ ...statusColor(l.status), padding: '3px 10px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '1rem' }}>Get started</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Add vehicle', href: '/dashboard/stock/new', badge: null },
            { label: 'Complete profile', href: '/dashboard/profile', badge: null },
            { label: 'Choose promoted listings', href: '/dashboard/promote', badge: 'Coming soon' },
          ].map(({ label, href, badge }) => (
            <Link key={href} href={href} style={{
              backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12,
              padding: '1.25rem', textDecoration: 'none', display: 'block',
            }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f0f0f0', marginBottom: badge ? '0.5rem' : 0 }}>{label}</p>
              {badge && (
                <span style={{ fontSize: '0.65rem', backgroundColor: '#2a2a2a', color: muted, padding: '2px 8px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </DashboardLayout>
  )
}
