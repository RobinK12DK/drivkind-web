'use client'
import { useEffect, useRef, useCallback } from 'react'

interface TurnstileProps {
  onVerify: (token: string) => void
  siteKey: string
}

export default function Turnstile({ onVerify, siteKey }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderWidget = useCallback(() => {
    const win = window as any
    if (!containerRef.current || !win.turnstile || widgetIdRef.current) return
    widgetIdRef.current = win.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      theme: 'dark',
      appearance: 'always',
    })
  }, [siteKey, onVerify])

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
}
