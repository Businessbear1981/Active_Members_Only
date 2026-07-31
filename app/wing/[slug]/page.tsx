import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { artists, getArtist, getPiecesByArtist } from '@/lib/config'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return artists.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) return {}
  return { title: artist.name }
}

export default async function WingPage({ params }: Props) {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) notFound()

  const artistPieces = getPiecesByArtist(slug)

  return (
    <main className="min-h-screen bg-midnight px-6 py-20">
      <div className="max-w-5xl mx-auto">

        <header className="mb-16">
          <Link href="/collection" className="text-xs tracking-widest uppercase text-ivory/30 hover:text-brass transition-colors">
            ← Collection
          </Link>
          <div className="mt-8 tombstone">
            <h1 className="font-serif text-5xl">{artist.name}</h1>
            <p className="text-ivory/50 mt-2 text-sm">{artist.nationality} · {artist.born}–{artist.died ?? 'present'}</p>
            <p className="text-ivory/40 text-sm mt-0.5">{artist.era}</p>
          </div>
          <p className="text-ivory/60 font-serif text-lg leading-relaxed mt-8 max-w-2xl">
            {artist.bio}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artistPieces.map(piece => (
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
                <p className="text-xs text-ivory/40 mt-1">{piece.year} · {piece.medium}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
