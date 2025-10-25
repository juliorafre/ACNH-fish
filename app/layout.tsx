import '../src/index.css'
import '../src/base.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fish Inc',
  description: 'Animal Crossing: New Horizons fishing companion app',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
