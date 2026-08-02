import { NextResponse } from 'next/server'
import { getCurrentWeeklyMenu } from '@/lib/restaurantMenu'

// Real seam for DoorDash's Virtual Brand menu-pull integration — DoorDash
// calls a partner-provided endpoint like this to sync a store's menu.
// Field names here are a reasonable structure, not verified against
// DoorDash's exact schema — reconcile against their Developer Services docs
// before this goes live. The weekly-rotation logic is real regardless.
export async function GET() {
  const menu = getCurrentWeeklyMenu()

  const categories = Array.from(new Set(menu.items.map(i => i.category))).map(category => ({
    name: category,
    items: menu.items
      .filter(i => i.category === category)
      .map(i => ({
        id: i.id,
        name: i.name,
        description: i.description,
        price_cents: Math.round(i.price * 100),
        image_url: i.imageUrl,
      })),
  }))

  return NextResponse.json({
    brand: 'Active Members Only — The Restaurant',
    week_of: menu.weekOf,
    kitchen_partner: menu.cityKitchenPartner,
    categories,
    status: 'not_live_on_doordash_yet',
  })
}
