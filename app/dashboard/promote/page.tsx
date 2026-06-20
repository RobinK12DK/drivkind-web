'use client'
import DashboardLayout from '@/components/DashboardLayout'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

export default function PromotePage() {
  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Promote listings
        </h1>
        <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 560 }}>
          Choose which vehicles from your stock get promoted into the DRIVKIND. marketplace — what buyers actually browse. Your tier determines how many promotion slots you have.
        </p>

        <div style={{
          backgroundColor: '#1a1a1a', border: `1px solid ${copper}`,
          borderRadius: 12, padding: '2rem',
        }}>
          <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
            Coming soon
          </p>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7 }}>
            This feature is launching soon. In the meantime, contact{' '}
            <a href="mailto:robin@drivkind.co.za" style={{ color: copper, textDecoration: 'none', fontWeight: 600 }}>
              robin@drivkind.co.za
            </a>{' '}
            to manually promote your listings.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
