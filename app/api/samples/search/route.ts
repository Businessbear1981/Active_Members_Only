import { NextRequest, NextResponse } from 'next/server'
import { SAMPLE_CATALOG } from '@/lib/sampleCatalog'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.toLowerCase().trim() ?? ''
  const genre = searchParams.get('genre') ?? ''
  const minBpm = Number(searchParams.get('minBpm') ?? 0)
  const maxBpm = Number(searchParams.get('maxBpm') ?? 999)

  const results = SAMPLE_CATALOG.filter(entry => {
    const matchesQuery =
      !q ||
      entry.title.toLowerCase().includes(q) ||
      entry.tags.some(tag => tag.toLowerCase().includes(q))
    const matchesGenre = !genre || genre === 'All' || entry.genre === genre
    const matchesBpm = entry.bpm === 0 || (entry.bpm >= minBpm && entry.bpm <= maxBpm)
    return matchesQuery && matchesGenre && matchesBpm
  })

  return NextResponse.json({ results, total: results.length, source: 'local-catalog' })
}
