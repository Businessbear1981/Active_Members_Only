import Image from 'next/image'
import Link from 'next/link'
import { platform, artists, pieces } from '@/lib/config'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/hero.jpg"
          alt={platform.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">

        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.4em] uppercase brass opacity-80">{platform.shortName}</p>
          <h1 className="text-4xl md:text-6xl font-serif tracking-wide">{platform.name}</h1>
          <p className="text-sm tracking-widest uppercase text-ivory/60 max-w-sm">{platform.tagline}</p>
        </div>

        {/* Stats */}
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

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/collection"
            className="px-8 py-3 border border-brass/60 text-brass text-sm tracking-widest uppercase hover:bg-brass/10 transition-colors"
          >
            View Collection
          </Link>
          <Link
            href="/gate/signed"
            className="px-8 py-3 bg-brass/20 border border-brass/40 text-ivory text-sm tracking-widest uppercase hover:bg-brass/30 transition-colors"
          >
            Request Access
          </Link>
        </nav>

        {/* Artist list */}
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
