import Image from 'next/image'
import { platform, getSpacesByTier } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'

export default function SurfacePage() {
  const surfaceSpaces = getSpacesByTier('surface')

  return (
    <main className="relative min-h-screen bg-midnight flex flex-col items-center overflow-hidden px-6 py-20">
      <div className="relative z-10 flex flex-col items-center gap-10 text-center max-w-4xl">

        <div className="relative w-full aspect-[16/7] border border-brass/30 overflow-hidden">
          <Image src="/brand/surface-hero.jpg" alt="The Surface" fill className="object-cover" priority />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.4em] uppercase brass opacity-80">SURFACE</p>
          <h1 className="text-3xl md:text-5xl font-serif tracking-wide">{platform.name}</h1>
          <p className="text-sm tracking-widest uppercase text-ivory/60 max-w-sm">
            The open floor. The Lab, the Marketplace, the Club, the Lounge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {surfaceSpaces.map(space =>
            space.status === 'live' ? (
              <PortalLink
                key={space.slug}
                href={`/surface/${space.slug}`}
                className="px-5 py-4 border border-brass/40 text-left hover:bg-brass/10 hover:border-brass transition-colors"
              >
                <p className="text-brass text-sm tracking-widest uppercase">{space.title}</p>
                <p className="text-ivory/50 text-xs mt-1">{space.tagline}</p>
              </PortalLink>
            ) : (
              <div
                key={space.slug}
                className="px-5 py-4 border border-brass/10 text-left opacity-50"
              >
                <p className="text-ivory/60 text-sm tracking-widest uppercase">{space.title}</p>
                <p className="text-ivory/30 text-xs mt-1">{space.tagline}</p>
              </div>
            )
          )}
        </div>

        <nav className="flex flex-col sm:flex-row gap-4 mt-4">
          <PortalLink
            href="/streets"
            className="px-8 py-3 border border-streets-purple/60 text-streets-purple text-sm tracking-widest uppercase hover:bg-streets-purple/10 transition-colors"
          >
            The Streets →
          </PortalLink>
        </nav>

      </div>
    </main>
  )
}
