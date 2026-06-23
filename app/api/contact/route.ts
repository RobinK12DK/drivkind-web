import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ??
      request.headers.get('x-real-ip') ??
      'unknown'

    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (entry && entry.count >= 5 && entry.resetTime > now) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    if (entry && entry.resetTime <= now) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 })
    } else if (entry) {
      rateLimitMap.set(ip, { count: entry.count + 1, resetTime: entry.resetTime })
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 })
    }

    const body = await request.json()

    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const { name, email, type, message } = body

    if (
      !name || typeof name !== 'string' || name.trim() === '' ||
      !email || typeof email !== 'string' || email.trim() === '' ||
      !message || typeof message !== 'string' || message.trim() === ''
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (name.trim().length > 100 || email.trim().length > 200 || message.trim().length > 2000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const safeName = name.trim()
    const safeEmail = email.trim()
    const safeType = typeof type === 'string' ? type.trim() : ''
    const safeMessage = message.trim()

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'robin@drivkind.co.za',
      replyTo: safeEmail,
      subject: `New DRIVKIND. Enquiry — ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Type: ${safeType || 'Not provided'}`,
        ``,
        `Message:`,
        safeMessage,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
