'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'

const copper = '#c98a3a'
const muted = '#555555'
const card = '#1a1a1a'
const border = '#2a2a2a'

function FeatureItem({ text }: { text: string }) {
  return (
    <li style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.855rem', color: '#ccc', lineHeight: 1.5 }}>
      <span style={{ color: copper, flexShrink: 0, fontWeight: 700 }}>—</span>
      {text}
    </li>
  )
}

function PlanCard({
  name, price, tag, desc, features, cta, ctaHref, outline = false, highlight = false,
}: {
  name: string
  price: string
  tag: string
  desc: string
  features: string[]
  cta: string
  ctaHref: string
  outline?: boolean
  highlight?: boolean
}) {
  return (
    <div style={{
      backgroundColor: highlight ? '#242424' : card,
      borderRadius: 16,
      borderTop: `3px solid ${copper}`,
      border: highlight ? `1px solid ${copper}` : `1px solid ${border}`,
      borderTopWidth: 3,
      padding: '2.25rem',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{name}</p>
        <span style={{ fontSize: '0.65rem', color: highlight ? copper : muted, backgroundColor: highlight ? 'rgba(201,138,58,0.12)' : 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{tag}</span>
      </div>
      <p style={{ fontSize: '2rem', fontWeight: 900, color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{price}<span style={{ fontSize: '0.85rem', fontWeight: 500, color: muted }}>/month</span></p>
      <p style={{ fontSize: '0.855rem', color: muted, lineHeight: 1.6, marginBottom: '1.75rem' }}>{desc}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
        {features.map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>
      <Link href={ctaHref} style={{
        display: 'block', textAlign: 'center',
        backgroundColor: outline ? 'transparent' : copper,
        color: outline ? copper : '#0d0d0d',
        border: outline ? `1px solid ${copper}` : 'none',
        padding: '13px 24px', borderRadius: 999,
        fontWeight: 700, fontSize: '0.82rem',
        textDecoration: 'none', letterSpacing: '0.07em',
        textTransform: 'uppercase',
      }}>
        {cta}
      </Link>
      <p style={{ fontSize: '0.72rem', color: muted, textAlign: 'center', marginTop: '0.75rem' }}>
        No setup fee. Cancel anytime.
      </p>
    </div>
  )
}

function FlagshipCard({
  name, price, tag, desc, features, cta, ctaHref,
}: {
  name: string; price: string; tag: string; desc: string; features: string[]; cta: string; ctaHref: string
}) {
  const half = Math.ceil(features.length / 2)
  return (
    <div style={{
      backgroundColor: '#242424',
      borderRadius: 16,
      border: `1px solid ${copper}`,
      borderTop: `3px solid ${copper}`,
      padding: '2.25rem',
      marginTop: '1.5rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>{name}</p>
          <p style={{ fontSize: '2rem', fontWeight: 900, color: '#f0f0f0', letterSpacing: '-0.03em' }}>{price}<span style={{ fontSize: '0.85rem', fontWeight: 500, color: muted }}>/month</span></p>
        </div>
        <span style={{ fontSize: '0.65rem', color: copper, backgroundColor: 'rgba(201,138,58,0.12)', padding: '3px 12px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, alignSelf: 'flex-start' }}>{tag}</span>
      </div>
      <p style={{ fontSize: '0.875rem', color: muted, lineHeight: 1.7, marginBottom: '2rem', maxWidth: 560 }}>{desc}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem', marginBottom: '2rem' }}>
        {features.slice(0, half).map((f, i) => <FeatureItem key={i} text={f} />)}
        {features.slice(half).map((f, i) => <FeatureItem key={i + half} text={f} />)}
      </div>
      <Link href={ctaHref} style={{
        display: 'inline-block',
        backgroundColor: 'transparent',
        color: copper,
        border: `1px solid ${copper}`,
        padding: '13px 32px', borderRadius: 999,
        fontWeight: 700, fontSize: '0.82rem',
        textDecoration: 'none', letterSpacing: '0.07em',
        textTransform: 'uppercase',
      }}>
        {cta}
      </Link>
      <p style={{ fontSize: '0.72rem', color: muted, marginTop: '0.75rem' }}>
        No setup fee. Cancel anytime.
      </p>
    </div>
  )
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'dealers' | 'businesses'>('dealers')

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, backgroundColor: '#0d0d0d' }}>

        {/* Hero */}
        <section style={{
          position: 'relative', padding: '5rem 2rem 4rem',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Simple, transparent pricing</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem' }}>
              The right plan for your business.
            </h1>
            <p style={{ fontSize: '1rem', color: muted, lineHeight: 1.7 }}>
              Two tiers for dealers. Two tiers for businesses. No setup fees. No lock-in. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Tab toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem auto 3rem' }}>
          <button
            onClick={() => { setActiveTab('dealers'); document.getElementById('dealers')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              padding: '10px 28px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em',
              backgroundColor: activeTab === 'dealers' ? '#c98a3a' : 'transparent',
              color: activeTab === 'dealers' ? '#0d0d0d' : '#555',
              border: activeTab === 'dealers' ? 'none' : '1px solid #2a2a2a',
            }}
          >Dealers</button>
          <button
            onClick={() => { setActiveTab('businesses'); document.getElementById('businesses')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              padding: '10px 28px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em',
              backgroundColor: activeTab === 'businesses' ? '#c98a3a' : 'transparent',
              color: activeTab === 'businesses' ? '#0d0d0d' : '#555',
              border: activeTab === 'businesses' ? 'none' : '1px solid #2a2a2a',
            }}
          >Businesses</button>
        </div>

        {/* Dealers */}
        <section id="dealers" style={{ padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>For Dealers</p>
            <p style={{ fontSize: '1rem', color: muted, marginBottom: '2.5rem', maxWidth: 560, lineHeight: 1.7 }}>
              List your stock, get promoted in the marketplace, and reach serious car buyers across South Africa.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <PlanCard
                name="Forecourt"
                price="R599"
                tag="Most popular"
                desc="For the independent dealer ready to go digital."
                features={[
                  'Pin on the map with dealership profile',
                  '20 active stock listings',
                  '3 promoted listings in the marketplace',
                  '1 culture feed post per month',
                  'Verified dealer badge',
                  'Email enquiry notifications',
                  'Personal onboarding call (founding partners only)',
                ]}
                cta="Get started"
                ctaHref="/contact"
              />
              <PlanCard
                name="Showroom"
                price="R999"
                tag="Grow faster"
                desc="For the dealer serious about reach and performance."
                features={[
                  'Everything in Forecourt',
                  '50 active stock listings',
                  '10 promoted listings in the marketplace',
                  '3 culture feed posts per month',
                  'Priority placement in search results',
                  'Performance dashboard — views, watchlists, enquiries',
                  'Bulk stock upload',
                  'Gold verified badge',
                  'Personal onboarding call (founding partners only)',
                ]}
                cta="Get started"
                ctaHref="/contact"
              />
            </div>

            <FlagshipCard
              name="Flagship"
              price="R1,999"
              tag="For serious operations"
              desc="For franchise dealers and multi-branch operations who want maximum reach and full analytics."
              features={[
                'Everything in Showroom',
                'Unlimited active stock listings',
                '25 promoted listings in the marketplace',
                'Unlimited culture feed posts',
                'Featured dealer slot on Discover screen',
                'Full analytics + benchmarking vs other dealers',
                'Dedicated onboarding call with Robin personally',
                'API access for DMS stock feed integration',
                'Gold verified badge + priority support',
                'Personal onboarding call (founding partners only)',
              ]}
              cta="Talk to us"
              ctaHref="/contact"
            />
          </div>
        </section>

        {/* Businesses */}
        <section id="businesses" style={{ padding: '4rem 2rem', borderTop: `1px solid ${border}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>For Businesses</p>
            <p style={{ fontSize: '1rem', color: muted, marginBottom: '2.5rem', maxWidth: 620, lineHeight: 1.7 }}>
              Workshops, detailers, parts suppliers, fitment centres, paint shops — get in front of the enthusiasts who need your services.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <PlanCard
                name="Essentials"
                price="R599"
                tag="Start here"
                desc="Get on the map and start building your presence in the community."
                features={[
                  'Pin on the map with business profile',
                  'Listed in the Business Directory',
                  'Services, hours, contact and photos on your profile',
                  '3 culture feed posts per month',
                  'Verified business badge',
                  'Email enquiry notifications',
                  'Personal onboarding call (founding partners only)',
                ]}
                cta="Get started"
                ctaHref="/contact"
              />
              <PlanCard
                name="Pro"
                price="R999"
                tag="Build your following"
                desc="For the business that wants to be found first and followed by enthusiasts."
                features={[
                  'Everything in Essentials',
                  '8 culture feed posts per month',
                  'Featured in category searches (e.g. detailers near me)',
                  'Promoted pin on map (visually distinct)',
                  'Special offers card on your profile',
                  'Performance dashboard — profile views, directions taps, post reach',
                  'Gold verified badge',
                  'Personal onboarding call (founding partners only)',
                ]}
                cta="Get started"
                ctaHref="/contact"
              />
            </div>

            <FlagshipCard
              name="Premium"
              price="R1,999"
              tag="Maximum visibility"
              desc="For businesses that want to be impossible to miss — on the map, in the feed, and across the community."
              features={[
                'Everything in Pro',
                'Unlimited culture feed posts',
                'Homepage feature slot on Discover screen',
                'Event sponsorship listing (your brand on community events)',
                'Monthly feature in Hot Right Now section',
                'Full analytics',
                'Dedicated onboarding call with Robin personally',
                'Gold verified badge + priority support',
                'Personal onboarding call (founding partners only)',
              ]}
              cta="Talk to us"
              ctaHref="/contact"
            />
          </div>
        </section>

        {/* Annual discount banner */}
        <section style={{ backgroundColor: '#111111', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '2.5rem 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#f0f0f0', fontWeight: 600, marginBottom: '0.5rem' }}>
            Pay annually and get 2 months free — that&apos;s R5,990/year for Forecourt instead of R7,188.
          </p>
          <p style={{ fontSize: '0.8rem', color: muted }}>Annual billing available on all plans. Contact us to set up.</p>
        </section>

      </main>
      <Footer />
    </>
  )
}
