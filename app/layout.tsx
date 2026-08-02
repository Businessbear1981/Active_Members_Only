import type { Metadata, Viewport } from 'next'
import './globals.css'
import { platform } from '@/lib/config'
import Concierge from '@/components/concierge/Concierge'
import PortalTransitionProvider from '@/components/portal/PortalTransitionProvider'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${platform.domain}`),
  title: {
    default: platform.name,
    template: `%s · ${platform.name}`,
  },
  description: platform.description,
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-midnight text-ivory grain">
        <PortalTransitionProvider>
          {children}
          <Concierge />
        </PortalTransitionProvider>
      </body>
    </html>
  )
}
