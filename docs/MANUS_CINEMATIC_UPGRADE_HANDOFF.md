# ACTIVE MEMBERS ONLY — Cinematic Upgrade Handoff for Manus

## Attach this first

**`active-members-only-current-build.zip`** (in this same Downloads folder) — the actual, real, working codebase. Not a mockup, not a design file — this is the live Next.js site running right now. Upload this as an attachment before starting; there's no link Manus can fetch it from.

---

## What's real right now (white-glove audit result)

This is a working three-tier site, not a prototype:

- **Surface** (`/surface`) — luxury retail floor, real room grid pulled from data (Lab/Marketplace/Club/Lounge/Restaurant)
- **Marketplace** (`/surface/marketplace`) — functioning boutique UI, merchant filtering, product grid
- **The Streets** (`/streets` → `/streets/[genre]` → `/streets/[genre]/[project]`) — real nested room-within-room routing, gated behind sign-in
- **The Arranger** (inside any Streets project room) — a genuinely functional drag-and-drop track arranger (6 sample chips, 4 track lanes, drag/drop/remove, animated transport playhead). Audio is silent — no sample files are wired to real storage yet — but the arrangement mechanic itself is fully live, not a static mockup
- **VIP Sanctum** (`/vip` → `/vip/[room]`) — all 10 rooms routed and gated
- **Landing page** — the derived SCO silhouette (rough first pass, real image not a placeholder), single "Enter" CTA
- Every fake/placeholder demo entry left over from the HALO template has been removed. Nothing on the site is fabricated content dressed up as real — what you see either works or is honestly labeled as not built yet.

**What's explicitly NOT done, so you don't try to "fix" working scaffolding:** real audio playback, Stripe/payments, Zoom, any of the AI music/video APIs, and the VIP room content beyond a title/tagline shell. Those are backend/integration work, out of scope for this handoff.

---

## Your job: the cinematic upgrade

Everything visual is currently placeholder-honest but not cinematic — gradient panels stand in for photography, transitions are plain fades, there is no "moment." Fix that.

### 1. Replace every gradient placeholder with real imagery
Search the codebase for `bg-gradient-to-br` panels in `components/showcase/BoutiqueMarketplace.tsx` and `components/showcase/LayerCollapse.tsx` — these are honest stand-ins for six images that never made it out of a previous Manus export. Generate real cinematic imagery for each and wire them in (drop files in `public/manus-storage/` using the same filenames already referenced in code, or update the `src` paths directly).

### 2. Build the portal-jump transition for real
Currently every route change is a plain Next.js navigation with no transition. Per the design brief: every jump should feel like diving into water — the current view ripples and swallows the viewport, a UV/blacklight color burst (fluorescent magenta, acid green, electric cyan) at the peak, landing in the new room's own palette. This needs to actually be built (Three.js/WebGL or a CSS/SVG turbulence fallback), wired into the Next.js route transitions, not just described.

### 3. The missing "10 rooms" moment
Right now `/vip` is a flat, static grid of 10 links — functionally correct, but there's no *moment*. Design and build a cinematic reveal sequence for entering VIP Sanctum: something that makes arriving at the ten rooms feel like descending into the deepest, most unstable layer of the dream — not a settings page. This is the single biggest gap between what's built and what the concept promises.

### 4. Landing page polish
The SCO silhouette is a real derived image but rough (background noise from the source photo bled through). Clean it into a gallery-quality embossed cutout per the original brief — museum object under glass, true black, no chrome.

### 5. Tonal consistency pass
Surface = uber-luxury/opulent. Streets = grimy/rugged. VIP = ominous/after-hours. Go through every screen in the zip and flag/fix anywhere the mood doesn't match its layer — this is the deliberate reversal (open tier shiniest, exclusive tier darkest), don't "fix" it toward making VIP look nicer.

---

## What NOT to touch

- Don't change the room hierarchy, routing structure, or the `spaces` data model in `platform.config.json` / `lib/config.ts` — that's the real data layer, not a placeholder
- Don't add fake content, sample copy, or stock imagery labeled as real — if you don't have real assets for something, build the honest placeholder pattern already established (styled panel + label), not a broken reference
- Don't touch `middleware.ts` or anything auth-related
- Backend integrations (Stripe, Zoom, audio, AI APIs) are out of scope — visual/cinematic only
