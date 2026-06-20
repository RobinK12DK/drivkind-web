import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const copper = '#c98a3a'
const muted = '#888888'

const sections = [
  {
    heading: '1. Introduction',
    body: `DRIVKIND. ("we", "our", "us") is operated by DRIVKIND Technologies (Pty) Ltd, registered in South Africa (Reg. 2026/465449/07), Johannesburg. This Privacy Policy explains how we collect, use, and protect your personal information when you use the DRIVKIND. platform. Our Information Officer is registered with the Information Regulator of South Africa as required by POPIA. For all privacy enquiries, contact us at robin@drivkind.co.za.`,
  },
  {
    heading: '2. Information We Collect',
    items: [
      'Account information: email address, username, profile photo',
      'Vehicle information: cars in your garage, build details, modifications',
      'Marketplace data: listings you create, parts you sell, offers you make',
      'Communications: messages sent between users via in-app chat',
      'Location: approximate location used for listing discovery and map features (only when you grant permission)',
      'Usage data: screens visited, features used, crash reports',
      'Device information: device type, operating system, app version',
      'Phone number: used for SMS verification (OTP) via Twilio — not stored beyond verification',
    ],
  },
  {
    heading: '3. Lawful Basis for Processing',
    items: [
      'Contract: to provide the services you signed up for',
      'Legitimate interest: to detect fraud, scams, and abuse on the platform',
      'Legal obligation: to comply with South African law',
      'Public interest: scammer reports may include third-party personal information published in the public interest and for the prevention of financial harm. Accused parties may request review via our dispute system.',
      'Consent: for analytics and usage tracking',
    ],
  },
  {
    heading: '4. How We Use Your Information',
    items: [
      'To operate and improve the DRIVKIND. platform',
      'To connect buyers and sellers on the marketplace',
      'To enable community features (forums, clubs, events, builds)',
      'To send notifications about activity relevant to you',
      'To verify your identity via SMS OTP',
      'To detect and prevent fraud, scams, and abuse',
      'To analyse platform usage and improve user experience',
      'To comply with applicable South African law',
    ],
  },
  {
    heading: '5. Third-Party Data Processors',
    body: 'We do not sell your personal information. We share data only with the following processors, all bound by Data Processing Agreements:',
    items: [
      'Supabase: database, authentication, file storage (EU West)',
      'Sentry: crash and error reporting (EU)',
      'PostHog: product analytics and usage tracking (EU)',
      'Twilio: SMS OTP verification (EU)',
      'Cloudflare Turnstile: bot and abuse protection on authentication endpoints (Global CDN)',
      'Apple: App Store distribution (Global)',
      'Law enforcement: when required by South African law',
    ],
  },
  {
    heading: '6. POPIA Compliance & Your Rights',
    body: 'We process your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). You have the right to:',
    items: [
      'Access the personal information we hold about you',
      'Request correction of inaccurate information',
      'Request deletion of your information (available directly in the app)',
      'Object to the processing of your information',
      'Lodge a complaint with the Information Regulator of South Africa at inforegulator.org.za',
    ],
    footer: 'To exercise any of these rights, contact us at robin@drivkind.co.za.',
  },
  {
    heading: '7. Data Retention',
    items: [
      'Active accounts: retained while your account is active',
      'Deleted accounts: personal information deleted within 30 days',
      'Chat messages: purged 12 months after last activity',
      'Dismissed scammer reports: purged after 6 months',
      'Listing images: purged 30 days after a listing is deleted',
      'Some data may be retained longer where required by South African law',
    ],
  },
  {
    heading: '8. Security',
    body: 'We use industry-standard security measures including:',
    items: [
      'Encrypted connections (HTTPS/TLS) enforced on all endpoints',
      'Row-level security on all database tables',
      'Bot and abuse protection via Cloudflare Turnstile on all authentication endpoints',
      'Rate limiting on login, signup, and OTP endpoints',
      'Encrypted session storage using iOS Keychain and Android Keystore',
      'Multi-factor authentication on all administrative accounts',
    ],
  },
  {
    heading: '9. Data Breach Notification',
    body: 'In the event of a security breach that compromises your personal information, we will notify the Information Regulator of South Africa and affected users as soon as reasonably possible, as required by POPIA Section 22.',
  },
  {
    heading: '10. Children',
    body: 'DRIVKIND. is not intended for users under the age of 13. We do not knowingly collect information from children. Contact us at robin@drivkind.co.za if you believe a child has provided personal information.',
  },
  {
    heading: '11. Changes to This Policy',
    body: 'We may update this policy from time to time. We will notify you of significant changes via the app. Continued use of DRIVKIND. after changes constitutes acceptance.',
  },
  {
    heading: '12. Access to Information (PAIA)',
    body: 'Our Section 51 Manual is available on request as required by the Promotion of Access to Information Act. Contact us at robin@drivkind.co.za to request a copy.',
  },
  {
    heading: '13. Contact',
    body: 'DRIVKIND Technologies (Pty) Ltd\nReg. 2026/465449/07 · Johannesburg, South Africa\nrobin@drivkind.co.za\ndrivkind.co.za',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, backgroundColor: '#0d0d0d', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{
          padding: '5rem 2rem 3rem',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Legal</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, fontStyle: 'italic', color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.75rem' }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#3a3a3a' }}>Last updated: June 2026</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '2rem 2rem 6rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sections.map((s) => (
              <div key={s.heading}>
                <p style={{ fontSize: '0.68rem', color: copper, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.6rem' }}>
                  {s.heading}
                </p>
                {s.body && (
                  <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.8, marginBottom: s.items ? '0.75rem' : 0, whiteSpace: 'pre-line' }}>
                    {s.body}
                  </p>
                )}
                {s.items && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {s.items.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                        <span style={{ color: copper, flexShrink: 0 }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.footer && (
                  <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.8, marginTop: '0.75rem' }}>{s.footer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
