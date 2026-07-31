import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { pieces, getPiece, getArtist } from '@/lib/config'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return pieces.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const piece = getPiece(slug)
  if (!piece) return {}
  return { title: piece.title }
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params
  const piece = getPiece(slug)
  if (!piece) notFound()

  const artist = getArtist(piece.artistSlug)

  return (
    <main className="min-h-screen bg-midnight">

      {/* Hero */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={piece.heroImage}
          alt={piece.title}
          fill
          className="object-contain object-center"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Details */}
      <section className="max-w-3xl mx-auto px-6 py-16">

        <div className="tombstone mb-10">
          <h1 className="font-serif text-4xl">{piece.title}</h1>
          <p className="text-ivory/60 mt-2">{artist?.name} · {piece.year}</p>
          <p className="text-ivory/40 text-sm mt-1">{piece.medium} · {piece.dimensions}</p>
          {piece.signed && (
            <p className="text-xs brass mt-1 tracking-widest uppercase">Signed</p>
          )}
        </div>

        <p className="text-ivory/70 leading-relaxed font-serif text-lg mb-12">
          {piece.conciergeStory}
        </p>

        {piece.viewingLocation && (
          <p className="text-xs tracking-widest uppercase text-ivory/30 mb-8">
            Location: {piece.viewingLocation}
          </p>
        )}

        {/* Gate CTA */}
        <div className="gate-card p-8 text-center">
          <p className="text-xs tracking-widest uppercase brass mb-3">Provenance · Authentication · Pricing</p>
          <p className="text-ivory/60 text-sm mb-6">
            Sign the NDA to access the full provenance record, condition report, and acquisition details.
          </p>
          <Link
            href="/gate/signed"
            className="inline-block px-8 py-3 border border-brass/60 text-brass text-sm tracking-widest uppercase hover:bg-brass/10 transition-colors"
          >
            Request Access
          </Link>
        </div>

        {/* Literature */}
        {piece.literature.length > 0 && (
          <div className="mt-12">
            <p className="text-xs tracking-widest uppercase text-ivory/30 mb-4">Literature</p>
            <ul className="space-y-2">
              {piece.literature.map((ref, i) => (
                <li key={i} className="text-sm text-ivory/50 font-serif italic">{ref}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/collection" className="text-xs tracking-widest uppercase text-ivory/30 hover:text-brass transition-colors">
            ← Back to Collection
          </Link>
        </div>

      </section>
    </main>
  )
}
