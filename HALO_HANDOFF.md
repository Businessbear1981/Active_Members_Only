# HALO — New Session Handoff

## What This Is
HALO is a private ultra-luxury cinematic digital gallery platform — stripped from NVAI's architecture.
No videos. Paintings + gates + concierge. Ready for 30 paintings from a new artist.

## GitHub
https://github.com/Businessbear1981/Halo-

## Services (all under "HALO" name)
- **Vercel**: halo project in ardan-edge-capital team
- **Supabase**: fill in project URL + keys in .env.local
- **Railway**: fill in project ID + token in .env.local

## Stack
- Next.js 15 (App Router) · TypeScript · Tailwind CSS
- Supabase (auth + DB)
- Claude API (concierge AI)
- ElevenLabs (voice, optional)
- Cloudflare R2 (painting image hosting)

## Project Structure
```
art-shell/
├── platform.config.json   ← MASTER CONFIG: edit this to set up the platform
├── lib/config.ts          ← imports platform.config.json, exports typed helpers
├── types/platform.ts      ← TypeScript types for Artist, Piece, AccessTier
├── app/
│   ├── layout.tsx         ← root layout (Concierge injected here)
│   ├── page.tsx           ← home page
│   ├── collection/        ← grid of all 30 paintings
│   ├── piece/[slug]/      ← individual painting page
│   ├── wing/[slug]/       ← artist wing (all pieces by one artist)
│   ├── gate/[role]/       ← NDA access request form
│   ├── admin/             ← gate request dashboard
│   └── api/
│       ├── gate/          ← saves gate requests to Supabase
│       └── concierge/     ← Claude-powered chat API
├── components/
│   └── concierge/         ← floating AI concierge chat widget
├── utils/supabase/        ← client + server Supabase helpers
├── middleware.ts           ← protects /provenance and /admin routes
├── supabase-migration.sql ← run this in Supabase SQL editor first
└── .env.example           ← copy to .env.local and fill in values
```

## First Steps for New Session

1. **Clone the repo**
   ```
   git clone https://github.com/Businessbear1981/Halo-
   cd Halo-
   npm install
   ```

2. **Set up env**
   ```
   copy .env.example .env.local
   # Fill in Supabase URL + keys, Anthropic key, R2 credentials
   ```

3. **Run Supabase migration**
   - Go to Supabase dashboard → SQL editor
   - Paste and run `supabase-migration.sql`

4. **Add your 30 paintings**
   - Edit `platform.config.json`
   - Update `artists` array with the artist info
   - Add all 30 paintings to `pieces` array
   - Drop painting images in `public/paintings/`
   - Update `concierge.systemPrompt` with artist-specific context

5. **Run locally**
   ```
   npm run dev
   ```

## Access Gate Flow
```
Public visitor
  → sees: hero image, title, year, medium, concierge story
  → CTA: "Request Access" → /gate/signed

/gate/signed (NDA form)
  → POST /api/gate → saves to Supabase gate_requests
  → Admin reviews at /admin → manually sends NDA
  → Once signed, manually set user role in signed_users table

/gate/buyer | /gate/lender | /gate/broker
  → same form, different role tag
  → unlocks gated fields in paintings.ts after approval
```

## Concierge
- Floating ✦ button bottom-right on every page
- Powered by Claude claude-sonnet-4-6 via /api/concierge
- System prompt lives in platform.config.json → concierge.systemPrompt
- Customize it with artist knowledge, collection context, persona

## Adding ElevenLabs Voice (optional)
- Set ELEVENLABS_API_KEY in .env.local
- Set concierge.voiceId in platform.config.json
- Add TTS call in /api/concierge route (currently text-only)

## Deploy to Vercel
- Connect Businessbear1981/Halo- in the Vercel dashboard
- Add all .env.local vars as Vercel environment variables
- Push to main → auto-deploys

## Sean's Other Active Projects (context)
- NVAI: napavalleyartinstitut.com — separate project, archived/paused
- NEST: ardanedgecapital.com — institutional CRE platform
- Finesse: finesselife.app — social/dating platform
- Arden Edge Capital: sean.gilmore@ardanedgecapital.com
