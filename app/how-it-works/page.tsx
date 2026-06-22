'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'

const copper = '#c98a3a'
const muted = '#555555'
const border = '#2a2a2a'

const dealerSteps = [
  {
    num: '01',
    title: 'Create your dealership profile',
    body: 'Add your logo, dealership name, location, contact details, and opening hours. This becomes your public profile page inside the DRIVKIND. app.',
  },
  {
    num: '02',
    title: 'Upload your stock',
    body: 'Add your vehicles one by one or bulk upload via CSV. Each listing includes photos, spec, price, and description. This is your stock warehouse — not all of it shows in the app yet.',
  },
  {
    num: '03',
    title: 'Choose your promoted listings',
    body: 'Choose which vehicles go live in the marketplace. That\'s what the community browses. Your plan determines how many slots you have.',
  },
  {
    num: '04',
    title: 'Post culture content',
    body: 'Share your latest stock, projects, and updates. No pricing in posts, no listing links. Just the kind of content the community actually wants to see.',
  },
]

const businessSteps = [
  {
    num: '01',
    title: 'Create your business profile',
    body: 'Add your logo, business name, category (workshop, detailer, parts supplier, etc.), location, contact details, and opening hours.',
  },
  {
    num: '02',
    title: 'Describe your services',
    body: 'Tell the community what you offer. No stock to upload — just a clear description of your services, your specialties, and what makes you different.',
  },
  {
    num: '03',
    title: 'Get found on the map',
    body: 'Your pin appears on the DRIVKIND. map. Enthusiasts searching for services near them will find you. Higher tiers get promoted pins that stand out.',
  },
  {
    num: '04',
    title: 'Post culture content and special offers',
    body: 'Share your work and post special offers directly on your profile. Showing up consistently is how the community gets to know your business.',
  },
]

const faqs = [
  {
    q: 'Do I need to download the app to manage my profile?',
    a: 'No. Everything is managed from this website — your dashboard, stock, analytics, and billing. The app is for your customers.',
  },
  {
    q: 'Can I switch plans?',
    a: 'Yes. Upgrade or downgrade anytime. Changes take effect at the start of your next billing month.',
  },
  {
    q: 'What are culture feed posts?',
    a: "Posts in the DRIVKIND. community feed. They must be culture-focused — cars, builds, events, the lifestyle. No pricing, no links to listings. This rule protects the feed for everyone.",
  },
  {
    q: 'How do promoted listings work?',
    a: 'You upload all your stock to your dashboard. Then you choose which vehicles get promoted into the main marketplace that buyers browse. Your tier determines how many promotion slots you have.',
  },
  {
    q: 'Is there a contract or lock-in?',
    a: 'No. Month-to-month on all plans. Annual billing is available at a discount but not required.',
  },
]

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      <div style={{
        fontSize: '1.75rem', fontWeight: 900, fontStyle: 'italic',
        color: copper, opacity: 0.5, lineHeight: 1,
        flexShrink: 0, width: 48, paddingTop: 2,
        letterSpacing: '-0.03em',
      }}>
        {num}
      </div>
      <div style={{ paddingBottom: '2rem', borderBottom: `1px solid ${border}`, flex: 1 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '0.875rem', color: muted, lineHeight: 1.75 }}>{body}</p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ borderBottom: `1px solid ${border}`, padding: '1.5rem 0' }}>
      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f0f0f0', lineHeight: 1.4, marginBottom: '0.75rem' }}>{q}</p>
      <p style={{ fontSize: '0.875rem', color: muted, lineHeight: 1.75 }}>{a}</p>
    </div>
  )
}

export default function HowItWorksPage() {
  const [activeType, setActiveType] = useState<'dealership' | 'automotive_business'>('dealership')

  const pillBase: React.CSSProperties = {
    padding: '10px 28px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
    fontFamily: 'inherit', transition: 'all 0.15s',
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, backgroundColor: '#0d0d0d' }}>

        {/* Hero */}
        <section style={{
          padding: '5rem 2rem 4rem',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>How it works</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem' }}>
              Simple by design.
            </h1>
            <p style={{ fontSize: '1rem', color: muted, lineHeight: 1.7 }}>
              From sign-up to live in the app in under 10 minutes.
            </p>
          </div>
        </section>

        {/* Type toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '2rem 2rem 0' }}>
          <button
            onClick={() => setActiveType('dealership')}
            style={{
              ...pillBase,
              backgroundColor: activeType === 'dealership' ? copper : 'transparent',
              color: activeType === 'dealership' ? '#0d0d0d' : muted,
              border: activeType === 'dealership' ? 'none' : `1px solid ${border}`,
            }}
          >
            Dealership
          </button>
          <button
            onClick={() => setActiveType('automotive_business')}
            style={{
              ...pillBase,
              backgroundColor: activeType === 'automotive_business' ? copper : 'transparent',
              color: activeType === 'automotive_business' ? '#0d0d0d' : muted,
              border: activeType === 'automotive_business' ? 'none' : `1px solid ${border}`,
            }}
          >
            Automotive Business
          </button>
        </div>

        {/* Dealers steps */}
        <section style={{ padding: '3rem 2rem 4rem', display: activeType === 'dealership' ? 'block' : 'none' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {dealerSteps.map(s => <Step key={s.num} {...s} />)}
            </div>
          </div>
        </section>

        {/* Businesses steps */}
        <section style={{ padding: '3rem 2rem 4rem', display: activeType === 'automotive_business' ? 'block' : 'none' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {businessSteps.map(s => <Step key={s.num} {...s} />)}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '4rem 2rem 6rem', borderTop: `1px solid ${border}`, backgroundColor: '#111111' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
              Common questions
            </h2>
            <div>
              {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
