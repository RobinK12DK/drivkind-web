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
  variant: string | null
  year: number
  price: number
  colour: string | null
  status: string
  images: string[] | null
}

const statusStyle = (status: string): React.CSSProperties => {
  switch (status) {
    case 'active':   return { backgroundColor: '#042C53', color: '#85B7EB' }
    case 'promoted': return { backgroundColor: '#412402', color: '#FAC775' }
    case 'sold':     return { backgroundColor: '#173404', color: '#C0DD97' }
    case 'archived': return { backgroundColor: '#1a1a1a', color: '#444' }
    default:         return { backgroundColor: '#2a2a2a', color: '#888' }
  }
}

export default function StockPage() {
  const [listings, setListings] = useState<DealerListing[]>([])
  const [dealerProfileId, setDealerProfileId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data: profile } = await supabase
        .from('dealer_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (!profile) { setLoading(false); return }
      setDealerProfileId(profile.id)

      const { data } = await supabase
        .from('dealer_listings')
        .select('id, make, model, variant, year, price, colour, status, images')
        .eq('dealer_id', profile.id)
        .order('created_at', { ascending: false })

      if (data) setListings(data as DealerListing[])
      setLoading(false)
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const { error } = await supabase.from('dealer_listings').delete().eq('id', id)
    if (!error) setListings(prev => prev.filter(l => l.id !== id))
    setDeletingId(null)
    setConfirmDelete(null)
  }

  return (
    <DashboardLayout>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em' }}>
            My Stock
          </h1>
          <Link href="/dashboard/stock/new" style={{
            backgroundColor: copper, color: '#0d0d0d', padding: '10px 22px', borderRadius: 999,
            textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            + Add vehicle
          </Link>
        </div>

        {loading ? (
          <p style={{ color: muted, fontSize: '0.875rem' }}>Loading…</p>
        ) : listings.length === 0 ? (
          <div style={{ backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12, padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', color: muted, marginBottom: '1.25rem' }}>No vehicles yet.</p>
            <Link href="/dashboard/stock/new" style={{
              backgroundColor: copper, color: '#0d0d0d', padding: '12px 28px', borderRadius: 999,
              textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Add your first vehicle
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {listings.map(listing => (
              <div key={listing.id} style={{
                backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12,
                padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              }}>
                {/* Thumbnail */}
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={listing.images[0]}
                    alt={`${listing.make} ${listing.model}`}
                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                  />
                ) : (
                  <div style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: '#2a2a2a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.25rem', opacity: 0.3 }}>◈</span>
                  </div>
                )}

                {/* Details */}
                <div style={{ flex: 1, minWidth: 160 }}>
                  <p style={{ fontSize: '0.925rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.15rem' }}>
                    {listing.make} {listing.model} {listing.year}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: copper, fontWeight: 600, marginBottom: '0.15rem' }}>
                    R {listing.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: muted }}>
                    {[listing.variant, listing.colour].filter(Boolean).join(' · ')}
                  </p>
                </div>

                {/* Status + actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0, flexWrap: 'wrap' }}>
                  <span style={{
                    ...statusStyle(listing.status),
                    padding: '4px 12px', borderRadius: 999,
                    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {listing.status}
                  </span>
                  <Link href={`/dashboard/stock/${listing.id}/edit`} style={{
                    border: `1px solid ${border}`, color: '#f0f0f0', padding: '6px 14px', borderRadius: 8,
                    textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600,
                  }}>
                    Edit
                  </Link>
                  {confirmDelete === listing.id ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: muted }}>Delete?</span>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        disabled={deletingId === listing.id}
                        style={{ border: '1px solid #ef4444', color: '#ef4444', backgroundColor: 'transparent', padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        {deletingId === listing.id ? '…' : 'Yes'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        style={{ border: `1px solid ${border}`, color: muted, backgroundColor: 'transparent', padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(listing.id)}
                      style={{ border: '1px solid #3a1a1a', color: '#ef4444', backgroundColor: 'transparent', padding: '6px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
