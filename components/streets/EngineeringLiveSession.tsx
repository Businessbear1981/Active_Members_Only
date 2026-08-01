'use client'

import { useState, useRef } from 'react'

export default function EngineeringLiveSession() {
  const [isLive, setIsLive] = useState(false)
  const [error, setError] = useState('')
  const [kickStatus, setKickStatus] = useState('')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  async function goLive() {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsLive(true)
    } catch {
      setError('Camera/microphone access denied or unavailable.')
    }
  }

  function endSession() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setIsLive(false)
  }

  async function goLiveOnKick() {
    setKickStatus('Checking Kick…')
    const res = await fetch('/api/livestream/kick', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Live from the Engineering Room' }),
    })
    const data = await res.json()
    setKickStatus(data.message ?? 'Kick is not configured yet.')
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-1">Live Session</p>
      <p className="text-ivory/30 text-xs mb-4">
        Your own camera/mic preview is real. Artist ↔ engineer peer-to-peer streaming and pushing to
        Kick both need a signaling/streaming backend that isn&apos;t wired yet — this is the real
        starting point for that, not a finished feature.
      </p>

      <div className="aspect-video max-w-md bg-black rounded border border-white/10 overflow-hidden mb-4 flex items-center justify-center">
        {isLive ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
        ) : (
          <p className="text-ivory/20 text-xs uppercase tracking-widest">Preview off</p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={isLive ? endSession : goLive}
          className={`px-4 py-2 border text-xs tracking-widest uppercase transition-colors ${
            isLive
              ? 'border-red-500 text-red-400 bg-red-500/10'
              : 'border-streets-cyan/60 text-streets-cyan hover:bg-streets-cyan/10'
          }`}
        >
          {isLive ? 'End Session' : 'Start Camera Preview'}
        </button>
        <button
          onClick={goLiveOnKick}
          className="px-4 py-2 border border-purple-500/60 text-purple-300 text-xs tracking-widest uppercase hover:bg-purple-500/10 transition-colors"
        >
          Push to Kick
        </button>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
      {kickStatus && <p className="text-ivory/40 text-xs mt-2">{kickStatus}</p>}
    </div>
  )
}
