'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { pieces, getArtist } from '@/lib/config'

// Group pieces into sections by artist
function buildSections() {
  const byArtist: Record<string, typeof pieces> = {}
  for (const p of pieces) {
    if (!byArtist[p.artistSlug]) byArtist[p.artistSlug] = []
    byArtist[p.artistSlug].push(p)
  }
  return Object.entries(byArtist).map(([slug, artistPieces]) => ({
    artistSlug: slug,
    pieces: artistPieces,
  }))
}

export default function PaintingReel() {
  const sections = buildSections()
  const [sectionIdx, setSectionIdx] = useState(0)
  const [pieceIdx, setPieceIdx] = useState(0)

  const section = sections[sectionIdx]
  const artist = getArtist(section?.artistSlug ?? '')
  const piece = section?.pieces[pieceIdx]

  const advance = useCallback(() => {
    const nextPiece = pieceIdx + 1
    if (nextPiece < section.pieces.length) {
      setPieceIdx(nextPiece)
    } else {
      const nextSection = sectionIdx + 1
      if (nextSection < sections.length) {
        setSectionIdx(nextSection)
        setPieceIdx(0)
      }
    }
  }, [pieceIdx, sectionIdx, section, sections])

  function jumpSection(idx: number) {
    setSectionIdx(idx)
    setPieceIdx(0)
  }

  if (!piece || !artist) return null

  const totalPieces = sections.reduce((a, s) => a + s.pieces.length, 0)

  return (
    <div className="mx-auto mt-16 max-w-5xl">

      {/* Artist tabs */}
      {sections.length > 1 && (
        <div className="flex flex-wrap border border-brass/20 rounded-t-sm overflow-hidden">
          {sections.map((s, i) => {
            const a = getArtist(s.artistSlug)
            return (
              <button
                key={s.artistSlug}
                onClick={() => jumpSection(i)}
                className={`flex-1 min-w-[80px] px-4 py-3 text-left transition-all border-r border-brass/20 last:border-r-0 ${
                  i === sectionIdx
                    ? 'bg-brass/15 text-brass'
                    : 'bg-midnight/60 text-ivory/50 hover:text-ivory/80 hover:bg-brass/5'
                }`}
              >
                <span className="block text-[0.6rem] uppercase tracking-[0.3em] font-sans">
                  {a?.shortName ?? a?.name}
                </span>
                <span className="block mt-0.5 text-[0.6rem] uppercase tracking-[0.25em] opacity-50 font-sans">
                  {s.pieces.length} works
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Painting display */}
      <div
        className={`relative overflow-hidden bg-midnight cursor-pointer ${sections.length > 1 ? 'border-x border-brass/20' : 'border border-brass/20 rounded-sm'}`}
        onClick={advance}
      >
        <div className="relative aspect-[16/9]">
          <Image
            key={piece.slug}
            src={piece.heroImage}
            alt={piece.title}
            fill
            className="object-contain object-center transition-opacity duration-700"
            priority
          />
        </div>

        {/* Chapter badge */}
        {sections.length > 1 && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <div className="bg-midnight/70 border border-brass/30 px-3 py-1.5 backdrop-blur-sm">
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-brass/70 font-sans">
                {sectionIdx + 1} / {sections.length}
              </p>
            </div>
          </div>
        )}

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/95 via-midnight/50 to-transparent pt-16 pb-5 px-6 pointer-events-none">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-brass/65 font-sans">
            {artist.era} · {artist.nationality}
          </p>
          <h2 className="mt-1 font-serif text-3xl text-ivory">{piece.title}</h2>
          <p className="mt-1 text-sm text-brass/80 font-serif italic">
            {piece.year} · {piece.medium}
          </p>
        </div>

        {/* Pip indicators */}
        <div className="absolute bottom-5 right-6 flex items-center gap-1.5 pointer-events-none">
          {section.pieces.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === pieceIdx ? 'w-5 h-1 bg-brass' : 'w-1 h-1 bg-ivory/25'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border border-t-0 border-brass/20 bg-midnight/40 px-6 py-3 rounded-b-sm">
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-ivory/35 font-sans">
          {totalPieces} works · click to advance
        </p>
        <Link
          href={`/piece/${piece.slug}`}
          className="text-[0.6rem] uppercase tracking-[0.3em] text-brass/75 hover:text-brass transition-colors font-sans"
          onClick={e => e.stopPropagation()}
        >
          View this piece →
        </Link>
      </div>

    </div>
  )
}
