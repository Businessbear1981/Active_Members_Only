'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { createPortalRenderer, type PortalRenderer } from '@/lib/portalShader'

export interface PortalCanvasHandle {
  play: (onMidpoint: () => void, onComplete: () => void) => void
}

const DURATION_MS = 1000

const PortalCanvas = forwardRef<PortalCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rendererRef = useRef<PortalRenderer | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    rendererRef.current = createPortalRenderer(canvasRef.current)
    return () => {
      rendererRef.current?.destroy()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    play(onMidpoint, onComplete) {
      const renderer = rendererRef.current
      if (!renderer) {
        // No WebGL available — skip straight to navigation, don't block the user.
        onMidpoint()
        onComplete()
        return
      }
      const start = performance.now()
      let firedMidpoint = false

      function frame(now: number) {
        const progress = Math.min((now - start) / DURATION_MS, 1)
        renderer!.render(progress)

        if (!firedMidpoint && progress >= 0.5) {
          firedMidpoint = true
          onMidpoint()
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(frame)
        } else {
          onComplete()
        }
      }
      rafRef.current = requestAnimationFrame(frame)
    },
  }))

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  )
})

PortalCanvas.displayName = 'PortalCanvas'
export default PortalCanvas
