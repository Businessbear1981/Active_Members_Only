# ACTIVE MEMBERS ONLY — Streets Design Handoff for Manus
## Design/visual only — not a backend or architecture brief

---

## Attach first

The current live build — either the `active-members-only` GitHub repo (Businessbear1981/Active_Members_Only) or a fresh export of it. This handoff assumes Manus can see the actual rebuilt `/streets` page (purple/cyan/near-black spray-drip wordmark, featured genre room card, label pipeline stages, genre tile grid) live at active-members-only.vercel.app/streets.

---

## What's real right now

The Streets landing page (`/streets`) was rebuilt off a Manus-provided reference mockup — a dark "membership home base" UI (STREETS wordmark with a spray-paint drip underline, REP/LEVEL-style stat bar, featured-location card, mission tiles). The rebuild is real and live: genuine genre-room data, a featured-room card, and the label pipeline shown as its real states (Submitted → In Review → Signed → Released) instead of fabricated stats. The genre tile grid is real but currently gradient-panel placeholders — no per-genre photography exists yet.

**What's explicitly NOT done:** the individual Studio rooms (Beats/Vocals/Live Instruments/Hero producer-seat), the Music Video Creator, Distribution, A&R, Album Creator, Art, Written Work, and Collab tabs, and the Gallery-as-rooftop-party experience. All of that is scoped in `GOD_MODE_STREETS_BUILD_PROMPT.md` in this same `docs/` folder but not yet built. This handoff is about making what already exists look *right*, and giving Manus enough context to design the pieces above without going off-brand.

---

## The palette law — the single most important rule

**Streets renders in the hidden palette: purple `#9D00FF`, cyan `#00F5FF`, near-black `#0a0a12`/`#1A1A2E`, spray-paint/graffiti texture.** This is deliberate and has been explicitly re-confirmed by the founder more than once — "the one that is being hidden, not the one being seen" is the correct direction. **Never** apply Surface's brass/ivory/luxury palette to anything under `/streets`. If a Manus-generated design leans toward polished luxury for a Streets screen, that's a spec violation, not a style choice — reject it and redo in the grimy/industrial direction.

---

## Your job

### 1. Real photography for the genre tile grid
`components/streets/StreetsTileGrid.tsx` currently renders honest gradient-panel placeholders (no image) for Hip-Hop / R&B / Electronic / Trap / Pop. Generate real cinematic genre-room photography in the purple/cyan/near-black palette — industrial, back-alley, spray-tagged environments distinct per genre — and wire them in the same way Surface's room tiles were done (crop into `public/brand/streets/{slug}.jpg`, reference in the tile component).

### 2. The Studio — visual concepting
Design the four Studio rooms per `GOD_MODE_STREETS_BUILD_PROMPT.md` § 4:
- **The Hero (producer's seat)** is the centerpiece — ultra-luxurious "$5K studio," referencing Daft Punk / Deadmau5 / Michael Jackson's *Scream* video / Tron. This is the one Streets room allowed real shine, since it's the aspirational reward-for-work moment, not the everyday texture — but keep it in Streets' cyan/purple light language (think neon-lit gear, not brass).
- **Beats / Vocals / Live Instruments** rooms should read as distinct real environments (different lighting, different gear silhouettes), not three reskins of the same booth.

### 3. Nova, the AI host — visual identity
Nova (replacing the retired "Bernard" placeholder) needs a visual presence for the first-touch welcome/introduction tutorial every new member goes through. Design concepting only — no voice/backend work. Tone: confident, warm, "for the creator by the creator," not a corporate chatbot avatar.

### 4. The Gallery, reframed as a rooftop party
Reuse NVAI's existing consignment-sale digital gallery mechanics as-is (do not redesign the underlying gallery/consignment interaction model — that's out of scope here). Redesign the *setting*: an indoor/outdoor rooftop party, shot as a walkthrough video the way NVAI shot "walk the grounds" — different physical zones of the party mapped to different sound/room functions. Keep it in Streets' palette, not Surface's.

### 5. Portal-jump transition, Streets-specific pass
Per the earlier cinematic handoff, the portal-jump (water-dive + UV/blacklight burst) is shared across every tier — but confirm the *landing* palette when jumping into any Streets room is correctly purple/cyan/near-black, never bleeding Surface brass into the landing frame.

---

## What NOT to touch

- Don't change the room hierarchy, routing structure, or the `spaces` data model in `platform.config.json` / `lib/config.ts`
- Don't add fake content, sample copy, or stock imagery labeled as real — use the established honest-placeholder pattern (styled panel + label) where real assets don't exist yet
- Don't touch `middleware.ts` or anything auth-related
- Don't design Streets in Surface's brass/ivory palette under any circumstance
- Backend integrations (Higgsfield, ElevenLabs, Meshy, distribution APIs, the 15% royalty/rights tracking) are out of scope — visual/cinematic only

---

**Status:** Design-only handoff, companion to `GOD_MODE_STREETS_BUILD_PROMPT.md` in this same folder.
