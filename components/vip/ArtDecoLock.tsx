'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'amo-vip-unlocked'
// Demo-only code, checked client-side. Real validation (per-member invite
// codes, checked server-side against Supabase) is a build item once the
// database exists — this proves the mechanic, not the security model.
const DEMO_CODE = 'SANCTUM'

function SunburstCorner({ flip }: { flip?: 'x' | 'y' | 'xy' }) {
  const transform =
    flip === 'x' ? 'scale(-1,1)' : flip === 'y' ? 'scale(1,-1)' : flip === 'xy' ? 'scale(-1,-1)' : undefined
  return (
    <svg
      viewBox="0 0 80 80"
      className="absolute w-14 h-14"
      style={{ transform }}
    >
      <g stroke="#8A6A2F" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 5) * (Math.PI / 2)
          const x2 = Math.cos(angle) * 34
          const y2 = Math.sin(angle) * 34
          return <line key={i} x1="0" y1="0" x2={x2} y2={y2} />
        })}
      </g>
    </svg>
  )
}

export default function ArtDecoLock({ children }: { children: React.ReactNode }) {
  // Default to locked so the gate renders immediately on first paint —
  // no blank flash while sessionStorage is checked client-side.
  const [unlocked, setUnlocked] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') setUnlocked(true)
  }, [])

  function attemptUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (code.trim().toUpperCase() === DEMO_CODE) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setCode('')
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <main className="min-h-screen bg-vip-bg flex items-center justify-center px-6">
      <div className="relative w-full max-w-sm border-2 border-vip-amber/50 p-10 bg-black/40">
        <SunburstCorner />
        <div className="absolute top-2 right-2"><SunburstCorner flip="x" /></div>
        <div className="absolute bottom-2 left-2"><SunburstCorner flip="y" /></div>
        <div className="absolute bottom-2 right-2"><SunburstCorner flip="xy" /></div>

        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.5em] uppercase text-vip-amber/70 mb-3">The Final Gate</p>
          <h1 className="font-serif text-2xl tracking-widest text-vip-ivory">VIP SANCTUM</h1>
          <div className="w-16 h-px bg-vip-amber/40 mx-auto mt-4" />
        </div>

        <form onSubmit={attemptUnlock} className="flex flex-col items-center gap-4">
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="ENTER CODE"
            autoFocus
            className={`w-full text-center tracking-[0.4em] uppercase bg-black/40 border ${
              error ? 'border-red-500 text-red-400' : 'border-vip-amber/40 text-vip-ivory'
            } py-3 text-sm focus:outline-none focus:border-vip-amber transition-colors`}
          />
          {error && (
            <p className="text-red-400 text-[10px] tracking-widest uppercase">Incorrect — try again</p>
          )}
          <button
            type="submit"
            className="w-full py-3 border border-vip-amber/60 text-vip-amber text-xs tracking-[0.4em] uppercase hover:bg-vip-amber/10 transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  )
}
