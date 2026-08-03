'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Space } from '@/types/platform'

// Generalized descendant of HALO's PaintingReel — same click-to-advance,
// pip-indicator, chapter-badge mechanic, now driven by real Space data
// (room-within-room) instead of hardcoded artists/pieces.
export default function OfferingsReel({ roomSlug, offerings }: { roomSlug: string; offerings: Space[] }) {
  const [index, setIndex] = useState(0)
  const offering = offerings[index]

  function advance() {
    setIndex(i => (i + 1) % offerings.length)
  }

  if (!offering) return null

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className="relative overflow-hidden bg-vip-bg border border-vip-crimson/40 cursor-pointer"
        onClick={advance}
      >
        <div className="relative aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-vip-crimson/20 via-vip-bg to-vip-amber/10">
          <p className="font-serif text-3xl text-vip-ivory/30 px-10 text-center">{offering.title}</p>
        </div>

        {offerings.length > 1 && (
          <div className="absolute top-4 right-4 bg-vip-bg/70 border border-vip-amber/30 px-3 py-1.5 backdrop-blur-sm pointer-events-none">
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-vip-amber/70">
              {index + 1} / {offerings.length}
            </p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vip-bg/95 via-vip-bg/60 to-transparent pt-16 pb-5 px-6 pointer-events-none">
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-vip-amber/65">{offering.meta?.producer ?? offering.meta?.status ?? ''}</p>
          <h3 className="mt-1 font-serif text-2xl text-vip-ivory">{offering.title}</h3>
          <p className="mt-1 text-sm text-vip-ivory/60">{offering.tagline}</p>
        </div>

        {offerings.length > 1 && (
          <div className="absolute bottom-5 right-6 flex items-center gap-1.5 pointer-events-none">
            {offerings.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === index ? 'w-5 h-1 bg-vip-amber' : 'w-1 h-1 bg-vip-ivory/25'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border border-t-0 border-vip-crimson/40 bg-vip-bg/60 px-6 py-3">
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-vip-ivory/35">
          {offerings.length} offering{offerings.length === 1 ? '' : 's'} · click to advance
        </p>
        <Link
          href={`/vip/${roomSlug}/${offering.slug}`}
          onClick={e => e.stopPropagation()}
          className="text-[0.6rem] uppercase tracking-[0.3em] text-vip-amber/75 hover:text-vip-amber transition-colors"
        >
          View this piece →
        </Link>
      </div>
    </div>
  )
}
