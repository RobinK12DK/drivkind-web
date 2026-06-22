'use client'
import DashboardLayout from '@/components/DashboardLayout'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

interface DealerProfile {
  tier: string | null
  subscription_status: string | null
}

export default function BillingPage() {
  const [profile, setProfile] = useState<DealerProfile | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      const { data } = await supabase
        .from('dealer_profiles')
        .select('tier, subscription_status')
        .eq('user_id', session.user.id)
        .single()
      if (data) setProfile(data as DealerProfile)
    })
  }, [])

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Billing
        </h1>
        <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 560 }}>
          Your current plan and billing details.
        </p>

        {/* Current plan */}
        <div style={{
          backgroundColor: '#1a1a1a', border: `1px solid ${border}`,
          borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem',
        }}>
          <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
            Current plan
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Plan</p>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#f0f0f0' }}>
                {profile?.tier ?? '—'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Status</p>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#f0f0f0' }}>
                {profile?.subscription_status ?? '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact card */}
        <div style={{
          backgroundColor: '#1a1a1a', border: `1px solid ${copper}`,
          borderRadius: 12, padding: '1.5rem',
        }}>
          <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
            Upgrade or manage billing
          </p>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7 }}>
            Reach out to{' '}
            <a href="mailto:robin@drivkind.co.za" style={{ color: copper, textDecoration: 'none', fontWeight: 600 }}>
              robin@drivkind.co.za
            </a>
            {' '}and we&apos;ll sort it out.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
