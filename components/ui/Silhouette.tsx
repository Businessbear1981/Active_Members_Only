import Image from 'next/image'

export default function Silhouette() {
  return (
    <div
      className="relative w-56 sm:w-72 aspect-[554/616]"
      style={{
        filter:
          'drop-shadow(2px 3px 0px rgba(255,255,255,0.05)) drop-shadow(-2px -3px 10px rgba(0,0,0,0.9))',
      }}
    >
      <Image
        src="/brand/sco-silhouette.png"
        alt="Silhouette"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
