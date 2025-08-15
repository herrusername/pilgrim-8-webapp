import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PILGRIM-8 | Die Zukunft der Menschheit',
  description: 'Eine interaktive Vision für eine 5-jährige globale Wanderung zur Neugestaltung der Gesellschaft',
  keywords: 'PILGRIM-8, GAIA-OS, KARMA System, Zukunft, Nachhaltigkeit, Gesellschaft',
  authors: [{ name: 'PILGRIM-8 Initiative' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark">
      <body className="bg-black text-white min-h-screen">
        <div className="particle-bg cyber-grid"></div>
        {children}
      </body>
    </html>
  )
}