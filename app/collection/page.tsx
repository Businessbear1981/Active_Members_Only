import Image from 'next/image'
import Link from 'next/link'
import { pieces, getArtist, platform } from '@/lib/config'

export const metadata = { title: 'Collection' }

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-midnight px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <header className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase brass mb-3">{platform.shortName}</p>
          <h1 className="text-4xl font-serif">The Collection</h1>
          <p className="text-ivory/40 text-sm mt-3">{pieces.length} works · Private collection</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pieces.map(piece => {
            const artist = getArtist(piece.artistSlug)
            return (
              <Link key={piece.slug} href={`/piece/${piece.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal mb-4">
                  <Image
                    src={piece.heroImage}
                    alt={piece.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="tombstone">
                  <p className="font-serif text-lg leading-tight">{piece.title}</p>
                  <p className="text-xs text-ivory/50 mt-1">{artist?.name} · {piece.year}</p>
                  <p className="text-xs text-ivory/30 mt-0.5">{piece.medium}</p>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </main>
  )
}
