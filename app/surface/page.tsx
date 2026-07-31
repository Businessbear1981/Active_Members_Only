import Link from 'next/link'
import { platform, artists, pieces } from '@/lib/config'

export default function SurfacePage() {
  return (
    <main className="relative min-h-screen bg-midnight flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <div className="relative z-10 flex flex-col items-center gap-10 text-center max-w-3xl">

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.4em] uppercase brass opacity-80">SURFACE</p>
          <h1 className="text-3xl md:text-5xl font-serif tracking-wide">{platform.name}</h1>
          <p className="text-sm tracking-widest uppercase text-ivory/60 max-w-sm">
            The open floor. The Lab, the Marketplace, the Club, the Lounge.
          </p>
        </div>

        <div className="flex gap-10 text-center">
          <div>
            <p className="text-3xl font-serif brass">{pieces.length}</p>
            <p className="text-xs tracking-widest uppercase text-ivory/50 mt-1">Works</p>
          </div>
          <div>
            <p className="text-3xl font-serif brass">{artists.length}</p>
            <p className="text-xs tracking-widest uppercase text-ivory/50 mt-1">Artists</p>
          </div>
        </div>

        {/* Surface sections — Lab / Marketplace / Club / Lounge / Restaurant are next to be built */}
        <div className="flex flex-wrap justify-center gap-3">
          {['The Lab', 'The Marketplace', 'The Club', 'The Lounge', 'The Restaurant'].map(name => (
            <span
              key={name}
              className="px-4 py-2 border border-brass/20 text-ivory/30 text-xs tracking-widest uppercase"
            >
              {name} — coming soon
            </span>
          ))}
        </div>

        <nav className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/collection"
            className="px-8 py-3 border border-brass/60 text-brass text-sm tracking-widest uppercase hover:bg-brass/10 transition-colors"
          >
            View Collection
          </Link>
          <Link
            href="/streets"
            className="px-8 py-3 border border-streets-purple/60 text-streets-purple text-sm tracking-widest uppercase hover:bg-streets-purple/10 transition-colors"
          >
            The Streets →
          </Link>
        </nav>

        <div className="flex flex-wrap justify-center gap-6 mt-2">
          {artists.map(a => (
            <Link
              key={a.slug}
              href={a.wingHref}
              className="text-xs tracking-widest uppercase text-ivory/40 hover:text-brass transition-colors"
            >
              {a.name}
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
