'use client'

import { useState, useRef } from 'react'
import { RECORDING_SPACES, buildProcessedStream, type RecordingSpaceId } from '@/lib/audioProcessing'
import type { LibraryItem } from '@/components/streets/Arranger'

export default function RecordingSpaces({ onAdd }: { onAdd: (item: LibraryItem) => void }) {
  const [selected, setSelected] = useState<RecordingSpaceId>('booth-a')
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const rawStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const space = RECORDING_SPACES.find(s => s.id === selected)!

  async function toggleRecording() {
    setError('')
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      return
    }
    try {
      const rawStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      rawStreamRef.current = rawStream

      const ctx = new AudioContext()
      audioContextRef.current = ctx
      const processedStream = buildProcessedStream(ctx, rawStream, selected)

      const recorder = new MediaRecorder(processedStream)
      chunksRef.current = []
      recorder.ondataavailable = e => chunksRef.current.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        onAdd({
          id: `rec-${Date.now()}`,
          label: `${space.name} — ${new Date().toLocaleTimeString()}`,
          color: selected === 'acoustic' ? 'bg-orange-500/70' : 'bg-red-500/70',
          url,
        })
        rawStream.getTracks().forEach(t => t.stop())
        ctx.close()
      }
      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
    } catch {
      setError('Microphone access denied or unavailable.')
    }
  }

  return (
    <div>
      <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-1">Recording Spaces</p>
      <p className="text-ivory/30 text-xs mb-4">
        Three vocal booths plus an acoustic room for live instruments — each applies real, distinct
        signal processing (EQ/compression/reverb via Web Audio), not just a label. What you record is
        actually shaped by the space you pick.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {RECORDING_SPACES.map(s => (
          <button
            key={s.id}
            onClick={() => !isRecording && setSelected(s.id)}
            disabled={isRecording}
            className={`text-left px-4 py-3 border rounded transition-colors ${
              selected === s.id
                ? 'border-red-500 bg-red-500/10'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            } disabled:opacity-50`}
          >
            <p className="text-ivory/90 text-sm font-medium">{s.name}</p>
            <p className="text-ivory/40 text-xs mt-1">{s.description}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleRecording}
          className={`px-4 py-2 border text-xs tracking-widest uppercase transition-colors ${
            isRecording
              ? 'border-red-500 text-red-400 bg-red-500/10'
              : 'border-red-500/60 text-red-400 hover:bg-red-500/10'
          }`}
        >
          {isRecording ? `● Stop — ${space.name}` : `● Record in ${space.name}`}
        </button>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    </div>
  )
}
