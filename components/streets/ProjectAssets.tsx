'use client'

import { useState } from 'react'

interface AlbumArt {
  id: string
  name: string
  url: string
}

interface LyricEntry {
  id: string
  label: string
  text: string
}

interface Contract {
  id: string
  name: string
  party: string
}

function AlbumArtPanel() {
  const [art, setArt] = useState<AlbumArt[]>([])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setArt(prev => [...prev, { id: `${Date.now()}`, name: file.name, url }])
    e.target.value = ''
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">Album Art</p>
      <div className="flex gap-3 flex-wrap mb-3">
        {art.map(a => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={a.id}
            src={a.url}
            alt={a.name}
            className="w-20 h-20 object-cover rounded border border-white/10"
          />
        ))}
      </div>
      <label className="inline-block px-4 py-2 border border-streets-purple/60 text-streets-purple text-xs tracking-widest uppercase hover:bg-streets-purple/10 transition-colors cursor-pointer">
        Upload Cover Art
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    </div>
  )
}

function LyricsPanel() {
  const [entries, setEntries] = useState<LyricEntry[]>([])
  const [label, setLabel] = useState('')
  const [text, setText] = useState('')

  function addEntry() {
    if (!label.trim() || !text.trim()) return
    setEntries(prev => [...prev, { id: `${Date.now()}`, label: label.trim(), text: text.trim() }])
    setLabel('')
    setText('')
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">Rhymes &amp; Hooks</p>
      <div className="flex flex-col gap-2 mb-3">
        {entries.map(entry => (
          <div key={entry.id} className="px-3 py-2 border border-white/10 bg-white/[0.02] rounded">
            <p className="text-streets-cyan text-[10px] tracking-widest uppercase mb-1">{entry.label}</p>
            <p className="text-ivory/70 text-sm whitespace-pre-wrap">{entry.text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Label (e.g. Hook, Verse 1)"
          className="bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write the bars..."
          rows={3}
          className="bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan resize-none"
        />
        <button
          onClick={addEntry}
          className="self-start px-4 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

function ContractsPanel() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [name, setName] = useState('')
  const [party, setParty] = useState('')

  function addContract() {
    if (!name.trim() || !party.trim()) return
    setContracts(prev => [...prev, { id: `${Date.now()}`, name: name.trim(), party: party.trim() }])
    setName('')
    setParty('')
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">Contracts Repo</p>
      <div className="flex flex-col gap-2 mb-3">
        {contracts.map(c => (
          <div
            key={c.id}
            className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/[0.02] rounded"
          >
            <span className="text-ivory/80 text-sm">{c.name}</span>
            <span className="text-ivory/40 text-xs">{c.party}</span>
          </div>
        ))}
        {contracts.length === 0 && (
          <p className="text-ivory/20 text-xs uppercase tracking-widest">No contracts on file for this project.</p>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Agreement name"
          className="flex-1 min-w-[140px] bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        />
        <input
          value={party}
          onChange={e => setParty(e.target.value)}
          placeholder="Counterparty"
          className="flex-1 min-w-[120px] bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
        />
        <button
          onClick={addContract}
          className="px-4 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          File
        </button>
      </div>
      <p className="text-ivory/20 text-[11px] mt-3">
        Index only — actual document storage/e-signature isn&apos;t wired yet.
      </p>
    </div>
  )
}

const TABS = ['Album Art', 'Rhymes & Hooks', 'Contracts'] as const
type Tab = (typeof TABS)[number]

export default function ProjectAssets() {
  const [tab, setTab] = useState<Tab>('Album Art')

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs tracking-widest uppercase transition-colors ${
              tab === t
                ? 'text-streets-cyan border-b-2 border-streets-cyan'
                : 'text-ivory/40 hover:text-ivory/70'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Album Art' && <AlbumArtPanel />}
      {tab === 'Rhymes & Hooks' && <LyricsPanel />}
      {tab === 'Contracts' && <ContractsPanel />}
    </div>
  )
}
