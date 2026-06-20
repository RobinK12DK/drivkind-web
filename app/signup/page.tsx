'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import Turnstile, { TurnstileRef } from '@/components/Turnstile'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

const SA_PROVINCES = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape',
]

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

function FieldError({ msg }: { msg: string }) {
  return msg ? <p style={{ fontSize: '0.78rem', color: '#ef4444', marginTop: '0.25rem' }}>{msg}</p> : null
}

export default function SignupPage() {
  const router = useRouter()

  // Step tracking
  const [step, setStep] = useState(1)
  const [signedUpUser, setSignedUpUser] = useState<User | null>(null)

  // Step 1 fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({})
  const [step1Loading, setStep1Loading] = useState(false)
  const [step1Error, setStep1Error] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const turnstileRef = useRef<TurnstileRef>(null)

  // Step 2 fields
  const [businessType, setBusinessType] = useState<'dealer' | 'automotive_business' | ''>('')
  const [businessName, setBusinessName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({})
  const [step2Loading, setStep2Loading] = useState(false)
  const [step2Error, setStep2Error] = useState('')

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Full name is required.'
    if (!email.trim()) errs.email = 'Email is required.'
    if (password.length < 10) errs.password = 'Password must be at least 10 characters.'
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match.'
    setStep1Errors(errs)
    return Object.keys(errs).length === 0
  }

  const handleStep1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateStep1()) return

    setStep1Loading(true)
    setStep1Error('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { captchaToken, data: { full_name: name } },
    })

    if (error) {
      setStep1Error(error.message)
      turnstileRef.current?.reset()
      setCaptchaToken('')
      setStep1Loading(false)
      return
    }

    setSignedUpUser(data.user)
    setStep1Loading(false)
    setStep(2)
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (!businessType) errs.businessType = 'Please select a business type.'
    if (!businessName.trim()) errs.businessName = 'Business name is required.'
    setStep2Errors(errs)
    return Object.keys(errs).length === 0
  }

  const handleStep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateStep2()) return

    const userId = signedUpUser?.id
    if (!userId) {
      setStep2Error('Session error. Please try signing in.')
      return
    }

    setStep2Loading(true)
    setStep2Error('')

    const { error } = await supabase.from('dealer_profiles').insert({
      user_id: userId,
      business_type: businessType,
      business_name: businessName,
      contact_name: name,
      contact_email: email,
      contact_phone: contactPhone,
      city,
      province,
    })

    if (error) {
      setStep2Error(error.message)
      setStep2Loading(false)
      return
    }

    router.push('/dashboard?welcome=true')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1rem' }}>
      <div style={{
        backgroundColor: '#111111', border: `1px solid ${border}`,
        borderRadius: 16, padding: '3rem', width: '100%',
        maxWidth: 480, marginTop: '10vh', marginBottom: '4rem',
      }}>
        <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          DRIVKIND<span style={{ color: copper }}>.</span>
        </p>

        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f0f0f0', textAlign: 'center', marginBottom: '0.35rem' }}>
          Create your account
        </h1>
        <p style={{ fontSize: '0.85rem', color: muted, textAlign: 'center', marginBottom: '1.75rem' }}>
          Join as a dealer or automotive business.
        </p>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
              Step 1 of 2 — Account details
            </p>

            <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                <FieldError msg={step1Errors.name ?? ''} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                <FieldError msg={step1Errors.email ?? ''} />
              </div>
              <div>
                <label style={labelStyle}>Password (min 10 characters)</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                <FieldError msg={step1Errors.password ?? ''} />
              </div>
              <div>
                <label style={labelStyle}>Confirm password</label>
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} />
                <FieldError msg={step1Errors.confirmPassword ?? ''} />
              </div>

              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onVerify={(token) => setCaptchaToken(token)}
              />
              {!captchaToken && (
                <p style={{ fontSize: '0.75rem', color: muted, textAlign: 'center', marginTop: '-0.5rem' }}>
                  Security verification required above
                </p>
              )}

              {step1Error && (
                <p style={{ fontSize: '0.82rem', color: '#ef4444', textAlign: 'center' }}>{step1Error}</p>
              )}

              <button
                type="submit"
                disabled={step1Loading || !captchaToken}
                style={{
                  width: '100%', backgroundColor: copper, color: '#0d0d0d',
                  border: 'none', padding: '14px', borderRadius: 999,
                  fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.07em',
                  textTransform: 'uppercase', cursor: (step1Loading || !captchaToken) ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', marginTop: '0.5rem', opacity: (step1Loading || !captchaToken) ? 0.7 : 1,
                }}
              >
                {step1Loading ? 'Creating account...' : 'Continue →'}
              </button>
            </form>

            <p style={{ fontSize: '0.82rem', color: muted, textAlign: 'center', marginTop: '1.5rem' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: copper, textDecoration: 'none', fontWeight: 600 }}>Sign in →</Link>
            </p>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
              Step 2 of 2 — Your business
            </p>

            <form onSubmit={handleStep2Submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Business type</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {([['dealer', 'Dealer'], ['automotive_business', 'Automotive Business']] as const).map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBusinessType(val)}
                      style={{
                        flex: 1, padding: '12px 16px', borderRadius: 999,
                        fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'inherit', border: 'none',
                        backgroundColor: businessType === val ? copper : '#1a1a1a',
                        color: businessType === val ? '#0d0d0d' : muted,
                        outline: businessType !== val ? `1px solid ${border}` : 'none',
                      }}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
                <FieldError msg={step2Errors.businessType ?? ''} />
              </div>

              <div>
                <label style={labelStyle}>Business / dealership name</label>
                <input type="text" required value={businessName} onChange={e => setBusinessName(e.target.value)} style={inputStyle} />
                <FieldError msg={step2Errors.businessName ?? ''} />
              </div>

              <div>
                <label style={labelStyle}>Contact phone</label>
                <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} style={inputStyle} />
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

              {step2Error && (
                <p style={{ fontSize: '0.82rem', color: '#ef4444', textAlign: 'center' }}>{step2Error}</p>
              )}

              <button
                type="submit"
                disabled={step2Loading}
                style={{
                  width: '100%', backgroundColor: copper, color: '#0d0d0d',
                  border: 'none', padding: '14px', borderRadius: 999,
                  fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.07em',
                  textTransform: 'uppercase', cursor: step2Loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', opacity: step2Loading ? 0.7 : 1,
                }}
              >
                {step2Loading ? 'Setting up...' : 'Create my account →'}
              </button>
            </form>

            <button
              onClick={() => setStep(1)}
              style={{ background: 'none', border: 'none', color: muted, fontSize: '0.82rem', cursor: 'pointer', marginTop: '1.25rem', display: 'block', width: '100%', textAlign: 'center', fontFamily: 'inherit' }}
            >
              ← Back
            </button>
          </>
        )}
      </div>

      <style>{`
        input:focus, select:focus { border-color: #c98a3a !important; outline: none !important; }
        select option { background: #111111; color: #f0f0f0; }
      `}</style>
    </div>
  )
}
