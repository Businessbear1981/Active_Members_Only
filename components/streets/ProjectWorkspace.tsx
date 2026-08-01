'use client'

import { useState } from 'react'
import Arranger, { type LibraryItem } from '@/components/streets/Arranger'
import SampleSearch from '@/components/streets/SampleSearch'
import RecordingSpaces from '@/components/streets/RecordingSpaces'
import EngineeringLiveSession from '@/components/streets/EngineeringLiveSession'

export default function ProjectWorkspace() {
  const [injectedItems, setInjectedItems] = useState<LibraryItem[]>([])

  function handleAdd(item: LibraryItem) {
    setInjectedItems(prev => [...prev, item])
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="border border-white/10 rounded p-5 bg-black/10">
        <RecordingSpaces onAdd={handleAdd} />
      </section>

      <section className="border border-white/10 rounded p-5 bg-black/10">
        <SampleSearch onAdd={handleAdd} />
      </section>

      <section className="border border-white/10 rounded p-5 bg-black/10">
        <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">Engineering Room</p>
        <EngineeringLiveSession />
      </section>

      <section>
        <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">Engineering Room — Arranger</p>
        <Arranger injectedItems={injectedItems} />
      </section>
    </div>
  )
}
