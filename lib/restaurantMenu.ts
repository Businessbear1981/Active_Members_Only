export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

export interface WeeklyMenu {
  weekOf: string
  cityKitchenPartner: string
  items: MenuItem[]
}

// Real rotating structure — same shape a DoorDash Virtual Brand menu-pull
// response needs. Swap this for a real weekly-curated menu once a partner
// kitchen is signed; nothing else (the API route, the page) needs to change.
export function getCurrentWeeklyMenu(): WeeklyMenu {
  const items: MenuItem[] = [
    { id: 'm1', name: 'Late Night Smash Burger', description: 'Double patty, brass-glazed onions, house sauce', price: 14.99, category: 'Mains', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm2', name: 'Studio Session Wings', description: '8pc, gold dust dry rub', price: 12.99, category: 'Mains', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm3', name: 'Midnight Ramen', description: 'Slow-braised, soft egg, scallion', price: 15.99, category: 'Mains', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm4', name: 'Vault Fries', description: 'Truffle salt, parmesan', price: 6.99, category: 'Sides', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm5', name: 'Label Salad', description: 'Charred corn, cotija, lime', price: 8.99, category: 'Sides', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm6', name: 'After Hours Espresso Shake', description: 'Cold brew, vanilla, whipped', price: 7.99, category: 'Drinks', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm7', name: 'Gold Bar', description: 'Salted caramel, dark chocolate', price: 5.99, category: 'Dessert', imageUrl: '/brand/menu/placeholder.jpg' },
    { id: 'm8', name: 'Streets Street Corn', description: 'Grilled, chili-lime crema', price: 6.49, category: 'Sides', imageUrl: '/brand/menu/placeholder.jpg' },
  ]

  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7))

  return {
    weekOf: monday.toISOString().slice(0, 10),
    cityKitchenPartner: 'Partner kitchen not yet signed — placeholder',
    items,
  }
}
