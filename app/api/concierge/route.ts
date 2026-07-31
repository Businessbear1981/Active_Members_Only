import { NextRequest, NextResponse } from 'next/server'
import { concierge } from '@/lib/config'

export async function POST(req: NextRequest) {
  const { message, context } = await req.json()

  if (!message) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 })
  }

  const systemPrompt = [
    concierge.systemPrompt,
    context ? `Current context: ${context}` : '',
  ].filter(Boolean).join('\n\n')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Concierge unavailable.' }, { status: 500 })
  }

  const data = await res.json()
  const reply = data.content?.[0]?.text ?? ''

  return NextResponse.json({ reply })
}
