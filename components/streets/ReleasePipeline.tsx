'use client'

import { useState } from 'react'

const STAGES = ['Submitted', 'In Review', 'Signed', 'Released'] as const
type Stage = (typeof STAGES)[number]

export default function ReleasePipeline() {
  const [status, setStatus] = useState<Stage | null>(null)

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-1">Label Pipeline</p>
      <p className="text-ivory/30 text-xs mb-5">
        Submit this project to the label for release consideration — Spotify and iTunes distribution
        run through this pipeline once a project is signed.
      </p>

      <div className="flex items-center gap-1 mb-6">
        {STAGES.map((stage, i) => {
          const currentIdx = status ? STAGES.indexOf(status) : -1
          const reached = i <= currentIdx
          return (
            <div key={stage} className="flex-1 flex items-center gap-1">
              <div className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full h-1 rounded ${reached ? 'bg-streets-cyan' : 'bg-white/10'}`}
                />
                <p
                  className={`text-[10px] tracking-widest uppercase ${
                    reached ? 'text-streets-cyan' : 'text-ivory/30'
                  }`}
                >
                  {stage}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {status === null ? (
        <button
          onClick={() => setStatus('Submitted')}
          className="px-5 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          Submit for Release
        </button>
      ) : status === 'Submitted' ? (
        <p className="text-ivory/40 text-xs">
          Submitted. Advancing past this stage requires real A&amp;R review — not something a member
          can self-advance, and not wired to a backend yet.
        </p>
      ) : (
        <p className="text-ivory/40 text-xs">Status: {status}</p>
      )}
    </div>
  )
}
