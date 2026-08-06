# ACTIVE MEMBERS ONLY — Design Brief & Immersive Experience Tech Mapping
## Companion to ARCHITECTURE_PLAN.md and ETHOS_AND_BRAND_BIBLE.md

---

## 1. PURPOSE OF THIS DOCUMENT

The Ethos Bible says *why* and *what it should feel like*. The Architecture Plan says *what powers the backend*. This document is the missing middle layer: concrete style specs per layer/room, and — the piece you asked for directly — a full mapping of every immersive-experience moment to the exact tech stack piece that renders it. Nothing here should require re-deciding anything already settled in the other two docs; it operationalizes them.

---

## 2. DESIGN BRIEF — STYLE PER LAYER

### 2.0 — THE GOVERNING RULE (corrected after a real build mistake)

**Gold / Ivory / Navy (Surface's palette) is the platform's default, dominant identity.** It's what the wordmark, the crest ("EST. MMXXVI"), any cross-tier document, status report, or shared UI chrome should use unless a screen is *specifically and currently* inside Streets or VIP Sanctum.

- **Streets' purple/cyan** and **VIP's crimson/amber** are *scoped tier accents* — they exist only inside that tier's own screens. They are never the default brand color, never used on a landing page, cover page, or any document meant to represent the platform as a whole.
- **The blacklight/UV transition palette** (fluorescent magenta, acid green, electric cyan — § 5 of the Ethos Bible) is scoped even tighter: it exists *only* during the portal-jump submersion moment itself. It is not a UI accent, not a label color, not a checkmark color, not something that shows up in a status document. If it's visible on a static screen that isn't mid-jump, it's being used wrong.

**Why this is being written down now:** a status brief was built that applied Streets' purple/green and the transition's magenta/acid-green as the *global* accent scheme across an entire document — kickers, checkmarks, labels, everything. That's the exact mistake this rule exists to prevent. Gold/ivory/navy should have been the default throughout, with tier colors appearing only inside their own sections. Corrected in the rebuild; this section exists so the next person (or agent) doesn't repeat it.

### SURFACE (top, luxury/opulent)
- **Base:** reuse HALO's existing tokens as-is — Navy `#0F0F1E`/`#0a0a0a`, Ivory `#f5f0e8`, Brass `#C9A84C`, brass glow `rgba(201,168,76,0.4)`.
- **Type:** Space Grotesk (headings) / Inter (body) — from the original Design System doc, unchanged.
- **Feel:** museum-flagship-store. Generous whitespace, serif accents on price/status numerals, brass hairline borders (already in HALO's `gate-card`/button styling — reuse directly).
- **Motion:** slow, confident easing (300–500ms), no bounce. Luxury doesn't hurry.

### STREETS (middle, grimy/rugged)
- **Base:** from the original Platform Design Brief's Streets aesthetic — Deep Gray `#1A1A2E` background, Neon Purple `#9D00FF` primary, Cyber Cyan `#00F5FF` accent.
- **Type:** industrial/condensed display face for headers (e.g., a grotesk with tight tracking), JetBrains Mono for BPM/key/technical readouts (already speced for waveform data in the original Design System doc).
- **Texture:** spray-paint edge masks on cards, tagged/stenciled section labels, asset thumbnails with a slight grain/halftone overlay.
- **Motion:** faster, rougher easing — slight overshoot on interaction (a spray-can "snap"), not the smooth luxury easing of Surface.

### VIP SANCTUM (bottom, ominous/after-hours) — **new palette, revised from the original brief's "gold/neon" VIP direction per the tonal reversal in Ethos Bible § 6**
- **Base (proposed):** near-black `#050505` background (darker and flatter than Surface's navy — no blue undertone), muted deep crimson accent `#5C1A1A`, dim amber under-light `#8A6A2F` (a duller, dirtier cousin of Surface's brass — same family, drained of shine), low-contrast ivory text `#C9C2B8` (dimmer than Surface's bright ivory).
- **Type:** same serif as Surface for continuity (this is still "luxury," just gone dark), but tighter leading and lower contrast weight — nothing should read as crisp or bright here.
- **Texture:** vignette-heavy, off-axis framing, subtle film grain. Light sources should feel practical (a single downlight, not ambient glow) — like a room lit by one lamp, not a design system.
- **Motion:** the slowest, heaviest easing in the app. Deliberate, slightly unstable (a faint parallax drift on idle) — reinforces "the deeper dream is less stable."
- **Flag:** this palette needs a real accessibility contrast pass before build (§ 8 of the Design Schedule) — low-light/high-drama design and WCAG contrast minimums are in tension and need to be resolved with real values, not just approximated here.

---

## 3. FULL IMMERSIVE EXPERIENCE → TECH STACK MAPPING

Every experience beat, left to right: what the member sees/feels → what renders it → what powers it.

| # | Experience moment | What it looks/feels like | Rendering tech | Backend/API powering it |
|---|---|---|---|---|
| 1 | **Landing — "Enter SCO's Mind"** | True-black field, single raised silhouette, click-to-enter | Next.js page, CSS `filter`/`box-shadow` for the embossed silhouette effect, no external asset pipeline needed unless SCO's likeness is a photo-derived asset | Static — no API. Image asset only |
| 2 | **The Jump (portal transition)** | Painting swallows the viewport, elemental burst + dimension-glitch cut, lands in the next room's palette | Framer Motion (route transition orchestration) + a WebGL/Three.js shader pass for the warp/burst effect | Client-side only; no backend call. Reduced-motion fallback required (Design Schedule Week 8) |
| 3 | **Rotating art/painting reel (nav + display)** | Click-to-advance single reveal, chapter tabs, pip indicators | `PaintingReel.tsx` (HALO, generalized to `Space[]` instead of `pieces`) | Supabase `spaces` table query |
| 4 | **Surface — The Lab (beat upload/leaderboard)** | Waveform-forward, sci-fi controls | Tone.js (playback) + Wavesurfer.js (waveform render) | Supabase Storage (audio files), Postgres (`tracks`) |
| 5 | **Surface — Marketplace / merch / label store** | Product grid, checkout | Next.js + Stripe Elements | Stripe Checkout + webhook → `orders` |
| 6 | **Surface — Digital Restaurant** | *(scope TBD — see Architecture Plan)* | Next.js page, form/menu UI | Toast or Square for Restaurants API **if** it's a real ordering flow; static content otherwise |
| 7 | **Surface — Club (matching, non-VIP)** | Public-facing swipe/browse | Standard card UI, original weighted-score matching | Postgres (`club_matches`), no external API (Finesse dropped per your steer) |
| 8 | **Surface — tour dates / socials** | Feed of upcoming shows, social links | Simple list/embed components | Bandsintown or Songkick API for tour dates; oEmbed for socials |
| 9 | **Streets — Project Room entry** | Grimy tagged room shell, live contributor avatars | Next.js dynamic route (`streets/[genre]/[project]`) | Supabase Realtime (presence) |
| 10 | **Streets — Arranger (drag-and-drop DAW)** | Drag samples/stems onto a timeline, mix live | dnd-kit (drag/drop) + Tone.js (audio engine) + Wavesurfer.js (waveform) | Splice API (sample search), Stable Audio API (AI stem gen), Dolby.io (Enhance/Analyze on demand) |
| 11 | **Streets — in-browser recording** | Record vocals/bars directly into a project | Native `MediaRecorder` (Web Audio) | Supabase Storage (uploaded take), no external vendor |
| 12 | **Streets — A&R submission → label pipeline** | Submit project for label review | Status UI (`submitted → in_review → signed → released`) | Postgres `label_pipeline` table |
| 13 | **VIP Sanctum — the descent** | Biggest tonal drop in the app; portal jump lands in the ominous palette | Same portal-jump engine as #2, VIP-specific shader/palette pass | Access-gated: `middleware.ts` checks `access_level` before the jump route resolves |
| 14 | **VIP — Audio Room / Video Room (private concert webcasting)** | High-fidelity live audio/video for a private show, up to 100K viewers at scale | WebRTC ingest for low-latency contributor feeds, adaptive playback for viewers | Mux or Cloudflare Stream (ingest + delivery backbone), Zoom SDK for smaller/boardroom-style sessions |
| 15 | **VIP — Boardroom (deal terms, bespoke booking)** | Private deal-room UI, negotiated private-show requests | Encrypted messaging UI | Zoom (calls) + Cypher-governed E2E messaging (`encrypted_messages`) |
| 16 | **VIP — Release Room** | Limited drop status, distribution tracking | Status dashboard | LANDR API (mastering/distribution/royalty split) |
| 17 | **VIP — The Circle (private introductions)** | Blurred alias reveal, click-to-advance, concierge-mediated intro | Same `PaintingReel`-derived reel component as #3, VIP-restricted instance | `circle_candidates` / `circle_interests` tables, Claude-powered Concierge for the intro message |
| 18 | **VIP — "Bernard"** | *Form TBD* — see Ethos Bible § 7 | Not yet specced | Not yet specced — `spaces.metadata` is flexible enough to absorb whatever it becomes |
| 19 | **Cypher (felt, not just backend)** | Nothing visible under normal use — the point is it's invisible and just works | HKDF session-key derivation at login | `packages/utils/src/encryption.ts` extension |
| 20 | **Alcatraz (felt, not just backend)** | If triggered: every VIP surface goes instantly silent/isolated — should read as alarming, not a graceful error state | A dedicated "lockdown" UI state (not a generic error page) — deliberately unsettling, matches the ominous tone rather than undercutting it | `lockdown_state` flag, Supabase Realtime channel rejection |
| 21 | **Beacon (invisible to members)** | Not member-facing at all — admin/ops only | Admin dashboard alert feed | Social/web monitoring service + Broadcastify API (venue-scoped, event-window-only) |
| 22 | **Track goes live → viral loop** | Release triggers video generation, streaming push, social monetization | Server-side orchestration (webhook chain: LANDR release → trigger video gen → publish) | Kaiber/Veo 3 (video), YouTube Data API + Kick API (distribution/streaming) |
| 23 | **AI Concierge (Surface + Streets, distinct from Bernard)** | Floating chat, guides new members | Claude-powered chat widget (already in HALO) | `/api/concierge`, Claude API |

---

## 4. WHAT'S STILL A PLACEHOLDER, NOT A GAP

To be explicit about what's intentionally left open vs. what's missing:
- **Bernard** (row 18) — confirmed to exist, form not decided. Not a gap in this doc, a genuine open decision.
- **Digital Restaurant** (row 6) — scope decision pending, not a technical unknown.
- **5 of the 10 VIP rooms** — not yet named (see Ethos Bible § 7); the `spaces` schema doesn't need to change to accommodate whatever they turn out to be.

Everything else in this table is a real, decided mapping — ready to build against.

---

**Status:** Draft for review — third companion doc alongside `ARCHITECTURE_PLAN.md` and `ETHOS_AND_BRAND_BIBLE.md`.
