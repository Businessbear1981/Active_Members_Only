import Link from 'next/link'

export default function VipSanctumPage() {
  return (
    <main className="relative min-h-screen bg-vip-bg flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="max-w-2xl flex flex-col items-center gap-6">
        <p className="text-xs tracking-[0.4em] uppercase text-vip-amber opacity-70">VIP SANCTUM</p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-vip-ivory">
          After Hours
        </h1>
        <p className="text-sm text-vip-ivory/50 max-w-md">
          Private vaults, the boardroom, release rooms, The Circle. Invite-only, and this deep,
          it isn&apos;t supposed to feel comfortable.
        </p>
        <div className="border border-vip-crimson/50 px-6 py-4 text-xs tracking-widest uppercase text-vip-crimson/80">
          The ten rooms — Audio, Video, The Circle, the Vaults, the Boardroom, and beyond — are next to be built here.
        </div>
        <Link
          href="/surface"
          className="mt-4 text-xs tracking-widest uppercase text-vip-ivory/30 hover:text-vip-amber transition-colors"
        >
          ← Back to the Surface
        </Link>
      </div>
    </main>
  )
}
