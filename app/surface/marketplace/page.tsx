import RoomHero from '@/components/rooms/RoomHero'
import BoutiqueMarketplace from '@/components/showcase/BoutiqueMarketplace'

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-midnight">
      <RoomHero
        number="02"
        label="THE MARKETPLACE"
        title="Boutique Marketplace"
        tagline="Digital + physical merch, stems, presets, the label store."
        image="/brand/surface/marketplace.jpg"
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <BoutiqueMarketplace />
      </div>
    </main>
  )
}
