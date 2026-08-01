export type RecordingSpaceId = 'booth-a' | 'booth-b' | 'booth-c' | 'acoustic'

export interface RecordingSpace {
  id: RecordingSpaceId
  name: string
  description: string
}

export const RECORDING_SPACES: RecordingSpace[] = [
  { id: 'booth-a', name: 'Booth A — Clean', description: 'Close-mic vocal booth. High-pass rumble cut, standard compression. Neutral, dry.' },
  { id: 'booth-b', name: 'Booth B — Warm', description: 'Low-shelf boost, gentle high rolloff, heavier compression. Thicker, warmer vocal character.' },
  { id: 'booth-c', name: 'Booth C — Bright', description: 'High-shelf presence boost, lighter compression. Airy, forward vocal character.' },
  { id: 'acoustic', name: 'Acoustic Room', description: 'Wide dynamic range (light compression), algorithmic room reverb. Built for live instruments, not close-mic vocals.' },
]

// Builds a real Web Audio processing graph for the given space and returns a
// MediaStream carrying the *processed* signal, so what gets recorded actually
// reflects that space's character — not just a label on an identical recording.
export function buildProcessedStream(
  audioContext: AudioContext,
  inputStream: MediaStream,
  space: RecordingSpaceId
): MediaStream {
  const source = audioContext.createMediaStreamSource(inputStream)
  const destination = audioContext.createMediaStreamDestination()

  const highpass = audioContext.createBiquadFilter()
  highpass.type = 'highpass'
  highpass.frequency.value = 80

  const compressor = audioContext.createDynamicsCompressor()
  const shelf = audioContext.createBiquadFilter()

  switch (space) {
    case 'booth-a':
      shelf.type = 'lowshelf'
      shelf.frequency.value = 200
      shelf.gain.value = 0
      compressor.threshold.value = -24
      compressor.ratio.value = 3
      source.connect(highpass).connect(shelf).connect(compressor).connect(destination)
      break

    case 'booth-b':
      shelf.type = 'lowshelf'
      shelf.frequency.value = 250
      shelf.gain.value = 6
      compressor.threshold.value = -28
      compressor.ratio.value = 5
      source.connect(highpass).connect(shelf).connect(compressor).connect(destination)
      break

    case 'booth-c':
      shelf.type = 'highshelf'
      shelf.frequency.value = 3500
      shelf.gain.value = 7
      compressor.threshold.value = -20
      compressor.ratio.value = 2.5
      source.connect(highpass).connect(shelf).connect(compressor).connect(destination)
      break

    case 'acoustic': {
      compressor.threshold.value = -12
      compressor.ratio.value = 1.8
      const reverb = audioContext.createConvolver()
      reverb.buffer = generateImpulseResponse(audioContext, 1.8, 2.2)
      const dryGain = audioContext.createGain()
      const wetGain = audioContext.createGain()
      dryGain.gain.value = 0.75
      wetGain.gain.value = 0.25
      source.connect(compressor)
      compressor.connect(dryGain).connect(destination)
      compressor.connect(reverb).connect(wetGain).connect(destination)
      break
    }
  }

  return destination.stream
}

// Synthetic room impulse response (exponentially decaying noise) — a real,
// standard technique for algorithmic reverb without needing a sampled IR file.
function generateImpulseResponse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
  const rate = ctx.sampleRate
  const length = rate * duration
  const impulse = ctx.createBuffer(2, length, rate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    }
  }
  return impulse
}
