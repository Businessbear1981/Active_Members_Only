# THE STREETS — God Mode Build Prompt
## Master prompt to drive every future Streets build session

---

## 0. HOW TO USE THIS

Paste this whole document (or reference it directly: "build against `docs/GOD_MODE_STREETS_BUILD_PROMPT.md`") at the start of any session building out The Streets. It encodes the ethos, the palette law, the full room roster, and the business model in one place so nothing gets rebuilt off-brand or off-spec.

---

## 1. THE ETHOS (say this back before building anything)

Active Members Only is a record label with three floors. The Streets is the real engine — a paid, members-only collaboration platform where music and art actually get made, arranged, recorded, and released. It is **for the creator, by the creator**: a digital art experience and label built around a founding artist's real network, not a stranger-to-stranger cold start.

The pitch test for every Streets feature: does it move *"idea on Friday → viral hit with a real music video by Monday,"* entirely inside the platform? If a feature doesn't serve that pipeline, it doesn't belong here.

**The equity thesis (build this into copy/onboarding, not just one feature):** people from lower-socioeconomic "Streets" backgrounds don't lack intelligence — they often lack exposure to the arrangement of language needed to prompt AI effectively. Every AI-facing surface in Streets should teach that gap closed, not assume it away.

---

## 2. THE PALETTE LAW — NON-NEGOTIABLE

**Streets renders in the hidden palette — purple/cyan/near-black, spray-paint/graffiti texture — never Surface's brass/ivory.** The user has explicitly praised "the one that is being hidden, not the one being seen" — the moodier, unrevealed direction is correct. Reusing Surface's luxury look on any Streets screen is a spec violation, not a style choice.

- Background: near-black (`#0a0a12` / `streets-bg` `#1A1A2E`)
- Primary: `streets-purple` `#9D00FF`
- Accent: `streets-cyan` `#00F5FF`
- Typography: bold condensed sans for headers, spray-drip accents, industrial/stenciled labels
- Motion: rougher, faster easing than Surface's slow luxury drift — a spray-can "snap," not a glide

---

## 3. NOVA — THE PLATFORM'S AI HOST

Nova (not "Bernard" — that name is retired) is the platform-wide AI concierge. Described by the founder as "our smoking hot assistant." Every new member goes through a **Nova-hosted welcome/introduction tutorial** on first join. Nova's framing line: *"We create a digital art experience — a label, for the creator, by the creator."*

Build Nova into onboarding first, not as an afterthought bolted onto an existing chat widget.

---

## 4. FULL ROOM/TAB ROSTER

### The Studio (the project-room centerpiece)
- **Beats room** — sample/beat-maker repo (Pro Tools / Dolby / Suno–class tools)
- **Vocals room** — record live or upload, wired to ElevenLabs + Suno
- **Live Instruments room** — same real-environment recording treatment for live instrumentation
- **The Hero (producer's seat)** — the actual centerpiece room. Ultra-luxurious, "$5K studio" visual — references: Daft Punk, Deadmau5, Michael Jackson's *Scream*, Tron. An active member sits in the seat, or a guest producer does (flagship scenario: Pharrell sits in to help SCO finish an album). This has to map to a **real physical at-home studio kit** — sourced cheaply (Alibaba), AMO-branded, sold in tiers by budget/quality. Platform recommends the gear tier that interfaces best with its own tools.
- **Prompt Maker** — the AI-literacy teaching tool inside the Studio; teaches the difference between talking *at* an AI and prompting it effectively.

### Beyond the Studio
- **Music Video Creator** — Higgsfield + ElevenLabs
- **Distribution** (own tab) — push finished tracks to SoundCloud, Spotify, iTunes, YouTube
- **A&R** — a real talent-scouting room/role, not just a pipeline status label
- **Album Creator** — opens into Meshy (visual/3D) + video (Higgsfield/ElevenLabs)
- **Art tab** — artists submit designs; needs a real professional-grade graphic-design AI platform (still to be sourced — Meshy alone doesn't cover this)
- **Written Work tab** — Grammarly-style editing + Claude for poetry, novels, screenplays, audiobooks
- **Collab tab** — its own separate space (distinct from a Project Room): live chat/text, sample sharing
- **The Gallery** — reuse NVAI's existing consignment-sale digital gallery as-is, reframed as a **rooftop party**: indoor/outdoor, walkthrough video shot the way NVAI shot "walk the grounds," different physical zones mapped to different sound/room functions

---

## 5. THE RECORDING-ROOM MECHANIC (corrected spec)

The DIY recording rooms are not passive capture booths. **The room actively filters, shapes, and arranges the sound in real time, and the member can manipulate that processing live.** This is deliberately enticing — the goal is to hook a casual/free user into doing real creative work in the room, which nudges them toward becoming a paying Active Member.

**Monetization tied to this, not optional:** any music made or distributed using the platform's recording equipment/tools carries a **15% royalty in perpetuity on that track's future earnings**, owed back to the platform. Framing: fair trade for giving an individual creator real distribution muscle they wouldn't otherwise have. Treat this as a real contract term to design for (metadata/rights tracking on every recorded asset), not a placeholder number.

**Access vs. tooling split (explicit):** members never pay for *access* to the rooms/sound environments — that stays free/included. They pay for the *tools* (a "Pro Tools lite" tier) and owe the 15% royalty on anything produced with the platform's gear.

---

## 6. BUILD ORDER — DO NOT START WITHOUT USER CONFIRMATION

This is a large surface area. Confirm which piece to build first each session — do not silently pick a subset. Reasonable sequencing, pending user sign-off:
1. Nova onboarding tutorial (first-touch, sets the whole tone)
2. The Studio's four rooms (Beats/Vocals/Live Instruments/Hero) — the emotional centerpiece
3. Collab tab (cheap to build, high daily-engagement value)
4. Distribution tab (closes the "viral by Monday" loop)
5. Music Video Creator, Album Creator, Art, Written Work, A&R, Gallery-as-rooftop-party — in whatever order the founder's brief prioritizes

---

## 7. WHAT NOT TO DO

- Don't render any of this in Surface's brass/ivory palette
- Don't build fake stats, fake rep/level numbers, or placeholder testimonials — honest-stub pattern only (real UI, clearly labeled "not wired yet" where a backend doesn't exist)
- Don't skip the 15% royalty framing when building anything that touches recorded output — it's a real business term, not flavor text
- Don't start the full tab roster speculatively — the founder is compiling a written brief and will direct build order explicitly

---

**Status:** Master reference prompt, compiled from founder direction across multiple sessions. Update this file directly when the founder's own written brief lands, rather than letting the two drift apart.
