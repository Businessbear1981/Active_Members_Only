import Image from 'next/image'
import { platform, getSpacesByTier } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'
import SurfaceTileGrid from '@/components/surface/SurfaceTileGrid'

export default function SurfacePage() {
  const surfaceSpaces = getSpacesByTier('surface')

  return (
    <main className="relative min-h-screen bg-midnight flex flex-col items-center overflow-hidden px-6 py-20">
      <div className="relative z-10 flex flex-col items-center gap-10 text-center max-w-6xl w-full">

        <div className="relative w-full aspect-[16/7] border border-brass/30 overflow-hidden">
          <Image src="/brand/surface-hero.jpg" alt="The Surface" fill className="object-cover" priority />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.4em] uppercase brass opacity-80">SURFACE</p>
          <h1 className="text-3xl md:text-5xl font-serif tracking-wide">{platform.name}</h1>
          <p className="text-sm tracking-widest uppercase text-ivory/60 max-w-sm">
            The open floor. The Lab, the Marketplace, the Club, the Lounge, the Restaurant.
          </p>
        </div>

        <SurfaceTileGrid spaces={surfaceSpaces} />

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
