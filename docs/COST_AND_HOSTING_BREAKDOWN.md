# ACTIVE MEMBERS ONLY — Full Cost & Hosting Breakdown
## Every API/tool in the stack, current pricing as of August 2026

---

## 1. CORE INFRASTRUCTURE (fixed monthly, not usage-driven by content volume)

| Service | Plan | Cost |
|---|---|---|
| **Vercel** (hosting) | Pro, 1 seat | $20/mo base + usage — realistic all-in around **$67/mo** once bandwidth/functions overage is counted |
| **Supabase** (DB/auth/storage/realtime) | Pro | $25/mo base ($10 compute credit included) — realistic all-in **$35–75/mo** for a small-to-medium app |
| **Cloudflare** (CDN, DDoS, R2 storage if used) | Pro | ~$20/mo, R2 storage billed separately (cheap, ~$0.015/GB) |

**Core infra subtotal: ~$120–160/mo** before any content/API usage.

---

## 2. PAYMENTS

| Service | Model | Cost |
|---|---|---|
| **Stripe** | Per-transaction | 2.9% + $0.30 per US card charge. +1.5% cross-border on international cards. Billing/subscriptions add 0.7%. No monthly fee. |
| **Cash App Pay** (via Block/Square) | Per-transaction | Similar percentage-based model to Stripe, no separate monthly fee |

No fixed cost here — scales with revenue, not with build size.

---

## 3. MUSIC/AUDIO TOOLS

| Service | Model | Cost |
|---|---|---|
| **ElevenLabs** (voice/Concierge) | Tiered + per-character | Consumer $5–$990/mo. **API tiers**: Free (10 credits), Pro $99/mo (100 credits), Scale $330/mo (660 credits). Per-character: $0.10/1K chars (high quality), $0.05/1K (Flash/Turbo) |
| **Dolby.io** (Enhance/Analyze/mastering) | Pay-per-minute | 200 free min/mo, then **$0.05/min** with volume discounts |
| **Stable Audio API** (AI generation) | Credit-based | 25 free credits, then ~$0.02/generation (Stable Audio 3.0 fixed at $0.0206/gen) — cheapest real option in the stack |
| **LANDR** (mastering/distribution) | Subscription or pay-per-track | $11–40/mo subscription, **or** $4–9 per track pay-per-master. Takes a 20% cut on YouTube/Instagram/Facebook/TikTok monetization regardless of plan |
| **Splice** (sample library) | **No public partner API pricing found** | Consumer subscription only publicly listed; a real partner/API integration would require direct sales contact — budget unknown until they quote it |
| **Suno** (AI music gen) | **No official API — flagged as TOS risk, not recommended** | Consumer: Free / $10/mo (Pro) / $30/mo (Premier). Unofficial third-party resellers exist at $0.014–$0.111/song but using them programmatically is against Suno's terms |

---

## 4. VIDEO GENERATION

| Service | Model | Cost |
|---|---|---|
| **Kaiber** (audio-reactive video) | Credit subscription | $10/mo (Starter, 500 credits) → $99/mo (Pro, 5,000 credits). Public pricing page routes to sales for API access specifically — expect a custom quote |
| **Google Veo 3** (Vertex AI) | Per-second | **$0.75/sec with audio, $0.50/sec video-only.** An 8-second clip with audio = **$6.00**. Veo 3.1 Lite is far cheaper at ~$0.05/sec if full Veo 3 quality isn't needed everywhere |
| **Higgsfield** (character-consistent video) | Subscription or per-gen via resellers | $15–99/mo subscription. Via Segmind: $0.86–$4.22 per video (speech-to-video), $0.16–$0.70 (image-to-video) |
| **Meshy** (3D generation) | Subscription | Free (100 credits/mo) → Pro $20/mo (1,000 credits, unlocks API access) → Max $60/mo → Enterprise/API $90/mo |

**Veo 3 is the expensive one here** — a single VIP-tier cinematic music video (say 60 seconds, with audio) would run **~$45** in Vertex AI generation cost alone. Budget per-release, not as a flat monthly line.

---

## 5. LIVE / VIDEO CALLING

| Service | Model | Cost |
|---|---|---|
| **Zoom Video SDK** | Credit/per-minute | $100/100 credits or $450/500 credits monthly. Effective rate **$0.0035/participant-minute** (~$21 for a 100-user, 60-min session). Cloud recording adds $4/1,000 min. 20 free credits/mo to start |
| **Mux** (streaming backbone) | Per-minute, granular | Encoding $0.0075/min, storage $0.003/min, delivery $0.0008–$0.0048/min. ~$170/mo for a 100K-delivery-min/10K-stored-min workload |
| **Cloudflare Stream** (alt. streaming backbone) | Per-minute | $5/1,000 min stored, $1/1,000 min delivered, no resolution surcharges. ~$150/mo for the same workload as above — **cheaper than Mux at this volume** |

**For the 100K-viewer private concert use case**, this is the line item that actually matters — do a real load estimate before committing to either vendor; both bill essentially the same shape, Cloudflare a bit cheaper at the volumes checked.

---

## 6. AI TEXT / CONCIERGE

| Service | Model | Cost |
|---|---|---|
| **Claude API** (Concierge, already in the HALO stack) | Per-million-tokens | **Sonnet 5: $2/$10 in/out** (promotional rate through Aug 31, 2026). **Opus 5: $5/$25.** **Haiku 4.5: $1/$5.** Prompt caching cuts cached input cost 90%; batch processing is 50% off |

Concierge chat is genuinely cheap at this volume — a busy day of member conversations on Sonnet 5 is single-digit dollars, not a real budget line until scale is very high.

---

## 7. LOW/NO-COST ITEMS (free tiers cover this platform's likely usage)

| Service | Cost |
|---|---|
| YouTube Data API v3 | Free, quota-based |
| Kick API | Free for developer access |
| Spotify Web API (reference/embed only, not distribution) | Free |
| Telegram Bot API | Free |
| Bandsintown / Songkick (tour dates) | Free for basic lookup use |

---

## 8. REALISTIC MONTHLY SCENARIOS

### Scenario A — Bare build, pre-launch (infra only, testing integrations)
Vercel + Supabase + Cloudflare, everything else on free tiers/trial credits.
**~$120–160/mo**

### Scenario B — Soft launch, moderate usage
Core infra + ElevenLabs Pro + Dolby.io light use + Stable Audio + Claude (Sonnet) + Zoom light use + Mux/Cloudflare Stream light use.
**~$450–650/mo**

### Scenario C — Full stack, active label with regular releases
Everything in B, plus LANDR release volume, Meshy, Higgsfield, and **Veo 3 spend scaling directly with how many cinematic videos actually get generated** (this is the wildcard — 10 VIP-tier music videos a month at ~$45 each is another **$450/mo** on its own).
**~$1,200–2,000+/mo**, driven mostly by video generation volume, not the fixed infra.

---

## 9. THE HONEST FLAGS

- **Splice**: no public API pricing exists — this is an unknown until you get a real quote from them, not a number I can give you.
- **Suno**: deliberately not budgeted as a real integration — no official API, using it programmatically carries real TOS risk. Stable Audio is the actual line item for AI music generation.
- **Veo 3 is the single biggest variable cost** in this whole stack. It scales with how much cinematic video you actually generate, not with subscribers — budget it per-release, not as a flat monthly number.
- **Splice/Kaiber/Higgsfield API access** all effectively route to "contact sales" for real partner terms — the consumer subscription prices above are a floor, not what a production integration will actually cost.

---

**Status:** Pricing gathered via live web search, August 2026 — verify directly with each vendor before committing budget, especially the "contact sales" items.
