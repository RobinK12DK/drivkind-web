'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const copper = '#c98a3a'
  const border = '#2a2a2a'
  const muted = '#555555'

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%',
    backgroundColor: '#0d0d0d', border: `1px solid ${border}`,
    color: '#f0f0f0', padding: '13px 16px', borderRadius: 10,
    fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', color: muted,
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem',
  }

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 10) { setError('Password must be at least 10 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setStep(2)
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!businessType) { setError('Please select a business type.'); return }
    if (!businessName) { setError('Please enter your business name.'); return }
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setError('Session expired. Please go back and sign up again.'); setLoading(false); return }
    const { error } = await supabase.from('dealer_profiles').insert({
      user_id: session.user.id,
      business_type: businessType,
      business_name: businessName,
      contact_name: name,
      contact_email: email,
      contact_phone: phone,
      city,
      province,
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push('/dashboard?welcome=true')
  }

  const provinces = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem' }}>
      <div style={{ backgroundColor: '#111111', border: `1px solid ${border}`, borderRadius: 16, padding: '3rem', width: '100%', maxWidth: 480, marginTop: '5vh' }}>
        <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          DRIVKIND<span style={{ color: copper }}>.</span>
        </p>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f0f0f0', textAlign: 'center', marginBottom: '0.5rem' }}>Create your account</h1>
        <p style={{ fontSize: '0.85rem', color: muted, textAlign: 'center', marginBottom: '2rem' }}>Join as a dealer or automotive business.</p>
        <p style={{ fontSize: '0.75rem', color: copper, textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 600 }}>
          Step {step} of 2 — {step === 1 ? 'Account details' : 'Your business'}
        </p>

        {step === 1 && (
          <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div><label style={labelStyle}>Full name</label><input style={inputStyle} type="text" required value={name} onChange={e => setName(e.target.value)} /></div>
            <div><label style={labelStyle}>Email</label><input style={inputStyle} type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><label style={labelStyle}>Password (min 10 characters)</label><input style={inputStyle} type="password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
            <div><label style={labelStyle}>Confirm password</label><input style={inputStyle} type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div>
            {error && <p style={{ color: '#ef4444', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: copper, color: '#0d0d0d', border: 'none', padding: '14px', borderRadius: 999, fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.07em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating account...' : 'Continue →'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Business type</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['dealer', 'business'].map(type => (
                  <button key={type} type="button" onClick={() => setBusinessType(type)} style={{ flex: 1, padding: '12px', borderRadius: 999, border: `1px solid ${businessType === type ? copper : border}`, backgroundColor: businessType === type ? copper : 'transparent', color: businessType === type ? '#0d0d0d' : '#888', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'inherit' }}>
                    {type === 'dealer' ? 'Dealer' : 'Automotive Business'}
                  </button>
                ))}
              </div>
            </div>
            <div><label style={labelStyle}>Business / dealership name</label><input style={inputStyle} type="text" required value={businessName} onChange={e => setBusinessName(e.target.value)} /></div>
            <div><label style={labelStyle}>Contact phone</label><input style={inputStyle} type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div><label style={labelStyle}>City</label><input style={inputStyle} type="text" value={city} onChange={e => setCity(e.target.value)} /></div>
            <div>
              <label style={labelStyle}>Province</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={province} onChange={e => setProvince(e.target.value)}>
                <option value="">Select province...</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: copper, color: '#0d0d0d', border: 'none', padding: '14px', borderRadius: 999, fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.07em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Setting up...' : 'Complete setup →'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: muted, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit' }}>← Back</button>
          </form>
        )}

        <p style={{ fontSize: '0.82rem', color: muted, textAlign: 'center', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: copper, textDecoration: 'none', fontWeight: 600 }}>Sign in →</Link>
        </p>
      </div>
      <style>{`input:focus, select:focus { border-color: #c98a3a !important; outline: none !important; }`}</style>
    </div>
  )
}
