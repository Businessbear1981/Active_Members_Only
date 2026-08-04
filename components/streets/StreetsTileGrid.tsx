import Link from 'next/link'
import type { Space } from '@/types/platform'

// Genre-room tile grid for the Streets layer — Surface-tile pattern, scoped to
// the Streets purple/cyan palette. No per-genre photography exists yet, so each
// tile is an honestly-styled gradient panel with real text (swap for real art
// per genre the moment it exists).
const TILE_ACCENT: Record<string, string> = {
  'hip-hop': 'from-streets-purple/30 via-streets-bg to-streets-bg',
  rnb: 'from-fuchsia-800/25 via-streets-bg to-streets-bg',
  electronic: 'from-streets-cyan/20 via-streets-bg to-streets-bg',
  trap: 'from-indigo-800/25 via-streets-bg to-streets-bg',
  pop: 'from-pink-700/20 via-streets-bg to-streets-bg',
}

export default function StreetsTileGrid({ spaces }: { spaces: Space[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {spaces.map(space => {
        const accent = TILE_ACCENT[space.slug] ?? 'from-streets-purple/20 via-streets-bg to-streets-bg'
        const live = space.status === 'live'

        const content = (
          <div
            className={`group relative aspect-[16/10] overflow-hidden border ${
              live ? 'border-streets-purple/40 hover:border-streets-cyan' : 'border-streets-purple/10'
            } bg-gradient-to-br ${accent} transition-colors ${!live ? 'opacity-50' : ''}`}
          >
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <p className="text-[0.65rem] font-mono tracking-widest text-streets-cyan/70">GENRE ROOM</p>
              <div>
                <h3 className="font-sans font-bold text-2xl text-white tracking-tight">{space.title}</h3>
                <p className="text-xs text-ivory/40 mt-1 uppercase tracking-widest">{space.tagline}</p>
                {!live && (
                  <p className="text-[0.6rem] uppercase tracking-widest text-streets-purple/60 mt-2">Coming soon</p>
                )}
              </div>
            </div>
            {live && (
              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-streets-cyan/50 flex items-center justify-center text-streets-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            )}
          </div>
        )

        return live ? (
          <Link key={space.slug} href={`/streets/${space.slug}`}>
            {content}
          </Link>
        ) : (
          <div key={space.slug} className="cursor-not-allowed">
            {content}
          </div>
        )
      })}
    </div>
  )
}
