import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const { name, email, firm, message, role } = await req.json()

  if (!name || !email || !role) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { error } = await supabase
    .from('gate_requests')
    .insert({ name, email, firm, message, role, status: 'pending' })

  if (error) {
    console.error('gate_requests insert error:', error)
    return NextResponse.json({ error: 'Failed to save request.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
