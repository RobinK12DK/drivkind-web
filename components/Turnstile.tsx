'use client'
import { Turnstile as NextTurnstile } from 'next-turnstile'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface TurnstileRef {
  reset: () => void
}

interface TurnstileProps {
  onVerify: (token: string) => void
  siteKey: string
}

const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(({ onVerify, siteKey }, ref) => {
  const [resetKey, setResetKey] = useState(0)

  useImperativeHandle(ref, () => ({
    reset: () => setResetKey(k => k + 1)
  }))

  return (
    <div style={{ margin: '1rem 0' }}>
      <NextTurnstile
        key={resetKey}
        siteKey={siteKey}
        onVerify={onVerify}
        onExpire={() => setResetKey(k => k + 1)}
        theme="dark"
        appearance="always"
      />
    </div>
  )
})

Turnstile.displayName = 'Turnstile'
export default Turnstile
