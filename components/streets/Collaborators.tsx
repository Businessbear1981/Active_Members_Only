'use client'

import { useState } from 'react'

type Role = 'Owner' | 'Producer' | 'Guest Producer' | 'Vocalist' | 'Engineer' | 'Songwriter'

interface Collaborator {
  id: string
  name: string
  role: Role
}

const ROLES: Role[] = ['Producer', 'Guest Producer', 'Vocalist', 'Engineer', 'Songwriter']

export default function Collaborators() {
  const [members, setMembers] = useState<Collaborator[]>([
    { id: 'owner', name: 'You', role: 'Owner' },
  ])
  const [name, setName] = useState('')
  const [role, setRole] = useState<Role>('Producer')

  function addCollaborator() {
    if (!name.trim()) return
    setMembers(prev => [...prev, { id: `${Date.now()}`, name: name.trim(), role }])
    setName('')
  }

  function removeCollaborator(id: string) {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-3">Collaborators</p>

      <div className="flex flex-col gap-2 mb-4">
        {members.map(m => (
          <div
            key={m.id}
            className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/[0.02] rounded"
          >
            <div>
              <span className="text-ivory/90 text-sm">{m.name}</span>
              <span className="text-streets-purple text-[10px] tracking-widest uppercase ml-2">{m.role}</span>
            </div>
            {m.role !== 'Owner' && (
              <button
                onClick={() => removeCollaborator(m.id)}
                className="text-ivory/30 hover:text-ivory/70 text-xs"
                aria-label={`Remove ${m.name}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCollaborator()}
          placeholder="Collaborator name"
          className="flex-1 min-w-[140px] bg-black/30 border border-white/10 text-ivory text-sm px-3 py-2 rounded focus:outline-none focus:border-streets-cyan"
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
        <button
          onClick={addCollaborator}
          className="px-4 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}
