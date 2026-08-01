'use client'

import { useState } from 'react'
import type { SampleEntry } from '@/lib/sampleCatalog'
import type { LibraryItem } from '@/components/streets/Arranger'

const GENRES = ['All', 'Hip-Hop', 'R&B', 'Gospel', 'FX', 'Drill', 'Electronic', 'Pop', 'Trap']

export default function SampleSearch({ onAdd }: { onAdd: (item: LibraryItem) => void }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [results, setResults] = useState<SampleEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState<Set<string>>(new Set())

  async function search() {
    setLoading(true)
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (genre !== 'All') params.set('genre', genre)
    const res = await fetch(`/api/samples/search?${params.toString()}`)
    const data = await res.json()
    setResults(data.results)
    setLoading(false)
  }

  function handleAdd(entry: SampleEntry) {
    onAdd({
      id: `catalog-${entry.id}`,
      label: entry.title,
      color: 'bg-streets-purple/70',
    })
    setAdded(prev => new Set(prev).add(entry.id))
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-1">Sample Search</p>
      <p className="text-ivory/30 text-xs mb-4">
        Local catalog — the same search API this hits will call Splice once real credentials are wired
        in, no UI changes needed.
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="Search samples, tags..."
          className="flex-1 min-w-[160px] bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        />
        <select
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        >
          {GENRES.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button
          onClick={search}
          className="px-5 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {results.map(entry => (
          <div
            key={entry.id}
            className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/[0.02] rounded"
          >
            <div>
              <span className="text-ivory/90 text-sm">{entry.title}</span>
              <span className="text-ivory/30 text-xs ml-2">
                {entry.genre} {entry.bpm > 0 ? `· ${entry.bpm} BPM` : ''} {entry.key !== 'N/A' ? `· ${entry.key}` : ''}
              </span>
            </div>
            <button
              onClick={() => handleAdd(entry)}
              disabled={added.has(entry.id)}
              className="text-xs tracking-widest uppercase text-streets-purple hover:text-streets-cyan disabled:text-ivory/20 transition-colors"
            >
              {added.has(entry.id) ? 'Added' : '+ Add'}
            </button>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-ivory/20 text-xs uppercase tracking-widest text-center py-4">
            No search run yet.
          </p>
        )}
      </div>
    </div>
  )
}
