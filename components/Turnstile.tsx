'use client'
import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'

export interface TurnstileRef {
  reset: () => void
}

interface TurnstileProps {
  onVerify: (token: string) => void
  siteKey: string
}

const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(({ onVerify, siteKey }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderWidget = useCallback(() => {
    const win = window as any
    if (!containerRef.current || !win.turnstile) return
    if (widgetIdRef.current !== null) {
      win.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = null
    }
    widgetIdRef.current = win.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      'expired-callback': () => {
        const w = window as any
        if (widgetIdRef.current !== null) w.turnstile.reset(widgetIdRef.current)
      },
      theme: 'dark',
      appearance: 'always',
    })
  }, [siteKey, onVerify])

  useImperativeHandle(ref, () => ({
    reset: () => {
      const win = window as any
      if (widgetIdRef.current !== null && win.turnstile) {
        win.turnstile.reset(widgetIdRef.current)
      }
    }
  }))

  useEffect(() => {
    const win = window as any
    if (win.turnstile) {
      renderWidget()
    } else {
      const interval = setInterval(() => {
        if ((window as any).turnstile) {
          clearInterval(interval)
          renderWidget()
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [renderWidget])

  return <div ref={containerRef} style={{ margin: '1rem 0' }} />
})

Turnstile.displayName = 'Turnstile'
export default Turnstile
