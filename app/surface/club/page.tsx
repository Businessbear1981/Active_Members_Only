import RoomHero from '@/components/rooms/RoomHero'
import Club from '@/components/surface/Club'

export default function ClubPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <RoomHero
        number="03"
        label="THE CLUB"
        title="Discovery"
        tagline="Real add-and-match — single-session demo, so your own profile shows up in the deck too until real accounts exist."
        image="/brand/surface/club.jpg"
      />
      <div className="max-w-md mx-auto px-6 py-12">
        <Club />
      </div>
    </main>
  )
}
