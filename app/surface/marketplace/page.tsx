import Link from 'next/link'
import BoutiqueMarketplace from '@/components/showcase/BoutiqueMarketplace'

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-midnight px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/surface"
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-brass transition-colors"
        >
          ← Back to the Surface
        </Link>
        <p className="text-xs tracking-[0.4em] uppercase brass opacity-80 mt-6">THE MARKETPLACE</p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide mt-2 mb-10">Boutique Marketplace</h1>
        <BoutiqueMarketplace />
      </div>
    </main>
  )
}
