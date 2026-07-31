import raw from '../platform.config.json'
import type { PlatformConfig, Artist, Piece } from '@/types/platform'

export const config = raw as PlatformConfig

export const platform  = config.platform
export const concierge = config.concierge
export const gate      = config.gate
export const tiers     = config.accessTiers
export const rooms     = config.rooms

export const artists: Artist[] = config.artists
export const pieces: Piece[]   = config.pieces

export function getArtist(slug: string): Artist | undefined {
  return artists.find(a => a.slug === slug)
}

export function getPiece(slug: string): Piece | undefined {
  return pieces.find(p => p.slug === slug)
}

export function getPiecesByArtist(artistSlug: string): Piece[] {
  return pieces.filter(p => p.artistSlug === artistSlug)
}
