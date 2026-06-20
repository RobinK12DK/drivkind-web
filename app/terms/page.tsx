import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const copper = '#c98a3a'
const muted = '#888888'

const sections = [
  {
    heading: '1. Acceptance',
    body: 'By accessing or using DRIVKIND. or drivkind.co.za, you agree to these Terms. If you do not agree, do not use the platform.',
  },
  {
    heading: '2. Who We Are',
    body: 'DRIVKIND. is operated by DRIVKIND Technologies (Pty) Ltd, registered in South Africa (Reg. 2026/465449/07), Johannesburg. Contact: robin@drivkind.co.za.',
  },
  {
    heading: '3. The Platform',
    body: 'DRIVKIND. is a car culture platform connecting dealers, businesses, and enthusiasts. We provide marketplace listings, community features, dealer and business profiles, and related services. We reserve the right to modify, suspend, or discontinue any part of the platform at any time.',
  },
  {
    heading: '4. Dealer and Business Accounts',
    body: 'Business accounts are subject to a subscription fee as described on our pricing page. Subscriptions are month-to-month unless otherwise agreed. We reserve the right to suspend or terminate accounts that violate these Terms.',
  },
  {
    heading: '5. Prohibited Content',
    body: 'You may not use DRIVKIND. to:',
    items: [
      'List stolen, illegal, or unroadworthy vehicles',
      'Post false, misleading, or fraudulent listings',
      'Harass, abuse, or threaten other users',
      'Post content that is racist, hateful, or discriminatory',
      'Include pricing or listing links in culture feed posts',
      'Circumvent platform rules',
    ],
  },
  {
    heading: '6. Scammer Reports',
    body: 'The DRIV.rep scammer reporting system allows users to report suspected fraud. Reports are published in good faith. DRIVKIND Technologies (Pty) Ltd is not liable for the accuracy of user-submitted reports. Subjects of reports may file a formal dispute through the platform.',
  },
  {
    heading: '7. Intellectual Property',
    body: 'All DRIVKIND. branding, design, and platform code is the property of DRIVKIND Technologies (Pty) Ltd. User-generated content remains the property of the user. By posting content, you grant DRIVKIND. a non-exclusive licence to display it on the platform.',
  },
  {
    heading: '8. Limitation of Liability',
    body: 'DRIVKIND Technologies (Pty) Ltd is not liable for transactions between users, the accuracy of listings, or the outcome of any vehicle purchase or service engagement facilitated through the platform. Use the platform at your own risk.',
  },
  {
    heading: '9. Governing Law',
    body: 'These Terms are governed by the laws of South Africa. Any disputes will be subject to the jurisdiction of the South African courts.',
  },
  {
    heading: '10. Changes',
    body: 'We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance.',
  },
  {
    heading: '11. Contact',
    body: 'DRIVKIND Technologies (Pty) Ltd\nrobin@drivkind.co.za\ndrivkind.co.za\nJohannesburg, South Africa.',
  },
]

export default function TermsPage() {
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
              Terms of Service
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
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
