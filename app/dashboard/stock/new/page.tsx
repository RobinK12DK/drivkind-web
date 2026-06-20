'use client'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
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

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
        {title}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {children}
      </div>
    </div>
  )
}

function FullWidth({ children }: { children: React.ReactNode }) {
  return <div style={{ gridColumn: '1 / -1' }}>{children}</div>
}

export default function NewVehiclePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Listing limit check
  const [listingCount, setListingCount] = useState<number | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    async function checkLimit() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setProfileLoading(false); return }
      const { data: profile } = await supabase
        .from('dealer_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()
      if (!profile) { setProfileLoading(false); return }
      const { count } = await supabase
        .from('dealer_listings')
        .select('id', { count: 'exact', head: true })
        .eq('dealer_id', profile.id)
      setListingCount(count ?? 0)
      setProfileLoading(false)
    }
    checkLimit()
  }, [])

  // Vehicle details
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [variant, setVariant] = useState('')
  const [year, setYear] = useState('')
  const [colour, setColour] = useState('')
  const [transmission, setTransmission] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [mileage, setMileage] = useState('')
  const [vin, setVin] = useState('')
  const [registration, setRegistration] = useState('')

  // Pricing
  const [price, setPrice] = useState('')

  // Listing details
  const [title, setTitle] = useState('')
  const [titleManuallyEdited, setTitleManuallyEdited] = useState(false)
  const [description, setDescription] = useState('')

  // Photos
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Status
  const [status, setStatus] = useState<'draft' | 'active'>('draft')

  // Submit state
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Auto-generate title
  useEffect(() => {
    if (!titleManuallyEdited) {
      const parts = [year, make, model].filter(s => s.trim())
      if (parts.length > 0) setTitle(parts.join(' '))
    }
  }, [year, make, model, titleManuallyEdited])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? [])
    const combined = [...selectedFiles, ...incoming].slice(0, 10)
    setSelectedFiles(combined)
    setPreviewUrls(combined.map(f => URL.createObjectURL(f)))
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviewUrls(newFiles.map(f => URL.createObjectURL(f)))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!make.trim() || !model.trim() || !year || !price || !title.trim()) {
      setError('Please fill in all required fields (Make, Model, Year, Price, Title).')
      return
    }

    setSubmitting(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setError('Session expired.'); setSubmitting(false); return }

    // Get dealer profile id
    const { data: profile } = await supabase
      .from('dealer_profiles')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    if (!profile) { setError('Dealer profile not found.'); setSubmitting(false); return }

    // Insert listing first
    const { data: listing, error: insertError } = await supabase
      .from('dealer_listings')
      .insert({
        dealer_id: profile.id,
        make: make.trim(),
        model: model.trim(),
        variant: variant.trim() || null,
        year: parseInt(year),
        colour: colour.trim() || null,
        transmission: transmission || null,
        fuel_type: fuelType || null,
        body_type: bodyType || null,
        mileage: mileage ? parseInt(mileage) : null,
        vin: vin.trim() || null,
        registration_number: registration.trim() || null,
        price: parseInt(price),
        title: title.trim(),
        description: description.trim() || null,
        status,
        is_promoted: false,
        images: [],
      })
      .select('id')
      .single()

    if (insertError || !listing) {
      setError(insertError?.message ?? 'Failed to create listing.')
      setSubmitting(false)
      return
    }

    // Upload images if any
    if (selectedFiles.length > 0) {
      const uploadedUrls: string[] = []
      for (const file of selectedFiles) {
        const path = `dealer-stock/${profile.id}/${listing.id}/${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(path, file, { upsert: true })
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
          uploadedUrls.push(urlData.publicUrl)
        }
      }
      if (uploadedUrls.length > 0) {
        await supabase.from('dealer_listings').update({ images: uploadedUrls }).eq('id', listing.id)
      }
    }

    router.push('/dashboard/stock')
  }

  if (profileLoading) {
    return (
      <DashboardLayout>
        <p style={{ color: muted, fontSize: '0.875rem' }}>Loading…</p>
      </DashboardLayout>
    )
  }

  if (listingCount !== null && listingCount >= 1) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 640 }}>
          <div style={{
            backgroundColor: '#1a1a1a', border: `1px solid ${copper}`,
            borderRadius: 16, padding: '2.5rem',
          }}>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Ready to reach more buyers?
            </h1>
            <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.75, marginBottom: '2rem' }}>
              You&apos;ve used your free listing. Upgrade to Forecourt (R599/month) to add up to 20 vehicles and get promoted in the DRIVKIND. marketplace.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <Link href="/dashboard/billing" style={{
                backgroundColor: copper, color: '#0d0d0d', padding: '12px 22px', borderRadius: 999,
                textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Upgrade to Forecourt — R599/month
              </Link>
              <Link href="/dashboard/stock" style={{
                border: `1px solid ${border}`, color: '#f0f0f0', padding: '12px 22px', borderRadius: 999,
                textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem',
                letterSpacing: '0.06em', textTransform: 'uppercase', backgroundColor: 'transparent',
              }}>
                Back to my stock
              </Link>
            </div>
            <p style={{ fontSize: '0.78rem', color: muted }}>
              Already subscribed?{' '}
              <a href="mailto:robin@drivkind.co.za" style={{ color: copper, textDecoration: 'none' }}>
                Contact robin@drivkind.co.za
              </a>{' '}
              to activate your account.
            </p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em' }}>
            Add vehicle
          </h1>
          <Link href="/dashboard/stock" style={{ fontSize: '0.82rem', color: muted, textDecoration: 'none' }}>
            ← Back to stock
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Vehicle details */}
          <FormSection title="Vehicle details">
            <div>
              <label style={labelStyle}>Make <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="text" required value={make} onChange={e => setMake(e.target.value)} style={inputStyle} placeholder="e.g. BMW" />
            </div>
            <div>
              <label style={labelStyle}>Model <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="text" required value={model} onChange={e => setModel(e.target.value)} style={inputStyle} placeholder="e.g. M3" />
            </div>
            <div>
              <label style={labelStyle}>Variant</label>
              <input type="text" value={variant} onChange={e => setVariant(e.target.value)} style={inputStyle} placeholder="e.g. Competition" />
            </div>
            <div>
              <label style={labelStyle}>Year <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="number" required min={1900} max={2030} value={year} onChange={e => setYear(e.target.value)} style={inputStyle} placeholder="2024" />
            </div>
            <div>
              <label style={labelStyle}>Colour</label>
              <input type="text" value={colour} onChange={e => setColour(e.target.value)} style={inputStyle} placeholder="e.g. Tanzanite Blue" />
            </div>
            <div>
              <label style={labelStyle}>Transmission</label>
              <select value={transmission} onChange={e => setTransmission(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select…</option>
                {['Manual', 'Automatic', 'Semi-automatic'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fuel type</label>
              <select value={fuelType} onChange={e => setFuelType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select…</option>
                {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Body type</label>
              <select value={bodyType} onChange={e => setBodyType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select…</option>
                {['Sedan', 'Hatchback', 'SUV', 'Bakkie', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Mileage (km)</label>
              <input type="number" min={0} value={mileage} onChange={e => setMileage(e.target.value)} style={inputStyle} placeholder="e.g. 45000" />
            </div>
            <div>
              <label style={labelStyle}>VIN</label>
              <input type="text" value={vin} onChange={e => setVin(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Registration number</label>
              <input type="text" value={registration} onChange={e => setRegistration(e.target.value)} style={inputStyle} />
            </div>
          </FormSection>

          {/* Pricing */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
              Pricing
            </p>
            <div style={{ maxWidth: 240 }}>
              <label style={labelStyle}>Price <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: muted, fontSize: '0.9rem', pointerEvents: 'none' }}>R</span>
                <input
                  type="number" required min={5000}
                  value={price} onChange={e => setPrice(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 30 }}
                  placeholder="5000"
                />
              </div>
            </div>
          </div>

          {/* Listing details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
              Listing details
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Title <span style={{ color: '#ef4444' }}>*</span></label>
                <input
                  type="text" required value={title}
                  onChange={e => { setTitle(e.target.value); setTitleManuallyEdited(true) }}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Description <span style={{ color: muted, fontWeight: 400 }}>({description.length}/5000)</span></label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value.slice(0, 5000))}
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
              Photos <span style={{ color: muted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>({selectedFiles.length}/10)</span>
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <div
              onClick={() => selectedFiles.length < 10 && fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${border}`, borderRadius: 12, padding: '2rem',
                textAlign: 'center', cursor: selectedFiles.length < 10 ? 'pointer' : 'default',
                marginBottom: previewUrls.length > 0 ? '1rem' : 0,
                opacity: selectedFiles.length >= 10 ? 0.5 : 1,
              }}
            >
              <p style={{ fontSize: '0.875rem', color: muted }}>
                {selectedFiles.length >= 10 ? 'Maximum 10 photos reached' : 'Click to upload photos'}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#3a3a3a', marginTop: '0.25rem' }}>PNG, JPG, WEBP · Max 20MB each</p>
            </div>

            {previewUrls.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {previewUrls.map((url, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={url} alt={`Preview ${i + 1}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, display: 'block' }} />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      style={{
                        position: 'absolute', top: -6, right: -6, width: 20, height: 20,
                        borderRadius: '50%', backgroundColor: '#ef4444', border: 'none',
                        color: '#fff', fontSize: '0.7rem', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
              Status
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {([['draft', 'Save as draft', 'Visible only to you. Not live in the marketplace.'], ['active', 'Make active', 'Live and visible to buyers.']] as const).map(([val, lbl, hint]) => (
                <label key={val} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="radio" name="status" value={val}
                    checked={status === val} onChange={() => setStatus(val)}
                    style={{ accentColor: copper, marginTop: 2 }}
                  />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f0f0f0' }}>{lbl}</p>
                    <p style={{ fontSize: '0.78rem', color: muted }}>{hint}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: copper, color: '#0d0d0d', border: 'none',
              padding: '14px 40px', borderRadius: 999, fontWeight: 700,
              fontSize: '0.875rem', letterSpacing: '0.07em', textTransform: 'uppercase',
              cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Saving…' : 'Save listing'}
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
