'use client'

import { useState, useRef, useId, useEffect } from 'react'
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core'
import { motion } from 'framer-motion'

export interface LibraryItem {
  id: string
  label: string
  color: string
  url?: string
}

interface PlacedClip {
  id: string
  label: string
  color: string
  url?: string
}

interface Track {
  id: string
  name: string
  clips: PlacedClip[]
}

const DEMO_LIBRARY: LibraryItem[] = [
  { id: 'lib-808', label: '808 Kick Loop', color: 'bg-streets-purple/70' },
  { id: 'lib-hats', label: 'Hi-Hat Pattern', color: 'bg-streets-purple/70' },
  { id: 'lib-hook', label: 'Vocal Hook', color: 'bg-streets-cyan/70' },
  { id: 'lib-verse', label: 'Rap Verse — SCO', color: 'bg-streets-cyan/70' },
  { id: 'lib-bass', label: 'Bassline', color: 'bg-amber-500/70' },
  { id: 'lib-pad', label: 'Synth Pad', color: 'bg-pink-500/70' },
]

const INITIAL_TRACKS: Track[] = [
  { id: 'vocals', name: 'Vocals', clips: [] },
  { id: 'beat', name: 'Beat', clips: [] },
  { id: 'bass', name: 'Bass', clips: [] },
  { id: 'fx', name: 'FX', clips: [] },
]

function LibraryChip({ item }: { item: LibraryItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { type: 'library', item },
  })

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={
        transform
          ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
          : undefined
      }
      className={`${item.color} ${isDragging ? 'opacity-40' : 'opacity-100'} px-3 py-2 rounded text-xs text-white font-medium text-left cursor-grab active:cursor-grabbing select-none whitespace-nowrap flex items-center gap-1`}
    >
      {item.url && <span title="Real audio">●</span>}
      {item.label}
    </button>
  )
}

function TrackLane({
  track,
  onRemoveClip,
  onPlayClip,
  playingClipId,
}: {
  track: Track
  onRemoveClip: (trackId: string, clipId: string) => void
  onPlayClip: (clip: PlacedClip) => void
  playingClipId: string | null
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `track-${track.id}`,
    data: { type: 'track', trackId: track.id },
  })

  return (
    <div className="flex items-stretch gap-3">
      <div className="w-20 shrink-0 flex items-center">
        <p className="text-[11px] tracking-widest uppercase text-ivory/50">{track.name}</p>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-16 rounded border ${isOver ? 'border-streets-cyan bg-streets-cyan/5' : 'border-white/10 bg-white/[0.02]'} flex items-center gap-2 px-3 py-2 flex-wrap transition-colors`}
      >
        {track.clips.length === 0 && (
          <p className="text-ivory/20 text-[11px] uppercase tracking-widest">Drop samples here</p>
        )}
        {track.clips.map(clip => (
          <div
            key={clip.id}
            onClick={() => clip.url && onPlayClip(clip)}
            className={`${clip.color} px-3 py-2 rounded text-xs text-white font-medium flex items-center gap-2 ${
              clip.url ? 'cursor-pointer' : ''
            } ${playingClipId === clip.id ? 'ring-2 ring-white' : ''}`}
          >
            {clip.url && <span>{playingClipId === clip.id ? '⏸' : '▶'}</span>}
            {clip.label}
            <button
              onClick={e => {
                e.stopPropagation()
                onRemoveClip(track.id, clip.id)
              }}
              className="text-white/70 hover:text-white"
              aria-label={`Remove ${clip.label}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Arranger({ injectedItems }: { injectedItems?: LibraryItem[] }) {
  const [library, setLibrary] = useState<LibraryItem[]>(DEMO_LIBRARY)

  useEffect(() => {
    if (!injectedItems?.length) return
    setLibrary(prev => {
      const existingIds = new Set(prev.map(i => i.id))
      const toAdd = injectedItems.filter(i => !existingIds.has(i.id))
      return toAdd.length ? [...prev, ...toAdd] : prev
    })
  }, [injectedItems])
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playKey, setPlayKey] = useState(0)
  const [playingClipId, setPlayingClipId] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordError, setRecordError] = useState('')
  const idRef = useRef(0)
  const uid = useId()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    const onEnded = () => setPlayingClipId(null)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.data.current?.type !== 'library') return
    const trackData = over.data.current
    if (trackData?.type !== 'track') return

    const libItem = active.data.current.item as LibraryItem
    idRef.current += 1
    const newClip: PlacedClip = {
      id: `${uid}-${idRef.current}`,
      label: libItem.label,
      color: libItem.color,
      url: libItem.url,
    }

    setTracks(prev =>
      prev.map(t =>
        t.id === trackData.trackId ? { ...t, clips: [...t.clips, newClip] } : t
      )
    )
  }

  function removeClip(trackId: string, clipId: string) {
    setTracks(prev =>
      prev.map(t =>
        t.id === trackId ? { ...t, clips: t.clips.filter(c => c.id !== clipId) } : t
      )
    )
  }

  function playClip(clip: PlacedClip) {
    if (!clip.url || !audioRef.current) return
    if (playingClipId === clip.id) {
      audioRef.current.pause()
      setPlayingClipId(null)
      return
    }
    audioRef.current.src = clip.url
    audioRef.current.play()
    setPlayingClipId(clip.id)
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLibrary(prev => [
      ...prev,
      { id: `upload-${Date.now()}`, label: file.name, color: 'bg-emerald-500/70', url },
    ])
    e.target.value = ''
  }

  async function toggleRecording() {
    setRecordError('')
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = e => chunksRef.current.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setLibrary(prev => [
          ...prev,
          {
            id: `rec-${Date.now()}`,
            label: `Recording — ${new Date().toLocaleTimeString()}`,
            color: 'bg-red-500/70',
            url,
          },
        ])
        stream.getTracks().forEach(t => t.stop())
      }
      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
    } catch {
      setRecordError('Microphone access denied or unavailable.')
    }
  }

  const totalClips = tracks.reduce((sum, t) => sum + t.clips.length, 0)

  return (
    <div className="w-full text-left">
      <DndContext onDragEnd={handleDragEnd}>
        {/* Capture real audio */}
        <div className="flex items-center gap-3 mb-4">
          <label className="px-4 py-2 border border-emerald-500/60 text-emerald-400 text-xs tracking-widest uppercase hover:bg-emerald-500/10 transition-colors cursor-pointer">
            Upload Audio
            <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
          </label>
          <button
            onClick={toggleRecording}
            className={`px-4 py-2 border text-xs tracking-widest uppercase transition-colors ${
              isRecording
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-red-500/60 text-red-400 hover:bg-red-500/10'
            }`}
          >
            {isRecording ? '● Stop Recording' : '● Record'}
          </button>
          {recordError && <p className="text-red-400 text-xs">{recordError}</p>}
        </div>

        {/* Library */}
        <div className="mb-6">
          <p className="text-[11px] tracking-widest uppercase text-ivory/40 mb-2">
            Asset Library — drag onto a track (● = real playable audio)
          </p>
          <div className="flex gap-2 flex-wrap">
            {library.map(item => (
              <LibraryChip key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Transport */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => {
              setIsPlaying(p => !p)
              setPlayKey(k => k + 1)
            }}
            className="px-4 py-2 border border-streets-cyan/60 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
          >
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          <p className="text-ivory/30 text-xs">{totalClips} clip{totalClips === 1 ? '' : 's'} arranged</p>
        </div>

        {/* Timeline */}
        <div className="relative border border-white/10 rounded p-4 bg-black/20">
          {isPlaying && (
            <motion.div
              key={playKey}
              className="absolute top-0 bottom-0 w-px bg-streets-cyan shadow-[0_0_8px_rgba(0,245,255,0.8)]"
              style={{ left: 92 }}
              initial={{ left: 92 }}
              animate={{ left: '96%' }}
              transition={{ duration: 8, ease: 'linear' }}
              onAnimationComplete={() => setIsPlaying(false)}
            />
          )}
          <div className="flex flex-col gap-3">
            {tracks.map(track => (
              <TrackLane
                key={track.id}
                track={track}
                onRemoveClip={removeClip}
                onPlayClip={playClip}
                playingClipId={playingClipId}
              />
            ))}
          </div>
        </div>
      </DndContext>

      <p className="text-ivory/20 text-[11px] mt-4">
        Upload and Record are real — click a placed clip with a ● to actually hear it. Nothing
        persists to a server yet (local to this browser tab only); that needs Supabase Storage wired in.
      </p>
    </div>
  )
}
