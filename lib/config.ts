import raw from '../platform.config.json'
import type { PlatformConfig, Artist, Piece, Space, Tier } from '@/types/platform'

export const config = raw as unknown as PlatformConfig

export const platform  = config.platform
export const concierge = config.concierge
export const gate      = config.gate
export const tiers     = config.accessTiers
export const rooms     = config.rooms

export const artists: Artist[] = config.artists
export const pieces: Piece[]   = config.pieces
export const spaces: Space[]   = config.spaces

export function getArtist(slug: string): Artist | undefined {
  return artists.find(a => a.slug === slug)
}

export function getPiece(slug: string): Piece | undefined {
  return pieces.find(p => p.slug === slug)
}

export function getPiecesByArtist(artistSlug: string): Piece[] {
  return pieces.filter(p => p.artistSlug === artistSlug)
}

export function getSpace(slug: string): Space | undefined {
  return spaces.find(s => s.slug === slug)
}

export function getSpacesByTier(tier: Tier): Space[] {
  return spaces.filter(s => s.tier === tier && s.parentSlug === null)
}

export function getChildSpaces(parentSlug: string): Space[] {
  return spaces.filter(s => s.parentSlug === parentSlug)
}
