import Link from 'next/link'
import { getSpacesByTier } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'
import StreetsTileGrid from '@/components/streets/StreetsTileGrid'

export default function StreetsPage() {
  const genreRooms = getSpacesByTier('streets')

  return (
    <main className="relative min-h-screen bg-streets-bg px-6 py-20 overflow-hidden">
      {/* Streets spine — the Manus reference art sits as a fixed background layer;
          every real, working piece (tiles, roster link, nav) renders in the foreground on top of it. */}
      <img
        src="/brand/streets-hero.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.35, zIndex: 0,
        }}
      />
      <div className="absolute inset-0 bg-streets-bg/70" style={{ zIndex: 1 }} />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center gap-6 mb-14" style={{ zIndex: 10 }}>
        <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">THE STREETS · THE LABEL</p>
        <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">
          The Collaboration Studio
        </h1>
        <p className="text-sm text-ivory/60 max-w-md">
          Genre rooms, project rooms, the arranger, the roster, the contracts, the release pipeline.
          This is the label. This is where the work happens.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto flex justify-center mb-8" style={{ zIndex: 10 }}>
        <Link
          href="/streets/roster"
          className="px-6 py-3 border border-streets-cyan/50 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors bg-streets-bg/60"
        >
          Artist Roster →
        </Link>
      </div>

      <div className="relative max-w-5xl mx-auto" style={{ zIndex: 10 }}>
        <StreetsTileGrid spaces={genreRooms} />
      </div>

      <div className="relative text-center mt-14" style={{ zIndex: 10 }}>
        <PortalLink
          href="/surface"
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
        >
          ← Back to the Surface
        </PortalLink>
      </div>
    </main>
  )
}
