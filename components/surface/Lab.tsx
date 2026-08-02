'use client'

import { useState, useRef } from 'react'

interface Beat {
  id: string
  title: string
  bpm: string
  key: string
  genre: string
  url: string
  plays: number
}

const GENRES = ['Hip-Hop', 'R&B', 'Electronic', 'Pop', 'Trap', 'Drill']

function WaveformBars({ playing }: { playing: boolean }) {
  const bars = useRef(Array.from({ length: 40 }, () => 20 + Math.random() * 60)).current
  return (
    <div className="flex items-center gap-[2px] h-12">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-cyan-400 rounded-full"
          style={{
            height: playing ? `${20 + Math.random() * 60}%` : `${h}%`,
            transition: 'height 150ms ease',
            animation: playing ? `pulse-${i % 3} 0.6s ease-in-out infinite alternate` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function Lab() {
  const [beats, setBeats] = useState<Beat[]>([])
  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState('')
  const [key, setKey] = useState('')
  const [genre, setGenre] = useState(GENRES[0])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !title.trim()) return
    const url = URL.createObjectURL(file)
    setBeats(prev => [
      { id: `${Date.now()}`, title: title.trim(), bpm: bpm || '—', key: key || '—', genre, url, plays: 0 },
      ...prev,
    ])
    setTitle('')
    setBpm('')
    setKey('')
    e.target.value = ''
  }

  function togglePlay(beat: Beat) {
    if (!audioRef.current) audioRef.current = new Audio()
    const audio = audioRef.current
    if (playingId === beat.id) {
      audio.pause()
      setPlayingId(null)
      return
    }
    audio.src = beat.url
    audio.play()
    setPlayingId(beat.id)
    setBeats(prev => prev.map(b => (b.id === beat.id ? { ...b, plays: b.plays + 1 } : b)))
    audio.onended = () => setPlayingId(null)
  }

  const trending = [...beats].sort((a, b) => b.plays - a.plays)

  return (
    <div className="max-w-2xl mx-auto text-left">
      <div className="border border-cyan-500/30 rounded-lg p-6 bg-black/20 mb-10">
        <p className="text-[11px] tracking-widest uppercase text-cyan-400 mb-4">Upload Beat</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="col-span-2 bg-navy border border-cyan-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-cyan-400"
          />
          <input
            value={bpm}
            onChange={e => setBpm(e.target.value)}
            placeholder="BPM"
            className="bg-navy border border-cyan-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-cyan-400"
          />
          <input
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="Key"
            className="bg-navy border border-cyan-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-cyan-400"
          />
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="col-span-2 bg-navy border border-cyan-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-cyan-400"
          >
            {GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <label
          className={`block text-center px-4 py-3 border text-xs tracking-widest uppercase transition-colors cursor-pointer ${
            title.trim()
              ? 'border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10'
              : 'border-white/10 text-white/20 cursor-not-allowed'
          }`}
        >
          {title.trim() ? 'Choose Audio File & Publish' : 'Enter a title first'}
          <input
            type="file"
            accept="audio/*"
            disabled={!title.trim()}
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">
        Trending {trending.length > 0 && `(${trending.length})`}
      </p>
      <div className="flex flex-col gap-2">
        {trending.map((beat, i) => (
          <div
            key={beat.id}
            onClick={() => togglePlay(beat)}
            className={`flex items-center gap-4 px-4 py-3 border rounded cursor-pointer transition-colors ${
              playingId === beat.id
                ? 'border-cyan-400 bg-cyan-400/5'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
          >
            <span className="text-cyan-400 font-mono text-sm w-6">{i + 1}</span>
            <WaveformBars playing={playingId === beat.id} />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">{beat.title}</p>
              <p className="text-ivory/40 text-xs">{beat.genre} · {beat.bpm} BPM · {beat.key} · {beat.plays} plays</p>
            </div>
            <span className="text-cyan-400 text-lg">{playingId === beat.id ? '⏸' : '▶'}</span>
          </div>
        ))}
        {trending.length === 0 && (
          <p className="text-ivory/20 text-xs uppercase tracking-widest text-center py-8 border border-dashed border-white/10 rounded">
            No beats uploaded yet — be the first.
          </p>
        )}
      </div>
    </div>
  )
}
