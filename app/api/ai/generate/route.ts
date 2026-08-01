import { NextRequest, NextResponse } from 'next/server'

// Real seam for AI music/voice generation (Stable Audio, ElevenLabs, etc).
// Returns 501 honestly until a real provider key is configured — no fake results.
export async function POST(request: NextRequest) {
  const { prompt } = await request.json()

  const stableAudioKey = process.env.STABLE_AUDIO_API_KEY
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY

  if (!stableAudioKey && !elevenLabsKey) {
    return NextResponse.json(
      {
        error: 'not_configured',
        message:
          'No AI generation provider is configured yet (STABLE_AUDIO_API_KEY / ELEVENLABS_API_KEY). This endpoint is a real seam, not a working generator — add credentials to wire it up.',
        promptReceived: prompt ?? null,
      },
      { status: 501 }
    )
  }

  // Real provider call goes here once a key exists.
  return NextResponse.json({ error: 'not_implemented' }, { status: 501 })
}
