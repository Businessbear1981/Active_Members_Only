'use client'

import Link, { type LinkProps } from 'next/link'
import { usePortalTransition } from './PortalTransitionProvider'

type Props = LinkProps & {
  children: React.ReactNode
  className?: string
}

export default function PortalLink({ href, children, className, ...rest }: Props) {
  const { triggerPortal } = usePortalTransition()

  return (
    <Link
      href={href}
      className={className}
      onClick={e => {
        // Let modifier-clicks (new tab, etc) behave natively
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        triggerPortal(href.toString())
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
