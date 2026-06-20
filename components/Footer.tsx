import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #2a2a2a',
      padding: '1.75rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      backgroundColor: '#0d0d0d',
    }}>
      <span style={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.05em' }}>
        © 2026 DRIVKIND Technologies (Pty) Ltd · Reg 2026/465449/07
      </span>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {[
          { href: '/pricing', label: 'Pricing' },
          { href: '/privacy', label: 'Privacy' },
          { href: '/terms', label: 'Terms' },
          { href: '/contact', label: 'Contact' },
          { href: 'https://instagram.com/drivkind.sa', label: 'Instagram' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{ fontSize: '0.7rem', color: '#555', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
