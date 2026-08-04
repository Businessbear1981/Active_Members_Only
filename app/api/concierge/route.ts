import { NextRequest, NextResponse } from 'next/server'
import { concierge } from '@/lib/config'

const MATERIAL_KEYWORDS = [
  'price', 'offer', 'buy', 'purchase', 'commit', 'bid', 'negotiate',
  'discount', 'how much', 'cost', 'invest', 'contract', 'deal',
]

function isMaterialInquiry(message: string) {
  const lower = message.toLowerCase()
  return MATERIAL_KEYWORDS.some(k => lower.includes(k))
}

export async function POST(req: NextRequest) {
  const { message, context } = await req.json()

  if (!message) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 })
  }

  const routedToHuman = isMaterialInquiry(message)
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    const reply = routedToHuman
      ? "That's a conversation worth having directly. Someone from the label will follow up with you shortly."
      : concierge.greeting
    return NextResponse.json({ reply, routedToHuman, notConfigured: true })
  }

  const systemPrompt = [
    concierge.systemPrompt,
    routedToHuman
      ? 'This message concerns a price, offer, or transaction. Acknowledge warmly and let the member know someone from the label will follow up directly — do not negotiate or quote figures yourself.'
      : '',
    context ? `Current context: ${context}` : '',
  ].filter(Boolean).join('\n\n')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
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

  return NextResponse.json({ reply, routedToHuman })
}
