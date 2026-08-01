'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { gate } from '@/lib/config'

const ROLE_LABELS: Record<string, string> = {
  signed:  'Membership Access',
  premium: 'Premium Membership',
  vip:     'VIP Sanctum Invitation',
}

export default function GatePage() {
  const params = useParams()
  const role = params.role as string
  const label = ROLE_LABELS[role] ?? role

  const [form, setForm] = useState({ name: '', email: '', firm: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/gate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role }),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <div className="gate-card max-w-md w-full p-10 text-center">
          <p className="brass text-xs tracking-widest uppercase mb-4">Request Received</p>
          <h2 className="font-serif text-2xl mb-4">Thank you, {form.name}.</h2>
          <p className="text-ivory/60 text-sm leading-relaxed">
            We will review your request and send the {gate.documentName} to {form.email} within 24 hours.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-6 py-20">
      <div className="gate-card max-w-lg w-full p-10">

        <p className="brass text-xs tracking-widest uppercase mb-2">{gate.documentLabel}</p>
        <h1 className="font-serif text-3xl mb-2">Request Access</h1>
        <p className="text-ivory/50 text-sm mb-8">{label}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs tracking-widest uppercase text-ivory/40 block mb-2">Full Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-ivory px-4 py-3 text-sm focus:outline-none focus:border-brass/50"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-ivory/40 block mb-2">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-ivory px-4 py-3 text-sm focus:outline-none focus:border-brass/50"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-ivory/40 block mb-2">Firm / Institution</label>
            <input
              type="text"
              value={form.firm}
              onChange={e => setForm(f => ({ ...f, firm: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-ivory px-4 py-3 text-sm focus:outline-none focus:border-brass/50"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-ivory/40 block mb-2">Message (optional)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-ivory px-4 py-3 text-sm focus:outline-none focus:border-brass/50 resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 border border-brass/60 text-brass text-sm tracking-widest uppercase hover:bg-brass/10 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Submit Request'}
          </button>
        </form>

      </div>
    </main>
  )
}
