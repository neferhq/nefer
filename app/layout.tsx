import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'

import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'NEFER Inc.',
  description: 'Crafting Digital Experiences with Precision.',
  keywords: 'web development, UI/UX design, landing pages, web apps, freelance developer',
  icons: {
    icon: '/logo.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D0D0D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body bg-background text-foreground">{children}</body>
    </html>
  )
}
