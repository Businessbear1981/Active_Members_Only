import Link from 'next/link'
import LayerCollapse from '@/components/showcase/LayerCollapse'

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-4">
        <Link
          href="/"
          className="text-xs tracking-widest uppercase text-slate-500 hover:text-amber-300 transition-colors"
        >
          ← Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Worlds Collide</h1>
        <p className="text-slate-400 max-w-2xl">
          Design concept: solve three puzzle locks — one per layer — to see the collision of Surface,
          Streets, and VIP Sanctum aesthetics. Images referenced here (`/manus-storage/...`) are pending
          export from Manus — drop the real files into `public/manus-storage/` and they resolve automatically.
        </p>
        <div className="pt-8">
          <LayerCollapse />
        </div>
      </div>
    </main>
  )
}
