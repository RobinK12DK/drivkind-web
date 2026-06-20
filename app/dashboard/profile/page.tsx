'use client'
import DashboardLayout from '@/components/DashboardLayout'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

const SA_PROVINCES = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape',
]

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%', backgroundColor: '#111111',
  border: `1px solid ${border}`, color: '#f0f0f0', padding: '12px 16px',
  borderRadius: 8, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.72rem', color: muted,
  letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [profileId, setProfileId] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState<'dealer' | 'automotive_business' | ''>('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase
        .from('dealer_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single()
      if (data) {
        setProfileId(data.id)
        setBusinessName(data.business_name ?? '')
        setBusinessType(data.business_type ?? '')
        setDescription(data.description ?? '')
        setWebsite(data.website ?? '')
        setContactName(data.contact_name ?? '')
        setContactEmail(data.contact_email ?? '')
        setContactPhone(data.contact_phone ?? '')
        setAddress(data.address ?? '')
        setCity(data.city ?? '')
        setProvince(data.province ?? '')
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setSaving(false); return }

    const payload = {
      user_id: session.user.id,
      business_name: businessName,
      business_type: businessType,
      description,
      website,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      address,
      city,
      province,
    }

    const { error: upsertError } = profileId
      ? await supabase.from('dealer_profiles').update(payload).eq('id', profileId)
      : await supabase.from('dealer_profiles').insert(payload)

    if (upsertError) {
      setError(upsertError.message)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <p style={{ color: muted, fontSize: '0.875rem' }}>Loading…</p>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 700 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          My Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <Section title="Business details">
            <div>
              <label style={labelStyle}>Business name</label>
              <input type="text" required value={businessName} onChange={e => setBusinessName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Business type</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {([['dealer', 'Dealer'], ['automotive_business', 'Automotive Business']] as const).map(([val, lbl]) => (
                  <button key={val} type="button" onClick={() => setBusinessType(val)} style={{
                    flex: 1, padding: '11px 16px', borderRadius: 999, fontSize: '0.82rem',
                    fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none',
                    backgroundColor: businessType === val ? copper : '#1a1a1a',
                    color: businessType === val ? '#0d0d0d' : muted,
                    outline: businessType !== val ? `1px solid ${border}` : 'none',
                  }}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description <span style={{ color: muted, fontWeight: 400 }}>({description.length}/500)</span></label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value.slice(0, 500))}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
              />
            </div>
            <div>
              <label style={labelStyle}>Website</label>
              <input type="url" value={website} onChange={e => setWebsite(e.target.value)} style={inputStyle} placeholder="https://" />
            </div>
          </Section>

          <Section title="Contact details">
            <div>
              <label style={labelStyle}>Contact name</label>
              <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Contact email</label>
              <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Contact phone</label>
              <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} style={inputStyle} />
            </div>
          </Section>

          <Section title="Location">
            <div>
              <label style={labelStyle}>Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input type="text" value={city} onChange={e => setCity(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Province</label>
              <select value={province} onChange={e => setProvince(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select province…</option>
                {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </Section>

          {error && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ fontSize: '0.82rem', color: '#22c55e', marginBottom: '1rem' }}>Profile saved.</p>}

          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%', backgroundColor: copper, color: '#0d0d0d',
              border: 'none', padding: '14px', borderRadius: 999,
              fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.07em',
              textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      </div>

      <style>{`
        input:focus, select:focus, textarea:focus { border-color: #c98a3a !important; outline: none !important; }
        select option { background: #111111; color: #f0f0f0; }
      `}</style>
    </DashboardLayout>
  )
}
