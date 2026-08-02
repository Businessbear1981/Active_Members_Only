'use client'

import { createContext, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import PortalCanvas, { type PortalCanvasHandle } from './PortalCanvas'

interface PortalContextValue {
  triggerPortal: (href: string) => void
}

const PortalContext = createContext<PortalContextValue | null>(null)

export function usePortalTransition() {
  const ctx = useContext(PortalContext)
  if (!ctx) throw new Error('usePortalTransition must be used within PortalTransitionProvider')
  return ctx
}

export default function PortalTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const canvasRef = useRef<PortalCanvasHandle | null>(null)

  function triggerPortal(href: string) {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      router.push(href)
      return
    }

    canvasRef.current?.play(
      () => router.push(href),
      () => {}
    )
  }

  return (
    <PortalContext.Provider value={{ triggerPortal }}>
      {children}
      <PortalCanvas ref={canvasRef} />
    </PortalContext.Provider>
  )
}
