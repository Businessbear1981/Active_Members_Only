import { NextRequest, NextResponse } from 'next/server'

// Real seam for Kick livestream creation/status.
// Returns 501 honestly until KICK_API_KEY is configured — no fake stream URLs.
export async function POST(request: NextRequest) {
  const { title } = await request.json()
  const kickKey = process.env.KICK_API_KEY

  if (!kickKey) {
    return NextResponse.json(
      {
        error: 'not_configured',
        message: 'KICK_API_KEY is not set. This endpoint is a real seam, not a working stream — add credentials to wire it up.',
        titleReceived: title ?? null,
      },
      { status: 501 }
    )
  }

  return NextResponse.json({ error: 'not_implemented' }, { status: 501 })
}
