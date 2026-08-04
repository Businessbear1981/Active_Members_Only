import Image from 'next/image'
import Link from 'next/link'
import type { Space } from '@/types/platform'

// Real image-tile grid for the Surface layer, cropped from the actual Manus-generated
// surface-hero.jpg (each tile already has its number/title/tagline/arrow baked into
// the art), matching the 5-room reference. If a room's slug has no cropped tile yet,
// falls back to an honestly-styled gradient panel with real text instead.
const TILE_IMAGE: Record<string, string> = {
  lab: '/brand/surface/lab.jpg',
  marketplace: '/brand/surface/marketplace.jpg',
  club: '/brand/surface/club.jpg',
  lounge: '/brand/surface/lounge.jpg',
  restaurant: '/brand/surface/restaurant.jpg',
}

export default function SurfaceTileGrid({ spaces }: { spaces: Space[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
      {spaces.map(space => {
        const image = TILE_IMAGE[space.slug]
        const live = space.status === 'live'

        const content = (
          <div
            className={`group relative aspect-[484/677] overflow-hidden border ${
              live ? 'border-brass/30 hover:border-brass' : 'border-brass/10'
            } bg-midnight transition-colors ${!live ? 'grayscale opacity-50' : ''}`}
          >
            {image ? (
              <Image src={image} alt={space.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-brass/20 via-midnight to-midnight">
                <h3 className="font-serif text-xl text-ivory">{space.title}</h3>
                <p className="text-[0.65rem] uppercase tracking-widest text-ivory/50">{space.tagline}</p>
              </div>
            )}
            {!live && (
              <p className="absolute top-3 right-3 text-[0.6rem] uppercase tracking-widest text-brass/70 bg-midnight/80 px-2 py-1">
                Coming soon
              </p>
            )}
          </div>
        )

        return live ? (
          <Link key={space.slug} href={`/surface/${space.slug}`}>
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
