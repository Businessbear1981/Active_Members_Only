import Image from 'next/image'
import Link from 'next/link'

// Cinematic room-entry banner — generalized from NVAI's ArtistRoomFactory header treatment.
// Pass `image` for real photography (cropped from surface-hero.jpg); falls back to an
// honestly-styled gradient panel when no photo exists yet for a given room.
export default function RoomHero({
  number,
  label,
  title,
  tagline,
  image,
  gradient = 'from-brass/25 via-midnight to-midnight',
  backHref = '/surface',
  backLabel = 'Back to the Surface',
}: {
  number: string
  label: string
  title: string
  tagline: string
  image?: string
  gradient?: string
  backHref?: string
  backLabel?: string
}) {
  return (
    <div className={`relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden ${image ? 'bg-midnight' : `bg-gradient-to-br ${gradient}`} border-b border-brass/20`}>
      {image && (
        <>
          <Image src={image} alt={title} fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30" />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,76,0.12),transparent_60%)]" />
      <div className="absolute inset-0 flex flex-col justify-between px-6 py-6 md:px-12 md:py-10">
        <Link
          href={backHref}
          className="self-start text-xs tracking-widest uppercase text-ivory/50 hover:text-brass transition-colors"
        >
          ← {backLabel}
        </Link>
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-brass/70 font-mono">{number} · {label}</p>
          <h1 className="text-3xl md:text-6xl font-serif tracking-wide text-ivory mt-2">{title}</h1>
          <p className="text-sm md:text-base text-ivory/50 mt-3 max-w-lg">{tagline}</p>
        </div>
      </div>
    </div>
  )
}
