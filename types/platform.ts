export type AccessTier = 'public' | 'signed' | 'buyer' | 'lender' | 'broker'

export interface Artist {
  slug: string
  name: string
  shortName: string
  era: string
  nationality: string
  born: number
  died?: number
  wingHref: string
  pieceCount: number
  bio: string
  conciergeStory: string
}

export interface GatedData {
  signed?: {
    ownerChain: string
    authPdf: string
    conditionPhotos: string[]
  }
  buyer?: {
    askingPrice: number
    paymentStructure: string
  }
  lender?: {
    appraisalValue: number
    fmv: number
    insuranceStatus: string
  }
  broker?: {
    floorPrice: number
    commission: string
    ownerOfRecord: string
  }
}

export interface Piece {
  slug: string
  artistSlug: string
  title: string
  year: string
  medium: string
  dimensions: string
  signed: boolean
  heroImage: string
  viewingLocation: string
  conciergeStory: string
  literature: string[]
  provenanceDoc: string
  comparisonImages: string[]
  gated: GatedData
}

export interface Room {
  heroImage: string
}

export interface PlatformConfig {
  platform: {
    name: string
    shortName: string
    domain: string
    tagline: string
    description: string
    theme: Record<string, string>
  }
  concierge: {
    name: string
    voiceId: string
    greeting: string
    systemPrompt: string
  }
  gate: {
    documentName: string
    documentLabel: string
    roles: string[]
  }
  accessTiers: Record<AccessTier, { label: string; sees: string[] }>
  artists: Artist[]
  pieces: Piece[]
  rooms: Record<string, Room>
}
