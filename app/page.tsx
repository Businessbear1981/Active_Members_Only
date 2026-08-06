import Image from 'next/image'
import Link from 'next/link'
import { platform } from '@/lib/config'
import PortalLink from '@/components/portal/PortalLink'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Animated background art — the Detroit backdrop IS the background, not a faint hint
          under black. Slow Ken Burns drift; only a light gradient (heavier at the very top/bottom
          for text legibility, near-clear through the middle) sits over it — no flat black scrim.
          Inline styles (not the .home-backdrop CSS class) so this can't silently fail to paint
          if a stylesheet fails to load — z-index is explicit at every layer here. */}
      <img
        src="/brand/home-backdrop.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-1%',
          width: '102%',
          height: '102%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 1,
          zIndex: 0,
          animation: 'backdrop-drift 40s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* CSS smoke placeholder — swap for a real filmed 4K smoke loop
          (mix-blend-mode: screen) once one is shot; no video file exists yet
          so there's nothing to reference here honestly. */}
      <div className="smoke-layer" style={{ zIndex: 2 }} />

      {/* Content — shifted up so the SCO head lands on the mural's own vanishing
          point (the archway converges above true vertical center), not just
          centered in the viewport. */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center -translate-y-[10%]">

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
          <p
            className="text-sm tracking-[0.4em] uppercase font-serif"
            style={{
              background: 'linear-gradient(180deg, #f5f0e8 0%, #e8d9a8 45%, #c9a84c 55%, #f5f0e8 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.85)) drop-shadow(0 0 16px rgba(201,168,76,0.6)) drop-shadow(0 0 30px rgba(0,0,0,0.6))',
            }}
          >
            {platform.shortName}
          </p>
          <p className="text-[11px] tracking-[0.5em] uppercase text-brass/70 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">EST. MMXXVI</p>
          <p className="text-sm tracking-widest uppercase text-ivory/80 max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{platform.tagline}</p>
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
