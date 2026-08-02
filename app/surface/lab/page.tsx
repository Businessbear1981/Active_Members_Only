import Link from 'next/link'
import Lab from '@/components/surface/Lab'

export default function LabPage() {
  return (
    <main className="min-h-screen bg-midnight px-6 py-16">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <Link
          href="/surface"
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-brass transition-colors"
        >
          ← Back to the Surface
        </Link>
        <p className="text-xs tracking-[0.4em] uppercase brass opacity-80 mt-6">THE LAB</p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide mt-2">Music Studio</h1>
        <p className="text-sm text-ivory/50 mt-3">Upload beats, real waveform playback, trending leaderboard.</p>
      </div>
      <Lab />
    </main>
  )
}
