import Link from 'next/link'
import { platform } from '@/lib/config'
import Silhouette from '@/components/ui/Silhouette'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">

        {/* Silhouette — placeholder until SCO's likeness is provided */}
        <Silhouette />

        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.4em] uppercase brass opacity-80">{platform.shortName}</p>
          <h1 className="text-4xl md:text-6xl font-serif tracking-wide">{platform.name}</h1>
          <p className="text-[11px] tracking-[0.5em] uppercase text-brass/70 font-mono">EST. MMXXVI</p>
          <p className="text-sm tracking-widest uppercase text-ivory/60 max-w-sm">{platform.tagline}</p>
        </div>

        {/* Enter — the only call to action on this screen */}
        <Link
          href="/surface"
          className="mt-2 px-10 py-3 border border-brass/60 text-brass text-xs tracking-[0.4em] uppercase hover:bg-brass/10 hover:text-white transition-colors"
        >
          Enter
        </Link>

        <Link
          href="/gate/signed"
          className="text-xs tracking-widest uppercase text-ivory/30 hover:text-brass transition-colors"
        >
          Already a member? Request access
        </Link>

      </div>
    </main>
  )
}
