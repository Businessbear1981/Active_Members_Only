import RoomHero from '@/components/rooms/RoomHero'

export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <RoomHero
        number="05"
        label="THE RESTAURANT"
        title="Restaurant"
        tagline="A rotating weekly AMO-branded menu via DoorDash Virtual Brands, prepared by local partner kitchens in each city."
        image="/brand/surface/restaurant.jpg"
      />
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="border border-brass/20 px-6 py-8">
          <p className="text-xs tracking-widest uppercase text-brass/60 mb-3">Room shell only</p>
          <p className="text-sm text-ivory/50 leading-relaxed">
            The DoorDash Virtual Brands partnership (custom weekly menu, picked up per-city by local
            partner kitchens) needs a DoorDash merchant integration we haven't built yet. Not faked, just not here yet.
          </p>
        </div>
      </div>
    </main>
  )
}
