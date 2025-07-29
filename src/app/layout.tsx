import type { Metadata } from 'next'
import HeaderWrapper from '@/src/components/layout/HeaderWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sales Analytics Dashboard | Bazookanator',
  description:
    'Visualize, track, and analyse sales performance with interactive dashboards and insights.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background ">
        <HeaderWrapper />
        {children}
      </body>
    </html>
  )
}
