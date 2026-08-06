# INCEPTION PLATFORM — Full Architecture Plan
## Built on the HALO Spine

---

## 0. WHAT THIS DOCUMENT IS

A concrete engineering plan for turning the HALO codebase (config-driven, tiered-access, room-based gallery app) into the three-tier INCEPTION platform (Surface → Streets → VIP Sanctum), with Streets standing alone as a full digital record label product, and a full external API roster wired in (Stripe, Zoom, Finesse, Splice, Stable Audio, Dolby.io, LANDR, ElevenLabs, Kaiber, Veo 3).

This is a plan for review, not code. Nothing here has been built yet.

---

## 1. WHY HALO IS THE RIGHT SPINE

HALO already solved the hard architectural problem this project needs: **a config-driven, tiered-access, nested-room content platform.**

| HALO already has | Inception needs it for |
|---|---|
| `platform.config.json` — single source of truth for name/theme/content | Same pattern, swap art-gallery content for label content |
| `AccessTier` system (`public → signed → buyer → lender → broker`) | Remap to (`public → free → premium → vip → label-signed`) |
| `middleware.ts` route gating by auth + role | Extend to gate `/streets/*` and `/vip/*` |
| `wing/[slug]` → `piece/[slug]` nesting (artist wing contains pieces) | Generalizes directly to "room contains rooms" |
| Supabase auth + Postgres + RLS | Reused as-is |
| Floating Concierge (Claude-powered chat) | Becomes the platform-wide AI guide/A&R assistant |
| Next.js 15 App Router, Tailwind, Vercel-ready | Reused as-is |

We are not starting from zero — we are generalizing HALO's `Artist/Piece/Wing` model into a generic `Space` (room) model that can represent a music room, a marketplace stall, a club profile, or a VIP vault interchangeably.

---

## 2. THE THREE-TIER ROOM HIERARCHY

Rooms nest inside rooms, exactly like HALO's Wing → Piece pattern, generalized one level deeper.

```
TIER 1 — THE SURFACE (public, free signup)
├── Home (platform.config.json driven, same as HALO's app/page.tsx)
├── THE LAB (room)
│   ├── Beat Room [slug] (room-within-room, one per beat/project)
│   └── Leaderboard (view)
├── THE MARKETPLACE (room)
│   └── Listing Room [slug] (one per product/stem-pack)
├── THE CLUB (room)
│   └── Profile Room [slug] (one per member profile)
└── THE LOUNGE (room)
    └── Feed / DMs

TIER 2 — THE STREETS (members-only; its own sub-platform: the digital record label)
├── Label Home (own branding pulled from platform.config.json → labels.streets)
├── Genre Rooms (room)
│   └── Project Rooms [slug] (room-within-room)
│       ├── Arranger (drag-and-drop DAW surface)
│       ├── Asset Library (samples/stems/bars/raps/art)
│       ├── Version History
│       └── A&R Review (submit project → label pipeline)
└── Label Pipeline (view) — Submitted → In Review → Signed → Released

TIER 3 — VIP SANCTUM (invite-only / paid) — target: 10 rooms total, see ETHOS_AND_BRAND_BIBLE.md § 7
├── Audio Room — highest-quality webcasting audio for private concerts
├── Video Room — webcasting video for private concerts
├── Private Vaults [slug] (room, one per signed artist or VIP member)
├── Boardroom (room) — label deal terms, revenue share, booking
├── Release Rooms [slug] (room) — limited drops, distribution status
├── Exclusive Sample Vault (room)
├── Art/Portal Room — rotating art mechanic from HALO/NVAI as its own room
├── THE CIRCLE (room) — UHNW private introduction engine, see § 11
├── "Bernard" — confirmed element, form still TBD, see ETHOS_AND_BRAND_BIBLE.md § 7
└── [5 rooms open — pending]
```

**Data model** (generalizes HALO's `types/platform.ts`):

```typescript
type Tier = 'surface' | 'streets' | 'vip'
type AccessLevel = 'public' | 'free' | 'premium' | 'vip' | 'label_signed'

interface Space {
  id: string
  slug: string
  parentSpaceId: string | null      // enables room-within-room nesting
  tier: Tier
  spaceType: 'wing' | 'room' | 'vault' | 'boardroom'
  requiredAccess: AccessLevel
  title: string
  theme: Record<string, string>      // per-room accent overrides, HALO-style
  ownerId: string | null             // artist/user who owns this room
  metadata: Record<string, unknown>  // BPM/key for beat rooms, price for listings, etc.
}

interface SpaceMember {
  spaceId: string
  userId: string
  role: 'owner' | 'collaborator' | 'viewer'
  addedAt: string
}
```

This one table (`spaces`, self-referencing via `parentSpaceId`) replaces HALO's separate `artists`/`pieces` tables and covers Lab rooms, Marketplace listings, Club profiles, Streets projects, and VIP vaults with the same schema — same pattern HALO used for Wing→Piece, one level more general.

---

## 3. ACCESS TIER REMAPPING

HALO's `accessTiers` block in `platform.config.json` is reused almost verbatim:

```json
"accessTiers": {
  "public":       { "sees": ["surface_teaser"] },
  "free":         { "sees": ["surface_full", "lab_upload_limited"] },
  "premium":      { "sees": ["surface_full", "lab_unlimited", "marketplace_seller"] },
  "vip":          { "sees": ["streets", "vip_vault", "revenue_dashboard"] },
  "label_signed": { "sees": ["vip_vault", "boardroom", "release_pipeline"] }
}
```

`middleware.ts` extends HALO's existing pattern (which already gates `/provenance` and `/admin`) to also gate `/streets/*` (requires `premium`+) and `/vip/*` (requires `vip` or `label_signed`, checked against Stripe subscription status synced into the `profiles` table via webhook, not checked live against Stripe on every request).

---

## 4. TECH STACK — ADDITIONS ON TOP OF THE HALO BASE

Base (unchanged from HALO): Next.js 15, TypeScript, Tailwind, Supabase (auth/DB/storage/realtime), Vercel, Claude API (Concierge).

| Capability | Provider | Integration point |
|---|---|---|
| Subscriptions + marketplace payments + artist payouts | **Stripe** (+ Stripe Connect) | `apps/web/app/api/stripe/*`, webhook → updates `profiles.access_level` |
| Video calls (label meetings, collab sessions, booking) | **Zoom API/SDK** | Meeting-create endpoint called from Boardroom + Streets project rooms |
| Sample/loop library | **Splice API** | Asset picker inside the Arranger |
| In-browser multitrack arranger | **Tone.js + Wavesurfer.js** (custom) | Streets Project Room `/arranger` |
| Drag-and-drop UI | **dnd-kit** | Arranger timeline, asset library, marketplace listing builder |
| AI original-music generation | **Stable Audio API** | "Generate stem" action inside Arranger |
| Auto-mixing/mastering | **Dolby.io Media API** (Enhance/Analyze/Transcode) — https://docs.dolby.io/media-apis/ | "Polish mix" action before label submission |
| Mastering + distribution + royalty split (label release pipeline) | **LANDR API** | Release Rooms in VIP Sanctum |
| Voice tools (already in HALO stack) | **ElevenLabs** | Concierge voice + vocal isolation/cloning in Arranger |
| Music video generation (audio-reactive) | **Kaiber** — *confirmed for launch* | "Generate video" on a finished track (Surface/Streets) |
| Music video generation (cinematic, VIP tier) | **Google Veo 3** (Vertex AI/Gemini API) — *confirmed for launch* | VIP-tier video generation |
| Character-consistent AI video (artist avatars, promo clips) | **Higgsfield** | Club profile videos, Streets promo assets |
| Text/image-to-3D generation | **Meshy API** | Marketplace 3D merch previews, VIP immersive vault objects |
| Track reference/embed + profile linking | **Spotify Web API** | "Connect Spotify" on Club/Lab profiles, embed reference tracks in Arranger. **Note:** Spotify's public API does not accept direct artist uploads — actual releases still go out via LANDR, Spotify is playback/reference/profile only |
| In-browser audio recording (vocals, bars, raps) | **MediaRecorder (Web Audio, native)** | Record directly into a Streets Project Room / Lab beat room, no separate vendor needed |
| Social/matching (The Club, Surface tier) | **Original build** — not a Finesse port | Generic weighted-score matching (see original design brief § Club Matching Algorithm) — no reliance on Finesse's proprietary logic or API |
| Real-time collab presence | **Supabase Realtime** (already in HALO) | Cursor presence, live asset sync in Project Rooms |
| Portal-jump transition (water-dive + blacklight burst) | **Three.js/WebGL** (displacement-map ripple + bloom pass), CSS/SVG turbulence fallback for low-end devices | Client-side only, `prefers-reduced-motion` fallback required — real GPU shader work, budget it as its own build item, not a CSS transition |
| Photo → silhouette derivation (landing page, potentially member avatars later) | **`sharp`** (Node image processing) | Confirmed working in this session: greyscale + threshold pipeline turned SCO's reference photo into the landing silhouette. Same pipeline is reusable for any future photo-to-silhouette need (e.g. VIP member profile treatments) |
| Chat | **Telegram Bot API** (confirmed, from original design brief) | Cross-platform notifications + DMs |
| Music video → distribution | **YouTube Data API v3** | Auto-upload generated music videos, track view/monetization stats |
| Livestream (private concerts, secondary channel) | **Kick API** | Livestream channel alongside the Mux/Cloudflare Stream backbone (Architecture Plan § 9) |
| Payments — alternative method | **Cash App Pay** (via Block/Square Developer Platform) | Real, integrable checkout option alongside Stripe |
| Payments — Amex | **Already covered by Stripe** | No separate integration — Amex is accepted through the existing Stripe integration |
| Payments — Chime | **Not integrable** | Chime has no public merchant/payment API. A Chime-issued debit card already works through Stripe like any other card — no special integration exists or is possible |
| Tour dates | **Bandsintown API** or **Songkick API** | Surface-layer artist profile tour date feeds |
| Socials | **Standard oEmbed/links** | Instagram/TikTok/X profile links on Surface artist/label pages, no API integration needed |
| Fantasy sports / sportsbook links | **DraftKings, Underdog — outbound links only.** **Bovada flagged** | Per your own framing these are *links*, not processed transactions — kept that way deliberately. Bovada operates without a license in most U.S. states; recommend link-out only, no funds/wagers touch our platform, and a legal review before this ships live |
| Digital restaurant | **Scope resolved: DoorDash Virtual Brands** | A delivery-only, AMO-branded rotating weekly menu, prepared by existing local partner kitchens per city (no physical kitchens to build). Integration: DoorDash Marketplace API for menu create/update (real, documented endpoint — partners implement a menu-pull endpoint DoorDash calls). Requirements: 50% menu differentiation from other menus at the same partner kitchen, 8+ items, unique photos, 50%+ hot/prepared food. Reaches DoorDash's existing 7,000+ city footprint. Heavier alternative (not needed for v1): DoorDash Kitchens, where DoorDash runs staffing/ops for a revenue split |
| Native token — **TABLED** | Deferred, not in current build scope | Revisit post-launch. Two paths noted for later: (A) off-chain membership points ledger, no securities exposure; (B) actual on-chain token, requires securities counsel before any code exists. No action until explicitly reopened |

**Open blocker:** Finesse (finesselife.app) — need to know whether it exposes a callable API or whether we're porting its matching-algorithm *logic* only. Nothing in The Club can be wired to a live Finesse API until this is resolved.

**Confirmed:** launching with both Kaiber and Veo 3 — both require separate paid API accounts, budget accordingly.

---

## 5. DATABASE SCHEMA (extends `supabase-migration.sql`)

```sql
-- Generalized room hierarchy (replaces artists/pieces for Inception)
CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  parent_space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('surface','streets','vip')),
  space_type TEXT NOT NULL CHECK (space_type IN ('wing','room','vault','boardroom')),
  required_access TEXT NOT NULL DEFAULT 'public',
  title TEXT NOT NULL,
  theme JSONB DEFAULT '{}',
  owner_id UUID REFERENCES auth.users,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_spaces_parent ON spaces(parent_space_id);
CREATE INDEX idx_spaces_tier ON spaces(tier);

CREATE TABLE space_members (
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT DEFAULT 'collaborator',
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (space_id, user_id)
);

CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  bpm INT, key TEXT,
  file_url TEXT, waveform_url TEXT,
  stems JSONB DEFAULT '[]',
  ai_generated BOOLEAN DEFAULT FALSE,
  dolby_processed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE label_pipeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'submitted', -- submitted, in_review, signed, released
  reviewed_by UUID REFERENCES auth.users,
  landr_release_id TEXT,
  revenue_share JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  user_id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  access_level TEXT DEFAULT 'free', -- free, premium, vip, label_signed
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ
);

CREATE TABLE video_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  zoom_meeting_id TEXT,
  scheduled_for TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users
);

CREATE TABLE video_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  provider TEXT CHECK (provider IN ('kaiber','veo3')),
  status TEXT DEFAULT 'pending',
  output_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

RLS policies follow HALO's existing pattern (`auth.uid()` checks, tier-based `SELECT` policies referencing `subscriptions.access_level`).

---

## 6. ROUTE STRUCTURE (extends HALO's `app/` layout)

```
app/
├── page.tsx                     # Surface home (was HALO's gallery home)
├── lab/[slug]/page.tsx          # was piece/[slug]
├── marketplace/[slug]/page.tsx
├── club/[slug]/page.tsx
├── streets/                     # gated: premium+
│   ├── page.tsx                 # label home
│   ├── [genre]/[project]/page.tsx   # room-within-room
│   └── [genre]/[project]/arranger/page.tsx
├── vip/                         # gated: vip / label_signed
│   ├── vault/[slug]/page.tsx
│   ├── boardroom/page.tsx
│   └── release/[slug]/page.tsx
├── api/
│   ├── stripe/{checkout,webhook}/route.ts
│   ├── zoom/create-meeting/route.ts
│   ├── splice/search/route.ts
│   ├── stable-audio/generate/route.ts
│   ├── dolby/enhance/route.ts
│   ├── landr/release/route.ts
│   ├── video-gen/{kaiber,veo3}/route.ts
│   ├── finesse/*  (stubbed pending API status)
│   ├── concierge/route.ts       # reused from HALO
│   └── gate/route.ts            # reused from HALO
└── admin/page.tsx               # reused from HALO, extended with label pipeline review
```

`middleware.ts` matcher extends from `['/provenance/:path*', '/admin/:path*']` to also include `/streets/:path*` and `/vip/:path*`.

---

## 7. BUILD ORDER (recommended, given full scope requested)

Even wiring "all APIs" benefits from a sequence — mainly because Stripe access-level gating has to exist before tier gating on anything else is meaningful.

1. **Foundation:** Fork HALO → rename to Inception, generalize `Artist/Piece` → `Space` schema, rebuild config for 3 tiers.
2. **Auth + Stripe:** Subscription tiers wired end-to-end (this unlocks all downstream gating).
3. **Surface layer:** Lab, Marketplace, Club, Lounge as `spaces` at `tier=surface`.
4. **Streets layer:** Project rooms, Arranger UI (Tone.js + dnd-kit), Splice + Stable Audio + Dolby.io wired.
5. **VIP layer:** Vaults, Boardroom (Zoom), Release Rooms (LANDR).
6. **Video generation:** Kaiber first (cheaper, audio-reactive, fits Surface/Streets), Veo 3 second (VIP-tier).
7. **Club/Finesse:** Once Finesse API status is confirmed.
8. **Polish:** Concierge repurposed as label A&R assistant, mobile pass, Lighthouse pass.

---

## 8. SECURITY & CONFIDENTIALITY ARCHITECTURE — CYPHER / ALCATRAZ / BEACON

VIP Sanctum's real audience is ultra-high-net-worth individuals discussing music, art, and financial deal terms that cannot leak, on a platform whose existence at that layer cannot be public knowledge. Three named protocols govern this, layered on top of the encryption strategy already in the original design brief (§ Encryption Strategy: at-rest / in-transit / end-to-end):

### CYPHER — login-time key rotation
- On every login: `sessionKey = HKDF(userMasterKey, loginTimestamp, deviceFingerprint)`.
- Session keys are short-lived and never reused across logins (forward secrecy) — a leaked key from one session can't decrypt any other session's traffic.
- Governs the ChaCha20-Poly1305 E2E messaging layer already speced for VIP; extends `packages/utils/src/encryption.ts` (HALO's existing tweetnacl-based utility) with a login-time derivation step. Server stores only the derived public key, never the secret.

### ALCATRAZ — total communications lockdown
- Emergency containment: instantly severs all inter-member communication inside VIP Sanctum — DMs, project-room chat, video calls, file shares — isolating every member's session from every other ("on an island," no cross-talk).
- Two triggers: (1) manual admin kill-switch, (2) automatic trigger from a high-confidence Beacon alert.
- Implementation: a `lockdown_state` flag scoped to the VIP Sanctum namespace. While active, Supabase Realtime channels reject all broadcast/presence events except to self, and API middleware blocks all cross-user reads/writes in that namespace.
- Reversible only by admin action, with a mandatory audit-log entry (who lifted it, when, why).

### BEACON — external leak & threat monitoring
- Background service watching for signs of a leak or physical-security risk:
  - **Social media monitoring** — keyword/fingerprint search across X, Instagram, TikTok, Reddit for leaked track titles, deal terms, or member names appearing publicly.
  - **Web traffic monitoring** — watches for VIP Sanctum's private slugs/URLs surfacing in search indexes, pastebins, or unexpected referrer logs (a private slug appearing anywhere public is itself the leak signal).
  - **Event-security monitoring** — for live/private shows, ingests public scanner feeds (e.g., Broadcastify API) strictly scoped to the venue's geofence and the event's time window, for situational awareness around the venue — standard event-security practice, not surveillance of individuals, and must stay bounded to that scope.
- High-confidence matches page admins immediately and auto-trigger Alcatraz.

**Platform confidentiality:** VIP Sanctum and Boardroom routes are excluded from `robots.txt`/sitemaps, never linked from any Surface-layer page, reachable only via a direct invite token, and ideally served from a subdomain not publicly associated with the Surface brand.

---

## 9. LIVE & PRIVATE EVENTS (SCALE TARGET)

- **Large-scale livestream:** collaborators can livestream a show to up to 100K concurrent viewers. Supabase/Vercel alone cannot carry that — needs a dedicated streaming backbone (Mux or Cloudflare Stream) layered on top of the app for ingest + adaptive delivery.
- **Bespoke private bookings:** a "commission a private show" flow inside Boardroom — a UHNW client requests a specific artist for a private event at a negotiated price (the "pay enough and \[artist\] plays your living room" model). Handled as a private deal-room (encrypted under Cypher), never a public marketplace listing.
- Both are new scope beyond the original 16-week roadmap — flag for prioritization against the rest of the build order in § 7.

---

## 11. VIP MATCHING ENGINE — "THE CIRCLE" (Reel Reuse)

**Origin:** HALO's `components/ui/PaintingReel.tsx` — a click-to-advance single-item display with chapter tabs, pip indicators, and a slow reveal-on-click interaction (not a swipe deck). Stripped of painting/artist content, this is repurposed wholesale as the interaction model for a private introduction engine inside VIP Sanctum.

**Why this shape, not a swipe deck:** the target user here is a famous or UHNW individual who cannot be seen using a Tinder-style app. The Reel's slow, deliberate, one-at-a-time reveal (click to advance, no gesture, no gamified stack) reads as a private viewing room, not a dating app — which is the point.

**Mechanical mapping (Reel → Circle):**

| PaintingReel concept | The Circle equivalent |
|---|---|
| `pieces` grouped by `artistSlug` | `candidates` — single continuous reel, ordered by match score (no natural "artist" grouping for people, so sections collapse to one) |
| Hero image of painting | Candidate photo — **blurred/obscured by default**, sharpens only after mutual interest is recorded |
| Artist era/nationality caption | Minimal alias line only — e.g. "Guest 014 · Verified" — real name withheld until mutual match |
| "Click to advance" | Same — click advances to next candidate; no left/right swipe gesture anywhere |
| Chapter badge (`2 / 8`) | Same, count of candidates in the current reel |
| "View this piece →" link | Replaced with two explicit actions: **Request Introduction** / **Pass** — deliberately concierge-worded, not gamified |
| Pip indicators | Same, unchanged |

**Introduction flow (concierge-mediated, not instant reveal):**
1. Both parties select "Request Introduction" on each other → mutual interest recorded.
2. No direct reveal or auto-chat-open on match. Instead, the Concierge (already in the HALO stack, Claude-powered) sends a discreet notification to both and facilitates first contact — matching the platform's existing white-glove tone rather than a "It's a match!" popup.
3. Only after concierge-mediated introduction is accepted does full identity + direct messaging unlock.

**Security:** this is the single most sensitive room in the platform — a leaked candidate list is a worse outcome than a leaked track. It inherits the full § 8 stack:
- **Cypher** governs the per-session keys for candidate photo delivery and introduction messages.
- **Alcatraz**, if triggered, locks The Circle first — no candidate list, photo, or introduction thread should be reachable mid-lockdown.
- **Beacon** treats any candidate alias, photo hash, or introduction content appearing outside the platform as a critical leak signal.

**Data model addition:**
```sql
CREATE TABLE circle_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  alias TEXT NOT NULL,              -- "Guest 014", never real name pre-match
  photo_url TEXT NOT NULL,          -- served blurred until mutual interest
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE circle_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user UUID REFERENCES auth.users,
  to_user UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (from_user, to_user)
);
-- mutual interest = matching rows in both directions -> triggers concierge introduction
```

---

## 11B. MOBILE — iOS & GOOGLE PLAY

**Recommendation: wrap the Next.js web app (Capacitor), don't fork into a separate React Native codebase.**

Why: this platform's core differentiators — the WebGL portal-jump shader (§ 5 in the Ethos Bible), the three-tier gated architecture, the Arranger's drag-and-drop engine — are all web technologies. A native React Native rewrite means re-implementing the shader work and the Arranger from scratch on a second stack, maintained in parallel forever. Capacitor (or a PWA-first approach with Capacitor as the store-submission wrapper) ships the same Next.js app inside a native shell, gets you into both the App Store and Google Play, and keeps one codebase.

**Trade-off to accept:** a Capacitor-wrapped app feels slightly less "native" than a from-scratch RN build (navigation transitions, some platform-specific gestures). For a content/immersive-experience platform rather than a utility app, this is a reasonable trade against not doubling the engineering surface area.

**What it needs when we get there:**
- Capacitor install + iOS/Android native shells added to the repo
- Push notifications need a native bridge (Capacitor plugin) — the web app alone can't do iOS push
- App Store / Play Store review guidelines review before submission — a platform with VIP/UHNW private-concert booking and payment flows will get real scrutiny; Apple in particular is strict about apps that gate content behind external payment or invite systems
- Native audio recording (the Arranger's `MediaRecorder` path) needs a Capacitor microphone permission bridge

**Not blocking current web build** — this is a packaging step for later, not a parallel build track right now.

---

## 12. OPEN ITEMS BEFORE BUILD STARTS

- [ ] Finesse API status (blocking Club integration)
- [ ] Zoom account tier (Meeting SDK vs full Video SDK — affects embedding vs external join)
- [ ] Stripe Connect country/payout setup for artist revenue share
- [ ] Confirm `Active_Members_Only` GitHub repo (currently empty) is the target repo to push the restructured HALO code into
- [ ] Legal/compliance review of Beacon's social + scanner monitoring scope before it goes live (even though scoped to public data + own-venue event windows)
- [ ] Streaming vendor decision for 100K-concurrent livestream (Mux vs Cloudflare Stream)
- [ ] Subdomain/hosting separation strategy so VIP Sanctum isn't publicly discoverable from the Surface brand

---

**Status:** Draft for review — no code written yet.
