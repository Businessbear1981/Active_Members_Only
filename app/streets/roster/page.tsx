import Link from 'next/link'
import LabelRoster from '@/components/streets/LabelRoster'

export default function RosterPage() {
  return (
    <main className="min-h-screen bg-streets-bg px-6 py-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-4 mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">THE LABEL</p>
        <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">Artist Roster</h1>
        <p className="text-sm text-ivory/60 max-w-md">
          Find collaborators. New artists, new production, new features — this is the directory.
        </p>
      </div>

      <LabelRoster />

      <div className="text-center mt-14">
        <Link
          href="/streets"
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
        >
          ← The Streets
        </Link>
      </div>
    </main>
  )
}
