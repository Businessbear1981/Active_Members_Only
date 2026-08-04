import RoomHero from '@/components/rooms/RoomHero'
import Lab from '@/components/surface/Lab'

export default function LabPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <RoomHero
        number="01"
        label="THE LAB"
        title="Music Studio"
        tagline="Upload beats, real waveform playback, trending leaderboard."
        image="/brand/surface/lab.jpg"
      />
      <div className="px-6 py-12">
        <Lab />
      </div>
    </main>
  )
}
