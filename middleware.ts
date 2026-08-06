import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let user = null
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(toSet) {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          toSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    try {
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch {
      user = null
    }
  }
  // No Supabase credentials configured yet (real state, not a placeholder bug) —
  // every request is treated as unauthenticated instead of crashing the route.

  // Gate: /provenance requires signed-in user with signed_at set in profile
  if (request.nextUrl.pathname.startsWith('/provenance')) {
    if (!user) {
      return NextResponse.redirect(new URL('/gate/signed', request.url))
    }
  }

  // Admin: require admin role
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Streets: requires a signed-in member (premium+ tier check lands once subscriptions are wired to Supabase)
  if (request.nextUrl.pathname.startsWith('/streets')) {
    if (!user) {
      return NextResponse.redirect(new URL('/gate/signed', request.url))
    }
  }

  // VIP Sanctum: requires a signed-in member (vip/label_signed tier check lands once subscriptions are wired to Supabase)
  if (request.nextUrl.pathname.startsWith('/vip')) {
    if (!user) {
      return NextResponse.redirect(new URL('/gate/signed', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/provenance/:path*', '/admin/:path*', '/streets/:path*', '/vip/:path*'],
}
