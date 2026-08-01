'use client'

import { useState } from 'react'

type Role = 'Producer' | 'Vocalist' | 'Rapper' | 'Engineer' | 'Songwriter' | 'Guest Producer'

interface RosterArtist {
  id: string
  name: string
  role: Role
  genre: string
}

const ROLES: Role[] = ['Producer', 'Vocalist', 'Rapper', 'Engineer', 'Songwriter', 'Guest Producer']

export default function LabelRoster() {
  const [artists, setArtists] = useState<RosterArtist[]>([])
  const [name, setName] = useState('')
  const [role, setRole] = useState<Role>('Producer')
  const [genre, setGenre] = useState('')

  function addArtist() {
    if (!name.trim()) return
    setArtists(prev => [
      ...prev,
      { id: `${Date.now()}`, name: name.trim(), role, genre: genre.trim() || 'Unspecified' },
    ])
    setName('')
    setGenre('')
  }

  function removeArtist(id: string) {
    setArtists(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-1">
        {artists.length} on the roster
      </p>
      <p className="text-ivory/30 text-xs mb-6">
        Open roster — anyone joining the label to find collaborators shows up here.
      </p>

      <div className="flex flex-col gap-2 mb-6">
        {artists.map(a => (
          <div
            key={a.id}
            className="flex items-center justify-between px-4 py-3 border border-white/10 bg-white/[0.02] rounded"
          >
            <div>
              <span className="text-ivory/90 text-sm">{a.name}</span>
              <span className="text-streets-purple text-[10px] tracking-widest uppercase ml-2">{a.role}</span>
              <span className="text-ivory/30 text-xs ml-2">· {a.genre}</span>
            </div>
            <button
              onClick={() => removeArtist(a.id)}
              className="text-ivory/30 hover:text-ivory/70 text-xs"
              aria-label={`Remove ${a.name}`}
            >
              ×
            </button>
          </div>
        ))}
        {artists.length === 0 && (
          <p className="text-ivory/20 text-xs uppercase tracking-widest text-center py-6 border border-dashed border-white/10 rounded">
            No one on the roster yet — be the first.
          </p>
        )}
      </div>

      <div className="flex gap-2 flex-wrap justify-center border-t border-white/10 pt-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addArtist()}
          placeholder="Your name / artist name"
          className="flex-1 min-w-[160px] bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value as Role)}
          className="bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        >
          {ROLES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <input
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre / lane"
          className="w-32 bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        />
        <button
          onClick={addArtist}
          className="px-5 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          Join the Roster
        </button>
      </div>
    </div>
  )
}
