import Link from 'next/link'
import { getSpacesByTier } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'
import StreetsTileGrid from '@/components/streets/StreetsTileGrid'

const PIPELINE_STAGES = [
  { label: 'Submitted', desc: 'A project lands in the queue' },
  { label: 'In Review', desc: 'A&R listens, gives notes' },
  { label: 'Signed', desc: 'Cleared for the label pipeline' },
  { label: 'Released', desc: 'Out to Spotify, iTunes, and beyond' },
]

export default function StreetsPage() {
  const genreRooms = getSpacesByTier('streets')
  const featured = genreRooms.find(s => s.status === 'live') ?? genreRooms[0]

  return (
    <main className="relative min-h-screen bg-[#0a0a12] px-6 py-16 overflow-hidden">
      {/* Ambient wash only — the real UI below carries the look now, not a backdrop photo. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(ellipse 60% 40% at 15% 10%, rgba(157,0,255,0.16), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 30%, rgba(0,245,255,0.10), transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto" style={{ zIndex: 10 }}>

        {/* Header — spray-drip wordmark, matching the Streets membership hub design */}
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.4em] uppercase text-streets-cyan/80 font-mono mb-3">
            THE STREETS · MEMBERSHIP
          </p>
          <h1 className="relative inline-block font-sans font-black text-6xl md:text-8xl tracking-tight text-white leading-none">
            STREETS
            <span
              className="absolute left-0 right-0 -bottom-2 h-3 md:h-4 rounded-sm"
              style={{ background: 'linear-gradient(90deg, #9D00FF, #00F5FF)', opacity: 0.85 }}
              aria-hidden="true"
            />
          </h1>
          <p className="text-streets-purple font-sans font-bold uppercase tracking-wide text-lg mt-5">
            Your world. Your rules.
          </p>
          <p className="text-sm text-ivory/50 max-w-md mt-2">
            Genre rooms, project rooms, the arranger, the roster, the contracts, the release pipeline —
            this is the label. This is where the work happens.
          </p>
        </div>

        {/* Featured room — same "featured location" beat as the reference, real data */}
        {featured && (
          <Link
            href={`/streets/${featured.slug}`}
            className="group relative block border border-streets-cyan/30 hover:border-streets-cyan bg-gradient-to-br from-streets-purple/15 via-[#12121e] to-[#0a0a12] mb-14 overflow-hidden transition-colors"
          >
            <div className="p-8 md:p-10">
              <p className="text-[11px] font-mono tracking-widest text-streets-cyan/80 mb-3">FEATURED GENRE ROOM</p>
              <h2 className="font-sans font-black text-4xl md:text-5xl text-white tracking-tight">{featured.title}</h2>
              <p className="text-ivory/50 text-sm mt-3 max-w-md">{featured.tagline}</p>
              <div className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-streets-cyan text-[#0a0a12] font-bold text-xs uppercase tracking-widest group-hover:bg-white transition-colors">
                Enter Room →
              </div>
            </div>
          </Link>
        )}

        {/* The label pipeline — real states, not fabricated stats */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-streets-purple/80 font-mono mb-4">The Label Pipeline</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-streets-purple/15">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.label} className="bg-[#0a0a12] p-5">
                <p className="font-mono text-streets-cyan/60 text-xs mb-2">0{i + 1}</p>
                <p className="font-sans font-bold text-white text-sm uppercase tracking-wide">{stage.label}</p>
                <p className="text-ivory/40 text-xs mt-1">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <Link
            href="/streets/roster"
            className="px-6 py-3 border border-streets-cyan/50 text-streets-cyan text-xs tracking-widest uppercase hover:bg-streets-cyan/10 transition-colors"
          >
            Artist Roster →
          </Link>
        </div>

        <p className="text-[11px] tracking-[0.3em] uppercase text-streets-purple/80 font-mono mb-4">All Genre Rooms</p>
        <StreetsTileGrid spaces={genreRooms} />

        <div className="text-center mt-14">
          <PortalLink
            href="/surface"
            className="text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
          >
            ← Back to the Surface
          </PortalLink>
        </div>
      </div>
    </main>
  )
}
