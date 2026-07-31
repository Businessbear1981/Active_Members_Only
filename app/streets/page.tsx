import Link from 'next/link'

export default function StreetsPage() {
  return (
    <main className="relative min-h-screen bg-streets-bg flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="max-w-2xl flex flex-col items-center gap-6">
        <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">THE STREETS</p>
        <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">
          The Collaboration Studio
        </h1>
        <p className="text-sm text-ivory/60 max-w-md">
          Genre rooms, project rooms, the arranger, the label pipeline. Samples, beats, bars, raps —
          arranged into something real, and pitched to the label. This is where the work happens.
        </p>
        <div className="border border-streets-purple/40 px-6 py-4 text-xs tracking-widest uppercase text-streets-purple/70">
          Project rooms, the drag-and-drop arranger, and the A&amp;R pipeline are next to be built here.
        </div>
        <Link
          href="/surface"
          className="mt-4 text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
        >
          ← Back to the Surface
        </Link>
      </div>
    </main>
  )
}
