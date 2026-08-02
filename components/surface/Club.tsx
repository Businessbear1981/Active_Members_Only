'use client'

import { useState } from 'react'

interface Profile {
  id: string
  name: string
  role: string
  genre: string
  location: string
}

export default function Club() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [genre, setGenre] = useState('')
  const [location, setLocation] = useState('')
  const [index, setIndex] = useState(0)
  const [matches, setMatches] = useState<Profile[]>([])

  function joinClub() {
    if (!name.trim()) return
    setProfiles(prev => [
      ...prev,
      { id: `${Date.now()}`, name: name.trim(), role: role || 'Member', genre: genre || 'Unspecified', location: location || 'Unspecified' },
    ])
    setName('')
    setRole('')
    setGenre('')
    setLocation('')
  }

  const current = profiles[index]

  function decide(matched: boolean) {
    if (matched && current) setMatches(prev => [...prev, current])
    setIndex(i => i + 1)
  }

  return (
    <div className="max-w-md mx-auto text-left">
      <div className="border border-pink-500/30 rounded-lg p-6 bg-black/20 mb-10">
        <p className="text-[11px] tracking-widest uppercase text-pink-400 mb-4">Join The Club</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className="col-span-2 bg-navy border border-pink-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-pink-400" />
          <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role (Producer, Vocalist...)"
            className="col-span-2 bg-navy border border-pink-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-pink-400" />
          <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre"
            className="bg-navy border border-pink-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-pink-400" />
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"
            className="bg-navy border border-pink-500/30 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-pink-400" />
        </div>
        <button
          onClick={joinClub}
          className="w-full px-4 py-3 border border-pink-500/60 text-pink-400 text-xs tracking-widest uppercase hover:bg-pink-500/10 transition-colors"
        >
          Add My Profile
        </button>
      </div>

      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">
        Discover {profiles.length > 0 && `(${Math.max(profiles.length - index, 0)} left)`}
      </p>

      {current ? (
        <div className="bg-deep-gray border-2 border-pink-600/50 rounded-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-pink-950/40 to-navy flex items-center justify-center">
            <p className="text-pink-400/50 text-4xl font-serif">{current.name[0]?.toUpperCase()}</p>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white">{current.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{current.role} · {current.genre} · {current.location}</p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => decide(true)}
                className="flex-1 bg-pink-600 hover:bg-pink-700 py-2 rounded text-white font-bold text-sm transition-colors"
              >
                ❤ Match
              </button>
              <button
                onClick={() => decide(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-gray-200 text-sm transition-colors"
              >
                ✕ Pass
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-ivory/20 text-xs uppercase tracking-widest text-center py-10 border border-dashed border-white/10 rounded">
          {profiles.length === 0 ? 'No members yet — add your profile above.' : "That's everyone for now."}
        </p>
      )}

      {matches.length > 0 && (
        <div className="mt-8">
          <p className="text-[11px] tracking-widest uppercase text-pink-400 mb-2">Your Matches ({matches.length})</p>
          <div className="flex flex-wrap gap-2">
            {matches.map(m => (
              <span key={m.id} className="px-3 py-1 border border-pink-500/40 rounded-full text-xs text-pink-300">
                {m.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
