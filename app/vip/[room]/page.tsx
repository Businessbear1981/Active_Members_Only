import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSpace } from '@/lib/config'
import { VIP_ROOM_IMAGES } from '@/lib/vipRoomImages'

export default async function VipRoomPage({ params }: { params: Promise<{ room: string }> }) {
  const { room } = await params
  const space = getSpace(room)

  if (!space || space.tier !== 'vip') notFound()

  const image = VIP_ROOM_IMAGES[room]

  return (
    <main className="min-h-screen bg-vip-bg px-6 py-24 flex flex-col items-center text-center">
      {image && (
        <div className="relative w-full max-w-2xl aspect-[16/9] border border-vip-crimson/40 overflow-hidden mb-10">
          <Image src={image} alt={space.title} fill className="object-cover" priority />
        </div>
      )}

      <p className="text-xs tracking-[0.4em] uppercase text-vip-amber opacity-70">VIP SANCTUM</p>
      <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-vip-ivory mt-3">{space.title}</h1>
      <p className="text-sm text-vip-ivory/50 max-w-md mt-4 leading-relaxed">{space.tagline}</p>

      <div className="border border-vip-crimson/40 px-6 py-4 mt-10 text-xs tracking-widest uppercase text-vip-crimson/70 max-w-md">
        Room shell only — full functionality for {space.title} is a build item on the roadmap, not live yet.
      </div>

      <Link
        href="/vip"
        className="mt-10 text-xs tracking-widest uppercase text-vip-ivory/30 hover:text-vip-amber transition-colors"
      >
        ← All rooms
      </Link>
    </main>
  )
}
