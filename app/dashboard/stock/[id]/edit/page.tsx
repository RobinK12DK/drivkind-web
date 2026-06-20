'use client'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'

export default function EditVehiclePage() {
  return (
    <DashboardLayout>
      <div style={{ maxWidth: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em' }}>
            Edit vehicle
          </h1>
          <Link href="/dashboard/stock" style={{ fontSize: '0.82rem', color: '#555', textDecoration: 'none' }}>
            ← Back to stock
          </Link>
        </div>
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #c98a3a', borderRadius: 12, padding: '2rem' }}>
          <p style={{ fontSize: '0.68rem', color: '#c98a3a', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
            Coming soon
          </p>
          <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.7 }}>
            Vehicle editing is coming soon. To update a listing, delete it and re-add it, or contact{' '}
            <a href="mailto:robin@drivkind.co.za" style={{ color: '#c98a3a', textDecoration: 'none' }}>robin@drivkind.co.za</a>.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
