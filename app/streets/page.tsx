import Image from 'next/image'
import Link from 'next/link'
import { getSpacesByTier } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'

export default function StreetsPage() {
  const genreRooms = getSpacesByTier('streets')

  return (
    <main className="min-h-screen bg-streets-bg px-6 py-20">
      <div className="max-w-3xl mx-auto mb-10">
        <div className="relative w-full aspect-[16/9] border border-streets-purple/40 overflow-hidden">
          <Image src="/brand/streets-hero.jpg" alt="The Streets" fill className="object-cover" priority />
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6 mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">THE STREETS · THE LABEL</p>
        <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">
          The Collaboration Studio
        </h1>
        <p className="text-sm text-ivory/60 max-w-md">
          Genre rooms, project rooms, the arranger, the roster, the contracts, the release pipeline.
          This is the label. This is where the work happens.
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex justify-center mb-8">
        <Link
          href="/streets/roster"
          className="px-6 py-3 border border-streets-cyan/50 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          Artist Roster →
        </Link>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
        {genreRooms.map(room => (
          <Link
            key={room.slug}
            href={`/streets/${room.slug}`}
            className="px-6 py-5 border border-streets-purple/40 text-left hover:border-streets-cyan hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-streets-purple text-xs tracking-widest uppercase">{room.title}</p>
            <p className="text-ivory/40 text-xs mt-2">{room.tagline}</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-14">
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
