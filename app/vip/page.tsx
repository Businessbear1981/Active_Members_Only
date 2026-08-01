import Link from 'next/link'
import { getSpacesByTier } from '@/lib/config'

export default function VipSanctumPage() {
  const vipSpaces = getSpacesByTier('vip')

  return (
    <main className="min-h-screen bg-vip-bg px-6 py-20">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-vip-amber opacity-70">VIP SANCTUM</p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-vip-ivory">After Hours</h1>
        <p className="text-sm text-vip-ivory/50 max-w-md">
          Invite-only, and this deep, it isn&apos;t supposed to feel comfortable. {vipSpaces.length} rooms.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vipSpaces.map(space => (
          <Link
            key={space.slug}
            href={`/vip/${space.slug}`}
            className="px-6 py-5 border border-vip-crimson/40 text-left hover:border-vip-amber hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-vip-amber text-xs tracking-widest uppercase">{space.title}</p>
            <p className="text-vip-ivory/40 text-xs mt-2 leading-relaxed">{space.tagline}</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          href="/surface"
          className="text-xs tracking-widest uppercase text-vip-ivory/30 hover:text-vip-amber transition-colors"
        >
          ← Back to the Surface
        </Link>
      </div>
    </main>
  )
}
