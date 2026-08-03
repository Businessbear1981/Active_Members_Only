import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSpace } from '@/lib/config'

export default async function VipOfferingPage({
  params,
}: {
  params: Promise<{ room: string; item: string }>
}) {
  const { room, item } = await params
  const offering = getSpace(item)

  if (!offering || offering.tier !== 'vip' || offering.parentSlug !== room) notFound()

  const parent = getSpace(room)

  return (
    <main className="min-h-screen bg-vip-bg px-6 py-24 flex flex-col items-center text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-vip-amber opacity-70">
        VIP SANCTUM · {parent?.title ?? room}
      </p>
      <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-vip-ivory mt-3">{offering.title}</h1>
      <p className="text-sm text-vip-ivory/50 max-w-md mt-4 leading-relaxed">{offering.tagline}</p>

      {offering.detail && (
        <p className="text-sm text-vip-ivory/40 max-w-md mt-6 leading-relaxed border-t border-vip-crimson/30 pt-6">
          {offering.detail}
        </p>
      )}

      {offering.meta && (
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 mt-8 text-left">
          {Object.entries(offering.meta).map(([key, value]) => (
            <div key={key}>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-vip-amber/60">{key}</p>
              <p className="text-sm text-vip-ivory/80 mt-1">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="border border-vip-crimson/40 px-6 py-4 mt-10 text-xs tracking-widest uppercase text-vip-crimson/70 max-w-md">
        Listed only — checkout/acquisition flow isn&apos;t wired to Stripe yet.
      </div>

      <Link
        href={`/vip/${room}`}
        className="mt-10 text-xs tracking-widest uppercase text-vip-ivory/30 hover:text-vip-amber transition-colors"
      >
        ← {parent?.title ?? 'Back'}
      </Link>
    </main>
  )
}
