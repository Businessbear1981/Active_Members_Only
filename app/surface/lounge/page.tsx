import RoomHero from '@/components/rooms/RoomHero'

export default function LoungePage() {
  return (
    <main className="min-h-screen bg-midnight">
      <RoomHero
        number="04"
        label="THE LOUNGE"
        title="Lounge"
        tagline="Activity feed, direct messages, connections."
        image="/brand/surface/lounge.jpg"
      />
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="border border-brass/20 px-6 py-8">
          <p className="text-xs tracking-widest uppercase text-brass/60 mb-3">Room shell only</p>
          <p className="text-sm text-ivory/50 leading-relaxed">
            The Lounge's activity feed, direct messages, and member connections aren't wired yet — this
            room exists in the spine but the feature build hasn't started. Not faked, just not here yet.
          </p>
        </div>
      </div>
    </main>
  )
}
