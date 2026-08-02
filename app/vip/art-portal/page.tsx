import Link from 'next/link'
import RotatingGallery from '@/components/vip/RotatingGallery'

export default function ArtPortalPage() {
  return (
    <main className="min-h-screen bg-vip-bg px-6 py-20">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-vip-amber opacity-70">VIP SANCTUM</p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-vip-ivory mt-3">Art / Portal Room</h1>
        <p className="text-sm text-vip-ivory/50 mt-4">
          The rotating art mechanic carried over from HALO/NVAI — click-to-advance, one piece at a
          time. Real image upload, real rotation. This same mechanic is the future portal-jump
          navigation once the transition work is built.
        </p>
      </div>

      <RotatingGallery />

      <div className="text-center mt-14">
        <Link
          href="/vip"
          className="text-xs tracking-widest uppercase text-vip-ivory/30 hover:text-vip-amber transition-colors"
        >
          ← All rooms
        </Link>
      </div>
    </main>
  )
}
