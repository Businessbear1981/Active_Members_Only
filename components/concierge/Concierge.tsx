'use client'

import { useState, useRef } from 'react'
import { concierge } from '@/lib/config'

export default function Concierge() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; routed?: boolean }[]>([
    { role: 'assistant', text: concierge.greeting },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text }])
    setLoading(true)

    const res = await fetch('/api/concierge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })

    const data = await res.json()
    setMessages(m => [...m, { role: 'assistant', text: data.reply ?? '...', routed: data.routedToHuman }])
    setLoading(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-midnight border border-brass/50 flex items-center justify-center text-brass hover:bg-brass/10 transition-colors shadow-xl"
        aria-label="Open concierge"
      >
        {open ? '✕' : '✦'}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 gate-card flex flex-col" style={{ maxHeight: '480px' }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-xs tracking-widest uppercase brass">{concierge.name}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ maxHeight: '300px' }}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
                <p className={`text-sm leading-relaxed font-serif ${m.role === 'assistant' ? 'text-ivory/80' : 'text-brass'}`}>
                  {m.text}
                </p>
                {m.routed && (
                  <p className="mt-1 text-[0.6rem] tracking-widest uppercase text-brass/60">→ Routing to the label</p>
                )}
              </div>
            ))}
            {loading && (
              <p className="text-sm text-ivory/30 font-serif italic">…</p>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask the Concierge…"
              className="flex-1 bg-transparent text-ivory text-sm focus:outline-none placeholder-ivory/20"
            />
            <button
              onClick={send}
              disabled={loading}
              className="text-brass text-xs tracking-widest disabled:opacity-30"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
