'use client'
import DashboardLayout from '@/components/DashboardLayout'

const copper = '#c98a3a'
const muted = '#555555'

export default function EnquiriesPage() {
  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Enquiries
        </h1>
        <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 560 }}>
          Messages from people interested in your stock.
        </p>

        <div style={{
          backgroundColor: '#1a1a1a', border: `1px solid ${copper}`,
          borderRadius: 12, padding: '2rem',
        }}>
          <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
            Coming soon
          </p>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7 }}>
            Enquiry notifications are coming soon. In the meantime, buyers can reach you directly using the contact details on your profile.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
