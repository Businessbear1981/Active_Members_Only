import Link from 'next/link'
import Club from '@/components/surface/Club'

export default function ClubPage() {
  return (
    <main className="min-h-screen bg-midnight px-6 py-16">
      <div className="max-w-md mx-auto text-center mb-10">
        <Link
          href="/surface"
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-brass transition-colors"
        >
          ← Back to the Surface
        </Link>
        <p className="text-xs tracking-[0.4em] uppercase brass opacity-80 mt-6">THE CLUB</p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide mt-2">Discovery</h1>
        <p className="text-sm text-ivory/50 mt-3">
          Real add-and-match — single-session demo, so your own profile shows up in the deck too until real accounts exist.
        </p>
      </div>
      <Club />
    </main>
  )
}
