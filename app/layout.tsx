import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DRIVKIND. — Where SA car culture lives.',
  description: 'South Africa\'s first car culture platform. Built for dealers, businesses, and enthusiasts.',
  metadataBase: new URL('https://drivkind.co.za'),
  openGraph: {
    title: 'DRIVKIND.',
    description: 'Where SA car culture lives.',
    url: 'https://drivkind.co.za',
    siteName: 'DRIVKIND.',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
