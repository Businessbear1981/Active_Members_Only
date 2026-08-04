import Image from 'next/image'
import Link from 'next/link'
import { platform } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* CSS smoke placeholder — swap for a real filmed 4K smoke loop
          (mix-blend-mode: screen) once that asset exists */}
      <div className="smoke-layer" />
      <video
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/brand/smoke-loop.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">

        {/* SCO bust — floating, no frame, cut out and glowing. The bust itself is
            the entrance gate; height-capped (not just width) so the tagline/Enter
            button below it never gets clipped by the page's overflow-hidden on
            short viewports. */}
        <PortalLink href="/surface" className="relative w-auto h-[42vh] max-h-[560px] group cursor-pointer">
          <Image
            src="/brand/sco-bust-cutout.png"
            alt="Enter Active Members Only"
            width={1371}
            height={1884}
            className="w-auto h-full drop-shadow-[0_0_90px_rgba(201,168,76,0.4)] group-hover:drop-shadow-[0_0_130px_rgba(201,168,76,0.65)] transition-[filter] duration-300"
            priority
          />
        </PortalLink>

        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.4em] uppercase brass opacity-80">{platform.shortName}</p>
          <p className="text-[11px] tracking-[0.5em] uppercase text-brass/70 font-mono">EST. MMXXVI</p>
          <p className="text-sm tracking-widest uppercase text-ivory/60 max-w-sm">{platform.tagline}</p>
        </div>

        {/* Enter — the only call to action on this screen */}
        <PortalLink
          href="/surface"
          className="mt-2 px-10 py-3 border border-brass/60 text-brass text-xs tracking-[0.4em] uppercase hover:bg-brass/10 hover:text-white transition-colors"
        >
          Enter
        </PortalLink>

        <Link
          href="/gate/signed"
          className="text-xs tracking-widest uppercase text-ivory/30 hover:text-brass transition-colors"
        >
          Already a member? Request access
        </Link>

      </div>
    </main>
  )
}
